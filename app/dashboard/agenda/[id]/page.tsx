import type { Metadata } from "next";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { getCurrentUser } from "@/lib/auth";
import {
  checkInToEvent,
  checkOutFromEvent,
  deleteEvent,
  getEvent,
  isUserCheckedIn,
  listEventCheckins,
} from "@/lib/queries";
import { DeletePostButton } from "../../blog/[id]/delete-button";

export const metadata: Metadata = {
  title: "Event",
  robots: { index: false, follow: false },
};

const REGION_LABEL: Record<string, string> = {
  "west-vlaanderen": "West-Vlaanderen",
  "oost-vlaanderen": "Oost-Vlaanderen",
  antwerpen: "Antwerpen",
  "vlaams-brabant": "Vlaams-Brabant",
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

async function checkInAction(formData: FormData) {
  "use server";
  const id = String(formData.get("event_id"));
  if (!id) return;
  const user = await getCurrentUser();
  if (!user) redirect("/login");
  await checkInToEvent(id, user.id);
  revalidatePath(`/dashboard/agenda/${id}`);
}

async function checkOutAction(formData: FormData) {
  "use server";
  const id = String(formData.get("event_id"));
  if (!id) return;
  const user = await getCurrentUser();
  if (!user) redirect("/login");
  await checkOutFromEvent(id, user.id);
  revalidatePath(`/dashboard/agenda/${id}`);
}

function formatPrice(price_cents: string | null): string | null {
  if (!price_cents) return null;
  const n = Number(price_cents);
  if (!Number.isFinite(n)) return null;
  return new Intl.NumberFormat("nl-BE", {
    style: "currency",
    currency: "EUR",
  }).format(n / 100);
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
  const isAdmin = user?.role === "admin";
  const checkedIn = user ? await isUserCheckedIn(id, user.id) : false;
  const attendees = isAdmin || isOwner ? await listEventCheckins(id) : [];
  const price = formatPrice(event.price_cents);

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
        {event.region ? (
          <Detail
            label="Regio"
            value={REGION_LABEL[event.region] ?? event.region}
          />
        ) : null}
        {price ? (
          <Detail label="Prijs per persoon" value={price} />
        ) : (
          <Detail label="Prijs per persoon" value="Gratis" />
        )}
      </dl>

      {event.description ? (
        <div className="mt-12 max-w-3xl whitespace-pre-wrap text-[17px] leading-[1.75] text-ink md:text-[18px]">
          {event.description}
        </div>
      ) : null}

      {user ? (
        <section className="mt-12 max-w-3xl rounded-3xl border border-ink-hair/60 bg-surface-soft/30 p-6 md:p-8">
          <p className="text-[10px] font-medium uppercase tracking-[0.3em] text-ink-muted">
            {checkedIn ? "U bent ingeschreven" : "Aanwezigheid"}
          </p>
          <p className="mt-3 text-[15px] leading-[1.7] text-ink-soft">
            {checkedIn
              ? "Het admin-team weet dat u komt. U kan zich nog uitschrijven via de knop hieronder."
              : "Klik op de knop om u in te schrijven voor dit event. De admin ziet wie er komt."}
          </p>
          <form
            action={checkedIn ? checkOutAction : checkInAction}
            className="mt-5"
          >
            <input type="hidden" name="event_id" value={event.id} />
            <button
              type="submit"
              className={`inline-flex items-center justify-center gap-3 rounded-full px-6 py-3 text-[14px] font-medium transition-colors ${
                checkedIn
                  ? "border border-ink-hair/70 bg-white text-ink hover:border-sage"
                  : "bg-sage text-white hover:bg-sage-dark"
              }`}
            >
              {checkedIn ? "Ik kom toch niet" : "Ik kom (inschrijven)"}
            </button>
          </form>
        </section>
      ) : null}

      {(isOwner || isAdmin) && attendees.length >= 0 ? (
        <section className="mt-12 max-w-3xl">
          <h2 className="font-display text-[26px] font-medium leading-[1.15] text-ink md:text-[30px]">
            Ingeschreven{" "}
            <span className="italic text-sage">({attendees.length})</span>
          </h2>
          {attendees.length === 0 ? (
            <p className="mt-6 text-[14px] text-ink-muted">
              Nog niemand ingeschreven.
            </p>
          ) : (
            <ul className="mt-6 divide-y divide-ink-hair/50 border-y border-ink-hair/50">
              {attendees.map((a) => (
                <li
                  key={a.user_id}
                  className="flex items-center justify-between gap-4 py-4"
                >
                  <div className="min-w-0">
                    <p className="font-display text-[18px] font-medium leading-tight text-ink">
                      {a.user_name ?? a.user_company ?? a.user_email}
                    </p>
                    <p className="mt-1 text-[12px] text-ink-muted">
                      {a.user_company && a.user_name
                        ? `${a.user_company} · ${a.user_email}`
                        : a.user_email}
                    </p>
                  </div>
                  <p className="shrink-0 text-[11px] uppercase tracking-[0.28em] text-ink-muted">
                    {new Date(a.checked_in_at).toLocaleDateString("nl-BE", {
                      day: "2-digit",
                      month: "short",
                    })}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </section>
      ) : null}

      {isOwner || isAdmin ? (
        <div className="mt-16 max-w-3xl border-t border-ink-hair/60 pt-8">
          <p className="text-[14px] text-ink-muted">
            U heeft dit event toegevoegd of bent admin. Klik twee keer om
            definitief te verwijderen.
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
