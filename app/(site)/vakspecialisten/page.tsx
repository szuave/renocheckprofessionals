import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PillLink } from "@/components/pill-button";
import { BreadcrumbSchema } from "@/components/structured-data";

export const metadata: Metadata = {
  title: "Vakspecialisten",
  description:
    "Per regio in Vlaanderen één vakspecialist per rubriek — van dakwerken tot zonnepanelen. Veertien rubrieken, één gedeelde standaard.",
  alternates: { canonical: "/vakspecialisten" },
  openGraph: {
    title: "Vakspecialisten · Renocheck Professionals",
    description:
      "Veertien rubrieken, één vakspecialist per regio — vakkennis op maat van uw bouwproject.",
    url: "/vakspecialisten",
    type: "website",
  },
  twitter: {
    title: "Vakspecialisten · Renocheck Professionals",
    description:
      "Veertien rubrieken, één vakspecialist per regio.",
  },
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
  { name: "West-Vlaanderen", slug: "west-vlaanderen" },
  { name: "Oost-Vlaanderen", slug: "oost-vlaanderen" },
  { name: "Antwerpen", slug: "antwerpen" },
  { name: "Vlaams-Brabant", slug: "vlaams-brabant" },
];

export default function VakspecialistenPage() {
  return (
    <article className="relative pt-36 pb-14 sm:pt-44 md:pt-52">
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "/" },
          { name: "Vakspecialisten", url: "/vakspecialisten" },
        ]}
      />

      <section className="mx-auto max-w-[1280px] px-6 md:px-16 lg:px-24">
        <p className="enter-up delay-300 text-[18px] text-ink-soft">
          Vakspecialisten
        </p>

        <h1 className="enter-up delay-400 mt-6 font-display text-[clamp(3rem,8vw,7rem)] font-medium leading-[0.98] text-ink">
          Veertien rubrieken,<br />
          <span className="italic text-sage">één</span> standaard.
        </h1>

        <p className="enter-up delay-500 mt-8 max-w-xl text-[17px] leading-[1.65] text-ink-soft md:text-[19px]">
          Per regio nemen we één vakspecialist op per rubriek. Veertien
          stuks — van dakwerken tot zonnepanelen — die elkaar kennen en
          samen een werf gezond houden.
        </p>
      </section>

      <section className="relative mt-28 md:mt-44">
        <div className="mx-auto max-w-[1280px] px-6 md:px-16 lg:px-24">
          <div className="grid gap-14 md:grid-cols-12 md:items-center md:gap-16">
            <div className="min-w-0 md:col-span-5">
              <p className="text-[18px] text-ink-soft">Wat we dekken</p>
              <h2 className="mt-6 font-display text-[clamp(2rem,4vw,3.5rem)] font-medium leading-[1.05] text-ink">
                De{" "}
                <span className="italic text-sage">veertien</span>{" "}
                rubrieken.
              </h2>
              <p className="mt-8 max-w-md text-[17px] leading-[1.7] text-ink-soft md:text-[18px]">
                Renocheck dekt de essentiële vakken voor een renovatie- of
                nieuwbouwproject. Eén persoon per vak, per regio.
              </p>
            </div>

            <ul className="min-w-0 md:col-span-7">
              <div className="grid grid-cols-2 gap-x-8 gap-y-3 sm:grid-cols-3 md:gap-y-4">
                {RUBRIEKEN.map((r, i) => (
                  <li
                    key={r}
                    className="flex items-baseline gap-3 border-b border-ink-hair/40 py-3 text-[15px] text-ink md:py-4 md:text-[16px]"
                  >
                    <span className="text-[10px] font-medium tabular-nums text-ink-muted">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {r}
                  </li>
                ))}
              </div>
            </ul>
          </div>
        </div>
      </section>

      <section
        aria-labelledby="regions-title"
        className="relative mt-28 md:mt-44"
      >
        <div className="mx-auto max-w-[1280px] px-6 md:px-16 lg:px-24">
          <div className="grid gap-14 md:grid-cols-12 md:items-end md:gap-16">
            <div className="min-w-0 md:col-span-5">
              <p className="text-[10px] font-medium uppercase tracking-[0.32em] text-ink-muted">
                Per regio
              </p>
              <h2
                id="regions-title"
                className="mt-4 font-display text-[clamp(2rem,4vw,3.5rem)] font-medium leading-[1.05] text-ink"
              >
                Vakspecialisten in{" "}
                <span className="italic text-sage">uw</span> regio.
              </h2>
              <p className="mt-8 max-w-md text-[17px] leading-[1.7] text-ink-soft">
                Selecteer uw regio om de veertien vakspecialisten te
                bekijken die er actief zijn.
              </p>
            </div>

            <div className="min-w-0 md:col-span-7">
              <div className="relative aspect-[5/4] w-full overflow-hidden rounded-[32px] bg-ink/5">
                <Image
                  src="https://images.unsplash.com/photo-1530124566582-a618bc2615dc?auto=format&fit=crop&w=1800&q=90"
                  alt="Vakspecialist op de werf"
                  fill
                  sizes="(max-width: 768px) 100vw, 58vw"
                  className="object-cover"
                />
              </div>
            </div>
          </div>

          <ul className="mt-14 grid gap-0 md:mt-20">
            {REGIONS.map((r, i) => (
              <li key={r.slug}>
                <Link
                  href="/contact"
                  className={`group flex items-center justify-between gap-6 py-6 md:py-8 ${
                    i === 0 ? "border-t border-ink-hair/40" : ""
                  } border-b border-ink-hair/40`}
                >
                  <span className="font-display text-[28px] font-medium leading-tight text-ink transition-colors group-hover:text-sage md:text-[36px]">
                    {r.name}
                  </span>
                  <span className="flex items-center gap-5 text-[13px] text-ink-muted">
                    <span className="hidden sm:inline">14 partners</span>
                    <span
                      aria-hidden="true"
                      className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-ink-hair/70 text-ink-soft transition-all duration-300 group-hover:border-sage group-hover:bg-sage group-hover:text-white"
                    >
                      <svg
                        viewBox="0 0 16 10"
                        className="h-3 w-4"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M1 5h14M11 1l4 4-4 4" />
                      </svg>
                    </span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section
        aria-labelledby="vak-why-title"
        className="relative mt-28 md:mt-44"
      >
        <div className="mx-auto max-w-[1280px] px-6 md:px-16 lg:px-24">
          <div className="max-w-2xl">
            <p className="text-[10px] font-medium uppercase tracking-[0.32em] text-ink-muted">
              Waarom aansluiten
            </p>
            <h2
              id="vak-why-title"
              className="mt-4 font-display text-[clamp(2rem,4vw,3.5rem)] font-medium leading-[1.05] text-ink"
            >
              Eén plek per{" "}
              <span className="italic text-sage">rubriek</span>, exclusief.
            </h2>
            <p className="mt-6 max-w-xl text-[17px] leading-[1.65] text-ink-soft">
              U bent niet één van de twintig sanitair-bedrijven in een
              database — u bent <em>de</em> sanitair-partner van het netwerk
              in uw regio. Dat verandert hoe doorverwijzingen werken.
            </p>
          </div>

          <div className="mt-14 grid gap-10 md:mt-20 md:grid-cols-3 md:gap-8 lg:gap-12">
            {[
              {
                nr: "01",
                title: "Exclusiviteit binnen uw regio",
                body: "Eén partner per rubriek. Geen onderlinge concurrentie op opdrachten die via het netwerk binnenkomen.",
              },
              {
                nr: "02",
                title: "Architecten die uw werk kennen",
                body: "Bouwprojecten komen via architect-partners binnen die u al hebben leren kennen op een netwerkevent. Geen koude offertes.",
              },
              {
                nr: "03",
                title: "Een sterkere lokale reputatie",
                body: "Aansluiting bij Renocheck Professionals is een kwaliteitsstempel. Bouwers en architecten zien u als deel van een geselecteerd netwerk.",
              },
            ].map((b) => (
              <div key={b.nr} className="min-w-0">
                <span className="font-display text-[44px] font-light leading-none text-sage md:text-[56px]">
                  {b.nr}
                </span>
                <div
                  aria-hidden="true"
                  className="mt-5 h-px w-10 bg-ink-hair"
                />
                <h3 className="mt-5 font-display text-[22px] font-medium leading-[1.15] text-ink md:text-[26px]">
                  {b.title}
                </h3>
                <p className="mt-4 text-[15px] leading-[1.7] text-ink-soft">
                  {b.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto mt-28 max-w-[1280px] px-6 md:mt-44 md:px-16 lg:px-24">
        <div className="grid gap-12 md:grid-cols-12 md:items-center md:gap-16">
          <div className="min-w-0 md:col-span-5">
            <p className="text-[18px] text-ink-soft">Bent u vakspecialist</p>
            <h2 className="mt-6 font-display text-[clamp(2rem,4vw,3.5rem)] font-medium leading-[1.05] text-ink">
              Eén plek per{" "}
              <span className="italic text-sage">rubriek</span>.
            </h2>
            <div className="mt-10">
              <PillLink href="/#partner-aanvraag">Vraag uw plek aan</PillLink>
            </div>
          </div>
          <div className="min-w-0 md:col-span-7">
            <p className="text-[19px] leading-[1.7] text-ink-soft md:text-[20px]">
              Per regio nemen we één vakspecialist op per rubriek. Is uw
              rubriek nog vrij in uw regio? Stel u voor.
            </p>
          </div>
        </div>
      </section>
    </article>
  );
}
