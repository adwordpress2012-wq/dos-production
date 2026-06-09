import Link from "next/link";
import {
  ArrowRight,
  LayoutDashboard,
  ShieldCheck,
  Sparkles,
  Zap,
} from "lucide-react";
import CalendlyPopupLink from "./CalendlyPopupLink";

export default function Hero() {
  return (
    <section className="relative pt-32 sm:pt-40 pb-16 sm:pb-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="relative">
          <div
            aria-hidden
            className="absolute -top-24 left-1/2 h-72 w-[680px] -translate-x-1/2 rounded-full bg-violet-500/20 blur-[120px]"
          />

          <div className="relative flex flex-col items-center text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-400/10 backdrop-blur px-3.5 py-1.5 text-xs font-semibold text-emerald-200 shadow-[0_0_28px_-10px_rgba(52,247,193,0.85)]">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
              </span>
              <span className="tracking-[0.12em] uppercase">Practical Business Systems</span>
            </div>

            <h1 className="mt-7 text-4xl sm:text-6xl lg:text-[76px] font-semibold tracking-tight leading-[1.02] max-w-5xl">
              <span className="text-white">Helping Small Businesses </span>
              <span className="text-gradient-purple">Buy Back Their Time</span>
            </h1>

            <p className="mt-6 text-base sm:text-lg lg:text-xl text-ink-muted max-w-4xl leading-relaxed">
              Directive OS builds practical business systems that help small operators manage enquiries,
              bookings, follow-ups, customers, and day-to-day operations in one place.
            </p>

            <div className="mt-9 flex flex-col sm:flex-row items-center justify-center gap-3 w-full max-w-lg">
              <CalendlyPopupLink className="btn-neon inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl text-sm font-semibold text-white w-full sm:w-auto min-w-[200px]">
                Book a Discovery Call
              </CalendlyPopupLink>
              <Link
                href="/#live-demos"
                className="btn-ghost inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl text-sm font-medium text-white w-full sm:w-auto min-w-[200px] border border-white/15 hover:border-white/25"
              >
                Explore DOS Systems
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <p className="mt-6 text-sm text-ink-muted/90">Built for modern Australian businesses.</p>

            <div className="mt-6">
              <Link
                href="/#try-micah-live"
                className="text-sm font-medium text-violet-300/90 hover:text-violet-200 underline-offset-4 decoration-dashed underline"
              >
                Try live demos — Micah & Smart Chat Widget
              </Link>
            </div>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-xs text-ink-muted">
              <span className="inline-flex items-center gap-1.5">
                <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" /> Australian-operated
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Zap className="h-3.5 w-3.5 text-cyan-400" /> Live in 7–14 days
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Sparkles className="h-3.5 w-3.5 text-violet-300" /> Managed for you
              </span>
            </div>
          </div>

          {/* Hero systems overview mock */}
          <div className="relative mt-16 sm:mt-20">
            <div
              aria-hidden
              className="absolute -inset-x-10 -top-10 -bottom-10 rounded-[36px] bg-gradient-to-br from-violet-500/30 via-fuchsia-500/10 to-cyan-400/20 opacity-50 blur-2xl"
            />
            <div className="relative glass-strong rounded-3xl p-3 ring-glow">
              <div className="rounded-2xl bg-[#06080f] border border-white/5 overflow-hidden">
                <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5 bg-white/[0.02]">
                  <div className="flex gap-1.5">
                    <span className="h-2.5 w-2.5 rounded-full bg-red-400/60" />
                    <span className="h-2.5 w-2.5 rounded-full bg-amber-300/60" />
                    <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/60" />
                  </div>
                  <div className="flex-1 flex items-center justify-center gap-2 text-[11px] font-mono tracking-widest uppercase text-ink-dim">
                    <LayoutDashboard className="h-3.5 w-3.5 text-violet-400/80" />
                    <span>dos · system overview</span>
                  </div>
                  <span className="hidden sm:inline-flex items-center gap-1.5 rounded-full bg-emerald-400/10 px-2 py-0.5 text-[10px] font-medium text-emerald-300 border border-emerald-400/20">
                    <span className="h-1 w-1 rounded-full bg-emerald-400" />
                    Live
                  </span>
                </div>

                <div className="grid grid-cols-12 gap-3 p-4">
                  <DashStat label="Enquiries captured" value="4,902" delta="+24%" tone="cyan" />
                  <DashStat label="Workflows active" value="38" delta="+4" tone="violet" />
                  <DashStat label="Channels connected" value="12" delta="+2 new" tone="emerald" />

                  <div className="col-span-12 lg:col-span-7 rounded-xl border border-white/5 bg-white/[0.02] p-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-medium text-ink-muted">Operational throughput</span>
                      <span className="text-[10px] font-mono uppercase tracking-widest text-ink-dim">last 30d</span>
                    </div>
                    <Sparkline />
                  </div>

                  <div className="col-span-12 lg:col-span-5 rounded-xl border border-white/5 bg-white/[0.02] p-4">
                    <span className="text-xs font-medium text-ink-muted">Live activity</span>
                    <ul className="mt-3 space-y-2.5 text-[12px]">
                      <ActivityRow tone="cyan" who="SCW" what="New quote request — captured" when="just now" />
                      <ActivityRow tone="violet" who="SBA" what="Booking confirmed · 9:30am" when="2m" />
                      <ActivityRow tone="emerald" who="SMS" what="Customer thread replied" when="6m" />
                      <ActivityRow tone="violet" who="Voice" what="Inbound call qualified" when="11m" />
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function DashStat({
  label,
  value,
  delta,
  tone,
}: {
  label: string;
  value: string;
  delta: string;
  tone: "violet" | "cyan" | "emerald";
}) {
  const dot =
    tone === "violet"
      ? "bg-violet-400 shadow-[0_0_12px_2px_rgba(168,85,247,0.7)]"
      : tone === "cyan"
        ? "bg-cyan-400 shadow-[0_0_12px_2px_rgba(34,211,238,0.7)]"
        : "bg-emerald-400 shadow-[0_0_12px_2px_rgba(52,247,193,0.7)]";
  return (
    <div className="col-span-12 sm:col-span-4 rounded-xl border border-white/5 bg-white/[0.02] p-4">
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium text-ink-muted">{label}</span>
        <span className={`h-1.5 w-1.5 rounded-full ${dot}`} />
      </div>
      <div className="mt-2 flex items-baseline gap-2">
        <span className="text-2xl font-semibold tracking-tight">{value}</span>
        <span className="text-[11px] font-medium text-emerald-400">{delta}</span>
      </div>
    </div>
  );
}

function Sparkline() {
  const points = [10, 14, 12, 18, 22, 19, 26, 30, 28, 34, 38, 36, 44, 42, 50, 56];
  const w = 320;
  const h = 80;
  const max = Math.max(...points);
  const min = Math.min(...points);
  const stepX = w / (points.length - 1);
  const path = points
    .map((p, i) => {
      const x = i * stepX;
      const y = h - ((p - min) / (max - min)) * (h - 8) - 4;
      return `${i === 0 ? "M" : "L"} ${x.toFixed(1)} ${y.toFixed(1)}`;
    })
    .join(" ");
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="mt-3 h-20 w-full" preserveAspectRatio="none">
      <defs>
        <linearGradient id="spark" x1="0" y1="0" x2={w} y2="0" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#a855f7" />
          <stop offset="100%" stopColor="#22d3ee" />
        </linearGradient>
        <linearGradient id="spark-fill" x1="0" y1="0" x2="0" y2={h} gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#a855f7" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#a855f7" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={`${path} L ${w} ${h} L 0 ${h} Z`} fill="url(#spark-fill)" />
      <path d={path} stroke="url(#spark)" strokeWidth={2} fill="none" strokeLinecap="round" />
    </svg>
  );
}

function ActivityRow({
  tone,
  who,
  what,
  when,
}: {
  tone: "violet" | "cyan" | "emerald";
  who: string;
  what: string;
  when: string;
}) {
  const chip =
    tone === "violet"
      ? "bg-violet-500/15 text-violet-300 border-violet-400/20"
      : tone === "cyan"
        ? "bg-cyan-400/15 text-cyan-200 border-cyan-400/20"
        : "bg-emerald-400/15 text-emerald-200 border-emerald-400/20";
  return (
    <li className="flex items-center justify-between gap-2">
      <div className="flex items-center gap-2 min-w-0">
        <span
          className={`shrink-0 rounded-md border px-1.5 py-0.5 text-[10px] font-semibold tracking-wider uppercase ${chip}`}
        >
          {who}
        </span>
        <span className="truncate text-ink-muted">{what}</span>
      </div>
      <span className="shrink-0 text-[10px] font-mono uppercase tracking-widest text-ink-dim">{when}</span>
    </li>
  );
}
