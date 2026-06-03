import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Calendar, Globe, MessageSquare, PhoneCall } from "lucide-react";
import GlowCard, { GlowIcon } from "../components/GlowCard";

export const metadata: Metadata = {
  title: "Marketing",
  description:
    "Marketing hub for DOS — Done-For-You AI Business Systems. Get a website quote, request a proposal, or explore what DOS includes.",
};

const TILES = [
  {
    href: "/quote-builder",
    title: "Get a website quote",
    description:
      "Tell us about your business and we'll send a fixed-price quote for a modern DOS-managed rebuild.",
    icon: <Globe className="h-5 w-5" />,
    tone: "violet" as const,
  },
  {
    href: "/marketing/proposal",
    title: "Full DOS proposal",
    description:
      "Website, Micah, COS, BOS and DOS HUB — bundled. We'll prepare a tailored DOS proposal.",
    icon: <ArrowRight className="h-5 w-5" />,
    tone: "fuchsia" as const,
  },
  {
    href: "/marketing/saas-quote-builder",
    title: "Website SaaS Quote Builder",
    description:
      "Interactive internal builder for client-ready Website + SaaS proposals, recurring plans, overages, and hosting.",
    icon: <ArrowRight className="h-5 w-5" />,
    tone: "violet" as const,
  },
  {
    href: "/micah",
    title: "Meet Micah",
    description: "Your AI receptionist. Answers calls 24/7, books jobs, and routes urgent enquiries.",
    icon: <PhoneCall className="h-5 w-5" />,
    tone: "cyan" as const,
  },
  {
    href: "/cos",
    title: "COS Communication",
    description: "AI-powered SMS, email and web chat — one inbox, full context, smart follow-ups.",
    icon: <MessageSquare className="h-5 w-5" />,
    tone: "emerald" as const,
  },
  {
    href: "/bos",
    title: "BOS Booking",
    description:
      "Branded online bookings, reminders, deposits and waitlist — all wired into your DOS.",
    icon: <Calendar className="h-5 w-5" />,
    tone: "amber" as const,
  },
];

export default function Page() {
  return (
    <main className="relative pt-32 sm:pt-40 pb-16">
      <section className="mx-auto max-w-6xl px-6">
        <div className="text-center max-w-2xl mx-auto">
          <span className="inline-flex items-center gap-2 rounded-full border border-violet-400/20 bg-violet-500/10 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.2em] text-violet-200">
            <span className="h-1.5 w-1.5 rounded-full bg-violet-300 shadow-[0_0_10px_2px_rgba(168,85,247,0.7)]" />
            Marketing hub
          </span>
          <h1 className="mt-5 text-4xl sm:text-5xl font-semibold tracking-tight leading-[1.05]">
            <span className="text-gradient-purple">Done-For-You</span> business systems.
          </h1>
          <p className="mt-5 text-base sm:text-lg text-ink-muted leading-relaxed">
            Pick a starting point. We&apos;ll handle the rest.
          </p>
        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {TILES.map((t) => (
            <Link key={t.href} href={t.href} className="block">
              <GlowCard tone={t.tone} className="h-full">
                <GlowIcon tone={t.tone}>{t.icon}</GlowIcon>
                <h3 className="mt-5 text-lg font-semibold tracking-tight">{t.title}</h3>
                <p className="mt-2 text-sm text-ink-muted leading-relaxed">{t.description}</p>
                <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-white/90">
                  Continue <ArrowRight className="h-3.5 w-3.5" />
                </span>
              </GlowCard>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
