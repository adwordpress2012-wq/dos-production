import type { Metadata } from "next";
import Script from "next/script";
import {
  BellRing,
  BriefcaseBusiness,
  Check,
  ClipboardCheck,
  ListFilter,
  MessageSquareText,
  RefreshCcw,
  Route,
  UserRoundSearch,
  Workflow,
} from "lucide-react";
import PageCta from "@/app/components/PageCta";
import PublicPageHero from "@/app/components/PublicPageHero";
import { breadcrumbSchema, createPageMetadata, SITE_URL } from "@/app/lib/seo";

const DESCRIPTION =
  "DOS CPA is a Done-For-You managed candidate placement workflow system that helps recruitment agencies capture, qualify, organise, prioritise, follow up and progress candidates faster.";

export const metadata: Metadata = createPageMetadata({
  title: "DOS CPA — Candidate Placement Accelerator",
  description: DESCRIPTION,
  path: "/solutions/cpa",
});

const FLOW = ["Capture", "Qualify", "Prioritise", "Automate", "Progress", "Place"];

const CAPABILITIES = [
  { title: "Candidate intake", copy: "Bring candidate applications into one clear, consistent intake pathway.", icon: ClipboardCheck },
  { title: "Placement Readiness scoring", copy: "Qualify candidates against practical placement-readiness criteria and surface priorities.", icon: UserRoundSearch },
  { title: "Smart Lists", copy: "Organise candidates into useful groups for recruiter action and targeted follow-up.", icon: ListFilter },
  { title: "Recruitment pipelines", copy: "Keep candidates moving through shortlist, interview, offer and placement stages.", icon: Route },
  { title: "Automated follow-up", copy: "Maintain timely candidate communication without relying on manual reminders.", icon: MessageSquareText },
  { title: "Recruiter notifications and tasks", copy: "Alert recruiters to priority candidates and create clear next actions.", icon: BellRing },
  { title: "Interview and offer workflows", copy: "Support consistent handoffs and follow-up through key placement stages.", icon: BriefcaseBusiness },
  { title: "Talent pool reactivation", copy: "Re-engage suitable candidates already held in the agency talent pool.", icon: RefreshCcw },
  { title: "SCW, SBA and ongoing DMT", copy: "Connect candidate intake and recruiter summaries with continuous DOS Managed Technology oversight.", icon: Workflow },
] as const;

const breadcrumbs = breadcrumbSchema([
  { name: "Home", path: "/" },
  { name: "Solutions", path: "/solutions" },
  { name: "DOS CPA", path: "/solutions/cpa" },
]);

const cpaServiceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": `${SITE_URL}/solutions/cpa#service`,
  name: "DOS CPA — Candidate Placement Accelerator",
  url: `${SITE_URL}/solutions/cpa`,
  description: DESCRIPTION,
  provider: { "@id": `${SITE_URL}/#organisation` },
  areaServed: { "@type": "Country", name: "Australia" },
  serviceType: CAPABILITIES.map((capability) => capability.title),
  audience: {
    "@type": "BusinessAudience",
    audienceType: "Permanent, specialist, executive search, professional and hybrid recruitment agencies",
  },
};

export default function CpaPage() {
  return (
    <main>
      <Script
        id="cpa-breadcrumbs"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs).replace(/</g, "\\u003c") }}
      />
      <Script
        id="cpa-service"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(cpaServiceSchema).replace(/</g, "\\u003c") }}
      />

      <PublicPageHero
        eyebrow="DOS CPA — Candidate Placement Accelerator"
        title="Turn candidate applications into an organised placement workflow."
        description="DOS CPA captures and qualifies candidates, scores placement readiness, organises them into Smart Lists and recruitment pipelines, automates follow-up, alerts recruiters to priority candidates, and keeps talent moving toward shortlist, interview, offer and placement."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Solutions", href: "/solutions" },
          { label: "DOS CPA" },
        ]}
      />

      <section className="pb-8">
        <div className="site-container">
          <div className="surface-card rounded-[1.75rem] p-7">
            <p className="eyebrow">Candidate placement workflow</p>
            <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-6">
              {FLOW.map((stage, index) => (
                <div key={stage} className="rounded-xl border border-white/[0.08] bg-white/[0.035] p-4">
                  <span className="text-xs font-semibold text-violet-300">0{index + 1}</span>
                  <p className="mt-2 font-semibold text-white">{stage}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="site-section bg-[#0b0d1c]/80">
        <div className="site-container">
          <p className="eyebrow">What DOS CPA combines</p>
          <h2 className="section-heading mt-5">One managed layer around the candidate journey.</h2>
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
            <p className="eyebrow !text-violet-700">Managed through DMT</p>
            <h2 className="section-heading mt-5">A recruitment workflow and automation layer — not a replacement ATS.</h2>
            <p className="section-copy mt-6">
              DOS CPA works around the agency&apos;s recruitment process to improve candidate intake, prioritisation,
              follow-up and progression. It is managed continuously through DMT — DOS Managed Technology.
            </p>
          </div>
          <div className="rounded-[1.75rem] border border-violet-950/10 bg-white/70 p-8">
            <Check className="h-7 w-7 text-violet-700" aria-hidden />
            <h3 className="mt-5 text-2xl font-semibold">Built for recruitment agencies</h3>
            <p className="mt-4 leading-relaxed">
              Permanent, specialist, executive search, professional and hybrid recruitment agencies.
            </p>
          </div>
        </div>
      </section>

      <PageCta
        source="dos-cpa"
        title="See how CPA can support your candidate workflow."
        copy="Start with the point where suitable candidates are being lost, delayed or left without consistent follow-up."
      />
    </main>
  );
}
