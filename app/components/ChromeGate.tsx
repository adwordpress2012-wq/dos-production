"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

const SMART_QUOTE_HOST = "smart.directiveos.com.au";

const STANDALONE_ROUTE_PREFIXES = [
  "/saas/quote/builder",
  "/marketing/saas-quote-builder",
  "/arc-era",
  "/pricing",
  "/flr",
];

function isStandaloneRoute(pathname: string | null): boolean {
  if (!pathname) return false;
  return STANDALONE_ROUTE_PREFIXES.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`)
  );
}

export default function ChromeGate({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [hostname, setHostname] = useState<string | null>(null);

  useEffect(() => {
    setHostname(window.location.hostname.toLowerCase());
  }, []);

  if (hostname === SMART_QUOTE_HOST || isStandaloneRoute(pathname)) return null;
  return <div className="contents" data-site-chrome>{children}</div>;
}
