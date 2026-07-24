import type { Metadata } from "next";
import LegalShell from "../components/LegalShell";

export const metadata: Metadata = {
  alternates: { canonical: "/acceptable-use" },
  title: "Acceptable Use Policy",
  description: "What you can and can't do with the DOS platform, AI agents and communication channels.",
};

export default function Page() {
  return (
    <LegalShell title="Acceptable Use Policy" effective="1 January 2026">
      <p>
        This Acceptable Use Policy (AUP) governs how you and your end users may use the DOS
        platform — including websites we host, Micah, Smart Chat Widget, DOSLead, DOS Calendar,
        GuestMate, AgentMate, QuoteOS, SMS, email, automations and the Command Centre. It
        complements our Terms of Service.
      </p>

      <h2>1. Lawful use only</h2>
      <p>
        You must comply with all applicable laws, including the Australian{" "}
        <em>Spam Act 2003</em>, <em>Privacy Act 1988</em>, <em>Telecommunications Act 1997</em>,
        and the ACMA Reducing Scam Calls and Scam SMS Industry Code.
      </p>

      <h2>2. Prohibited content and conduct</h2>
      <p>You must not use DOS to:</p>
      <ul>
        <li>Send unsolicited commercial messages or calls.</li>
        <li>
          Use DOSLead, Micah, Smart Chat Widget, SMS, email or automation systems for spam,
          unlawful outreach, misleading representation, harassment, scraped-list abuse,
          impersonation, fraud or non-compliant marketing.
        </li>
        <li>
          Impersonate any person, business or government agency, or misrepresent your identity.
        </li>
        <li>
          Distribute malware, phishing, fraud, scam or deceptive content.
        </li>
        <li>
          Promote unlawful goods or services, illegal gambling, illegal drugs, weapons, or
          adult content involving minors or non-consenting parties.
        </li>
        <li>
          Harass, threaten, defame or discriminate against any person.
        </li>
        <li>
          Probe, scan, or attempt to breach the security of the platform or other tenants.
        </li>
        <li>
          Reverse-engineer, scrape or automate access to DOS in a way that overloads our
          infrastructure.
        </li>
      </ul>

      <h2>3. AI and automation</h2>
      <p>
        Micah, Smart Chat Widget, DOSLead, DOS Calendar, GuestMate, AgentMate, QuoteOS and related
        automation systems may act on your behalf. You are responsible for the configuration,
        scripts, knowledge bases, lead sources and approval rules you provide. You must not
        configure DOS to:
      </p>
      <ul>
        <li>Make legally binding statements, medical, legal or financial advice without human review.</li>
        <li>Pretend the AI is a real human when an end user explicitly asks.</li>
        <li>Capture sensitive information (credit card, health record numbers) without proper handling.</li>
      </ul>

      <h2>4. Communication channels</h2>
      <p>
        Use of voice and SMS channels is also subject to our{" "}
        <a href="/number-policy">Number Policy</a>, which includes opt-in / opt-out, identification
        and DNC requirements.
      </p>

      <h2>5. Reporting abuse</h2>
      <p>
        Report suspected misuse to{" "}
        <a href="mailto:abuse@directiveos.com">abuse@directiveos.com</a>. We act on credible
        reports within 24 hours.
      </p>

      <h2>6. Enforcement</h2>
      <p>
        We may, at our discretion, warn you, throttle your usage, suspend specific channels,
        suspend your account, or terminate your subscription for violations. We&apos;ll always try
        to give you a chance to remediate first, but we reserve the right to act immediately for
        serious or ongoing violations.
      </p>
    </LegalShell>
  );
}
