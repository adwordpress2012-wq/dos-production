import { NextResponse, type NextRequest } from "next/server";
import { revalidatePath } from "next/cache";
import { getSupabaseAdmin } from "@/app/lib/supabase";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function slugify(s: string): string {
  return s
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 48);
}

type Params = { params: Promise<{ id: string }> };

export async function POST(_req: NextRequest, context: Params) {
  const { id: leadId } = await context.params;
  if (!leadId) {
    return NextResponse.json({ error: "Missing lead id." }, { status: 400 });
  }

  const supabase = getSupabaseAdmin();
  if (!supabase) {
    return NextResponse.json(
      {
        error:
          "Supabase admin client not configured. Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY or SERVICE_ROLE_KEY.",
      },
      { status: 503 }
    );
  }

  const { data: lead, error: leadErr } = await supabase
    .from("leads")
    .select(
      "id, business_name, contact_person, phone, email, status, converted_client_id, notes"
    )
    .eq("id", leadId)
    .single();

  if (leadErr || !lead) {
    return NextResponse.json({ error: leadErr?.message ?? "Lead not found." }, { status: 404 });
  }

  if (lead.converted_client_id) {
    return NextResponse.json(
      { error: "Lead already converted.", profile_id: lead.converted_client_id },
      { status: 409 }
    );
  }

  const base = slugify(lead.business_name) || "client";

  let profile: {
    id: string;
    client_id: string;
    business_name: string;
    email: string;
    phone: string | null;
    is_paying_customer: boolean;
  } | null = null;

  let lastErr: { message: string; code?: string } | null = null;

  for (let attempt = 0; attempt < 6; attempt++) {
    const client_id = `${base}-${Math.random().toString(36).slice(2, 10)}`;
    const { data, error } = await supabase
      .from("business_profiles")
      .insert({
        client_id,
        business_name: lead.business_name,
        email: lead.email,
        phone: lead.phone,
        status: "active",
        is_paying_customer: true,
      })
      .select("id, client_id, business_name, email, phone, is_paying_customer")
      .single();

    if (!error && data) {
      profile = data;
      break;
    }
    lastErr = error;
    if (error?.code !== "23505") break;
  }

  if (!profile) {
    return NextResponse.json(
      { error: lastErr?.message ?? "Could not create client profile." },
      { status: 500 }
    );
  }

  const { error: updLeadErr } = await supabase
    .from("leads")
    .update({
      status: "won",
      converted_client_id: profile.id,
    })
    .eq("id", leadId);

  if (updLeadErr) {
    return NextResponse.json(
      {
        error: `Client created but failed to update lead: ${updLeadErr.message}`,
        profile,
      },
      { status: 500 }
    );
  }

  revalidatePath("/admin/leads");
  revalidatePath("/admin/clients");

  return NextResponse.json({
    ok: true,
    profile,
    lead_id: leadId,
  });
}
