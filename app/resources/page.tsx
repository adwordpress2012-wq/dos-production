import type { Metadata } from "next";
import { CalendarCheck2, ClipboardCheck, Compass, ExternalLink, FileText, UsersRound } from "lucide-react";
import PublicPageHero from "@/app/components/PublicPageHero";
import PageCta from "@/app/components/PageCta";
import TrackedLink from "@/app/components/TrackedLink";
import { DISCOVERY_CALL_HREF } from "@/app/lib/booking";
import { createPageMetadata } from "@/app/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Business Resources",
  description:
    "Use approved Directive OS resources for Business Discovery, industry guidance, onboarding and practical business system decisions.",
  path: "/resources",
});

const RESOURCES = [
  {
    title: "Business Discovery",
    copy: "Choose a time to discuss the most important operational bottleneck with DOS.",
    href: DISCOVERY_CALL_HREF,
    external: true,
    icon: CalendarCheck2,
  },
  {
    title: "Start Here",
    copy: "Share what is slowing the business down using the current working fallback form.",
    href: "/start-here",
    icon: ClipboardCheck,
  },
  {
    title: "Industry Guides",
    copy: "Explore practical system pathways for the way different industries operate.",
    href: "/industries",
    icon: UsersRound,
  },
  {
    title: "DOS Insights",
    copy: "Read practical guidance on communication, websites, automation and growth.",
    href: "/insights",
    icon: FileText,
  },
  {
    title: "Website Rebuild Onboarding",
    copy: "Use the existing public onboarding pathway for approved website projects.",
    href: "/onboarding/website-rebuild",
    icon: Compass,
  },
  {
    title: "DOS Hub",
    copy: "Access the public DOS Hub entry point.",
    href: "https://doshub.com.au",
    external: true,
    icon: ExternalLink,
  },
];

export default function ResourcesPage() {
  return (
    <main>
      <PublicPageHero
        eyebrow="DOS Resources"
        title="Practical tools for better business decisions."
        description="Only working, approved public pathways are included here. Incomplete tools and private operational systems stay hidden."
      />

      <section className="site-section pt-6">
        <div className="site-container grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {RESOURCES.map(({ title, copy, href, external, icon: Icon }) => (
            <TrackedLink
              key={title}
              href={href}
              external={external}
              eventName="resource_click"
              eventSource="resources-page"
              eventLabel={title}
              className="surface-card rounded-[1.75rem] p-7"
            >
              <Icon className="h-6 w-6 text-violet-300" aria-hidden />
              <h2 className="mt-6 text-2xl font-semibold text-white">{title}</h2>
              <p className="mt-4 text-sm leading-relaxed text-ink-muted">{copy}</p>
            </TrackedLink>
          ))}
        </div>
      </section>

      <PageCta source="resources-page" />
    </main>
  );
}
