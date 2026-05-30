# Content

How to create, edit, and publish blog posts and portfolio projects. Covers the frontmatter schema, file naming, image conventions, and the full workflow from draft to live.

---

## How content works

Blog posts and portfolio projects are plain Markdown files stored in the `content/` directory. At build time, Contentlayer reads every file, validates the frontmatter against the schema defined in `contentlayer.config.ts`, and produces fully-typed TypeScript arrays (`allPosts`, `allProjects`) that are imported directly by page components.

There is no database. There is no CMS dashboard. Writing a post = creating a `.md` file.

---

## Directory structure

```
content/
  posts/      blog posts    -- .md or .mdx files
  projects/   portfolio projects -- .md files only
```

---

## File naming

Use this format for both posts and projects:

```
YYYY-MM-DD-slug-goes-here.md
```

Examples:

```
2026-05-01-cafe-hopping-in-korea.md
2026-03-10-portfolio-website.md
```

The date prefix is stripped automatically when computing the `slug` field -- so `2026-05-01-cafe-hopping-in-korea.md` becomes slug `cafe-hopping-in-korea` and URL `/blog/cafe-hopping-in-korea`.

Keep slugs lowercase, hyphen-separated, no special characters.

---

## Blog post schema

File location: `content/posts/YYYY-MM-DD-your-slug.md`

### Required fields

| Field         | Type                   | Notes                                                               |
| ------------- | ---------------------- | ------------------------------------------------------------------- |
| `id`          | string                 | Unique numeric string — increment from the highest existing post ID |
| `title`       | string                 | Displayed as the page title and in cards                            |
| `author`      | string                 | Your name — `"William East"`                                        |
| `tags`        | list of strings        | One or more topic tags — used for filtering and JSON-LD             |
| `featured`    | boolean                | `true` to include in the homepage carousel                          |
| `publishedAt` | date (`YYYY-MM-DD`)    | Publication date                                                    |
| `updatedAt`   | date (`YYYY-MM-DD`)    | Last updated — set same as publishedAt on first publish             |
| `status`      | `draft` or `published` | Only `published` posts appear in RSS and are indexed                |

### Optional fields

| Field        | Type            | Notes                                                                |
| ------------ | --------------- | -------------------------------------------------------------------- |
| `excerpt`    | string          | Short summary — used in cards, OG description, RSS                   |
| `coverImage` | string          | Path to a single cover image, e.g. `/images/posts/my-post-cover.png` |
| `images`     | list of strings | Additional images, e.g. `/images/posts/my-post-diagram.png`          |

### Image resolution order

`coverImage` → `images[0]` → fallback placeholder. See [media.md](./media.md).

### Full example

```yaml
---
id: "8"
title: "My Post Title"
excerpt: "A one or two sentence summary of what this post covers."
author: "William East"
tags:
  - Development
  - TypeScript
coverImage: /images/posts/my-post-title-cover.png
images:
  - /images/posts/my-post-title-diagram.png
featured: false
publishedAt: 2026-06-01
updatedAt: 2026-06-01
status: draft
---

Your post content starts here. Standard Markdown applies.

## Section heading

Paragraphs, lists, code blocks, images -- all standard Markdown.
```

---

## Project schema

File location: `content/projects/YYYY-MM-DD-your-slug.md`

### Required fields

| Field         | Type                   | Notes                                                              |
| ------------- | ---------------------- | ------------------------------------------------------------------ |
| `id`          | string                 | Unique numeric string — increment from highest existing project ID |
| `title`       | string                 | Displayed as the project name                                      |
| `description` | string                 | One-sentence description — shown in cards and JSON-LD              |
| `tech`        | list of strings        | Technologies used, e.g. `React`, `TypeScript`, `PostgreSQL`        |
| `link`        | string                 | Live URL of the project (use `""` if not yet deployed)             |
| `featured`    | boolean                | `true` to include in the homepage project carousel                 |
| `publishedAt` | date (`YYYY-MM-DD`)    | When you first listed the project                                  |
| `updatedAt`   | date (`YYYY-MM-DD`)    | Last update to the project listing                                 |
| `status`      | `draft` or `published` | Only `published` projects appear on the site                       |

### Optional fields

| Field    | Type            | Notes                                                            |
| -------- | --------------- | ---------------------------------------------------------------- |
| `repo`   | string          | GitHub URL — shown as secondary link                             |
| `images` | list of strings | Screenshots, e.g. `/images/projects/my-project-screenshot-1.png` |

### Full example

```yaml
---
id: "3"
title: "My Project"
description: "A short one-sentence description of what this project is."
tech:
  - Next.js
  - TypeScript
  - Tailwind CSS
link: "https://myproject.com"
repo: "https://github.com/wjbetech/my-project"
images:
  - /images/projects/my-project-screenshot-1.png
featured: true
publishedAt: 2026-06-01
updatedAt: 2026-06-01
status: draft
---
Longer description, background, technical decisions, and notes about the project. This content appears on the `/portfolio/[slug]` detail page (Phase B).
```

---

## Publishing workflow

### New blog post

1. Create `content/posts/YYYY-MM-DD-your-slug.md` with `status: draft`
2. Write the content — run `npm run dev` to preview at `localhost:3000/blog/your-slug`
3. Add any images to `public/images/posts/` and reference them in frontmatter
4. When ready: change `status: draft` → `status: published`
5. Run `npm run validate:content` to catch any missing images or broken links
6. Commit and push to master → CI runs → site rebuilds and deploys

### New project

1. Create `content/projects/YYYY-MM-DD-your-slug.md` with `status: draft`
2. Add screenshots to `public/images/projects/`
3. Fill in frontmatter — `link` is required (use `""` if not deployed yet)
4. When ready: change `status: draft` → `status: published`
5. Commit and push

### Updating existing content

- Update the body and/or frontmatter as needed
- Always update `updatedAt` to today's date when publishing a meaningful change
- The sitemap will pick up the new `updatedAt` automatically at next build

---

## Content validation

Run before committing:

```bash
npm run validate:content
```

This checks:

- All required frontmatter fields are present and correctly typed
- All `id` values are unique within each content type
- All local image paths (`/images/...`) actually exist in `public/`
- No blank entries in `images` arrays
- Slugs are valid and unique

The same checks run automatically in GitHub Actions on every push and PR.

---

## MDX in posts

Blog posts support MDX (`.mdx` extension) as well as plain Markdown (`.md`). MDX lets you embed React components directly in post content. Use sparingly — keep posts readable as plain text wherever possible.

Projects use plain Markdown only (`.md`).

---

## Status field behaviour

| `status` value | Blog list  | Homepage carousel   | RSS feed    | Sitemap     | `/blog/[slug]`         |
| -------------- | ---------- | ------------------- | ----------- | ----------- | ---------------------- |
| `published`    | ✅ visible | if `featured: true` | ✅ included | ✅ included | ✅ accessible          |
| `draft`        | ❌ hidden  | ❌ hidden           | ❌ excluded | ❌ excluded | ✅ accessible (by URL) |

Draft posts are not listed anywhere but are still accessible if you know the URL. Do not link to draft posts from anywhere public.
