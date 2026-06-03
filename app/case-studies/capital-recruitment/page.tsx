import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Capital Recruitment — Case Study",
  description:
    "Capital Recruitment: a Modern Smart Recruitment Platform — website rebuild, job listings, resume uploads, admin workflows, and secure infrastructure by DOS.",
};

const PROOF_TAGS = [
  "Modern Smart Website",
  "Recruitment Portal",
  "Resume Uploads",
  "Admin Workflow",
  "Secure Backend",
  "DOS HUB Ready",
] as const;

export default function CapitalRecruitmentCaseStudyPage() {
  return (
    <main className="relative pt-32 sm:pt-40 pb-20">
      <div className="mx-auto max-w-3xl px-6">
        <Link
          href="/#client-stories"
          className="inline-flex items-center gap-2 text-sm font-medium text-violet-200/90 hover:text-violet-100 transition"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to client stories
        </Link>

        <div className="mt-8 inline-flex rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2.5">
          <Image
            src="/clients/capital-recruitment-logo.png"
            alt="Capital Recruitment Agency Aust"
            width={240}
            height={143}
            className="h-9 sm:h-10 w-auto max-w-[200px] object-contain object-left opacity-[0.92]"
            sizes="200px"
            priority
          />
        </div>

        <p className="mt-6 text-xs font-mono uppercase tracking-[0.25em] text-emerald-300/80">Case study</p>
        <h1 className="mt-3 text-4xl sm:text-5xl font-semibold tracking-tight leading-[1.05] text-white">
          Capital Recruitment
        </h1>
        <p className="mt-3 text-lg font-medium text-violet-200/90">Modern Smart Recruitment Platform</p>
        <p className="mt-5 text-base text-ink-muted leading-relaxed">
          A full recruitment website rebuild with live job listings, resume uploads, applicant management, admin
          workflows, and secure backend infrastructure.
        </p>

        <ul className="mt-8 flex flex-wrap gap-2" aria-label="Project highlights">
          {PROOF_TAGS.map((tag) => (
            <li key={tag}>
              <span className="inline-flex rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 text-[11px] font-medium text-ink-muted">
                {tag}
              </span>
            </li>
          ))}
        </ul>

        <figure className="relative mt-10 overflow-hidden rounded-2xl glass-strong p-6 sm:p-8 ring-glow-soft">
          <div
            aria-hidden
            className="pointer-events-none absolute -top-16 right-0 h-40 w-40 rounded-full bg-violet-500/20 blur-[80px]"
          />
          <blockquote className="relative border-l-2 border-emerald-400/35 pl-4 sm:pl-5">
            <p className="text-base sm:text-lg leading-relaxed text-white/88">
              &ldquo;Jaze and DOS completely modernised our online presence and recruitment workflow. The new platform
              looks professional, works great on mobile, and makes job applications much easier to manage. The admin
              system and resume uploads have already improved how we handle applicants. Highly recommend DOS for
              businesses wanting a modern smart system — not just a basic website.&rdquo;
            </p>
          </blockquote>
          <figcaption className="relative mt-4 pl-4 sm:pl-5 text-sm text-ink-muted">
            <span className="text-white/75">&mdash; Paul,</span> Capital Recruitment
          </figcaption>
        </figure>

        <div className="mt-10 flex flex-col sm:flex-row gap-3">
          <Link
            href="/contact"
            className="btn-neon inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-white"
          >
            Talk to DOS <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href="/website-rebuilds"
            className="btn-ghost inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-medium text-white"
          >
            Explore Modern Smart Websites
          </Link>
        </div>

        <p className="mt-10 text-sm text-ink-dim leading-relaxed">
          This page summarises client-provided feedback and the scope of work delivered. DOS does not publish inflated
          performance claims or unaudited metrics on partner sites.
        </p>
      </div>
    </main>
  );
}
