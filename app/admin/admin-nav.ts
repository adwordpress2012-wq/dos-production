/**
 * DOS HUB sidebar — canonical paths only (production domain routes, no preview URLs).
 */
export type AdminNavItem = {
  href: string;
  label: string;
  /** Only `/href` matches (used for Overview vs nested `/command-centre/...`). */
  exact?: boolean;
};

export const ADMIN_SIDEBAR_NAV: readonly AdminNavItem[] = [
  { href: "/command-centre", label: "Overview", exact: true },
  { href: "/admin/leads", label: "Leads" },
  { href: "/admin/clients", label: "Clients" },
  { href: "/command-centre/project-status", label: "Project Status" },
  { href: "/saas/quote/builder", label: "Quotations / Proposals" },
  { href: "/command-centre/invoices-payments", label: "Invoices / Payments" },
  { href: "/command-centre/hosting-renewals", label: "Annual Hosting Renewals" },
  { href: "/command-centre/testimonials", label: "Testimonials" },
  { href: "/command-centre/backlinks", label: "Backlinks" },
  { href: "/command-centre/google-reviews", label: "Google Reviews" },
  /** Exact so `/onboarding/micah` etc. don’t keep this row highlighted. */
  { href: "/onboarding", label: "Onboarding Stage", exact: true },
  { href: "/onboarding/website-rebuild", label: "Website Onboarding" },
  { href: "/onboarding/micah", label: "Micah Onboarding" },
  { href: "/command-centre/notes-tasks", label: "Notes & Tasks" },
  { href: "/command-centre/micah-profiles", label: "Micah Profiles" },
  { href: "/command-centre/twilio-numbers", label: "Twilio Numbers" },
] as const;
