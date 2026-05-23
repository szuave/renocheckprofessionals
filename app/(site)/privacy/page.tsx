import type { Metadata } from "next";
import { BreadcrumbSchema } from "@/components/structured-data";

export const metadata: Metadata = {
  title: "Privacybeleid",
  description:
    "Hoe Renocheck Professionals omgaat met uw persoonsgegevens — wat we verzamelen, waarvoor, en welke rechten u heeft.",
  alternates: { canonical: "/privacy" },
  robots: { index: true, follow: true },
};

const SECTIONS: { title: string; body: string[] }[] = [
  {
    title: "1. Wie zijn wij?",
    body: [
      "Renocheck Professionals (hierna \"Renocheck\") is een Belgisch partnerschap-netwerk voor architecten, vakspecialisten en bouwondernemers. Voor vragen over uw gegevens: info@renocheck.be of +32 (0)3 123 45 67.",
    ],
  },
  {
    title: "2. Welke gegevens verzamelen we?",
    body: [
      "Wanneer u een formulier invult (partneraanvraag, contactformulier, downloadgids of inschrijving voor het partnerportaal), bewaren we: uw naam, e-mailadres, eventueel telefoonnummer, bedrijfsnaam, regio en de inhoud van uw bericht.",
      "Wanneer u inlogt op het partnerportaal bewaren we daarnaast een sessie-cookie, en de inhoud die u zelf in het portaal aanmaakt (blog, agenda).",
    ],
  },
  {
    title: "3. Waarvoor gebruiken we die gegevens?",
    body: [
      "Om uw aanvraag of vraag te beantwoorden, om u de gevraagde gids of informatie toe te sturen, om u op de hoogte te houden van partners en events in uw regio (enkel indien u dat aangeeft), en om het partnerportaal te kunnen aanbieden aan onze leden.",
      "We verkopen of verhuren uw gegevens nooit aan derden.",
    ],
  },
  {
    title: "4. Hoe lang bewaren we uw gegevens?",
    body: [
      "Contactgegevens en aanvragen worden bewaard zolang dat nodig is voor de behandeling, en daarna nog maximaal twee jaar voor opvolging. Gegevens van partnerleden worden bewaard zolang het lidmaatschap loopt, en daarna maximaal vijf jaar voor administratieve doeleinden.",
    ],
  },
  {
    title: "5. Met wie delen we uw gegevens?",
    body: [
      "Met onze hostingprovider en e-mailprovider, beide gevestigd in de EU en GDPR-conform. Met andere Renocheck-partners delen we enkel uw gegevens als u dat expliciet aangeeft (bv. wanneer u doorverwezen wenst te worden).",
    ],
  },
  {
    title: "6. Uw rechten",
    body: [
      "U heeft het recht om uw gegevens in te kijken, te laten corrigeren of te laten verwijderen, en om bezwaar te maken tegen verdere verwerking. Mail uw verzoek naar info@renocheck.be — we behandelen het binnen 30 dagen.",
      "U kan ook klacht indienen bij de Gegevensbeschermingsautoriteit (www.gegevensbeschermingsautoriteit.be).",
    ],
  },
  {
    title: "7. Wijzigingen",
    body: [
      "We kunnen dit beleid aanpassen. Substantiële wijzigingen worden via e-mail aan leden gecommuniceerd.",
    ],
  },
];

export default function PrivacyPage() {
  return (
    <article className="relative pt-36 pb-14 sm:pt-44 md:pt-52">
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "/" },
          { name: "Privacybeleid", url: "/privacy" },
        ]}
      />

      <section className="mx-auto max-w-[900px] px-6 md:px-16 lg:px-24">
        <p className="text-[10px] font-medium uppercase tracking-[0.32em] text-ink-muted">
          Juridisch
        </p>
        <h1 className="mt-5 font-display text-[clamp(2.5rem,6vw,5rem)] font-medium leading-[1.02] text-ink">
          Privacy<span className="italic text-sage">beleid</span>.
        </h1>
        <p className="mt-6 text-[14px] text-ink-muted">
          Laatst bijgewerkt op 23 mei 2026.
        </p>

        <p className="mt-12 text-[18px] leading-[1.7] text-ink-soft md:text-[19px]">
          Renocheck Professionals neemt uw privacy ernstig. Op deze pagina
          leggen we kort uit welke gegevens we verzamelen, waarvoor, en welke
          rechten u heeft.
        </p>

        <div className="mt-16 space-y-12 md:mt-20">
          {SECTIONS.map((s) => (
            <section key={s.title}>
              <h2 className="font-display text-[24px] font-medium leading-[1.2] text-ink md:text-[28px]">
                {s.title}
              </h2>
              <div className="mt-5 space-y-4 text-[16px] leading-[1.75] text-ink-soft">
                {s.body.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            </section>
          ))}
        </div>

        <div className="mt-20 rounded-3xl border border-ink-hair/60 bg-surface-soft/40 p-6 md:p-10">
          <p className="text-[10px] font-medium uppercase tracking-[0.32em] text-ink-muted">
            Vragen?
          </p>
          <p className="mt-4 text-[17px] leading-[1.7] text-ink">
            Mail{" "}
            <a
              href="mailto:info@renocheck.be"
              className="font-medium underline-offset-4 hover:text-sage hover:underline"
            >
              info@renocheck.be
            </a>{" "}
            voor alles wat met uw gegevens te maken heeft.
          </p>
        </div>
      </section>
    </article>
  );
}
