import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import {
  createUser,
  deleteUser,
  requireAdmin,
  setUserRole,
} from "@/lib/auth";
import { listUsers, parseRegions, parseRubrieken } from "@/lib/queries";
import { validateSlug } from "@/lib/slugs";

export const metadata: Metadata = {
  title: "Beheer",
  robots: { index: false, follow: false },
};

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

const REGIONS = [
  "west-vlaanderen",
  "oost-vlaanderen",
  "antwerpen",
  "vlaams-brabant",
];

async function createUserAction(formData: FormData) {
  "use server";
  await requireAdmin();

  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "").trim();
  const full_name = String(formData.get("full_name") ?? "").trim();
  const company = String(formData.get("company") ?? "").trim();
  const regions = formData.getAll("regions").map((r) => String(r).trim()).filter(Boolean);
  const rubrieken = formData.getAll("rubrieken").map((r) => String(r).trim()).filter(Boolean);
  const partner_type = String(formData.get("partner_type") ?? "").trim();
  const slugRaw = String(formData.get("slug") ?? "").trim().toLowerCase();
  const roleRaw = String(formData.get("role") ?? "partner").trim();
  const role: "admin" | "partner" = roleRaw === "admin" ? "admin" : "partner";

  if (!email || !password) {
    redirect("/dashboard/beheer?error=missing-fields");
  }
  if (password.length < 6) {
    redirect("/dashboard/beheer?error=password-too-short");
  }
  let slug: string | null = null;
  if (slugRaw) {
    const err = validateSlug(slugRaw);
    if (err) redirect(`/dashboard/beheer?error=${encodeURIComponent(err)}`);
    slug = slugRaw;
  }

  try {
    await createUser({
      email,
      password,
      full_name: full_name || null,
      company: company || null,
      region: regions[0] ?? null,
      regions: regions.length > 0 ? regions : null,
      rubriek: rubrieken[0] ?? null,
      rubrieken: rubrieken.length > 0 ? rubrieken : null,
      partner_type: partner_type || null,
      slug,
      role,
    });
  } catch (err) {
    const msg = err instanceof Error ? err.message : "onbekend";
    const code = msg.includes("UNIQUE") ? "duplicate-email" : msg;
    redirect(`/dashboard/beheer?error=${encodeURIComponent(code)}`);
  }

  revalidatePath("/dashboard/beheer");
  redirect("/dashboard/beheer?created=" + encodeURIComponent(email));
}

async function setRoleAction(formData: FormData) {
  "use server";
  await requireAdmin();
  const id = String(formData.get("id"));
  const role = String(formData.get("role"));
  if (!id || (role !== "admin" && role !== "partner")) return;
  await setUserRole(id, role);
  revalidatePath("/dashboard/beheer");
}

async function deleteUserAction(formData: FormData) {
  "use server";
  const admin = await requireAdmin();
  const id = String(formData.get("id"));
  if (!id) return;
  if (id === admin.id) return;
  await deleteUser(id);
  revalidatePath("/dashboard/beheer");
}

export default async function BeheerPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; created?: string }>;
}) {
  const admin = await requireAdmin();
  const params = await searchParams;

  const profiles = await listUsers();

  return (
    <article className="px-6 pb-20 pt-12 md:px-12 md:pb-28 md:pt-16 lg:px-20 lg:pt-20">
      <header>
        <p className="text-[14px] font-medium uppercase tracking-[0.28em] text-ink-muted">
          Beheer · admin
        </p>
        <h1 className="mt-4 font-display text-[clamp(2rem,4.5vw,3.5rem)] font-medium leading-[1.05] text-ink">
          Partners{" "}
          <span className="italic text-sage">beheren</span>.
        </h1>
        <p className="mt-6 max-w-xl text-[16px] leading-[1.65] text-ink-soft">
          Voeg nieuwe partners toe met een e-mailadres en wachtwoord, en
          beheer hun rol. Geef het wachtwoord persoonlijk door aan de
          partner.
        </p>
      </header>

      {params?.error ? (
        <div className="mt-8 rounded-2xl border border-red-300/60 bg-red-50/60 p-5 text-[14px] text-red-800">
          {errorMessage(params.error)}
        </div>
      ) : null}

      {params?.created ? (
        <div className="mt-8 rounded-2xl border border-green-300/60 bg-green-50/60 p-5 text-[14px] text-green-900">
          Partner aangemaakt: {params.created}.
        </div>
      ) : null}

      <section className="mt-12 max-w-3xl rounded-3xl border border-ink-hair/60 bg-surface-soft/30 p-7 md:p-10">
        <h2 className="font-display text-[28px] font-medium leading-[1.15] text-ink md:text-[32px]">
          Nieuwe gebruiker aanmaken
        </h2>
        <form action={createUserAction} className="mt-8 space-y-6">
          <Field id="email" label="E-mailadres" type="email" required />
          <Field
            id="password"
            label="Wachtwoord"
            type="text"
            required
            help="Minstens 6 tekens. Communiceer dit persoonlijk."
          />
          <Field id="full_name" label="Naam" />
          <Field id="company" label="Bedrijf" />
          <Select
            id="role"
            label="Rol"
            options={[
              { value: "partner", label: "Partner" },
              { value: "admin", label: "Admin" },
            ]}
            help="Admin krijgt toegang tot inbox en beheer-paginas."
          />
          <Select
            id="partner_type"
            label="Type partner"
            options={[
              { value: "", label: "—" },
              { value: "architect", label: "Architect" },
              { value: "vakspecialist", label: "Vakspecialist" },
              { value: "bouwondernemer", label: "Bouwondernemer" },
            ]}
          />
          <div>
            <span className="block text-[14px] font-medium text-ink">
              Regio's
            </span>
            <p className="mt-1 text-[13px] text-ink-muted">
              Selecteer alle regio's waar deze partner actief is. Vakspecialisten
              kunnen in meerdere regio's zitten.
            </p>
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              {REGIONS.map((r) => (
                <label
                  key={r}
                  className="flex items-center gap-3 rounded-xl border border-ink-hair/70 bg-white/60 px-4 py-3 text-[14px] text-ink hover:border-sage"
                >
                  <input
                    type="checkbox"
                    name="regions"
                    value={r}
                    className="h-4 w-4 accent-sage"
                  />
                  {capitalize(r)}
                </label>
              ))}
            </div>
          </div>
          <div>
            <span className="block text-[14px] font-medium text-ink">
              Rubrieken (alleen voor vakspecialisten)
            </span>
            <p className="mt-1 text-[13px] text-ink-muted">
              Selecteer één of meer rubrieken. Vakspecialisten kunnen in
              meerdere vakken actief zijn.
            </p>
            <div className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
              {RUBRIEKEN.map((r) => (
                <label
                  key={r}
                  className="flex items-center gap-3 rounded-xl border border-ink-hair/70 bg-white/60 px-3 py-2 text-[13px] text-ink hover:border-sage"
                >
                  <input
                    type="checkbox"
                    name="rubrieken"
                    value={r}
                    className="h-4 w-4 accent-sage"
                  />
                  {r}
                </label>
              ))}
            </div>
          </div>
          <Field
            id="slug"
            label="Publieke URL slug (optioneel)"
            help="Wordt het URL-fragment van hun bedrijfspagina (renocheckprofessionals.be/<slug>). Lowercase letters, cijfers en koppeltekens."
          />
          <button
            type="submit"
            className="inline-flex items-center justify-center gap-3 rounded-full bg-ink px-7 py-4 text-[16px] font-medium text-white transition-colors hover:bg-sage"
          >
            Gebruiker aanmaken
          </button>
        </form>
      </section>

      <section className="mt-16">
        <h2 className="font-display text-[28px] font-medium leading-[1.15] text-ink md:text-[32px]">
          Alle partners
        </h2>
        <ul className="mt-8 divide-y divide-ink-hair/50 border-y border-ink-hair/50">
          {profiles.map((p) => {
            const regionsList = parseRegions(p.regions);
            const displayRegions =
              regionsList.length > 0
                ? regionsList.map((r) => capitalize(r)).join(", ")
                : p.region
                  ? capitalize(p.region)
                  : "—";
            const rubriekenList = parseRubrieken(p.rubrieken);
            const displayRubrieken =
              rubriekenList.length > 0
                ? rubriekenList.join(", ")
                : p.rubriek ?? null;
            return (
            <li
              key={p.id}
              className="grid gap-4 py-6 md:grid-cols-12 md:items-center md:gap-6"
            >
              <div className="md:col-span-5">
                <Link
                  href={`/dashboard/beheer/${p.id}`}
                  className="font-display text-[20px] font-medium leading-tight text-ink hover:text-sage md:text-[22px]"
                >
                  {p.full_name ?? p.company ?? "Naamloos"}
                </Link>
                <p className="mt-1 text-[13px] text-ink-muted">
                  {p.email} ·{" "}
                  {p.partner_type ?? "—"} ·{" "}
                  {displayRegions}
                  {displayRubrieken ? ` · ${displayRubrieken}` : ""}
                  {p.slug ? ` · /${p.slug}` : ""}
                </p>
              </div>
              <div className="md:col-span-3">
                <p className="text-[12px] uppercase tracking-[0.28em] text-ink-muted">
                  Rol
                </p>
                <p className="mt-1 text-[14px] text-ink">{p.role}</p>
              </div>
              <div className="flex flex-wrap gap-3 md:col-span-4 md:justify-end">
                {p.id !== admin.id ? (
                  <form action={setRoleAction}>
                    <input type="hidden" name="id" value={p.id} />
                    <input
                      type="hidden"
                      name="role"
                      value={p.role === "admin" ? "partner" : "admin"}
                    />
                    <button
                      type="submit"
                      className="rounded-full border border-ink-hair/70 bg-white/60 px-4 py-2 text-[13px] font-medium text-ink transition-colors hover:border-sage"
                    >
                      Maak {p.role === "admin" ? "partner" : "admin"}
                    </button>
                  </form>
                ) : (
                  <span className="self-center text-[12px] text-ink-muted">
                    (uzelf)
                  </span>
                )}
                {p.id !== admin.id ? (
                  <form action={deleteUserAction}>
                    <input type="hidden" name="id" value={p.id} />
                    <button
                      type="submit"
                      className="rounded-full border border-ink-hair/70 bg-white/60 px-4 py-2 text-[13px] font-medium text-ink transition-colors hover:border-red-700/60 hover:text-red-800"
                    >
                      Verwijderen
                    </button>
                  </form>
                ) : null}
              </div>
            </li>
            );
          })}
        </ul>
      </section>
    </article>
  );
}

function errorMessage(code: string): string {
  if (code === "missing-fields") return "Vul e-mailadres en wachtwoord in.";
  if (code === "password-too-short")
    return "Wachtwoord moet minstens 6 tekens lang zijn.";
  if (code === "duplicate-email")
    return "Er bestaat al een partner met dit e-mailadres.";
  return `Er ging iets mis: ${code}`;
}

function Field({
  id,
  label,
  type = "text",
  required,
  help,
}: {
  id: string;
  label: string;
  type?: string;
  required?: boolean;
  help?: string;
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
      {help ? <p className="mt-1 text-[13px] text-ink-muted">{help}</p> : null}
      <input
        id={id}
        name={id}
        type={type}
        required={required}
        className="mt-3 w-full rounded-xl border border-ink-hair/70 bg-surface-soft/70 px-4 py-3.5 text-[16px] text-ink placeholder:text-ink-muted/60 focus:border-ink focus:outline-none"
      />
    </div>
  );
}

function Select({
  id,
  label,
  options,
  help,
}: {
  id: string;
  label: string;
  options: { value: string; label: string }[];
  help?: string;
}) {
  return (
    <div>
      <label htmlFor={id} className="block text-[14px] font-medium text-ink">
        {label}
      </label>
      {help ? <p className="mt-1 text-[13px] text-ink-muted">{help}</p> : null}
      <select
        id={id}
        name={id}
        defaultValue={options[0]?.value}
        className="mt-3 w-full rounded-xl border border-ink-hair/70 bg-surface-soft/70 px-4 py-3.5 text-[16px] text-ink focus:border-ink focus:outline-none"
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

function capitalize(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1).replace(/-/g, " ");
}
