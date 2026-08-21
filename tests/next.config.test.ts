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
});
