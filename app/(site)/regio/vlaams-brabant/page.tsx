import type { Metadata } from "next";
import Image from "next/image";
import { PillLink } from "@/components/pill-button";
import {
  BreadcrumbSchema,
  RegionalServiceAreaSchema,
} from "@/components/structured-data";

const REGION = "Vlaams-Brabant";
const REGION_SLUG = "vlaams-brabant";

const CITIES = ["Leuven", "Vilvoorde", "Halle", "Tienen", "Aarschot", "Diest"];

export const metadata: Metadata = {
  title: "Bouwnetwerk Vlaams-Brabant",
  description:
    "Renocheck Professionals in Vlaams-Brabant: één architectenbureau en veertien geselecteerde vakspecialisten — actief van Leuven en Tienen tot Halle en Vilvoorde.",
  alternates: { canonical: `/regio/${REGION_SLUG}` },
  openGraph: {
    title: `Bouwnetwerk ${REGION} · Renocheck Professionals`,
    description:
      "Gesloten partnerkring van architect en vakspecialisten in Vlaams-Brabant — Leuven, Vilvoorde, Halle, Tienen, Aarschot en Diest.",
    url: `/regio/${REGION_SLUG}`,
    type: "website",
  },
  twitter: {
    title: `Bouwnetwerk ${REGION} · Renocheck Professionals`,
    description:
      "Geselecteerde architect en vakspecialisten in Vlaams-Brabant — één partner per rubriek.",
  },
};

const RUBRIEK_PLACEHOLDERS = [
  {
    naam: "Partner-naam",
    rubriek: "Architectenbureau",
    stad: "Leuven",
  },
  {
    naam: "Partner-naam",
    rubriek: "Dakwerken",
    stad: "Tienen",
  },
  {
    naam: "Partner-naam",
    rubriek: "Sanitair",
    stad: "Halle",
  },
];

const KRING_PUNTEN = [
  {
    titel: "Eén architect als spil",
    body: "Het architectenbureau opent het dossier — vaak in Leuven of vanuit het Pajottenland — en kiest binnen de kring de vakspecialisten die bij de werf passen.",
  },
  {
    titel: "Veertien rubrieken, geen overlap",
    body: "Eén dakwerker, één sanitair-partner, één elektricien, één schrijnwerker — tot en met keukens en zwembaden. Geen drie aannemers die elkaar in dezelfde week komen meten.",
  },
  {
    titel: "Lokaal verankerd",
    body: "Onze Vlaams-Brabantse partners werken doorgaans binnen een uurtje rijden van Leuven, Vilvoorde of Aarschot — kortere lijnen, minder no-shows, minder onverklaarbare meerkosten.",
  },
];

export default async function VlaamsBrabantRegioPage() {
  return (
    <article className="relative pt-36 pb-14 sm:pt-44 md:pt-52">
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "/" },
          { name: `Regio ${REGION}`, url: `/regio/${REGION_SLUG}` },
        ]}
      />
      <RegionalServiceAreaSchema region={REGION} cities={CITIES} />

      <section className="mx-auto max-w-[1280px] px-6 md:px-16 lg:px-24">
        <p className="enter-up delay-300 text-[18px] text-ink-soft">
          Regio · Vlaams-Brabant
        </p>

        <h1 className="enter-up delay-400 mt-6 font-display text-[clamp(3rem,8vw,7rem)] font-medium leading-[0.98] text-ink">
          Tussen Leuven en het{" "}
          <span className="italic text-sage">Pajottenland</span>.
        </h1>

        <p className="enter-up delay-500 mt-8 max-w-2xl text-[17px] leading-[1.65] text-ink-soft md:text-[19px]">
          Vlaams-Brabant bouwt in twee snelheden — de universiteitsstad Leuven
          met haar gestapelde renovatieprojecten, en de open landschappen rond
          Halle, Tienen, Aarschot en Diest waar klassieke villa&rsquo;s en
          hoeves om een fijngevoelige hand vragen. Onze kring is daarop
          afgestemd: één architect en veertien vakspecialisten, geselecteerd op
          regionale reputatie en niet op marketingbudget.
        </p>

        <p className="enter-up delay-600 mt-6 max-w-2xl text-[17px] leading-[1.65] text-ink-soft md:text-[19px]">
          Geen lijst van vijfentwintig namen, geen offerteveiling. Eén
          coherent team dat het verschil kent tussen een binnenstad-werf in
          Leuven en een woninguitbreiding in de Brusselse rand.
        </p>
      </section>

      <section
        aria-labelledby="visual-title"
        className="relative mt-28 md:mt-44"
      >
        <div className="mx-auto max-w-[1280px] px-6 md:px-16 lg:px-24">
          <div className="grid gap-14 md:grid-cols-12 md:items-center md:gap-16">
            <div className="min-w-0 md:col-span-7">
              <div className="relative aspect-[5/4] w-full overflow-hidden rounded-[32px] bg-ink/5">
                <Image
                  src="https://images.unsplash.com/photo-1572120360610-d971b9d7767c?auto=format&fit=crop&w=1800&q=90"
                  alt="Klassieke villa-architectuur in het Pajottenland nabij Halle"
                  fill
                  sizes="(max-width: 768px) 100vw, 58vw"
                  className="object-cover"
                />
              </div>
            </div>

            <div className="min-w-0 md:col-span-5">
              <p className="text-[18px] text-ink-soft">Servicegebied</p>
              <h2
                id="visual-title"
                className="mt-6 font-display text-[clamp(2rem,4vw,3.5rem)] font-medium leading-[1.05] text-ink"
              >
                Waar we{" "}
                <span className="italic text-sage">werken</span>.
              </h2>
              <p className="mt-8 text-[17px] leading-[1.75] text-ink-soft md:text-[18px]">
                Renocheck Professionals heeft geen fysiek kantoor in
                Vlaams-Brabant — we werken als netwerk, met partners die
                gevestigd zijn in deze regio. De kring is actief in en rond:
              </p>
              <ul className="mt-6 grid grid-cols-2 gap-y-3 text-[16px] text-ink">
                {CITIES.map((city) => (
                  <li key={city} className="flex items-center gap-3">
                    <span
                      aria-hidden="true"
                      className="inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-sage"
                    />
                    <span>{city}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-7 text-[15px] leading-[1.7] text-ink-muted">
                Werft u op de grens met Brussel, Antwerpen of Limburg? Vermeld
                het in uw aanvraag — we kijken of de regionale kring naadloos
                aansluit.
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
          <div className="max-w-2xl">
            <p className="text-[10px] font-medium uppercase tracking-[0.32em] text-ink-muted">
              De kring in Vlaams-Brabant
            </p>
            <h2
              id="kring-title"
              className="mt-4 font-display text-[clamp(2rem,4vw,3.5rem)] font-medium leading-[1.05] text-ink"
            >
              Eén bureau,{" "}
              <span className="italic text-sage">veertien</span> vakmensen.
            </h2>
            <p className="mt-8 text-[17px] leading-[1.7] text-ink-soft md:text-[18px]">
              In Leuven, Vilvoorde of het Hageland werkt onze kring vanuit
              dezelfde logica: één architectenbureau, één dakwerker, één
              sanitair-partner, één elektricien, één verwarmings-installateur,
              één schrijnwerker, één schilder, één vloerlegger, één
              isolatie-specialist, één tuinaanlegger, één zonnepanelen-bedrijf,
              één keukenmaker — en waar relevant ook tegelzetters en
              zwembadbouwers. Veertien rubrieken, één onderling vertrouwen.
            </p>
          </div>

          <ul className="mt-16 grid gap-10 md:grid-cols-3 md:gap-12">
            {KRING_PUNTEN.map((punt, idx) => (
              <li key={punt.titel} className="min-w-0">
                <span className="font-display text-[56px] font-light leading-none text-sage md:text-[72px]">
                  {String(idx + 1).padStart(2, "0")}
                </span>
                <div
                  aria-hidden="true"
                  className="mt-6 h-px w-12 bg-ink-hair"
                />
                <h3 className="mt-6 font-display text-[28px] font-medium leading-[1.1] text-ink md:text-[32px]">
                  {punt.titel}
                </h3>
                <p className="mt-5 text-[16px] leading-[1.7] text-ink-soft">
                  {punt.body}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section
        aria-labelledby="partners-title"
        className="relative mt-28 md:mt-44"
      >
        <div className="mx-auto max-w-[1280px] px-6 md:px-16 lg:px-24">
          <div className="max-w-2xl">
            <p className="text-[10px] font-medium uppercase tracking-[0.32em] text-ink-muted">
              Onze Vlaams-Brabant-partners
            </p>
            <h2
              id="partners-title"
              className="mt-4 font-display text-[clamp(2rem,4vw,3.5rem)] font-medium leading-[1.05] text-ink"
            >
              Namen na{" "}
              <span className="italic text-sage">aanmelding</span>.
            </h2>
            <p className="mt-8 text-[17px] leading-[1.7] text-ink-soft md:text-[18px]">
              Wij delen partnernamen en projectreferenties na aanmelding via{" "}
              <a
                href="/login"
                className="font-medium text-ink underline-offset-4 hover:text-sage hover:underline"
              >
                /login
              </a>
              . Vraag een kennismakingsgesprek aan via{" "}
              <a
                href="/contact"
                className="font-medium text-ink underline-offset-4 hover:text-sage hover:underline"
              >
                /contact
              </a>
              .
            </p>
          </div>

          <ul className="mt-14 grid gap-6 md:grid-cols-3 md:gap-8">
            {RUBRIEK_PLACEHOLDERS.map((p, idx) => (
              <li
                key={`${p.rubriek}-${idx}`}
                className="relative overflow-hidden rounded-[28px] bg-surface-soft p-7 ring-1 ring-ink-hair/40 md:p-8"
              >
                <p className="text-[10px] font-medium uppercase tracking-[0.32em] text-ink-muted">
                  {p.rubriek}
                </p>
                <h3 className="mt-5 font-display text-[24px] font-medium leading-[1.15] text-ink md:text-[26px]">
                  {p.naam}
                </h3>
                <p className="mt-3 text-[15px] text-ink-soft">{p.stad}</p>
                <p className="mt-8 text-[13px] leading-[1.6] text-ink-muted">
                  Naam en referenties zichtbaar voor aangemelde
                  netwerkleden via het partnerportaal.
                </p>
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
          <div className="grid gap-14 md:grid-cols-12 md:items-start md:gap-16">
            <div className="min-w-0 md:col-span-5">
              <p className="text-[10px] font-medium uppercase tracking-[0.32em] text-ink-muted">
                Waarom Vlaams-Brabant
              </p>
              <h2
                id="why-title"
                className="mt-4 font-display text-[clamp(2rem,4vw,3.5rem)] font-medium leading-[1.05] text-ink"
              >
                Drie{" "}
                <span className="italic text-sage">bouwculturen</span>.
              </h2>
            </div>

            <div className="min-w-0 space-y-6 text-[17px] leading-[1.75] text-ink-soft md:col-span-7 md:text-[18px]">
              <p>
                Vlaams-Brabant is geen homogene markt — en daar passen we ons
                op aan. In Leuven draait een groot deel van het werk om
                universiteitsstad-renovatie: studentenpanden, kotwoningen
                getransformeerd tot gezinshuis, smalle herenhuizen in de
                schaduw van het stadhuis. Akoestische vloeren, energetische
                ingrepen onder erfgoedregels en strakke binnenstad-logistiek
                zijn er dagelijkse kost.
              </p>
              <p>
                Trek je richting Halle, Beersel of Gooik, dan kom je in het
                Pajottenland — klassieke villa-architectuur, hoeves,
                tuinpercelen met gewicht. Hier wordt zelden gesloopt en vaak
                verfijnd: een nieuwe leien dak, een uitgebreide kelderisolatie,
                een orangerie achter de bestaande gevel.
              </p>
              <p>
                En dan is er de Brusselse rand — Vilvoorde, Zaventem, Dilbeek
                — waar moderne projecten domineren: nieuwbouwwoningen,
                kantoorconversies, koppelvilla&rsquo;s met hoge eisen op vlak
                van ventilatie en domotica. Drie bouwculturen, één regionale
                kring die ze alle drie verstaat.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section
        id="partner"
        className="mx-auto mt-28 max-w-[1280px] scroll-mt-24 px-6 md:mt-44 md:px-16 lg:px-24"
      >
        <div className="relative overflow-hidden rounded-[32px] bg-surface-warm ring-1 ring-ink-hair/40">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-24 -bottom-24 h-96 w-96 rounded-full bg-sage/25 blur-3xl"
          />
          <div className="relative grid gap-10 p-7 sm:p-10 md:grid-cols-12 md:items-center md:gap-16 md:p-14 lg:p-20">
            <div className="min-w-0 md:col-span-7">
              <p className="text-[10px] font-medium uppercase tracking-[0.32em] text-ink-muted">
                Word partner
              </p>
              <h2 className="mt-5 font-display text-[clamp(2rem,4.5vw,3.75rem)] font-medium leading-[1.02] text-ink">
                Word partner in{" "}
                <span className="italic text-sage">Vlaams-Brabant</span>.
              </h2>
              <p className="mt-8 max-w-xl text-[17px] leading-[1.7] text-ink-soft md:text-[18px]">
                Niet alle veertien rubrieken zijn vol — controleer
                beschikbaarheid via{" "}
                <a
                  href="/contact"
                  className="font-medium text-ink underline-offset-4 hover:text-sage hover:underline"
                >
                  /contact
                </a>
                . We werken met één partner per rubriek per regio, en
                selecteren op vakkennis, referenties in de Vlaams-Brabantse
                gemeenten en de bereidheid om binnen een vaste kring te
                opereren.
              </p>
              <p className="mt-5 max-w-xl text-[15px] leading-[1.7] text-ink-muted">
                Bent u actief tussen Leuven, Aarschot, Tienen, Diest, Halle of
                Vilvoorde en herkent u zich in deze werkwijze? Stuur ons een
                korte voorstelling van uw bureau of vakgebied.
              </p>
            </div>

            <div className="min-w-0 md:col-span-5 md:justify-self-end">
              <div className="rounded-[28px] bg-surface-soft/85 p-7 ring-1 ring-ink-hair/50 backdrop-blur sm:p-8">
                <p className="text-[10px] font-medium uppercase tracking-[0.32em] text-ink-muted">
                  Aanvraag
                </p>
                <h3 className="mt-4 font-display text-[26px] font-medium leading-[1.15] text-ink">
                  Een kort gesprek volstaat.
                </h3>
                <p className="mt-5 text-[15px] leading-[1.7] text-ink-soft">
                  We bespreken uw rubriek, uw werkgebied binnen
                  Vlaams-Brabant en of er nog plek is in de kring.
                </p>
                <div className="mt-8">
                  <PillLink href="/#partner-aanvraag">Vraag aan</PillLink>
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
            <h2 className="mt-6 font-display text-[clamp(2rem,4vw,3.5rem)] font-medium leading-[1.05] text-ink"
            >
              Word partner in{" "}
              <span className="italic text-sage">Vlaams-Brabant</span>.
            </h2>
            <div className="mt-10">
              <PillLink href="/#partner-aanvraag">Vraag aan</PillLink>
            </div>
          </div>
          <div className="min-w-0 md:col-span-7">
            <p className="text-[19px] leading-[1.7] text-ink-soft md:text-[20px]">
              Werkt u rond Leuven, in Halle of de Brusselse rand en zoekt u
              een vaste kring partners? Een korte kennismaking volstaat om de
              pasvorm te checken — niet alle veertien rubrieken zijn vol.
            </p>
          </div>
        </div>
      </section>
    </article>
  );
}
