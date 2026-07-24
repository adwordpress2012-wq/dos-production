import Link from "next/link";
import { ArrowRight } from "lucide-react";
import TrackedLink from "./TrackedLink";
import { DISCOVERY_CALL_HREF } from "@/app/lib/booking";

type Props = {
  eyebrow: string;
  title: string;
  description: string;
  secondaryHref?: string;
  secondaryLabel?: string;
  breadcrumbs?: { label: string; href?: string }[];
};

export default function PublicPageHero({
  eyebrow,
  title,
  description,
  secondaryHref = "/start-here",
  secondaryLabel = "Start Here",
  breadcrumbs,
}: Props) {
  return (
    <section className="relative overflow-hidden pb-20 pt-36 sm:pt-44">
      <div aria-hidden className="absolute left-1/2 top-0 h-[34rem] w-[60rem] -translate-x-1/2 rounded-full bg-violet-600/16 blur-[180px]" />
      <div className="site-container relative">
        {breadcrumbs?.length ? (
          <nav aria-label="Breadcrumb" className="mb-7">
            <ol className="flex flex-wrap items-center gap-2 text-sm text-ink-muted">
              {breadcrumbs.map((item, index) => (
                <li key={`${item.label}-${item.href ?? "current"}`} className="flex items-center gap-2">
                  {index > 0 ? <span aria-hidden>/</span> : null}
                  {item.href ? (
                    <Link href={item.href} className="font-medium text-violet-200 hover:text-white">
                      {item.label}
                    </Link>
                  ) : (
                    <span aria-current="page">{item.label}</span>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        ) : null}
        <p className="eyebrow">{eyebrow}</p>
        <h1 className="mt-6 max-w-5xl text-[clamp(3rem,7vw,6.7rem)] font-semibold leading-[0.98] tracking-[-0.055em] text-white">
          {title}
        </h1>
        <p className="section-copy mt-7">{description}</p>
        <div className="mt-9 flex flex-wrap gap-3">
          <TrackedLink
            href={DISCOVERY_CALL_HREF}
            external
            eventName="calendar_open"
            eventSource="page-hero"
            eventLabel="Book Business Discovery"
            className="btn-primary rounded-2xl px-6 py-4 text-sm font-semibold"
          >
            Book Business Discovery <ArrowRight className="h-4 w-4" aria-hidden />
          </TrackedLink>
          <Link href={secondaryHref} className="btn-ghost inline-flex items-center justify-center rounded-2xl px-6 py-4 text-sm font-semibold text-white">
            {secondaryLabel}
          </Link>
        </div>
      </div>
    </section>
  );
}
