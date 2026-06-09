import Link from "next/link";
import Logo from "./Logo";

const LIVE = [
  { href: "/#live-demos", label: "Live DOS Systems" },
  { href: "/#dos-workflow", label: "DOS Workflow" },
  { href: "/discovery", label: "Operational Discovery" },
  { href: "/contact", label: "Book Discovery Call" },
];

const ECOSYSTEM = [
  { href: "https://doscalendar.com", label: "DOS Calendar", external: true },
  { href: "https://chatos.com.au", label: "Micah / ChatOS", external: true },
  { href: "https://dossoos.com.au", label: "DOS SOOS", external: true },
  { href: "https://dosworkspace.com", label: "DOS Workspace", external: true },
  { href: "/#live-demos", label: "DOS Capabilities", external: false },
  { href: "/#dos-workflow", label: "BookOS & frameworks", external: false },
];

const COMPANY = [
  { href: "/der", label: "DER / Prime Directive" },
  { href: "/#client-stories", label: "Client Stories" },
  { href: "/onboarding", label: "Onboarding" },
  { href: "mailto:hello@directiveos.com", label: "Contact" },
];

const LEGAL = [
  { href: "/terms", label: "Terms" },
  { href: "/privacy", label: "Privacy" },
  { href: "/acceptable-use", label: "Acceptable Use" },
  { href: "/number-policy", label: "Number Policy" },
  { href: "/cancellation-policy", label: "Cancellation" },
];

export default function Footer() {
  return (
    <footer className="relative mt-24 border-t border-white/5">
      <div className="divider-glow absolute inset-x-0 top-0" />
      <div className="mx-auto max-w-7xl px-6 py-14">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-5">
            <div className="flex items-center gap-2.5">
              <Logo className="h-8 w-8" />
              <span className="text-base font-semibold">
                <span className="text-white">DOS</span>
              </span>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-ink-muted max-w-sm">
              Directive OS builds practical business systems that help small operators manage
              enquiries, bookings, follow-ups, customers, and day-to-day operations in one place.
            </p>
            <p className="mt-6 text-xs text-ink-dim">
              Operated in Australia · ABN supplied on invoice · Built on Vercel + Supabase
            </p>
          </div>

          <div className="md:col-span-2">
            <h4 className="text-xs font-semibold tracking-widest text-ink-muted uppercase">Showroom</h4>
            <ul className="mt-4 space-y-2.5 text-sm">
              {LIVE.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-ink-muted hover:text-white transition">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-2">
            <h4 className="text-xs font-semibold tracking-widest text-ink-muted uppercase">DOS Ecosystem</h4>
            <ul className="mt-4 space-y-2.5 text-sm">
              {ECOSYSTEM.map((l) => (
                <li key={l.href}>
                  {l.external ? (
                    <a
                      href={l.href}
                      target="_blank"
                      rel="noreferrer"
                      className="text-ink-muted hover:text-white transition"
                    >
                      {l.label}
                    </a>
                  ) : (
                    <Link href={l.href} className="text-ink-muted hover:text-white transition">
                      {l.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-1">
            <h4 className="text-xs font-semibold tracking-widest text-ink-muted uppercase">Company</h4>
            <ul className="mt-4 space-y-2.5 text-sm">
              {COMPANY.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-ink-muted hover:text-white transition">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-2">
            <h4 className="text-xs font-semibold tracking-widest text-ink-muted uppercase">Legal</h4>
            <ul className="mt-4 space-y-2.5 text-sm">
              {LEGAL.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-ink-muted hover:text-white transition">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-ink-dim">
          <span>© {new Date().getFullYear()} DOS — Directive Operating Systems Pty Ltd. All rights reserved.</span>
          <span className="font-mono tracking-widest uppercase text-ink-dim/80">
            v1.0 · Powered by DOS
          </span>
        </div>
      </div>
    </footer>
  );
}
