import { NextResponse, type NextRequest } from "next/server";
import type Stripe from "stripe";
import { getStripe } from "@/app/lib/stripe";
import { getSupabaseAdmin } from "@/app/lib/supabase";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  const stripe = getStripe();
  if (!stripe) {
    return NextResponse.json({ error: "Stripe not configured." }, { status: 503 });
  }

  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!secret) {
    return NextResponse.json({ error: "Webhook secret not configured." }, { status: 503 });
  }

  const sig = req.headers.get("stripe-signature");
  if (!sig) {
    return NextResponse.json({ error: "Missing Stripe signature." }, { status: 400 });
  }

  const payload = await req.text();
  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(payload, sig, secret);
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Invalid signature";
    return NextResponse.json({ error: `Webhook signature verification failed: ${msg}` }, { status: 400 });
  }

  const supabase = getSupabaseAdmin();

  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object as Stripe.Checkout.Session;
      const customerId =
        typeof session.customer === "string" ? session.customer : session.customer?.id ?? null;
      const planId = (session.metadata?.plan_id as string | undefined) ?? null;
      const businessName = (session.metadata?.business_name as string | undefined) ?? null;
      const email = session.customer_details?.email ?? session.customer_email ?? null;

      if (supabase && (businessName || email)) {
        const subdomainBase =
          businessName?.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "") ||
          (email ? email.split("@")[0] : "tenant");
        const subdomain = `${subdomainBase}-${Math.random().toString(36).slice(2, 6)}`;

        await supabase
          .from("tenants")
          .upsert(
            {
              name: businessName ?? email ?? "New tenant",
              subdomain,
              stripe_customer_id: customerId,
              status: "trialing",
            },
            { onConflict: "stripe_customer_id" }
          );
      }
      break;
    }
    case "customer.subscription.updated":
    case "customer.subscription.deleted": {
      const sub = event.data.object as Stripe.Subscription;
      if (supabase && typeof sub.customer === "string") {
        const status =
          sub.status === "active"
            ? "active"
            : sub.status === "trialing"
              ? "trialing"
              : sub.status === "past_due"
                ? "past_due"
                : sub.status === "canceled"
                  ? "canceled"
                  : "suspended";
        await supabase
          .from("tenants")
          .update({ status })
          .eq("stripe_customer_id", sub.customer);
      }
      break;
    }
    default:
      break;
  }

  return NextResponse.json({ received: true });
}
