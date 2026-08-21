import nextConfig from "@/../next.config";

describe("next.config security headers", () => {
  it("applies headers to every route", async () => {
    const config = await nextConfig.headers!();

    expect(config).toHaveLength(1);
    expect(config[0].source).toBe("/:path*");
  });

  it("sets the standard security header set", async () => {
    const config = await nextConfig.headers!();
    const headers = new Map(config[0].headers.map((header) => [header.key, header.value]));

    expect(headers.get("X-Frame-Options")).toBe("DENY");
    expect(headers.get("X-Content-Type-Options")).toBe("nosniff");
    expect(headers.get("Referrer-Policy")).toBe("strict-origin-when-cross-origin");
    expect(headers.get("Permissions-Policy")).toBe("camera=(), microphone=(), geolocation=()");
    expect(headers.get("Strict-Transport-Security")).toContain("max-age=");
    expect(headers.get("Strict-Transport-Security")).toContain("includeSubDomains");
  });

  it("disables the X-Powered-By header", () => {
    expect(nextConfig.poweredByHeader).toBe(false);
  });

  it("sets a content security policy allowlisting self and Plausible", async () => {
    const config = await nextConfig.headers!();
    const headers = new Map(config[0].headers.map((header) => [header.key, header.value]));
    const csp = headers.get("Content-Security-Policy") ?? "";

    expect(csp).toContain("default-src 'self'");
    expect(csp).toContain("script-src 'self' 'unsafe-inline' https://plausible.io");
    expect(csp).toContain("connect-src 'self' https://plausible.io");
    expect(csp).toContain("frame-ancestors 'none'");
    expect(csp).toContain("object-src 'none'");
  });

  it("omits Plausible from the CSP when analytics are pointed elsewhere", async () => {
    const previous = process.env.NEXT_PUBLIC_PLAUSIBLE_SCRIPT_SRC;
    process.env.NEXT_PUBLIC_PLAUSIBLE_SCRIPT_SRC = "https://analytics.example.com/js/script.js";

    try {
      jest.resetModules();
      const freshConfig = require("@/../next.config").default as typeof nextConfig;
      const config = await freshConfig.headers!();
      const headers = new Map(config[0].headers.map((header) => [header.key, header.value]));
      const csp = headers.get("Content-Security-Policy") ?? "";

      expect(csp).toContain("https://analytics.example.com");
      expect(csp).not.toContain("plausible.io");
    } finally {
      if (previous === undefined) delete process.env.NEXT_PUBLIC_PLAUSIBLE_SCRIPT_SRC;
      else process.env.NEXT_PUBLIC_PLAUSIBLE_SCRIPT_SRC = previous;
    }
  });
});
