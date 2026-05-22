import { createHeadingSlug, parsePostContent } from "@/lib/postContent";

describe("postContent helpers", () => {
  it("creates stable slugs from heading text", () => {
    expect(createHeadingSlug("Verbosity in Coding")).toBe("verbosity-in-coding");
    expect(createHeadingSlug("Teaching & Translation")).toBe("teaching-and-translation");
    expect(createHeadingSlug("  Weird --- Spacing  ")).toBe("weird-spacing");
  });

  it("falls back to section when slug text is stripped empty", () => {
    expect(createHeadingSlug("!!!")).toBe("section");
  });

  it("parses heading blocks and paragraph blocks", () => {
    const blocks = parsePostContent(`
## Overview

This is a paragraph.

### Details
    `);

    expect(blocks).toEqual([
      { kind: "heading", level: 3, text: "Overview", id: "overview" },
      { kind: "paragraph", text: "This is a paragraph." },
      { kind: "heading", level: 4, text: "Details", id: "details" }
    ]);
  });

  it("adds deterministic suffixes for duplicate headings", () => {
    const blocks = parsePostContent(`
## Overview

## Overview
    `);

    expect(blocks[0]).toEqual({
      kind: "heading",
      level: 3,
      text: "Overview",
      id: "overview"
    });

    expect(blocks[1]).toEqual({
      kind: "heading",
      level: 3,
      text: "Overview",
      id: "overview-2"
    });
  });
});
