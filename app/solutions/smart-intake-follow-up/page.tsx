import type { Metadata } from "next";
import Script from "next/script";
import {
  BellRing,
  CalendarCheck2,
  Check,
  ClipboardList,
  ContactRound,
  GitBranch,
  MailCheck,
  MessageSquareText,
  RefreshCcw,
  Route,
  ScanSearch,
  Tags,
  UserRoundCheck,
  Workflow,
} from "lucide-react";
import PageCta from "@/app/components/PageCta";
import PublicPageHero from "@/app/components/PublicPageHero";
import { breadcrumbSchema, createPageMetadata, SITE_URL } from "@/app/lib/seo";

const DESCRIPTION =
  "The DOS Smart Intake & Follow-Up System turns website enquiries, walk-ins, referrals, phone leads and campaigns into organised CRM opportunities with automatic acknowledgement, appointment prompts and follow-up.";

export const metadata: Metadata = createPageMetadata({
  title: "DOS Smart Intake & Follow-Up System",
  description: DESCRIPTION,
  path: "/solutions/smart-intake-follow-up",
});

const CAPABILITIES = [
  {
    title: "Customised branded intake form",
    copy: "Collect the details the business needs through a clear, consistent customer experience.",
    icon: ClipboardList,
  },
  {
    title: "Contact creation or update",
    copy: "Keep new and returning enquiries attached to an organised customer record.",
    icon: ContactRound,
  },
  {
    title: "Duplicate prevention",
    copy: "Reduce repeated records so the team can work from cleaner customer information.",
    icon: UserRoundCheck,
  },
  {
    title: "Lead-source tracking",
    copy: "Understand whether an opportunity came from the website, a referral, a call or a campaign.",
    icon: ScanSearch,
  },
  {
    title: "Industry and service tagging",
    copy: "Add useful context so each enquiry can be sorted and handled appropriately.",
    icon: Tags,
  },
  {
    title: "Opportunity creation",
    copy: "Turn a completed intake into a visible business opportunity for the team.",
    icon: GitBranch,
  },
  {
    title: "Pipeline placement",
    copy: "Place each opportunity at the right starting stage instead of leaving it in an inbox.",
    icon: Route,
  },
  {
    title: "Conditional SMS and email",
    copy: "Send the right acknowledgement and next step based on the enquiry context.",
    icon: MessageSquareText,
  },
  {
    title: "Owner notifications",
    copy: "Alert the right person when a new opportunity needs attention.",
    icon: BellRing,
  },
  {
    title: "Discovery or appointment booking",
    copy: "Guide suitable enquiries toward the correct discovery call or appointment pathway.",
    icon: CalendarCheck2,
  },
  {
    title: "Follow-up sequence",
    copy: "Keep the conversation moving when the next step has not yet been completed.",
    icon: RefreshCcw,
  },
  {
    title: "Pipeline stage updates",
    copy: "Reflect meaningful progress as customers acknowledge, book or move through the process.",
    icon: MailCheck,
  },
  {
    title: "Workflow monitoring",
    copy: "Review the workflow and improve it as the business, lead volume and team evolve.",
    icon: Workflow,
  },
] as const;

const INTAKE_SOURCES = ["Website enquiries", "Walk-ins", "Referrals", "Phone leads", "Campaigns"];

const FLOW = [
  {
    title: "Capture",
    copy: "Collect consistent customer and enquiry details through a branded intake pathway.",
  },
  {
    title: "Organise",
    copy: "Create or update the contact, prevent duplicates and place the opportunity correctly.",
  },
  {
    title: "Respond",
    copy: "Acknowledge the enquiry, notify the owner and prompt the most useful appointment.",
  },
  {
    title: "Follow up",
    copy: "Keep uncompleted next steps moving and monitor the workflow as the business grows.",
  },
];

// Internal product code: CDIF — Customised DOS Intake Form.
const breadcrumbs = breadcrumbSchema([
  { name: "Home", path: "/" },
  { name: "Solutions", path: "/solutions" },
  { name: "Smart Intake & Follow-Up", path: "/solutions/smart-intake-follow-up" },
]);

const smartIntakeServiceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": `${SITE_URL}/solutions/smart-intake-follow-up#service`,
  name: "DOS Smart Intake & Follow-Up System",
  url: `${SITE_URL}/solutions/smart-intake-follow-up`,
  description: DESCRIPTION,
  provider: { "@id": `${SITE_URL}/#organisation` },
  areaServed: { "@type": "Country", name: "Australia" },
  serviceType: CAPABILITIES.map((capability) => capability.title),
  audience: {
    "@type": "BusinessAudience",
    audienceType: "Growing businesses",
  },
};

export default function SmartIntakeFollowUpPage() {
  return (
    <main>
      <Script
        id="smart-intake-breadcrumbs"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs).replace(/</g, "\\u003c") }}
      />
      <Script
        id="smart-intake-service"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(smartIntakeServiceSchema).replace(/</g, "\\u003c") }}
      />

      <PublicPageHero
        eyebrow="DOS Smart Intake & Follow-Up"
        title="Capture every enquiry. Organise every opportunity. Follow up automatically."
        description={DESCRIPTION}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Solutions", href: "/solutions" },
          { label: "Smart Intake & Follow-Up" },
        ]}
      />

      <section className="pb-8">
        <div className="site-container">
          <div className="surface-card rounded-[1.75rem] p-7">
            <p className="eyebrow">One clear intake pathway</p>
            <div className="mt-6 flex flex-wrap gap-3">
              {INTAKE_SOURCES.map((source) => (
                <span
                  key={source}
                  className="inline-flex min-h-11 items-center rounded-xl border border-white/[0.08] bg-white/[0.035] px-4 text-sm font-medium text-white"
                >
                  {source}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="site-section">
        <div className="site-container">
          <p className="eyebrow">From enquiry to next action</p>
          <h2 className="section-heading mt-5">A practical workflow that keeps opportunities moving.</h2>
          <div className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {FLOW.map((stage, index) => (
              <article key={stage.title} className="surface-card rounded-[1.75rem] p-7">
                <span className="text-xs font-semibold tracking-[0.2em] text-violet-300">
                  0{index + 1}
                </span>
                <h3 className="mt-7 text-2xl font-semibold text-white">{stage.title}</h3>
                <p className="mt-4 text-sm leading-relaxed text-ink-muted">{stage.copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="site-section bg-[#0b0d1c]/80">
        <div className="site-container">
          <p className="eyebrow">System capabilities</p>
          <h2 className="section-heading mt-5">Built around the complete enquiry journey.</h2>
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

      <section className="pearl-section site-section">
        <div className="site-container grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
          <div>
            <p className="eyebrow !text-violet-700">Business before technology</p>
            <h2 className="section-heading mt-5">Tailored to the way the business receives and manages enquiries.</h2>
            <p className="section-copy mt-6">
              The system begins with the real intake bottleneck, then connects only the fields, pathways, acknowledgements and follow-up the business needs.
            </p>
          </div>
          <div className="rounded-[1.75rem] border border-violet-950/10 bg-white/70 p-8">
            <Check className="h-7 w-7 text-violet-700" aria-hidden />
            <h3 className="mt-5 text-2xl font-semibold">Price Value Fee</h3>
            <p className="mt-4 leading-relaxed">
              Every implementation is tailored using DOS Price Value Fee based on lead value, workflow complexity, automation and support requirements.
            </p>
          </div>
        </div>
      </section>

      <PageCta
        source="smart-intake-follow-up"
        title="Turn the next enquiry into an organised opportunity."
        copy="Start with the enquiry pathway creating the most lost time or missed follow-up. DOS will shape the simplest useful intake system around it."
      />
    </main>
  );
}
