import PortfolioPage from "@/app/portfolio/page";
import LegacyProjectPage from "@/app/portfolio/[slug]/page";

const redirectMock = jest.fn();
const permanentRedirectMock = jest.fn();

jest.mock("next/navigation", () => ({
  redirect: (...args: unknown[]) => redirectMock(...args),
  permanentRedirect: (...args: unknown[]) => permanentRedirectMock(...args),
  notFound: jest.fn()
}));

describe("legacy /portfolio routes", () => {
  beforeEach(() => {
    redirectMock.mockClear();
    permanentRedirectMock.mockClear();
  });

  it("redirects /portfolio to /dev", () => {
    PortfolioPage();
    expect(redirectMock).toHaveBeenCalledWith("/dev");
  });

  it("redirects /portfolio/[slug] to /dev/[slug]", async () => {
    await LegacyProjectPage({ params: Promise.resolve({ slug: "wordweb" }) });
    expect(permanentRedirectMock).toHaveBeenCalledWith("/dev/wordweb");
  });
});