import type { Metadata } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { CalendarCheck2, CheckCircle2, MessageCircle } from "lucide-react";
import TalkToMicahButton from "@/app/components/TalkToMicahButton";
import TrackedLink from "@/app/components/TrackedLink";
import { DISCOVERY_CALL_HREF } from "@/app/lib/booking";
import { createPageMetadata } from "@/app/lib/seo";
import {
  START_HERE_SUCCESS_COOKIE,
  START_HERE_SUCCESS_VALUE,
} from "@/app/lib/start-here-success";

export const metadata: Metadata = {
  ...createPageMetadata({
    title: "Business Check Submitted",
    description:
      "Your Directive OS Business Check has been submitted successfully.",
    path: "/start-here/thank-you",
  }),
  robots: {
    index: false,
    follow: false,
  },
};

export default async function StartHereThankYouPage() {
  const cookieStore = await cookies();
  const submissionConfirmed =
    cookieStore.get(START_HERE_SUCCESS_COOKIE)?.value ===
    START_HERE_SUCCESS_VALUE;

  if (!submissionConfirmed) {
    redirect("/start-here");
  }

  return (
    <main>
      <section className="relative flex min-h-[78vh] items-center overflow-hidden pb-20 pt-36 sm:pt-44">
        <div
          aria-hidden
          className="absolute left-1/2 top-1/3 h-[34rem] w-[50rem] -translate-x-1/2 rounded-full bg-violet-600/15 blur-[170px]"
        />
        <div className="site-container relative">
          <div className="surface-card mx-auto max-w-3xl rounded-[2rem] p-7 text-center sm:p-12">
            <div className="mx-auto inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 via-fuchsia-500 to-teal-400 shadow-[0_0_48px_-8px_rgba(155,92,255,0.8)]">
              <CheckCircle2 className="h-8 w-8 text-white" aria-hidden />
            </div>

            <p className="eyebrow mt-8">Start Here</p>
            <h1 className="mx-auto mt-5 max-w-xl text-[clamp(2.4rem,5vw,4rem)] font-semibold leading-[0.98] tracking-[-0.05em] text-white">
              Thanks — your Business Check has been submitted.
            </h1>

            <div className="mx-auto mt-7 max-w-2xl space-y-4 text-base leading-relaxed text-ink-muted sm:text-lg">
              <p>We&apos;ve received your information.</p>
              <p>
                The next step is a Business Discovery, where we&apos;ll review
                your main bottleneck and determine the most practical DOS
                starting point.
              </p>
            </div>

            <div className="mx-auto mt-9 grid max-w-xl gap-3 sm:grid-cols-2">
              <TrackedLink
                href={DISCOVERY_CALL_HREF}
                external
                eventName="calendar_open"
                eventSource="start-here-thank-you"
                eventLabel="Book Business Discovery"
                className="btn-neon inline-flex items-center justify-center gap-2 rounded-2xl px-6 py-4 text-sm font-semibold text-white"
              >
                <CalendarCheck2 className="h-4 w-4" aria-hidden />
                Book Business Discovery
              </TrackedLink>
              <TalkToMicahButton
                context="start-here-thank-you"
                className="btn-micah inline-flex items-center justify-center gap-2 rounded-2xl px-6 py-4 text-sm font-semibold text-white"
              >
                <MessageCircle className="h-4 w-4" aria-hidden />
                Talk to Micah
              </TalkToMicahButton>
            </div>

            <p className="mt-7 text-sm text-ink-muted">
              We&apos;ve also sent you a confirmation by email and SMS.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
