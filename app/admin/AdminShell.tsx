"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Toaster } from "sonner";

const NAV = [
  { href: "/admin/leads", label: "Leads" },
  { href: "/admin/clients", label: "Clients" },
] as const;

export default function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <>
      <div className="border-b border-white/10 bg-black/20 backdrop-blur-sm">
        <div className="mx-auto max-w-5xl px-6 py-3 flex flex-wrap items-center gap-3">
          <span className="text-[10px] font-mono uppercase tracking-widest text-ink-dim mr-2">Admin</span>
          {NAV.map(({ href, label }) => {
            const active = pathname === href || pathname.startsWith(`${href}/`);
            return (
              <Link
                key={href}
                href={href}
                className={`rounded-lg px-3 py-1.5 text-sm font-medium transition ${
                  active
                    ? "bg-violet-500/20 text-white border border-violet-400/30"
                    : "text-ink-muted hover:text-white border border-transparent"
                }`}
              >
                {label}
              </Link>
            );
          })}
        </div>
      </div>
      {children}
      <Toaster richColors closeButton position="top-center" />
    </>
  );
}
