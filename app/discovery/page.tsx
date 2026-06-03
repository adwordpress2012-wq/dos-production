import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ClipboardList, Sparkles } from "lucide-react";
import GlowCard from "../components/GlowCard";
import DiscoveryForm from "./DiscoveryForm";

export const metadata: Metadata = {
  title: "Operational Discovery",
  description:
    "Start an Operational Discovery with DOS. Share what is slowing your small business down so DOS can map and quote the right system build.",
};

export default function Page() {
  return (
    <main className="relative pt-32 sm:pt-40 pb-20">
      <section className="mx-auto max-w-6xl px-6">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-medium text-ink-muted transition hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to DOS
        </Link>

        <div className="mt-8 grid gap-10 lg:grid-cols-12 lg:items-start">
          <div className="lg:col-span-5">
            <span className="inline-flex items-center gap-2 rounded-full border border-violet-400/20 bg-violet-500/10 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.2em] text-violet-200">
              <Sparkles className="h-3.5 w-3.5 text-violet-300" />
              Operational Discovery
            </span>
            <h1 className="mt-5 text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
              Tell DOS what is slowing the business down.
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-ink-muted sm:text-lg">
              This form gives Jaze the context needed to review your enquiries, workflow gaps,
              admin load and first system priority before recommending the next step.
            </p>

            <GlowCard tone="cyan" className="mt-8">
              <ClipboardList className="h-5 w-5 text-cyan-300" />
              <h2 className="mt-4 text-lg font-semibold tracking-tight">What happens next</h2>
              <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                DOS reviews the request, maps the likely bottlenecks, then contacts you to discuss a
                custom system build. No package pricing or quote calculator is used here.
              </p>
            </GlowCard>
          </div>

          <div className="lg:col-span-7">
            <GlowCard tone="violet" className="h-full">
              <h2 className="text-xl font-semibold tracking-tight">Operational Discovery Form</h2>
              <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                Share the practical details. Short answers are fine.
              </p>
              <DiscoveryForm />
            </GlowCard>
          </div>
        </div>
      </section>
    </main>
  );
}
