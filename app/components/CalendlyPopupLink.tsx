"use client";

import { useEffect, type AnchorHTMLAttributes, type MouseEvent, type ReactNode } from "react";

const CALENDLY_URL = "https://calendly.com/adwordpress2012/dos-ai-business-system-demo";
const CALENDLY_SCRIPT_ID = "calendly-widget-script";
const CALENDLY_STYLES_ID = "calendly-widget-styles";

type CalendlyWindow = Window & {
  Calendly?: {
    initPopupWidget: (options: { url: string }) => void;
  };
};

type Props = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href" | "rel" | "target"> & {
  children: ReactNode;
};

function ensureCalendlyAssets() {
  if (!document.getElementById(CALENDLY_STYLES_ID)) {
    const styles = document.createElement("link");
    styles.id = CALENDLY_STYLES_ID;
    styles.rel = "stylesheet";
    styles.href = "https://assets.calendly.com/assets/external/widget.css";
    document.head.appendChild(styles);
  }

  if (!document.getElementById(CALENDLY_SCRIPT_ID)) {
    const script = document.createElement("script");
    script.id = CALENDLY_SCRIPT_ID;
    script.src = "https://assets.calendly.com/assets/external/widget.js";
    script.async = true;
    document.body.appendChild(script);
  }
}

export default function CalendlyPopupLink({ children, onClick, ...props }: Props) {
  useEffect(() => {
    ensureCalendlyAssets();
  }, []);

  function handleClick(event: MouseEvent<HTMLAnchorElement>) {
    onClick?.(event);
    if (event.defaultPrevented) return;

    const calendly = (window as CalendlyWindow).Calendly;
    if (!calendly?.initPopupWidget) return;

    event.preventDefault();
    calendly.initPopupWidget({ url: CALENDLY_URL });
  }

  return (
    <a href={CALENDLY_URL} target="_blank" rel="noreferrer" onClick={handleClick} {...props}>
      {children}
    </a>
  );
}
