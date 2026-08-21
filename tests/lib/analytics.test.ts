import { buildAnalyticsPath, trackAnalyticsEvent, trackPageView } from "@/lib/analytics";

const BASE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://wjbeast.com").replace(/\/$/, "");

describe("analytics helpers", () => {
  const originalPlausible = window.plausible;

  afterEach(() => {
    window.plausible = originalPlausible;
    jest.restoreAllMocks();
  });

  it("builds absolute analytics URLs", () => {
    expect(buildAnalyticsPath("/blog", "?tag=nextjs")).toBe(`${BASE_URL}/blog?tag=nextjs`);
  });

  it("sends manual page views when plausible is available", () => {
    const plausible = jest.fn();

    window.plausible = plausible;

    trackPageView("/dev", "?filter=featured");

    expect(plausible).toHaveBeenCalledWith("pageview", {
      u: `${BASE_URL}/dev?filter=featured`
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

  it("sends Project Card Click events when plausible is available", () => {
    const plausible = jest.fn();

    window.plausible = plausible;

    trackAnalyticsEvent("Project Card Click", {
      slug: "portfolio-website",
      surface: "project_card"
    });

    expect(plausible).toHaveBeenCalledWith("Project Card Click", {
      props: {
        slug: "portfolio-website",
        surface: "project_card"
      }
    });
  });
});
