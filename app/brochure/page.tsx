import Image from "next/image";

export default function BrochurePage() {
  return (
    <>
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
          .brochure { padding: 0; gap: 0; }
          .page {
            box-shadow: none !important;
            margin: 0;
            width: 210mm;
            height: 297mm;
          }
          .print-only { display: block; }
          .no-print { display: none !important; }
        }

        .page, .swatch, .pill, .stat, .corner, .footerband, .chip, .price-band, .seat {
          -webkit-print-color-adjust: exact;
          print-color-adjust: exact;
        }
      `}</style>

      <div className="brochure">
        <PrintHint />

        <CoverPage />
        <WhatIsItPage />
        <EventFormatPage />
        <ForVakspecialistenPage />
        <ForArchitectsPage />
        <SelectionPage />
        <PricingPage />
        <ClosingPage />
      </div>
    </>
  );
}

/* ---------------- Reusable ---------------- */

function Eyebrow({
  children,
  light,
}: {
  children: React.ReactNode;
  light?: boolean;
}) {
  return (
    <div className="mb-5 flex items-center gap-3">
      <span
        aria-hidden="true"
        style={{ background: light ? "#CFDCD2" : "#7D9A85" }}
        className="block h-px w-8"
      />
      <p
        className="text-[10px] font-semibold uppercase"
        style={{
          letterSpacing: "0.4em",
          color: light ? "rgba(255,255,255,0.7)" : "#8A948E",
        }}
      >
        {children}
      </p>
    </div>
  );
}

function Wordmark({
  size = "default",
  light,
}: {
  size?: "default" | "small";
  light?: boolean;
}) {
  const widths = size === "small" ? 168 : 220;
  const subLetter = size === "small" ? "0.36em" : "0.42em";
  const marginLeft = size === "small" ? 26 : 36;
  const subSize = size === "small" ? 8.5 : 10;
  const color = light ? "#FFFFFF" : "#0F1714";

  return (
    <div className="inline-flex flex-col items-start" style={{ color }}>
      <Image
        src={
          light
            ? "/brand/renocheck-wordmark-light.png"
            : "/brand/renocheck-wordmark.png"
        }
        alt="Renocheck"
        width={widths}
        height={Math.round(widths * 0.13)}
        priority
        className="select-none"
        // Fallback if light variant doesn't exist — invert via CSS filter
        style={light ? { filter: "invert(1) brightness(2)" } : undefined}
      />
      <span
        className="font-semibold uppercase"
        style={{
          letterSpacing: subLetter,
          marginLeft,
          fontSize: subSize,
          color,
        }}
      >
        Professionals
      </span>
    </div>
  );
}

function PageFooter({ pageNumber }: { pageNumber: number }) {
  return (
    <footer
      className="mt-auto flex items-end justify-between border-t pt-4"
      style={{ borderColor: "#E2E7E3" }}
    >
      <Wordmark size="small" />
      <p
        className="text-[9px] font-semibold uppercase"
        style={{ letterSpacing: "0.32em", color: "#8A948E" }}
      >
        {String(pageNumber).padStart(2, "0")} · Sales-folder
      </p>
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

/* ---------------- PAGE 1 — COVER ---------------- */

function CoverPage() {
  return (
    <section className="page">
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
            style={{ letterSpacing: "0.36em", color: "#8A948E" }}
          >
            Sales-folder · 2026
          </p>
        </header>

        <div className="my-auto max-w-[160mm]">
          <Eyebrow>De exclusieve B2B ledenclub</Eyebrow>

          <h1
            className="font-display font-medium"
            style={{
              fontSize: 78,
              lineHeight: 0.95,
              letterSpacing: "-0.015em",
              color: "#0F1714",
            }}
          >
            Het bouwnetwerk
            <br />
            aan{" "}
            <span style={{ color: "#7D9A85", fontStyle: "italic" }}>
              één tafel
            </span>
            .
          </h1>

          <p
            className="mt-7 text-[16px] font-medium"
            style={{ color: "#2D3B32", lineHeight: 1.45, maxWidth: "140mm" }}
          >
            14 vakspecialisten + 14 architecten. Eén partner per discipline.
            Een avond met doorschuiftafels en gastronomisch diner.
          </p>

          <div className="mt-12 grid grid-cols-4 gap-6 max-w-[170mm]">
            <Stat value="14+14" label="Aan tafel" />
            <Stat value="9" label="Events/jaar" />
            <Stat value="+4" label="Premium" />
            <Stat value="€1.750" label="Lidmaatschap" small />
          </div>
        </div>

        <footer className="mt-auto">
          <div
            className="flex items-end justify-between border-t pt-5"
            style={{ borderColor: "#E2E7E3" }}
          >
            <p
              className="font-display font-medium"
              style={{ fontSize: 18, color: "#0F1714" }}
            >
              renocheck.be · info@renocheck.be
            </p>
            <p
              className="text-[10px]"
              style={{ color: "#8A948E", textAlign: "right" }}
            >
              Interne sales-folder
            </p>
          </div>
        </footer>
      </div>
    </section>
  );
}

function Stat({
  value,
  label,
  small,
}: {
  value: string;
  label: string;
  small?: boolean;
}) {
  return (
    <div className="stat">
      <p
        className="font-display font-medium"
        style={{
          fontSize: small ? 28 : 44,
          lineHeight: 1,
          color: "#7D9A85",
        }}
      >
        {value}
      </p>
      <p
        className="mt-2 text-[10px] font-semibold uppercase"
        style={{ letterSpacing: "0.26em", color: "#8A948E" }}
      >
        {label}
      </p>
    </div>
  );
}

/* ---------------- PAGE 2 — WAT IS HET ---------------- */

function WhatIsItPage() {
  return (
    <section className="page">
      <CornerMark label="Wat is het" />

      <Eyebrow>Inner circle voor de bouwsector</Eyebrow>

      <h2
        className="font-display font-medium"
        style={{
          fontSize: 52,
          lineHeight: 1.02,
          letterSpacing: "-0.015em",
          color: "#0F1714",
          maxWidth: "160mm",
        }}
      >
        Geen platform.{" "}
        <span style={{ color: "#7D9A85", fontStyle: "italic" }}>
          Een ledenclub
        </span>
        .
      </h2>

      <p
        className="mt-6 text-[15px] font-medium"
        style={{ color: "#2D3B32", lineHeight: 1.45, maxWidth: "150mm" }}
      >
        Een gecureerde inner circle van architecten en vakspecialisten — die
        elkaar live aan tafel ontmoeten.
      </p>

      <div
        className="mt-12 grid grid-cols-3 gap-5"
        style={{ maxWidth: "180mm" }}
      >
        <PillarCard
          number="01"
          title="Curatie"
          bullets={[
            "Selectie op reputatie",
            "Eén per discipline",
            "Geen concurrenten aan tafel",
          ]}
        />
        <PillarCard
          number="02"
          title="Efficiëntie"
          bullets={[
            "Doorschuifsysteem",
            "Maximale interacties",
            "Eén avond, hele netwerk",
          ]}
        />
        <PillarCard
          number="03"
          title="Status"
          bullets={[
            "Renocheck-keurmerk",
            "'I made it' beleving",
            "Lange-termijn relaties",
          ]}
        />
      </div>

      <div
        className="mt-auto rounded-2xl p-7"
        style={{ background: "#F5F8F6", maxWidth: "180mm" }}
      >
        <p
          className="font-display font-medium"
          style={{ fontSize: 24, lineHeight: 1.2, color: "#0F1714" }}
        >
          "Member of Renocheck Professionals."{" "}
          <span style={{ color: "#7D9A85", fontStyle: "italic" }}>
            I made it.
          </span>
        </p>
      </div>

      <PageFooter pageNumber={2} />
    </section>
  );
}

function PillarCard({
  number,
  title,
  bullets,
}: {
  number: string;
  title: string;
  bullets: string[];
}) {
  return (
    <div
      className="rounded-2xl border p-5"
      style={{ borderColor: "#E2E7E3", background: "#FAFBFA" }}
    >
      <p
        className="font-display font-medium"
        style={{ fontSize: 11, letterSpacing: "0.32em", color: "#7D9A85" }}
      >
        {number}
      </p>
      <h3
        className="mt-3 font-display font-medium"
        style={{ fontSize: 22, lineHeight: 1.15, color: "#0F1714" }}
      >
        {title}
      </h3>
      <ul className="mt-4 space-y-2">
        {bullets.map((b) => (
          <li
            key={b}
            className="flex items-start gap-2 text-[12.5px]"
            style={{ color: "#2D3B32", lineHeight: 1.4 }}
          >
            <span
              aria-hidden="true"
              className="mt-2 inline-block h-1 w-1 shrink-0 rounded-full"
              style={{ background: "#7D9A85" }}
            />
            <span>{b}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ---------------- PAGE 3 — EVENT FORMAT ---------------- */

function EventFormatPage() {
  return (
    <section className="page">
      <CornerMark label="Het event" />

      <Eyebrow>Hoe een avond eruitziet</Eyebrow>

      <h2
        className="font-display font-medium"
        style={{
          fontSize: 50,
          lineHeight: 1.02,
          letterSpacing: "-0.015em",
          color: "#0F1714",
          maxWidth: "160mm",
        }}
      >
        14 + 14,{" "}
        <span style={{ color: "#7D9A85", fontStyle: "italic" }}>
          doorschuiftafels
        </span>
        .
      </h2>

      {/* Visualisatie van het 14+14 dinerformat */}
      <div
        className="mt-10 rounded-3xl border p-8"
        style={{
          borderColor: "#E2E7E3",
          background: "#FAFBFA",
          maxWidth: "180mm",
        }}
      >
        <div className="grid grid-cols-2 gap-10">
          <div>
            <p
              className="text-[10px] font-semibold uppercase"
              style={{ letterSpacing: "0.3em", color: "#7D9A85" }}
            >
              Vakspecialisten
            </p>
            <div className="mt-4 flex flex-wrap gap-1.5">
              {Array.from({ length: 14 }).map((_, i) => (
                <span
                  key={i}
                  className="seat inline-block h-6 w-6 rounded-full"
                  style={{ background: "#7D9A85" }}
                />
              ))}
            </div>
            <p
              className="mt-3 font-display font-medium"
              style={{ fontSize: 32, lineHeight: 1, color: "#0F1714" }}
            >
              14
            </p>
            <p className="text-[12px]" style={{ color: "#8A948E" }}>
              één per discipline
            </p>
          </div>

          <div>
            <p
              className="text-[10px] font-semibold uppercase"
              style={{ letterSpacing: "0.3em", color: "#526A59" }}
            >
              Architecten
            </p>
            <div className="mt-4 flex flex-wrap gap-1.5">
              {Array.from({ length: 14 }).map((_, i) => (
                <span
                  key={i}
                  className="seat inline-block h-6 w-6 rounded-full border-2"
                  style={{ borderColor: "#0F1714", background: "#FFFFFF" }}
                />
              ))}
            </div>
            <p
              className="mt-3 font-display font-medium"
              style={{ fontSize: 32, lineHeight: 1, color: "#0F1714" }}
            >
              14
            </p>
            <p className="text-[12px]" style={{ color: "#8A948E" }}>
              actieve bureaus
            </p>
          </div>
        </div>
      </div>

      <div
        className="mt-10 grid grid-cols-2 gap-4"
        style={{ maxWidth: "180mm" }}
      >
        <BenefitTile icon="🍽️" text="Gastronomisch diner" />
        <BenefitTile icon="🔄" text="Doorschuifsysteem" />
        <BenefitTile icon="🚫" text="Geen concurrent aan tafel" />
        <BenefitTile icon="📅" text="9 events per jaar" />
      </div>

      <PageFooter pageNumber={3} />
    </section>
  );
}

function BenefitTile({ icon, text }: { icon: string; text: string }) {
  return (
    <div
      className="flex items-center gap-4 rounded-2xl border p-5"
      style={{ borderColor: "#E2E7E3", background: "#FFFFFF" }}
    >
      <span
        aria-hidden="true"
        className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full"
        style={{ background: "rgba(125,154,133,0.12)", fontSize: 22 }}
      >
        {icon}
      </span>
      <p
        className="font-display font-medium"
        style={{ fontSize: 16.5, lineHeight: 1.25, color: "#0F1714" }}
      >
        {text}
      </p>
    </div>
  );
}

/* ---------------- PAGE 4 — VAKSPECIALISTEN ---------------- */

function ForVakspecialistenPage() {
  return (
    <section className="page">
      <CornerMark label="Vakspecialisten" />

      <Eyebrow>Voor vakspecialisten</Eyebrow>

      <h2
        className="font-display font-medium"
        style={{
          fontSize: 52,
          lineHeight: 1.02,
          letterSpacing: "-0.015em",
          color: "#0F1714",
          maxWidth: "170mm",
        }}
      >
        Eén stoel{" "}
        <span style={{ color: "#7D9A85", fontStyle: "italic" }}>
          per discipline
        </span>
        .
      </h2>

      <div
        className="mt-8 grid grid-cols-2 gap-4"
        style={{ maxWidth: "180mm" }}
      >
        <BenefitTile icon="🛠️" text="Exclusief in uw vak" />
        <BenefitTile icon="🏗️" text="Toegang tot architecten" />
        <BenefitTile icon="📈" text="Premium positionering" />
        <BenefitTile icon="🤝" text="Lange-termijn relaties" />
      </div>

      <div className="mt-9" style={{ maxWidth: "180mm" }}>
        <p
          className="text-[10px] font-semibold uppercase"
          style={{ letterSpacing: "0.3em", color: "#8A948E" }}
        >
          Disciplines (één per groep)
        </p>
        <div className="mt-4 flex flex-wrap gap-1.5">
          {[
            "Dakwerken",
            "Ramen & deuren",
            "Isolatie",
            "Gevelwerken",
            "Ruwbouw",
            "Elektriciteit",
            "Sanitair & loodgieterij",
            "HVAC & ventilatie",
            "Airco & warmtepompen",
            "Vloer- & tegelwerken",
            "Chape",
            "Pleisterwerk",
            "Schilderwerk",
            "Schrijnwerk",
            "Keukens",
            "Terras & opritten",
            "Tuinaanleg",
            "Zwembaden",
            "Zonnepanelen",
            "Waterdichting",
          ].map((r) => (
            <span
              key={r}
              className="chip inline-flex items-center rounded-full border px-3 py-1 text-[11px] font-medium"
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
        className="mt-auto rounded-2xl p-7"
        style={{ background: "#F5F8F6", maxWidth: "180mm" }}
      >
        <p
          className="font-display font-medium"
          style={{ fontSize: 22, lineHeight: 1.25, color: "#0F1714" }}
        >
          Eén partner per vak.{" "}
          <span style={{ color: "#7D9A85", fontStyle: "italic" }}>
            Geen concurrentie aan tafel.
          </span>
        </p>
      </div>

      <PageFooter pageNumber={4} />
    </section>
  );
}

/* ---------------- PAGE 5 — ARCHITECTEN ---------------- */

function ForArchitectsPage() {
  return (
    <section className="page">
      <CornerMark label="Architecten" />

      <Eyebrow>Voor architectenbureaus</Eyebrow>

      <h2
        className="font-display font-medium"
        style={{
          fontSize: 56,
          lineHeight: 1.0,
          letterSpacing: "-0.015em",
          color: "#0F1714",
          maxWidth: "160mm",
        }}
      >
        Vooraf{" "}
        <span style={{ color: "#7D9A85", fontStyle: "italic" }}>
          gescreende
        </span>{" "}
        partners.
      </h2>

      <div
        className="mt-12 grid grid-cols-2 gap-4"
        style={{ maxWidth: "180mm" }}
      >
        <BenefitTile icon="⏱️" text="Tijdswinst op screening" />
        <BenefitTile icon="🛡️" text="Minder reputatierisico" />
        <BenefitTile icon="🤝" text="20+ disciplines op één avond" />
        <BenefitTile icon="💡" text="Kruisbestuiving & inspiratie" />
        <BenefitTile icon="🎩" text="Premium beleving" />
        <BenefitTile icon="🍽️" text="Inbegrepen gastronomisch diner" />
      </div>

      <div
        className="mt-auto rounded-2xl p-7"
        style={{ background: "#0F1714", color: "#FFFFFF", maxWidth: "180mm" }}
      >
        <p
          className="font-display font-medium"
          style={{ fontSize: 22, lineHeight: 1.25 }}
        >
          Eén avond.{" "}
          <span style={{ color: "#CFDCD2", fontStyle: "italic" }}>
            Heel uw uitvoerend netwerk gescreend.
          </span>
        </p>
      </div>

      <PageFooter pageNumber={5} />
    </section>
  );
}

/* ---------------- PAGE 6 — SELECTIE ---------------- */

function SelectionPage() {
  return (
    <section className="page">
      <CornerMark label="Selectie" />

      <Eyebrow>Toelating tot de club</Eyebrow>

      <h2
        className="font-display font-medium"
        style={{
          fontSize: 50,
          lineHeight: 1.02,
          letterSpacing: "-0.015em",
          color: "#0F1714",
          maxWidth: "170mm",
        }}
      >
        Lidmaatschap is{" "}
        <span style={{ color: "#7D9A85", fontStyle: "italic" }}>
          geen recht
        </span>
        .
      </h2>

      <p
        className="mt-6 text-[14px] font-medium"
        style={{ color: "#2D3B32", lineHeight: 1.5, maxWidth: "150mm" }}
      >
        Selectie en toelating op basis van kwaliteit, reputatie en fit met de
        community. Exclusiviteit per discipline blijft heilig.
      </p>

      <div
        className="mt-10 grid grid-cols-2 gap-x-8 gap-y-5"
        style={{ maxWidth: "180mm" }}
      >
        <Criterion number="01" text="Reputatie in de sector" />
        <Criterion number="02" text="Service & klantgerichtheid" />
        <Criterion number="03" text="Aantoonbare betrouwbaarheid" />
        <Criterion number="04" text="Past in community-cultuur" />
        <Criterion number="05" text="Geen open plek = wachtlijst" />
        <Criterion number="06" text="Lange-termijn engagement" />
      </div>

      <div
        className="mt-auto rounded-2xl p-7"
        style={{ background: "#F5F8F6", maxWidth: "180mm" }}
      >
        <p
          className="font-display font-medium"
          style={{ fontSize: 22, lineHeight: 1.25, color: "#0F1714" }}
        >
          Eens een discipline vergeven is,{" "}
          <span style={{ color: "#7D9A85", fontStyle: "italic" }}>
            sluit ze.
          </span>
        </p>
      </div>

      <PageFooter pageNumber={6} />
    </section>
  );
}

function Criterion({ number, text }: { number: string; text: string }) {
  return (
    <div className="flex items-center gap-4">
      <span
        className="font-display font-medium"
        style={{
          fontSize: 11,
          letterSpacing: "0.28em",
          color: "#7D9A85",
          minWidth: 30,
        }}
      >
        {number}
      </span>
      <p
        className="font-display font-medium"
        style={{ fontSize: 17, lineHeight: 1.25, color: "#0F1714" }}
      >
        {text}
      </p>
    </div>
  );
}

/* ---------------- PAGE 7 — PRIJS ---------------- */

function PricingPage() {
  return (
    <section className="page" style={{ background: "#FAFBFA" }}>
      <CornerMark label="Investering" />

      <Eyebrow>Wat kost lidmaatschap</Eyebrow>

      <h2
        className="font-display font-medium"
        style={{
          fontSize: 52,
          lineHeight: 1.0,
          letterSpacing: "-0.015em",
          color: "#0F1714",
        }}
      >
        Twee tarieven.
        <br />
        <span style={{ color: "#7D9A85", fontStyle: "italic" }}>
          Eén club
        </span>
        .
      </h2>

      <div
        className="price-band mt-10 rounded-3xl p-9"
        style={{
          background: "#0F1714",
          color: "#FFFFFF",
          maxWidth: "180mm",
        }}
      >
        <div className="grid grid-cols-2 gap-10 items-start">
          <div>
            <p
              className="text-[10px] font-semibold uppercase"
              style={{
                letterSpacing: "0.32em",
                color: "rgba(255,255,255,0.65)",
              }}
            >
              Vakspecialist · lidmaatschap
            </p>
            <p
              className="mt-3 font-display font-medium"
              style={{ fontSize: 78, lineHeight: 0.95, color: "#FFFFFF" }}
            >
              €1.750
            </p>
            <p
              className="mt-2 text-[14px]"
              style={{ color: "#CFDCD2", lineHeight: 1.4 }}
            >
              per jaar · excl. btw
            </p>
            <ul className="mt-5 space-y-2">
              {[
                "Toegang tot alle 9 events",
                "Exclusieve plek in vak",
                "Renocheck-keurmerk",
                "Community-toegang",
              ].map((b) => (
                <li
                  key={b}
                  className="flex items-center gap-2 text-[12.5px]"
                  style={{ color: "rgba(255,255,255,0.85)" }}
                >
                  <span
                    aria-hidden="true"
                    className="inline-block h-1.5 w-1.5 rounded-full"
                    style={{ background: "#CFDCD2" }}
                  />
                  {b}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p
              className="text-[10px] font-semibold uppercase"
              style={{
                letterSpacing: "0.32em",
                color: "rgba(255,255,255,0.65)",
              }}
            >
              Architect · per event
            </p>
            <p
              className="mt-3 font-display font-medium"
              style={{ fontSize: 78, lineHeight: 0.95, color: "#FFFFFF" }}
            >
              €150
            </p>
            <p
              className="mt-2 text-[14px]"
              style={{ color: "#CFDCD2", lineHeight: 1.4 }}
            >
              per aanwezig event
            </p>
            <ul className="mt-5 space-y-2">
              {[
                "Geen jaarbinding",
                "Inbegrepen diner",
                "14 vakspecialisten aan tafel",
                "Doorschuifsysteem",
              ].map((b) => (
                <li
                  key={b}
                  className="flex items-center gap-2 text-[12.5px]"
                  style={{ color: "rgba(255,255,255,0.85)" }}
                >
                  <span
                    aria-hidden="true"
                    className="inline-block h-1.5 w-1.5 rounded-full"
                    style={{ background: "#CFDCD2" }}
                  />
                  {b}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div
        className="mt-8 grid grid-cols-3 gap-4"
        style={{ maxWidth: "180mm" }}
      >
        <SmallStatCard value="9" label="Reguliere events/jaar" />
        <SmallStatCard value="+4" label="Premium events/jaar" />
        <SmallStatCard value="85%" label="Doelbezetting" />
      </div>

      <PageFooter pageNumber={7} />
    </section>
  );
}

function SmallStatCard({ value, label }: { value: string; label: string }) {
  return (
    <div
      className="rounded-2xl border p-5"
      style={{ borderColor: "#E2E7E3", background: "#FFFFFF" }}
    >
      <p
        className="font-display font-medium"
        style={{ fontSize: 32, lineHeight: 1, color: "#7D9A85" }}
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

/* ---------------- PAGE 8 — CLOSING ---------------- */

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
          <Wordmark size="small" light />
          <p
            className="text-[10px] font-semibold uppercase"
            style={{
              letterSpacing: "0.32em",
              color: "rgba(255,255,255,0.6)",
            }}
          >
            Contact
          </p>
        </header>

        <div className="my-auto" style={{ maxWidth: "170mm" }}>
          <Eyebrow light>Klaar voor de club</Eyebrow>

          <h2
            className="font-display font-medium"
            style={{
              fontSize: 76,
              lineHeight: 0.95,
              letterSpacing: "-0.015em",
              color: "#FFFFFF",
            }}
          >
            Word{" "}
            <span style={{ color: "#CFDCD2", fontStyle: "italic" }}>
              member
            </span>
            .
          </h2>

          <p
            className="mt-7 text-[15.5px]"
            style={{
              color: "rgba(255,255,255,0.85)",
              lineHeight: 1.5,
              maxWidth: "130mm",
            }}
          >
            Eens een vak vergeven is in de groep — sluit het. Snel zijn = uw
            stoel claimen voor iemand anders het doet.
          </p>

          <div className="mt-12 grid grid-cols-3 gap-4">
            <ContactCell label="Founder" value="Maxime Villa" />
            <ContactCell label="E-mail" value="info@renocheck.be" />
            <ContactCell label="Site" value="renocheck.be" />
          </div>
        </div>

        <footer
          className="footerband mt-auto rounded-2xl px-6 py-5"
          style={{ background: "rgba(255,255,255,0.06)" }}
        >
          <p
            className="font-display font-medium"
            style={{ fontSize: 17, lineHeight: 1.3, color: "#FFFFFF" }}
          >
            30 minuten kennismaking.{" "}
            <span style={{ color: "#CFDCD2", fontStyle: "italic" }}>
              Direct duidelijk of er een stoel vrij is.
            </span>
          </p>
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

/* ---------------- Screen-only hint ---------------- */

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
      Druk{" "}
      <kbd
        style={{
          background: "#7D9A85",
          padding: "2px 6px",
          borderRadius: 4,
          marginLeft: 6,
          marginRight: 6,
        }}
      >
        Ctrl + P
      </kbd>{" "}
      → "Opslaan als PDF" · marges <strong>Geen</strong> · achtergrondgrafiek{" "}
      <strong>aan</strong>
    </aside>
  );
}
