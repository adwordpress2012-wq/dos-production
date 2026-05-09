import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Target } from "lucide-react";
import { getSupabaseAdmin, type CrmLeadRow } from "@/app/lib/supabase";
import AddLeadForm from "./AddLeadForm";
import CrmLeadsTable from "./CrmLeadsTable";

export const metadata: Metadata = {
  title: "Leads",
  description: "DOS sales leads — add prospects before they become paying clients.",
};

export const dynamic = "force-dynamic";

async function loadLeads(): Promise<{
  configured: boolean;
  leads: CrmLeadRow[];
  error: string | null;
}> {
  const supabase = getSupabaseAdmin();
  if (!supabase) {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    return {
      configured: false,
      leads: [],
      error: url
        ? "Set SUPABASE_SERVICE_ROLE_KEY (server) for admin API access."
        : "Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY.",
    };
  }

  const { data, error } = await supabase
    .from("leads")
    .select(
      "id, business_name, contact_person, phone, email, website_url, business_type, source, interested_in, status, next_follow_up_date, notes, converted_client_id, created_at, updated_at"
    )
    .order("created_at", { ascending: false });

  if (error) {
    return {
      configured: true,
      leads: [],
      error: error.message,
    };
  }

  return {
    configured: true,
    leads: (data ?? []) as CrmLeadRow[],
    error: null,
  };
}

export default async function AdminLeadsPage() {
  const { configured, leads, error } = await loadLeads();

  return (
    <main className="relative pt-28 sm:pt-36 pb-16">
      <section className="mx-auto max-w-7xl px-6">
        <Link
          href="/command-centre"
          className="inline-flex items-center gap-2 text-sm text-ink-muted hover:text-white transition mb-8"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Command Centre
        </Link>

        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-500/10 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.2em] text-cyan-200">
              <Target className="h-3.5 w-3.5 text-cyan-300" />
              Pipeline
            </span>
            <h1 className="mt-4 text-3xl sm:text-4xl font-semibold tracking-tight leading-[1.05]">Leads</h1>
            <p className="mt-3 text-ink-muted max-w-2xl">
              Capture prospects here first. When they become paying customers, use{" "}
              <strong className="text-white/90">Convert to Client</strong> — that creates a row in{" "}
              <code className="text-xs font-mono text-violet-200/90">business_profiles</code> and marks the lead{" "}
              <span className="text-white/90">Won</span>. Paying clients appear under{" "}
              <Link href="/admin/clients" className="text-violet-300 hover:underline">
                Clients
              </Link>
              .
            </p>
          </div>
        </div>

        {!configured && (
          <div className="mt-8 rounded-2xl border border-violet-400/30 bg-violet-500/10 px-5 py-4 text-violet-100">
            <p className="text-sm font-semibold">Supabase admin client not available</p>
            <p className="mt-1 text-sm opacity-90 leading-relaxed">
              Configure service role env vars and run the CRM section of{" "}
              <code className="font-mono text-xs">supabase/schema.sql</code> or{" "}
              <code className="font-mono text-xs">supabase/migrations/006_dos_crm_leads.sql</code>.
            </p>
            {error && <p className="mt-3 text-sm font-mono text-violet-200/90 border-t border-white/10 pt-3">{error}</p>}
          </div>
        )}

        {configured && error && (
          <div className="mt-8 rounded-2xl border border-amber-400/30 bg-amber-400/10 px-5 py-4 text-amber-100">
            <p className="text-sm font-semibold">Could not load leads</p>
            <p className="mt-1 text-sm opacity-90 font-mono">{error}</p>
          </div>
        )}

        <div className="mt-10 glass-strong rounded-2xl p-6 sm:p-8">
          <h2 className="text-lg font-semibold tracking-tight mb-6">Add lead</h2>
          <AddLeadForm />
        </div>

        <div className="mt-8 glass-strong rounded-2xl overflow-hidden">
          <div className="flex items-center justify-between border-b border-white/5 px-5 py-4">
            <h2 className="text-sm font-semibold tracking-tight">All leads</h2>
            <span className="font-mono text-[10px] uppercase tracking-widest text-ink-dim">
              {leads.length} row{leads.length === 1 ? "" : "s"}
            </span>
          </div>
          <CrmLeadsTable leads={leads} />
        </div>
      </section>
    </main>
  );
}
