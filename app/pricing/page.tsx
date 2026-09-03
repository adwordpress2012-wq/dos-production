import type { Metadata } from "next";
import { ArrowRight, Check, CircleAlert, Gauge, Headphones, ShieldCheck, X } from "lucide-react";

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

type Entitlement = { name: string; included: boolean };

type Tier = {
  name: string;
  price: string;
  label: string;
  positioning: string;
  systems: Entitlement[];
  managementLevel: string;
  managementIncludes: string[];
  notIncluded: string[];
  note?: string;
  popular?: boolean;
};

const tiers: Tier[] = [
  {
    name: "DMT Plus",
    price: "$1,247",
    label: "Full Managed Technology",
    positioning: "For businesses that rely heavily on their DOS systems and want the highest level of ongoing management, optimisation and support.",
    systems: [
      { name: "SRW — Smart Revenue Website", included: true },
      { name: "SCW — Smart Communication Widget", included: true },
      { name: "Web Call", included: true },
      { name: "SCP — Smart Connect Phone", included: true },
      { name: "Approved CRM workflows and automations", included: true },
    ],
    managementLevel: "Full / Proactive",
    managementIncludes: [
      "Highest ongoing DOS management level",
      "Proactive system monitoring",
      "Proactive workflow optimisation",
      "Ongoing automation refinements within approved scope",
      "Knowledge-base maintenance and refinement",
      "Website/system maintenance",
      "SCW management",
      "Web Call management",
      "SCP management",
      "Higher-priority technical support",
      "Quarterly system review",
      "Usage/system-health review",
      "Recommendations for improvements",
      "Human escalation for complex issues",
    ],
    notIncluded: [
      "New DOS products outside this package",
      "Major new automation projects",
      "Major new integrations",
      "Unlimited development",
      "Unlimited usage",
      "Major system redesigns",
    ],
  },
  {
    name: "DMT Standard",
    price: "$997",
    label: "Managed Technology",
    positioning: "For businesses wanting their core DOS systems actively managed, maintained and supported without the higher-touch Plus service level.",
    systems: [
      { name: "SRW — Smart Revenue Website", included: true },
      { name: "SCW — Smart Communication Widget", included: true },
      { name: "Web Call", included: true },
      { name: "Approved CRM workflows and automations", included: true },
      { name: "SCP — Smart Connect Phone", included: false },
    ],
    managementLevel: "Active Managed",
    managementIncludes: [
      "Website care",
      "SCW management",
      "Web Call support",
      "Core workflow monitoring",
      "Existing automation maintenance",
      "Reasonable knowledge-base updates",
      "Reasonable refinements within existing approved scope",
      "Routine troubleshooting",
      "Standard technical support",
      "Quarterly operational review",
      "Human escalation when required",
    ],
    notIncluded: [
      "SCP",
      "Plus-level proactive optimisation",
      "Major new workflows",
      "New DOS products",
      "Custom development",
      "Major new integrations",
      "Unlimited usage",
    ],
    popular: true,
  },
  {
    name: "DMT Core",
    price: "$697",
    label: "Essential Management",
    positioning: "For businesses that need SCW and Web Call kept operational with essential ongoing management and support.",
    systems: [
      { name: "SCW — Smart Communication Widget", included: true },
      { name: "Web Call", included: true },
      { name: "SRW — Smart Revenue Website", included: false },
      { name: "SCP — Smart Connect Phone", included: false },
      { name: "General CRM/workflow management", included: false },
    ],
    managementLevel: "Essential Managed",
    managementIncludes: [
      "SCW essential management",
      "Web Call essential management",
      "Basic system monitoring",
      "Essential knowledge-base corrections",
      "Break/fix troubleshooting",
      "Essential system maintenance",
      "Standard operational fault support",
      "Human escalation for genuine system failures",
    ],
    notIncluded: [
      "SRW management / website care",
      "SCP",
      "General CRM/workflow management",
      "Routine workflow refinements",
      "Proactive optimisation",
      "Quarterly operational review",
      "Broader knowledge-base development",
      "New automations",
      "Custom development",
    ],
    note: "Technical workflows strictly required for SCW or Web Call to operate may continue behind the scenes, but this does not create a client entitlement to general CRM/workflow management.",
  },
  {
    name: "DMT Basic",
    price: "$497",
    label: "Maintenance",
    positioning: "For businesses that need their SCW kept operational with maintenance and essential support.",
    systems: [
      { name: "SCW — Smart Communication Widget", included: true },
      { name: "Web Call", included: false },
      { name: "SRW — Smart Revenue Website", included: false },
      { name: "SCP — Smart Connect Phone", included: false },
      { name: "General CRM/workflow management", included: false },
    ],
    managementLevel: "Maintenance / Essential Support",
    managementIncludes: [
      "SCW kept operational",
      "Essential knowledge-base corrections",
      "Basic break/fix technical support",
      "Critical fault troubleshooting",
      "Essential platform maintenance",
      "Human escalation for critical system faults",
    ],
    notIncluded: [
      "Web Call",
      "SRW management",
      "SCP",
      "General CRM/workflow management",
      "Proactive optimisation",
      "Routine refinements",
      "Quarterly reviews",
      "Priority support",
      "New workflows",
      "Custom development",
    ],
    note: "Technical workflows strictly required for SCW to function may remain operational but are not a separately supported client entitlement.",
  },
];

const comparisonRows = [
  ["SRW — Smart Revenue Website", "Included", "Included", "Not included", "Not included"],
  ["SCW — Smart Communication Widget", "Included", "Included", "Included", "Included"],
  ["Web Call", "Included", "Included", "Included", "Not included"],
  ["SCP — Smart Connect Phone", "Included", "Not included", "Not included", "Not included"],
  ["Approved CRM Workflows & Automations", "Included", "Included", "Supporting workflows only", "Supporting workflows only"],
  ["Management Level", "Full / Proactive", "Active Managed", "Essential Managed", "Maintenance / Essential Support"],
  ["System Monitoring", "Proactive", "Core workflows", "Basic", "Critical faults"],
  ["Routine Refinements", "Included within approved scope", "Reasonable within approved scope", "Not included", "Not included"],
  ["Knowledge Base Management", "Maintenance and refinement", "Reasonable updates", "Essential corrections", "Essential corrections"],
  ["Technical Support", "Higher priority", "Standard", "Standard operational fault support", "Basic break/fix"],
  ["Quarterly Review", "System review", "Operational review", "Not included", "Not included"],
  ["New Automations", "Not included", "Not included", "Not included", "Not included"],
  ["Major Changes / Custom Development", "Not included", "Not included", "Not included", "Not included"],
] as const;

const faqs = [
  ["Can I downgrade my DMT plan?", "Yes. Moving to a lower DMT plan changes both the DOS systems included in your plan and the level of ongoing management, support and optimisation provided by DOS. Before a downgrade takes effect, DOS will confirm which systems remain included, which systems or managed services will be removed, the new support level, any usage implications and the effective billing date."],
  ["Can I upgrade later?", "Yes. Businesses can move to a higher DMT level when they require additional DOS systems or greater management, optimisation and support."],
  ["Does DMT include new automation projects?", "No. Material new systems, integrations and automation projects are separately scoped."],
  ["Are usage charges included?", "Only where specifically stated in the client’s agreement or plan allowance."],
  ["Does choosing Plus give me every DOS product?", "No. DMT Plus includes SRW, SCW, Web Call, SCP and approved CRM workflows and automations. New DOS products outside this package are separately scoped."],
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
      {items.map((item) => <li key={item}><Check className="h-4 w-4" aria-hidden /><span>{item}</span></li>)}
    </ul>
  );
}

function ExclusionList({ items }: { items: readonly string[] }) {
  return (
    <ul className="dmt-exclusion-list">
      {items.map((item) => <li key={item}><X className="h-4 w-4" aria-hidden /><span>{item}</span></li>)}
    </ul>
  );
}

function SystemsList({ items }: { items: readonly Entitlement[] }) {
  return (
    <ul className="dmt-systems-list">
      {items.map((item) => (
        <li key={item.name} className={item.included ? "" : "dmt-system-excluded"}>
          {item.included ? <Check className="h-4 w-4" aria-hidden /> : <X className="h-4 w-4" aria-hidden />}
          <span>{item.name}</span>
        </li>
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
        <a href="#top" className="dmt-wordmark" aria-label="Directive OS pricing page"><span className="dmt-mark">DOS</span><span>Directive OS</span></a>
        <span className="dmt-reference">DMT Pricing v2</span>
      </header>

      <section id="top" className="dmt-hero site-container">
        <p className="eyebrow">DOS Managed Technology</p>
        <h1>Choose the Right Level of Ongoing Management</h1>
        <p className="dmt-hero-copy">DOS Managed Technology keeps your Directive OS systems maintained, supported and operating after implementation. Choose the system entitlement and management level that matches your business requirements.</p>
        <p className="dmt-price-note">All prices are AUD and exclude GST unless otherwise stated.</p>
      </section>

      <section className="site-container pb-24 sm:pb-32" aria-label="DMT pricing plans">
        <div className="dmt-tier-grid">
          {tiers.map((tier) => (
            <article key={tier.name} className={`dmt-tier-card ${tier.popular ? "dmt-tier-card-popular" : ""}`}>
              {tier.popular ? <p className="dmt-popular">Most popular</p> : null}
              <div className="dmt-tier-top">
                <p className="dmt-tier-name">{tier.name}</p><p className="dmt-tier-label">{tier.label}</p>
                <p className="dmt-price"><span>{tier.price}</span><small>/ month</small></p>
                <p className="dmt-positioning">{tier.positioning}</p>
              </div>
              <div className="dmt-systems-block">
                <h2>DOS Systems Included</h2><SystemsList items={tier.systems} />
                <div className="dmt-management-level"><span>Management Level</span><strong>{tier.managementLevel}</strong></div>
              </div>
              <div className="dmt-tier-content">
                <h2>Management Inclusions</h2><CheckList items={tier.managementIncludes} />
                <div className="dmt-secondary-list"><h3>Not Included</h3><ExclusionList items={tier.notIncluded} /></div>
                {tier.note ? <p className="dmt-tier-note"><strong>Important:</strong> {tier.note}</p> : null}
              </div>
              <PricingCta context={`DMT pricing — ${tier.name}`}>Choose {tier.name.replace("DMT ", "")}</PricingCta>
            </article>
          ))}
        </div>
      </section>

      <section className="dmt-light-section">
        <div className="site-container dmt-section-padding">
          <div className="dmt-section-heading"><p className="eyebrow">Compare plans</p><h2>System and management entitlement at every tier</h2><p>Lower monthly plans provide fewer DOS systems and a deliberately reduced level of management, support and optimisation.</p></div>
          <div className="dmt-comparison-desktop"><table><thead><tr><th scope="col">Entitlement</th><th scope="col">Plus</th><th scope="col">Standard</th><th scope="col">Core</th><th scope="col">Basic</th></tr></thead><tbody>{comparisonRows.map(([feature, ...values]) => <tr key={feature}><th scope="row">{feature}</th>{values.map((value, index) => <td key={`${feature}-${index}`}>{value}</td>)}</tr>)}</tbody></table></div>
          <div className="dmt-comparison-mobile">{comparisonRows.map(([feature, ...values]) => <article key={feature}><h3>{feature}</h3><dl>{values.map((value, index) => <div key={`${feature}-${index}`}><dt>{["Plus", "Standard", "Core", "Basic"][index]}</dt><dd>{value}</dd></div>)}</dl></article>)}</div>
        </div>
      </section>

      <section className="site-container dmt-section-padding">
        <div className="dmt-plan-review">
          <div><p className="eyebrow">Plan flexibility</p><h2>Need to Change Your Plan?</h2><p>Your DMT plan can be adjusted as your business requirements change.</p><p>Moving to a lower DMT plan changes both the DOS systems included in your plan and the level of ongoing management, support and optimisation provided by DOS.</p><p className="dmt-emphasis">Lower price means reduced system and management entitlement.</p></div>
          <div className="dmt-review-details"><p>Before a downgrade takes effect, DOS will confirm:</p><CheckList items={["which systems remain included", "which systems or managed services will be removed", "the new support level", "any usage implications", "the effective billing date"]} /><PricingCta context="DMT pricing — plan review">Request a Plan Review</PricingCta></div>
        </div>
      </section>

      <section className="site-container pb-24 sm:pb-32">
        <div className="dmt-info-grid">
          <article className="dmt-info-card"><Gauge className="h-6 w-6" aria-hidden /><h2>Usage &amp; Third-Party Costs</h2><p>DMT covers ongoing DOS management and support according to the selected plan.</p><p>Usage-based services may be subject to separate allowances, fair-use rules or charges, including where applicable:</p><ul className="dmt-plain-list"><li>AI usage</li><li>SMS</li><li>Phone calls / voice minutes</li><li>Email volume</li><li>Third-party software</li><li>Premium integrations</li><li>Additional locations</li><li>Unusually high processing volumes</li></ul><p>Where applicable, DOS will identify these separately rather than silently absorbing unlimited usage into DMT.</p></article>
          <article className="dmt-info-card"><CircleAlert className="h-6 w-6" aria-hidden /><h2>What DMT Is Not</h2><p>DMT is ongoing management of the approved DOS environment.</p><p>DMT does not automatically include:</p><ul className="dmt-plain-list"><li>Every DOS product</li><li>Unlimited development</li><li>Unlimited changes</li><li>Unlimited AI, SMS or voice usage</li><li>Major new integrations</li><li>Complete system redesigns</li><li>Unrelated IT support</li></ul><p>New projects or material scope expansions are separately assessed and quoted.</p></article>
        </div>
      </section>

      <section className="dmt-support-section"><div className="site-container dmt-support-inner"><div className="dmt-support-icon"><Headphones className="h-7 w-7" aria-hidden /></div><div><p className="eyebrow">Support principle</p><h2>Structured Support. Human Control.</h2><p>Common support issues follow documented DOS processes. Routine issues are handled through standard support procedures, while complex technical or business decisions are escalated to the appropriate human operator.</p><p>AI may assist with support and system operation, but important business decisions remain under human control.</p></div></div></section>

      <section className="site-container dmt-section-padding"><div className="dmt-section-heading"><p className="eyebrow">Frequently asked questions</p><h2>Plan and scope questions</h2></div><div className="dmt-faqs">{faqs.map(([question, answer]) => <details key={question}><summary>{question}<span aria-hidden>+</span></summary><p>{answer}</p></details>)}</div></section>

      <footer className="dmt-footer"><div className="site-container"><div className="dmt-footer-top"><div><p className="dmt-footer-brand">Directive OS</p><p>Simplify. Automate. Scale.</p></div><ShieldCheck className="h-7 w-7" aria-hidden /></div><div className="dmt-footer-bottom"><p>DOS Managed Technology<br />Standard Pricing Reference — Version 2.0</p><p>Pricing and inclusions may be updated for future customers. Existing client agreements remain subject to their agreed commercial terms until formally changed.</p></div></div></footer>
    </main>
  );
}
