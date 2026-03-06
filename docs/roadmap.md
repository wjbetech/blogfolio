# Current Status

Phase 2 - File-based Content (Contentlayer) Current Task - Consolidate posts/projects into typed `.md` content with strong frontmatter standards.

# Phase 1: Foundational Frontend

## 1.1 Layout & Navigation

- [x] Create the main layout in `src/app/layout.tsx`.
- [x] Build a Header component with navigation (Home/Blog, Portfolio, Admin\*).
- [x] Build a Footer component with external navigations, icons, etc.
- [x] Setup Tailwind styling and Tailwind workflow with suitable documentation
  - [x] Fix the styles in the ThemeDrawer components.
- [x] Add a responsive mobile menu.
- [x] Standardize and centralize theme variable names.
- [x] Fix the carousel arrows to be useful and accessible.
- [x] Add thick underline affects to the 'See all [...]' links.
- [x] Fix some odd colorings in some themes.

### 1.1.1 Initial Unit Testing

- [x] Build unit tests for the applyTheme logic.

### 1.1.2 UI Improvements & Accessibility

- [x] Take a look at Tailwind pseudo-classes again
  - [ ] Optimize for DX and overall re-useability/readability
- [ ] Ensure keyboard accessibility and clear focus states
- [x] Add a canonical useTheme hook (src/lib/useTheme.ts) that exposes theme
- [x] Replace remaining cookie/localStorage calls with useTheme for a single source of truth
  - [x] Need evaluation of how this will work for new users/existing users
- [ ] Fix palette cards to be fully fixed-width
- [ ] CSS snap for carousels (scroll-snap-type)\*
- [x] Look into a Changelog for the entire app that can export to Webcomments or other automatic updater in the app HTML.

  #### 1.1.2
  - [ ] Theme toggle button should have aria-expanded and aria-controls atts.
  - [ ] Drawer role should be "dialog" and aria-modal when overlaying.
  - [ ] Mobile nav should trap focus and restore focus on close.
  - [ ] Links should use aria-current="page" for active nav items.

## 1.2 Blog Pages

- [x] Create a blog list page at `src/app/blog/page.tsx`
- [x] Create the BlogCard component
- [ ] Create a dynamic blog detail page at `src/app/blog/[slug]/page.tsx`
- [x] Build some mock data for testing purposes

## 1.3 Portfolio Page

- [x] Create a static portfolio page at `src/app/portfolio/page.tsx`
- [x] Build project showcase components
  - [x] PortfolioItem component with re-useable structure?
- [ ] Add project images and descriptions
  - [ ] Host the images somewhere else if needed

# Phase 2: File-based Content (Contentlayer)

## 2.1 Contentlayer + Markdown (.md/.mdx)

- [ ] Add `@contentlayer/source-files` and configure `contentlayer.config.ts` to read `content/posts` and `content/projects` (already present in this repo).
- [ ] Define Contentlayer document schemas and computed fields so `allPosts`/`allProjects` expose typed fields used across the app.
- [ ] Commit example `.md` files under `content/` (frontmatter: `title`, `slug`, `date`, `tags`, `coverImage`, `status`, etc.) and document expected frontmatter shape.
- [ ] Document build/dev workflow: run the Contentlayer generation step (`npm run contentlayer:generate`) and reference generated types in imports (e.g. `contentlayer/generated`).

## 2.2 Content Models (Posts + Projects)

- [ ] Define frontmatter fields for file-based content: `title`, `slug`, `date`, `tags`, `coverImage`, `status`, and `body` (MDX if needed).
- [ ] Implement these fields in `contentlayer.config.ts` so the fields become typed and available via `allPosts`/`allProjects`.
- [ ] Use frontmatter metadata (`createdAt`, `updatedAt`, `publishedAt`) where applicable; keep audit logs external only if you add an admin backend later.
- [ ] Add types or helper interfaces in `src/app/types/` only if you want an additional abstraction over Contentlayer types.

## 2.3 Media References & Admin Uploads

- [ ] Store `coverImage`/media as frontmatter paths (relative to `public/`) or CDN URLs.
- [ ] If you require programmatic uploads, choose an admin workflow (Git-backed CMS, Netlify CMS, or a headless CMS) or an external storage provider (S3/Cloudinary) and document how uploaded URLs are stored back in frontmatter via that workflow.
- [ ] No DB storage is required for public content when using Contentlayer; document any environment variables only for optional external services.

## 2.4 Content Operations (Editorial Workflow)

- [ ] Define a publishing workflow: draft in feature branch → PR review → merge to publish.
- [ ] Add a content QA checklist for PRs (frontmatter present, links valid, images resolve, slug uniqueness).
- [ ] Add monthly content maintenance tasks: refresh stale portfolio links and update older posts.

# Phase 3: SEO & Discovery

## 3.1 Metadata Foundation

- [ ] Standardize page metadata templates for posts/projects (`title`, `description`, canonical, OG/Twitter image).
- [ ] Add route-level metadata quality checks so each post/project has complete social preview information.

## 3.2 Indexing & Feeds

- [ ] Generate and verify `sitemap.xml` and `robots.txt`.
- [ ] Add RSS feed generation for blog posts.
- [ ] Add structured data where useful (Article schema for posts, CreativeWork/Project schema for portfolio items).

# Phase 4: UX & Accessibility Polish

## 4.1 Reading Experience

- [ ] Add reading time estimates for blog posts.
- [ ] Add previous/next post navigation on post detail pages.
- [ ] Add heading anchors and optional table of contents for long posts.

## 4.2 Accessibility Completion Pass

- [ ] Close all open keyboard/focus/ARIA TODOs in navigation/theme drawer.
- [ ] Define acceptance checks: keyboard-only navigation works, visible focus states, semantic landmark usage.
- [ ] Add one accessibility regression checklist to PR template for UI changes.

# Phase 5: Performance & Reliability

## 5.1 Performance Budget

- [ ] Set explicit Lighthouse targets for Performance, Accessibility, and Best Practices.
- [ ] Add periodic performance review checks (homepage, blog list, one blog detail, portfolio/dev pages).

## 5.2 Media & Rendering Quality

- [ ] Define image conventions (dimensions, formats, fallbacks) for `content/posts` and `content/projects`.
- [ ] Ensure fallback placeholders appear whenever an image path is missing or invalid.
- [ ] Document where media should live (`public/images/...`) and naming conventions.

# Phase 6: Analytics & Product Feedback

## 6.1 Privacy-friendly Analytics

- [x] Add lightweight analytics for page views and outbound link clicks (portfolio/contact/github/demo).
- [x] Define success metrics: most viewed posts, project click-through rate, contact link engagement.

## 6.2 Iteration Cadence

- [x] Add a monthly review ritual: identify top content, stale content, and roadmap priorities for next cycle.

# Phase 7: Developer Experience & Governance

## 7.1 Content Validation in CI

- [x] Add checks for frontmatter correctness and required fields.
- [x] Add broken-link checks for internal links and key external links.
- [x] Fail CI on malformed content or missing required metadata.

## 7.2 Documentation Governance

- [ ] Keep architecture decisions in sync across docs (`roadmap`, `contentlayer`, `styling`, `todo`).
- [ ] Add a quarterly docs audit to remove stale references.

## 7.3 Optional Future Track (Not MVP)

- [ ] If content editing needs exceed PR-based workflow, evaluate a Git-backed CMS first.
- [ ] Only introduce write APIs/admin backend if clearly needed; keep it separate from static public content delivery.
