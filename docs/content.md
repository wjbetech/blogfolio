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

All current posts are `published`. New work should start with `status: draft` and flip to `published` only when review is complete. Do not make drafts reachable merely because a visitor knows the slug.

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
- strikethrough (`~~`, via remark-gfm)
- inline code and fenced code blocks (`language-*` fenced blocks are styled as blocks, inline code is styled inline)
- blockquotes
- thematic breaks / dividers (`---`)
- images (`![alt](src)`, rendered responsively)
- GFM tables (scrollable wrapper, styled header row) and task-list checkboxes (via remark-gfm)

Not supported by the current pipeline:

- GFM autolinks beyond standard Markdown link syntax

The article architecture is:

```text
Markdown/MDX source
→ Contentlayer compilation
→ controlled Blogfolio article components
→ rendered article
```

### MDX pitfalls (Contentlayer + @mdx-js/esbuild)

Verified breakages on this branch (keep for authoring):

- **HTML comments** `<!-- ... -->` → `Unexpected character '!'` in `contentlayer:dev`. Don't use them in posts. Remove TODOs or use a plain paragraph.
- **`{/* ... */}` with a `/` path inside** (e.g. `/images/...`) can be parsed as `Invalid regular expression flag` (`{/_`). A prior `/{_ _/}` corruption also broke the build. Prefer deleting the comment; if you must annotate, keep it out of MDX or omit the leading `/`.
- **Unclosed HTML tags** `<br>` / `<hr>` without self-closing `/>` → `Expected a closing tag for '<br>'` on `contentlayer:build`. Use Markdown line breaks or `<br />`.

If `pnpm run dev` shows `SourceFetchDataError` + `@mdx-js/esbuild`, check `content/posts/*.md` for the above first.

### BlogToc scrolling (Sections)

`src/components/Blog/BlogToc.tsx` reads `h2`/`h3` from `.article-body` and highlights the active section on scroll. It is mounted in `src/components/Blog/BlogPostView.tsx:108` with `key={post.slug}` (remount per post) and hidden below `xl`. Fixed behaviors:

- Stale headings on client navigation are prevented by the per-post remount.
- Mount races where `.article-body` is not yet in the DOM are handled via a `requestAnimationFrame` retry plus a `MutationObserver` for late-hydrated headings.

Requires ≥2 headings to render (`BlogToc.tsx:112`).

### Editorial embellishments (future, not implemented)

Polished treatment such as pull quotes (and more elaborate blockquote variants) are planned refinements of the blog design, not current behavior. Implemented: drop caps, enlarged first letters, scroll-spy table of contents (`BlogToc` on `xl`+ and collapsible `BlogTocMobile` below `xl`; see above and `docs/design-system.md`), figures with captions (`PostContent` wraps `img` with `alt` → `<figcaption>`), related posts (`Continue reading` in `BlogPostView`), syntax-highlighted fenced code via `rehype-pretty-code`, GFM tables/task lists/strikethrough via `remark-gfm`, and the mobile reading experience pass (responsive rhythm, code/table overflow, `px-4 sm:px-6` layout). Callouts were dropped as not needed. Do not document unimplemented features as available.

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
pnpm run dev
pnpm run validate:content
pnpm test
pnpm run build
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
