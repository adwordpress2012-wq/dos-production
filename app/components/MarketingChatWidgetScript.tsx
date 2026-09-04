"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Script from "next/script";

const STANDALONE_ROUTE_PREFIXES = [
  "/saas/quote/builder",
  "/marketing/saas-quote-builder",
  "/arc-era",
  "/pricing",
  "/flr",
];
const ARC_ERA_HOST = "arc.directiveos.com.au";
const FLR_HOST = "flr.directiveos.com.au";
const SMART_QUOTE_HOST = "smart.directiveos.com.au";

function isStandalonePath(pathname: string | null) {
  if (!pathname) return false;
  return STANDALONE_ROUTE_PREFIXES.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`)
  );
}

export default function MarketingChatWidgetScript() {
  const pathname = usePathname();
  const [hostname, setHostname] = useState<string | null>(null);

  useEffect(() => {
    setHostname(window.location.hostname.toLowerCase());
  }, []);

  if (
    hostname === null ||
    hostname === ARC_ERA_HOST ||
    hostname === FLR_HOST ||
    hostname === SMART_QUOTE_HOST ||
    isStandalonePath(pathname)
  ) {
    return null;
  }

  return (
    <Script
      id="micah-dos-chat-widget"
      src="https://widgets.leadconnectorhq.com/loader.js"
      data-resources-url="https://widgets.leadconnectorhq.com/chat-widget/loader.js"
      data-widget-id="6a56225582c5a91e7f5e4f3e"
      strategy="afterInteractive"
    />
  );
}
