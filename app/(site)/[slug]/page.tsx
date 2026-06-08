import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BreadcrumbSchema } from "@/components/structured-data";
import { getUserBySlug, parseRegions, parseRubrieken } from "@/lib/queries";
import { RESERVED_SLUGS } from "@/lib/slugs";

export const dynamic = "force-dynamic";

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

const REGION_CITIES: Record<string, string[]> = {
  "west-vlaanderen": ["Brugge", "Kortrijk", "Roeselare", "Oostende"],
  "oost-vlaanderen": ["Gent", "Aalst", "Sint-Niklaas", "Dendermonde"],
  antwerpen: ["Antwerpen", "Mechelen", "Turnhout", "Lier"],
  "vlaams-brabant": ["Leuven", "Vilvoorde", "Halle", "Tienen"],
};

async function fetchPartner(slug: string) {
  const s = slug.toLowerCase();
  if (RESERVED_SLUGS.has(s)) return null;
  return getUserBySlug(s);
}

function getInitials(name: string): string {
  return name
    .split(/\s+/)
    .map((part) => part.charAt(0))
    .filter(Boolean)
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const user = await fetchPartner(slug);
  if (!user) return { title: "Pagina niet gevonden" };
  const title = user.company ?? user.full_name ?? "Partner";
  const regions = parseRegions(user.regions);
  const regionList =
    regions.length > 0
      ? regions.map((r) => REGION_LABEL[r] ?? r).join(", ")
      : user.region
        ? REGION_LABEL[user.region] ?? user.region
        : "Vlaanderen";
  const rubrieken = parseRubrieken(user.rubrieken);
  const rubriekenSummary =
    rubrieken.length > 0
      ? rubrieken.join(", ")
      : user.rubriek ?? null;
  const description = `${title} — ${PARTNER_TYPE_LABEL[user.partner_type ?? ""] ?? "Partner"} binnen het Renocheck Professionals netwerk. Actief in ${regionList}.${rubriekenSummary ? ` ${rubrieken.length > 1 ? "Rubrieken" : "Rubriek"}: ${rubriekenSummary}.` : ""}`;
  return {
    title: `${title} — Renocheck Professionals`,
    description,
    alternates: { canonical: `/${slug}` },
    openGraph: {
      title: `${title} — Renocheck Professionals`,
      description,
      url: `/${slug}`,
      type: "profile",
    },
    twitter: {
      title: `${title} — Renocheck Professionals`,
      description,
    },
  };
}

export default async function PartnerPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const user = await fetchPartner(slug);
  if (!user) notFound();

  const partnerType =
    PARTNER_TYPE_LABEL[user.partner_type ?? ""] ?? "Partner";
  const name = user.company ?? user.full_name ?? "Partner";
  const initials = getInitials(name);
  const regions = parseRegions(user.regions);
  const regionList =
    regions.length > 0
      ? regions
      : user.region
        ? [user.region]
        : [];
  const rubrieken = parseRubrieken(user.rubrieken);
  const rubriekenList =
    rubrieken.length > 0
      ? rubrieken
      : user.rubriek
        ? [user.rubriek]
        : [];

  const primaryRegion = regionList[0] ?? "west-vlaanderen";
  const primaryCities =
    REGION_CITIES[primaryRegion] ?? REGION_CITIES["west-vlaanderen"];

  const joinedDate = user.created_at
    ? new Date(user.created_at).toLocaleDateString("nl-BE", {
        month: "long",
        year: "numeric",
      })
    : null;

  return (
    <article className="relative pt-32 pb-14 sm:pt-40 md:pt-48">
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "/" },
          { name: name, url: `/${slug}` },
        ]}
      />

      {/* HERO */}
      <section className="mx-auto max-w-[1180px] px-6 md:px-12 lg:px-20">
        <div className="flex flex-wrap items-center gap-3">
          <span className="inline-flex items-center gap-2 rounded-full bg-sage/12 px-3 py-1.5 text-[11px] font-medium uppercase tracking-[0.22em] text-sage-dark">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-3 w-3"
              aria-hidden="true"
            >
              <path d="M20 6L9 17l-5-5" />
            </svg>
            Geverifieerde partner
          </span>
          <span className="text-[11px] font-medium uppercase tracking-[0.28em] text-ink-muted">
            {partnerType}
          </span>
        </div>

        <div className="mt-7 grid items-end gap-10 md:grid-cols-[1fr_auto] md:gap-12">
          <div>
            <h1 className="font-display text-[clamp(2.5rem,6.5vw,5.25rem)] font-medium leading-[0.98] text-ink">
              {name}
            </h1>

            {user.full_name && user.company ? (
              <p className="mt-5 text-[15px] font-medium uppercase tracking-[0.2em] text-ink-muted">
                Contact · {user.full_name}
              </p>
            ) : null}

            <p className="mt-6 max-w-2xl text-[17px] leading-[1.6] text-ink-soft md:text-[18.5px]">
              {name} is een geselecteerde partner binnen het Renocheck
              Professionals netwerk — een gesloten kring van architectenbureaus,
              vakspecialisten en bouwondernemers die per regio met elkaar
              samenwerken. Eén partner per rubriek per regio, gekozen op
              vakmanschap.
            </p>
          </div>

          {/* Avatar circle */}
          <div className="flex shrink-0 items-center justify-center">
            <div
              aria-hidden="true"
              className="relative flex h-32 w-32 items-center justify-center rounded-full bg-gradient-to-br from-sage/25 via-sage/15 to-surface-soft text-sage-dark ring-1 ring-sage/30 md:h-40 md:w-40"
            >
              <span className="font-display text-[44px] font-medium tracking-tight md:text-[56px]">
                {initials || "—"}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* TRUST STRIP */}
      <section className="mx-auto mt-14 max-w-[1180px] px-6 md:mt-20 md:px-12 lg:px-20">
        <div className="grid divide-y divide-ink-hair/40 rounded-3xl border border-ink-hair/50 bg-surface-soft/30 md:grid-cols-4 md:divide-x md:divide-y-0">
          <TrustCell
            label="Status"
            value="Actief lid"
            sub="Sinds toetreding"
          />
          <TrustCell
            label="Selectie"
            value="Eén per rubriek"
            sub="per regio"
          />
          <TrustCell
            label="Lid sinds"
            value={joinedDate ?? "—"}
            sub="Renocheck Professionals"
          />
          <TrustCell
            label="Geverifieerd door"
            value="Renocheck"
            sub="Maxime Villa"
          />
        </div>
      </section>

      {/* DETAIL BODY */}
      <section className="mx-auto mt-16 max-w-[1180px] px-6 md:mt-24 md:px-12 lg:px-20">
        <div className="grid gap-12 md:grid-cols-12 md:gap-16">
          {/* Left column — about */}
          <div className="min-w-0 md:col-span-7">
            <div className="flex items-center gap-3">
              <span aria-hidden="true" className="h-px w-6 bg-sage/70" />
              <p className="text-[10px] font-semibold uppercase tracking-[0.36em] text-ink-muted">
                Over de partner
              </p>
            </div>

            <h2 className="mt-5 font-display text-[clamp(1.75rem,3.5vw,2.5rem)] font-medium leading-[1.1] text-ink">
              Onderdeel van een{" "}
              <span className="italic text-sage">gesloten kring</span>.
            </h2>

            <div className="mt-6 space-y-5 text-[16px] leading-[1.75] text-ink-soft md:text-[17px]">
              <p>
                {name} werd opgenomen in het Renocheck Professionals netwerk
                na een selectie op vakmanschap, klantgerichtheid en
                samenwerking met de andere partners. Geen platform voor leads
                — een onderling vertrouwd netwerk waar architecten,
                vakspecialisten en bouwondernemers elkaar kennen.
              </p>
              <p>
                Binnen het netwerk wordt actief samengewerkt met de andere
                geselecteerde partners in {regionList.length > 0
                  ? regionList
                      .map((r) => REGION_LABEL[r] ?? r)
                      .join(", ")
                  : "Vlaanderen"}
                . Renovatie en bouw gebeuren met partijen die elkaars werk
                kennen en respecteren.
              </p>
            </div>

            {/* Rubrieken chips */}
            {rubriekenList.length > 0 ? (
              <div className="mt-10">
                <p className="text-[10px] font-semibold uppercase tracking-[0.32em] text-ink-muted">
                  Specialisatie{rubriekenList.length > 1 ? "s" : ""}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {rubriekenList.map((r) => (
                    <span
                      key={r}
                      className="inline-flex items-center gap-2 rounded-full border border-sage/40 bg-sage/8 px-3.5 py-1.5 text-[13px] font-medium text-sage-dark"
                    >
                      <span
                        aria-hidden="true"
                        className="inline-block h-1.5 w-1.5 rounded-full bg-sage"
                      />
                      {r}
                    </span>
                  ))}
                </div>
              </div>
            ) : null}

            {/* Regions chips with cities */}
            {regionList.length > 0 ? (
              <div className="mt-10">
                <p className="text-[10px] font-semibold uppercase tracking-[0.32em] text-ink-muted">
                  Werkgebied
                </p>
                <div className="mt-4 space-y-4">
                  {regionList.map((r) => {
                    const cities = REGION_CITIES[r] ?? [];
                    return (
                      <div
                        key={r}
                        className="rounded-2xl border border-ink-hair/50 bg-white/60 p-4"
                      >
                        <div className="flex flex-wrap items-baseline justify-between gap-2">
                          <p className="font-display text-[18px] font-medium text-ink">
                            {REGION_LABEL[r] ?? r}
                          </p>
                          <Link
                            href={`/regio/${r}`}
                            className="text-[12px] font-medium uppercase tracking-[0.2em] text-sage hover:text-sage-dark"
                          >
                            Regio bekijken →
                          </Link>
                        </div>
                        {cities.length > 0 ? (
                          <p className="mt-2 text-[13.5px] text-ink-soft">
                            o.a. {cities.join(" · ")}
                          </p>
                        ) : null}
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : null}
          </div>

          {/* Right column — sticky contact card */}
          <aside className="min-w-0 md:col-span-5">
            <div className="sticky top-28 space-y-6">
              <div className="rounded-3xl border border-ink-hair/60 bg-gradient-to-b from-white to-surface-soft/40 p-7 shadow-[0_4px_24px_-12px_rgba(15,23,20,0.18)]">
                <p className="text-[10px] font-semibold uppercase tracking-[0.36em] text-ink-muted">
                  Direct contact
                </p>
                <p className="mt-4 font-display text-[22px] font-medium leading-tight text-ink">
                  Een vraag voor {user.full_name ?? name}?
                </p>
                <p className="mt-3 text-[14.5px] leading-[1.65] text-ink-soft">
                  Stuur uw bericht via het centrale Renocheck contactformulier.
                  Wij sturen het door en houden de communicatie binnen het
                  netwerk transparant.
                </p>

                <Link
                  href="/contact?subject=question"
                  className="mt-6 inline-flex w-full items-center justify-between gap-2 rounded-full bg-ink px-5 py-3.5 text-[14px] font-medium text-white transition-colors hover:bg-sage"
                >
                  <span>Contact opnemen</span>
                  <span aria-hidden="true">→</span>
                </Link>

                <p className="mt-5 border-t border-ink-hair/50 pt-5 text-[12px] leading-[1.55] text-ink-muted">
                  Renocheck Professionals zorgt voor de juiste doorverwijzing —
                  uw vraag komt rechtstreeks bij {name} terecht.
                </p>
              </div>

              {/* Renocheck Professionals trust block */}
              <div className="rounded-3xl border border-ink-hair/60 bg-white/60 p-7">
                <div className="flex items-center gap-3">
                  <span
                    aria-hidden="true"
                    className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-ink text-white"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-4 w-4"
                    >
                      <path d="M12 2l9 4.5v6.75c0 4.97-3.85 9.36-9 10.75-5.15-1.39-9-5.78-9-10.75V6.5L12 2z" />
                    </svg>
                  </span>
                  <p className="font-display text-[17px] font-medium leading-tight text-ink">
                    Geselecteerd door Renocheck
                  </p>
                </div>
                <p className="mt-3 text-[13.5px] leading-[1.65] text-ink-soft">
                  Eén partner per rubriek per regio. Geen lead-veiling,
                  geen pay-per-click. Selectie op vakmanschap door Maxime
                  Villa en het selectiecomité.
                </p>
                <Link
                  href="/over-ons"
                  className="mt-4 inline-flex items-center gap-2 text-[13px] font-medium uppercase tracking-[0.22em] text-sage hover:text-sage-dark"
                >
                  Selectiemethode →
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </section>

      {/* CITY CHIPS */}
      <section className="mx-auto mt-20 max-w-[1180px] px-6 md:mt-28 md:px-12 lg:px-20">
        <div className="rounded-3xl border border-ink-hair/50 bg-surface-soft/40 p-8 md:p-12">
          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.36em] text-ink-muted">
                Aanwezig in {REGION_LABEL[primaryRegion] ?? primaryRegion}
              </p>
              <h3 className="mt-3 font-display text-[clamp(1.5rem,2.8vw,2rem)] font-medium leading-tight text-ink">
                Steden waar het netwerk{" "}
                <span className="italic text-sage">actief</span> is.
              </h3>
            </div>
            <Link
              href={`/regio/${primaryRegion}`}
              className="inline-flex items-center gap-2 rounded-full border border-ink-hair/70 bg-white px-4 py-2.5 text-[13px] font-medium text-ink transition-colors hover:border-sage hover:text-sage"
            >
              Volledige regio →
            </Link>
          </div>

          <div className="mt-7 flex flex-wrap gap-2">
            {primaryCities.map((city) => (
              <span
                key={city}
                className="inline-flex items-center rounded-full border border-ink-hair/70 bg-white px-4 py-2 text-[13px] font-medium text-ink-soft"
              >
                {city}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Closing CTA bar */}
      <section className="mx-auto mt-16 max-w-[1180px] px-6 md:mt-20 md:px-12 lg:px-20">
        <div className="flex flex-col items-start justify-between gap-6 border-t border-ink-hair/40 pt-10 md:flex-row md:items-center md:pt-12">
          <p className="max-w-2xl text-[15.5px] leading-[1.6] text-ink-soft md:text-[16.5px]">
            <span className="font-medium text-ink">
              Zelf partner worden van het netwerk?
            </span>{" "}
            Renocheck Professionals selecteert per Vlaamse regio één
            architectenbureau en één vakspecialist per rubriek.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-full border border-ink-hair/70 bg-white px-5 py-3 text-[14px] font-medium text-ink transition-colors hover:border-sage"
            >
              ← Het netwerk
            </Link>
            <Link
              href="/contact?subject=membership"
              className="inline-flex items-center gap-2 rounded-full bg-sage px-5 py-3 text-[14px] font-medium text-white transition-colors hover:bg-sage-dark"
            >
              Partner worden
            </Link>
          </div>
        </div>
      </section>
    </article>
  );
}

function TrustCell({
  label,
  value,
  sub,
}: {
  label: string;
  value: string;
  sub: string;
}) {
  return (
    <div className="p-6 md:p-7">
      <p className="text-[10px] font-semibold uppercase tracking-[0.32em] text-ink-muted">
        {label}
      </p>
      <p className="mt-3 font-display text-[20px] font-medium leading-tight text-ink md:text-[22px]">
        {value}
      </p>
      <p className="mt-1.5 text-[12.5px] text-ink-muted">{sub}</p>
    </div>
  );
}
