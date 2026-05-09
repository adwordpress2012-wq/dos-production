"use client";

import { usePathname } from "next/navigation";

const STANDALONE_ROUTE_PREFIXES = ["/saas/quote/builder"];

function isStandaloneRoute(pathname: string | null): boolean {
  if (!pathname) return false;
  return STANDALONE_ROUTE_PREFIXES.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`)
  );
}

export default function ChromeGate({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  if (isStandaloneRoute(pathname)) return null;
  return <>{children}</>;
}
