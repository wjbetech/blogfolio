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

1. **`fix/site-url-env`** — make SITE_URL env-driven, add .env.example, update tests
   - [ ] Create branch `fix/site-url-env` from master
   - [ ] Open `src/lib/metadata.ts`; change line 6 hardcoded `"https://blogfolio.dev"` to `process.env.NEXT_PUBLIC_SITE_URL ?? "https://williameast.com"`
   - [ ] Create `.env.example` at repo root with `NEXT_PUBLIC_SITE_URL=https://williameast.com`
   - [ ] Check `__tests__/` and `__mocks__/` for any reference to the old hardcoded URL and update them
   - [ ] Run `npm run build` to confirm no type errors
   - [ ] Run `npm test` to confirm all tests pass
   - [ ] Commit, open PR into master, merge after review

2. **`feature/portfolio-slug`** — build `/portfolio/[slug]` route (fixes all 404s)
   - [ ] Create branch `feature/portfolio-slug` from master
   - [ ] Create directory `src/app/portfolio/[slug]/`
   - [ ] Create `page.tsx` with:
     - `generateStaticParams` that maps `allProjects` → `{ slug }`
     - `generateMetadata` that returns title + description per project
     - A page component that looks up the project by slug, renders title, dates, tags, MDX body, and external links
   - [ ] Run `npm run build` to confirm static generation succeeds for all project slugs
   - [ ] Manually visit one `/portfolio/[slug]` URL in the browser and verify it renders
   - [ ] Commit, open PR into master, merge after review

3. **`fix/portfolio-redirect`** — redirect `/portfolio` list page → `/dev`
   - [ ] Create branch `fix/portfolio-redirect` from master (depends on `feature/portfolio-slug` being merged first)
   - [ ] Open `src/app/portfolio/page.tsx`
   - [ ] Replace the page body with `import { redirect } from "next/navigation"; export default function PortfolioPage() { redirect("/dev"); }`
   - [ ] Run `npm run build` to confirm no errors
   - [ ] Manually visit `/portfolio` in the browser and confirm it redirects to `/dev`
   - [ ] Commit, open PR into master, merge after review

4. **`fix/image-fallback`** — replace external fallback URLs with a local image
   - [ ] Create branch `fix/image-fallback` from master
   - [ ] Create (or confirm presence of) `public/images/og-default.png` — a simple 1200×630 branded fallback
   - [ ] Open `src/lib/metadata.ts`; change `DEFAULT_OG_IMAGE` to `"/images/og-default.png"`
   - [ ] Open `src/components/HomePageBlogs/BlogPostCard/BlogPostCard.tsx`; replace the CUNY fallback URL with `"/images/og-default.png"`
   - [ ] Visually test that blog cards missing a cover image show the local fallback
   - [ ] Run `npm run build` and `npm test` to confirm no regressions
   - [ ] Commit, open PR into master, merge after review

5. **`feature/deployment-infrastructure`** — Dockerfile, docker-compose, GitHub Actions workflows
   - [ ] Create branch `feature/deployment-infrastructure` from master
   - [ ] Write `Dockerfile` (multi-stage: builder → runner, standalone output, non-root user)
   - [ ] Write `docker-compose.yml` with `app` service (the Next.js container) and `cloudflared` service
   - [ ] Write `.github/workflows/build-and-push.yml` (builds Docker image, pushes to GHCR on master merge)
   - [ ] Write `.github/workflows/deploy.yml` (pulls new image on homelab via self-hosted runner, restarts compose)
   - [ ] Write `.github/workflows/maintenance-reminder.yml` (monthly scheduled issue — see `docs/maintenance.md`)
   - [ ] Add `.env.example` entry for `CLOUDFLARED_TOKEN` placeholder comment
   - [ ] Run `docker build .` locally to confirm the Dockerfile is valid
   - [ ] Commit, open PR into master, merge after review

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
