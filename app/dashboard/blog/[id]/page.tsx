import type { Metadata } from "next";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { deleteBlogPost, getBlogPost } from "@/lib/queries";
import { DeletePostButton } from "./delete-button";

export const metadata: Metadata = {
  title: "Bericht",
  robots: { index: false, follow: false },
};

async function deletePostAction(formData: FormData) {
  "use server";
  const id = String(formData.get("id"));
  if (!id) return;
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const post = await getBlogPost(id);
  if (!post) return;
  if (post.author_id !== user.id && user.role !== "admin") return;

  await deleteBlogPost(id);
  redirect("/dashboard/blog");
}

export default async function BlogPostPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ saved?: string }>;
}) {
  const { id } = await params;
  const sp = await searchParams;
  const user = await getCurrentUser();
  const post = await getBlogPost(id);

  if (!post) {
    notFound();
  }

  const authorName =
    post.author?.full_name ?? post.author?.company ?? "Renocheck partner";
  const isOwner = user?.id === post.author_id;
  const canEdit = isOwner || user?.role === "admin";

  return (
    <article className="px-6 pb-20 pt-12 md:px-12 md:pb-28 md:pt-16 lg:px-20 lg:pt-20">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <Link
          href="/dashboard/blog"
          className="inline-flex items-center gap-2 text-[14px] font-medium text-ink-soft transition-colors hover:text-sage"
        >
          ← Terug naar alle berichten
        </Link>

        {canEdit ? (
          <Link
            href={`/dashboard/blog/${post.id}/bewerken`}
            className="inline-flex items-center gap-2 rounded-full border border-ink-hair/70 bg-white/70 px-4 py-2 text-[13px] font-medium text-ink transition-colors hover:border-sage hover:text-sage"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-3.5 w-3.5"
            >
              <path d="M12 20h9" />
              <path d="M16.5 3.5a2.121 2.121 0 1 1 3 3L7 19l-4 1 1-4Z" />
            </svg>
            Bewerken
          </Link>
        ) : null}
      </div>

      {sp?.saved ? (
        <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-sage/12 px-4 py-2 text-[13px] font-medium text-sage-dark">
          <span aria-hidden="true">✓</span>
          Wijzigingen opgeslagen.
        </div>
      ) : null}

      <header className="mt-8 max-w-3xl">
        <p className="text-[12px] font-medium uppercase tracking-[0.28em] text-ink-muted">
          {formatDate(post.created_at)} · {authorName}
          {post.updated_at && post.updated_at !== post.created_at ? (
            <span className="ml-2 text-ink-muted/70">
              · bewerkt {formatDate(post.updated_at)}
            </span>
          ) : null}
        </p>
        <h1 className="mt-4 font-display text-[clamp(2rem,4.5vw,3.5rem)] font-medium leading-[1.05] text-ink">
          {post.title}
        </h1>
        {post.excerpt ? (
          <p className="mt-6 text-[19px] leading-[1.6] text-ink-soft md:text-[21px]">
            {post.excerpt}
          </p>
        ) : null}
      </header>

      <div className="mt-12 max-w-3xl whitespace-pre-wrap text-[17px] leading-[1.75] text-ink md:text-[18px]">
        {post.body}
      </div>

      {isOwner ? (
        <div className="mt-16 max-w-3xl border-t border-ink-hair/60 pt-8">
          <p className="text-[14px] text-ink-muted">
            Dit is uw eigen bericht. U kan het verwijderen — klik twee keer
            om te bevestigen.
          </p>
          <div className="mt-4">
            <DeletePostButton
              postId={post.id}
              action={deletePostAction}
              label="Bericht verwijderen"
              confirmText="Klik nogmaals om definitief te verwijderen"
            />
          </div>
        </div>
      ) : null}
    </article>
  );
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("nl-BE", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}
