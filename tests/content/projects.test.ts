import fs from "fs";
import path from "path";
import { deriveSlugFromFile, readFrontMatter } from "../utils/frontmatter";

type ProjectMeta = {
  file: string;
  slug: string;
  id?: string;
  title?: string;
  description?: string;
  tech?: string[];
  link?: string;
  featured?: boolean;
  status?: string;
  publishedAt?: string;
  updatedAt?: string;
  images?: string[];
};

function readProjectMeta(): ProjectMeta[] {
  const projectsDir = path.join(process.cwd(), "content", "projects");
  const projectFiles = fs.readdirSync(projectsDir).filter((file) => file.endsWith(".md") || file.endsWith(".mdx"));

  return projectFiles
    .map((file) => {
      const data = readFrontMatter(path.join(projectsDir, file));
      const slug = deriveSlugFromFile(path.join(projectsDir, file), data.slug as string | undefined);
      if (!slug) return null;

      return {
        file,
        slug,
        id: data.id as string | undefined,
        title: data.title as string | undefined,
        description: data.description as string | undefined,
        tech: (data.tech as string[] | undefined) ?? [],
        link: data.link as string | undefined,
        featured: data.featured as boolean | undefined,
        status: data.status as string | undefined,
        publishedAt: data.publishedAt as string | undefined,
        updatedAt: data.updatedAt as string | undefined,
        images: (data.images as string[] | undefined) ?? []
      };
    })
    .filter((meta) => meta !== null) as ProjectMeta[];
}

describe("Portfolio project data", () => {
  it("ensures featured projects have descriptions", () => {
    const projects = readProjectMeta();
    const missing = projects.filter((project) => project.featured && !project.description?.trim());
    expect(missing).toHaveLength(0);
  });

  it("ensures referenced local images exist", () => {
    const projects = readProjectMeta();
    const referenced = projects.flatMap((project) => project.images ?? []).filter((src) => src && src.startsWith("/"));

    const missing = referenced.filter((src) => {
      const fullPath = path.join(process.cwd(), "public", src.replace(/^\//, ""));
      return !fs.existsSync(fullPath);
    });

    expect(missing).toEqual([]);
  });

  it("includes canonical project frontmatter", () => {
    const projects = readProjectMeta();
    const required = [
      "id",
      "title",
      "slug",
      "description",
      "tech",
      "link",
      "featured",
      "publishedAt",
      "updatedAt",
      "status"
    ];

    projects.forEach((project) => {
      required.forEach((key) => {
        const value = (project as Record<string, unknown>)[key];
        expect(value).toBeDefined();
      });
      expect(project.tech?.length).toBeGreaterThan(0);
      expect(project.status).toMatch(/^(draft|published)$/);
    });
  });

  it("uses normalized dates", () => {
    const projects = readProjectMeta();
    const datePattern = /^\d{4}-\d{2}-\d{2}$/;
    projects.forEach((project) => {
      expect(project.publishedAt).toMatch(datePattern);
      expect(project.updatedAt).toMatch(datePattern);
    });
  });

  it("keeps project ids unique", () => {
    const projects = readProjectMeta()
      .map((project) => project.id)
      .filter(Boolean) as string[];
    expect(new Set(projects).size).toBe(projects.length);
  });
});
