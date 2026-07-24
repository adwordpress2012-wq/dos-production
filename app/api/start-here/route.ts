import { NextResponse, type NextRequest } from "next/server";
import {
  getGhlStartHereConfig,
  sendStartHereToGhl,
  type StartHereSubmission,
} from "@/app/lib/ghl-start-here";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX_BODY_BYTES = 50_000;
const MAX_SHORT_LENGTH = 300;
const MAX_LONG_LENGTH = 4_000;

type IncomingSubmission = Partial<StartHereSubmission>;

function stringValue(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function validateSubmission(
  body: IncomingSubmission
): { data: StartHereSubmission } | { error: string } {
  const data: StartHereSubmission = {
    businessName: stringValue(body.businessName),
    contactName: stringValue(body.contactName),
    email: stringValue(body.email).toLowerCase(),
    mobile: stringValue(body.mobile),
    businessType: stringValue(body.businessType),
    websiteUrl: stringValue(body.websiteUrl),
    mainChallenge: stringValue(body.mainChallenge),
    enquirySources: stringValue(body.enquirySources),
    missedMostOften: stringValue(body.missedMostOften),
    workflowPainPoint: stringValue(body.workflowPainPoint),
    firstFix: stringValue(body.firstFix),
    bestTimeToCall: stringValue(body.bestTimeToCall),
    sourcePage: stringValue(body.sourcePage) || "directiveos.com.au/start-here",
    projectContext: stringValue(body.projectContext) || "DOS Operational Discovery",
  };

  const requiredFields: Array<keyof StartHereSubmission> = [
    "businessName",
    "contactName",
    "email",
    "mobile",
    "businessType",
    "mainChallenge",
    "enquirySources",
    "missedMostOften",
    "workflowPainPoint",
    "firstFix",
    "bestTimeToCall",
  ];
  if (requiredFields.some((field) => !data[field])) {
    return { error: "Please complete every required field and try again." };
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    return { error: "Please enter a valid email address." };
  }

  if (data.websiteUrl) {
    try {
      const website = new URL(data.websiteUrl);
      if (website.protocol !== "http:" && website.protocol !== "https:") {
        return { error: "Please enter a valid website URL." };
      }
    } catch {
      return { error: "Please enter a valid website URL." };
    }
  }

  const shortFields: Array<keyof StartHereSubmission> = [
    "businessName",
    "contactName",
    "email",
    "mobile",
    "businessType",
    "websiteUrl",
    "sourcePage",
    "projectContext",
  ];
  if (shortFields.some((field) => data[field].length > MAX_SHORT_LENGTH)) {
    return { error: "One of the short answers is too long. Please shorten it and try again." };
  }

  const longFields: Array<keyof StartHereSubmission> = [
    "mainChallenge",
    "enquirySources",
    "missedMostOften",
    "workflowPainPoint",
    "firstFix",
    "bestTimeToCall",
  ];
  if (longFields.some((field) => data[field].length > MAX_LONG_LENGTH)) {
    return { error: "One of the detailed answers is too long. Please shorten it and try again." };
  }

  return { data };
}

function isAllowedRequest(req: NextRequest): boolean {
  if (req.headers.get("sec-fetch-site") === "cross-site") return false;

  const origin = req.headers.get("origin");
  if (!origin) return true;

  try {
    return new URL(origin).host === new URL(req.url).host;
  } catch {
    return false;
  }
}

function getFormspreeAction(): string | null {
  const raw =
    process.env.FORMSPREE_CONTACT_ACTION?.trim() ||
    process.env.NEXT_PUBLIC_FORMSPREE_CONTACT_ACTION?.trim();
  if (!raw) return null;

  try {
    const url = new URL(raw);
    if (
      url.protocol === "https:" &&
      url.hostname === "formspree.io" &&
      /^\/f\/[^/]+\/?$/i.test(url.pathname)
    ) {
      return url.toString();
    }
  } catch {
    // Invalid fallback configuration is treated as unavailable.
  }

  return null;
}

async function sendToFormspree(submission: StartHereSubmission): Promise<boolean> {
  const action = getFormspreeAction();
  if (!action) return false;

  const formData = new FormData();
  formData.append("Business name", submission.businessName);
  formData.append("Contact name", submission.contactName);
  formData.append("Email", submission.email);
  formData.append("Mobile", submission.mobile);
  formData.append("Business type", submission.businessType);
  formData.append("Website URL", submission.websiteUrl);
  formData.append("Main challenge", submission.mainChallenge);
  formData.append("Where enquiries come from", submission.enquirySources);
  formData.append("What gets missed", submission.missedMostOften);
  formData.append("Workflow/admin pain point", submission.workflowPainPoint);
  formData.append("What DOS should fix first", submission.firstFix);
  formData.append("Best time to call", submission.bestTimeToCall);
  formData.append("form_type", "Operational Discovery Form");
  formData.append("source_page", submission.sourcePage);
  formData.append("project_context", submission.projectContext);

  try {
    const response = await fetch(action, {
      method: "POST",
      body: formData,
      headers: { Accept: "application/json" },
      cache: "no-store",
      signal: AbortSignal.timeout(12_000),
    });
    return response.ok;
  } catch {
    return false;
  }
}

export async function POST(req: NextRequest) {
  if (!isAllowedRequest(req)) {
    return NextResponse.json({ ok: false, error: "Request origin is not allowed." }, { status: 403 });
  }

  const declaredLength = Number(req.headers.get("content-length") || 0);
  if (declaredLength > MAX_BODY_BYTES) {
    return NextResponse.json({ ok: false, error: "Submission is too large." }, { status: 413 });
  }

  let rawBody: string;
  try {
    rawBody = await req.text();
  } catch {
    return NextResponse.json({ ok: false, error: "Could not read the submission." }, { status: 400 });
  }
  if (Buffer.byteLength(rawBody, "utf8") > MAX_BODY_BYTES) {
    return NextResponse.json({ ok: false, error: "Submission is too large." }, { status: 413 });
  }

  let body: IncomingSubmission;
  try {
    body = JSON.parse(rawBody) as IncomingSubmission;
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid submission." }, { status: 400 });
  }

  const validated = validateSubmission(body);
  if ("error" in validated) {
    return NextResponse.json({ ok: false, error: validated.error }, { status: 400 });
  }

  const ghlConfig = getGhlStartHereConfig();
  if (ghlConfig) {
    try {
      await sendStartHereToGhl(validated.data, ghlConfig);
      return NextResponse.json({ ok: true });
    } catch (error) {
      console.error("[start-here] GHL submission failed; trying fallback.", error);
    }
  } else {
    console.warn("[start-here] GHL is not fully configured; using fallback.");
  }

  if (await sendToFormspree(validated.data)) {
    return NextResponse.json({ ok: true });
  }

  return NextResponse.json(
    {
      ok: false,
      error:
        "We could not send your request right now. Please try again, call 0485 071 000, or email hello@directiveos.com.au.",
    },
    { status: 502 }
  );
}

