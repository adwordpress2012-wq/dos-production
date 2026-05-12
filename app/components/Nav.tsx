"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import Logo from "./Logo";

const NAV_LINKS = [
  { href: "/website-rebuilds", label: "Websites" },
  { href: "/micah", label: "Micah" },
  { href: "/cos", label: "COS" },
  { href: "/bos", label: "BOS" },
  { href: "/command-centre", label: "Command Centre" },
  { href: "/pricing", label: "Pricing" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 inset-x-0 z-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 pt-4">
        <div className="glass rounded-2xl px-4 sm:px-5 py-2.5 flex items-center justify-between">
          <Link href="/" className="flex items-center shrink-0" onClick={() => setOpen(false)}>
            <Logo className="h-14 w-auto sm:h-16" priority />
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
              href="/onboarding"
              className="hidden sm:inline-flex btn-ghost text-[13px] font-medium px-3.5 py-2 rounded-xl"
            >
              Onboarding
            </Link>
            <Link
              href="/pricing"
              className="hidden sm:inline-flex btn-neon text-[13px] font-semibold text-white px-4 py-2 rounded-xl"
            >
              Get Started
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
            <div className="mt-2 grid grid-cols-2 gap-2">
              <Link
                href="/onboarding"
                onClick={() => setOpen(false)}
                className="btn-ghost text-center text-sm font-medium px-3 py-2.5 rounded-xl"
              >
                Onboarding
              </Link>
              <Link
                href="/pricing"
                onClick={() => setOpen(false)}
                className="btn-neon text-center text-sm font-semibold text-white px-3 py-2.5 rounded-xl"
              >
                Get Started
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
