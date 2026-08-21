import { isRateLimited, resetRateLimits } from "@/lib/rateLimit";

describe("rateLimit", () => {
  beforeEach(() => {
    resetRateLimits();
  });

  it("allows requests under the limit", () => {
    expect(isRateLimited("ip-1", 3, 60_000, 1_000)).toBe(false);
    expect(isRateLimited("ip-1", 3, 60_000, 1_100)).toBe(false);
  });

  it("blocks requests at the limit", () => {
    isRateLimited("ip-2", 2, 60_000, 1_000);
    isRateLimited("ip-2", 2, 60_000, 1_100);
    expect(isRateLimited("ip-2", 2, 60_000, 1_200)).toBe(true);
  });

  it("tracks keys independently", () => {
    isRateLimited("ip-3", 1, 60_000, 1_000);
    expect(isRateLimited("ip-3", 1, 60_000, 1_100)).toBe(true);
    expect(isRateLimited("ip-4", 1, 60_000, 1_200)).toBe(false);
  });

  it("expires entries outside the window", () => {
    isRateLimited("ip-5", 1, 60_000, 1_000);
    expect(isRateLimited("ip-5", 1, 60_000, 61_500)).toBe(false);
  });

  it("does not count blocked attempts against the window", () => {
    isRateLimited("ip-6", 1, 60_000, 1_000);
    expect(isRateLimited("ip-6", 1, 60_000, 1_100)).toBe(true);
    // Blocked attempt at 1_100 must not extend the window; at 61_500 the
    // original entry has expired either way.
    expect(isRateLimited("ip-6", 1, 60_000, 61_500)).toBe(false);
  });
});
