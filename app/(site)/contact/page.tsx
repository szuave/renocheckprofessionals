import type { Metadata } from "next";
import { PillButton } from "@/components/pill-button";
import {
  BreadcrumbSchema,
  ContactPageSchema,
} from "@/components/structured-data";
import { submitContactMessage } from "../actions";
import { SubjectDropdown } from "./subject-dropdown";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Neem contact op met Renocheck Professionals voor partnerschap, een kennismakingsgesprek of een algemene vraag. Ons team antwoordt binnen één werkdag.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact · Renocheck Professionals",
    description:
      "Een vraag, voorstel of samenwerking? Het Renocheck team helpt u graag verder.",
    url: "/contact",
    type: "website",
  },
  twitter: {
    title: "Contact · Renocheck Professionals",
    description:
      "Een vraag, voorstel of samenwerking? Het Renocheck team helpt u graag verder.",
  },
};

type Subject = "membership" | "videocall" | "question" | "other";
const SUBJECTS: readonly Subject[] = [
  "membership",
  "videocall",
  "question",
  "other",
];

export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<{ ok?: string; error?: string; subject?: string }>;
}) {
  const params = await searchParams;
  const ok = params?.ok === "1";
  const error = params?.error;
  const initialSubject: Subject = SUBJECTS.includes(params?.subject as Subject)
    ? (params!.subject as Subject)
    : "question";

  return (
    <section className="relative pt-36 pb-14 sm:pt-44 md:pt-52">
      <ContactPageSchema />
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "/" },
          { name: "Contact", url: "/contact" },
        ]}
      />
      <div className="mx-auto max-w-[1280px] px-6 md:px-16 lg:px-24">
        <p className="enter-up delay-300 text-[18px] text-ink-soft">Contact</p>

        <h1 className="enter-up delay-400 mt-6 font-display text-[clamp(3rem,8vw,7rem)] font-medium leading-[0.98] text-ink">
          Laat ons van u{" "}
          <span className="italic text-sage">horen</span>.
        </h1>

        <p className="enter-up delay-500 mt-8 max-w-xl text-[17px] leading-[1.65] text-ink-soft md:text-[19px]">
          Een vraag, voorstel of samenwerking? Ons team antwoordt binnen één
          werkdag.
        </p>

        <div className="mt-20 grid gap-14 md:mt-28 md:grid-cols-12 md:gap-16">
          <aside className="min-w-0 md:col-span-5">
            <dl className="space-y-10">
              <ContactItem
                label="E-mail"
                value="info@renocheck.be"
                href="mailto:info@renocheck.be"
              />
              <ContactItem
                label="Telefoon"
                value="+32 (0)3 123 45 67"
                href="tel:+3231234567"
              />
              <ContactItem label="Kantoor" value="Renocheck Professionals" />
            </dl>

            <div className="mt-12 rounded-[28px] border border-ink-hair/60 bg-surface-soft/40 p-6 md:mt-16 md:p-8">
              <p className="text-[10px] font-medium uppercase tracking-[0.3em] text-ink-muted">
                Liever direct?
              </p>
              <p className="mt-4 text-[15px] leading-[1.7] text-ink-soft">
                Voor een snelle inschrijving of kennismaking kies bij
                onderwerp <span className="font-medium text-ink">"Plan een videocall"</span>{" "}
                — dan sturen we u een agenda-link.
              </p>
            </div>
          </aside>

          <form
            id="contact-form"
            action={submitContactMessage}
            className="min-w-0 scroll-mt-24 md:col-span-7"
            aria-label="Contactformulier Renocheck Professionals"
          >
            <div className="rounded-[32px] border border-ink-hair/60 bg-surface-soft/60 p-8 backdrop-blur-sm md:p-12">
              {ok ? (
                <div className="mb-8 rounded-2xl border border-sage/40 bg-sage/10 p-5 text-[14px] text-ink">
                  Bedankt — uw bericht is verzonden. We antwoorden binnen één
                  werkdag.
                </div>
              ) : error ? (
                <div className="mb-8 rounded-2xl border border-red-300/60 bg-red-50/60 p-5 text-[14px] text-red-800">
                  {error === "missing"
                    ? "Vul voornaam, e-mail en bericht in."
                    : error === "email"
                      ? "Vul een geldig e-mailadres in."
                      : "Er ging iets mis. Probeer het opnieuw."}
                </div>
              ) : null}

              <div className="grid gap-8 md:grid-cols-2">
                <div className="md:col-span-2">
                  <SubjectDropdown initial={initialSubject} />
                </div>

                <Field
                  label="Voornaam"
                  id="first_name"
                  placeholder="Jane"
                  required
                />
                <Field
                  label="Achternaam"
                  id="last_name"
                  placeholder="Peeters"
                />
                <Field
                  label="Naam bedrijf"
                  id="company"
                  placeholder="Uw bedrijf"
                  full
                />
                <Field
                  label="E-mailadres"
                  id="email"
                  type="email"
                  placeholder="u@bedrijf.be"
                  required
                />
                <Field
                  label="Telefoon (optioneel)"
                  id="phone"
                  type="tel"
                  placeholder="+32…"
                />
                <div className="md:col-span-2">
                  <label
                    htmlFor="message"
                    className="text-[10px] font-medium uppercase tracking-[0.3em] text-ink-muted"
                  >
                    Uw bericht <span className="text-sage">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    required
                    placeholder="Vertel ons waar we u mee kunnen helpen…"
                    className="mt-3 w-full resize-none border-0 border-b border-ink-hair bg-transparent px-0 py-2 text-base text-ink placeholder:text-ink-muted/60 focus:border-ink focus:outline-none"
                  />
                </div>
              </div>
              <div className="mt-10">
                <PillButton type="submit">Bericht versturen</PillButton>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  id,
  placeholder,
  type = "text",
  full,
  required,
}: {
  label: string;
  id: string;
  placeholder?: string;
  type?: string;
  full?: boolean;
  required?: boolean;
}) {
  return (
    <div className={full ? "md:col-span-2" : undefined}>
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

function ContactItem({
  label,
  value,
  href,
}: {
  label: string;
  value: string;
  href?: string;
}) {
  return (
    <div>
      <dt className="text-[10px] font-medium uppercase tracking-[0.3em] text-ink-muted">
        {label}
      </dt>
      <dd className="mt-3 font-display text-[clamp(1.5rem,2.2vw,2rem)] font-medium leading-[1.15] text-ink">
        {href ? (
          <a href={href} className="transition-colors hover:text-sage">
            {value}
          </a>
        ) : (
          value
        )}
      </dd>
    </div>
  );
}
