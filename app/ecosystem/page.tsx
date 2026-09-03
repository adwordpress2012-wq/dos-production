import type { Metadata } from "next";
import { ArrowRight, Layers3, LockKeyhole } from "lucide-react";
import PublicPageHero from "@/app/components/PublicPageHero";
import PageCta from "@/app/components/PageCta";
import EcosystemArchitecture from "@/app/components/EcosystemArchitecture";
import RevenueLifecycle from "@/app/components/RevenueLifecycle";
import TrackedLink from "@/app/components/TrackedLink";
import { createPageMetadata } from "@/app/lib/seo";
import { ECOSYSTEM_GROUPS } from "@/app/lib/site-data";

export const metadata: Metadata = createPageMetadata({
  title: "The DOS Ecosystem",
  description:
    "Explore the connected Directive OS ecosystem: Micah, DOS ERA, DOS CPA, DOS ARC, DOS Reputation, ChatOS, industry operating systems and approved public business utilities.",
  path: "/ecosystem",
});

export default function EcosystemPage() {
  return (
    <main>
      <PublicPageHero
        eyebrow="The DOS Ecosystem"
        title="One connected ecosystem. Built around practical outcomes."
        description="Micah, DOS ERA, DOS CPA, DOS ARC and DOS Reputation each control a different operational workflow. Businesses use the parts that solve the real bottleneck."
      />

      <EcosystemArchitecture />

      <RevenueLifecycle />

      <section className="site-section">
        <div className="site-container">
          <p className="eyebrow">Everything in the ecosystem</p>
          <h2 className="section-heading mt-5">Products, systems and public infrastructure.</h2>
          <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {ECOSYSTEM_GROUPS.map((group) => (
              <article key={group.title} className="surface-card rounded-[1.75rem] p-8">
                <Layers3 className="h-6 w-6 text-violet-300" aria-hidden />
                <h3 className="mt-5 text-2xl font-semibold text-white">{group.title}</h3>
                <div className="mt-6 grid gap-3">
                  {group.links.map((link) => (
                    <TrackedLink
                      key={`${link.label}-${link.href}`}
                      href={link.href}
                      external={link.external}
                      eventName={link.external ? "ecosystem_outbound_click" : "resource_click"}
                      eventSource="ecosystem-page"
                      eventLabel={link.label}
                      className="group rounded-xl border border-white/[0.07] bg-white/[0.025] p-4 transition hover:border-violet-400/25"
                    >
                      <span className="flex items-center justify-between gap-3 font-semibold text-white">
                        {link.label}
                        <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" aria-hidden />
                      </span>
                      {link.description ? <span className="mt-2 block text-sm text-ink-muted">{link.description}</span> : null}
                    </TrackedLink>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="pearl-section site-section">
        <div className="site-container flex flex-col gap-6 rounded-[1.75rem] border border-violet-950/10 bg-white/65 p-8 sm:flex-row sm:items-center">
          <span className="inline-flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-violet-700 text-white">
            <LockKeyhole className="h-6 w-6" aria-hidden />
          </span>
          <div>
            <h2 className="text-2xl font-semibold">Secure DOS Access</h2>
            <p className="mt-2 leading-relaxed">
              Internal customer data, pipelines, reporting, workflows and staff operations are not public products and remain behind secured access.
            </p>
          </div>
        </div>
      </section>

      <PageCta source="ecosystem-page" />
    </main>
  );
}
