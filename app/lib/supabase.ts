import "server-only";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";

let cachedAdmin: SupabaseClient | null = null;

/**
 * Server-side Supabase client using the service role key. Bypasses RLS — use
 * only in server contexts (route handlers, server components, server actions).
 */
export function getSupabaseAdmin(): SupabaseClient | null {
  if (cachedAdmin) return cachedAdmin;
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
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
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return null;
  return createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

export function isSupabaseConfigured(): boolean {
  return Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
      (process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)
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

export type LeadRow = {
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
