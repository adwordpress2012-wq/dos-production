import Link from "next/link";
import { ArrowRight } from "lucide-react";
import TalkToMicahButton from "./TalkToMicahButton";
import TrackedLink from "./TrackedLink";
import { DISCOVERY_CALL_HREF } from "@/app/lib/booking";

type Props = {
  title?: string;
  copy?: string;
  source?: string;
};

export default function PageCta({
  title = "Start with the biggest business bottleneck.",
  copy = "Tell DOS what is slowing the business down. We will identify the simplest practical path forward.",
  source = "page-cta",
}: Props) {
  return (
    <section className="site-section">
      <div className="site-container overflow-hidden rounded-[2rem] border border-white/[0.09] bg-gradient-to-br from-[#17192e] via-[#101225] to-[#0b0d1c] p-8 sm:p-12">
        <p className="eyebrow">The next practical step</p>
        <h2 className="mt-5 max-w-3xl text-4xl font-semibold tracking-tight text-white sm:text-6xl">{title}</h2>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink-muted">{copy}</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <TalkToMicahButton context={source} className="btn-micah inline-flex items-center justify-center rounded-2xl px-6 py-4 text-sm font-semibold text-white">
            Talk to Micah
          </TalkToMicahButton>
          <TrackedLink href={DISCOVERY_CALL_HREF} external eventName="calendar_open" eventSource={source} eventLabel="Book Business Discovery" className="btn-primary rounded-2xl px-6 py-4 text-sm font-semibold">
            Book Business Discovery <ArrowRight className="h-4 w-4" aria-hidden />
          </TrackedLink>
          <Link href="/start-here" className="btn-ghost inline-flex items-center justify-center rounded-2xl px-6 py-4 text-sm font-semibold text-white">
            Start Here
          </Link>
        </div>
      </div>
    </section>
  );
}
