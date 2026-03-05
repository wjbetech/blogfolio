# Content Operations Playbook

This guide converts the C1–C3 items in [docs/todo.md](./todo.md) into a repeatable process that complements `docs/task-guidelines.md`. Follow it whenever you handle editorial branches, PRs, or periodic content maintenance.

## Branch naming for content-only updates

- Start from the default branch (`master`) and branch with one of the prefixes from `task-guidelines.md` (`feature/`, `fix/`, `refactor/`), but include a content label so it is obvious which task you are addressing (e.g., `feature/content-ops-guidelines`, `fix/content-slug-normalization`).
- Use hyphenated short names that reference the todo identifier (C1, C2, etc.) or describe the content area (posts, projects, editorial). Example: `feature/C1-content-ops-playbook`, `feature/C2-content-qacomplete`.
- Always run `git fetch && git pull` on `master` before branching so you build on the latest docs and code.

## PR template and review checklist for content

- Add a “Content Operations” section to every content-focused PR and call out:
  - Which `docs/todo.md` item this PR resolves (e.g., C1, C2.a, etc.).
  - The automated commands you ran (`npm run contentlayer:generate`, targeted Jest suites, `npm run lint`).
  - Proof of content validation (screenshots, storybook URLs, Contentlayer status).  
- On the reviewer side, explicitly verify that:
  - No stale mock data remains.
  - `docs/todo.md` and `docs/task-guidelines.md` receive updates if the work changes the process.
  - Frontmatter changes are reflected in the `content/` markdown files and `contentlayer.config.ts` if needed.

## Review checklist for editors

1. Confirm the proposed content matches the schema in `contentlayer.config.ts`. Mandatory fields (title, date, status, tags, slug-derived values) must stay intact.  
2. Verify slug consistency: either supply an override that matches the existing naming convention or rely on the computed slug from the filename.  
3. Ensure there are no duplicate slugs or IDs across posts/projects.  
4. Check that any referenced images exist under `public/images` or use verified remote URLs.  
5. Validate external/internal links render correctly and have sensible CTAs (projects → demos, posts → related guides).  
6. Review `docs/task-guidelines.md` to confirm you followed the workflow (branch naming, verification commands, PR checklist) and update that file when the process shifts.

## Content QA checklist (C2)

Use this checklist before merging any content change:

- **Frontmatter complete and valid.** Ensure every markdown file has `title`, `date`, `status`, `tags`, `description`, and any required fields for posts (e.g., `coverImage`) or projects (`builtWith`). Missing keys should block the PR.  
- **Links work.** Validate key references (internal blog/project links, about/contact references, new outbound resources) either manually or via an automated link checker if you add one in the future.  
- **Images resolve/fallback.** Confirm the `coverImage` or project screenshot paths exist in `public/images/projects/` or the referenced CDN provides the asset. Add a fallback notice for missing assets.  
- **Slugs are human-readable and unique.** Prefer slug overrides that match the derived slug pattern (`YYYY-MM-DD-title`). When a slug is specified manually, trim spaces and drop date prefixes so the normalized version matches the computed slug.

Record this checklist in the PR under a “QA Checklist” section so reviewers can tick off each item. If a bullet is not applicable (e.g., no new links), note why.

## Monthly content maintenance cadence (C3)

Every month run through this quick pass and update `docs/todo.md` with the status (date/PR reference).  

1. **Update stale project links.** Open each `content/projects/*.md` and verify its `callToActionLink`, demo URL, and repo link still resolve. Replace dead links or archive the project if necessary.  
2. **Refresh outdated post metadata.** Reconfirm publish dates, featured tags, and author attributions for evergreen posts; update the `status` field to `archived` if the guide is obsolete.  
3. **Archive or revise obsolete content.** Identify posts or projects that reference deprecated frameworks, old exercises, or outdated APIs—add a note about the deprecation and link to a fresher resource, or move the file to an `archive/` directory if it should no longer appear.

Use a single changelog entry per cadence run (e.g., `docs/changelog.md`) that references the maintenance PR so future audits know when the last sweep occurred.