/**
 * Command Centre sidebar — single source of truth for order and labels.
 * Placeholder hrefs render via `app/admin/[slug]/page.tsx` (static routes like
 * `/admin/leads` override the dynamic segment).
 */
export const ADMIN_SIDEBAR_NAV = [
  { href: "/admin", label: "Overview", exact: true as const },
  { href: "/admin/leads", label: "Leads" },
  { href: "/admin/clients", label: "Clients" },
  { href: "/admin/project-status", label: "Project Status" },
  { href: "/admin/quotations", label: "Quotations / Proposals" },
  { href: "/admin/invoices", label: "Invoices / Payments" },
  { href: "/admin/hosting-renewals", label: "Annual Hosting Renewals" },
  { href: "/admin/testimonials", label: "Testimonials" },
  { href: "/admin/backlinks", label: "Backlinks" },
  { href: "/admin/google-reviews", label: "Google Reviews" },
  { href: "/admin/onboarding-stage", label: "Onboarding Stage" },
  { href: "/admin/notes-tasks", label: "Notes & Tasks" },
  { href: "/admin/micah-profiles", label: "Micah Profiles" },
  { href: "/admin/twilio-numbers", label: "Twilio Numbers" },
] as const;

export type AdminNavItem = (typeof ADMIN_SIDEBAR_NAV)[number];
