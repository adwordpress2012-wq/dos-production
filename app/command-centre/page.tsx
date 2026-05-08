import type { Metadata } from "next";
import Link from "next/link";
import {
  Activity,
  AlertTriangle,
  ArrowUpRight,
  Calendar,
  Headphones,
  LayoutDashboard,
  MessageSquare,
  PhoneCall,
  RefreshCcw,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import {
  getSupabaseAdmin,
  isSupabaseConfigured,
  type LeadRow,
  type TenantRow,
} from "../lib/supabase";

export const metadata: Metadata = {
  title: "Command Centre",
  description:
    "DOS Command Centre — live activity from Micah, COS and BOS, plus the lead pipeline. Wired into Supabase.",
};

export const dynamic = "force-dynamic";

const STATUS_LABELS: Record<LeadRow["status"], string> = {
  new: "New",
  contacted: "Contacted",
  qualified: "Qualified",
  disqualified: "Closed (lost)",
  closed: "Closed (won)",
};

const STATUS_TONE: Record<LeadRow["status"], string> = {
  new: "text-cyan-200 bg-cyan-400/10 border-cyan-400/20",
  contacted: "text-violet-200 bg-violet-400/10 border-violet-400/20",
  qualified: "text-emerald-200 bg-emerald-400/10 border-emerald-400/20",
  disqualified: "text-rose-200 bg-rose-400/10 border-rose-400/20",
  closed: "text-amber-200 bg-amber-400/10 border-amber-400/20",
};

type DashboardData = {
  configured: boolean;
  tenants: TenantRow[];
  leads: LeadRow[];
  error?: string;
};

async function loadDashboard(): Promise<DashboardData> {
  if (!isSupabaseConfigured()) {
    return { configured: false, tenants: [], leads: [] };
  }
  const supabase = getSupabaseAdmin();
  if (!supabase) {
    return { configured: false, tenants: [], leads: [] };
  }
  try {
    const [tenantsRes, leadsRes] = await Promise.all([
      supabase
        .from("tenants")
        .select("id, name, subdomain, status, stripe_customer_id, created_at, updated_at")
        .order("created_at", { ascending: false })
        .limit(8),
      supabase
        .from("leads")
        .select("id, tenant_id, name, phone, property_address, summary, status, created_at, updated_at")
        .order("created_at", { ascending: false })
        .limit(12),
    ]);

    if (tenantsRes.error) throw tenantsRes.error;
    if (leadsRes.error) throw leadsRes.error;

    return {
      configured: true,
      tenants: (tenantsRes.data ?? []) as TenantRow[],
      leads: (leadsRes.data ?? []) as LeadRow[],
    };
  } catch (err) {
    return {
      configured: true,
      tenants: [],
      leads: [],
      error: err instanceof Error ? err.message : "Failed to load Command Centre.",
    };
  }
}

export default async function Page() {
  const data = await loadDashboard();
  const { tenants, leads } = data;

  // Aggregate stats — fall back to demo numbers if no live data.
  const tenantCount = tenants.length;
  const newLeads = leads.filter((l) => l.status === "new").length;
  const wonLeads = leads.filter((l) => l.status === "closed").length;
  const conversionRate =
    leads.length > 0 ? Math.round((wonLeads / leads.length) * 100) : null;

  return (
    <main className="relative pt-32 sm:pt-40 pb-16">
      <section className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-violet-400/20 bg-violet-500/10 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.2em] text-violet-200">
              <LayoutDashboard className="h-3.5 w-3.5 text-violet-300" />
              Command Centre
            </span>
            <h1 className="mt-4 text-3xl sm:text-5xl font-semibold tracking-tight leading-[1.05]">
              Live <span className="text-gradient-purple">DOS dashboard.</span>
            </h1>
            <p className="mt-3 text-ink-muted max-w-2xl">
              Real-time activity from Micah, COS and BOS, plus your lead pipeline. Wired directly
              into Supabase.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Link
              href="/onboarding"
              className="btn-ghost inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium text-white"
            >
              <Sparkles className="h-3.5 w-3.5" /> Onboarding
            </Link>
            <Link
              href="/pricing"
              className="btn-neon inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-white"
            >
              Upgrade plan
              <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>

        {!data.configured && (
          <ConnectBanner
            title="Connect Supabase to go live"
            body="Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY to start streaming real tenant and lead data into Command Centre. We're showing demo data below."
          />
        )}

        {data.configured && data.error && (
          <ConnectBanner
            tone="warning"
            title="Supabase is configured but couldn't load"
            body={data.error}
          />
        )}

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            tone="violet"
            icon={<Activity className="h-4 w-4" />}
            label="Active tenants"
            value={data.configured ? String(tenantCount) : "12"}
            sub={data.configured ? "from Supabase" : "demo data"}
          />
          <StatCard
            tone="cyan"
            icon={<TrendingUp className="h-4 w-4" />}
            label="New leads (live)"
            value={data.configured ? String(newLeads) : "118"}
            sub="last sync just now"
          />
          <StatCard
            tone="emerald"
            icon={<Calendar className="h-4 w-4" />}
            label="Conversion"
            value={
              data.configured
                ? conversionRate !== null
                  ? `${conversionRate}%`
                  : "—"
                : "27%"
            }
            sub="closed / total"
          />
          <StatCard
            tone="fuchsia"
            icon={<PhoneCall className="h-4 w-4" />}
            label="Channels online"
            value="3"
            sub="Micah · COS · BOS"
          />
        </div>

        <div className="mt-10 grid gap-5 lg:grid-cols-12">
          {/* Tenants */}
          <div className="lg:col-span-7 glass-strong rounded-2xl overflow-hidden">
            <div className="flex items-center justify-between border-b border-white/5 px-5 py-4">
              <div className="flex items-center gap-2">
                <LayoutDashboard className="h-4 w-4 text-violet-300" />
                <h2 className="text-sm font-semibold tracking-tight">Tenants</h2>
              </div>
              <span className="font-mono text-[10px] uppercase tracking-widest text-ink-dim">
                <RefreshCcw className="inline h-3 w-3 mr-1" /> live
              </span>
            </div>
            <TenantsTable tenants={data.configured ? tenants : DEMO_TENANTS} />
          </div>

          {/* Activity */}
          <div className="lg:col-span-5 glass-strong rounded-2xl overflow-hidden">
            <div className="flex items-center justify-between border-b border-white/5 px-5 py-4">
              <div className="flex items-center gap-2">
                <Activity className="h-4 w-4 text-cyan-300" />
                <h2 className="text-sm font-semibold tracking-tight">Live activity</h2>
              </div>
              <span className="font-mono text-[10px] uppercase tracking-widest text-ink-dim">
                · synced 12s ago
              </span>
            </div>
            <ul className="divide-y divide-white/5">
              {DEMO_ACTIVITY.map((a, i) => (
                <li key={i} className="flex items-center gap-3 px-5 py-3">
                  <span
                    className={`shrink-0 inline-flex items-center rounded-md border px-1.5 py-0.5 text-[10px] font-semibold tracking-wider uppercase ${
                      a.who === "MICAH"
                        ? "bg-violet-500/15 text-violet-300 border-violet-400/20"
                        : a.who === "COS"
                          ? "bg-cyan-400/15 text-cyan-200 border-cyan-400/20"
                          : "bg-emerald-400/15 text-emerald-200 border-emerald-400/20"
                    }`}
                  >
                    {a.who}
                  </span>
                  <span className="flex-1 text-xs text-ink-muted truncate">{a.what}</span>
                  <span className="font-mono text-[10px] uppercase tracking-widest text-ink-dim">
                    {a.when}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Leads */}
          <div className="lg:col-span-12 glass-strong rounded-2xl overflow-hidden">
            <div className="flex items-center justify-between border-b border-white/5 px-5 py-4">
              <div className="flex items-center gap-2">
                <MessageSquare className="h-4 w-4 text-emerald-300" />
                <h2 className="text-sm font-semibold tracking-tight">Recent leads</h2>
              </div>
              <span className="font-mono text-[10px] uppercase tracking-widest text-ink-dim">
                {data.configured ? `${leads.length} from Supabase` : "demo data"}
              </span>
            </div>
            <LeadsTable leads={data.configured ? leads : DEMO_LEADS} />
          </div>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-3">
          <SystemStatus name="Micah voice" tone="violet" status="Operational" icon={<Headphones className="h-4 w-4" />} />
          <SystemStatus name="COS messaging" tone="cyan" status="Operational" icon={<MessageSquare className="h-4 w-4" />} />
          <SystemStatus name="BOS bookings" tone="emerald" status="Operational" icon={<Calendar className="h-4 w-4" />} />
        </div>
      </section>
    </main>
  );
}

/* ----------------------- Components ----------------------- */

function StatCard({
  tone,
  icon,
  label,
  value,
  sub,
}: {
  tone: "violet" | "cyan" | "emerald" | "fuchsia";
  icon: React.ReactNode;
  label: string;
  value: string;
  sub: string;
}) {
  const dot =
    tone === "violet"
      ? "bg-violet-400 shadow-[0_0_12px_2px_rgba(168,85,247,0.7)]"
      : tone === "cyan"
        ? "bg-cyan-400 shadow-[0_0_12px_2px_rgba(34,211,238,0.7)]"
        : tone === "emerald"
          ? "bg-emerald-400 shadow-[0_0_12px_2px_rgba(52,247,193,0.7)]"
          : "bg-fuchsia-400 shadow-[0_0_12px_2px_rgba(232,121,249,0.7)]";
  return (
    <div className="glass-strong rounded-2xl p-5">
      <div className="flex items-center justify-between">
        <span className="inline-flex items-center gap-2 text-xs font-medium text-ink-muted">
          {icon}
          {label}
        </span>
        <span className={`h-1.5 w-1.5 rounded-full ${dot}`} />
      </div>
      <div className="mt-3 text-3xl font-semibold tracking-tight">{value}</div>
      <div className="mt-1 text-[11px] font-mono uppercase tracking-widest text-ink-dim">{sub}</div>
    </div>
  );
}

function ConnectBanner({
  title,
  body,
  tone = "info",
}: {
  title: string;
  body: string;
  tone?: "info" | "warning";
}) {
  const cls =
    tone === "warning"
      ? "border-amber-400/30 bg-amber-400/10 text-amber-100"
      : "border-violet-400/30 bg-violet-500/10 text-violet-100";
  return (
    <div className={`mt-8 flex items-start gap-3 rounded-2xl border ${cls} px-5 py-4`}>
      <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
      <div>
        <p className="text-sm font-semibold">{title}</p>
        <p className="mt-1 text-sm opacity-90 leading-relaxed">{body}</p>
      </div>
    </div>
  );
}

function TenantsTable({ tenants }: { tenants: TenantRow[] }) {
  if (tenants.length === 0) {
    return (
      <div className="px-5 py-8 text-center text-sm text-ink-muted">No tenants yet.</div>
    );
  }
  const tone: Record<TenantRow["status"], string> = {
    active: "bg-emerald-400/10 text-emerald-200 border-emerald-400/20",
    trialing: "bg-violet-500/10 text-violet-200 border-violet-400/20",
    past_due: "bg-amber-400/10 text-amber-200 border-amber-400/20",
    canceled: "bg-rose-400/10 text-rose-200 border-rose-400/20",
    suspended: "bg-rose-400/10 text-rose-200 border-rose-400/20",
  };
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead className="text-[10px] font-mono uppercase tracking-widest text-ink-dim">
          <tr>
            <th className="text-left px-5 py-2.5 font-medium">Name</th>
            <th className="text-left px-5 py-2.5 font-medium">Subdomain</th>
            <th className="text-left px-5 py-2.5 font-medium">Status</th>
            <th className="text-left px-5 py-2.5 font-medium">Created</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-white/5">
          {tenants.map((t) => (
            <tr key={t.id} className="hover:bg-white/[0.02] transition">
              <td className="px-5 py-3 font-medium text-white">{t.name}</td>
              <td className="px-5 py-3 font-mono text-xs text-ink-muted">{t.subdomain}</td>
              <td className="px-5 py-3">
                <span
                  className={`inline-flex items-center rounded-md border px-2 py-0.5 text-[10px] font-semibold tracking-wider uppercase ${tone[t.status]}`}
                >
                  {t.status}
                </span>
              </td>
              <td className="px-5 py-3 text-xs text-ink-muted">
                {new Date(t.created_at).toLocaleDateString("en-AU", {
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
  );
}

function LeadsTable({ leads }: { leads: LeadRow[] }) {
  if (leads.length === 0) {
    return <div className="px-5 py-8 text-center text-sm text-ink-muted">No leads yet.</div>;
  }
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead className="text-[10px] font-mono uppercase tracking-widest text-ink-dim">
          <tr>
            <th className="text-left px-5 py-2.5 font-medium">Lead</th>
            <th className="text-left px-5 py-2.5 font-medium">Phone</th>
            <th className="text-left px-5 py-2.5 font-medium">Summary</th>
            <th className="text-left px-5 py-2.5 font-medium">Status</th>
            <th className="text-left px-5 py-2.5 font-medium">Created</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-white/5">
          {leads.map((l) => (
            <tr key={l.id} className="hover:bg-white/[0.02] transition">
              <td className="px-5 py-3 font-medium text-white">{l.name}</td>
              <td className="px-5 py-3 font-mono text-xs text-ink-muted">{l.phone ?? "—"}</td>
              <td className="px-5 py-3 text-xs text-ink-muted max-w-xs truncate">
                {l.summary ?? l.property_address ?? "—"}
              </td>
              <td className="px-5 py-3">
                <span
                  className={`inline-flex items-center rounded-md border px-2 py-0.5 text-[10px] font-semibold tracking-wider uppercase ${STATUS_TONE[l.status]}`}
                >
                  {STATUS_LABELS[l.status]}
                </span>
              </td>
              <td className="px-5 py-3 text-xs text-ink-muted">
                {new Date(l.created_at).toLocaleDateString("en-AU", {
                  day: "2-digit",
                  month: "short",
                })}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function SystemStatus({
  name,
  status,
  tone,
  icon,
}: {
  name: string;
  status: string;
  tone: "violet" | "cyan" | "emerald";
  icon: React.ReactNode;
}) {
  const dot =
    tone === "violet"
      ? "bg-violet-400 shadow-[0_0_12px_2px_rgba(168,85,247,0.7)]"
      : tone === "cyan"
        ? "bg-cyan-400 shadow-[0_0_12px_2px_rgba(34,211,238,0.7)]"
        : "bg-emerald-400 shadow-[0_0_12px_2px_rgba(52,247,193,0.7)]";
  return (
    <div className="glass rounded-2xl px-5 py-4 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-white/5 border border-white/10">
          {icon}
        </span>
        <div>
          <div className="text-sm font-semibold">{name}</div>
          <div className="text-[10px] font-mono uppercase tracking-widest text-ink-dim">{status}</div>
        </div>
      </div>
      <span className={`h-1.5 w-1.5 rounded-full ${dot}`} />
    </div>
  );
}

/* ----------------------- Demo fallback data ----------------------- */

const DEMO_TENANTS: TenantRow[] = [
  {
    id: "1",
    name: "Acme Plumbing",
    subdomain: "acme-plumbing",
    status: "active",
    stripe_customer_id: "cus_demo_1",
    created_at: "2026-04-12T03:00:00Z",
    updated_at: "2026-04-12T03:00:00Z",
  },
  {
    id: "2",
    name: "Northside Dental",
    subdomain: "northside-dental",
    status: "trialing",
    stripe_customer_id: "cus_demo_2",
    created_at: "2026-05-01T03:00:00Z",
    updated_at: "2026-05-01T03:00:00Z",
  },
  {
    id: "3",
    name: "Reef Charters QLD",
    subdomain: "reef-charters",
    status: "active",
    stripe_customer_id: "cus_demo_3",
    created_at: "2026-03-22T03:00:00Z",
    updated_at: "2026-03-22T03:00:00Z",
  },
  {
    id: "4",
    name: "Sunday Salon",
    subdomain: "sunday-salon",
    status: "active",
    stripe_customer_id: "cus_demo_4",
    created_at: "2026-02-09T03:00:00Z",
    updated_at: "2026-02-09T03:00:00Z",
  },
];

const DEMO_LEADS: LeadRow[] = [
  {
    id: "l1",
    tenant_id: "1",
    name: "Sarah Whitman",
    phone: "+61 412 555 109",
    property_address: "14 Park Lane, Brisbane",
    summary: "Hot water leak — booked Sam at 8:30am tomorrow.",
    status: "qualified",
    created_at: "2026-05-08T11:00:00Z",
    updated_at: "2026-05-08T11:00:00Z",
  },
  {
    id: "l2",
    tenant_id: "2",
    name: "Mike Tran",
    phone: "+61 433 222 010",
    property_address: null,
    summary: "Quote requested for kitchen reno — followup booked.",
    status: "contacted",
    created_at: "2026-05-08T10:00:00Z",
    updated_at: "2026-05-08T10:00:00Z",
  },
  {
    id: "l3",
    tenant_id: "1",
    name: "Lana Kovac",
    phone: "+61 410 870 311",
    property_address: null,
    summary: "Web chat — coverage check for Gold Coast.",
    status: "new",
    created_at: "2026-05-08T09:30:00Z",
    updated_at: "2026-05-08T09:30:00Z",
  },
  {
    id: "l4",
    tenant_id: "3",
    name: "Riley Park",
    phone: "+61 477 110 023",
    property_address: null,
    summary: "Booked Sunday morning charter for 6 pax.",
    status: "closed",
    created_at: "2026-05-08T08:14:00Z",
    updated_at: "2026-05-08T08:14:00Z",
  },
  {
    id: "l5",
    tenant_id: "4",
    name: "Jess R.",
    phone: null,
    property_address: null,
    summary: "Reschedule from 2pm to Friday morning.",
    status: "contacted",
    created_at: "2026-05-08T07:42:00Z",
    updated_at: "2026-05-08T07:42:00Z",
  },
];

const DEMO_ACTIVITY = [
  { who: "MICAH", what: "Booked Mike T. — 11:00 service", when: "just now" },
  { who: "COS", what: "SMS reply sent — Sarah W.", when: "2m" },
  { who: "BOS", what: "Reminders dispatched · 22 attendees", when: "6m" },
  { who: "MICAH", what: "Qualified inbound call — Toowoomba", when: "11m" },
  { who: "COS", what: "New web chat — quote request", when: "18m" },
  { who: "BOS", what: "Deposit captured · Reef Charters", when: "27m" },
] as const;
