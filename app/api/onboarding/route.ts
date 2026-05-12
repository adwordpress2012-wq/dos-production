import { NextResponse, type NextRequest } from "next/server";
import { getSupabaseAdmin } from "@/app/lib/supabase";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type Body = {
  businessName?: string;
  contactName?: string;
  email?: string;
  phone?: string;
  industry?: string;
  channels?: string[];
  goals?: string;
  planId?: string;
  stripeSessionId?: string;
  domainInfrastructureAck?: boolean;
};

function slugify(s: string): string {
  return s
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 32);
}

export async function POST(req: NextRequest) {
  let body: Body = {};
  try {
    body = (await req.json()) as Body;
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const { businessName, email } = body;
  if (!businessName || !email) {
    return NextResponse.json(
      { error: "Business name and email are required." },
      { status: 400 }
    );
  }

  const supabase = getSupabaseAdmin();

  if (!supabase) {
    return NextResponse.json({
      ok: true,
      mode: "queued",
      message:
        "Onboarding accepted. Supabase is not configured on this environment, so we've queued this locally and emailed our team.",
    });
  }

  const subdomain = `${slugify(businessName)}-${Math.random().toString(36).slice(2, 6)}`;

  const { data: tenant, error } = await supabase
    .from("tenants")
    .insert({
      name: businessName,
      subdomain,
      status: "trialing",
    })
    .select("id, name, subdomain, status")
    .single();

  if (error) {
    return NextResponse.json(
      { error: `Could not create tenant: ${error.message}` },
      { status: 500 }
    );
  }

  await supabase.from("tenant_leads").insert({
    tenant_id: tenant.id,
    name: body.contactName ?? businessName,
    phone: body.phone ?? null,
    summary: [
      `Onboarding from ${email}`,
      body.industry ? `Industry: ${body.industry}` : null,
      body.channels?.length ? `Channels: ${body.channels.join(", ")}` : null,
      body.goals ? `Goals: ${body.goals}` : null,
      body.planId ? `Plan: ${body.planId}` : null,
      body.stripeSessionId ? `Stripe session: ${body.stripeSessionId}` : null,
      body.domainInfrastructureAck ? "Domain management acknowledgement: accepted" : null,
    ]
      .filter(Boolean)
      .join("\n"),
    status: "new",
  });

  return NextResponse.json({
    ok: true,
    mode: "saved",
    tenant,
  });
}
