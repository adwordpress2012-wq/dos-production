"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import Logo from "./Logo";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/#live-demos", label: "Live Demos" },
  { href: "/#dos-workflow", label: "Solutions" },
  { href: "/#client-stories", label: "Client Stories" },
  { href: "/discovery", label: "Book Discovery" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 inset-x-0 z-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 pt-4">
        <div className="glass rounded-2xl px-4 sm:px-5 py-2.5 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 shrink-0" onClick={() => setOpen(false)}>
            <Logo className="h-7 w-7" />
            <span className="text-[15px] font-semibold tracking-tight">
              <span className="text-white">DOS</span>
              <span className="text-ink-muted hidden sm:inline ml-2 font-normal text-[13px]">
                Operational Systems Engineering
              </span>
            </span>
          </Link>

          <nav className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="px-3 py-1.5 text-[13px] text-ink-muted hover:text-white rounded-lg hover:bg-white/5 transition"
              >
                {l.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Link
              href="/discovery"
              className="hidden sm:inline-flex btn-neon text-[13px] font-semibold text-white px-4 py-2 rounded-xl"
            >
              Book Discovery
            </Link>
            <button
              onClick={() => setOpen((v) => !v)}
              className="lg:hidden btn-ghost rounded-xl p-2"
              aria-label="Toggle menu"
            >
              {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </div>

        {open && (
          <div className="lg:hidden mt-2 glass rounded-2xl p-3 animate-fade-up">
            <div className="grid grid-cols-2 gap-1">
              {NAV_LINKS.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="px-3 py-2.5 text-sm text-ink-muted hover:text-white rounded-lg hover:bg-white/5 transition"
                >
                  {l.label}
                </Link>
              ))}
            </div>
            <div className="mt-2">
              <Link
                href="/discovery"
                onClick={() => setOpen(false)}
                className="btn-neon block text-center text-sm font-semibold text-white px-3 py-2.5 rounded-xl"
              >
                Book Discovery
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
