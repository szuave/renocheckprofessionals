import type { Metadata } from "next";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/auth";
import {
  getUserById,
  listUserCheckins,
  parseRegions,
  updateUserProfile,
} from "@/lib/queries";
import { validateSlug } from "@/lib/slugs";

export const metadata: Metadata = {
  title: "Partner bewerken",
  robots: { index: false, follow: false },
};

const RUBRIEKEN = [
  "Dakwerken",
  "Ramen & deuren",
  "Elektriciteit",
  "Sanitair",
  "Verwarming & airco",
  "Tegels & natuursteen",
  "Schrijnwerk",
  "Schilderwerken",
  "Vloeren",
  "Isolatie",
  "Tuinaanleg",
  "Zonnepanelen",
  "Zwembaden",
  "Keukens",
];

const REGIONS = [
  "west-vlaanderen",
  "oost-vlaanderen",
  "antwerpen",
  "vlaams-brabant",
];

async function updateUserAction(formData: FormData) {
  "use server";
  await requireAdmin();
  const id = String(formData.get("id"));
  if (!id) return;

  const full_name = String(formData.get("full_name") ?? "").trim();
  const company = String(formData.get("company") ?? "").trim();
  const regions = formData
    .getAll("regions")
    .map((r) => String(r).trim())
    .filter(Boolean);
  const rubriek = String(formData.get("rubriek") ?? "").trim();
  const partner_type = String(formData.get("partner_type") ?? "").trim();
  const slugRaw = String(formData.get("slug") ?? "").trim().toLowerCase();

  let slug: string | null = null;
  if (slugRaw) {
    const err = validateSlug(slugRaw);
    if (err) redirect(`/dashboard/beheer/${id}?error=${encodeURIComponent(err)}`);
    slug = slugRaw;
  }

  try {
    await updateUserProfile(id, {
      full_name: full_name || null,
      company: company || null,
      region: regions[0] ?? null,
      regions: regions.length > 0 ? regions : null,
      rubriek: rubriek || null,
      partner_type: partner_type || null,
      slug,
    });
  } catch (err) {
    const msg = err instanceof Error ? err.message : "onbekend";
    const code = msg.includes("UNIQUE") ? "duplicate-slug" : msg;
    redirect(`/dashboard/beheer/${id}?error=${encodeURIComponent(code)}`);
  }

  revalidatePath(`/dashboard/beheer/${id}`);
  revalidatePath(`/dashboard/beheer`);
  redirect(`/dashboard/beheer/${id}?saved=1`);
}

export default async function UserDetailPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ error?: string; saved?: string }>;
}) {
  await requireAdmin();
  const { id } = await params;
  const sp = await searchParams;
  const user = await getUserById(id);
  if (!user) notFound();

  const userRegions = parseRegions(user.regions);
  const fallbackRegions = userRegions.length > 0
    ? userRegions
    : user.region
      ? [user.region]
      : [];
  const checkinIds = await listUserCheckins(id);

  const errorMsg = sp?.error;
  const savedMsg = sp?.saved === "1";

  return (
    <article className="px-6 pb-20 pt-12 md:px-12 md:pb-28 md:pt-16 lg:px-20 lg:pt-20">
      <Link
        href="/dashboard/beheer"
        className="inline-flex items-center gap-2 text-[14px] font-medium text-ink-soft transition-colors hover:text-sage"
      >
        ← Terug naar partneroverzicht
      </Link>

      <header className="mt-8">
        <p className="text-[14px] font-medium uppercase tracking-[0.28em] text-ink-muted">
          Partner bewerken
        </p>
        <h1 className="mt-4 font-display text-[clamp(2rem,4.5vw,3.5rem)] font-medium leading-[1.05] text-ink">
          {user.full_name ?? user.company ?? user.email}
        </h1>
        <p className="mt-2 text-[14px] text-ink-muted">
          {user.email} · rol: <span className="text-ink">{user.role}</span>
          {user.slug ? (
            <>
              {" "}· publieke pagina:{" "}
              <Link
                href={`/${user.slug}`}
                className="text-sage underline-offset-4 hover:underline"
              >
                /{user.slug}
              </Link>
            </>
          ) : null}
        </p>
      </header>

      {savedMsg ? (
        <div className="mt-6 rounded-2xl border border-sage/40 bg-sage/10 p-5 text-[14px] text-ink">
          Wijzigingen opgeslagen.
        </div>
      ) : null}
      {errorMsg ? (
        <div className="mt-6 rounded-2xl border border-red-300/60 bg-red-50/60 p-5 text-[14px] text-red-800">
          {errorMsg === "duplicate-slug"
            ? "Deze slug is al in gebruik door een andere partner."
            : `Er ging iets mis: ${errorMsg}`}
        </div>
      ) : null}

      <div className="mt-12 grid gap-12 md:grid-cols-12 md:gap-16">
        <form
          action={updateUserAction}
          className="md:col-span-7 max-w-3xl space-y-6"
        >
          <input type="hidden" name="id" value={user.id} />

          <Field id="full_name" label="Naam" defaultValue={user.full_name ?? ""} />
          <Field id="company" label="Bedrijf" defaultValue={user.company ?? ""} />

          <Select
            id="partner_type"
            label="Type partner"
            defaultValue={user.partner_type ?? ""}
            options={[
              { value: "", label: "—" },
              { value: "architect", label: "Architect" },
              { value: "vakspecialist", label: "Vakspecialist" },
              { value: "bouwondernemer", label: "Bouwondernemer" },
            ]}
          />

          <div>
            <span className="block text-[14px] font-medium text-ink">
              Regio's
            </span>
            <p className="mt-1 text-[13px] text-ink-muted">
              Selecteer alle regio's waar deze partner actief is.
            </p>
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              {REGIONS.map((r) => (
                <label
                  key={r}
                  className="flex items-center gap-3 rounded-xl border border-ink-hair/70 bg-white/60 px-4 py-3 text-[14px] text-ink hover:border-sage"
                >
                  <input
                    type="checkbox"
                    name="regions"
                    value={r}
                    defaultChecked={fallbackRegions.includes(r)}
                    className="h-4 w-4 accent-sage"
                  />
                  {capitalize(r)}
                </label>
              ))}
            </div>
          </div>

          <Select
            id="rubriek"
            label="Rubriek (vakspecialisten)"
            defaultValue={user.rubriek ?? ""}
            options={[
              { value: "", label: "—" },
              ...RUBRIEKEN.map((r) => ({ value: r, label: r })),
            ]}
          />

          <Field
            id="slug"
            label="Publieke URL-slug"
            defaultValue={user.slug ?? ""}
            help="Wordt het URL-fragment van hun bedrijfspagina (renocheckprofessionals.be/<slug>). Lowercase letters, cijfers en koppeltekens. Leeg = geen publieke pagina."
          />

          <button
            type="submit"
            className="inline-flex items-center justify-center gap-3 rounded-full bg-ink px-7 py-4 text-[16px] font-medium text-white transition-colors hover:bg-sage"
          >
            Wijzigingen opslaan
          </button>
        </form>

        <aside className="md:col-span-5 space-y-8">
          <section className="rounded-3xl border border-ink-hair/60 bg-surface-soft/30 p-7">
            <p className="text-[10px] font-medium uppercase tracking-[0.3em] text-ink-muted">
              Koppelingen
            </p>
            <h3 className="mt-3 font-display text-[24px] font-medium leading-[1.15] text-ink">
              Externe systemen.
            </h3>
            <ul className="mt-6 space-y-3">
              <li className="flex items-center justify-between gap-3 rounded-xl border border-ink-hair/60 bg-white/60 px-4 py-3 text-[14px]">
                <div className="min-w-0">
                  <p className="font-medium text-ink">Billit</p>
                  <p className="text-[12px] text-ink-muted">
                    Factuur-integratie
                  </p>
                </div>
                <span className="shrink-0 rounded-full bg-ink/5 px-3 py-1 text-[11px] uppercase tracking-[0.2em] text-ink-muted">
                  Binnenkort
                </span>
              </li>
              <li className="flex items-center justify-between gap-3 rounded-xl border border-ink-hair/60 bg-white/60 px-4 py-3 text-[14px]">
                <div className="min-w-0">
                  <p className="font-medium text-ink">Bedrijfspagina</p>
                  <p className="text-[12px] text-ink-muted">
                    Publieke landingspagina
                  </p>
                </div>
                {user.slug ? (
                  <Link
                    href={`/${user.slug}`}
                    className="shrink-0 rounded-full bg-sage/10 px-3 py-1 text-[11px] uppercase tracking-[0.2em] text-sage hover:bg-sage/20"
                  >
                    Bekijken
                  </Link>
                ) : (
                  <span className="shrink-0 rounded-full bg-ink/5 px-3 py-1 text-[11px] uppercase tracking-[0.2em] text-ink-muted">
                    Geen slug
                  </span>
                )}
              </li>
            </ul>
          </section>

          <section className="rounded-3xl border border-ink-hair/60 bg-surface-soft/30 p-7">
            <p className="text-[10px] font-medium uppercase tracking-[0.3em] text-ink-muted">
              Aanwezigheid
            </p>
            <h3 className="mt-3 font-display text-[24px] font-medium leading-[1.15] text-ink">
              Ingecheckte events.
            </h3>
            {checkinIds.length === 0 ? (
              <p className="mt-5 text-[14px] text-ink-muted">
                Deze partner heeft zich nog niet ingeschreven voor events.
              </p>
            ) : (
              <p className="mt-5 text-[14px] text-ink">
                Ingeschreven voor{" "}
                <span className="font-medium text-sage">
                  {checkinIds.length}
                </span>{" "}
                event{checkinIds.length === 1 ? "" : "s"}.{" "}
                <Link
                  href="/dashboard/agenda"
                  className="text-sage underline-offset-4 hover:underline"
                >
                  Open agenda →
                </Link>
              </p>
            )}
          </section>

          <section className="rounded-3xl border border-ink-hair/60 bg-surface-soft/30 p-7">
            <p className="text-[10px] font-medium uppercase tracking-[0.3em] text-ink-muted">
              Account info
            </p>
            <dl className="mt-5 space-y-3 text-[14px]">
              <Row label="Aangemaakt op" value={formatDate(user.created_at)} />
              <Row label="Rol" value={user.role} />
              <Row label="E-mail" value={user.email} />
            </dl>
          </section>
        </aside>
      </div>
    </article>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <dt className="text-ink-muted">{label}</dt>
      <dd className="font-medium text-ink">{value}</dd>
    </div>
  );
}

function Field({
  id,
  label,
  defaultValue,
  help,
}: {
  id: string;
  label: string;
  defaultValue?: string;
  help?: string;
}) {
  return (
    <div>
      <label htmlFor={id} className="block text-[14px] font-medium text-ink">
        {label}
      </label>
      {help ? (
        <p className="mt-1 text-[13px] text-ink-muted">{help}</p>
      ) : null}
      <input
        id={id}
        name={id}
        type="text"
        defaultValue={defaultValue}
        className="mt-3 w-full rounded-xl border border-ink-hair/70 bg-white/70 px-4 py-3 text-[15px] text-ink placeholder:text-ink-muted/60 focus:border-sage focus:outline-none"
      />
    </div>
  );
}

function Select({
  id,
  label,
  defaultValue,
  options,
}: {
  id: string;
  label: string;
  defaultValue?: string;
  options: { value: string; label: string }[];
}) {
  return (
    <div>
      <label htmlFor={id} className="block text-[14px] font-medium text-ink">
        {label}
      </label>
      <select
        id={id}
        name={id}
        defaultValue={defaultValue}
        className="mt-3 w-full rounded-xl border border-ink-hair/70 bg-white/70 px-4 py-3 text-[15px] text-ink focus:border-sage focus:outline-none"
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </div>
  );
}

function capitalize(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1).replace(/-/g, " ");
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("nl-BE", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}
