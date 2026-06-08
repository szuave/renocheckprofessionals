import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { changePassword, requireUser } from "@/lib/auth";
import { parseRegions, parseRubrieken } from "@/lib/queries";

export const metadata: Metadata = {
  title: "Mijn account",
  robots: { index: false, follow: false },
};

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

async function changePasswordAction(formData: FormData) {
  "use server";

  const user = await requireUser("/dashboard/account");
  const current = String(formData.get("current") ?? "");
  const next1 = String(formData.get("next1") ?? "");
  const next2 = String(formData.get("next2") ?? "");

  if (!current || !next1) {
    redirect("/dashboard/account?error=missing");
  }
  if (next1 !== next2) {
    redirect("/dashboard/account?error=mismatch");
  }

  const result = await changePassword(user.id, current, next1);
  if (!result.ok) {
    redirect(`/dashboard/account?error=${result.error}`);
  }
  redirect("/dashboard/account?saved=password");
}

export default async function AccountPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; saved?: string }>;
}) {
  const user = await requireUser("/dashboard/account");
  const sp = await searchParams;

  const regions = parseRegions(user.regions);
  const regionList =
    regions.length > 0
      ? regions
      : user.region
        ? [user.region]
        : [];
  const rubrieken = parseRubrieken(user.rubrieken);
  const rubriekList =
    rubrieken.length > 0
      ? rubrieken
      : user.rubriek
        ? [user.rubriek]
        : [];

  return (
    <article className="px-6 pb-20 pt-12 md:px-12 md:pb-28 md:pt-16 lg:px-20 lg:pt-20">
      {/* Header */}
      <header className="flex flex-col items-start gap-6 md:flex-row md:items-end md:justify-between">
        <div>
          <div className="flex items-center gap-3">
            <span aria-hidden="true" className="h-px w-6 bg-sage/70" />
            <p className="text-[10px] font-semibold uppercase tracking-[0.36em] text-ink-muted">
              Mijn account
            </p>
          </div>
          <h1 className="mt-5 font-display text-[clamp(2.25rem,5vw,4rem)] font-medium leading-[1.02] text-ink">
            Account &{" "}
            <span className="italic text-sage">veiligheid</span>.
          </h1>
          <p className="mt-4 max-w-xl text-[15px] leading-[1.6] text-ink-soft md:text-[16px]">
            Beheer uw inloggegevens. Voor wijzigingen aan uw bedrijfsprofiel
            (regio's, rubrieken, slug) neemt u contact op met een beheerder.
          </p>
        </div>
      </header>

      {sp?.saved === "password" ? (
        <div className="mt-10 inline-flex items-center gap-2 rounded-full bg-sage/12 px-4 py-2 text-[13px] font-medium text-sage-dark">
          <span aria-hidden="true">✓</span>
          Wachtwoord gewijzigd. U blijft ingelogd.
        </div>
      ) : null}

      <div className="mt-12 grid gap-10 md:mt-16 md:grid-cols-12 md:gap-12">
        {/* Profile summary — readonly */}
        <aside className="rounded-3xl border border-ink-hair/60 bg-surface-soft/30 p-6 md:col-span-5 md:p-8">
          <p className="text-[10px] font-medium uppercase tracking-[0.32em] text-ink-muted">
            Mijn profiel
          </p>

          <div className="mt-5 space-y-5">
            <Detail label="Naam" value={user.full_name ?? "—"} />
            <Detail label="Bedrijf" value={user.company ?? "—"} />
            <Detail label="E-mail" value={user.email} />
            <Detail
              label="Type"
              value={
                PARTNER_TYPE_LABEL[user.partner_type ?? ""] ?? "Partner"
              }
            />
            <Detail
              label="Regio's"
              value={
                regionList.length > 0
                  ? regionList.map((r) => REGION_LABEL[r] ?? r).join(", ")
                  : "—"
              }
            />
            {rubriekList.length > 0 ? (
              <Detail
                label={rubriekList.length > 1 ? "Rubrieken" : "Rubriek"}
                value={rubriekList.join(", ")}
              />
            ) : null}
            {user.slug ? (
              <Detail
                label="Bedrijfspagina"
                value={
                  <Link
                    href={`/${user.slug}`}
                    target="_blank"
                    className="text-sage hover:text-sage-dark"
                  >
                    /{user.slug}
                  </Link>
                }
              />
            ) : null}
            <Detail
              label="Rol"
              value={user.role === "admin" ? "Beheerder" : "Partner"}
            />
          </div>

          <p className="mt-8 text-[12px] leading-[1.55] text-ink-muted">
            Aanpassingen aan deze gegevens? Vraag de admin of stuur een
            bericht via{" "}
            <Link
              href="/contact"
              className="text-sage underline-offset-2 hover:underline"
            >
              contactformulier
            </Link>
            .
          </p>
        </aside>

        {/* Password change form */}
        <section className="md:col-span-7">
          <div className="flex items-center gap-3">
            <span aria-hidden="true" className="h-px w-6 bg-sage/70" />
            <p className="text-[10px] font-semibold uppercase tracking-[0.36em] text-ink-muted">
              Wachtwoord wijzigen
            </p>
          </div>

          <h2 className="mt-4 font-display text-[28px] font-medium leading-tight text-ink md:text-[32px]">
            Een nieuw wachtwoord instellen.
          </h2>
          <p className="mt-3 max-w-xl text-[14px] leading-[1.65] text-ink-soft">
            Kies een wachtwoord van minstens 8 tekens. Gebruik bij voorkeur
            een combinatie van letters, cijfers en symbolen.
          </p>

          {sp?.error ? (
            <div className="mt-6 rounded-2xl border border-red-300/60 bg-red-50/60 p-4 text-[13px] text-red-800">
              {sp.error === "current_wrong"
                ? "Het huidige wachtwoord is niet correct."
                : sp.error === "mismatch"
                  ? "De twee nieuwe wachtwoorden komen niet overeen."
                  : sp.error === "weak"
                    ? "Nieuw wachtwoord moet minstens 8 tekens bevatten."
                    : "Vul alle velden in."}
            </div>
          ) : null}

          <form
            action={changePasswordAction}
            className="mt-8 space-y-6"
            autoComplete="off"
          >
            <PasswordField
              id="current"
              label="Huidig wachtwoord"
              autoComplete="current-password"
              required
            />

            <div className="grid gap-6 sm:grid-cols-2">
              <PasswordField
                id="next1"
                label="Nieuw wachtwoord"
                autoComplete="new-password"
                required
              />
              <PasswordField
                id="next2"
                label="Bevestig nieuw wachtwoord"
                autoComplete="new-password"
                required
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="inline-flex items-center justify-center gap-3 rounded-full bg-ink px-6 py-3.5 text-[15px] font-medium text-white transition-colors hover:bg-sage"
              >
                Wachtwoord wijzigen
              </button>
            </div>
          </form>
        </section>
      </div>
    </article>
  );
}

function Detail({
  label,
  value,
}: {
  label: string;
  value: React.ReactNode;
}) {
  return (
    <div>
      <dt className="text-[10px] font-medium uppercase tracking-[0.3em] text-ink-muted">
        {label}
      </dt>
      <dd className="mt-1.5 text-[15px] leading-[1.5] text-ink">{value}</dd>
    </div>
  );
}

function PasswordField({
  id,
  label,
  required,
  autoComplete,
}: {
  id: string;
  label: string;
  required?: boolean;
  autoComplete?: string;
}) {
  return (
    <div>
      <label htmlFor={id} className="block text-[14px] font-medium text-ink">
        {label}
        {required ? (
          <span className="ml-1 text-sage" aria-hidden="true">
            *
          </span>
        ) : null}
      </label>
      <input
        id={id}
        name={id}
        type="password"
        required={required}
        autoComplete={autoComplete}
        className="mt-3 w-full rounded-xl border border-ink-hair/70 bg-surface-soft/70 px-4 py-3 text-[15px] text-ink placeholder:text-ink-muted/60 focus:border-ink focus:outline-none"
      />
    </div>
  );
}
