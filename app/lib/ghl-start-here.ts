import "server-only";

const GHL_API_BASE_URL = "https://services.leadconnectorhq.com";
const GHL_API_VERSION = "v3";
export const START_HERE_TAG = "DOS — Start Here Submitted";
const DEFAULT_LEAD_SOURCE_TAG = "DOS — Lead Source — Start Here";

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
  pipelineId?: string;
  pipelineStageId?: string;
  leadSourceTag: string;
  customFieldMap: Partial<Record<StartHereCustomField, string>>;
};

type GhlContactResponse = {
  contact?: {
    id?: string;
    tags?: string[];
  };
};

type GhlOpportunitySearchResponse = {
  opportunities?: Array<{
    id?: string;
    contactId?: string;
    pipelineId?: string;
  }>;
};

type GhlTagsResponse = {
  tags?: string[];
};

type GhlErrorPayload = {
  error?: string;
  message?: string | string[];
};

export class GhlIntegrationError extends Error {
  constructor(
    message: string,
    readonly step: "contact" | "notes" | "tags" | "opportunity",
    readonly status?: number
  ) {
    super(message);
    this.name = "GhlIntegrationError";
  }
}

function cleanEnv(name: string): string {
  return process.env[name]?.trim() ?? "";
}

function parseCustomFieldMap(
  raw: string
): Partial<Record<StartHereCustomField, string>> {
  if (!raw) return {};

  try {
    const parsed = JSON.parse(raw) as Record<string, unknown>;
    return Object.fromEntries(
      START_HERE_CUSTOM_FIELDS.flatMap((field) => {
        const value = parsed[field];
        return typeof value === "string" && value.trim()
          ? [[field, value.trim()]]
          : [];
      })
    );
  } catch {
    return {};
  }
}

export function getGhlStartHereConfig(): GhlConfig | null {
  const token = cleanEnv("GHL_PRIVATE_INTEGRATION_TOKEN");
  const locationId = cleanEnv("GHL_LOCATION_ID");
  const pipelineId = cleanEnv("GHL_DOS_PIPELINE_ID");
  const pipelineStageId = cleanEnv("GHL_DOS_PIPELINE_STAGE_ID");

  if (!token || !locationId) {
    return null;
  }

  return {
    token,
    locationId,
    ...(pipelineId && pipelineStageId ? { pipelineId, pipelineStageId } : {}),
    leadSourceTag:
      cleanEnv("GHL_START_HERE_LEAD_SOURCE_TAG") || DEFAULT_LEAD_SOURCE_TAG,
    customFieldMap: parseCustomFieldMap(
      cleanEnv("GHL_START_HERE_CUSTOM_FIELD_MAP")
    ),
  };
}

function splitContactName(name: string): {
  firstName: string;
  lastName?: string;
} {
  const [firstName, ...rest] = name.trim().split(/\s+/);
  const lastName = rest.join(" ");
  return { firstName, ...(lastName ? { lastName } : {}) };
}

async function ghlRequest<T>(
  config: GhlConfig,
  path: string,
  body: unknown,
  step: GhlIntegrationError["step"],
  method: "DELETE" | "POST" | "PUT" = "POST"
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
    throw new GhlIntegrationError(`HighLevel ${step} ${reason}.`, step);
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
      `HighLevel ${step} failed${upstreamMessage ? `: ${upstreamMessage}` : "."}`,
      step,
      response.status
    );
  }

  return (payload ?? {}) as T;
}

function customFields(
  submission: StartHereSubmission,
  fieldMap: Partial<Record<StartHereCustomField, string>>
) {
  return START_HERE_CUSTOM_FIELDS.flatMap((field) => {
    const id = fieldMap[field];
    return id && submission[field]
      ? [{ id, fieldValue: submission[field] }]
      : [];
  });
}

function includesTag(tags: string[] | undefined, expectedTag: string): boolean {
  const normalizedExpected = expectedTag.trim().toLocaleLowerCase("en-AU");
  return (
    tags?.some(
      (tag) => tag.trim().toLocaleLowerCase("en-AU") === normalizedExpected
    ) ?? false
  );
}

function submissionNote(submission: StartHereSubmission): string {
  return [
    "DOS Start Here submission",
    `Business name: ${submission.businessName}`,
    `Contact name: ${submission.contactName}`,
    `Email: ${submission.email}`,
    `Mobile: ${submission.mobile}`,
    `Business type: ${submission.businessType}`,
    `Website URL: ${submission.websiteUrl || "Not supplied"}`,
    `Main challenge: ${submission.mainChallenge}`,
    `Where enquiries come from: ${submission.enquirySources}`,
    `What gets missed: ${submission.missedMostOften}`,
    `Workflow/admin pain point: ${submission.workflowPainPoint}`,
    `What DOS should fix first: ${submission.firstFix}`,
    `Best time to call: ${submission.bestTimeToCall}`,
    `Source page: ${submission.sourcePage}`,
    `Project context: ${submission.projectContext}`,
  ].join("\n\n");
}

function splitNoteBody(body: string, maxLength = 4_800): string[] {
  const chunks: string[] = [];
  let remaining = body;

  while (remaining.length > maxLength) {
    const candidate = remaining.slice(0, maxLength);
    const splitAt = Math.max(
      candidate.lastIndexOf("\n\n"),
      candidate.lastIndexOf("\n")
    );
    const end = splitAt > maxLength / 2 ? splitAt : maxLength;
    chunks.push(remaining.slice(0, end));
    remaining = remaining.slice(end).replace(/^\s+/, "");
  }

  if (remaining) chunks.push(remaining);
  return chunks;
}

async function createSubmissionNotes(
  submission: StartHereSubmission,
  config: GhlConfig,
  contactId: string
): Promise<void> {
  const chunks = splitNoteBody(submissionNote(submission));

  for (const [index, body] of chunks.entries()) {
    await ghlRequest(
      config,
      `/contacts/${encodeURIComponent(contactId)}/notes`,
      {
        body:
          chunks.length > 1
            ? `Start Here submission (${index + 1}/${chunks.length})\n\n${body}`
            : body,
      },
      "notes"
    );
  }
}

async function syncOpportunity(
  submission: StartHereSubmission,
  config: GhlConfig,
  contactId: string
): Promise<void> {
  if (!config.pipelineId || !config.pipelineStageId) return;

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
      opportunity.contactId === contactId &&
      opportunity.pipelineId === config.pipelineId
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

export async function sendStartHereToGhl(
  submission: StartHereSubmission,
  config: GhlConfig
): Promise<void> {
  const names = splitContactName(submission.contactName);
  const mappedCustomFields = customFields(submission, config.customFieldMap);
  const contactBody = {
    ...names,
    name: submission.contactName,
    email: submission.email,
    phone: submission.mobile,
    companyName: submission.businessName,
    website: submission.websiteUrl || undefined,
    locationId: config.locationId,
    source: "DOS Start Here",
    createNewIfDuplicateAllowed: false,
  };

  let contactResult: GhlContactResponse;
  try {
    contactResult = await ghlRequest<GhlContactResponse>(
      config,
      "/contacts/upsert",
      {
        ...contactBody,
        ...(mappedCustomFields.length
          ? { customFields: mappedCustomFields }
          : {}),
      },
      "contact"
    );
  } catch (error) {
    const canRetryWithoutCustomFields =
      mappedCustomFields.length > 0 &&
      error instanceof GhlIntegrationError &&
      (error.status === 400 || error.status === 422);
    if (!canRetryWithoutCustomFields) throw error;

    console.warn(
      "[start-here] HighLevel rejected one or more custom fields; retrying the contact upsert with standard fields."
    );
    contactResult = await ghlRequest<GhlContactResponse>(
      config,
      "/contacts/upsert",
      contactBody,
      "contact"
    );
  }

  const contactId = contactResult.contact?.id;
  if (!contactId) {
    throw new GhlIntegrationError(
      "HighLevel contact response did not include a contact ID.",
      "contact"
    );
  }

  await createSubmissionNotes(submission, config, contactId);

  try {
    await syncOpportunity(submission, config, contactId);
  } catch (error) {
    console.error(
      "[start-here] HighLevel opportunity sync failed after the contact was saved.",
      error
    );
  }

  const leadSourceTagResult = await ghlRequest<GhlTagsResponse>(
    config,
    `/contacts/${encodeURIComponent(contactId)}/tags`,
    {
      tags: [config.leadSourceTag],
    },
    "tags"
  );

  if (!includesTag(leadSourceTagResult.tags, config.leadSourceTag)) {
    throw new GhlIntegrationError(
      "HighLevel did not confirm the Start Here lead-source tag.",
      "tags"
    );
  }

  const removalResult = await ghlRequest<GhlTagsResponse>(
    config,
    `/contacts/${encodeURIComponent(contactId)}/tags`,
    {
      tags: [START_HERE_TAG],
    },
    "tags",
    "DELETE"
  );

  if (!removalResult.tags || includesTag(removalResult.tags, START_HERE_TAG)) {
    throw new GhlIntegrationError(
      "HighLevel did not confirm removal of the previous Start Here trigger tag.",
      "tags"
    );
  }

  const triggerTagResult = await ghlRequest<GhlTagsResponse>(
    config,
    `/contacts/${encodeURIComponent(contactId)}/tags`,
    {
      tags: [START_HERE_TAG],
    },
    "tags"
  );

  if (!includesTag(triggerTagResult.tags, START_HERE_TAG)) {
    throw new GhlIntegrationError(
      "HighLevel did not confirm the required Start Here tag.",
      "tags"
    );
  }
}
