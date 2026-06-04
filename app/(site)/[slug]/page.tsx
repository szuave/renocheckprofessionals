import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BreadcrumbSchema } from "@/components/structured-data";
import { getUserBySlug, parseRegions } from "@/lib/queries";
import { RESERVED_SLUGS } from "@/lib/slugs";

export const dynamic = "force-dynamic";

const PARTNER_TYPE_LABEL: Record<string, string> = {
  architect: "Architectenbureau",
  vakspecialist: "Vakspecialist",
  bouwondernemer: "Bouwondernemer",
};

const REGION_LABEL: Record<string, string> = {
  "west-vlaanderen": "West-Vlaanderen",
  "oost-vlaanderen": "Oost-Vlaanderen",
  antwerpen: "Antwerpen",
  "vlaams-brabant": "Vlaams-Brabant",
};

async function fetchPartner(slug: string) {
  const s = slug.toLowerCase();
  if (RESERVED_SLUGS.has(s)) return null;
  return getUserBySlug(s);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const user = await fetchPartner(slug);
  if (!user) return { title: "Pagina niet gevonden" };
  const title = user.company ?? user.full_name ?? "Partner";
  const regions = parseRegions(user.regions);
  const regionList =
    regions.length > 0
      ? regions.map((r) => REGION_LABEL[r] ?? r).join(", ")
      : user.region
        ? REGION_LABEL[user.region] ?? user.region
        : "Vlaanderen";
  const description = `${title} — ${PARTNER_TYPE_LABEL[user.partner_type ?? ""] ?? "Partner"} binnen het Renocheck Professionals netwerk. Actief in ${regionList}.${user.rubriek ? ` Rubriek: ${user.rubriek}.` : ""}`;
  return {
    title: `${title} — Renocheck Professionals`,
    description,
    alternates: { canonical: `/${slug}` },
    openGraph: {
      title: `${title} — Renocheck Professionals`,
      description,
      url: `/${slug}`,
      type: "profile",
    },
    twitter: {
      title: `${title} — Renocheck Professionals`,
      description,
    },
  };
}

export default async function PartnerPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const user = await fetchPartner(slug);
  if (!user) notFound();

  const partnerType =
    PARTNER_TYPE_LABEL[user.partner_type ?? ""] ?? "Partner";
  const name = user.company ?? user.full_name ?? "Partner";
  const regions = parseRegions(user.regions);
  const regionList =
    regions.length > 0
      ? regions
      : user.region
        ? [user.region]
        : [];

  return (
    <article className="relative pt-36 pb-14 sm:pt-44 md:pt-52">
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "/" },
          { name: name, url: `/${slug}` },
        ]}
      />

      <section className="mx-auto max-w-[1100px] px-6 md:px-16 lg:px-24">
        <p className="enter-up delay-300 text-[10px] font-medium uppercase tracking-[0.32em] text-ink-muted">
          Netwerkpartner · {partnerType}
        </p>

        <h1 className="enter-up delay-400 mt-4 font-display text-[clamp(2.5rem,7vw,5.5rem)] font-medium leading-[0.98] text-ink">
          {name}
        </h1>

        {user.full_name && user.company ? (
          <p className="enter-up delay-500 mt-4 text-[15px] text-ink-soft">
            Contactpersoon: {user.full_name}
          </p>
        ) : null}

        <p className="enter-up delay-500 mt-8 max-w-2xl text-[17px] leading-[1.65] text-ink-soft md:text-[19px]">
          {name} is een geselecteerde partner binnen het Renocheck Professionals
          netwerk in Vlaanderen — een gesloten kring architectenbureaus,
          vakspecialisten en bouwondernemers die per regio met elkaar
          samenwerken.
        </p>
      </section>

      <section className="mx-auto mt-20 max-w-[1100px] px-6 md:mt-28 md:px-16 lg:px-24">
        <dl className="grid gap-6 rounded-3xl border border-ink-hair/60 bg-surface-soft/30 p-7 md:grid-cols-3 md:gap-8 md:p-10">
          <Detail
            label="Type partner"
            value={partnerType}
          />
          <Detail
            label="Actief in"
            value={
              regionList.length > 0
                ? regionList.map((r) => REGION_LABEL[r] ?? r).join(", ")
                : "—"
            }
          />
          {user.rubriek ? (
            <Detail label="Rubriek" value={user.rubriek} />
          ) : null}
        </dl>
      </section>

      <section className="mx-auto mt-20 max-w-[1100px] px-6 md:mt-28 md:px-16 lg:px-24">
        <div className="grid gap-12 md:grid-cols-12 md:gap-16">
          <div className="min-w-0 md:col-span-7">
            <p className="text-[10px] font-medium uppercase tracking-[0.32em] text-ink-muted">
              Onderdeel van
            </p>
            <h2 className="mt-4 font-display text-[clamp(1.75rem,3.5vw,2.75rem)] font-medium leading-[1.1] text-ink">
              Het{" "}
              <span className="italic text-sage">Vlaams</span> bouwnetwerk.
            </h2>
            <p className="mt-6 max-w-xl text-[16px] leading-[1.7] text-ink-soft">
              Renocheck Professionals selecteert per Vlaamse regio één partner
              per rubriek. Geen lead-veiling, wel een gesloten kring die
              elkaar kent via maandelijkse partnerevents.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                href="/"
                className="inline-flex items-center gap-3 rounded-full border border-ink-hair/70 bg-white/70 px-5 py-3 text-[14px] font-medium text-ink transition-colors hover:border-sage"
              >
                ← Het netwerk
              </Link>
              <Link
                href={`/regio/${(regionList[0] ?? "west-vlaanderen")}`}
                className="inline-flex items-center gap-3 rounded-full bg-sage px-5 py-3 text-[14px] font-medium text-white transition-colors hover:bg-sage-dark"
              >
                Andere {regionList[0] ? REGION_LABEL[regionList[0]] ?? regionList[0] : ""}-partners
              </Link>
            </div>
          </div>

          <aside className="min-w-0 rounded-3xl border border-ink-hair/60 bg-surface-soft/30 p-7 md:col-span-5">
            <p className="text-[10px] font-medium uppercase tracking-[0.32em] text-ink-muted">
              Direct contact
            </p>
            <p className="mt-4 text-[15px] leading-[1.7] text-ink">
              Vragen voor {name} of het Renocheck Professionals team? Stuur
              een bericht via het centrale contactformulier — wij zorgen voor
              de juiste doorverwijzing.
            </p>
            <div className="mt-6">
              <Link
                href="/contact?subject=question"
                className="inline-flex items-center gap-2 text-[13px] font-medium uppercase tracking-[0.28em] text-sage hover:text-sage-dark"
              >
                Contact opnemen →
              </Link>
            </div>
          </aside>
        </div>
      </section>
    </article>
  );
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-[10px] font-medium uppercase tracking-[0.3em] text-ink-muted">
        {label}
      </dt>
      <dd className="mt-3 font-display text-[20px] font-medium leading-tight text-ink">
        {value}
      </dd>
    </div>
  );
}
