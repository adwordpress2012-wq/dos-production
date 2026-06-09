import Link from "next/link";
import type { ReactNode } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Building2,
  CalendarClock,
  ClipboardList,
  Compass,
  LayoutDashboard,
  MessageSquare,
  Pizza,
  Send,
  ShoppingBag,
  Sparkles,
  Users,
  UtensilsCrossed,
  Wrench,
} from "lucide-react";
import GlowCard, { GlowIcon } from "./components/GlowCard";
import SectionHeader from "./components/SectionHeader";
import { DISCOVERY_CALL_HREF } from "./lib/booking";

type GlowTone = "cyan" | "fuchsia" | "violet" | "emerald" | "amber";

type ShowroomCard = {
  name: string;
  label: string;
  description?: string;
  icon: ReactNode;
  tone: GlowTone;
  href?: string;
  status?: string;
  ctaLabel: string;
  ctaKind: "external" | "anchor" | "static";
  anchor?: string;
};

const PUBLIC_LIVE_SYSTEMS: ShowroomCard[] = [
  {
    name: "DOS Calendar",
    href: "https://doscalendar.com",
    label: "Operational Scheduling System",
    icon: <CalendarClock className="h-5 w-5" />,
    tone: "cyan",
    ctaLabel: "Open live demo",
    ctaKind: "external",
  },
  {
    name: "Micah / ChatOS",
    href: "https://chatos.com.au",
    label: "Smart Chat Widget + Smart Business Assistant",
    icon: <MessageSquare className="h-5 w-5" />,
    tone: "fuchsia",
    ctaLabel: "Open live demo",
    ctaKind: "external",
  },
  {
    name: "DOS SOOS",
    href: "https://dossoos.com.au",
    label: "Restaurant Ordering System",
    icon: <UtensilsCrossed className="h-5 w-5" />,
    tone: "amber",
    ctaLabel: "Open live demo",
    ctaKind: "external",
  },
  {
    name: "DOS Workspace",
    href: "https://dosworkspace.com",
    label: "DOS Client Workspace",
    icon: <LayoutDashboard className="h-5 w-5" />,
    tone: "cyan",
    ctaLabel: "Open live demo",
    ctaKind: "external",
  },
];

const DOS_CAPABILITIES: ShowroomCard[] = [
  {
    name: "DOSLead",
    label: "Outreach & Follow-Up System",
    description:
      "A DOS growth workflow for organising prospects, preparing outreach, tracking follow-ups and turning discovery conversations into new operational system projects.",
    icon: <Send className="h-5 w-5" />,
    tone: "violet",
    ctaLabel: "View workflow",
    ctaKind: "anchor",
    anchor: "#dos-workflow",
  },
  {
    name: "QuoteOS",
    label: "Tradie Operating System",
    description: "Quote, job and follow-up workflows for trade businesses — scoped as part of a DOS operational build.",
    icon: <Wrench className="h-5 w-5" />,
    tone: "emerald",
    ctaLabel: "View workflow",
    ctaKind: "anchor",
    anchor: "#dos-workflow",
  },
  {
    name: "AgentMate",
    label: "Real Estate Operational Assistant",
    icon: <Building2 className="h-5 w-5" />,
    tone: "violet",
    status: "Preview / Paused",
    ctaLabel: "View workflow",
    ctaKind: "anchor",
    anchor: "#dos-workflow",
  },
  {
    name: "BookOS",
    label: "Booking Workflow System",
    description:
      "A booking-focused DOS system for service businesses that need enquiries, scheduling, reminders and customer handover organised into one simple operational flow.",
    icon: <BookOpen className="h-5 w-5" />,
    tone: "cyan",
    status: "Coming Soon / Framework",
    ctaLabel: "View workflow",
    ctaKind: "anchor",
    anchor: "#dos-workflow",
  },
  {
    name: "GuestMate",
    label: "Guest Operations System",
    description: "Guest bookings, arrival reminders, welcome packs and records shaped into one operational workflow.",
    icon: <Users className="h-5 w-5" />,
    tone: "fuchsia",
    status: "Coming Soon / Client Build",
    ctaLabel: "View workflow",
    ctaKind: "anchor",
    anchor: "#dos-workflow",
  },
  {
    name: "RestaurantOS",
    label: "Restaurant Operations Framework",
    icon: <UtensilsCrossed className="h-5 w-5" />,
    tone: "amber",
    status: "Framework",
    ctaLabel: "View workflow",
    ctaKind: "anchor",
    anchor: "#dos-workflow",
  },
  {
    name: "ShopOS",
    label: "Retail Operations Framework",
    icon: <ShoppingBag className="h-5 w-5" />,
    tone: "emerald",
    status: "Framework",
    ctaLabel: "View workflow",
    ctaKind: "anchor",
    anchor: "#dos-workflow",
  },
];

const CLIENT_BUILD_DEMOS: ShowroomCard[] = [
  {
    name: "Capital Recruitment",
    label: "Recruitment Website System",
    icon: <Building2 className="h-5 w-5" />,
    tone: "violet",
    ctaLabel: "Read story",
    ctaKind: "anchor",
    anchor: "/case-studies/capital-recruitment",
  },
  {
    name: "Zio Pizza & Pasta",
    label: "Restaurant client build",
    icon: <Pizza className="h-5 w-5" />,
    tone: "fuchsia",
    status: "Private preview",
    ctaLabel: "Coming soon",
    ctaKind: "static",
  },
  {
    name: "Galactic Plumbing",
    label: "Plumbing / QuoteOS workflow",
    icon: <Wrench className="h-5 w-5" />,
    tone: "emerald",
    ctaLabel: "View workflow",
    ctaKind: "anchor",
    anchor: "#dos-workflow",
  },
];

const DOS_WORKFLOW = [
  {
    icon: <Compass className="h-5 w-5" />,
    title: "Discovery",
    description: "We learn how enquiries, bookings, orders and follow-ups actually move through the business today.",
    tone: "violet" as const,
  },
  {
    icon: <ClipboardList className="h-5 w-5" />,
    title: "Pain Point",
    description: "We map what gets missed, where admin piles up, and where time or revenue quietly leaks.",
    tone: "fuchsia" as const,
  },
  {
    icon: <LayoutDashboard className="h-5 w-5" />,
    title: "Workflow",
    description: "We design the practical path — capture, organise, hand off and follow up without chaos.",
    tone: "cyan" as const,
  },
  {
    icon: <ArrowRight className="h-5 w-5" />,
    title: "Build Road",
    description: "We build the website, forms, dashboards, messaging flows and operational tools the workflow needs.",
    tone: "emerald" as const,
  },
  {
    icon: <CalendarClock className="h-5 w-5" />,
    title: "Buy Back Time",
    description: "DOS manages hosting, care and improvements so the system keeps working while you run the business.",
    tone: "amber" as const,
  },
];

type ClientStory = {
  name: string;
  business: string;
  summary: string;
  tone: GlowTone;
  status?: string;
  ctaLabel: string;
  ctaKind: "internal" | "anchor" | "static";
  href?: string;
};

const CLIENT_STORIES: ClientStory[] = [
  {
    name: "Luke",
    business: "Galactic Plumbing",
    summary:
      "Quote and enquiry workflow organised so job requests, follow-ups and booking handover stay out of scattered text threads.",
    tone: "emerald",
    ctaLabel: "View workflow",
    ctaKind: "anchor",
    href: "#dos-workflow",
  },
  {
    name: "Jamie & Tanya",
    business: "TJ's 4B Park",
    summary:
      "Guest bookings, Hipcamp operations, arrival reminders, welcome packs and guest records shaped into one simple GuestMate workflow.",
    tone: "cyan",
    ctaLabel: "View workflow",
    ctaKind: "anchor",
    href: "#dos-workflow",
  },
  {
    name: "Ziyad",
    business: "Zio Pizza & Pasta",
    summary:
      "Restaurant ordering, customer records, promotions and follow-up workflows shaped into one operational flow.",
    tone: "fuchsia",
    status: "Private preview",
    ctaLabel: "Coming soon",
    ctaKind: "static",
  },
  {
    name: "Paul",
    business: "Capital Recruitment",
    summary:
      "Recruitment website, job listings, resume uploads and admin workflows modernised into one managed platform.",
    href: "/case-studies/capital-recruitment",
    tone: "violet",
    ctaLabel: "Read story",
    ctaKind: "internal",
  },
];

type EcosystemProduct = {
  name: string;
  description: string;
  icon: ReactNode;
  tone: GlowTone;
  href?: string;
  ctaKind: "external" | "anchor" | "static";
  anchor?: string;
};

const ECOSYSTEM_PRODUCTS: EcosystemProduct[] = [
  {
    name: "Micah",
    description: "Smart Business Assistant for enquiries, bookings and follow-ups.",
    icon: <MessageSquare className="h-5 w-5" />,
    tone: "fuchsia",
    href: "https://chatos.com.au",
    ctaKind: "external",
  },
  {
    name: "TourismOS",
    description:
      "Guest Booking & Communication System for campgrounds, farm stays, glamping and accommodation operators.",
    icon: <Users className="h-5 w-5" />,
    tone: "cyan",
    href: "https://tourismos.com.au",
    ctaKind: "external",
  },
  {
    name: "DOS SOOS",
    description: "Direct online ordering system for restaurants and local food businesses.",
    icon: <UtensilsCrossed className="h-5 w-5" />,
    tone: "amber",
    href: "https://dossoos.com.au",
    ctaKind: "external",
  },
  {
    name: "QuoteOS",
    description: "Quoting and booking workflow for tradies.",
    icon: <Wrench className="h-5 w-5" />,
    tone: "emerald",
    ctaKind: "anchor",
    anchor: "#dos-workflow",
  },
  {
    name: "AgentMate",
    description: "Daily operational assistant for real estate agents.",
    icon: <Building2 className="h-5 w-5" />,
    tone: "violet",
    ctaKind: "anchor",
    anchor: "#dos-workflow",
  },
  {
    name: "DOS Infrastructure",
    description: "Powered by Command Centre, DOS Calendar, DOSLead and reusable workflow systems.",
    icon: <LayoutDashboard className="h-5 w-5" />,
    tone: "violet",
    ctaKind: "anchor",
    anchor: "#live-demos",
  },
];

export default function Home() {
  return (
    <>
      <HeroSection />
      <LiveDosSystems />
      <DosWorkflow />
      <ClientStories />
      <DosEcosystem />
      <DiscoveryCta />
    </>
  );
}

function HeroSection() {
  return (
    <section className="relative pt-32 sm:pt-40 pb-16 sm:pb-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="relative overflow-hidden rounded-[2rem] glass-strong px-6 py-14 sm:px-10 sm:py-18 lg:px-14 ring-glow">
          <div
            aria-hidden
            className="absolute -top-32 left-1/2 h-80 w-[760px] -translate-x-1/2 rounded-full bg-violet-500/25 blur-[120px]"
          />
          <div
            aria-hidden
            className="absolute -bottom-40 right-0 h-80 w-[620px] rounded-full bg-cyan-400/20 blur-[120px]"
          />

          <div className="relative grid gap-12 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-7">
              <span className="inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-emerald-200">
                <Sparkles className="h-3.5 w-3.5" />
                Practical Business Systems
              </span>

              <h1 className="mt-7 max-w-4xl text-4xl font-semibold leading-[1.02] tracking-tight sm:text-6xl lg:text-[76px]">
                Helping Small Businesses Buy Back Their Time
              </h1>

              <p className="mt-6 max-w-2xl text-base leading-relaxed text-ink-muted sm:text-lg lg:text-xl">
                Directive OS builds practical business systems that help small operators manage
                enquiries, bookings, follow-ups, customers, and day-to-day operations in one place.
              </p>

              <div className="mt-8 flex w-full max-w-xl flex-col gap-3 sm:flex-row">
                <Link
                  href={DISCOVERY_CALL_HREF}
                  className="btn-neon inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold text-white"
                >
                  Book a Discovery Call <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/#live-demos"
                  className="btn-ghost inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3 text-sm font-medium text-white"
                >
                  Explore DOS Systems
                </Link>
              </div>

              <p className="mt-5 max-w-xl text-sm leading-relaxed text-ink-muted">
                Discovery-first. Explore live DOS systems below, then scope the right build for your
                workflow.
              </p>
            </div>

            <div className="lg:col-span-5">
              <OperationalMapMock />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function OperationalMapMock() {
  const rows = [
    ["Enquiries", "Website, phone, social, referrals", "capture"],
    ["Workflow", "Bookings, orders, quotes, follow-ups", "map"],
    ["System", "Forms, dashboards, messages, calendar", "build"],
    ["Care", "Hosting, support, improvements", "support"],
  ];

  return (
    <div className="relative">
      <div
        aria-hidden
        className="absolute -inset-6 rounded-[28px] bg-gradient-to-br from-violet-500/30 via-fuchsia-500/10 to-cyan-400/15 opacity-70 blur-2xl"
      />
      <div className="relative rounded-3xl border border-white/10 bg-[#06080f]/90 p-4 shadow-2xl">
        <div className="flex items-center justify-between border-b border-white/5 pb-4">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-red-400/60" />
            <span className="h-2.5 w-2.5 rounded-full bg-amber-300/60" />
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/60" />
          </div>
          <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink-dim">
            discovery map
          </span>
        </div>

        <div className="mt-5 space-y-3">
          {rows.map(([label, detail, status], index) => (
            <div key={label} className="rounded-2xl border border-white/5 bg-white/[0.03] p-4">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-dim">
                    0{index + 1}
                  </div>
                  <p className="mt-1 text-sm font-semibold text-white">{label}</p>
                  <p className="mt-1 text-xs leading-relaxed text-ink-muted">{detail}</p>
                </div>
                <span className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-2 py-1 text-[10px] font-medium uppercase tracking-wider text-emerald-300">
                  {status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ShowroomCardBody({ card, showDescription = false }: { card: ShowroomCard; showDescription?: boolean }) {
  return (
    <GlowCard tone={card.tone} className="h-full transition group-hover:ring-1 group-hover:ring-white/10">
      <div className="flex items-start justify-between gap-3">
        <GlowIcon tone={card.tone}>{card.icon}</GlowIcon>
        {card.ctaKind === "external" && (
          <ArrowUpRight className="h-4 w-4 shrink-0 text-ink-dim transition group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        )}
      </div>
      <div className="mt-4 flex flex-wrap items-center gap-2">
        <h3 className="text-lg font-semibold tracking-tight text-white">{card.name}</h3>
        {card.status && (
          <span className="rounded-full border border-amber-400/25 bg-amber-400/10 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-amber-200">
            {card.status}
          </span>
        )}
      </div>
      <p className="mt-2 text-sm leading-relaxed text-ink-muted">{card.label}</p>
      {showDescription && card.description && (
        <p className="mt-3 text-sm leading-relaxed text-ink-muted/90">{card.description}</p>
      )}
      <p className="mt-4 text-xs font-medium text-cyan-200/90">{card.ctaLabel}</p>
    </GlowCard>
  );
}

function resolveShowroomHref(target: string) {
  if (target.startsWith("/")) return target;
  if (target.startsWith("#")) return `/${target}`;
  return target;
}

function ShowroomCardLink({ card, showDescription = false }: { card: ShowroomCard; showDescription?: boolean }) {
  const body = <ShowroomCardBody card={card} showDescription={showDescription} />;

  if (card.ctaKind === "external" && card.href) {
    return (
      <a href={card.href} target="_blank" rel="noreferrer" className="group block h-full">
        {body}
      </a>
    );
  }

  if (card.ctaKind === "anchor" && card.anchor) {
    return (
      <Link href={resolveShowroomHref(card.anchor)} className="group block h-full">
        {body}
      </Link>
    );
  }

  return <div className="group block h-full">{body}</div>;
}

function ClientBuildDemoRow({ demo }: { demo: ShowroomCard }) {
  const content = (
    <div className="glass flex h-full items-center justify-between gap-4 rounded-2xl px-5 py-4 transition hover:bg-white/[0.04]">
      <div className="flex min-w-0 items-center gap-3">
        <GlowIcon tone={demo.tone}>{demo.icon}</GlowIcon>
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <p className="text-sm font-semibold text-white">{demo.name}</p>
            {demo.status && (
              <span className="rounded-full border border-amber-400/25 bg-amber-400/10 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-amber-200">
                {demo.status}
              </span>
            )}
          </div>
          <p className="mt-0.5 truncate text-xs text-ink-muted">{demo.label}</p>
        </div>
      </div>
      <span className="shrink-0 text-xs font-medium text-cyan-200/90">{demo.ctaLabel}</span>
    </div>
  );

  if (demo.ctaKind === "anchor" && demo.anchor) {
    return (
      <Link href={resolveShowroomHref(demo.anchor)} className="group block">
        {content}
      </Link>
    );
  }

  return <div className="block">{content}</div>;
}

function LiveDosSystems() {
  return (
    <section id="live-demos" className="relative scroll-mt-28 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeader
          eyebrow="Live DOS Systems"
          title={
            <>
              Try the <span className="text-gradient-neon">live demo systems.</span>
            </>
          }
          description="directiveos.com.au is the DOS showroom. Only confirmed public systems open externally — everything else stays on this page as workflow and capability cards."
        />

        <p className="mt-10 text-xs font-medium uppercase tracking-[0.2em] text-ink-dim">Public live systems</p>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {PUBLIC_LIVE_SYSTEMS.map((system) => (
            <ShowroomCardLink key={system.name} card={system} />
          ))}
        </div>

        <p className="mt-14 text-xs font-medium uppercase tracking-[0.2em] text-ink-dim">DOS capabilities & frameworks</p>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {DOS_CAPABILITIES.map((system) => (
            <ShowroomCardLink key={system.name} card={system} showDescription={Boolean(system.description)} />
          ))}
        </div>

        <div className="mt-16">
          <p className="text-center text-xs font-medium uppercase tracking-[0.2em] text-ink-dim">
            Client & industry builds
          </p>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {CLIENT_BUILD_DEMOS.map((demo) => (
              <ClientBuildDemoRow key={demo.name} demo={demo} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function DosWorkflow() {
  return (
    <section id="dos-workflow" className="relative scroll-mt-28 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeader
          eyebrow="DOS Workflow"
          title={
            <>
              Discovery first. <span className="text-gradient-purple">System second.</span>
            </>
          }
          description="DOS is Operational Systems Engineering + AI systems building for small business — not a generic website agency or fixed SaaS bundle."
        />

        <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-5">
          {DOS_WORKFLOW.map((step, index) => (
            <GlowCard key={step.title} tone={step.tone} className="h-full">
              <div className="flex items-center justify-between gap-4">
                <GlowIcon tone={step.tone}>{step.icon}</GlowIcon>
                <span className="font-mono text-xs uppercase tracking-[0.24em] text-ink-dim">
                  0{index + 1}
                </span>
              </div>
              <h3 className="mt-5 text-lg font-semibold tracking-tight">{step.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-ink-muted">{step.description}</p>
            </GlowCard>
          ))}
        </div>
      </div>
    </section>
  );
}

function ClientStories() {
  return (
    <section id="client-stories" className="relative scroll-mt-28 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeader
          eyebrow="Client Stories"
          title={
            <>
              Systems built around <span className="text-gradient-purple">real operations.</span>
            </>
          }
          description="Examples of practical DOS builds — shaped after discovery, not forced into a package card."
        />

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {CLIENT_STORIES.map((story) => {
            const card = (
              <GlowCard tone={story.tone} className="h-full">
                <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink-dim">Client story</p>
                <h3 className="mt-4 text-xl font-semibold tracking-tight">{story.name}</h3>
                <div className="mt-1 flex flex-wrap items-center gap-2">
                  <p className="text-sm font-medium text-violet-200/90">{story.business}</p>
                  {story.status && (
                    <span className="rounded-full border border-amber-400/25 bg-amber-400/10 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-amber-200">
                      {story.status}
                    </span>
                  )}
                </div>
                <p className="mt-4 text-sm leading-relaxed text-ink-muted">{story.summary}</p>
                <p className="mt-5 inline-flex items-center gap-1.5 text-xs font-medium text-cyan-200/90">
                  {story.ctaLabel}
                  {story.ctaKind !== "static" && <ArrowUpRight className="h-3.5 w-3.5" />}
                </p>
              </GlowCard>
            );

            if (story.ctaKind === "internal" && story.href) {
              return (
                <Link key={story.name} href={story.href} className="group block h-full">
                  {card}
                </Link>
              );
            }

            if (story.ctaKind === "anchor" && story.href) {
              return (
                <Link key={story.name} href={resolveShowroomHref(story.href)} className="group block h-full">
                  {card}
                </Link>
              );
            }

            return (
              <div key={story.name} className="block h-full">
                {card}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function EcosystemProductCard({ product }: { product: EcosystemProduct }) {
  const card = (
    <GlowCard tone={product.tone} className="h-full transition group-hover:ring-1 group-hover:ring-white/10">
      <GlowIcon tone={product.tone}>{product.icon}</GlowIcon>
      <h3 className="mt-4 text-lg font-semibold tracking-tight text-white">{product.name}</h3>
      <p className="mt-2 text-sm leading-relaxed text-ink-muted">{product.description}</p>
    </GlowCard>
  );

  if (product.ctaKind === "external" && product.href) {
    return (
      <a href={product.href} target="_blank" rel="noreferrer" className="group block h-full">
        {card}
      </a>
    );
  }

  if (product.ctaKind === "anchor" && product.anchor) {
    return (
      <Link href={resolveShowroomHref(product.anchor)} className="group block h-full">
        {card}
      </Link>
    );
  }

  return <div className="block h-full">{card}</div>;
}

function DosEcosystem() {
  return (
    <section id="dos-ecosystem" className="relative scroll-mt-28 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeader
          eyebrow="DOS Ecosystem"
          title={
            <>
              Practical systems for <span className="text-gradient-purple">real operations.</span>
            </>
          }
          description="Micah, TourismOS, DOS SOOS, QuoteOS, AgentMate and DOS Infrastructure connect inside broader workflow builds — components DOS selects after discovery, not a fixed bundle."
        />

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {ECOSYSTEM_PRODUCTS.map((product) => (
            <EcosystemProductCard key={product.name} product={product} />
          ))}
        </div>

        <Link
          href="/#live-demos"
          className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-cyan-200/90 transition hover:text-cyan-100"
        >
          Explore all live demos <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </section>
  );
}

function DiscoveryCta() {
  return (
    <section className="relative py-24 sm:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="relative overflow-hidden rounded-3xl glass-strong p-10 ring-glow sm:p-14">
          <div
            aria-hidden
            className="absolute -top-20 left-1/2 h-72 w-[800px] -translate-x-1/2 rounded-full bg-violet-500/30 blur-[120px]"
          />
          <div
            aria-hidden
            className="absolute -bottom-24 right-0 h-72 w-[600px] rounded-full bg-cyan-400/20 blur-[120px]"
          />

          <div className="relative grid gap-10 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-7">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 text-xs font-medium uppercase tracking-[0.2em] text-ink-muted">
                <ClipboardList className="h-3.5 w-3.5 text-violet-300" />
                Next action
              </span>
              <h2 className="mt-6 text-3xl font-semibold leading-[1.05] tracking-tight sm:text-5xl">
                Book a Discovery Call
              </h2>
              <p className="mt-5 max-w-2xl text-base leading-relaxed text-ink-muted sm:text-lg">
                Show us where the business is leaking time, leads or momentum. DOS reviews the
                bottlenecks and recommends a practical system build — scoped after discovery, not from
                a pricing table.
              </p>
            </div>

            <div className="lg:col-span-5">
              <div className="grid gap-3">
                <Link
                  href={DISCOVERY_CALL_HREF}
                  className="btn-neon inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold text-white"
                >
                  Book a Discovery Call <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/#live-demos"
                  className="btn-ghost inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3 text-sm font-medium text-white"
                >
                  Explore DOS Systems
                </Link>
                <div className="glass rounded-2xl px-5 py-4 text-sm leading-relaxed text-ink-muted">
                  <MessageSquare className="mb-3 h-4 w-4 text-emerald-300" />
                  Jaze reviews each request and follows up with the next practical step.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
