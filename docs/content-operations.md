# Content Operations Playbook

This guide turns the C1–C3 items from [docs/todo.md](./todo.md) into a repeatable editorial process. Use it whenever you open a content-only branch, file a content PR, or run the monthly maintenance sweep.

## C1 — Editorial workflow foundation

### Branch naming for content-only updates

- Always start from the default branch (`master`) on a clean tree: run `git fetch && git pull`, then branch off with the appropriate prefix (`feature/`, `fix/`, `refactor/`).
- Append a descriptive, hyphenated identifier that references the content scope or todo reference so it is obvious what you are tackling. Valid examples: `feature/C1-content-ops-playbook`, `feature/C2-content-qacomplete`, `fix/content-slug-normalize`.
- If a branch spans multiple C-series checkboxes, call that out in the branch name (e.g., `feature/C1-C2-content-ops`), and document the split in the PR description.
- Include the todo or roadmap reference in your own notes (`docs/todo.md` and `docs/roadmap.md` should both state the work is in the C-series). This keeps the traceability between the checklist and the branch alive.

### Content PR template additions

Every content-focused PR should include a dedicated **Content Operations** section near the bottom of the description. Copy this skeleton so reviewers know what to look for:

```markdown
## Content Operations

- **Todo item:** C1, C2, C3 (record the specific checkbox or combination).
- **Commands:** `npm run contentlayer:generate`, targeted `npm run test`, `npm run lint`, etc. (list only the commands you actually ran).
- **QA checklist link:** Reference `docs/content-operations.md` and call out any automated tooling used to validate links/images/slugs.
- **Proof:** include screenshots, Contentlayer build output, or notes about preview verification.
```

Point readers back to [docs/todo.md](./todo.md) when your changes resolve a checkbox so the review has a single source of truth for the task status.

### Review checklist for editors

1. Confirm the content adheres to the schema defined in `contentlayer.config.ts`, especially mandatory frontmatter such as `title`, `date`, `status`, `tags`, and the body field.
2. Verify slug consistency: either allow Contentlayer’s computed slug from the filename or provide a manual override that follows the `YYYY-MM-DD-title` convention. Do not introduce spaces or unexpected characters.
3. Ensure slug/ID uniqueness across `allPosts` and `allProjects`. Update metadata or rename files if a collision is detected.
4. Confirm referenced images live under `public/` (preferably `/public/images/...`) or on a trusted CDN, and include a fallback notice when external assets are fragile.
5. Validate every internal/external link in the content block, especially those pointing to the blog, portfolio, contact/demo, or external resources used in tutorials.
6. Double-check that `docs/task-guidelines.md` or this playbook receives an update whenever the workflow changes, and add a note to the PR about the docs touched.

## C2 — Content QA checklist

Include this checklist under a **QA Checklist** heading inside the PR so both author and reviewer can quickly tick boxes before merging:

- **Frontmatter complete and valid.** Posts require `title`, `date`, `status`, `tags`, `description`, and `coverImage`. Projects need `title`, `status`, `builtWith`, `callToActionLink`, and any required custom fields. Missing keys should block the merge.
- **Links work.** Manually click every new internal link (cross-check `src/app/pages` if needed), and verify outbound links resolve and use HTTPS when available. If you add lots of links, consider running a link-checker script (add the command to this section).
- **Images resolve/fallback.** `coverImage` or project screenshots must point to existing files in `public/images` (projects or posts) or be hosted on reliable CDNs. Provide alt text and note any fallback shown when the asset is missing.
- **Slugs are human-readable and unique.** Prefer the computed slug derived from the filename, but allow manual overrides when necessary. If you override, trim whitespace/prefixes and make sure the value matches `/posts/yyyy-mm-dd-slug` or `/projects/slug` patterns.

If any bullet does not apply (e.g., no new links), add a short justification in the checklist so reviewers understand why the box is left unchecked.

## C3 — Monthly content maintenance cadence

Perform this sweep once per month (suggested first weekday) and log the results in `docs/changelog.md` and the adjacent entry in `docs/todo.md` so the team knows the last time the cadence ran.

1. **Update stale project links.** Review `content/projects/*.md` for `callToActionLink`, demo URLs, and repo links. Replace any dead resources, repair redirects, or archive the project if it no longer applies.
2. **Refresh outdated post metadata.** Skim evergreen posts for stale dates, tags, or `status` fields; adjust `status` to `archived` when the content is obsolete, and note any author attribution changes.
3. **Archive or revise obsolete content.** Tag guides that rely on deprecated frameworks/APIs with a short notice and link to fresher alternatives, or move them into an `archive/` folder if they should be hidden from lists.

Document this cadence run with a single changelog entry (`docs/changelog.md`) and a reminder in `docs/todo.md` (e.g., “Monthly content sweep – March 2026”). That way the next maintainer knows what was verified.
