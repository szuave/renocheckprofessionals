import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { requireUser } from "@/lib/auth";
import {
  getUserById,
  listUserCheckinsWithEvents,
  parseRegions,
  parseRubrieken,
} from "@/lib/queries";

export const metadata: Metadata = {
  title: "Partner",
  robots: { index: false, follow: false },
};

const PARTNER_TYPE_LABEL: Record<string, string> = {
  architect: "Architectenbureau",
  vakspecialist: "Vakspecialist",
  bouwondernemer: "Bouwondernemer",
};

const REGION_LABEL: Record<string, string> = {
  "west-vlaanderen": "West-Vlaanderen",
  "oost-vlaanderen": "Oost-Vlaanderen",
  antwerpen: "Antwerpen",
  "vlaams-brabant": "Vlaams-Brabant",
};

function capitalize(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1).replace(/-/g, " ");
}

export default async function PartnerInternalDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const me = await requireUser();
  const { id } = await params;
  const user = await getUserById(id);
  if (!user) notFound();

  const isAdmin = me.role === "admin";
  const isSelf = me.id === user.id;

  const regions = parseRegions(user.regions);
  const allRegions = regions.length > 0
    ? regions
    : user.region
      ? [user.region]
      : [];

  const rubrieken = parseRubrieken(user.rubrieken);
  const allRubrieken = rubrieken.length > 0
    ? rubrieken
    : user.rubriek
      ? [user.rubriek]
      : [];

  const partnerType =
    PARTNER_TYPE_LABEL[user.partner_type ?? ""] ??
    (user.role === "admin" ? "Renocheck team" : "Partner");

  const checkins = await listUserCheckinsWithEvents(id);

  return (
    <article className="px-6 pb-20 pt-12 md:px-12 md:pb-28 md:pt-16 lg:px-20 lg:pt-20">
      <Link
        href="/dashboard/leden"
        className="inline-flex items-center gap-2 text-[14px] font-medium text-ink-soft transition-colors hover:text-sage"
      >
        ← Terug naar partneroverzicht
      </Link>

      <header className="mt-8 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
        <div className="min-w-0">
          <p className="text-[12px] font-medium uppercase tracking-[0.28em] text-ink-muted">
            {partnerType}
            {allRegions.length > 0
              ? ` · ${allRegions.map((r) => REGION_LABEL[r] ?? r).join(", ")}`
              : ""}
          </p>
          <h1 className="mt-4 font-display text-[clamp(2rem,4.5vw,3.5rem)] font-medium leading-[1.05] text-ink">
            {user.full_name ?? user.company ?? user.email}
          </h1>
          {user.company && user.full_name ? (
            <p className="mt-2 text-[16px] text-ink-soft">{user.company}</p>
          ) : null}
        </div>

        {isAdmin || isSelf ? (
          <div className="flex flex-wrap items-center gap-3">
            {user.slug ? (
              <Link
                href={`/${user.slug}`}
                className="inline-flex items-center gap-2 rounded-full border border-ink-hair/70 bg-white/70 px-4 py-2 text-[13px] font-medium text-ink hover:border-sage"
              >
                Bekijk publieke pagina ↗
              </Link>
            ) : null}
            {isAdmin ? (
              <Link
                href={`/dashboard/beheer/${user.id}`}
                className="inline-flex items-center gap-2 rounded-full bg-ink px-4 py-2 text-[13px] font-medium text-white hover:bg-sage"
              >
                Bewerken (admin) →
              </Link>
            ) : null}
          </div>
        ) : null}
      </header>

      <div className="mt-12 grid gap-12 md:grid-cols-12 md:gap-16">
        <section className="md:col-span-7 space-y-8">
          <div className="rounded-3xl border border-ink-hair/60 bg-surface-soft/30 p-7 md:p-8">
            <p className="text-[10px] font-medium uppercase tracking-[0.3em] text-ink-muted">
              Profiel
            </p>
            <dl className="mt-6 grid gap-6 sm:grid-cols-2">
              <Row label="Type partner" value={partnerType} />
              <Row label="E-mail" value={user.email} />
              {allRegions.length > 0 ? (
                <Row
                  label={allRegions.length > 1 ? "Regio's" : "Regio"}
                  value={allRegions
                    .map((r) => REGION_LABEL[r] ?? r)
                    .join(", ")}
                />
              ) : null}
              {allRubrieken.length > 0 ? (
                <Row
                  label={allRubrieken.length > 1 ? "Rubrieken" : "Rubriek"}
                  value={allRubrieken.join(", ")}
                />
              ) : null}
              {user.slug ? (
                <Row label="Publieke URL" value={`/${user.slug}`} />
              ) : null}
              <Row
                label="Aangesloten sinds"
                value={new Date(user.created_at).toLocaleDateString("nl-BE", {
                  day: "2-digit",
                  month: "long",
                  year: "numeric",
                })}
              />
            </dl>
          </div>

          {!user.slug ? (
            <p className="rounded-2xl border border-dashed border-ink-hair/70 p-5 text-[13px] text-ink-muted">
              Deze partner heeft (nog) geen publieke bedrijfspagina.{" "}
              {isAdmin ? (
                <>
                  Ken een slug toe via{" "}
                  <Link
                    href={`/dashboard/beheer/${user.id}`}
                    className="text-sage underline-offset-4 hover:underline"
                  >
                    de beheer-pagina
                  </Link>
                  .
                </>
              ) : null}
            </p>
          ) : null}
        </section>

        <aside className="md:col-span-5 space-y-8">
          <section className="rounded-3xl border border-ink-hair/60 bg-surface-soft/30 p-7">
            <p className="text-[10px] font-medium uppercase tracking-[0.3em] text-ink-muted">
              Aanwezigheid
            </p>
            <h3 className="mt-3 font-display text-[24px] font-medium leading-[1.15] text-ink">
              Ingecheckte{" "}
              <span className="italic text-sage">events</span>
              <span className="text-ink-soft"> ({checkins.length})</span>
            </h3>
            {checkins.length === 0 ? (
              <p className="mt-5 text-[14px] text-ink-muted">
                {isSelf
                  ? "U bent nog niet ingeschreven voor events."
                  : "Deze partner heeft zich nog niet ingeschreven voor events."}
              </p>
            ) : (
              <ul className="mt-5 space-y-3">
                {checkins.map((c) => (
                  <li
                    key={c.event_id}
                    className="rounded-xl border border-ink-hair/60 bg-white/60 p-3"
                  >
                    <Link
                      href={`/dashboard/agenda/${c.event_id}`}
                      className="block"
                    >
                      <p className="text-[14px] font-medium text-ink hover:text-sage">
                        {c.title}
                      </p>
                      <p className="mt-1 text-[12px] text-ink-muted">
                        {new Date(c.starts_at).toLocaleDateString("nl-BE", {
                          day: "2-digit",
                          month: "long",
                          year: "numeric",
                        })}
                        {c.region ? ` · ${capitalize(c.region)}` : ""}
                        {c.location ? ` · ${c.location}` : ""}
                      </p>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </section>
        </aside>
      </div>
    </article>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-[10px] font-medium uppercase tracking-[0.3em] text-ink-muted">
        {label}
      </dt>
      <dd className="mt-2 text-[15px] text-ink">{value}</dd>
    </div>
  );
}
