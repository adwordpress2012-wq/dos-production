import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check, MessageSquareText } from "lucide-react";
import PublicPageHero from "@/app/components/PublicPageHero";
import PageCta from "@/app/components/PageCta";
import { createPageMetadata } from "@/app/lib/seo";
import { SOLUTIONS } from "@/app/lib/site-data";

export const metadata: Metadata = createPageMetadata({
  title: "Practical Business System Solutions",
  description:
    "Explore Directive OS solutions for customer communication, Micah, websites, booking automation, CRM, follow-up, reputation and scalable workflows.",
  path: "/solutions",
});

type SolutionGroup = {
  id: string;
  title: string;
  copy: string;
  outcomes: string[];
  href?: string;
};

const GROUPS: SolutionGroup[] = [
  {
    id: "micah",
    title: "Micah Smart Business Assistant",
    copy: "A clear first point of contact for customer questions, enquiry capture and practical next steps.",
    outcomes: ["24/7 customer entry point", "Enquiry context captured", "Clear booking and contact pathways"],
  },
  {
    id: "smart-chat",
    title: "Smart Chat Widget",
    copy: "Guide website visitors toward the right answer or action while capturing useful customer context.",
    outcomes: ["Website enquiry capture", "Guided customer journeys", "Faster first response"],
  },
  {
    id: "smart-intake-follow-up",
    title: "DOS Smart Intake & Follow-Up System",
    copy: "Turn website enquiries, walk-ins, referrals, phone leads and campaigns into organised opportunities with reliable acknowledgement and follow-up.",
    outcomes: ["Customised branded intake", "Organised CRM opportunities", "Automatic follow-up"],
    href: "/solutions/smart-intake-follow-up",
  },
  {
    id: "communication",
    title: "Customer Communication",
    copy: "Connect website, phone, SMS, WhatsApp and email communication into a clearer customer experience.",
    outcomes: ["Consistent responses", "Missed-call follow-up", "Customer notifications"],
  },
  {
    id: "bookings",
    title: "Booking and Appointment Systems",
    copy: "Reduce friction with clear scheduling pathways, confirmations, reminders and follow-up.",
    outcomes: ["Easier bookings", "Fewer manual reminders", "Better appointment follow-up"],
  },
  {
    id: "websites",
    title: "Website Systems",
    copy: "Modern websites built around trust, performance, customer pathways and measurable action.",
    outcomes: ["Responsive experience", "Clear enquiry pathways", "Conversion-focused structure"],
  },
  {
    id: "pipelines",
    title: "CRM and Pipelines",
    copy: "Give leads, opportunities, customers and follow-up stages a clear place to live.",
    outcomes: ["Organised opportunities", "Clear next actions", "Shared team visibility"],
  },
  {
    id: "automation",
    title: "Workflow Automation",
    copy: "Move repetitive reminders, notifications, follow-up and administration into reliable workflows.",
    outcomes: ["Less repetitive admin", "Consistent follow-up", "Repeatable operations"],
  },
  {
    id: "reputation",
    title: "Reputation Systems",
    copy: "Request reviews, collect private feedback and make good service easier to recognise.",
    outcomes: ["Review requests", "Feedback collection", "Service issue alerts"],
  },
  {
    id: "lead-capture",
    title: "Lead Capture",
    copy: "Capture better details from forms, chat, calls and website enquiries.",
    outcomes: ["Cleaner lead context", "Faster routing", "Fewer missed opportunities"],
  },
  {
    id: "onboarding",
    title: "Client Onboarding",
    copy: "Make intake, information collection and implementation easier for clients and teams.",
    outcomes: ["Clear intake", "Structured information", "Consistent launch pathway"],
  },
  {
    id: "reporting",
    title: "Reporting and Analytics",
    copy: "Understand enquiries, appointments, conversations and business activity without adding more admin.",
    outcomes: ["Useful operational visibility", "Better decisions", "Clear activity signals"],
  },
  {
    id: "growth",
    title: "Growth Infrastructure",
    copy: "Build repeatable systems that can support more customers, staff and locations.",
    outcomes: ["Repeatable workflows", "Location-ready systems", "Scalable communication"],
  },
];

export default function SolutionsPage() {
  return (
    <main>
      <PublicPageHero
        eyebrow="Practical DOS solutions"
        title="Business systems built around real problems."
        description="DOS starts with the operational bottleneck, then combines the smallest useful set of communication, website and workflow capabilities to create a practical outcome."
      />

      <section className="site-section pt-6">
        <div className="site-container grid gap-5 lg:grid-cols-2">
          {GROUPS.map((group) => (
            <article key={group.id} id={group.id} className="surface-card scroll-mt-32 rounded-[1.75rem] p-8">
              <MessageSquareText className="h-6 w-6 text-violet-300" aria-hidden />
              <h2 className="mt-5 text-3xl font-semibold tracking-tight text-white">{group.title}</h2>
              <p className="mt-4 leading-relaxed text-ink-muted">{group.copy}</p>
              <ul className="mt-6 grid gap-3 sm:grid-cols-3">
                {group.outcomes.map((outcome) => (
                  <li key={outcome} className="flex gap-2 text-sm leading-relaxed text-ink-muted">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-teal-300" aria-hidden />
                    {outcome}
                  </li>
                ))}
              </ul>
              {group.href ? (
                <Link href={group.href} className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-violet-200 hover:text-white">
                  Explore the full solution <ArrowRight className="h-4 w-4" aria-hidden />
                </Link>
              ) : null}
            </article>
          ))}
        </div>
      </section>

      <section className="pearl-section site-section">
        <div className="site-container">
          <p className="eyebrow !text-violet-700">The complete public capability map</p>
          <h2 className="section-heading mt-5">A connected system, tailored to the business outcome.</h2>
          <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {SOLUTIONS.map((solution) => (
              <Link
                key={`${solution.label}-${solution.href}`}
                href={solution.href}
                className="rounded-2xl border border-violet-950/10 bg-white/65 p-5 transition hover:-translate-y-0.5 hover:border-violet-700/25 hover:bg-white"
              >
                <h3 className="font-semibold">{solution.label}</h3>
                <p className="mt-2 text-sm leading-relaxed">{solution.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="site-section pb-0">
        <div className="site-container rounded-2xl border border-white/[0.08] bg-white/[0.03] p-7">
          <p className="text-sm leading-relaxed text-ink-muted">
            <strong className="text-white">Tailored by value.</strong> Every business is different. DOS uses a Price Value Fee approach based on scope, complexity, business value, and required outcomes.
          </p>
        </div>
      </section>

      <PageCta source="solutions-page" />
    </main>
  );
}
