/**
 * Command Centre sidebar — canonical paths only (no preview deployment URLs).
 */
export const ADMIN_SIDEBAR_NAV = [
  { href: "/command-centre", label: "Overview", exact: true as const },
  { href: "/admin/leads", label: "Leads" },
  { href: "/admin/clients", label: "Clients" },
  { href: "/onboarding/website-rebuild", label: "Website Onboarding" },
  { href: "/onboarding/micah", label: "Micah Onboarding" },
] as const;

export type AdminNavItem = (typeof ADMIN_SIDEBAR_NAV)[number];
