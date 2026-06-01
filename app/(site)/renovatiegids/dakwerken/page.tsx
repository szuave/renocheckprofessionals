import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PillLink } from "@/components/pill-button";
import { BreadcrumbSchema, FAQPageSchema } from "@/components/structured-data";

export const metadata: Metadata = {
  title: "Dakwerken — Renovatiegids",
  description:
    "Wat kost een nieuw dak in Vlaanderen in 2026? Richtprijzen per m², isolatieplicht, premies en hoe u een betrouwbare dakwerker kiest binnen het Renocheck-netwerk.",
  alternates: { canonical: "/renovatiegids/dakwerken" },
  openGraph: {
    title: "Dakwerken — Renovatiegids · Renocheck Professionals",
    description:
      "Praktische gids dakvernieuwing in Vlaanderen: kostprijs per m², dakisolatie-eisen, premies 2026 en hoe u een dakwerker selecteert.",
    url: "/renovatiegids/dakwerken",
    type: "article",
  },
  twitter: {
    title: "Dakwerken — Renovatiegids · Renocheck Professionals",
    description:
      "Richtprijzen, premies en selectiecriteria voor dakvernieuwing in Vlaanderen — een sobere gids voor bouwheren.",
  },
};

const COST_INDICATIONS = [
  {
    label: "Pannendak vernieuwen (incl. tengels)",
    range: "€ 95 – € 145 / m²",
    note: "Klassieke betonpannen of keramische pannen, exclusief dakkapellen en hulpwerken.",
  },
  {
    label: "Leien dak (natuursteen of vezelcement)",
    range: "€ 140 – € 230 / m²",
    note: "Sterk afhankelijk van pansoort en complexiteit van de daklijnen.",
  },
  {
    label: "Plat dak EPDM (incl. isolatie 12 cm PIR)",
    range: "€ 110 – € 170 / m²",
    note: "Eén ononderbroken rubberlaag, sterk gangbaar voor aanbouwen en bijgebouwen.",
  },
  {
    label: "Roofing / bitumen plat dak",
    range: "€ 85 – € 130 / m²",
    note: "Goedkoper, kortere levensduur (gemiddeld 20 – 25 jaar tegenover 40 – 50 jaar voor EPDM).",
  },
  {
    label: "Dakisolatie tussen kepers (na-isolatie)",
    range: "€ 55 – € 95 / m²",
    note: "Inclusief dampscherm en afwerking. Excl. zoldervloer of helmstuk.",
  },
  {
    label: "Volledige dakvernieuwing rijwoning",
    range: "€ 18.000 – € 32.000",
    note: "Indicatief totaalbudget voor ± 90 m² hellend dak, incl. isolatie en goten.",
  },
];

const FAQ_ITEMS = [
  {
    question: "Hoeveel kost een nieuw dak in Vlaanderen?",
    answer:
      "Voor een hellend pannendak van een doorsnee rijwoning rekent u in 2026 op € 95 tot € 145 per m², inclusief isolatie en tengels. Een volledige dakvernieuwing voor een rijwoning komt zo op € 18.000 tot € 32.000. Bij een plat dak in EPDM met PIR-isolatie spreekt men van € 110 tot € 170 per m². Dit zijn richtwaarden — de uiteindelijke prijs hangt af van complexiteit, hellingsgraad, dakkapellen en regio.",
  },
  {
    question: "Heb ik recht op een premie voor dakisolatie in 2026?",
    answer:
      "Ja. Via Mijn VerbouwPremie van de Vlaamse overheid blijft dakisolatie premiebaar in 2026, met bedragen die variëren afhankelijk van uw inkomenscategorie en de R-waarde van het geplaatste isolatiemateriaal. De minimale R-waarde voor de premie ligt op R ≥ 4,5 m²K/W. Een geregistreerd aannemer en een correct EPC zijn voorwaarden. Combineer u met andere maatregelen, dan kan een EPC-labelpremie bovenop komen.",
  },
  {
    question: "Moet ik mijn dak isoleren bij een renovatie?",
    answer:
      "Sinds 2020 geldt in Vlaanderen een dakisolatienorm voor élke woning: minstens R ≥ 0,75 m²K/W. Bij een vergunde renovatie waarbij u het dak openlegt, gelden bovendien de EPB-eisen met een veel strengere U-waarde (Umax 0,24 W/m²K). Praktisch betekent dit ongeveer 14 tot 18 cm PIR of 20 cm minerale wol. Een dakwerker die deze eisen niet spontaan benoemt, is een eerste rood vlag.",
  },
  {
    question: "Geldt het verlaagde btw-tarief van 6 % voor mijn dakwerken?",
    answer:
      "Voor renovatie van een privéwoning die ouder is dan tien jaar geldt 6 % btw in plaats van 21 %, op voorwaarde dat de aannemer rechtstreeks factureert aan de eigenaar-bewoner en het pand hoofdzakelijk privé wordt gebruikt. Bij nieuwbouw of een ingrijpende energetische renovatie gelden andere regimes. Laat dit expliciet vermelden op de offerte en op de attesten.",
  },
  {
    question: "Hoe lang duurt een volledige dakvernieuwing?",
    answer:
      "Voor een hellend dak van een rijwoning rekent u in de praktijk op twee tot drie weken werfduur, mits droog weer. Een plat dak in EPDM is meestal in drie tot vijf werkdagen geplaatst. Reken bovenop de werfduur nog zes tot tien weken voorbereidingstijd: opmeting, offerte, afstemming met dakwerker, eventuele stedenbouwkundige check en levertijd van materialen.",
  },
];

export default function DakwerkenGuidePage() {
  return (
    <article className="relative pt-36 pb-14 sm:pt-44 md:pt-52">
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "/" },
          { name: "Renovatiegids", url: "/renovatiegids" },
          { name: "Dakwerken", url: "/renovatiegids/dakwerken" },
        ]}
      />
      <FAQPageSchema items={FAQ_ITEMS} />

      <section className="mx-auto max-w-[1280px] px-6 md:px-16 lg:px-24">
        <p className="enter-up delay-300 text-[10px] font-medium uppercase tracking-[0.32em] text-ink-muted">
          Renovatiegids · Rubriek
        </p>

        <h1 className="enter-up delay-400 mt-6 font-display text-[clamp(3rem,8vw,7rem)] font-medium leading-[0.98] text-ink">
          Uw dak{" "}
          <span className="italic text-sage">vernieuwen</span> zonder
          verrassingen.
        </h1>

        <p className="enter-up delay-500 mt-8 max-w-2xl text-[17px] leading-[1.65] text-ink-soft md:text-[19px]">
          Een dak gaat veertig jaar mee — of vijftien, afhankelijk van de
          uitvoering. Deze gids zet de richtprijzen, de Vlaamse
          isolatieplicht en de premies van 2026 op een rij, en helpt u een
          dakwerker selecteren op vakmanschap in plaats van op de laagste
          regel van de offerte.
        </p>

        <div className="enter-up delay-600 mt-10 flex flex-wrap items-center gap-x-2 gap-y-1 text-[14px] text-ink-muted">
          <Link
            href="/renovatiegids"
            className="underline-offset-4 hover:text-sage hover:underline"
          >
            Alle rubrieken in de renovatiegids
          </Link>
          <span aria-hidden="true">·</span>
          <Link
            href="/vakspecialisten"
            className="underline-offset-4 hover:text-sage hover:underline"
          >
            Dakwerkers in het netwerk
          </Link>
        </div>
      </section>

      <section
        aria-labelledby="hero-visual"
        className="relative mt-20 md:mt-28"
      >
        <div className="mx-auto max-w-[1280px] px-6 md:px-16 lg:px-24">
          <div className="relative aspect-[16/8] w-full overflow-hidden rounded-[32px] bg-ink/5">
            <Image
              src="https://images.unsplash.com/photo-1632759145355-12705c50bb24?auto=format&fit=crop&w=2000&q=90"
              alt="Vlaamse dakwerker plaatst keramische pannen op een hellend dak."
              fill
              sizes="(max-width: 1280px) 100vw, 1280px"
              className="object-cover"
              priority
            />
          </div>
          <p id="hero-visual" className="sr-only">
            Dakwerken in uitvoering.
          </p>
        </div>
      </section>

      <section
        aria-labelledby="kosten-title"
        className="relative mt-28 md:mt-44"
      >
        <div className="mx-auto max-w-[1280px] px-6 md:px-16 lg:px-24">
          <div className="grid gap-12 md:grid-cols-12 md:gap-16">
            <div className="min-w-0 md:col-span-5">
              <p className="text-[10px] font-medium uppercase tracking-[0.32em] text-ink-muted">
                Wat dit kost in 2026
              </p>
              <h2
                id="kosten-title"
                className="mt-5 font-display text-[clamp(2rem,4vw,3.5rem)] font-medium leading-[1.05] text-ink"
              >
                Richtprijzen per{" "}
                <span className="italic text-sage">m²</span>.
              </h2>
              <p className="mt-7 text-[17px] leading-[1.7] text-ink-soft md:text-[18px]">
                Onderstaande prijzen zijn richtwaarden uit het Renocheck-netwerk,
                op basis van werven in West-Vlaanderen, Oost-Vlaanderen,
                Antwerpen en Vlaams-Brabant in het lopende seizoen. Reële
                offertes wijken af volgens hellingsgraad, bereikbaarheid,
                gootwerk en afwerkingsniveau.
              </p>
              <p className="mt-5 text-[15px] leading-[1.7] text-ink-muted">
                Voor renovatie van een woning ouder dan tien jaar is het
                btw-tarief 6 % — een verschil van vaak duizenden euro met
                nieuwbouw of werken op pas opgeleverde woningen.
              </p>
            </div>

            <div className="min-w-0 md:col-span-7">
              <ul className="divide-y divide-ink-hair/60 rounded-[28px] bg-surface-soft/70 px-6 py-2 ring-1 ring-ink-hair/40 sm:px-8">
                {COST_INDICATIONS.map((row) => (
                  <li key={row.label} className="py-5">
                    <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                      <p className="font-display text-[18px] font-medium leading-[1.25] text-ink md:text-[19px]">
                        {row.label}
                      </p>
                      <p className="text-[15px] font-medium text-sage-dark">
                        {row.range}
                      </p>
                    </div>
                    <p className="mt-2 text-[14px] leading-[1.6] text-ink-muted">
                      {row.note}
                    </p>
                  </li>
                ))}
              </ul>
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

          <div className="mt-12 grid gap-10 md:grid-cols-2 md:gap-14">
            <div className="space-y-5 text-[16px] leading-[1.75] text-ink-soft md:text-[17px]">
              <p>
                <span className="font-medium text-ink">
                  Dakisolatienorm.
                </span>{" "}
                Sinds 2020 moet elke Vlaamse woning een dakisolatie van
                minstens R ≥ 0,75 m²K/W hebben. Bij een vergunde verbouwing
                waarbij u het dak openlegt, gelden de EPB-eisen — concreet
                een Umax van 0,24 W/m²K, of in de praktijk een isolatiepakket
                van 14 tot 18 cm PIR.
              </p>
              <p>
                <span className="font-medium text-ink">
                  Mijn VerbouwPremie.
                </span>{" "}
                Voor dakisolatie blijft de premie in 2026 actief, in vier
                inkomenscategorieën. Voorwaarde: uitvoering door een
                geregistreerd aannemer en een R-waarde van minstens 4,5
                m²K/W. Eigenaar-bewoners en verhuurders aan een sociaal
                verhuurkantoor komen in aanmerking.
              </p>
            </div>

            <div className="space-y-5 text-[16px] leading-[1.75] text-ink-soft md:text-[17px]">
              <p>
                <span className="font-medium text-ink">EPC-labelpremie.</span>{" "}
                Wie een woning binnen vijf jaar na aankoop renoveert van
                EPC-label E of F naar minstens label C, kan een eenmalige
                labelpremie van € 2.500 tot € 5.000 ontvangen. Een correct
                uitgevoerde dakisolatie levert hier dikwijls het zwaarste
                aandeel in de labelsprong.
              </p>
              <p>
                <span className="font-medium text-ink">
                  Asbestattest verplicht.
                </span>{" "}
                Bij verkoop én bij dakwerken op een woning van vóór 2001
                speelt asbest. Vraag uw dakwerker expliciet naar een
                inventarisatie en — bij vondst — verwijdering door een
                erkend verwijderaar. Dat is geen meerwerk in het grijze
                gebied; dat is wettelijk.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section
        aria-labelledby="kiezen-title"
        className="relative mt-28 md:mt-44"
      >
        <div className="mx-auto max-w-[1280px] px-6 md:px-16 lg:px-24">
          <div className="max-w-2xl">
            <p className="text-[10px] font-medium uppercase tracking-[0.32em] text-ink-muted">
              Selectiecriteria
            </p>
            <h2
              id="kiezen-title"
              className="mt-4 font-display text-[clamp(2rem,4vw,3.5rem)] font-medium leading-[1.05] text-ink"
            >
              Hoe kiest u een{" "}
              <span className="italic text-sage">betrouwbare</span>{" "}
              partner.
            </h2>
          </div>

          <div className="mt-12 grid gap-10 md:grid-cols-2 md:gap-14">
            <div className="rounded-[28px] bg-sage/10 p-7 ring-1 ring-sage/30 sm:p-9">
              <p className="text-[10px] font-medium uppercase tracking-[0.32em] text-sage-dark">
                Groene signalen
              </p>
              <ul className="mt-5 space-y-4 text-[15px] leading-[1.7] text-ink-soft">
                {[
                  "Geregistreerd aannemer met geldige BTW en aansprakelijkheidsverzekering tienjarige aansprakelijkheid.",
                  "Benoemt spontaan de EPB-eisen en de R-waarde van de isolatie, niet alleen de pansoort.",
                  "Toont referenties van werven in uw eigen regio en stuurt u zonodig zelf langs.",
                  "Werkt met vaste onderaannemers voor goten, dakkapellen en zink — geen wisselende ploegen.",
                  "Levert een attest 6 % btw en garantieattest bij oplevering.",
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

            <div className="rounded-[28px] bg-surface-soft p-7 ring-1 ring-ink-hair/50 sm:p-9">
              <p className="text-[10px] font-medium uppercase tracking-[0.32em] text-ink-muted">
                Rode vlaggen
              </p>
              <ul className="mt-5 space-y-4 text-[15px] leading-[1.7] text-ink-soft">
                {[
                  "Offerte zonder afzonderlijke posten voor isolatie, dampscherm, dakgoten en zink.",
                  "Vraagt een groot voorschot (boven 30 %) vóór er materialen op de werf staan.",
                  "Wuift het asbestattest weg of biedt aan om “zelf wel even af te breken”.",
                  "Kan geen recent EPB-verslag tonen van een vergelijkbare werf.",
                  "Stelt geen vragen over uw dakstructuur, isolatie of bestaande houtwerk vóór de offerte.",
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
              Het traject
            </p>
            <h2
              id="stappen-title"
              className="mt-4 font-display text-[clamp(2rem,4vw,3.5rem)] font-medium leading-[1.05] text-ink"
            >
              Vijf stappen tot een{" "}
              <span className="italic text-sage">opgeleverd</span> dak.
            </h2>
          </div>

          <ol className="mt-16 grid gap-10 md:grid-cols-2 md:gap-x-16 md:gap-y-14 lg:grid-cols-3">
            {[
              {
                nr: "01",
                title: "Plaatsbezoek en opmeting",
                body: "Een ernstige dakwerker komt het dak zien: hellingsgraad, staat van de keperstructuur, gootwerk en eventueel asbest. Geen daklift, geen offerte.",
              },
              {
                nr: "02",
                title: "Onderbouwde offerte",
                body: "U krijgt een offerte met afzonderlijke posten voor afbraak, dampscherm, isolatie, dakbedekking, goten en zink — geen prijs in één regel.",
              },
              {
                nr: "03",
                title: "Vergunning en EPB",
                body: "Bij een vergunde renovatie schakelt u een EPB-verslaggever in. Uw architect-bureau of dakwerker stemt af zodat de Umax-eisen gehaald worden.",
              },
              {
                nr: "04",
                title: "Uitvoering",
                body: "Twee à drie weken werfduur voor een hellend dak van een rijwoning. Wekelijkse werfvergadering met dezelfde aanspreekpartner — geen carrousel van ploegen.",
              },
              {
                nr: "05",
                title: "Oplevering en attesten",
                body: "Visuele controle, eindfacturatie, attest 6 % btw, garantieattest tienjarige aansprakelijkheid, en de premie-aanvraag bij Mijn VerbouwPremie.",
              },
            ].map((s) => (
              <li key={s.nr} className="min-w-0">
                <span className="font-display text-[48px] font-light leading-none text-sage md:text-[64px]">
                  {s.nr}
                </span>
                <div
                  aria-hidden="true"
                  className="mt-5 h-px w-12 bg-ink-hair"
                />
                <h3 className="mt-5 font-display text-[24px] font-medium leading-[1.15] text-ink md:text-[28px]">
                  {s.title}
                </h3>
                <p className="mt-4 text-[15px] leading-[1.7] text-ink-soft">
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
          <div className="grid gap-12 md:grid-cols-12 md:gap-16">
            <div className="min-w-0 md:col-span-5">
              <p className="text-[10px] font-medium uppercase tracking-[0.32em] text-ink-muted">
                Veelgemaakte fouten
              </p>
              <h2
                id="fouten-title"
                className="mt-4 font-display text-[clamp(2rem,4vw,3.5rem)] font-medium leading-[1.05] text-ink"
              >
                Wat u beter{" "}
                <span className="italic text-sage">vermijdt</span>.
              </h2>
              <p className="mt-7 text-[16px] leading-[1.7] text-ink-soft">
                De duurste fout is meestal niet het materiaal — het is de
                volgorde van beslissingen. Drie klassiekers uit Vlaamse
                renovaties.
              </p>
            </div>

            <div className="min-w-0 md:col-span-7">
              <ul className="space-y-8">
                {[
                  {
                    title: "Alleen op prijs vergelijken",
                    body: "Drie offertes naast elkaar leggen zonder identieke posten is geen vergelijking. Vraag elke dakwerker dezelfde R-waarde, dezelfde pansoort en dezelfde gootafwerking te offreren — pas dan zegt de prijs iets.",
                  },
                  {
                    title: "Lokaal herstellen waar vernieuwen aangewezen is",
                    body: "Een vijfde van een dak hernieuwen kost vaak veertig procent van een volledige vernieuwing, en u betaalt twee keer steiger en personeel. Vraag een eerlijke afweging — niet de offerte die u het liefst hoort.",
                  },
                  {
                    title: "Isolatie als sluitpost behandelen",
                    body: "Dakisolatie is niet de plaats om te besparen: u kunt er later niet aan zonder het dak weer open te leggen. Investeer hier eens, en doe het in één keer goed volgens de geldende U-waarde.",
                  },
                  {
                    title: "Premies vergeten of te laat aanvragen",
                    body: "De aanvraag bij Mijn VerbouwPremie loopt tot twee jaar na de eindfactuur, maar attestatie achteraf rechtzetten is zwaar werk. Spreek dit af bij de start, niet bij oplevering.",
                  },
                ].map((item) => (
                  <li
                    key={item.title}
                    className="border-l-2 border-ink-hair pl-6"
                  >
                    <h3 className="font-display text-[20px] font-medium leading-[1.25] text-ink md:text-[22px]">
                      {item.title}
                    </h3>
                    <p className="mt-3 text-[15px] leading-[1.7] text-ink-soft md:text-[16px]">
                      {item.body}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section
        aria-labelledby="netwerk-title"
        className="relative mt-28 md:mt-44"
      >
        <div className="mx-auto max-w-[1280px] px-6 md:px-16 lg:px-24">
          <div className="relative overflow-hidden rounded-[32px] bg-surface-warm p-7 ring-1 ring-ink-hair/40 sm:p-10 md:p-14 lg:p-16">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-20 -bottom-24 h-80 w-80 rounded-full bg-sage/20 blur-3xl"
            />
            <div className="relative max-w-2xl">
              <p className="text-[10px] font-medium uppercase tracking-[0.32em] text-ink-muted">
                Binnen Renocheck Professionals
              </p>
              <h2
                id="netwerk-title"
                className="mt-5 font-display text-[clamp(2rem,4vw,3.5rem)] font-medium leading-[1.02] text-ink"
              >
                Dakwerken in het{" "}
                <span className="italic text-sage">netwerk</span>.
              </h2>
              <div className="mt-8 space-y-5 text-[16px] leading-[1.75] text-ink-soft md:text-[17px]">
                <p>
                  Binnen Renocheck Professionals werkt per Vlaamse regio één
                  geselecteerde dakwerker, naast één architect-bureau en
                  dertien andere vakspecialisten. De selectie gebeurt op
                  vakkennis, regionale reputatie en aantoonbare referenties
                  — niet op marketingbudget.
                </p>
                <p>
                  Wie binnen het netwerk werkt, deelt standaarden met de
                  andere partners: dezelfde planningsmethode, dezelfde manier
                  van offreren, dezelfde nazorg. Dat scheelt voor u
                  versnipperde communicatie en tegenstrijdige offertes.
                </p>
                <p>
                  Bekijk welke{" "}
                  <Link
                    href="/vakspecialisten"
                    className="font-medium text-ink underline-offset-4 hover:text-sage hover:underline"
                  >
                    vakspecialisten
                  </Link>{" "}
                  per rubriek zijn opgenomen, of ga naar de regio die voor u
                  relevant is —{" "}
                  <Link
                    href="/regio/west-vlaanderen"
                    className="underline-offset-4 hover:text-sage hover:underline"
                  >
                    West-Vlaanderen
                  </Link>
                  ,{" "}
                  <Link
                    href="/regio/oost-vlaanderen"
                    className="underline-offset-4 hover:text-sage hover:underline"
                  >
                    Oost-Vlaanderen
                  </Link>
                  ,{" "}
                  <Link
                    href="/regio/antwerpen"
                    className="underline-offset-4 hover:text-sage hover:underline"
                  >
                    Antwerpen
                  </Link>{" "}
                  of{" "}
                  <Link
                    href="/regio/vlaams-brabant"
                    className="underline-offset-4 hover:text-sage hover:underline"
                  >
                    Vlaams-Brabant
                  </Link>
                  .
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto mt-20 max-w-[1280px] px-6 md:mt-32 md:px-16 lg:px-24">
        <div className="grid gap-12 md:grid-cols-12 md:items-center md:gap-16">
          <div className="min-w-0 md:col-span-5">
            <p className="text-[18px] text-ink-soft">Klaar voor de volgende stap</p>
            <h2 className="mt-6 font-display text-[clamp(2rem,4vw,3.5rem)] font-medium leading-[1.05] text-ink">
              Vraag de juiste dakwerken{" "}
              <span className="italic text-sage">partner</span> in uw regio.
            </h2>
            <div className="mt-10">
              <PillLink href="/contact?subject=question">
                Neem contact op
              </PillLink>
            </div>
          </div>
          <div className="min-w-0 md:col-span-7">
            <p className="text-[19px] leading-[1.7] text-ink-soft md:text-[20px]">
              Beschrijf in één bericht uw woning, de gewenste dakbedekking en
              uw timing. Wij stemmen af welke dakwerker uit het netwerk in uw
              regio het beste past — en stellen, waar nuttig, meteen het
              architect-bureau voor dat er al mee samenwerkt.
            </p>
          </div>
        </div>
      </section>
    </article>
  );
}
