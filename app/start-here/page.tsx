import type { Metadata } from "next";
import { CalendarCheck2, Check, MessageCircle } from "lucide-react";
import PendingGhlStartHereForm from "@/app/components/PendingGhlStartHereForm";
import { SuperMicahLeadFormTrigger } from "@/app/components/SuperMicahLeadForm";
import TrackedLink from "@/app/components/TrackedLink";
import { DISCOVERY_CALL_HREF } from "@/app/lib/booking";
import { createPageMetadata } from "@/app/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Start Here",
  description:
    "Tell Directive OS about your business, your current operational bottleneck and what you would like to improve.",
  path: "/start-here",
});

export default function StartHerePage() {
  return (
    <main>
      <section className="relative overflow-hidden pb-16 pt-36 sm:pt-44">
        <div aria-hidden className="absolute left-[-10rem] top-0 h-[38rem] w-[38rem] rounded-full bg-violet-600/15 blur-[170px]" />
        <div className="site-container relative grid gap-12 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
          <div className="lg:sticky lg:top-32">
            <p className="eyebrow">Start Here</p>
            <h1 className="mt-6 text-[clamp(3.2rem,7vw,6.4rem)] font-semibold leading-[0.96] tracking-[-0.055em] text-white">
              Tell us what you would like to improve.
            </h1>
            <p className="section-copy mt-7">
              Tell us about your business, your current bottleneck, and what you would like to improve.
            </p>

            <ul className="mt-8 grid gap-3">
              {["Share the practical context", "Identify the highest-value bottleneck", "Choose the simplest useful next step"].map((item) => (
                <li key={item} className="flex items-center gap-3 text-sm text-ink-muted">
                  <Check className="h-4 w-4 text-teal-300" aria-hidden />
                  {item}
                </li>
              ))}
            </ul>

            <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
              <SuperMicahLeadFormTrigger className="btn-micah inline-flex items-center justify-center gap-2 rounded-2xl px-6 py-4 text-sm font-semibold text-white">
                <MessageCircle className="h-4 w-4" aria-hidden />
                Let’s Chat
              </SuperMicahLeadFormTrigger>
              <TrackedLink
                href={DISCOVERY_CALL_HREF}
                external
                eventName="calendar_open"
                eventSource="start-here"
                eventLabel="Book Business Discovery"
                className="btn-ghost inline-flex items-center justify-center gap-2 rounded-2xl px-6 py-4 text-sm font-semibold text-white"
              >
                <CalendarCheck2 className="h-4 w-4" aria-hidden />
                Book Business Discovery
              </TrackedLink>
            </div>
          </div>

          <section aria-labelledby="start-here-form-title" className="surface-card rounded-[2rem] p-6 sm:p-9">
            <h2 id="start-here-form-title" className="text-2xl font-semibold tracking-tight text-white">Tell DOS about the business</h2>
            <p className="mt-3 text-sm leading-relaxed text-ink-muted">
              Short answers are fine. The current working form will remain in place until the final integration details are supplied.
            </p>
            <PendingGhlStartHereForm />
          </section>
        </div>
      </section>
    </main>
  );
}
