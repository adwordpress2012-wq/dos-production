import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import {
  ArrowRight,
  BellRing,
  Bot,
  Check,
  ClipboardList,
  Clock3,
  Inbox,
  MailCheck,
  MessageSquareText,
  Route,
  SendHorizontal,
  ShieldCheck,
  Sparkles,
  UserRoundCheck,
} from "lucide-react";
import PageCta from "@/app/components/PageCta";
import PublicPageHero from "@/app/components/PublicPageHero";
import SystemFlow, { type FlowStage } from "@/app/components/SystemFlow";
import { breadcrumbSchema, createPageMetadata, SITE_URL } from "@/app/lib/seo";

const DESCRIPTION =
  "DOS ERA answers inbound business email with wording you have approved, captures the details your team is always missing, sends each enquiry to the right person and hands over to a human when it matters.";

export const metadata: Metadata = createPageMetadata({
  title: "DOS ERA — Email Response Automation",
  description: DESCRIPTION,
  path: "/solutions/era",
});

const FLOW: readonly FlowStage[] = [
  {
    title: "Inbound email",
    copy: "A customer, supplier or new enquiry arrives in the business inbox.",
    icon: Inbox,
  },
  {
    title: "Micah understands the intent",
    copy: "Works out what the sender actually wants: a quote, a booking, an account question or something new.",
    icon: Bot,
  },
  {
    title: "Approved response",
    copy: "Replies using wording your business has already approved, in your voice.",
    icon: MailCheck,
  },
  {
    title: "Capture missing details",
    copy: "Asks for the job, site or account information your team needs before it can quote or act.",
    icon: ClipboardList,
  },
  {
    title: "Route the enquiry",
    copy: "Sends the conversation to the correct person or team instead of a shared inbox.",
    icon: Route,
  },
  {
    title: "Notify the team",
    copy: "Tells the nominated staff member, so nothing sits unread while a customer waits.",
    icon: BellRing,
  },
  {
    title: "Human escalation",
    copy: "Hands sensitive, complex or high-value conversations to a person, with the full thread intact.",
    icon: UserRoundCheck,
    human: true,
  },
] as const;

const OUTCOMES = [
  "Faster replies to every enquiry",
  "Fewer missed and forgotten enquiries",
  "Less repetitive admin for the team",
  "The details you need, captured up front",
  "Enquiries routed to the right person",
  "The right staff member notified",
  "Repeat questions answered consistently",
  "Important conversations reach a human",
];

const EXAMPLE = [
  "A customer emails asking for a quote.",
  "ERA replies straight away using approved wording, not a generic auto-response.",
  "It asks for the missing job and site details the estimator always needs.",
  "The answers are recorded against the customer instead of buried in a thread.",
  "The right staff member is notified that a quotable job is ready.",
  "A person takes over to price the work and win it.",
];

const CAPABILITIES = [
  {
    title: "Only the answers you approve",
    copy: "Replies come from wording your business has signed off, so customers get accurate answers in your voice.",
    icon: MessageSquareText,
  },
  {
    title: "Structured detail capture",
    copy: "The information your team always has to ask for is collected in the first exchange, not the fourth.",
    icon: ClipboardList,
  },
  {
    title: "Sent to the right person",
    copy: "Enquiries reach the person who can act on them, not whoever happens to be watching the inbox.",
    icon: Route,
  },
  {
    title: "Nothing repeated back to the customer",
    copy: "Each reply knows what came before, so customers are never asked the same question twice.",
    icon: Clock3,
  },
  {
    title: "Nominated team notifications",
    copy: "The people who need to know are told, with enough context to act without reading the whole thread.",
    icon: BellRing,
  },
  {
    title: "Escalation rules you set",
    copy: "You decide what must reach a person — by topic, value, customer or tone — and ERA never crosses that line.",
    icon: ShieldCheck,
  },
];

const breadcrumbs = breadcrumbSchema([
  { name: "Home", path: "/" },
  { name: "Solutions", path: "/solutions" },
  { name: "DOS ERA", path: "/solutions/era" },
]);

const eraServiceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": `${SITE_URL}/solutions/era#service`,
  name: "DOS ERA — Email Response Automation",
  url: `${SITE_URL}/solutions/era`,
  description: DESCRIPTION,
  provider: { "@id": `${SITE_URL}/#organisation` },
  areaServed: { "@type": "Country", name: "Australia" },
  serviceType: CAPABILITIES.map((capability) => capability.title),
  audience: {
    "@type": "BusinessAudience",
    audienceType: "Growing businesses",
  },
};

export default function EraPage() {
  return (
    <main>
      <Script
        id="era-breadcrumbs"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs).replace(/</g, "\\u003c") }}
      />
      <Script
        id="era-service"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(eraServiceSchema).replace(/</g, "\\u003c") }}
      />

      <PublicPageHero
        eyebrow="DOS ERA — Email Response Automation"
        title="Inbound email, answered and routed. Your team still in control."
        description={DESCRIPTION}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Solutions", href: "/solutions" },
          { label: "DOS ERA" },
        ]}
      />

      <section className="pb-8">
        <div className="site-container">
          <div className="surface-card rounded-[1.75rem] p-7">
            <p className="eyebrow">What ERA changes</p>
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
        eyebrow="How ERA handles an email"
        heading="From inbox to the right person, without the wait."
        intro="Every inbound email follows the same controlled path. Where a person is needed, ERA stops and hands over rather than guessing."
        stages={FLOW}
      />

      <section className="site-section bg-[#0b0d1c]/80">
        <div className="site-container">
          <p className="eyebrow">System capabilities</p>
          <h2 className="section-heading mt-5">Built for real business email, not scripted replies.</h2>
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
        <div className="site-container grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
          <div>
            <p className="eyebrow">A worked example</p>
            <h2 className="section-heading mt-5">A quote request, handled properly.</h2>
            <p className="section-copy mt-6">
              The difference is not that the email gets a reply. It is that by the time a person opens it, the job is
              already qualified and the details are already recorded.
            </p>
            <Link
              href="/solutions/smart-intake-follow-up"
              className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-violet-200 hover:text-white"
            >
              See how captured enquiries are organised <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>
          <ol className="grid gap-3">
            {EXAMPLE.map((step, index) => (
              <li key={step} className="surface-card flex items-start gap-4 rounded-2xl px-5 py-4">
                <span className="mt-0.5 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-violet-500/12 text-xs font-semibold text-violet-200">
                  {index + 1}
                </span>
                <p className="text-sm leading-relaxed text-ink-muted">{step}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="site-section pt-0">
        <div className="site-container grid gap-4 lg:grid-cols-2">
          <article className="surface-card rounded-[1.75rem] p-8">
            <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-teal-400/12 text-teal-200">
              <Sparkles className="h-5 w-5" aria-hidden />
            </span>
            <h2 className="mt-6 text-2xl font-semibold text-white">Micah and ERA are not two products.</h2>
            <p className="mt-4 leading-relaxed text-ink-muted">
              Micah is the communication and intelligence layer. DOS ERA is the system that puts it to work on your
              inbox, with the routing, capture and escalation rules your business runs on. You do not choose between
              them.
            </p>
            <Link
              href="/solutions#micah"
              className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-violet-200 hover:text-white"
            >
              Learn about Micah <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </article>
          <article className="surface-card rounded-[1.75rem] p-8">
            <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-violet-500/12 text-violet-200">
              <SendHorizontal className="h-5 w-5" aria-hidden />
            </span>
            <h2 className="mt-6 text-2xl font-semibold text-white">Not an email chatbot.</h2>
            <p className="mt-4 leading-relaxed text-ink-muted">
              A chatbot answers a question and forgets it. ERA understands the intent behind the email, collects what the
              business is missing, updates the customer record, tells the right person and knows when to stop and let a
              human take over.
            </p>
          </article>
        </div>
      </section>

      <section className="pearl-section site-section">
        <div className="site-container grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
          <div>
            <p className="eyebrow !text-violet-700">Business before technology</p>
            <h2 className="section-heading mt-5">Approved answers only. Escalation on your terms.</h2>
            <p className="section-copy mt-6">
              ERA is configured around the emails your business actually receives. It answers only what you have approved
              it to answer, and every rule about what must reach a person is yours to set.
            </p>
          </div>
          <div className="rounded-[1.75rem] border border-violet-950/10 bg-white/70 p-8">
            <Check className="h-7 w-7 text-violet-700" aria-hidden />
            <h3 className="mt-5 text-2xl font-semibold">Price Value Fee</h3>
            <p className="mt-4 leading-relaxed">
              Every implementation is tailored using DOS Price Value Fee based on email volume, workflow complexity,
              routing requirements and support needs.
            </p>
          </div>
        </div>
      </section>

      <PageCta
        source="dos-era"
        title="Start with the inbox that is costing you the most."
        copy="Tell DOS which enquiries keep slipping through email. We will shape the simplest useful response system around them."
      />
    </main>
  );
}
