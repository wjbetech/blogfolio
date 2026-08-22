# Media

Blogfolio currently stores static media in the repository and serves it through Next.js. There is no external image CDN or media CMS.

## Repository locations

```text
public/images/assets/avatar.png
public/images/assets/placeholder.png
public/images/assets/projects/<project-slug>/...
```

The current blog content does not yet use post images. `docs/posts_audit.md` records that audit.

Use paths relative to the public root in frontmatter. Do not include `public/`:

```yaml
images:
  - /images/assets/projects/wordweb/1.default-style.png
```

## Post image behavior

For a post, the intended priority is:

```text
coverImage
→ images[0]
→ local placeholder or no-cover presentation
```

`src/lib/metadata.ts` and `src/lib/metadataHelper.ts` use the cover image, first article image, and local placeholder for metadata fallbacks. The blog detail page uses `CoverImage` for the hero presentation.

The article redesign may introduce richer figures, captions, inline images, and image layouts. Those are planned; do not assume they are currently implemented.

## Project image behavior

Project screenshots live under:

```text
public/images/assets/projects/<project-slug>/
```

The current conventions are:

- prefix screenshots with a number to define order, such as `1.home.png`
- use `getExistingProjectImages` to discard missing or unsafe local paths
- use `sortProjectImages` for numeric ordering
- prefer the image with order prefix `1.` for project-card imagery
- use the local placeholder when no valid image exists

The `/dev` project index and `/dev/[slug]` detail page use the project image slider/lightbox. The detail page can display a larger gallery; project cards use the primary image.

## Naming

Prefer lowercase kebab-case and a project or post-specific name. For ordered project screenshots:

```text
1.home.png
2.settings.png
3.mobile-view.png
```

Avoid spaces and ambiguous generic filenames.

## Validation

`pnpm run validate:content` checks local asset references from frontmatter and Markdown links. Project tests also check that referenced local project images exist.

When adding a local asset:

1. place it below `public/`
2. reference it with a root-relative path
3. run content validation
4. run the relevant tests and production build

`next.config.ts` currently has no allowed remote image patterns. Prefer local assets unless a deliberate future decision adds and documents an external image host.

## Current limitations

- Posts currently have no committed cover or inline images.
- There is no dedicated blog figure/caption component system.
- Image optimization and size discipline remain manual repository responsibilities.
- The content validator and Contentlayer schema should remain aligned when image fields evolve.
