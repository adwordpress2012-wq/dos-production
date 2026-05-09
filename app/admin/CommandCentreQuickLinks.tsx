import Link from "next/link";
import { Globe, Home, UserPlus, Users } from "lucide-react";

type Active = "leads" | "clients";

const LINKS: {
  href: string;
  label: string;
  hint: string;
  icon: typeof UserPlus;
  key: Active | "onboarding" | "home";
}[] = [
  {
    href: "/admin/leads",
    label: "Leads",
    hint: "Pipeline and add lead",
    icon: UserPlus,
    key: "leads",
  },
  {
    href: "/admin/clients",
    label: "Clients",
    hint: "Paying customers only",
    icon: Users,
    key: "clients",
  },
  {
    href: "/onboarding/website-rebuild",
    label: "Website Onboarding",
    hint: "Website rebuild intake",
    icon: Globe,
    key: "onboarding",
  },
  {
    href: "/",
    label: "Back to DOS Website",
    hint: "Public marketing site",
    icon: Home,
    key: "home",
  },
];

export default function CommandCentreQuickLinks({ active }: { active: Active }) {
  return (
    <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
      {LINKS.map(({ href, label, hint, icon: Icon, key }) => {
        const isActive =
          (key === "leads" && active === "leads") || (key === "clients" && active === "clients");
        return (
          <Link
            key={href}
            href={href}
            className={`group glass-strong rounded-2xl p-4 sm:p-5 transition flex flex-col gap-2 border ${
              isActive
                ? "border-violet-400/40 bg-violet-500/[0.08] ring-1 ring-violet-400/25"
                : "border-white/10 hover:border-white/20 hover:bg-white/[0.03]"
            }`}
          >
            <span className="inline-flex items-center gap-2 text-sm font-semibold text-white">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-white/5 border border-white/10 text-violet-200 group-hover:text-white transition">
                <Icon className="h-4 w-4" />
              </span>
              {label}
            </span>
            <span className="text-xs text-ink-muted leading-snug">{hint}</span>
          </Link>
        );
      })}
    </div>
  );
}
