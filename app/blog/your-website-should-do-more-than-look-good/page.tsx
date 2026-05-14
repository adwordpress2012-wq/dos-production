import type { Metadata } from "next";
import BlogArticleLayout, { BlogSection } from "../_components/BlogArticleLayout";
import { CONTACT_PAGE_PATH } from "../constants";

export const metadata: Metadata = {
  title: "Your Website Should Do More Than Look Good | DOS Insights",
  description:
    "Trust, speed, enquiry capture, and booking automation — why DOS rebuilds websites around real business outcomes for Australian small businesses.",
};

export default function YourWebsiteShouldDoMorePage() {
  return (
    <BlogArticleLayout
      title="Your Website Should Do More Than Look Good"
      category="Website Rebuilds"
      intro="Design matters — but your website’s real job is to turn attention into enquiries and bookings. Here is what “more than look good” means in practice, and how DOS approaches website rebuilds."
      cta={{
        kind: "page",
        label: "Request a website rebuild audit",
        href: CONTACT_PAGE_PATH,
        buttonStyle: "neon",
      }}
    >
      <BlogSection title="A website should build trust">
        <p>
          Before someone books, they ask: Is this business real? Do they work in my area? Do they look like they care
          about quality? Clear service descriptions, proof of work, reviews, and professional presentation all support
          that decision — especially on mobile, where most people first meet you.
        </p>
      </BlogSection>

      <BlogSection title="It should load fast on mobile">
        <p>
          Slow pages feel broken. Visitors leave, and you never know they were there. A modern rebuild pays attention
          to performance: sensible images, clean structure, and hosting that keeps response times tight.
        </p>
        <p>
          Speed is not only about rankings — it is about respect for the customer’s time.
        </p>
      </BlogSection>

      <BlogSection title="It should guide customers to enquire or book">
        <p>
          Every important page should answer: what you offer, who it is for, what happens next, and how to contact or
          book. Prominent calls to action, simple forms or Smart Chat Widgets, and phone or messaging options reduce
          guesswork.
        </p>
      </BlogSection>

      <BlogSection title="It should support booking automation">
        <p>
          When someone is ready to book, the path should be short: pick a time or service, confirm details, receive a
          confirmation. Booking automation reduces back-and-forth, cuts admin, and helps customers commit while they
          are motivated.
        </p>
      </BlogSection>

      <BlogSection title="Why outdated websites lose customers">
        <p>
          Old sites often hide contact options, break on phones, or leave service areas unclear. Even loyal referrers
          hesitate to send friends if the online experience feels neglected. In competitive local markets, that quietly
          costs revenue every month.
        </p>
      </BlogSection>

      <BlogSection title="How DOS rebuilds websites for enquiries and conversions">
        <p>
          DOS website rebuilds start from your business outcomes: more qualified enquiries, clearer booking paths, and
          customer communication that works with SMS and WhatsApp — not just a fresh coat of paint.
        </p>
        <p>
          We align structure, copy, and technical setup with how you actually operate, then connect the site into DOS
          Workspace so new activity is visible and actionable for your team.
        </p>
      </BlogSection>
    </BlogArticleLayout>
  );
}
