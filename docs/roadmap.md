# Roadmap

Phased implementation plan for blogfolio. Items marked ✅ are complete. See `docs/todo.md` for the active short-term task list.

---

## Current state

- Next.js 16 App Router, TypeScript, Contentlayer, Tailwind CSS v4
- 14-theme system with CSS custom properties — fully working
- Blog with reading time, prev/next nav, heading anchors, Article JSON-LD
- `/dev` project overview page with sticky sidebar and changelog
- sitemap.xml, robots.txt, RSS feed, OG tags, Twitter cards — all ship
- Content validation CI on every push and PR
- Jest test suite covering content, metadata, themes, and blog flows

---

## Phase A — Docs rebuild ✅

Complete rebuild of `docs/` to accurately reflect the current codebase and guide all future development.

- [x] Rewrite `README.md`
- [x] Create `docs/README.md` — docs index
- [x] Create `docs/architecture.md` — stack, routes, content pipeline
- [x] Create `docs/hosting.md` — Proxmox + Docker + Cloudflare Tunnel
- [x] Create `docs/deployment.md` — GitHub Actions CI/CD + self-hosted runner
- [x] Create `docs/media.md` — image storage, naming, frontmatter conventions
- [x] Create `docs/seo.md` — current coverage and gaps
- [x] Create `docs/design-system.md` — tokens, typography, spacing, card spec
- [x] Create `docs/content.md` — frontmatter schema, publishing workflow
- [x] Create `docs/maintenance.md` — monthly sweep, changelog flow
- [x] Rewrite `docs/roadmap.md` (this file)
- [x] Rewrite `docs/todo.md`
- [x] Retire stale docs (`styling.md`, `task-guidelines.md`, `changelog-guidance.md`)
- [x] Move `content/posts_audit.md` out of the content source tree

---

## Phase B — Code fixes

Targeted fixes for known bugs and missing infrastructure. Each item is its own branch.

### `fix/site-url-env` ✅

Make `SITE_URL` environment-driven so it resolves to the real domain in production.

- [x] Change `src/lib/metadata.ts` line 6 to: `export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://williameast.com";`
- [x] Create `.env.example` documenting `NEXT_PUBLIC_SITE_URL`
- [x] Update tests that assert against the hardcoded `blogfolio.dev` URL

### `feature/portfolio-slug` ✅

Build the missing `/portfolio/[slug]` route. Currently the sitemap and all project links point to these URLs but they return 404.

- [x] Create `src/app/portfolio/[slug]/page.tsx` — project detail page
- [x] Model it on `blog/[slug]/page.tsx` (metadata, JSON-LD, cover image)
- [x] Add `generateStaticParams` to pre-render all published projects

### `fix/portfolio-redirect`

`/portfolio` currently duplicates the `/dev` project list. Convert it to a redirect.

- [ ] Replace `src/app/portfolio/page.tsx` with a `redirect("/dev")`
- [ ] Verify sitemap no longer lists `/portfolio` as a standalone page

### `fix/image-fallback`

Replace the external third-party fallback image with a local one.

- [ ] Create `public/images/og-default.png` (1200×630, branded)
- [ ] Replace the Unsplash URL in `src/lib/metadata.ts` `DEFAULT_OG_IMAGE`
- [ ] Replace the CUNY OpenLab URL in `BlogPostCard.tsx`
- [ ] Remove `openlab.citytech.cuny.edu` from `next.config.ts` remotePatterns

### `feature/deployment-infrastructure`

Add Docker + GitHub Actions deployment pipeline for the homelab.

- [ ] Write `Dockerfile` (multi-stage Next.js standalone build)
- [ ] Write `docker-compose.yml` (`app` + `cloudflared` services)
- [ ] Write `.github/workflows/build-and-push.yml`
- [ ] Write `.github/workflows/deploy.yml` (self-hosted runner)
- [ ] Write `.github/workflows/monthly-maintenance.yml`
- [ ] Add `output: "standalone"` to `next.config.ts`

---

## Phase C — UI polish

Visual improvements. Each item is its own branch. No changes to the colour theme system or token names.

### `feature/homepage-cards`

Redesign `BlogPostCard` and `ProjectPostCard` to feel more interactive and inviting.

Goals (see `docs/design-system.md` for full spec):

- [ ] Full card as a single click target (wrap entire card in `<Link>`)
- [ ] Styled CTA chip replacing bare "View" text

### `style/typography-pass`

Standardise heading sizes and font assignments across all pages.

- [ ] Audit all pages against the scale defined in `docs/design-system.md`
- [ ] Apply consistent `font-serif` (Bricolage) to all h1/h2 display headings
- [ ] Standardise `text-sm` / `text-base` / `text-lg` usage for body and meta text

### `feature/person-jsonld`

Add `Person` + `WebSite` JSON-LD to the home page for better Google attribution.

- [ ] Add schema to `src/app/page.tsx` with name, URL, GitHub, LinkedIn

---

## Deferred / under consideration

- **Table of contents** for long blog posts — revisit when posts regularly exceed 2000 words with 4+ headings
- **Contact form submission handler** — `/contact` currently has a UI but no backend. Options: Resend, Formspree, or a simple email-forward serverless function
- **Search** — full-text search across posts. Only worth adding once there are 20+ published posts. Options: Pagefind (static), Fuse.js (client-side)
- **Git-backed CMS** — only if writing posts as raw Markdown files becomes a pain point
