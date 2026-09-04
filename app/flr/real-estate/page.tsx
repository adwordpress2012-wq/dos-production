import type { Metadata } from "next";
import {
  ArrowRight,
  Building2,
  Check,
  CircleAlert,
  CreditCard,
  Gauge,
  Megaphone,
  MessageSquareText,
  ShieldCheck,
  X,
} from "lucide-react";

import { SuperMicahLeadFormTrigger } from "../../components/SuperMicahLeadForm";

export const metadata: Metadata = {
  title: { absolute: "Facebook Lead Recovery for Real Estate | Directive OS" },
  description:
    "DOS FLR helps real estate agencies respond faster, follow up consistently and recover more opportunities from Facebook and Meta leads.",
  alternates: {
    canonical: "https://flr.directiveos.com.au/real-estate/",
  },
  openGraph: {
    title: "Facebook Lead Recovery for Real Estate | Directive OS",
    description:
      "DOS FLR helps real estate agencies respond faster, follow up consistently and recover more opportunities from Facebook and Meta leads.",
    url: "https://flr.directiveos.com.au/real-estate/",
    siteName: "Directive OS",
    type: "website",
    locale: "en_AU",
  },
  twitter: {
    card: "summary_large_image",
    title: "Facebook Lead Recovery for Real Estate | Directive OS",
    description:
      "DOS FLR helps real estate agencies respond faster, follow up consistently and recover more opportunities from Facebook and Meta leads.",
  },
  robots: { index: true, follow: true },
};

type FlrTier = {
  name: string;
  teamSize: string;
  setup: string;
  mrr: string;
  description: string;
  systemIncludes: readonly string[];
  managementLevel: string;
  managementIncludes: readonly string[];
  notIncluded: readonly string[];
  badge?: string;
  note?: string;
};

const tiers: readonly FlrTier[] = [
  {
    name: "FLR Core",
    teamSize: "1–5 staff",
    setup: "A$1,997",
    mrr: "A$497",
    description:
      "For smaller real estate teams that need a reliable Facebook lead recovery system without complex team routing.",
    systemIncludes: [
      "Facebook / Meta lead connection",
      "DOS FLR CRM environment",
      "FLR pipeline",
      "Immediate lead response",
      "Micah SMS follow-up",
      "Reply detection",
      "Basic qualification",
      "Human handover",
      "No-response recovery",
      "DND / opt-out safeguards",
    ],
    managementLevel: "Essential Managed",
    managementIncludes: [
      "Core FLR monitoring",
      "Essential workflow maintenance",
      "Basic qualification updates",
      "Standard troubleshooting",
      "Operational fault support",
      "Human escalation for genuine system failures",
    ],
    notIncluded: [
      "Large team routing",
      "Multi-office logic",
      "Advanced campaign architecture",
      "Complex qualification structures",
      "Proactive campaign optimisation",
      "New automation products",
      "Major new integrations",
      "Unlimited usage",
      "Database reactivation",
      "Buyer nurture automation outside FLR",
    ],
  },
  {
    name: "FLR Pro",
    teamSize: "6–15 staff",
    setup: "A$2,997",
    mrr: "A$797",
    description:
      "For established real estate teams managing multiple agents, lead sources or Facebook campaigns.",
    systemIncludes: [
      "Everything in Core",
      "Multiple approved Meta forms / campaigns",
      "Team assignment logic",
      "Multiple staff notifications",
      "More advanced Micah qualification",
      "Enhanced lead handover",
      "Improved reporting visibility",
    ],
    managementLevel: "Active Managed",
    managementIncludes: [
      "Active workflow monitoring",
      "Existing FLR automation maintenance",
      "Reasonable qualification refinements",
      "Reasonable routing refinements",
      "Campaign-specific troubleshooting",
      "Knowledge-base updates within approved scope",
      "Standard technical support",
      "Quarterly FLR operational review",
    ],
    notIncluded: [
      "Large multi-office architecture",
      "Enterprise routing structures",
      "New DOS BAS products",
      "Major new automation projects",
      "Major integrations",
      "Unlimited development",
      "Unlimited usage",
      "Database reactivation",
      "Unrelated CRM projects",
    ],
    badge: "Most Popular",
  },
  {
    name: "FLR Growth",
    teamSize: "16–30 staff",
    setup: "A$3,997",
    mrr: "A$1,297",
    description:
      "For larger real estate teams with higher lead volume, more campaigns and greater management visibility requirements.",
    systemIncludes: [
      "Everything in Pro",
      "Higher campaign capacity",
      "Multiple sales team assignments",
      "More advanced qualification logic",
      "Higher operational monitoring",
      "Management reporting visibility",
      "More sophisticated escalation logic",
    ],
    managementLevel: "Proactive Managed",
    managementIncludes: [
      "Proactive FLR monitoring",
      "Ongoing optimisation within approved scope",
      "Routing refinement",
      "Qualification refinement",
      "Campaign performance review",
      "Workflow performance review",
      "Higher-priority support",
      "Quarterly FLR review",
      "Human escalation when required",
    ],
    notIncluded: [
      "Unlimited campaign architecture",
      "Full enterprise / multi-office redesigns",
      "New DOS products",
      "Database reactivation",
      "Major new integrations",
      "Unlimited development",
      "Unlimited usage",
    ],
  },
  {
    name: "FLR Agency",
    teamSize: "31–60 staff",
    setup: "A$4,997",
    mrr: "A$1,797",
    description:
      "For larger agencies requiring broader routing, management visibility and ongoing optimisation.",
    systemIncludes: [
      "Everything in Growth",
      "Larger team support",
      "Broader routing logic",
      "Multiple campaign groups",
      "Higher lead handling capacity",
      "Management-level reporting",
      "More sophisticated escalation",
      "Higher ongoing DOS management",
    ],
    managementLevel: "High-Tier Managed",
    managementIncludes: [
      "High-level workflow monitoring",
      "Proactive optimisation",
      "Ongoing FLR refinements within approved scope",
      "Campaign-group monitoring",
      "Higher-priority support",
      "Management reporting review",
      "Quarterly operational review",
      "Human escalation where required",
    ],
    notIncluded: [
      "Unlimited offices",
      "Unlimited campaigns",
      "Unlimited users",
      "New DOS BAS products",
      "Database reactivation",
      "Major new automation builds",
      "Unlimited development",
      "Unlimited AI / SMS usage",
      "Major system redesigns",
    ],
  },
  {
    name: "FLR Enterprise",
    teamSize: "61+ staff / multi-office",
    setup: "A$6,997+",
    mrr: "A$2,497+",
    description:
      "For major real estate groups, multi-office businesses and high-volume Facebook lead environments.",
    systemIncludes: [
      "Enterprise FLR architecture",
      "Multi-office support",
      "Large team routing architecture",
      "Multiple approved campaign groups",
      "High-volume lead handling",
      "Centralised management visibility",
      "Advanced escalation logic",
      "Higher-touch DOS management",
      "Enterprise reporting structure",
    ],
    managementLevel: "Enterprise / Proactive",
    managementIncludes: [
      "Highest FLR management level",
      "Proactive monitoring",
      "Proactive optimisation",
      "Higher-priority support",
      "Advanced routing maintenance",
      "Multi-office workflow oversight",
      "Advanced reporting review",
      "Quarterly FLR operational review",
      "Human escalation where required",
    ],
    notIncluded: [
      "Unlimited new automation development",
      "Every DOS product",
      "Database reactivation",
      "Buyer nurture products",
      "Major unrelated integrations",
      "Unlimited AI / SMS / voice usage",
      "Complete system redesigns",
      "Unrelated IT support",
    ],
    note: "Enterprise scope may require final diagnosis before pricing is confirmed.",
  },
];

const responseFlow = [
  "Facebook / Meta Lead",
  "CRM Contact Created",
  "Immediate SMS / Email",
  "Micah Reply Detection",
  "Qualification",
  "Human Handover",
  "No-Response Recovery",
  "Reporting / Visibility",
] as const;

const coreArchitecture = [
  "Meta / Facebook Lead",
  "CRM",
  "Pipeline",
  "Immediate response",
  "Micah",
  "Reply detection",
  "Qualification",
  "Human handover",
  "Recovery",
  "Stop / nurture",
] as const;

const industries = [
  "Independent real estate agencies",
  "Growing sales teams",
  "Multi-agent offices",
  "Property groups",
  "Multi-office real estate businesses",
  "Buyer campaigns",
  "Seller / appraisal campaigns",
  "Landlord campaigns",
  "Project marketing teams",
] as const;

const howItWorks = [
  ["Facebook lead enters", "A new Facebook or Meta form enquiry enters the approved FLR environment."],
  ["FLR responds", "The lead receives the approved immediate SMS and email response."],
  ["Micah qualifies the reply", "Micah detects the response and asks the approved qualification questions."],
  ["The human team takes over", "An interested, qualified opportunity is handed to the appropriate sales team member."],
  ["Recovery continues", "When there is no reply, the approved recovery sequence continues within plan limits."],
  ["DOS keeps FLR operational", "DOS monitors and maintains the FLR system at the management level included in the plan."],
] as const;

const managementLevels = [
  ["Core", "Essential Managed", "Core monitoring, maintenance and operational fault support."],
  ["Pro", "Active Managed", "Active monitoring, reasonable refinements and quarterly review."],
  ["Growth", "Proactive Managed", "Proactive optimisation, performance review and higher-priority support."],
  ["Agency", "High-Tier Managed", "Broader oversight, campaign-group monitoring and ongoing refinement."],
  ["Enterprise", "Enterprise / Proactive", "Multi-office oversight, advanced routing maintenance and highest-priority FLR management."],
] as const;

const globalExclusions = [
  "SCW — Smart Communication Widget",
  "Web Call or Voice SBA",
  "SCP — Smart Connect Phone",
  "SRW — Smart Revenue Website",
  "New DOS BAS products",
  "Database Reactivation",
  "Buyer Follow-Up Automation",
  "New major automation projects",
  "Major new integrations",
  "Unlimited development",
  "Unlimited changes",
  "Unlimited AI / SMS usage",
  "Major system redesigns",
  "Unrelated CRM work",
  "Unrelated IT support",
] as const;

const faqs = [
  [
    "What is DOS FLR?",
    "DOS FLR is a standalone Facebook Lead Recovery system for responding to, following up and qualifying Facebook and Meta leads before genuine opportunities are handed to the human sales team.",
  ],
  [
    "Does DOS FLR replace my agents?",
    "No. FLR improves response speed, follow-up consistency, qualification, visibility and handover. Your agents remain responsible for the human sales conversation and outcome.",
  ],
  [
    "Does FLR manage my Facebook ads?",
    "No. FLR begins after a lead submits an approved Facebook or Meta form. Advertising strategy, creative, media buying and ad spend are not included in FLR.",
  ],
  [
    "What happens when a Facebook lead replies?",
    "Micah detects the reply, continues the approved qualification conversation and hands a genuine opportunity to the appropriate human team member according to the plan's routing scope.",
  ],
  [
    "What happens if a lead does not reply?",
    "The approved no-response recovery sequence continues within the agreed FLR limits, with DND and opt-out safeguards applied.",
  ],
  [
    "Why does pricing increase with team size?",
    "Larger teams generally require more campaign capacity, routing complexity, lead handling, reporting visibility, support and ongoing DOS management.",
  ],
  [
    "Can I downgrade my FLR plan?",
    "Yes. Clients move between defined FLR plans. A lower plan provides lower team capacity, routing and campaign scope, plus a reduced management, support and optimisation entitlement.",
  ],
  [
    "Can I upgrade later?",
    "Yes. DOS can move your operation to a higher defined FLR plan when team size, lead volume, campaigns or management requirements increase.",
  ],
  [
    "Does FLR include website chat?",
    "No. Website chat / SCW is a separate DOS BAS product.",
  ],
  [
    "Does FLR include Web Call or Voice SBA?",
    "No. These are separate DOS systems.",
  ],
  [
    "Does FLR include database reactivation?",
    "No. Database Reactivation is a separate DOS BAS product with its own setup, CRM environment and ongoing MRR.",
  ],
  [
    "Are usage charges unlimited?",
    "No. Normal usage within the agreed FLR scope is managed under the plan. Exceptional, high-volume or materially increased AI / SMS usage may require additional usage charges or a plan adjustment.",
  ],
  [
    "Does choosing Enterprise give me every DOS product?",
    "No. Enterprise refers to the scale and management level of DOS FLR only. Other DOS BAS products remain separately scoped.",
  ],
  [
    "Do you guarantee sales?",
    "No. DOS FLR improves lead response speed, follow-up consistency and visibility. Sales outcomes depend on factors including lead quality, offer, pricing, market conditions and the client's sales team.",
  ],
  [
    "Can FLR work across multiple offices?",
    "Yes. Multi-office requirements normally fall under FLR Enterprise and are scoped after diagnosis.",
  ],
] as const;

function DiagnosisCta({
  children,
  context,
  className = "",
}: {
  children: React.ReactNode;
  context: string;
  className?: string;
}) {
  return (
    <SuperMicahLeadFormTrigger
      className={`dmt-button ${className}`}
      data-context={context}
    >
      {children}
      <ArrowRight className="h-4 w-4" aria-hidden />
    </SuperMicahLeadFormTrigger>
  );
}

function CheckList({ items }: { items: readonly string[] }) {
  return (
    <ul className="dmt-check-list">
      {items.map((item) => (
        <li key={item}>
          <Check className="h-4 w-4" aria-hidden />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function ExclusionList({ items }: { items: readonly string[] }) {
  return (
    <ul className="dmt-exclusion-list">
      {items.map((item) => (
        <li key={item}>
          <X className="h-4 w-4" aria-hidden />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export default function FlrRealEstatePage() {
  return (
    <main className="dmt-pricing flr-pricing">
      <div className="dmt-orb dmt-orb-left" aria-hidden />
      <div className="dmt-orb dmt-orb-right" aria-hidden />

      <header className="dmt-header site-container">
        <a href="#top" className="dmt-wordmark" aria-label="Directive OS FLR pricing page">
          <span className="dmt-mark">DOS</span>
          <span>Directive OS</span>
        </a>
        <span className="dmt-reference">Real Estate FLR</span>
      </header>

      <section id="top" className="dmt-hero site-container flr-hero">
        <p className="eyebrow">DOS FLR — Real Estate</p>
        <h1>Turn Facebook Property Leads Into Conversations Faster.</h1>
        <p className="dmt-hero-copy">
          DOS FLR helps real estate teams respond faster, follow up consistently, qualify
          enquiries and hand genuine opportunities back to the sales team.
        </p>
        <p className="flr-hero-support">
          You are already paying to generate Facebook leads. FLR helps reduce the number
          that go cold because nobody responded quickly enough or followed up consistently.
        </p>
        <div className="flr-hero-actions">
          <DiagnosisCta context="FLR Real Estate — hero diagnosis">
            Book a FLR Diagnosis
          </DiagnosisCta>
          <a href="#plans" className="flr-secondary-button">
            View Plans
          </a>
        </div>
        <p className="dmt-price-note">All prices are AUD and exclude GST unless otherwise stated.</p>
      </section>

      <section className="flr-light-section">
        <div className="site-container dmt-section-padding">
          <div className="dmt-section-heading flr-light-heading">
            <p className="eyebrow">What FLR does</p>
            <h2>What Happens After the Facebook Lead Arrives Matters.</h2>
            <p>
              FLR creates a clear path from a new Meta lead to a qualified human
              conversation, with recovery and visibility built into the same workflow.
            </p>
          </div>

          <ol className="flr-response-flow" aria-label="Facebook lead recovery process">
            {responseFlow.map((step, index) => (
              <li key={step}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <strong>{step}</strong>
              </li>
            ))}
          </ol>

          <div className="flr-agent-principle">
            <MessageSquareText className="h-7 w-7" aria-hidden />
            <div>
              <h3>FLR does not replace the sales agent.</h3>
              <p>It improves speed, consistency, follow-up, visibility and handover.</p>
            </div>
          </div>

          <div className="flr-audience-section">
            <div className="dmt-section-heading flr-light-heading">
              <p className="eyebrow">Who it is for</p>
              <h2>Built for real estate teams already generating Meta leads.</h2>
              <p>
                FLR is prescribed around the size and operational complexity of the team,
                campaigns and office structure.
              </p>
            </div>
            <ul className="flr-audience-grid">
              {industries.map((industry) => (
                <li key={industry}>
                  <Building2 className="h-5 w-5" aria-hidden />
                  <span>{industry}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="site-container dmt-section-padding">
        <div className="dmt-section-heading">
          <p className="eyebrow">How FLR works</p>
          <h2>One clear lead recovery workflow.</h2>
          <p>
            Straightforward for the sales team, structured behind the scenes and managed
            by DOS within the agreed FLR scope.
          </p>
        </div>
        <ol className="flr-how-grid">
          {howItWorks.map(([title, description], index) => (
            <li key={title}>
              <span>{index + 1}</span>
              <div>
                <h3>{title}</h3>
                <p>{description}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section id="plans" className="site-container flr-plans-section" aria-label="Real Estate FLR pricing plans">
        <div className="dmt-section-heading flr-plans-heading">
          <p className="eyebrow">Real Estate FLR pricing</p>
          <h2>Capacity and management matched to your operation.</h2>
          <p>
            DOS diagnoses the client requirement and prescribes the appropriate tier.
            Every tier keeps the same core purpose while capacity, scope and management
            increase with operational complexity.
          </p>
        </div>

        <div className="flr-tier-grid">
          {tiers.map((tier) => (
            <article
              key={tier.name}
              className={`dmt-tier-card ${tier.badge ? "dmt-tier-card-popular" : ""}`}
            >
              {tier.badge ? <p className="dmt-popular">{tier.badge}</p> : null}
              <div className="dmt-tier-top">
                <p className="dmt-tier-name">{tier.name}</p>
                <p className="dmt-tier-label">{tier.teamSize}</p>
                <div className="flr-prices">
                  <div>
                    <span>Setup</span>
                    <strong>{tier.setup}</strong>
                  </div>
                  <div>
                    <span>Monthly MRR</span>
                    <strong>{tier.mrr}</strong>
                    <small>/ month</small>
                  </div>
                </div>
                <p className="dmt-positioning">{tier.description}</p>
              </div>
              <div className="dmt-systems-block">
                <h3>FLR System Included</h3>
                <CheckList items={tier.systemIncludes} />
                <div className="dmt-management-level">
                  <span>Management Level</span>
                  <strong>{tier.managementLevel}</strong>
                </div>
              </div>
              <div className="dmt-tier-content">
                <h3>Management Inclusions</h3>
                <CheckList items={tier.managementIncludes} />
                <div className="dmt-secondary-list">
                  <h3>Not Included</h3>
                  <ExclusionList items={tier.notIncluded} />
                </div>
                {tier.note ? <p className="dmt-tier-note">{tier.note}</p> : null}
              </div>
              <DiagnosisCta context={`FLR Real Estate pricing — ${tier.name}`} className="w-full">
                Book a FLR Diagnosis
              </DiagnosisCta>
            </article>
          ))}
        </div>
      </section>

      <section className="flr-light-section">
        <div className="site-container dmt-section-padding">
          <div className="dmt-section-heading flr-light-heading">
            <p className="eyebrow">One FLR system</p>
            <h2>The same proven core architecture at every tier.</h2>
            <p>
              Every plan operates from the approved DOS FLR Frozen Pizza workflow. Higher
              plans increase capacity, routing, scope and management rather than changing
              the core recovery purpose.
            </p>
          </div>
          <ol className="flr-architecture-flow" aria-label="Core FLR architecture">
            {coreArchitecture.map((step, index) => (
              <li key={step}>
                <span>{index + 1}</span>
                <strong>{step}</strong>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="site-container dmt-section-padding">
        <div className="dmt-section-heading">
          <p className="eyebrow">Management level</p>
          <h2>More complexity requires more active management.</h2>
          <p>
            The management entitlement rises with team size, campaign capacity, routing,
            lead volume and reporting requirements.
          </p>
        </div>
        <div className="flr-management-grid">
          {managementLevels.map(([plan, level, description]) => (
            <article key={plan}>
              <span>{plan}</span>
              <h3>{level}</h3>
              <p>{description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="site-container flr-plan-flexibility">
        <div className="dmt-plan-review">
          <div>
            <p className="eyebrow">Plan flexibility</p>
            <h2>Need to Change Your FLR Plan?</h2>
            <p>Your FLR plan can be adjusted as your real estate operation changes.</p>
            <p>
              Moving to a lower FLR plan changes the team capacity, routing complexity,
              campaign scope and level of ongoing management, support and optimisation
              provided by DOS.
            </p>
            <p className="dmt-emphasis">
              Lower price means reduced FLR capacity and management entitlement.
            </p>
          </div>
          <div className="dmt-review-details">
            <p>Before a downgrade takes effect, DOS will confirm:</p>
            <CheckList
              items={[
                "Team size",
                "Active Facebook campaigns",
                "Routing requirements",
                "Qualification requirements",
                "Lead volume",
                "Office structure",
                "Management / reporting requirements",
              ]}
            />
            <DiagnosisCta context="FLR Real Estate — plan review" className="w-full">
              Book a Plan Review
            </DiagnosisCta>
          </div>
        </div>
      </section>

      <section className="site-container dmt-section-padding">
        <div className="flr-scope-grid">
          <article className="dmt-info-card">
            <CircleAlert className="h-6 w-6" aria-hidden />
            <h2>What FLR Does Not Automatically Include</h2>
            <p>DOS FLR is a standalone DOS BAS product. It does not automatically include:</p>
            <ExclusionList items={globalExclusions} />
            <p>New projects or material scope expansions are separately assessed and quoted.</p>
          </article>
          <article className="dmt-info-card">
            <Gauge className="h-6 w-6" aria-hidden />
            <h2>Usage + Scope Protection</h2>
            <p>
              Normal operation within the agreed FLR plan and approved campaign scope is
              managed under that plan.
            </p>
            <ul className="dmt-plain-list">
              <li>Team and campaign capacity follows the selected tier.</li>
              <li>Routing and qualification changes remain within approved scope.</li>
              <li>Usage is not unlimited.</li>
              <li>Materially higher AI or SMS volume may require added usage charges.</li>
              <li>New products, major integrations and redesigns are separately quoted.</li>
            </ul>
            <p>
              Micah SMS required to operate FLR is part of FLR delivery. It is not marketed
              or supplied as SCP.
            </p>
          </article>
        </div>
      </section>

      <section className="dmt-support-section">
        <div className="site-container flr-payment-section">
          <div className="dmt-support-icon">
            <CreditCard className="h-7 w-7" aria-hidden />
          </div>
          <div>
            <p className="eyebrow">Setup + payment structure</p>
            <h2>Simple Setup. Clear Commercial Terms.</h2>
            <div className="flr-payment-grid">
              <article>
                <span>01</span>
                <h3>60% commencement payment</h3>
                <p>DOS configures, integrates, tests and prepares the FLR system.</p>
              </article>
              <article>
                <span>02</span>
                <h3>Before go-live</h3>
                <p>The remaining 40% setup balance and first monthly FLR MRR are due.</p>
              </article>
              <article>
                <span>03</span>
                <h3>Ongoing service</h3>
                <p>Recurring MRR begins the following month.</p>
              </article>
            </div>
          </div>
        </div>
      </section>

      <section className="site-container dmt-section-padding">
        <div className="dmt-section-heading">
          <p className="eyebrow">Frequently Asked Questions</p>
          <h2>Plan and Scope Questions</h2>
        </div>
        <div className="dmt-faqs">
          {faqs.map(([question, answer]) => (
            <details key={question}>
              <summary>
                {question}
                <span aria-hidden>+</span>
              </summary>
              <p>{answer}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="site-container flr-final-cta">
        <Megaphone className="h-8 w-8" aria-hidden />
        <p className="eyebrow">DOS FLR — Real Estate</p>
        <h2>Already Paying for Facebook Leads?</h2>
        <p>Make sure more of them receive the follow-up they deserve.</p>
        <DiagnosisCta context="FLR Real Estate — final diagnosis">
          Book a FLR Diagnosis
        </DiagnosisCta>
        <small>
          DOS will assess your team size, campaign structure and follow-up process and
          prescribe the appropriate FLR plan.
        </small>
      </section>

      <footer className="dmt-footer">
        <div className="site-container">
          <div className="dmt-footer-top">
            <div>
              <p className="dmt-footer-brand">Directive OS</p>
              <p>Simplify. Automate. Scale.</p>
            </div>
            <ShieldCheck className="h-7 w-7" aria-hidden />
          </div>
          <div className="dmt-footer-bottom">
            <p>DOS FLR — Real Estate<br />Facebook Lead Recovery</p>
            <p>
              FLR is separately scoped from other DOS BAS products. Final plan suitability
              is confirmed by DOS after diagnosis.
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}
