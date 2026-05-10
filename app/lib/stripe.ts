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

const USAGE_DISCLAIMER =
  "Usage is calculated monthly and resets each billing cycle. Extra usage is added to your next invoice. Fair usage and anti-spam policies apply.";

export type PlanCta =
  | { kind: "stripe"; label: string }
  | { kind: "link"; label: string; href: string };

export type PublicPlan = {
  id: "founding" | "starter" | "growth" | "scale";
  name: string;
  headline?: string;
  badge?: string;
  priceLabel: string;
  cadence: string;
  /** Shown under price; omit or empty to hide */
  setupLabel: string;
  description: string;
  features: readonly string[];
  messagingTitle: string;
  messagingLines: readonly string[];
  usageRateLines: readonly string[];
  disclaimer: string;
  highlight: boolean;
  cta: PlanCta;
};

/**
 * Public pricing catalog. Stripe checkout only applies to plans whose `cta.kind` is `stripe`;
 * the API maps `id` to `STRIPE_PRICE_<ID>` env vars (e.g. STRIPE_PRICE_STARTER).
 */
export const PLAN_CATALOG: readonly PublicPlan[] = [
  {
    id: "founding",
    name: "Founding Members",
    headline: "Founding Members Offer",
    badge: "Limited Spots Available",
    priceLabel: "$197",
    cadence: "/month",
    setupLabel: "$0 setup",
    description:
      "Perfect for small businesses wanting to modernise customer enquiries and bookings without large upfront costs.",
    features: [
      "300 conversations included",
      "Website Chat Widget",
      "FAQ Automation",
      "Booking Requests",
      "Email Notifications",
      "Basic Lead Capture",
    ],
    messagingTitle: "WhatsApp + SMS",
    messagingLines: ["150 WhatsApp/SMS messages included"],
    usageRateLines: ["Extra conversations: 15¢ each", "Extra WhatsApp/SMS messages: 8¢ each"],
    disclaimer: USAGE_DISCLAIMER,
    highlight: false,
    cta: {
      kind: "link",
      label: "Apply Now",
      href: "mailto:hello@directiveos.com?subject=Apply%20for%20Founding%20Member%20Access",
    },
  },
  {
    id: "starter",
    name: "Starter",
    priceLabel: "$297",
    cadence: "/month",
    setupLabel: "",
    description:
      "Automate customer enquiries, bookings, and follow-ups while you focus on running your business.",
    features: [
      "1,000 conversations included",
      "Website Chat Widget",
      "SMS Ready",
      "WhatsApp Ready",
      "Booking Automation",
      "Lead Capture",
    ],
    messagingTitle: "WhatsApp + SMS",
    messagingLines: ["500 WhatsApp/SMS messages included"],
    usageRateLines: ["Extra conversations: 12¢ each", "Extra WhatsApp/SMS messages: 7¢ each"],
    disclaimer: USAGE_DISCLAIMER,
    highlight: false,
    cta: { kind: "link", label: "Book Free Demo", href: "/contact" },
  },
  {
    id: "growth",
    name: "Growth",
    priceLabel: "$497",
    cadence: "/month",
    setupLabel: "",
    description:
      "Perfect for businesses wanting stronger lead generation and multi-channel customer communication. Most businesses choose this plan.",
    features: [
      "3,000 conversations included",
      "AI Voice Receptionist",
      "SMS + WhatsApp",
      "Booking Automation",
      "High-Converting Landing Page",
      "Priority Support",
    ],
    messagingTitle: "WhatsApp + SMS",
    messagingLines: ["1,500 WhatsApp/SMS messages included"],
    usageRateLines: ["Extra conversations: 10¢ each", "Extra WhatsApp/SMS messages: 6¢ each"],
    disclaimer: USAGE_DISCLAIMER,
    highlight: true,
    cta: { kind: "link", label: "Book Growth Demo", href: "/contact" },
  },
  {
    id: "scale",
    name: "Scale",
    headline: "Scale Plan",
    priceLabel: "Custom Quote",
    cadence: "",
    setupLabel: "Tailored to your business",
    description: "Built for growing multi-location businesses.",
    features: [
      "Multi-location support",
      "Multiple landing pages",
      "CRM integration",
      "AI lead qualification",
      "Advanced workflows",
      "Priority support",
    ],
    messagingTitle: "WhatsApp + SMS",
    messagingLines: ["Custom usage allocation based on business size"],
    usageRateLines: [
      "Custom volume-based usage rates",
      "Multi-location bundled usage available",
    ],
    disclaimer: USAGE_DISCLAIMER,
    highlight: false,
    cta: { kind: "link", label: "Book Strategy Call", href: "/contact" },
  },
] as const;

export type PlanId = (typeof PLAN_CATALOG)[number]["id"];

export function isStripeCheckoutPlan(id: PlanId): boolean {
  const plan = PLAN_CATALOG.find((p) => p.id === id);
  return plan?.cta.kind === "stripe";
}

export function resolvePriceId(planId: PlanId): string | undefined {
  const key = `STRIPE_PRICE_${planId.toUpperCase()}`;
  return process.env[key];
}
