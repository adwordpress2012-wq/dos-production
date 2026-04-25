"use client";

import { useState } from "react";

const FEATURES = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09Z" />
      </svg>
    ),
    label: "Sarah AI",
    description:
      "Intelligent voice & SMS lead engagement that works around the clock — qualifying prospects before your team lifts a finger.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" />
      </svg>
    ),
    label: "Lead Intelligence",
    description:
      "Property-grade lead scoring with full address context, conversation history, and automated follow-up sequences.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21" />
      </svg>
    ),
    label: "Team Command Center",
    description:
      "Multi-tenant architecture with custom subdomains — run your entire brokerage or team on a single, white-labeled platform.",
  },
];

export default function Home() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 800);
  }

  return (
    <main className="min-h-screen bg-[#070B14] text-slate-100 flex flex-col">
      {/* Top status bar */}
      <div className="w-full border-b border-slate-800/60 bg-slate-900/40 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-6 py-2.5 flex items-center justify-between text-xs text-slate-400">
          <span className="font-mono tracking-widest uppercase">DirectiveOS</span>
          <span className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500" />
            </span>
            System update in progress
          </span>
        </div>
      </div>

      {/* Hero */}
      <section className="flex-1 flex flex-col items-center justify-center px-6 py-24 text-center">
        {/* Wordmark */}
        <div className="mb-10 flex items-center gap-3 select-none">
          <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-lg shadow-indigo-500/25">
            <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={2} className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="m3.75 13.5 10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z" />
            </svg>
          </div>
          <span className="text-2xl font-semibold tracking-tight">
            <span className="text-white">Directive</span>
            <span className="bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent">OS</span>
          </span>
        </div>

        {/* Status badge */}
        <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-4 py-1.5 text-xs font-medium text-indigo-300 uppercase tracking-widest">
          <span className="relative flex h-1.5 w-1.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-indigo-400" />
          </span>
          Rebuilding — back soon
        </div>

        {/* Headline */}
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.08] max-w-3xl">
          <span className="text-white">DirectiveOS</span>
          <br />
          <span className="bg-gradient-to-r from-indigo-400 via-violet-400 to-purple-400 bg-clip-text text-transparent">
            is being rebuilt.
          </span>
        </h1>

        <p className="mt-6 text-lg sm:text-xl text-slate-400 max-w-xl leading-relaxed">
          A more powerful version of our AI real estate platform is on its way.
          We&apos;re upgrading the infrastructure to serve you better.
        </p>

        {/* Email capture */}
        <div className="mt-10 w-full max-w-md">
          {submitted ? (
            <div className="flex items-center justify-center gap-2 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-6 py-4 text-emerald-400 text-sm font-medium">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4 shrink-0">
                <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
              </svg>
              You&apos;re on the list — we&apos;ll reach out the moment we&apos;re live.
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex gap-2">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="flex-1 rounded-xl border border-slate-700 bg-slate-800/60 px-4 py-3 text-sm text-slate-100 placeholder-slate-500 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition"
              />
              <button
                type="submit"
                disabled={loading}
                className="rounded-xl bg-gradient-to-r from-indigo-500 to-violet-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-500/25 hover:opacity-90 active:scale-[0.98] transition disabled:opacity-60 whitespace-nowrap cursor-pointer"
              >
                {loading ? "..." : "Notify me"}
              </button>
            </form>
          )}
          <p className="mt-3 text-xs text-slate-600 text-center">
            No spam. Just a heads-up when we&apos;re live.
          </p>
        </div>
      </section>

      {/* Divider */}
      <div className="max-w-6xl mx-auto w-full px-6">
        <div className="border-t border-slate-800/80" />
      </div>

      {/* Feature cards */}
      <section className="max-w-6xl mx-auto w-full px-6 py-20">
        <p className="text-center text-xs font-medium uppercase tracking-widest text-slate-500 mb-10">
          What&apos;s coming back — better than before
        </p>
        <div className="grid sm:grid-cols-3 gap-5">
          {FEATURES.map((f) => (
            <div
              key={f.label}
              className="group rounded-2xl border border-slate-800 bg-slate-900/50 p-6 hover:border-indigo-500/40 hover:bg-slate-800/60 transition"
            >
              <div className="mb-4 inline-flex items-center justify-center w-9 h-9 rounded-lg bg-indigo-500/15 text-indigo-400 group-hover:bg-indigo-500/25 transition">
                {f.icon}
              </div>
              <h3 className="text-sm font-semibold text-slate-100 mb-2">{f.label}</h3>
              <p className="text-xs text-slate-500 leading-relaxed">{f.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800/60 bg-slate-900/30">
        <div className="max-w-6xl mx-auto px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-600">
          <span>© {new Date().getFullYear()} DirectiveOS. All rights reserved.</span>
          <a
            href="mailto:support@directiveos.com"
            className="hover:text-slate-400 transition"
          >
            support@directiveos.com
          </a>
        </div>
      </footer>
    </main>
  );
}
