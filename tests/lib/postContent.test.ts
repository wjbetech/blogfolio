import { createHeadingSlug } from "@/lib/postContent";

describe("postContent helpers", () => {
  it("creates stable slugs from heading text", () => {
    expect(createHeadingSlug("Verbosity in Coding")).toBe("verbosity-in-coding");
    expect(createHeadingSlug("Teaching & Translation")).toBe("teaching-and-translation");
    expect(createHeadingSlug("  Weird --- Spacing  ")).toBe("weird-spacing");
  });

  it("falls back to section when slug text is stripped empty", () => {
    expect(createHeadingSlug("!!!")).toBe("section");
  });
});
