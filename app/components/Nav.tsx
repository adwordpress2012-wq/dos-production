"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import Logo from "./Logo";
import TryDosWorkspaceCta from "./TryDosWorkspaceCta";
import CalendlyPopupLink from "./CalendlyPopupLink";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/#systems", label: "Systems" },
  { href: "/website-rebuilds", label: "Websites" },
  { href: "/pricing", label: "Pricing" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact Us" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const shellClass = scrolled ? "glass-nav glass-nav--scrolled" : "glass-nav";

  return (
    <header className="fixed top-0 inset-x-0 z-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 pt-4">
        <div
          className={`${shellClass} grid grid-cols-[auto_1fr_auto] items-center gap-3 rounded-2xl px-4 sm:px-5 py-2.5 [transform:translateZ(0)]`}
        >
          <Link href="/" className="flex items-center shrink-0" onClick={() => setOpen(false)}>
            <Logo className="h-12 w-auto sm:h-14" priority />
          </Link>

          <nav className="hidden lg:flex items-center justify-center gap-2 px-4">
            {NAV_LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="nav-link relative rounded-lg px-3.5 py-2 text-sm font-medium transition hover:bg-white/[0.06] hover:shadow-[0_0_22px_-14px_rgba(168,85,247,0.9)] after:absolute after:left-3.5 after:right-3.5 after:bottom-1 after:h-px after:origin-center after:scale-x-0 after:bg-gradient-to-r after:from-violet-300/0 after:via-violet-300/70 after:to-cyan-300/0 after:transition-transform hover:after:scale-x-100"
              >
                {l.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center justify-end gap-2">
            <TryDosWorkspaceCta variant="nav" showSupportingText={false} className="hidden md:inline-flex" />
            <CalendlyPopupLink className="btn-book-demo hidden sm:inline-flex items-center justify-center text-sm font-semibold text-white px-4 py-2 rounded-xl">
              Book Strategy Call
            </CalendlyPopupLink>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              className="lg:hidden btn-ghost inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              aria-controls="dos-mobile-menu"
            >
              {open ? <X className="h-5 w-5" aria-hidden /> : <Menu className="h-5 w-5" aria-hidden />}
            </button>
          </div>
        </div>

        <div
          id="dos-mobile-menu"
          role="navigation"
          aria-label="Mobile menu"
          aria-hidden={!open}
          className={`lg:hidden grid motion-reduce:transition-none transition-[grid-template-rows,margin-top] duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] ${
            open ? "grid-rows-[1fr] mt-2" : "grid-rows-[0fr] mt-0"
          }`}
        >
          <div
            className={`min-h-0 overflow-hidden ${!open ? "pointer-events-none" : ""}`}
            inert={!open ? true : undefined}
          >
            <div
              className={`nav-mobile-panel rounded-2xl p-4 sm:p-5 motion-reduce:transition-none transition-[opacity,transform] duration-300 ease-out ${
                open ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-1.5"
              }`}
            >
              <div className="flex flex-col gap-3">
                {NAV_LINKS.map((l) => (
                  <Link
                    key={l.href}
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="nav-mobile-link rounded-xl px-4 py-3.5 text-base font-medium leading-snug"
                  >
                    {l.label}
                  </Link>
                ))}
              </div>

              <div className="mt-5 border-t border-white/[0.07] pt-5 flex flex-col gap-3">
                <TryDosWorkspaceCta
                  variant="nav"
                  showSupportingText={false}
                  className="w-full min-h-[48px] !py-3.5 !px-4 justify-center text-sm"
                />
                <CalendlyPopupLink
                  onClick={() => setOpen(false)}
                  className="btn-book-demo flex w-full min-h-[48px] items-center justify-center rounded-xl px-4 py-3.5 text-center text-sm font-semibold text-white"
                >
                  Book Strategy Call
                </CalendlyPopupLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
