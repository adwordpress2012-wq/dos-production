import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Sparkles } from "lucide-react";

export const metadata: Metadata = {
  title: "DOS proposal",
  description:
    "Request a tailored DOS proposal — website, Micah AI receptionist, COS communications, BOS booking and DOS HUB, all bundled.",
};

const INCLUDED = [
  "Website rebuild on modern hosting",
  "Micah AI receptionist (24/7)",
  "COS — SMS, email and web chat",
  "BOS — booking, reminders, deposits",
  "DOS HUB dashboard",
  "Australian phone numbers + opt-in flows",
  "Onboarding, training and managed support",
];

export default function Page() {
  return (
    <main className="relative pt-32 sm:pt-40 pb-16">
      <section className="mx-auto max-w-5xl px-6">
        <div className="text-center max-w-2xl mx-auto">
          <span className="inline-flex items-center gap-2 rounded-full border border-fuchsia-400/20 bg-fuchsia-500/10 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.2em] text-fuchsia-200">
            <Sparkles className="h-3.5 w-3.5" />
            Tailored proposal
          </span>
          <h1 className="mt-5 text-4xl sm:text-5xl font-semibold tracking-tight leading-[1.05]">
            The full <span className="text-gradient-purple">DOS bundle.</span>
          </h1>
          <p className="mt-5 text-base sm:text-lg text-ink-muted leading-relaxed">
            Website, Micah, COS, BOS and DOS HUB — bundled and configured to your
            business. We&apos;ll prepare a proposal with fixed pricing within 2 business days.
          </p>
        </div>

        <div className="mt-12 grid gap-5 lg:grid-cols-2">
          <div className="glass-strong rounded-2xl p-7 ring-glow-soft">
            <h2 className="text-xl font-semibold tracking-tight">What&apos;s in the proposal</h2>
            <ul className="mt-5 space-y-3 text-sm text-ink-muted">
              {INCLUDED.map((b) => (
                <li key={b} className="flex items-start gap-2.5">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
            <div className="mt-7 grid gap-2 text-xs text-ink-dim font-mono uppercase tracking-widest">
              <div>· fixed pricing — no surprises</div>
              <div>· phased rollout · 7–14 day go-live</div>
              <div>· month-to-month after first 90 days</div>
            </div>
          </div>

          <div className="glass-strong rounded-2xl p-7">
            <h2 className="text-xl font-semibold tracking-tight">Two ways to start</h2>
            <p className="mt-2 text-sm text-ink-muted">
              Pick whichever path fits — or do both. We&apos;ll line everything up either way.
            </p>

            <div className="mt-6 grid gap-3">
              <Link
                href="/onboarding"
                className="group rounded-2xl glass p-5 hover:bg-white/[0.06] transition"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="text-base font-semibold">Start guided onboarding</h3>
                    <p className="mt-1 text-sm text-ink-muted">
                      Tell us about your business — our team builds the proposal from there.
                    </p>
                  </div>
                  <ArrowRight className="mt-1 h-4 w-4 text-ink-muted group-hover:text-white transition" />
                </div>
              </Link>

              <Link
                href="/quote-builder"
                className="group rounded-2xl glass p-5 hover:bg-white/[0.06] transition"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="text-base font-semibold">Just need a website quote</h3>
                    <p className="mt-1 text-sm text-ink-muted">
                      Want only the website rebuild for now? Skip ahead to the quote form.
                    </p>
                  </div>
                  <ArrowRight className="mt-1 h-4 w-4 text-ink-muted group-hover:text-white transition" />
                </div>
              </Link>

              <Link
                href="/pricing"
                className="group rounded-2xl glass p-5 hover:bg-white/[0.06] transition"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="text-base font-semibold">Self-serve via pricing</h3>
                    <p className="mt-1 text-sm text-ink-muted">
                      Already know what you want? Pick a plan and check out via Stripe.
                    </p>
                  </div>
                  <ArrowRight className="mt-1 h-4 w-4 text-ink-muted group-hover:text-white transition" />
                </div>
              </Link>
            </div>

            <p className="mt-6 text-xs text-ink-dim">
              Questions? Email{" "}
              <a href="mailto:hello@directiveos.com" className="text-violet-300 hover:text-violet-200">
                hello@directiveos.com
              </a>
              .
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
