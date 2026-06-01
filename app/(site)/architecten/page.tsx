import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PillLink } from "@/components/pill-button";
import { BreadcrumbSchema } from "@/components/structured-data";

export const metadata: Metadata = {
  title: "Voor architectenbureaus",
  description:
    "Word netwerkpartner bij Renocheck Professionals — een geselecteerde kring architectenbureaus in West-Vlaanderen, Oost-Vlaanderen, Antwerpen en Vlaams-Brabant. Vaste vakspecialisten, lokale doorverwijzingen en exclusiviteit per regio.",
  alternates: { canonical: "/architecten" },
  openGraph: {
    title: "Voor architectenbureaus · Renocheck Professionals",
    description:
      "Een Vlaams architectennetwerk dat samenwerkt met geselecteerde vakspecialisten — exclusief per regio.",
    url: "/architecten",
    type: "website",
  },
  twitter: {
    title: "Voor architectenbureaus · Renocheck Professionals",
    description:
      "Een Vlaams architectennetwerk dat samenwerkt met geselecteerde vakspecialisten — exclusief per regio.",
  },
};

const REGIONS = [
  { name: "West-Vlaanderen", slug: "west-vlaanderen", count: 5 },
  { name: "Oost-Vlaanderen", slug: "oost-vlaanderen", count: 4 },
  { name: "Antwerpen", slug: "antwerpen", count: 6 },
  { name: "Vlaams-Brabant", slug: "vlaams-brabant", count: 4 },
];

export default function ArchitectenPage() {
  return (
    <article className="relative pt-36 pb-14 sm:pt-44 md:pt-52">
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "/" },
          { name: "Architecten", url: "/architecten" },
        ]}
      />

      <section className="mx-auto max-w-[1280px] px-6 md:px-16 lg:px-24">
        <p className="enter-up delay-300 text-[18px] text-ink-soft">
          Voor architectenbureaus
        </p>

        <h1 className="enter-up delay-400 mt-6 font-display text-[clamp(3rem,8vw,7rem)] font-medium leading-[0.98] text-ink">
          Architecten die elkaar{" "}
          <span className="italic text-sage">versterken</span>.
        </h1>

        <p className="enter-up delay-500 mt-8 max-w-2xl text-[17px] leading-[1.65] text-ink-soft md:text-[19px]">
          Een gesloten kring architectenbureaus per Vlaamse regio — die werkt
          met vaste vakspecialisten, deelt referenties en doorverwijzingen, en
          mekaar maandelijks ontmoet op partnerevents. Geen open marktplaats,
          geen lead-veiling.
        </p>
      </section>

      <section className="relative mt-28 md:mt-44">
        <div className="mx-auto max-w-[1280px] px-6 md:px-16 lg:px-24">
          <div className="grid gap-14 md:grid-cols-12 md:items-center md:gap-16">
            <div className="min-w-0 md:col-span-7">
              <div className="relative aspect-[5/4] w-full overflow-hidden rounded-[32px] bg-ink/5">
                <Image
                  src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1800&q=90"
                  alt="Architect aan het werk met bouwplannen"
                  fill
                  sizes="(max-width: 768px) 100vw, 58vw"
                  className="object-cover"
                />
              </div>
            </div>

            <div className="min-w-0 md:col-span-5">
              <p className="text-[18px] text-ink-soft">Hoe selecteren we</p>
              <h2 className="mt-6 font-display text-[clamp(2rem,4vw,3.5rem)] font-medium leading-[1.05] text-ink">
                Vakmanschap{" "}
                <span className="italic text-sage">eerst</span>.
              </h2>
              <div className="mt-8 space-y-5 text-[17px] leading-[1.75] text-ink-soft md:text-[18px]">
                <p>
                  We werken samen met architecten die hun stijl en proces
                  verzorgd opvolgen — van eerste schets tot ingebruikname.
                </p>
                <p>
                  Geen passieve doorverwijzers, wel mensen die actief
                  meedenken met hun klanten en met de vakspecialisten op
                  hun werf.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        aria-labelledby="regions-title"
        className="relative mt-28 md:mt-44"
      >
        <div className="mx-auto max-w-[1280px] px-6 md:px-16 lg:px-24">
          <div className="max-w-2xl">
            <p className="text-[10px] font-medium uppercase tracking-[0.32em] text-ink-muted">
              Per regio
            </p>
            <h2
              id="regions-title"
              className="mt-4 font-display text-[clamp(2rem,4vw,3.5rem)] font-medium leading-[1.05] text-ink"
            >
              Architecten in{" "}
              <span className="italic text-sage">uw</span> regio.
            </h2>
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
                    <span className="hidden sm:inline">
                      {r.count} architect{r.count === 1 ? "" : "en"}
                    </span>
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
        aria-labelledby="why-title"
        className="relative mt-28 md:mt-44"
      >
        <div className="mx-auto max-w-[1280px] px-6 md:px-16 lg:px-24">
          <div className="max-w-2xl">
            <p className="text-[10px] font-medium uppercase tracking-[0.32em] text-ink-muted">
              Waarom aansluiten
            </p>
            <h2
              id="why-title"
              className="mt-4 font-display text-[clamp(2rem,4vw,3.5rem)] font-medium leading-[1.05] text-ink"
            >
              Wat een netwerk{" "}
              <span className="italic text-sage">oplevert</span>.
            </h2>
            <p className="mt-6 max-w-xl text-[17px] leading-[1.65] text-ink-soft">
              We verkopen geen leads. We bouwen een kring waarin partners
              elkaar versterken — met als gevolg betere projecten en minder
              verloren tijd.
            </p>
          </div>

          <div className="mt-14 grid gap-10 md:mt-20 md:grid-cols-3 md:gap-8 lg:gap-12">
            {[
              {
                nr: "01",
                title: "Vaste vakspecialisten in uw regio",
                body: "Eén dakwerker, één sanitair-partner, één elektricien — die u kent en die uw projecten kent. Geen koud bellen meer.",
              },
              {
                nr: "02",
                title: "Doorverwijzingen vanuit bouwers",
                body: "Bouwers die via Renocheck binnenkomen, krijgen een architect uit hun regio voorgesteld. Exclusief per regio.",
              },
              {
                nr: "03",
                title: "Partnerevents om elkaar te leren kennen",
                body: "Zes events per jaar in uw regio. In een rustige setting, zonder commerciële druk — gewoon om de mensen achter de partners te leren kennen.",
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
            <p className="text-[18px] text-ink-soft">Bent u architect</p>
            <h2 className="mt-6 font-display text-[clamp(2rem,4vw,3.5rem)] font-medium leading-[1.05] text-ink">
              Sluit aan bij het{" "}
              <span className="italic text-sage">netwerk</span>.
            </h2>
            <div className="mt-10">
              <PillLink href="/#partner-aanvraag">Word partner</PillLink>
            </div>
          </div>
          <div className="min-w-0 md:col-span-7">
            <p className="text-[19px] leading-[1.7] text-ink-soft md:text-[20px]">
              We breiden ons architectennetwerk per regio bewust traag uit
              — kwaliteit boven kwantiteit. Stel u voor en we plannen een
              kennismaking.
            </p>
          </div>
        </div>
      </section>
    </article>
  );
}
