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