import robots from "@/app/robots";

describe("robots.txt", () => {
  it("disallows crawlers on staging without advertising a sitemap", () => {
    process.env.DEPLOYMENT_ENV = "staging";
    try {
      expect(robots()).toEqual({ rules: { userAgent: "*", disallow: "/" } });
    } finally {
      delete process.env.DEPLOYMENT_ENV;
    }
  });
});
