import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";
import {
  ArrowRight,
  Building2,
  CheckCircle2,
  LayoutDashboard,
  MessageSquare,
  Sparkles,
  Users,
  UtensilsCrossed,
  Wrench,
} from "lucide-react";
import GlowCard, { GlowIcon } from "../components/GlowCard";
import SectionHeader from "../components/SectionHeader";
import { DISCOVERY_CALL_HREF } from "../lib/booking";

export const metadata: Metadata = {
  title: "DOS Ecosystem Rules",
  description:
    "The DOS Prime Directive: one client problem, one clear workflow, one useful system — then reuse. Learn how Directive OS decides what to build.",
};

type GlowTone = "cyan" | "fuchsia" | "violet" | "emerald" | "amber";

const DER_CHECKLIST = [
  {
    number: "01",
    question: "Is there a real client problem?",
    tone: "cyan" as const,
  },
  {
    number: "02",
    question: "Is the workflow clear?",
    tone: "violet" as const,
  },
  {
    number: "03",
    question: "Will the system be useful?",
    tone: "fuchsia" as const,
  },
  {
    number: "04",
    question: "Can DOS reuse it later?",
    tone: "emerald" as const,
  },
];

const DER_IN_ACTION: {
  name: string;
  problem: string;
  system: string;
  icon: ReactNode;
  tone: GlowTone;
}[] = [
  {
    name: "TourismOS / GuestMate",
    problem:
      "Guest enquiries, booking communication, guest details, arrivals, follow-ups, and operator time pressure.",
    system:
      "Guest Booking & Communication System for campgrounds, farm stays, glamping and accommodation operators.",
    icon: <Users className="h-5 w-5" />,
    tone: "cyan",
  },
  {
    name: "DOS SOOS",
    problem:
      "Restaurants need direct ordering, payments, and customer ownership without relying only on third-party platforms.",
    system: "Direct online ordering workflow for local food businesses.",
    icon: <UtensilsCrossed className="h-5 w-5" />,
    tone: "amber",
  },
  {
    name: "QuoteOS",
    problem: "Tradies lose time handling enquiries, quotes, bookings, and follow-ups manually.",
    system: "Quoting and booking workflow for service businesses.",
    icon: <Wrench className="h-5 w-5" />,
    tone: "emerald",
  },
  {
    name: "AgentMate",
    problem:
      "Agents lose momentum when follow-ups, buyer/vendor notes, and daily tasks are scattered.",
    system: "Daily operational assistant for real estate agents.",
    icon: <Building2 className="h-5 w-5" />,
    tone: "violet",
  },
  {
    name: "Micah",
    problem:
      "Small businesses miss enquiries and spend too much time repeating the same answers.",
    system: "Smart Business Assistant for enquiries, bookings and follow-ups.",
    icon: <MessageSquare className="h-5 w-5" />,
    tone: "fuchsia",
  },
  {
    name: "Command Centre",
    problem:
      "DOS needs one place to manage leads, clients, delivery, payments, and product growth.",
    system: "Internal DOS Ecosystem Control Hub.",
    icon: <LayoutDashboard className="h-5 w-5" />,
    tone: "violet",
  },
];

export default function Page() {
  return (
    <main>
      <DerHero />
      <PrimeDirective />
      <DerChecklist />
      <DerInAction />
      <DerCta />
    </main>
  );
}

function DerHero() {
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

          <div className="relative mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-violet-400/30 bg-violet-500/10 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-violet-200">
              <Sparkles className="h-3.5 w-3.5" />
              DER Prime Directive
            </span>

            <h1 className="mt-7 text-4xl font-semibold leading-[1.02] tracking-tight sm:text-5xl lg:text-6xl">
              DOS Ecosystem Rules
            </h1>

            <div className="relative mx-auto mt-10 max-w-xl">
              <DerHudRing />
              <div className="relative space-y-2 sm:space-y-3">
                <p className="text-xl font-semibold leading-snug text-cyan-200 sm:text-2xl lg:text-[28px] [text-shadow:0_0_24px_rgba(34,211,238,0.35)]">
                  One client problem.
                </p>
                <p className="text-xl font-semibold leading-snug text-cyan-200 sm:text-2xl lg:text-[28px] [text-shadow:0_0_24px_rgba(34,211,238,0.35)]">
                  One clear workflow.
                </p>
                <p className="text-xl font-semibold leading-snug text-cyan-200 sm:text-2xl lg:text-[28px] [text-shadow:0_0_24px_rgba(34,211,238,0.35)]">
                  One useful system.
                </p>
                <p className="text-xl font-semibold leading-snug sm:text-2xl lg:text-[28px]">
                  <span className="text-gradient-purple [text-shadow:0_0_28px_rgba(168,85,247,0.4)]">
                    Then reuse.
                  </span>
                </p>
              </div>
            </div>

            <p className="mx-auto mt-8 max-w-2xl text-base leading-relaxed text-ink-muted sm:text-lg">
              Directive OS builds practical business systems from real client problems, clear
              workflows, and useful outcomes that can be reused across similar businesses.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function DerHudRing() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 flex items-center justify-center">
      <div className="relative h-[280px] w-[280px] sm:h-[340px] sm:w-[340px] opacity-40">
        <div className="absolute inset-0 rounded-full border border-cyan-400/20" />
        <div className="absolute inset-6 rounded-full border border-cyan-400/15" />
        <div className="absolute inset-12 rounded-full border border-violet-400/20 border-dashed" />
        <div className="absolute inset-[4.5rem] rounded-full border border-white/5" />
        <div className="absolute left-1/2 top-0 h-3 w-px -translate-x-1/2 bg-cyan-400/50" />
        <div className="absolute bottom-0 left-1/2 h-3 w-px -translate-x-1/2 bg-cyan-400/50" />
        <div className="absolute left-0 top-1/2 h-px w-3 -translate-y-1/2 bg-cyan-400/50" />
        <div className="absolute right-0 top-1/2 h-px w-3 -translate-y-1/2 bg-cyan-400/50" />
      </div>
    </div>
  );
}

function PrimeDirective() {
  return (
    <section className="relative py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeader
          align="center"
          eyebrow="Core statement"
          title={
            <>
              The DOS <span className="text-gradient-purple">Prime Directive</span>
            </>
          }
        />

        <div className="mx-auto mt-12 max-w-3xl">
          <GlowCard tone="violet">
            <p className="text-base leading-relaxed text-ink-muted sm:text-lg">
              DOS does not build random apps, features, or software for the sake of building. Every
              DOS system must begin with a real client problem, a clear workflow, and a useful
              system that helps the business save time, reduce admin, improve follow-up, or operate
              better day to day.
            </p>
            <div className="mt-8 rounded-xl border border-cyan-400/25 bg-cyan-400/5 px-5 py-5 sm:px-6 sm:py-6">
              <p className="font-mono text-sm font-medium uppercase leading-relaxed tracking-[0.12em] text-white sm:text-base">
                [ If it does not fit DER, DOS does not build it. ]
              </p>
            </div>
          </GlowCard>
        </div>
      </div>
    </section>
  );
}

function DerChecklist() {
  return (
    <section className="relative py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeader
          align="center"
          eyebrow="DER checklist"
          title={
            <>
              Before DOS builds anything, <span className="text-gradient-neon">we ask:</span>
            </>
          }
        />

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {DER_CHECKLIST.map((item) => (
            <GlowCard key={item.number} tone={item.tone} className="h-full">
              <div className="flex items-start justify-between gap-3">
                <GlowIcon tone={item.tone}>
                  <CheckCircle2 className="h-5 w-5" />
                </GlowIcon>
                <span className="font-mono text-xs uppercase tracking-[0.24em] text-ink-dim">
                  {item.number}
                </span>
              </div>
              <p className="mt-5 text-base font-semibold leading-snug tracking-tight text-white sm:text-lg">
                {item.question}
              </p>
            </GlowCard>
          ))}
        </div>
      </div>
    </section>
  );
}

function DerInAction() {
  return (
    <section className="relative py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeader
          align="center"
          eyebrow="DER in action"
          title={
            <>
              Systems shaped by <span className="text-gradient-purple">real problems.</span>
            </>
          }
          description="Every DOS product started with a client workflow — not a feature list."
        />

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {DER_IN_ACTION.map((item) => (
            <GlowCard key={item.name} tone={item.tone} className="h-full">
              <GlowIcon tone={item.tone}>{item.icon}</GlowIcon>
              <h3 className="mt-4 text-lg font-semibold tracking-tight text-white">{item.name}</h3>
              <div className="mt-4 space-y-3">
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-dim">
                    Problem
                  </p>
                  <p className="mt-1 text-sm leading-relaxed text-ink-muted">{item.problem}</p>
                </div>
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-dim">
                    System
                  </p>
                  <p className="mt-1 text-sm leading-relaxed text-ink-muted">{item.system}</p>
                </div>
              </div>
            </GlowCard>
          ))}
        </div>
      </div>
    </section>
  );
}

function DerCta() {
  return (
    <section className="relative pb-24 sm:pb-28">
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
              <h2 className="text-3xl font-semibold leading-[1.05] tracking-tight sm:text-4xl lg:text-5xl">
                Have a workflow that is costing you time?
              </h2>
              <p className="mt-5 max-w-2xl text-base leading-relaxed text-ink-muted sm:text-lg">
                If your business is losing time to enquiries, bookings, follow-ups, admin, payments,
                customer communication or messy daily operations, DOS can help map the workflow and
                build the right system around it.
              </p>
            </div>

            <div className="lg:col-span-5">
              <div className="grid gap-3">
                <Link
                  href={DISCOVERY_CALL_HREF}
                  className="btn-neon inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold text-white"
                >
                  Book a Discovery Call <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/#live-demos"
                  className="btn-ghost inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3 text-sm font-medium text-white"
                >
                  Explore DOS Systems
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
