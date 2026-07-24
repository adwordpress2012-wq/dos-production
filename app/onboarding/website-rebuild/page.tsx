import type { Metadata } from "next";
import Link from "next/link";
import OnboardingFlow, { WEBSITE_REBUILD_PROJECT_TYPES } from "../OnboardingFlow";

export const metadata: Metadata = {
  alternates: { canonical: "/onboarding/website-rebuild" },
  title: "Step 1 Website Rebuild Setup",
  description:
    "Submit a simple Step 1 setup request for a DOS website rebuild, new website, care plan or hosting/DNS support.",
};

export default function WebsiteRebuildOnboardingPage() {
  return (
    <main className="relative pt-28 sm:pt-36 pb-16">
      <section className="mx-auto max-w-5xl px-6">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="inline-flex items-center gap-2 rounded-full border border-violet-400/25 bg-violet-500/10 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.2em] text-violet-200">
            <span className="h-1.5 w-1.5 rounded-full bg-violet-300 shadow-[0_0_10px_2px_rgba(139,92,246,0.6)]" />
            Website setup
          </span>
          <h1 className="mt-5 text-3xl sm:text-4xl font-semibold tracking-tight leading-[1.08]">
            Step 1 Website Rebuild <span className="text-gradient-purple">Setup.</span>
          </h1>
          <p className="mt-4 text-base sm:text-lg text-ink-muted leading-relaxed">
            Start with business details, project type, domain context, goals and approval. We&apos;ll
            request branding, content, socials, SEO, lead capture details and assets after deposit.
          </p>
          <p className="mt-3 text-sm text-ink-dim">
            Need the broader DOS setup page?{" "}
            <Link href="/onboarding" className="text-violet-300 hover:text-violet-200 underline underline-offset-2">
              Go to /onboarding
            </Link>
          </p>
        </div>

        <OnboardingFlow
          defaultProjectTypes={["Website Rebuild"]}
          planId="website-rebuild"
          projectTypes={WEBSITE_REBUILD_PROJECT_TYPES}
          setupTitle="Website Rebuild Setup"
        />
      </section>
    </main>
  );
}
