import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { requireUser } from "@/lib/auth";
import { createBlogPost } from "@/lib/queries";

export const metadata: Metadata = {
  title: "Nieuw bericht",
  robots: { index: false, follow: false },
};

async function createPost(formData: FormData) {
  "use server";

  const title = String(formData.get("title") ?? "").trim();
  const excerpt = String(formData.get("excerpt") ?? "").trim();
  const body = String(formData.get("body") ?? "").trim();

  if (!title || !body) {
    redirect("/dashboard/blog/nieuw?error=missing");
  }

  const user = await requireUser();

  const id = await createBlogPost({
    author_id: user.id,
    title,
    excerpt: excerpt || null,
    body,
  });

  redirect(`/dashboard/blog/${id}`);
}

export default async function NewBlogPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const params = await searchParams;
  const errorMsg = params?.error;

  return (
    <article className="px-6 pb-20 pt-12 md:px-12 md:pb-28 md:pt-16 lg:px-20 lg:pt-20">
      <Link
        href="/dashboard/blog"
        className="inline-flex items-center gap-2 text-[14px] font-medium text-ink-soft transition-colors hover:text-sage"
      >
        ← Terug naar alle berichten
      </Link>

      <header className="mt-8">
        <p className="text-[14px] font-medium uppercase tracking-[0.28em] text-ink-muted">
          Nieuw bericht
        </p>
        <h1 className="mt-4 font-display text-[clamp(2rem,4.5vw,3.5rem)] font-medium leading-[1.05] text-ink">
          Schrijf een{" "}
          <span className="italic text-sage">bericht</span>.
        </h1>
        <p className="mt-6 max-w-xl text-[16px] leading-[1.65] text-ink-soft">
          Vul de drie velden hieronder in en klik op "Bericht plaatsen".
          Andere partners zien uw bericht meteen op het netwerk.
        </p>
      </header>

      {errorMsg ? (
        <div className="mt-8 rounded-2xl border border-red-300/60 bg-red-50/60 p-5 text-[14px] text-red-800">
          {errorMsg === "missing"
            ? "Vul minstens een titel en een bericht in."
            : `Er ging iets mis: ${errorMsg}`}
        </div>
      ) : null}

      <form action={createPost} className="mt-10 max-w-3xl space-y-8">
        <Field
          id="title"
          label="Titel van het bericht"
          help="Bijvoorbeeld: 'Hometrends opendeur in juni'"
          required
        />

        <Field
          id="excerpt"
          label="Korte samenvatting (optioneel)"
          help="Eén zin die op de overzichtspagina verschijnt."
        />

        <TextArea
          id="body"
          label="Het bericht zelf"
          help="Vertel hier rustig wat u wilt delen. U kunt gewoon typen — geen opmaak nodig."
          rows={12}
          required
        />

        <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:items-center sm:gap-5">
          <button
            type="submit"
            className="inline-flex items-center justify-center gap-3 rounded-full bg-ink px-7 py-4 text-[16px] font-medium text-white transition-colors hover:bg-sage"
          >
            Bericht plaatsen
          </button>
          <Link
            href="/dashboard/blog"
            className="inline-flex items-center justify-center rounded-full border border-ink-hair/70 bg-white/60 px-7 py-4 text-[16px] font-medium text-ink transition-colors hover:border-sage"
          >
            Annuleren
          </Link>
        </div>
      </form>
    </article>
  );
}

function Field({
  id,
  label,
  help,
  required,
}: {
  id: string;
  label: string;
  help?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="block text-[14px] font-medium text-ink"
      >
        {label}
        {required ? (
          <span className="ml-1 text-sage" aria-hidden="true">
            *
          </span>
        ) : null}
      </label>
      {help ? (
        <p className="mt-1 text-[13px] text-ink-muted">{help}</p>
      ) : null}
      <input
        id={id}
        name={id}
        type="text"
        required={required}
        className="mt-3 w-full rounded-xl border border-ink-hair/70 bg-surface-soft/70 px-4 py-3.5 text-[16px] text-ink placeholder:text-ink-muted/60 focus:border-ink focus:outline-none"
      />
    </div>
  );
}

function TextArea({
  id,
  label,
  help,
  rows,
  required,
}: {
  id: string;
  label: string;
  help?: string;
  rows?: number;
  required?: boolean;
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="block text-[14px] font-medium text-ink"
      >
        {label}
        {required ? (
          <span className="ml-1 text-sage" aria-hidden="true">
            *
          </span>
        ) : null}
      </label>
      {help ? (
        <p className="mt-1 text-[13px] text-ink-muted">{help}</p>
      ) : null}
      <textarea
        id={id}
        name={id}
        rows={rows ?? 8}
        required={required}
        className="mt-3 w-full resize-y rounded-xl border border-ink-hair/70 bg-surface-soft/70 px-4 py-3.5 text-[16px] leading-[1.6] text-ink placeholder:text-ink-muted/60 focus:border-ink focus:outline-none"
      />
    </div>
  );
}
