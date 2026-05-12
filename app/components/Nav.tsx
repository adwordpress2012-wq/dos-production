"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import Logo from "./Logo";

const CALENDLY_URL = "https://calendly.com/adwordpress2012/dos-ai-business-system-demo";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/#solutions", label: "Solutions" },
  { href: "/website-rebuilds", label: "Website Rebuilds" },
  { href: "/pricing", label: "Pricing" },
  { href: "/blog", label: "Blog" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 inset-x-0 z-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 pt-4">
        <div className="glass grid grid-cols-[auto_1fr_auto] items-center gap-3 rounded-2xl px-4 sm:px-5 py-2.5">
          <Link href="/" className="flex items-center shrink-0" onClick={() => setOpen(false)}>
            <Logo className="h-12 w-auto sm:h-14" priority />
          </Link>

          <nav className="hidden lg:flex items-center justify-center gap-2 px-4">
            {NAV_LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="relative rounded-lg px-3.5 py-2 text-sm font-medium text-ink-muted transition hover:bg-white/[0.04] hover:text-white hover:shadow-[0_0_22px_-14px_rgba(168,85,247,0.9)] after:absolute after:left-3.5 after:right-3.5 after:bottom-1 after:h-px after:origin-center after:scale-x-0 after:bg-gradient-to-r after:from-violet-300/0 after:via-violet-300/70 after:to-cyan-300/0 after:transition-transform hover:after:scale-x-100"
              >
                {l.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center justify-end gap-2">
            <a
              href={CALENDLY_URL}
              target="_blank"
              rel="noreferrer"
              className="hidden sm:inline-flex btn-neon text-sm font-semibold text-white px-4 py-2 rounded-xl"
            >
              Book Demo
            </a>
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
                  className="px-3 py-2.5 text-sm font-medium text-ink-muted hover:text-white rounded-lg hover:bg-white/5 transition"
                >
                  {l.label}
                </Link>
              ))}
            </div>
            <div className="mt-2 grid grid-cols-1 gap-2">
              <a
                href={CALENDLY_URL}
                target="_blank"
                rel="noreferrer"
                onClick={() => setOpen(false)}
                className="btn-neon text-center text-sm font-semibold text-white px-3 py-2.5 rounded-xl"
              >
                Book Demo
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
