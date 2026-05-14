import type { Metadata } from "next";
import DomainManagementPolicyContent from "../components/DomainManagementPolicyContent";
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
        &ldquo;we&rdquo;, &ldquo;us&rdquo;), including the DOS platform, websites we build and
        host, the Micah AI Receptionist, the COS Communication System, the BOS Booking System and
        the DOS HUB (collectively, the &ldquo;Services&rdquo;).
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

      <DomainManagementPolicyContent
        heading="5. Domain Management & Ownership Policy"
        headingAs="h2"
      />

      <h2>6. Intellectual property</h2>
      <p>
        You retain ownership of your business content, customer data and brand assets. We retain
        ownership of the DOS platform, codebase, AI models, integrations and any reusable
        components we build. You receive a non-exclusive licence to use the deliverables we build
        for you for as long as your subscription is active.
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
