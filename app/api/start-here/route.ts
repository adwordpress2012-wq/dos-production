import { NextResponse, type NextRequest } from "next/server";
import {
  getGhlStartHereConfig,
  sendStartHereToGhl,
  type StartHereSubmission,
} from "@/app/lib/ghl-start-here";
import {
  START_HERE_SUCCESS_COOKIE,
  START_HERE_SUCCESS_MAX_AGE_SECONDS,
  START_HERE_SUCCESS_VALUE,
} from "@/app/lib/start-here-success";

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
  if (!ghlConfig) {
    console.error(
      "[start-here] HighLevel handoff is unavailable because the private token or location is not configured."
    );
    return NextResponse.json(
      {
        ok: false,
        error:
          "We could not send your request right now. Your answers are still here, so please try again in a moment.",
      },
      { status: 503 }
    );
  }

  try {
    await sendStartHereToGhl(validated.data, ghlConfig);
    const response = NextResponse.json({ ok: true });
    response.cookies.set({
      name: START_HERE_SUCCESS_COOKIE,
      value: START_HERE_SUCCESS_VALUE,
      httpOnly: true,
      maxAge: START_HERE_SUCCESS_MAX_AGE_SECONDS,
      path: "/start-here/thank-you",
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
    });
    return response;
  } catch (error) {
    console.error("[start-here] HighLevel contact or tag handoff failed.", error);
  }

  return NextResponse.json(
    {
      ok: false,
      error:
        "We could not send your request right now. Your answers are still here, so please try again in a moment.",
    },
    { status: 502 }
  );
}
