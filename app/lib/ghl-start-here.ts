import "server-only";

const GHL_API_BASE_URL = "https://services.leadconnectorhq.com";
const GHL_API_VERSION = "v3";
const START_HERE_TAG = "DOS - Start Here Submitted";
const DEFAULT_LEAD_SOURCE_TAG = "DOS - Lead Source - Start Here";

export const START_HERE_CUSTOM_FIELDS = [
  "businessType",
  "mainChallenge",
  "enquirySources",
  "missedMostOften",
  "workflowPainPoint",
  "firstFix",
  "bestTimeToCall",
  "sourcePage",
  "projectContext",
] as const;

type StartHereCustomField = (typeof START_HERE_CUSTOM_FIELDS)[number];

export type StartHereSubmission = {
  businessName: string;
  contactName: string;
  email: string;
  mobile: string;
  businessType: string;
  websiteUrl: string;
  mainChallenge: string;
  enquirySources: string;
  missedMostOften: string;
  workflowPainPoint: string;
  firstFix: string;
  bestTimeToCall: string;
  sourcePage: string;
  projectContext: string;
};

type GhlConfig = {
  token: string;
  locationId: string;
  pipelineId: string;
  pipelineStageId: string;
  leadSourceTag: string;
  customFieldMap: Record<StartHereCustomField, string>;
};

type GhlContactResponse = {
  contact?: {
    id?: string;
  };
};

type GhlOpportunitySearchResponse = {
  opportunities?: Array<{
    id?: string;
    contactId?: string;
    pipelineId?: string;
  }>;
};

type GhlErrorPayload = {
  error?: string;
  message?: string | string[];
};

export class GhlIntegrationError extends Error {
  constructor(
    message: string,
    readonly step: "contact" | "tags" | "opportunity",
    readonly status?: number
  ) {
    super(message);
    this.name = "GhlIntegrationError";
  }
}

function cleanEnv(name: string): string {
  return process.env[name]?.trim() ?? "";
}

function parseCustomFieldMap(raw: string): Record<StartHereCustomField, string> | null {
  if (!raw) return null;

  try {
    const parsed = JSON.parse(raw) as Record<string, unknown>;
    const entries = START_HERE_CUSTOM_FIELDS.map((field) => {
      const value = parsed[field];
      return [field, typeof value === "string" ? value.trim() : ""] as const;
    });

    if (entries.some(([, value]) => !value)) return null;
    return Object.fromEntries(entries) as Record<StartHereCustomField, string>;
  } catch {
    return null;
  }
}

export function getGhlStartHereConfig(): GhlConfig | null {
  const token = cleanEnv("GHL_PRIVATE_INTEGRATION_TOKEN");
  const locationId = cleanEnv("GHL_LOCATION_ID");
  const pipelineId = cleanEnv("GHL_DOS_PIPELINE_ID");
  const pipelineStageId = cleanEnv("GHL_DOS_PIPELINE_STAGE_ID");
  const customFieldMap = parseCustomFieldMap(cleanEnv("GHL_START_HERE_CUSTOM_FIELD_MAP"));

  if (!token || !locationId || !pipelineId || !pipelineStageId || !customFieldMap) {
    return null;
  }

  return {
    token,
    locationId,
    pipelineId,
    pipelineStageId,
    leadSourceTag:
      cleanEnv("GHL_START_HERE_LEAD_SOURCE_TAG") || DEFAULT_LEAD_SOURCE_TAG,
    customFieldMap,
  };
}

function industryTag(industry: string): string {
  const cleaned = industry.replace(/\s+/g, " ").trim().slice(0, 80);
  return `DOS - Industry - ${cleaned}`;
}

function splitContactName(name: string): { firstName: string; lastName?: string } {
  const [firstName, ...rest] = name.trim().split(/\s+/);
  const lastName = rest.join(" ");
  return { firstName, ...(lastName ? { lastName } : {}) };
}

async function ghlRequest<T>(
  config: GhlConfig,
  path: string,
  body: unknown,
  step: GhlIntegrationError["step"],
  method: "POST" | "PUT" = "POST"
): Promise<T> {
  let response: Response;

  try {
    response = await fetch(`${GHL_API_BASE_URL}${path}`, {
      method,
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${config.token}`,
        "Content-Type": "application/json",
        Version: GHL_API_VERSION,
      },
      body: JSON.stringify(body),
      cache: "no-store",
      signal: AbortSignal.timeout(12_000),
    });
  } catch (error) {
    const reason =
      error instanceof Error && error.name === "TimeoutError"
        ? "request timed out"
        : "network request failed";
    throw new GhlIntegrationError(`GHL ${step} ${reason}.`, step);
  }

  const raw = await response.text();
  let payload: (T & GhlErrorPayload) | null = null;
  try {
    payload = raw ? (JSON.parse(raw) as T & GhlErrorPayload) : null;
  } catch {
    // A non-JSON upstream response is handled as a generic integration error.
  }

  if (!response.ok) {
    const upstreamMessage = Array.isArray(payload?.message)
      ? payload.message.join(" ")
      : payload?.message || payload?.error;
    throw new GhlIntegrationError(
      `GHL ${step} failed${upstreamMessage ? `: ${upstreamMessage}` : "."}`,
      step,
      response.status
    );
  }

  return (payload ?? {}) as T;
}

function customFields(
  submission: StartHereSubmission,
  fieldMap: Record<StartHereCustomField, string>
) {
  return START_HERE_CUSTOM_FIELDS.map((field) => ({
    id: fieldMap[field],
    fieldValue: submission[field],
  }));
}

export async function sendStartHereToGhl(
  submission: StartHereSubmission,
  config: GhlConfig
): Promise<void> {
  const names = splitContactName(submission.contactName);
  const contactResult = await ghlRequest<GhlContactResponse>(
    config,
    "/contacts/upsert",
    {
      ...names,
      name: submission.contactName,
      email: submission.email,
      phone: submission.mobile,
      companyName: submission.businessName,
      website: submission.websiteUrl || undefined,
      locationId: config.locationId,
      source: "DOS Start Here",
      customFields: customFields(submission, config.customFieldMap),
      createNewIfDuplicateAllowed: false,
    },
    "contact"
  );

  const contactId = contactResult.contact?.id;
  if (!contactId) {
    throw new GhlIntegrationError(
      "GHL contact response did not include a contact ID.",
      "contact"
    );
  }

  await ghlRequest(
    config,
    `/contacts/${encodeURIComponent(contactId)}/tags`,
    {
      tags: [START_HERE_TAG, config.leadSourceTag, industryTag(submission.businessType)],
    },
    "tags"
  );

  const opportunityName = `${submission.businessName} - Start Here`;
  const searchResult = await ghlRequest<GhlOpportunitySearchResponse>(
    config,
    "/opportunities/search",
    {
      locationId: config.locationId,
      query: submission.email.slice(0, 75),
      limit: 20,
      page: 0,
      searchAfter: [],
      additionalDetails: {
        notes: false,
        tasks: false,
        calendarEvents: false,
      },
    },
    "opportunity"
  );
  const existingOpportunity = searchResult.opportunities?.find(
    (opportunity) =>
      opportunity.contactId === contactId && opportunity.pipelineId === config.pipelineId
  );

  if (existingOpportunity?.id) {
    await ghlRequest(
      config,
      `/opportunities/${encodeURIComponent(existingOpportunity.id)}`,
      {
        pipelineId: config.pipelineId,
        pipelineStageId: config.pipelineStageId,
        name: opportunityName,
        status: "open",
      },
      "opportunity",
      "PUT"
    );
    return;
  }

  await ghlRequest(
    config,
    "/opportunities/",
    {
      pipelineId: config.pipelineId,
      pipelineStageId: config.pipelineStageId,
      locationId: config.locationId,
      contactId,
      name: opportunityName,
      status: "open",
    },
    "opportunity"
  );
}
