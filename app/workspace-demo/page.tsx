import type { Metadata } from "next";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { DOS_WORKSPACE_LIVE_URL } from "../lib/dos-workspace";

export const metadata: Metadata = {
  title: "DOS Workspace Demo",
  description:
    "Explore the DOS Workspace demo — enquiries, bookings and customer conversations in one premium business hub.",
};

export default function WorkspaceDemoPage() {
  return (
    <main className="relative flex min-h-screen flex-col bg-[#03050a] pt-28 sm:pt-32">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-violet-500/15 to-transparent blur-3xl" />

      <div className="relative z-10 mx-auto w-full max-w-[1600px] flex-1 px-3 sm:px-4 pb-6 flex flex-col">
        <div
          className="flex items-center justify-center gap-2 rounded-xl border border-amber-400/25 bg-gradient-to-r from-amber-500/15 via-violet-600/20 to-fuchsia-600/15 px-4 py-2.5 text-center shadow-[0_0_40px_-12px_rgba(245,158,11,0.35)] backdrop-blur-md sm:gap-3"
          role="status"
        >
          <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-amber-300 shadow-[0_0_10px_2px_rgba(252,211,77,0.8)]" />
          <span className="text-[11px] sm:text-xs font-semibold uppercase tracking-[0.2em] text-amber-100/95">
            Demo mode — Sample business workspace
          </span>
        </div>

        <p className="mt-3 text-center text-xs text-ink-muted max-w-xl mx-auto leading-relaxed px-2">
          Interactive preview. If the workspace does not appear below, open it directly — some browsers block embedded apps.
        </p>

        <div className="mt-4 flex flex-1 min-h-0 flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#06080f] shadow-[0_0_60px_-20px_rgba(139,92,246,0.45)] ring-1 ring-violet-500/20">
          <iframe
            title="DOS Workspace demo"
            src={DOS_WORKSPACE_LIVE_URL}
            className="h-[min(78vh,900px)] w-full flex-1 border-0 bg-[#06080f] sm:h-[min(82vh,960px)]"
            referrerPolicy="strict-origin-when-cross-origin"
            allow="clipboard-read; clipboard-write"
          />
        </div>

        <div className="mt-4 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <a
            href={DOS_WORKSPACE_LIVE_URL}
            target="_blank"
            rel="noreferrer"
            className="btn-neon inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold text-white"
          >
            Open in new tab
            <ExternalLink className="h-4 w-4" />
          </a>
          <Link href="/pricing" className="btn-ghost rounded-xl px-5 py-2.5 text-sm font-medium text-white">
            View pricing
          </Link>
        </div>
      </div>
    </main>
  );
}
