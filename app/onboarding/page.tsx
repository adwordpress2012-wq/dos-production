import type { Metadata } from "next";
import OnboardingFlow from "./OnboardingFlow";

export const metadata: Metadata = {
  title: "Onboarding",
  description:
    "Tell us about your business and we'll start configuring your DOS — Micah, COS, BOS, website and DOS HUB — usually live within 7–14 days.",
};

type SP = Promise<{ session_id?: string; plan?: string }>;

export default async function Page({ searchParams }: { searchParams: SP }) {
  const sp = await searchParams;

  return (
    <main className="relative pt-32 sm:pt-40 pb-16">
      <section className="mx-auto max-w-5xl px-6">
        <div className="text-center max-w-2xl mx-auto">
          <span className="inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.2em] text-emerald-200">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-300 shadow-[0_0_10px_2px_rgba(52,247,193,0.6)]" />
            Onboarding
          </span>
          <h1 className="mt-5 text-4xl sm:text-5xl font-semibold tracking-tight leading-[1.05]">
            Welcome to <span className="text-gradient-purple">DOS.</span>
          </h1>
          <p className="mt-5 text-base sm:text-lg text-ink-muted leading-relaxed">
            Tell us about your business and we&apos;ll start configuring Micah, COS, BOS and your
            new website. Most customers are live within 7–14 days.
          </p>
        </div>

        <OnboardingFlow planId={sp.plan} stripeSessionId={sp.session_id} />
      </section>
    </main>
  );
}
