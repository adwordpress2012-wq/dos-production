import type { Metadata } from "next";
import Link from "next/link";
import { Headphones, Phone } from "lucide-react";

import MicahCosChatWidget from "@/app/components/MicahCosChatWidget";
import OfficialMicahProfile from "@/app/components/OfficialMicahProfile";

export const metadata: Metadata = {
  alternates: { canonical: "/onboarding/micah" },
  title: "Micah onboarding",
  description:
    "Start your DOS stack with Micah AI Receptionist — then COS, BOS and web are layered on during onboarding.",
};

const MICAH_PHONE_DISPLAY = "02 5950 6382";
const MICAH_PHONE_LINK = "tel:0259506382";

export default function MicahOnboardingEntryPage() {
  return (
    <main className="relative pt-28 sm:pt-36 pb-16">
      <section className="mx-auto max-w-3xl px-6">
        <span className="inline-flex items-center gap-2 rounded-full border border-fuchsia-400/25 bg-fuchsia-500/10 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.2em] text-fuchsia-200">
          <Headphones className="h-3.5 w-3.5 text-fuchsia-300" />
          Micah-first onboarding
        </span>
        <h1 className="mt-5 text-3xl sm:text-4xl font-semibold tracking-tight leading-[1.08]">
          Bring <span className="text-gradient-purple">Micah</span> online first
        </h1>
        <p className="mt-4 text-base sm:text-lg text-ink-muted leading-relaxed">
          Full DOS onboarding covers Micah, COS, BOS and your website in one flow. Use this entry when you
          want to emphasise the AI receptionist — you&apos;ll land in the same intake as{" "}
          <Link href="/onboarding" className="text-violet-300 hover:underline">
            /onboarding
          </Link>
          .
        </p>

        <div className="mt-10 glass-strong rounded-2xl p-6 sm:p-8 space-y-6 border border-white/10">
          <p className="text-sm text-ink-muted leading-relaxed">
            Micah answers calls 24/7, qualifies leads and books jobs. During onboarding we provision numbers,
            routing and hand-off to your team.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              href="/onboarding"
              className="btn-neon inline-flex items-center justify-center px-8 py-3.5 rounded-xl text-sm font-semibold text-white text-center"
            >
              Start full DOS onboarding
            </Link>
            <Link
              href="/onboarding/website-rebuild"
              className="btn-ghost inline-flex items-center justify-center px-6 py-3.5 rounded-xl text-sm font-medium text-white border border-white/10 text-center"
            >
              Website-only onboarding
            </Link>
          </div>
        </div>

        <div className="mt-10">
          <OfficialMicahProfile context="micah-onboarding" priority />
        </div>

        <div id="talk-to-micah-live" className="mt-10 scroll-mt-28 rounded-2xl border border-white/10 bg-white/[0.03] p-6">
          <p className="text-xs font-mono uppercase tracking-widest text-ink-dim mb-4">Talk to Micah live</p>
          <a
            href={MICAH_PHONE_LINK}
            className="inline-flex items-center gap-3 rounded-xl border border-fuchsia-400/20 bg-fuchsia-500/10 px-5 py-4 text-white hover:border-fuchsia-400/40 transition"
          >
            <span className="inline-flex h-11 w-11 items-center justify-center rounded-lg bg-fuchsia-500/20 text-fuchsia-200">
              <Phone className="h-5 w-5" aria-hidden />
            </span>
            <span>
              <span className="block text-[11px] font-mono uppercase tracking-widest text-ink-dim">Micah AI</span>
              <span className="text-lg font-semibold tabular-nums">{MICAH_PHONE_DISPLAY}</span>
            </span>
          </a>
        </div>

        <div className="mt-12">
          <MicahCosChatWidget />
        </div>
      </section>
    </main>
  );
}
