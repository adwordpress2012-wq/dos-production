import Link from "next/link";
import Script from "next/script";
import type { ReactNode } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { SITE_URL } from "@/app/lib/seo";

export type BlogArticleCta =
  | { kind: "book-demo"; label: string }
  | { kind: "mailto"; label: string; href: string; buttonStyle?: "neon" | "ghost" }
  | { kind: "page"; label: string; href: string; buttonStyle?: "neon" | "ghost" }
  | { kind: "external"; label: string; href: string; buttonStyle?: "neon" | "ghost" };

type Props = {
  title: string;
  category?: string;
  intro?: string;
  slug?: string;
  children: ReactNode;
  cta: BlogArticleCta;
};

function ctaButtonClass(style: "neon" | "ghost" | undefined) {
  if (style === "ghost") {
    return "btn-ghost inline-flex items-center justify-center gap-2 rounded-xl border border-white/12 px-6 py-3 text-sm font-semibold text-white";
  }
  return "btn-neon inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold text-white";
}

export default function BlogArticleLayout({ title, category, intro, slug, children, cta }: Props) {
  const articleSchema = slug
    ? {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: title,
        description: intro,
        mainEntityOfPage: `${SITE_URL}/blog/${slug}`,
        publisher: { "@id": `${SITE_URL}/#organisation` },
      }
    : null;

  return (
    <main className="relative overflow-hidden pt-28 pb-24 sm:pt-36 sm:pb-32">
      {articleSchema ? (
        <Script
          id={`article-schema-${slug}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema).replace(/</g, "\\u003c") }}
        />
      ) : null}
      <div aria-hidden className="absolute inset-0 bg-grid opacity-35" />
      <div
        aria-hidden
        className="absolute -top-24 left-1/2 h-80 w-[760px] -translate-x-1/2 rounded-full bg-violet-500/20 blur-[130px]"
      />
      <div
        aria-hidden
        className="absolute right-[-10rem] top-40 h-64 w-64 rounded-full bg-fuchsia-500/10 blur-[100px]"
      />

      <article className="relative mx-auto max-w-3xl px-6">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm font-medium text-violet-200/90 transition hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden />
          Back to DOS Insights
        </Link>

        {category ? (
          <p className="mt-8 text-xs font-mono uppercase tracking-[0.25em] text-violet-300/85">{category}</p>
        ) : null}
        <h1 className="mt-3 text-3xl font-semibold leading-tight tracking-tight text-white sm:text-4xl lg:text-[2.75rem] lg:leading-[1.12]">
          {title}
        </h1>
        {intro ? <p className="mt-5 text-base leading-relaxed text-ink-muted sm:text-lg">{intro}</p> : null}

        <div className="blog-prose mt-12 space-y-10 text-base leading-relaxed text-ink-muted sm:text-[17px] sm:leading-[1.75]">
          {children}
        </div>

        <div className="relative mt-14 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] px-6 py-8 text-center backdrop-blur sm:px-8">
          <div
            aria-hidden
            className="pointer-events-none absolute -top-16 left-1/2 h-40 w-[min(100%,400px)] -translate-x-1/2 rounded-full bg-gradient-to-br from-violet-600/20 via-fuchsia-500/12 to-pink-500/15 blur-[72px]"
          />
          <div className="relative flex flex-col items-center gap-4">
            {cta.kind === "book-demo" ? (
              <Link
                href="/book-demo"
                className="btn-book-demo inline-flex items-center justify-center gap-2 rounded-full px-8 py-3.5 text-sm font-semibold"
              >
                {cta.label}
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
            ) : null}
            {cta.kind === "mailto" ? (
              <a href={cta.href} className={`${ctaButtonClass(cta.buttonStyle)} w-full max-w-md sm:w-auto`}>
                {cta.label}
                <ArrowRight className="h-4 w-4 shrink-0" aria-hidden />
              </a>
            ) : null}
            {cta.kind === "page" ? (
              <Link href={cta.href} className={`${ctaButtonClass(cta.buttonStyle)} w-full max-w-md sm:w-auto`}>
                {cta.label}
                <ArrowRight className="h-4 w-4 shrink-0" aria-hidden />
              </Link>
            ) : null}
            {cta.kind === "external" ? (
              <a
                href={cta.href}
                target="_blank"
                rel="noreferrer"
                className={`${ctaButtonClass(cta.buttonStyle)} w-full max-w-md sm:w-auto`}
              >
                {cta.label}
                <ArrowRight className="h-4 w-4 shrink-0" aria-hidden />
              </a>
            ) : null}
          </div>
        </div>
      </article>
    </main>
  );
}

export function BlogSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section>
      <h2 className="text-xl font-semibold tracking-tight text-white sm:text-2xl">{title}</h2>
      <div className="mt-4 space-y-4">{children}</div>
    </section>
  );
}
