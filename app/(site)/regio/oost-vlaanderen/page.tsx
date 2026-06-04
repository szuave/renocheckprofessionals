import type { Metadata } from "next";
import Image from "next/image";
import { PillLink } from "@/components/pill-button";
import {
  BreadcrumbSchema,
  RegionalServiceAreaSchema,
} from "@/components/structured-data";

const CITIES = [
  "Gent",
  "Aalst",
  "Sint-Niklaas",
  "Dendermonde",
  "Eeklo",
] as const;

export const metadata: Metadata = {
  title: "Bouwnetwerk Oost-Vlaanderen",
  description:
    "Eén architect-bureau en veertien vakspecialisten per rubriek voor Oost-Vlaanderen — Gent, Aalst, Sint-Niklaas, Dendermonde en Eeklo. Selectie boven zoekvolume.",
  alternates: { canonical: "/regio/oost-vlaanderen" },
  openGraph: {
    title: "Bouwnetwerk Oost-Vlaanderen · Renocheck Professionals",
    description:
      "Gesloten partnernetwerk voor Oost-Vlaanderen — van stadsrenovatie in Gent tot nieuwbouw in het Waasland.",
    url: "/regio/oost-vlaanderen",
    type: "website",
  },
  twitter: {
    title: "Bouwnetwerk Oost-Vlaanderen · Renocheck Professionals",
    description:
      "Gesloten partnernetwerk voor Oost-Vlaanderen — Gent, Aalst, Sint-Niklaas, Dendermonde, Eeklo.",
  },
};

const PARTNERS_PLACEHOLDER = [
  {
    naam: "Partner-naam",
    rubriek: "Architectenbureau",
    stad: "Gent",
  },
  {
    naam: "Partner-naam",
    rubriek: "Dakwerken",
    stad: "Sint-Niklaas",
  },
  {
    naam: "Partner-naam",
    rubriek: "Sanitair",
    stad: "Aalst",
  },
];

const KRING_VOORBEELDEN = [
  "één architectenbureau dat de regie houdt",
  "één dakwerker voor pannen, leien en platte daken",
  "één elektricien die uw domotica en laadpaal mee uittekent",
  "één sanitair-partner voor badkamers en leidingwerk",
  "één schrijnwerker voor maatwerk en interieurkasten",
  "één partner per resterende rubriek — van isolatie tot zonnepanelen",
];

export default async function RegioOostVlaanderenPage() {
  return (
    <article className="relative pt-36 pb-14 sm:pt-44 md:pt-52">
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "/" },
          { name: "Regio Oost-Vlaanderen", url: "/regio/oost-vlaanderen" },
        ]}
      />
      <RegionalServiceAreaSchema
        region="Oost-Vlaanderen"
        cities={[...CITIES]}
      />

      <section className="mx-auto max-w-[1280px] px-6 md:px-16 lg:px-24">
        <p className="enter-up delay-300 text-[18px] text-ink-soft">
          Regio · Oost-Vlaanderen
        </p>

        <h1 className="enter-up delay-400 mt-6 font-display text-[clamp(3rem,8vw,7rem)] font-medium leading-[0.98] text-ink">
          Van Gentse herenhuizen tot het{" "}
          <span className="italic text-sage">Waasland</span>.
        </h1>

        <p className="enter-up delay-500 mt-8 max-w-2xl text-[17px] leading-[1.65] text-ink-soft md:text-[19px]">
          Oost-Vlaanderen vraagt twee soorten vakkennis op één werf:
          stadsrenovatie binnen de Gentse kuip — beschermde gevels, krappe
          opritten, gedeelde tuinmuren — én moderne nieuwbouw in de
          Waaslandse gemeentes rond Sint-Niklaas en Dendermonde. Ons
          regionale netwerk telt één architectenbureau en veertien
          vakspecialisten die met beide registers vertrouwd zijn.
        </p>
        <p className="enter-up delay-600 mt-6 max-w-2xl text-[17px] leading-[1.65] text-ink-soft md:text-[19px]">
          Geen lijst van zestig namen, geen offerte-veiling. Eén partner per
          rubriek, geselecteerd op werfreputatie tussen Gent, Aalst en Eeklo.
        </p>
      </section>

      <section
        aria-labelledby="servicegebied-title"
        className="relative mt-28 md:mt-44"
      >
        <div className="mx-auto max-w-[1280px] px-6 md:px-16 lg:px-24">
          <div className="grid gap-14 md:grid-cols-12 md:items-start md:gap-16">
            <div className="min-w-0 md:col-span-5">
              <p className="text-[10px] font-medium uppercase tracking-[0.32em] text-ink-muted">
                Servicegebied
              </p>
              <h2
                id="servicegebied-title"
                className="mt-4 font-display text-[clamp(2rem,4vw,3.5rem)] font-medium leading-[1.05] text-ink"
              >
                Waar we{" "}
                <span className="italic text-sage">werkzaam</span> zijn.
              </h2>
            </div>

            <div className="min-w-0 md:col-span-7">
              <p className="text-[17px] leading-[1.7] text-ink-soft md:text-[18px]">
                Onze partners verzorgen werven over de hele provincie, met
                een sterke aanwezigheid in de stedelijke as Gent–Aalst en
                het Waasland richting de Scheldedijken. De kortere
                rijafstanden binnen de regio betekenen dat een dakwerker
                uit Lokeren even snel op een werf in Eeklo staat als in
                Dendermonde.
              </p>
              <ul className="mt-8 grid grid-cols-2 gap-x-6 gap-y-3 text-[15px] text-ink-soft sm:grid-cols-3">
                {CITIES.map((stad) => (
                  <li key={stad} className="flex items-start gap-3">
                    <span
                      aria-hidden="true"
                      className="mt-2 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-sage"
                    />
                    <span>{stad}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-10 rounded-2xl bg-surface-soft p-5 text-[14px] leading-[1.7] text-ink-muted ring-1 ring-ink-hair/40">
                Renocheck Professionals heeft geen fysiek kantoor in
                Oost-Vlaanderen — we werken als netwerk, met partners die
                gevestigd zijn in deze regio. De coördinatie verloopt via
                het hoofdkantoor; uw aanspreekpunten zijn de architect en
                vakspecialisten ter plaatse.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section
        aria-labelledby="kring-title"
        className="relative mt-28 md:mt-44"
      >
        <div className="mx-auto max-w-[1280px] px-6 md:px-16 lg:px-24">
          <div className="grid gap-14 md:grid-cols-12 md:items-center md:gap-16">
            <div className="min-w-0 md:col-span-7">
              <div className="relative aspect-[5/4] w-full overflow-hidden rounded-[32px] bg-ink/5">
                <Image
                  src="https://images.unsplash.com/photo-1473773508845-188df298d2d1?auto=format&fit=crop&w=1800&q=90"
                  alt="Historische gevels in een Gentse straat"
                  fill
                  sizes="(max-width: 768px) 100vw, 58vw"
                  className="object-cover"
                />
              </div>
            </div>

            <div className="min-w-0 md:col-span-5">
              <p className="text-[10px] font-medium uppercase tracking-[0.32em] text-ink-muted">
                De kring
              </p>
              <h2
                id="kring-title"
                className="mt-4 font-display text-[clamp(2rem,4vw,3.5rem)] font-medium leading-[1.05] text-ink"
              >
                De kring in{" "}
                <span className="italic text-sage">Oost-Vlaanderen</span>.
              </h2>
              <p className="mt-8 text-[17px] leading-[1.7] text-ink-soft md:text-[18px]">
                Eén regionale kring, veertien rubrieken. Geen overlap, geen
                offerte-concurrentie tussen onze eigen leden — ze werken
                samen op werven tussen Eeklo en Dendermonde en kennen elkaars
                planning.
              </p>
              <ul className="mt-7 space-y-3 text-[15px] leading-[1.7] text-ink-soft">
                {KRING_VOORBEELDEN.map((line) => (
                  <li key={line} className="flex items-start gap-3">
                    <span
                      aria-hidden="true"
                      className="mt-2 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-sage"
                    />
                    <span>{line}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section
        aria-labelledby="partners-title"
        className="relative mt-28 md:mt-44"
      >
        <div className="mx-auto max-w-[1280px] px-6 md:px-16 lg:px-24">
          <div className="max-w-2xl">
            <p className="text-[10px] font-medium uppercase tracking-[0.32em] text-ink-muted">
              Partners in de regio
            </p>
            <h2
              id="partners-title"
              className="mt-4 font-display text-[clamp(2rem,4vw,3.5rem)] font-medium leading-[1.05] text-ink"
            >
              Onze{" "}
              <span className="italic text-sage">Oost-Vlaanderen</span>
              -partners.
            </h2>
            <p className="mt-7 text-[17px] leading-[1.7] text-ink-soft md:text-[18px]">
              Wij delen partnernamen en projectreferenties na aanmelding via{" "}
              <a
                href="/login"
                className="font-medium text-ink underline-offset-4 hover:text-sage hover:underline"
              >
                /login
              </a>
              . Liever eerst een gesprek? Vraag een kennismaking aan via{" "}
              <a
                href="/contact"
                className="font-medium text-ink underline-offset-4 hover:text-sage hover:underline"
              >
                /contact
              </a>
              .
            </p>
          </div>

          <ul className="mt-16 grid gap-8 md:grid-cols-3 md:gap-10">
            {PARTNERS_PLACEHOLDER.map((p, i) => (
              <li
                key={`${p.rubriek}-${i}`}
                className="rounded-[28px] bg-surface-warm p-8 ring-1 ring-ink-hair/40"
              >
                <p className="text-[10px] font-medium uppercase tracking-[0.32em] text-ink-muted">
                  {p.rubriek}
                </p>
                <h3 className="mt-5 font-display text-[26px] font-medium leading-[1.15] text-ink">
                  {p.naam}
                </h3>
                <p className="mt-4 text-[15px] text-ink-soft">{p.stad}</p>
                <div
                  aria-hidden="true"
                  className="mt-8 h-px w-12 bg-ink-hair"
                />
                <p className="mt-6 text-[14px] leading-[1.7] text-ink-muted">
                  Volledige profielen, referentiewerven en contactgegevens
                  zichtbaar na aanmelding.
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section
        aria-labelledby="waarom-title"
        className="relative mt-28 md:mt-44"
      >
        <div className="mx-auto max-w-[1280px] px-6 md:px-16 lg:px-24">
          <div className="grid gap-14 md:grid-cols-12 md:items-start md:gap-16">
            <div className="min-w-0 md:col-span-5">
              <p className="text-[10px] font-medium uppercase tracking-[0.32em] text-ink-muted">
                Waarom deze regio
              </p>
              <h2
                id="waarom-title"
                className="mt-4 font-display text-[clamp(2rem,4vw,3.5rem)] font-medium leading-[1.05] text-ink"
              >
                Gent en het{" "}
                <span className="italic text-sage">Waasland</span>, in één
                team.
              </h2>
            </div>

            <div className="min-w-0 md:col-span-7">
              <div className="space-y-6 text-[17px] leading-[1.75] text-ink-soft md:text-[18px]">
                <p>
                  Stadsrenovatie in Gent is geen klein detail: een
                  herenhuis in de Patershol of langs de Coupure vraagt
                  geduldige schrijnwerkers, een dakwerker die met natuurlei
                  overweg kan en een architect die met de stadsdienst weet
                  te onderhandelen. Vergunningen lopen anders dan in een
                  verkaveling.
                </p>
                <p>
                  Tegelijk schuiven de Waaslandse gemeentes rond
                  Sint-Niklaas, Lokeren en Dendermonde op naar grotere,
                  energetisch ambitieuze nieuwbouwprojecten — met
                  warmtepompen, zonnepanelen en triple beglazing als
                  standaard. Twee werelden, dezelfde provincie.
                </p>
                <p>
                  Onze partners pendelen tussen beide. De Gentse
                  architect die op maandag een 19e-eeuwse trapgevel
                  onderzoekt, tekent op woensdag een passiefwoning bij
                  Hamme. Dat is de meerwaarde van een regionale kring die
                  beide registers beheerst.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        id="word-partner"
        aria-labelledby="word-partner-title"
        className="relative mt-28 scroll-mt-24 md:mt-44"
      >
        <div className="mx-auto max-w-[1280px] px-6 md:px-16 lg:px-24">
          <div className="relative overflow-hidden rounded-[32px] bg-surface-warm ring-1 ring-ink-hair/40">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-24 -bottom-24 h-96 w-96 rounded-full bg-sage/25 blur-3xl"
            />
            <div className="relative grid gap-10 p-7 sm:p-10 md:grid-cols-12 md:items-center md:gap-16 md:p-14 lg:p-20">
              <div className="min-w-0 md:col-span-7">
                <p className="text-[10px] font-medium uppercase tracking-[0.32em] text-ink-muted">
                  Voor vakspecialisten
                </p>
                <h2
                  id="word-partner-title"
                  className="mt-5 font-display text-[clamp(2rem,4.5vw,3.75rem)] font-medium leading-[1.02] text-ink"
                >
                  Word partner in{" "}
                  <span className="italic text-sage">Oost-Vlaanderen</span>.
                </h2>
                <p className="mt-7 max-w-xl text-[16px] leading-[1.75] text-ink-soft md:text-[17px]">
                  Eén plek per rubriek per regio. Voor Oost-Vlaanderen
                  zijn enkele rubrieken nog beschikbaar, andere zijn ingevuld.
                  Niet alle 14 rubrieken zijn vol — controleer
                  beschikbaarheid via{" "}
                  <a
                    href="/contact"
                    className="font-medium text-ink underline-offset-4 hover:text-sage hover:underline"
                  >
                    /contact
                  </a>
                  . We werken niet met inschrijfgeld of bid-systemen; selectie
                  gebeurt op vakmanschap en regionale reputatie.
                </p>
                <div className="mt-10">
                  <PillLink href="/#partner-aanvraag">Vraag aan</PillLink>
                </div>
              </div>

              <div className="min-w-0 md:col-span-5">
                <div className="rounded-[28px] bg-surface-soft/85 p-7 ring-1 ring-ink-hair/50 backdrop-blur md:p-8">
                  <p className="text-[10px] font-medium uppercase tracking-[0.32em] text-ink-muted">
                    Wat we vragen
                  </p>
                  <ul className="mt-6 space-y-4 text-[15px] leading-[1.7] text-ink-soft">
                    <li className="flex items-start gap-3">
                      <span
                        aria-hidden="true"
                        className="mt-2 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-sage"
                      />
                      <span>
                        Minstens vijf jaar werfervaring in
                        Oost-Vlaanderen.
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span
                        aria-hidden="true"
                        className="mt-2 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-sage"
                      />
                      <span>
                        Drie referentiewerven met contactbare
                        bouwheer.
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span
                        aria-hidden="true"
                        className="mt-2 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-sage"
                      />
                      <span>
                        Bereidheid om in een vaste regionale kring te
                        werken — niet in vrijblijvende lijsten.
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto mt-20 max-w-[1280px] px-6 md:mt-32 md:px-16 lg:px-24">
        <div className="grid gap-12 md:grid-cols-12 md:items-center md:gap-16">
          <div className="min-w-0 md:col-span-5">
            <p className="text-[18px] text-ink-soft">Nog plek vrij</p>
            <h2 className="mt-6 font-display text-[clamp(2rem,4vw,3.5rem)] font-medium leading-[1.05] text-ink">
              Word partner in{" "}
              <span className="italic text-sage">Oost-Vlaanderen</span>.
            </h2>
            <div className="mt-10">
              <PillLink href="/#partner-aanvraag">Vraag aan</PillLink>
            </div>
          </div>
          <div className="min-w-0 md:col-span-7">
            <p className="text-[19px] leading-[1.7] text-ink-soft md:text-[20px]">
              Of u nu Gentse stadsrenovaties wilt opvolgen of nieuwbouw in
              het Waasland — niet alle rubrieken zijn ingevuld. Een
              kennismakingsgesprek volstaat om de pasvorm te checken.
            </p>
          </div>
        </div>
      </section>
    </article>
  );
}
