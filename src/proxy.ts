import { NextRequest, NextResponse } from "next/server";

/**
 * Per-request CSP nonce generation (Next.js 16 proxy convention).
 *
 * The full policy is set on the REQUEST so Next.js extracts the nonce and
 * stamps its own framework scripts; on the RESPONSE it ships as
 * Content-Security-Policy-Report-Only so violations surface in the browser
 * console without blocking anything. To enforce, rename the response header
 * to "Content-Security-Policy" once reports are clean.
 */
export function proxy(request: NextRequest) {
  const nonce = Buffer.from(crypto.randomUUID()).toString("base64");
  const isDev = process.env.NODE_ENV === "development";

  const cspHeader = [
    "default-src 'self'",
    // Host sources are ignored under 'strict-dynamic'; Plausible loads via
    // Next's own nonce'd loader. Listed for documentation and future flexibility.
    `script-src 'self' 'nonce-${nonce}' 'strict-dynamic'${isDev ? " 'unsafe-eval'" : ""} https://plausible.io`,
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data:",
    "font-src 'self'",
    "connect-src 'self' https://plausible.io",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "frame-ancestors 'none'"
  ].join("; ");

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-nonce", nonce);
  requestHeaders.set("Content-Security-Policy", cspHeader);

  const response = NextResponse.next({
    request: {
      headers: requestHeaders
    }
  });

  response.headers.set("Content-Security-Policy-Report-Only", cspHeader);

  return response;
}

export const config = {
  matcher: [
    {
      source: "/((?!api|_next/static|_next/image|favicon.ico).*)",
      missing: [
        { type: "header", key: "next-router-prefetch" },
        { type: "header", key: "purpose", value: "prefetch" }
      ]
    }
  ]
};
