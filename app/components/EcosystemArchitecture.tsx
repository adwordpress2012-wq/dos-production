import Link from "next/link";
import {
  ArrowRight,
  Bot,
  CalendarCheck2,
  ClipboardList,
  Globe2,
  Mail,
  Network,
  ReceiptText,
  Star,
  UserRoundSearch,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import RevenueLifecycle from "./RevenueLifecycle";

type System = {
  name: string;
  purpose: string;
  copy: string;
  compactCopy: string;
  href: string;
  icon: LucideIcon;
};

const SYSTEMS: System[] = [
  {
    name: "DOS ERA",
    purpose: "Inbound email, answered and routed",
    copy: "Answers the questions you have approved, captures the details your team is always missing, and sends the enquiry to the right person.",
    compactCopy: "Answers approved questions, captures missing details and routes each enquiry to the right person.",
    href: "/solutions/era",
    icon: Mail,
  },
  {
    name: "DOS CPA",
    purpose: "Candidates qualified, prioritised and progressed",
    copy: "Captures and qualifies candidates, scores placement readiness, and keeps priority talent moving through recruitment pipelines.",
    compactCopy: "Qualifies and prioritises candidates, then keeps talent moving toward interview, offer and placement.",
    href: "/solutions/cpa",
    icon: UserRoundSearch,
  },
  {
    name: "DOS ARC",
    purpose: "Receivables followed up and escalated",
    copy: "Keeps invoice follow-up consistent and visible, so unpaid accounts are handled long before they become a collection problem.",
    compactCopy: "Keeps invoice follow-up consistent, so unpaid accounts are handled early instead of chased late.",
    href: "/solutions/arc",
    icon: ReceiptText,
  },
  {
    name: "DOS Reputation",
    purpose: "Customer experience turned into growth",
    copy: "Turns completed work into genuine reviews, and routes unhappy feedback privately to a person who can put it right.",
    compactCopy: "Turns completed work into genuine reviews, and sends unhappy feedback privately to a person.",
    href: "/solutions/reputation",
    icon: Star,
  },
];

const OPERATIONAL: { label: string; href: string; icon: LucideIcon }[] = [
  { label: "Smart Intake & Follow-Up", href: "/solutions/smart-intake-follow-up", icon: ClipboardList },
  { label: "Website Systems", href: "/solutions#websites", icon: Globe2 },
  { label: "CRM and Pipelines", href: "/solutions#pipelines", icon: Network },
  { label: "Bookings and Automation", href: "/solutions#bookings", icon: CalendarCheck2 },
];

type Props = {
  variant?: "full" | "compact";
  showLifecycle?: boolean;
};

export default function EcosystemArchitecture({ variant = "full", showLifecycle = false }: Props) {
  const compact = variant === "compact";

  return (
    <section className={compact ? "site-section bg-[#101225]/75" : "site-section"}>
      <div className="site-container">
        <p className="eyebrow">The DOS operating architecture</p>
        <h2 className="section-heading mt-5">
          {compact ? "One connected architecture." : "One operating architecture, not four separate tools."}
        </h2>
        <p className="section-copy mt-6">
          {compact
            ? "Micah is the intelligence layer. The DOS systems put it to work on a different part of the customer and revenue journey."
            : "Micah is the intelligence layer underneath everything. Each DOS system puts it to work on a different part of the customer and revenue journey, sharing the same customer record and the same rule: a person stays in control of the conversations that matter."}
        </p>

        <Link
          href="/solutions#micah"
          className="surface-card group mt-12 flex flex-col gap-5 rounded-[1.6rem] border-teal-300/25 p-7 sm:flex-row sm:items-center sm:justify-between"
        >
          <span className="flex items-start gap-4">
            <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-teal-400/12 text-teal-200">
              <Bot className="h-5 w-5" aria-hidden />
            </span>
            <span>
              <span className="flex flex-wrap items-center gap-3">
                <strong className="text-xl font-semibold text-white">Micah</strong>
                <span className="rounded-lg bg-teal-400/10 px-2.5 py-1 text-xs font-semibold text-teal-200">
                  Intelligence layer
                </span>
              </span>
              <span className="mt-3 block max-w-3xl text-sm leading-relaxed text-ink-muted">
                The communication and intelligence layer every DOS system runs on. Micah is not a separate product to
                choose between — it is what makes the systems below understand, respond and know when to stop.
              </span>
            </span>
          </span>
          <span className="inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-teal-200 group-hover:text-white">
            About Micah <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" aria-hidden />
          </span>
        </Link>

        <p className="mt-6 text-center text-xs font-semibold uppercase tracking-[0.22em] text-ink-dim">
          Powers the DOS business systems
        </p>

        <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {SYSTEMS.map(({ name, purpose, copy, compactCopy, href, icon: Icon }) => (
            <Link key={name} href={href} className="surface-card group flex flex-col rounded-[1.6rem] p-7">
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-violet-500/12 text-violet-200">
                <Icon className="h-5 w-5" aria-hidden />
              </span>
              <h3 className="mt-6 text-xl font-semibold text-white">{name}</h3>
              <p className="mt-2 text-sm font-medium text-violet-200">{purpose}</p>
              <p className="mt-4 text-sm leading-relaxed text-ink-muted">{compact ? compactCopy : copy}</p>
              <span className="mt-auto inline-flex items-center gap-2 pt-6 text-sm font-semibold text-violet-200 group-hover:text-white">
                Explore <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" aria-hidden />
              </span>
            </Link>
          ))}
        </div>

        <div className="surface-card mt-4 rounded-[1.6rem] p-7">
          <p className="text-sm font-semibold text-white">Connected DOS operational systems</p>
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-ink-muted">
            The systems already running the business day to day. ERA, ARC and Reputation plug into them rather than
            sitting beside them.
          </p>
          <div className="mt-5 grid gap-2 sm:grid-cols-2 xl:grid-cols-4">
            {OPERATIONAL.map(({ label, href, icon: Icon }) => (
              <Link
                key={label}
                href={href}
                className="flex min-h-12 items-center gap-3 rounded-xl border border-white/[0.07] bg-white/[0.025] px-4 py-3 text-sm text-ink-muted transition hover:border-violet-400/25 hover:text-white"
              >
                <Icon className="h-4 w-4 shrink-0 text-violet-200" aria-hidden />
                {label}
              </Link>
            ))}
          </div>
        </div>

        {showLifecycle ? <RevenueLifecycle variant="compact" /> : null}

        {compact ? (
          <Link
            href="/ecosystem"
            className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-violet-200 hover:text-white"
          >
            See how the systems connect <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        ) : null}
      </div>
    </section>
  );
}
