import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BookOpenText } from "lucide-react";
import PublicPageHero from "@/app/components/PublicPageHero";
import PageCta from "@/app/components/PageCta";
import { createPageMetadata } from "@/app/lib/seo";
import { INSIGHTS } from "@/app/lib/site-data";

export const metadata: Metadata = createPageMetadata({
  title: "DOS Insights",
  description:
    "Practical Directive OS insights on simplifying operations, automation, customer communication, websites, reputation and business growth.",
  path: "/insights",
});

const CATEGORIES = [
  "Simplify",
  "Automate",
  "Scale",
  "Business Systems",
  "Customer Communication",
  "Website Strategy",
  "Reputation",
  "Industry Guides",
  "Business Spotlight",
  "DOS Updates",
];

export default function InsightsPage() {
  return (
    <main>
      <PublicPageHero
        eyebrow="DOS Insights"
        title="Clear thinking for growing businesses."
        description="Practical guidance on customer communication, websites, workflow automation and the business systems that buy back time."
        secondaryHref="/blog"
        secondaryLabel="View existing articles"
      />

      <section className="site-section pt-6">
        <div className="site-container">
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((category) => (
              <span key={category} className="rounded-full border border-white/[0.09] bg-white/[0.035] px-4 py-2 text-xs font-medium text-ink-muted">
                {category}
              </span>
            ))}
          </div>

          <div className="mt-12 grid gap-5 lg:grid-cols-3">
            {INSIGHTS.map((article) => (
              <article key={article.slug} className="surface-card rounded-[1.75rem] p-7">
                <BookOpenText className="h-5 w-5 text-violet-300" aria-hidden />
                <p className="eyebrow mt-6">{article.category}</p>
                <h2 className="mt-4 text-2xl font-semibold tracking-tight text-white">{article.title}</h2>
                <p className="mt-4 text-sm leading-relaxed text-ink-muted">{article.excerpt}</p>
                <Link href={`/blog/${article.slug}`} className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-violet-200 hover:text-white">
                  Read article <ArrowRight className="h-4 w-4" aria-hidden />
                </Link>
              </article>
            ))}
          </div>

          <Link href="/blog" className="mt-9 inline-flex items-center gap-2 text-sm font-semibold text-violet-200 hover:text-white">
            Browse the existing DOS article library <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </div>
      </section>

      <PageCta source="insights-page" />
    </main>
  );
}
