import type { Metadata } from "next";
import { PLAN_CATALOG } from "../lib/stripe";
import PricingPlans from "./PricingPlans";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Simple plans for small businesses — automate customer enquiries, bookings, and follow-ups with done-for-you setup. Founding member offer from $197/month.",
};

function UsageOverview() {
  const blocks = [
    {
      title: "Conversation usage",
      body: "Extra conversations are only charged when you exceed your included monthly allowance.",
    },
    {
      title: "SMS / WhatsApp usage",
      body: "Extra SMS and WhatsApp messages are charged at simple per-message rates.",
    },
    {
      title: "Voice usage",
      body: "Voice usage is available on selected plans and quoted based on business needs.",
    },
  ];
  return (
    <div className="mt-16 rounded-3xl border border-white/10 bg-white/[0.02] p-8 sm:p-10">
      <h2 className="text-lg font-semibold tracking-tight text-white">How usage works</h2>
      <ul className="mt-8 grid gap-5 sm:gap-6 md:grid-cols-3">
        {blocks.map((b) => (
          <li key={b.title} className="rounded-2xl border border-white/5 bg-white/[0.02] p-5">
            <h3 className="text-sm font-semibold text-white">{b.title}</h3>
            <p className="mt-2 text-sm text-ink-muted leading-relaxed">{b.body}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

function FoundingMemberNote() {
  return (
    <div className="mt-12 max-w-2xl mx-auto rounded-2xl border border-white/10 bg-white/[0.02] px-5 py-4 sm:px-6 sm:py-5">
      <h3 className="text-sm font-semibold tracking-tight text-white">Founding member programme</h3>
      <p className="mt-2 text-sm text-ink-muted leading-relaxed">
        As a thank-you, founding members share a short Loom testimonial, leave a Google review, and
        add a backlink to DOS from their website.
      </p>
      <p className="mt-3 text-xs text-ink-dim leading-relaxed">
        Help us shape the future of Micah AI Receptionist.
      </p>
    </div>
  );
}

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
            Simple plans. <span className="text-gradient-purple">Serious results.</span>
          </h1>
          <p className="mt-5 text-base sm:text-lg text-ink-muted leading-relaxed">
            Pick the level that fits your business. We handle setup, training, and ongoing support so
            you can turn more enquiries into bookings — without a big upfront bill.
          </p>
          <p className="mt-4 text-base sm:text-lg text-white/90 font-medium leading-relaxed">
            Built for small businesses that never want to miss another customer enquiry again.
          </p>
          <p className="mt-5 text-sm sm:text-base text-ink-muted leading-relaxed max-w-2xl mx-auto">
            All plans include done-for-you setup, onboarding, and support.
          </p>
        </div>

        <PricingPlans plans={PLAN_CATALOG} />

        <FoundingMemberNote />

        <UsageOverview />

        <div className="mt-20 grid md:grid-cols-3 gap-5">
          {[
            {
              title: "Done-for-you setup",
              body: "We configure your receptionist, website widget, messaging, and booking flows — you don&apos;t need to become a tech expert.",
            },
            {
              title: "Cancel anytime",
              body: "Flexible month-to-month plans after your first 90 days. Read our Cancellation Policy for the full terms.",
            },
            {
              title: "GST inclusive",
              body: "Pricing is in AUD and includes GST for Australian customers. Tax invoice provided every month.",
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
