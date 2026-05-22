# Blogfolio TODO

Keep this file focused on the next few concrete steps only.

## Active

Key:

[ ] Task not started [-] Task in progress [x] Task finished

- [x] Fix stale schema field names in the docs
- [-] Define media conventions and image placement rules
  - [x] Document the media policy in docs/contentlayer.md:
    - local-first image strategy, with remote images still allowed long-term
    - posts and projects both support multiple images
    - image field becomes images for blog content as well
    - image order is meaningful, with the first image treated as the primary visual
    - empty strings are allowed and should fall back to the default/fallback image behavior
  - [x] Document authoring rules in docs/content-operations.md:
    - where local assets should live under public/images/posts and public/images/projects
    - when remote images are acceptable
    - how to choose the primary image versus supporting images
    - how fallback behavior should be described in PR QA notes
  - [x] Define cleanup follow-ups for existing content:
    - [x] audit existing posts still using `image` + `coverImage`
    - [x] review blank post media fields that rely on fallback behavior
    - [x] establish the plan for a CDN to keep all of the posts/projects images off-site cleanly. (use `imagekit.io`)
  - [x] Create a follow-up task for schema and validator tightening:
    - [x] migrate post image to images
    - [x] keep coverImage semantics explicit
    - [x] validate ordered image arrays and fallback expectations
- [x] Add robots.txt
- [x] Add RSS feed generation
  - [x] Add an App Router RSS route at `src/app/rss.xml/route.ts`
  - [x] Generate valid RSS XML for published blog posts only
  - [x] Map each post into feed items with title, link, guid, excerpt, and publish date
  - [x] Sort feed items by newest-first and set the feed-level lastBuildDate
  - [x] Reuse the `SITE_URL` from `src/lib/metadata.ts` for feed and item links
  - [x] Add feed discovery so `/rss.xml` is easy to find
  - [x] Manually verify the output in the browser with an RSS validator or reader
- [x] Add structured data for posts and projects
  - [x] Add a shared JSON-LD helper for safe serialization and absolute URLs
  - [x] Render `BlogPosting` JSON-LD on blog post pages from existing post fields
  - [x] Render `CollectionPage` + `ItemList` JSON-LD on the `/dev` projects page from published projects using only real current URLs
  - [x] Add narrow tests for JSON-LD payload shape, image/date fallback, and script-safe escaping
  - [x] Manually validate one blog post and the `/dev` projects page with structured-data validators

## After That

- [ ] Add heading anchors to blog post content
- [ ] Review whether a table of contents is needed for long posts
- [ ] Define Lighthouse targets

## Deferred

- [ ] Add a lightweight docs audit cadence
