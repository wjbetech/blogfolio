# Content Operations & PR Workflow

This document captures the editorial workflow for content updates (posts, projects, changelog entries) and ensures every change meets the same quality bar before merging.

## C1. Editorial workflow definition

1. **Branch naming for content-only updates**
   - Use an explicit prefix so reviewers know the branch only touches content. Example: `content/posts/add-css-grid-guide`, `content/projects/update-ecommerce`, or `content/changelog/sort-update`.
   - Keep the rest of the branch name short, lowercase, and hyphenated.

2. **PR template section for content changes**
   - When opening a PR that touches files under `/content`, include a dedicated section near the top of your PR body, e.g.:

     ```markdown
     ## Content changes

     - Highlights (new post/project, metadata fixes, etc.)
     - Content-level QA steps completed (validate script, `npm run contentlayer:generate`, preview)
     - Checklist references (slug, tags, assets, etc.)
     ```

   - Link to `docs/contentlayer.md` and `docs/content-operations.md` in PR descriptions to make context explicit.

3. **Review checklist for content PRs**
   - Confirm required frontmatter fields exist (`id`, `slug`, `title`, `publishedAt`, `updatedAt`, `excerpt/description`, `tags`/`tech`, `featured`, etc.).
   - Run `npm run validate:content` locally or via CI; mention the output in the PR comments.
   - Verify slug and ID remain unique and use lowercase hyphenated format.
   - Confirm tags/tech arrays contain only non-empty strings, and links (assets/external URLs) resolve.
   - Optional: run `npm run contentlayer:generate` and `npm run dev` to ensure the site still builds and runs after the change.

Once this workflow is documented in the PR, the team can confidently merge content updates without introducing schema drift or build failures.

## C2. Content QA checklist implementation

Before any content PR is merged, the author and reviewer should walk through a lightweight checklist that proves the frontmatter, assets, and generated output remain valid. Attach the checklist results (pass/fail and command output) to the PR body or a review comment, ideally in the same section defined under C1.

- Confirm every entry has the canonical frontmatter (`id`, `slug`, `title`, `publishedAt`, `updatedAt`, `excerpt`/`description`, `tags`/`tech`, `featured`, etc.) and that no field is empty or missing.
- Run `npm run validate:content` and resolve every violation (missing fields, duplicate slugs/IDs, malformed dates, empty tags, malformed arrays) before asking for a review.
- Ensure each `slug` matches the kebab-case convention and that `id`/`slug` combos remain unique within their type so rerunning Contentlayer generation produces stable paths.
- Verify `tags`, `tech`, or other tag-like arrays contain only trimmed, non-empty strings; replace stray numbers or objects with human-readable labels where needed.
- Check URLs and image paths referenced in frontmatter: external URLs should respond, and local files should live under `/public`. Document any external domains used in `next.config.ts` if `next/image` is involved.
- After fixing metadata, rerun `npm run contentlayer:generate` and `npm run dev` (or another build command) to ensure the new generated types populate `contentlayer/generated` without schema errors.

Editors should paste a short summary in the PR section described under C1 (near the top) with the commands they ran, e.g.:

```markdown
## Content changes

- Highlights: added XYZ post and refreshed tags for ABC project
- QA commands: `npm run validate:content`, `npm run contentlayer:generate`
- Checklist: frontmatter, slug review, tag validation, image/link sanity
```

## C3. Monthly content maintenance cadence

Content stays trustworthy when we revisit it on a predictable cadence. Treat the first working day of each month as a light audit cycle with these guardrails:

- **Schedule ownership** – rotate a reviewer (content lead or team member) who opens a monthly issue/PR, notes which folders were checked, and links any maintenance commits back to that reference for traceability.
- **Metadata refresh** – bump `updatedAt` when you revise a post or project, retire `featured` flags that no longer apply, and ensure descriptions/excerpts remain current. Capture the clear reason for each metadata change in the PR summary.
- **Links & assets** – rerun `npm run validate:content` to catch frontmatter errors, then spot-check critical external URLs and image references; update `next.config.ts` if new image domains are required by `next/image`.
- **Changelog coordination** – log the maintenance work inside `docs/changelog.md` or `changelog/entries.json`, noting what was refreshed or archived so future cycles can learn from the history.
- **Verification** – rerun `npm run contentlayer:generate` and `npm run dev` to ensure generated data matches the filesystem, and paste the command outputs (pass/fail) into the monthly issue/PR comment along with a short summary like “monthly maintenance: refreshed tags, removed outdated project.”

Close the issue when the audit completes and optionally pin a note in the shared doc so the team knows content has been reviewed. Keeping a short log of each cycle helps spot long-lived problems earlier.
