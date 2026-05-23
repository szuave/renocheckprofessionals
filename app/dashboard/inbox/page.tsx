import type { Metadata } from "next";
import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/auth";
import {
  deleteContactMessage,
  deleteLead,
  deletePartnerApplication,
  listContactMessages,
  listLeads,
  listPartnerApplications,
  setApplicationStatus,
  setContactMessageStatus,
  type ContactMessage,
  type PartnerApplication,
} from "@/lib/queries";

export const metadata: Metadata = {
  title: "Inbox",
  robots: { index: false, follow: false },
};

async function updateApplicationStatusAction(formData: FormData) {
  "use server";
  await requireAdmin();
  const id = String(formData.get("id"));
  const status = String(formData.get("status")) as
    | PartnerApplication["status"]
    | "";
  if (!id) return;
  if (!["new", "contacted", "accepted", "declined"].includes(status)) return;
  setApplicationStatus(id, status as PartnerApplication["status"]);
  revalidatePath("/dashboard/inbox");
}

async function deleteApplicationAction(formData: FormData) {
  "use server";
  await requireAdmin();
  const id = String(formData.get("id"));
  if (!id) return;
  deletePartnerApplication(id);
  revalidatePath("/dashboard/inbox");
}

async function updateMessageStatusAction(formData: FormData) {
  "use server";
  await requireAdmin();
  const id = String(formData.get("id"));
  const status = String(formData.get("status")) as
    | ContactMessage["status"]
    | "";
  if (!id) return;
  if (!["new", "read", "closed"].includes(status)) return;
  setContactMessageStatus(id, status as ContactMessage["status"]);
  revalidatePath("/dashboard/inbox");
}

async function deleteMessageAction(formData: FormData) {
  "use server";
  await requireAdmin();
  const id = String(formData.get("id"));
  if (!id) return;
  deleteContactMessage(id);
  revalidatePath("/dashboard/inbox");
}

async function deleteLeadAction(formData: FormData) {
  "use server";
  await requireAdmin();
  const id = String(formData.get("id"));
  if (!id) return;
  deleteLead(id);
  revalidatePath("/dashboard/inbox");
}

const SUBJECT_LABELS: Record<ContactMessage["subject_type"], string> = {
  membership: "Lidmaatschap",
  videocall: "Videocall",
  question: "Algemene vraag",
  other: "Iets anders",
};

const STATUS_LABELS: Record<PartnerApplication["status"], string> = {
  new: "Nieuw",
  contacted: "Gecontacteerd",
  accepted: "Aanvaard",
  declined: "Afgewezen",
};

const MSG_STATUS_LABELS: Record<ContactMessage["status"], string> = {
  new: "Nieuw",
  read: "Gelezen",
  closed: "Afgesloten",
};

export default async function InboxPage() {
  await requireAdmin();

  const applications = listPartnerApplications();
  const messages = listContactMessages();
  const leads = listLeads();

  const newApplications = applications.filter((a) => a.status === "new").length;
  const newMessages = messages.filter((m) => m.status === "new").length;

  return (
    <article className="px-6 pb-20 pt-12 md:px-12 md:pb-28 md:pt-16 lg:px-20 lg:pt-20">
      <header>
        <p className="text-[14px] font-medium uppercase tracking-[0.28em] text-ink-muted">
          Inbox · admin
        </p>
        <h1 className="mt-4 font-display text-[clamp(2rem,4.5vw,3.5rem)] font-medium leading-[1.05] text-ink">
          Wat er{" "}
          <span className="italic text-sage">binnenkwam</span>.
        </h1>
        <p className="mt-6 max-w-xl text-[16px] leading-[1.65] text-ink-soft">
          Alle aanvragen, contactberichten en gids-downloads op één plek.
          Status bijwerken doe je per item.
        </p>
      </header>

      <div className="mt-10 grid gap-4 md:grid-cols-3">
        <Stat label="Nieuwe partneraanvragen" value={newApplications} />
        <Stat label="Nieuwe berichten" value={newMessages} />
        <Stat label="Leads totaal" value={leads.length} />
      </div>

      <section className="mt-16">
        <h2 className="font-display text-[28px] font-medium leading-[1.15] text-ink md:text-[32px]">
          Partneraanvragen
        </h2>
        {applications.length === 0 ? (
          <Empty text="Nog geen partneraanvragen." />
        ) : (
          <ul className="mt-8 space-y-4">
            {applications.map((a) => (
              <li
                key={a.id}
                className="rounded-2xl border border-ink-hair/60 bg-surface-soft/30 p-6"
              >
                <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between md:gap-6">
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-3">
                      <p className="font-display text-[22px] font-medium leading-tight text-ink">
                        {a.company}
                      </p>
                      <StatusPill status={a.status} />
                    </div>
                    <p className="mt-1 text-[13px] text-ink-muted">
                      {a.contact_name ? `${a.contact_name} · ` : ""}
                      <a
                        href={`mailto:${a.email}`}
                        className="font-medium text-ink-soft underline-offset-4 hover:text-sage hover:underline"
                      >
                        {a.email}
                      </a>
                      {a.phone ? ` · ${a.phone}` : ""}
                    </p>
                    <p className="mt-2 text-[13px] text-ink-muted">
                      {[
                        a.partner_type,
                        a.region ? capitalize(a.region) : null,
                        a.rubriek,
                      ]
                        .filter(Boolean)
                        .join(" · ") || "geen voorkeur"}
                    </p>
                    {a.message ? (
                      <p className="mt-4 max-w-3xl whitespace-pre-wrap text-[14px] leading-[1.7] text-ink">
                        {a.message}
                      </p>
                    ) : null}
                    <p className="mt-4 text-[11px] uppercase tracking-[0.28em] text-ink-muted">
                      {formatDate(a.created_at)}
                    </p>
                  </div>

                  <div className="flex shrink-0 flex-col gap-3 md:items-end">
                    <form action={updateApplicationStatusAction} className="flex gap-2">
                      <input type="hidden" name="id" value={a.id} />
                      <select
                        name="status"
                        defaultValue={a.status}
                        className="rounded-full border border-ink-hair/70 bg-white/70 px-4 py-2 text-[13px] text-ink"
                      >
                        {(["new", "contacted", "accepted", "declined"] as const).map(
                          (s) => (
                            <option key={s} value={s}>
                              {STATUS_LABELS[s]}
                            </option>
                          ),
                        )}
                      </select>
                      <button
                        type="submit"
                        className="rounded-full border border-ink-hair/70 bg-white/70 px-4 py-2 text-[13px] font-medium text-ink transition-colors hover:border-sage"
                      >
                        Opslaan
                      </button>
                    </form>
                    <form action={deleteApplicationAction}>
                      <input type="hidden" name="id" value={a.id} />
                      <button
                        type="submit"
                        className="rounded-full border border-ink-hair/70 bg-white/70 px-4 py-2 text-[13px] font-medium text-ink transition-colors hover:border-red-700/60 hover:text-red-800"
                      >
                        Verwijderen
                      </button>
                    </form>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="mt-20">
        <h2 className="font-display text-[28px] font-medium leading-[1.15] text-ink md:text-[32px]">
          Contactberichten
        </h2>
        {messages.length === 0 ? (
          <Empty text="Nog geen berichten." />
        ) : (
          <ul className="mt-8 space-y-4">
            {messages.map((m) => (
              <li
                key={m.id}
                className="rounded-2xl border border-ink-hair/60 bg-surface-soft/30 p-6"
              >
                <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between md:gap-6">
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-3">
                      <p className="font-display text-[22px] font-medium leading-tight text-ink">
                        {m.first_name}
                        {m.last_name ? ` ${m.last_name}` : ""}
                      </p>
                      <span className="rounded-full bg-sage/10 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.2em] text-sage">
                        {SUBJECT_LABELS[m.subject_type]}
                      </span>
                      <MsgStatusPill status={m.status} />
                    </div>
                    <p className="mt-1 text-[13px] text-ink-muted">
                      {m.company ? `${m.company} · ` : ""}
                      <a
                        href={`mailto:${m.email}`}
                        className="font-medium text-ink-soft underline-offset-4 hover:text-sage hover:underline"
                      >
                        {m.email}
                      </a>
                      {m.phone ? ` · ${m.phone}` : ""}
                    </p>
                    <p className="mt-4 max-w-3xl whitespace-pre-wrap text-[14px] leading-[1.7] text-ink">
                      {m.message}
                    </p>
                    <p className="mt-4 text-[11px] uppercase tracking-[0.28em] text-ink-muted">
                      {formatDate(m.created_at)}
                    </p>
                  </div>

                  <div className="flex shrink-0 flex-col gap-3 md:items-end">
                    <form action={updateMessageStatusAction} className="flex gap-2">
                      <input type="hidden" name="id" value={m.id} />
                      <select
                        name="status"
                        defaultValue={m.status}
                        className="rounded-full border border-ink-hair/70 bg-white/70 px-4 py-2 text-[13px] text-ink"
                      >
                        {(["new", "read", "closed"] as const).map((s) => (
                          <option key={s} value={s}>
                            {MSG_STATUS_LABELS[s]}
                          </option>
                        ))}
                      </select>
                      <button
                        type="submit"
                        className="rounded-full border border-ink-hair/70 bg-white/70 px-4 py-2 text-[13px] font-medium text-ink transition-colors hover:border-sage"
                      >
                        Opslaan
                      </button>
                    </form>
                    <form action={deleteMessageAction}>
                      <input type="hidden" name="id" value={m.id} />
                      <button
                        type="submit"
                        className="rounded-full border border-ink-hair/70 bg-white/70 px-4 py-2 text-[13px] font-medium text-ink transition-colors hover:border-red-700/60 hover:text-red-800"
                      >
                        Verwijderen
                      </button>
                    </form>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="mt-20">
        <h2 className="font-display text-[28px] font-medium leading-[1.15] text-ink md:text-[32px]">
          Gids-downloads & leads
        </h2>
        {leads.length === 0 ? (
          <Empty text="Nog geen downloads." />
        ) : (
          <div className="mt-8 overflow-hidden rounded-2xl border border-ink-hair/60">
            <table className="w-full text-left text-[14px]">
              <thead className="bg-surface-soft/60 text-[11px] uppercase tracking-[0.18em] text-ink-muted">
                <tr>
                  <th className="px-5 py-4 font-medium">Naam</th>
                  <th className="px-5 py-4 font-medium">E-mail</th>
                  <th className="px-5 py-4 font-medium">Regio</th>
                  <th className="px-5 py-4 font-medium">Bron</th>
                  <th className="px-5 py-4 font-medium">Datum</th>
                  <th className="px-5 py-4" />
                </tr>
              </thead>
              <tbody className="divide-y divide-ink-hair/50">
                {leads.map((l) => (
                  <tr key={l.id} className="align-top">
                    <td className="px-5 py-4 text-ink">
                      {[l.first_name, l.last_name].filter(Boolean).join(" ") ||
                        "—"}
                    </td>
                    <td className="px-5 py-4">
                      <a
                        href={`mailto:${l.email}`}
                        className="text-ink-soft underline-offset-4 hover:text-sage hover:underline"
                      >
                        {l.email}
                      </a>
                    </td>
                    <td className="px-5 py-4 text-ink-soft">
                      {l.region ? capitalize(l.region) : "—"}
                    </td>
                    <td className="px-5 py-4 text-ink-soft">{l.source}</td>
                    <td className="px-5 py-4 text-ink-muted">
                      {formatDate(l.created_at)}
                    </td>
                    <td className="px-5 py-4 text-right">
                      <form action={deleteLeadAction}>
                        <input type="hidden" name="id" value={l.id} />
                        <button
                          type="submit"
                          className="rounded-full border border-ink-hair/70 bg-white/70 px-3 py-1.5 text-[12px] font-medium text-ink transition-colors hover:border-red-700/60 hover:text-red-800"
                        >
                          Wis
                        </button>
                      </form>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </article>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-2xl border border-ink-hair/60 bg-surface-soft/30 p-5">
      <p className="text-[10px] font-medium uppercase tracking-[0.3em] text-ink-muted">
        {label}
      </p>
      <p className="mt-3 font-display text-[40px] font-medium leading-none text-ink">
        {value}
      </p>
    </div>
  );
}

function Empty({ text }: { text: string }) {
  return (
    <p className="mt-8 rounded-2xl border border-dashed border-ink-hair/70 p-8 text-center text-[15px] text-ink-muted">
      {text}
    </p>
  );
}

function StatusPill({ status }: { status: PartnerApplication["status"] }) {
  const map: Record<PartnerApplication["status"], string> = {
    new: "bg-sage/15 text-sage",
    contacted: "bg-amber-100 text-amber-800",
    accepted: "bg-green-100 text-green-800",
    declined: "bg-red-100 text-red-800",
  };
  return (
    <span
      className={`rounded-full px-3 py-1 text-[11px] font-medium uppercase tracking-[0.2em] ${map[status]}`}
    >
      {STATUS_LABELS[status]}
    </span>
  );
}

function MsgStatusPill({ status }: { status: ContactMessage["status"] }) {
  const map: Record<ContactMessage["status"], string> = {
    new: "bg-sage/15 text-sage",
    read: "bg-amber-100 text-amber-800",
    closed: "bg-ink/10 text-ink-soft",
  };
  return (
    <span
      className={`rounded-full px-3 py-1 text-[11px] font-medium uppercase tracking-[0.2em] ${map[status]}`}
    >
      {MSG_STATUS_LABELS[status]}
    </span>
  );
}

function capitalize(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1).replace(/-/g, " ");
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleString("nl-BE", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}
