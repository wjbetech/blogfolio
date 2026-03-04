import fs from "fs";
import path from "path";
import { deriveSlugFromFile, readFrontMatter } from "../../tests/utils/frontmatter";

function readPostSlugs() {
  const postsDir = path.join(process.cwd(), "content", "posts");
  const entries = fs.readdirSync(postsDir).filter((file) => file.endsWith(".md") || file.endsWith(".mdx"));

  return entries
    .map((file) => {
      const data = readFrontMatter(path.join(postsDir, file));
      return deriveSlugFromFile(path.join(postsDir, file), data.slug as string | undefined);
    })
    .filter((slug): slug is string => Boolean(slug));
}

describe("Content posts", () => {
  it("includes at least three published slugs", () => {
    const slugs = readPostSlugs();
    expect(slugs.length).toBeGreaterThanOrEqual(3);
  });

  it("keeps slugs unique", () => {
    const slugs = readPostSlugs();
    expect(new Set(slugs).size).toBe(slugs.length);
  });
});
