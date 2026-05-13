import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { getFoundingPlan, getMainPricingPlans } from "../lib/stripe";
import PricingPlans from "./PricingPlans";
import CalendlyPopupLink from "../components/CalendlyPopupLink";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "DOS Orbit, Nexus and Titan — done-for-you websites, Micah AI receptionist and DOS Workspace for Australian small businesses. Stop missing customers.",
};

const CALENDLY_URL = "https://calendly.com/adwordpress2012/dos-ai-business-system-demo";
const MAIL_WEBSITE_AUDIT =
  "mailto:hello@directiveos.com?subject=Request%20Website%20Audit%20—%20DOS";
const MAIL_JAYSON = "mailto:jayson@directiveos.com.au?subject=Talk%20With%20Jayson%20—%20DOS";

const WORKSPACE_VALUE = [
  "DOS Workspace access",
  "Enquiry dashboard",
  "Customer conversation management",
  "Lead tracking",
  "Booking management",
  "Mobile-friendly workspace",
] as const;

function DosWorkspaceValueStrip() {
  return (
    <div className="mt-14 rounded-3xl border border-violet-400/20 bg-gradient-to-br from-violet-500/10 via-white/[0.03] to-cyan-500/10 p-6 sm:p-8 ring-glow-soft">
      <div className="text-center max-w-2xl mx-auto">
        <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-violet-200/90">
          Included on every plan
        </p>
        <h2 className="mt-3 text-xl sm:text-2xl font-semibold tracking-tight text-white">
          DOS Workspace — your client command hub
        </h2>
        <p className="mt-2 text-sm text-ink-muted leading-relaxed">
          Manage enquiries, bookings, customer conversations and automation tools in one place.
        </p>
      </div>
      <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3 max-w-4xl mx-auto">
        {WORKSPACE_VALUE.map((line) => (
          <li
            key={line}
            className="flex items-center gap-2.5 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-ink-muted"
          >
            <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-400" aria-hidden />
            <span className="font-medium text-white/90">{line}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function FoundingOfferCard() {
  const founding = getFoundingPlan();
  return (
    <div className="mt-12 max-w-3xl mx-auto rounded-3xl border border-amber-400/25 bg-gradient-to-br from-amber-500/10 via-white/[0.02] to-violet-500/10 p-6 sm:p-8">
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
        <div>
          <span className="inline-flex rounded-full border border-amber-400/30 bg-amber-400/10 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-widest text-amber-100">
            {founding.badge}
          </span>
          <h3 className="mt-3 text-lg font-semibold tracking-tight text-white">{founding.headline}</h3>
          <p className="mt-2 text-sm text-ink-muted leading-relaxed">{founding.description}</p>
          <p className="mt-3 text-xs text-ink-dim leading-relaxed">
            As a thank-you, founding members share a short Loom testimonial, leave a Google review, and add a
            backlink to DOS from their website.
          </p>
        </div>
        <div className="shrink-0 text-left sm:text-right">
          <p className="text-3xl font-semibold tracking-tight text-white">
            {founding.priceLabel}
            <span className="text-base font-medium text-ink-muted">{founding.cadence}</span>
          </p>
          <p className="text-xs text-ink-dim mt-1">{founding.setupLabel}</p>
          <a
            href={founding.cta.kind === "link" ? founding.cta.href : "/contact"}
            className="mt-4 inline-flex btn-neon items-center justify-center rounded-xl px-5 py-2.5 text-sm font-semibold text-white w-full sm:w-auto"
          >
            {founding.cta.label}
          </a>
        </div>
      </div>
    </div>
  );
}

function PricingSecondaryActions() {
  return (
    <div className="mt-14 flex flex-col items-center gap-4">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-ink-muted">Next steps</p>
      <div className="flex flex-col sm:flex-row flex-wrap items-stretch justify-center gap-3 w-full max-w-3xl">
        <CalendlyPopupLink className="btn-book-demo flex-1 min-w-[160px] inline-flex items-center justify-center rounded-xl px-5 py-3 text-sm font-semibold text-white text-center">
          Book Demo
        </CalendlyPopupLink>
        <a
          href={MAIL_WEBSITE_AUDIT}
          className="btn-ghost flex-1 min-w-[160px] inline-flex items-center justify-center rounded-xl px-5 py-3 text-sm font-semibold text-white border border-white/12 text-center"
        >
          Request Website Audit
        </a>
        <a
          href={MAIL_JAYSON}
          className="btn-ghost flex-1 min-w-[160px] inline-flex items-center justify-center rounded-xl px-5 py-3 text-sm font-semibold text-white border border-white/12 text-center"
        >
          Talk With Jayson
        </a>
      </div>
      <p className="text-xs text-ink-dim text-center max-w-md">
        Prefer to browse first?{" "}
        <Link href="/workspace-demo" className="text-violet-300 hover:text-violet-200 underline underline-offset-4">
          Open the DOS Workspace demo
        </Link>{" "}
        or{" "}
        <a href={CALENDLY_URL} className="text-violet-300 hover:text-violet-200 underline underline-offset-4">
          book a live walkthrough
        </a>
        .
      </p>
    </div>
  );
}

function OutcomesStrip() {
  const blocks = [
    {
      title: "Fewer missed enquiries",
      body: "Web chat, SMS and WhatsApp can all route into one workspace so nothing slips through the cracks.",
    },
    {
      title: "Faster customer response",
      body: "Micah and your messaging flows help you reply quickly — even after hours — without hiring a 24/7 desk.",
    },
    {
      title: "Managed for you",
      body: "We build, host and tune your system. You stay focused on customers — not software configuration.",
    },
  ];
  return (
    <div className="mt-16 rounded-3xl border border-white/10 bg-white/[0.02] p-8 sm:p-10">
      <h2 className="text-lg font-semibold tracking-tight text-white text-center">Built around business outcomes</h2>
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

export default function Page() {
  return (
    <main className="relative pt-32 sm:pt-40 pb-16">
      <section className="mx-auto max-w-7xl px-6">
        <div className="text-center max-w-3xl mx-auto">
          <span className="inline-flex items-center gap-2 rounded-full border border-violet-400/20 bg-violet-500/10 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.2em] text-violet-200">
            <span className="h-1.5 w-1.5 rounded-full bg-violet-300 shadow-[0_0_10px_2px_rgba(168,85,247,0.7)]" />
            Done-For-You AI Business Systems
          </span>
          <h1 className="mt-5 text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight leading-[1.05]">
            Stop missing <span className="text-gradient-purple">customers.</span>
          </h1>
          <p className="mt-5 text-base sm:text-lg text-ink-muted leading-relaxed">
            We build and manage modern websites, AI receptionists, bookings, SMS, WhatsApp, and customer enquiry
            systems for Australian small businesses.
          </p>
          <p className="mt-4 text-base sm:text-lg text-white/90 font-medium leading-relaxed">
            Clear plans. Premium delivery. Human support from Australia.
          </p>
        </div>

        <DosWorkspaceValueStrip />

        <FoundingOfferCard />

        <PricingPlans plans={getMainPricingPlans()} />

        <PricingSecondaryActions />

        <OutcomesStrip />

        <div className="mt-20 grid md:grid-cols-3 gap-5">
          {[
            {
              title: "Done-for-you setup",
              body: "We configure your receptionist, website, messaging and booking flows — you do not need to become a tech expert.",
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
