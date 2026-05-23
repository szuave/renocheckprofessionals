import type { Metadata } from "next";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { deleteEvent, getEvent } from "@/lib/queries";
import { DeletePostButton } from "../../blog/[id]/delete-button";

export const metadata: Metadata = {
  title: "Event",
  robots: { index: false, follow: false },
};

async function deleteEventAction(formData: FormData) {
  "use server";
  const id = String(formData.get("id"));
  if (!id) return;

  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const event = await getEvent(id);
  if (!event) return;
  if (event.author_id !== user.id && user.role !== "admin") return;

  await deleteEvent(id);
  redirect("/dashboard/agenda");
}

export default async function EventDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const user = await getCurrentUser();
  const event = await getEvent(id);

  if (!event) {
    notFound();
  }

  const authorName =
    event.author?.full_name ?? event.author?.company ?? "Renocheck partner";
  const isOwner = user?.id === event.author_id;

  return (
    <article className="px-6 pb-20 pt-12 md:px-12 md:pb-28 md:pt-16 lg:px-20 lg:pt-20">
      <Link
        href="/dashboard/agenda"
        className="inline-flex items-center gap-2 text-[14px] font-medium text-ink-soft transition-colors hover:text-sage"
      >
        ← Terug naar de agenda
      </Link>

      <header className="mt-8 max-w-3xl">
        <p className="text-[12px] font-medium uppercase tracking-[0.28em] text-ink-muted">
          Toegevoegd door {authorName}
        </p>
        <h1 className="mt-4 font-display text-[clamp(2rem,4.5vw,3.5rem)] font-medium leading-[1.05] text-ink">
          {event.title}
        </h1>
      </header>

      <dl className="mt-10 grid max-w-3xl gap-6 rounded-3xl border border-ink-hair/60 bg-surface-soft/30 p-7 md:grid-cols-2 md:gap-8 md:p-10">
        <Detail label="Begint op" value={formatDateTime(event.starts_at)} />
        {event.ends_at ? (
          <Detail label="Eindigt op" value={formatDateTime(event.ends_at)} />
        ) : null}
        {event.location ? (
          <Detail label="Locatie" value={event.location} />
        ) : null}
      </dl>

      {event.description ? (
        <div className="mt-12 max-w-3xl whitespace-pre-wrap text-[17px] leading-[1.75] text-ink md:text-[18px]">
          {event.description}
        </div>
      ) : null}

      {isOwner ? (
        <div className="mt-16 max-w-3xl border-t border-ink-hair/60 pt-8">
          <p className="text-[14px] text-ink-muted">
            U heeft dit event toegevoegd. U kan het verwijderen — klik
            twee keer om te bevestigen.
          </p>
          <div className="mt-4">
            <DeletePostButton
              postId={event.id}
              action={deleteEventAction}
              label="Event verwijderen"
              confirmText="Klik nogmaals om definitief te verwijderen"
            />
          </div>
        </div>
      ) : null}
    </article>
  );
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-[10px] font-medium uppercase tracking-[0.3em] text-ink-muted">
        {label}
      </dt>
      <dd className="mt-2 text-[17px] text-ink">{value}</dd>
    </div>
  );
}

function formatDateTime(iso: string) {
  return new Date(iso).toLocaleString("nl-BE", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}
