# Todo

Concrete next steps only. For the full plan see `docs/roadmap.md`.

Key: `[ ]` not started · `[-]` in progress · `[x]` done

---

## In progress — Phase A (docs/rebuild branch)

- [x] Docs rebuild — all 14 steps complete
  - [x] Rewrite README.md
  - [x] Create docs/README.md
  - [x] Create docs/architecture.md
  - [x] Create docs/hosting.md
  - [x] Create docs/deployment.md
  - [x] Create docs/media.md
  - [x] Create docs/seo.md
  - [x] Create docs/design-system.md
  - [x] Create docs/content.md
  - [x] Create docs/maintenance.md
  - [x] Rewrite docs/roadmap.md
  - [x] Rewrite docs/todo.md (this file)
  - [x] Retire stale docs (styling.md, task-guidelines.md, changelog-guidance.md, contentlayer.md, content-validation.md, content-operations.md)
  - [x] Move content/posts_audit.md to docs/posts_audit.md

---

## Up next — Phase B (separate branch per item)

Start these after the docs/rebuild branch is merged to master.

1. **`fix/site-url-env`** — make SITE_URL env-driven, add .env.example, update tests ✅ Done
   - [x] Create branch `fix/site-url-env` from master
   - [x] Open `src/lib/metadata.ts`; change line 6 hardcoded `"https://blogfolio.dev"` to `process.env.NEXT_PUBLIC_SITE_URL ?? "https://williameast.com"`
   - [x] Create `.env.example` at repo root with `NEXT_PUBLIC_SITE_URL=https://williameast.com`
   - [x] Check `__tests__/` and `__mocks__/` for any reference to the old hardcoded URL and update them
   - [x] Run `npm run build` to confirm no type errors
   - [x] Run `npm test` to confirm all tests pass
   - [x] Commit, open PR into master, merge after review

2. **`feature/portfolio-slug`** — build `/portfolio/[slug]` route (fixes all 404s) ✅ Done
   - [x] Create branch `feature/portfolio-slug` from master
   - [x] Create directory `src/app/portfolio/[slug]/`
   - [x] Create `page.tsx` with:
     - `generateStaticParams` that maps `allProjects` → `{ slug }` (published only)
     - `generateMetadata` that returns title + description per project
     - A page component that looks up the project by slug, renders title, dates, tags, body, and external links
   - [x] Run `npm run build` to confirm static generation succeeds for all project slugs
   - [x] Commit, open PR into master, merge after review

3. **`fix/portfolio-redirect`** — redirect `/portfolio` list page → `/dev` ✅ Done
   - [x] Create branch `fix/portfolio-redirect` from master (depends on `feature/portfolio-slug` being merged first)
   - [x] Open `src/app/portfolio/page.tsx`
   - [x] Replace the page body with `import { redirect } from "next/navigation"; export default function PortfolioPage() { redirect("/dev"); }`
   - [x] Run `npm run build` to confirm no errors
   - [x] Commit, open PR into master, merge after review

4. **`fix/image-fallback`** — replace external fallback URLs with a local image ✅ Done
   - [x] Create branch `fix/image-fallback` from master
   - [x] Create `public/images/assets/placeholder.png` — local fallback image
   - [x] Open `src/lib/metadata.ts`; change `DEFAULT_OG_IMAGE` to local path, fix `toAbsoluteUrl()` to always return absolute URL
   - [x] Open `src/components/HomePageBlogs/BlogPostCard/BlogPostCard.tsx`; use local placeholder, remove dead conditional
   - [x] Update `src/components/Projects/ProjectPostCard/ProjectPostCard.tsx` and `src/app/dev/page.tsx` to use local placeholder
   - [x] Update `__tests__/metadata.test.ts` to assert full absolute URL
   - [x] Run `npm run build` and `npm test` — all 53 tests pass
   - [x] Commit, open PR #38 into master, merge after review

5. **`feature/deployment-infrastructure`** — Dockerfile, docker-compose, GitHub Actions workflows ✅ Done
   - [x] Create branch `feature/deployment-infrastructure` from master
   - [x] Write `Dockerfile` (multi-stage: deps → builder → runner, standalone output, non-root user)
   - [x] Write `docker-compose.yml` with `app` service + `cloudflared` tunnel sidecar (free, token via env var)
   - [x] Write `.github/workflows/build-and-push.yml` (builds image, pushes to GHCR on master merge)
   - [x] Write `.github/workflows/deploy.yml` (self-hosted homelab runner pulls + restarts compose)
   - [x] Write `.github/workflows/maintenance-reminder.yml` (monthly scheduled issue checklist)
   - [x] Add `.dockerignore` to keep image lean while preserving content/ directory
   - [x] Add `output: "standalone"` to `next.config.ts`
   - [x] Commit, open PR #39 into master, merge after review

---

## After Phase B — Phase C

- `feature/homepage-cards` — full card as click target, styled CTA chip
  - [ ] Create branch `feature/homepage-cards` from master
  - [ ] Open `src/components/HomePageBlogs/BlogPostCard/BlogPostCard.tsx`
  - [ ] Wrap the entire card body in a single `<Link href={post.url}>` so the whole surface is clickable
  - [ ] Replace the bare "View" or "Read more" text with a styled CTA chip (e.g. `rounded-full px-3 py-1 text-sm font-medium bg-accent text-accent-fg`)
  - [ ] Open `src/components/Projects/ProjectPostCard/ProjectPostCard.tsx`
  - [ ] Apply the same full-card link and CTA chip pattern
  - [ ] Test both card types in the browser across at least two themes
  - [ ] Run `npm run build` and `npm test` to confirm no regressions
  - [ ] Commit, open PR into master, merge after review

- `style/typography-pass` — standardise heading scale across all pages
  - [ ] Create branch `style/typography-pass` from master
  - [ ] Re-read the heading scale documented in `docs/design-system.md` as the target spec
  - [ ] Audit `src/app/page.tsx` — confirm h1/h2/h3 classes match the scale
  - [ ] Audit `src/app/dev/page.tsx` — same check
  - [ ] Audit `src/app/blog/page.tsx` — same check
  - [ ] Audit `src/app/blog/[slug]/page.tsx` — same check (MDX prose styles too)
  - [ ] Audit `src/app/portfolio/page.tsx` and `src/app/portfolio/[slug]/page.tsx`
  - [ ] Audit `src/app/about/page.tsx` and `src/app/translations/page.tsx`
  - [ ] Apply any fixes so every page uses the documented scale consistently
  - [ ] Check on mobile (375px) that heading sizes don't overflow
  - [ ] Run `npm run build` and `npm test`
  - [ ] Commit, open PR into master, merge after review

- `feature/person-jsonld` — Person + WebSite schema on home page
  - [ ] Create branch `feature/person-jsonld` from master
  - [ ] Create (or extend) a JSON-LD helper in `src/lib/` for `Person` and `WebSite` schema types
  - [ ] Add the `Person` schema (name, url, sameAs social links) as a `<script type="application/ld+json">` in `src/app/page.tsx`
  - [ ] Add the `WebSite` schema (name, url, potentialAction SearchAction) alongside it
  - [ ] Validate output using Google's Rich Results Test (paste the page HTML)
  - [ ] Run `npm run build` and `npm test`
  - [ ] Commit, open PR into master, merge after review
