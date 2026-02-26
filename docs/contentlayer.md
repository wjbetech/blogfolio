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

- Data is contained in `posts.ts` and `projects.ts`
- It is consumed in `page.tsx`, at `src/app/blog/[slug]/page/tsx`, and in components such as `BlogCarousel.tsx` and `ProjectCarousel.tsx`

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

Once pages are migrated successfully, delete `posts.ts` and `projects.ts` and any remaining Prisma remnants.

### Build/dev workflow

- **When to run Contentlayer generation** – run `npm run contentlayer:generate` after updating `contentlayer.config.ts`, altering frontmatter fields, or adding/removing files under `/content`. Generation emits TypeScript definitions and JSON data that must stay in sync with the filesystem.
- **Common failures & fixes**
  - Schema mismatches or missing required frontmatter? Run `npm run validate:content` to surface missing fields (IDs, slugs, dates, tags) and fix the offending `.md` file.
  - `contentlayer.config.ts` errors during dev/build? Double-check top-level document types, computed fields, and imported plugins; rerun `npm run contentlayer:generate` until the helper output stops emitting warnings.
  - Missing assets or broken image references are usually resolved by placing files under `/public` or adding allowed domains in `next.config.ts`.
- **Verification** – after touching schema or content, confirm `npm run contentlayer:generate` and `npm run dev` both succeed (watch the console for the generated `contentlayer/generated/` folder). This ensures both build and local dev modes see the same data.
