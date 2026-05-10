import "server-only";

import { CRM_INTEREST_OPTIONS, CRM_LEAD_STATUS_LABELS, CRM_LEAD_STATUSES } from "@/app/lib/crm";
import type { BusinessProfileRow, CrmLeadRow } from "@/app/lib/supabase";
import { getSupabaseAdmin } from "@/app/lib/supabase";

const INTEREST_LABEL = Object.fromEntries(CRM_INTEREST_OPTIONS.map((o) => [o.id, o.label])) as Record<
  string,
  string
>;

export type CommandCentreDashboard = {
  configured: boolean;
  error: string | null;
  leadsTotal: number;
  clientsTotal: number;
  pipelineOpen: number;
  recentLeads: CrmLeadRow[];
  activeClients: BusinessProfileRow[];
};

function empty(): CommandCentreDashboard {
  return {
    configured: false,
    error: null,
    leadsTotal: 0,
    clientsTotal: 0,
    pipelineOpen: 0,
    recentLeads: [],
    activeClients: [],
  };
}

/** Maps CRM `interested_in` ids to readable labels (comma-separated). */
export function formatInterestedServices(ids: string[] | null | undefined): string {
  if (!ids?.length) return "—";
  return ids.map((id) => INTEREST_LABEL[id] ?? id).join(", ");
}

export function formatLeadStatus(status: string): string {
  return CRM_LEAD_STATUS_LABELS[status as keyof typeof CRM_LEAD_STATUS_LABELS] ?? status;
}

const OPEN_PIPELINE_STATUSES = CRM_LEAD_STATUSES.filter((s) => s !== "won" && s !== "lost");

export async function loadCommandCentreDashboard(): Promise<CommandCentreDashboard> {
  const supabase = getSupabaseAdmin();
  if (!supabase) {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    return {
      ...empty(),
      error: url
        ? "Set SUPABASE_SERVICE_ROLE_KEY or SERVICE_ROLE_KEY for Command Centre stats."
        : "Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY (or SERVICE_ROLE_KEY).",
    };
  }

  const [
    leadsCountRes,
    clientsCountRes,
    pipelineRes,
    recentLeadsRes,
    clientsRes,
  ] = await Promise.all([
    supabase.from("leads").select("*", { count: "exact", head: true }),
    supabase
      .from("business_profiles")
      .select("*", { count: "exact", head: true })
      .eq("is_paying_customer", true),
    supabase.from("leads").select("*", { count: "exact", head: true }).in("status", OPEN_PIPELINE_STATUSES),
    supabase
      .from("leads")
      .select(
        "id, business_name, contact_person, phone, email, website_url, business_type, source, interested_in, status, next_follow_up_date, notes, converted_client_id, created_at, updated_at"
      )
      .order("created_at", { ascending: false })
      .limit(10),
    supabase
      .from("business_profiles")
      .select("id, client_id, business_name, email, phone, status, created_at, is_paying_customer")
      .eq("is_paying_customer", true)
      .order("created_at", { ascending: false })
      .limit(10),
  ]);

  const err =
    leadsCountRes.error?.message ||
    clientsCountRes.error?.message ||
    pipelineRes.error?.message ||
    recentLeadsRes.error?.message ||
    clientsRes.error?.message ||
    null;

  if (err) {
    return {
      ...empty(),
      configured: true,
      error: err,
    };
  }

  return {
    configured: true,
    error: null,
    leadsTotal: leadsCountRes.count ?? 0,
    clientsTotal: clientsCountRes.count ?? 0,
    pipelineOpen: pipelineRes.count ?? 0,
    recentLeads: (recentLeadsRes.data ?? []) as CrmLeadRow[],
    activeClients: (clientsRes.data ?? []) as BusinessProfileRow[],
  };
}
