import Link from "next/link";
import { ArrowRight } from "lucide-react";

type Stage = {
  stage: string;
  system: string;
  /** Shorter system label used by the compact strip so it stays on one line. */
  short: string;
  copy: string;
  href?: string;
  /** Marks the stages controlled by a named DOS system, so the lifecycle stays scannable. */
  dos?: boolean;
};

const STAGES: Stage[] = [
  {
    stage: "Attract",
    system: "Website systems",
    short: "Website",
    copy: "A website built to earn trust and make the next step obvious.",
    href: "/solutions#websites",
  },
  {
    stage: "Capture",
    system: "Smart Intake",
    short: "Smart Intake",
    copy: "Every enquiry becomes an organised opportunity instead of an inbox item.",
    href: "/solutions/smart-intake-follow-up",
    dos: true,
  },
  {
    stage: "Respond",
    system: "DOS ERA",
    short: "DOS ERA",
    copy: "Inbound email answered, detailed and routed to the right person.",
    href: "/solutions/era",
    dos: true,
  },
  {
    stage: "Convert",
    system: "CRM and pipelines",
    short: "CRM",
    copy: "Opportunities stay visible and keep moving toward a decision.",
    href: "/solutions#pipelines",
  },
  {
    stage: "Deliver",
    system: "Bookings and workflows",
    short: "Bookings",
    copy: "Appointments, reminders and workflows keep the job on track.",
    href: "/solutions#bookings",
  },
  {
    stage: "Collect",
    system: "DOS ARC",
    short: "DOS ARC",
    copy: "Invoice follow-up stays consistent so payment does not depend on memory.",
    href: "/solutions/arc",
    dos: true,
  },
  {
    stage: "Reputation",
    system: "DOS Reputation",
    short: "Reputation",
    copy: "Completed work becomes genuine reviews and stronger public trust.",
    href: "/solutions/reputation",
    dos: true,
  },
  {
    stage: "Repeat",
    system: "Compounding demand",
    short: "New demand",
    copy: "A stronger reputation attracts the next customer at lower cost.",
  },
];

type Props = {
  variant?: "full" | "compact";
};

export default function RevenueLifecycle({ variant = "full" }: Props) {
  if (variant === "compact") {
    return (
      <div className="surface-card mt-12 rounded-[1.6rem] p-7">
        <p className="eyebrow">The revenue lifecycle</p>
        <ol className="mt-6 grid grid-cols-2 gap-2 sm:grid-cols-4 xl:flex xl:flex-nowrap xl:items-stretch">
          {STAGES.map(({ stage, short, dos }, index) => (
            <li key={stage} className="flex items-center gap-2 xl:min-w-0 xl:flex-1">
              <span className="flex min-h-16 w-full min-w-0 flex-col justify-center rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 py-2 xl:px-3">
                <span className="text-sm font-semibold text-white">{stage}</span>
                <span className={`mt-0.5 text-xs ${dos ? "text-violet-200" : "text-ink-dim"}`}>{short}</span>
              </span>
              {index < STAGES.length - 1 ? (
                <ArrowRight className="hidden h-4 w-4 shrink-0 text-violet-300/70 xl:block" aria-hidden />
              ) : null}
            </li>
          ))}
        </ol>
      </div>
    );
  }

  return (
    <section className="site-section bg-[#0b0d1c]/80">
      <div className="site-container">
        <p className="eyebrow">The revenue lifecycle</p>
        <h2 className="section-heading mt-5">Every stage between a first enquiry and a paid, reviewed job.</h2>
        <p className="section-copy mt-6">
          Most businesses have a strong stage and a weak one. DOS maps each system to the point in the lifecycle where
          the revenue is actually being lost.
        </p>
        <ol className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {STAGES.map(({ stage, system, copy, href, dos }, index) => {
            const content = (
              <>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold tracking-[0.2em] text-ink-dim">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  {href ? (
                    <ArrowRight
                      className="h-4 w-4 text-violet-300 transition group-hover:translate-x-1"
                      aria-hidden
                    />
                  ) : null}
                </div>
                <h3 className="mt-6 text-2xl font-semibold text-white">{stage}</h3>
                {dos ? (
                  <span className="mt-3 inline-flex w-fit items-center rounded-lg bg-violet-500/12 px-2.5 py-1 text-xs font-semibold text-violet-200">
                    {system}
                  </span>
                ) : (
                  <p className="mt-3 text-sm text-ink-dim">{system}</p>
                )}
                <p className="mt-4 text-sm leading-relaxed text-ink-muted">{copy}</p>
              </>
            );

            return (
              <li key={stage} className="flex">
                {href ? (
                  <Link href={href} className="surface-card group flex w-full flex-col rounded-2xl p-6">
                    {content}
                  </Link>
                ) : (
                  <div className="surface-card flex w-full flex-col rounded-2xl p-6">{content}</div>
                )}
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
