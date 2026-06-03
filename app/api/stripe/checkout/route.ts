import { NextResponse, type NextRequest } from "next/server";
import {
  getStripe,
  PLAN_CATALOG,
  isStripeCheckoutPlan,
  resolvePriceId,
  type PlanId,
} from "@/app/lib/stripe";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type Body = {
  planId?: PlanId;
  email?: string;
  businessName?: string;
};

export async function POST(req: NextRequest) {
  let body: Body = {};
  try {
    body = (await req.json()) as Body;
  } catch {
    /* fall through to validation */
  }

  const { planId, email, businessName } = body;

  if (!planId || !PLAN_CATALOG.some((p) => p.id === planId)) {
    return NextResponse.json({ error: "Invalid plan." }, { status: 400 });
  }

  if (!isStripeCheckoutPlan(planId)) {
    return NextResponse.json(
      { error: "This plan is not available for self-serve checkout." },
      { status: 400 }
    );
  }

  const stripe = getStripe();
  if (!stripe) {
    return NextResponse.json(
      {
        error:
          "Stripe is not configured on this environment. Set STRIPE_SECRET_KEY to enable checkout.",
      },
      { status: 503 }
    );
  }

  const priceId = resolvePriceId(planId);
  if (!priceId) {
    return NextResponse.json(
      {
        error: `No Stripe price configured for plan "${planId}". Set STRIPE_PRICE_${planId.toUpperCase()}.`,
      },
      { status: 503 }
    );
  }

  const origin =
    req.headers.get("origin") ??
    process.env.NEXT_PUBLIC_APP_URL ??
    new URL(req.url).origin;

  try {
    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      line_items: [{ price: priceId, quantity: 1 }],
      customer_email: email,
      allow_promotion_codes: true,
      billing_address_collection: "required",
      metadata: {
        plan_id: planId,
        business_name: businessName ?? "",
      },
      subscription_data: {
        metadata: {
          plan_id: planId,
          business_name: businessName ?? "",
        },
      },
      success_url: `${origin}/onboarding?session_id={CHECKOUT_SESSION_ID}&plan=${planId}`,
      cancel_url: `${origin}/pricing?canceled=1`,
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Checkout failed.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
