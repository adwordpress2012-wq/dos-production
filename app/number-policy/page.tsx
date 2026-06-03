import type { Metadata } from "next";
import LegalShell from "../components/LegalShell";

export const metadata: Metadata = {
  title: "Number Policy",
  description: "DOS Number Policy — voice and SMS responsibilities, opt-in/opt-out, DNC and ACMA compliance.",
};

export default function Page() {
  return (
    <LegalShell title="Number Policy" effective="1 January 2026">
      <p>
        This Number Policy applies to any voice or SMS service operated by DOS on your behalf,
        including Micah, Smart Business Assistant, Smart Chat Widget, DOS Calendar, GuestMate,
        AgentMate, QuoteOS and related communication workflows. It supplements our{" "}
        <a href="/terms">Terms</a> and <a href="/acceptable-use">Acceptable Use Policy</a>.
      </p>

      <h2>1. Numbers we provision</h2>
      <ul>
        <li>
          <strong>Australian numbers only</strong> — local geographic, mobile, and free-call (1800
          / 13 / 1300) numbers issued under ACMA registration via our telecom partners.
        </li>
        <li>
          Numbers are leased to you for the duration of your subscription. They cannot be ported
          out during the first 90 days.
        </li>
        <li>
          DOS-provisioned numbers remain managed infrastructure assets unless transfer or porting is
          approved in writing.
        </li>
      </ul>

      <h2>2. Identification</h2>
      <p>
        Outbound calls and SMS must clearly identify your business. SMS must include a sender ID
        or footer naming your business and an opt-out instruction (e.g.{" "}
        <code>STOP to unsubscribe</code>).
      </p>

      <h2>3. Consent and opt-in</h2>
      <p>
        You must only message or call recipients who have given express, inferred or deemed
        consent under the <em>Spam Act 2003</em> and the <em>Do Not Call Register Act 2006</em>.
        DOS provides opt-in capture forms — use them.
      </p>

      <h2>4. Opt-out</h2>
      <p>
        Every outbound SMS sent through DOS communication systems includes an opt-out keyword (default{" "}
        <code>STOP</code>). When a recipient opts out, DOS systems will:
      </p>
      <ul>
        <li>Immediately stop all marketing messages to that number.</li>
        <li>Flag the number as DNC across your tenant.</li>
        <li>Honour the opt-out indefinitely unless re-consent is captured.</li>
      </ul>

      <h2>5. Hours and frequency</h2>
      <p>
        Outbound marketing voice and SMS are restricted to 9:00am–8:00pm local time, Monday to
        Saturday, and may not be sent on national public holidays. Transactional and service
        messages (e.g. booking confirmations) are permitted 24/7.
      </p>

      <h2>6. AI-generated voice</h2>
      <p>
        Micah uses synthetic voice. If a caller explicitly asks whether they are speaking to a
        human, Micah is configured to answer truthfully. You must not configure Micah to deceive
        callers about her nature.
      </p>

      <h2>7. Recording and consent</h2>
      <p>
        Calls handled by Micah may be recorded and transcribed. We disclose this in the call
        introduction. You are responsible for ensuring this notice meets requirements in any
        jurisdiction your callers are in.
      </p>

      <h2>8. Prohibited use</h2>
      <p>You must not use voice or SMS channels for:</p>
      <ul>
        <li>Scam, phishing or fraud.</li>
        <li>Election or political messaging without proper authorisation.</li>
        <li>Adult content, gambling, payday lending, or other regulated industries without consent.</li>
      </ul>

      <h2>9. Suspension</h2>
      <p>
        We will suspend a number immediately upon credible reports of abuse, regulator notice, or
        a spike in spam complaints. You will be notified within 24 hours.
      </p>
    </LegalShell>
  );
}
