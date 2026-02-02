# Semantic Versioning & Release Process

This project follows Semantic Versioning (semver) for releases: MAJOR.MINOR.PATCH.

Quick rules:

- Bumps must follow semver (e.g., `1.2.3`). A leading `v` is accepted in commit messages but will be normalized (e.g., `v1.2.3` → `1.2.3`).
- Release commits should use one of these formats in the commit message:
  - `chore(release): v1.2.3`
  - `release: v1.2.3`
  - Or start the commit message with `v1.2.3` (e.g., `v1.2.3 — publish changelog`).

What the GitHub Actions workflow does:

- On pushes to `master`, the workflow runs a script that prepends a new entry into `docs/changelog/entries.json` containing the commit SHA, author, message, and date.
- If the commit message indicates a release (matches the patterns above), the workflow/script validates the version string against semver. If the version is invalid, the workflow will fail.
- Valid release entries include a `version` field in `entries.json` (normalized without a leading `v`).

Recommended workflow for making a release:

1. Bump the version locally using a tool like `npm version` or manually update your release branch.
2. Create a release commit with one of the accepted formats, e.g.:

   chore(release): v1.2.3

3. Push to `master`. The workflow will validate the semver and update `docs/changelog/entries.json`.

Notes & tips:

- The workflow is conservative: it only treats commits as releases when the commit message explicitly declares a version (per the patterns above) or starts with a version tag.
- If you'd prefer releases to be created from Git tags instead of commit messages, we can update the workflow to trigger on tag creation and pull the tag name rather than parsing the commit message.
- If you want automatic CHANGELOG generation (with commit grouping by type), consider integrating tools like `semantic-release` or `standard-version`.

If you want changes to the release detection patterns or stricter rules (e.g., require PRs, require signed commits), say so and I'll update the workflow and script.
