import type { Metadata } from "next";
import { Check, Compass, HeartHandshake, Layers3 } from "lucide-react";
import PublicPageHero from "@/app/components/PublicPageHero";
import PageCta from "@/app/components/PageCta";
import { createPageMetadata } from "@/app/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "About Directive OS",
  description:
    "Directive OS is an Australian business systems company helping growing businesses simplify communication, automate repetitive work and scale.",
  path: "/about",
});

const PRINCIPLES = [
  "One real client problem",
  "One clear workflow",
  "One useful solution",
  "Reusable where practical",
  "Revenue, savings or strategic value",
  "No unnecessary complexity",
];

export default function AboutPage() {
  return (
    <main>
      <PublicPageHero
        eyebrow="About Directive OS"
        title="Practical business systems. Built around how the business really works."
        description="Directive OS is the parent company behind Micah and the wider DOS Ecosystem. We help growing businesses improve communication, organise workflows and remove repetitive operational drag."
      />

      <section className="site-section pt-6">
        <div className="site-container grid gap-5 lg:grid-cols-3">
          {[
            { title: "Business first", copy: "Understand the customer journey and commercial bottleneck before choosing technology.", icon: Compass },
            { title: "Practical implementation", copy: "Build the useful workflow, configure it properly and support the people using it.", icon: Layers3 },
            { title: "Long-term value", copy: "Create systems that save time, improve follow-up and grow with the business.", icon: HeartHandshake },
          ].map(({ title, copy, icon: Icon }) => (
            <article key={title} className="surface-card rounded-[1.75rem] p-8">
              <Icon className="h-6 w-6 text-violet-300" aria-hidden />
              <h2 className="mt-6 text-2xl font-semibold text-white">{title}</h2>
              <p className="mt-4 leading-relaxed text-ink-muted">{copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="pearl-section site-section">
        <div className="site-container grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <p className="eyebrow !text-violet-700">The DOS operating standard</p>
            <h2 className="section-heading mt-5">Simplify. Automate. Scale.</h2>
            <p className="section-copy mt-6">
              Start with the bottleneck. Remove unnecessary steps. Automate the work that repeats. Build the structure needed for more customers, people and locations.
            </p>
          </div>
          <div className="grid gap-3">
            {PRINCIPLES.map((principle) => (
              <div key={principle} className="flex items-center gap-3 rounded-2xl border border-violet-950/10 bg-white/65 px-5 py-4">
                <Check className="h-4 w-4 shrink-0 text-violet-700" aria-hidden />
                <p className="font-medium">{principle}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <PageCta source="about-page" />
    </main>
  );
}
