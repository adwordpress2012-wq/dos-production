import "server-only";
import Stripe from "stripe";

let cached: Stripe | null = null;

export function getStripe(): Stripe | null {
  if (cached) return cached;
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) return null;
  cached = new Stripe(key, {
    appInfo: { name: "DOS — Done-For-You AI Business Systems", version: "1.0.0" },
  });
  return cached;
}

/**
 * DOS Stripe price catalog. The frontend identifies plans by `id`; the API
 * route maps `id` to a Stripe Price ID using STRIPE_PRICE_<ID> env vars so
 * the same code works in test and live mode.
 */
export const PLAN_CATALOG = [
  {
    id: "starter",
    name: "Starter",
    priceLabel: "$390",
    cadence: "/month + setup",
    setup: "$1,490 setup",
    description:
      "Modern website, hosting, basic automations and a single AI channel — perfect for sole traders modernising fast.",
    features: [
      "Website rebuild + hosting",
      "1 AI channel (Micah voice or COS SMS)",
      "Booking widget (BOS Lite)",
      "Single inbox + email forwarding",
      "Standard support (business hours)",
    ],
    highlight: false,
  },
  {
    id: "growth",
    name: "Growth",
    priceLabel: "$890",
    cadence: "/month + setup",
    setup: "$2,990 setup",
    description:
      "The full Done-For-You stack. Website, Micah voice, COS SMS/email and BOS booking — all running in one Command Centre.",
    features: [
      "Everything in Starter",
      "Micah AI receptionist (24/7 voice)",
      "COS — full SMS, email, web chat",
      "BOS — full booking + reminders",
      "Command Centre dashboard",
      "Priority support + monthly review",
    ],
    highlight: true,
  },
  {
    id: "scale",
    name: "Scale",
    priceLabel: "From $1,990",
    cadence: "/month",
    setup: "Custom build",
    description:
      "Multi-location and multi-brand operators. Custom integrations, white-label Command Centre and a dedicated success engineer.",
    features: [
      "Everything in Growth",
      "Multi-location / multi-brand",
      "Custom integrations (CRM, PMS, ERP)",
      "White-label Command Centre",
      "Dedicated success engineer",
      "SLA + quarterly roadmap",
    ],
    highlight: false,
  },
] as const;

export type PlanId = (typeof PLAN_CATALOG)[number]["id"];

export function resolvePriceId(planId: PlanId): string | undefined {
  const key = `STRIPE_PRICE_${planId.toUpperCase()}`;
  return process.env[key];
}
