import { buildAnalyticsPath, trackAnalyticsEvent, trackPageView } from "@/lib/analytics";

describe("analytics helpers", () => {
  const originalPlausible = window.plausible;

  afterEach(() => {
    window.plausible = originalPlausible;
    jest.restoreAllMocks();
  });

  it("builds absolute analytics URLs", () => {
    expect(buildAnalyticsPath("/blog", "?tag=nextjs")).toBe("https://blogfolio.dev/blog?tag=nextjs");
  });

  it("sends manual page views when plausible is available", () => {
    const plausible = jest.fn();

    window.plausible = plausible;

    trackPageView("/dev", "?filter=featured");

    expect(plausible).toHaveBeenCalledWith("pageview", {
      u: "https://blogfolio.dev/dev?filter=featured"
    });
  });

  it("sends custom events when plausible is available", () => {
    const plausible = jest.fn();

    window.plausible = plausible;

    trackAnalyticsEvent("Project CTA Click", {
      kind: "github",
      slug: "portfolio-website"
    });

    expect(plausible).toHaveBeenCalledWith("Project CTA Click", {
      props: {
        kind: "github",
        slug: "portfolio-website"
      }
    });
  });
});