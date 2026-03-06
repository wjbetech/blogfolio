# Blogfolio Execution Todo (Junior-Dev Playbook)

This file translates the roadmap into executable tasks.

How to use this file:

- Work top to bottom.
- Complete all checkboxes in one task before moving to the next.
- For each task, include: PR link, screenshots (if UI), and test/build proof.
- Keep changes small and focused (one theme per PR when possible).

## Master Checklist

A short, actionable checklist that maps to sections below. Check items as you complete them and include PR links and test proof in the section bodies.

- [x] A) Foundation + Frontend Completion (A1-A4)
- [x] B) Contentlayer Core (B1-B3)
- [x] C) Content Operations & PR workflow (C1-C3)
- [x] D) SEO & Discovery (medium-term)
- [x] G) Analytics & KPI setup
- [ ] H) DX & CI governance

Priority windows:

- **Short term (0-4 weeks):** Must-have for stable MVP and clean architecture.
- **Medium term (1-3 months):** Quality, growth, and operational maturity.
- **Long term (3+ months):** Advanced platform capabilities and scaling.

---

## Short Term (0-4 Weeks)

### A) Foundation + Frontend Completion

#### -A.

#### Color Scheme

- [x] Welcome Theme — Headline color darkened (merged)
- [x] Proudmoore Silk — Headline color darkened (merged)
- [x] Demon Hunter — Headline adjusted for contrast (merged)
- [x] Ardougne — Headline darkened (merged)
- [x] Jungle Remedy — Headline and navbar item darkened (merged)
- [x] Tinkertown — Headline color needs to be darker

#### Styling

- [x] Portfolio item headers need the same underline effect as the Navbar
- [x] Portfolio item headers should probably have `hover:` color changers
- [x] Portfolio `BUILT WITH` text has low opacity which needs changing
- [x] Fix the Navbar padding issue

#### Bugs

- [x] The palette menu should scroll to the current item

#### A1. Accessibility closure for navigation/theme UI

- [x] Theme toggle button accessibility
  - [x] Add `aria-expanded` and `aria-controls` to toggle button.
  - [x] Ensure control IDs are stable and unique.
  - [x] Verify screen reader reads expanded/collapsed state.
- [x] Drawer accessibility behavior
  - [x] Add proper dialog semantics (`role="dialog"`, modal behavior if overlay).
  - [x] Trap focus while drawer is open.
  - [x] Return focus to toggle trigger on close.
  - [x] Close drawer with `Esc` key.
- [x] Active navigation semantics
  - [x] Add `aria-current="page"` to active nav link.
  - [x] Validate desktop and mobile nav variants.
  - [x] Ensure Blog nav item remains active on blog/[slug] view (underline effect)
- [x] Keyboard and focus checks
  - [x] Confirm tab order is logical.
  - [x] Add/confirm visible focus ring states.
  - [x] Test keyboard-only flow on Home, Blog, Portfolio, Dev pages.
- [x] Verification
  - [x] Run local manual a11y test pass.
  - [x] Add checklist results to PR description.

#### A2. UI consistency and remaining style fixes

- [x] Carousel UX improvements
  - [x] Implement CSS scroll snapping where planned.
  - [x] Ensure arrow controls align with snap points.
- [x] Theme color corrections (existing backlog)
  - [x] Welcome theme: darken headline color.
  - [x] Proudmoore Silk: darken headline color.
  - [x] Demon Hunter: adjust headline to improve contrast (purple candidate).
  - [x] Ardougne: darken headline color.
  - [x] Jungle Remedy: darken headline and navbar item colors.
  - [x] Tinkertown: darken headline color.
- [x] Component styling backlog
- [x] Portfolio headers use same underline effect as navbar links.
- [x] Add hover color transitions to portfolio item headers.
- [x] Increase readability of portfolio `BUILT WITH` label.
- [x] Fix navbar padding issue across breakpoints.
- [x] Bug fix
- [x] Palette menu auto-scrolls to the currently selected item.
- [x] Layout: Fix Footer to be pinned to bottom on every page

#### A3. Blog route completion

- [x] Dynamic blog detail page (`src/app/blog/[slug]/page.tsx`)
  - [x] Resolve post by slug from Contentlayer data.
  - [x] Add graceful 404 when slug missing.
  - [x] Render content body with current typography rules.
- [x] Reading baseline
  - [x] Show publish date and tags.
  - [x] Add placeholder/cover image fallback behavior.
  - [x] Confirm no hydration/runtime warnings.
  - [x] Changelog: load 5 latest changes initially and implement infinite scroll as user scrolls down.

#### A4. Portfolio/dev content media baseline

- [x] Ensure all portfolio/project items have valid image behavior
  - [x] Use placeholder fallback if image missing.
  - [x] Confirm existing paths under `public/images/...` or valid remote URLs.
- [x] Add/verify project descriptions for all featured entries.
- [x] Verification
  - [x] Test home featured carousel and `/dev` route for missing-image scenarios.

---

### B) Contentlayer Core (Roadmap Phase 2.1 + 2.2)

#### B1. Contentlayer schema hardening

- [x] Audit `contentlayer.config.ts`
  - [x] Ensure posts/projects source directories are correct.
  - [x] Ensure required fields are marked required where appropriate.
  - [x] Add computed fields (slug/url/reading metadata as needed).
- [x] Frontmatter standardization
  - [x] Define canonical post frontmatter keys.
  - [x] Define canonical project frontmatter keys.
  - [x] Include optional vs required field table in docs.
- [x] Type strategy
  - [x] Decide whether to use generated Contentlayer types directly.
  - [x] If wrapper types are needed, add thin interfaces in `src/app/types/`.

#### B2. Content migration + example content quality

- [x] Ensure all `content/posts/*.md` and `content/projects/*.md` follow schema.
- [x] Normalize date formats and slug conventions.
- [x] Ensure unique slugs and IDs.
  - [x] Remove stale mock-data dependencies in components/routes where applicable.

#### B3. Build/dev workflow docs and commands

- [x] Document when to run Contentlayer generation.
- [x] Add “common failures and fixes” section (schema mismatch, bad frontmatter, missing files).
- [x] Verify `npm run contentlayer:generate` and `npm run dev` work after schema changes.

---

### C) Content Operations + PR workflow (Roadmap Phase 2.4)

#### C1. Editorial workflow definition

- [x] Define branch naming for content-only updates. (see [./content-operations.md](./content-operations.md))
- [x] Define PR template section for content changes. (see [./content-operations.md](./content-operations.md))
- [x] Define review checklist for content PRs. (see [./content-operations.md](./content-operations.md))

#### C2. Content QA checklist implementation

- [x] Checklist includes: (see [./content-operations.md](./content-operations.md))
  - [x] Frontmatter complete and valid.
  - [x] Links work (internal and key external).
  - [x] Images resolve/fallback correctly.
  - [x] Slugs are unique and human-readable.
- [x] Add this checklist to docs and PR process. (see [./content-operations.md](./content-operations.md))

#### C3. Monthly content maintenance cadence

- [x] Create recurring maintenance checklist: (see [./content-operations.md](./content-operations.md))
  - [x] Update stale project links.
  - [x] Refresh outdated post metadata.
  - [x] Archive or revise obsolete content.

---

## Medium Term (1-3 Months)

### D) SEO & Discovery (Roadmap Phase 3)

#### D1. Metadata foundations

- [x] Standardize site/blog/project metadata templates with canonical, Open Graph, and Twitter fields (see `src/lib/metadata.ts`).
- [x] Wire the helper into layout, the `/blog` and `/portfolio` pages, and the `blog/[slug]` route so every page emits the same SEO data.

#### D2. Route-level metadata validation

- [x] Generate metadata per post (`generateMetadata`) that embeds canonical URLs and OG images.
- [x] Add a Jest guard (`__tests__/metadata.test.ts`) that ensures metadata helpers always return canonical supporting data before merging content.

Priority windows:

- **Short term (0-4 weeks):** Must-have for stable MVP and clean architecture.
- **Medium term (1-3 months):** Quality, growth, and operational maturity.
- **Long term (3+ months):** Advanced platform capabilities and scaling.

---

## Immediate (Next 1-3 days)

These tasks should be started immediately and completed before other short-term items. They are high-impact fixes that unblock content and UX work.

### A) Foundation + Frontend Completion (Immediate)

#### A1. Accessibility closure for navigation/theme UI

- [x] Theme toggle button accessibility
  - [x] Add `aria-expanded` and `aria-controls` to toggle button.
  - [x] Ensure control IDs are stable and unique.
  - [ ] Verify screen reader reads expanded/collapsed state.
- [x] Drawer accessibility behavior
  - [x] Add proper dialog semantics (`role="dialog"`, modal behavior if overlay).
  - [x] Trap focus while drawer is open.
  - [x] Return focus to toggle trigger on close.
  - [x] Close drawer with `Esc` key.
- [x] Active navigation semantics
  - [x] Add `aria-current="page"` to active nav link.
  - [x] Validate desktop and mobile nav variants.
- [x] Keyboard and focus checks
  - [x] Confirm tab order is logical.
  - [x] Add/confirm visible focus ring states.
  - [x] Test keyboard-only flow on Home, Blog, Portfolio, Dev pages.
- [ ] Verification
  - [ ] Run local manual a11y test pass.
  - [ ] Add checklist results to PR description.

#### A2. UI consistency and remaining style fixes

- [x] Palette card sizing
  - [x] Make palette cards fixed width in all breakpoints.
  - [x] Verify no layout jump in carousels.
- [x] Carousel UX improvements
  - [x] Implement CSS scroll snapping where planned.
  - [x] Ensure arrow controls align with snap points.
- [x] Theme color corrections (existing backlog)
  - [x] Welcome theme: darken headline color.
  - [x] Proudmoore Silk: darken headline color.
  - [x] Demon Hunter: adjust headline to improve contrast (purple candidate).
  - [x] Ardougne: darken headline color.
  - [x] Jungle Remedy: darken headline and navbar item colors.
  - [x] Tinkertown: darken headline color.
- [x] Component styling backlog
  - [x] Portfolio headers use same underline effect as navbar links.
  - [x] Add hover color transitions to portfolio item headers.
  - [x] Increase readability of portfolio `BUILT WITH` label.
  - [x] Fix navbar padding issue across breakpoints.
- [x] Bug fix
  - [x] Palette menu auto-scrolls to the currently selected item.

#### A3. Blog route completion

- [ ] Dynamic blog detail page (`src/app/blog/[slug]/page.tsx`)
  - [ ] Resolve post by slug from Contentlayer data.
  - [ ] Add graceful 404 when slug missing.
  - [ ] Render content body with current typography rules.
- [ ] Reading baseline
  - [ ] Show publish date and tags.
  - [ ] Add placeholder/cover image fallback behavior.
- [ ] Verification
  - [ ] Test at least 3 real slugs.
  - [ ] Confirm no hydration/runtime warnings.

#### A4. Portfolio/dev content media baseline

- [x] Ensure all portfolio/project items have valid image behavior
  - [x] Use placeholder fallback if image missing.
  - [x] Confirm existing paths under `public/images/...` or valid remote URLs.
- [x] Add/verify project descriptions for all featured entries.
- [x] Verification
  - [x] Test home featured carousel and `/dev` route for missing-image scenarios.

#### G1. Privacy-first analytics setup

- [x] Choose lightweight analytics provider and integration strategy. (see [./analytics.md](./analytics.md))
- [x] Track core events:
  - [x] Page views
  - [x] Outbound GitHub/demo clicks
  - [x] Contact link clicks

#### G2. KPI framework

- [x] Define and document KPIs: (see [./analytics.md](./analytics.md))
  - [x] Most viewed posts
  - [x] Project CTA click-through rate
  - [x] Contact engagement rate
- [x] Add monthly KPI review checklist and actions. (see [./analytics.md](./analytics.md))

---

## Long Term (3+ Months)

### H) DX + governance maturity (Roadmap Phase 7)

#### H1. Content validation in CI

- [x] Add frontmatter schema checks in CI. (see [./content-validation.md](./content-validation.md))
- [x] Add required field checks for posts/projects. (see [./content-validation.md](./content-validation.md))
- [x] Add broken-link checks (internal + important external). (see [./content-validation.md](./content-validation.md))
- [x] Fail CI for malformed content or missing required metadata. (see [./content-validation.md](./content-validation.md))

#### H2. Documentation governance

- [ ] Define source-of-truth docs and ownership.
- [ ] Quarterly docs audit process:
  - [ ] Remove stale architecture notes.
  - [ ] Ensure `roadmap`, `contentlayer`, `styling`, `todo` stay aligned.
  - [ ] Add change-log entry for major process updates.

#### H3. Optional future content backend track (not MVP)

- [ ] Re-evaluate only if PR-based workflow becomes a bottleneck.
- [ ] Evaluate Git-backed CMS options first.
- [ ] If custom write APIs are introduced:
  - [ ] Add auth and role model.
  - [ ] Add input validation and sanitization.
  - [ ] Add rate limiting and audit logging.
  - [ ] Keep public rendering static where possible.

---

## Definition of Done (Global)

Before marking any task complete:

- [ ] Code/docs changes are merged.
- [ ] Local build/dev checks pass.
- [ ] Screenshots or proof attached for UI-facing tasks.
- [ ] Checklist items in this file are fully checked.
- [ ] Related docs updated (`roadmap.md`, `contentlayer.md`, and others as needed).

## Suggested Execution Order

1. Accessibility + UI cleanup (A1-A2)
2. Blog detail completion + image reliability (A3-A4)
3. Contentlayer hardening + workflow (B + C)
4. SEO/discovery foundations (D)
5. UX reading enhancements + performance budgets (E + F)
6. Analytics and iteration cadence (G)
7. CI validation + governance + optional future backend review (H)
