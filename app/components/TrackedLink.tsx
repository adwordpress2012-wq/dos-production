"use client";

import Link from "next/link";
import type { AnchorHTMLAttributes, ReactNode } from "react";
import type { DosEventName } from "@/app/lib/analytics";
import { trackDosEvent } from "@/app/lib/analytics";

type Props = {
  href: string;
  eventName: DosEventName;
  eventSource?: string;
  eventLabel?: string;
  className?: string;
  children: ReactNode;
  external?: boolean;
} & Pick<AnchorHTMLAttributes<HTMLAnchorElement>, "aria-label">;

export default function TrackedLink({
  href,
  eventName,
  eventSource,
  eventLabel,
  className,
  children,
  external,
  ...rest
}: Props) {
  const track = () =>
    trackDosEvent(eventName, {
      source: eventSource,
      label: eventLabel,
      destination: href,
    });

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        onClick={track}
        className={className}
        {...rest}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} onClick={track} className={className} {...rest}>
      {children}
    </Link>
  );
}
