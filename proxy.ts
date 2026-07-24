import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const SECURE_COMMAND_CENTRE_URL = "https://command.directiveos.com.au";
const BUSINESS_DISCOVERY_URL =
  "https://api.leadconnectorhq.com/widget/booking/QAKm8ZjgD7oceOc8nN0b";

const INTERNAL_PAGE_PREFIXES = [
  "/admin",
  "/command-centre",
  "/marketing/saas-quote-builder",
  "/saas/quote/builder",
] as const;

function noIndexRedirect(destination: string) {
  const response = NextResponse.redirect(destination, 307);
  response.headers.set("Cache-Control", "private, no-store");
  response.headers.set("X-Robots-Tag", "noindex, nofollow, noarchive");
  return response;
}

/**
 * Keep internal DOS surfaces off the public marketing deployment.
 * The separate Command Centre hostname owns authentication and access control.
 */
export function proxy(req: NextRequest) {
  const rawHost = req.headers.get("host") ?? "";
  const host = rawHost.split(":")[0]?.toLowerCase() ?? "";
  const pathname = req.nextUrl.pathname;
  const configuredAdminHost =
    process.env.NEXT_PUBLIC_ADMIN_HOST?.toLowerCase().trim() || "admin.directiveos.com.au";

  if (host && host === configuredAdminHost && pathname === "/") {
    return noIndexRedirect(SECURE_COMMAND_CENTRE_URL);
  }

  if (
    INTERNAL_PAGE_PREFIXES.some(
      (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`)
    )
  ) {
    return noIndexRedirect(SECURE_COMMAND_CENTRE_URL);
  }

  if (pathname === "/pricing" || pathname.startsWith("/pricing/")) {
    return noIndexRedirect(BUSINESS_DISCOVERY_URL);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/",
    "/admin/:path*",
    "/command-centre/:path*",
    "/marketing/saas-quote-builder/:path*",
    "/saas/quote/builder/:path*",
    "/pricing/:path*",
  ],
};
