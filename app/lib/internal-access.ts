import "server-only";

import { timingSafeEqual } from "node:crypto";
import { NextResponse, type NextRequest } from "next/server";

const INTERNAL_API_TOKEN_ENV = "DOS_INTERNAL_API_TOKEN";

function tokensMatch(provided: string, expected: string): boolean {
  const providedBuffer = Buffer.from(provided);
  const expectedBuffer = Buffer.from(expected);

  return (
    providedBuffer.length === expectedBuffer.length &&
    timingSafeEqual(providedBuffer, expectedBuffer)
  );
}

export function requireInternalApiAuth(req: NextRequest): NextResponse | null {
  const expectedToken = process.env[INTERNAL_API_TOKEN_ENV]?.trim();
  const authorization = req.headers.get("authorization");
  const providedToken = authorization?.startsWith("Bearer ")
    ? authorization.slice("Bearer ".length).trim()
    : "";

  if (!expectedToken || !providedToken || !tokensMatch(providedToken, expectedToken)) {
    return NextResponse.json(
      { error: "Unauthorized." },
      {
        status: 401,
        headers: {
          "Cache-Control": "no-store",
          "WWW-Authenticate": 'Bearer realm="DOS Internal API"',
          "X-Robots-Tag": "noindex, nofollow, noarchive",
        },
      }
    );
  }

  return null;
}
