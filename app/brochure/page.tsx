import Image from "next/image";

export default function BrochurePage() {
  return (
    <>
      {/* Print + screen styling. Tailwind classes drive most layout;
          @page + global tweaks live here so de PDF echt A4 wordt. */}
      <style>{`
        @page {
          size: A4 portrait;
          margin: 0;
        }
        html, body {
          background: #E7EEE9;
        }
        .brochure {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 32px 16px;
          gap: 24px;
          color: #0F1714;
        }
        .page {
          background: #FFFFFF;
          width: 210mm;
          min-height: 297mm;
          padding: 22mm 20mm;
          box-shadow: 0 24px 60px -28px rgba(15,23,20,0.18);
          position: relative;
          overflow: hidden;
          page-break-after: always;
          break-after: page;
          display: flex;
          flex-direction: column;
        }
        .page:last-child {
          page-break-after: auto;
          break-after: auto;
        }
        .print-only { display: none; }
        .no-print { display: block; }

        @media print {
          html, body { background: #FFFFFF !important; }
          .brochure {
            padding: 0;
            gap: 0;
          }
          .page {
            box-shadow: none !important;
            margin: 0;
            width: 210mm;
            height: 297mm;
          }
          .print-only { display: block; }
          .no-print { display: none !important; }
        }

        /* preserve background colors when printing (Chromium) */
        .page, .swatch, .pill, .stat, .corner, .footerband {
          -webkit-print-color-adjust: exact;
          print-color-adjust: exact;
        }
      `}</style>

      <div className="brochure">
        <PrintHint />

        <CoverPage />
        <WhatIsItPage />
        <DifferentPage />
        <ForArchitectsPage />
        <ForVakspecialistenPage />
        <ForBouwondernemersPage />
        <NetworkAndSelectionPage />
        <ClosingPage />
      </div>
    </>
  );
}

/* ------------------------------------------------------------------ */
/*  Reusable bits                                                       */
/* ------------------------------------------------------------------ */

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-4 flex items-center gap-3">
      <span
        aria-hidden="true"
        style={{ background: "#7D9A85" }}
        className="block h-px w-7"
      />
      <p
        className="text-[10px] font-semibold uppercase"
        style={{
          letterSpacing: "0.36em",
          color: "#8A948E",
        }}
      >
        {children}
      </p>
    </div>
  );
}

function Wordmark({
  size = "default",
}: {
  size?: "default" | "small";
}) {
  const widths = size === "small" ? 168 : 220;
  const subLetter = size === "small" ? "0.36em" : "0.42em";
  const marginLeft = size === "small" ? 26 : 36;
  const subSize = size === "small" ? 8.5 : 10;

  return (
    <div className="inline-flex flex-col items-start" style={{ color: "#0F1714" }}>
      <Image
        src="/brand/renocheck-wordmark.png"
        alt="Renocheck"
        width={widths}
        height={Math.round(widths * 0.13)}
        priority
        className="select-none"
      />
      <span
        className="font-semibold uppercase"
        style={{
          letterSpacing: subLetter,
          marginLeft,
          fontSize: subSize,
          color: "#0F1714",
        }}
      >
        Professionals
      </span>
    </div>
  );
}

function PageFooter({ pageNumber }: { pageNumber: number }) {
  return (
    <footer className="mt-auto flex items-end justify-between border-t border-[#E2E7E3] pt-4">
      <div className="flex items-center gap-3">
        <Wordmark size="small" />
      </div>
      <div className="text-right">
        <p
          className="text-[9px] font-semibold uppercase"
          style={{ letterSpacing: "0.32em", color: "#8A948E" }}
        >
          Sales-folder · {String(pageNumber).padStart(2, "0")}
        </p>
        <p
          className="mt-1 text-[9px]"
          style={{ color: "#8A948E", letterSpacing: "0.12em" }}
        >
          renocheck.be · info@renocheck.be
        </p>
      </div>
    </footer>
  );
}

function CornerMark({ label }: { label: string }) {
  return (
    <div
      className="corner absolute right-0 top-0 px-6 py-2 text-[9px] font-semibold uppercase"
      style={{
        background: "#0F1714",
        color: "#FFFFFF",
        letterSpacing: "0.32em",
      }}
    >
      {label}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  PAGE 1 — COVER                                                      */
/* ------------------------------------------------------------------ */

function CoverPage() {
  return (
    <section className="page" style={{ background: "#FFFFFF" }}>
      {/* Decorative sage gradient + ink wedge */}
      <div
        aria-hidden="true"
        className="absolute -right-32 -top-32 h-[520px] w-[520px] rounded-full"
        style={{
          background:
            "radial-gradient(circle at 30% 30%, rgba(125,154,133,0.45), rgba(125,154,133,0) 60%)",
        }}
      />
      <div
        aria-hidden="true"
        className="absolute -left-16 -bottom-16 h-[320px] w-[320px] rounded-full"
        style={{
          background:
            "radial-gradient(circle at 60% 60%, rgba(82,106,89,0.20), rgba(82,106,89,0) 70%)",
        }}
      />

      <div className="relative flex h-full flex-col">
        <header className="flex items-start justify-between">
          <Wordmark />
          <p
            className="text-[10px] font-semibold uppercase"
            style={{
              letterSpacing: "0.36em",
              color: "#8A948E",
            }}
          >
            Sales-folder · 2026
          </p>
        </header>

        <div className="my-auto max-w-[160mm]">
          <Eyebrow>Het Vlaams bouwnetwerk</Eyebrow>

          <h1
            className="font-display font-medium"
            style={{
              fontSize: 72,
              lineHeight: 0.98,
              letterSpacing: "-0.015em",
              color: "#0F1714",
            }}
          >
            Geselecteerde
            <br />
            partners,
            <br />
            <span style={{ color: "#7D9A85", fontStyle: "italic" }}>
              gedeelde
            </span>{" "}
            standaard.
          </h1>

          <p
            className="mt-8 max-w-[130mm] text-[15px]"
            style={{ color: "#2D3B32", lineHeight: 1.6 }}
          >
            Renocheck Professionals is een gesloten bouwnetwerk in Vlaanderen
            voor <strong>architectenbureaus</strong>,{" "}
            <strong>vakspecialisten</strong> en{" "}
            <strong>bouwondernemers</strong>. Eén partner per rubriek per
            regio — geen lead-veiling, wel een vertrouwd team dat elkaars
            werk kent.
          </p>

          <div className="mt-12 grid grid-cols-3 gap-6 max-w-[150mm]">
            <Stat value="4" label="Vlaamse regio's" />
            <Stat value="14" label="Vakrubrieken" />
            <Stat value="1" label="Partner per rubriek per regio" />
          </div>
        </div>

        <footer className="mt-auto">
          <div
            className="flex items-end justify-between border-t pt-5"
            style={{ borderColor: "#E2E7E3" }}
          >
            <div>
              <p
                className="text-[10px] font-semibold uppercase"
                style={{ letterSpacing: "0.32em", color: "#8A948E" }}
              >
                Voor verkoop · interne briefing
              </p>
              <p
                className="mt-1.5 font-display font-medium"
                style={{ fontSize: 18, color: "#0F1714" }}
              >
                renocheck.be / professionals
              </p>
            </div>
            <p
              className="text-[10px]"
              style={{ color: "#8A948E", textAlign: "right" }}
            >
              Te overhandigen aan
              <br />
              architectenbureaus & vakspecialisten
            </p>
          </div>
        </footer>
      </div>
    </section>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="stat">
      <p
        className="font-display font-medium"
        style={{ fontSize: 38, lineHeight: 1, color: "#7D9A85" }}
      >
        {value}
      </p>
      <p
        className="mt-2 text-[10px] font-semibold uppercase"
        style={{ letterSpacing: "0.28em", color: "#8A948E" }}
      >
        {label}
      </p>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  PAGE 2 — WAT IS HET                                                 */
/* ------------------------------------------------------------------ */

function WhatIsItPage() {
  return (
    <section className="page">
      <CornerMark label="Wat is het" />

      <Eyebrow>Renocheck Professionals</Eyebrow>

      <h2
        className="font-display font-medium"
        style={{
          fontSize: 44,
          lineHeight: 1.05,
          letterSpacing: "-0.01em",
          color: "#0F1714",
          maxWidth: "150mm",
        }}
      >
        Een{" "}
        <span style={{ color: "#7D9A85", fontStyle: "italic" }}>
          gesloten kring
        </span>{" "}
        van bouwprofessionals in Vlaanderen.
      </h2>

      <p
        className="mt-6 text-[14px]"
        style={{
          color: "#2D3B32",
          lineHeight: 1.65,
          maxWidth: "150mm",
        }}
      >
        Renocheck Professionals selecteert per Vlaamse regio één
        architectenbureau, één bouwondernemer en één vakspecialist per
        rubriek. Samen vormen ze het lokale Renocheck-team — dat elkaars werk
        kent, dezelfde standaard hanteert en projecten samen oppakt.
      </p>

      <div
        className="mt-10 grid grid-cols-3 gap-6"
        style={{ maxWidth: "180mm" }}
      >
        <PillarCard
          number="01"
          title="Selectie"
          body="Eén partner per rubriek per regio. Geen veiling, geen pay-per-click. Kwaliteit boven volume."
        />
        <PillarCard
          number="02"
          title="Samenwerking"
          body="Maandelijkse partnerevents, gedeelde werven en directe doorverwijzing tussen architecten en vakspecialisten."
        />
        <PillarCard
          number="03"
          title="Vertrouwen"
          body="Renocheck staat als merk garant voor het werk van haar partners. Een bouwheer kiest het netwerk, niet één losse vakman."
        />
      </div>

      <div
        className="mt-10 rounded-2xl p-7"
        style={{
          background: "#F5F8F6",
          maxWidth: "180mm",
        }}
      >
        <p
          className="text-[10px] font-semibold uppercase"
          style={{ letterSpacing: "0.32em", color: "#526A59" }}
        >
          De pitch in één zin
        </p>
        <p
          className="mt-3 font-display font-medium"
          style={{ fontSize: 24, lineHeight: 1.25, color: "#0F1714" }}
        >
          "Wij zijn geen{" "}
          <span style={{ color: "#7D9A85", fontStyle: "italic" }}>
            lead-veiling
          </span>
          . Wij zijn een gesloten kring van bouwprofessionals die elkaar
          versterken."
        </p>
      </div>

      <PageFooter pageNumber={2} />
    </section>
  );
}

function PillarCard({
  number,
  title,
  body,
}: {
  number: string;
  title: string;
  body: string;
}) {
  return (
    <div
      className="rounded-2xl border p-5"
      style={{ borderColor: "#E2E7E3", background: "#FAFBFA" }}
    >
      <p
        className="font-display font-medium"
        style={{
          fontSize: 11,
          letterSpacing: "0.32em",
          color: "#7D9A85",
        }}
      >
        {number}
      </p>
      <h3
        className="mt-3 font-display font-medium"
        style={{ fontSize: 20, lineHeight: 1.2, color: "#0F1714" }}
      >
        {title}
      </h3>
      <p
        className="mt-3 text-[12.5px]"
        style={{ color: "#2D3B32", lineHeight: 1.55 }}
      >
        {body}
      </p>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  PAGE 3 — HOE ANDERS                                                 */
/* ------------------------------------------------------------------ */

function DifferentPage() {
  return (
    <section className="page">
      <CornerMark label="Wat is anders" />

      <Eyebrow>Anders dan andere bouwplatforms</Eyebrow>

      <h2
        className="font-display font-medium"
        style={{
          fontSize: 40,
          lineHeight: 1.05,
          color: "#0F1714",
          maxWidth: "160mm",
        }}
      >
        Niet de zoveelste leadgenerator.
      </h2>

      <p
        className="mt-5 text-[13.5px]"
        style={{
          color: "#2D3B32",
          lineHeight: 1.65,
          maxWidth: "150mm",
        }}
      >
        Het verschil zit in selectie, schaal en model. Dit is wat je niét bij
        ons vindt — en wel.
      </p>

      <div
        className="mt-9 grid grid-cols-2 gap-x-6"
        style={{ maxWidth: "180mm" }}
      >
        {/* Wat anderen doen */}
        <div>
          <div className="flex items-center gap-3">
            <span
              aria-hidden="true"
              style={{ background: "#8A948E" }}
              className="h-px w-6"
            />
            <p
              className="text-[10px] font-semibold uppercase"
              style={{ letterSpacing: "0.32em", color: "#8A948E" }}
            >
              Bij andere platforms
            </p>
          </div>
          <ul className="mt-5 space-y-4">
            <CrossPoint text="Onbeperkt aantal aannemers per rubriek per regio" />
            <CrossPoint text="Lead-veiling — wie het hardst biedt, wint" />
            <CrossPoint text="Pay-per-click of pay-per-lead model" />
            <CrossPoint text="Anonieme klantencontacten, geen netwerk" />
            <CrossPoint text="Marketing-budget bepaalt zichtbaarheid" />
          </ul>
        </div>

        {/* Wat wij doen */}
        <div>
          <div className="flex items-center gap-3">
            <span
              aria-hidden="true"
              style={{ background: "#7D9A85" }}
              className="h-px w-6"
            />
            <p
              className="text-[10px] font-semibold uppercase"
              style={{ letterSpacing: "0.32em", color: "#526A59" }}
            >
              Bij Renocheck Professionals
            </p>
          </div>
          <ul className="mt-5 space-y-4">
            <CheckPoint text="Eén partner per rubriek per regio — schaarste door selectie" />
            <CheckPoint text="Geen veiling, geen pay-per-click — vaste partnerbijdrage" />
            <CheckPoint text="Selectie op vakmanschap door Maxime & het selectiecomité" />
            <CheckPoint text="Gedeelde werven, directe doorverwijzing tussen partners" />
            <CheckPoint text="Eigen bedrijfspagina op renocheck.be (SEO + autoriteit)" />
          </ul>
        </div>
      </div>

      <div
        className="mt-auto rounded-2xl p-7"
        style={{
          background: "#0F1714",
          color: "#FFFFFF",
          maxWidth: "180mm",
        }}
      >
        <p
          className="text-[10px] font-semibold uppercase"
          style={{
            letterSpacing: "0.32em",
            color: "rgba(255,255,255,0.65)",
          }}
        >
          Belangrijkste verschil
        </p>
        <p
          className="mt-3 font-display font-medium"
          style={{ fontSize: 22, lineHeight: 1.25 }}
        >
          Wij verkopen geen leads.{" "}
          <span style={{ color: "#CFDCD2", fontStyle: "italic" }}>
            Wij selecteren partners.
          </span>
        </p>
      </div>

      <PageFooter pageNumber={3} />
    </section>
  );
}

function CrossPoint({ text }: { text: string }) {
  return (
    <li className="flex gap-3">
      <span
        aria-hidden="true"
        className="mt-1 inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-full"
        style={{ background: "#E2E7E3" }}
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="#8A948E"
          strokeWidth="3"
          strokeLinecap="round"
          className="h-2.5 w-2.5"
        >
          <path d="M6 6l12 12M18 6L6 18" />
        </svg>
      </span>
      <span className="text-[12.5px]" style={{ color: "#2D3B32", lineHeight: 1.5 }}>
        {text}
      </span>
    </li>
  );
}

function CheckPoint({ text }: { text: string }) {
  return (
    <li className="flex gap-3">
      <span
        aria-hidden="true"
        className="mt-1 inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-full"
        style={{ background: "#7D9A85" }}
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="#FFFFFF"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-2.5 w-2.5"
        >
          <path d="M20 6L9 17l-5-5" />
        </svg>
      </span>
      <span className="text-[12.5px]" style={{ color: "#0F1714", lineHeight: 1.5 }}>
        {text}
      </span>
    </li>
  );
}

/* ------------------------------------------------------------------ */
/*  PAGE 4 — VOOR ARCHITECTEN                                           */
/* ------------------------------------------------------------------ */

function ForArchitectsPage() {
  return (
    <section className="page">
      <CornerMark label="Architecten" />

      <Eyebrow>Voor architectenbureaus</Eyebrow>

      <h2
        className="font-display font-medium"
        style={{
          fontSize: 42,
          lineHeight: 1.05,
          color: "#0F1714",
          maxWidth: "160mm",
        }}
      >
        Eén bureau,{" "}
        <span style={{ color: "#7D9A85", fontStyle: "italic" }}>
          één regio
        </span>
        .
      </h2>

      <p
        className="mt-5 text-[13.5px]"
        style={{
          color: "#2D3B32",
          lineHeight: 1.65,
          maxWidth: "150mm",
        }}
      >
        Per Vlaamse regio kiezen we exact één architectenbureau om in het
        netwerk op te nemen. Voor u betekent dat exclusiviteit, instant
        toegang tot vakspecialisten die we al hebben gescreend, en een
        vertrouwd contactpunt voor de uitvoering.
      </p>

      <div
        className="mt-9 grid grid-cols-2 gap-4"
        style={{ maxWidth: "180mm" }}
      >
        <Benefit
          icon="🏛️"
          title="Exclusieve regio"
          body="U bent het enige architectenbureau in uw regio binnen het Renocheck-netwerk."
        />
        <Benefit
          icon="🤝"
          title="Voorgescreende uitvoerders"
          body="Direct toegang tot 14 vakspecialisten die we al hebben geselecteerd op vakmanschap."
        />
        <Benefit
          icon="📂"
          title="Project-doorverwijzing"
          body="Renocheck stuurt bouwheren met een passend dossier rechtstreeks naar u door."
        />
        <Benefit
          icon="📈"
          title="Bedrijfspagina + SEO"
          body="Uw eigen pagina op renocheck.be/uw-bureau — geïndexeerd, met regio-autoriteit."
        />
        <Benefit
          icon="🗓️"
          title="Maandelijkse events"
          body="Werfbezoeken, opleidingen en netwerkmomenten met andere partners in uw regio."
        />
        <Benefit
          icon="📰"
          title="Blog + portfolio"
          body="Publiceer projecten en werfverslagen op het centrale platform — extra visibility."
        />
      </div>

      <div
        className="mt-8 rounded-2xl p-6"
        style={{
          background: "#F5F8F6",
          maxWidth: "180mm",
        }}
      >
        <p
          className="text-[10px] font-semibold uppercase"
          style={{ letterSpacing: "0.32em", color: "#526A59" }}
        >
          Salestip
        </p>
        <p
          className="mt-2 text-[13.5px]"
          style={{ color: "#0F1714", lineHeight: 1.55 }}
        >
          Wanneer u praat met een architectenbureau — leg de nadruk op{" "}
          <strong>exclusiviteit per regio</strong>. Dit is geen platform waar
          ze in een lijst van 30 staan. Eén bureau per regio = pure schaarste.
        </p>
      </div>

      <PageFooter pageNumber={4} />
    </section>
  );
}

function Benefit({
  icon,
  title,
  body,
}: {
  icon: string;
  title: string;
  body: string;
}) {
  return (
    <div
      className="rounded-2xl border p-5"
      style={{ borderColor: "#E2E7E3", background: "#FFFFFF" }}
    >
      <p style={{ fontSize: 22, lineHeight: 1 }}>{icon}</p>
      <h3
        className="mt-3 font-display font-medium"
        style={{ fontSize: 16, lineHeight: 1.2, color: "#0F1714" }}
      >
        {title}
      </h3>
      <p
        className="mt-2 text-[12px]"
        style={{ color: "#2D3B32", lineHeight: 1.55 }}
      >
        {body}
      </p>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  PAGE 5 — VOOR VAKSPECIALISTEN                                       */
/* ------------------------------------------------------------------ */

function ForVakspecialistenPage() {
  return (
    <section className="page">
      <CornerMark label="Vakspecialisten" />

      <Eyebrow>Voor vakspecialisten</Eyebrow>

      <h2
        className="font-display font-medium"
        style={{
          fontSize: 42,
          lineHeight: 1.05,
          color: "#0F1714",
          maxWidth: "160mm",
        }}
      >
        Eén vakman per rubriek,{" "}
        <span style={{ color: "#7D9A85", fontStyle: "italic" }}>
          per regio
        </span>
        .
      </h2>

      <p
        className="mt-5 text-[13.5px]"
        style={{
          color: "#2D3B32",
          lineHeight: 1.65,
          maxWidth: "150mm",
        }}
      >
        Of u nu dakwerker, elektricien, sanitair-installateur of schilder
        bent — we selecteren per rubriek slechts één partner per Vlaamse
        regio. U werkt rechtstreeks samen met de geselecteerde architecten
        en bouwondernemers in uw kring.
      </p>

      <div
        className="mt-8"
        style={{ maxWidth: "180mm" }}
      >
        <p
          className="text-[10px] font-semibold uppercase"
          style={{ letterSpacing: "0.32em", color: "#8A948E" }}
        >
          14 rubrieken waarvoor we partners selecteren
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          {[
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
          ].map((r) => (
            <span
              key={r}
              className="pill inline-flex items-center rounded-full border px-3 py-1.5 text-[11px] font-medium"
              style={{
                borderColor: "#7D9A85",
                background: "rgba(125,154,133,0.08)",
                color: "#526A59",
              }}
            >
              {r}
            </span>
          ))}
        </div>
      </div>

      <div
        className="mt-8 grid grid-cols-2 gap-4"
        style={{ maxWidth: "180mm" }}
      >
        <Benefit
          icon="🛠️"
          title="Exclusief in uw rubriek"
          body="Eén partner per rubriek per regio. Geen concurrentie binnen het netwerk."
        />
        <Benefit
          icon="🏗️"
          title="Werk via architecten"
          body="Directe doorverwijzing vanuit de architectenbureaus in uw regio. Géén leads kopen."
        />
        <Benefit
          icon="🗺️"
          title="Meerdere regio's"
          body="Werkt u in meerdere regio's? Geen probleem — u kan in elke regio één van de partners zijn."
        />
        <Benefit
          icon="🎓"
          title="Opleidingen & events"
          body="Maandelijkse partner-events: nieuwe normen, EPB-updates, productdemo's."
        />
        <Benefit
          icon="📍"
          title="Bedrijfspagina"
          body="Uw eigen URL renocheck.be/uw-bedrijf met regio + rubrieken, vindbaar via Google."
        />
        <Benefit
          icon="🏷️"
          title="Renocheck-label"
          body="Werk dragen onder het Renocheck-keurmerk geeft bouwheren vertrouwen."
        />
      </div>

      <div
        className="mt-auto rounded-2xl p-6"
        style={{
          background: "#F5F8F6",
          maxWidth: "180mm",
        }}
      >
        <p
          className="text-[10px] font-semibold uppercase"
          style={{ letterSpacing: "0.32em", color: "#526A59" }}
        >
          Salestip
        </p>
        <p
          className="mt-2 text-[13.5px]"
          style={{ color: "#0F1714", lineHeight: 1.55 }}
        >
          Vraag of de vakspecialist wel eens een lead heeft gekocht die niks
          opleverde. Vertel dan dat wij <strong>géén</strong> leads verkopen
          — werk komt via een vertrouwd netwerk, niet via een veiling.
        </p>
      </div>

      <PageFooter pageNumber={5} />
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  PAGE 6 — VOOR BOUWONDERNEMERS                                       */
/* ------------------------------------------------------------------ */

function ForBouwondernemersPage() {
  return (
    <section className="page">
      <CornerMark label="Bouwondernemers" />

      <Eyebrow>Voor bouwondernemers</Eyebrow>

      <h2
        className="font-display font-medium"
        style={{
          fontSize: 42,
          lineHeight: 1.05,
          color: "#0F1714",
          maxWidth: "160mm",
        }}
      >
        Een{" "}
        <span style={{ color: "#7D9A85", fontStyle: "italic" }}>
          team
        </span>{" "}
        dat samen schaalt.
      </h2>

      <p
        className="mt-5 text-[13.5px]"
        style={{
          color: "#2D3B32",
          lineHeight: 1.65,
          maxWidth: "150mm",
        }}
      >
        Voor algemene bouwondernemers is Renocheck Professionals het lokale
        ecosysteem. U werkt samen met de geselecteerde architect en de 14
        vakspecialisten in uw regio — een vast team waar u op kan rekenen
        voor elke fase van het project.
      </p>

      <div
        className="mt-9 grid grid-cols-2 gap-4"
        style={{ maxWidth: "180mm" }}
      >
        <Benefit
          icon="🏘️"
          title="Compleet regioteam"
          body="Eén architect + 14 vakspecialisten. Klaar voor projecten van renovatie tot turn-key nieuwbouw."
        />
        <Benefit
          icon="⏱️"
          title="Sneller schakelen"
          body="Iedereen kent elkaar. Geen tijd verliezen aan onderaannemers zoeken of voorstellen."
        />
        <Benefit
          icon="✅"
          title="Gegarandeerde kwaliteit"
          body="Alle partners doorlopen dezelfde selectie. Werk dat we samen leveren = werk waar we voor staan."
        />
        <Benefit
          icon="📋"
          title="Gedeelde werfopvolging"
          body="Via het partnerportaal communicatie en planning op één plek."
        />
        <Benefit
          icon="💬"
          title="Maandelijks overleg"
          body="Partnerevents waar projecten worden besproken en onderlinge afspraken vastgelegd."
        />
        <Benefit
          icon="🛡️"
          title="Renocheck-garantie"
          body="Bouwheren krijgen één aanspreekpunt en een gedeelde standaard — meer zekerheid, minder discussie."
        />
      </div>

      <div
        className="mt-auto rounded-2xl p-6"
        style={{
          background: "#0F1714",
          color: "#FFFFFF",
          maxWidth: "180mm",
        }}
      >
        <p
          className="text-[10px] font-semibold uppercase"
          style={{
            letterSpacing: "0.32em",
            color: "rgba(255,255,255,0.65)",
          }}
        >
          Salestip
        </p>
        <p
          className="mt-2 text-[13.5px]"
          style={{ color: "#FFFFFF", lineHeight: 1.55 }}
        >
          Bouwondernemers zoeken vaste onderaannemers waar ze op kunnen
          rekenen. Verkoop hen op{" "}
          <span style={{ color: "#CFDCD2", fontStyle: "italic" }}>
            "uw vaste regioteam, vooraf gescreend door ons"
          </span>
          .
        </p>
      </div>

      <PageFooter pageNumber={6} />
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  PAGE 7 — SELECTIE + NETWERK                                         */
/* ------------------------------------------------------------------ */

function NetworkAndSelectionPage() {
  return (
    <section className="page">
      <CornerMark label="Selectie & netwerk" />

      <Eyebrow>Hoe wij selecteren</Eyebrow>

      <h2
        className="font-display font-medium"
        style={{
          fontSize: 40,
          lineHeight: 1.05,
          color: "#0F1714",
          maxWidth: "160mm",
        }}
      >
        Selectie op{" "}
        <span style={{ color: "#7D9A85", fontStyle: "italic" }}>
          vakmanschap
        </span>
        , niet op marketingbudget.
      </h2>

      <div
        className="mt-8 grid grid-cols-2 gap-x-6 gap-y-4"
        style={{ maxWidth: "180mm" }}
      >
        <Criterion
          number="01"
          title="Vakmanschap & ervaring"
          body="Minimum 5 jaar professionele actiengang in de rubriek."
        />
        <Criterion
          number="02"
          title="Werfreferenties"
          body="Minstens 3 referenties van afgewerkte werven."
        />
        <Criterion
          number="03"
          title="Verzekeringen & vergunningen"
          body="BTW-onderneming, beroepsaansprakelijkheid en 10-jarige verzekering in orde."
        />
        <Criterion
          number="04"
          title="Klantgerichtheid"
          body="Beoordeeld via reviews of intake-gesprek met eerdere bouwheren."
        />
        <Criterion
          number="05"
          title="Samenwerkingscultuur"
          body="Bereidheid om actief te netwerken en met andere partners samen te werken."
        />
        <Criterion
          number="06"
          title="Regionale verankering"
          body="Sterke aanwezigheid in de regio waarvoor men zich kandidaat stelt."
        />
      </div>

      <div
        className="mt-10"
        style={{ maxWidth: "180mm" }}
      >
        <p
          className="text-[10px] font-semibold uppercase"
          style={{ letterSpacing: "0.32em", color: "#8A948E" }}
        >
          Actief in 4 Vlaamse regio's
        </p>
        <div className="mt-4 grid grid-cols-4 gap-3">
          <RegionTile name="West-Vlaanderen" cities="Brugge · Kortrijk · Oostende" />
          <RegionTile name="Oost-Vlaanderen" cities="Gent · Aalst · Sint-Niklaas" />
          <RegionTile name="Antwerpen" cities="Antwerpen · Mechelen · Turnhout" />
          <RegionTile name="Vlaams-Brabant" cities="Leuven · Vilvoorde · Halle" />
        </div>
      </div>

      <PageFooter pageNumber={7} />
    </section>
  );
}

function Criterion({
  number,
  title,
  body,
}: {
  number: string;
  title: string;
  body: string;
}) {
  return (
    <div className="flex gap-4">
      <span
        className="font-display font-medium"
        style={{
          fontSize: 11,
          letterSpacing: "0.28em",
          color: "#7D9A85",
          minWidth: 30,
          marginTop: 4,
        }}
      >
        {number}
      </span>
      <div>
        <h4
          className="font-display font-medium"
          style={{ fontSize: 15, lineHeight: 1.2, color: "#0F1714" }}
        >
          {title}
        </h4>
        <p
          className="mt-1.5 text-[12px]"
          style={{ color: "#2D3B32", lineHeight: 1.55 }}
        >
          {body}
        </p>
      </div>
    </div>
  );
}

function RegionTile({ name, cities }: { name: string; cities: string }) {
  return (
    <div
      className="rounded-2xl border p-3"
      style={{ borderColor: "#E2E7E3", background: "#FAFBFA" }}
    >
      <p
        className="font-display font-medium"
        style={{ fontSize: 13, lineHeight: 1.2, color: "#0F1714" }}
      >
        {name}
      </p>
      <p
        className="mt-1.5 text-[10px]"
        style={{ color: "#8A948E", lineHeight: 1.5 }}
      >
        {cities}
      </p>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  PAGE 8 — CLOSING / PRAKTISCH                                        */
/* ------------------------------------------------------------------ */

function ClosingPage() {
  return (
    <section className="page" style={{ background: "#0F1714", color: "#FFFFFF" }}>
      <div
        aria-hidden="true"
        className="absolute -right-32 -top-32 h-[460px] w-[460px] rounded-full"
        style={{
          background:
            "radial-gradient(circle at 30% 30%, rgba(125,154,133,0.35), rgba(125,154,133,0) 60%)",
        }}
      />

      <div className="relative flex h-full flex-col">
        <header className="flex items-start justify-between">
          <Wordmark size="small" />
          <p
            className="text-[10px] font-semibold uppercase"
            style={{
              letterSpacing: "0.32em",
              color: "rgba(255,255,255,0.6)",
            }}
          >
            Praktisch · CTA
          </p>
        </header>

        <div className="my-auto" style={{ maxWidth: "160mm" }}>
          <div className="flex items-center gap-3">
            <span
              aria-hidden="true"
              style={{ background: "#CFDCD2" }}
              className="block h-px w-7"
            />
            <p
              className="text-[10px] font-semibold uppercase"
              style={{
                letterSpacing: "0.36em",
                color: "rgba(255,255,255,0.7)",
              }}
            >
              Klaar voor een gesprek
            </p>
          </div>

          <h2
            className="mt-6 font-display font-medium"
            style={{
              fontSize: 56,
              lineHeight: 0.98,
              letterSpacing: "-0.01em",
              color: "#FFFFFF",
            }}
          >
            Word de partner
            <br />
            van uw{" "}
            <span style={{ color: "#CFDCD2", fontStyle: "italic" }}>
              regio
            </span>
            .
          </h2>

          <p
            className="mt-7 text-[14.5px]"
            style={{
              color: "rgba(255,255,255,0.85)",
              lineHeight: 1.65,
              maxWidth: "130mm",
            }}
          >
            We selecteren actief partners in de 4 Vlaamse regio's. Eens een
            rubriek vergeven is in een regio, sluit ze. Snel zijn = uw plek
            claimen voor de concurrentie het doet.
          </p>

          <div className="mt-10 grid grid-cols-3 gap-4 max-w-[160mm]">
            <ContactCell
              label="Aanvraag"
              value="renocheck.be/contact"
            />
            <ContactCell
              label="E-mail"
              value="info@renocheck.be"
            />
            <ContactCell
              label="Founder"
              value="Maxime Vandenbroucke"
            />
          </div>
        </div>

        <footer
          className="footerband mt-auto rounded-2xl p-6"
          style={{ background: "rgba(255,255,255,0.06)" }}
        >
          <div className="flex items-center justify-between gap-6">
            <div>
              <p
                className="text-[10px] font-semibold uppercase"
                style={{
                  letterSpacing: "0.32em",
                  color: "rgba(255,255,255,0.6)",
                }}
              >
                Volgende stap voor de verkoper
              </p>
              <p
                className="mt-2 text-[13px]"
                style={{ color: "#FFFFFF", lineHeight: 1.55, maxWidth: "120mm" }}
              >
                Plan een kennismakingsgesprek van 30 min — videocall of bij
                hen op kantoor. We screenen tijdens dat gesprek of er match
                is met de selectiecriteria (pagina 7).
              </p>
            </div>
            <span
              aria-hidden="true"
              className="inline-flex h-14 w-14 shrink-0 items-center justify-center rounded-full"
              style={{ background: "#7D9A85" }}
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="#FFFFFF"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-6 w-6"
              >
                <path d="M5 12h14M13 5l7 7-7 7" />
              </svg>
            </span>
          </div>
        </footer>
      </div>
    </section>
  );
}

function ContactCell({ label, value }: { label: string; value: string }) {
  return (
    <div
      className="rounded-2xl border p-4"
      style={{
        borderColor: "rgba(255,255,255,0.18)",
        background: "rgba(255,255,255,0.04)",
      }}
    >
      <p
        className="text-[9px] font-semibold uppercase"
        style={{
          letterSpacing: "0.3em",
          color: "rgba(255,255,255,0.6)",
        }}
      >
        {label}
      </p>
      <p
        className="mt-2 font-display font-medium"
        style={{ fontSize: 13, lineHeight: 1.3, color: "#FFFFFF" }}
      >
        {value}
      </p>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Screen-only hint how to export to PDF                              */
/* ------------------------------------------------------------------ */

function PrintHint() {
  return (
    <aside
      className="no-print"
      style={{
        background: "#0F1714",
        color: "#FFFFFF",
        padding: "10px 18px",
        borderRadius: 9999,
        fontSize: 12,
        fontWeight: 500,
        letterSpacing: "0.04em",
        marginBottom: 8,
        boxShadow: "0 12px 24px -10px rgba(15,23,20,0.4)",
      }}
    >
      Druk <kbd style={{ background: "#7D9A85", padding: "2px 6px", borderRadius: 4, marginLeft: 6, marginRight: 6 }}>Ctrl + P</kbd>
      en kies "Opslaan als PDF" · marges = <strong>Geen</strong> · achtergrondgrafiek = <strong>aan</strong>
    </aside>
  );
}
