import type { Metadata } from "next";
import LegalShell from "../components/LegalShell";

export const metadata: Metadata = {
  title: "Cancellation Policy",
  description:
    "How to cancel your DOS subscription, refund handling, data export and offboarding.",
};

export default function Page() {
  return (
    <LegalShell title="Cancellation Policy" effective="1 January 2026">
      <p>
        We don&apos;t lock anyone in long-term. This policy explains how to cancel, what happens
        to your data, and how refunds work.
      </p>

      <h2>1. Initial 90-day commitment</h2>
      <p>
        DOS subscriptions include an initial 90-day commitment from your first paid month. This
        covers the cost of building, training and launching your stack — websites, AI agents,
        numbers and integrations. Setup fees are not refundable once provisioning has begun.
      </p>

      <h2>2. After 90 days</h2>
      <p>
        From day 91, your subscription is month-to-month. You can cancel at any time with at
        least <strong>14 days&apos; written notice</strong> before your next billing date.
      </p>

      <h2>3. How to cancel</h2>
      <ul>
        <li>
          Email <a href="mailto:cancel@directiveos.com">cancel@directiveos.com</a> from your
          account email, or
        </li>
        <li>Use the &ldquo;Cancel subscription&rdquo; option in your DOS HUB billing settings.</li>
      </ul>

      <h2>4. Refunds</h2>
      <p>
        Subscription fees are non-refundable for the current billing period. We may, at our
        discretion, prorate or refund where:
      </p>
      <ul>
        <li>We materially fail to deliver the Services and cannot remediate within 7 days.</li>
        <li>We mistakenly overcharge you.</li>
        <li>An automatic Australian Consumer Law remedy applies.</li>
      </ul>

      <h2>5. What happens at cancellation</h2>
      <ul>
        <li>
          Your website continues serving for the remainder of the paid period; afterwards, we can
          either redirect to a holding page or hand off to your new provider on request.
        </li>
        <li>
          Micah, COS and BOS are deactivated at the end of the paid period.
        </li>
        <li>
          Voice numbers may be ported to another carrier on request, subject to ACMA porting
          rules. Numbers cannot be ported in the first 90 days.
        </li>
      </ul>

      <h2>6. Your data</h2>
      <p>
        For 90 days after cancellation, we keep your data on read-only access so you can export
        leads, conversations and bookings. After 90 days, we delete or anonymise your data unless
        we are legally required to keep it.
      </p>

      <h2>7. Pause instead of cancel</h2>
      <p>
        Seasonal business? You can pause your subscription for up to 60 days per year at 30% of
        the regular monthly fee. Email{" "}
        <a href="mailto:hello@directiveos.com.au">hello@directiveos.com.au</a> to arrange.
      </p>

      <h2>8. Disputes</h2>
      <p>
        We&apos;d rather sort it out. If something&apos;s wrong, talk to us first at{" "}
        <a href="mailto:hello@directiveos.com.au">hello@directiveos.com.au</a>. We commit to a written
        response within 5 business days.
      </p>
    </LegalShell>
  );
}
