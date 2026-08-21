/**
 * @jest-environment node
 */
import { proxy } from "@/proxy";
import { NextRequest } from "next/server";

function makeRequest(url = "https://wjbeast.com/"): NextRequest {
  return new NextRequest(url);
}

describe("proxy", () => {
  it("ships the strict policy as report-only on the response", () => {
    const response = proxy(makeRequest());

    const policy = response.headers.get("Content-Security-Policy-Report-Only");
    expect(policy).toBeTruthy();
    expect(response.headers.get("Content-Security-Policy")).toBeNull();

    expect(policy).toContain("default-src 'self'");
    expect(policy).toContain("'strict-dynamic'");
    expect(policy).toMatch(/script-src 'self' 'nonce-[A-Za-z0-9+/=]+' 'strict-dynamic'/);
    expect(policy).toContain("frame-ancestors 'none'");
  });

  it("generates a fresh nonce per request", () => {
    const first = proxy(makeRequest()).headers.get("Content-Security-Policy-Report-Only") ?? "";
    const second = proxy(makeRequest()).headers.get("Content-Security-Policy-Report-Only") ?? "";

    const nonceOf = (policy: string) => policy.match(/'nonce-([^']+)'/)?.[1];
    expect(nonceOf(first)).toBeTruthy();
    expect(nonceOf(first)).not.toBe(nonceOf(second));
  });

  it("allows unsafe-eval in development only", () => {
    const env = process.env as { NODE_ENV?: string };
    const previous = env.NODE_ENV;
    env.NODE_ENV = "development";

    try {
      const devPolicy = proxy(makeRequest()).headers.get("Content-Security-Policy-Report-Only") ?? "";
      expect(devPolicy).toContain("'unsafe-eval'");
    } finally {
      if (previous === undefined) delete env.NODE_ENV;
      else env.NODE_ENV = previous;
    }
  });
});
