import type { Metadata } from "next";
import Image from "next/image";
import { PillLink } from "@/components/pill-button";
import { BreadcrumbSchema } from "@/components/structured-data";

export const metadata: Metadata = {
  title: "Voor bouwondernemers",
  description:
    "Word netwerkpartner als algemene bouwondernemer in Vlaanderen — coördineer volledige projecten met vaste architecten en vakspecialisten uit hetzelfde gesloten netwerk. Geen lead-veiling, exclusief per regio.",
  alternates: { canonical: "/bouwondernemers" },
  openGraph: {
    title: "Voor bouwondernemers · Renocheck Professionals",
    description:
      "Vaste kring architecten en vakspecialisten voor algemene aannemers — exclusief per Vlaamse regio.",
    url: "/bouwondernemers",
    type: "website",
  },
  twitter: {
    title: "Voor bouwondernemers · Renocheck Professionals",
    description:
      "Vaste kring architecten en vakspecialisten voor algemene aannemers — exclusief per Vlaamse regio.",
  },
};

export default function BouwondernemersPage() {
  return (
    <article className="relative pt-36 pb-14 sm:pt-44 md:pt-52">
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "/" },
          { name: "Bouwondernemers", url: "/bouwondernemers" },
        ]}
      />

      <section className="mx-auto max-w-[1280px] px-6 md:px-16 lg:px-24">
        <p className="enter-up delay-300 text-[18px] text-ink-soft">
          Voor bouwondernemers
        </p>

        <h1 className="enter-up delay-400 mt-6 font-display text-[clamp(3rem,8vw,7rem)] font-medium leading-[0.98] text-ink">
          Coördineren met{" "}
          <span className="italic text-sage">vaste</span> partners.
        </h1>

        <p className="enter-up delay-500 mt-8 max-w-2xl text-[17px] leading-[1.65] text-ink-soft md:text-[19px]">
          Algemene aannemers en bouwondernemers die volledige projecten
          opvolgen — van uitvoering tot oplevering — vinden in Renocheck
          Professionals een vaste kring architecten en vakspecialisten per
          regio. Niet nog een marktplaats, wél één voorspelbare keten.
        </p>
      </section>

      <section className="relative mt-28 md:mt-44">
        <div className="mx-auto max-w-[1280px] px-6 md:px-16 lg:px-24">
          <div className="grid gap-14 md:grid-cols-12 md:items-center md:gap-16">
            <div className="min-w-0 md:col-span-7">
              <div className="relative aspect-[5/4] w-full overflow-hidden rounded-[32px] bg-ink/5">
                <Image
                  src="https://images.unsplash.com/photo-1581094288338-2314dddb7ece?auto=format&fit=crop&w=1800&q=90"
                  alt="Bouwondernemer in overleg op de werf met architect en vakman"
                  fill
                  sizes="(max-width: 768px) 100vw, 58vw"
                  className="object-cover"
                />
              </div>
            </div>

            <div className="min-w-0 md:col-span-5">
              <p className="text-[18px] text-ink-soft">Hoe selecteren we</p>
              <h2 className="mt-6 font-display text-[clamp(2rem,4vw,3.5rem)] font-medium leading-[1.05] text-ink">
                Schaal{" "}
                <span className="italic text-sage">en</span> betrouwbaarheid.
              </h2>
              <div className="mt-8 space-y-5 text-[17px] leading-[1.75] text-ink-soft md:text-[18px]">
                <p>
                  We selecteren bouwondernemers die volledige werven kunnen
                  trekken — sleutel-op-de-deur of casco — en gewend zijn
                  meerdere vakdisciplines op één planning te brengen.
                </p>
                <p>
                  Aantoonbare referenties, ordelijke werforganisatie en
                  bereidheid om mee aan tafel te zitten met de architect én
                  de vakspecialisten van het netwerk.
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
              Waarom aansluiten
            </p>
            <h2 className="mt-4 font-display text-[clamp(2rem,4vw,3.5rem)] font-medium leading-[1.05] text-ink">
              Een{" "}
              <span className="italic text-sage">vaste</span> bouwketen.
            </h2>
            <p className="mt-6 max-w-xl text-[17px] leading-[1.65] text-ink-soft">
              Voorspelbare onderaannemers, gedeelde standaarden, één gedeelde
              agenda — dat is wat aansluiting bij Renocheck Professionals
              concreet oplevert.
            </p>
          </div>

          <div className="mt-14 grid gap-10 md:mt-20 md:grid-cols-3 md:gap-8 lg:gap-12">
            {[
              {
                nr: "01",
                title: "Vaste onderaannemers per rubriek",
                body: "Eén dakwerker, één elektricien, één sanitair-partner per regio die uw werforganisatie kent. Minder calibratie tussen werven, minder verrassingen op planning.",
              },
              {
                nr: "02",
                title: "Doorverwijzingen vanuit architecten",
                body: "Architectenbureaus uit het netwerk werken bij voorkeur met de bouwondernemer van die regio. Geen offerte-veiling, wel een vaste eerste belrij.",
              },
              {
                nr: "03",
                title: "Partnerevents per twee maanden",
                body: "Zes partnerevents per jaar in uw regio — geen vrijblijvend netwerken, wel gedeelde kwaliteitsstandaarden en peer-validatie van nieuwe leden.",
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
            <p className="text-[18px] text-ink-soft">Bent u bouwondernemer</p>
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
              We werken per regio met een beperkte selectie bouwondernemers
              die volledige projecten kunnen dragen. Stel u voor en we
              plannen een kennismaking.
            </p>
          </div>
        </div>
      </section>
    </article>
  );
}
