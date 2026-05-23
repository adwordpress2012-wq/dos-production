import Image from "next/image";
import Link from "next/link";
import { headers } from "next/headers";
import {
  ArrowRight,
  Bell,
  CalendarClock,
  CheckCircle2,
  Globe,
  HeadphonesIcon,
  Home as HomeIcon,
  Inbox,
  LayoutDashboard,
  Layers,
  ListTodo,
  MessageSquare,
  PhoneCall,
  Server,
  ShieldCheck,
  Smartphone,
  Sparkles,
  UserPlus,
  Users,
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

const AGENTMATE_DEMO_CALENDLY_URL =
  "https://calendly.com/adwordpress2012/agentmate-discovery-demo";

const AGENTMATE_FOUNDING_FORM_ACTION = "https://formspree.io/f/xdabqlql";

const SYSTEM_PILLARS = [
  {
    icon: <Globe className="h-5 w-5" />,
    title: "Modern Smart Websites",
    description:
      "Fast, responsive sites with conversion-led UX, SEO structure, and mobile-first layouts built to generate enquiries.",
    href: "/#modern-smart-websites",
    tone: "violet" as const,
  },
  {
    icon: <MessageSquare className="h-5 w-5" />,
    title: "Smart Communication Systems",
    description:
      "SCW, WhatsApp, and SMS in one workflow so enquiry capture is consistent and fewer conversations slip through the cracks.",
    href: "/#smart-communication-systems",
    tone: "cyan" as const,
  },
  {
    icon: <HeadphonesIcon className="h-5 w-5" />,
    title: "Smart Business Assistants",
    description:
      "SBA systems for support, bookings, and operational assistance — clear flows that help customers get answers without the noise.",
    href: "/#smart-business-assistants",
    tone: "fuchsia" as const,
  },
  {
    icon: <Layers className="h-5 w-5" />,
    title: "Done-For-You Business Infrastructure",
    description:
      "Hosting, integrations, deployments, support, and recurring optimisation — the managed layer that keeps your systems reliable.",
    href: "/#done-for-you-infrastructure",
    tone: "emerald" as const,
  },
];

export default async function Home() {
  const h = await headers();
  const host = h.get("x-forwarded-host") ?? h.get("host");
  const proto = h.get("x-forwarded-proto") ?? "https";
  const origin =
    host && !host.includes("localhost") ? `${proto}://${host}` : "http://localhost:3000";
  const agentMateThanksUrl = `${origin}/thank-you`;

  return (
    <>
      <Hero />
      <TryMicahLive />
      <WhatDosDoes />
      <WebsiteRebuildsSection />
      <ModernSystemsInActionSection />
      <SmartCommunicationSystemsSection />
      <MicahSection />
      <DoneForYouInfrastructureSection />
      <DosHubSection />
      <AgentMateSection thanksUrl={agentMateThanksUrl} />
      <WhyDoneForYou />
      <PricingCta />
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
    <section id="systems" className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeader
          eyebrow="Directive Operating Systems"
          title={
            <>
              The DOS <span className="text-gradient-purple">systems stack</span>
            </>
          }
          description="DOS is a modern systems partner for Australian businesses — websites, communication, Smart Business Assistants, and recurring infrastructure with clear support. Less noise, more operational clarity."
        />

        <div className="mt-14 grid gap-5 md:grid-cols-2">
          {SYSTEM_PILLARS.map((p) => (
            <GlowCard key={p.title} tone={p.tone} className="h-full">
              <GlowIcon tone={p.tone}>{p.icon}</GlowIcon>
              <h3 className="mt-5 text-lg font-semibold tracking-tight">{p.title}</h3>
              <p className="mt-2 text-sm text-ink-muted leading-relaxed">{p.description}</p>
              <Link
                href={p.href}
                className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-white/90 hover:text-white"
              >
                View section <ArrowRight className="h-3.5 w-3.5" />
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
    <section id="modern-smart-websites" className="relative py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-6">
            <span className="text-xs font-mono uppercase tracking-[0.25em] text-violet-300/80">
              01 · Modern Smart Websites
            </span>
            <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight leading-[1.05]">
              Websites built as <span className="text-gradient-purple">conversion systems</span> — not brochures.
            </h2>
            <p className="mt-5 text-base text-ink-muted leading-relaxed max-w-xl">
              Your site should earn trust, load fast on mobile, and make it effortless to enquire. We design and build
              Modern Smart Websites with structured SEO, clear calls-to-action, and ongoing tuning as part of your DOS
              engagement.
            </p>
            <ul className="mt-7 space-y-3 text-sm text-ink-muted">
              {[
                "Responsive layouts with premium polish and brand consistency",
                "Conversion-focused UX and enquiry paths that match how you sell",
                "SEO-ready structure and performance foundations",
                "Lead generation patterns that connect to your communication stack",
              ].map((b) => (
                <li key={b} className="flex items-start gap-2.5">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/website-rebuilds" className="btn-neon px-5 py-2.5 rounded-xl text-sm font-semibold text-white">
                Explore Modern Smart Websites
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

const CAPITAL_CASE_STUDY_HREF = "/case-studies/capital-recruitment";

const CAPITAL_PROOF_TAGS = [
  "Modern Smart Website",
  "Recruitment Portal",
  "Resume Uploads",
  "Admin Workflow",
  "Secure Backend",
  "DOS HUB Ready",
] as const;

function RecruitmentPortalMock() {
  return (
    <div className="relative">
      <div
        aria-hidden
        className="absolute -inset-5 rounded-[26px] bg-gradient-to-br from-emerald-500/20 via-violet-500/15 to-transparent blur-2xl opacity-70"
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
              recruitment portal preview
            </div>
          </div>
          <div className="p-4 sm:p-5">
            <div className="flex items-center justify-between gap-3">
              <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-200/90">Open roles</span>
              <span className="hidden sm:inline rounded-md border border-white/10 bg-white/[0.03] px-2 py-1 text-[10px] text-ink-dim">
                Apply + resume
              </span>
            </div>
            <div className="mt-4 space-y-2">
              {[
                ["Senior Consultant", "Sydney · Full-time"],
                ["Healthcare Recruiter", "Melbourne · Contract"],
                ["Office Coordinator", "Brisbane · Part-time"],
              ].map(([title, meta]) => (
                <div
                  key={title}
                  className="flex items-center justify-between gap-2 rounded-lg border border-white/6 bg-white/[0.02] px-3 py-2.5"
                >
                  <div className="min-w-0">
                    <p className="truncate text-[12px] font-medium text-white/90">{title}</p>
                    <p className="truncate text-[10px] text-ink-dim">{meta}</p>
                  </div>
                  <span className="shrink-0 rounded-md border border-emerald-400/25 bg-emerald-400/10 px-2 py-1 text-[9px] font-semibold uppercase tracking-wider text-emerald-200">
                    View
                  </span>
                </div>
              ))}
            </div>
            <div className="mt-4 rounded-lg border border-dashed border-white/10 bg-white/[0.02] px-3 py-3 text-center">
              <p className="text-[10px] font-medium uppercase tracking-wider text-ink-dim">Résumé upload</p>
              <p className="mt-1 text-[10px] text-ink-muted">PDF / DOC · secure handoff</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ModernSystemsInActionSection() {
  return (
    <section id="modern-systems-in-action" className="relative py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeader
          title={
            <>
              Modern Systems In <span className="text-gradient-purple">Action</span>
            </>
          }
          description="Featured client spotlight — real systems in production, told in plain language without inflated metrics."
        />

        <div className="relative mt-12 lg:mt-14">
          <div
            aria-hidden
            className="pointer-events-none absolute -inset-px rounded-[28px] bg-gradient-to-br from-violet-500/20 via-transparent to-emerald-400/15 opacity-80 blur-xl"
          />
          <div className="relative overflow-hidden rounded-[26px] glass-strong p-6 sm:p-8 lg:p-10 ring-glow">
            <div
              aria-hidden
              className="pointer-events-none absolute -top-24 right-0 h-64 w-64 rounded-full bg-violet-500/20 blur-[100px]"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute -bottom-20 -left-10 h-56 w-56 rounded-full bg-emerald-400/15 blur-[90px]"
            />

            <div className="relative grid gap-10 lg:grid-cols-12 lg:gap-12 lg:items-start">
              <div className="lg:col-span-12 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-2 border-b border-white/[0.06]">
                <div className="inline-flex rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2.5 self-start sm:self-auto">
                  <Image
                    src="/clients/capital-recruitment-logo.png"
                    alt="Capital Recruitment Agency Aust"
                    width={220}
                    height={131}
                    className="h-8 sm:h-9 w-auto max-w-[160px] sm:max-w-[180px] object-contain object-left opacity-[0.92]"
                    sizes="(max-width: 640px) 160px, 180px"
                  />
                </div>
                <span className="inline-flex w-fit items-center gap-2 rounded-full border border-emerald-400/25 bg-emerald-400/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-emerald-200">
                  Featured case study
                </span>
              </div>

              <div className="lg:col-span-5 order-2 lg:order-1">
                <p className="text-[10px] font-mono uppercase tracking-[0.28em] text-ink-dim">Interface preview</p>
                <div className="mt-3">
                  <RecruitmentPortalMock />
                </div>
              </div>

              <div className="lg:col-span-7 order-1 lg:order-2">
                <h3 className="text-2xl sm:text-3xl font-semibold tracking-tight text-white">Capital Recruitment</h3>
                <p className="mt-2 text-sm sm:text-base font-medium text-violet-200/90">Modern Smart Recruitment Platform</p>
                <p className="mt-4 text-sm sm:text-base text-ink-muted leading-relaxed max-w-2xl">
                  A full recruitment website rebuild with live job listings, resume uploads, applicant management, admin
                  workflows, and secure backend infrastructure.
                </p>

                <figure className="mt-6 sm:mt-7">
                  <blockquote className="border-l-2 border-emerald-400/35 pl-4 sm:pl-5">
                    <p className="text-sm sm:text-[15px] leading-relaxed text-white/85">
                      &ldquo;Jaze and DOS completely modernised our online presence and recruitment workflow. The new
                      platform looks professional, works great on mobile, and makes job applications much easier to
                      manage. The admin system and resume uploads have already improved how we handle applicants. Highly
                      recommend DOS for businesses wanting a modern smart system — not just a basic website.&rdquo;
                    </p>
                  </blockquote>
                  <figcaption className="mt-3 pl-4 sm:pl-5 text-sm text-ink-muted">
                    <span className="text-white/70">&mdash; Paul,</span> Capital Recruitment
                  </figcaption>
                </figure>

                <ul className="mt-6 flex flex-wrap gap-2" aria-label="Project highlights">
                  {CAPITAL_PROOF_TAGS.map((tag) => (
                    <li key={tag}>
                      <span className="inline-flex rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 text-[11px] font-medium text-ink-muted">
                        {tag}
                      </span>
                    </li>
                  ))}
                </ul>

                <div className="mt-7 flex flex-col sm:flex-row flex-wrap gap-3">
                  <Link
                    href={CAPITAL_CASE_STUDY_HREF}
                    className="btn-neon inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white"
                  >
                    View Case Study <ArrowRight className="h-4 w-4" />
                  </Link>
                  <Link
                    href="/website-rebuilds"
                    className="btn-ghost inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium text-white"
                  >
                    Explore Recruitment Systems
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function SmartCommunicationSystemsSection() {
  return (
    <section id="smart-communication-systems" className="relative py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-6 order-2 lg:order-1">
            <CommunicationMock />
          </div>
          <div className="lg:col-span-6 order-1 lg:order-2">
            <span className="text-xs font-mono uppercase tracking-[0.25em] text-cyan-300/80">
              02 · Smart Communication Systems
            </span>
            <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight leading-[1.05]">
              One thread for <span className="text-gradient-neon">every enquiry</span>.
            </h2>
            <p className="mt-5 text-base text-ink-muted leading-relaxed max-w-xl">
              Smart Communication Systems connect your website, SMS, and WhatsApp so customers get fast responses and
              your team sees a single timeline. Smart Chat Widget (SCW) captures leads on-site; workflows reduce missed
              follow-ups.
            </p>
            <ul className="mt-7 space-y-3 text-sm text-ink-muted">
              {[
                "Structured enquiry capture from your homepage and key landing pages",
                "WhatsApp and SMS aligned to how your staff actually respond",
                "SCW for quotes, bookings, and quick questions without form friction",
                "Clear customer communication paths — fewer dropped conversations",
              ].map((b) => (
                <li key={b} className="flex items-start gap-2.5">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/workspace-demo" className="btn-neon px-5 py-2.5 rounded-xl text-sm font-semibold text-white">
                Explore Smart Chat Widget
              </Link>
              <Link href="/cos" className="btn-ghost px-5 py-2.5 rounded-xl text-sm font-medium text-white">
                Messaging stack (COS)
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function CommunicationMock() {
  return (
    <div className="relative max-w-lg mx-auto lg:mx-0">
      <div
        aria-hidden
        className="absolute -inset-8 rounded-[32px] bg-gradient-to-br from-cyan-500/25 via-violet-500/15 to-transparent blur-2xl opacity-70"
      />
      <div className="relative glass-strong rounded-2xl p-4 ring-glow-soft">
        <div className="rounded-xl bg-[#06080f] border border-white/5 p-5">
          <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-widest text-ink-dim">
            <span className="inline-flex items-center gap-2 text-cyan-200/90">
              <Inbox className="h-3.5 w-3.5" />
              communication hub
            </span>
            <span className="inline-flex items-center gap-1 text-emerald-300">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse-glow" />
              live
            </span>
          </div>
          <div className="mt-5 space-y-3 text-[12px]">
            {[
              ["SCW", "New enquiry — quote request (Gold Coast)", "now"],
              ["WhatsApp", "Customer replied — booking thread", "3m"],
              ["SMS", "Reminder delivered — tomorrow 9:30", "11m"],
            ].map(([tag, line, when]) => (
              <div
                key={line}
                className="flex items-center justify-between gap-3 rounded-xl border border-white/5 bg-white/[0.02] px-3 py-2.5"
              >
                <div className="flex items-center gap-2 min-w-0">
                  <span className="shrink-0 rounded-md border border-cyan-400/20 bg-cyan-400/10 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-cyan-200">
                    {tag}
                  </span>
                  <span className="truncate text-ink-muted">{line}</span>
                </div>
                <span className="shrink-0 font-mono text-[10px] text-ink-dim">{when}</span>
              </div>
            ))}
          </div>
          <div className="mt-4 flex items-center gap-2 text-[11px] text-ink-dim">
            <Workflow className="h-3.5 w-3.5 text-violet-300/80" />
            <span>Workflows route every message into your operating picture.</span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────── */

function MicahSection() {
  return (
    <section id="smart-business-assistants" className="relative py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-6 order-2 lg:order-1">
            <PhoneMock />
          </div>
          <div className="lg:col-span-6 order-1 lg:order-2">
            <span className="text-xs font-mono uppercase tracking-[0.25em] text-fuchsia-300/80">
              03 · Smart Business Assistants
            </span>
            <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight leading-[1.05]">
              <span className="text-gradient-neon">Micah</span> — voice SBA for serious call volume.
            </h2>
            <p className="mt-5 text-base text-ink-muted leading-relaxed max-w-xl">
              Smart Business Assistant (SBA) systems extend your team: Micah answers on the first ring, handles bookings
              and common questions, and keeps summaries tidy for your staff — so support and revenue opportunities do
              not depend on who is on the phone.
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

function DoneForYouInfrastructureSection() {
  return (
    <section id="done-for-you-infrastructure" className="relative py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-6">
            <span className="text-xs font-mono uppercase tracking-[0.25em] text-emerald-300/80">
              04 · Done-For-You Business Infrastructure
            </span>
            <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight leading-[1.05]">
              The recurring layer that keeps{" "}
              <span className="text-gradient-purple">everything running.</span>
            </h2>
            <p className="mt-5 text-base text-ink-muted leading-relaxed max-w-xl">
              Modernisation does not stop at launch. We host and deploy your stack, maintain integrations, monitor
              performance, and stay available when your business changes — so your systems stay dependable long after
              go-live.
            </p>
            <ul className="mt-7 space-y-3 text-sm text-ink-muted">
              {[
                "Production hosting, SSL, backups, and structured releases",
                "Backend systems, support channels, and clear escalation when you need help",
                "Integrations with the tools you already rely on",
                "Ongoing maintenance and optimisation as part of the relationship",
              ].map((b) => (
                <li key={b} className="flex items-start gap-2.5">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/onboarding" className="btn-neon px-5 py-2.5 rounded-xl text-sm font-semibold text-white">
                Start onboarding
              </Link>
              <Link href="/pricing" className="btn-ghost px-5 py-2.5 rounded-xl text-sm font-medium text-white">
                See plans
              </Link>
            </div>
          </div>

          <div className="lg:col-span-6">
            <InfrastructureMock />
          </div>
        </div>
      </div>
    </section>
  );
}

function InfrastructureMock() {
  const rows = [
    {
      icon: <Server className="h-5 w-5 text-emerald-300" />,
      title: "Hosting & environments",
      body: "Stable hosting, DNS hygiene, and safe rollout windows.",
    },
    {
      icon: <ShieldCheck className="h-5 w-5 text-violet-300" />,
      title: "Support & continuity",
      body: "Australian-operated support when something breaks or needs tuning.",
    },
    {
      icon: <Smartphone className="h-5 w-5 text-cyan-300" />,
      title: "Integrations",
      body: "Messaging, bookings, and analytics — wired without you wrestling the stack.",
    },
  ];
  return (
    <div className="relative max-w-lg mx-auto lg:mx-0 space-y-3">
      <div
        aria-hidden
        className="absolute -inset-8 rounded-[28px] bg-gradient-to-br from-emerald-500/20 via-violet-500/20 to-cyan-400/10 blur-2xl opacity-55"
      />
      <div className="relative space-y-3">
        {rows.map((row) => (
          <div
            key={row.title}
            className="glass-strong rounded-xl border border-white/10 p-4 flex gap-4 items-start"
          >
            <div className="rounded-lg bg-white/5 border border-white/10 p-2 shrink-0">{row.icon}</div>
            <div>
              <p className="text-sm font-semibold text-white">{row.title}</p>
              <p className="mt-1 text-xs text-ink-muted leading-relaxed">{row.body}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function DosHubSection() {
  return (
    <section id="dos-hub" className="relative py-24 sm:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-5">
            <span className="text-xs font-mono uppercase tracking-[0.25em] text-violet-300/80">
              05 · DOS HUB
            </span>
            <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight leading-[1.05]">
              Your private <span className="text-gradient-purple">DOS Workspace.</span>
            </h2>
            <p className="mt-5 text-base text-ink-muted leading-relaxed max-w-xl">
              Access client onboarding, quote tools, proposal builders, and secure DOS systems from one connected
              workspace. DOS Marketplace available at{" "}
              <a
                href="https://doshub.com.au"
                target="_blank"
                rel="noopener noreferrer"
                className="text-violet-300 hover:text-violet-200 underline underline-offset-4"
              >
                doshub.com.au
              </a>
              .
            </p>
            <ul className="mt-7 space-y-3 text-sm text-ink-muted">
              {[
                "Pipeline and lead intelligence in one workspace view",
                "Project status, hosting renewals, and client delivery notes",
                "Designed for clarity — not spreadsheet chaos",
                "Secure workspace access for clients and authorised DOS operators",
              ].map((b) => (
                <li key={b} className="flex items-start gap-2.5">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-col sm:flex-row flex-wrap gap-3">
              <a
                href="https://doshub.com.au"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-neon inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-white"
              >
                View DOS Marketplace
                <ArrowRight className="h-4 w-4" />
              </a>
              <Link
                href="/workspace-demo"
                className="btn-ghost inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-medium text-white"
              >
                Open DOS Workspace
              </Link>
            </div>
          </div>

          <div className="lg:col-span-7">
            <DosHubMock />
          </div>
        </div>
      </div>
    </section>
  );
}

function DosHubMock() {
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
              <span className="text-sm font-semibold">DOS HUB</span>
            </div>
            <span className="font-mono text-[10px] uppercase tracking-widest text-ink-dim">
              · internal · live
            </span>
          </div>
          <div className="grid grid-cols-12 gap-3 p-4">
            <Tile span="col-span-12 sm:col-span-4" label="Pipeline leads" value="42" tone="violet" />
            <Tile span="col-span-12 sm:col-span-4" label="Active projects" value="18" tone="emerald" />
            <Tile span="col-span-12 sm:col-span-4" label="Open ops tasks" value="9" tone="cyan" />

            <div className="col-span-12 rounded-xl border border-white/5 bg-white/[0.02] p-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-ink-muted">Operations feed</span>
                <span className="text-[10px] font-mono uppercase tracking-widest text-ink-dim">
                  · synced moments ago
                </span>
              </div>
              <div className="mt-3 grid gap-2 text-[12px]">
                {[
                  ["09:42", "Projects", "Website launch checklist · signed off", "emerald"],
                  ["09:36", "Leads", "Pipeline stage moved — qualified", "violet"],
                  ["09:28", "Hosting", "Renewal reminder queued · 3 accounts", "cyan"],
                  ["09:14", "Support", "Client ticket triaged — priority 2", "violet"],
                  ["09:02", "SCW", "New tenant enquiry captured", "cyan"],
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

function AgentMateSection({ thanksUrl }: { thanksUrl: string }) {
  const agentMateInput =
    "w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-sm text-white placeholder:text-ink-dim outline-none focus:border-emerald-400/40 focus:bg-white/[0.07] transition";
  const agentMateTextarea = `${agentMateInput} resize-y min-h-[100px]`;
  const agentMateLabel = "text-[11px] font-medium uppercase tracking-widest text-ink-muted";

  const focusAreas = [
    {
      icon: <ListTodo className="h-5 w-5" />,
      title: "Follow-ups",
      description: "Structured cadence so buyer and vendor touchpoints stay on track.",
      tone: "violet" as const,
    },
    {
      icon: <Users className="h-5 w-5" />,
      title: "Buyer management",
      description: "Clear visibility on interest stages without spreadsheet sprawl.",
      tone: "cyan" as const,
    },
    {
      icon: <Bell className="h-5 w-5" />,
      title: "Reminders",
      description: "Cut-through prompts for calls, inspections, and contract milestones.",
      tone: "emerald" as const,
    },
    {
      icon: <HomeIcon className="h-5 w-5" />,
      title: "Open-home workflow",
      description: "Repeatable checklists from prep to register to post-open follow-through.",
      tone: "fuchsia" as const,
    },
  ];

  return (
    <section id="agentmate" className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="relative overflow-hidden rounded-3xl glass-strong p-8 sm:p-12 ring-glow">
          <div
            aria-hidden
            className="pointer-events-none absolute -top-28 -left-20 h-80 w-[520px] rounded-full bg-violet-500/30 blur-[130px]"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -bottom-28 -right-16 h-80 w-[480px] rounded-full bg-emerald-400/22 blur-[120px]"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute top-1/2 left-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-400/10 blur-[100px]"
          />

          <div className="relative grid gap-12 lg:grid-cols-12 lg:gap-10 lg:items-center">
            <div className="lg:col-span-5">
              <span className="inline-flex items-center gap-2 rounded-full border border-emerald-400/25 bg-emerald-400/10 px-3.5 py-1.5 text-[10px] font-semibold tracking-[0.28em] uppercase text-emerald-200">
                Real estate operations
              </span>
              <h2 className="mt-5 text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight leading-[1.05]">
                <span className="text-gradient-purple">AgentMate</span>
              </h2>
              <p className="mt-3 text-lg sm:text-xl font-medium text-white/90 tracking-tight">
                Your Smart Agent Assistant
              </p>
              <p className="mt-5 text-base leading-relaxed text-ink-muted max-w-xl">
                Daily operational assistant for real estate agents designed to help with follow-ups, buyer management,
                reminders, open-home workflow, and operational organisation.
              </p>

              <div className="mt-9 flex flex-col gap-4">
                <a
                  href={AGENTMATE_DEMO_CALENDLY_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-neon inline-flex w-fit items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-white"
                >
                  <CalendarClock className="h-4 w-4 shrink-0" />
                  Book AgentMate Demo
                  <ArrowRight className="h-4 w-4 shrink-0" />
                </a>

                <form
                  method="POST"
                  action={AGENTMATE_FOUNDING_FORM_ACTION}
                  className="relative w-full max-w-xl space-y-3 rounded-xl border border-white/12 bg-white/[0.03] p-4 sm:p-5"
                >
                  <input type="hidden" name="_next" value={thanksUrl} />
                  <input type="hidden" name="_subject" value="AgentMate — Founding Agent Program" />
                  <input
                    type="text"
                    name="_gotcha"
                    tabIndex={-1}
                    autoComplete="off"
                    className="absolute left-[-5000px]"
                    aria-hidden
                  />

                  <div className="grid gap-3 sm:grid-cols-2">
                    <div className="grid gap-2 sm:col-span-1">
                      <label htmlFor="agentmate_full_name" className={agentMateLabel}>
                        Full name<span className="text-emerald-300/90"> *</span>
                      </label>
                      <input
                        id="agentmate_full_name"
                        name="full_name"
                        type="text"
                        required
                        autoComplete="name"
                        className={agentMateInput}
                      />
                    </div>
                    <div className="grid gap-2 sm:col-span-1">
                      <label htmlFor="agentmate_email" className={agentMateLabel}>
                        Email<span className="text-emerald-300/90"> *</span>
                      </label>
                      <input
                        id="agentmate_email"
                        name="email"
                        type="email"
                        required
                        autoComplete="email"
                        className={agentMateInput}
                      />
                    </div>
                  </div>

                  <div className="grid gap-2">
                    <label htmlFor="agentmate_agency_name" className={agentMateLabel}>
                      Agency name
                    </label>
                    <input
                      id="agentmate_agency_name"
                      name="agency_name"
                      type="text"
                      autoComplete="organization"
                      className={agentMateInput}
                    />
                  </div>

                  <div className="grid gap-2">
                    <label htmlFor="agentmate_current_crm" className={agentMateLabel}>
                      Current CRM
                    </label>
                    <input id="agentmate_current_crm" name="current_crm" type="text" className={agentMateInput} />
                  </div>

                  <div className="grid gap-2">
                    <label htmlFor="agentmate_biggest_workflow_challenge" className={agentMateLabel}>
                      Biggest workflow challenge
                    </label>
                    <textarea
                      id="agentmate_biggest_workflow_challenge"
                      name="biggest_workflow_challenge"
                      rows={4}
                      className={agentMateTextarea}
                    />
                  </div>

                  <div className="pt-1">
                    <button
                      type="submit"
                      className="btn-ghost inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-medium text-white border border-white/12"
                    >
                      <UserPlus className="h-4 w-4 shrink-0" />
                      Join Founding Agent Program
                    </button>
                  </div>
                </form>
              </div>
            </div>

            <div className="lg:col-span-7 grid gap-4 sm:grid-cols-2">
              {focusAreas.map((item) => (
                <GlowCard key={item.title} tone={item.tone} className="h-full">
                  <GlowIcon tone={item.tone}>{item.icon}</GlowIcon>
                  <h3 className="mt-4 text-base font-semibold tracking-tight text-white">{item.title}</h3>
                  <p className="mt-2 text-sm text-ink-muted leading-relaxed">{item.description}</p>
                </GlowCard>
              ))}
              <GlowCard tone="violet" className="h-full sm:col-span-2">
                <GlowIcon tone="violet">
                  <Layers className="h-5 w-5" />
                </GlowIcon>
                <h3 className="mt-4 text-base font-semibold tracking-tight text-white">Operational organisation</h3>
                <p className="mt-2 text-sm text-ink-muted leading-relaxed max-w-2xl">
                  One dependable rhythm for the moving parts of your week — fewer dropped tasks, clearer handovers between
                  listing and sales activity.
                </p>
              </GlowCard>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────── */

function WhyDoneForYou() {
  const benefits = [
    {
      icon: <ShieldCheck className="h-5 w-5" />,
      title: "Never miss another enquiry",
      description: "Voice, chat, and messages surface in one workspace so nothing important hides in an inbox.",
      tone: "violet" as const,
    },
    {
      icon: <Zap className="h-5 w-5" />,
      title: "Faster customer response",
      description: "SBA coverage and structured booking flows help you respond quickly — even when you are on the tools or with clients.",
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
          description="Clearer operations, steadier enquiry flow, and calmer owners — with premium systems you do not have to babysit."
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
            Client workspace included
          </span>

          <h2 className="relative mt-6 text-3xl sm:text-5xl font-semibold tracking-tight leading-[1.05]">
            A premium system for <span className="text-gradient-purple">enquiries, bookings</span>
            <br className="hidden sm:block" /> and customer conversations — managed for you.
          </h2>

          <p className="relative mt-5 text-base sm:text-lg text-ink-muted max-w-2xl mx-auto leading-relaxed">
            Explore transparent plans for DOS Orbit, Nexus and Titan. Every tier includes the DOS Workspace client view
            so you always know what is happening with customers — backed by recurring infrastructure and support.
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
                  Book a <span className="text-gradient-purple">strategy call.</span>
                </>
              }
              description="Tell us how enquiries, bookings, and day-to-day communication work today. We will map a practical systems plan around what you actually run — no theatre, no cookie-cutter pitch."
            />
            <div className="mt-8 grid gap-3">
              <ContactRow
                icon={<MessageSquare className="h-4 w-4 text-cyan-300" />}
                label="Contact"
                value="Send a message"
                href="/contact"
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
              <h3 className="text-lg font-semibold tracking-tight">Strategy call request</h3>
              <p className="mt-1 text-sm text-ink-muted">
                For a full guided onboarding,{" "}
                <Link href="/onboarding" className="text-violet-300 hover:text-violet-200 underline underline-offset-4 decoration-dashed">
                  start here
                </Link>
                .
              </p>
              <div className="mt-6 grid gap-3">
                <Link
                  href="/contact"
                  className="btn-neon inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold text-white"
                >
                  Send a message
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <CalendlyPopupLink className="btn-ghost inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-sm font-medium text-white border border-white/12">
                  Book Strategy Call
                  <ArrowRight className="h-4 w-4" />
                </CalendlyPopupLink>
              </div>
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
  if (href?.startsWith("/")) {
    return (
      <Link href={href} className="block">
        {content}
      </Link>
    );
  }
  if (href) {
    return <a href={href}>{content}</a>;
  }
  return content;
}
