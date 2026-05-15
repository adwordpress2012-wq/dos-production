import "server-only";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import type { CrmLeadSource, CrmLeadStatus } from "./crm";

let cachedAdmin: SupabaseClient | null = null;

function trimEnv(v: string | undefined): string | undefined {
  if (v === undefined || v === null) return undefined;
  const t = String(v).trim();
  return t.length > 0 ? t : undefined;
}

/** Common bad values from mis-set Vercel / build env (string literals, placeholders). */
function isBadLiteralEnv(t: string): boolean {
  const lower = t.toLowerCase();
  return (
    lower === "undefined" ||
    lower === "null" ||
    lower === "[]" ||
    lower === "{}" ||
    lower === "your-anon-key" ||
    lower === "your-service-role-key"
  );
}

/**
 * Parse Supabase project URL for createClient.
 * Production: must be https. Local Supabase CLI: http://127.0.0.1 or http://localhost only.
 */
function parseSupabaseProjectUrl(raw: string | undefined): string | null {
  const candidate = trimEnv(raw);
  if (!candidate || isBadLiteralEnv(candidate)) return null;
  if (candidate.includes("your-project.supabase.co")) return null;

  const isHttps = candidate.startsWith("https://");
  const isLocalHttp =
    candidate.startsWith("http://127.0.0.1") || candidate.startsWith("http://localhost");
  if (!isHttps && !isLocalHttp) return null;

  try {
    const parsed = new URL(candidate);
    if (!parsed.hostname || parsed.hostname.length < 3) return null;
    const isLocalHost =
      parsed.hostname === "localhost" || parsed.hostname === "127.0.0.1";
    if (!isLocalHost && !parsed.hostname.includes(".")) return null;
    if (isLocalHttp && parsed.protocol !== "http:") return null;
    if (isHttps && parsed.protocol !== "https:") return null;
    return candidate.replace(/\/+$/, "");
  } catch {
    return null;
  }
}

function parseSecretKey(raw: string | undefined, minLength: number): string | null {
  const k = trimEnv(raw);
  if (!k || isBadLiteralEnv(k)) return null;
  if (k.length < minLength) return null;
  return k;
}

/**
 * Server-side Supabase client using the service role key. Bypasses RLS — use
 * only in server contexts (route handlers, server components, server actions).
 */
function getServiceRoleKeyRaw(): string | undefined {
  return process.env.SUPABASE_SERVICE_ROLE_KEY;
}

function getAnonKeyRaw(): string | undefined {
  return process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
}

export function getSupabaseAdmin(): SupabaseClient | null {
  if (cachedAdmin) return cachedAdmin;
  const url = parseSupabaseProjectUrl(process.env.NEXT_PUBLIC_SUPABASE_URL);
  const key = parseSecretKey(getServiceRoleKeyRaw(), 32);
  if (!url || !key) return null;
  try {
    cachedAdmin = createClient(url, key, {
      auth: { persistSession: false, autoRefreshToken: false },
    });
    return cachedAdmin;
  } catch (e) {
    console.error("[DOS Supabase] getSupabaseAdmin: createClient failed.", e);
    return null;
  }
}

/**
 * Server-side anon client — read-only public data. Useful for unauthenticated
 * server components that don't need to bypass RLS.
 */
export function getSupabaseAnon(): SupabaseClient | null {
  const url = parseSupabaseProjectUrl(process.env.NEXT_PUBLIC_SUPABASE_URL);
  const key = parseSecretKey(getAnonKeyRaw(), 32);
  if (!url || !key) return null;
  try {
    return createClient(url, key, {
      auth: { persistSession: false, autoRefreshToken: false },
    });
  } catch (e) {
    console.error("[DOS Supabase] getSupabaseAnon: createClient failed.", e);
    return null;
  }
}

/** True when anon or service-role key is present with a valid project URL (readiness / diagnostics). */
export function isSupabaseConfigured(): boolean {
  const url = parseSupabaseProjectUrl(process.env.NEXT_PUBLIC_SUPABASE_URL);
  if (!url) return false;
  const sr = parseSecretKey(getServiceRoleKeyRaw(), 32);
  const anon = parseSecretKey(getAnonKeyRaw(), 32);
  return Boolean(sr || anon);
}

/**
 * True when server can persist onboarding / admin data (requires service role + project URL).
 * Does not call createClient — safe for Server Components that only need a boolean.
 */
export function isSupabaseAdminPersistenceConfigured(): boolean {
  const url = parseSupabaseProjectUrl(process.env.NEXT_PUBLIC_SUPABASE_URL);
  const key = parseSecretKey(getServiceRoleKeyRaw(), 32);
  return Boolean(url && key);
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

/** @deprecated Use TenantPipelineLeadRow — alias for DOS HUB demo typing */
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
