import type { Metadata } from "next";
import LegalShell from "../components/LegalShell";

export const metadata: Metadata = {
  alternates: { canonical: "/privacy" },
  title: "Privacy Policy",
  description:
    "How DOS collects, uses, stores and shares personal information. Compliant with the Australian Privacy Principles.",
};

export default function Page() {
  return (
    <LegalShell title="Privacy Policy" effective="1 January 2026">
      <p>
        Directive Operating Systems Pty Ltd (&ldquo;DOS&rdquo;) is committed to protecting your
        privacy. This Privacy Policy explains how we collect, use, store, share and protect
        personal information, in compliance with the Australian Privacy Principles under the{" "}
        <em>Privacy Act 1988</em> (Cth).
      </p>

      <h2>1. What we collect</h2>
      <ul>
        <li>
          <strong>Account data:</strong> business name, contact name, email, phone, billing details
          and subdomain.
        </li>
        <li>
          <strong>Customer data:</strong> the conversations, calls, bookings and lead records that
          flow through your DOS — including caller IDs, call recordings, transcripts and message
          content.
        </li>
        <li>
          <strong>Product data:</strong> DOSLead lead and outreach records, GuestMate guest
          records, AgentMate contact, buyer and vendor records, QuoteOS customer and quote data,
          DOS Calendar booking and reminder data, and related workflow history.
        </li>
        <li>
          <strong>Onboarding and acceptance data:</strong> setup requests, client names, business
          details, signatures, policy acceptance records, timestamps and policy versions.
        </li>
        <li>
          <strong>Partner and referral data:</strong> referrer names, partner contacts, referral
          source records, attribution notes and commission or handover context where applicable.
        </li>
        <li>
          <strong>Operational data:</strong> usage logs, error logs and performance metrics needed
          to run and improve the Services.
        </li>
      </ul>

      <h2>2. How we use it</h2>
      <p>We use personal information to:</p>
      <ul>
        <li>Provide, configure and operate the Services for you and your customers.</li>
        <li>Bill, support and communicate with you.</li>
        <li>Detect, prevent and respond to abuse, fraud and security incidents.</li>
        <li>Improve our products (using de-identified, aggregated data only).</li>
      </ul>

      <h2>3. AI processing</h2>
      <p>
        Voice, SMS, email, calendar, quote, lead, guest and chat content may be processed by
        third-party AI providers (e.g. large language model and speech providers) to power Micah,
        Smart Chat Widget, DOSLead, DOS Calendar, GuestMate, AgentMate, QuoteOS and related
        workflows. We use providers that contractually commit not to train on your content where
        available. We never sell your data.
      </p>

      <h2>4. Sharing</h2>
      <p>We share personal information only with:</p>
      <ul>
        <li>
          Sub-processors necessary to deliver the Services (hosting, AI, payments, telephony,
          email, databases, calendars, analytics and automation tools).
        </li>
        <li>Authorities, where required by law.</li>
        <li>Successors, in the event of a merger, acquisition or restructure.</li>
      </ul>

      <h2>5. Storage and security</h2>
      <p>
        Customer data is stored on Supabase (PostgreSQL) and Vercel infrastructure, with
        encryption in transit (TLS 1.2+) and at rest. Data is hosted primarily in Australian and
        US regions; we&apos;ll tell you the exact location on request.
      </p>

      <h2>6. Retention</h2>
      <p>
        We retain customer data for the life of your subscription. After cancellation, we retain
        records for up to 90 days to support reactivation, then delete or anonymise unless we are
        required to keep them by law.
      </p>

      <h2>7. Your rights</h2>
      <p>You can:</p>
      <ul>
        <li>Access the personal information we hold about you.</li>
        <li>Request correction or deletion.</li>
        <li>Withdraw consent for non-essential processing.</li>
        <li>Lodge a complaint with the Office of the Australian Information Commissioner (OAIC).</li>
      </ul>

      <h2>8. Cookies</h2>
      <p>
        Our marketing site uses minimal first-party cookies for session and analytics. The
        DOS HUB uses session cookies required for authenticated features.
      </p>

      <h2>9. Contact</h2>
      <p>
        Privacy enquiries: <a href="mailto:privacy@directiveos.com">privacy@directiveos.com</a>.
      </p>
    </LegalShell>
  );
}
