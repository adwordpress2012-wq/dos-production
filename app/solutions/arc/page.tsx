import { Fragment } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import {
  AlarmClock,
  ArrowRight,
  Banknote,
  Check,
  CirclePause,
  Equal,
  Eye,
  FileClock,
  Gauge,
  Handshake,
  Layers3,
  Plus,
  ReceiptText,
  RefreshCcw,
  ScanSearch,
  Scale,
  SendHorizontal,
  UserRoundCheck,
} from "lucide-react";
import PageCta from "@/app/components/PageCta";
import PublicPageHero from "@/app/components/PublicPageHero";
import SystemFlow, { type FlowStage } from "@/app/components/SystemFlow";
import { breadcrumbSchema, createPageMetadata, SITE_URL } from "@/app/lib/seo";

const DESCRIPTION =
  "DOS ARC is the receivables control layer of Directive OS. It sits around your existing accounting system and manages invoice follow-up — reminders, structured escalation, human tasks and clear internal status — before an account ever becomes a collection problem.";

export const metadata: Metadata = createPageMetadata({
  title: "DOS ARC — Accounts Receivable Control",
  description: DESCRIPTION,
  path: "/solutions/arc",
});

const FLOW: readonly FlowStage[] = [
  {
    title: "Invoice sent",
    copy: "The work is complete and the invoice leaves your existing accounting or invoicing system.",
    icon: SendHorizontal,
  },
  {
    title: "Due or unpaid",
    copy: "ARC tracks the account against its payment terms without duplicating your books.",
    icon: FileClock,
  },
  {
    title: "Soft reminder",
    copy: "A polite, professional prompt that protects the relationship while the account is still current.",
    icon: AlarmClock,
  },
  {
    title: "Follow-up",
    copy: "A structured sequence keeps the account visible instead of quietly ageing in a report.",
    icon: RefreshCcw,
  },
  {
    title: "Human task",
    copy: "The account is handed to a named person when judgement or a relationship call is required.",
    icon: UserRoundCheck,
    human: true,
  },
  {
    title: "Overdue or hold",
    copy: "Clear internal status so the team knows where an account stands before taking on more work.",
    icon: CirclePause,
  },
  {
    title: "External debt collection",
    copy: "If it is genuinely required, the account arrives with a complete, documented follow-up history.",
    icon: Scale,
    human: true,
  },
] as const;

const EQUATION = [
  {
    label: "Your invoicing or accounting system",
    copy: "Keeps issuing invoices and keeping the books exactly as it does today. Nothing is replaced.",
    icon: ReceiptText,
    operator: false,
    highlight: false,
  },
  {
    label: "DOS ARC",
    copy: "Takes control of everything that happens after the invoice is sent.",
    icon: Layers3,
    operator: true,
    highlight: true,
  },
  {
    label: "Structured follow-up and escalation",
    copy: "Consistent reminders, human tasks at the right moment, and a clear internal status on every account.",
    icon: Gauge,
    operator: true,
    highlight: false,
  },
];

const OUTCOMES = [
  "Less time chasing invoices",
  "Follow-up that happens every time",
  "Clear visibility over every account",
  "Problems caught earlier, not later",
  "Fewer overdue accounts",
  "A person involved when it matters",
  "Fewer accounts reaching debt collection",
];

const CAPABILITIES = [
  {
    title: "Consistent follow-up timing",
    copy: "Every invoice gets the same disciplined follow-up, whether the week is quiet or the busiest of the year.",
    icon: AlarmClock,
  },
  {
    title: "Escalation that reads the account",
    copy: "A long-standing client and a first-time customer thirty days overdue are not treated the same way.",
    icon: Layers3,
  },
  {
    title: "Human tasks, not silent automation",
    copy: "When a call is the right move, ARC creates the task and assigns it rather than sending another email.",
    icon: UserRoundCheck,
  },
  {
    title: "Receivables visibility",
    copy: "The team can see which accounts are current, which are being chased and which need a decision.",
    icon: Eye,
  },
  {
    title: "Account status and holds",
    copy: "Flag accounts that should not receive more work until the outstanding balance is resolved.",
    icon: CirclePause,
  },
  {
    title: "A documented history",
    copy: "Every reminder, response and escalation is recorded, so any decision that follows is well supported.",
    icon: ScanSearch,
  },
];

const NOT_ACCOUNTING = [
  "Keep issuing invoices from the accounting or invoicing platform you already use.",
  "ARC does not replace your bookkeeping, ledger or reconciliation.",
  "It controls the follow-up around those invoices — the part that usually depends on someone remembering.",
];

const breadcrumbs = breadcrumbSchema([
  { name: "Home", path: "/" },
  { name: "Solutions", path: "/solutions" },
  { name: "DOS ARC", path: "/solutions/arc" },
]);

const arcServiceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": `${SITE_URL}/solutions/arc#service`,
  name: "DOS ARC — Accounts Receivable Control",
  url: `${SITE_URL}/solutions/arc`,
  description: DESCRIPTION,
  provider: { "@id": `${SITE_URL}/#organisation` },
  areaServed: { "@type": "Country", name: "Australia" },
  serviceType: CAPABILITIES.map((capability) => capability.title),
  audience: {
    "@type": "BusinessAudience",
    audienceType: "Growing businesses",
  },
};

export default function ArcPage() {
  return (
    <main>
      <Script
        id="arc-breadcrumbs"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs).replace(/</g, "\\u003c") }}
      />
      <Script
        id="arc-service"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(arcServiceSchema).replace(/</g, "\\u003c") }}
      />

      <PublicPageHero
        eyebrow="DOS ARC — Accounts Receivable Control"
        title="Control invoice follow-up before it becomes a collection problem."
        description={DESCRIPTION}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Solutions", href: "/solutions" },
          { label: "DOS ARC" },
        ]}
      />

      <section className="pb-4">
        <div className="site-container">
          <div className="surface-card rounded-[1.75rem] p-7">
            <p className="eyebrow">Where ARC sits</p>
            <div className="mt-6 grid gap-3 lg:grid-cols-[1fr_auto_1fr_auto_1.15fr] lg:items-stretch">
              {EQUATION.map(({ label, copy, icon: Icon, operator, highlight }, index) => (
                <Fragment key={label}>
                  {operator ? (
                    <div className="flex items-center justify-center text-ink-dim lg:px-1">
                      {index === 2 ? <Equal className="h-5 w-5" aria-hidden /> : <Plus className="h-5 w-5" aria-hidden />}
                    </div>
                  ) : null}
                  <div
                    className={`rounded-2xl border p-5 ${
                      highlight
                        ? "border-violet-400/25 bg-violet-500/[0.07]"
                        : "border-white/[0.08] bg-white/[0.025]"
                    }`}
                  >
                    <span
                      className={`inline-flex h-10 w-10 items-center justify-center rounded-xl ${
                        highlight ? "bg-violet-500/15 text-violet-200" : "bg-white/[0.05] text-ink-muted"
                      }`}
                    >
                      <Icon className="h-4 w-4" aria-hidden />
                    </span>
                    <p className="mt-4 font-semibold text-white">{label}</p>
                    <p className="mt-2 text-sm leading-relaxed text-ink-muted">{copy}</p>
                  </div>
                </Fragment>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="pb-8">
        <div className="site-container">
          <div className="surface-card rounded-[1.75rem] p-7">
            <p className="eyebrow">What ARC changes</p>
            <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
              {OUTCOMES.map((outcome) => (
                <p key={outcome} className="flex gap-2 text-sm leading-relaxed text-ink-muted">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-teal-300" aria-hidden />
                  {outcome}
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>

      <SystemFlow
        eyebrow="How ARC follows an invoice"
        heading="A clear path from sent to settled — with escalation you control."
        intro="Every unpaid invoice follows the same structured escalation. A person is brought in well before the account becomes a serious problem."
        stages={FLOW}
      />

      <section className="site-section bg-[#0b0d1c]/80">
        <div className="site-container">
          <p className="eyebrow">System capabilities</p>
          <h2 className="section-heading mt-5">Follow-up that does not depend on who remembers.</h2>
          <div className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {CAPABILITIES.map(({ title, copy, icon: Icon }) => (
              <article key={title} className="surface-card rounded-2xl p-6">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-violet-500/12 text-violet-200">
                  <Icon className="h-5 w-5" aria-hidden />
                </span>
                <h3 className="mt-5 text-lg font-semibold text-white">{title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-muted">{copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="site-section">
        <div className="site-container grid gap-4 lg:grid-cols-2">
          <article className="surface-card rounded-[1.75rem] p-8">
            <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-violet-500/12 text-violet-200">
              <ReceiptText className="h-5 w-5" aria-hidden />
            </span>
            <h2 className="mt-6 text-2xl font-semibold text-white">ARC is not accounting software.</h2>
            <ul className="mt-5 grid gap-3">
              {NOT_ACCOUNTING.map((item) => (
                <li key={item} className="flex gap-2 text-sm leading-relaxed text-ink-muted">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-teal-300" aria-hidden />
                  {item}
                </li>
              ))}
            </ul>
          </article>
          <article className="surface-card rounded-[1.75rem] p-8">
            <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-teal-400/12 text-teal-200">
              <Handshake className="h-5 w-5" aria-hidden />
            </span>
            <h2 className="mt-6 text-2xl font-semibold text-white">Firm on the process. Careful with the relationship.</h2>
            <p className="mt-4 leading-relaxed text-ink-muted">
              Most overdue accounts are not disputes. They are invoices that were missed, forgotten or waiting on someone
              internally. ARC handles those consistently and quietly, so the harder conversations become rare — and when
              one is needed, a person makes the call.
            </p>
            <Link
              href="/solutions#pipelines"
              className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-violet-200 hover:text-white"
            >
              See how accounts stay visible <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </article>
        </div>
      </section>

      <section className="pearl-section site-section">
        <div className="site-container grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
          <div>
            <p className="eyebrow !text-violet-700">Business before technology</p>
            <h2 className="section-heading mt-5">Built around your terms, not a generic reminder schedule.</h2>
            <p className="section-copy mt-6">
              ARC is configured around your payment terms, your customer types and the point at which your business
              genuinely wants a person involved. Nothing escalates without a rule you set.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              {[
                { label: "Your payment terms", icon: Banknote },
                { label: "Your escalation points", icon: Gauge },
                { label: "Your team, notified", icon: Eye },
              ].map(({ label, icon: Icon }) => (
                <span
                  key={label}
                  className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-violet-950/10 bg-white/70 px-4 text-sm font-semibold"
                >
                  <Icon className="h-4 w-4 text-violet-700" aria-hidden />
                  {label}
                </span>
              ))}
            </div>
          </div>
          <div className="rounded-[1.75rem] border border-violet-950/10 bg-white/70 p-8">
            <Check className="h-7 w-7 text-violet-700" aria-hidden />
            <h3 className="mt-5 text-2xl font-semibold">Price Value Fee</h3>
            <p className="mt-4 leading-relaxed">
              Every implementation is tailored using DOS Price Value Fee based on invoice volume, escalation complexity,
              integration requirements and support needs.
            </p>
          </div>
        </div>
      </section>

      <PageCta
        source="dos-arc"
        title="Stop chasing invoices from memory."
        copy="Tell DOS how your receivables are followed up today. We will shape the simplest useful control system around them."
      />
    </main>
  );
}
