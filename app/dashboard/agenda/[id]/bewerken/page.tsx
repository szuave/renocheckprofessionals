import type { Metadata } from "next";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { getCurrentUser } from "@/lib/auth";
import { getEvent, updateEvent } from "@/lib/queries";

export const metadata: Metadata = {
  title: "Event bewerken",
  robots: { index: false, follow: false },
};

const VALID_REGIONS = new Set([
  "west-vlaanderen",
  "oost-vlaanderen",
  "antwerpen",
  "vlaams-brabant",
]);

async function updateEventAction(formData: FormData) {
  "use server";

  const id = String(formData.get("id"));
  if (!id) return;

  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const existing = await getEvent(id);
  if (!existing) return;
  if (existing.author_id !== user.id && user.role !== "admin") {
    redirect(`/dashboard/agenda/${id}`);
  }

  const title = String(formData.get("title") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();
  const location = String(formData.get("location") ?? "").trim();
  const regionRaw = String(formData.get("region") ?? "").trim();
  const region = VALID_REGIONS.has(regionRaw) ? regionRaw : null;
  const priceRaw = String(formData.get("price_eur") ?? "").trim();
  let price_cents: number | null = null;
  if (priceRaw) {
    const cleaned = priceRaw.replace(",", ".");
    const n = Number.parseFloat(cleaned);
    if (Number.isFinite(n) && n >= 0) price_cents = Math.round(n * 100);
  }
  const starts_at = String(formData.get("starts_at") ?? "").trim();
  const ends_at = String(formData.get("ends_at") ?? "").trim();

  if (!title || !starts_at) {
    redirect(`/dashboard/agenda/${id}/bewerken?error=missing`);
  }

  await updateEvent(id, {
    title,
    description: description || null,
    location: location || null,
    region,
    price_cents,
    starts_at: new Date(starts_at).toISOString(),
    ends_at: ends_at ? new Date(ends_at).toISOString() : null,
  });

  revalidatePath(`/dashboard/agenda/${id}`);
  revalidatePath(`/dashboard/agenda`);
  redirect(`/dashboard/agenda/${id}?saved=1`);
}

function toDatetimeLocal(iso: string | null): string {
  if (!iso) return "";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

export default async function EventEditPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ error?: string }>;
}) {
  const { id } = await params;
  const sp = await searchParams;
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const event = await getEvent(id);
  if (!event) notFound();
  if (event.author_id !== user.id && user.role !== "admin") {
    redirect(`/dashboard/agenda/${id}`);
  }

  const errorMsg = sp?.error;
  const priceEur =
    event.price_cents != null && Number.isFinite(Number(event.price_cents))
      ? (Number(event.price_cents) / 100).toFixed(2)
      : "";

  return (
    <article className="px-6 pb-20 pt-12 md:px-12 md:pb-28 md:pt-16 lg:px-20 lg:pt-20">
      <Link
        href={`/dashboard/agenda/${id}`}
        className="inline-flex items-center gap-2 text-[14px] font-medium text-ink-soft transition-colors hover:text-sage"
      >
        ← Terug naar event
      </Link>

      <header className="mt-8">
        <p className="text-[14px] font-medium uppercase tracking-[0.28em] text-ink-muted">
          Event bewerken
        </p>
        <h1 className="mt-4 font-display text-[clamp(2rem,4.5vw,3.5rem)] font-medium leading-[1.05] text-ink">
          {event.title}
        </h1>
      </header>

      {errorMsg ? (
        <div className="mt-8 rounded-2xl border border-red-300/60 bg-red-50/60 p-5 text-[14px] text-red-800">
          {errorMsg === "missing"
            ? "Vul minstens een titel en een datum/tijd in."
            : `Er ging iets mis: ${errorMsg}`}
        </div>
      ) : null}

      <form
        action={updateEventAction}
        className="mt-10 max-w-3xl space-y-8"
      >
        <input type="hidden" name="id" value={event.id} />

        <Field
          id="title"
          label="Titel van het event"
          defaultValue={event.title}
          required
        />

        <Field
          id="location"
          label="Locatie (optioneel)"
          defaultValue={event.location ?? ""}
          help="Stad, adres of omschrijving van de plek."
        />

        <fieldset>
          <legend className="block text-[14px] font-medium text-ink">
            Regio
          </legend>
          <p className="mt-1 text-[13px] text-ink-muted">
            Waar dit event zich afspeelt.
          </p>
          <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {[
              { value: "", label: "Alle regio's" },
              { value: "west-vlaanderen", label: "West-Vlaanderen" },
              { value: "oost-vlaanderen", label: "Oost-Vlaanderen" },
              { value: "antwerpen", label: "Antwerpen" },
              { value: "vlaams-brabant", label: "Vlaams-Brabant" },
            ].map((opt) => (
              <label
                key={opt.value || "all"}
                className="group relative cursor-pointer"
              >
                <input
                  type="radio"
                  name="region"
                  value={opt.value}
                  defaultChecked={(event.region ?? "") === opt.value}
                  className="peer sr-only"
                />
                <div className="relative h-full rounded-2xl border border-ink-hair/70 bg-white/70 px-4 py-3 text-center text-[14px] font-medium text-ink transition-all hover:border-ink/30 peer-checked:border-sage peer-checked:bg-sage/8 peer-checked:shadow-[0_0_0_3px_rgba(125,154,133,0.12)] peer-focus-visible:ring-2 peer-focus-visible:ring-sage/40">
                  {opt.label}
                </div>
              </label>
            ))}
          </div>
        </fieldset>

        <Field
          id="price_eur"
          label="Prijs per persoon (EUR)"
          type="number"
          step="0.01"
          min="0"
          defaultValue={priceEur}
          help="Laat leeg voor gratis events. Partners zien dit bedrag."
        />

        <div className="grid gap-6 md:grid-cols-2">
          <Field
            id="starts_at"
            label="Begint op"
            type="datetime-local"
            defaultValue={toDatetimeLocal(event.starts_at)}
            required
          />
          <Field
            id="ends_at"
            label="Eindigt op (optioneel)"
            type="datetime-local"
            defaultValue={toDatetimeLocal(event.ends_at)}
          />
        </div>

        <TextArea
          id="description"
          label="Beschrijving (optioneel)"
          defaultValue={event.description ?? ""}
          help="Wat staat er gepland? Wie is welkom?"
          rows={6}
        />

        <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:items-center sm:gap-5">
          <button
            type="submit"
            className="inline-flex items-center justify-center gap-3 rounded-full bg-ink px-7 py-4 text-[16px] font-medium text-white transition-colors hover:bg-sage"
          >
            Wijzigingen opslaan
          </button>
          <Link
            href={`/dashboard/agenda/${id}`}
            className="inline-flex items-center justify-center rounded-full border border-ink-hair/70 bg-white/60 px-7 py-4 text-[16px] font-medium text-ink transition-colors hover:border-sage"
          >
            Annuleren
          </Link>
        </div>
      </form>
    </article>
  );
}

function Field({
  id,
  label,
  help,
  type = "text",
  required,
  step,
  min,
  defaultValue,
}: {
  id: string;
  label: string;
  help?: string;
  type?: string;
  required?: boolean;
  step?: string;
  min?: string;
  defaultValue?: string;
}) {
  return (
    <div>
      <label htmlFor={id} className="block text-[14px] font-medium text-ink">
        {label}
        {required ? (
          <span className="ml-1 text-sage" aria-hidden="true">
            *
          </span>
        ) : null}
      </label>
      {help ? <p className="mt-1 text-[13px] text-ink-muted">{help}</p> : null}
      <input
        id={id}
        name={id}
        type={type}
        required={required}
        step={step}
        min={min}
        defaultValue={defaultValue}
        className="mt-3 w-full rounded-xl border border-ink-hair/70 bg-surface-soft/70 px-4 py-3.5 text-[16px] text-ink placeholder:text-ink-muted/60 focus:border-ink focus:outline-none"
      />
    </div>
  );
}

function TextArea({
  id,
  label,
  help,
  rows,
  defaultValue,
}: {
  id: string;
  label: string;
  help?: string;
  rows?: number;
  defaultValue?: string;
}) {
  return (
    <div>
      <label htmlFor={id} className="block text-[14px] font-medium text-ink">
        {label}
      </label>
      {help ? <p className="mt-1 text-[13px] text-ink-muted">{help}</p> : null}
      <textarea
        id={id}
        name={id}
        rows={rows ?? 6}
        defaultValue={defaultValue}
        className="mt-3 w-full resize-y rounded-xl border border-ink-hair/70 bg-surface-soft/70 px-4 py-3.5 text-[16px] leading-[1.6] text-ink placeholder:text-ink-muted/60 focus:border-ink focus:outline-none"
      />
    </div>
  );
}
