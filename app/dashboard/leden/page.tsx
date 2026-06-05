import type { Metadata } from "next";
import Link from "next/link";
import { requireUser } from "@/lib/auth";
import { listUsersByName, parseRegions, parseRubrieken } from "@/lib/queries";

export const metadata: Metadata = {
  title: "Andere partners",
  robots: { index: false, follow: false },
};

export default async function LedenPage() {
  const me = await requireUser();
  const isAdmin = me.role === "admin";
  const profiles = await listUsersByName();

  return (
    <article className="px-6 pb-20 pt-12 md:px-12 md:pb-28 md:pt-16 lg:px-20 lg:pt-20">
      <header>
        <p className="text-[14px] font-medium uppercase tracking-[0.28em] text-ink-muted">
          Andere partners
        </p>
        <h1 className="mt-4 font-display text-[clamp(2rem,4.5vw,3.5rem)] font-medium leading-[1.05] text-ink">
          Wie is er{" "}
          <span className="italic text-sage">aangesloten</span>.
        </h1>
        <p className="mt-6 max-w-xl text-[16px] leading-[1.65] text-ink-soft">
          Bekijk de andere architecten en vakspecialisten in het Renocheck
          netwerk.
        </p>
      </header>

      {profiles.length === 0 ? (
        <p className="mt-12 text-[15px] text-ink-soft">
          Nog geen andere partners zichtbaar.
        </p>
      ) : (
        <ul className="mt-12 grid gap-5 md:mt-16 md:grid-cols-2 lg:grid-cols-3">
          {profiles.map((p) => {
            const regionsList = parseRegions(p.regions);
            const allRegions =
              regionsList.length > 0
                ? regionsList
                : p.region
                  ? [p.region]
                  : [];
            const regionsDisplay = allRegions
              .map((r) => capitalize(r))
              .join(", ");
            const rubriekenList = parseRubrieken(p.rubrieken);
            const displayRubrieken =
              rubriekenList.length > 0
                ? rubriekenList.join(", ")
                : p.rubriek ?? null;
            // Where does this card link?
            // Admin → naar de beheer-detailpagina (volledige info + edit)
            // Partner → naar de publieke bedrijfspagina als slug bestaat
            const href = isAdmin
              ? `/dashboard/beheer/${p.id}`
              : p.slug
                ? `/${p.slug}`
                : null;

            const cardContent = (
              <>
                <p className="text-[10px] font-medium uppercase tracking-[0.3em] text-ink-muted">
                  {p.partner_type ??
                    (p.role === "admin" ? "Renocheck team" : "Partner")}
                  {regionsDisplay ? ` · ${regionsDisplay}` : ""}
                </p>
                <h2 className="mt-3 font-display text-[24px] font-medium leading-[1.15] text-ink transition-colors group-hover:text-sage">
                  {p.full_name ?? p.company ?? "Naamloos"}
                </h2>
                {p.company && p.full_name ? (
                  <p className="mt-1 text-[14px] text-ink-soft">{p.company}</p>
                ) : null}
                {displayRubrieken ? (
                  <p className="mt-3 text-[13px] text-ink-muted">
                    {rubriekenList.length > 1 ? "Rubrieken" : "Rubriek"}:{" "}
                    {displayRubrieken}
                  </p>
                ) : null}
                {p.slug ? (
                  <p className="mt-3 text-[11px] uppercase tracking-[0.24em] text-ink-muted/70">
                    /{p.slug}
                  </p>
                ) : null}
              </>
            );

            return (
              <li key={p.id}>
                {href ? (
                  <Link
                    href={href}
                    className="group block h-full rounded-2xl border border-ink-hair/60 bg-surface-soft/30 p-6 transition-colors hover:border-sage hover:bg-surface-soft/60"
                  >
                    {cardContent}
                  </Link>
                ) : (
                  <div className="block h-full rounded-2xl border border-ink-hair/60 bg-surface-soft/30 p-6">
                    {cardContent}
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </article>
  );
}

function capitalize(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1).replace(/-/g, " ");
}
