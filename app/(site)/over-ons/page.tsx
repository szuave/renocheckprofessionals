import type { Metadata } from "next";
import Link from "next/link";
import { PillLink } from "@/components/pill-button";
import {
  AboutPageSchema,
  BreadcrumbSchema,
} from "@/components/structured-data";

export const metadata: Metadata = {
  title: "Over ons",
  description:
    "Renocheck Professionals — opgericht door Maxime Vandenbroucke. Gesloten netwerk: één architect en veertien vakspecialisten per Vlaamse regio. Selectie boven zoekvolume.",
  alternates: { canonical: "/over-ons" },
  openGraph: {
    title: "Over Renocheck Professionals",
    description:
      "Het verhaal, de oprichter en de selectiemethode achter Renocheck Professionals — een gesloten partnernetwerk in vier Vlaamse regio's.",
    url: "/over-ons",
    type: "article",
  },
  twitter: {
    title: "Over Renocheck Professionals",
    description:
      "Het verhaal, de oprichter en de selectiemethode achter Renocheck Professionals.",
  },
};

const SELECTIE_CRITERIA = [
  {
    title: "Geregistreerde, BTW-plichtige onderneming",
    body: "Geactiveerd KBO-nummer met de juiste NACEBEL-codes voor de rubriek. Geen onderaannemers via tussenpersonen.",
  },
  {
    title: "Minimaal vijf jaar actief in de rubriek",
    body: "Aantoonbare continuïteit — geen sociale dumping, geen koppelbazen, geen postbus-bedrijven die elk seizoen van naam wisselen.",
  },
  {
    title: "Aantoonbare referenties in de regio",
    body: "Minstens drie afgewerkte projecten in de eigen provincie, opvraagbaar door het Renocheck-team voor peer-validatie.",
  },
  {
    title: "Geen openstaande RSZ- of fiscale schulden",
    body: "Attest van de RSZ en een recent uittreksel uit de databank van de FOD Financiën. Vernieuwing jaarlijks.",
  },
  {
    title: "Akkoord met zes partnervergaderingen per jaar",
    body: "Tweemaandelijks overleg in de regio — afstemming over werfplanning, materialen en gedeelde standaarden. Geen vrijblijvend lidmaatschap.",
  },
  {
    title: "Peer-validatie door bestaande partners",
    body: "Aanvaarding gebeurt pas na een werfbezoek en een unaniem advies van de architect en minstens twee vakspecialisten uit dezelfde regiokring.",
  },
];

const CERTIFICATIES = [
  {
    label: "BIV-erkenning",
    body: "Voor architecten — inschrijving bij de Orde van Architecten, met opvraagbaar tabelnummer.",
  },
  {
    label: "Embuild lidmaatschap",
    body: "Sectorfederatie voor aannemers, waar van toepassing per rubriek.",
  },
  {
    label: "Bouwunie",
    body: "Voor kmo-aannemers — wij respecteren beide federaties als gelijkwaardig.",
  },
  {
    label: "BENOR-keurmerk",
    body: "Voor materialen — gewapend beton, isolatie, dakelementen. Documentatie per werf opvraagbaar.",
  },
  {
    label: "VCA-attesten",
    body: "Veiligheid Checklist Aannemers voor uitvoerders die op werven met meerdere aannemers aanwezig zijn.",
  },
  {
    label: "EPB-verslaggeving",
    body: "Voor projecten waar de Vlaamse energieprestatieregelgeving van toepassing is.",
  },
];

const CIJFERS = [
  { value: "19", label: "Architectenbureaus in het netwerk" },
  { value: "63", label: "Vakspecialisten over alle rubrieken" },
  { value: "4", label: "Vlaamse regio's actief" },
  { value: "2", label: "Jaar in werking" },
];

export default function OverOnsPage() {
  return (
    <article className="relative pt-36 pb-14 sm:pt-44 md:pt-52">
      <AboutPageSchema />
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "/" },
          { name: "Over ons", url: "/over-ons" },
        ]}
      />

      <section className="mx-auto max-w-[1280px] px-6 md:px-16 lg:px-24">
        <p className="enter-up delay-300 text-[18px] text-ink-soft">
          Over Renocheck Professionals
        </p>

        <h1 className="enter-up delay-400 mt-6 font-display text-[clamp(3rem,8vw,7rem)] font-medium leading-[0.98] text-ink">
          Selectie boven{" "}
          <span className="italic text-sage">zoekvolume</span>.
        </h1>

        <p className="enter-up delay-500 mt-8 max-w-2xl text-[17px] leading-[1.65] text-ink-soft md:text-[19px]">
          Renocheck Professionals is een gesloten kring van één
          architectenbureau en veertien vakspecialisten per Vlaamse regio.
          Wij verkopen geen leads en houden geen veiling. Wij valideren
          partners op vakmanschap, regionale reputatie en peer-acceptatie —
          en houden de kring bewust klein.
        </p>
      </section>

      <section
        aria-labelledby="verhaal-title"
        className="relative mt-28 md:mt-44"
      >
        <div className="mx-auto max-w-[1280px] px-6 md:px-16 lg:px-24">
          <div className="grid gap-14 md:grid-cols-12 md:items-start md:gap-16">
            <div className="min-w-0 md:col-span-5">
              <p className="text-[10px] font-medium uppercase tracking-[0.32em] text-ink-muted">
                Het verhaal
              </p>
              <h2
                id="verhaal-title"
                className="mt-4 font-display text-[clamp(2rem,4vw,3.5rem)] font-medium leading-[1.05] text-ink"
              >
                Ontstaan op een{" "}
                <span className="italic text-sage">werf</span>.
              </h2>
            </div>
            <div className="min-w-0 space-y-6 text-[17px] leading-[1.75] text-ink-soft md:col-span-7 md:text-[18px]">
              <p>
                Renocheck Professionals werd opgericht na vijftien jaar
                werven waarop zes tot acht aannemers elkaar tegenkwamen
                zonder elkaar te kennen — elk met een eigen planning, eigen
                onderaannemer, eigen versie van de waarheid. Wat ontbrak,
                was niet aanbod. Wat ontbrak, was samenhang tussen de
                vakmensen op één en hetzelfde dossier.
              </p>
              <p>
                De keuze was bewust: geen open marktplaats, geen
                offerteveiling, geen advertentiemodel. In plaats daarvan
                een gesloten kring per regio waar de architect en de
                vakspecialisten elkaar kennen, elkaars werk al gezien
                hebben en met dezelfde uitvoeringsstandaard werken. Klein
                genoeg om iedereen verantwoordelijk te houden, groot genoeg
                om een volledig bouwdossier te dragen.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section
        aria-labelledby="oprichter-title"
        className="relative mt-28 md:mt-44"
      >
        <div className="mx-auto max-w-[1280px] px-6 md:px-16 lg:px-24">
          <div className="grid gap-12 md:grid-cols-12 md:items-center md:gap-16">
            <div className="min-w-0 md:col-span-4">
              <div className="flex h-32 w-32 items-center justify-center rounded-full bg-sage/10 ring-1 ring-sage/30">
                <span className="font-display text-[40px] font-medium leading-none text-sage">
                  MV
                </span>
              </div>
              <p className="mt-5 text-[12px] uppercase tracking-[0.22em] text-ink-muted">
                Maxime Vandenbroucke (oprichter)
              </p>
              <p className="mt-2 text-[15px] text-ink-soft">
                Oprichter &amp; netwerkcoördinator
              </p>
            </div>

            <div className="min-w-0 md:col-span-8">
              <p className="text-[10px] font-medium uppercase tracking-[0.32em] text-ink-muted">
                De oprichter
              </p>
              <h2
                id="oprichter-title"
                className="mt-4 font-display text-[clamp(2rem,4vw,3.5rem)] font-medium leading-[1.05] text-ink"
              >
                Vijftien jaar op de{" "}
                <span className="italic text-sage">werf</span>.
              </h2>
              <div className="mt-8 space-y-5 text-[17px] leading-[1.75] text-ink-soft md:text-[18px]">
                <p>
                  Maxime Vandenbroucke werkt sinds 2011 in de bouwsector in
                  West- en Oost-Vlaanderen — eerst als werfleider bij een
                  algemeen aannemer, daarna als zelfstandig
                  projectcoördinator voor architectenbureaus.
                </p>
                <p>
                  In die periode bouwde hij een persoonlijk register op van
                  vakspecialisten die hij meerdere keren op werven had zien
                  werken — een notitieboek dat uiteindelijk het startpunt
                  werd voor het Renocheck Professionals netwerk.
                </p>
                <p>
                  Zijn rol vandaag is bewust beperkt: hij voert de
                  intakegesprekken met nieuwe partners, organiseert de
                  partnervergaderingen en bewaakt dat de regiokringen
                  klein en coherent blijven. Geen sales, geen acquisitie,
                  geen openstaande deals.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        aria-labelledby="selectie-title"
        className="relative mt-28 md:mt-44"
      >
        <div className="mx-auto max-w-[1280px] px-6 md:px-16 lg:px-24">
          <div className="max-w-2xl">
            <p className="text-[10px] font-medium uppercase tracking-[0.32em] text-ink-muted">
              Onze selectiemethode
            </p>
            <h2
              id="selectie-title"
              className="mt-4 font-display text-[clamp(2rem,4vw,3.5rem)] font-medium leading-[1.05] text-ink"
            >
              Zes harde{" "}
              <span className="italic text-sage">criteria</span>.
            </h2>
            <p className="mt-7 text-[16px] leading-[1.7] text-ink-soft md:text-[17px]">
              Elke kandidaat-partner doorloopt dezelfde controle, ongeacht
              rubriek of regio. We documenteren elke stap en hernieuwen
              ze jaarlijks.
            </p>
          </div>

          <ul className="mt-14 grid gap-8 md:mt-20 md:grid-cols-2 md:gap-x-16 md:gap-y-12">
            {SELECTIE_CRITERIA.map((c) => (
              <li key={c.title} className="flex min-w-0 items-start gap-5">
                <span
                  aria-hidden="true"
                  className="mt-1 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-sage/15 text-sage"
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="2 7.5 5.5 11 12 3.5" />
                  </svg>
                </span>
                <div className="min-w-0">
                  <h3 className="font-display text-[20px] font-medium leading-[1.2] text-ink md:text-[22px]">
                    {c.title}
                  </h3>
                  <p className="mt-3 text-[15px] leading-[1.7] text-ink-soft md:text-[16px]">
                    {c.body}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section
        aria-labelledby="certificaties-title"
        className="relative mt-28 md:mt-44"
      >
        <div className="mx-auto max-w-[1280px] px-6 md:px-16 lg:px-24">
          <div className="grid gap-14 md:grid-cols-12 md:items-start md:gap-16">
            <div className="min-w-0 md:col-span-5">
              <p className="text-[10px] font-medium uppercase tracking-[0.32em] text-ink-muted">
                Certificaties en lidmaatschappen
              </p>
              <h2
                id="certificaties-title"
                className="mt-4 font-display text-[clamp(2rem,4vw,3.5rem)] font-medium leading-[1.05] text-ink"
              >
                Wat we{" "}
                <span className="italic text-sage">opvragen</span>.
              </h2>
              <p className="mt-7 text-[16px] leading-[1.7] text-ink-soft md:text-[17px]">
                Per rubriek vragen we de relevante erkenningen en
                certificaten op. Documenten worden bewaard in het
                partnerportaal en zijn beschikbaar voor de andere
                netwerkleden die met de partner samenwerken.
              </p>
              <p className="mt-5 text-[15px] leading-[1.7] text-ink-muted">
                Wij gebruiken geen federatielogo's op deze pagina zolang
                we de individuele lidmaatschappen van elke partner niet
                publiek kunnen koppelen. De inhoudelijke vereisten staan
                hieronder.
              </p>
            </div>

            <ul className="min-w-0 space-y-4 md:col-span-7">
              {CERTIFICATIES.map((c) => (
                <li
                  key={c.label}
                  className="rounded-2xl border border-ink-hair/60 bg-surface-soft/60 p-5 md:p-6"
                >
                  <div className="flex flex-wrap items-baseline gap-x-4 gap-y-2">
                    <span className="inline-flex items-center rounded-full border border-sage/40 bg-sage/10 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.18em] text-sage-dark">
                      {c.label}
                    </span>
                  </div>
                  <p className="mt-3 text-[15px] leading-[1.7] text-ink-soft md:text-[16px]">
                    {c.body}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section
        aria-labelledby="cijfers-title"
        className="relative mt-28 md:mt-44"
      >
        <div className="mx-auto max-w-[1280px] px-6 md:px-16 lg:px-24">
          <div className="max-w-2xl">
            <p className="text-[10px] font-medium uppercase tracking-[0.32em] text-ink-muted">
              In cijfers
            </p>
            <h2
              id="cijfers-title"
              className="mt-4 font-display text-[clamp(2rem,4vw,3.5rem)] font-medium leading-[1.05] text-ink"
            >
              Klein,{" "}
              <span className="italic text-sage">controleerbaar</span>.
            </h2>
            <p className="mt-7 text-[16px] leading-[1.7] text-ink-soft md:text-[17px]">
              De cijfers hieronder zijn de actuele stand van het
              netwerk. We groeien niet sneller dan onze peer-validatie
              kan volgen.
            </p>
          </div>

          <dl className="mt-14 grid gap-10 sm:grid-cols-2 md:mt-20 md:grid-cols-4 md:gap-12">
            {CIJFERS.map((c) => (
              <div
                key={c.label}
                className="border-t border-ink-hair/60 pt-6"
              >
                <dt className="font-display text-[clamp(3rem,6vw,4.5rem)] font-medium leading-none text-ink">
                  {c.value}
                </dt>
                <dd className="mt-4 text-[14px] leading-[1.55] text-ink-soft md:text-[15px]">
                  {c.label}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section
        aria-labelledby="manifesto-title"
        className="relative mt-28 md:mt-44"
      >
        <div className="mx-auto max-w-[1280px] px-6 md:px-16 lg:px-24">
          <div className="rounded-[32px] bg-surface-warm p-8 ring-1 ring-ink-hair/40 sm:p-12 md:p-16 lg:p-20">
            <p className="text-[10px] font-medium uppercase tracking-[0.32em] text-ink-muted">
              Manifesto
            </p>
            <h2
              id="manifesto-title"
              className="mt-4 max-w-3xl font-display text-[clamp(2rem,4.5vw,3.75rem)] font-medium leading-[1.02] text-ink"
            >
              Geen{" "}
              <span className="italic text-sage">lead-veiling</span>.
            </h2>
            <div className="mt-8 max-w-3xl space-y-5 text-[17px] leading-[1.75] text-ink-soft md:text-[18px]">
              <p>
                Andere platformen verkopen elke aanvraag aan vijf, soms
                tien aannemers tegelijk. Dat model rekent op volume: hoe
                meer offertes er gegenereerd worden, hoe meer commissie.
                De partner met het grootste advertentiebudget wint, niet
                de partner met het beste werk.
              </p>
              <p>
                Renocheck Professionals werkt niet op commissie per
                lead. Partners betalen een vaste jaarbijdrage voor hun
                plek in de regiokring, en wij stellen per project één
                team voor — niet vijf concurrerende. U vergelijkt geen
                offertes meer; u beslist op basis van één coherent
                voorstel.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto mt-28 max-w-[1280px] px-6 md:mt-44 md:px-16 lg:px-24">
        <div className="grid gap-12 md:grid-cols-12 md:items-center md:gap-16">
          <div className="min-w-0 md:col-span-5">
            <p className="text-[18px] text-ink-soft">Voor vakspecialisten</p>
            <h2 className="mt-6 font-display text-[clamp(2rem,4vw,3.5rem)] font-medium leading-[1.05] text-ink">
              Word{" "}
              <span className="italic text-sage">partner</span>.
            </h2>
            <div className="mt-10">
              <PillLink href="/#partner-aanvraag">Partner worden</PillLink>
            </div>
          </div>
          <div className="min-w-0 md:col-span-7">
            <p className="text-[19px] leading-[1.7] text-ink-soft md:text-[20px]">
              Voldoet uw onderneming aan de zes criteria hierboven en is
              uw rubriek in uw regio nog niet ingevuld? Dien een
              aanvraag in. We nemen binnen twee werkweken contact op
              voor een intake en, indien gunstig, een werfbezoek.
            </p>
            <p className="mt-5 text-[15px] leading-[1.7] text-ink-muted">
              Liever eerst overleggen?{" "}
              <Link
                href="/contact"
                className="font-medium text-ink underline-offset-4 hover:text-sage hover:underline"
              >
                Neem contact op
              </Link>
              .
            </p>
          </div>
        </div>
      </section>
    </article>
  );
}
