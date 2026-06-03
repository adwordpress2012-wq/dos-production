import Link from "next/link";
import { ArrowRight, MessageSquare, PhoneCall, ShieldCheck, Sparkles, Zap } from "lucide-react";

const MICAH_PHONE_DISPLAY = "02 5950 6382";
const MICAH_PHONE_LINK = "tel:0259506382";
const COS_DEMO_URL = "https://chatos.com.au";

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
              <span className="tracking-[0.16em] uppercase">Live demo — call or message</span>
            </div>

            <h1 className="mt-7 text-4xl sm:text-6xl lg:text-[80px] font-semibold tracking-tight leading-[1.02] max-w-5xl">
              <span className="text-white">Never Miss Another</span>{" "}
              <span className="text-gradient-purple">Booking</span>{" "}
              <span className="text-white">Again.</span>
            </h1>

            <p className="mt-6 text-base sm:text-lg lg:text-xl text-ink-muted max-w-2xl leading-relaxed">
              DOS helps small businesses automate customer enquiries, bookings, and follow-ups through
              AI receptionists, website conversations, SMS, WhatsApp, and modern website systems.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 w-full max-w-xl">
              <Link
                href="/contact"
                className="btn-neon inline-flex w-full sm:w-auto items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-white"
              >
                Book Your Free Demo <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="#try-micah-live"
                className="btn-ghost inline-flex w-full sm:w-auto items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-medium text-white"
              >
                See Micah In Action
              </Link>
            </div>

            <div className="mt-9 grid w-full max-w-2xl gap-3 sm:grid-cols-2">
              <a
                href={MICAH_PHONE_LINK}
                className="group relative overflow-hidden rounded-2xl border border-fuchsia-400/30 bg-gradient-to-br from-fuchsia-500/20 via-violet-500/20 to-cyan-400/20 px-5 py-4 text-left ring-glow-soft transition hover:border-fuchsia-400/60 hover:from-fuchsia-500/30 hover:via-violet-500/30 hover:to-cyan-400/30"
                aria-label={`Call Micah now on ${MICAH_PHONE_DISPLAY}`}
              >
                <span
                  aria-hidden
                  className="absolute -inset-px rounded-2xl bg-gradient-to-r from-fuchsia-500/30 via-violet-500/30 to-cyan-400/30 opacity-0 blur-md transition group-hover:opacity-70"
                />
                <span className="relative flex items-center gap-3">
                  <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-fuchsia-500 via-violet-500 to-cyan-400 text-white shadow-[0_0_20px_-4px_rgba(168,85,247,0.7)]">
                    <PhoneCall className="h-5 w-5" />
                  </span>
                  <span className="flex flex-col">
                    <span className="text-base font-semibold text-white">Call Micah Now</span>
                    <span className="font-mono text-sm tracking-wider text-cyan-200">
                      {MICAH_PHONE_DISPLAY}
                    </span>
                  </span>
                </span>
              </a>
              <a
                href={COS_DEMO_URL}
                target="_blank"
                rel="noreferrer"
                className="group relative overflow-hidden rounded-2xl border border-cyan-400/30 bg-gradient-to-br from-cyan-400/15 via-emerald-400/10 to-violet-500/15 px-5 py-4 text-left ring-glow-soft transition hover:border-cyan-300/70 hover:from-cyan-400/25 hover:via-emerald-400/20 hover:to-violet-500/25"
              >
                <span
                  aria-hidden
                  className="absolute -inset-px rounded-2xl bg-gradient-to-r from-cyan-400/30 via-emerald-400/20 to-violet-500/30 opacity-0 blur-md transition group-hover:opacity-70"
                />
                <span className="relative flex items-center gap-3">
                  <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-400 via-emerald-400 to-violet-500 text-white shadow-[0_0_20px_-4px_rgba(34,211,238,0.75)]">
                    <MessageSquare className="h-5 w-5" />
                  </span>
                  <span className="flex flex-col">
                    <span className="inline-flex items-center gap-1.5 text-base font-semibold text-white">
                      Try Micah Chat Demo <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-1" />
                    </span>
                    <span className="text-sm font-medium text-emerald-200">Website conversation demo</span>
                  </span>
                </span>
              </a>
            </div>

            <div className="mt-5 flex flex-col sm:flex-row items-center gap-3">
              <Link
                href="/pricing"
                className="btn-ghost inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium text-white"
              >
                View plans
              </Link>
              <Link
                href="/onboarding"
                className="btn-ghost inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium text-white"
              >
                Start onboarding
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
                <Sparkles className="h-3.5 w-3.5 text-violet-300" /> Managed end-to-end
              </span>
            </div>
          </div>

          {/* Hero dashboard mock */}
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
                  <div className="flex-1 text-center text-[11px] font-mono tracking-widest uppercase text-ink-dim">
                    dos · command centre
                  </div>
                  <span className="hidden sm:inline-flex items-center gap-1.5 rounded-full bg-emerald-400/10 px-2 py-0.5 text-[10px] font-medium text-emerald-300 border border-emerald-400/20">
                    <span className="h-1 w-1 rounded-full bg-emerald-400" />
                    Live
                  </span>
                </div>

                <div className="grid grid-cols-12 gap-3 p-4">
                  <DashStat label="Calls answered by Micah" value="1,284" delta="+18%" tone="violet" />
                  <DashStat label="Bookings confirmed" value="312" delta="+9%" tone="emerald" />
                  <DashStat label="Website conversations" value="4,902" delta="+24%" tone="cyan" />

                  <div className="col-span-12 lg:col-span-7 rounded-xl border border-white/5 bg-white/[0.02] p-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-medium text-ink-muted">Lead pipeline</span>
                      <span className="text-[10px] font-mono uppercase tracking-widest text-ink-dim">last 30d</span>
                    </div>
                    <Sparkline />
                  </div>

                  <div className="col-span-12 lg:col-span-5 rounded-xl border border-white/5 bg-white/[0.02] p-4">
                    <span className="text-xs font-medium text-ink-muted">Live activity</span>
                    <ul className="mt-3 space-y-2.5 text-[12px]">
                      <ActivityRow tone="violet" who="Micah" what="Booked 9:30am with Sarah W." when="just now" />
                      <ActivityRow tone="cyan" who="SMS" what="Replied to lead — Toowoomba" when="2m" />
                      <ActivityRow tone="emerald" who="Booking" what="Reminder sent · 14 attendees" when="6m" />
                      <ActivityRow tone="violet" who="Micah" what="Qualified inbound call · 3:48" when="11m" />
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
  // Simple inline SVG sparkline.
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
        <span className={`shrink-0 rounded-md border px-1.5 py-0.5 text-[10px] font-semibold tracking-wider uppercase ${chip}`}>
          {who}
        </span>
        <span className="truncate text-ink-muted">{what}</span>
      </div>
      <span className="shrink-0 text-[10px] font-mono uppercase tracking-widest text-ink-dim">{when}</span>
    </li>
  );
}
