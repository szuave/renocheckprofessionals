export type Role = "admin" | "partner";

export type User = {
  id: string;
  email: string;
  full_name: string | null;
  company: string | null;
  region: string | null;
  regions: string | null;
  rubriek: string | null;
  rubrieken: string | null;
  partner_type: string | null;
  slug: string | null;
  role: Role;
  created_at: string;
};

export type BlogPost = {
  id: string;
  author_id: string;
  title: string;
  excerpt: string | null;
  body: string;
  created_at: string;
  updated_at: string;
};

export type EventRow = {
  id: string;
  author_id: string;
  title: string;
  description: string | null;
  location: string | null;
  region: string | null;
  price_cents: string | null;
  starts_at: string;
  ends_at: string | null;
  created_at: string;
};
