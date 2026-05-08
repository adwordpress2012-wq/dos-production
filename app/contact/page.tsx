import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Calendar,
  Globe,
  HeadphonesIcon,
  MessageSquare,
  PhoneCall,
  Sparkles,
  Workflow,
} from "lucide-react";
import GlowCard, { GlowIcon } from "../components/GlowCard";

export const metadata: Metadata = {
  title: "Contact DOS",
  description:
    "Talk to DOS — Done-For-You AI Business Systems. Website rebuilds, Micah AI receptionist, COS communications, BOS booking, automation and managed hosting.",
};

const AREAS = [
  { icon: <Globe className="h-5 w-5" />, label: "Website rebuilds", tone: "violet" as const },
  { icon: <PhoneCall className="h-5 w-5" />, label: "Micah AI Receptionist", tone: "fuchsia" as const },
  { icon: <MessageSquare className="h-5 w-5" />, label: "COS Communication", tone: "cyan" as const },
  { icon: <Calendar className="h-5 w-5" />, label: "BOS Booking", tone: "emerald" as const },
  { icon: <Workflow className="h-5 w-5" />, label: "Automation + workflow design", tone: "violet" as const },
  { icon: <HeadphonesIcon className="h-5 w-5" />, label: "Managed hosting + support", tone: "cyan" as const },
];

export default function Page() {
  return (
    <main className="relative pt-32 sm:pt-40 pb-16">
      <section className="mx-auto max-w-6xl px-6">
        <div className="max-w-3xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-violet-400/20 bg-violet-500/10 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.2em] text-violet-200">
            <Sparkles className="h-3.5 w-3.5 text-violet-300" />
            Done-For-You AI Business Systems
          </span>
          <h1 className="mt-5 text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight leading-[1.05]">
            Contact <span className="text-gradient-purple">DOS.</span>
          </h1>
          <p className="mt-5 text-base sm:text-lg text-ink-muted leading-relaxed max-w-2xl">
            DOS designs, builds and manages complete AI business systems for modern Australian
            operators. Tell us what you need and we&apos;ll map the right system for your team.
          </p>
        </div>

        <div className="mt-14 grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <h2 className="text-xs font-semibold uppercase tracking-widest text-ink-muted">
              What we can help with
            </h2>
            <div className="mt-5 grid sm:grid-cols-2 gap-4">
              {AREAS.map((a) => (
                <GlowCard key={a.label} tone={a.tone}>
                  <div className="flex items-center gap-3">
                    <GlowIcon tone={a.tone}>{a.icon}</GlowIcon>
                    <span className="text-base font-semibold tracking-tight">{a.label}</span>
                  </div>
                </GlowCard>
              ))}
            </div>

            <div className="mt-10 grid gap-3 sm:grid-cols-2">
              <a
                href="mailto:hello@directiveos.com"
                className="glass rounded-xl px-4 py-3 hover:bg-white/[0.06] transition flex items-center gap-3"
              >
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-white/5 border border-white/10">
                  <MessageSquare className="h-4 w-4 text-cyan-300" />
                </span>
                <div>
                  <div className="text-[11px] font-mono uppercase tracking-widest text-ink-dim">Email</div>
                  <div className="text-sm font-medium">hello@directiveos.com</div>
                </div>
              </a>
              <div className="glass rounded-xl px-4 py-3 flex items-center gap-3">
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-white/5 border border-white/10">
                  <Globe className="h-4 w-4 text-emerald-300" />
                </span>
                <div>
                  <div className="text-[11px] font-mono uppercase tracking-widest text-ink-dim">Coverage</div>
                  <div className="text-sm font-medium">All of Australia · remote onboarding</div>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5">
            <GlowCard tone="violet" className="h-full">
              <h3 className="text-lg font-semibold tracking-tight">Get in touch</h3>
              <p className="mt-1 text-sm text-ink-muted">
                For a guided product walkthrough, head straight to{" "}
                <Link href="/onboarding" className="text-violet-300 hover:text-violet-200 underline underline-offset-4 decoration-dashed">
                  onboarding
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
                  rows={4}
                  placeholder="What are you trying to fix or automate?"
                  className="rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-sm placeholder-ink-dim outline-none focus:border-violet-400/50 focus:bg-white/[0.07] transition resize-none"
                />
                <button
                  type="submit"
                  className="btn-neon mt-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold text-white cursor-pointer"
                >
                  Send message <ArrowRight className="h-4 w-4" />
                </button>
              </form>
            </GlowCard>
          </div>
        </div>
      </section>
    </main>
  );
}
