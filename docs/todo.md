# Blogfolio Execution Todo (Junior-Dev Playbook)

This file translates the roadmap into executable tasks.

How to use this file:

- Work top to bottom.
- Complete all checkboxes in one task before moving to the next.
- For each task, include: PR link, screenshots (if UI), and test/build proof.
- Keep changes small and focused (one theme per PR when possible).

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
- [ ] Tinkertown — Headline color needs to be darker

#### Styling

- Portfolio item headers need the same underline effect as the Navbar
- Portfolio item headers should probably have `hover:` color changers
- Portfolio `BUILT WITH` text has low opacity which needs changing
- Fix the Navbar padding issue

#### Bugs

- The palette menu should scroll to the current item

#### A1. Accessibility closure for navigation/theme UI

- [ ] Theme toggle button accessibility
  - [ ] Add `aria-expanded` and `aria-controls` to toggle button.
  - [ ] Ensure control IDs are stable and unique.
  - [ ] Verify screen reader reads expanded/collapsed state.
- [ ] Drawer accessibility behavior
  - [ ] Add proper dialog semantics (`role="dialog"`, modal behavior if overlay).
  - [ ] Trap focus while drawer is open.
  - [ ] Return focus to toggle trigger on close.
  - [ ] Close drawer with `Esc` key.
- [ ] Active navigation semantics
  - [ ] Add `aria-current="page"` to active nav link.
  - [ ] Validate desktop and mobile nav variants.
- [ ] Keyboard and focus checks
  - [ ] Confirm tab order is logical.
  - [ ] Add/confirm visible focus ring states.
  - [ ] Test keyboard-only flow on Home, Blog, Portfolio, Dev pages.
- [ ] Verification
  - [ ] Run local manual a11y test pass.
  - [ ] Add checklist results to PR description.

#### A2. UI consistency and remaining style fixes

- [ ] Palette card sizing
  - [ ] Make palette cards fixed width in all breakpoints.
  - [ ] Verify no layout jump in carousels.
- [ ] Carousel UX improvements
  - [ ] Implement CSS scroll snapping where planned.
  - [ ] Ensure arrow controls align with snap points.
- [ ] Theme color corrections (existing backlog)
  - [ ] Welcome theme: darken headline color.
  - [ ] Proudmoore Silk: darken headline color.
  - [ ] Demon Hunter: adjust headline to improve contrast (purple candidate).
  - [ ] Ardougne: darken headline color.
  - [ ] Jungle Remedy: darken headline and navbar item colors.
  - [ ] Tinkertown: darken headline color.
- [ ] Component styling backlog
  - [ ] Portfolio headers use same underline effect as navbar links.
  - [ ] Add hover color transitions to portfolio item headers.
  - [ ] Increase readability of portfolio `BUILT WITH` label.
  - [ ] Fix navbar padding issue across breakpoints.
- [ ] Bug fix
  - [ ] Palette menu auto-scrolls to the currently selected item.

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

- [ ] Ensure all portfolio/project items have valid image behavior
  - [ ] Use placeholder fallback if image missing.
  - [ ] Confirm existing paths under `public/images/...` or valid remote URLs.
- [ ] Add/verify project descriptions for all featured entries.
- [ ] Verification
  - [ ] Test home featured carousel and `/dev` route for missing-image scenarios.

---

### B) Contentlayer Core (Roadmap Phase 2.1 + 2.2)

#### B1. Contentlayer schema hardening

- [ ] Audit `contentlayer.config.ts`
  - [ ] Ensure posts/projects source directories are correct.
  - [ ] Ensure required fields are marked required where appropriate.
  - [ ] Add computed fields (slug/url/reading metadata as needed).
- [ ] Frontmatter standardization
  - [ ] Define canonical post frontmatter keys.
  - [ ] Define canonical project frontmatter keys.
  - [ ] Include optional vs required field table in docs.
- [ ] Type strategy
  - [ ] Decide whether to use generated Contentlayer types directly.
  - [ ] If wrapper types are needed, add thin interfaces in `src/app/types/`.

#### B2. Content migration + example content quality

- [ ] Ensure all `content/posts/*.md` and `content/projects/*.md` follow schema.
- [ ] Normalize date formats and slug conventions.
- [ ] Ensure unique slugs and IDs.
- [ ] Remove stale mock-data dependencies in components/routes where applicable.

#### B3. Build/dev workflow docs and commands

- [ ] Document when to run Contentlayer generation.
- [ ] Add “common failures and fixes” section (schema mismatch, bad frontmatter, missing files).
- [ ] Verify `npm run contentlayer:generate` and `npm run dev` work after schema changes.

---

### C) Content Operations + PR workflow (Roadmap Phase 2.4)

#### C1. Editorial workflow definition

- [ ] Define branch naming for content-only updates.
- [ ] Define PR template section for content changes.
- [ ] Define review checklist for content PRs.

#### C2. Content QA checklist implementation

- [ ] Checklist includes:
  - [ ] Frontmatter complete and valid.
  - [ ] Links work (internal and key external).
  - [ ] Images resolve/fallback correctly.
  - [ ] Slugs are unique and human-readable.
- [ ] Add this checklist to docs and PR process.

#### C3. Monthly content maintenance cadence

- [ ] Create recurring maintenance checklist:
  - [ ] Update stale project links.
  - [ ] Refresh outdated post metadata.
  - [ ] Archive or revise obsolete content.

---

## Medium Term (1-3 Months)

### D) SEO & Discovery (Roadmap Phase 3)

Priority windows:

- **Short term (0-4 weeks):** Must-have for stable MVP and clean architecture.
- **Medium term (1-3 months):** Quality, growth, and operational maturity.
- **Long term (3+ months):** Advanced platform capabilities and scaling.

---

## Immediate (Next 1-3 days)

These tasks should be started immediately and completed before other short-term items. They are high-impact fixes that unblock content and UX work.

### A) Foundation + Frontend Completion (Immediate)

#### A1. Accessibility closure for navigation/theme UI

- [ ] Theme toggle button accessibility
  - [ ] Add `aria-expanded` and `aria-controls` to toggle button.
  - [ ] Ensure control IDs are stable and unique.
  - [ ] Verify screen reader reads expanded/collapsed state.
- [ ] Drawer accessibility behavior
  - [ ] Add proper dialog semantics (`role="dialog"`, modal behavior if overlay).
  - [ ] Trap focus while drawer is open.
  - [ ] Return focus to toggle trigger on close.
  - [ ] Close drawer with `Esc` key.
- [ ] Active navigation semantics
  - [ ] Add `aria-current="page"` to active nav link.
  - [ ] Validate desktop and mobile nav variants.
- [ ] Keyboard and focus checks
  - [ ] Confirm tab order is logical.
  - [ ] Add/confirm visible focus ring states.
  - [ ] Test keyboard-only flow on Home, Blog, Portfolio, Dev pages.
- [ ] Verification
  - [ ] Run local manual a11y test pass.
  - [ ] Add checklist results to PR description.

#### A2. UI consistency and remaining style fixes

- [ ] Palette card sizing
  - [ ] Make palette cards fixed width in all breakpoints.
  - [ ] Verify no layout jump in carousels.
- [ ] Carousel UX improvements
  - [ ] Implement CSS scroll snapping where planned.
  - [ ] Ensure arrow controls align with snap points.
- [ ] Theme color corrections (existing backlog)
  - [ ] Welcome theme: darken headline color.
  - [ ] Proudmoore Silk: darken headline color.
  - [ ] Demon Hunter: adjust headline to improve contrast (purple candidate).
  - [ ] Ardougne: darken headline color.
  - [ ] Jungle Remedy: darken headline and navbar item colors.
  - [ ] Tinkertown: darken headline color.
- [ ] Component styling backlog
  - [ ] Portfolio headers use same underline effect as navbar links.
  - [ ] Add hover color transitions to portfolio item headers.
  - [ ] Increase readability of portfolio `BUILT WITH` label.
  - [ ] Fix navbar padding issue across breakpoints.
- [ ] Bug fix
  - [ ] Palette menu auto-scrolls to the currently selected item.

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

- [ ] Ensure all portfolio/project items have valid image behavior
  - [ ] Use placeholder fallback if image missing.
  - [ ] Confirm existing paths under `public/images/...` or valid remote URLs.
- [ ] Add/verify project descriptions for all featured entries.
- [ ] Verification
  - [ ] Test home featured carousel and `/dev` route for missing-image scenarios.

#### G1. Privacy-first analytics setup

- [ ] Choose lightweight analytics provider and integration strategy.
- [ ] Track core events:
  - [ ] Page views
  - [ ] Outbound GitHub/demo clicks
  - [ ] Contact link clicks

#### G2. KPI framework

- [ ] Define and document KPIs:
  - [ ] Most viewed posts
  - [ ] Project CTA click-through rate
  - [ ] Contact engagement rate
- [ ] Add monthly KPI review checklist and actions.

---

## Long Term (3+ Months)

### H) DX + governance maturity (Roadmap Phase 7)

#### H1. Content validation in CI

- [ ] Add frontmatter schema checks in CI.
- [ ] Add required field checks for posts/projects.
- [ ] Add broken-link checks (internal + important external).
- [ ] Fail CI for malformed content or missing required metadata.

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
