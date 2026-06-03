import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Construction } from "lucide-react";

const SECTION_COPY: Record<string, { title: string; description: string }> = {
  "project-status": {
    title: "Project Status",
    description:
      "Track delivery milestones across DOS engagements. This section will consolidate website builds, Micah rollouts, and integration checkpoints.",
  },
  "invoices-payments": {
    title: "Invoices / Payments",
    description:
      "Stripe billing and invoice history will surface here. Until connected, use your Stripe Dashboard for subscription and payment detail.",
  },
  "hosting-renewals": {
    title: "Annual Hosting Renewals",
    description:
      "Renewal dates and DNS/hosting billing tied to DOS-managed sites. Wire-up will pull from your subscription and hosting records in Supabase.",
  },
  testimonials: {
    title: "Testimonials",
    description: "Approved client quotes and case-study snippets for proposals and the marketing site.",
  },
  backlinks: {
    title: "Backlinks",
    description: "SEO backlink tracking and outreach notes — placeholder for a future CRM module.",
  },
  "google-reviews": {
    title: "Google Reviews",
    description: "Aggregate and respond to Google Business reviews from one place — integration roadmap item.",
  },
  "notes-tasks": {
    title: "Notes & Tasks",
    description: "Internal todos and account notes shared across the DOS team — coming as a shared workspace.",
  },
  "micah-profiles": {
    title: "Micah Profiles",
    description:
      "Per-tenant Micah voice profiles, scripts, and escalation rules — link operational data from onboarding and COS.",
  },
  "twilio-numbers": {
    title: "Twilio Numbers",
    description:
      "Provisioned SMS/voice numbers per client. See also the public Number Policy; provisioning UI will live here.",
  },
};

type Props = { params: Promise<{ section: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { section } = await params;
  const meta = SECTION_COPY[section];
  if (!meta) return { title: "Not found" };
  return {
    title: `${meta.title} · DOS HUB`,
    description: meta.description,
  };
}

export const dynamic = "force-dynamic";

export default async function CommandCentreSectionPage({ params }: Props) {
  const { section } = await params;
  const meta = SECTION_COPY[section];
  if (!meta) notFound();

  return (
    <main className="relative px-4 sm:px-6 py-8 sm:py-10 pb-20">
      <section className="mx-auto max-w-3xl space-y-8">
        <div className="glass-strong rounded-2xl border border-white/10 p-6 sm:p-8 space-y-4">
          <span className="inline-flex items-center gap-2 rounded-full border border-amber-400/25 bg-amber-500/10 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.2em] text-amber-100">
            <Construction className="h-3.5 w-3.5 text-amber-300" />
            DOS HUB
          </span>
          <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight">{meta.title}</h1>
          <p className="text-ink-muted leading-relaxed">{meta.description}</p>
          <p className="text-sm text-ink-dim">
            This route uses the same sidebar and shell as the main dashboard. Data integrations can be added without
            changing navigation.
          </p>
          <Link
            href="/command-centre"
            className="inline-flex items-center gap-2 text-sm font-semibold text-violet-300 hover:text-violet-200 mt-2"
          >
            Back to overview
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </main>
  );
}
