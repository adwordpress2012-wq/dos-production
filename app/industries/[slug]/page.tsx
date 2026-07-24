import type { Metadata } from "next";
import Script from "next/script";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Bot, Check, Route, Sparkles } from "lucide-react";
import PageCta from "@/app/components/PageCta";
import TrackedLink from "@/app/components/TrackedLink";
import { breadcrumbSchema, createPageMetadata } from "@/app/lib/seo";
import { getIndustry, INDUSTRIES } from "@/app/lib/site-data";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return INDUSTRIES.map((industry) => ({ slug: industry.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const industry = getIndustry(slug);
  if (!industry) return {};

  return createPageMetadata({
    title: `${industry.name} Business Systems`,
    description: `${industry.solution} Explore practical Directive OS communication, workflow and growth systems for ${industry.name.toLowerCase()}.`,
    path: `/industries/${industry.slug}`,
  });
}

export default async function IndustryPage({ params }: Props) {
  const { slug } = await params;
  const industry = getIndustry(slug);
  if (!industry) notFound();

  const breadcrumbs = breadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "Industries", path: "/industries" },
    { name: industry.name, path: `/industries/${industry.slug}` },
  ]);

  return (
    <main>
      <Script
        id={`breadcrumbs-${industry.slug}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs).replace(/</g, "\\u003c") }}
      />

      <section className="relative overflow-hidden pb-20 pt-36 sm:pt-44">
        <div aria-hidden className="absolute -left-28 top-12 h-[32rem] w-[32rem] rounded-full bg-violet-600/15 blur-[160px]" />
        <div className="site-container relative grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
          <div>
            <Link href="/industries" className="text-sm font-semibold text-violet-200 hover:text-white">
              Industries / {industry.shortName}
            </Link>
            <h1 className="mt-6 text-[clamp(3rem,7vw,6.5rem)] font-semibold leading-[0.96] tracking-[-0.055em] text-white">
              Better business systems for {industry.name}.
            </h1>
            <p className="section-copy mt-7">{industry.solution}</p>
          </div>
          <div className="surface-card rounded-[1.75rem] p-7">
            <p className="eyebrow">Common operational drag</p>
            <p className="mt-5 text-lg leading-relaxed text-white">{industry.pain}</p>
          </div>
        </div>
      </section>

      <section className="site-section pt-8">
        <div className="site-container grid gap-5 lg:grid-cols-2">
          <article className="surface-card rounded-[1.75rem] p-8">
            <h2 className="text-3xl font-semibold tracking-tight text-white">Common business bottlenecks</h2>
            <ul className="mt-7 grid gap-4">
              {industry.bottlenecks.map((item) => (
                <li key={item} className="flex gap-3 text-ink-muted">
                  <Route className="mt-0.5 h-5 w-5 shrink-0 text-fuchsia-300" aria-hidden />
                  {item}
                </li>
              ))}
            </ul>
          </article>
          <article className="surface-card rounded-[1.75rem] p-8">
            <h2 className="text-3xl font-semibold tracking-tight text-white">Relevant DOS capabilities</h2>
            <ul className="mt-7 grid gap-4 sm:grid-cols-2">
              {industry.capabilities.map((item) => (
                <li key={item} className="flex gap-3 text-ink-muted">
                  <Check className="mt-0.5 h-5 w-5 shrink-0 text-teal-300" aria-hidden />
                  {item}
                </li>
              ))}
            </ul>
            <Link
              href="/solutions/smart-intake-follow-up"
              className="group mt-7 block rounded-2xl border border-violet-400/15 bg-violet-500/[0.06] p-5 transition hover:border-violet-400/30"
            >
              <span className="flex items-center justify-between gap-3 font-semibold text-white">
                Smart Intake &amp; Follow-Up
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" aria-hidden />
              </span>
              <span className="mt-2 block text-sm leading-relaxed text-ink-muted">
                Capture {industry.shortName.toLowerCase()} enquiries, organise each opportunity and keep the next step moving automatically.
              </span>
            </Link>
          </article>
        </div>
      </section>

      <section className="pearl-section site-section">
        <div className="site-container grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
          <div className="rounded-[1.75rem] border border-violet-950/10 bg-white/70 p-8">
            <Bot className="h-7 w-7 text-violet-700" aria-hidden />
            <h2 className="mt-5 text-3xl font-semibold">Micah&apos;s role</h2>
            <p className="mt-4 leading-relaxed">{industry.micahRole}</p>
          </div>
          <div>
            <p className="eyebrow !text-violet-700">Simplify. Automate. Scale.</p>
            <h2 className="section-heading mt-5">Build the pathway in the right order.</h2>
            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {[
                ["Simplify", "Clarify the enquiry and remove unnecessary steps."],
                ["Automate", "Keep routine reminders and follow-up moving."],
                ["Scale", "Create a repeatable flow for more demand and more people."],
              ].map(([title, copy]) => (
                <div key={title} className="rounded-2xl border border-violet-950/10 bg-white/60 p-5">
                  <h3 className="font-semibold">{title}</h3>
                  <p className="mt-2 text-sm leading-relaxed">{copy}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {industry.slug === "recruitment" ? (
        <section className="site-section">
          <div className="site-container rounded-[1.75rem] border border-white/[0.09] bg-[#101225] p-8 sm:p-10">
            <p className="eyebrow">Relevant Business Spotlight</p>
            <h2 className="mt-5 text-3xl font-semibold tracking-tight text-white">Capital Recruitment</h2>
            <p className="mt-4 max-w-2xl leading-relaxed text-ink-muted">
              A modern recruitment website designed around clear employer, candidate and industry journeys.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <TrackedLink href="https://capitalrecruitment.com.au" external eventName="spotlight_click" eventSource="recruitment-industry" eventLabel="Capital Recruitment" className="btn-primary rounded-2xl px-6 py-3.5 text-sm font-semibold">
                View Capital Recruitment <ArrowRight className="h-4 w-4" aria-hidden />
              </TrackedLink>
              <Link href="/business-spotlight" className="btn-ghost inline-flex items-center rounded-2xl px-6 py-3.5 text-sm font-semibold text-white">
                Read Business Spotlight
              </Link>
            </div>
          </div>
        </section>
      ) : null}

      <section className="site-section pt-4">
        <div className="site-container grid gap-4 sm:grid-cols-3">
          {["One useful solution", "Practical outcomes", "Done-for-you implementation"].map((item) => (
            <div key={item} className="surface-card rounded-2xl p-6">
              <Sparkles className="h-5 w-5 text-violet-300" aria-hidden />
              <p className="mt-4 font-semibold text-white">{item}</p>
            </div>
          ))}
        </div>
      </section>

      <PageCta
        source={`industry-${industry.slug}`}
        title={`Improve the next step in your ${industry.shortName.toLowerCase()} workflow.`}
        copy="Start with the bottleneck creating the most lost time or missed opportunity. DOS will help define the simplest useful system."
      />
    </main>
  );
}
