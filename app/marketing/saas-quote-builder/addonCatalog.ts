export type PriceKind = "fixed" | "from" | "custom" | "none";

export type CatalogAddonItem = {
  id: string;
  name: string;
  setup: number;
  monthly: number;
  annual: number;
  setupKind: PriceKind;
  monthlyKind: PriceKind;
  annualKind: PriceKind;
  /** Shown under line, e.g. "+ recurring" */
  hint?: string;
};

export type AddonCategory = {
  title: string;
  items: CatalogAddonItem[];
};

export const ADDON_CATEGORIES: AddonCategory[] = [
  {
    title: "Domain + hosting",
    items: [
      { id: "domain-reg", name: "Domain Registration", setup: 0, monthly: 0, annual: 49, setupKind: "none", monthlyKind: "none", annualKind: "fixed" },
      { id: "premium-domain-setup", name: "Premium Domain Setup", setup: 99, monthly: 0, annual: 0, setupKind: "fixed", monthlyKind: "none", annualKind: "none" },
      { id: "dns-migration", name: "DNS Migration", setup: 150, monthly: 0, annual: 0, setupKind: "fixed", monthlyKind: "none", annualKind: "none" },
      { id: "website-migration", name: "Website Migration", setup: 500, monthly: 0, annual: 0, setupKind: "fixed", monthlyKind: "none", annualKind: "none" },
      { id: "hosting-setup", name: "Hosting Setup", setup: 99, monthly: 0, annual: 0, setupKind: "fixed", monthlyKind: "none", annualKind: "none" },
      { id: "managed-hosting", name: "Managed Hosting", setup: 0, monthly: 49, annual: 0, setupKind: "none", monthlyKind: "from", annualKind: "none" },
      { id: "email-hosting-setup", name: "Email Hosting Setup", setup: 150, monthly: 0, annual: 0, setupKind: "fixed", monthlyKind: "none", annualKind: "none" },
      { id: "google-workspace-setup", name: "Google Workspace Setup", setup: 250, monthly: 0, annual: 0, setupKind: "fixed", monthlyKind: "none", annualKind: "none" },
      { id: "microsoft-365-setup", name: "Microsoft 365 Setup", setup: 250, monthly: 0, annual: 0, setupKind: "fixed", monthlyKind: "none", annualKind: "none" },
    ],
  },
  {
    title: "SEO + marketing",
    items: [
      { id: "seo-foundation", name: "SEO Foundation", setup: 600, monthly: 0, annual: 0, setupKind: "fixed", monthlyKind: "none", annualKind: "none" },
      { id: "advanced-seo-setup", name: "Advanced SEO Setup", setup: 2500, monthly: 0, annual: 0, setupKind: "fixed", monthlyKind: "none", annualKind: "none" },
      { id: "monthly-seo-campaign", name: "Monthly SEO Campaign", setup: 0, monthly: 497, annual: 0, setupKind: "none", monthlyKind: "from", annualKind: "none" },
      { id: "ga-setup", name: "Google Analytics Setup", setup: 200, monthly: 0, annual: 0, setupKind: "fixed", monthlyKind: "none", annualKind: "none" },
      { id: "gsc-setup", name: "Google Search Console", setup: 150, monthly: 0, annual: 0, setupKind: "fixed", monthlyKind: "none", annualKind: "none" },
      { id: "meta-pixel-setup", name: "Meta Pixel Setup", setup: 150, monthly: 0, annual: 0, setupKind: "fixed", monthlyKind: "none", annualKind: "none" },
      { id: "conversion-tracking", name: "Conversion Tracking", setup: 300, monthly: 0, annual: 0, setupKind: "fixed", monthlyKind: "none", annualKind: "none" },
      { id: "gbp-optimisation", name: "Google Business Profile Optimisation", setup: 250, monthly: 0, annual: 0, setupKind: "fixed", monthlyKind: "none", annualKind: "none" },
      { id: "local-seo-suburb-pages", name: "Local SEO Suburb Pages", setup: 150, monthly: 0, annual: 0, setupKind: "fixed", monthlyKind: "none", annualKind: "none", hint: "Per page (use quantity)" },
      { id: "blog-content-writing", name: "Blog Content Writing", setup: 180, monthly: 0, annual: 0, setupKind: "fixed", monthlyKind: "none", annualKind: "none", hint: "Per article (use quantity)" },
    ],
  },
  {
    title: "AI + automation",
    items: [
      { id: "micah-ai-receptionist", name: "Micah AI Receptionist", setup: 1800, monthly: 0, annual: 0, setupKind: "fixed", monthlyKind: "none", annualKind: "none", hint: "+ recurring (Micah plan)" },
      { id: "ai-voice-receptionist", name: "AI Voice Receptionist", setup: 3500, monthly: 0, annual: 0, setupKind: "fixed", monthlyKind: "none", annualKind: "none", hint: "+ recurring" },
      { id: "sms-automation", name: "SMS Automation", setup: 500, monthly: 0, annual: 0, setupKind: "fixed", monthlyKind: "none", annualKind: "none" },
      { id: "whatsapp-integration", name: "WhatsApp Integration", setup: 700, monthly: 0, annual: 0, setupKind: "fixed", monthlyKind: "none", annualKind: "none" },
      { id: "ai-lead-qualification", name: "AI Lead Qualification", setup: 900, monthly: 0, annual: 0, setupKind: "fixed", monthlyKind: "none", annualKind: "none" },
      { id: "ai-faq-training", name: "AI FAQ Training", setup: 300, monthly: 0, annual: 0, setupKind: "fixed", monthlyKind: "none", annualKind: "none" },
      { id: "ai-knowledge-base-upload", name: "AI Knowledge Base Upload", setup: 250, monthly: 0, annual: 0, setupKind: "fixed", monthlyKind: "none", annualKind: "none" },
      { id: "email-automation", name: "Email Automation", setup: 400, monthly: 0, annual: 0, setupKind: "fixed", monthlyKind: "none", annualKind: "none" },
      { id: "workflow-automation", name: "Workflow Automation", setup: 800, monthly: 0, annual: 0, setupKind: "from", monthlyKind: "none", annualKind: "none" },
    ],
  },
  {
    title: "CRM + business systems",
    items: [
      { id: "crm-integration", name: "CRM Integration", setup: 1000, monthly: 0, annual: 0, setupKind: "from", monthlyKind: "none", annualKind: "none" },
      { id: "rex-crm-integration", name: "Rex CRM Integration", setup: 900, monthly: 0, annual: 0, setupKind: "fixed", monthlyKind: "none", annualKind: "none" },
      { id: "vaultre-integration", name: "VaultRE Integration", setup: 900, monthly: 0, annual: 0, setupKind: "fixed", monthlyKind: "none", annualKind: "none" },
      { id: "propertyme-integration", name: "PropertyMe Integration", setup: 800, monthly: 0, annual: 0, setupKind: "fixed", monthlyKind: "none", annualKind: "none" },
      { id: "hubspot-integration", name: "Hubspot Integration", setup: 1200, monthly: 0, annual: 0, setupKind: "fixed", monthlyKind: "none", annualKind: "none" },
      { id: "mailchimp-integration", name: "Mailchimp Integration", setup: 350, monthly: 0, annual: 0, setupKind: "fixed", monthlyKind: "none", annualKind: "none" },
      { id: "stripe-integration", name: "Stripe Integration", setup: 500, monthly: 0, annual: 0, setupKind: "fixed", monthlyKind: "none", annualKind: "none" },
      { id: "xero-integration", name: "Xero Integration", setup: 600, monthly: 0, annual: 0, setupKind: "fixed", monthlyKind: "none", annualKind: "none" },
      { id: "api-integration", name: "API Integration", setup: 1200, monthly: 0, annual: 0, setupKind: "from", monthlyKind: "none", annualKind: "none" },
      { id: "custom-dashboard", name: "Custom Dashboard", setup: 2500, monthly: 0, annual: 0, setupKind: "from", monthlyKind: "none", annualKind: "none" },
    ],
  },
  {
    title: "Real estate add-ons",
    items: [
      { id: "rea-listing-feed", name: "REA Listing Feed", setup: 500, monthly: 0, annual: 0, setupKind: "fixed", monthlyKind: "none", annualKind: "none" },
      { id: "domain-listing-feed", name: "Domain Listing Feed", setup: 500, monthly: 0, annual: 0, setupKind: "fixed", monthlyKind: "none", annualKind: "none" },
      { id: "agent-profile-pages", name: "Agent Profile Pages", setup: 350, monthly: 0, annual: 0, setupKind: "fixed", monthlyKind: "none", annualKind: "none", hint: "Each (use quantity)" },
      { id: "suburb-profile-pages", name: "Suburb Profile Pages", setup: 250, monthly: 0, annual: 0, setupKind: "fixed", monthlyKind: "none", annualKind: "none", hint: "Each (use quantity)" },
      { id: "property-alert-system", name: "Property Alert System", setup: 800, monthly: 0, annual: 0, setupKind: "fixed", monthlyKind: "none", annualKind: "none" },
      { id: "rental-appraisal-forms", name: "Rental Appraisal Forms", setup: 400, monthly: 0, annual: 0, setupKind: "fixed", monthlyKind: "none", annualKind: "none" },
      { id: "buyer-database-system", name: "Buyer Database System", setup: 900, monthly: 0, annual: 0, setupKind: "fixed", monthlyKind: "none", annualKind: "none" },
    ],
  },
  {
    title: "Content + media",
    items: [
      { id: "copywriting", name: "Copywriting", setup: 150, monthly: 0, annual: 0, setupKind: "fixed", monthlyKind: "none", annualKind: "none", hint: "Per page (use quantity)" },
      { id: "professional-photography", name: "Professional Photography", setup: 0, monthly: 0, annual: 0, setupKind: "custom", monthlyKind: "none", annualKind: "none" },
      { id: "video-editing", name: "Video Editing", setup: 0, monthly: 0, annual: 0, setupKind: "custom", monthlyKind: "none", annualKind: "none" },
      { id: "drone-photography", name: "Drone Photography", setup: 0, monthly: 0, annual: 0, setupKind: "custom", monthlyKind: "none", annualKind: "none" },
      { id: "brand-kit", name: "Brand Kit", setup: 700, monthly: 0, annual: 0, setupKind: "fixed", monthlyKind: "none", annualKind: "none" },
      { id: "logo-design", name: "Logo Design", setup: 500, monthly: 0, annual: 0, setupKind: "fixed", monthlyKind: "none", annualKind: "none" },
      { id: "ui-ux-design-system", name: "UI/UX Design System", setup: 1500, monthly: 0, annual: 0, setupKind: "fixed", monthlyKind: "none", annualKind: "none" },
    ],
  },
  {
    title: "Support + recurring",
    items: [
      { id: "monthly-maintenance", name: "Monthly Maintenance", setup: 0, monthly: 199, annual: 0, setupKind: "none", monthlyKind: "fixed", annualKind: "none" },
      { id: "priority-support", name: "Priority Support", setup: 0, monthly: 99, annual: 0, setupKind: "none", monthlyKind: "fixed", annualKind: "none" },
      { id: "hosting-recurring-line", name: "Hosting", setup: 0, monthly: 49, annual: 0, setupKind: "none", monthlyKind: "from", annualKind: "none" },
      { id: "ai-support-retainer", name: "AI Support Retainer", setup: 0, monthly: 297, annual: 0, setupKind: "none", monthlyKind: "from", annualKind: "none" },
      { id: "website-care-plan", name: "Website Care Plan", setup: 0, monthly: 149, annual: 0, setupKind: "none", monthlyKind: "from", annualKind: "none" },
    ],
  },
];

export const ADDON_BY_ID: Record<string, CatalogAddonItem> = Object.fromEntries(
  ADDON_CATEGORIES.flatMap((c) => c.items.map((item) => [item.id, item]))
);
