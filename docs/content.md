# Content

Blog posts and projects are authored as files in `content/`. Contentlayer compiles them into typed build-time collections. There is no CMS, database, or runtime content API.

## Directories and filenames

```text
content/posts/      .md and .mdx blog posts
content/projects/   .md project entries
```

Use a date-prefixed, lowercase, hyphenated filename:

```text
YYYY-MM-DD-slug-goes-here.md
```

The date prefix is removed from the computed slug. The frontmatter `publishedAt` remains the content date used by the UI; keep the filename date and metadata date deliberately aligned when possible.

Project URLs use the canonical `/dev/[slug]` route. `/portfolio` is legacy compatibility only.

## Publication states

`status` is required and accepts:

- `draft` — work in progress; not public and not generated as a public detail page
- `published` — eligible for public rendering

Draft content must not appear in:

- `/blog` or homepage blog sections
- `/dev` or homepage project sections
- yearly archives and tag filters
- previous/next navigation
- RSS
- sitemap
- JSON-LD collections
- generated public detail pages

The current unfinished blog post is:

```text
content/posts/2026-05-01-future-goals.md
```

Its body is `WIP.` and it should remain `draft` until it is complete. Do not make drafts reachable merely because a visitor knows the slug.

The publication boundary is enforced centrally through `src/lib/content.ts` and applied to every public surface (pages, carousels, archives, navigation, RSS, sitemap, JSON-LD, generated static params). Phase 1 implemented this; see `docs/roadmap.md`.

## Blog frontmatter

Defined in `contentlayer.config.ts`:

| Field | Contentlayer type | Required by project policy | Purpose |
| --- | --- | --- | --- |
| `id` | string | yes | Stable unique content ID |
| `title` | string | yes | Display title |
| `excerpt` | string | yes for validation/publishing | Cards, metadata, RSS, and snippets |
| `author` | string | yes | Author name |
| `tags` | string list | yes | Filtering and JSON-LD keywords |
| `images` | string list | no | Ordered article images |
| `coverImage` | string | no | Primary article/card/metadata image |
| `featured` | boolean | yes | Candidate for homepage/featured presentation |
| `publishedAt` | date | yes | Publication date |
| `updatedAt` | date | yes | Last meaningful update |
| `status` | enum | yes | `draft` or `published` |

Contentlayer currently marks `excerpt` optional, while `scripts/validate-content.mjs` requires it. Until that discrepancy is resolved, follow the stricter publishing policy and provide an excerpt for every post.

## Project frontmatter

| Field | Contentlayer type | Required | Purpose |
| --- | --- | --- | --- |
| `id` | string | yes | Stable unique project ID |
| `title` | string | yes | Project title |
| `description` | string | yes | Card, metadata, and detail summary |
| `tech` | string list | yes | Technologies used |
| `link` | string | yes | Live project URL; use `""` if there is no separate live URL |
| `repo` | string | no | Repository or source link |
| `images` | string list | no | Ordered screenshots |
| `featured` | boolean | yes | Featured-project flag |
| `publishedAt` | date | yes | Listing date |
| `updatedAt` | date | yes | Last meaningful update |
| `status` | enum | yes | `draft` or `published` |

Project body content is Markdown and appears on `/dev/[slug]`.

## Markdown and MDX

Posts use Contentlayer's `contentType: "mdx"`, so `.md` posts are compiled through the MDX pipeline and `.mdx` files are supported.

`PostContent` renders the compiled output through a **controlled Blogfolio component map** (`src/components/Blog/PostContent.tsx` + `HeadingAnchor`). Every supported element maps to a styled component; posts remain authorable as plain Markdown.

Supported, natively compiled elements:

- headings (`#` through `######`), rendered as sections with stable anchor links; a body `#` is treated as a level-2 section because the page `<h1>` is the article title
- paragraphs
- unordered and ordered lists
- links
- `strong` and emphasis
- inline code and fenced code blocks (`language-*` fenced blocks are styled as blocks, inline code is styled inline)
- blockquotes
- thematic breaks / dividers (`---`)
- images (`![alt](src)`, rendered responsively)

Not supported by the current pipeline (verified against real compiled Contentlayer output):

- GFM tables and task lists (requiring `remark-gfm`, which is not enabled)
- strikethrough (`~~`) and GFM autolinks

These are intentionally not claimed as supported. Adding them would require installing and verifying `remark-gfm` through Contentlayer's MDX pipeline.

The article architecture is:

```text
Markdown/MDX source
→ Contentlayer compilation
→ controlled Blogfolio article components
→ rendered article
```

### Editorial embellishments (future, not implemented)

Polished treatment such as enlarged paragraph first letters, pull quotes, figures with captions, callouts, table-of-contents, and related posts are planned for the blog redesign (Phase 4), not current behavior. Do not document them as available.

## Images in content

Use root-relative paths without `public/`:

```yaml
images:
  - /images/assets/example.png
```

The repository's current assets are primarily under:

```text
public/images/assets/
public/images/assets/projects/
```

See [media.md](./media.md) for project image ordering and fallback behavior.

## Authoring workflow

1. Create the correctly named file.
2. Add complete frontmatter.
3. Start with `status: draft`.
4. Write and preview the content locally.
5. Validate local assets and metadata.
6. Review the rendered result.
7. Change to `status: published` only when the content is ready.
8. Update `updatedAt` for meaningful edits.
9. Run validation, tests, build, and typecheck before submitting the work.

Useful commands:

```bash
npm run dev
npm run validate:content
npm test
npm run build
```

## Validation behavior

`scripts/validate-content.mjs` currently checks:

- required frontmatter fields
- unique IDs
- unique slugs within each content type
- normalized dates
- valid publication statuses
- non-blank image entries
- local asset existence
- selected internal route references
- selected external links

Its handwritten parser and route list must remain aligned with `contentlayer.config.ts` and the canonical `/dev` route. Project entries are validated against `/dev/[slug]`; `/portfolio` remains listed as a known legacy redirect target.
