import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PillLink } from "@/components/pill-button";
import {
  BreadcrumbSchema,
  FAQPageSchema,
} from "@/components/structured-data";

export const metadata: Metadata = {
  title: "Isolatie — Renovatiegids",
  description:
    "Praktische gids isolatie in Vlaanderen 2026: dak, muur en vloer, EPB-eisen, Mijn VerbouwPremie, kostprijs per m² en hoe u een betrouwbare partner kiest.",
  alternates: { canonical: "/renovatiegids/isolatie" },
  openGraph: {
    title: "Isolatie — Renovatiegids · Renocheck Professionals",
    description:
      "Alles wat u moet weten over dak-, muur- en vloerisolatie in Vlaanderen — premies 2026, materialen, kostprijs en valkuilen.",
    url: "/renovatiegids/isolatie",
    type: "article",
  },
  twitter: {
    title: "Isolatie — Renovatiegids · Renocheck Professionals",
    description:
      "Premies, EPB-eisen en richtprijzen voor dak, spouwmuur en vloerisolatie in Vlaanderen.",
  },
};

const COST_TABLE = [
  {
    item: "Dakisolatie hellend dak (binnenzijde)",
    price: "€ 45 – € 75 per m²",
    note: "Inclusief glaswol of houtvezel + dampscherm en afwerking.",
  },
  {
    item: "Dakisolatie plat dak (buitenzijde, PIR)",
    price: "€ 90 – € 140 per m²",
    note: "Incl. afbraak bestaande roofing, dampscherm en nieuwe EPDM.",
  },
  {
    item: "Na-isolatie spouwmuur",
    price: "€ 22 – € 38 per m²",
    note: "Inblazen van EPS-parels of minerale wol — enkel bij geschikte spouw.",
  },
  {
    item: "Binnenisolatie buitenmuur",
    price: "€ 65 – € 110 per m²",
    note: "Incl. dampregulerend systeem en nieuwe afwerklaag.",
  },
  {
    item: "Buitenisolatie (gevelisolatie + crepi)",
    price: "€ 150 – € 230 per m²",
    note: "Volledig systeem inclusief stelling en pleisterafwerking.",
  },
  {
    item: "Vloerisolatie kelder of kruipruimte",
    price: "€ 35 – € 60 per m²",
    note: "Onderzijde of bovenzijde — afhankelijk van toegankelijkheid.",
  },
];

const STEPS = [
  {
    nr: "01",
    title: "Kennismaking en plaatsbezoek",
    body: "Een vakspecialist bekijkt het bestaande schrijnwerk, de spouwmuur en het dak. Geen offerte zonder dat iemand effectief de woning gezien heeft.",
  },
  {
    nr: "02",
    title: "EPB- en premie-advies",
    body: "U krijgt een overzicht van de R-waarden die nodig zijn voor de premie én van wat realistisch haalbaar is in uw woning.",
  },
  {
    nr: "03",
    title: "Materiaalkeuze en gedetailleerde offerte",
    body: "Eén offerte met duidelijke posten: materiaal, dikte, R-waarde, dampscherm, randafwerking en oplevering — geen verborgen meerwerk.",
  },
  {
    nr: "04",
    title: "Planning afgestemd op andere werken",
    body: "Isolatie raakt aan dakwerken, schrijnwerk en ventilatie. Binnen het netwerk wordt de volgorde mét de andere partners afgesproken.",
  },
  {
    nr: "05",
    title: "Uitvoering en luchtdichtheidsmeting",
    body: "Bij ambitieuze renovaties wordt een blowerdoor-meting voorzien — koudebruggen worden zichtbaar vóór de afwerking dichtgaat.",
  },
  {
    nr: "06",
    title: "EPC-attest en premiedossier",
    body: "Na oplevering volgt het nieuwe EPC en wordt het premiedossier ingediend bij Mijn VerbouwPremie — papierwerk inbegrepen.",
  },
];

const MISTAKES = [
  {
    title: "Spouwmuur inblazen zonder spouwonderzoek",
    body: "Niet elke spouw is geschikt: mortelresten, vochtbruggen of een te smalle spouw maken inblazen risicovol. Een endoscopisch onderzoek vooraf is geen luxe.",
  },
  {
    title: "Dakisolatie zonder dampscherm",
    body: "Een verkeerd of ontbrekend dampscherm zorgt voor inwendige condensatie in de isolatielaag — onzichtbaar maar funest voor de houtstructuur.",
  },
  {
    title: "Koudebruggen vergeten aan dakranden en aansluitingen",
    body: "De grootste warmteverliezen zitten meestal aan muurplaten, dakvensters en aansluitingen rond schrijnwerk — net die details worden bij goedkope offertes overgeslagen.",
  },
  {
    title: "Premie missen door verkeerde volgorde",
    body: "Wie eerst nieuwe ramen plaatst en pas daarna de muur isoleert, mist soms de combinatiepremie. Laat de volgorde adviseren vóór u tekent.",
  },
];

const FAQ_ITEMS = [
  {
    question: "Heb ik recht op een premie voor isolatie in Vlaanderen in 2026?",
    answer:
      "Ja, via Mijn VerbouwPremie kan u premies krijgen voor dak-, muur- en vloerisolatie, op voorwaarde dat de R-waarden voldoen aan de Vlaamse minima (dak Rd ≥ 4,5 m²K/W, spouwmuur Rd ≥ 1,3 m²K/W, vloer Rd ≥ 2 m²K/W). Het bedrag hangt af van uw inkomenscategorie en of u eigenaar-bewoner of verhuurder bent. Combinaties met dakvernieuwing of ventilatie kunnen het premiebedrag verhogen.",
  },
  {
    question: "Hoeveel kost na-isolatie van een spouwmuur per m²?",
    answer:
      "Richtprijs in Vlaanderen ligt tussen € 22 en € 38 per m² gevel, inclusief spouwonderzoek, EPS-parels of minerale wol en oplevering. Het werk gebeurt typisch op één tot twee dagen. Prijzen variëren per regio en per type spouw — een correcte offerte vermeldt altijd het materiaal en de behaalde Rd-waarde.",
  },
  {
    question: "Is binnenisolatie of buitenisolatie beter voor een bestaande woning?",
    answer:
      "Buitenisolatie is bouwfysisch superieur omdat ze koudebruggen elimineert en de muur thermisch beschermt, maar ze verandert het gevelbeeld en is duurder (€ 150 – € 230 per m²). Binnenisolatie is haalbaar bij beschermde gevels of rijwoningen zonder achterliggende ruimte, maar vraagt een correct dampregulerend systeem om vochtproblemen te vermijden. De keuze hangt af van de gevel, het budget en de beschermingsstatus van de woning.",
  },
  {
    question: "Welk isolatiemateriaal kies ik: PUR, glaswol of natuurlijke isolatie?",
    answer:
      "PUR en PIR scoren het best op isolatiewaarde per cm dikte — ideaal als de ruimte beperkt is. Glaswol en rotswol zijn brandveiliger, akoestisch sterker en goedkoper, ideaal voor hellende daken. Natuurlijke materialen zoals houtvezel, hennep of cellulose bufferen vocht en warmte beter, maar zijn 20 tot 40 procent duurder. Een goede partner adviseert op basis van toepassing, niet op basis van wat hij in voorraad heeft.",
  },
  {
    question: "Moet ik een EPC laten opmaken na isolatiewerken?",
    answer:
      "Een nieuw EPC is niet wettelijk verplicht na isolatiewerken, behalve bij verkoop of verhuur. Het is wel sterk aan te raden: het bevestigt de behaalde resultaten en is nodig voor de uitbetaling van bepaalde combinatiepremies. Een EPC-deskundige kost gemiddeld € 200 – € 350 voor een eengezinswoning.",
  },
];

export default function IsolatieGuidePage() {
  return (
    <article className="relative pt-36 pb-14 sm:pt-44 md:pt-52">
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "/" },
          { name: "Renovatiegids", url: "/renovatiegids" },
          { name: "Isolatie", url: "/renovatiegids/isolatie" },
        ]}
      />
      <FAQPageSchema items={FAQ_ITEMS} />

      <section className="mx-auto max-w-[1280px] px-6 md:px-16 lg:px-24">
        <p className="enter-up delay-300 text-[10px] font-medium uppercase tracking-[0.32em] text-ink-muted">
          Renovatiegids · Rubriek
        </p>

        <h1 className="enter-up delay-400 mt-6 font-display text-[clamp(3rem,8vw,7rem)] font-medium leading-[0.98] text-ink">
          Doordacht{" "}
          <span className="italic text-sage">isoleren</span> in
          Vlaanderen.
        </h1>

        <p className="enter-up delay-500 mt-8 max-w-2xl text-[17px] leading-[1.65] text-ink-soft md:text-[19px]">
          Een woning isoleren is geen lijst van losse maatregelen. Het is een
          samenhangend bouwfysisch verhaal: dak, muur, vloer en
          luchtdichtheid versterken elkaar, of ondermijnen elkaar. Deze gids
          zet de richtprijzen, de Vlaamse premies en de meest gemaakte
          fouten op een rij — geschreven voor wie in 2026 verbouwt.
        </p>
      </section>

      <section className="relative mt-28 md:mt-44">
        <div className="mx-auto max-w-[1280px] px-6 md:px-16 lg:px-24">
          <div className="grid gap-14 md:grid-cols-12 md:items-center md:gap-16">
            <div className="min-w-0 md:col-span-7">
              <div className="relative aspect-[5/4] w-full overflow-hidden rounded-[32px] bg-ink/5">
                <Image
                  src="https://images.unsplash.com/photo-1581094288338-2314dddb7ece?auto=format&fit=crop&w=1800&q=90"
                  alt="Dakisolatie tussen kepers met minerale wol"
                  fill
                  sizes="(max-width: 768px) 100vw, 58vw"
                  className="object-cover"
                />
              </div>
            </div>
            <div className="min-w-0 md:col-span-5">
              <p className="text-[18px] text-ink-soft">Waarom u zorgvuldig kiest</p>
              <h2 className="mt-6 font-display text-[clamp(2rem,4vw,3.5rem)] font-medium leading-[1.05] text-ink">
                Isolatie is een{" "}
                <span className="italic text-sage">detailvak</span>.
              </h2>
              <div className="mt-8 space-y-5 text-[17px] leading-[1.75] text-ink-soft md:text-[18px]">
                <p>
                  Goedkope isolatie bestaat niet. Wat goedkoop oogt, mist
                  doorgaans een dampscherm, een correcte randafwerking of
                  een eerlijk plaatsbezoek vooraf — en u betaalt het in
                  vochtproblemen achteraf.
                </p>
                <p>
                  Een goede isolatiepartner werkt op basis van R-waarden,
                  niet van &quot;dikte in centimeters&quot;.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative mt-28 md:mt-44">
        <div className="mx-auto max-w-[1280px] px-6 md:px-16 lg:px-24">
          <div className="max-w-2xl">
            <p className="text-[10px] font-medium uppercase tracking-[0.32em] text-ink-muted">
              Richtprijzen
            </p>
            <h2 className="mt-4 font-display text-[clamp(2rem,4vw,3.5rem)] font-medium leading-[1.05] text-ink">
              Wat dit kost in{" "}
              <span className="italic text-sage">2026</span>.
            </h2>
            <p className="mt-8 text-[17px] leading-[1.7] text-ink-soft">
              Onderstaande prijzen zijn richtwaarden inclusief 6% btw voor
              renovaties van woningen ouder dan tien jaar. Materialen, de
              toegankelijkheid van uw woning en de regio bepalen mee de
              uiteindelijke offerte.
            </p>
          </div>

          <ul className="mt-14 divide-y divide-ink-hair/40 border-y border-ink-hair/40">
            {COST_TABLE.map((row) => (
              <li
                key={row.item}
                className="grid gap-2 py-6 md:grid-cols-12 md:items-baseline md:gap-8"
              >
                <h3 className="font-display text-[20px] font-medium leading-[1.2] text-ink md:col-span-5 md:text-[22px]">
                  {row.item}
                </h3>
                <p className="text-[17px] text-sage-dark md:col-span-3 md:text-[18px]">
                  {row.price}
                </p>
                <p className="text-[15px] leading-[1.6] text-ink-soft md:col-span-4 md:text-[16px]">
                  {row.note}
                </p>
              </li>
            ))}
          </ul>

          <p className="mt-8 text-[14px] leading-[1.6] text-ink-muted">
            Richtwaarden voor Vlaanderen, juni 2026. Vraag minstens twee
            offertes op om uw eigen werf te kalibreren — een eerlijke
            isolateur legt prijsverschillen helder uit.
          </p>
        </div>
      </section>

      <section className="relative mt-28 md:mt-44">
        <div className="mx-auto max-w-[1280px] px-6 md:px-16 lg:px-24">
          <div className="grid gap-14 md:grid-cols-12 md:gap-16">
            <div className="min-w-0 md:col-span-5">
              <p className="text-[10px] font-medium uppercase tracking-[0.32em] text-ink-muted">
                Vlaanderen 2026
              </p>
              <h2 className="mt-4 font-display text-[clamp(2rem,4vw,3.5rem)] font-medium leading-[1.05] text-ink">
                Premies en{" "}
                <span className="italic text-sage">regelgeving</span>.
              </h2>
            </div>
            <div className="min-w-0 md:col-span-7">
              <div className="space-y-7 text-[17px] leading-[1.75] text-ink-soft md:text-[18px]">
                <p>
                  <strong className="font-medium text-ink">
                    Mijn VerbouwPremie
                  </strong>{" "}
                  bundelt sinds 2022 de vroegere energiepremies. Het bedrag
                  hangt af van uw inkomenscategorie. Voor isolatie gelden
                  in 2026 minimum-R-waarden: Rd ≥ 4,5 m²K/W voor dak,
                  Rd ≥ 1,3 m²K/W voor spouwmuur, Rd ≥ 2 m²K/W voor vloer.
                  Onder die waarden krijgt u niets uitbetaald.
                </p>
                <p>
                  <strong className="font-medium text-ink">
                    EPB en E-peil
                  </strong>{" "}
                  spelen vooral bij ingrijpende renovaties: zodra u 75% van
                  de buitenschil aanpakt of de hoofdwarmte vervangt,
                  ontstaat een EPB-aangifteplicht en moet uw woning naar
                  een minimum E-peil. Een EPB-verslaggever rekent dit
                  vooraf door.
                </p>
                <p>
                  <strong className="font-medium text-ink">
                    Renovatieverplichting
                  </strong>{" "}
                  Vlaanderen verplicht kopers van een woning met EPC-label
                  E of F om binnen vijf jaar minimum label D te behalen.
                  Isolatie is doorgaans de snelste hefboom om dit te
                  halen.
                </p>
                <p>
                  <strong className="font-medium text-ink">
                    Btw-tarief 6%
                  </strong>{" "}
                  geldt op materialen én plaatsing bij woningen ouder dan
                  tien jaar — laat dit zwart op wit in de offerte zetten.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative mt-28 md:mt-44">
        <div className="mx-auto max-w-[1280px] px-6 md:px-16 lg:px-24">
          <div className="grid gap-12 md:grid-cols-2 md:gap-16">
            <div className="min-w-0">
              <p className="text-[10px] font-medium uppercase tracking-[0.32em] text-ink-muted">
                Groene vlaggen
              </p>
              <h3 className="mt-4 font-display text-[28px] font-medium leading-[1.1] text-ink md:text-[32px]">
                Hoe u een{" "}
                <span className="italic text-sage">betrouwbare</span>{" "}
                partner herkent.
              </h3>
              <ul className="mt-8 space-y-4 text-[16px] leading-[1.7] text-ink-soft">
                {[
                  "Komt vóór de offerte langs en kruipt op zolder of in de kruipruimte.",
                  "Spreekt over R- en U-waarden, niet enkel over dikte in centimeters.",
                  "Vermeldt het dampscherm en de aansluitdetails apart in de offerte.",
                  "Werkt met een vaste ploeg, geen wisselende onderaannemers per dag.",
                  "Geeft een schriftelijke garantie op luchtdichtheid en materiaal.",
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
            <div className="min-w-0">
              <p className="text-[10px] font-medium uppercase tracking-[0.32em] text-ink-muted">
                Rode vlaggen
              </p>
              <h3 className="mt-4 font-display text-[28px] font-medium leading-[1.1] text-ink md:text-[32px]">
                Wanneer u beter{" "}
                <span className="italic text-sage">verder</span> zoekt.
              </h3>
              <ul className="mt-8 space-y-4 text-[16px] leading-[1.7] text-ink-soft">
                {[
                  "Offerte op basis van louter foto's of een telefoongesprek.",
                  "Forfaitprijzen zonder R-waarde of materiaalmerk.",
                  "Acquisitie aan de deur of via colportage, vaak rond “premie loopt af”.",
                  "Geen vermelding van btw-tarief 6% of geen geregistreerd aannemersnummer.",
                  "Belooft dezelfde week te starten — vakmensen hebben wachttijd.",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span
                      aria-hidden="true"
                      className="mt-2 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-ink/40"
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="relative mt-28 md:mt-44">
        <div className="mx-auto max-w-[1280px] px-6 md:px-16 lg:px-24">
          <div className="max-w-2xl">
            <p className="text-[10px] font-medium uppercase tracking-[0.32em] text-ink-muted">
              Stappenplan
            </p>
            <h2 className="mt-4 font-display text-[clamp(2rem,4vw,3.5rem)] font-medium leading-[1.05] text-ink">
              Van kennismaking tot{" "}
              <span className="italic text-sage">oplevering</span>.
            </h2>
          </div>

          <ul className="mt-16 grid gap-10 md:grid-cols-2 md:gap-x-14 md:gap-y-14 lg:grid-cols-3">
            {STEPS.map((s) => (
              <li key={s.nr} className="min-w-0">
                <span className="font-display text-[56px] font-light leading-none text-sage md:text-[64px]">
                  {s.nr}
                </span>
                <div aria-hidden="true" className="mt-6 h-px w-12 bg-ink-hair" />
                <h3 className="mt-6 font-display text-[24px] font-medium leading-[1.15] text-ink md:text-[26px]">
                  {s.title}
                </h3>
                <p className="mt-4 text-[16px] leading-[1.7] text-ink-soft">
                  {s.body}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="relative mt-28 md:mt-44">
        <div className="mx-auto max-w-[1280px] px-6 md:px-16 lg:px-24">
          <div className="max-w-2xl">
            <p className="text-[10px] font-medium uppercase tracking-[0.32em] text-ink-muted">
              Wat u beter vermijdt
            </p>
            <h2 className="mt-4 font-display text-[clamp(2rem,4vw,3.5rem)] font-medium leading-[1.05] text-ink">
              Veelgemaakte{" "}
              <span className="italic text-sage">fouten</span>.
            </h2>
          </div>

          <div className="mt-14 grid gap-10 md:grid-cols-2 md:gap-12">
            {MISTAKES.map((m) => (
              <div key={m.title} className="min-w-0">
                <h3 className="font-display text-[22px] font-medium leading-[1.2] text-ink md:text-[24px]">
                  {m.title}
                </h3>
                <p className="mt-4 text-[16px] leading-[1.7] text-ink-soft">
                  {m.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative mt-28 md:mt-44">
        <div className="mx-auto max-w-[1280px] px-6 md:px-16 lg:px-24">
          <div className="grid gap-14 md:grid-cols-12 md:gap-16">
            <div className="min-w-0 md:col-span-5">
              <p className="text-[10px] font-medium uppercase tracking-[0.32em] text-ink-muted">
                Binnen het netwerk
              </p>
              <h2 className="mt-4 font-display text-[clamp(2rem,4vw,3.5rem)] font-medium leading-[1.05] text-ink">
                Isolatie bij Renocheck{" "}
                <span className="italic text-sage">Professionals</span>.
              </h2>
            </div>
            <div className="min-w-0 md:col-span-7">
              <div className="space-y-6 text-[17px] leading-[1.75] text-ink-soft md:text-[18px]">
                <p>
                  Per Vlaamse regio werkt Renocheck Professionals samen met
                  één isolateur — geselecteerd op vakkennis, een correct
                  premiedossier en aantoonbare luchtdichtheidsresultaten.
                  Niet op marketingbudget. De partner werkt vaste afspraken
                  met de architect, de dakwerker en de schrijnwerker uit
                  hetzelfde netwerk, zodat aansluitingen en planning op
                  voorhand kloppen.
                </p>
                <p>
                  Zoekt u een isolateur in{" "}
                  <Link
                    href="/regio/west-vlaanderen"
                    className="font-medium text-ink underline-offset-4 hover:text-sage hover:underline"
                  >
                    West-Vlaanderen
                  </Link>
                  ,{" "}
                  <Link
                    href="/regio/oost-vlaanderen"
                    className="font-medium text-ink underline-offset-4 hover:text-sage hover:underline"
                  >
                    Oost-Vlaanderen
                  </Link>
                  ,{" "}
                  <Link
                    href="/regio/antwerpen"
                    className="font-medium text-ink underline-offset-4 hover:text-sage hover:underline"
                  >
                    Antwerpen
                  </Link>{" "}
                  of{" "}
                  <Link
                    href="/regio/vlaams-brabant"
                    className="font-medium text-ink underline-offset-4 hover:text-sage hover:underline"
                  >
                    Vlaams-Brabant
                  </Link>
                  ? Bekijk het volledige overzicht op{" "}
                  <Link
                    href="/vakspecialisten"
                    className="font-medium text-ink underline-offset-4 hover:text-sage hover:underline"
                  >
                    vakspecialisten
                  </Link>{" "}
                  of keer terug naar de{" "}
                  <Link
                    href="/renovatiegids"
                    className="font-medium text-ink underline-offset-4 hover:text-sage hover:underline"
                  >
                    renovatiegids
                  </Link>{" "}
                  voor andere rubrieken.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto mt-28 max-w-[1280px] px-6 md:mt-44 md:px-16 lg:px-24">
        <div className="relative overflow-hidden rounded-[32px] bg-surface-warm ring-1 ring-ink-hair/40">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-24 -bottom-24 h-96 w-96 rounded-full bg-sage/25 blur-3xl"
          />
          <div className="relative grid gap-10 p-7 sm:p-10 md:grid-cols-12 md:items-center md:gap-16 md:p-14 lg:p-20">
            <div className="min-w-0 md:col-span-7">
              <p className="text-[10px] font-medium uppercase tracking-[0.32em] text-ink-muted">
                De juiste partner
              </p>
              <h2 className="mt-5 font-display text-[clamp(2rem,4.5vw,3.75rem)] font-medium leading-[1.02] text-ink">
                Vraag de juiste isolatie{" "}
                <span className="italic text-sage">partner</span> in uw
                regio.
              </h2>
              <p className="mt-7 max-w-md text-[16px] leading-[1.7] text-ink-soft md:text-[17px]">
                Eén kort bericht. We koppelen u aan de isolateur uit ons
                netwerk in uw regio — met een eerlijk plaatsbezoek en een
                offerte die u meteen kan vergelijken.
              </p>
            </div>
            <div className="min-w-0 md:col-span-5 md:justify-self-end">
              <PillLink href="/contact?subject=question">
                Stel uw vraag
              </PillLink>
            </div>
          </div>
        </div>
      </section>
    </article>
  );
}
