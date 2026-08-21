import type { NextConfig } from "next";

const SECURITY_HEADERS = [
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" }
];

/**
 * Plausible is the only third-party origin the site talks to. When analytics
 * are disabled (no domain configured) the directives collapse to 'self'.
 */
function plausibleOrigins(): string[] {
  const source = process.env.NEXT_PUBLIC_PLAUSIBLE_SCRIPT_SRC ?? "https://plausible.io/js/script.manual.js";
  try {
    return [new URL(source).origin];
  } catch {
    return [];
  }
}

function buildContentSecurityPolicy(): string {
  const origins = plausibleOrigins();
  const scriptSources = ["'self'", "'unsafe-inline'", ...origins];
  const connectSources = ["'self'", ...origins];

  return [
    "default-src 'self'",
    `script-src ${scriptSources.join(" ")}`,
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data:",
    "font-src 'self'",
    `connect-src ${connectSources.join(" ")}`,
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "frame-ancestors 'none'"
  ].join("; ");
}

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Required for Docker standalone build (copies only necessary files into .next/standalone)
  output: "standalone",
  poweredByHeader: false,
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          ...SECURITY_HEADERS,
          { key: "Content-Security-Policy", value: buildContentSecurityPolicy() }
        ]
      }
    ];
  },
  images: {
    remotePatterns: []
  }
};

export default nextConfig;
