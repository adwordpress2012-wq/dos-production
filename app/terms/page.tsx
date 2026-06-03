import type { Metadata } from "next";
import LegalShell from "../components/LegalShell";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "DOS Terms of Service — Done-For-You AI Business Systems.",
};

export default function Page() {
  return (
    <LegalShell title="Terms of Service" effective="1 January 2026">
      <p>
        These Terms govern your access to and use of services provided by{" "}
        <strong>Directive Operating Systems Pty Ltd</strong> (&ldquo;DOS&rdquo;,
        &ldquo;we&rdquo;, &ldquo;us&rdquo;), including websites and rebuilds, the Website Care
        Plan, hosting, maintenance, support, DNS management, Micah / Smart Business Assistant,
        Smart Chat Widget, DOSLead, DOS Calendar, GuestMate, AgentMate, QuoteOS, DOS Workspace, AI
        workflows, automation templates, dashboards, operational software systems and done-for-you
        infrastructure (collectively, the &ldquo;Services&rdquo;).
      </p>

      <h2>1. Acceptance</h2>
      <p>
        By signing up, accessing or using the Services, you agree to these Terms on behalf of
        yourself or the entity you represent. If you don&apos;t agree, don&apos;t use the Services.
      </p>

      <h2>2. Subscriptions and billing</h2>
      <p>
        Subscriptions are billed monthly in advance via Stripe in Australian dollars (AUD), with
        GST included where applicable. Setup fees are billed once at the start of your engagement
        and are non-refundable once provisioning has begun.
      </p>
      <p>
        We may revise pricing on 30 days&apos; written notice; existing customers retain their plan
        terms for the current billing period.
      </p>
      <p>
        If invoices, subscriptions, payment plans or recurring fees become overdue, we may send
        reminders, work with you to resolve the issue, and pause, limit, suspend or restrict
        Services until the account is brought up to date. We will try to keep the process practical
        and supportive, but DOS is not required to continue active service delivery while payment is
        overdue.
      </p>

      <h2>3. Your responsibilities</h2>
      <ul>
        <li>Provide accurate business, contact and billing information.</li>
        <li>
          Comply with all applicable laws, including the Australian{" "}
          <em>Spam Act 2003</em>, the <em>Privacy Act 1988</em>, the{" "}
          <em>Telecommunications Act 1997</em>, and ACMA Industry Codes.
        </li>
        <li>Keep your credentials secure and notify us of any suspected compromise.</li>
        <li>Use the Services consistent with our Acceptable Use Policy and Number Policy.</li>
      </ul>

      <h2>4. Our service commitments</h2>
      <p>
        We provide the Services on a fully managed basis. We host, monitor, secure and update
        infrastructure on your behalf. We target 99.9% uptime for hosted websites and 99.5% uptime
        for AI services, with planned maintenance windows announced in advance.
      </p>
      <p>
        DOS may rely on third-party providers including Vercel, Supabase, Stripe, Twilio, OpenAI,
        Google, Resend, Neo, domain registrars, email providers, hosting providers, APIs and other
        connected platforms. These services may have their own terms, outages, limits, fees, delays
        or changes outside DOS&apos;s direct control.
      </p>

      <h2>5. Intellectual property</h2>
      <p>
        You retain ownership of your business content, customer data and brand assets. We retain
        ownership of all software, code, workflows, automations, templates, scripts, prompts,
        dashboards, AI configurations, reusable components, operating systems, backend systems,
        product infrastructure, the DOS platform, integrations and any reusable components we build
        unless ownership is expressly transferred in writing. You receive a non-exclusive licence to
        use the deliverables we build for you for as long as your subscription is active.
      </p>

      <h2>6. AI, automation and outcomes</h2>
      <p>
        DOS systems may use AI, automation, third-party APIs and workflow logic. AI outputs may
        require human review. DOS does not guarantee that AI-generated content, responses,
        bookings, recommendations, classifications, summaries or automations will always be
        accurate, complete, uninterrupted or suitable for every circumstance.
      </p>
      <p>
        DOS does not guarantee business outcomes, leads, enquiries, rankings, sales, revenue,
        bookings, replies, conversion rates or customer behaviour.
      </p>

      <h2>7. Confidentiality</h2>
      <p>
        Each party agrees to keep the other&apos;s confidential information confidential and to use
        it only for the purpose of providing or receiving the Services.
      </p>

      <h2>8. Liability</h2>
      <p>
        To the maximum extent permitted by law, our total liability for any claim arising under or
        in connection with these Terms is limited to the fees paid by you in the 12 months
        immediately preceding the claim. Nothing in these Terms excludes liability that cannot be
        excluded under the Australian Consumer Law.
      </p>
      <p>
        DOS may maintain business insurance, including Professional Indemnity and/or liability
        cover, where appropriate for its stage of business and services. Any insurance held by DOS
        does not expand DOS&apos;s liability beyond these Terms unless required by law or expressly
        agreed in writing.
      </p>

      <h2>9. Suspension and termination</h2>
      <p>
        We may suspend or terminate the Services for non-payment, breach of these Terms, our
        Acceptable Use Policy, or applicable laws. See our Cancellation Policy for cancellation by
        you.
      </p>

      <h2>10. Governing law</h2>
      <p>
        These Terms are governed by the laws of Queensland, Australia. The parties submit to the
        exclusive jurisdiction of the courts of Queensland.
      </p>

      <h2>11. Contact</h2>
      <p>
        Questions: <a href="mailto:legal@directiveos.com">legal@directiveos.com</a>.
      </p>
    </LegalShell>
  );
}
