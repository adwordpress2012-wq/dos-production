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
  /** One-line plan positioning for SMB audiences */
  positioning: string;
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
    positioning: "A simple way to get online, capture enquiries and start modernising without a big upfront bill.",
    description:
      "Ideal if you want a modern foundation, enquiry capture and DOS Workspace access with hands-on onboarding from our Australian team.",
    features: [
      "Modern website presence & managed hosting mindset",
      "DOS Workspace — enquiry dashboard & lead tracking",
      "Web chat + enquiry capture",
      "Email notifications so you respond faster",
      "Booking requests customers can complete easily",
      "Australian-operated setup and support",
    ],
    messagingTitle: "",
    messagingLines: [],
    usageRateLines: [],
    disclaimer: "",
    highlight: false,
    cta: {
      kind: "link",
      label: "Apply Now",
      href: "/contact",
    },
  },
  {
    id: "starter",
    name: "DOS Orbit",
    priceLabel: "$297",
    cadence: "/month",
    setupLabel: "",
    positioning: "For businesses needing a modern online foundation.",
    description:
      "A clean, professional online presence with enquiry capture and customer messaging — managed for you.",
    features: [
      "Modern website foundation tuned for Australian SMBs",
      "DOS Workspace — enquiries, leads and activity in one place",
      "Web chat + enquiry capture",
      "SMS & WhatsApp-ready customer messaging",
      "Booking requests & confirmations handled smoothly",
      "Australian-operated support",
    ],
    messagingTitle: "",
    messagingLines: [],
    usageRateLines: [],
    disclaimer: "",
    highlight: false,
    cta: { kind: "link", label: "Book Strategy Call", href: "/contact" },
  },
  {
    id: "growth",
    name: "DOS Nexus",
    priceLabel: "$497",
    cadence: "/month",
    setupLabel: "",
    positioning: "For businesses wanting AI receptionist, automation and faster customer response.",
    description:
      "Add Micah, stronger follow-up and faster response times — so more enquiries turn into booked work.",
    features: [
      "Everything in DOS Orbit",
      "Micah AI Receptionist — calls answered 24/7",
      "Faster responses across SMS, WhatsApp & web chat",
      "Smarter booking flow with reminders customers actually see",
      "Priority support from our Australian team",
      "DOS Workspace — conversation & booking hub",
    ],
    messagingTitle: "",
    messagingLines: [],
    usageRateLines: [],
    disclaimer: "",
    highlight: true,
    cta: { kind: "link", label: "Book Strategy Call", href: "/contact" },
  },
  {
    id: "scale",
    name: "DOS Titan",
    priceLabel: "Custom Quote",
    cadence: "",
    setupLabel: "Tailored to your business",
    positioning: "Full DOS ecosystem with advanced automation, AI systems and premium business management tools.",
    description: "For growing teams and multi-location operators who want advanced automation and premium oversight.",
    features: [
      "Everything in DOS Nexus",
      "Multi-location & higher-volume operations support",
      "Advanced automation tailored to your workflow",
      "Premium onboarding and ongoing optimisation",
      "Custom integrations where your business needs them",
      "DOS Workspace — advanced reporting & operations layer",
    ],
    messagingTitle: "",
    messagingLines: [],
    usageRateLines: [],
    disclaimer: "",
    highlight: false,
    cta: { kind: "link", label: "Discuss your setup", href: "/contact" },
  },
] as const;

export type PlanId = (typeof PLAN_CATALOG)[number]["id"];

export const MAIN_PRICING_PLAN_IDS = ["starter", "growth", "scale"] as const satisfies readonly PlanId[];

export function getMainPricingPlans(): readonly PublicPlan[] {
  return MAIN_PRICING_PLAN_IDS.map((id) => PLAN_CATALOG.find((p) => p.id === id)!);
}

export function getFoundingPlan(): PublicPlan {
  const p = PLAN_CATALOG.find((x) => x.id === "founding");
  if (!p) throw new Error("Founding plan missing from catalog");
  return p;
}

export function isStripeCheckoutPlan(id: PlanId): boolean {
  const plan = PLAN_CATALOG.find((p) => p.id === id);
  return plan?.cta.kind === "stripe";
}

export function resolvePriceId(planId: PlanId): string | undefined {
  const key = `STRIPE_PRICE_${planId.toUpperCase()}`;
  return process.env[key];
}
