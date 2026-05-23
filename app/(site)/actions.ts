"use server";

import { redirect } from "next/navigation";
import {
  createContactMessage,
  createLead,
  createPartnerApplication,
  type ContactMessage,
} from "@/lib/queries";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function trim(formData: FormData, key: string): string {
  return String(formData.get(key) ?? "").trim();
}

export async function submitPartnerApplication(formData: FormData) {
  const company = trim(formData, "company");
  const contact_name = trim(formData, "contact_name");
  const email = trim(formData, "email");
  const phone = trim(formData, "phone");
  const partner_type = trim(formData, "partner_type");
  const region = trim(formData, "region");
  const rubriek = trim(formData, "rubriek");
  const message = trim(formData, "message");

  if (!company || !email) {
    redirect("/?form=partner&error=missing");
  }
  if (!EMAIL_RE.test(email)) {
    redirect("/?form=partner&error=email");
  }

  createPartnerApplication({
    company,
    contact_name: contact_name || null,
    email,
    phone: phone || null,
    partner_type: partner_type || null,
    region: region || null,
    rubriek: rubriek || null,
    message: message || null,
  });

  redirect("/?form=partner&ok=1#partner-aanvraag");
}

export async function submitContactMessage(formData: FormData) {
  const subjectRaw = trim(formData, "subject_type");
  const subject_type: ContactMessage["subject_type"] = (
    ["membership", "videocall", "question", "other"].includes(subjectRaw)
      ? subjectRaw
      : "other"
  ) as ContactMessage["subject_type"];

  const first_name = trim(formData, "first_name");
  const last_name = trim(formData, "last_name");
  const company = trim(formData, "company");
  const email = trim(formData, "email");
  const phone = trim(formData, "phone");
  const message = trim(formData, "message");

  if (!first_name || !email || !message) {
    redirect("/contact?error=missing");
  }
  if (!EMAIL_RE.test(email)) {
    redirect("/contact?error=email");
  }

  createContactMessage({
    subject_type,
    first_name,
    last_name: last_name || null,
    company: company || null,
    email,
    phone: phone || null,
    message,
  });

  redirect("/contact?ok=1#contact-form");
}

export async function submitLead(formData: FormData) {
  const first_name = trim(formData, "first_name");
  const last_name = trim(formData, "last_name");
  const email = trim(formData, "email");
  const region = trim(formData, "region");
  const source = trim(formData, "source") || "homepage";
  const next = trim(formData, "next") || "/bouwers";

  if (!email) {
    redirect(`${next}?lead=missing#gids`);
  }
  if (!EMAIL_RE.test(email)) {
    redirect(`${next}?lead=email#gids`);
  }

  createLead({
    first_name: first_name || null,
    last_name: last_name || null,
    email,
    region: region || null,
    source,
  });

  redirect(`${next}?lead=ok#gids`);
}
