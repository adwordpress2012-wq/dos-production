"use client";

import { Phone } from "lucide-react";
import { useMicahExperience } from "./MicahExperienceProvider";

type Props = {
  className?: string;
  context?: string;
  children?: React.ReactNode;
  showIcon?: boolean;
};

export default function TalkToMicahButton({
  className = "btn-primary",
  context = "site",
  children = "Talk to Micah",
  showIcon = false,
}: Props) {
  const { openMicah } = useMicahExperience();

  return (
    <button type="button" onClick={() => openMicah(context)} className={className}>
      {showIcon ? <Phone className="h-4 w-4" aria-hidden /> : null}
      {children}
    </button>
  );
}
