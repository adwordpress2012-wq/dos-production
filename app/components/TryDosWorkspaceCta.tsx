import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { DOS_WORKSPACE_DEMO_PATH } from "../lib/dos-workspace";

const SUPPORTING =
  "Explore the DOS Workspace demo and see how enquiries, bookings and customer conversations are managed in one place.";

type Props = {
  /** Hero / pricing cards: full width stack. Nav: compact pill. */
  variant?: "hero" | "card" | "nav";
  showSupportingText?: boolean;
  /** Overrides default supporting copy when provided (empty string hides). */
  supportingText?: string;
  className?: string;
};

export default function TryDosWorkspaceCta({
  variant = "hero",
  showSupportingText = true,
  supportingText,
  className = "",
}: Props) {
  const isNav = variant === "nav";
  const isCard = variant === "card";
  const resolvedSupporting =
    supportingText !== undefined ? supportingText : SUPPORTING;

  const linkClass = [
    "group relative inline-flex items-center justify-center gap-2 overflow-hidden font-semibold text-white transition",
    "btn-workspace-glow rounded-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-400/80",
    isNav
      ? "px-3.5 py-2 text-xs sm:text-sm whitespace-nowrap"
      : isCard
        ? "w-full px-4 py-3 text-sm"
        : "px-6 py-3.5 text-sm sm:text-base min-w-[220px]",
  ].join(" ");

  const inner = (
    <>
      <span className="relative tracking-wide">TRY DOS Workspace</span>
      <ArrowRight className="relative h-4 w-4 shrink-0 transition group-hover:translate-x-0.5" />
    </>
  );

  if (isNav) {
    return (
      <Link href={DOS_WORKSPACE_DEMO_PATH} className={`${linkClass} ${className}`}>
        {inner}
      </Link>
    );
  }

  return (
    <div className={`flex flex-col items-center ${className}`}>
      <Link href={DOS_WORKSPACE_DEMO_PATH} className={linkClass}>
        {inner}
      </Link>
      {showSupportingText && resolvedSupporting ? (
        <p
          className={`mt-3 text-center text-ink-muted leading-relaxed ${
            isCard ? "text-xs max-w-[280px]" : "text-sm max-w-md px-2"
          }`}
        >
          {resolvedSupporting}
        </p>
      ) : null}
    </div>
  );
}
