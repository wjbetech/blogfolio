# Changelog Commit Message Guide

This project writes changelog entries into `changelog/entries.json` using the structure in `src/app/types/changelog.ts`.

Each entry looks like:

```json
{
  "date": "YYYY-MM-DD",
  "version": "0.2.3",
  "changes": [
    { "category": "Feature", "description": "Added a new palette card" },
    { "category": "Fix", "description": "Corrected theme drawer focus state" }
  ]
}
```

## Required: Commit message format

The script parses your commit message to extract:

1. **Version** (semver)
2. **Changes list** (category + description)

### Version formats (semver)

Use one of these in the commit message:

- `chore(release): v1.2.3`
- `release: v1.2.3`
- `version: v1.2.3`
- or start the message with `v1.2.3`

If no version is in the message, the script will reuse the latest version from the first entry in `changelog/entries.json`.

### Changes list format

Use a **pipe-separated** list of `Category: description` segments.

Example commit message:

```
chore(release): v0.2.3 | Feature: Added changelog view | Fix: Improved focus states
```

Valid categories (from `src/app/types/changelog.ts`):

- Feature
- Fix
- Bug
- Improvement
- Chore
- Removed
- Test
- Style

If no valid changes are detected, the script will add a single:

```
Chore: <entire commit message>
```

## What happens on push

- On pushes to `master`, GitHub Actions runs `.github/scripts/update-changelog.js`.
- It prepends a new entry in `changelog/entries.json` using your commit message.
- If the version string is present but not valid semver, the workflow fails.

## Tips

- Keep descriptions short and user-facing.
- Prefer multiple segments rather than long sentences.
- If you want tag-based releases instead of commit parsing, we can switch the workflow to trigger on tags.
