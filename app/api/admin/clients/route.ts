import { NextResponse, type NextRequest } from "next/server";
import { revalidatePath } from "next/cache";
import { getSupabaseAdmin } from "@/app/lib/supabase";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const ALLOWED_STATUS = new Set(["active", "inactive", "pending", "archived"]);

type Body = {
  business_name?: string;
  email?: string;
  phone?: string;
  status?: string;
  /** When true, profile appears on /admin/clients (paying customers). Default false. */
  is_paying_customer?: boolean;
};

function slugify(s: string): string {
  return s
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 48);
}

export async function POST(req: NextRequest) {
  let body: Body = {};
  try {
    body = (await req.json()) as Body;
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const business_name = body.business_name?.trim();
  const email = body.email?.trim();
  const phone = body.phone?.trim() || null;
  const rawStatus = body.status?.trim() ?? "active";
  const status = ALLOWED_STATUS.has(rawStatus) ? rawStatus : "active";
  const is_paying_customer = body.is_paying_customer === true;

  if (!business_name || !email) {
    return NextResponse.json(
      { error: "Business name and email are required." },
      { status: 400 }
    );
  }

  const supabase = getSupabaseAdmin();
  if (!supabase) {
    return NextResponse.json(
      {
        error:
          "Supabase admin client not configured. Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY (server-side on Vercel).",
      },
      { status: 503 }
    );
  }

  const base = slugify(business_name) || "client";

  let lastError: { message: string; code?: string; details?: string | null; hint?: string | null } | null =
    null;

  for (let attempt = 0; attempt < 6; attempt++) {
    const client_id = `${base}-${Math.random().toString(36).slice(2, 10)}`;
    const { data, error } = await supabase
      .from("business_profiles")
      .insert({
        client_id,
        business_name,
        email,
        phone,
        status,
        is_paying_customer,
      })
      .select("id, client_id, business_name, email, phone, status, created_at, is_paying_customer")
      .single();

    if (!error && data) {
      revalidatePath("/admin/clients");
      return NextResponse.json({ ok: true, profile: data });
    }

    lastError = error;
    if (error?.code !== "23505") {
      break;
    }
  }

  const msg = lastError?.message ?? "Insert failed.";
  return NextResponse.json(
    {
      error: msg,
      code: lastError?.code,
      details: lastError?.details,
      hint: lastError?.hint,
    },
    { status: 500 }
  );
}
