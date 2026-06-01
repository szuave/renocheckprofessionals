import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PillLink } from "@/components/pill-button";
import { BreadcrumbSchema, FAQPageSchema } from "@/components/structured-data";

export const metadata: Metadata = {
  title: "Zonnepanelen — Renovatiegids",
  description:
    "Praktische gids zonnepanelen in Vlaanderen 2026 — capaciteitstarief, prosumenten-tarief, terugverdientijd, thuisbatterij, omvormer en hoe u een betrouwbare installateur kiest.",
  alternates: { canonical: "/renovatiegids/zonnepanelen" },
  openGraph: {
    title: "Zonnepanelen — Renovatiegids · Renocheck Professionals",
    description:
      "Wat u moet weten over zonnepanelen in Vlaanderen 2026: kosten, premies, terugverdientijd en hoe u de juiste partner kiest.",
    url: "/renovatiegids/zonnepanelen",
    type: "article",
  },
  twitter: {
    title: "Zonnepanelen — Renovatiegids · Renocheck Professionals",
    description:
      "Capaciteitstarief, prosumenten, thuisbatterij en omvormer — alles wat telt in 2026.",
  },
};

const STEPS = [
  {
    nr: "01",
    title: "Verbruiksanalyse",
    body: "Een goede partner vraagt eerst uw jaarverbruik, uw dagprofiel en de oriëntatie van uw dak op — pas dan wordt er gerekend. Zonder cijfers geen serieus voorstel.",
  },
  {
    nr: "02",
    title: "Plaatsbezoek en dakstudie",
    body: "Beoordeling van dakhelling, schaduw, dakstructuur en de positie van de meterkast. Voor renovaties ook even kijken naar de bestaande elektriciteit.",
  },
  {
    nr: "03",
    title: "Offerte met SDE-gegevens",
    body: "Vermogen in kWp, exact paneeltype, omvormer, montagesysteem, garantievoorwaarden en — belangrijk — een onderbouwde productieraming in kWh per jaar.",
  },
  {
    nr: "04",
    title: "Plaatsing en keuring",
    body: "Plaatsing zelf duurt zelden langer dan één tot twee dagen. Daarna AREI-keuring door een erkend organisme en aanmelding bij Fluvius.",
  },
  {
    nr: "05",
    title: "Monitoring en nazorg",
    body: "Een serieuze partner laat u niet los na de eindfactuur. Vraag naar monitoring, jaarlijkse productiecontrole en hoe defecten worden opgevolgd.",
  },
];

const RED_FLAGS = [
  "Verkoop aan de deur of via telemarketing met een 'unieke aanbieding vandaag'.",
  "Geen plaatsbezoek voor er een offerte ligt — enkel een schatting via Google Maps.",
  "Productieraming zonder onderbouwing of zonder rekening te houden met schaduw.",
  "Onduidelijkheid over wie de AREI-keuring aanvraagt en wie de Fluvius-aanmelding doet.",
  "Drukverkoop met 'als u vandaag tekent' — vakmanschap heeft geen vervaldatum.",
];

const GREEN_FLAGS = [
  "Vermelding van Solar Pro of vergelijkbaar RESCert-attest van de installateur.",
  "Schriftelijke productiegarantie en duidelijke voorwaarden bij onderprestatie.",
  "Eigen plaatsingsploeg — geen onderaanneming via wisselende ploegen.",
  "Referenties in uw regio die u mag bezoeken of telefonisch contacteren.",
  "Transparantie over merk, herkomst en garantietermijn van panelen én omvormer.",
];

const MISTAKES = [
  {
    title: "Te groot dimensioneren op subsidie",
    body: "Sinds de digitale meter is overproductie weinig waard. Een installatie afstemmen op uw werkelijk verbruik plus een redelijk overschot is doorgaans rendabeler dan elke vierkante meter dak vol leggen.",
  },
  {
    title: "Goedkoopste omvormer kiezen",
    body: "De omvormer is statistisch het eerste onderdeel dat faalt. Een paneel houdt vlot 25 jaar, een goedkope omvormer soms geen acht. Reken op vervangkost ergens in de looptijd.",
  },
  {
    title: "Thuisbatterij blind toevoegen",
    body: "Een batterij is een rekensom, geen vanzelfsprekendheid. Bij een gemiddeld huishouden zonder warmtepomp of laadpaal is de terugverdientijd vaak langer dan de garantie.",
  },
  {
    title: "Geen plan voor het dak zelf",
    body: "Panelen leggen op een dak dat binnen tien jaar toe is aan vernieuwing kost u twee keer. Bekijk dakwerken en zonnepanelen samen — uw architect kan beide rubrieken coördineren.",
  },
];

const FAQS = [
  {
    question: "Hoeveel kosten zonnepanelen in Vlaanderen in 2026?",
    answer:
      "Voor een doorsnee installatie van 4 tot 6 kWp ligt de all-in kostprijs richtwaarde tussen 6.000 en 9.500 euro inclusief 6% btw bij renovatie van een woning ouder dan tien jaar. De prijs varieert per regio, daktype en gekozen omvormer. Een thuisbatterij komt daar bovenop, afhankelijk van capaciteit.",
  },
  {
    question: "Wat betekent het capaciteitstarief voor mijn zonnepanelen?",
    answer:
      "Sinds 2023 betaalt u nettarief deels op basis van uw piekafname per kwartier, niet enkel op verbruik. Voor zonnepanelen betekent dit dat zelfconsumptie en spreiding van uw verbruik over de dag zwaarder doorwegen dan vroeger. Een goede partner toont u hoe dat in uw situatie uitvalt.",
  },
  {
    question: "Heb ik in 2026 nog recht op een premie voor zonnepanelen?",
    answer:
      "De rechtstreekse premie voor zonnepanelen is uitgedoofd, maar via Mijn VerbouwPremie kan u onder voorwaarden steun krijgen voor een thuisbatterij of warmtepomp die u combineert met zonnepanelen. Het verlaagde btw-tarief van 6% blijft voor renovatiewoningen ouder dan tien jaar.",
  },
  {
    question: "Wat is de terugverdientijd van zonnepanelen vandaag?",
    answer:
      "Voor een correct gedimensioneerde installatie ligt de terugverdientijd in 2026 typisch tussen zeven en tien jaar, afhankelijk van uw zelfconsumptie, dakorientatie en de evolutie van de energieprijzen. Bij een hoog dagverbruik of een warmtepomp ligt dat lager.",
  },
  {
    question: "Heb ik een thuisbatterij nodig?",
    answer:
      "Niet automatisch. Een batterij verhoogt uw zelfconsumptie en helpt het capaciteitstarief drukken, maar voegt vooral waarde toe bij hoge verbruikers — warmtepomp, elektrische wagen, of een groot huishouden. Vraag uw partner om een rekening op basis van uw werkelijk dagprofiel, niet op basis van gemiddelden.",
  },
];

export default function ZonnepanelenGidsPage() {
  return (
    <article className="relative pt-36 pb-14 sm:pt-44 md:pt-52">
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "/" },
          { name: "Renovatiegids", url: "/renovatiegids" },
          { name: "Zonnepanelen", url: "/renovatiegids/zonnepanelen" },
        ]}
      />
      <FAQPageSchema items={FAQS} />

      <section className="mx-auto max-w-[1280px] px-6 md:px-16 lg:px-24">
        <p className="enter-up delay-300 text-[10px] font-medium uppercase tracking-[0.32em] text-ink-muted">
          Renovatiegids · Rubriek
        </p>

        <h1 className="enter-up delay-400 mt-6 font-display text-[clamp(3rem,8vw,7rem)] font-medium leading-[0.98] text-ink">
          De juiste{" "}
          <span className="italic text-sage">zonnepanelen</span> in 2026.
        </h1>

        <p className="enter-up delay-500 mt-8 max-w-2xl text-[17px] leading-[1.65] text-ink-soft md:text-[19px]">
          De Vlaamse zonnemarkt is volwassen geworden. Premies zijn versoberd,
          het capaciteitstarief verandert de rekensom, en de digitale meter
          maakt zelfconsumptie belangrijker dan opbrengst per paneel. Deze
          gids zet op een rij wat een bouwheer in West-Vlaanderen,
          Oost-Vlaanderen, Antwerpen of Vlaams-Brabant vandaag moet weten.
        </p>

        <p className="enter-up delay-600 mt-6 max-w-2xl text-[15px] leading-[1.7] text-ink-muted">
          Onderdeel van de{" "}
          <Link
            href="/renovatiegids"
            className="underline-offset-4 hover:text-sage hover:underline"
          >
            Renocheck Renovatiegids
          </Link>{" "}
          — een praktische reeks per rubriek, zonder verkooppraat.
        </p>
      </section>

      <section
        aria-labelledby="cover-title"
        className="relative mt-20 md:mt-28"
      >
        <div className="mx-auto max-w-[1280px] px-6 md:px-16 lg:px-24">
          <div className="relative aspect-[16/9] w-full overflow-hidden rounded-[32px] bg-ink/5">
            <Image
              src="https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=2000&q=90"
              alt="Zonnepanelen op een Vlaams dak bij avondlicht"
              fill
              sizes="(max-width: 1280px) 100vw, 1280px"
              className="object-cover"
              priority
            />
          </div>
          <h2 id="cover-title" className="sr-only">
            Zonnepanelen in Vlaanderen
          </h2>
        </div>
      </section>

      <section
        aria-labelledby="kost-title"
        className="relative mt-28 md:mt-44"
      >
        <div className="mx-auto max-w-[1280px] px-6 md:px-16 lg:px-24">
          <div className="grid gap-14 md:grid-cols-12 md:gap-16">
            <div className="min-w-0 md:col-span-5">
              <p className="text-[10px] font-medium uppercase tracking-[0.32em] text-ink-muted">
                Kosten
              </p>
              <h2
                id="kost-title"
                className="mt-5 font-display text-[clamp(2rem,4vw,3.5rem)] font-medium leading-[1.05] text-ink"
              >
                Wat dit kost{" "}
                <span className="italic text-sage">in 2026</span>.
              </h2>
            </div>
            <div className="min-w-0 space-y-5 text-[17px] leading-[1.75] text-ink-soft md:col-span-7 md:text-[18px]">
              <p>
                Voor een doorsnee gezinswoning rekent u richtwaarden tussen
                1.200 en 1.700 euro per kWp aan geïnstalleerd vermogen,
                inclusief 6% btw bij renovatie van een woning ouder dan tien
                jaar. Een installatie van 5 kWp landt zo doorgaans tussen
                6.500 en 8.500 euro all-in — panelen, omvormer, montage,
                AREI-keuring en aanmelding bij Fluvius.
              </p>
              <p>
                Een thuisbatterij van 5 tot 10 kWh komt daar bovenop voor
                4.000 tot 7.500 euro afhankelijk van merk en koppeling. Een
                hybride omvormer in plaats van een klassieke string-omvormer
                kost een paar honderd euro meer, maar bespaart u die ingreep
                later wel.
              </p>
              <p className="text-[15px] text-ink-muted">
                Alle bedragen zijn richtwaarden voor Vlaanderen begin 2026 en
                variëren per regio, daktype en gekozen materialen. Vraag
                steeds een offerte op maat na plaatsbezoek.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section
        aria-labelledby="premies-title"
        className="relative mt-28 md:mt-44"
      >
        <div className="mx-auto max-w-[1280px] px-6 md:px-16 lg:px-24">
          <div className="grid gap-14 md:grid-cols-12 md:gap-16">
            <div className="min-w-0 md:col-span-5">
              <p className="text-[10px] font-medium uppercase tracking-[0.32em] text-ink-muted">
                Premies en regelgeving
              </p>
              <h2
                id="premies-title"
                className="mt-5 font-display text-[clamp(2rem,4vw,3.5rem)] font-medium leading-[1.05] text-ink"
              >
                Wat geldt in{" "}
                <span className="italic text-sage">Vlaanderen</span>.
              </h2>
            </div>
            <div className="min-w-0 space-y-5 text-[17px] leading-[1.75] text-ink-soft md:col-span-7 md:text-[18px]">
              <p>
                De rechtstreekse premie voor zonnepanelen zelf bestaat niet
                meer. Wat blijft, is het verlaagde btw-tarief van 6% voor
                renovaties van woningen ouder dan tien jaar — dat alleen al
                weegt op een installatie van enkele duizenden euro.
              </p>
              <p>
                Via Mijn VerbouwPremie blijft steun mogelijk voor een
                thuisbatterij of voor een warmtepomp die u in dezelfde
                renovatie laat plaatsen. De voorwaarden — EPC-label,
                inkomenscategorie, aanvraagvolgorde — wijzigen geregeld. Een
                partner die u in 2026 een premie belooft zonder uw EPC en uw
                inkomenscategorie te kennen, vertelt een verkoopverhaal.
              </p>
              <p>
                Sinds de digitale meter wordt productie die u terugstuurt
                naar het net niet meer één op één gecompenseerd. Het
                capaciteitstarief belast bovendien uw kwartierpieken: u
                betaalt voor de hoogste afname, niet enkel het totaal. Voor
                zonnepanelen wijst alles dus in dezelfde richting — verbruik
                zoveel mogelijk wat u zelf opwekt.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section
        aria-labelledby="partner-title"
        className="relative mt-28 md:mt-44"
      >
        <div className="mx-auto max-w-[1280px] px-6 md:px-16 lg:px-24">
          <div className="max-w-3xl">
            <p className="text-[10px] font-medium uppercase tracking-[0.32em] text-ink-muted">
              Partnerkeuze
            </p>
            <h2
              id="partner-title"
              className="mt-5 font-display text-[clamp(2rem,4vw,3.5rem)] font-medium leading-[1.05] text-ink"
            >
              Hoe kiest u een{" "}
              <span className="italic text-sage">betrouwbare</span> partner.
            </h2>
            <p className="mt-8 text-[17px] leading-[1.7] text-ink-soft md:text-[18px]">
              Zonnepanelen zijn een investering voor twintig jaar. De
              kwaliteit van de plaatsing en de nazorg bepaalt meer dan het
              merk van het paneel zelf. Wat onderscheidt een serieuze partner
              van een verkoper?
            </p>
          </div>

          <div className="mt-14 grid gap-10 md:grid-cols-2 md:gap-16">
            <div className="min-w-0">
              <h3 className="font-display text-[24px] font-medium leading-[1.15] text-ink">
                Waarschuwingstekens
              </h3>
              <ul className="mt-6 space-y-4 text-[16px] leading-[1.7] text-ink-soft">
                {RED_FLAGS.map((item) => (
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
            <div className="min-w-0">
              <h3 className="font-display text-[24px] font-medium leading-[1.15] text-ink">
                Goede signalen
              </h3>
              <ul className="mt-6 space-y-4 text-[16px] leading-[1.7] text-ink-soft">
                {GREEN_FLAGS.map((item) => (
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
              className="mt-5 font-display text-[clamp(2rem,4vw,3.5rem)] font-medium leading-[1.05] text-ink"
            >
              Van kennismaking tot{" "}
              <span className="italic text-sage">oplevering</span>.
            </h2>
          </div>

          <ol className="mt-16 grid gap-10 md:grid-cols-2 md:gap-12 lg:grid-cols-3">
            {STEPS.map((s) => (
              <li key={s.nr} className="min-w-0">
                <span className="font-display text-[56px] font-light leading-none text-sage md:text-[64px]">
                  {s.nr}
                </span>
                <div
                  aria-hidden="true"
                  className="mt-6 h-px w-12 bg-ink-hair"
                />
                <h3 className="mt-6 font-display text-[24px] font-medium leading-[1.1] text-ink md:text-[28px]">
                  {s.title}
                </h3>
                <p className="mt-4 text-[16px] leading-[1.7] text-ink-soft">
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
              Veelgemaakte fouten
            </p>
            <h2
              id="fouten-title"
              className="mt-5 font-display text-[clamp(2rem,4vw,3.5rem)] font-medium leading-[1.05] text-ink"
            >
              Wat u beter{" "}
              <span className="italic text-sage">vermijdt</span>.
            </h2>
          </div>

          <ul className="mt-14 grid gap-10 md:grid-cols-2 md:gap-12">
            {MISTAKES.map((m) => (
              <li
                key={m.title}
                className="min-w-0 border-t border-ink-hair/60 pt-8"
              >
                <h3 className="font-display text-[22px] font-medium leading-[1.2] text-ink md:text-[24px]">
                  {m.title}
                </h3>
                <p className="mt-4 text-[16px] leading-[1.7] text-ink-soft">
                  {m.body}
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
                  Binnen het netwerk
                </p>
                <h2
                  id="netwerk-title"
                  className="mt-5 font-display text-[clamp(2rem,4.5vw,3.75rem)] font-medium leading-[1.02] text-ink"
                >
                  Zonnepanelen bij Renocheck{" "}
                  <span className="italic text-sage">Professionals</span>.
                </h2>
                <div className="mt-8 space-y-5 text-[16px] leading-[1.75] text-ink-soft md:text-[17px]">
                  <p>
                    Binnen het netwerk is er één zonnepanelen-partner per
                    Vlaamse regio. Die selectie gebeurt op vakkennis, op
                    transparantie van de offertes, en op de samenwerking met
                    de architect en de elektricien uit dezelfde regio — niet
                    op marketingbudget of advertentievolume.
                  </p>
                  <p>
                    Concreet: in{" "}
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
                    en{" "}
                    <Link
                      href="/regio/vlaams-brabant"
                      className="underline-offset-4 hover:text-sage hover:underline"
                    >
                      Vlaams-Brabant
                    </Link>{" "}
                    werkt onze geselecteerde zonnepanelen-vakman vlot samen
                    met de dakwerker, de elektricien en de architect uit
                    dezelfde kring. Eén werf, één planning, één
                    aanspreekpunt.
                  </p>
                  <p>
                    Bekijk de volledige lijst van{" "}
                    <Link
                      href="/vakspecialisten"
                      className="underline-offset-4 hover:text-sage hover:underline"
                    >
                      vakspecialisten in het netwerk
                    </Link>{" "}
                    of vraag rechtstreeks de juiste partner aan voor uw
                    regio.
                  </p>
                </div>
              </div>

              <div className="min-w-0 md:col-span-5 md:justify-self-end">
                <div className="rounded-[28px] bg-surface-soft/85 p-7 ring-1 ring-ink-hair/50 backdrop-blur sm:p-9">
                  <p className="text-[10px] font-medium uppercase tracking-[0.32em] text-ink-muted">
                    Volgende stap
                  </p>
                  <h3 className="mt-4 font-display text-[26px] font-medium leading-[1.15] text-ink">
                    Vraag de juiste zonnepanelen-partner in uw regio.
                  </h3>
                  <p className="mt-5 text-[15px] leading-[1.7] text-ink-soft">
                    Eén bericht volstaat. We beluisteren uw verbruik en uw
                    dak, en stellen de vakman uit het netwerk voor die past.
                  </p>
                  <div className="mt-8">
                    <PillLink href="/contact?subject=question">
                      Stel uw vraag
                    </PillLink>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </article>
  );
}
