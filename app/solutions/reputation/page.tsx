import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import {
  ArrowRight,
  BellRing,
  Check,
  CircleCheckBig,
  MessageSquareText,
  Quote,
  SendHorizontal,
  ShieldAlert,
  ShieldCheck,
  Sparkles,
  Star,
  ThumbsDown,
  ThumbsUp,
  TrendingUp,
  UserRoundCheck,
} from "lucide-react";
import PageCta from "@/app/components/PageCta";
import PublicPageHero from "@/app/components/PublicPageHero";
import { breadcrumbSchema, createPageMetadata, SITE_URL } from "@/app/lib/seo";

const DESCRIPTION =
  "DOS Reputation asks for a review at the right moment, guides happy customers toward a public Google review, and routes unhappy feedback privately to a person who can act on it.";

export const metadata: Metadata = createPageMetadata({
  title: "DOS Reputation — Reviews and Customer Feedback",
  description: DESCRIPTION,
  path: "/solutions/reputation",
});

const SHARED_STEPS = [
  {
    title: "Completed customer experience",
    copy: "The job is finished, the appointment is done or the customer has been served.",
    icon: CircleCheckBig,
  },
  {
    title: "Review request",
    copy: "A timely, personal request goes out while the experience is still fresh.",
    icon: SendHorizontal,
  },
];

const PATHS = [
  {
    label: "Happy customer",
    title: "Positive path",
    icon: ThumbsUp,
    tone: "positive" as const,
    steps: [
      {
        title: "Google review",
        copy: "The customer is guided straight to the place a public review actually counts.",
        icon: Star,
      },
      {
        title: "Reputation growth",
        copy: "Genuine reviews build the Google Business Profile that future customers judge you on.",
        icon: TrendingUp,
      },
    ],
  },
  {
    label: "Unhappy customer",
    title: "Negative path",
    icon: ThumbsDown,
    tone: "human" as const,
    steps: [
      {
        title: "Private feedback",
        copy: "The customer gets a private channel to explain what went wrong, not a public rating box.",
        icon: MessageSquareText,
      },
      {
        title: "Internal human alert",
        copy: "The business is told immediately so a person can call, listen and put it right.",
        icon: BellRing,
      },
    ],
  },
];

const OUTCOMES = [
  "Generate more genuine customer reviews",
  "Improve Google Business Profile reputation",
  "Automate review requests",
  "Capture negative feedback privately",
  "Alert the business when human intervention is required",
  "Strengthen trust and future lead conversion",
];

const CAPABILITIES = [
  {
    title: "Asked at the right moment",
    copy: "The request is triggered by the completed experience, not a monthly campaign sent to everyone at once.",
    icon: Sparkles,
  },
  {
    title: "Two clear paths",
    copy: "A good experience goes public. A poor one goes private, to someone who can do something about it.",
    icon: MessageSquareText,
  },
  {
    title: "Google Business Profile growth",
    copy: "Reviews land where they influence the next customer searching for what you do.",
    icon: TrendingUp,
  },
  {
    title: "Private feedback capture",
    copy: "The customer feels heard, and the business learns what went wrong before anyone else reads about it.",
    icon: ShieldAlert,
  },
  {
    title: "Alerts to a real person",
    copy: "Negative feedback reaches a nominated staff member straight away, with the context to respond well.",
    icon: UserRoundCheck,
  },
  {
    title: "Approved proof only",
    copy: "Testimonials and review excerpts are published only after approval — no fabricated ratings or claims.",
    icon: ShieldCheck,
  },
];

const breadcrumbs = breadcrumbSchema([
  { name: "Home", path: "/" },
  { name: "Solutions", path: "/solutions" },
  { name: "DOS Reputation", path: "/solutions/reputation" },
]);

const reputationServiceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": `${SITE_URL}/solutions/reputation#service`,
  name: "DOS Reputation",
  url: `${SITE_URL}/solutions/reputation`,
  description: DESCRIPTION,
  provider: { "@id": `${SITE_URL}/#organisation` },
  areaServed: { "@type": "Country", name: "Australia" },
  serviceType: CAPABILITIES.map((capability) => capability.title),
  audience: {
    "@type": "BusinessAudience",
    audienceType: "Growing businesses",
  },
};

export default function ReputationPage() {
  return (
    <main>
      <Script
        id="reputation-breadcrumbs"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs).replace(/</g, "\\u003c") }}
      />
      <Script
        id="reputation-service"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(reputationServiceSchema).replace(/</g, "\\u003c") }}
      />

      <PublicPageHero
        eyebrow="DOS Reputation"
        title="Turn completed work into genuine reviews — and catch problems privately first."
        description={DESCRIPTION}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Solutions", href: "/solutions" },
          { label: "DOS Reputation" },
        ]}
      />

      <section className="pb-8">
        <div className="site-container">
          <div className="surface-card rounded-[1.75rem] p-7">
            <p className="eyebrow">What Reputation changes</p>
            <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
              {OUTCOMES.map((outcome) => (
                <p key={outcome} className="flex gap-2 text-sm leading-relaxed text-ink-muted">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-teal-300" aria-hidden />
                  {outcome}
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="site-section">
        <div className="site-container">
          <p className="eyebrow">How a review request works</p>
          <h2 className="section-heading mt-5">One request. Two honest paths.</h2>
          <p className="section-copy mt-6">
            Good service should create lasting trust. Poor service should reach a person who can fix it — before it
            reaches the internet.
          </p>

          <ol className="mt-12 grid gap-4 md:grid-cols-2">
            {SHARED_STEPS.map(({ title, copy, icon: Icon }, index) => (
              <li key={title} className="surface-card flex flex-col rounded-2xl p-6">
                <div className="flex items-center justify-between">
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-violet-500/12 text-violet-200">
                    <Icon className="h-5 w-5" aria-hidden />
                  </span>
                  <span className="text-xs font-semibold tracking-[0.2em] text-ink-dim">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="mt-6 text-lg font-semibold text-white">{title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-muted">{copy}</p>
              </li>
            ))}
          </ol>

          <p className="mt-6 text-center text-xs font-semibold uppercase tracking-[0.22em] text-ink-dim">
            The customer&rsquo;s own answer decides the path
          </p>

          <div className="mt-6 grid gap-4 lg:grid-cols-2">
            {PATHS.map(({ label, title, icon: Icon, tone, steps }) => {
              const human = tone === "human";
              return (
                <article
                  key={title}
                  className={`surface-card rounded-[1.75rem] p-7 ${human ? "border-teal-300/25" : "border-violet-400/20"}`}
                >
                  <div className="flex items-center justify-between gap-3">
                    <span
                      className={`inline-flex h-11 w-11 items-center justify-center rounded-2xl ${
                        human ? "bg-teal-400/12 text-teal-200" : "bg-violet-500/12 text-violet-200"
                      }`}
                    >
                      <Icon className="h-5 w-5" aria-hidden />
                    </span>
                    <span
                      className={`rounded-lg px-2.5 py-1 text-xs font-semibold ${
                        human ? "bg-teal-400/10 text-teal-200" : "bg-violet-500/10 text-violet-200"
                      }`}
                    >
                      {label}
                    </span>
                  </div>
                  <h3 className="mt-6 text-xl font-semibold text-white">{title}</h3>
                  <ol className="mt-5 grid gap-3">
                    {steps.map(({ title: stepTitle, copy, icon: StepIcon }) => (
                      <li
                        key={stepTitle}
                        className="flex items-start gap-4 rounded-2xl border border-white/[0.07] bg-white/[0.025] px-5 py-4"
                      >
                        <StepIcon
                          className={`mt-0.5 h-4 w-4 shrink-0 ${human ? "text-teal-200" : "text-violet-200"}`}
                          aria-hidden
                        />
                        <span>
                          <strong className="block text-sm font-semibold text-white">{stepTitle}</strong>
                          <span className="mt-1.5 block text-sm leading-relaxed text-ink-muted">{copy}</span>
                        </span>
                      </li>
                    ))}
                  </ol>
                  {human ? (
                    <span className="mt-5 inline-flex w-fit items-center rounded-lg bg-teal-400/10 px-2.5 py-1 text-xs font-semibold text-teal-200">
                      Human control
                    </span>
                  ) : null}
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="site-section bg-[#0b0d1c]/80">
        <div className="site-container">
          <p className="eyebrow">System capabilities</p>
          <h2 className="section-heading mt-5">Reputation built on real customer experiences.</h2>
          <div className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {CAPABILITIES.map(({ title, copy, icon: Icon }) => (
              <article key={title} className="surface-card rounded-2xl p-6">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-violet-500/12 text-violet-200">
                  <Icon className="h-5 w-5" aria-hidden />
                </span>
                <h3 className="mt-5 text-lg font-semibold text-white">{title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-muted">{copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="site-section">
        <div className="site-container">
          <div className="surface-card flex flex-col gap-5 rounded-[1.75rem] p-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-3xl">
              <p className="eyebrow">Where reputation sits in the ecosystem</p>
              <h2 className="mt-5 text-2xl font-semibold text-white">
                The end of one customer journey is the start of the next.
              </h2>
              <p className="mt-4 leading-relaxed text-ink-muted">
                Reputation is the stage where delivered work becomes future demand. It closes the loop that DOS ERA opens
                when an enquiry first arrives and DOS ARC completes when the invoice is settled.
              </p>
            </div>
            <Link
              href="/ecosystem"
              className="inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-violet-200 hover:text-white"
            >
              See the full architecture <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>
        </div>
      </section>

      <section className="pearl-section site-section">
        <div className="site-container grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <p className="eyebrow !text-violet-700">Real businesses. Real systems. Real trust.</p>
            <h2 className="section-heading mt-5">Good service should create lasting trust.</h2>
            <p className="section-copy mt-6">
              DOS helps businesses turn good customer experiences into stronger reputation through automated review
              requests, private feedback collection, follow-up and approved client proof.
            </p>
          </div>
          <div className="rounded-[1.75rem] border border-violet-950/10 bg-white/70 p-8">
            <Quote className="h-7 w-7 text-violet-700" aria-hidden />
            <h3 className="mt-5 text-2xl font-semibold">Nothing fabricated.</h3>
            <p className="mt-4 leading-relaxed">
              Verified testimonials and review excerpts are published only after approval. No fabricated ratings, counts
              or customer claims.
            </p>
          </div>
        </div>
      </section>

      <PageCta
        source="dos-reputation"
        title="Make good work visible to the next customer."
        copy="Tell DOS how reviews are requested today. We will shape the simplest useful reputation system around your customer journey."
      />
    </main>
  );
}
