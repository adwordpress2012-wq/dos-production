import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import {
  ArrowRight,
  ExternalLink,
  Headphones,
  LayoutDashboard,
  UserPlus,
  Users,
  Globe,
} from "lucide-react";

import {
  formatInterestedServices,
  formatLeadStatus,
  loadCommandCentreDashboard,
} from "@/app/lib/admin-dashboard";

export const metadata: Metadata = {
  title: "Overview · Command Centre",
  description: "DOS Command Centre — leads, clients, and pipeline at a glance.",
};

export const dynamic = "force-dynamic";

export default async function CommandCentreOverviewPage() {
  const dash = await loadCommandCentreDashboard();

  return (
    <main className="relative px-4 sm:px-6 py-8 sm:py-10 pb-20">
      <section className="mx-auto max-w-7xl space-y-10">
        <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-violet-400/25 bg-violet-500/10 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.2em] text-violet-200">
              <LayoutDashboard className="h-3.5 w-3.5 text-violet-300" />
              Overview
            </span>
            <h1 className="mt-4 text-3xl sm:text-4xl font-semibold tracking-tight leading-[1.05]">
              Command Centre
            </h1>
            <p className="mt-3 text-ink-muted max-w-2xl leading-relaxed">
              Real-time snapshot of your CRM pipeline and paying clients — wired to Supabase.
            </p>
          </div>
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-ink-muted hover:text-white transition shrink-0"
          >
            Back to DOS Website
            <ExternalLink className="h-4 w-4 opacity-70" />
          </Link>
        </header>

        {/* Quick actions */}
        <div>
          <h2 className="text-[11px] font-mono uppercase tracking-widest text-ink-dim mb-3">Quick actions</h2>
          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            <QuickAction
              href="/admin/leads#add-lead"
              title="Add Lead"
              hint="Create a pipeline prospect"
              icon={<UserPlus className="h-5 w-5" />}
            />
            <QuickAction
              href="/admin/clients#add-client"
              title="Add Client"
              hint="Paying customer profile"
              icon={<Users className="h-5 w-5" />}
            />
            <QuickAction
              href="/onboarding/website-rebuild"
              title="Website Onboarding"
              hint="Website rebuild intake form"
              icon={<Globe className="h-5 w-5" />}
            />
            <QuickAction
              href="/onboarding/micah"
              title="Micah Onboarding"
              hint="DOS stack · Micah-first setup"
              icon={<Headphones className="h-5 w-5" />}
            />
          </div>
        </div>

        {!dash.configured && dash.error && (
          <div className="rounded-2xl border border-violet-400/30 bg-violet-500/10 px-5 py-4 text-violet-100">
            <p className="text-sm font-semibold">Supabase not configured</p>
            <p className="mt-1 text-sm opacity-90 leading-relaxed">{dash.error}</p>
          </div>
        )}

        {dash.configured && dash.error && (
          <div className="rounded-2xl border border-amber-400/30 bg-amber-400/10 px-5 py-4 text-amber-100">
            <p className="text-sm font-semibold">Could not load dashboard data</p>
            <p className="mt-1 text-sm opacity-90 font-mono">{dash.error}</p>
          </div>
        )}

        {/* Stats */}
        <div>
          <h2 className="text-[11px] font-mono uppercase tracking-widest text-ink-dim mb-3">At a glance</h2>
          <div className="grid gap-4 sm:grid-cols-3">
            <StatCard label="TOTAL LEADS" value={dash.leadsTotal} tone="violet" href="/admin/leads" />
            <StatCard label="ACTIVE CLIENTS" value={dash.clientsTotal} tone="emerald" href="/admin/clients" />
            <StatCard
              label="OPEN PIPELINE"
              value={dash.pipelineOpen}
              tone="cyan"
              hint="Active CRM stages (not won / lost)"
              href="/admin/leads"
            />
          </div>
        </div>

        {/* Active clients */}
        <div className="glass-strong rounded-2xl overflow-hidden border border-white/10">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between border-b border-white/5 px-5 py-4">
            <div>
              <h2 className="text-lg font-semibold tracking-tight">Active clients</h2>
              <p className="text-xs text-ink-muted mt-0.5">Paying customers · latest first</p>
            </div>
            <Link
              href="/admin/clients"
              className="inline-flex items-center gap-1 text-sm font-semibold text-violet-300 hover:text-violet-200"
            >
              View all
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          {dash.activeClients.length === 0 ? (
            <div className="px-5 py-12 text-center text-sm text-ink-muted">
              No active clients yet — convert a lead or{" "}
              <Link href="/admin/clients#add-client" className="text-violet-300 hover:underline">
                add a client
              </Link>
              .
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="text-[10px] font-mono uppercase tracking-widest text-ink-dim">
                  <tr>
                    <th className="text-left px-5 py-2.5 font-medium">Business</th>
                    <th className="text-left px-5 py-2.5 font-medium">Email</th>
                    <th className="text-left px-5 py-2.5 font-medium">Status</th>
                    <th className="text-left px-5 py-2.5 font-medium">Created</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {dash.activeClients.map((p) => (
                    <tr key={p.id} className="hover:bg-white/[0.02] transition">
                      <td className="px-5 py-3 font-medium text-white">{p.business_name}</td>
                      <td className="px-5 py-3 text-xs text-ink-muted">{p.email}</td>
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

        {/* Recent leads */}
        <div className="glass-strong rounded-2xl overflow-hidden border border-white/10">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between border-b border-white/5 px-5 py-4">
            <div>
              <h2 className="text-lg font-semibold tracking-tight">Recent leads</h2>
              <p className="text-xs text-ink-muted mt-0.5">Newest pipeline entries</p>
            </div>
            <Link
              href="/admin/leads"
              className="inline-flex items-center gap-1 text-sm font-semibold text-violet-300 hover:text-violet-200"
            >
              Open CRM
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          {dash.recentLeads.length === 0 ? (
            <div className="px-5 py-12 text-center text-sm text-ink-muted">
              No leads yet —{" "}
              <Link href="/admin/leads#add-lead" className="text-violet-300 hover:underline">
                add your first lead
              </Link>
              .
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="text-[10px] font-mono uppercase tracking-widest text-ink-dim">
                  <tr>
                    <th className="text-left px-5 py-2.5 font-medium">Business</th>
                    <th className="text-left px-5 py-2.5 font-medium">Contact</th>
                    <th className="text-left px-5 py-2.5 font-medium">Status</th>
                    <th className="text-left px-5 py-2.5 font-medium">Interested</th>
                    <th className="text-left px-5 py-2.5 font-medium">Created</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {dash.recentLeads.map((lead) => (
                    <tr key={lead.id} className="hover:bg-white/[0.02] transition">
                      <td className="px-5 py-3 font-medium text-white">{lead.business_name}</td>
                      <td className="px-5 py-3 text-xs text-ink-muted">{lead.contact_person}</td>
                      <td className="px-5 py-3">
                        <span className="inline-flex items-center rounded-md border border-cyan-400/15 bg-cyan-400/10 px-2 py-0.5 text-[10px] font-semibold tracking-wider uppercase text-cyan-200/90">
                          {formatLeadStatus(lead.status)}
                        </span>
                      </td>
                      <td className="px-5 py-3 text-xs text-ink-muted max-w-[220px]">
                        {formatInterestedServices(lead.interested_in)}
                      </td>
                      <td className="px-5 py-3 text-xs text-ink-muted whitespace-nowrap">
                        {new Date(lead.created_at).toLocaleDateString("en-AU", {
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

function QuickAction({
  href,
  title,
  hint,
  icon,
}: {
  href: string;
  title: string;
  hint: string;
  icon: ReactNode;
}) {
  return (
    <Link
      href={href}
      className="group glass-strong rounded-2xl p-4 sm:p-5 transition flex flex-col gap-2 border border-white/10 hover:border-violet-400/35 hover:bg-violet-500/[0.06]"
    >
      <span className="inline-flex items-center gap-3 text-sm font-semibold text-white">
        <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 border border-white/10 text-violet-200 group-hover:text-white transition">
          {icon}
        </span>
        {title}
      </span>
      <span className="text-xs text-ink-muted leading-snug pl-[52px]">{hint}</span>
    </Link>
  );
}

function StatCard({
  label,
  value,
  tone,
  hint,
  href,
}: {
  label: string;
  value: number;
  tone: "violet" | "cyan" | "emerald";
  hint?: string;
  href: string;
}) {
  const dot =
    tone === "violet"
      ? "bg-violet-400 shadow-[0_0_12px_2px_rgba(168,85,247,0.7)]"
      : tone === "cyan"
        ? "bg-cyan-400 shadow-[0_0_12px_2px_rgba(34,211,238,0.7)]"
        : "bg-emerald-400 shadow-[0_0_12px_2px_rgba(52,247,193,0.7)]";
  return (
    <Link
      href={href}
      className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 hover:border-white/20 hover:bg-white/[0.05] transition block"
    >
      <div className="flex items-center justify-between gap-2">
        <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-[0.12em] text-ink-dim">{label}</span>
        <span className={`h-1.5 w-1.5 rounded-full shrink-0 ${dot}`} />
      </div>
      <div className="mt-3 flex items-baseline gap-2">
        <span className="text-3xl font-semibold tracking-tight tabular-nums">{value}</span>
      </div>
      {hint ? <p className="mt-2 text-[11px] text-ink-muted">{hint}</p> : null}
    </Link>
  );
}
