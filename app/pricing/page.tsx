import type { Metadata } from "next";
import { ArrowRight, Check, ChevronRight, CircleAlert, Gauge, Headphones, ShieldCheck } from "lucide-react";

import { SuperMicahLeadFormTrigger } from "../components/SuperMicahLeadForm";

export const metadata: Metadata = {
  title: "DOS Managed Technology Pricing",
  description: "The standard pricing and service scope for DOS Managed Technology plans.",
  alternates: { canonical: "https://sl.directiveos.com.au/pricing" },
  robots: {
    index: false,
    follow: false,
    googleBot: { index: false, follow: false, noimageindex: true },
  },
};

type Tier = {
  name: string;
  price: string;
  label: string;
  positioning: string;
  includes: string[];
  secondaryHeading?: string;
  secondaryItems?: string[];
  note?: string;
  popular?: boolean;
};

const tiers: Tier[] = [
  {
    name: "DMT Plus",
    price: "$1,247",
    label: "Full Managed Technology",
    positioning: "For businesses that rely heavily on their DOS systems and want the highest level of ongoing management, optimisation and support.",
    includes: [
      "Everything included in DMT Standard",
      "Highest ongoing DOS management level",
      "Proactive system monitoring",
      "Proactive workflow optimisation",
      "Ongoing automation refinements within existing approved scope",
      "Knowledge-base maintenance and refinement",
      "Website/system maintenance where included in the client’s DOS solution",
      "Managed communication-system support",
      "Higher-priority technical support",
      "Quarterly system review",
      "Usage and system-health review",
      "Recommendations for improvements to existing DOS systems",
      "Human escalation for complex operational or technical issues",
    ],
    secondaryHeading: "Where included in the underlying DOS implementation",
    secondaryItems: [
      "SRW — Smart Revenue Website",
      "SCW — Smart Communication Widget",
      "Web Call",
      "SCP — Smart Connect Phone",
      "Existing CRM workflows and automations",
    ],
    note: "DMT does not automatically give the client every DOS product. It manages the DOS products and modules included in that client’s underlying agreement.",
  },
  {
    name: "DMT Standard",
    price: "$997",
    label: "Managed Technology",
    positioning: "For businesses wanting their core DOS systems actively managed, maintained and supported without the higher-touch Plus service level.",
    includes: [
      "Management of the client’s approved DOS systems",
      "Core workflow monitoring",
      "Existing automation maintenance",
      "Knowledge-base updates within reasonable existing scope",
      "Website care where included",
      "SCW management where included",
      "Web Call support where included",
      "CRM/workflow maintenance",
      "Routine troubleshooting",
      "Reasonable refinements to existing systems",
      "Standard technical support",
      "Human escalation when required",
      "Quarterly operational review",
    ],
    secondaryHeading: "Standard does not include",
    secondaryItems: [
      "Unlimited changes",
      "New products or major new automations",
      "Major workflow redesigns",
      "New integrations outside existing scope",
      "Custom development",
      "Plus-level proactive optimisation or support",
      "Third-party usage charges unless specifically included",
    ],
    popular: true,
  },
  {
    name: "DMT Core",
    price: "$697",
    label: "Essential Management",
    positioning: "For businesses that want their essential DOS infrastructure maintained but require less ongoing optimisation and hands-on management.",
    includes: [
      "Essential system maintenance",
      "Existing core workflows kept operational",
      "Basic workflow monitoring",
      "Website care where included",
      "Core SCW support where included",
      "Routine break/fix troubleshooting",
      "Essential knowledge-base corrections",
      "Standard support for operational faults",
      "Human escalation for genuine system failures",
    ],
    secondaryHeading: "Reduced from Standard",
    secondaryItems: [
      "Reduced proactive monitoring",
      "Reduced optimisation",
      "Fewer included refinements",
      "Reduced knowledge-base management",
      "No routine workflow enhancement",
      "Lower support priority",
      "No proactive system improvement programme",
      "New automation work quoted separately",
    ],
  },
  {
    name: "DMT Basic",
    price: "$497",
    label: "Maintenance",
    positioning: "For businesses that primarily need their existing essential DOS systems maintained and available, with minimal ongoing management.",
    includes: [
      "Essential maintenance of approved existing DOS systems",
      "Basic website care where included",
      "Existing essential automations maintained",
      "Basic break/fix technical support",
      "Critical fault troubleshooting",
      "Essential security/availability maintenance within DOS-controlled infrastructure",
      "Human escalation for critical system faults",
    ],
    secondaryHeading: "Basic does not include",
    secondaryItems: [
      "Proactive optimisation",
      "Routine workflow refinements",
      "New automations",
      "New integrations",
      "Regular knowledge-base development",
      "Web Call management unless specifically included",
      "SCP management unless specifically included",
      "Proactive reporting",
      "Quarterly optimisation",
      "Priority support",
      "Custom development",
    ],
    note: "Additional work is separately scoped and quoted.",
  },
];

const comparisonRows = [
  ["Ongoing DOS Management", "Highest", "Active", "Essential", "Maintenance only"],
  ["System Monitoring", "Proactive", "Standard", "Basic", "Critical faults"],
  ["Existing Workflow Maintenance", "Included", "Included", "Essential only", "Critical maintenance"],
  ["Routine Refinements", "Included within scope", "Reasonable within scope", "Limited", "Not included"],
  ["Knowledge Base Management", "Proactive", "Included", "Essential corrections", "Not included"],
  ["Website Care", "Included where applicable", "Included where applicable", "Included where applicable", "Basic care where applicable"],
  ["Technical Support", "Higher priority", "Standard", "Standard / reduced scope", "Break/fix"],
  ["Quarterly Review", "Included", "Included", "Not included", "Not included"],
  ["New Automations", "Separately scoped", "Separately scoped", "Separately scoped", "Separately scoped"],
  ["Major Changes / Custom Development", "Separately quoted", "Separately quoted", "Separately quoted", "Separately quoted"],
] as const;

const faqs = [
  ["Can I downgrade my DMT plan?", "Yes. DOS will confirm which services or support levels change before the downgrade takes effect."],
  ["Can I upgrade later?", "Yes. Businesses can move to a higher DMT level when they require greater management, optimisation or support."],
  ["Does DMT include new automation projects?", "Not automatically. Material new systems, integrations and automation projects are separately scoped."],
  ["Are usage charges included?", "Only where specifically stated in the client’s agreement or plan allowance."],
  ["Does choosing Plus give me every DOS product?", "No. DMT manages the DOS systems included in your underlying DOS solution. Additional DOS products remain separately scoped unless specifically bundled."],
] as const;

function PricingCta({ children, context }: { children: React.ReactNode; context: string }) {
  return (
    <SuperMicahLeadFormTrigger className="dmt-button w-full" data-context={context}>
      {children}<ArrowRight className="h-4 w-4" aria-hidden />
    </SuperMicahLeadFormTrigger>
  );
}

function CheckList({ items }: { items: readonly string[] }) {
  return (
    <ul className="dmt-check-list">
      {items.map((item) => (
        <li key={item}><Check className="h-4 w-4" aria-hidden /><span>{item}</span></li>
      ))}
    </ul>
  );
}

export default function PricingPage() {
  return (
    <main className="dmt-pricing">
      <div className="dmt-orb dmt-orb-left" aria-hidden />
      <div className="dmt-orb dmt-orb-right" aria-hidden />

      <header className="dmt-header site-container">
        <a href="#top" className="dmt-wordmark" aria-label="Directive OS pricing page">
          <span className="dmt-mark">DOS</span><span>Directive OS</span>
        </a>
        <span className="dmt-reference">DMT Pricing v1</span>
      </header>

      <section id="top" className="dmt-hero site-container">
        <p className="eyebrow">DOS Managed Technology</p>
        <h1>Choose the Right Level of Ongoing Management</h1>
        <p className="dmt-hero-copy">DOS Managed Technology keeps your Directive OS systems maintained, supported and operating after implementation. Choose the management level that matches the level of support, optimisation and ongoing involvement your business requires.</p>
        <p className="dmt-price-note">All prices are AUD and exclude GST unless otherwise stated.</p>
      </section>

      <section className="site-container pb-24 sm:pb-32" aria-label="DMT pricing plans">
        <div className="dmt-tier-grid">
          {tiers.map((tier) => (
            <article key={tier.name} className={`dmt-tier-card ${tier.popular ? "dmt-tier-card-popular" : ""}`}>
              {tier.popular ? <p className="dmt-popular">Most popular</p> : null}
              <div className="dmt-tier-top">
                <p className="dmt-tier-name">{tier.name}</p>
                <p className="dmt-tier-label">{tier.label}</p>
                <p className="dmt-price"><span>{tier.price}</span><small>/ month</small></p>
                <p className="dmt-positioning">{tier.positioning}</p>
              </div>
              <div className="dmt-tier-content">
                <h2>Includes</h2>
                <CheckList items={tier.includes} />
                {tier.secondaryHeading && tier.secondaryItems ? (
                  <div className="dmt-secondary-list">
                    <h3>{tier.secondaryHeading}</h3>
                    <ul>{tier.secondaryItems.map((item) => <li key={item}><ChevronRight className="h-4 w-4" aria-hidden /><span>{item}</span></li>)}</ul>
                  </div>
                ) : null}
                {tier.note ? <p className="dmt-tier-note">{tier.note}</p> : null}
              </div>
              <PricingCta context={`DMT pricing — ${tier.name}`}>Choose {tier.name.replace("DMT ", "")}</PricingCta>
            </article>
          ))}
        </div>
      </section>

      <section className="dmt-light-section">
        <div className="site-container dmt-section-padding">
          <div className="dmt-section-heading">
            <p className="eyebrow">Compare plans</p>
            <h2>A clear level of service at every tier</h2>
            <p>Lower monthly plans provide a deliberately reduced level of management, support and optimisation.</p>
          </div>
          <div className="dmt-comparison-desktop">
            <table>
              <thead><tr><th scope="col">Service</th><th scope="col">Plus</th><th scope="col">Standard</th><th scope="col">Core</th><th scope="col">Basic</th></tr></thead>
              <tbody>{comparisonRows.map(([feature, ...values]) => <tr key={feature}><th scope="row">{feature}</th>{values.map((value, index) => <td key={`${feature}-${index}`}>{value}</td>)}</tr>)}</tbody>
            </table>
          </div>
          <div className="dmt-comparison-mobile">
            {comparisonRows.map(([feature, ...values]) => (
              <article key={feature}><h3>{feature}</h3><dl>{values.map((value, index) => <div key={`${feature}-${index}`}><dt>{["Plus", "Standard", "Core", "Basic"][index]}</dt><dd>{value}</dd></div>)}</dl></article>
            ))}
          </div>
        </div>
      </section>

      <section className="site-container dmt-section-padding">
        <div className="dmt-plan-review">
          <div>
            <p className="eyebrow">Plan flexibility</p><h2>Need to Change Your Plan?</h2>
            <p>Your DMT plan can be adjusted as your business requirements change.</p>
            <p>Moving to a lower monthly plan also changes the level of management, support, optimisation and included services.</p>
            <p className="dmt-emphasis">DOS does not provide the same service scope at a lower plan price.</p>
          </div>
          <div className="dmt-review-details">
            <p>Before any plan change takes effect, DOS will confirm:</p>
            <CheckList items={["your new plan", "services remaining active", "services being reduced or removed", "any usage implications", "effective billing date"]} />
            <PricingCta context="DMT pricing — plan review">Request a Plan Review</PricingCta>
          </div>
        </div>
      </section>

      <section className="site-container pb-24 sm:pb-32">
        <div className="dmt-info-grid">
          <article className="dmt-info-card">
            <Gauge className="h-6 w-6" aria-hidden /><h2>Usage &amp; Third-Party Costs</h2>
            <p>DMT covers ongoing DOS management and support according to the selected plan.</p>
            <p>Usage-based services may be subject to separate allowances, fair-use rules or charges, including where applicable:</p>
            <ul className="dmt-plain-list"><li>AI usage</li><li>SMS</li><li>Phone calls / voice minutes</li><li>Email volume</li><li>Third-party software</li><li>Premium integrations</li><li>Additional locations</li><li>Unusually high processing volumes</li></ul>
            <p>Where applicable, DOS will identify these separately rather than silently absorbing unlimited usage into DMT.</p>
          </article>
          <article className="dmt-info-card">
            <CircleAlert className="h-6 w-6" aria-hidden /><h2>What DMT Is Not</h2>
            <p>DMT is ongoing management of the approved DOS environment.</p><p>DMT does not automatically include:</p>
            <ul className="dmt-plain-list"><li>Every DOS product</li><li>Unlimited development</li><li>Unlimited changes</li><li>Unlimited AI, SMS or voice usage</li><li>Major new integrations</li><li>Complete system redesigns</li><li>Unrelated IT support</li></ul>
            <p>New projects or material scope expansions are separately assessed and quoted.</p>
          </article>
        </div>
      </section>

      <section className="dmt-support-section">
        <div className="site-container dmt-support-inner">
          <div className="dmt-support-icon"><Headphones className="h-7 w-7" aria-hidden /></div>
          <div><p className="eyebrow">Support principle</p><h2>Structured Support. Human Control.</h2><p>Common support issues follow documented DOS processes. Routine issues are handled through standard support procedures, while complex technical or business decisions are escalated to the appropriate human operator.</p><p>AI may assist with support and system operation, but important business decisions remain under human control.</p></div>
        </div>
      </section>

      <section className="site-container dmt-section-padding">
        <div className="dmt-section-heading"><p className="eyebrow">Frequently asked questions</p><h2>Plan and scope questions</h2></div>
        <div className="dmt-faqs">{faqs.map(([question, answer]) => <details key={question}><summary>{question}<span aria-hidden>+</span></summary><p>{answer}</p></details>)}</div>
      </section>

      <footer className="dmt-footer">
        <div className="site-container">
          <div className="dmt-footer-top"><div><p className="dmt-footer-brand">Directive OS</p><p>Simplify. Automate. Scale.</p></div><ShieldCheck className="h-7 w-7" aria-hidden /></div>
          <div className="dmt-footer-bottom"><p>DOS Managed Technology<br />Standard Pricing Reference — Version 1.0</p><p>Pricing and inclusions may be updated for future customers. Existing client agreements remain subject to their agreed commercial terms until formally changed.</p></div>
        </div>
      </footer>
    </main>
  );
}
