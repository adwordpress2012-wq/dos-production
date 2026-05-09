import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Users } from "lucide-react";
import CommandCentreQuickLinks from "@/app/admin/CommandCentreQuickLinks";
import { getSupabaseAdmin, type BusinessProfileRow } from "@/app/lib/supabase";
import AddClientForm from "./AddClientForm";

export const metadata: Metadata = {
  title: "Clients",
  description: "Create and manage DOS client profiles in Supabase.",
};

export const dynamic = "force-dynamic";

async function loadProfiles(): Promise<{
  configured: boolean;
  profiles: BusinessProfileRow[];
  error: string | null;
}> {
  const supabase = getSupabaseAdmin();
  if (!supabase) {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    return {
      configured: false,
      profiles: [],
      error: url
        ? "Set SUPABASE_SERVICE_ROLE_KEY (server) so admin routes can read/write business_profiles (service role bypasses RLS)."
        : "Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY.",
    };
  }

  const { data, error } = await supabase
    .from("business_profiles")
    .select("id, client_id, business_name, email, phone, status, created_at, is_paying_customer")
    .eq("is_paying_customer", true)
    .order("created_at", { ascending: false });

  if (error) {
    return {
      configured: true,
      profiles: [],
      error: error.message,
    };
  }

  return {
    configured: true,
    profiles: (data ?? []) as BusinessProfileRow[],
    error: null,
  };
}

export default async function AdminClientsPage() {
  const { configured, profiles, error } = await loadProfiles();

  return (
    <main className="relative pt-32 sm:pt-40 pb-16">
      <section className="mx-auto max-w-4xl px-6">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-ink-muted hover:text-white transition mb-8"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to DOS Website
        </Link>

        <CommandCentreQuickLinks active="clients" />

        <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-violet-400/20 bg-violet-500/10 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.2em] text-violet-200">
              <Users className="h-3.5 w-3.5 text-violet-300" />
              Admin
            </span>
            <h1 className="mt-4 text-3xl sm:text-4xl font-semibold tracking-tight leading-[1.05]">
              Clients
            </h1>
            <p className="mt-3 text-ink-muted max-w-xl">
              Paying customers only — typically created when you{" "}
              <Link href="/admin/leads" className="text-violet-300 hover:underline">
                convert a lead
              </Link>
              . Manual adds appear here only if you mark them as paying. Uses{" "}
              <code className="text-xs font-mono text-violet-200/90">business_profiles.is_paying_customer</code>.
            </p>
          </div>
        </div>

        {!configured && (
          <div className="mt-8 rounded-2xl border border-violet-400/30 bg-violet-500/10 px-5 py-4 text-violet-100">
            <p className="text-sm font-semibold">Supabase admin client not available</p>
            <p className="mt-1 text-sm opacity-90 leading-relaxed">
              In Vercel → Settings → Environment Variables, set{" "}
              <code className="font-mono text-xs">NEXT_PUBLIC_SUPABASE_URL</code> and{" "}
              <code className="font-mono text-xs">SUPABASE_SERVICE_ROLE_KEY</code> for Production (and Preview if you
              test there). Use <code className="font-mono text-xs">NEXT_PUBLIC_SUPABASE_ANON_KEY</code> for any
              browser-side reads only — inserts from this page go through the API with the service role. Apply the{" "}
              <code className="font-mono text-xs">business_profiles</code> section in{" "}
              <code className="font-mono text-xs">supabase/schema.sql</code> in the Supabase SQL editor if the table is
              missing.
            </p>
            {error && (
              <p className="mt-3 text-sm font-mono text-violet-200/90 border-t border-white/10 pt-3">{error}</p>
            )}
          </div>
        )}

        {configured && error && (
          <div className="mt-8 rounded-2xl border border-amber-400/30 bg-amber-400/10 px-5 py-4 text-amber-100">
            <p className="text-sm font-semibold">Could not load clients</p>
            <p className="mt-1 text-sm opacity-90 font-mono">{error}</p>
          </div>
        )}

        <div className="mt-10 glass-strong rounded-2xl p-6 sm:p-8">
          <h2 className="text-lg font-semibold tracking-tight mb-6">Add client</h2>
          <AddClientForm />
        </div>

        <div className="mt-8 glass-strong rounded-2xl overflow-hidden">
          <div className="flex items-center justify-between border-b border-white/5 px-5 py-4">
            <h2 className="text-sm font-semibold tracking-tight">All clients</h2>
            <span className="font-mono text-[10px] uppercase tracking-widest text-ink-dim">
              {profiles.length} row{profiles.length === 1 ? "" : "s"}
            </span>
          </div>
          {profiles.length === 0 ? (
            <div className="px-5 py-10 text-center text-sm text-ink-muted">
              No clients yet — add one above.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="text-[10px] font-mono uppercase tracking-widest text-ink-dim">
                  <tr>
                    <th className="text-left px-5 py-2.5 font-medium">Business</th>
                    <th className="text-left px-5 py-2.5 font-medium">Client ID</th>
                    <th className="text-left px-5 py-2.5 font-medium">Email</th>
                    <th className="text-left px-5 py-2.5 font-medium">Phone</th>
                    <th className="text-left px-5 py-2.5 font-medium">Status</th>
                    <th className="text-left px-5 py-2.5 font-medium">Created</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {profiles.map((p) => (
                    <tr key={p.id} className="hover:bg-white/[0.02] transition">
                      <td className="px-5 py-3 font-medium text-white">{p.business_name}</td>
                      <td className="px-5 py-3 font-mono text-xs text-ink-muted">{p.client_id}</td>
                      <td className="px-5 py-3 text-xs text-ink-muted">{p.email}</td>
                      <td className="px-5 py-3 font-mono text-xs text-ink-muted">{p.phone ?? "—"}</td>
                      <td className="px-5 py-3">
                        <span className="inline-flex items-center rounded-md border border-white/10 bg-white/[0.04] px-2 py-0.5 text-[10px] font-semibold tracking-wider uppercase text-ink-muted">
                          {p.status}
                        </span>
                      </td>
                      <td className="px-5 py-3 text-xs text-ink-muted">
                        {new Date(p.created_at).toLocaleDateString("en-AU", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
