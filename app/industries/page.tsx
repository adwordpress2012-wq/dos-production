import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BriefcaseBusiness } from "lucide-react";
import PublicPageHero from "@/app/components/PublicPageHero";
import PageCta from "@/app/components/PageCta";
import TrackedLink from "@/app/components/TrackedLink";
import { createPageMetadata } from "@/app/lib/seo";
import { INDUSTRIES } from "@/app/lib/site-data";

export const metadata: Metadata = createPageMetadata({
  title: "Business Systems by Industry",
  description:
    "Explore practical Directive OS systems for recruitment, restaurants, transport, trades, professional services and growing Australian businesses.",
  path: "/industries",
});

export default function IndustriesPage() {
  return (
    <main>
      <PublicPageHero
        eyebrow="Industry pathways"
        title="Practical systems shaped around the way your business works."
        description="Different industries lose time and opportunities in different places. DOS starts with the real bottleneck, then builds the simplest useful system around it."
      />

      <section className="site-section pt-6">
        <div className="site-container grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {INDUSTRIES.map((industry) => (
            <TrackedLink
              key={industry.slug}
              href={`/industries/${industry.slug}`}
              eventName="industry_click"
              eventSource="industries-index"
              eventLabel={industry.name}
              className="surface-card group rounded-[1.5rem] p-7"
            >
              <BriefcaseBusiness className="h-5 w-5 text-violet-300" aria-hidden />
              <h2 className="mt-5 text-xl font-semibold text-white">{industry.name}</h2>
              <p className="mt-3 text-sm leading-relaxed text-ink-muted">{industry.pain}</p>
              <p className="mt-4 text-sm leading-relaxed text-white">{industry.solution}</p>
              <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-violet-200">
                Learn More <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" aria-hidden />
              </span>
            </TrackedLink>
          ))}
        </div>
        <div className="site-container mt-10">
          <p className="text-sm text-ink-muted">
            Don&apos;t see an exact match? <Link href="/start-here" className="font-semibold text-violet-200 hover:text-white">Tell us how your business works.</Link>
          </p>
        </div>
      </section>

      <PageCta source="industries-index" />
    </main>
  );
}
