#!/usr/bin/env node
const { readdirSync, readFileSync } = require("node:fs");
const { join } = require("node:path");
const matter = require("gray-matter");

const contentDir = join(__dirname, "../content");

const slugPattern = /^[a-z0-9-]+$/;
const datePattern = /^\d{4}-\d{2}-\d{2}$/;

const contentTypes = {
  posts: {
    path: join(contentDir, "posts"),
    required: ["id", "title", "slug", "author", "tags", "publishedAt", "updatedAt", "featured"],
    tagsField: "tags"
  },
  projects: {
    path: join(contentDir, "projects"),
    required: ["id", "title", "slug", "description", "tech", "link", "publishedAt", "updatedAt", "featured"],
    tagsField: "tech"
  }
};

const errors = [];

const seenSlugs = new Map();
const seenIds = new Map();

const normalizeDate = (value) => {
  if (typeof value === "string") return value;
  if (value instanceof Date) return value.toISOString().split("T")[0];
  return "";
};

const assert = (condition, message) => {
  if (!condition) {
    errors.push(message);
  }
};

Object.entries(contentTypes).forEach(([typeName, info]) => {
  const entries = readdirSync(info.path).filter((file) => file.endsWith(".md") || file.endsWith(".mdx"));

  entries.forEach((fileName) => {
    const raw = readFileSync(join(info.path, fileName), "utf8");
    let data;
    try {
      data = matter(raw).data;
    } catch (error) {
      errors.push(`${typeName}/${fileName}: Unable to parse frontmatter (${error.message})`);
      return;
    }

    const slug = String(data.slug || "");
    const id = String(data.id || "");

    info.required.forEach((field) => {
      assert(
        data[field] !== undefined && data[field] !== null && `${data[field]}`.trim() !== "",
        `${typeName}/${fileName}: Missing required field '${field}'`
      );
    });

    assert(slugPattern.test(slug), `${typeName}/${fileName}: Slug '${slug}' must be kebab-case (lowercase letters, numbers, dashes only)`);
    assert(
      datePattern.test(normalizeDate(data.publishedAt)),
      `${typeName}/${fileName}: 'publishedAt' must be YYYY-MM-DD`
    );
    assert(
      datePattern.test(normalizeDate(data.updatedAt)),
      `${typeName}/${fileName}: 'updatedAt' must be YYYY-MM-DD`
    );

    if (slug) {
      const key = `${typeName}:${slug}`;
      assert(!seenSlugs.has(key), `${typeName}/${fileName}: Duplicate slug '${slug}' within ${typeName}`);
      seenSlugs.set(key, fileName);
    }

    if (id) {
      const key = `${typeName}:${id}`;
      assert(!seenIds.has(key), `${typeName}/${fileName}: Duplicate id '${id}' within ${typeName}`);
      seenIds.set(key, fileName);
    }

    if (Array.isArray(data[info.tagsField])) {
      assert(
        data[info.tagsField].every((tag) => typeof tag === "string" && tag.trim() !== ""),
        `${typeName}/${fileName}: '${info.tagsField}' must be an array of non-empty strings`
      );
    }
  });
});

if (errors.length > 0) {
  console.error("Content validation failed:");
  errors.forEach((err) => console.error(`  - ${err}`));
  process.exitCode = 1;
} else {
  console.log("Content validation passed.");
}