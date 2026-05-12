import Link from "next/link";
import Logo from "./Logo";

const PRODUCTS = [
  { href: "/website-rebuilds", label: "Website Rebuilds" },
  { href: "/micah", label: "Micah AI Receptionist" },
  { href: "/cos", label: "COS Communication" },
  { href: "/bos", label: "BOS Booking" },
  { href: "/command-centre", label: "Command Centre" },
];

const COMPANY = [
  { href: "/pricing", label: "Pricing" },
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
            <div className="flex items-center">
              <Logo className="h-20 w-auto" />
            </div>
            <p className="mt-4 text-sm leading-relaxed text-ink-muted max-w-sm">
              Done-For-You AI Business Systems. Websites, AI receptionists, booking systems,
              automation and managed business infrastructure for modern Australian businesses.
            </p>
            <p className="mt-6 text-xs text-ink-dim">
              Operated in Australia · ABN supplied on invoice · Built on Vercel + Supabase
            </p>
          </div>

          <div className="md:col-span-2">
            <h4 className="text-xs font-semibold tracking-widest text-ink-muted uppercase">Products</h4>
            <ul className="mt-4 space-y-2.5 text-sm">
              {PRODUCTS.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-ink-muted hover:text-white transition">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-2">
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

          <div className="md:col-span-3">
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
          <span>© 2026 DOS — Directive Operating Systems Pty Ltd. All rights reserved.</span>
          <span className="font-mono tracking-widest uppercase text-ink-dim/80">
            ABN 87 754 544 171
          </span>
        </div>
      </div>
    </footer>
  );
}
