import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { requireUser } from "@/lib/auth";
import { createEvent } from "@/lib/queries";

export const metadata: Metadata = {
  title: "Nieuw event",
  robots: { index: false, follow: false },
};

async function createEventAction(formData: FormData) {
  "use server";

  const title = String(formData.get("title") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();
  const location = String(formData.get("location") ?? "").trim();
  const starts_at = String(formData.get("starts_at") ?? "").trim();
  const ends_at = String(formData.get("ends_at") ?? "").trim();

  if (!title || !starts_at) {
    redirect("/dashboard/agenda/nieuw?error=missing");
  }

  const user = await requireUser();

  const id = await createEvent({
    author_id: user.id,
    title,
    description: description || null,
    location: location || null,
    starts_at: new Date(starts_at).toISOString(),
    ends_at: ends_at ? new Date(ends_at).toISOString() : null,
  });

  redirect(`/dashboard/agenda/${id}`);
}

export default async function NewEventPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const params = await searchParams;
  const errorMsg = params?.error;

  return (
    <article className="px-6 pb-20 pt-12 md:px-12 md:pb-28 md:pt-16 lg:px-20 lg:pt-20">
      <Link
        href="/dashboard/agenda"
        className="inline-flex items-center gap-2 text-[14px] font-medium text-ink-soft transition-colors hover:text-sage"
      >
        ← Terug naar de agenda
      </Link>

      <header className="mt-8">
        <p className="text-[14px] font-medium uppercase tracking-[0.28em] text-ink-muted">
          Nieuw event
        </p>
        <h1 className="mt-4 font-display text-[clamp(2rem,4.5vw,3.5rem)] font-medium leading-[1.05] text-ink">
          Voeg een{" "}
          <span className="italic text-sage">event</span> toe.
        </h1>
        <p className="mt-6 max-w-xl text-[16px] leading-[1.65] text-ink-soft">
          Een opendeur, opleiding of partnervergadering — vul de gegevens
          hieronder in.
        </p>
      </header>

      {errorMsg ? (
        <div className="mt-8 rounded-2xl border border-red-300/60 bg-red-50/60 p-5 text-[14px] text-red-800">
          {errorMsg === "missing"
            ? "Vul minstens een titel en een datum/tijd in."
            : `Er ging iets mis: ${errorMsg}`}
        </div>
      ) : null}

      <form action={createEventAction} className="mt-10 max-w-3xl space-y-8">
        <Field
          id="title"
          label="Titel van het event"
          help="Bijvoorbeeld: 'Renocheck Salon Antwerpen'"
          required
        />

        <Field
          id="location"
          label="Locatie (optioneel)"
          help="Stad, adres of omschrijving van de plek."
        />

        <div className="grid gap-6 md:grid-cols-2">
          <Field
            id="starts_at"
            label="Begint op"
            type="datetime-local"
            required
          />
          <Field
            id="ends_at"
            label="Eindigt op (optioneel)"
            type="datetime-local"
          />
        </div>

        <TextArea
          id="description"
          label="Beschrijving (optioneel)"
          help="Wat staat er gepland? Wie is welkom?"
          rows={6}
        />

        <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:items-center sm:gap-5">
          <button
            type="submit"
            className="inline-flex items-center justify-center gap-3 rounded-full bg-ink px-7 py-4 text-[16px] font-medium text-white transition-colors hover:bg-sage"
          >
            Event toevoegen
          </button>
          <Link
            href="/dashboard/agenda"
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
}: {
  id: string;
  label: string;
  help?: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="block text-[14px] font-medium text-ink"
      >
        {label}
        {required ? (
          <span className="ml-1 text-sage" aria-hidden="true">
            *
          </span>
        ) : null}
      </label>
      {help ? (
        <p className="mt-1 text-[13px] text-ink-muted">{help}</p>
      ) : null}
      <input
        id={id}
        name={id}
        type={type}
        required={required}
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
}: {
  id: string;
  label: string;
  help?: string;
  rows?: number;
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="block text-[14px] font-medium text-ink"
      >
        {label}
      </label>
      {help ? (
        <p className="mt-1 text-[13px] text-ink-muted">{help}</p>
      ) : null}
      <textarea
        id={id}
        name={id}
        rows={rows ?? 6}
        className="mt-3 w-full resize-y rounded-xl border border-ink-hair/70 bg-surface-soft/70 px-4 py-3.5 text-[16px] leading-[1.6] text-ink placeholder:text-ink-muted/60 focus:border-ink focus:outline-none"
      />
    </div>
  );
}
