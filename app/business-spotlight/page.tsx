import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check, ExternalLink } from "lucide-react";
import PublicPageHero from "@/app/components/PublicPageHero";
import PageCta from "@/app/components/PageCta";
import TrackedLink from "@/app/components/TrackedLink";
import { createPageMetadata } from "@/app/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Business Spotlight",
  description:
    "See real Directive OS client work, practical business systems and approved implementation details, beginning with Capital Recruitment.",
  path: "/business-spotlight",
});

const DELIVERED = [
  "Modern responsive website",
  "Clear employer journey",
  "Clear candidate journey",
  "Industry page structure",
  "Conversion-focused enquiry pathways",
  "Hosting and ongoing care",
];

export default function BusinessSpotlightPage() {
  return (
    <main>
      <PublicPageHero
        eyebrow="Business Spotlight"
        title="Real businesses. Practical systems. Approved client work."
        description="Business Spotlight shows how DOS turns a real operational need into a clear, useful system without unsupported claims or invented performance statistics."
      />

      <section className="site-section pt-6">
        <div className="site-container overflow-hidden rounded-[2.25rem] border border-white/[0.09] bg-[#101225]">
          <div className="grid lg:grid-cols-[0.9fr_1.1fr]">
            <div className="flex min-h-[25rem] items-center justify-center bg-[#f7f4ff] p-10">
              <Image
                src="/clients/capital-recruitment-logo.png"
                alt="Capital Recruitment"
                width={430}
                height={132}
                sizes="(min-width: 1024px) 36vw, 78vw"
                className="h-auto w-full max-w-md object-contain"
                priority
              />
            </div>
            <div className="p-8 sm:p-12">
              <p className="eyebrow">Featured Spotlight</p>
              <h1 className="mt-5 text-4xl font-semibold tracking-tight text-white sm:text-5xl">Capital Recruitment</h1>
              <p className="mt-5 text-lg leading-relaxed text-ink-muted">
                A modern recruitment website designed around clear employer, candidate, and industry journeys.
              </p>
              <ul className="mt-8 grid gap-4 sm:grid-cols-2">
                {DELIVERED.map((item) => (
                  <li key={item} className="flex gap-3 text-sm leading-relaxed text-ink-muted">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-teal-300" aria-hidden />
                    {item}
                  </li>
                ))}
              </ul>
              <div className="mt-9 flex flex-wrap gap-3">
                <TrackedLink
                  href="https://capitalrecruitment.com.au"
                  external
                  eventName="spotlight_click"
                  eventSource="business-spotlight"
                  eventLabel="View Capital Recruitment"
                  className="btn-primary rounded-2xl px-6 py-4 text-sm font-semibold"
                >
                  View Capital Recruitment <ExternalLink className="h-4 w-4" aria-hidden />
                </TrackedLink>
                <Link href="/case-studies/capital-recruitment" className="btn-ghost inline-flex items-center justify-center gap-2 rounded-2xl px-6 py-4 text-sm font-semibold text-white">
                  Read the case study <ArrowRight className="h-4 w-4" aria-hidden />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="pearl-section site-section">
        <div className="site-container">
          <p className="eyebrow !text-violet-700">Spotlight standard</p>
          <h2 className="section-heading mt-5">Proof stays factual.</h2>
          <p className="section-copy mt-6">
            DOS publishes client names, logos, delivered elements, testimonials and results only when they are real, approved and appropriately supported.
          </p>
        </div>
      </section>

      <PageCta source="business-spotlight" title="What could a clearer system change in your business?" />
    </main>
  );
}
