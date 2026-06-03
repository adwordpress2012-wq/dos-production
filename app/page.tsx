import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Building2,
  CalendarClock,
  ClipboardList,
  Compass,
  ExternalLink,
  LayoutDashboard,
  MessageSquare,
  Pizza,
  Send,
  Sparkles,
  UtensilsCrossed,
  Wrench,
} from "lucide-react";
import GlowCard, { GlowIcon } from "./components/GlowCard";
import SectionHeader from "./components/SectionHeader";

const LIVE_DOS_SYSTEMS = [
  {
    name: "DOS Calendar",
    href: "https://doscalendar.com",
    label: "Operational Scheduling System",
    icon: <CalendarClock className="h-5 w-5" />,
    tone: "cyan" as const,
  },
  {
    name: "Micah / ChatOS",
    href: "https://chatos.com.au",
    label: "Smart Chat Widget + Smart Business Assistant",
    icon: <MessageSquare className="h-5 w-5" />,
    tone: "fuchsia" as const,
  },
  {
    name: "DOSLead",
    href: "https://doslead.com.au",
    label: "Outreach & Follow-Up System",
    icon: <Send className="h-5 w-5" />,
    tone: "violet" as const,
  },
  {
    name: "QuoteOS",
    href: "https://quoteos.com.au",
    label: "Tradie Operating System",
    icon: <Wrench className="h-5 w-5" />,
    tone: "emerald" as const,
  },
  {
    name: "DOS SOOS",
    href: "https://dossoos.com.au",
    label: "Restaurant Ordering System",
    icon: <UtensilsCrossed className="h-5 w-5" />,
    tone: "amber" as const,
  },
  {
    name: "DOS Workspace",
    href: "https://dosworkspace.com",
    label: "DOS Client Workspace",
    icon: <LayoutDashboard className="h-5 w-5" />,
    tone: "cyan" as const,
  },
  {
    name: "AgentMate",
    href: "https://agentmateworkspace.com.au",
    label: "Real Estate Operational Assistant",
    icon: <Building2 className="h-5 w-5" />,
    tone: "violet" as const,
    status: "Preview / Paused" as const,
  },
];

const CLIENT_BUILD_DEMOS = [
  {
    name: "Capital Recruitment",
    href: "https://capitalrecruitment.com.au",
    label: "Recruitment Website System",
    icon: <Building2 className="h-5 w-5" />,
    tone: "violet" as const,
  },
  {
    name: "Zio Pizza",
    href: "https://ziopizza.com.au",
    label: "Pizza / Restaurant Demo",
    icon: <Pizza className="h-5 w-5" />,
    tone: "fuchsia" as const,
  },
  {
    name: "Galactic Plumbing",
    href: "https://galacticplumbing.com.au",
    label: "Plumbing / QuoteOS Demo",
    icon: <Wrench className="h-5 w-5" />,
    tone: "emerald" as const,
  },
];

const DOS_WORKFLOW = [
  {
    icon: <Compass className="h-5 w-5" />,
    title: "Discovery",
    description: "We learn how enquiries, bookings, orders and follow-ups actually move through the business today.",
    tone: "violet" as const,
  },
  {
    icon: <ClipboardList className="h-5 w-5" />,
    title: "Pain Point",
    description: "We map what gets missed, where admin piles up, and where time or revenue quietly leaks.",
    tone: "fuchsia" as const,
  },
  {
    icon: <LayoutDashboard className="h-5 w-5" />,
    title: "Workflow",
    description: "We design the practical path — capture, organise, hand off and follow up without chaos.",
    tone: "cyan" as const,
  },
  {
    icon: <ArrowRight className="h-5 w-5" />,
    title: "Build Road",
    description: "We build the website, forms, dashboards, messaging flows and operational tools the workflow needs.",
    tone: "emerald" as const,
  },
  {
    icon: <CalendarClock className="h-5 w-5" />,
    title: "Buy Back Time",
    description: "DOS manages hosting, care and improvements so the system keeps working while you run the business.",
    tone: "amber" as const,
  },
];

const CLIENT_STORIES = [
  {
    name: "Luke",
    business: "Galactic Plumbing",
    summary:
      "Quote and enquiry workflow organised so job requests, follow-ups and booking handover stay out of scattered text threads.",
    href: "https://galacticplumbing.com.au",
    tone: "emerald" as const,
  },
  {
    name: "Jamie & Tanya",
    business: "Zio Pizza",
    summary:
      "Restaurant ordering, promotions and customer follow-up shaped into one operational flow the team can run daily.",
    href: "https://ziopizza.com.au",
    tone: "fuchsia" as const,
  },
  {
    name: "Paul",
    business: "Capital Recruitment",
    summary:
      "Recruitment website, job listings, resume uploads and admin workflows modernised into one managed platform.",
    href: "/case-studies/capital-recruitment",
    tone: "violet" as const,
    internal: true,
  },
];

const ECOSYSTEM_NODES = [
  { id: "enquiries", label: "Enquiries", detail: "Website, phone, chat, referrals", systems: ["Micah / ChatOS", "DOSLead"] },
  { id: "scheduling", label: "Scheduling", detail: "Bookings, reminders, handoffs", systems: ["DOS Calendar"] },
  { id: "operations", label: "Operations", detail: "Quotes, orders, jobs, follow-up", systems: ["QuoteOS", "DOS SOOS"] },
  { id: "workspace", label: "Client workspace", detail: "Care, hosting, visibility", systems: ["DOS Workspace", "AgentMate"] },
];

export default function Home() {
  return (
    <>
      <HeroSection />
      <LiveDosSystems />
      <DosWorkflow />
      <ClientStories />
      <EcosystemMap />
      <DiscoveryCta />
    </>
  );
}

function HeroSection() {
  return (
    <section className="relative pt-32 sm:pt-40 pb-16 sm:pb-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="relative overflow-hidden rounded-[2rem] glass-strong px-6 py-14 sm:px-10 sm:py-18 lg:px-14 ring-glow">
          <div
            aria-hidden
            className="absolute -top-32 left-1/2 h-80 w-[760px] -translate-x-1/2 rounded-full bg-violet-500/25 blur-[120px]"
          />
          <div
            aria-hidden
            className="absolute -bottom-40 right-0 h-80 w-[620px] rounded-full bg-cyan-400/20 blur-[120px]"
          />

          <div className="relative grid gap-12 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-7">
              <span className="inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-emerald-200">
                <Sparkles className="h-3.5 w-3.5" />
                Operational Systems Engineering
              </span>

              <h1 className="mt-7 max-w-4xl text-4xl font-semibold leading-[1.02] tracking-tight sm:text-6xl lg:text-[76px]">
                We Build the System Behind Your Business.
              </h1>

              <p className="mt-6 max-w-2xl text-base leading-relaxed text-ink-muted sm:text-lg lg:text-xl">
                DOS helps small businesses uncover what is slowing them down, then designs practical
                systems to capture enquiries, organise workflows, reduce admin and buy back time.
              </p>

              <div className="mt-8 flex w-full max-w-xl flex-col gap-3 sm:flex-row">
                <Link
                  href="/discovery"
                  className="btn-neon inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold text-white"
                >
                  Start Your Operational Discovery <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/contact"
                  className="btn-ghost inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3 text-sm font-medium text-white"
                >
                  Book a Discovery Call
                </Link>
              </div>

              <p className="mt-5 max-w-xl text-sm leading-relaxed text-ink-muted">
                Discovery-first. Explore live DOS systems below, then scope the right build for your
                workflow.
              </p>
            </div>

            <div className="lg:col-span-5">
              <OperationalMapMock />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function OperationalMapMock() {
  const rows = [
    ["Enquiries", "Website, phone, social, referrals", "capture"],
    ["Workflow", "Bookings, orders, quotes, follow-ups", "map"],
    ["System", "Forms, dashboards, messages, calendar", "build"],
    ["Care", "Hosting, support, improvements", "support"],
  ];

  return (
    <div className="relative">
      <div
        aria-hidden
        className="absolute -inset-6 rounded-[28px] bg-gradient-to-br from-violet-500/30 via-fuchsia-500/10 to-cyan-400/15 opacity-70 blur-2xl"
      />
      <div className="relative rounded-3xl border border-white/10 bg-[#06080f]/90 p-4 shadow-2xl">
        <div className="flex items-center justify-between border-b border-white/5 pb-4">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-red-400/60" />
            <span className="h-2.5 w-2.5 rounded-full bg-amber-300/60" />
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/60" />
          </div>
          <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink-dim">
            discovery map
          </span>
        </div>

        <div className="mt-5 space-y-3">
          {rows.map(([label, detail, status], index) => (
            <div key={label} className="rounded-2xl border border-white/5 bg-white/[0.03] p-4">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-dim">
                    0{index + 1}
                  </div>
                  <p className="mt-1 text-sm font-semibold text-white">{label}</p>
                  <p className="mt-1 text-xs leading-relaxed text-ink-muted">{detail}</p>
                </div>
                <span className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-2 py-1 text-[10px] font-medium uppercase tracking-wider text-emerald-300">
                  {status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function LiveDosSystems() {
  return (
    <section id="live-demos" className="relative scroll-mt-28 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeader
          eyebrow="Live DOS Systems"
          title={
            <>
              Try the <span className="text-gradient-neon">live demo systems.</span>
            </>
          }
          description="directiveos.com.au is the DOS showroom. Open a system, see how it runs, then start discovery when you are ready to scope your build."
        />

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {LIVE_DOS_SYSTEMS.map((system) => (
            <a
              key={system.name}
              href={system.href}
              target="_blank"
              rel="noreferrer"
              className="group block h-full"
            >
              <GlowCard tone={system.tone} className="h-full transition group-hover:ring-1 group-hover:ring-white/10">
                <div className="flex items-start justify-between gap-3">
                  <GlowIcon tone={system.tone}>{system.icon}</GlowIcon>
                  <ArrowUpRight className="h-4 w-4 shrink-0 text-ink-dim transition group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
                <div className="mt-4 flex flex-wrap items-center gap-2">
                  <h3 className="text-lg font-semibold tracking-tight text-white">{system.name}</h3>
                  {"status" in system && system.status && (
                    <span className="rounded-full border border-amber-400/25 bg-amber-400/10 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-amber-200">
                      {system.status}
                    </span>
                  )}
                </div>
                <p className="mt-2 text-sm leading-relaxed text-ink-muted">{system.label}</p>
                <p className="mt-4 text-xs font-medium text-cyan-200/90">Open live demo</p>
              </GlowCard>
            </a>
          ))}
        </div>

        <div className="mt-16">
          <p className="text-center text-xs font-medium uppercase tracking-[0.2em] text-ink-dim">
            Client & industry demos
          </p>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {CLIENT_BUILD_DEMOS.map((demo) => (
              <a
                key={demo.name}
                href={demo.href}
                target="_blank"
                rel="noreferrer"
                className="group block"
              >
                <div className="glass flex h-full items-center justify-between gap-4 rounded-2xl px-5 py-4 transition hover:bg-white/[0.04]">
                  <div className="flex items-center gap-3 min-w-0">
                    <GlowIcon tone={demo.tone}>{demo.icon}</GlowIcon>
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-white">{demo.name}</p>
                      <p className="mt-0.5 truncate text-xs text-ink-muted">{demo.label}</p>
                    </div>
                  </div>
                  <ExternalLink className="h-4 w-4 shrink-0 text-ink-dim group-hover:text-white" />
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function DosWorkflow() {
  return (
    <section id="dos-workflow" className="relative scroll-mt-28 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeader
          eyebrow="DOS Workflow"
          title={
            <>
              Discovery first. <span className="text-gradient-purple">System second.</span>
            </>
          }
          description="DOS is Operational Systems Engineering + AI systems building for small business — not a generic website agency or fixed SaaS bundle."
        />

        <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-5">
          {DOS_WORKFLOW.map((step, index) => (
            <GlowCard key={step.title} tone={step.tone} className="h-full">
              <div className="flex items-center justify-between gap-4">
                <GlowIcon tone={step.tone}>{step.icon}</GlowIcon>
                <span className="font-mono text-xs uppercase tracking-[0.24em] text-ink-dim">
                  0{index + 1}
                </span>
              </div>
              <h3 className="mt-5 text-lg font-semibold tracking-tight">{step.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-ink-muted">{step.description}</p>
            </GlowCard>
          ))}
        </div>
      </div>
    </section>
  );
}

function ClientStories() {
  return (
    <section id="client-stories" className="relative scroll-mt-28 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeader
          eyebrow="Client Stories"
          title={
            <>
              Systems built around <span className="text-gradient-purple">real operations.</span>
            </>
          }
          description="Examples of practical DOS builds — shaped after discovery, not forced into a package card."
        />

        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {CLIENT_STORIES.map((story) => {
            const card = (
              <GlowCard tone={story.tone} className="h-full">
                <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink-dim">Client story</p>
                <h3 className="mt-4 text-xl font-semibold tracking-tight">{story.name}</h3>
                <p className="mt-1 text-sm font-medium text-violet-200/90">{story.business}</p>
                <p className="mt-4 text-sm leading-relaxed text-ink-muted">{story.summary}</p>
                <p className="mt-5 inline-flex items-center gap-1.5 text-xs font-medium text-cyan-200/90">
                  {story.internal ? "Read case study" : "View live build"}
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </p>
              </GlowCard>
            );

            if (story.internal) {
              return (
                <Link key={story.name} href={story.href} className="group block h-full">
                  {card}
                </Link>
              );
            }

            return (
              <a
                key={story.name}
                href={story.href}
                target="_blank"
                rel="noreferrer"
                className="group block h-full"
              >
                {card}
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function EcosystemMap() {
  return (
    <section id="ecosystem-map" className="relative scroll-mt-28 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-start">
          <div className="lg:col-span-5">
            <SectionHeader
              align="left"
              eyebrow="DOS Ecosystem Map"
              title={
                <>
                  The right systems, only when the <span className="text-gradient-purple">workflow needs them.</span>
                </>
              }
              description="Micah, DOS Calendar, QuoteOS, DOSLead, DOS SOOS and DOS Workspace connect inside a broader operational build — components DOS selects after discovery, not the whole offer by themselves."
            />
          </div>

          <div className="lg:col-span-7">
            <div className="space-y-4">
              {ECOSYSTEM_NODES.map((node, index) => (
                <div key={node.id} className="glass rounded-2xl px-5 py-5">
                  <div className="flex items-start gap-4">
                    <span className="font-mono text-xs uppercase tracking-[0.24em] text-ink-dim">
                      0{index + 1}
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-white">{node.label}</p>
                      <p className="mt-1 text-xs leading-relaxed text-ink-muted">{node.detail}</p>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {node.systems.map((system) => (
                          <span
                            key={system}
                            className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 text-[11px] font-medium text-ink-muted"
                          >
                            {system}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <Link
              href="/#live-demos"
              className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-cyan-200/90 hover:text-cyan-100 transition"
            >
              Explore all live demos <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function DiscoveryCta() {
  return (
    <section className="relative py-24 sm:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="relative overflow-hidden rounded-3xl glass-strong p-10 ring-glow sm:p-14">
          <div
            aria-hidden
            className="absolute -top-20 left-1/2 h-72 w-[800px] -translate-x-1/2 rounded-full bg-violet-500/30 blur-[120px]"
          />
          <div
            aria-hidden
            className="absolute -bottom-24 right-0 h-72 w-[600px] rounded-full bg-cyan-400/20 blur-[120px]"
          />

          <div className="relative grid gap-10 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-7">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 text-xs font-medium uppercase tracking-[0.2em] text-ink-muted">
                <ClipboardList className="h-3.5 w-3.5 text-violet-300" />
                Next action
              </span>
              <h2 className="mt-6 text-3xl font-semibold leading-[1.05] tracking-tight sm:text-5xl">
                Book a Discovery Call
              </h2>
              <p className="mt-5 max-w-2xl text-base leading-relaxed text-ink-muted sm:text-lg">
                Show us where the business is leaking time, leads or momentum. DOS reviews the
                bottlenecks and recommends a practical system build — scoped after discovery, not from
                a pricing table.
              </p>
            </div>

            <div className="lg:col-span-5">
              <div className="grid gap-3">
                <Link
                  href="/discovery"
                  className="btn-neon inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold text-white"
                >
                  Start Your Operational Discovery <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/contact"
                  className="btn-ghost inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3 text-sm font-medium text-white"
                >
                  Book a Discovery Call
                </Link>
                <div className="glass rounded-2xl px-5 py-4 text-sm leading-relaxed text-ink-muted">
                  <MessageSquare className="mb-3 h-4 w-4 text-emerald-300" />
                  Jaze reviews each request and follows up with the next practical step.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
