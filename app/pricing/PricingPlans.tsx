"use client";

import { useState } from "react";
import { CheckCircle2, ArrowRight, Loader2 } from "lucide-react";
import type { PLAN_CATALOG, PlanId } from "../lib/stripe";

type Plan = (typeof PLAN_CATALOG)[number];

type Props = {
  plans: Plan[];
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
      <div className="mt-14 grid gap-5 lg:grid-cols-3">
        {plans.map((plan) => {
          const isHighlight = plan.highlight;
          return (
            <div
              key={plan.id}
              className={`relative rounded-3xl p-7 flex flex-col h-full overflow-hidden ${
                isHighlight
                  ? "glass-strong ring-glow"
                  : "glass"
              }`}
            >
              {isHighlight && (
                <span className="absolute -top-px left-1/2 -translate-x-1/2 rounded-b-md bg-gradient-to-r from-violet-500 to-cyan-400 px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-white">
                  Most popular
                </span>
              )}
              <div>
                <h3 className="text-lg font-semibold tracking-tight">{plan.name}</h3>
                <div className="mt-3 flex items-baseline gap-2">
                  <span className="text-4xl font-semibold tracking-tight">{plan.priceLabel}</span>
                  <span className="text-sm text-ink-muted">{plan.cadence}</span>
                </div>
                <p className="mt-1 text-xs uppercase tracking-widest text-ink-dim">{plan.setup}</p>
                <p className="mt-4 text-sm text-ink-muted leading-relaxed">{plan.description}</p>
              </div>

              <ul className="mt-6 space-y-2.5 text-sm text-ink-muted flex-1">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-7">
                <button
                  type="button"
                  onClick={() => startCheckout(plan.id)}
                  disabled={loadingId !== null}
                  className={`w-full inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold transition cursor-pointer disabled:opacity-60 ${
                    isHighlight
                      ? "btn-neon text-white"
                      : "btn-ghost text-white"
                  }`}
                >
                  {loadingId === plan.id ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" /> Redirecting…
                    </>
                  ) : (
                    <>
                      Start with {plan.name} <ArrowRight className="h-4 w-4" />
                    </>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {error && (
        <div className="mx-auto mt-6 max-w-3xl rounded-xl border border-amber-400/30 bg-amber-400/10 px-4 py-3 text-sm text-amber-200">
          <strong className="font-semibold">Heads up — </strong>
          {error} Email{" "}
          <a href="mailto:hello@directiveos.com" className="underline underline-offset-4 decoration-dashed">
            hello@directiveos.com
          </a>{" "}
          and we&apos;ll get you set up.
        </div>
      )}
    </>
  );
}
