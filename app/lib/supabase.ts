import "server-only";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import type { CrmLeadSource, CrmLeadStatus } from "./crm";

let cachedAdmin: SupabaseClient | null = null;

/**
 * Server-side Supabase client using the service role key. Bypasses RLS — use
 * only in server contexts (route handlers, server components, server actions).
 */
function getServiceRoleKey(): string | undefined {
  return process.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.SERVICE_ROLE_KEY;
}

function getAnonKey(): string | undefined {
  return process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? process.env.PUBLIC_SUPABASE_ANON_KEY;
}

export function getSupabaseAdmin(): SupabaseClient | null {
  if (cachedAdmin) return cachedAdmin;
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = getServiceRoleKey();
  if (!url || !key) return null;
  cachedAdmin = createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
  return cachedAdmin;
}

/**
 * Server-side anon client — read-only public data. Useful for unauthenticated
 * server components that don't need to bypass RLS.
 */
export function getSupabaseAnon(): SupabaseClient | null {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = getAnonKey();
  if (!url || !key) return null;
  return createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

export function isSupabaseConfigured(): boolean {
  return Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL && (getServiceRoleKey() || getAnonKey())
  );
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
