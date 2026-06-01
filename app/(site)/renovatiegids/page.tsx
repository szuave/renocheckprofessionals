import type { Metadata } from "next";
import Link from "next/link";
import { PillButton } from "@/components/pill-button";
import { BreadcrumbSchema } from "@/components/structured-data";
import { submitLead } from "../actions";

const REGIONS = [
  { name: "West-Vlaanderen", slug: "west-vlaanderen" },
  { name: "Oost-Vlaanderen", slug: "oost-vlaanderen" },
  { name: "Antwerpen", slug: "antwerpen" },
  { name: "Vlaams-Brabant", slug: "vlaams-brabant" },
];

const LIVE_SLUGS = new Set(["dakwerken", "isolatie", "zonnepanelen", "sanitair"]);

const RUBRIEKEN: {
  slug: string;
  name: string;
  blurb: string;
}[] = [
  {
    slug: "dakwerken",
    name: "Dakwerken",
    blurb:
      "Pannen, leien, EPDM en zink — levensduur, isolatiewaarden en premies in 2026.",
  },
  {
    slug: "ramen-en-deuren",
    name: "Ramen & deuren",
    blurb:
      "Hout, alu of pvc, U-waardes en hoe u verlies aan koudebruggen voorkomt.",
  },
  {
    slug: "elektriciteit",
    name: "Elektriciteit",
    blurb:
      "AREI-keuring, laadpaal-voorbereiding en de juiste volgorde met andere vakken.",
  },
  {
    slug: "sanitair",
    name: "Sanitair",
    blurb:
      "Leidingplan, regenwaterrecuperatie en wat een goede ruwbouw-fase oplevert.",
  },
  {
    slug: "verwarming-en-airco",
    name: "Verwarming & airco",
    blurb:
      "Warmtepomp of hybride, geothermie en realistische COP-waarden in Vlaanderen.",
  },
  {
    slug: "tegels-en-natuursteen",
    name: "Tegels & natuursteen",
    blurb:
      "Keramiek, gres en natuursteen — onderhoud, voegwerk en valkuilen bij grote tegels.",
  },
  {
    slug: "schrijnwerk",
    name: "Schrijnwerk",
    blurb:
      "Maatwerk, binnendeuren en trappen — hout, fineer en oplossingen voor kleine ruimtes.",
  },
  {
    slug: "schilderwerken",
    name: "Schilderwerken",
    blurb:
      "Voorbehandeling, latex of krijtverf en hoe u plamuur-werk niet onderschat.",
  },
  {
    slug: "vloeren",
    name: "Vloeren",
    blurb:
      "Beton, parket of pvc — onderlagen, vochtschermen en compatibiliteit met vloerverwarming.",
  },
  {
    slug: "isolatie",
    name: "Isolatie",
    blurb:
      "Spouw, dak en vloer — luchtdichtheid, EPC-impact en de premies van 2026.",
  },
  {
    slug: "tuinaanleg",
    name: "Tuinaanleg",
    blurb:
      "Verharding, beplanting en waterbeheer — minder regenwaterafvoer, meer biodiversiteit.",
  },
  {
    slug: "zonnepanelen",
    name: "Zonnepanelen",
    blurb:
      "Capaciteit, omvormers en batterij — terugverdientijden in het nieuwe nettarief.",
  },
  {
    slug: "zwembaden",
    name: "Zwembaden",
    blurb:
      "Polyester, beton of folie — onderhoud, verwarming en realistische verbruikskosten.",
  },
  {
    slug: "keukens",
    name: "Keukens",
    blurb:
      "Werkbladen, fronten en toestellen — ergonomie, ventilatie en levertijden plannen.",
  },
];

const REASONS: { title: string; body: string }[] = [
  {
    title: "Geen reclame, geen partners-merken",
    body: "Geen verkapte productfolder. De gidsen noemen materialen en methodes — geen merken die ons betalen voor een vermelding.",
  },
  {
    title: "Geschreven met partners op de werf",
    body: "Elke rubriek wordt nagelezen door vakspecialisten uit ons netwerk die er elke dag mee bezig zijn. Geen theorie uit een tekstgenerator.",
  },
  {
    title: "Regio-specifiek waar het telt",
    body: "Premies, EPC-regels en bouwtradities verschillen per Vlaamse regio. We benoemen die verschillen waar ze een impact hebben op uw werf.",
  },
];

export const metadata: Metadata = {
  title: "Renovatiegids",
  description:
    "De Renocheck Renovatiegids: praktische, no-fluff gidsen per rubriek voor Vlaamse bouwers — premies 2026, kostenindicaties en valkuilen, geschreven met onze partners die elke dag op de werf staan.",
  alternates: { canonical: "/renovatiegids" },
  openGraph: {
    title: "Renovatiegids · Renocheck Professionals",
    description:
      "Veertien praktische rubrieken-gidsen voor Vlaamse bouwers — premies 2026, kostenindicaties en valkuilen, geschreven met onze partners.",
    url: "/renovatiegids",
    type: "website",
  },
  twitter: {
    title: "Renovatiegids · Renocheck Professionals",
    description:
      "Veertien rubrieken-gidsen voor Vlaamse bouwers, geschreven met partners die elke dag op de werf staan.",
  },
};

export default async function RenovatiegidsPage({
  searchParams,
}: {
  searchParams: Promise<{ lead?: string }>;
}) {
  const params = await searchParams;
  const leadState = params?.lead ?? null;

  return (
    <article className="relative pt-36 pb-14 sm:pt-44 md:pt-52">
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "/" },
          { name: "Renovatiegids", url: "/renovatiegids" },
        ]}
      />

      <section className="mx-auto max-w-[1280px] px-6 md:px-16 lg:px-24">
        <p className="enter-up delay-300 text-[18px] text-ink-soft">
          Voor wie bouwt of renoveert
        </p>

        <h1 className="enter-up delay-400 mt-6 font-display text-[clamp(3rem,8vw,7rem)] font-medium leading-[0.98] text-ink">
          De Renovatie
          <span className="italic text-sage">gids</span>.
        </h1>

        <p className="enter-up delay-500 mt-8 max-w-2xl text-[17px] leading-[1.65] text-ink-soft md:text-[19px]">
          Veertien rubrieken, één lijn. Praktische gidsen per vak — met
          premies voor 2026, eerlijke kostenindicaties en de valkuilen die
          uw werf duur maken. Geen marketingtekst, wel de vragen die u uw
          aannemer écht moet stellen.
        </p>
      </section>

      <section
        aria-labelledby="index-title"
        className="relative mt-28 md:mt-44"
      >
        <div className="mx-auto max-w-[1280px] px-6 md:px-16 lg:px-24">
          <div className="max-w-2xl">
            <p className="text-[10px] font-medium uppercase tracking-[0.32em] text-ink-muted">
              De rubrieken
            </p>
            <h2
              id="index-title"
              className="mt-4 font-display text-[clamp(2rem,4vw,3.5rem)] font-medium leading-[1.05] text-ink"
            >
              Veertien <span className="italic text-sage">vakken</span>, in
              één lijn.
            </h2>
            <p className="mt-8 text-[16px] leading-[1.7] text-ink-soft md:text-[17px]">
              We publiceren de gidsen één voor één. Vier zijn vandaag
              beschikbaar; de overige tien volgen het komende kwartaal.
            </p>
          </div>

          <ul className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {RUBRIEKEN.map((r) => {
              const live = LIVE_SLUGS.has(r.slug);
              const inner = (
                <>
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="font-display text-[22px] font-medium leading-[1.15] text-ink md:text-[24px]">
                      {r.name}
                    </h3>
                    {live ? (
                      <span
                        aria-hidden="true"
                        className="mt-2 inline-flex h-2 w-2 shrink-0 rounded-full bg-sage"
                      />
                    ) : (
                      <span className="mt-1 shrink-0 rounded-full bg-ink/[0.06] px-3 py-1 text-[10px] font-medium uppercase tracking-[0.22em] text-ink-muted">
                        Binnenkort
                      </span>
                    )}
                  </div>
                  <p className="mt-5 text-[15px] leading-[1.65] text-ink-soft">
                    {r.blurb}
                  </p>
                  {live ? (
                    <span className="mt-8 inline-flex items-center gap-2 text-[13px] font-medium uppercase tracking-[0.22em] text-sage-dark">
                      Lees de gids
                      <svg
                        viewBox="0 0 16 10"
                        className="h-[10px] w-[14px]"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.75"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                      >
                        <path d="M1 5h14M11 1l4 4-4 4" />
                      </svg>
                    </span>
                  ) : null}
                </>
              );

              const baseCard =
                "block h-full rounded-[24px] bg-surface-soft p-7 ring-1 ring-ink-hair/40 transition";

              return (
                <li key={r.slug} className="min-w-0">
                  {live ? (
                    <Link
                      href={`/renovatiegids/${r.slug}`}
                      className={`${baseCard} hover:bg-white hover:ring-ink-hair/70`}
                    >
                      {inner}
                    </Link>
                  ) : (
                    <div
                      aria-disabled="true"
                      className={`${baseCard} cursor-default opacity-80`}
                    >
                      {inner}
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      <section
        aria-labelledby="waarom-title"
        className="relative mt-28 md:mt-44"
      >
        <div className="mx-auto max-w-[1280px] px-6 md:px-16 lg:px-24">
          <div className="max-w-2xl">
            <p className="text-[10px] font-medium uppercase tracking-[0.32em] text-ink-muted">
              Waarom deze gids
            </p>
            <h2
              id="waarom-title"
              className="mt-4 font-display text-[clamp(2rem,4vw,3.5rem)] font-medium leading-[1.05] text-ink"
            >
              Geschreven door wie het{" "}
              <span className="italic text-sage">doet</span>.
            </h2>
          </div>

          <ul className="mt-16 grid gap-10 md:grid-cols-3 md:gap-12">
            {REASONS.map((r, i) => (
              <li key={r.title} className="min-w-0">
                <span className="font-display text-[56px] font-light leading-none text-sage md:text-[72px]">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div
                  aria-hidden="true"
                  className="mt-6 h-px w-12 bg-ink-hair"
                />
                <h3 className="mt-6 font-display text-[24px] font-medium leading-[1.15] text-ink md:text-[28px]">
                  {r.title}
                </h3>
                <p className="mt-5 text-[16px] leading-[1.7] text-ink-soft">
                  {r.body}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section
        id="gids"
        aria-labelledby="pdf-title"
        className="relative mt-28 scroll-mt-24 md:mt-44"
      >
        <div className="mx-auto max-w-[1280px] px-6 md:px-16 lg:px-24">
          <div className="relative overflow-hidden rounded-[32px] bg-surface-warm ring-1 ring-ink-hair/40">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-24 -bottom-24 h-96 w-96 rounded-full bg-sage/25 blur-3xl"
            />

            <div className="relative grid gap-10 p-7 sm:p-10 md:grid-cols-12 md:items-center md:gap-16 md:p-14 lg:p-20">
              <div className="min-w-0 md:col-span-6">
                <p className="text-[10px] font-medium uppercase tracking-[0.32em] text-ink-muted">
                  PDF-samenvatting
                </p>
                <h2
                  id="pdf-title"
                  className="mt-5 font-display text-[clamp(2rem,4.5vw,3.75rem)] font-medium leading-[1.02] text-ink"
                >
                  Krijg de{" "}
                  <span className="italic text-sage">samenvatting</span> in
                  uw mailbox.
                </h2>
                <p className="mt-7 max-w-md text-[16px] leading-[1.7] text-ink-soft md:text-[17px]">
                  Liever niet veertien tabbladen openen? We bundelen de
                  kernpunten van elke rubriek in één PDF — premies 2026,
                  kostenindicaties en de belangrijkste valkuilen.
                </p>

                <ul className="mt-8 space-y-3 text-[15px] text-ink-soft">
                  {[
                    "Eén overzichtelijke PDF voor alle veertien rubrieken",
                    "Premies en EPC-impact per Vlaamse regio",
                    "Een update zodra een nieuwe rubriek-gids live staat",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span
                        aria-hidden="true"
                        className="mt-2 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-sage"
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <form
                action={submitLead}
                className="min-w-0 md:col-span-6 md:max-w-lg md:justify-self-end"
                aria-label="Ontvang de PDF-samenvatting van de Renovatiegids"
              >
                <input
                  type="hidden"
                  name="source"
                  value="renovatiegids-pillar"
                />
                <input
                  type="hidden"
                  name="next"
                  value="/renovatiegids"
                />

                <div className="rounded-[28px] bg-surface-soft/85 p-6 ring-1 ring-ink-hair/50 backdrop-blur sm:p-8">
                  {leadState === "ok" ? (
                    <div className="mb-6 rounded-2xl border border-sage/40 bg-sage/10 p-5 text-[14px] text-ink">
                      Bedankt — we sturen de samenvatting naar uw mailbox.
                      Geen mail ontvangen? Check uw spam-map of mail{" "}
                      <a
                        className="font-medium underline-offset-4 hover:text-sage hover:underline"
                        href="mailto:info@renocheck.be"
                      >
                        info@renocheck.be
                      </a>
                      .
                    </div>
                  ) : leadState ? (
                    <div className="mb-6 rounded-2xl border border-red-300/60 bg-red-50/60 p-5 text-[14px] text-red-800">
                      {leadState === "missing"
                        ? "Vul uw e-mailadres in."
                        : leadState === "email"
                          ? "Vul een geldig e-mailadres in."
                          : "Er ging iets mis. Probeer het opnieuw."}
                    </div>
                  ) : null}

                  <p className="text-[10px] font-medium uppercase tracking-[0.32em] text-ink-muted">
                    Ontvang de PDF
                  </p>
                  <h3 className="mt-4 font-display text-[26px] font-medium leading-[1.15] text-ink">
                    In uw mailbox, direct.
                  </h3>

                  <div className="mt-8 space-y-6">
                    <LeadField
                      id="first_name"
                      label="Voornaam"
                      placeholder="Jane"
                    />
                    <LeadField
                      id="email"
                      label="E-mailadres"
                      type="email"
                      placeholder="u@voorbeeld.be"
                      required
                    />
                    <div>
                      <label
                        htmlFor="region"
                        className="text-[10px] font-medium uppercase tracking-[0.3em] text-ink-muted"
                      >
                        Regio (optioneel)
                      </label>
                      <select
                        id="region"
                        name="region"
                        defaultValue=""
                        className="mt-3 w-full appearance-none border-0 border-b border-ink-hair bg-transparent px-0 py-2 text-base text-ink focus:border-ink focus:outline-none"
                      >
                        <option value="">Kies een regio</option>
                        {REGIONS.map((r) => (
                          <option key={r.slug} value={r.slug}>
                            {r.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <p className="text-[12px] leading-[1.6] text-ink-muted">
                      We mailen u de samenvatting en een seintje wanneer
                      een nieuwe rubriek-gids live staat. Uitschrijven kan
                      altijd.
                    </p>

                    <div className="pt-2">
                      <PillButton type="submit">
                        Stuur me de PDF
                      </PillButton>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </article>
  );
}

function LeadField({
  id,
  label,
  type = "text",
  placeholder,
  required,
}: {
  id: string;
  label: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="text-[10px] font-medium uppercase tracking-[0.3em] text-ink-muted"
      >
        {label}
        {required ? <span className="ml-1 text-sage">*</span> : null}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        placeholder={placeholder}
        required={required}
        className="mt-3 w-full border-0 border-b border-ink-hair bg-transparent px-0 py-2 text-base text-ink placeholder:text-ink-muted/60 focus:border-ink focus:outline-none"
      />
    </div>
  );
}
