import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Website onboarding received",
  description:
    "Your website onboarding details have been submitted to Directive Operating Systems.",
};

export default function ThanksPage() {
  return (
    <main className="relative pt-32 sm:pt-40 pb-16">
      <section className="mx-auto max-w-2xl px-6">
        <div className="relative overflow-hidden rounded-3xl glass-strong p-10 text-center ring-glow">
          <div
            aria-hidden
            className="absolute -top-20 left-1/2 h-72 w-[700px] -translate-x-1/2 rounded-full bg-violet-500/20 blur-[120px]"
          />
          <div className="relative">
            <div className="mx-auto inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 to-cyan-400 shadow-[0_0_40px_-6px_rgba(139,92,246,0.7)]">
              <CheckCircle2 className="h-7 w-7 text-white" />
            </div>
            <h1 className="mt-6 text-2xl sm:text-3xl font-semibold tracking-tight">
              Thanks — your website onboarding has been received.
            </h1>
            <p className="mt-4 text-ink-muted leading-relaxed">
              DOS will review the details and contact you if anything else is needed.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                href="/"
                className="btn-neon inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white"
              >
                Back to home
              </Link>
              <Link
                href="/website-rebuilds"
                className="btn-ghost inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium text-white"
              >
                Website rebuilds
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
