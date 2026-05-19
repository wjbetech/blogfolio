# Blogfolio Roadmap

## Current Status

Blogfolio now has:

- A working Next.js App Router frontend
- File-based Contentlayer content for posts and projects
- Typed metadata helpers for core routes and content pages
- A working sitemap route
- Core analytics and content validation in CI
- A custom theme system and a mostly complete accessibility baseline
- Tests covering major content, metadata, theme, and blog flows

Current focus:

- Simplify and reconcile the project documentation
- Tighten publishing/docs conventions
- Finish the next discovery and reading-experience improvements

# Phase 0: Documentation Reset [ ]

## 0.1 Reconcile Planning Docs

- [ ] Reconcile `docs/roadmap.md` and `docs/todo.md`
- [ ] Remove stale or historical checklist items from planning docs
- [ ] Keep roadmap high-level and todo execution-focused

## 0.2 Fix Stale Content Documentation

- [ ] Update stale Contentlayer/content-operations field names
- [ ] Ensure content docs match the actual schema in `contentlayer.config.ts`
- [ ] Add a lightweight docs audit cadence

# Phase 1: Content & Publishing Polish [ ]

## 1.1 Media Conventions

- [ ] Define media conventions for posts and projects
- [ ] Keep fallback behavior and media-field semantics documented clearly
- [ ] Align content docs with the ImageKit-based media strategy

## 1.2 Content Workflow Maintenance

- [ ] Keep editorial workflow, QA checklist, and maintenance docs aligned
- [ ] Review content docs for outdated workflow references

# Phase 2: SEO & Discovery [ ]

## 2.1 Discovery Features

- [x] Generate and verify `sitemap.xml`
- [ ] Add `robots.txt`
- [ ] Add RSS feed generation for blog posts
- [ ] Add structured data for posts and projects

# Phase 3: Reading Experience [ ]

## 3.1 Blog Reading Improvements

- [x] Add reading time estimates for blog posts
- [x] Add previous/next post navigation on post detail pages
- [ ] Add heading anchors for blog post content
- [ ] Add an optional table of contents for long posts if needed

## 3.2 Accessibility Final Pass

- [ ] Close remaining keyboard/focus/ARIA TODOs in navigation/theme UI
- [ ] Define final accessibility acceptance checks
- [ ] Add an accessibility regression checklist for UI changes

# Phase 4: Performance & Reliability [ ]

## 4.1 Performance Baseline

- [ ] Set explicit Lighthouse targets for Performance, Accessibility, and Best Practices
- [ ] Add periodic performance review checks for core routes

## 4.2 Image Delivery via ImageKit

- [ ] Configure ImageKit for long-term hosting of post and project media
- [ ] Wire Next.js image rendering and metadata usage to ImageKit-hosted assets
- [ ] Establish a clean ImageKit folder/path convention for posts and projects
- [ ] Add a migration path from current image fields and existing remote placeholders
- [ ] Use ImageKit transformations and optimization features where they improve delivery
- [ ] Ensure fallback behavior, validation, and docs stay in sync with ImageKit usage

# Phase 5: Governance & Maintenance [ ]

## 5.1 Documentation Governance

- [ ] Keep architecture and workflow decisions in sync across docs
- [ ] Add a quarterly docs audit to remove stale references

## 5.2 Optional Future Track

- [ ] Evaluate a Git-backed CMS only if PR-based content editing stops scaling
- [ ] Avoid introducing write APIs or an admin backend unless clearly needed
