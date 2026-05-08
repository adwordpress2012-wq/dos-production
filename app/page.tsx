import Link from "next/link";
import {
  ArrowRight,
  Calendar,
  CheckCircle2,
  Globe,
  HeadphonesIcon,
  LayoutDashboard,
  MessageSquare,
  PhoneCall,
  ShieldCheck,
  Sparkles,
  Workflow,
  Zap,
} from "lucide-react";
import Hero from "./components/Hero";
import GlowCard, { GlowIcon } from "./components/GlowCard";
import SectionHeader from "./components/SectionHeader";

const PRODUCT_PILLARS = [
  {
    icon: <Globe className="h-5 w-5" />,
    title: "Website Rebuilds",
    description:
      "We rebuild your website on modern, lightning-fast infrastructure — then host, monitor and update it for you.",
    href: "/website-rebuilds",
    tone: "violet" as const,
  },
  {
    icon: <PhoneCall className="h-5 w-5" />,
    title: "Micah AI Receptionist",
    description:
      "Micah answers every call, qualifies leads and books jobs. 24/7. Never miss a customer again.",
    href: "/micah",
    tone: "fuchsia" as const,
  },
  {
    icon: <MessageSquare className="h-5 w-5" />,
    title: "COS Communication",
    description:
      "One AI inbox for SMS, email and web chat. Auto-responses, follow-ups and full conversation context.",
    href: "/cos",
    tone: "cyan" as const,
  },
  {
    icon: <Calendar className="h-5 w-5" />,
    title: "BOS Booking System",
    description:
      "Smart, branded booking with reminders, deposits, calendar sync and waitlist — all done for you.",
    href: "/bos",
    tone: "emerald" as const,
  },
];

export default function Home() {
  return (
    <>
      <Hero />
      <WhatDosDoes />
      <WebsiteRebuildsSection />
      <MicahSection />
      <CosSection />
      <BosSection />
      <WhyDoneForYou />
      <PricingCta />
      <CommandCentrePreview />
      <ContactSection />
    </>
  );
}

/* ─────────────────────────────────────────────────────────── */

function WhatDosDoes() {
  return (
    <section className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeader
          eyebrow="What DOS does"
          title={
            <>
              The <span className="text-gradient-purple">central hub</span>
              <br />for your business systems.
            </>
          }
          description="DOS is the operating system underneath your website, phones, bookings and customer comms. We build it, host it, and run it for you — so you don't have to glue together a dozen apps."
        />

        <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {PRODUCT_PILLARS.map((p) => (
            <GlowCard key={p.title} tone={p.tone} className="h-full">
              <GlowIcon tone={p.tone}>{p.icon}</GlowIcon>
              <h3 className="mt-5 text-lg font-semibold tracking-tight">{p.title}</h3>
              <p className="mt-2 text-sm text-ink-muted leading-relaxed">{p.description}</p>
              <Link
                href={p.href}
                className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-white/90 hover:text-white"
              >
                Learn more <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </GlowCard>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────── */

function WebsiteRebuildsSection() {
  return (
    <section className="relative py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-6">
            <span className="text-xs font-mono uppercase tracking-[0.25em] text-violet-300/80">
              01 · Foundations
            </span>
            <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight leading-[1.05]">
              Modern <span className="text-gradient-purple">website rebuilds</span>{" "}
              and managed hosting.
            </h2>
            <p className="mt-5 text-base text-ink-muted leading-relaxed max-w-xl">
              Most Australian small business sites are slow, ugly and impossible to update. We
              rebuild yours from scratch on a modern stack — then host, monitor and keep it up to
              date as part of your monthly DOS subscription.
            </p>
            <ul className="mt-7 space-y-3 text-sm text-ink-muted">
              {[
                "Custom design tuned to your brand",
                "Lightning-fast performance and SEO foundations",
                "Hosting, SSL and uptime monitoring included",
                "Ongoing edits and content updates handled by us",
              ].map((b) => (
                <li key={b} className="flex items-start gap-2.5">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/website-rebuilds" className="btn-neon px-5 py-2.5 rounded-xl text-sm font-semibold text-white">
                Explore website rebuilds
              </Link>
              <Link href="/onboarding" className="btn-ghost px-5 py-2.5 rounded-xl text-sm font-medium text-white">
                Start onboarding
              </Link>
            </div>
          </div>

          <div className="lg:col-span-6">
            <BrowserMock />
          </div>
        </div>
      </div>
    </section>
  );
}

function BrowserMock() {
  return (
    <div className="relative">
      <div
        aria-hidden
        className="absolute -inset-6 rounded-[28px] bg-gradient-to-br from-violet-500/30 via-fuchsia-500/10 to-transparent blur-2xl opacity-60"
      />
      <div className="relative glass-strong rounded-2xl p-2 ring-glow-soft">
        <div className="rounded-xl bg-[#06080f] border border-white/5 overflow-hidden">
          <div className="flex items-center gap-2 px-3 py-2 border-b border-white/5">
            <div className="flex gap-1.5">
              <span className="h-2 w-2 rounded-full bg-red-400/60" />
              <span className="h-2 w-2 rounded-full bg-amber-300/60" />
              <span className="h-2 w-2 rounded-full bg-emerald-400/60" />
            </div>
            <div className="ml-2 flex-1 truncate rounded-md bg-white/[0.03] border border-white/5 px-3 py-1 text-[10px] text-ink-dim font-mono">
              https://yourbusiness.com.au
            </div>
          </div>
          <div className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="h-6 w-6 rounded-md bg-gradient-to-br from-violet-500 to-cyan-400" />
                <span className="text-sm font-semibold">YourBrand</span>
              </div>
              <div className="hidden sm:flex gap-3 text-[11px] text-ink-muted">
                <span>Services</span>
                <span>About</span>
                <span>Book</span>
              </div>
            </div>
            <div className="mt-8">
              <div className="h-2 w-32 rounded bg-white/10" />
              <div className="mt-3 h-7 w-72 rounded bg-gradient-to-r from-white/30 to-white/10" />
              <div className="mt-2 h-7 w-56 rounded bg-gradient-to-r from-white/20 to-white/5" />
              <div className="mt-5 flex gap-2">
                <div className="h-7 w-28 rounded-md bg-gradient-to-r from-violet-500 to-cyan-400" />
                <div className="h-7 w-20 rounded-md bg-white/10" />
              </div>
            </div>
            <div className="mt-8 grid grid-cols-3 gap-2">
              <div className="h-16 rounded-lg bg-white/[0.04] border border-white/5" />
              <div className="h-16 rounded-lg bg-white/[0.04] border border-white/5" />
              <div className="h-16 rounded-lg bg-white/[0.04] border border-white/5" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────── */

function MicahSection() {
  return (
    <section className="relative py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-6 order-2 lg:order-1">
            <PhoneMock />
          </div>
          <div className="lg:col-span-6 order-1 lg:order-2">
            <span className="text-xs font-mono uppercase tracking-[0.25em] text-fuchsia-300/80">
              02 · Voice
            </span>
            <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight leading-[1.05]">
              <span className="text-gradient-neon">Micah</span> answers every call.
            </h2>
            <p className="mt-5 text-base text-ink-muted leading-relaxed max-w-xl">
              Micah is your AI receptionist. She picks up on the first ring, qualifies leads, books
              jobs and routes urgent calls — 24/7. Trained on your business. Sounds like a real
              person.
            </p>
            <ul className="mt-7 grid sm:grid-cols-2 gap-x-4 gap-y-3 text-sm text-ink-muted">
              {[
                "24/7 answering",
                "Smart call routing",
                "Books into BOS",
                "SMS follow-ups via COS",
                "Multilingual support",
                "Full call transcripts",
              ].map((b) => (
                <li key={b} className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
            <div className="mt-8">
              <Link href="/micah" className="btn-neon px-5 py-2.5 rounded-xl text-sm font-semibold text-white">
                Meet Micah
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function PhoneMock() {
  return (
    <div className="relative max-w-sm mx-auto">
      <div
        aria-hidden
        className="absolute -inset-10 rounded-[40px] bg-gradient-to-br from-fuchsia-500/30 via-violet-500/20 to-cyan-400/15 blur-2xl opacity-70"
      />
      <div className="relative glass-strong rounded-[36px] p-3 ring-glow">
        <div className="rounded-[28px] bg-[#06080f] border border-white/5 p-5">
          <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-widest text-ink-dim">
            <span>9:41</span>
            <span className="inline-flex items-center gap-1 text-emerald-300">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse-glow" />
              live call
            </span>
          </div>
          <div className="mt-6 flex flex-col items-center text-center">
            <div className="relative">
              <div className="absolute inset-0 -m-3 rounded-full bg-gradient-to-br from-fuchsia-500/40 to-violet-500/40 blur-xl animate-pulse-glow" />
              <div className="relative h-20 w-20 rounded-full bg-gradient-to-br from-violet-500 via-fuchsia-500 to-cyan-400 flex items-center justify-center text-2xl font-bold">
                M
              </div>
            </div>
            <p className="mt-4 text-base font-semibold">Micah</p>
            <p className="text-xs text-ink-muted">AI Receptionist · 02:48</p>
          </div>
          <div className="mt-6 space-y-2.5 text-[12px]">
            <Bubble who="caller">
              Hi, do you have anyone who can come out tomorrow morning?
            </Bubble>
            <Bubble who="micah">
              Absolutely — what&apos;s the address and what&apos;s happening on site?
            </Bubble>
            <Bubble who="caller">14 Park Lane, hot water unit&apos;s leaking.</Bubble>
            <Bubble who="micah">
              Got it. I&apos;ve booked Sam for 8:30am tomorrow and SMS&apos;d you the
              confirmation.
            </Bubble>
          </div>
          <div className="mt-5 flex justify-center gap-3">
            <div className="h-10 w-10 rounded-full bg-white/10" />
            <div className="h-10 w-10 rounded-full bg-red-500/80 shadow-[0_0_20px_rgba(248,113,113,0.5)]" />
            <div className="h-10 w-10 rounded-full bg-white/10" />
          </div>
        </div>
      </div>
    </div>
  );
}

function Bubble({ who, children }: { who: "caller" | "micah"; children: React.ReactNode }) {
  if (who === "caller") {
    return (
      <div className="flex">
        <div className="rounded-2xl rounded-bl-sm bg-white/[0.05] border border-white/5 px-3 py-2 max-w-[80%]">
          <p className="text-ink">{children}</p>
        </div>
      </div>
    );
  }
  return (
    <div className="flex justify-end">
      <div className="rounded-2xl rounded-br-sm bg-gradient-to-br from-violet-500/30 to-fuchsia-500/30 border border-violet-400/20 px-3 py-2 max-w-[80%]">
        <p className="text-ink">{children}</p>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────── */

function CosSection() {
  return (
    <section className="relative py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-6">
            <span className="text-xs font-mono uppercase tracking-[0.25em] text-cyan-300/80">
              03 · Conversations
            </span>
            <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight leading-[1.05]">
              <span className="text-gradient-neon">COS</span> handles every conversation.
            </h2>
            <p className="mt-5 text-base text-ink-muted leading-relaxed max-w-xl">
              The Communication Operating System. One AI-powered inbox for SMS, email and web chat,
              with smart auto-responses, follow-up sequences, and full context across every channel.
            </p>
            <ul className="mt-7 grid sm:grid-cols-2 gap-x-4 gap-y-3 text-sm text-ink-muted">
              {[
                "Unified inbox",
                "AI auto-replies",
                "Follow-up sequences",
                "Web chat widget",
                "SMS + email",
                "Team handover",
              ].map((b) => (
                <li key={b} className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
            <div className="mt-8">
              <Link href="/cos" className="btn-neon px-5 py-2.5 rounded-xl text-sm font-semibold text-white">
                Explore COS
              </Link>
            </div>
          </div>

          <div className="lg:col-span-6">
            <InboxMock />
          </div>
        </div>
      </div>
    </section>
  );
}

function InboxMock() {
  const messages = [
    { from: "Jess R.", channel: "SMS", preview: "Hey, can I move my 2pm to Friday?", time: "2m", unread: true },
    { from: "info@…", channel: "Email", preview: "Quote request for kitchen reno", time: "11m", unread: true },
    { from: "Web chat", channel: "Chat", preview: "Do you cover the Gold Coast?", time: "27m", unread: false },
    { from: "Mike T.", channel: "SMS", preview: "Got it, thanks!", time: "1h", unread: false },
    { from: "Sarah W.", channel: "SMS", preview: "Confirmed for tomorrow 9:30am.", time: "2h", unread: false },
  ];
  const channelColors: Record<string, string> = {
    SMS: "text-cyan-300 bg-cyan-400/10 border-cyan-400/20",
    Email: "text-violet-300 bg-violet-400/10 border-violet-400/20",
    Chat: "text-emerald-300 bg-emerald-400/10 border-emerald-400/20",
  };
  return (
    <div className="relative">
      <div
        aria-hidden
        className="absolute -inset-6 rounded-[28px] bg-gradient-to-br from-cyan-400/20 via-blue-500/10 to-transparent blur-2xl opacity-60"
      />
      <div className="relative glass-strong rounded-2xl p-2 ring-glow-soft">
        <div className="rounded-xl bg-[#06080f] border border-white/5 overflow-hidden">
          <div className="flex items-center justify-between border-b border-white/5 px-4 py-3">
            <div className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4 text-cyan-300" />
              <span className="text-sm font-semibold">COS Inbox</span>
            </div>
            <span className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-2 py-0.5 text-[10px] font-medium text-emerald-300">
              2 unread
            </span>
          </div>
          <ul className="divide-y divide-white/5">
            {messages.map((m, i) => (
              <li key={i} className="flex items-center gap-3 px-4 py-3 hover:bg-white/[0.02] transition">
                <span
                  className={`shrink-0 inline-flex items-center rounded-md border px-1.5 py-0.5 text-[10px] font-semibold tracking-wider uppercase ${channelColors[m.channel]}`}
                >
                  {m.channel}
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <span className={`truncate text-sm ${m.unread ? "font-semibold text-white" : "font-medium text-ink"}`}>
                      {m.from}
                    </span>
                    <span className="text-[10px] font-mono uppercase tracking-widest text-ink-dim">{m.time}</span>
                  </div>
                  <p className="truncate text-xs text-ink-muted">{m.preview}</p>
                </div>
                {m.unread && <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_2px_rgba(34,211,238,0.7)]" />}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────── */

function BosSection() {
  return (
    <section className="relative py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-6 order-2 lg:order-1">
            <CalendarMock />
          </div>
          <div className="lg:col-span-6 order-1 lg:order-2">
            <span className="text-xs font-mono uppercase tracking-[0.25em] text-emerald-300/80">
              04 · Bookings
            </span>
            <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight leading-[1.05]">
              <span className="text-gradient-neon">BOS</span> books and reminds, automatically.
            </h2>
            <p className="mt-5 text-base text-ink-muted leading-relaxed max-w-xl">
              The Booking Operating System. Branded online booking, calendar sync, deposits, smart
              reminders and waitlist management — built into your DOS so customers can self-book
              and Micah can book on their behalf.
            </p>
            <ul className="mt-7 grid sm:grid-cols-2 gap-x-4 gap-y-3 text-sm text-ink-muted">
              {[
                "Branded booking page",
                "Smart reminders",
                "Deposits + payments",
                "Calendar sync",
                "Waitlist + reschedule",
                "Multi-staff routing",
              ].map((b) => (
                <li key={b} className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
            <div className="mt-8">
              <Link href="/bos" className="btn-neon px-5 py-2.5 rounded-xl text-sm font-semibold text-white">
                Explore BOS
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function CalendarMock() {
  const slots = [
    { time: "8:30", label: "Sarah W.", booked: true, tone: "violet" },
    { time: "9:00", label: "Open", booked: false },
    { time: "9:30", label: "Mike T.", booked: true, tone: "cyan" },
    { time: "10:00", label: "Hold · waitlist", booked: false },
    { time: "10:30", label: "Open", booked: false },
    { time: "11:00", label: "Lana K.", booked: true, tone: "emerald" },
    { time: "11:30", label: "Open", booked: false },
    { time: "12:00", label: "Buffer", booked: false },
  ];
  const toneClasses: Record<string, string> = {
    violet: "bg-violet-500/15 border-violet-400/30 text-violet-200",
    cyan: "bg-cyan-400/15 border-cyan-400/30 text-cyan-200",
    emerald: "bg-emerald-400/15 border-emerald-400/30 text-emerald-200",
  };
  return (
    <div className="relative">
      <div
        aria-hidden
        className="absolute -inset-6 rounded-[28px] bg-gradient-to-br from-emerald-400/20 via-teal-400/10 to-transparent blur-2xl opacity-60"
      />
      <div className="relative glass-strong rounded-2xl p-2 ring-glow-soft">
        <div className="rounded-xl bg-[#06080f] border border-white/5 overflow-hidden">
          <div className="flex items-center justify-between border-b border-white/5 px-4 py-3">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-emerald-300" />
              <span className="text-sm font-semibold">Today · Tue</span>
            </div>
            <span className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-2 py-0.5 text-[10px] font-medium text-emerald-300">
              4 booked
            </span>
          </div>
          <ul className="grid grid-cols-1 gap-1 p-3">
            {slots.map((s, i) => (
              <li
                key={i}
                className={`flex items-center justify-between rounded-lg px-3 py-2 text-sm border ${
                  s.booked
                    ? toneClasses[s.tone ?? "violet"]
                    : "bg-white/[0.02] border-white/5 text-ink-dim"
                }`}
              >
                <span className="font-mono text-xs">{s.time}</span>
                <span className="text-xs font-medium">{s.label}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────── */

function WhyDoneForYou() {
  const benefits = [
    {
      icon: <Workflow className="h-5 w-5" />,
      title: "We build it for you",
      description:
        "No setup hell, no tool sprawl. We design, build and launch your stack — fully managed.",
      tone: "violet" as const,
    },
    {
      icon: <ShieldCheck className="h-5 w-5" />,
      title: "We own the uptime",
      description:
        "Hosting, monitoring, backups, security and updates — all on us. Your phones never go quiet.",
      tone: "cyan" as const,
    },
    {
      icon: <Zap className="h-5 w-5" />,
      title: "Live in days, not months",
      description:
        "Onboard in minutes. Most customers go live within 7–14 days, not 6 months of integration meetings.",
      tone: "emerald" as const,
    },
    {
      icon: <HeadphonesIcon className="h-5 w-5" />,
      title: "Real humans, on call",
      description:
        "Australian-operated support team. Not a chatbot. We know your business and we answer.",
      tone: "fuchsia" as const,
    },
  ];

  return (
    <section className="relative py-24 sm:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeader
          eyebrow="Why Done-For-You"
          title={
            <>
              You shouldn&apos;t have to be a{" "}
              <span className="text-gradient-purple">systems integrator</span> to run your business.
            </>
          }
          description="DOS is the alternative to the 27-tool, 4-contractor, 18-month digital transformation. One subscription. One team. One operating system."
        />

        <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {benefits.map((b) => (
            <GlowCard key={b.title} tone={b.tone}>
              <GlowIcon tone={b.tone}>{b.icon}</GlowIcon>
              <h3 className="mt-5 text-base font-semibold tracking-tight">{b.title}</h3>
              <p className="mt-2 text-sm text-ink-muted leading-relaxed">{b.description}</p>
            </GlowCard>
          ))}
        </div>

        <div className="mt-14 grid gap-4 sm:grid-cols-3">
          <Stat value="7–14d" label="Time to go live" />
          <Stat value="24/7" label="Micah uptime" />
          <Stat value="100%" label="Managed by DOS" />
        </div>
      </div>
    </section>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="glass rounded-2xl px-6 py-5 flex items-center justify-between">
      <span className="text-3xl font-semibold tracking-tight text-gradient-neon">{value}</span>
      <span className="text-xs font-medium uppercase tracking-widest text-ink-muted">{label}</span>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────── */

function PricingCta() {
  return (
    <section className="relative py-24 sm:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="relative overflow-hidden rounded-3xl glass-strong p-10 sm:p-14 text-center ring-glow">
          <div
            aria-hidden
            className="absolute -top-20 left-1/2 h-72 w-[800px] -translate-x-1/2 rounded-full bg-violet-500/30 blur-[120px]"
          />
          <div
            aria-hidden
            className="absolute -bottom-20 right-0 h-72 w-[600px] rounded-full bg-cyan-400/20 blur-[120px]"
          />

          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 text-xs font-medium uppercase tracking-[0.2em] text-ink-muted">
            <Sparkles className="h-3.5 w-3.5 text-violet-300" />
            One subscription. One team.
          </span>

          <h2 className="relative mt-6 text-3xl sm:text-5xl font-semibold tracking-tight leading-[1.05]">
            Replace your <span className="text-gradient-purple">website, phones,</span>
            <br className="hidden sm:block" /> inbox and booking — for one flat monthly fee.
          </h2>

          <p className="relative mt-5 text-base sm:text-lg text-ink-muted max-w-2xl mx-auto leading-relaxed">
            Plans start at $390/month. Setup, training, hosting and support included. No surprise
            invoices, no &ldquo;professional services&rdquo; bills, no per-seat charges.
          </p>

          <div className="relative mt-9 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/pricing"
              className="btn-neon inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-white"
            >
              See pricing <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/onboarding"
              className="btn-ghost inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-medium text-white"
            >
              Start onboarding
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────── */

function CommandCentrePreview() {
  return (
    <section className="relative py-24 sm:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-5">
            <span className="text-xs font-mono uppercase tracking-[0.25em] text-violet-300/80">
              05 · Cockpit
            </span>
            <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight leading-[1.05]">
              The <span className="text-gradient-purple">Command Centre.</span>
            </h2>
            <p className="mt-5 text-base text-ink-muted leading-relaxed max-w-xl">
              One real-time dashboard for everything DOS runs. Calls, conversations, bookings,
              leads, revenue — all in one place. Wired directly into Supabase, multi-tenant from day
              one.
            </p>
            <ul className="mt-7 space-y-3 text-sm text-ink-muted">
              {[
                "Live activity from Micah, COS and BOS",
                "Lead pipeline + status tracking",
                "Multi-tenant with custom subdomains",
                "Built on Supabase — your data, your control",
              ].map((b) => (
                <li key={b} className="flex items-start gap-2.5">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
            <div className="mt-8">
              <Link
                href="/command-centre"
                className="btn-neon inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white"
              >
                Open Command Centre
                <LayoutDashboard className="h-4 w-4" />
              </Link>
            </div>
          </div>

          <div className="lg:col-span-7">
            <CommandCentreMock />
          </div>
        </div>
      </div>
    </section>
  );
}

function CommandCentreMock() {
  return (
    <div className="relative">
      <div
        aria-hidden
        className="absolute -inset-6 rounded-[28px] bg-gradient-to-br from-violet-500/30 via-fuchsia-500/10 to-cyan-400/15 blur-2xl opacity-60"
      />
      <div className="relative glass-strong rounded-2xl p-2 ring-glow">
        <div className="rounded-xl bg-[#06080f] border border-white/5 overflow-hidden">
          <div className="flex items-center justify-between border-b border-white/5 px-4 py-3">
            <div className="flex items-center gap-2">
              <LayoutDashboard className="h-4 w-4 text-violet-300" />
              <span className="text-sm font-semibold">Command Centre</span>
            </div>
            <span className="font-mono text-[10px] uppercase tracking-widest text-ink-dim">
              · acme · live
            </span>
          </div>
          <div className="grid grid-cols-12 gap-3 p-4">
            <Tile span="col-span-12 sm:col-span-4" label="Calls" value="287" tone="violet" />
            <Tile span="col-span-12 sm:col-span-4" label="Bookings" value="64" tone="emerald" />
            <Tile span="col-span-12 sm:col-span-4" label="New leads" value="118" tone="cyan" />

            <div className="col-span-12 rounded-xl border border-white/5 bg-white/[0.02] p-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-ink-muted">Today</span>
                <span className="text-[10px] font-mono uppercase tracking-widest text-ink-dim">
                  · synced 12s ago
                </span>
              </div>
              <div className="mt-3 grid gap-2 text-[12px]">
                {[
                  ["09:42", "Micah", "Booked Mike T. — 11:00 service", "violet"],
                  ["09:36", "COS", "SMS reply sent — Sarah W.", "cyan"],
                  ["09:28", "BOS", "Reminders dispatched · 22 attendees", "emerald"],
                  ["09:14", "Micah", "Qualified inbound — Toowoomba", "violet"],
                  ["09:02", "COS", "New web chat — quote request", "cyan"],
                ].map(([t, who, what, tone], i) => (
                  <div key={i} className="flex items-center gap-3 py-1">
                    <span className="font-mono text-[10px] text-ink-dim w-12">{t}</span>
                    <span
                      className={`rounded-md border px-1.5 py-0.5 text-[10px] font-semibold tracking-wider uppercase ${
                        tone === "violet"
                          ? "bg-violet-500/15 text-violet-300 border-violet-400/20"
                          : tone === "cyan"
                            ? "bg-cyan-400/15 text-cyan-200 border-cyan-400/20"
                            : "bg-emerald-400/15 text-emerald-200 border-emerald-400/20"
                      }`}
                    >
                      {who}
                    </span>
                    <span className="text-ink-muted truncate">{what}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Tile({ span, label, value, tone }: { span: string; label: string; value: string; tone: "violet" | "cyan" | "emerald" }) {
  const dot =
    tone === "violet"
      ? "bg-violet-400 shadow-[0_0_12px_2px_rgba(168,85,247,0.7)]"
      : tone === "cyan"
        ? "bg-cyan-400 shadow-[0_0_12px_2px_rgba(34,211,238,0.7)]"
        : "bg-emerald-400 shadow-[0_0_12px_2px_rgba(52,247,193,0.7)]";
  return (
    <div className={`${span} rounded-xl border border-white/5 bg-white/[0.02] p-4`}>
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium text-ink-muted">{label}</span>
        <span className={`h-1.5 w-1.5 rounded-full ${dot}`} />
      </div>
      <div className="mt-2 text-2xl font-semibold tracking-tight">{value}</div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────── */

function ContactSection() {
  return (
    <section className="relative py-24 sm:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-6">
            <SectionHeader
              align="left"
              eyebrow="Talk to us"
              title={
                <>
                  Book a <span className="text-gradient-purple">15-minute demo.</span>
                </>
              }
              description="Tell us about your business, your phones, your bookings. We'll show you a live DOS environment configured around what you actually do."
            />
            <div className="mt-8 grid gap-3">
              <ContactRow
                icon={<MessageSquare className="h-4 w-4 text-cyan-300" />}
                label="Email"
                value="hello@directiveos.com"
                href="mailto:hello@directiveos.com"
              />
              <ContactRow
                icon={<PhoneCall className="h-4 w-4 text-violet-300" />}
                label="Phone"
                value="Australian business hours"
              />
              <ContactRow
                icon={<Globe className="h-4 w-4 text-emerald-300" />}
                label="Coverage"
                value="All of Australia · remote onboarding"
              />
            </div>
          </div>

          <div className="lg:col-span-6">
            <GlowCard tone="violet" className="h-full">
              <h3 className="text-lg font-semibold tracking-tight">Quick demo request</h3>
              <p className="mt-1 text-sm text-ink-muted">
                For a full guided onboarding,{" "}
                <Link href="/onboarding" className="text-violet-300 hover:text-violet-200 underline underline-offset-4 decoration-dashed">
                  start here
                </Link>
                .
              </p>
              <form
                action="mailto:hello@directiveos.com"
                method="post"
                encType="text/plain"
                className="mt-6 grid gap-3"
              >
                <input
                  required
                  name="name"
                  placeholder="Your name"
                  className="rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-sm placeholder-ink-dim outline-none focus:border-violet-400/50 focus:bg-white/[0.07] transition"
                />
                <input
                  required
                  type="email"
                  name="email"
                  placeholder="you@business.com.au"
                  className="rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-sm placeholder-ink-dim outline-none focus:border-violet-400/50 focus:bg-white/[0.07] transition"
                />
                <input
                  name="business"
                  placeholder="Business name"
                  className="rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-sm placeholder-ink-dim outline-none focus:border-violet-400/50 focus:bg-white/[0.07] transition"
                />
                <textarea
                  name="message"
                  rows={3}
                  placeholder="What are you trying to fix or automate?"
                  className="rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-sm placeholder-ink-dim outline-none focus:border-violet-400/50 focus:bg-white/[0.07] transition resize-none"
                />
                <button
                  type="submit"
                  className="btn-neon mt-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold text-white"
                >
                  Request a demo
                  <ArrowRight className="h-4 w-4" />
                </button>
              </form>
            </GlowCard>
          </div>
        </div>
      </div>
    </section>
  );
}

function ContactRow({
  icon,
  label,
  value,
  href,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  href?: string;
}) {
  const content = (
    <div className="flex items-center gap-3 glass rounded-xl px-4 py-3 hover:bg-white/[0.06] transition">
      <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-white/5 border border-white/10">
        {icon}
      </span>
      <div>
        <div className="text-[11px] font-mono uppercase tracking-widest text-ink-dim">{label}</div>
        <div className="text-sm font-medium">{value}</div>
      </div>
    </div>
  );
  if (href) {
    return <a href={href}>{content}</a>;
  }
  return content;
}
