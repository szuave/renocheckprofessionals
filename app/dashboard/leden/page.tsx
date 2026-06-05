import type { Metadata } from "next";
import { requireUser } from "@/lib/auth";
import { listUsersByName, parseRegions, parseRubrieken } from "@/lib/queries";
import { LedenList } from "./leden-list";

export const metadata: Metadata = {
  title: "Andere partners",
  robots: { index: false, follow: false },
};

export default async function LedenPage() {
  await requireUser();
  const profiles = await listUsersByName();

  const rows = profiles.map((p) => {
    const regionsList = parseRegions(p.regions);
    const allRegions =
      regionsList.length > 0
        ? regionsList
        : p.region
          ? [p.region]
          : [];
    const rubriekenList = parseRubrieken(p.rubrieken);
    const allRubrieken =
      rubriekenList.length > 0
        ? rubriekenList
        : p.rubriek
          ? [p.rubriek]
          : [];
    return {
      id: p.id,
      full_name: p.full_name,
      company: p.company,
      email: p.email,
      role: p.role,
      partner_type: p.partner_type,
      regions: allRegions,
      rubrieken: allRubrieken,
      slug: p.slug,
    };
  });

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
          Bekijk de andere architecten, vakspecialisten en bouwondernemers in
          het Renocheck Professionals netwerk. Klik door op een partner voor
          de volledige info en eventbezoeken.
        </p>
      </header>

      <LedenList profiles={rows} />
    </article>
  );
}
