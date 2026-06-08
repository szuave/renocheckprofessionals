import type { Metadata } from "next";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { getCurrentUser } from "@/lib/auth";
import { getBlogPost, updateBlogPost } from "@/lib/queries";

export const metadata: Metadata = {
  title: "Bericht bewerken",
  robots: { index: false, follow: false },
};

async function updateBlogAction(formData: FormData) {
  "use server";

  const id = String(formData.get("id"));
  if (!id) return;

  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const existing = await getBlogPost(id);
  if (!existing) return;
  if (existing.author_id !== user.id && user.role !== "admin") {
    redirect(`/dashboard/blog/${id}`);
  }

  const title = String(formData.get("title") ?? "").trim();
  const excerpt = String(formData.get("excerpt") ?? "").trim();
  const body = String(formData.get("body") ?? "").trim();

  if (!title || !body) {
    redirect(`/dashboard/blog/${id}/bewerken?error=missing`);
  }

  await updateBlogPost(id, {
    title,
    excerpt: excerpt || null,
    body,
  });

  revalidatePath(`/dashboard/blog/${id}`);
  revalidatePath(`/dashboard/blog`);
  redirect(`/dashboard/blog/${id}?saved=1`);
}

export default async function BlogEditPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ error?: string }>;
}) {
  const { id } = await params;
  const sp = await searchParams;
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const post = await getBlogPost(id);
  if (!post) notFound();
  if (post.author_id !== user.id && user.role !== "admin") {
    redirect(`/dashboard/blog/${id}`);
  }

  const errorMsg = sp?.error;

  return (
    <article className="px-6 pb-20 pt-12 md:px-12 md:pb-28 md:pt-16 lg:px-20 lg:pt-20">
      <Link
        href={`/dashboard/blog/${id}`}
        className="inline-flex items-center gap-2 text-[14px] font-medium text-ink-soft transition-colors hover:text-sage"
      >
        ← Terug naar bericht
      </Link>

      <header className="mt-8">
        <p className="text-[14px] font-medium uppercase tracking-[0.28em] text-ink-muted">
          Bericht bewerken
        </p>
        <h1 className="mt-4 font-display text-[clamp(2rem,4.5vw,3.5rem)] font-medium leading-[1.05] text-ink">
          {post.title}
        </h1>
      </header>

      {errorMsg ? (
        <div className="mt-8 rounded-2xl border border-red-300/60 bg-red-50/60 p-5 text-[14px] text-red-800">
          {errorMsg === "missing"
            ? "Vul minstens een titel en een bericht in."
            : `Er ging iets mis: ${errorMsg}`}
        </div>
      ) : null}

      <form action={updateBlogAction} className="mt-10 max-w-3xl space-y-8">
        <input type="hidden" name="id" value={post.id} />

        <Field
          id="title"
          label="Titel van het bericht"
          defaultValue={post.title}
          required
        />

        <Field
          id="excerpt"
          label="Korte samenvatting (optioneel)"
          defaultValue={post.excerpt ?? ""}
          help="Eén zin die op de overzichtspagina verschijnt."
        />

        <TextArea
          id="body"
          label="Het bericht zelf"
          defaultValue={post.body}
          rows={12}
          required
        />

        <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:items-center sm:gap-5">
          <button
            type="submit"
            className="inline-flex items-center justify-center gap-3 rounded-full bg-ink px-7 py-4 text-[16px] font-medium text-white transition-colors hover:bg-sage"
          >
            Wijzigingen opslaan
          </button>
          <Link
            href={`/dashboard/blog/${id}`}
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
  defaultValue,
}: {
  id: string;
  label: string;
  help?: string;
  required?: boolean;
  defaultValue?: string;
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
        type="text"
        required={required}
        defaultValue={defaultValue}
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
  defaultValue,
}: {
  id: string;
  label: string;
  help?: string;
  rows?: number;
  required?: boolean;
  defaultValue?: string;
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
      <textarea
        id={id}
        name={id}
        rows={rows ?? 8}
        required={required}
        defaultValue={defaultValue}
        className="mt-3 w-full resize-y rounded-xl border border-ink-hair/70 bg-surface-soft/70 px-4 py-3.5 text-[16px] leading-[1.6] text-ink placeholder:text-ink-muted/60 focus:border-ink focus:outline-none"
      />
    </div>
  );
}
