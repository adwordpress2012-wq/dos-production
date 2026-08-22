import Image from "next/image";
import { ArrowRight, Check, ExternalLink } from "lucide-react";
import TrackedLink from "@/app/components/TrackedLink";
import { DISCOVERY_CALL_HREF } from "@/app/lib/booking";

type BusinessSpotlight = {
  companyName: string;
  industry: string;
  logo: {
    src: string;
    alt: string;
    width: number;
    height: number;
  };
  website: string;
  challenge: string;
  implementation: string;
  systemsImplemented: string[];
  outcome: string;
  primaryCta: string;
  secondaryCta: {
    label: string;
    href: string;
  };
};

const BUSINESS_SPOTLIGHTS: BusinessSpotlight[] = [
  {
    companyName: "Scaffolding Australia",
    industry: "Construction / Scaffolding",
    logo: {
      src: "/clients/scaffolding-australia-logo.jpg",
      alt: "Scaffolding Australia Pty Ltd",
      width: 267,
      height: 113,
    },
    website: "https://scaffoldingaustralia.com.au",
    challenge:
      "Scaffolding Australia partnered with Directive OS to modernise its digital customer experience and improve how new enquiries are captured, organised and handed over to the team.",
    implementation:
      "Directive OS implemented a connected customer communication and revenue system designed around the way Scaffolding Australia actually operates.",
    systemsImplemented: [
      "Smart Revenue Website",
      "Micah Smart Chat",
      "Micah Voice / Phone Enquiry Handling",
      "Website Lead Capture",
      "CRM Contact Management",
      "Opportunity Pipeline",
      "Automated Customer Acknowledgement",
      "Human Handover",
      "Managed Directive OS Technology Layer",
    ],
    outcome:
      "A connected enquiry system that helps Scaffolding Australia capture opportunities, reduce repetitive administration and maintain human control where it matters.",
    primaryCta: "View Scaffolding Australia",
    secondaryCta: {
      label: "Build a System Like This",
      href: DISCOVERY_CALL_HREF,
    },
  },
];

export default function BusinessSpotlightSection() {
  return (
    <section id="business-spotlight" className="site-section scroll-mt-28" aria-labelledby="business-spotlight-heading">
      <div className="site-container">
        <div className="max-w-3xl">
          <p className="eyebrow">Business Spotlight</p>
          <h2 id="business-spotlight-heading" className="section-heading mt-5">
            Real businesses. Practical systems. Better customer experiences.
          </h2>
        </div>

        <div className="mt-12 grid gap-8">
          {BUSINESS_SPOTLIGHTS.map((spotlight) => (
            <article
              key={spotlight.companyName}
              className="business-spotlight-card overflow-hidden rounded-[2rem] border border-white/[0.09] bg-gradient-to-br from-[#17192e] via-[#111329] to-[#0b0d1c]"
            >
              <div className="grid lg:grid-cols-[0.78fr_1.22fr]">
                <div className="business-spotlight-brand flex min-h-[20rem] flex-col justify-between gap-8 bg-[#f7f8f7] p-7 sm:min-h-[26rem] sm:p-10 lg:p-12">
                  <span className="w-fit rounded-full border border-[#2cae7c]/25 bg-[#2cae7c]/[0.08] px-3 py-1.5 text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-[#176b4e]">
                    Featured Business
                  </span>
                  <div className="flex flex-1 items-center justify-center rounded-[1.5rem] border border-slate-900/[0.06] bg-white px-7 py-12 shadow-[0_24px_70px_-48px_rgba(15,23,42,0.5)] sm:px-10">
                    <Image
                      src={spotlight.logo.src}
                      alt={spotlight.logo.alt}
                      width={spotlight.logo.width}
                      height={spotlight.logo.height}
                      sizes="(min-width: 1024px) 28vw, (min-width: 640px) 55vw, 72vw"
                      className="h-auto w-full max-w-[19rem] object-contain"
                    />
                  </div>
                  <p className="text-sm font-medium text-slate-600">
                    <span className="font-semibold text-slate-900">Industry:</span> {spotlight.industry}
                  </p>
                </div>

                <div className="p-7 sm:p-10 lg:p-12">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-teal-300">Verified implementation</p>
                  <h3 className="mt-5 text-3xl font-semibold tracking-tight text-white sm:text-5xl">
                    {spotlight.companyName} <span className="text-violet-300">×</span> Directive OS
                  </h3>
                  <p className="mt-6 text-base leading-relaxed text-ink-muted sm:text-lg">
                    {spotlight.challenge}
                  </p>
                  <p className="mt-4 text-base leading-relaxed text-ink-muted">{spotlight.implementation}</p>

                  <div className="mt-9 border-t border-white/[0.08] pt-8">
                    <h4 className="text-sm font-semibold uppercase tracking-[0.16em] text-white">Systems Implemented</h4>
                    <ul className="mt-5 grid gap-x-6 gap-y-3 sm:grid-cols-2">
                      {spotlight.systemsImplemented.map((system) => (
                        <li key={system} className="flex gap-3 text-sm leading-relaxed text-ink-muted">
                          <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-teal-400/10 text-teal-300">
                            <Check className="h-3.5 w-3.5" aria-hidden />
                          </span>
                          {system}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <blockquote className="mt-9 rounded-2xl border border-violet-400/[0.16] bg-violet-400/[0.06] p-5 text-base leading-relaxed text-white sm:p-6">
                    {spotlight.outcome}
                  </blockquote>

                  <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                    <TrackedLink
                      href={spotlight.website}
                      external
                      eventName="spotlight_click"
                      eventSource="homepage-business-spotlight"
                      eventLabel={spotlight.primaryCta}
                      className="btn-primary rounded-2xl px-6 py-4 text-center text-sm font-semibold"
                    >
                      {spotlight.primaryCta} <ExternalLink className="h-4 w-4" aria-hidden />
                    </TrackedLink>
                    <TrackedLink
                      href={spotlight.secondaryCta.href}
                      external
                      eventName="calendar_open"
                      eventSource="homepage-business-spotlight"
                      eventLabel={spotlight.secondaryCta.label}
                      className="btn-ghost inline-flex items-center justify-center rounded-2xl px-6 py-4 text-center text-sm font-semibold text-white"
                    >
                      {spotlight.secondaryCta.label} <ArrowRight className="h-4 w-4" aria-hidden />
                    </TrackedLink>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
