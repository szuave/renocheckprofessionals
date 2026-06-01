import type { Metadata } from "next";
import Image from "next/image";
import { PillLink } from "@/components/pill-button";
import {
  BreadcrumbSchema,
  RegionalServiceAreaSchema,
} from "@/components/structured-data";

export const metadata: Metadata = {
  title: "Bouwnetwerk Antwerpen",
  description:
    "Gesloten bouwnetwerk in Antwerpen — één architectenbureau en veertien vakspecialisten, geselecteerd op vakmanschap. Werkzaam in Antwerpen, Mechelen, Turnhout, Lier en de Kempen.",
  alternates: { canonical: "/regio/antwerpen" },
  openGraph: {
    title: "Bouwnetwerk Antwerpen · Renocheck Professionals",
    description:
      "Eén architectenbureau en veertien vakspecialisten per rubriek voor de provincie Antwerpen — van de stadsrand tot de Kempen.",
    url: "/regio/antwerpen",
    type: "website",
  },
  twitter: {
    title: "Bouwnetwerk Antwerpen · Renocheck Professionals",
    description:
      "Selectie boven zoekvolume — een gesloten kring vakmensen voor uw project in Antwerpen, Mechelen of de Kempen.",
  },
};

const CITIES = [
  "Antwerpen",
  "Mechelen",
  "Turnhout",
  "Geel",
  "Lier",
  "Mortsel",
];

const RUBRIEKEN_HINT = [
  "één architectenbureau",
  "één dakwerker",
  "één sanitair-partner",
  "één elektricien",
  "één keukenbouwer",
  "één tegelzetter",
  "één schrijnwerker",
];

const PARTNERS = [
  {
    name: "Partner-naam",
    rubriek: "Architectenbureau",
    city: "Antwerpen",
  },
  {
    name: "Partner-naam",
    rubriek: "Dakwerken",
    city: "Mechelen",
  },
  {
    name: "Partner-naam",
    rubriek: "Schrijnwerk",
    city: "Turnhout",
  },
];

export default async function RegioAntwerpenPage() {
  return (
    <article className="relative pt-36 pb-14 sm:pt-44 md:pt-52">
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "/" },
          { name: "Regio Antwerpen", url: "/regio/antwerpen" },
        ]}
      />
      <RegionalServiceAreaSchema region="Antwerpen" cities={CITIES} />

      {/* HERO */}
      <section className="mx-auto max-w-[1280px] px-6 md:px-16 lg:px-24">
        <p className="enter-up delay-300 text-[18px] text-ink-soft">
          Regio · Antwerpen
        </p>

        <h1 className="enter-up delay-400 mt-6 font-display text-[clamp(3rem,8vw,7rem)] font-medium leading-[0.98] text-ink">
          Eén kring vakmensen, van de Schelde tot de{" "}
          <span className="italic text-sage">Kempen</span>.
        </h1>

        <p className="enter-up delay-500 mt-8 max-w-2xl text-[17px] leading-[1.65] text-ink-soft md:text-[19px]">
          Tussen de art-deco-gevels op de Linkeroever en de villabouw in de
          dennenbossen van Geel ligt een merkwaardig breed bouwlandschap.
          Renocheck Professionals bundelt in de provincie Antwerpen één
          architectenbureau en veertien vakspecialisten — partners die werven
          kennen van Mechelen tot Turnhout, en die elkaars manier van werken
          al begrijpen.
        </p>
        <p className="enter-up delay-600 mt-6 max-w-2xl text-[17px] leading-[1.65] text-ink-soft md:text-[19px]">
          Selectie op vakmanschap, niet op marketingbudget. Wij hanteren
          één partner per rubriek per regio — zo komt u nooit terecht in een
          veiling van offertes.
        </p>
      </section>

      {/* HERO IMAGE */}
      <section className="mx-auto mt-20 max-w-[1280px] px-6 md:mt-28 md:px-16 lg:px-24">
        <div className="relative aspect-[16/9] w-full overflow-hidden rounded-[32px] bg-ink/5">
          <Image
            src="https://images.unsplash.com/photo-1568797629192-908a3ce92c70?auto=format&fit=crop&w=2200&q=90"
            alt="Antwerpse haven met historische pakhuizen en moderne architectuur"
            fill
            sizes="(max-width: 1280px) 100vw, 1280px"
            className="object-cover"
            priority
          />
        </div>
      </section>

      {/* SERVICEGEBIED */}
      <section
        aria-labelledby="service-title"
        className="relative mt-28 md:mt-44"
      >
        <div className="mx-auto max-w-[1280px] px-6 md:px-16 lg:px-24">
          <div className="grid gap-14 md:grid-cols-12 md:items-start md:gap-16">
            <div className="min-w-0 md:col-span-5">
              <p className="text-[10px] font-medium uppercase tracking-[0.32em] text-ink-muted">
                Servicegebied
              </p>
              <h2
                id="service-title"
                className="mt-4 font-display text-[clamp(2rem,4vw,3.5rem)] font-medium leading-[1.05] text-ink"
              >
                Waar onze{" "}
                <span className="italic text-sage">partners</span> wonen.
              </h2>
            </div>

            <div className="min-w-0 md:col-span-7">
              <p className="text-[17px] leading-[1.7] text-ink-soft md:text-[18px]">
                Onze Antwerpse kring werkt vanuit de provinciehoofdstad en de
                Kempen, en bestrijkt zowel de dense stadsweefsels van
                Antwerpen en Mechelen als het ruimer-opgezette bouwen in
                Turnhout, Geel en Lier. Korte verplaatsingen zijn de regel —
                wie naar Mortsel wordt geroepen, zit op een half uur ter
                plaatse.
              </p>

              <ul className="mt-8 grid grid-cols-2 gap-x-6 gap-y-3 text-[16px] text-ink sm:grid-cols-3">
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

              <p className="mt-10 rounded-2xl border border-ink-hair/50 bg-surface-soft/70 p-6 text-[15px] leading-[1.7] text-ink-soft">
                Renocheck Professionals heeft geen fysiek kantoor in
                Antwerpen — we werken als netwerk, met partners die gevestigd
                zijn in deze regio. Eerste afspraken vinden plaats op de
                werf, in het bureau van de architect, of digitaal.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* DE KRING IN ANTWERPEN */}
      <section
        aria-labelledby="kring-title"
        className="relative mt-28 md:mt-44"
      >
        <div className="mx-auto max-w-[1280px] px-6 md:px-16 lg:px-24">
          <div className="max-w-2xl">
            <p className="text-[10px] font-medium uppercase tracking-[0.32em] text-ink-muted">
              De kring in Antwerpen
            </p>
            <h2
              id="kring-title"
              className="mt-4 font-display text-[clamp(2rem,4vw,3.5rem)] font-medium leading-[1.05] text-ink"
            >
              Vijftien namen,{" "}
              <span className="italic text-sage">geen lijst van twintig</span>.
            </h2>
          </div>

          <div className="mt-12 grid gap-14 md:grid-cols-12 md:items-start md:gap-16">
            <div className="min-w-0 md:col-span-7">
              <div className="space-y-5 text-[17px] leading-[1.75] text-ink-soft md:text-[18px]">
                <p>
                  Per Vlaamse regio bouwen we één gesloten kring: één
                  architectenbureau en veertien vakspecialisten, samen
                  veertien vakrubrieken. Voor Antwerpen betekent dat{" "}
                  {RUBRIEKEN_HINT.slice(0, -1).join(", ")} en{" "}
                  {RUBRIEKEN_HINT.at(-1)} — aangevuld met de overige
                  rubrieken tot het volledige team rond is.
                </p>
                <p>
                  Wie binnen die kring zit, kent de Mechelse bouwvoorschriften
                  net zo goed als de stedenbouwkundige eigenheden van de
                  Antwerpse 19de-eeuwse gordel. Werven worden niet door een
                  algoritme verdeeld — ze worden voorgesteld aan het team dat
                  ze het best aankan.
                </p>
              </div>
            </div>

            <div className="min-w-0 md:col-span-5">
              <div className="rounded-[24px] border border-ink-hair/40 bg-surface-warm p-7">
                <p className="text-[10px] font-medium uppercase tracking-[0.32em] text-ink-muted">
                  Wat dit betekent
                </p>
                <ul className="mt-5 space-y-4 text-[15px] leading-[1.65] text-ink-soft">
                  <li className="flex items-start gap-3">
                    <span
                      aria-hidden="true"
                      className="mt-2 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-sage"
                    />
                    <span>
                      Eén gedeeld voorstel in plaats van vijf tegenstrijdige
                      offertes.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span
                      aria-hidden="true"
                      className="mt-2 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-sage"
                    />
                    <span>
                      Partners die op vorige werven al hebben samengewerkt.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span
                      aria-hidden="true"
                      className="mt-2 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-sage"
                    />
                    <span>
                      Een vast aanspreekpunt voor de hele duur van uw
                      project.
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PARTNERS PLACEHOLDER */}
      <section
        aria-labelledby="partners-title"
        className="relative mt-28 md:mt-44"
      >
        <div className="mx-auto max-w-[1280px] px-6 md:px-16 lg:px-24">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <p className="text-[10px] font-medium uppercase tracking-[0.32em] text-ink-muted">
                Onze Antwerpen-partners
              </p>
              <h2
                id="partners-title"
                className="mt-4 font-display text-[clamp(2rem,4vw,3.5rem)] font-medium leading-[1.05] text-ink"
              >
                Namen op{" "}
                <span className="italic text-sage">aanvraag</span>.
              </h2>
            </div>
            <p className="max-w-md text-[15px] leading-[1.7] text-ink-soft">
              Wij delen partnernamen en projectreferenties na aanmelding via{" "}
              <a
                href="/login"
                className="font-medium text-ink underline-offset-4 hover:text-sage hover:underline"
              >
                /login
              </a>
              . Vraag een gesprek aan via{" "}
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
            {PARTNERS.map((partner, idx) => (
              <li
                key={`${partner.rubriek}-${idx}`}
                className="rounded-[24px] border border-ink-hair/40 bg-surface-soft p-7"
              >
                <p className="text-[10px] font-medium uppercase tracking-[0.32em] text-ink-muted">
                  {partner.rubriek}
                </p>
                <h3 className="mt-5 font-display text-[24px] font-medium leading-[1.15] text-ink md:text-[28px]">
                  {partner.name}
                </h3>
                <div
                  aria-hidden="true"
                  className="mt-6 h-px w-10 bg-ink-hair"
                />
                <p className="mt-6 text-[14px] text-ink-soft">
                  {partner.city}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* WHY THIS REGION */}
      <section
        aria-labelledby="waarom-title"
        className="relative mt-28 md:mt-44"
      >
        <div className="mx-auto max-w-[1280px] px-6 md:px-16 lg:px-24">
          <div className="grid gap-14 md:grid-cols-12 md:items-center md:gap-16">
            <div className="min-w-0 md:col-span-6">
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[32px] bg-ink/5">
                <Image
                  src="https://images.unsplash.com/photo-1577979749830-f1d742b96791?auto=format&fit=crop&w=1600&q=90"
                  alt="Art-deco-detail van een Antwerpse gevel"
                  fill
                  sizes="(max-width: 768px) 100vw, 48vw"
                  className="object-cover"
                />
              </div>
            </div>

            <div className="min-w-0 md:col-span-6">
              <p className="text-[10px] font-medium uppercase tracking-[0.32em] text-ink-muted">
                Waarom Antwerpen
              </p>
              <h2
                id="waarom-title"
                className="mt-4 font-display text-[clamp(2rem,4vw,3.5rem)] font-medium leading-[1.05] text-ink"
              >
                Een provincie met{" "}
                <span className="italic text-sage">drie gezichten</span>.
              </h2>

              <div className="mt-8 space-y-5 text-[17px] leading-[1.75] text-ink-soft md:text-[18px]">
                <p>
                  Geen andere Vlaamse provincie combineert zoveel
                  bouwculturen tegelijk. Aan de Schelde laat de
                  haven-architectuur zien hoe industriële maatstaven en
                  hedendaagse detaillering kunnen samenvallen — een idioom
                  waarin onze architecten thuis zijn, en waar onze
                  vakspecialisten staal, glas en beton even vanzelfsprekend
                  hanteren als hout en kalkbepleistering.
                </p>
                <p>
                  In de stad zelf is het art-deco-erfgoed bepalend. Wie hier
                  renoveert, werkt aan gevels met opgelegde gevelarchitectuur,
                  oorspronkelijke schrijnwerken en koperen detailafwerking
                  — werk dat geen ruimte laat voor improvisatie. Onze
                  schrijnwerker en schilder in deze regio worden geselecteerd
                  precies omdat zij dat erfgoed-register beheersen.
                </p>
                <p>
                  En in de Antwerpse Kempen, tussen Geel en Turnhout, ligt
                  het hart van de moderne villabouw — open volumes, grote
                  raampartijen, geïntegreerde tuinaanleg en zonnepanelen
                  die het ontwerp moeten respecteren, niet doorbreken. Onze
                  partners daar zijn vertrouwd met percelen waar de
                  stedenbouwkundige voorschriften losser zijn maar de
                  architecturale ambitie net hoger.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WORD PARTNER CTA */}
      <section
        aria-labelledby="partner-cta-title"
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
                  Voor vakspecialisten
                </p>
                <h2
                  id="partner-cta-title"
                  className="mt-5 font-display text-[clamp(2rem,4.5vw,3.75rem)] font-medium leading-[1.02] text-ink"
                >
                  Word partner in{" "}
                  <span className="italic text-sage">Antwerpen</span>.
                </h2>
                <p className="mt-7 max-w-xl text-[16px] leading-[1.7] text-ink-soft md:text-[17px]">
                  Wij vullen de Antwerpse kring rubriek per rubriek aan. Niet
                  alle veertien rubrieken zijn vol — sommige plekken liggen
                  nog open, andere worden bewust beperkt gehouden tot één
                  vakman. Controleer beschikbaarheid via{" "}
                  <a
                    href="/contact"
                    className="font-medium text-ink underline-offset-4 hover:text-sage hover:underline"
                  >
                    /contact
                  </a>
                  .
                </p>

                <ul className="mt-8 space-y-3 text-[15px] text-ink-soft">
                  <li className="flex items-start gap-3">
                    <span
                      aria-hidden="true"
                      className="mt-2 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-sage"
                    />
                    <span>
                      Eén vakman per rubriek per regio — exclusiviteit binnen
                      de kring.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span
                      aria-hidden="true"
                      className="mt-2 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-sage"
                    />
                    <span>
                      Geen lead-veiling, geen marketingbudget-wedloop.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span
                      aria-hidden="true"
                      className="mt-2 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-sage"
                    />
                    <span>
                      Selectie op vakmanschap en regionale reputatie.
                    </span>
                  </li>
                </ul>
              </div>

              <div className="min-w-0 md:col-span-5 md:justify-self-end">
                <div className="rounded-[28px] bg-surface-soft/85 p-7 ring-1 ring-ink-hair/50 backdrop-blur sm:p-9">
                  <p className="text-[10px] font-medium uppercase tracking-[0.32em] text-ink-muted">
                    Toetreden tot de kring
                  </p>
                  <h3 className="mt-4 font-display text-[26px] font-medium leading-[1.15] text-ink">
                    Vraag aan.
                  </h3>
                  <p className="mt-5 text-[15px] leading-[1.7] text-ink-soft">
                    Een kort gesprek volstaat om te beoordelen of uw bureau
                    past binnen de Antwerpse kring.
                  </p>
                  <div className="mt-8">
                    <PillLink href="/#partner-aanvraag">Vraag aan</PillLink>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BOUWHEER CTA */}
      <section className="mx-auto mt-20 max-w-[1280px] px-6 md:mt-32 md:px-16 lg:px-24">
        <div className="grid gap-12 md:grid-cols-12 md:items-center md:gap-16">
          <div className="min-w-0 md:col-span-5">
            <p className="text-[18px] text-ink-soft">Voor bouwheren</p>
            <h2 className="mt-6 font-display text-[clamp(2rem,4vw,3.5rem)] font-medium leading-[1.05] text-ink">
              Bouwt of renoveert u in{" "}
              <span className="italic text-sage">Antwerpen</span>?
            </h2>
            <div className="mt-10">
              <PillLink href="/bouwers">Ontdek hoe het werkt</PillLink>
            </div>
          </div>
          <div className="min-w-0 md:col-span-7">
            <p className="text-[19px] leading-[1.7] text-ink-soft md:text-[20px]">
              Of het nu om een herenhuis op het Zuid gaat, een passiefwoning
              in Lier of een kantoorrenovatie in Mechelen — we stellen u het
              Antwerpse team voor dat bij uw project past, in één
              kennismakingsgesprek.
            </p>
          </div>
        </div>
      </section>
    </article>
  );
}
