import type { Metadata } from "next";
import BlogArticleLayout, { BlogSection } from "../_components/BlogArticleLayout";
import { CHAT_DEMO_URL } from "../constants";

export const metadata: Metadata = {
  alternates: { canonical: "/blog/smart-chat-widgets-vs-basic-contact-forms" },
  title: "Smart Chat Widgets vs Basic Contact Forms | DOS Insights",
  description:
    "Why passive contact forms lose enquiries and how Smart Chat Widgets guide customers, capture details, and connect with SMS and WhatsApp workflows.",
};

export default function SmartChatWidgetsVsFormsPage() {
  return (
    <BlogArticleLayout
      slug="smart-chat-widgets-vs-basic-contact-forms"
      title="Smart Chat Widgets vs Basic Contact Forms"
      category="Smart Chat Widgets"
      intro="A contact form is fine for a simple message — but it does not guide, qualify, or respond. Smart Chat Widgets are built for how people actually browse: quick questions, instant structure, and a path toward booking or follow-up."
      cta={{
        kind: "external",
        label: "See how the Smart Chat Widget works",
        href: CHAT_DEMO_URL,
        buttonStyle: "neon",
      }}
    >
      <BlogSection title="Contact forms are passive">
        <p>
          A basic form waits. The customer fills in boxes, hits send, and hopes someone replies. There is no guidance
          if they are unsure which service they need, no immediate acknowledgement beyond a generic thank-you page, and
          no help outside business hours.
        </p>
        <p>
          For many small businesses, that gap is where enquiries quietly die.
        </p>
      </BlogSection>

      <BlogSection title="Smart Chat Widgets guide customers instantly">
        <p>
          A Smart Chat Widget opens a conversation on the page. It can welcome visitors, ask what they are looking for,
          and move them step by step toward the right outcome — whether that is leaving details, booking a slot, or
          connecting to your team.
        </p>
      </BlogSection>

      <BlogSection title="They can answer common questions">
        <p>
          Pricing ranges, service areas, hours, and &quot;how does this work?&quot; questions can be handled up front
          with clear, approved wording. That saves your team from repeating the same answers and helps customers self-
          qualify before you invest time in a call.
        </p>
      </BlogSection>

      <BlogSection title="They can capture booking details">
        <p>
          When someone is ready to book, the widget can collect the fields you need — name, phone, preferred time,
          job type — in a flow that feels like chat instead of paperwork. Those details can flow into your booking and
          enquiry systems so nothing is retyped.
        </p>
      </BlogSection>

      <BlogSection title="They can connect with SMS and WhatsApp workflows">
        <p>
          Website chat is only one touchpoint. Smart Chat Widgets work best when they are part of a wider picture:
          follow-up by SMS or WhatsApp, reminders, and visibility in DOS Workspace so everyone sees the same customer
          thread.
        </p>
        <p>
          That continuity is what turns a one-off website visit into a booked job.
        </p>
      </BlogSection>

      <BlogSection title="Why this is better for small businesses">
        <p>
          Small teams do not have capacity to chase every half-finished form. Smart Chat Widgets reduce friction at the
          moment of highest intent, improve enquiry quality, and pair with booking automation and done-for-you setup so
          the system keeps working after launch.
        </p>
        <p>
          If you are comparing options, start with the experience you would want as a customer — then build outward
          from there.
        </p>
      </BlogSection>
    </BlogArticleLayout>
  );
}
