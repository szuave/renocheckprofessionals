import type { Metadata } from "next";
import Image from "next/image";
import { PillButton, PillLink } from "@/components/pill-button";
import { BreadcrumbSchema } from "@/components/structured-data";
import { submitLead } from "../actions";

const REGIONS = [
  { name: "West-Vlaanderen", slug: "west-vlaanderen" },
  { name: "Oost-Vlaanderen", slug: "oost-vlaanderen" },
  { name: "Antwerpen", slug: "antwerpen" },
  { name: "Vlaams-Brabant", slug: "vlaams-brabant" },
];

export const metadata: Metadata = {
  title: "Bouwers",
  description:
    "Bent u aan het bouwen of renoveren? Het Renocheck netwerk brengt u in contact met betrouwbare architecten en vakspecialisten in uw regio.",
  alternates: { canonical: "/bouwers" },
  openGraph: {
    title: "Voor bouwers · Renocheck Professionals",
    description:
      "Vind de juiste partners voor uw bouw- of renovatieproject — via één netwerk.",
    url: "/bouwers",
    type: "website",
  },
  twitter: {
    title: "Voor bouwers · Renocheck Professionals",
    description:
      "Vind de juiste partners voor uw bouw- of renovatieproject — via één netwerk.",
  },
};

const STEPS = [
  {
    nr: "01",
    title: "U vertelt uw project",
    body: "Renovatie, nieuwbouw of interieur — geef de regio en de scope aan, wij doen de rest.",
  },
  {
    nr: "02",
    title: "Wij stellen partners voor",
    body: "Een geselecteerde architect en vakspecialisten uit uw regio die elkaar al kennen.",
  },
  {
    nr: "03",
    title: "U beslist samen",
    body: "Eén kennismakingsgesprek, één coherent voorstel — geen versnipperde offertes.",
  },
];

export default async function BouwersPage({
  searchParams,
}: {
  searchParams: Promise<{ lead?: string }>;
}) {
  const params = await searchParams;
  const leadState = params?.lead ?? null;

  return (
    <article className="relative pt-36 pb-14 sm:pt-44 md:pt-52">
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "/" },
          { name: "Bouwers", url: "/bouwers" },
        ]}
      />

      <section className="mx-auto max-w-[1280px] px-6 md:px-16 lg:px-24">
        <p className="enter-up delay-300 text-[18px] text-ink-soft">
          Voor bouwers
        </p>

        <h1 className="enter-up delay-400 mt-6 font-display text-[clamp(3rem,8vw,7rem)] font-medium leading-[0.98] text-ink">
          Eén ingang voor uw{" "}
          <span className="italic text-sage">project</span>.
        </h1>

        <p className="enter-up delay-500 mt-8 max-w-xl text-[17px] leading-[1.65] text-ink-soft md:text-[19px]">
          Bouwen of renoveren is een puzzel van architecten, aannemers en
          tientallen vakspecialisten. Renocheck brengt deze partners samen
          per regio — zodat u één netwerk hebt in plaats van twintig
          contacten.
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
                  src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1800&q=90"
                  alt="Renovatieproject in uitvoering"
                  fill
                  sizes="(max-width: 768px) 100vw, 58vw"
                  className="object-cover"
                />
              </div>
            </div>

            <div className="min-w-0 md:col-span-5">
              <p className="text-[18px] text-ink-soft">Waarom een netwerk</p>
              <h2
                id="visual-title"
                className="mt-6 font-display text-[clamp(2rem,4vw,3.5rem)] font-medium leading-[1.05] text-ink"
              >
                Partners die elkaar{" "}
                <span className="italic text-sage">kennen</span>.
              </h2>
              <div className="mt-8 space-y-5 text-[17px] leading-[1.75] text-ink-soft md:text-[18px]">
                <p>
                  Onze partners werken niet voor het eerst samen. Ze delen
                  ervaringen, planningen en standaarden — wat zich vertaalt
                  in vlottere werven en samenhangender resultaten voor u.
                </p>
                <p>
                  Eén regionale kring vakmensen, één gedeelde standaard van
                  vakkennis.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        aria-labelledby="steps-title"
        className="relative mt-28 md:mt-44"
      >
        <div className="mx-auto max-w-[1280px] px-6 md:px-16 lg:px-24">
          <div className="max-w-2xl">
            <p className="text-[10px] font-medium uppercase tracking-[0.32em] text-ink-muted">
              Hoe het werkt
            </p>
            <h2
              id="steps-title"
              className="mt-4 font-display text-[clamp(2rem,4vw,3.5rem)] font-medium leading-[1.05] text-ink"
            >
              Drie stappen tot uw{" "}
              <span className="italic text-sage">team</span>.
            </h2>
          </div>

          <ul className="mt-16 grid gap-10 md:grid-cols-3 md:gap-12">
            {STEPS.map((s) => (
              <li key={s.nr} className="min-w-0">
                <span className="font-display text-[56px] font-light leading-none text-sage md:text-[72px]">
                  {s.nr}
                </span>
                <div
                  aria-hidden="true"
                  className="mt-6 h-px w-12 bg-ink-hair"
                />
                <h3 className="mt-6 font-display text-[28px] font-medium leading-[1.1] text-ink md:text-[32px]">
                  {s.title}
                </h3>
                <p className="mt-5 text-[16px] leading-[1.7] text-ink-soft">
                  {s.body}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section
        id="gids"
        aria-labelledby="gids-title"
        className="relative mt-28 scroll-mt-24 md:mt-44"
      >
        <div className="mx-auto max-w-[1280px] px-6 md:px-16 lg:px-24">
          <div className="relative overflow-hidden rounded-[32px] bg-surface-warm ring-1 ring-ink-hair/40">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-24 -bottom-24 h-96 w-96 rounded-full bg-sage/25 blur-3xl"
            />

            <div className="relative grid gap-10 p-7 sm:p-10 md:grid-cols-12 md:items-center md:gap-16 md:p-14 lg:p-20">
              <div className="min-w-0 md:col-span-6">
                <p className="text-[10px] font-medium uppercase tracking-[0.32em] text-ink-muted">
                  Gratis gids
                </p>
                <h2
                  id="gids-title"
                  className="mt-5 font-display text-[clamp(2rem,4.5vw,3.75rem)] font-medium leading-[1.02] text-ink"
                >
                  De Renocheck{" "}
                  <span className="italic text-sage">Renovatiegids</span>.
                </h2>
                <p className="mt-7 max-w-md text-[16px] leading-[1.7] text-ink-soft md:text-[17px]">
                  Een praktische gids voor wie bouwt of renoveert in
                  Vlaanderen — met de juiste vragen voor uw architect, een
                  checklist per fase, en een overzicht van welke
                  vakspecialisten u wanneer nodig heeft.
                </p>

                <ul className="mt-8 space-y-3 text-[15px] text-ink-soft">
                  {[
                    "Checklist per fase: ontwerp tot oplevering",
                    "Wat een lokaal partnernetwerk u bespaart",
                    "Praktische rubrieken-gids per regio",
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

              <form
                action={submitLead}
                className="min-w-0 md:col-span-6 md:max-w-lg md:justify-self-end"
                aria-label="Download de gratis Renocheck Renovatiegids"
              >
                <input type="hidden" name="source" value="bouwers-gids" />
                <input type="hidden" name="next" value="/bouwers" />

                <div className="rounded-[28px] bg-surface-soft/85 p-6 ring-1 ring-ink-hair/50 backdrop-blur sm:p-8">
                  {leadState === "ok" ? (
                    <div className="mb-6 rounded-2xl border border-sage/40 bg-sage/10 p-5 text-[14px] text-ink">
                      Bedankt — we sturen de gids naar uw mailbox. Geen mail
                      ontvangen? Check uw spam-map of mail{" "}
                      <a
                        className="font-medium underline-offset-4 hover:text-sage hover:underline"
                        href="mailto:info@renocheck.be"
                      >
                        info@renocheck.be
                      </a>
                      .
                    </div>
                  ) : leadState ? (
                    <div className="mb-6 rounded-2xl border border-red-300/60 bg-red-50/60 p-5 text-[14px] text-red-800">
                      {leadState === "missing"
                        ? "Vul uw e-mailadres in."
                        : leadState === "email"
                          ? "Vul een geldig e-mailadres in."
                          : "Er ging iets mis. Probeer het opnieuw."}
                    </div>
                  ) : null}

                  <p className="text-[10px] font-medium uppercase tracking-[0.32em] text-ink-muted">
                    Ontvang de gids
                  </p>
                  <h3 className="mt-4 font-display text-[26px] font-medium leading-[1.15] text-ink">
                    In uw mailbox, direct.
                  </h3>

                  <div className="mt-8 space-y-6">
                    <div className="grid gap-6 sm:grid-cols-2">
                      <LeadField
                        id="first_name"
                        label="Voornaam"
                        placeholder="Jane"
                      />
                      <LeadField
                        id="last_name"
                        label="Achternaam"
                        placeholder="Peeters"
                      />
                    </div>
                    <LeadField
                      id="email"
                      label="E-mailadres"
                      type="email"
                      placeholder="u@voorbeeld.be"
                      required
                    />
                    <div>
                      <label
                        htmlFor="region"
                        className="text-[10px] font-medium uppercase tracking-[0.3em] text-ink-muted"
                      >
                        Regio (optioneel)
                      </label>
                      <select
                        id="region"
                        name="region"
                        defaultValue=""
                        className="mt-3 w-full appearance-none border-0 border-b border-ink-hair bg-transparent px-0 py-2 text-base text-ink focus:border-ink focus:outline-none"
                      >
                        <option value="">Kies een regio</option>
                        {REGIONS.map((r) => (
                          <option key={r.slug} value={r.slug}>
                            {r.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <p className="text-[12px] leading-[1.6] text-ink-muted">
                      We mailen u de gids en sporadisch een update over
                      partners in uw regio. Uitschrijven kan altijd.
                    </p>

                    <div className="pt-2">
                      <PillButton type="submit">Stuur me de gids</PillButton>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto mt-20 max-w-[1280px] px-6 md:mt-32 md:px-16 lg:px-24">
        <div className="grid gap-12 md:grid-cols-12 md:items-center md:gap-16">
          <div className="min-w-0 md:col-span-5">
            <p className="text-[18px] text-ink-soft">Liever direct praten</p>
            <h2 className="mt-6 font-display text-[clamp(2rem,4vw,3.5rem)] font-medium leading-[1.05] text-ink">
              Vertel ons over uw{" "}
              <span className="italic text-sage">project</span>.
            </h2>
            <div className="mt-10">
              <PillLink href="/contact">Neem contact op</PillLink>
            </div>
          </div>
          <div className="min-w-0 md:col-span-7">
            <p className="text-[19px] leading-[1.7] text-ink-soft md:text-[20px]">
              Eén bericht volstaat. We beluisteren uw project, stemmen af
              welke regio en rubrieken nodig zijn, en stellen een team voor
              dat past.
            </p>
          </div>
        </div>
      </section>
    </article>
  );
}

function LeadField({
  id,
  label,
  type = "text",
  placeholder,
  required,
}: {
  id: string;
  label: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="text-[10px] font-medium uppercase tracking-[0.3em] text-ink-muted"
      >
        {label}
        {required ? <span className="ml-1 text-sage">*</span> : null}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        placeholder={placeholder}
        required={required}
        className="mt-3 w-full border-0 border-b border-ink-hair bg-transparent px-0 py-2 text-base text-ink placeholder:text-ink-muted/60 focus:border-ink focus:outline-none"
      />
    </div>
  );
}
