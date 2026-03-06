# Content Validation in CI

The repo now validates content automatically on pull requests into `master` and on pushes to `master`.

## What runs

- `npm run validate:content`
- `npm test -- --runInBand`
- `npm run build`

The workflow lives in [./../.github/workflows/ci-content-validation.yml](./../.github/workflows/ci-content-validation.yml).

## What `validate:content` checks

- Required frontmatter fields for posts and projects
- Valid `draft|published` status values
- Normalized `YYYY-MM-DD` dates
- Unique IDs and slugs per content type
- Local image/assets referenced from frontmatter exist under `public/`
- Internal content links resolve to known routes or existing assets
- Important external hosts resolve successfully in CI

## Important external hosts

Live external checks only run for hosts listed in `CONTENT_VALIDATION_EXTERNAL_HOSTS`.

Default CI coverage includes:

- `developer.mozilla.org`
- `github.com`
- `linkedin.com`
- `www.linkedin.com`

This keeps CI reliable while still verifying the most important external references. Add more hosts when production content depends on them.

## Local usage

Run the same guard locally before opening a PR:

- `npm run validate:content`
- `npm run ci`