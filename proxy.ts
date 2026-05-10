import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * When the deployment is accessed via the admin hostname, send "/" to Command Centre.
 * Add `admin.directiveos.com.au` in Vercel → Project → Domains and point DNS to Vercel.
 * Optional override: NEXT_PUBLIC_ADMIN_HOST (same host string).
 */
export function proxy(req: NextRequest) {
  const rawHost = req.headers.get("host") ?? "";
  const host = rawHost.split(":")[0]?.toLowerCase() ?? "";
  const configured =
    process.env.NEXT_PUBLIC_ADMIN_HOST?.toLowerCase().trim() || "admin.directiveos.com.au";

  if (host && host === configured) {
    const url = req.nextUrl.clone();
    if (url.pathname === "/") {
      url.pathname = "/admin";
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/"],
};
