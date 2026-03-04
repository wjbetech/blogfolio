# Contentlayer MDX

We can replace the current mock data in `/src/app/data/...` with MDX content that we manage via Contentlayer, an SDK.

This will keep static, Git-backed content, while still being typed and processed at build-time rather than run-time, similar to the current mock data.

The key changes include:

- [ ] add `contentlayer.config.ts`
- [ ] create `/content/posts`
- [ ] create `/content/projects`
- [ ] update `pages` and `components` to import `contentlayer/generated`, e.g. `allPosts` and `allProjects`

## Steps

### 1. Inventory

Confirm the current data and where it is consumed:

- Content now lives as Markdown under `content/posts/` and `content/projects/`, and Contentlayer generates the typed article/project data.
- The generated types (`allPosts`, `allProjects`, `Post`, `Project`) are consumed in `src/app/blog/[slug]/page.tsx`, `src/app/blog/page.tsx`, `src/app/portfolio/page.tsx`, and components such as `BlogCarousel.tsx` and `ProjectCarousel.tsx`.

### 2. Install Dependencies

Add the Contentlayer and MDX tooling:

- Read the docs at `https://contentlayer.dev/docs/getting-started-cddd76b7`

### 3. Add Config

Create a `contentlayer.config.ts` file at the root of the repo with document types for `Post` and `Project` that match `post.ts` and `project.ts`

- These must include computed `id` and `slug` fields, as well as the MDX plugin config

### 4. Create Content Folders

- Add the directories `content/posts/` and `content/projects/`
- Create one `.mdx` file per existing entry for a migration test
- Use frontmatter for fields:
  - `title`, `slug`, `excerpt/description`, `author`, etc.
    - e.g. `content/posts/understanding-typescript-generics.mdx`

### 5. Add npm Script

We need to have scripts for Contentlayer to integrate with Next build, with generated types that live under `contentlayer/generated`.

### 6. Generate & Import

Run Contentlayer to generate `contentlayer/generated`. Replace the following imports:

- import `mockPosts` will change from `@/app/data/posts` to `contentlayer/generated`
- import `mockProjects` will change from `@/app/data/projects` to `contentlayer/generated`

### 7. Update Routes & Pages

- Update `generateStaticParams()` in `src/app/blog/[slug]/page.tsx` to iterate over `allPosts`
- Replace `post.content` usage with an MDX render.
  - Use Contentlayer's recommended MDX rendering apparoach (`next-contentlayer/hooks`, or `useMDXComponent`)

### 8. Client Components

- Client components such as `BlogCarousel` and `ProjectCarousel` currently import mock arrays at the module scope, instead:
  - Option A (preferred): Server component fetches `allPosts` and `allProjects` and passes the required array as props
  - Option B: Keep importing `contentlayer/generated` in client components only if the generated output is fully static and bundling is acceptable

### 9. Type Integration

Update or remove `src/app/types/` for the relevant Contentlayer items, and map or import the Contentlayer types from `contentlayer/generated` where needed to ensure consistent typing.

### 10. Images & Assets

Check the `coverImage`, `image` and `images` fields. If using local images in MDX, place them inside the `/public` directory or use `next/image` with allowed external domains configured in `next.config.ts`

### 11. Cleanup

- Old mock-data modules (`src/app/data/posts.ts` and `src/app/data/projects.ts`) have been deleted; rely on the `/content` Markdown sources and generated Contentlayer output going forward.

## Frontmatter specs

### Post frontmatter

| Field       | Required | Notes                                                                                      |
| ----------- | -------- | ------------------------------------------------------------------------------------------ |
| id          | ✓        | Unique identifier that matches the generated `Post.id`.                                    |
| title       | ✓        | Headline shown in listings and metadata.                                                   |
| slug        | computed | Kebab-case URL segment for `/blog/{slug}` derived from the filename (strip `YYYY-MM-DD-`). |
| excerpt     | ✓        | Short summary displayed in previews.                                                       |
| author      | ✓        | Display name for the author.                                                               |
| tags        | ✓        | Array of string labels (at least one).                                                     |
| image       |          | Optional hero image URL (remote or `/images`).                                             |
| coverImage  |          | Optional fallback image path (can be empty).                                               |
| featured    | ✓        | Boolean used to highlight the post.                                                        |
| publishedAt | ✓        | ISO date (`YYYY-MM-DD`).                                                                   |
| updatedAt   | ✓        | ISO date (`YYYY-MM-DD`).                                                                   |
| status      | ✓        | Enum (`published` / `draft`) to gate visibility.                                           |

### Project frontmatter

| Field | Required | Notes |
| --- | --- | --- |
| id | ✓ | Unique identifier used for ordering. |
| title | ✓ | Project name shown on `/dev`. |
| slug | computed | Portfolio URL segment (`/portfolio/{slug}`) derived from the filename (strip `YYYY-MM-DD-`). |
| description | ✓ | Summary shown on the `/dev` page and cards. |
| tech | ✓ | At least one technology (list of strings). |
| link | ✓ | Live demo or marketing URL. |
| repo |  | Optional source repository link. |
| images |  | Optional array of visuals (local `/images` or remote). |
| featured | ✓ | Highlights the project in the featured carousel. |
| publishedAt | ✓ | ISO date (`YYYY-MM-DD`). |
| updatedAt | ✓ | ISO date (`YYYY-MM-DD`). |
| status | ✓ | Enum (`published` / `draft`) for content gating. |

> **Note:** `slug` is computed from the Markdown filename (dates stripped). Don't duplicate it in frontmatter.

## Type strategy

- Prefer using `Post` / `Project` from `contentlayer/generated` so the generated fields (`slug`, `url`, `readingTime`, etc.) are always in sync with the content schema.
- If you need a narrower shape for a component, derive it via selectors or mappers instead of redefining the interface. That keeps the Contentlayer output as the single source of truth.

## Running Contentlayer tooling

- `npm run contentlayer:generate` – run this whenever you change frontmatter or the Contentlayer schema. It regenerates `contentlayer/generated`, which must be up to date before running `next build`.
- `npm run contentlayer:dev` – used by `npm run dev`; it watches content files so the dev server reflects changes immediately.

## When to run Contentlayer tooling

- After editing frontmatter fields (adding/removing metadata, toggling `status`, etc.) so generated types remain accurate.
- Any time the document schema changes (new required fields, computed values, directory patterns) to ensure the generated type output is in sync.
- Before merging or deploying to confirm the latest generated code exists; rerun `npm run contentlayer:generate` after all metadata edits and then fire up `npm run dev` (which runs `contentlayer:dev`) to catch runtime issues. Running `contentlayer:generate` today succeeds without extra-field errors (it outputs 5 documents under `.contentlayer`), and the Windows warning (`might not work as expected on Windows`) is expected but the tool still completes.

## Common failures and fixes

- **Missing required field**: Contentlayer errors often state which key is absent. Fix the frontmatter (or mark the field optional) and rerun `npm run contentlayer:generate`.
- **Slug collisions**: Keep slugs unique and lowercase. If Contentlayer complains about duplicate routes, check that each `.md` file has a distinct `slug` and `id`.
- **Invalid dates**: Stick to `YYYY-MM-DD` for `publishedAt`/`updatedAt`. Extra time components or typos will cause parsing errors.
- **Extra-field errors**: Fields like `slug` are now computed from the filename (the `docs/contentlayer.md` tables explain this), so remove any `slug:` lines from frontmatter to avoid “field data which isn't defined in the document type” warnings.
