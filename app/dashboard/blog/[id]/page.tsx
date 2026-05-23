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

  const post = getBlogPost(id);
  if (!post) return;
  if (post.author_id !== user.id && user.role !== "admin") return;

  deleteBlogPost(id);
  redirect("/dashboard/blog");
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const user = await getCurrentUser();
  const post = getBlogPost(id);

  if (!post) {
    notFound();
  }

  const authorName =
    post.author?.full_name ?? post.author?.company ?? "Renocheck partner";
  const isOwner = user?.id === post.author_id;

  return (
    <article className="px-6 pb-20 pt-12 md:px-12 md:pb-28 md:pt-16 lg:px-20 lg:pt-20">
      <Link
        href="/dashboard/blog"
        className="inline-flex items-center gap-2 text-[14px] font-medium text-ink-soft transition-colors hover:text-sage"
      >
        ← Terug naar alle berichten
      </Link>

      <header className="mt-8 max-w-3xl">
        <p className="text-[12px] font-medium uppercase tracking-[0.28em] text-ink-muted">
          {formatDate(post.created_at)} · {authorName}
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
