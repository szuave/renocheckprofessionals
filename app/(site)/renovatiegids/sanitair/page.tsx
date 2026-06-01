import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { PillLink } from "@/components/pill-button";
import { BreadcrumbSchema, FAQPageSchema } from "@/components/structured-data";

export const metadata: Metadata = {
  title: "Sanitair — Renovatiegids",
  description:
    "Sanitair renovatie in Vlaanderen: kostenindicaties 2026, leidingen vernieuwen, warmwater-opties, premies en hoe u een betrouwbare sanitair-partner valideert.",
  alternates: { canonical: "/renovatiegids/sanitair" },
  openGraph: {
    title: "Sanitair — Renovatiegids · Renocheck Professionals",
    description:
      "Praktische gids voor badkamer- en sanitair-renovatie in Vlaanderen: kosten, leidingen, warmwater, premies en partnerselectie.",
    url: "/renovatiegids/sanitair",
    type: "article",
  },
  twitter: {
    title: "Sanitair — Renovatiegids · Renocheck Professionals",
    description:
      "Kosten, leidingen, warmwater, premies en partnerselectie voor uw sanitair-renovatie.",
  },
};

const FAQ_ITEMS = [
  {
    question: "Hoeveel kost een complete badkamerverbouwing in 2026?",
    answer:
      "Voor een volledige badkamerrenovatie van circa 6 m² rekent u in Vlaanderen op €12.000 tot €25.000 inclusief sanitair, tegelwerk en plaatsing. Hoogwaardige afwerking met inloopdouche, dubbele lavabo en design-kranen tilt het budget vlot naar €30.000. Prijzen zijn richtwaarden en variëren per regio en uitvoerder.",
  },
  {
    question: "Moet ik de oude koperen leidingen vervangen bij een renovatie?",
    answer:
      "Niet altijd, maar wel aanbevolen bij koperen leidingen ouder dan 35 jaar of bij vermoeden van corrosie en pin-holes. Moderne multilaag (PEX-AL-PEX) is sneller te plaatsen, kalk-bestendig en kent geen elektrolyse. Bij een ingrijpende badkamerverbouwing is dit het logische moment.",
  },
  {
    question: "Welke premies bestaan er voor sanitair-werken in Vlaanderen?",
    answer:
      "Sanitair op zich is meestal geen premiewerk, maar gekoppelde investeringen wel: een warmtepompboiler valt onder Mijn VerbouwPremie, regenwaterputten worden door sommige gemeenten gesubsidieerd, en aanpassingen voor toegankelijke badkamers kunnen via de aanpassingspremie verlopen. Het verlaagd btw-tarief van 6% geldt bij woningen ouder dan 10 jaar.",
  },
  {
    question: "Wat is een BENOR-keurmerk en waarom telt het?",
    answer:
      "BENOR is een Belgisch kwaliteitsmerk voor bouwproducten. Voor sanitair betekent het dat leidingen, fittingen en afvoeren voldoen aan strikte technische normen. Vraag uw installateur expliciet om BENOR-gekeurd materiaal — het is een eenvoudige proxy voor kwaliteit zonder dat u zelf in de productspecificaties moet duiken.",
  },
  {
    question: "Hoe lang duurt een badkamerrenovatie gemiddeld?",
    answer:
      "Reken op 3 tot 5 weken voor een volledige badkamer, mits het team goed op elkaar afgestemd is. Vertraging ontstaat vrijwel altijd door slechte volgorde der werken — bijvoorbeeld tegels die geplaatst worden voor de leidingen helemaal afgeperst zijn. Een gecoördineerd team bespaart hier dagen tot weken.",
  },
];

const STAPPEN = [
  {
    nr: "01",
    title: "Kennismaking en plaatsbezoek",
    body: "De sanitair-partner komt ter plaatse, meet op en bekijkt de bestaande leidingen, afvoeren en ventilatie. Geen offerte op afstand — een ernstig vakman wil weten wat er achter de tegels zit.",
  },
  {
    nr: "02",
    title: "Ontwerp en materiaalkeuze",
    body: "Indeling badkamer, keuze tussen inloopdouche of bad, lavabo-opstelling, kraanmerk en tegelpatroon. In een netwerk loopt dit parallel met de tegelzetter en de elektricien zodat stopcontacten en lichtpunten kloppen.",
  },
  {
    nr: "03",
    title: "Gedetailleerde offerte",
    body: "Eén offerte met opmeting per post: leidingwerk, sanitair, plaatsing, afvoer, afperstest. Geen verzamelpost \"diverse werken\". Vraag expliciet wat er gebeurt als er onder de chape iets onverwachts opduikt.",
  },
  {
    nr: "04",
    title: "Uitbraak en ruwbouw-sanitair",
    body: "Oude installatie eruit, nieuwe leidingen (multilaag of PE) op de juiste plaats, afvoeren met correct verval, afperstest onder druk. Pas dán mag de tegelzetter starten.",
  },
  {
    nr: "05",
    title: "Plaatsing en afwerking",
    body: "Sanitair wordt geplaatst, kranen aangesloten, siliconenvoegen afgewerkt. Een laatste drukproef en een schoonmaakronde horen erbij.",
  },
  {
    nr: "06",
    title: "Oplevering met dossier",
    body: "U ontvangt het plan van de leidingen, garantiebewijzen, en het BENOR-attest waar van toepassing. Bewaar dit — bij een volgende renovatie of verkoop is dit goud waard.",
  },
];

const FOUTEN = [
  {
    title: "Tegels plaatsen voor de afperstest",
    body: "Klassieker dan ooit. Eerst druk op de leidingen zetten, minimaal 24 uur laten staan, dán tegelen. Anders breekt u alles opnieuw open bij een lek.",
  },
  {
    title: "Goedkope kranen kiezen op de offerte",
    body: "Een €40-mengkraan oogt identiek aan een €180-exemplaar maar lekt na drie jaar. De arbeidskost om hem te vervangen is dezelfde — bespaar niet op het mechanisch hart.",
  },
  {
    title: "Geen ventilatie voorzien",
    body: "Mechanische afzuiging in de badkamer is geen luxe maar EPB-verplichting. Zonder degelijke ventilatie krijgt u schimmel binnen het jaar, ongeacht hoe duur uw tegels waren.",
  },
  {
    title: "Warmwaterleiding zonder isolatie",
    body: "Niet-geïsoleerde warmwaterleidingen kosten u jaarlijks honderden kWh aan stilstandverlies. Een rol leiding-isolatie kost minder dan een dag arbeid.",
  },
];

export default function SanitairGuidePage() {
  return (
    <article className="relative pt-36 pb-14 sm:pt-44 md:pt-52">
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "/" },
          { name: "Renovatiegids", url: "/renovatiegids" },
          { name: "Sanitair", url: "/renovatiegids/sanitair" },
        ]}
      />
      <FAQPageSchema items={FAQ_ITEMS} />

      <section className="mx-auto max-w-[1280px] px-6 md:px-16 lg:px-24">
        <p className="enter-up delay-300 text-[10px] font-medium uppercase tracking-[0.32em] text-ink-muted">
          Renovatiegids · Rubriek
        </p>

        <h1 className="enter-up delay-400 mt-6 font-display text-[clamp(3rem,8vw,7rem)] font-medium leading-[0.98] text-ink">
          Badkamer- en{" "}
          <span className="italic text-sage">sanitair</span>-renovatie zonder
          verrassingen.
        </h1>

        <p className="enter-up delay-500 mt-8 max-w-2xl text-[17px] leading-[1.65] text-ink-soft md:text-[19px]">
          Sanitair is de rubriek waar de meeste werven vertraging oplopen — niet
          door de kraan, maar door wat onder de chape verborgen zit. Deze gids
          beschrijft wat een renovatie in Vlaanderen anno 2026 kost, welke
          leidingen, boilers en premies relevant zijn, en hoe u een partner
          herkent die werk levert dat dertig jaar meegaat.
        </p>

        <div className="enter-up delay-600 mt-12">
          <PillLink href="/renovatiegids">Terug naar de gids</PillLink>
        </div>
      </section>

      <section
        aria-labelledby="kosten-title"
        className="relative mt-28 md:mt-44"
      >
        <div className="mx-auto max-w-[1280px] px-6 md:px-16 lg:px-24">
          <div className="grid gap-14 md:grid-cols-12 md:gap-16">
            <div className="min-w-0 md:col-span-5">
              <p className="text-[10px] font-medium uppercase tracking-[0.32em] text-ink-muted">
                Sanitair renovatie kosten
              </p>
              <h2
                id="kosten-title"
                className="mt-5 font-display text-[clamp(2rem,4vw,3.5rem)] font-medium leading-[1.05] text-ink"
              >
                Wat dit kost in{" "}
                <span className="italic text-sage">2026</span>.
              </h2>
              <p className="mt-8 text-[16px] leading-[1.7] text-ink-soft md:text-[17px]">
                Onderstaande prijzen zijn richtwaarden inclusief plaatsing en
                materiaal, exclusief btw. Het btw-tarief is 6% voor woningen
                ouder dan tien jaar — een aanzienlijk verschil dat u expliciet
                op de offerte moet zien staan.
              </p>
            </div>

            <div className="min-w-0 md:col-span-7">
              <ul className="divide-y divide-ink-hair/40 border-y border-ink-hair/40">
                {[
                  {
                    label: "Volledige badkamer 5–7 m² (basis)",
                    price: "€ 12.000 – € 18.000",
                  },
                  {
                    label: "Volledige badkamer 5–7 m² (premium afwerking)",
                    price: "€ 20.000 – € 30.000",
                  },
                  {
                    label: "Leidingen vernieuwen — appartement",
                    price: "€ 2.500 – € 5.000",
                  },
                  {
                    label: "Leidingen vernieuwen — gezinswoning",
                    price: "€ 5.000 – € 9.500",
                  },
                  {
                    label: "Inloopdouche (incl. tegelwerk)",
                    price: "€ 2.800 – € 4.500",
                  },
                  {
                    label: "Warmtepompboiler 200 L (geplaatst)",
                    price: "€ 3.200 – € 4.800",
                  },
                  {
                    label: "Klassieke gasboiler vervangen",
                    price: "€ 1.800 – € 2.600",
                  },
                  {
                    label: "Regenwaterput 5.000 L (inclusief aansluiting)",
                    price: "€ 2.500 – € 4.000",
                  },
                ].map((row) => (
                  <li
                    key={row.label}
                    className="flex items-baseline justify-between gap-6 py-5"
                  >
                    <span className="text-[16px] text-ink md:text-[17px]">
                      {row.label}
                    </span>
                    <span className="shrink-0 font-display text-[16px] text-ink-soft md:text-[18px]">
                      {row.price}
                    </span>
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-[14px] leading-[1.7] text-ink-muted">
                Prijzen variëren per regio — Antwerpen en Vlaams-Brabant liggen
                gemiddeld 8 tot 12 procent hoger dan West-Vlaanderen. Vraag
                altijd minstens twee offertes met dezelfde scope.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section
        aria-labelledby="leidingen-title"
        className="relative mt-28 md:mt-44"
      >
        <div className="mx-auto max-w-[1280px] px-6 md:px-16 lg:px-24">
          <div className="grid gap-14 md:grid-cols-12 md:items-center md:gap-16">
            <div className="min-w-0 md:col-span-7">
              <div className="relative aspect-[5/4] w-full overflow-hidden rounded-[32px] bg-ink/5">
                <Image
                  src="https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?auto=format&fit=crop&w=1800&q=90"
                  alt="Sanitaire leidingen in renovatie"
                  fill
                  sizes="(max-width: 768px) 100vw, 58vw"
                  className="object-cover"
                />
              </div>
            </div>
            <div className="min-w-0 md:col-span-5">
              <p className="text-[10px] font-medium uppercase tracking-[0.32em] text-ink-muted">
                Onder de tegels
              </p>
              <h2
                id="leidingen-title"
                className="mt-5 font-display text-[clamp(2rem,4vw,3.5rem)] font-medium leading-[1.05] text-ink"
              >
                Leidingen, boilers en{" "}
                <span className="italic text-sage">water</span>.
              </h2>
              <div className="mt-8 space-y-5 text-[16px] leading-[1.7] text-ink-soft md:text-[17px]">
                <p>
                  Koperen leidingen uit de jaren ’70 en ’80 vertonen vaak
                  corrosie aan de soldeernaden. Multilaag (PEX-AL-PEX) is
                  vandaag de standaard: kalk-bestendig, geluidsdempend, en
                  sneller te leggen via persfittingen. PE is geschikt voor
                  ondergrondse toevoer.
                </p>
                <p>
                  Voor warmwater verschuift het zwaartepunt naar de
                  warmtepompboiler — drie tot vier keer efficiënter dan een
                  elektrische accumulatie-boiler. Een gasboiler blijft
                  inzetbaar tot uw ketel aan vervanging toe is.
                </p>
                <p>
                  Regenwater hergebruiken voor toilet en wasmachine is in
                  veel Vlaamse gemeenten verplicht bij nieuwbouw of grondige
                  verbouwing. Voorzie een put van minstens 5.000 liter en een
                  drukgroep met droogloopbeveiliging.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        aria-labelledby="premies-title"
        className="relative mt-28 md:mt-44"
      >
        <div className="mx-auto max-w-[1280px] px-6 md:px-16 lg:px-24">
          <div className="max-w-2xl">
            <p className="text-[10px] font-medium uppercase tracking-[0.32em] text-ink-muted">
              Vlaanderen 2026
            </p>
            <h2
              id="premies-title"
              className="mt-4 font-display text-[clamp(2rem,4vw,3.5rem)] font-medium leading-[1.05] text-ink"
            >
              Premies en{" "}
              <span className="italic text-sage">regelgeving</span>.
            </h2>
          </div>

          <ul className="mt-14 grid gap-10 md:grid-cols-2 md:gap-12">
            {[
              {
                title: "Mijn VerbouwPremie",
                body: "Voor de warmtepompboiler kan u tot € 1.250 ontvangen, afhankelijk van uw inkomenscategorie. Aanvraag binnen twee jaar na factuurdatum via mijnverbouwpremie.be.",
              },
              {
                title: "Verlaagd btw-tarief 6%",
                body: "Voor woningen ouder dan 10 jaar geldt 6% btw op renovatiewerken inclusief sanitair en plaatsing. De aannemer moet dit expliciet vermelden op de offerte en factuur.",
              },
              {
                title: "EPC en EPB-verplichting",
                body: "Bij ingrijpende energetische renovatie geldt een minimale ventilatie-eis voor de badkamer. Vraag de EPB-verslaggever om dit mee op te nemen — sanitair is hierin geen losse rubriek.",
              },
              {
                title: "Gemeentelijke regenwaterpremie",
                body: "Veel Vlaamse gemeenten subsidiëren regenwaterputten en infiltratievoorzieningen tussen € 250 en € 1.000. Check de gemeente-website of vraag uw partner — die kent ze meestal uit het hoofd.",
              },
              {
                title: "Aanpassingspremie 65+",
                body: "Voor toegankelijk maken van de badkamer (inloopdouche, verhoogd toilet, handgrepen) bij oudere bewoners kan een aanpassingspremie tot € 1.250 worden aangevraagd via de Vlaamse overheid.",
              },
              {
                title: "Asbest-attest",
                body: "Bij sloop van oude sanitair-elementen of leidingen geïsoleerd met asbestkoorden geldt sinds 2022 een attestplicht. Een gecertificeerde verwijdering is geen optie maar wet.",
              },
            ].map((item) => (
              <li key={item.title} className="min-w-0">
                <h3 className="font-display text-[22px] font-medium leading-[1.2] text-ink md:text-[24px]">
                  {item.title}
                </h3>
                <p className="mt-4 text-[16px] leading-[1.7] text-ink-soft">
                  {item.body}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section
        aria-labelledby="partner-title"
        className="relative mt-28 md:mt-44"
      >
        <div className="mx-auto max-w-[1280px] px-6 md:px-16 lg:px-24">
          <div className="max-w-2xl">
            <p className="text-[10px] font-medium uppercase tracking-[0.32em] text-ink-muted">
              Partner-selectie
            </p>
            <h2
              id="partner-title"
              className="mt-4 font-display text-[clamp(2rem,4vw,3.5rem)] font-medium leading-[1.05] text-ink"
            >
              Hoe kiest u een betrouwbare{" "}
              <span className="italic text-sage">partner</span>.
            </h2>
            <p className="mt-8 text-[16px] leading-[1.7] text-ink-soft md:text-[17px]">
              Sanitair is een vak waar het verschil tussen vakman en handige
              klusser pas zichtbaar wordt na vijf jaar. Volgende signalen
              helpen u vooraf scheiden.
            </p>
          </div>

          <div className="mt-14 grid gap-12 md:grid-cols-2 md:gap-16">
            <div className="min-w-0">
              <p className="text-[12px] font-medium uppercase tracking-[0.24em] text-sage-dark">
                Groene vlaggen
              </p>
              <ul className="mt-6 space-y-4 text-[16px] leading-[1.7] text-ink-soft">
                {[
                  "Komt zelf opmeten — geen offerte louter op foto’s.",
                  "Stelt vragen over de bestaande afvoer en ventilatie.",
                  "Werkt met BENOR-gekeurd materiaal en kan dit aantonen.",
                  "Werkt geregeld samen met een vaste tegelzetter en elektricien.",
                  "Levert een tienjarige aansprakelijkheidsverzekering en is geregistreerd bij KBO.",
                  "Geeft een gedetailleerde meerprijs-regeling vooraf, niet achteraf.",
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
              <p className="text-[12px] font-medium uppercase tracking-[0.24em] text-ink-muted">
                Rode vlaggen
              </p>
              <ul className="mt-6 space-y-4 text-[16px] leading-[1.7] text-ink-soft">
                {[
                  "Offerte op één bladzijde met één totaalbedrag.",
                  "Vraagt 50% of meer voorschot voor de werf start.",
                  "Wil niet contant op naam factureren of vermijdt het btw-gesprek.",
                  "Heeft geen referenties uit de regio of stuurt enkel foto’s zonder adres.",
                  "Belooft een planning van enkele dagen voor een volledige badkamer.",
                  "Verwijst u zelf naar de bouwwinkel zonder advies over fittingen.",
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

      <section
        aria-labelledby="stappen-title"
        className="relative mt-28 md:mt-44"
      >
        <div className="mx-auto max-w-[1280px] px-6 md:px-16 lg:px-24">
          <div className="max-w-2xl">
            <p className="text-[10px] font-medium uppercase tracking-[0.32em] text-ink-muted">
              Volgorde der werken
            </p>
            <h2
              id="stappen-title"
              className="mt-4 font-display text-[clamp(2rem,4vw,3.5rem)] font-medium leading-[1.05] text-ink"
            >
              Stappen van het{" "}
              <span className="italic text-sage">traject</span>.
            </h2>
          </div>

          <ol className="mt-16 grid gap-10 md:grid-cols-2 md:gap-12 lg:grid-cols-3">
            {STAPPEN.map((s) => (
              <li key={s.nr} className="min-w-0">
                <span className="font-display text-[56px] font-light leading-none text-sage md:text-[64px]">
                  {s.nr}
                </span>
                <div
                  aria-hidden="true"
                  className="mt-6 h-px w-12 bg-ink-hair"
                />
                <h3 className="mt-6 font-display text-[24px] font-medium leading-[1.15] text-ink md:text-[26px]">
                  {s.title}
                </h3>
                <p className="mt-5 text-[16px] leading-[1.7] text-ink-soft">
                  {s.body}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section
        aria-labelledby="fouten-title"
        className="relative mt-28 md:mt-44"
      >
        <div className="mx-auto max-w-[1280px] px-6 md:px-16 lg:px-24">
          <div className="max-w-2xl">
            <p className="text-[10px] font-medium uppercase tracking-[0.32em] text-ink-muted">
              Vermijd deze
            </p>
            <h2
              id="fouten-title"
              className="mt-4 font-display text-[clamp(2rem,4vw,3.5rem)] font-medium leading-[1.05] text-ink"
            >
              Veelgemaakte{" "}
              <span className="italic text-sage">fouten</span>.
            </h2>
          </div>

          <ul className="mt-14 grid gap-10 md:grid-cols-2 md:gap-14">
            {FOUTEN.map((f) => (
              <li key={f.title} className="min-w-0">
                <h3 className="font-display text-[22px] font-medium leading-[1.2] text-ink md:text-[24px]">
                  {f.title}
                </h3>
                <p className="mt-4 text-[16px] leading-[1.7] text-ink-soft">
                  {f.body}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section
        aria-labelledby="netwerk-title"
        className="relative mt-28 md:mt-44"
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
                  In ons netwerk
                </p>
                <h2
                  id="netwerk-title"
                  className="mt-5 font-display text-[clamp(2rem,4.5vw,3.75rem)] font-medium leading-[1.02] text-ink"
                >
                  Sanitair bij Renocheck{" "}
                  <span className="italic text-sage">Professionals</span>.
                </h2>
                <p className="mt-7 text-[16px] leading-[1.7] text-ink-soft md:text-[17px]">
                  Per Vlaamse regio selecteren wij één sanitair-partner — niet
                  de luidste, niet de goedkoopste, wel diegene met
                  controleerbare referenties, een vaste tegelzetter en
                  elektricien waarmee hij al jaren werkt, en een dossier dat u
                  na de oplevering meekrijgt. Bekijk de{" "}
                  <Link
                    href="/vakspecialisten"
                    className="font-medium text-ink underline-offset-4 hover:text-sage hover:underline"
                  >
                    geselecteerde vakspecialisten
                  </Link>{" "}
                  of vraag rechtstreeks een team in uw regio op via{" "}
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
                  .
                </p>
                <p className="mt-5 text-[16px] leading-[1.7] text-ink-soft md:text-[17px]">
                  Onze filter is eenvoudig: minstens tien jaar zelfstandige
                  uitvoering, geverifieerde referenties uit de regio, en een
                  bewezen samenwerking met de andere rubrieken in het netwerk.
                  Selectie op vakmanschap, niet op marketingbudget.
                </p>
              </div>
              <div className="min-w-0 md:col-span-5">
                <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[28px] bg-ink/5">
                  <Image
                    src="https://images.unsplash.com/photo-1620626011761-996317b8d101?auto=format&fit=crop&w=1400&q=90"
                    alt="Afgewerkte badkamer met inloopdouche"
                    fill
                    sizes="(max-width: 768px) 100vw, 35vw"
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto mt-28 max-w-[1280px] px-6 md:mt-44 md:px-16 lg:px-24">
        <div className="grid gap-12 md:grid-cols-12 md:items-center md:gap-16">
          <div className="min-w-0 md:col-span-7">
            <p className="text-[18px] text-ink-soft">Klaar voor de volgende stap</p>
            <h2 className="mt-6 font-display text-[clamp(2rem,4vw,3.5rem)] font-medium leading-[1.05] text-ink">
              Vraag de juiste sanitair{" "}
              <span className="italic text-sage">partner</span> in uw regio.
            </h2>
            <p className="mt-8 text-[17px] leading-[1.7] text-ink-soft md:text-[19px]">
              Eén bericht volstaat. We bekijken uw project, koppelen u aan de
              sanitair-partner uit het netwerk in uw regio, en wanneer relevant
              aan de bijhorende tegelzetter en elektricien — zodat de werf van
              dag één gecoördineerd loopt.
            </p>
          </div>
          <div className="min-w-0 md:col-span-5 md:justify-self-end">
            <PillLink href="/contact?subject=question">
              Stel uw vraag
            </PillLink>
          </div>
        </div>
      </section>
    </article>
  );
}
