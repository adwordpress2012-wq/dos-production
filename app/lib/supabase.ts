import "server-only";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import type { CrmLeadSource, CrmLeadStatus } from "./crm";

let cachedAdmin: SupabaseClient | null = null;

/** Trim and strip accidental wrapping quotes from Vercel / .env paste mistakes. */
function trimEnv(value: string | undefined): string | undefined {
  if (value === undefined || value === "") return undefined;
  let v = value.trim();
  if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) {
    v = v.slice(1, -1).trim();
  }
  return v === "" ? undefined : v;
}

/**
 * Accepts Supabase REST URL from Dashboard → Settings → API ("Project URL").
 * Tolerates bare host, quotes, accidental `.env` line paste, or host buried in text.
 */
function normalizeSupabaseUrl(raw: string | undefined): string | undefined {
  let v = trimEnv(raw);
  if (!v) return undefined;
  // Whole value pasted as `NEXT_PUBLIC_SUPABASE_URL=https://...`
  v = v.replace(/^NEXT_PUBLIC_SUPABASE_URL\s*=\s*/i, "").trim();
  v = v.replace(/\s+/g, " ").trim();

  const restHost = /^https:\/\/([\w.-]+\.supabase\.co)\/?$/i;
  const mRest = v.match(restHost);
  if (mRest) {
    return `https://${mRest[1].toLowerCase()}`;
  }

  const bareHost = /^([\w.-]+\.supabase\.co)$/i;
  const mBare = v.match(bareHost);
  if (mBare) {
    return `https://${mBare[1].toLowerCase()}`;
  }

  const embedded = v.match(/([\w.-]+\.supabase\.co)/i);
  if (embedded) {
    return `https://${embedded[1].toLowerCase()}`;
  }

  if (/^https?:\/\//i.test(v)) {
    try {
      const u = new URL(v);
      if (u.hostname.endsWith(".supabase.co")) {
        return `https://${u.hostname.toLowerCase()}`;
      }
    } catch {
      return undefined;
    }
  }

  return undefined;
}

/** Prefer Next.js public name; some dashboards export `SUPABASE_URL` only. */
function readPublicSupabaseUrl(): string | undefined {
  return trimEnv(process.env.NEXT_PUBLIC_SUPABASE_URL) ?? trimEnv(process.env.SUPABASE_URL);
}

/**
 * Server-side Supabase client using the service role key. Bypasses RLS — use
 * only in server contexts (route handlers, server components, server actions).
 */
function getServiceRoleKey(): string | undefined {
  return trimEnv(process.env.SUPABASE_SERVICE_ROLE_KEY) ?? trimEnv(process.env.SERVICE_ROLE_KEY);
}

function getAnonKey(): string | undefined {
  return trimEnv(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) ?? trimEnv(process.env.PUBLIC_SUPABASE_ANON_KEY);
}

export function getSupabaseAdmin(): SupabaseClient | null {
  if (cachedAdmin) return cachedAdmin;
  const url = normalizeSupabaseUrl(readPublicSupabaseUrl());
  const key = getServiceRoleKey();
  if (!url || !key) return null;
  try {
    cachedAdmin = createClient(url, key, {
      auth: { persistSession: false, autoRefreshToken: false },
    });
  } catch {
    return null;
  }
  return cachedAdmin;
}

/**
 * Server-side anon client — read-only public data. Useful for unauthenticated
 * server components that don't need to bypass RLS.
 */
export function getSupabaseAnon(): SupabaseClient | null {
  const url = normalizeSupabaseUrl(readPublicSupabaseUrl());
  const key = getAnonKey();
  if (!url || !key) return null;
  try {
    return createClient(url, key, {
      auth: { persistSession: false, autoRefreshToken: false },
    });
  } catch {
    return null;
  }
}

export function isSupabaseConfigured(): boolean {
  return Boolean(normalizeSupabaseUrl(readPublicSupabaseUrl()) && (getServiceRoleKey() || getAnonKey()));
}

export type TenantRow = {
  id: string;
  name: string;
  subdomain: string;
  status: "active" | "trialing" | "past_due" | "canceled" | "suspended";
  stripe_customer_id: string | null;
  created_at: string;
  updated_at: string;
};

/** Onboarding / Micah pipeline — table public.tenant_leads */
export type TenantPipelineLeadRow = {
  id: string;
  tenant_id: string;
  name: string;
  phone: string | null;
  property_address: string | null;
  summary: string | null;
  status: "new" | "contacted" | "qualified" | "disqualified" | "closed";
  created_at: string;
  updated_at: string;
};

/** @deprecated Use TenantPipelineLeadRow — alias for Command Centre demo typing */
export type LeadRow = TenantPipelineLeadRow;

/** DOS CRM — table public.leads */
export type CrmLeadRow = {
  id: string;
  business_name: string;
  contact_person: string;
  phone: string | null;
  email: string;
  website_url: string | null;
  business_type: string | null;
  source: CrmLeadSource;
  interested_in: string[];
  status: CrmLeadStatus;
  next_follow_up_date: string | null;
  notes: string | null;
  converted_client_id: string | null;
  created_at: string;
  updated_at: string;
};

/** Client profiles managed from /admin/clients → public.business_profiles */
export type BusinessProfileRow = {
  id: string;
  client_id: string;
  business_name: string;
  email: string;
  phone: string | null;
  status: string;
  created_at: string;
  is_paying_customer: boolean;
};
