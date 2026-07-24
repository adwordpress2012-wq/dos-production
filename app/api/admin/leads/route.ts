import { NextResponse, type NextRequest } from "next/server";
import { revalidatePath } from "next/cache";
import { requireInternalApiAuth } from "@/app/lib/internal-access";
import { getSupabaseAdmin } from "@/app/lib/supabase";
import {
  CRM_INTEREST_OPTIONS,
  CRM_LEAD_SOURCES,
  CRM_LEAD_STATUSES,
  type CrmLeadSource,
  type CrmLeadStatus,
} from "@/app/lib/crm";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const SOURCE_SET = new Set<string>(CRM_LEAD_SOURCES);
const STATUS_SET = new Set<string>(CRM_LEAD_STATUSES);
const INTEREST_IDS = new Set<string>(CRM_INTEREST_OPTIONS.map((o) => o.id));

type Body = {
  business_name?: string;
  contact_person?: string;
  phone?: string;
  email?: string;
  website_url?: string;
  business_type?: string;
  source?: string;
  interested_in?: string[];
  status?: string;
  next_follow_up_date?: string | null;
  notes?: string;
};

const LEAD_COLUMNS =
  "id, business_name, contact_person, phone, email, website_url, business_type, source, interested_in, status, next_follow_up_date, notes, converted_client_id, created_at, updated_at" as const;

function uncaughtErrorPayload(err: unknown) {
  const message = err instanceof Error ? err.message : String(err);
  let cause: string | undefined;
  if (err instanceof Error && err.cause instanceof Error) {
    cause = err.cause.message;
  }
  return { error: message, ...(cause ? { cause } : {}) };
}

export async function GET(req: NextRequest) {
  const unauthorized = requireInternalApiAuth(req);
  if (unauthorized) return unauthorized;

  try {
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

    const { data, error } = await supabase.from("leads").select(LEAD_COLUMNS).order("created_at", { ascending: false });

    if (error) {
      return NextResponse.json(
        {
          error: error.message,
          code: error.code,
          details: error.details,
          hint: error.hint,
        },
        { status: 500 }
      );
    }

    return NextResponse.json({ leads: data ?? [] });
  } catch (err) {
    console.error("[GET /api/admin/leads]", err);
    return NextResponse.json(uncaughtErrorPayload(err), { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const unauthorized = requireInternalApiAuth(req);
  if (unauthorized) return unauthorized;

  let body: Body = {};
  try {
    body = (await req.json()) as Body;
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const business_name = body.business_name?.trim();
  const contact_person = body.contact_person?.trim();
  const email = body.email?.trim();
  const phone = body.phone?.trim() || null;
  const website_url = body.website_url?.trim() || null;
  const business_type = body.business_type?.trim() || null;
  const rawSource = body.source?.trim() ?? "other";
  const rawStatus = body.status?.trim() ?? "new";
  const notes = body.notes?.trim() || null;

  if (!business_name || !contact_person || !email) {
    return NextResponse.json(
      { error: "Business name, contact person, and email are required." },
      { status: 400 }
    );
  }

  if (!SOURCE_SET.has(rawSource)) {
    return NextResponse.json({ error: `Invalid source: ${rawSource}` }, { status: 400 });
  }
  if (!STATUS_SET.has(rawStatus)) {
    return NextResponse.json({ error: `Invalid status: ${rawStatus}` }, { status: 400 });
  }

  const interested = Array.isArray(body.interested_in)
    ? body.interested_in.filter((id): id is string => typeof id === "string" && INTEREST_IDS.has(id))
    : [];

  let next_follow_up_date: string | null = null;
  if (body.next_follow_up_date && String(body.next_follow_up_date).trim()) {
    const d = String(body.next_follow_up_date).slice(0, 10);
    if (!/^\d{4}-\d{2}-\d{2}$/.test(d)) {
      return NextResponse.json({ error: "Invalid next_follow_up_date (use YYYY-MM-DD)." }, { status: 400 });
    }
    next_follow_up_date = d;
  }

  try {
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

    const { data, error } = await supabase
      .from("leads")
      .insert({
        business_name,
        contact_person,
        email,
        phone,
        website_url,
        business_type,
        source: rawSource as CrmLeadSource,
        interested_in: interested,
        status: rawStatus as CrmLeadStatus,
        next_follow_up_date,
        notes,
      })
      .select(LEAD_COLUMNS)
      .single();

    if (error) {
      return NextResponse.json(
        {
          error: error.message,
          code: error.code,
          details: error.details,
          hint: error.hint,
        },
        { status: 500 }
      );
    }

    revalidatePath("/admin/leads");
    revalidatePath("/command-centre");

    return NextResponse.json({ ok: true, lead: data });
  } catch (err) {
    console.error("[POST /api/admin/leads]", err);
    return NextResponse.json(uncaughtErrorPayload(err), { status: 500 });
  }
}
