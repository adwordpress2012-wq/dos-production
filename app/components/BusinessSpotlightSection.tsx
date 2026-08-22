import Image from "next/image";
import { ArrowRight, Check, ExternalLink } from "lucide-react";
import TrackedLink from "@/app/components/TrackedLink";
import { DISCOVERY_CALL_HREF } from "@/app/lib/booking";

type BusinessSpotlight = {
  companyName: string;
  identityLines: string[];
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
    identityLines: ["Scaffolding", "Australia"],
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
                <div className="business-spotlight-brand relative flex min-h-[30rem] flex-col overflow-hidden border-b border-white/[0.08] bg-[radial-gradient(circle_at_18%_15%,rgba(45,212,191,0.15),transparent_34%),linear-gradient(155deg,#17192e_0%,#0b0d1c_72%)] p-7 sm:min-h-[34rem] sm:p-10 lg:min-h-full lg:border-r lg:border-b-0 lg:p-12">
                  <div aria-hidden className="absolute -right-20 -bottom-24 h-72 w-72 rounded-full border border-violet-400/[0.12]" />
                  <div className="relative">
                    <span className="w-fit rounded-full border border-teal-300/25 bg-teal-300/[0.08] px-3 py-1.5 text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-teal-200">
                      Featured Business
                    </span>

                    <p className="mt-10 text-[3.2rem] leading-[0.88] font-semibold tracking-[-0.055em] text-white sm:text-[4.5rem] lg:text-[4.75rem] xl:text-[5rem]" aria-label={spotlight.companyName}>
                      {spotlight.identityLines.map((line, index) => (
                        <span key={line} className={index === 0 ? "block" : "mt-2 block text-teal-300"}>
                          {line}
                        </span>
                      ))}
                    </p>

                    <p className="mt-8 text-sm font-semibold uppercase tracking-[0.16em] text-ink-muted">
                      {spotlight.industry}
                    </p>
                  </div>

                  <div className="relative mt-auto pt-10">
                    <div className="w-fit rounded-2xl border border-white/[0.1] bg-white px-5 py-4 shadow-[0_22px_55px_-34px_rgba(0,0,0,0.75)]">
                      <Image
                        src={spotlight.logo.src}
                        alt={spotlight.logo.alt}
                        width={spotlight.logo.width}
                        height={spotlight.logo.height}
                        sizes="(min-width: 640px) 216px, 200px"
                        className="h-auto w-[12.5rem] max-w-full object-contain sm:w-[13.5rem]"
                      />
                    </div>
                  </div>
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
