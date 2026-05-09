import type { Metadata } from "next";
import WebQuoteForm from "./WebQuoteForm";

export const metadata: Metadata = {
  title: "Website quote",
  description:
    "Get a fixed-price quote for a modern, DOS-managed website rebuild — hosted, monitored and updated for you.",
};

export default function Page() {
  return (
    <main className="relative pt-32 sm:pt-40 pb-16">
      <section className="mx-auto max-w-4xl px-6">
        <div className="text-center max-w-2xl mx-auto">
          <span className="inline-flex items-center gap-2 rounded-full border border-violet-400/20 bg-violet-500/10 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.2em] text-violet-200">
            <span className="h-1.5 w-1.5 rounded-full bg-violet-300 shadow-[0_0_10px_2px_rgba(168,85,247,0.7)]" />
            Website quote
          </span>
          <h1 className="mt-5 text-4xl sm:text-5xl font-semibold tracking-tight leading-[1.05]">
            <span className="text-gradient-purple">Modern website,</span>
            <br />
            rebuilt and run for you.
          </h1>
          <p className="mt-5 text-base sm:text-lg text-ink-muted leading-relaxed">
            Tell us about your business. We&apos;ll send a fixed-price quote within 1 business day.
          </p>
        </div>

        <WebQuoteForm />
      </section>
    </main>
  );
}
