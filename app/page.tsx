import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import {
  ArrowRight,
  Bot,
  BriefcaseBusiness,
  CalendarCheck2,
  Check,
  ClipboardCheck,
  ClipboardList,
  Clock3,
  ContactRound,
  Globe2,
  HeartHandshake,
  Layers3,
  Mail,
  MessageCircle,
  MessagesSquare,
  Network,
  PhoneCall,
  Quote,
  ReceiptText,
  RefreshCcw,
  Search,
  ShieldCheck,
  Sparkles,
  Star,
  TrendingUp,
  UserRoundSearch,
  UsersRound,
  Workflow,
} from "lucide-react";
import MicahVoiceOrb from "./components/MicahVoiceOrb";
import OfficialMicahProfile from "./components/OfficialMicahProfile";
import TalkToMicahButton from "./components/TalkToMicahButton";
import TrackedLink from "./components/TrackedLink";
import BusinessSpotlightSection from "./components/BusinessSpotlightSection";
import EcosystemArchitecture from "./components/EcosystemArchitecture";
import { DISCOVERY_CALL_HREF } from "./lib/booking";
import { createPageMetadata } from "./lib/seo";
import { ECOSYSTEM_GROUPS, INDUSTRIES, INSIGHTS } from "./lib/site-data";
import { SuperMicahLeadFormButton } from "./components/SuperMicahLeadForm";

export const metadata: Metadata = createPageMetadata({
  title: "Directive OS | Simplify, Automate and Scale Your Business",
  description:
    "Directive OS builds practical business systems for growing businesses, including Micah, customer communication, booking automation, websites, CRM, reputation, and workflow automation.",
});

const CAPABILITIES = [
  { label: "Website Chat", icon: MessageCircle, href: "/solutions#smart-chat" },
  { label: "Voice", icon: PhoneCall, href: "/solutions#communication" },
  { label: "SMS", icon: MessagesSquare, href: "/solutions#communication" },
  { label: "WhatsApp", icon: ContactRound, href: "/solutions#communication" },
  { label: "Bookings", icon: CalendarCheck2, href: "/solutions#bookings" },
  { label: "Follow-Up", icon: RefreshCcw, href: "/solutions#automation" },
  { label: "CRM", icon: Network, href: "/solutions#pipelines" },
  { label: "Reviews", icon: Star, href: "/solutions#reputation" },
];

const PAIN_POINTS = [
  { title: "Capture more enquiries", copy: "Make it easier for customers to take the next step.", href: "/solutions#lead-capture" },
  { title: "Save time every day", copy: "Reduce repetitive work that slows the team down.", href: "/solutions#automation" },
  { title: "Improve customer communication", copy: "Respond clearly across the channels customers use.", href: "/solutions#communication" },
  { title: "Automate repetitive work", copy: "Keep reminders, follow-up and notifications moving.", href: "/solutions#automation" },
  { title: "Build a better website", copy: "Turn the website into a practical business pathway.", href: "/solutions#websites" },
  { title: "Improve booking follow-up", copy: "Reduce friction before and after each appointment.", href: "/solutions#bookings" },
  { title: "Organise disconnected systems", copy: "Create a clearer flow between people and information.", href: "/solutions#pipelines" },
  { title: "Scale the business", copy: "Build repeatable systems for more demand, people and locations.", href: "/solutions#growth" },
];

const SOLUTION_CARDS: {
  id: string;
  title: string;
  copy: string;
  icon: LucideIcon;
  href?: string;
}[] = [
  { id: "communication", title: "Customer Communication", copy: "Respond faster and keep customer conversations connected.", icon: MessagesSquare },
  { id: "micah", title: "Micah Smart Business Assistant", copy: "Give customers a useful first response at any time of day.", icon: Bot },
  {
    id: "smart-intake-follow-up",
    title: "DOS Smart Intake & Follow-Up System",
    copy: "Turn every enquiry into an organised opportunity with acknowledgement, booking prompts and automatic follow-up.",
    icon: ClipboardList,
    href: "/solutions/smart-intake-follow-up",
  },
  {
    id: "era",
    title: "DOS ERA — Email Response",
    copy: "Answer, capture and route inbound business email while your team keeps control.",
    icon: Mail,
    href: "/solutions/era",
  },
  {
    id: "cpa",
    title: "DOS CPA — Candidate Placement Accelerator",
    copy: "Turn candidate applications into an organised placement workflow.",
    icon: UserRoundSearch,
    href: "/solutions/cpa",
  },
  {
    id: "arc",
    title: "DOS ARC — Receivables Control",
    copy: "Keep invoice follow-up consistent before unpaid accounts become collection problems.",
    icon: ReceiptText,
    href: "/solutions/arc",
  },
  { id: "websites", title: "Website Systems", copy: "Build trust, capture intent and guide visitors toward action.", icon: Globe2 },
  { id: "bookings", title: "Booking and Appointment Systems", copy: "Reduce booking friction with clearer reminders and follow-up.", icon: CalendarCheck2 },
  { id: "automation", title: "Business Automation", copy: "Save time by moving repetitive work into practical workflows.", icon: Workflow },
  { id: "pipelines", title: "Lead and Pipeline Management", copy: "Keep opportunities organised from first enquiry to client.", icon: Network },
  {
    id: "reputation",
    title: "DOS Reputation",
    copy: "Turn completed work into genuine reviews, private feedback and stronger trust.",
    icon: ShieldCheck,
    href: "/solutions/reputation",
  },
  { id: "growth", title: "Growth Infrastructure", copy: "Build repeatable systems for more customers, staff and locations.", icon: TrendingUp },
];

const OUTCOME_GROUPS = [
  {
    title: "Communication",
    items: ["Website conversations", "SMS", "WhatsApp", "Email", "Missed-call follow-up", "Customer notifications", "Conditional acknowledgements"],
  },
  {
    title: "Operations",
    items: ["CRM", "Pipelines", "Opportunities", "Contacts", "Appointments", "Calendars", "Tasks", "Customised intake forms", "Duplicate prevention"],
  },
  {
    title: "Automation",
    items: ["Lead follow-up", "Booking reminders", "Customer confirmations", "Workflow automation", "Reactivation", "Onboarding workflows", "Pipeline stage updates"],
  },
  {
    title: "Reputation",
    items: ["Google review requests", "Feedback collection", "Review follow-up", "Internal service alerts"],
  },
  {
    title: "Growth",
    items: ["Landing pages", "Lead capture", "Lead-source tracking", "Industry and service tagging", "Conversion tracking", "Reporting", "Campaign follow-up", "Workflow monitoring"],
  },
];

const PROCESS = [
  { title: "Discover", copy: "Understand the business, customer journey and current bottleneck.", icon: Search },
  { title: "Evaluate", copy: "Identify the highest-value improvement opportunity.", icon: ClipboardCheck },
  { title: "Refine", copy: "Remove unnecessary complexity and define the practical path.", icon: Layers3 },
  { title: "Build the System", copy: "Configure the website, communication and workflows.", icon: Workflow },
  { title: "Launch", copy: "Test, implement, train and activate the system.", icon: Sparkles },
  { title: "Support", copy: "Monitor, improve and scale as the business grows.", icon: HeartHandshake },
];

export default function Home() {
  return (
    <main className="overflow-hidden">
      <Hero />
      <CapabilityRow />
      <SocialProof />
      <SimplifyAutomateScale />
      <BusinessPain />
      <BusinessBeforeTechnology />
      <Solutions />
      <EcosystemArchitecture variant="compact" showLifecycle />
      <Capabilities />
      <BusinessSpotlightSection />
      <IndustryPreview />
      <Reputation />
      <Process />
      <Ecosystem />
      <Resources />
      <Insights />
      <FinalMicah />
    </main>
  );
}

function Hero() {
  const principles = [
    {
      title: "Simplify",
      copy: "Remove complexity. Focus on what matters.",
      icon: Check,
    },
    {
      title: "Automate",
      copy: "Save time with smart workflows and Micah.",
      icon: Workflow,
    },
    {
      title: "Scale",
      copy: "Grow with practical systems that work.",
      icon: TrendingUp,
    },
  ];

  const trustPoints = [
    {
      title: "Trusted by",
      copy: "Australian Businesses",
      icon: ShieldCheck,
    },
    {
      title: "Proven Systems",
      copy: "Built for Real Results",
      icon: Check,
    },
    {
      title: "Save Time",
      copy: "Every Single Day",
      icon: Clock3,
    },
    {
      title: "Scale with Confidence",
      copy: "Sustainable Growth",
      icon: TrendingUp,
    },
  ];

  return (
    <section className="dos-hero">
      <div aria-hidden className="dos-hero-glow dos-hero-glow--left" />
      <div aria-hidden className="dos-hero-glow dos-hero-glow--right" />

      <div className="site-container relative">
        <div className="dos-hero-grid">
          <div className="dos-hero-copy">
            <p className="eyebrow">Directive OS</p>
            <h1 className="dos-hero-heading">
              <span>Smarter Systems.</span>
              <span>Stronger Businesses.</span>
              <strong>
                Simplify.
                <br />
                Automate.
                <br />
                Scale.
              </strong>
            </h1>
            <p className="dos-hero-intro">
              <span>
                We don&apos;t just build your system and hand it over. Through DMT — DOS Managed Technology, DOS continues
                to manage, maintain, refine and evolve the technology behind your business, keeping your systems aligned
                as your operations grow.
              </span>
            </p>

            <SuperMicahLeadFormButton className="mt-7 w-fit" />

            <ul className="dos-hero-principles" aria-label="Directive OS principles">
              {principles.map(({ title, copy, icon: Icon }) => (
                <li key={title} className="dos-hero-principle">
                  <span>
                    <Icon className="h-6 w-6" aria-hidden />
                  </span>
                  <div>
                    <h2>{title}</h2>
                    <p>{copy}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="dos-hero-micah">
            <MicahVoiceOrb />
          </div>
        </div>

        <ul className="dos-hero-trust" aria-label="Directive OS business outcomes">
          {trustPoints.map(({ title, copy, icon: Icon }) => (
            <li key={title} className="dos-hero-trust-item">
              <Icon className="h-7 w-7" aria-hidden />
              <p>
                <span>{title}</span>
                <strong>{copy}</strong>
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function CapabilityRow() {
  return (
    <section aria-label="DOS capabilities" className="border-y border-white/[0.07] bg-white/[0.018]">
      <div className="site-container grid grid-cols-2 gap-px py-4 sm:grid-cols-4 lg:grid-cols-8">
        {CAPABILITIES.map(({ label, icon: Icon, href }) => (
          <Link key={label} href={href} className="group flex min-h-20 flex-col items-center justify-center gap-2 rounded-xl px-2 text-center text-xs font-medium text-ink-muted transition hover:bg-white/[0.04] hover:text-white">
            <Icon className="h-5 w-5 text-violet-300 transition group-hover:text-teal-200" aria-hidden />
            {label}
          </Link>
        ))}
      </div>
    </section>
  );
}

function SocialProof() {
  return (
    <section className="py-12">
      <div className="site-container flex flex-col items-center justify-between gap-7 rounded-3xl border border-white/[0.07] bg-white/[0.025] px-7 py-8 md:flex-row">
        <div>
          <p className="eyebrow">Verified client work</p>
          <h2 className="mt-3 text-xl font-semibold text-white">Trusted by growing Australian businesses.</h2>
        </div>
        <TrackedLink
          href="https://capitalrecruitment.com.au"
          external
          eventName="spotlight_click"
          eventSource="homepage-social-proof"
          eventLabel="Capital Recruitment"
          className="flex items-center gap-4 rounded-2xl bg-white px-5 py-3 text-[#151122] transition hover:translate-y-[-1px]"
        >
          <Image
            src="/clients/capital-recruitment-logo.png"
            alt="Capital Recruitment"
            width={180}
            height={52}
            sizes="180px"
            className="h-10 w-auto object-contain"
          />
          <ArrowRight className="h-4 w-4" aria-hidden />
        </TrackedLink>
      </div>
    </section>
  );
}

function SimplifyAutomateScale() {
  const stages = [
    { title: "Simplify", copy: "Organise customer communication, remove unnecessary steps, and identify the biggest business bottleneck." },
    { title: "Automate", copy: "Use smart workflows to handle repetitive enquiries, reminders, follow-up, notifications, and administration." },
    { title: "Scale", copy: "Build systems that can support more customers, staff, locations, and operational complexity." },
  ];

  return (
    <section id="simplify-automate-scale" className="site-section scroll-mt-28">
      <div className="site-container">
        <p className="eyebrow">Build a better business system</p>
        <h2 className="section-heading mt-5">Start with the work that creates the most drag.</h2>
        <div className="mt-14 grid gap-5 lg:grid-cols-3">
          {stages.map((stage, index) => (
            <article key={stage.title} className="surface-card relative overflow-hidden rounded-[1.75rem] p-8">
              <span className="text-xs font-semibold tracking-[0.2em] text-violet-300">0{index + 1}</span>
              <h3 className="mt-8 text-3xl font-semibold tracking-tight text-white">{stage.title}</h3>
              <p className="mt-4 leading-relaxed text-ink-muted">{stage.copy}</p>
            </article>
          ))}
        </div>
        <p className="mt-8 text-center text-base font-medium text-white">
          Start with one bottleneck. Build the simplest system that creates measurable value.
        </p>
      </div>
    </section>
  );
}

function BusinessPain() {
  return (
    <section className="pearl-section soft-wave site-section mt-10">
      <div className="site-container relative">
        <p className="eyebrow !text-violet-700">Find the starting point</p>
        <h2 className="section-heading mt-5">What would you like to improve?</h2>
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {PAIN_POINTS.map((item) => (
            <Link key={item.title} href={item.href} className="group rounded-2xl border border-violet-950/10 bg-white/70 p-6 shadow-sm transition hover:-translate-y-1 hover:border-violet-600/25 hover:bg-white">
              <h3 className="text-lg font-semibold">{item.title}</h3>
              <p className="mt-3 text-sm leading-relaxed">{item.copy}</p>
              <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-violet-700">
                Find the right system <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" aria-hidden />
              </span>
            </Link>
          ))}
        </div>
        <div className="mt-10 flex justify-center">
          <Link href="/start-here" className="btn-primary rounded-2xl px-7 py-4 text-sm font-semibold">
            Let&apos;s find the right starting point
          </Link>
        </div>
      </div>
    </section>
  );
}

function BusinessBeforeTechnology() {
  const principles = ["One bottleneck at a time", "Practical outcomes", "Done-for-you implementation", "Systems that grow with the business"];

  return (
    <section className="site-section">
      <div className="site-container grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <div>
          <p className="eyebrow">The DOS philosophy</p>
          <h2 className="section-heading mt-5">Business Before Technology.</h2>
          <p className="section-copy mt-6">
            Technology should adapt to your business — not the other way around. Every DOS solution begins by understanding the business, identifying the biggest bottleneck, and recommending the simplest practical path forward.
          </p>
        </div>
        <div className="grid gap-3">
          {principles.map((principle) => (
            <div key={principle} className="surface-card flex items-center gap-4 rounded-2xl px-5 py-4">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-teal-400/10 text-teal-200">
                <Check className="h-4 w-4" aria-hidden />
              </span>
              <p className="font-medium text-white">{principle}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Solutions() {
  return (
    <section className="site-section bg-[#0b0d1c]/80">
      <div className="site-container">
        <p className="eyebrow">DOS solutions</p>
        <h2 className="section-heading mt-5">Business systems built around real problems.</h2>
        <p className="section-copy mt-6">Practical systems selected around the outcome the business needs, without forcing every business into the same package.</p>
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {SOLUTION_CARDS.map(({ id, title, copy, icon: Icon, href }) => (
            <article key={id} id={id} className="surface-card flex scroll-mt-32 flex-col rounded-[1.6rem] p-7">
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-violet-500/12 text-violet-200">
                <Icon className="h-5 w-5" aria-hidden />
              </span>
              <h3 className="mt-6 text-xl font-semibold text-white">{title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-ink-muted">{copy}</p>
              <Link href={href ?? `/solutions#${id}`} className="mt-auto inline-flex w-fit items-center gap-2 pt-6 text-sm font-semibold text-violet-200 hover:text-white">
                Explore Solution <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
            </article>
          ))}
        </div>
        <div className="mt-9 flex flex-wrap gap-3">
          <TalkToMicahButton context="solutions-section" className="btn-primary rounded-2xl px-6 py-3.5 text-sm font-semibold">
            Talk to Micah
          </TalkToMicahButton>
          <TrackedLink href={DISCOVERY_CALL_HREF} external eventName="calendar_open" eventSource="solutions-section" eventLabel="Start Discovery" className="btn-ghost inline-flex items-center justify-center rounded-2xl px-6 py-3.5 text-sm font-semibold text-white">
            Start Discovery
          </TrackedLink>
        </div>
      </div>
    </section>
  );
}

function Capabilities() {
  return (
    <section className="site-section">
      <div className="site-container">
        <p className="eyebrow">Connected outcomes</p>
        <h2 className="section-heading mt-5">Bring communication, operations and growth into one practical flow.</h2>
        <Link
          href="/solutions/smart-intake-follow-up"
          className="surface-card group mt-10 flex flex-col gap-5 rounded-[1.75rem] p-7 transition hover:border-violet-400/30 sm:flex-row sm:items-center sm:justify-between"
        >
          <span className="flex items-start gap-4">
            <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-violet-500/12 text-violet-200">
              <ClipboardList className="h-6 w-6" aria-hidden />
            </span>
            <span>
              <strong className="block text-xl text-white">DOS Smart Intake &amp; Follow-Up System</strong>
              <span className="mt-2 block max-w-3xl text-sm leading-relaxed text-ink-muted">
                Connect branded intake, organised opportunities, automatic acknowledgements, appointment prompts and monitored follow-up.
              </span>
            </span>
          </span>
          <span className="inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-violet-200">
            Explore the system <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" aria-hidden />
          </span>
        </Link>
        <div className="mt-14 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
          {OUTCOME_GROUPS.map((group) => (
            <article key={group.title} className="surface-card rounded-2xl p-6">
              <h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-violet-200">{group.title}</h3>
              <ul className="mt-5 space-y-3">
                {group.items.map((item) => (
                  <li key={item} className="flex gap-2 text-sm leading-relaxed text-ink-muted">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-teal-300" aria-hidden />
                    {item}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function IndustryPreview() {
  return (
    <section className="site-section bg-gradient-to-b from-[#101225] to-[#0b0d1c]">
      <div className="site-container">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="eyebrow">Industry systems</p>
            <h2 className="section-heading mt-5">Built for businesses like yours.</h2>
          </div>
          <Link href="/industries" className="inline-flex items-center gap-2 text-sm font-semibold text-violet-200 hover:text-white">
            Explore all industries <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </div>
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {INDUSTRIES.slice(0, 8).map((industry) => (
            <TrackedLink key={industry.slug} href={`/industries/${industry.slug}`} eventName="industry_click" eventSource="homepage" eventLabel={industry.name} className="surface-card group rounded-2xl p-6">
              <BriefcaseBusiness className="h-5 w-5 text-violet-300" aria-hidden />
              <h3 className="mt-5 text-lg font-semibold text-white">{industry.name}</h3>
              <p className="mt-3 text-sm leading-relaxed text-ink-muted">{industry.solution}</p>
              <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-violet-200">
                Learn More <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" aria-hidden />
              </span>
            </TrackedLink>
          ))}
        </div>
      </div>
    </section>
  );
}

function Reputation() {
  return (
    <section className="pearl-section site-section">
      <div className="site-container grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <div>
          <p className="eyebrow !text-violet-700">Reputation systems</p>
          <h2 className="section-heading mt-5">Real businesses. Real systems. Real trust.</h2>
          <p className="section-copy mt-6">
            DOS helps businesses turn good customer experiences into stronger reputation through automated review requests, feedback collection, follow-up, and approved client proof.
          </p>
          <Link href="/solutions/reputation" className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-violet-700 hover:text-violet-900">
            Explore DOS Reputation <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </div>
        <div className="rounded-[1.75rem] border border-violet-950/10 bg-white/70 p-8">
          <Quote className="h-7 w-7 text-violet-700" aria-hidden />
          <h3 className="mt-5 text-2xl font-semibold">Good service should create lasting trust.</h3>
          <p className="mt-4 leading-relaxed">
            Verified testimonials and review excerpts are published only after approval. No fabricated ratings, counts or customer claims.
          </p>
        </div>
      </div>
    </section>
  );
}

function Process() {
  return (
    <section className="site-section">
      <div className="site-container">
        <p className="eyebrow">How DOS works</p>
        <h2 className="section-heading mt-5">Discovery first. System second.</h2>
        <p className="section-copy mt-6">We identify the highest-value bottleneck, build the practical solution, and improve it as the business grows.</p>
        <div className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {PROCESS.map(({ title, copy, icon: Icon }, index) => (
            <article key={title} className="surface-card rounded-2xl p-7">
              <div className="flex items-center justify-between">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-violet-500/12 text-violet-200">
                  <Icon className="h-5 w-5" aria-hidden />
                </span>
                <span className="text-xs font-semibold tracking-[0.2em] text-ink-dim">0{index + 1}</span>
              </div>
              <h3 className="mt-6 text-xl font-semibold text-white">{title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-ink-muted">{copy}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Ecosystem() {
  return (
    <section className="site-section bg-[#101225]/75">
      <div className="site-container">
        <p className="eyebrow">Brands and public infrastructure</p>
        <h2 className="section-heading mt-5">Everything DOS runs, in one place.</h2>
        <p className="section-copy mt-6">Flagship brands, business systems, industry systems and public infrastructure — without exposing private internal operations.</p>
        <div className="mt-14 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {ECOSYSTEM_GROUPS.map((group) => (
            <article key={group.title} className="surface-card rounded-[1.75rem] p-7">
              <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-violet-200">{group.title}</h3>
              <div className="mt-5 grid gap-2">
                {group.links.map((item) => (
                  <TrackedLink key={`${item.label}-${item.href}`} href={item.href} external={item.external} eventName={item.external ? "ecosystem_outbound_click" : "resource_click"} eventSource="homepage-ecosystem" eventLabel={item.label} className="flex items-center justify-between rounded-xl border border-white/[0.06] px-4 py-3 text-sm text-ink-muted transition hover:border-violet-400/25 hover:text-white">
                    {item.label}
                    <ArrowRight className="h-4 w-4" aria-hidden />
                  </TrackedLink>
                ))}
              </div>
            </article>
          ))}
        </div>
        <Link href="/ecosystem" className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-violet-200 hover:text-white">
          View the DOS Ecosystem <ArrowRight className="h-4 w-4" aria-hidden />
        </Link>
      </div>
    </section>
  );
}

function Resources() {
  const resources = [
    { title: "Business Discovery", copy: "Discuss the bottleneck that is holding the business back.", href: DISCOVERY_CALL_HREF, external: true, icon: CalendarCheck2 },
    { title: "Start Here", copy: "Tell DOS what you would like to improve.", href: "/start-here", icon: ClipboardCheck },
    { title: "Industry Guides", copy: "Explore pathways designed around different business operations.", href: "/industries", icon: UsersRound },
    { title: "DOS Insights", copy: "Read practical thinking on systems, websites and communication.", href: "/insights", icon: Sparkles },
  ];

  return (
    <section className="site-section">
      <div className="site-container">
        <p className="eyebrow">Public resources</p>
        <h2 className="section-heading mt-5">Practical tools for better business decisions.</h2>
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {resources.map(({ title, copy, href, external, icon: Icon }) => (
            <TrackedLink key={title} href={href} external={external} eventName="resource_click" eventSource="homepage-resources" eventLabel={title} className="surface-card rounded-2xl p-6">
              <Icon className="h-5 w-5 text-teal-300" aria-hidden />
              <h3 className="mt-5 text-lg font-semibold text-white">{title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-ink-muted">{copy}</p>
            </TrackedLink>
          ))}
        </div>
      </div>
    </section>
  );
}

function Insights() {
  return (
    <section className="site-section bg-[#0b0d1c]/85">
      <div className="site-container">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="eyebrow">DOS Insights</p>
            <h2 className="section-heading mt-5">Clear thinking for growing businesses.</h2>
          </div>
          <Link href="/insights" className="inline-flex items-center gap-2 text-sm font-semibold text-violet-200 hover:text-white">
            Read all Insights <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </div>
        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {INSIGHTS.map((article) => (
            <article key={article.slug} className="surface-card rounded-[1.75rem] p-7">
              <p className="eyebrow">{article.category}</p>
              <h3 className="mt-5 text-2xl font-semibold tracking-tight text-white">{article.title}</h3>
              <p className="mt-4 text-sm leading-relaxed text-ink-muted">{article.excerpt}</p>
              <Link href={`/blog/${article.slug}`} className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-violet-200 hover:text-white">
                Read article <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function FinalMicah() {
  return (
    <section className="site-section">
      <div className="site-container grid items-center gap-12 overflow-hidden rounded-[2.25rem] border border-white/[0.09] bg-gradient-to-br from-[#17192e] via-[#101225] to-[#0b0d1c] p-7 sm:p-12 lg:grid-cols-[0.75fr_1.25fr]">
        <OfficialMicahProfile compact showCta={false} />
        <div>
          <p className="eyebrow">Available 24/7</p>
          <h2 className="mt-5 text-4xl font-semibold tracking-tight text-white sm:text-6xl">Not sure where to begin? Talk to Micah.</h2>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-muted">
            Micah can help identify the right starting point for your business, answer questions about DOS, and guide you toward the next practical step.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <TalkToMicahButton context="homepage-final" className="btn-micah inline-flex items-center justify-center rounded-2xl px-6 py-4 text-sm font-semibold text-white">
              Talk to Micah Live
            </TalkToMicahButton>
            <TrackedLink href={DISCOVERY_CALL_HREF} external eventName="calendar_open" eventSource="homepage-final" eventLabel="Book Business Discovery" className="btn-ghost inline-flex items-center justify-center rounded-2xl px-6 py-4 text-sm font-semibold text-white">
              Book Business Discovery
            </TrackedLink>
            <Link href="/start-here" className="btn-ghost inline-flex items-center justify-center rounded-2xl px-6 py-4 text-sm font-semibold text-white">
              Start Here
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
