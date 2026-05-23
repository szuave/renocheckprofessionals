import Image from "next/image";
import Link from "next/link";
import { PillButton, PillLink } from "@/components/pill-button";
import { submitPartnerApplication } from "./actions";

const RUBRIEKEN = [
  "Dakwerken",
  "Ramen & deuren",
  "Elektriciteit",
  "Sanitair",
  "Verwarming & airco",
  "Tegels & natuursteen",
  "Schrijnwerk",
  "Schilderwerken",
  "Vloeren",
  "Isolatie",
  "Tuinaanleg",
  "Zonnepanelen",
  "Zwembaden",
  "Keukens",
];

const PATHWAYS = [
  {
    href: "/bouwers",
    eyebrow: "Bouwen of verbouwen",
    title: "Vind uw team",
    tagline:
      "Eén ingang voor wie bouwt of renoveert — wij brengen u in contact met de juiste architecten en vakspecialisten in uw regio.",
    image:
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1600&q=90",
    alt: "Modern architectonisch gebouw — Renocheck bouwers",
  },
  {
    href: "/architecten",
    eyebrow: "Architectenbureau",
    title: "Voor de architect",
    tagline:
      "Een lokaal architectennetwerk dat samen aan tafel zit met de uitvoerders — voor projecten die kloppen van schets tot oplevering.",
    image:
      "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1600&q=90",
    alt: "Architect aan het werk met bouwplannen",
  },
  {
    href: "/vakspecialisten",
    eyebrow: "Veertien rubrieken",
    title: "Voor de vakman",
    tagline:
      "Per regio één vakspecialist per rubriek — van dakwerken tot zonnepanelen, één gedeelde standaard.",
    image:
      "https://images.unsplash.com/photo-1530124566582-a618bc2615dc?auto=format&fit=crop&w=1600&q=90",
    alt: "Vakspecialist op de werf met materiaal",
  },
];

const REGIONS = [
  { name: "West-Vlaanderen", slug: "west-vlaanderen" },
  { name: "Oost-Vlaanderen", slug: "oost-vlaanderen" },
  { name: "Antwerpen", slug: "antwerpen" },
  { name: "Vlaams-Brabant", slug: "vlaams-brabant" },
];

export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<{ form?: string; ok?: string; error?: string }>;
}) {
  const params = await searchParams;
  const partnerState =
    params?.form === "partner"
      ? params?.ok
        ? "ok"
        : params?.error || null
      : null;
  return (
    <>
      <Hero />
      <Pathways />
      <Regions />
      <Manifesto />
      <PullQuote />
      <PartnerCTA state={partnerState} />
    </>
  );
}

function Hero() {
  return (
    <section className="relative flex min-h-[88svh] flex-col justify-center px-6 pb-20 pt-32 sm:px-8 md:min-h-[100svh] md:px-16 md:py-20 lg:px-24">
      <div className="mx-auto w-full max-w-[1280px]">
        <div className="grid items-center gap-12 md:grid-cols-12 md:gap-16">
          <div className="min-w-0 md:col-span-7">
            <p className="enter-up delay-300 text-[18px] text-ink-soft">
              Renocheck Professionals · Het bouwnetwerk
            </p>

            <h1 className="enter-up delay-400 mt-6 font-display text-[clamp(3rem,6.5vw,5.75rem)] font-medium leading-[0.98] text-ink">
              Het netwerk dat<br />
              <span className="italic text-sage">samen</span> bouwt.
            </h1>

            <p className="enter-up delay-500 mt-8 max-w-xl text-[17px] leading-[1.65] text-ink-soft md:text-[19px]">
              Renocheck verbindt architecten en vakspecialisten per regio in
              Vlaanderen — partners die elkaar kennen, voordat uw project
              start.
            </p>

            <div className="enter-up delay-600 mt-10">
              <PillLink href="#pathways">Ontdek het netwerk</PillLink>
            </div>
          </div>

          <figure className="enter-fade delay-700 hidden min-w-0 md:col-span-5 md:block">
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[32px] bg-ink/5">
              <Image
                src="https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1400&q=90"
                alt="Architecten en vakspecialisten in overleg over een bouwproject"
                fill
                sizes="(max-width: 768px) 100vw, 40vw"
                className="object-cover"
                priority
              />
            </div>
            <figcaption className="mt-5 flex items-center gap-3 text-[10px] font-medium uppercase tracking-[0.32em] text-ink-muted">
              <span aria-hidden="true" className="h-px w-8 bg-sage/60" />
              Het netwerk · 2026
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}

function Pathways() {
  const [hero, ...rest] = PATHWAYS;
  return (
    <section
      id="pathways"
      aria-labelledby="pathways-title"
      className="relative scroll-mt-24 py-20 md:py-28 lg:py-36"
    >
      <div className="mx-auto max-w-[1400px] px-6 md:px-16 lg:px-24">
        <div className="flex items-end justify-between gap-6">
          <div>
            <p className="text-[18px] text-ink-soft">Het netwerk</p>
            <h2
              id="pathways-title"
              className="mt-4 font-display text-[clamp(1.75rem,3vw,2.5rem)] font-medium leading-[1.05] text-ink"
            >
              Drie ingangen,{" "}
              <span className="italic text-sage">één</span> netwerk.
            </h2>
          </div>
          <Link
            href="/over-ons"
            className="hidden text-[13px] font-medium uppercase tracking-[0.28em] text-ink-muted transition-colors hover:text-ink md:inline-block"
          >
            Hoe werkt het →
          </Link>
        </div>

        <div className="mt-14 grid gap-4 md:mt-20 md:grid-cols-12 md:gap-5">
          <div className="enter-up md:col-span-7 md:row-span-2" style={{ animationDelay: "700ms" }}>
            <PathwayCard {...hero} size="lg" index={1} />
          </div>
          {rest.map((p, i) => (
            <div
              key={p.href}
              className="enter-up md:col-span-5"
              style={{ animationDelay: `${850 + i * 150}ms` }}
            >
              <PathwayCard {...p} size="sm" index={i + 2} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function PathwayCard({
  href,
  eyebrow,
  title,
  tagline,
  image,
  alt,
  size,
  index,
}: {
  href: string;
  eyebrow: string;
  title: string;
  tagline: string;
  image: string;
  alt: string;
  size: "lg" | "sm";
  index: number;
}) {
  const isLarge = size === "lg";
  return (
    <Link
      href={href}
      aria-label={`${title} — ${tagline}`}
      className={`group relative block h-full overflow-hidden rounded-[28px] bg-ink ${
        isLarge
          ? "min-h-[460px] md:min-h-[640px]"
          : "min-h-[260px] md:min-h-[310px]"
      }`}
    >
      <Image
        src={image}
        alt={alt}
        fill
        sizes={isLarge ? "(max-width: 768px) 100vw, 60vw" : "(max-width: 768px) 100vw, 40vw"}
        className="object-cover opacity-90 transition-transform duration-700 ease-out group-hover:scale-[1.05] group-hover:opacity-100"
        priority={isLarge}
      />

      <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/35 to-ink/10" />
      <div className="absolute inset-0 bg-sage/0 transition-colors duration-500 group-hover:bg-sage/15" />

      <div className="absolute inset-x-0 top-0 flex items-start justify-between p-6 md:p-8">
        <span className="text-[10px] font-medium uppercase tracking-[0.32em] text-white/85">
          {String(index).padStart(2, "0")} · {eyebrow}
        </span>
        <span
          aria-hidden="true"
          className={`inline-flex shrink-0 items-center justify-center rounded-full border border-white/30 bg-white/5 text-white backdrop-blur-sm transition-all duration-300 group-hover:border-white group-hover:bg-white group-hover:text-ink ${
            isLarge ? "h-12 w-12" : "h-10 w-10"
          }`}
        >
          <svg
            viewBox="0 0 16 10"
            className={isLarge ? "h-3 w-5" : "h-3 w-4"}
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M1 5h14M11 1l4 4-4 4" />
          </svg>
        </span>
      </div>

      <div className="absolute inset-x-0 bottom-0 p-6 text-white md:p-8 lg:p-10">
        <h3
          className={`font-display font-semibold leading-[1.02] ${
            isLarge
              ? "text-[40px] md:text-[56px] lg:text-[64px]"
              : "text-[30px] md:text-[34px] lg:text-[38px]"
          }`}
        >
          {title}
        </h3>
        {isLarge ? (
          <p className="mt-5 max-w-md text-[15px] leading-[1.6] text-white/85 md:text-[16px]">
            {tagline}
          </p>
        ) : null}
        <span
          className={`mt-5 inline-flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.32em] text-white/90 transition-colors group-hover:text-white ${
            isLarge ? "md:mt-7" : ""
          }`}
        >
          Ontdek
          <span
            aria-hidden="true"
            className="inline-block h-px w-8 bg-white/60 transition-all duration-500 group-hover:w-14 group-hover:bg-white"
          />
        </span>
      </div>
    </Link>
  );
}

function Regions() {
  return (
    <section
      aria-labelledby="regions-title"
      className="relative py-20 md:py-28 lg:py-32"
    >
      <div className="mx-auto max-w-[1280px] px-6 md:px-16 lg:px-24">
        <div className="grid gap-14 md:grid-cols-12 md:items-center md:gap-16">
          <div className="min-w-0 md:col-span-5">
            <p className="text-[18px] text-ink-soft">Regio's</p>
            <h2
              id="regions-title"
              className="mt-6 font-display text-[clamp(2rem,4vw,3.5rem)] font-medium leading-[1.05] text-ink"
            >
              Een netwerk in{" "}
              <span className="italic text-sage">elke</span> regio.
            </h2>
            <p className="mt-8 max-w-md text-[17px] leading-[1.7] text-ink-soft">
              Per regio een vaste selectie van architecten en veertien
              vakspecialisten — één per rubriek. Lokaal, samen, op maat van uw
              project.
            </p>
          </div>

          <ul className="min-w-0 md:col-span-7">
            {REGIONS.map((r, i) => (
              <li key={r.slug}>
                <Link
                  href="/vakspecialisten"
                  className={`group flex items-center justify-between gap-6 py-5 md:py-6 ${
                    i === 0 ? "border-t border-ink-hair/40" : ""
                  } border-b border-ink-hair/40`}
                >
                  <span className="font-display text-[24px] font-medium leading-tight text-ink transition-colors group-hover:text-sage md:text-[30px]">
                    {r.name}
                  </span>
                  <span
                    aria-hidden="true"
                    className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-ink-hair/70 text-ink-soft transition-all duration-300 group-hover:border-sage group-hover:bg-sage group-hover:text-white"
                  >
                    <svg
                      viewBox="0 0 16 10"
                      className="h-3 w-4"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M1 5h14M11 1l4 4-4 4" />
                    </svg>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function Manifesto() {
  return (
    <section
      aria-labelledby="visie-title"
      className="relative py-24 md:py-36 lg:py-44"
    >
      <div className="mx-auto max-w-[1280px] px-6 md:px-16 lg:px-24">
        <div className="grid gap-14 md:grid-cols-12 md:items-center md:gap-16">
          <div className="min-w-0 md:col-span-5">
            <p className="text-[18px] text-ink-soft">Over Renocheck</p>
            <h2
              id="visie-title"
              className="mt-6 font-display text-[clamp(2.25rem,4.5vw,4.25rem)] font-medium leading-[1.02] text-ink"
            >
              Eén netwerk voor{" "}
              <span className="italic text-sage">elk</span> bouwproject.
            </h2>
            <div className="mt-10">
              <PillLink href="/login">Word partner</PillLink>
            </div>
          </div>

          <div className="min-w-0 space-y-6 md:col-span-7">
            <p className="text-[19px] leading-[1.7] text-ink-soft md:text-[21px]">
              Een bouwproject is een puzzel van vakken. Renocheck verbindt
              architecten en vakspecialisten in één regio — partners die
              elkaar al kennen voordat uw project start.
            </p>
            <p className="text-[19px] leading-[1.7] text-ink-soft md:text-[21px]">
              Geen versnipperde offertes, geen tegenstrijdige planningen.
              Eén kring vakmensen die samen aan een project werken — van
              eerste schets tot oplevering.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function PullQuote() {
  return (
    <section
      aria-label="Renocheck manifest"
      className="relative py-20 md:py-40 lg:py-48"
    >
      <div className="mx-auto max-w-[1280px] px-6 md:px-16 lg:px-24">
        <div className="mx-auto max-w-4xl text-center">
          <span
            aria-hidden="true"
            className="mx-auto block h-px w-12 bg-sage/60"
          />
          <blockquote className="mt-10 font-display text-[clamp(2rem,5.5vw,4.5rem)] font-medium leading-[1.1] text-ink">
            Vakwerk is{" "}
            <span className="italic text-sage">mensen</span>werk.
          </blockquote>
          <p className="mt-10 text-[12px] font-medium uppercase tracking-[0.32em] text-ink-muted">
            Het Renocheck idee
          </p>
        </div>
      </div>
    </section>
  );
}

function PartnerCTA({ state }: { state: string | null }) {
  return (
    <section
      id="partner-aanvraag"
      aria-labelledby="partner-title"
      className="relative scroll-mt-24 pb-14 pt-10 md:pt-14"
    >
      <div className="mx-auto max-w-[1100px] px-6 md:px-16 lg:px-24">
        <div className="relative overflow-hidden rounded-[28px] bg-surface-warm ring-1 ring-ink-hair/40">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-sage/25 blur-3xl"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-20 -left-20 h-72 w-72 rounded-full bg-sage-glow/35 blur-3xl"
          />

          <div className="relative grid gap-8 p-6 sm:p-8 md:grid-cols-12 md:items-start md:gap-10 md:p-10 lg:p-14">
            <div className="min-w-0 md:col-span-5">
              <p className="text-[14px] text-ink-soft">Word partner</p>
              <h2
                id="partner-title"
                className="mt-3 font-display text-[clamp(1.75rem,3.5vw,2.75rem)] font-medium leading-[1.05] text-ink"
              >
                Sluit aan bij het{" "}
                <span className="italic text-sage">Renocheck</span>{" "}
                netwerk.
              </h2>
              <p className="mt-5 max-w-sm text-[15px] leading-[1.6] text-ink-soft">
                Per regio nemen we één vakspecialist per rubriek op. Laat uw
                gegevens achter en we contacteren u voor een kennismaking.
              </p>
            </div>

            <form
              action={submitPartnerApplication}
              className="min-w-0 md:col-span-7 md:max-w-md md:justify-self-end"
              aria-label="Partner aanvraag"
            >
              <div className="rounded-[20px] bg-surface-soft/80 p-5 ring-1 ring-ink-hair/50 backdrop-blur sm:p-6">
                {state === "ok" ? (
                  <div className="mb-5 rounded-xl border border-sage/40 bg-sage/10 p-4 text-[13px] text-ink">
                    Bedankt — we hebben uw aanvraag ontvangen. We nemen binnen
                    één werkdag contact op.
                  </div>
                ) : state ? (
                  <div className="mb-5 rounded-xl border border-red-300/60 bg-red-50/60 p-4 text-[13px] text-red-800">
                    {state === "missing"
                      ? "Vul minstens bedrijf en e-mailadres in."
                      : state === "email"
                        ? "Vul een geldig e-mailadres in."
                        : "Er ging iets mis. Probeer het opnieuw."}
                  </div>
                ) : null}
                <div className="space-y-4">
                  <FieldInput
                    id="company"
                    name="company"
                    label="Naam bedrijf"
                    type="text"
                    placeholder="Uw bedrijf"
                    required
                  />
                  <FieldInput
                    id="contact_name"
                    name="contact_name"
                    label="Contactpersoon"
                    type="text"
                    placeholder="Voor- en achternaam"
                  />
                  <FieldInput
                    id="email"
                    name="email"
                    label="E-mailadres"
                    type="email"
                    placeholder="u@bedrijf.be"
                    required
                  />
                  <FieldInput
                    id="phone"
                    name="phone"
                    label="Telefoon (optioneel)"
                    type="tel"
                    placeholder="+32…"
                  />
                  <FieldSelect
                    id="partner_type"
                    name="partner_type"
                    label="Type partner"
                    options={[
                      { value: "", label: "Kies een type" },
                      { value: "architect", label: "Architect" },
                      { value: "vakspecialist", label: "Vakspecialist" },
                      { value: "bouwondernemer", label: "Bouwondernemer" },
                    ]}
                  />
                  <FieldSelect
                    id="region"
                    name="region"
                    label="Regio"
                    options={[
                      { value: "", label: "Kies een regio" },
                      ...REGIONS.map((r) => ({
                        value: r.slug,
                        label: r.name,
                      })),
                    ]}
                  />
                  <FieldSelect
                    id="rubriek"
                    name="rubriek"
                    label="Rubriek (vakspecialisten)"
                    options={[
                      { value: "", label: "Kies een rubriek" },
                      ...RUBRIEKEN.map((r) => ({ value: r, label: r })),
                    ]}
                  />
                  <FieldTextarea
                    id="message"
                    name="message"
                    label="Korte intro (optioneel)"
                    placeholder="Vertel kort wie u bent en wat u onderscheidt."
                  />
                  <div className="pt-2">
                    <PillButton type="submit">Stuur aanvraag</PillButton>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ========= small reusable pieces ========= */

function FieldInput({
  id,
  name,
  label,
  type = "text",
  placeholder,
  required,
}: {
  id: string;
  name?: string;
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
        name={name ?? id}
        type={type}
        placeholder={placeholder}
        required={required}
        className="mt-2 w-full border-0 border-b border-ink-hair bg-transparent px-0 py-1.5 text-[14px] text-ink placeholder:text-ink-muted/60 focus:border-ink focus:outline-none"
      />
    </div>
  );
}

function FieldSelect({
  id,
  name,
  label,
  options,
  required,
}: {
  id: string;
  name?: string;
  label: string;
  options: { value: string; label: string }[];
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
      <select
        id={id}
        name={name ?? id}
        required={required}
        defaultValue=""
        className="mt-2 w-full appearance-none border-0 border-b border-ink-hair bg-transparent px-0 py-1.5 text-[14px] text-ink focus:border-ink focus:outline-none"
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </div>
  );
}

function FieldTextarea({
  id,
  name,
  label,
  placeholder,
  required,
  rows,
}: {
  id: string;
  name?: string;
  label: string;
  placeholder?: string;
  required?: boolean;
  rows?: number;
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
      <textarea
        id={id}
        name={name ?? id}
        placeholder={placeholder}
        required={required}
        rows={rows ?? 4}
        className="mt-3 w-full resize-none border-0 border-b border-ink-hair bg-transparent px-0 py-2 text-base text-ink placeholder:text-ink-muted/60 focus:border-ink focus:outline-none"
      />
    </div>
  );
}
