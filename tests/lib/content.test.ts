import { filterPublishedContent, isPublishedContent } from "@/lib/content";

describe("publication visibility", () => {
  it("accepts published values with surrounding whitespace", () => {
    expect(isPublishedContent({ status: " published\r" })).toBe(true);
  });

  it("filters drafts without changing the published item references", () => {
    const published = { status: "published", title: "Visible" };
    const draft = { status: "draft", title: "Hidden" };

    expect(filterPublishedContent([published, draft])).toEqual([published]);
  });
});
