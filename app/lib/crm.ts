/** DOS CRM lead sources — stored as snake_case in Supabase */
export const CRM_LEAD_SOURCES = [
  "walk_in",
  "cold_call",
  "flyer",
  "referral",
  "website",
  "other",
] as const;
export type CrmLeadSource = (typeof CRM_LEAD_SOURCES)[number];

export const CRM_LEAD_SOURCE_LABELS: Record<CrmLeadSource, string> = {
  walk_in: "Walk-in",
  cold_call: "Cold call",
  flyer: "Flyer",
  referral: "Referral",
  website: "Website",
  other: "Other",
};

/** CRM pipeline statuses */
export const CRM_LEAD_STATUSES = [
  "new",
  "contacted",
  "demo_booked",
  "proposal_sent",
  "won",
  "lost",
  "follow_up_later",
] as const;
export type CrmLeadStatus = (typeof CRM_LEAD_STATUSES)[number];

export const CRM_LEAD_STATUS_LABELS: Record<CrmLeadStatus, string> = {
  new: "New",
  contacted: "Contacted",
  demo_booked: "Demo Booked",
  proposal_sent: "Proposal Sent",
  won: "Won",
  lost: "Lost",
  follow_up_later: "Follow Up Later",
};

/** Product interest checkboxes */
export const CRM_INTEREST_OPTIONS = [
  { id: "website_rebuild", label: "Website Rebuild" },
  { id: "new_website", label: "New Website" },
  { id: "hosting", label: "Hosting" },
  { id: "micah_ai", label: "Micah AI Receptionist" },
  { id: "full_dos_package", label: "Full DOS Package" },
] as const;
export type CrmInterestId = (typeof CRM_INTEREST_OPTIONS)[number]["id"];
