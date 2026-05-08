import type { Metadata } from "next";
import { PLAN_CATALOG } from "../lib/stripe";
import PricingPlans from "./PricingPlans";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Replace your website, phones, inbox and booking system for one flat monthly fee. DOS plans start at $390/month, fully managed.",
};

export default function Page() {
  return (
    <main className="relative pt-32 sm:pt-40 pb-16">
      <section className="mx-auto max-w-7xl px-6">
        <div className="text-center max-w-3xl mx-auto">
          <span className="inline-flex items-center gap-2 rounded-full border border-violet-400/20 bg-violet-500/10 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.2em] text-violet-200">
            <span className="h-1.5 w-1.5 rounded-full bg-violet-300 shadow-[0_0_10px_2px_rgba(168,85,247,0.7)]" />
            Pricing
          </span>
          <h1 className="mt-5 text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight leading-[1.05]">
            One subscription. <span className="text-gradient-purple">Done for you.</span>
          </h1>
          <p className="mt-5 text-base sm:text-lg text-ink-muted leading-relaxed">
            Setup, hosting, training and Australian-based support — all included. No surprise
            invoices. No per-seat fees.
          </p>
        </div>

        <PricingPlans plans={[...PLAN_CATALOG]} />

        <div className="mt-20 grid md:grid-cols-3 gap-5">
          {[
            {
              title: "Setup is included",
              body:
                "Onboarding, training, voice/number setup and first website rebuild are all part of your setup fee. No surprise &lsquo;professional services&rsquo; bills.",
            },
            {
              title: "Cancel anytime",
              body:
                "Month-to-month after your first 90 days. Read our Cancellation Policy for the full terms.",
            },
            {
              title: "GST inclusive",
              body:
                "Pricing is in AUD and includes GST for Australian customers. Tax invoice provided every month.",
            },
          ].map((b) => (
            <div key={b.title} className="glass rounded-2xl p-6">
              <h3 className="text-base font-semibold tracking-tight">{b.title}</h3>
              <p className="mt-2 text-sm text-ink-muted leading-relaxed">{b.body}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
