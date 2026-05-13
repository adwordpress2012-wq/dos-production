import Link from "next/link";
import {
  ArrowRight,
  CalendarRange,
  CheckCircle2,
  Globe,
  HeadphonesIcon,
  LayoutDashboard,
  MessageSquare,
  PhoneCall,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Workflow,
  Zap,
} from "lucide-react";
import Hero from "./components/Hero";
import CalendlyPopupLink from "./components/CalendlyPopupLink";
import GlowCard, { GlowIcon } from "./components/GlowCard";
import SectionHeader from "./components/SectionHeader";
import TryDosWorkspaceCta from "./components/TryDosWorkspaceCta";

const MICAH_PHONE_DISPLAY = "02 5950 6382";
const MICAH_PHONE_LINK = "tel:0259506382";
const CHAT_DEMO_URL = "https://chatos.com.au";

const WHAT_DOS_HANDLES = [
  {
    icon: <MessageSquare className="h-5 w-5" />,
    title: "Smart Chat Widgets (SCW)",
    description: "Capture customer enquiries and booking requests directly from your website.",
    href: "/workspace-demo",
    tone: "cyan" as const,
  },
  {
    icon: <HeadphonesIcon className="h-5 w-5" />,
    title: "Smart Business Assistants (SBA)",
    description: "Help respond to customer enquiries across website chat, SMS, and WhatsApp.",
    href: "/micah",
    tone: "fuchsia" as const,
  },
  {
    icon: <Globe className="h-5 w-5" />,
    title: "Website Rebuilds",
    description: "Modern websites designed to improve customer trust, speed, and conversions.",
    href: "/website-rebuilds",
    tone: "violet" as const,
  },
  {
    icon: <CalendarRange className="h-5 w-5" />,
    title: "Booking Automation",
    description: "Reduce missed bookings and simplify customer enquiry flow.",
    href: "/bos",
    tone: "emerald" as const,
  },
  {
    icon: <Smartphone className="h-5 w-5" />,
    title: "SMS & WhatsApp",
    description: "Respond faster and keep customer communication organised.",
    href: "/cos",
    tone: "cyan" as const,
  },
  {
    icon: <Sparkles className="h-5 w-5" />,
    title: "Done-For-You Setup",
    description: "DOS builds, configures, and manages the system for your business.",
    href: "/onboarding",
    tone: "violet" as const,
  },
];

export default function Home() {
  return (
    <>
      <Hero />
      <TryMicahLive />
      <WhatDosDoes />
      <WebsiteRebuildsSection />
      <MicahSection />
      <WhyDoneForYou />
      <PricingCta />
      <DosWorkspaceSection />
      <ContactSection />
    </>
  );
}

/* ─────────────────────────────────────────────────────────── */

function TryMicahLive() {
  return (
    <section id="try-micah-live" className="relative py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="relative overflow-hidden rounded-3xl glass-strong p-8 sm:p-12 ring-glow">
          <div
            aria-hidden
            className="pointer-events-none absolute -top-24 -left-16 h-72 w-[480px] rounded-full bg-fuchsia-500/25 blur-[120px]"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -bottom-24 -right-16 h-72 w-[480px] rounded-full bg-cyan-400/20 blur-[120px]"
          />

          <div className="relative text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3.5 py-1.5 text-[10px] font-semibold tracking-[0.28em] uppercase text-emerald-200">
              <Sparkles className="h-3.5 w-3.5" />
              Live demo
            </span>
            <h2 className="mt-5 text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight leading-[1.05]">
              Try <span className="text-gradient-neon">Micah Live</span>
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-ink-muted">
              Call Micah live on the phone, or open the Smart Chat Widget demo — the same experience your customers see.
            </p>
          </div>

          <div className="relative mt-10 grid gap-5 lg:grid-cols-2">
            <a
              href={MICAH_PHONE_LINK}
              className="group relative overflow-hidden rounded-3xl border border-fuchsia-400/25 bg-white/[0.03] p-7 text-left transition hover:border-fuchsia-300/60 hover:bg-white/[0.05]"
              aria-label={`Call Micah now on ${MICAH_PHONE_DISPLAY}`}
            >
              <div
                aria-hidden
                className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-fuchsia-500/20 blur-3xl transition group-hover:bg-fuchsia-500/30"
              />
              <div className="relative">
                <GlowIcon tone="fuchsia">
                  <PhoneCall className="h-5 w-5" />
                </GlowIcon>
                <p className="mt-5 text-xs font-mono uppercase tracking-[0.25em] text-fuchsia-200">
                  Voice Demo
                </p>
                <h3 className="mt-3 text-2xl font-semibold tracking-tight text-white">
                  Call {MICAH_PHONE_DISPLAY}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-muted">
                  Hear Micah answer a real Australian phone number and handle the first conversation live.
                </p>
              </div>
            </a>

            <a
              href={CHAT_DEMO_URL}
              target="_blank"
              rel="noreferrer"
              className="group relative overflow-hidden rounded-3xl border border-cyan-400/25 bg-white/[0.03] p-7 text-left transition hover:border-cyan-300/60 hover:bg-white/[0.05]"
            >
              <div
                aria-hidden
                className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-cyan-400/20 blur-3xl transition group-hover:bg-emerald-400/25"
              />
              <div className="relative">
                <GlowIcon tone="cyan">
                  <MessageSquare className="h-5 w-5" />
                </GlowIcon>
                <p className="mt-5 text-xs font-mono uppercase tracking-[0.25em] text-cyan-200">
                  Chat Demo
                </p>
                <h3 className="mt-3 text-2xl font-semibold tracking-tight text-white">
                  Try Smart Chat Widget demo
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-muted">
                  Open the live Smart Chat Widget in a new tab — ideal for seeing how customer enquiries feel from a
                  customer&apos;s perspective.
                </p>
                <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-emerald-200">
                  Open Smart Chat Widget demo <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                </span>
              </div>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────── */

function WhatDosDoes() {
  return (
    <section id="solutions" className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeader
          eyebrow="Directive Operating Systems"
          title={
            <>
              What DOS <span className="text-gradient-purple">Handles For You</span>
            </>
          }
          description="DOS is a premium, managed customer communication system for Australian small businesses — Smart Chat Widgets, Smart Business Assistants, website rebuilds, booking automation, SMS, WhatsApp, and enquiry workflows without the tech overwhelm."
        />

        <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {WHAT_DOS_HANDLES.map((p) => (
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
              Micah is your Smart Business Assistant for voice. She picks up on the first ring, qualifies leads, books
              jobs and routes urgent calls — 24/7. Trained on your business. Sounds like a real
              person.
            </p>
            <ul className="mt-7 grid sm:grid-cols-2 gap-x-4 gap-y-3 text-sm text-ink-muted">
              {[
                "24/7 answering",
                "Smart call routing",
                "Books appointments for you",
                "SMS follow-ups to customers",
                "Clear call summaries you can trust",
                "Sounds natural on the phone",
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
            <p className="text-xs text-ink-muted">Smart Business Assistant · 02:48</p>
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

function DosWorkspaceSection() {
  return (
    <section id="dos-workspace" className="relative py-24 sm:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-5">
            <span className="text-xs font-mono uppercase tracking-[0.25em] text-violet-300/80">
              DOS Workspace
            </span>
            <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight leading-[1.05]">
              Your <span className="text-gradient-purple">business hub</span> for enquiries and bookings.
            </h2>
            <p className="mt-5 text-base text-ink-muted leading-relaxed max-w-xl">
              Manage enquiries, bookings, customer conversations, and booking automation in one place — a premium client
              portal built for Australian small businesses, not developers.
            </p>
            <ul className="mt-7 space-y-3 text-sm text-ink-muted">
              {[
                "Enquiry dashboard with clear next steps",
                "Customer conversation threads in one timeline",
                "Booking status without digging through inboxes",
                "Mobile-friendly so you can run it from the ute or the shop floor",
              ].map((b) => (
                <li key={b} className="flex items-start gap-2.5">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
            <div className="mt-8">
              <TryDosWorkspaceCta variant="hero" showSupportingText />
            </div>
          </div>

          <div className="lg:col-span-7">
            <WorkspaceMock />
          </div>
        </div>
      </div>
    </section>
  );
}

function WorkspaceMock() {
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
              <span className="text-sm font-semibold">DOS Workspace</span>
            </div>
            <span className="font-mono text-[10px] uppercase tracking-widest text-ink-dim">
              · sample business · live
            </span>
          </div>
          <div className="grid grid-cols-12 gap-3 p-4">
            <Tile span="col-span-12 sm:col-span-4" label="Calls handled" value="287" tone="violet" />
            <Tile span="col-span-12 sm:col-span-4" label="Bookings" value="64" tone="emerald" />
            <Tile span="col-span-12 sm:col-span-4" label="New enquiries" value="118" tone="cyan" />

            <div className="col-span-12 rounded-xl border border-white/5 bg-white/[0.02] p-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-ink-muted">Today</span>
                <span className="text-[10px] font-mono uppercase tracking-widest text-ink-dim">
                  · updated moments ago
                </span>
              </div>
              <div className="mt-3 grid gap-2 text-[12px]">
                {[
                  ["09:42", "Micah", "Booked Mike T. — 11:00 service", "violet"],
                  ["09:36", "Inbox", "SMS reply sent — Sarah W.", "cyan"],
                  ["09:28", "Bookings", "Reminders dispatched · 22 customers", "emerald"],
                  ["09:14", "Micah", "Qualified inbound — Toowoomba", "violet"],
                  ["09:02", "Web chat", "New quote request — Gold Coast", "cyan"],
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

function WhyDoneForYou() {
  const benefits = [
    {
      icon: <ShieldCheck className="h-5 w-5" />,
      title: "Never miss another enquiry",
      description: "Calls, chats and messages route into one workspace so you can see what needs attention.",
      tone: "violet" as const,
    },
    {
      icon: <Zap className="h-5 w-5" />,
      title: "Faster customer response",
      description: "Micah and booking automation help you reply quickly — even when you are on the tools or with clients.",
      tone: "cyan" as const,
    },
    {
      icon: <Workflow className="h-5 w-5" />,
      title: "Easier bookings",
      description: "Customers can request or confirm appointments without the back-and-forth phone tag.",
      tone: "emerald" as const,
    },
    {
      icon: <Globe className="h-5 w-5" />,
      title: "Modern online presence",
      description: "A fast, professional website that reflects your brand and converts more browsers into conversations.",
      tone: "fuchsia" as const,
    },
    {
      icon: <HeadphonesIcon className="h-5 w-5" />,
      title: "Less admin work",
      description: "Fewer manual texts, fewer missed voicemails, fewer spreadsheets — we tune the system around your day.",
      tone: "violet" as const,
    },
    {
      icon: <Sparkles className="h-5 w-5" />,
      title: "Managed for you",
      description: "Australian-operated support. We build, host and improve your setup — you stay focused on revenue.",
      tone: "cyan" as const,
    },
  ];

  return (
    <section className="relative py-24 sm:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeader
          eyebrow="Why DOS"
          title={
            <>
              Outcomes that matter to{" "}
              <span className="text-gradient-purple">real businesses.</span>
            </>
          }
          description="Less jargon. More booked jobs, happier customers, and calmer owners — with a premium system you do not have to babysit."
        />

        <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {benefits.map((b) => (
            <GlowCard key={b.title} tone={b.tone}>
              <GlowIcon tone={b.tone}>{b.icon}</GlowIcon>
              <h3 className="mt-5 text-base font-semibold tracking-tight">{b.title}</h3>
              <p className="mt-2 text-sm text-ink-muted leading-relaxed">{b.description}</p>
            </GlowCard>
          ))}
        </div>

        <div className="mt-14 grid gap-4 sm:grid-cols-3">
          <Stat value="7–14d" label="Typical go-live" />
          <Stat value="24/7" label="Micah answering" />
          <Stat value="1 place" label="Enquiries & bookings" />
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
            DOS Workspace included
          </span>

          <h2 className="relative mt-6 text-3xl sm:text-5xl font-semibold tracking-tight leading-[1.05]">
            A premium system for <span className="text-gradient-purple">enquiries, bookings</span>
            <br className="hidden sm:block" /> and customer conversations — managed for you.
          </h2>

          <p className="relative mt-5 text-base sm:text-lg text-ink-muted max-w-2xl mx-auto leading-relaxed">
            Explore transparent plans for DOS Orbit, Nexus and Titan. Every tier includes DOS Workspace so you always
            have a clear view of what is happening with your customers.
          </p>

          <div className="relative mt-9 flex flex-col items-center gap-4 w-full max-w-lg mx-auto">
            <TryDosWorkspaceCta variant="hero" />
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full">
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
      </div>
    </section>
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
                  placeholder="What customer communication or booking challenges can we help with?"
                  className="rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-sm placeholder-ink-dim outline-none focus:border-violet-400/50 focus:bg-white/[0.07] transition resize-none"
                />
                <CalendlyPopupLink
                  className="btn-neon mt-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold text-white"
                >
                  Request a demo
                  <ArrowRight className="h-4 w-4" />
                </CalendlyPopupLink>
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
