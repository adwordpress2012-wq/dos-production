"use client";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#070B14] text-slate-100 flex flex-col">
      <div className="w-full border-b border-slate-800/60 bg-slate-900/40 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-6 py-2.5 flex items-center justify-between text-xs text-slate-400">
          <span className="font-mono tracking-widest uppercase">DirectiveOS</span>
          <span className="text-cyan-200/70">Done-For-You AI Business Systems</span>
        </div>
      </div>

      <section className="flex-1 flex flex-col items-center justify-center px-6 py-24 text-center">
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

        <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-4 py-1.5 text-xs font-medium text-indigo-300 uppercase tracking-widest">
          DOS ecosystem products
        </div>

        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.08] max-w-4xl">
          <span className="text-white">Done-For-You</span>
          <br />
          <span className="bg-gradient-to-r from-indigo-400 via-violet-400 to-purple-400 bg-clip-text text-transparent">
            AI Business Systems
          </span>
        </h1>

        <p className="mt-6 text-lg sm:text-xl text-slate-400 max-w-2xl leading-relaxed">
          Directive OS builds and manages complete AI systems for modern businesses, including
          website rebuilds, Micah AI Receptionist, COS, BOS, automation workflows, and managed hosting.
        </p>

        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <a
            href="/contact"
            className="rounded-xl bg-gradient-to-r from-indigo-500 to-violet-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-500/25 hover:opacity-90 transition"
          >
            Contact DOS
          </a>
          <a
            href="https://chatos.com.au"
            target="_blank"
            rel="noreferrer"
            className="rounded-xl border border-slate-700 bg-slate-800/60 px-6 py-3 text-sm font-semibold text-slate-100 hover:border-indigo-400/50 transition"
          >
            Explore COS
          </a>
          <a
            href="https://bookos.com.au"
            target="_blank"
            rel="noreferrer"
            className="rounded-xl border border-slate-700 bg-slate-800/60 px-6 py-3 text-sm font-semibold text-slate-100 hover:border-indigo-400/50 transition"
          >
            Explore BOS
          </a>
        </div>
      </section>

      <div className="max-w-6xl mx-auto w-full px-6">
        <div className="border-t border-slate-800/80" />
      </div>

      <section className="max-w-6xl mx-auto w-full px-6 py-20">
        <p className="text-center text-xs font-medium uppercase tracking-widest text-slate-500 mb-10">
          Included in DOS delivery
        </p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {[
            "Website rebuilds",
            "Micah AI Receptionist",
            "COS (AI Communication System)",
            "BOS (AI Booking System)",
            "Automation and workflow setup",
            "Managed hosting and maintenance",
          ].map((item) => (
            <div
              key={item}
              className="rounded-2xl border border-slate-800 bg-slate-900/50 p-6 hover:border-indigo-500/40 hover:bg-slate-800/60 transition"
            >
              <h3 className="text-sm font-semibold text-slate-100">{item}</h3>
            </div>
          ))}
        </div>
      </section>

      <footer className="border-t border-slate-800/60 bg-slate-900/30">
        <div className="max-w-6xl mx-auto px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-600">
          <span>© {new Date().getFullYear()} DirectiveOS. All rights reserved.</span>
          <a
            href="mailto:support@directiveos.com.au"
            className="hover:text-slate-400 transition"
          >
            support@directiveos.com.au
          </a>
        </div>
      </footer>
    </main>
  );
}
