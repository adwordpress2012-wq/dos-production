"use client";

import Link from "next/link";
import { ExternalLink, LayoutDashboard } from "lucide-react";
import { usePathname } from "next/navigation";
import { Toaster } from "sonner";

const NAV = [
  { href: "/admin/leads", label: "Leads" },
  { href: "/admin/clients", label: "Clients" },
] as const;

const COMMAND_CENTRE_ENTRY = "https://directiveos.com.au/command-centre";

export default function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <>
      <div className="border-b border-white/10 bg-black/30 backdrop-blur-md sticky top-0 z-40">
        <div className="mx-auto max-w-7xl px-6 py-3 flex flex-wrap items-center gap-x-4 gap-y-3 justify-between">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2 min-w-0">
            <Link
              href="/command-centre"
              className="inline-flex items-center gap-2 shrink-0 rounded-lg border border-white/10 bg-white/[0.04] px-3 py-1.5 text-sm font-semibold text-white hover:border-violet-400/35 hover:bg-violet-500/10 transition"
              title="Opens Leads (canonical Command Centre entry)"
            >
              <LayoutDashboard className="h-4 w-4 text-violet-300" />
              DOS Command Centre
            </Link>
            <span className="hidden sm:inline h-4 w-px bg-white/15" aria-hidden />
            <span className="text-[10px] font-mono uppercase tracking-widest text-ink-dim hidden sm:inline">
              Admin
            </span>
            {NAV.map(({ href, label }) => {
              const active = pathname === href || pathname.startsWith(`${href}/`);
              return (
                <Link
                  key={href}
                  href={href}
                  className={`rounded-lg px-4 py-2 text-sm font-semibold transition ${
                    active
                      ? "bg-violet-500/25 text-white border border-violet-400/40 shadow-[0_0_20px_-8px_rgba(139,92,246,0.8)]"
                      : "text-ink-muted hover:text-white border border-transparent hover:bg-white/[0.04]"
                  }`}
                >
                  {label}
                </Link>
              );
            })}
          </div>
          <a
            href={COMMAND_CENTRE_ENTRY}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Open production Command Centre URL on directiveos.com.au"
            className="inline-flex items-center gap-1.5 max-w-full text-[11px] font-mono text-cyan-200/90 hover:text-cyan-100 underline underline-offset-4 decoration-cyan-400/40"
            title="Production Command Centre URL (same entry — redirects to Leads)"
          >
            <span className="truncate">{COMMAND_CENTRE_ENTRY.replace(/^https:\/\//, "")}</span>
            <ExternalLink className="h-3.5 w-3.5 shrink-0 opacity-80" aria-hidden />
          </a>
        </div>
      </div>
      {children}
      <Toaster richColors closeButton position="top-center" />
    </>
  );
}
