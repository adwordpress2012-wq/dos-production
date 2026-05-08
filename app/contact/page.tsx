"use client";

const CONTACT_AREAS = [
  "Website rebuilds",
  "Micah AI Receptionist",
  "COS (AI Communication System)",
  "BOS (AI Booking System)",
  "Automation and workflow design",
  "Managed hosting and maintenance",
];

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-[#070B14] text-slate-100">
      <div className="max-w-5xl mx-auto px-6 py-16">
        <div className="mb-10">
          <p className="inline-flex rounded-full border border-indigo-500/30 bg-indigo-500/10 px-4 py-1.5 text-xs font-medium uppercase tracking-widest text-indigo-300">
            Done-For-You AI Business Systems
          </p>
          <h1 className="mt-5 text-4xl sm:text-5xl font-bold tracking-tight">
            Contact Directive OS
          </h1>
          <p className="mt-4 max-w-3xl text-slate-400 leading-relaxed">
            DOS designs, builds, and manages complete AI business systems for modern operators. Tell us what you need and we will map the right system for your team.
          </p>
        </div>

        <section className="rounded-2xl border border-slate-800 bg-slate-900/50 p-6 sm:p-8">
          <h2 className="text-lg font-semibold">What we can help with</h2>
          <div className="mt-5 grid sm:grid-cols-2 gap-3">
            {CONTACT_AREAS.map((item) => (
              <div
                key={item}
                className="rounded-xl border border-slate-800 bg-slate-900/70 px-4 py-3 text-sm text-slate-200"
              >
                {item}
              </div>
            ))}
          </div>
        </section>

        <section className="mt-8 rounded-2xl border border-slate-800 bg-slate-900/50 p-6 sm:p-8">
          <h2 className="text-lg font-semibold">Start a project</h2>
          <p className="mt-2 text-sm text-slate-400">
            Email our team with your business type, current tools, and desired outcomes.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <a
              href="mailto:support@directiveos.com.au"
              className="rounded-xl bg-gradient-to-r from-indigo-500 to-violet-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-500/25 hover:opacity-90 transition"
            >
              support@directiveos.com.au
            </a>
            <a
              href="/"
              className="rounded-xl border border-slate-700 bg-slate-800/60 px-5 py-3 text-sm font-semibold text-slate-100 hover:border-indigo-400/50 transition"
            >
              Back to DOS
            </a>
          </div>
        </section>
      </div>
    </main>
  );
}
