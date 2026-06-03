import Link from "next/link";
import {
  ArrowRight,
  Building2,
  CalendarClock,
  CheckCircle2,
  ClipboardList,
  Compass,
  HeadphonesIcon,
  Hotel,
  LayoutDashboard,
  Map,
  MessageSquare,
  Pizza,
  ShieldCheck,
  Sparkles,
  Wrench,
} from "lucide-react";
import GlowCard, { GlowIcon } from "./components/GlowCard";
import SectionHeader from "./components/SectionHeader";

const HOW_DOS_WORKS = [
  {
    icon: <Compass className="h-5 w-5" />,
    title: "Operational Discovery",
    description:
      "We learn how your business currently handles enquiries, bookings, orders, customers, follow-ups and admin.",
    tone: "violet" as const,
  },
  {
    icon: <Map className="h-5 w-5" />,
    title: "Workflow Map",
    description:
      "We identify what is slowing the business down, what gets missed, and where time or revenue leaks happen.",
    tone: "cyan" as const,
  },
  {
    icon: <LayoutDashboard className="h-5 w-5" />,
    title: "Custom System Build",
    description:
      "We build the website, forms, dashboards, communication flows, booking tools or operational system needed for that business.",
    tone: "emerald" as const,
  },
  {
    icon: <HeadphonesIcon className="h-5 w-5" />,
    title: "Ongoing Support",
    description:
      "DOS manages hosting, care, improvements and future system upgrades.",
    tone: "fuchsia" as const,
  },
];

const SOLUTION_EXAMPLES = [
  {
    icon: <Pizza className="h-5 w-5" />,
    title: "Pizza shop operating system",
    description:
      "Online ordering flow, local promotions, missed-call capture, customer follow-up and daily order visibility.",
    tone: "fuchsia" as const,
  },
  {
    icon: <Hotel className="h-5 w-5" />,
    title: "Guest/tourism operations system",
    description:
      "Guest enquiries, bookings, check-in instructions, reminders and operator dashboards in one managed workflow.",
    tone: "cyan" as const,
  },
  {
    icon: <Wrench className="h-5 w-5" />,
    title: "Tradie quoting workflow",
    description:
      "Lead intake, job details, quote requests, follow-ups and booking handover without losing work in text threads.",
    tone: "emerald" as const,
  },
  {
    icon: <Building2 className="h-5 w-5" />,
    title: "Real estate follow-up system",
    description:
      "Buyer, vendor and rental enquiries organised into simple follow-up paths so no warm lead disappears.",
    tone: "violet" as const,
  },
];

const CAPABILITIES = [
  "Operational Discovery",
  "Pain point mapping",
  "Workflow design",
  "Custom business system build",
  "Ongoing support and care",
];

const SYSTEM_COMPONENTS = [
  "Micah for call handling and enquiry capture",
  "DOS Calendar for booking and reminders",
  "QuoteOS for quoting workflows",
  "GuestMate for guest and tourism operations",
  "DOSLead for lead follow-up and visibility",
];

export default function Home() {
  return (
    <>
      <HeroSection />
      <CapabilityStrip />
      <HowDosWorks />
      <SolutionExamples />
      <SystemComponents />
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
                Operational Intelligence Systems
              </span>

              <h1 className="mt-7 max-w-4xl text-4xl font-semibold leading-[1.02] tracking-tight sm:text-6xl lg:text-[76px]">
                We Build the System Behind Your Business.
              </h1>

              <p className="mt-6 max-w-2xl text-base leading-relaxed text-ink-muted sm:text-lg lg:text-xl">
                DOS helps small businesses uncover what is slowing them down, then designs practical
                systems to capture more enquiries, organise workflows, reduce admin and buy back time.
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
                No fixed package pricing on the homepage. Every DOS solution is scoped and custom
                quoted after discovery.
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

function CapabilityStrip() {
  return (
    <section className="relative py-10">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-3 md:grid-cols-5">
          {CAPABILITIES.map((item) => (
            <div key={item} className="glass rounded-2xl px-4 py-4 text-sm font-medium text-white/90">
              <CheckCircle2 className="mb-3 h-4 w-4 text-emerald-400" />
              {item}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function HowDosWorks() {
  return (
    <section className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeader
          eyebrow="How DOS Works"
          title={
            <>
              Discovery first. <span className="text-gradient-purple">System second.</span>
            </>
          }
          description="We start with how the business actually runs, then design the right operating system around the owner, team and customers."
        />

        <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {HOW_DOS_WORKS.map((step, index) => (
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

function SolutionExamples() {
  return (
    <section className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeader
          eyebrow="Example systems"
          title={
            <>
              Built around the <span className="text-gradient-neon">real job</span> your business does.
            </>
          }
          description="DOS is not a single product bundle. These are examples of operational systems we can shape after discovery."
        />

        <div className="mt-14 grid gap-5 md:grid-cols-2">
          {SOLUTION_EXAMPLES.map((example) => (
            <GlowCard key={example.title} tone={example.tone} className="h-full">
              <GlowIcon tone={example.tone}>{example.icon}</GlowIcon>
              <h3 className="mt-5 text-xl font-semibold tracking-tight">{example.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-ink-muted">{example.description}</p>
            </GlowCard>
          ))}
        </div>
      </div>
    </section>
  );
}

function SystemComponents() {
  return (
    <section className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-5">
            <SectionHeader
              align="left"
              eyebrow="DOS components"
              title={
                <>
                  The right tools, only when the <span className="text-gradient-purple">workflow needs them.</span>
                </>
              }
              description="Micah, DOS Calendar, QuoteOS, GuestMate and DOSLead are components DOS can use inside a broader operational system. They are not the main offer by themselves."
            />
          </div>

          <div className="lg:col-span-7">
            <div className="grid gap-3">
              {SYSTEM_COMPONENTS.map((item) => (
                <div key={item} className="glass rounded-2xl px-5 py-4">
                  <div className="flex items-start gap-3">
                    <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
                    <p className="text-sm leading-relaxed text-ink-muted">{item}</p>
                  </div>
                </div>
              ))}
            </div>
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
                Operational Discovery Form
              </span>
              <h2 className="mt-6 text-3xl font-semibold leading-[1.05] tracking-tight sm:text-5xl">
                Show us where the business is leaking time, leads or momentum.
              </h2>
              <p className="mt-5 max-w-2xl text-base leading-relaxed text-ink-muted sm:text-lg">
                Start with the discovery form and DOS will review the bottlenecks before recommending
                a practical system build.
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
                  <CalendarClock className="mb-3 h-4 w-4 text-cyan-300" />
                  Discovery helps DOS quote the right system instead of forcing your business into a
                  package card.
                </div>
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
