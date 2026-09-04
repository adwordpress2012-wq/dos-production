export type ModuleId =
  | "scw"
  | "sba"
  | "scp"
  | "wc"
  | "srw"
  | "reputation"
  | "arc"
  | "era"
  | "cpa"
  | "flr"
  | "soos";

export type PriceMode = "fixed" | "from" | "custom";

export type ModuleDefinition = {
  id: ModuleId;
  acronym: string;
  name: string;
  businessOutcome: string;
  defaultSetup: number | null;
  defaultMRR: number | null;
  setupMode: PriceMode;
  mrrMode: PriceMode;
  usageApplicable: boolean;
  minimumSetup: number | null;
  minimumMRR: number | null;
  manualOverrideAllowed: true;
};

export type DmtTierId = "none" | "basic" | "core" | "standard" | "plus" | "custom";

export const pricingConfig = {
  modules: [
    {
      id: "scw",
      acronym: "SCW",
      name: "Smart Chat Widget",
      businessOutcome: "Capture, qualify and route website enquiries 24/7.",
      defaultSetup: 1497,
      defaultMRR: 297,
      setupMode: "fixed",
      mrrMode: "fixed",
      usageApplicable: false,
      minimumSetup: null,
      minimumMRR: null,
      manualOverrideAllowed: true,
    },
    {
      id: "sba",
      acronym: "SBA",
      name: "Smart Business Assistant",
      businessOutcome: "Voice AI enquiry handling, qualification and human handover.",
      defaultSetup: 1997,
      defaultMRR: 497,
      setupMode: "fixed",
      mrrMode: "fixed",
      usageApplicable: true,
      minimumSetup: null,
      minimumMRR: null,
      manualOverrideAllowed: true,
    },
    {
      id: "scp",
      acronym: "SCP",
      name: "Smart Connect Phone",
      businessOutcome: "Managed phone and SMS routing with missed-enquiry recovery.",
      defaultSetup: 997,
      defaultMRR: 297,
      setupMode: "fixed",
      mrrMode: "fixed",
      usageApplicable: true,
      minimumSetup: null,
      minimumMRR: null,
      manualOverrideAllowed: true,
    },
    {
      id: "wc",
      acronym: "WC",
      name: "Web Call",
      businessOutcome: "Connect website visitors quickly with the business.",
      defaultSetup: 997,
      defaultMRR: 147,
      setupMode: "fixed",
      mrrMode: "fixed",
      usageApplicable: false,
      minimumSetup: null,
      minimumMRR: null,
      manualOverrideAllowed: true,
    },
    {
      id: "srw",
      acronym: "SRW",
      name: "Smart Revenue Website",
      businessOutcome: "Turn the website into a structured revenue and enquiry system.",
      defaultSetup: 3997,
      defaultMRR: 397,
      setupMode: "from",
      mrrMode: "from",
      usageApplicable: false,
      minimumSetup: 3997,
      minimumMRR: 397,
      manualOverrideAllowed: true,
    },
    {
      id: "reputation",
      acronym: "REPUTATION",
      name: "Reputation",
      businessOutcome: "Build a repeatable review and reputation workflow.",
      defaultSetup: 997,
      defaultMRR: 297,
      setupMode: "fixed",
      mrrMode: "fixed",
      usageApplicable: false,
      minimumSetup: null,
      minimumMRR: null,
      manualOverrideAllowed: true,
    },
    {
      id: "arc",
      acronym: "ARC",
      name: "Accounts Receivable Control",
      businessOutcome: "Systemise overdue account follow-up and payment visibility.",
      defaultSetup: 1497,
      defaultMRR: 397,
      setupMode: "from",
      mrrMode: "from",
      usageApplicable: false,
      minimumSetup: 1497,
      minimumMRR: 397,
      manualOverrideAllowed: true,
    },
    {
      id: "era",
      acronym: "ERA",
      name: "Email Response Automation",
      businessOutcome: "Respond, route and follow up on incoming email consistently.",
      defaultSetup: 1497,
      defaultMRR: 297,
      setupMode: "fixed",
      mrrMode: "fixed",
      usageApplicable: false,
      minimumSetup: null,
      minimumMRR: null,
      manualOverrideAllowed: true,
    },
    {
      id: "cpa",
      acronym: "CPA",
      name: "Candidate Placement Accelerator",
      businessOutcome: "Accelerate candidate response, qualification and placement workflows.",
      defaultSetup: 2997,
      defaultMRR: null,
      setupMode: "from",
      mrrMode: "custom",
      usageApplicable: false,
      minimumSetup: 2997,
      minimumMRR: null,
      manualOverrideAllowed: true,
    },
    {
      id: "flr",
      acronym: "FLR",
      name: "Facebook Lead Recovery",
      businessOutcome: "Recover and route Facebook leads before response time erodes value.",
      defaultSetup: 1997,
      defaultMRR: 497,
      setupMode: "fixed",
      mrrMode: "fixed",
      usageApplicable: true,
      minimumSetup: 1997,
      minimumMRR: 497,
      manualOverrideAllowed: true,
    },
    {
      id: "soos",
      acronym: "SOOS",
      name: "SOOS",
      businessOutcome: "Custom DOS operating-system scope requiring commercial review.",
      defaultSetup: null,
      defaultMRR: null,
      setupMode: "custom",
      mrrMode: "custom",
      usageApplicable: false,
      minimumSetup: null,
      minimumMRR: null,
      manualOverrideAllowed: true,
    },
  ] satisfies ModuleDefinition[],
  dmtTiers: [
    { id: "none", name: "No DMT", monthly: 0 },
    { id: "basic", name: "DMT Basic", monthly: 497 },
    { id: "core", name: "DMT Core", monthly: 697 },
    { id: "standard", name: "DMT Standard", monthly: 997 },
    { id: "plus", name: "DMT Plus", monthly: 1247 },
    { id: "custom", name: "Custom DMT", monthly: null },
  ] as const,
  flrLevels: [
    { id: "level-1", name: "Level 1", setup: 1997, monthly: 497 },
    { id: "level-2", name: "Level 2", setup: 2997, monthly: 797 },
    { id: "level-3", name: "Level 3", setup: 3997, monthly: 1297 },
    { id: "level-4", name: "Level 4", setup: 4997, monthly: 1797 },
    { id: "enterprise", name: "Enterprise", setup: 6997, monthly: 2497 },
  ] as const,
  websiteDefaults: {
    baseSetup: 3997,
    baseMRR: 397,
    includedPages: 0,
    additionalPageFee: 0,
    scopeOptions: [
      "Additional Landing Page",
      "Additional Location Page",
      "Additional Service Page",
      "Custom Integration",
      "Copy Migration",
      "Advanced Forms",
    ],
  },
  paymentTerms: {
    commencementPercent: 60,
    balancePercent: 40,
  },
  usageDefaults: {
    label: "Not Included / Additional Usage Applies",
    channels: ["Voice", "SMS", "AI", "Chat"],
  },
  sheltonGuidance: {
    highRevenue: 2_000_000,
    highMonthlyLeads: 100,
    enterpriseTeamSize: 50,
    multiLocationCount: 2,
    routingModuleCount: 4,
  },
} as const;

export const moduleById = Object.fromEntries(
  pricingConfig.modules.map((module) => [module.id, module])
) as Record<ModuleId, ModuleDefinition>;

