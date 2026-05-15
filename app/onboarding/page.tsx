import type { Metadata } from "next";
import { isSupabaseAdminPersistenceConfigured } from "@/app/lib/supabase";
import OnboardingFlow from "./OnboardingFlow";

export const metadata: Metadata = {
  title: "Onboarding",
  description:
    "Tell us about your business and we'll start configuring your DOS — Micah, COS, BOS, website and DOS HUB — usually live within 7–14 days.",
};

type SP = Promise<{ session_id?: string; plan?: string }>;

export default async function Page({ searchParams }: { searchParams: SP }) {
  const sp = await searchParams;
  const showSupabaseConfigNotice = !isSupabaseAdminPersistenceConfigured();

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

        {showSupabaseConfigNotice ? (
          <div
            role="status"
            className="mt-8 mx-auto max-w-2xl rounded-xl border border-amber-400/25 bg-amber-400/10 px-4 py-3 text-sm text-amber-100/95 text-center leading-relaxed"
          >
            <strong className="font-semibold text-amber-50">Configuration notice.</strong>{" "}
            Database persistence is not fully configured on this deployment. You can still complete onboarding — your
            submission will be accepted and our team will follow up. Operators: in Vercel Production use these exact
            names — valid <span className="font-mono text-[11px] text-amber-200/90">NEXT_PUBLIC_SUPABASE_URL</span>{" "}
            (https) and <span className="font-mono text-[11px] text-amber-200/90">SUPABASE_SERVICE_ROLE_KEY</span> are
            required to save tenants. For browser-side Supabase (Command Centre and other client features), also set{" "}
            <span className="font-mono text-[11px] text-amber-200/90">NEXT_PUBLIC_SUPABASE_ANON_KEY</span> — see{" "}
            <span className="font-mono text-[11px] text-amber-200/90">.env.example</span> and README (this notice only
            reflects tenant persistence).
          </div>
        ) : null}

        <OnboardingFlow planId={sp.plan} stripeSessionId={sp.session_id} />
      </section>
    </main>
  );
}
