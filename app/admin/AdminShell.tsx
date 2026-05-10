"use client";

import Link from "next/link";
import { LayoutDashboard, Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Toaster } from "sonner";

import { ADMIN_SIDEBAR_NAV } from "./admin-nav";

function navActive(pathname: string, href: string, exact?: boolean): boolean {
  if (exact) return pathname === href || pathname === `${href}/`;
  return pathname === href || pathname.startsWith(`${href}/`);
}

export default function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <>
      <div className="min-h-screen flex">
        {/* Mobile overlay */}
        {mobileOpen ? (
          <button
            type="button"
            aria-label="Close menu"
            className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm md:hidden"
            onClick={() => setMobileOpen(false)}
          />
        ) : null}

        {/* Sidebar */}
        <aside
          className={`fixed md:sticky left-0 top-0 z-50 h-screen w-[min(100vw-3rem,17rem)] shrink-0 border-r border-white/10 bg-black/50 backdrop-blur-xl flex flex-col transition-transform duration-200 md:translate-x-0 ${
            mobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
          }`}
        >
          <div className="p-4 border-b border-white/10 flex items-start justify-between gap-2">
            <Link
              href="/command-centre"
              className="inline-flex items-center gap-2 min-w-0 rounded-lg border border-white/10 bg-white/[0.04] px-3 py-2 text-sm font-semibold text-white hover:border-violet-400/35 hover:bg-violet-500/10 transition"
            >
              <LayoutDashboard className="h-4 w-4 text-violet-300 shrink-0" />
              <span className="truncate">DOS Command Centre</span>
            </Link>
            <button
              type="button"
              className="md:hidden rounded-lg p-2 text-ink-muted hover:text-white hover:bg-white/5"
              aria-label="Close sidebar"
              onClick={() => setMobileOpen(false)}
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <nav className="flex-1 overflow-y-auto py-3 px-2 space-y-0.5" aria-label="Command Centre">
            {ADMIN_SIDEBAR_NAV.map((item) => {
              const active = navActive(pathname, item.href, "exact" in item ? item.exact : undefined);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`block rounded-lg px-3 py-2.5 text-[13px] font-semibold transition border ${
                    active
                      ? "bg-violet-500/20 text-white border-violet-400/35 shadow-[inset_0_0_20px_-12px_rgba(139,92,246,0.9)]"
                      : "text-ink-muted hover:text-white border-transparent hover:bg-white/[0.04] hover:border-white/10"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="p-3 border-t border-white/10 space-y-2">
            <p className="text-[10px] font-mono uppercase tracking-widest text-ink-dim px-1">Official URL</p>
            <Link
              href="/command-centre"
              className="flex items-center rounded-lg px-2 py-2 text-[11px] font-mono text-cyan-200/90 hover:text-cyan-100 hover:bg-white/[0.04] transition break-all"
            >
              <span className="truncate">directiveos.com.au/command-centre</span>
            </Link>
          </div>
        </aside>

        {/* Main column */}
        <div className="flex-1 flex flex-col min-w-0 min-h-screen">
          <header className="md:hidden sticky top-0 z-30 flex items-center gap-3 border-b border-white/10 bg-black/40 backdrop-blur-md px-4 py-3">
            <button
              type="button"
              className="rounded-lg p-2 text-white hover:bg-white/10 border border-white/10"
              aria-label="Open navigation menu"
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen(true)}
            >
              <Menu className="h-5 w-5" />
            </button>
            <span className="text-sm font-semibold text-white truncate">Command Centre</span>
          </header>
          <div className="flex-1">{children}</div>
        </div>
      </div>
      <Toaster richColors closeButton position="top-center" />
    </>
  );
}
