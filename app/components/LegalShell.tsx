import { ReactNode } from "react";
import Link from "next/link";

type Props = {
  title: string;
  effective: string;
  children: ReactNode;
};

const LEGAL_NAV = [
  { href: "/terms", label: "Terms" },
  { href: "/privacy", label: "Privacy" },
  { href: "/acceptable-use", label: "Acceptable Use" },
  { href: "/number-policy", label: "Number Policy" },
  { href: "/cancellation-policy", label: "Cancellation" },
];

export default function LegalShell({ title, effective, children }: Props) {
  return (
    <main className="relative pt-32 pb-16 sm:pt-40">
      <div className="mx-auto max-w-5xl px-6">
        <div className="grid lg:grid-cols-[220px_1fr] gap-10">
          <aside className="lg:sticky lg:top-28 self-start">
            <h2 className="text-xs font-semibold tracking-widest text-ink-muted uppercase">
              Policies
            </h2>
            <nav className="mt-4 flex lg:flex-col gap-1 flex-wrap">
              {LEGAL_NAV.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="px-3 py-2 text-sm text-ink-muted hover:text-white rounded-lg hover:bg-white/5 transition"
                >
                  {l.label}
                </Link>
              ))}
            </nav>
          </aside>

          <article className="min-w-0">
            <header>
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-violet-300/80">
                Legal
              </p>
              <h1 className="mt-3 text-3xl sm:text-4xl font-semibold tracking-tight">{title}</h1>
              <p className="mt-2 text-sm text-ink-dim">Effective {effective}</p>
            </header>

            <div className="legal-content mt-8">{children}</div>

            <div className="divider-glow mt-12" />
            <p className="mt-6 text-xs text-ink-dim">
              Operated by Directive Operating Systems Pty Ltd, Australia. Questions?{" "}
              <a href="mailto:legal@directiveos.com" className="text-violet-300 hover:text-violet-200">
                legal@directiveos.com
              </a>
            </p>
          </article>
        </div>
      </div>
    </main>
  );
}
