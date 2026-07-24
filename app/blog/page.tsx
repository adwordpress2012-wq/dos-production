import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Globe, MessageSquare, PhoneCall, Sparkles } from "lucide-react";

export const metadata: Metadata = {
  alternates: { canonical: "/blog" },
  title: "DOS Insights",
  description:
    "Practical ideas for small businesses wanting better websites, faster customer replies, booking automation, and modern customer communication systems.",
};

const ARTICLES = [
  {
    slug: "why-small-businesses-miss-bookings",
    title: "Why Small Businesses Miss Bookings — And How To Fix It",
    excerpt:
      "Many small businesses lose enquiries because customers call after hours, messages get missed, or websites do not guide people to take action. DOS helps solve this with Smart Chat Widgets, booking automation, SMS, WhatsApp, and done-for-you setup.",
    category: "Customer Enquiries",
    icon: PhoneCall,
    tone: "violet",
  },
  {
    slug: "your-website-should-do-more-than-look-good",
    title: "Your Website Should Do More Than Look Good",
    excerpt:
      "A modern business website should build trust, load fast, capture enquiries, and make it easy for customers to book or contact you. DOS rebuilds websites around real business outcomes, not just design.",
    category: "Website Rebuilds",
    icon: Globe,
    tone: "cyan",
  },
  {
    slug: "smart-chat-widgets-vs-basic-contact-forms",
    title: "Smart Chat Widgets vs Basic Contact Forms",
    excerpt:
      "Basic contact forms rely on customers waiting for a reply. Smart Chat Widgets help guide customers instantly, capture details, answer common questions, and improve enquiry flow across website chat, SMS, and WhatsApp.",
    category: "Smart Chat Widgets",
    icon: MessageSquare,
    tone: "rose",
  },
] as const;

const TONE_STYLES = {
  violet: {
    glow: "from-violet-500/35 via-violet-500/0 to-violet-500/0",
    icon: "from-violet-600 via-fuchsia-500 to-pink-500",
    text: "text-violet-200",
    border: "group-hover:border-violet-300/50",
    category: "text-violet-200/90 border-violet-400/25 bg-violet-500/10",
  },
  cyan: {
    glow: "from-cyan-400/30 via-cyan-400/0 to-cyan-400/0",
    icon: "from-violet-600 via-fuchsia-500 to-cyan-400",
    text: "text-cyan-200",
    border: "group-hover:border-cyan-300/50",
    category: "text-cyan-200/90 border-cyan-400/25 bg-cyan-500/10",
  },
  rose: {
    glow: "from-fuchsia-500/30 via-pink-500/15 to-violet-500/0",
    icon: "from-[#7C3AED] via-[#A855F7] to-[#EC4899]",
    text: "text-pink-200",
    border: "group-hover:border-pink-300/45",
    category: "text-pink-200/90 border-pink-400/25 bg-fuchsia-500/10",
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
          className="absolute right-[-12rem] top-56 h-72 w-72 rounded-full bg-fuchsia-500/12 blur-[110px]"
        />

        <div className="relative mx-auto max-w-7xl px-6">
          <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-violet-200 backdrop-blur">
              <Sparkles className="h-3.5 w-3.5 text-violet-300" />
              DOS Insights
            </span>

            <h1 className="mt-7 text-4xl font-semibold leading-[1.02] tracking-tight text-white sm:text-6xl lg:text-[76px]">
              DOS <span className="text-gradient-purple">Insights</span>
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-relaxed text-ink-muted sm:text-lg lg:text-xl">
              Practical ideas for small businesses wanting better websites, faster customer replies, booking
              automation, and modern customer communication systems.
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
                Clear thinking for busy small-business owners.
              </h2>
            </div>
            <p className="max-w-md text-sm leading-relaxed text-ink-muted">
              No fluff — practical angles on customer enquiries, websites, booking automation, and Smart Business
              Assistants.
            </p>
          </div>

          <div className="mt-12 grid gap-5 lg:grid-cols-3">
            {ARTICLES.map((article) => (
              <ArticleCard key={article.slug} article={article} />
            ))}
          </div>

          <div className="relative mt-16 overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] px-6 py-12 text-center backdrop-blur sm:px-12 sm:py-14">
            <div
              aria-hidden
              className="pointer-events-none absolute -top-24 left-1/2 h-64 w-[min(100%,520px)] -translate-x-1/2 rounded-full bg-gradient-to-br from-violet-600/25 via-fuchsia-500/15 to-pink-500/20 blur-[100px]"
            />
            <div className="relative mx-auto max-w-2xl">
              <h2 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                Ready to modernise your customer enquiries?
              </h2>
              <p className="mt-4 text-base leading-relaxed text-ink-muted sm:text-lg">
                Book a free DOS demo and see how your business could capture more bookings, respond faster, and reduce
                missed opportunities.
              </p>
              <Link
                href="/book-demo"
                className="btn-book-demo mt-8 inline-flex items-center justify-center gap-2 rounded-full px-8 py-3.5 text-sm font-semibold"
              >
                Book Strategy Call
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

function ArticleCard({ article }: { article: (typeof ARTICLES)[number] }) {
  const tone = TONE_STYLES[article.tone];
  const Icon = article.icon;
  const href = `/blog/${article.slug}`;

  return (
    <article className="group relative h-full">
      <div
        aria-hidden
        className={`absolute -inset-px rounded-3xl bg-gradient-to-br ${tone.glow} opacity-70 blur-md transition duration-500 group-hover:opacity-100`}
      />
      <Link
        href={href}
        className={`relative flex h-full flex-col overflow-hidden rounded-3xl border border-white/10 bg-white/[0.035] p-7 text-left backdrop-blur transition duration-300 outline-none focus-visible:ring-2 focus-visible:ring-violet-500/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#04060c] ${tone.border} group-hover:bg-white/[0.055]`}
      >
        <div
          aria-hidden
          className="absolute -right-16 -top-16 h-44 w-44 rounded-full bg-white/10 blur-3xl transition group-hover:bg-white/15"
        />
        <div className="relative">
          <span
            className={`inline-flex w-fit rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-wider ${tone.category}`}
          >
            {article.category}
          </span>

          <span
            className={`mt-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br ${tone.icon} text-white shadow-[0_0_30px_-8px_rgba(236,72,153,0.45)]`}
          >
            <Icon className="h-5 w-5" />
          </span>

          <h3 className="mt-5 text-xl font-semibold leading-tight tracking-tight text-white">{article.title}</h3>
          <p className="mt-4 text-sm leading-relaxed text-ink-muted">{article.excerpt}</p>
        </div>

        <span
          className={`relative mt-8 inline-flex w-fit items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2 text-sm font-semibold ${tone.text} transition group-hover:border-white/20 group-hover:bg-white/[0.07]`}
        >
          Read More
          <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" aria-hidden />
        </span>
      </Link>
    </article>
  );
}
