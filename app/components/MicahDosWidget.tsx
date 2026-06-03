"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

const MICAH_CLIENT_ID = "directiveos-dos";
const MICAH_API_BASE = "https://chatos.com.au";
const MICAH_SCRIPT_VERSION = "2026-06-03-dos";

const HIDDEN_ROUTE_PREFIXES = [
  "/terms",
  "/privacy",
  "/acceptable-use",
  "/cancellation-policy",
  "/number-policy",
  "/saas/quote/builder",
];

function shouldHideMicah(pathname: string | null) {
  if (!pathname) return false;
  return HIDDEN_ROUTE_PREFIXES.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`)
  );
}

export default function MicahDosWidget() {
  const pathname = usePathname();
  const isHidden = shouldHideMicah(pathname);

  useEffect(() => {
    if (!isHidden && !document.querySelector('script[src^="/dos-micah-widget.js"]')) {
      const script = document.createElement("script");
      script.src = `/dos-micah-widget.js?v=${MICAH_SCRIPT_VERSION}`;
      script.async = true;
      script.setAttribute("data-client-id", MICAH_CLIENT_ID);
      script.setAttribute("data-api-base", MICAH_API_BASE);
      document.body.appendChild(script);
    }

    const widget = document.querySelector<HTMLElement>(".micah-widget-wrap");
    if (!widget) return;
    widget.style.display = isHidden ? "none" : "";
  }, [isHidden]);

  return null;
}
