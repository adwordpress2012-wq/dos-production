"use client";

import Link from "next/link";
import { useState } from "react";
import { CheckCircle2, ArrowRight, Loader2 } from "lucide-react";
import type { PLAN_CATALOG, PlanId } from "../lib/stripe";
import CalendlyPopupLink from "../components/CalendlyPopupLink";
import TryDosWorkspaceCta from "../components/TryDosWorkspaceCta";

type Plan = (typeof PLAN_CATALOG)[number];

type Props = {
  plans: readonly Plan[];
};

export default function PricingPlans({ plans }: Props) {
  const [loadingId, setLoadingId] = useState<PlanId | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function startCheckout(planId: PlanId) {
    setError(null);
    setLoadingId(planId);
    try {
      const res = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ planId }),
      });
      const data = (await res.json()) as { url?: string; error?: string };
      if (!res.ok || !data.url) {
        throw new Error(data.error ?? "Could not start checkout.");
      }
      window.location.href = data.url;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
      setLoadingId(null);
    }
  }

  return (
    <>
      <div className="mt-12 sm:mt-14 grid gap-5 md:grid-cols-2 xl:grid-cols-3 items-stretch">
        {plans.map((plan) => {
          const isHighlight = plan.highlight;
          const title = plan.headline ?? plan.name;
          const showMessaging = Boolean(plan.messagingTitle && plan.messagingLines.length > 0);
          const showUsage = plan.usageRateLines.length > 0;
          const showDisclaimer = plan.disclaimer.trim().length > 0;
          return (
            <div
              key={plan.id}
              className={`relative rounded-3xl p-6 sm:p-7 flex flex-col h-full min-h-0 overflow-hidden ${
                isHighlight ? "glass-strong ring-glow" : "glass"
              }`}
            >
              {plan.badge && (
                <span className="absolute -top-px left-1/2 -translate-x-1/2 rounded-b-md bg-gradient-to-r from-amber-500/90 to-orange-500/90 px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-white">
                  {plan.badge}
                </span>
              )}
              {isHighlight && !plan.badge && (
                <span className="absolute -top-px left-1/2 -translate-x-1/2 rounded-b-md bg-gradient-to-r from-violet-500 to-cyan-400 px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-white">
                  Most popular
                </span>
              )}
              <div className={plan.badge || isHighlight ? "mt-3 sm:mt-4" : ""}>
                <h3 className="text-lg font-semibold tracking-tight">{title}</h3>
                <p className="mt-2 text-sm text-violet-200/85 leading-snug">{plan.positioning}</p>
                <div className="mt-3 flex items-baseline gap-2 flex-wrap">
                  <span className="text-3xl sm:text-4xl font-semibold tracking-tight break-words">
                    {plan.priceLabel}
                  </span>
                  {plan.cadence ? (
                    <span className="text-sm text-ink-muted whitespace-nowrap">{plan.cadence}</span>
                  ) : null}
                </div>
                {plan.setupLabel ? (
                  <p className="mt-1 text-xs text-ink-dim tracking-wide">{plan.setupLabel}</p>
                ) : null}
                <p className="mt-3 text-sm text-ink-muted leading-relaxed">{plan.description}</p>
              </div>

              <p className="mt-5 text-[11px] font-semibold tracking-wide text-ink-muted">Includes</p>
              <ul className="mt-2 space-y-2 text-sm text-ink-muted flex-1 min-h-0">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
                    <span className="leading-snug">{f}</span>
                  </li>
                ))}
              </ul>

              {showMessaging ? (
                <div className="mt-4 rounded-xl border border-white/10 bg-white/[0.02] px-3.5 py-3">
                  <p className="text-[11px] font-semibold tracking-wide text-violet-200/90">
                    {plan.messagingTitle}
                  </p>
                  <ul className="mt-2 space-y-1.5 text-sm text-ink-muted">
                    {plan.messagingLines.map((line) => (
                      <li key={line} className="flex items-start gap-2">
                        <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-cyan-400/80" />
                        <span className="leading-snug">{line}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}

              {showUsage ? (
                <div className="mt-3">
                  <p className="text-[11px] font-semibold tracking-wide text-ink-muted">Additional usage</p>
                  <ul className="mt-2 space-y-1.5 text-sm text-ink-muted">
                    {plan.usageRateLines.map((line) => (
                      <li key={line} className="flex items-start gap-2">
                        <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-white/30" />
                        <span className="leading-snug">{line}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}

              {showDisclaimer ? (
                <p className="mt-4 text-[11px] sm:text-xs text-ink-dim leading-relaxed">{plan.disclaimer}</p>
              ) : null}

              <div className="mt-5 pt-1 mt-auto space-y-3">
                <TryDosWorkspaceCta
                  variant="card"
                  supportingText="See how DOS manages enquiries, bookings & customer conversations."
                />

                {plan.cta.kind === "stripe" ? (
                  <button
                    type="button"
                    onClick={() => startCheckout(plan.id)}
                    disabled={loadingId !== null}
                    className={`w-full inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold transition cursor-pointer disabled:opacity-60 ${
                      isHighlight ? "btn-ghost text-white border border-white/15" : "btn-ghost text-white"
                    }`}
                  >
                    {loadingId === plan.id ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" /> Redirecting…
                      </>
                    ) : (
                      <>
                        {plan.cta.label} <ArrowRight className="h-4 w-4 shrink-0" />
                      </>
                    )}
                  </button>
                ) : plan.cta.href.startsWith("mailto:") ? (
                  <a
                    href={plan.cta.href}
                    className={`w-full inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold transition ${
                      isHighlight ? "btn-ghost text-white border border-white/15" : "btn-ghost text-white"
                    }`}
                  >
                    {plan.cta.label} <ArrowRight className="h-4 w-4 shrink-0" />
                  </a>
                ) : plan.cta.label.toLowerCase().includes("demo") ||
                  plan.cta.label.toLowerCase().includes("strategy call") ? (
                  <CalendlyPopupLink className="btn-book-demo w-full inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold transition">
                    {plan.cta.label} <ArrowRight className="h-4 w-4 shrink-0" />
                  </CalendlyPopupLink>
                ) : (
                  <Link
                    href={plan.cta.href}
                    className={`w-full inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold transition ${
                      isHighlight ? "btn-ghost text-white border border-white/15" : "btn-ghost text-white"
                    }`}
                  >
                    {plan.cta.label} <ArrowRight className="h-4 w-4 shrink-0" />
                  </Link>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {error && (
        <div className="mx-auto mt-6 max-w-3xl rounded-xl border border-amber-400/30 bg-amber-400/10 px-4 py-3 text-sm text-amber-200">
          <strong className="font-semibold">Heads up — </strong>
          {error}{" "}
          <Link href="/contact" className="underline underline-offset-4 decoration-dashed text-violet-200 hover:text-violet-100">
            Contact us
          </Link>{" "}
          and we&apos;ll get you set up.
        </div>
      )}
    </>
  );
}
