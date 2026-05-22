# Blogfolio TODO

Keep this file focused on the next few concrete steps only.

## Active

Key:

[ ] Task not started [-] Task in progress [x] Task finished

- [x] Add heading anchors to blog post content
  - [x] Render markdown-style heading lines from `post.body.raw` as heading elements instead of plain paragraphs
  - [x] Generate stable slug IDs for rendered headings
  - [x] Add visible anchor links for headings that work on hover and keyboard focus
  - [x] Add narrow tests for heading parsing, slug generation, and heading-link rendering
  - [x] Manually verify deep-linking on one blog post with headings

- [ ] Review whether a table of contents is needed for long posts
  - [ ] Audit the current published posts for heading count and rough content length
  - [ ] Define a concrete threshold for when a table of contents should appear
  - [ ] Record whether any current posts meet that threshold
  - [ ] If the threshold is met, add a follow-up implementation item for a conditional table of contents
  - [ ] If the threshold is not met, move the table-of-contents work to `Deferred` with the threshold noted

- [ ] Define Lighthouse targets
  - [ ] Choose the routes to measure: `/`, `/blog`, one published `/blog/[slug]`, and `/dev`
  - [ ] Run Lighthouse against those routes in production mode and record the baseline scores
  - [ ] Set explicit minimum targets for Performance, Accessibility, and Best Practices
  - [ ] Record the targets and measurement method in `docs/roadmap.md`
  - [ ] Add a follow-up task for periodic performance review checks

## After That

- [ ] Add a lightweight docs audit cadence

## Deferred

- [ ]
