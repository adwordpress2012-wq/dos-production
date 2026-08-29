"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ChevronDown, Menu, X } from "lucide-react";
import Logo from "./Logo";
import TalkToMicahButton from "./TalkToMicahButton";
import { ECOSYSTEM_GROUPS, INDUSTRIES, SOLUTIONS } from "@/app/lib/site-data";

type MenuName = "solutions" | "industries" | "ecosystem";

const DIRECT_LINKS = [
  { href: "/business-spotlight", label: "Business Spotlight" },
  { href: "/insights", label: "Insights" },
  { href: "/resources", label: "Resources" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Nav() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<MenuName | null>(null);
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const closeOnOutsideClick = (event: MouseEvent) => {
      if (!headerRef.current?.contains(event.target as Node)) setOpenMenu(null);
    };
    document.addEventListener("mousedown", closeOnOutsideClick);
    return () => document.removeEventListener("mousedown", closeOnOutsideClick);
  }, []);

  useEffect(() => {
    if (!mobileOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [mobileOpen]);

  function toggleMenu(menu: MenuName) {
    setOpenMenu((current) => (current === menu ? null : menu));
  }

  return (
    <header ref={headerRef} className="fixed inset-x-0 top-0 z-50">
      <div className="mx-auto max-w-[1480px] px-3 pt-3 sm:px-5">
        <div className="glass-nav flex min-h-16 items-center justify-between rounded-2xl px-4">
          <Link
            href="/"
            className="flex shrink-0 items-center gap-2"
            onClick={() => {
              setMobileOpen(false);
              setOpenMenu(null);
            }}
            aria-label="Directive OS home"
          >
            <Logo className="h-10 w-[86px]" priority />
          </Link>

          <nav className="hidden items-center xl:flex" aria-label="Primary navigation">
            <DesktopMenuButton
              label="Solutions"
              open={openMenu === "solutions"}
              onToggle={() => toggleMenu("solutions")}
            />
            <DesktopMenuButton
              label="Industries"
              open={openMenu === "industries"}
              onToggle={() => toggleMenu("industries")}
            />
            <DesktopMenuButton
              label="Ecosystem"
              open={openMenu === "ecosystem"}
              onToggle={() => toggleMenu("ecosystem")}
            />
            {DIRECT_LINKS.map((link) => (
              <Link key={link.href} href={link.href} className="nav-link rounded-lg px-2.5 py-2 text-[13px]">
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Link href="/start-here" className="btn-ghost hidden rounded-xl px-4 py-2.5 text-sm font-semibold text-white md:inline-flex">
              Start Here
            </Link>
            <TalkToMicahButton
              context="navbar"
              className="btn-primary hidden rounded-xl px-4 py-2.5 text-sm font-semibold sm:inline-flex"
            />
            <button
              type="button"
              onClick={() => setMobileOpen((value) => !value)}
              className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.05] text-white xl:hidden"
              aria-expanded={mobileOpen}
              aria-controls="mobile-navigation"
              aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"}
            >
              {mobileOpen ? <X className="h-5 w-5" aria-hidden /> : <Menu className="h-5 w-5" aria-hidden />}
            </button>
          </div>
        </div>

        <DesktopMegaMenu menu={openMenu} onNavigate={() => setOpenMenu(null)} />

        {mobileOpen ? (
          <div
            id="mobile-navigation"
            className="nav-mobile-panel mt-2 max-h-[calc(100vh-6rem)] overflow-y-auto rounded-2xl p-3 xl:hidden"
          >
            <nav aria-label="Mobile navigation" className="grid gap-1">
              <MobileAccordion label="Solutions">
                {SOLUTIONS.map((item) => (
                  <Link key={`${item.label}-${item.href}`} href={item.href} onClick={() => setMobileOpen(false)} className="mobile-sub-link">
                    {item.label}
                  </Link>
                ))}
              </MobileAccordion>
              <MobileAccordion label="Industries">
                <Link href="/industries" onClick={() => setMobileOpen(false)} className="mobile-sub-link font-semibold text-white">
                  View all industries
                </Link>
                {INDUSTRIES.map((industry) => (
                  <Link key={industry.slug} href={`/industries/${industry.slug}`} onClick={() => setMobileOpen(false)} className="mobile-sub-link">
                    {industry.name}
                  </Link>
                ))}
              </MobileAccordion>
              <MobileAccordion label="Ecosystem">
                <Link href="/ecosystem" onClick={() => setMobileOpen(false)} className="mobile-sub-link font-semibold text-white">
                  View the DOS Ecosystem
                </Link>
                {ECOSYSTEM_GROUPS.flatMap((group) => group.links).map((item) =>
                  item.external ? (
                    <a key={`${item.label}-${item.href}`} href={item.href} target="_blank" rel="noreferrer" className="mobile-sub-link">
                      {item.label}
                    </a>
                  ) : (
                    <Link key={`${item.label}-${item.href}`} href={item.href} onClick={() => setMobileOpen(false)} className="mobile-sub-link">
                      {item.label}
                    </Link>
                  )
                )}
              </MobileAccordion>

              {DIRECT_LINKS.map((link) => (
                <Link key={link.href} href={link.href} onClick={() => setMobileOpen(false)} className="nav-mobile-link rounded-xl px-4 py-3 text-sm">
                  {link.label}
                </Link>
              ))}

              <Link href="/start-here" onClick={() => setMobileOpen(false)} className="nav-mobile-link rounded-xl px-4 py-3 text-sm">
                Start Here
              </Link>
              <TalkToMicahButton
                context="mobile-navbar"
                className="btn-primary mt-2 inline-flex w-full items-center justify-center rounded-xl px-5 py-3 text-sm font-semibold"
              />
            </nav>
          </div>
        ) : null}
      </div>
    </header>
  );
}

function DesktopMenuButton({
  label,
  open,
  onToggle,
}: {
  label: string;
  open: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      onKeyDown={(event) => {
        if (event.key === "Escape" && open) onToggle();
      }}
      className="nav-link inline-flex items-center gap-1 rounded-lg px-2.5 py-2 text-[13px]"
      aria-haspopup="true"
      aria-expanded={open}
    >
      {label}
      <ChevronDown className={`h-3.5 w-3.5 transition ${open ? "rotate-180" : ""}`} aria-hidden />
    </button>
  );
}

function DesktopMegaMenu({
  menu,
  onNavigate,
}: {
  menu: MenuName | null;
  onNavigate: () => void;
}) {
  if (!menu) return null;

  return (
    <div className="glass-nav mt-2 hidden rounded-2xl p-6 shadow-2xl xl:block">
      {menu === "solutions" ? (
        <div className="grid grid-cols-3 gap-2">
          {SOLUTIONS.map((item) => (
            <Link key={`${item.label}-${item.href}`} href={item.href} onClick={onNavigate} className="mega-link">
              <strong>{item.label}</strong>
              <span>{item.description}</span>
            </Link>
          ))}
        </div>
      ) : null}

      {menu === "industries" ? (
        <div>
          <div className="mb-4 flex items-end justify-between gap-4">
            <div>
              <p className="eyebrow">Industry pathways</p>
              <p className="mt-2 text-sm text-ink-muted">Practical systems shaped around the way each business works.</p>
            </div>
            <Link href="/industries" onClick={onNavigate} className="text-sm font-semibold text-violet-200 hover:text-white">
              View all industries
            </Link>
          </div>
          <div className="grid grid-cols-4 gap-1">
            {INDUSTRIES.map((industry) => (
              <Link key={industry.slug} href={`/industries/${industry.slug}`} onClick={onNavigate} className="rounded-lg px-3 py-2 text-sm text-ink-muted transition hover:bg-white/[0.05] hover:text-white">
                {industry.name}
              </Link>
            ))}
          </div>
        </div>
      ) : null}

      {menu === "ecosystem" ? (
        <div className="grid grid-cols-4 gap-6">
          {ECOSYSTEM_GROUPS.map((group) => (
            <div key={group.title}>
              <p className="eyebrow">{group.title}</p>
              <div className="mt-3 grid gap-1">
                {group.links.map((item) =>
                  item.external ? (
                    <a key={`${item.label}-${item.href}`} href={item.href} target="_blank" rel="noreferrer" className="mega-link compact">
                      <strong>{item.label}</strong>
                      {item.description ? <span>{item.description}</span> : null}
                    </a>
                  ) : (
                    <Link key={`${item.label}-${item.href}`} href={item.href} onClick={onNavigate} className="mega-link compact">
                      <strong>{item.label}</strong>
                      {item.description ? <span>{item.description}</span> : null}
                    </Link>
                  )
                )}
              </div>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
}

function MobileAccordion({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <details className="group rounded-xl border border-white/[0.06]">
      <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between px-4 py-3 text-sm text-white">
        {label}
        <ChevronDown className="h-4 w-4 transition group-open:rotate-180" aria-hidden />
      </summary>
      <div className="grid max-h-72 gap-1 overflow-y-auto border-t border-white/[0.06] p-2">{children}</div>
    </details>
  );
}
