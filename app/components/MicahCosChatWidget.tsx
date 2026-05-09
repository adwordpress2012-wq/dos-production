"use client";

import Script from "next/script";
import { MessageSquare } from "lucide-react";

/** Same COS-hosted Micah web chat demo linked across DOS (Hero, home). Optional script loads production widget when set in env. */
const COS_CHAT_DEMO_URL = "https://chatos.com.au";
const WIDGET_SCRIPT = process.env.NEXT_PUBLIC_MICAH_COS_CHAT_WIDGET_SCRIPT;

export default function MicahCosChatWidget() {
  return (
    <>
      {WIDGET_SCRIPT ? <Script src={WIDGET_SCRIPT} strategy="afterInteractive" /> : null}
      <div className="rounded-2xl border border-cyan-400/25 bg-gradient-to-br from-cyan-400/[0.12] via-white/[0.04] to-violet-500/[0.08] p-5 sm:p-6 ring-glow-soft">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-start gap-3">
            <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-400 via-emerald-400 to-violet-500 text-white shadow-[0_0_24px_-6px_rgba(34,211,238,0.65)]">
              <MessageSquare className="h-5 w-5" aria-hidden />
            </span>
            <div>
              <p className="text-sm font-semibold text-white">Micah · COS web chat</p>
              <p className="mt-1 text-sm text-ink-muted leading-relaxed">
                Open the live chat demo powered by COS — the same Micah experience we link from DOS.
              </p>
            </div>
          </div>
          <a
            href={COS_CHAT_DEMO_URL}
            target="_blank"
            rel="noreferrer"
            className="btn-neon inline-flex shrink-0 items-center justify-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold text-white whitespace-nowrap"
          >
            Open chat <MessageSquare className="h-4 w-4 opacity-90" />
          </a>
        </div>
        {!WIDGET_SCRIPT ? (
          <p className="mt-4 text-xs text-ink-dim border-t border-white/10 pt-4">
            Chat opens at chatos.com.au in a new tab. If an on-site bubble appears here, your organisation&apos;s COS widget script is configured via{" "}
            <code className="text-violet-300/90">NEXT_PUBLIC_MICAH_COS_CHAT_WIDGET_SCRIPT</code>.
          </p>
        ) : (
          <p className="mt-4 text-xs text-ink-dim border-t border-white/10 pt-4">
            Use the chat button here or the bubble when it loads. You can still open the full demo in a new tab.
          </p>
        )}
      </div>
    </>
  );
}
