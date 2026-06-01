import type { Metadata } from "next";
import Image from "next/image";
import { PillLink } from "@/components/pill-button";
import {
  BreadcrumbSchema,
  RegionalServiceAreaSchema,
} from "@/components/structured-data";

const REGION_CITIES = [
  "Brugge",
  "Kortrijk",
  "Oostende",
  "Roeselare",
  "Ieper",
  "Knokke-Heist",
];

export const metadata: Metadata = {
  title: "Bouwnetwerk West-Vlaanderen",
  description:
    "Renocheck Professionals in West-Vlaanderen: één architect en veertien geselecteerde vakspecialisten — van dakwerken tot keukens — actief in Brugge, Kortrijk, Oostende en omstreken.",
  alternates: { canonical: "/regio/west-vlaanderen" },
  openGraph: {
    title: "Bouwnetwerk West-Vlaanderen · Renocheck Professionals",
    description:
      "Gesloten partnernetwerk in West-Vlaanderen — geselecteerde architectenbureaus en vakspecialisten voor kustarchitectuur, renovatie in het Brugse en nieuwbouw rond Kortrijk.",
    url: "/regio/west-vlaanderen",
    type: "website",
  },
  twitter: {
    title: "Bouwnetwerk West-Vlaanderen · Renocheck Professionals",
    description:
      "Eén architect plus veertien vakspecialisten per rubriek — actief van de kust tot het Kortrijkse.",
  },
};

const PARTNER_PLACEHOLDERS = [
  {
    rubriek: "Architectenbureau",
    city: "Brugge",
  },
  {
    rubriek: "Dakwerken",
    city: "Roeselare",
  },
  {
    rubriek: "Sanitair",
    city: "Oostende",
  },
];

export default async function WestVlaanderenRegionPage() {
  return (
    <article className="relative pt-36 pb-14 sm:pt-44 md:pt-52">
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "/" },
          { name: "Regio West-Vlaanderen", url: "/regio/west-vlaanderen" },
        ]}
      />
      <RegionalServiceAreaSchema
        region="West-Vlaanderen"
        cities={REGION_CITIES}
      />

      <section className="mx-auto max-w-[1280px] px-6 md:px-16 lg:px-24">
        <p className="enter-up delay-300 text-[18px] text-ink-soft">
          Regio · West-Vlaanderen
        </p>

        <h1 className="enter-up delay-400 mt-6 font-display text-[clamp(3rem,8vw,7rem)] font-medium leading-[0.98] text-ink">
          Van de kust tot het{" "}
          <span className="italic text-sage">Brugse</span> Vrije.
        </h1>

        <p className="enter-up delay-500 mt-8 max-w-2xl text-[17px] leading-[1.65] text-ink-soft md:text-[19px]">
          Bouwen in West-Vlaanderen is meervoudig: een tweede verblijf in
          Knokke-Heist vraagt andere details dan een herenhuis in Brugge of
          een passiefnieuwbouw rond Kortrijk. Onze regionale kring is daarop
          gebouwd — één architectenbureau plus veertien vakspecialisten die
          elkaar al kennen, met werven van Oostende tot Ieper.
        </p>

        <p className="enter-up delay-600 mt-6 max-w-2xl text-[17px] leading-[1.65] text-ink-soft md:text-[19px]">
          Selectie op vakmanschap en regionale reputatie, niet op
          marketingbudget. Geen lead-veiling, geen versnipperde offertes.
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
                <span className="italic text-sage">werken</span>.
              </h2>
              <p className="mt-8 text-[17px] leading-[1.7] text-ink-soft md:text-[18px]">
                Het partnernetwerk dekt de hele provincie — van het Brugse
                Vrije en de kuststrook tot de Westhoek en de
                Leiestreek. Werven worden opgenomen waar onze partners reeds
                gevestigd zijn en hun toeleveranciers, gemeenten en
                vergunningstrajecten kennen.
              </p>
              <p className="mt-5 text-[15px] leading-[1.7] text-ink-muted">
                Renocheck Professionals heeft geen fysiek kantoor in
                West-Vlaanderen — we werken als netwerk, met partners die
                gevestigd zijn in deze regio.
              </p>
            </div>

            <div className="min-w-0 md:col-span-7">
              <ul className="grid grid-cols-2 gap-x-8 gap-y-4 sm:grid-cols-3">
                {REGION_CITIES.map((city) => (
                  <li
                    key={city}
                    className="flex items-baseline gap-3 border-b border-ink-hair/40 pb-3 text-[16px] text-ink"
                  >
                    <span
                      aria-hidden="true"
                      className="inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-sage"
                    />
                    <span>{city}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-8 text-[14px] leading-[1.7] text-ink-muted">
                Bouwt u net buiten deze kernen — Diksmuide, Veurne,
                Waregem, Tielt? Stuur ons uw postcode; we kijken na welk
                partnerteam het dichtst aansluit.
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
                  src="https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=1800&q=90"
                  alt="Brugse binnenstad met historisch patrimonium"
                  fill
                  sizes="(max-width: 768px) 100vw, 58vw"
                  className="object-cover"
                />
              </div>
            </div>

            <div className="min-w-0 md:col-span-5">
              <p className="text-[10px] font-medium uppercase tracking-[0.32em] text-ink-muted">
                De kring in West-Vlaanderen
              </p>
              <h2
                id="kring-title"
                className="mt-4 font-display text-[clamp(2rem,4vw,3.5rem)] font-medium leading-[1.05] text-ink"
              >
                Eén ploeg, veertien{" "}
                <span className="italic text-sage">vakken</span>.
              </h2>
              <div className="mt-8 space-y-5 text-[17px] leading-[1.75] text-ink-soft md:text-[18px]">
                <p>
                  Eén architectenbureau, één dakwerker, één sanitair-partner,
                  één elektricien, één HVAC-installateur, één partner voor
                  tegels en natuursteen — en zo verder voor schrijnwerk,
                  schilderwerken, vloeren, isolatie, ramen en deuren,
                  tuinaanleg, zonnepanelen, zwembaden en keukens.
                </p>
                <p>
                  In plaats van veertien losse zoekopdrachten krijgt u één
                  vertrouwd team dat al samen op werven heeft gestaan — in
                  Brugge, Kortrijk, Roeselare of Ieper.
                </p>
              </div>
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
              Onze West-Vlaanderen-partners
            </p>
            <h2
              id="partners-title"
              className="mt-4 font-display text-[clamp(2rem,4vw,3.5rem)] font-medium leading-[1.05] text-ink"
            >
              De ploeg achter de{" "}
              <span className="italic text-sage">werven</span>.
            </h2>
            <p className="mt-8 text-[17px] leading-[1.7] text-ink-soft md:text-[18px]">
              Wij delen partnernamen en projectreferenties na aanmelding via{" "}
              <a
                className="underline-offset-4 hover:text-sage hover:underline"
                href="/login"
              >
                /login
              </a>
              . Vraag een gesprek aan via{" "}
              <a
                className="underline-offset-4 hover:text-sage hover:underline"
                href="/contact"
              >
                /contact
              </a>
              .
            </p>
          </div>

          <ul className="mt-16 grid gap-8 sm:grid-cols-2 md:grid-cols-3 md:gap-10">
            {PARTNER_PLACEHOLDERS.map((p, i) => (
              <li
                key={`${p.rubriek}-${p.city}`}
                className="min-w-0 rounded-[28px] bg-surface-soft p-8 ring-1 ring-ink-hair/40"
              >
                <span className="font-display text-[40px] font-light leading-none text-sage">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div
                  aria-hidden="true"
                  className="mt-5 h-px w-10 bg-ink-hair"
                />
                <h3 className="mt-5 font-display text-[24px] font-medium leading-[1.15] text-ink">
                  Partner-naam
                </h3>
                <p className="mt-3 text-[15px] text-ink-soft">{p.rubriek}</p>
                <p className="mt-1 text-[14px] text-ink-muted">{p.city}</p>
                <p className="mt-6 text-[13px] leading-[1.6] text-ink-muted">
                  Naam zichtbaar voor leden — vraag een kennismaking aan.
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
          <div className="relative overflow-hidden rounded-[32px] bg-surface-warm ring-1 ring-ink-hair/40">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -left-24 -top-24 h-96 w-96 rounded-full bg-sage/20 blur-3xl"
            />
            <div className="relative grid gap-12 p-7 sm:p-10 md:grid-cols-12 md:items-start md:gap-16 md:p-14 lg:p-20">
              <div className="min-w-0 md:col-span-5">
                <p className="text-[10px] font-medium uppercase tracking-[0.32em] text-ink-muted">
                  Waarom West-Vlaanderen
                </p>
                <h2
                  id="waarom-title"
                  className="mt-4 font-display text-[clamp(2rem,4.5vw,3.75rem)] font-medium leading-[1.02] text-ink"
                >
                  Drie bouwculturen, één{" "}
                  <span className="italic text-sage">netwerk</span>.
                </h2>
              </div>

              <div className="min-w-0 space-y-7 text-[17px] leading-[1.75] text-ink-soft md:col-span-7 md:text-[18px]">
                <p>
                  <span className="font-medium text-ink">
                    Kustarchitectuur.
                  </span>{" "}
                  Tweede verblijven en appartementsblokken van Knokke-Heist
                  tot Oostende vragen detaillering tegen zoute lucht,
                  zandverstuivingen en een aannemerskalender die rond
                  toeristenpieken draait. Onze partners aan de kust werken
                  met die kalender en die details.
                </p>
                <p>
                  <span className="font-medium text-ink">
                    Renovatiepatrimonium in het Brugse.
                  </span>{" "}
                  Het beschermd stadsgezicht van Brugge, de herenhuizen en
                  hoeves in het Brugse Vrije — daar is renovatie zelden een
                  rechte lijn. Vergunningstrajecten, monumentenzorg en
                  ambachtelijke aanpassingen vragen partners die het
                  vakjargon van Onroerend Erfgoed kennen.
                </p>
                <p>
                  <span className="font-medium text-ink">
                    Moderne nieuwbouw rond Kortrijk.
                  </span>{" "}
                  De Leiestreek combineert designcultuur met een uitgesproken
                  bouwambitie: passiefwoningen, BEN-projecten en
                  hoogwaardige interieurarchitectuur. Onze partners in en
                  rond Kortrijk en Roeselare brengen die nieuwbouwervaring
                  mee — inclusief de leveranciers waar de regio op draait.
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
          <div className="grid gap-12 md:grid-cols-12 md:items-center md:gap-16">
            <div className="min-w-0 md:col-span-6">
              <p className="text-[10px] font-medium uppercase tracking-[0.32em] text-ink-muted">
                Voor partners
              </p>
              <h2
                id="word-partner-title"
                className="mt-4 font-display text-[clamp(2rem,4.5vw,3.75rem)] font-medium leading-[1.02] text-ink"
              >
                Word partner in{" "}
                <span className="italic text-sage">West-Vlaanderen</span>.
              </h2>
              <p className="mt-8 text-[17px] leading-[1.7] text-ink-soft md:text-[18px]">
                Per rubriek is er ruimte voor één vakspecialist per regio.
                Niet alle veertien rubrieken zijn vol in West-Vlaanderen —
                vooral aan de kust en in de Westhoek zoeken we nog
                aanvullingen. Bent u actief in dakwerken, sanitair,
                schrijnwerk, tuinaanleg, zwembaden of een van de andere
                rubrieken? Controleer beschikbaarheid via{" "}
                <a
                  className="underline-offset-4 hover:text-sage hover:underline"
                  href="/contact"
                >
                  /contact
                </a>
                .
              </p>
              <p className="mt-5 text-[15px] leading-[1.7] text-ink-muted">
                We bekijken referenties, regionale spreiding en hoe uw
                werkwijze aansluit bij de bestaande kring. Geen open
                inschrijving — wel een eerlijk gesprek.
              </p>
              <div className="mt-10">
                <PillLink href="/#partner-aanvraag">Vraag aan</PillLink>
              </div>
            </div>

            <div className="min-w-0 md:col-span-6">
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[32px] bg-ink/5">
                <Image
                  src="https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=1400&q=90"
                  alt="Vakman op werf in West-Vlaanderen"
                  fill
                  sizes="(max-width: 768px) 100vw, 42vw"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto mt-20 max-w-[1280px] px-6 md:mt-32 md:px-16 lg:px-24">
        <div className="grid gap-12 md:grid-cols-12 md:items-center md:gap-16">
          <div className="min-w-0 md:col-span-5">
            <p className="text-[18px] text-ink-soft">Voor bouwheren</p>
            <h2 className="mt-6 font-display text-[clamp(2rem,4vw,3.5rem)] font-medium leading-[1.05] text-ink">
              Bouwt of renoveert u in{" "}
              <span className="italic text-sage">West-Vlaanderen</span>?
            </h2>
            <div className="mt-10">
              <PillLink href="/bouwers">Voor bouwheren</PillLink>
            </div>
          </div>
          <div className="min-w-0 md:col-span-7">
            <p className="text-[19px] leading-[1.7] text-ink-soft md:text-[20px]">
              Of het nu om een renovatie in Brugge gaat, een nieuwbouw rond
              Kortrijk of een tweede verblijf aan de kust — beschrijf uw
              project en we stellen een team voor uit het netwerk. Eén
              gesprek, één gedeeld voorstel.
            </p>
          </div>
        </div>
      </section>
    </article>
  );
}
