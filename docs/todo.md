# Blogfolio TODO

Keep this file focused on the next few concrete steps only.

## Active

Key:

[ ] Task not started [-] Task in progress [x] Task finished

- [x] Fix stale schema field names in the docs
- [-] Define media conventions and image placement rules
  - [ ] Document the media policy in docs/contentlayer.md:
    - local-first image strategy, with remote images still allowed long-term
    - posts and projects both support multiple images
    - image field becomes images for blog content as well
    - image order is meaningful, with the first image treated as the primary visual
    - empty strings are allowed and should fall back to the default/fallback image behavior
  - [ ] Document authoring rules in docs/content-operations.md:
    - where local assets should live under public/images/posts and public/images/projects
    - when remote images are acceptable
    - how to choose the primary image versus supporting images
    - how fallback behavior should be described in PR QA notes
  - [ ] Define cleanup follow-ups for existing content:
    - identify posts still using single-image conventions
    - identify empty-string media fields that rely on fallback behavior
    - identify project entries whose image ordering should be preserved explicitly
  - [ ] Create a follow-up task for schema and validator tightening:
    - migrate post image to images
    - keep coverImage semantics explicit
    - validate ordered image arrays and fallback expectations
- [ ] Add robots.txt
- [ ] Add RSS feed generation
- [ ] Add structured data for posts and projects

## After That

- [ ] Add heading anchors to blog post content
- [ ] Review whether a table of contents is needed for long posts
- [ ] Define Lighthouse targets

## Deferred

- [ ] Add a lightweight docs audit cadence
