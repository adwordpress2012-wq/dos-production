import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const SECURE_COMMAND_CENTRE_URL = "https://command.directiveos.com.au";
const BUSINESS_DISCOVERY_URL =
  "https://api.leadconnectorhq.com/widget/booking/QAKm8ZjgD7oceOc8nN0b";
const ARC_ERA_HOST = "arc.directiveos.com.au";
const SHELTON_LAW_HOST = "sl.directiveos.com.au";
const SMART_QUOTE_HOST = "smart.directiveos.com.au";
const MAIN_SITE_HOSTS = new Set(["directiveos.com.au", "www.directiveos.com.au"]);

const INTERNAL_PAGE_PREFIXES = [
  "/admin",
  "/command-centre",
] as const;
const QUOTE_BUILDER_PREFIXES = [
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

  if (host === SMART_QUOTE_HOST && pathname === "/") {
    const destination = req.nextUrl.clone();
    destination.pathname = "/marketing/saas-quote-builder";
    destination.search = "";
    const response = NextResponse.rewrite(destination);
    response.headers.set("Cache-Control", "private, no-store");
    response.headers.set("X-Robots-Tag", "noindex, nofollow, noarchive");
    return response;
  }

  if (host === SHELTON_LAW_HOST && pathname === "/") {
    const destination = req.nextUrl.clone();
    destination.pathname = "/pricing";
    destination.search = "";
    return noIndexRedirect(destination.toString());
  }

  if (host === ARC_ERA_HOST && pathname === "/") {
    const destination = req.nextUrl.clone();
    destination.pathname = "/arc-era";
    return NextResponse.rewrite(destination);
  }

  if (MAIN_SITE_HOSTS.has(host) && pathname === "/flr/real-estate") {
    const response = new NextResponse("Not Found", { status: 404 });
    response.headers.set("Cache-Control", "private, no-store");
    response.headers.set("X-Robots-Tag", "noindex, nofollow, noarchive");
    return response;
  }

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

  if (
    QUOTE_BUILDER_PREFIXES.some(
      (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`)
    )
  ) {
    const isLocalHost = host === "localhost" || host === "127.0.0.1";
    const isProtectedPreviewHost = host.endsWith(".vercel.app");
    const isSmartQuoteHost = host === SMART_QUOTE_HOST;
    if (!isLocalHost && !isProtectedPreviewHost && !isSmartQuoteHost) {
      return noIndexRedirect(SECURE_COMMAND_CENTRE_URL);
    }
    const response = NextResponse.next();
    response.headers.set("Cache-Control", "private, no-store");
    response.headers.set("X-Robots-Tag", "noindex, nofollow, noarchive");
    return response;
  }

  if (pathname === "/pricing" || pathname.startsWith("/pricing/")) {
    if (host === SHELTON_LAW_HOST || host === "localhost" || host === "127.0.0.1") {
      const response = NextResponse.next();
      response.headers.set("X-Robots-Tag", "noindex, nofollow, noarchive");
      return response;
    }
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
    "/flr/real-estate",
  ],
};
