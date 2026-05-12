import type { Metadata } from "next";
import { ArrowRight, Globe, MessageSquare, PhoneCall, Sparkles } from "lucide-react";

export const metadata: Metadata = {
  title: "DOS Insights",
  description:
    "Business growth, AI receptionists, website rebuilds, customer automation, and modern systems for small businesses.",
};

const ARTICLES = [
  {
    title: "Why Small Businesses Miss Customer Enquiries",
    excerpt:
      "Many businesses lose customers from missed calls, slow replies, outdated websites, and lack of automated follow-up systems.",
    icon: PhoneCall,
    tone: "violet",
  },
  {
    title: "How AI Receptionists Help Restaurants Capture More Bookings",
    excerpt:
      "AI receptionists can help restaurants respond faster, reduce missed bookings, and improve customer experience across website chat, SMS, and WhatsApp.",
    icon: MessageSquare,
    tone: "fuchsia",
  },
  {
    title: "Signs Your Business Website Needs a Rebuild",
    excerpt:
      "Slow websites, outdated designs, poor mobile experience, and missing booking systems can reduce customer trust and enquiries.",
    icon: Globe,
    tone: "cyan",
  },
] as const;

const TONE_STYLES = {
  violet: {
    glow: "from-violet-500/35 via-violet-500/0 to-violet-500/0",
    icon: "from-violet-500 to-fuchsia-500",
    text: "text-violet-200",
    border: "group-hover:border-violet-300/50",
  },
  fuchsia: {
    glow: "from-fuchsia-500/35 via-fuchsia-500/0 to-fuchsia-500/0",
    icon: "from-fuchsia-500 to-violet-500",
    text: "text-fuchsia-200",
    border: "group-hover:border-fuchsia-300/50",
  },
  cyan: {
    glow: "from-cyan-400/30 via-cyan-400/0 to-cyan-400/0",
    icon: "from-cyan-400 to-violet-500",
    text: "text-cyan-200",
    border: "group-hover:border-cyan-300/50",
  },
} as const;

export default function BlogPage() {
  return (
    <main className="relative overflow-hidden">
      <section className="relative pt-32 pb-20 sm:pt-40 sm:pb-28">
        <div aria-hidden className="absolute inset-0 bg-grid opacity-40" />
        <div
          aria-hidden
          className="absolute -top-24 left-1/2 h-80 w-[760px] -translate-x-1/2 rounded-full bg-violet-500/25 blur-[130px]"
        />
        <div
          aria-hidden
          className="absolute right-[-12rem] top-56 h-72 w-72 rounded-full bg-cyan-400/15 blur-[110px]"
        />

        <div className="relative mx-auto max-w-7xl px-6">
          <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-violet-200 backdrop-blur">
              <Sparkles className="h-3.5 w-3.5 text-violet-300" />
              DOS Blog
            </span>

            <h1 className="mt-7 text-4xl font-semibold leading-[1.02] tracking-tight text-white sm:text-6xl lg:text-[76px]">
              DOS <span className="text-gradient-purple">Insights</span>
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-relaxed text-ink-muted sm:text-lg lg:text-xl">
              Business growth, AI receptionists, website rebuilds, customer automation, and modern
              systems for small businesses.
            </p>
          </div>
        </div>
      </section>

      <section className="relative pb-24 sm:pb-32">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <span className="text-xs font-mono uppercase tracking-[0.25em] text-violet-300/80">
                Featured articles
              </span>
              <h2 className="mt-4 text-3xl font-semibold leading-tight tracking-tight text-white sm:text-4xl">
                Practical systems thinking for modern small businesses.
              </h2>
            </div>
            <p className="max-w-md text-sm leading-relaxed text-ink-muted">
              Short, useful reads on the operational gaps DOS helps remove.
            </p>
          </div>

          <div className="mt-12 grid gap-5 lg:grid-cols-3">
            {ARTICLES.map((article) => (
              <ArticleCard key={article.title} article={article} />
            ))}
          </div>

          <div className="mt-12 rounded-3xl border border-white/10 bg-white/[0.03] px-6 py-8 text-center backdrop-blur sm:px-10">
            <p className="text-sm font-medium uppercase tracking-[0.22em] text-ink-dim">
              More articles coming soon.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}

function ArticleCard({ article }: { article: (typeof ARTICLES)[number] }) {
  const tone = TONE_STYLES[article.tone];
  const Icon = article.icon;

  return (
    <article className="group relative h-full">
      <div
        aria-hidden
        className={`absolute -inset-px rounded-3xl bg-gradient-to-br ${tone.glow} opacity-70 blur-md transition duration-500 group-hover:opacity-100`}
      />
      <div
        className={`relative flex h-full flex-col overflow-hidden rounded-3xl border border-white/10 bg-white/[0.035] p-7 backdrop-blur transition duration-300 ${tone.border} group-hover:bg-white/[0.055]`}
      >
        <div
          aria-hidden
          className="absolute -right-16 -top-16 h-44 w-44 rounded-full bg-white/10 blur-3xl transition group-hover:bg-white/15"
        />
        <div className="relative">
          <span
            className={`inline-flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br ${tone.icon} text-white shadow-[0_0_30px_-8px_rgba(168,85,247,0.7)]`}
          >
            <Icon className="h-5 w-5" />
          </span>

          <h3 className="mt-6 text-xl font-semibold leading-tight tracking-tight text-white">
            {article.title}
          </h3>
          <p className="mt-4 text-sm leading-relaxed text-ink-muted">{article.excerpt}</p>
        </div>

        <span
          className={`relative mt-8 inline-flex w-fit items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2 text-sm font-semibold ${tone.text} transition group-hover:border-white/20 group-hover:bg-white/[0.07]`}
        >
          Read More
          <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
        </span>
      </div>
    </article>
  );
}
