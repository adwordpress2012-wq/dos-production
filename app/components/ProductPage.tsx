import Link from "next/link";
import { ReactNode } from "react";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import GlowCard, { GlowIcon } from "./GlowCard";

type Tone = "violet" | "cyan" | "emerald" | "fuchsia" | "amber";

export type ProductFeature = {
  icon: ReactNode;
  title: string;
  description: string;
};

export type ProductFaq = {
  q: string;
  a: ReactNode;
};

type Props = {
  productCode: string;
  productName: string;
  tagline: ReactNode;
  description: string;
  bullets: string[];
  features: ProductFeature[];
  faqs: ProductFaq[];
  tone: Tone;
  illustration: ReactNode;
};

const ACCENT_TEXT: Record<Tone, string> = {
  violet: "text-violet-300/80",
  cyan: "text-cyan-300/80",
  emerald: "text-emerald-300/80",
  fuchsia: "text-fuchsia-300/80",
  amber: "text-amber-300/80",
};

export default function ProductPage(props: Props) {
  const { productCode, productName, tagline, description, bullets, features, faqs, tone, illustration } = props;
  return (
    <main className="relative pt-32 sm:pt-40">
      <section className="mx-auto max-w-7xl px-6">
        <div className="grid lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7">
            <span className={`text-xs font-mono uppercase tracking-[0.25em] ${ACCENT_TEXT[tone]}`}>
              {productCode} · {productName}
            </span>
            <h1 className="mt-4 text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight leading-[1.05]">
              {tagline}
            </h1>
            <p className="mt-5 text-base sm:text-lg text-ink-muted max-w-2xl leading-relaxed">
              {description}
            </p>
            <ul className="mt-8 grid sm:grid-cols-2 gap-x-4 gap-y-3 text-sm text-ink-muted">
              {bullets.map((b) => (
                <li key={b} className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
            <div className="mt-9 flex flex-col sm:flex-row gap-3">
              <Link
                href="/pricing"
                className="btn-neon inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-white"
              >
                See pricing <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/onboarding"
                className="btn-ghost inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-medium text-white"
              >
                Start onboarding
              </Link>
            </div>
          </div>

          <div className="lg:col-span-5">{illustration}</div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 mt-24 sm:mt-32">
        <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight">What&apos;s included</h2>
        <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => (
            <GlowCard key={f.title} tone={tone}>
              <GlowIcon tone={tone}>{f.icon}</GlowIcon>
              <h3 className="mt-4 text-base font-semibold tracking-tight">{f.title}</h3>
              <p className="mt-2 text-sm text-ink-muted leading-relaxed">{f.description}</p>
            </GlowCard>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-6 mt-24">
        <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight">Frequently asked</h2>
        <div className="mt-8 divide-y divide-white/5 glass rounded-2xl">
          {faqs.map((f, i) => (
            <details key={i} className="group p-5 [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex cursor-pointer items-center justify-between gap-4">
                <span className="text-base font-medium">{f.q}</span>
                <span className="text-ink-muted group-open:rotate-45 transition-transform text-2xl leading-none">
                  +
                </span>
              </summary>
              <div className="mt-3 text-sm text-ink-muted leading-relaxed">{f.a}</div>
            </details>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 mt-24">
        <div className="relative overflow-hidden rounded-3xl glass-strong p-10 sm:p-12 ring-glow-soft">
          <div
            aria-hidden
            className="absolute -top-20 left-1/4 h-72 w-[700px] rounded-full bg-violet-500/25 blur-[120px]"
          />
          <div className="relative grid gap-6 sm:grid-cols-[1fr_auto] items-center">
            <div>
              <h3 className="text-2xl sm:text-3xl font-semibold tracking-tight">
                Let DOS run your {productName}.
              </h3>
              <p className="mt-2 text-ink-muted text-sm sm:text-base max-w-xl">
                Onboarding takes minutes. Most customers go live within 7–14 days.
              </p>
            </div>
            <div className="flex gap-3">
              <Link href="/pricing" className="btn-neon px-5 py-2.5 rounded-xl text-sm font-semibold text-white">
                See pricing
              </Link>
              <Link href="/onboarding" className="btn-ghost px-5 py-2.5 rounded-xl text-sm font-medium text-white">
                Start
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export function ProductIllustration({
  tone = "violet",
  children,
}: {
  tone?: Tone;
  children: ReactNode;
}) {
  const glow: Record<Tone, string> = {
    violet: "from-violet-500/30 via-fuchsia-500/10 to-cyan-400/15",
    cyan: "from-cyan-400/25 via-blue-500/10 to-violet-500/10",
    emerald: "from-emerald-400/25 via-teal-400/10 to-cyan-400/10",
    fuchsia: "from-fuchsia-500/25 via-violet-500/10 to-cyan-400/15",
    amber: "from-amber-400/25 via-orange-400/10 to-violet-500/15",
  };
  return (
    <div className="relative">
      <div
        aria-hidden
        className={`absolute -inset-6 rounded-[28px] bg-gradient-to-br ${glow[tone]} blur-2xl opacity-70`}
      />
      <div className="relative glass-strong rounded-2xl p-2 ring-glow-soft">
        <div className="rounded-xl bg-[#06080f] border border-white/5 overflow-hidden">{children}</div>
      </div>
    </div>
  );
}
