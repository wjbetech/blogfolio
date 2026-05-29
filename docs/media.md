# Media

How images are stored, named, referenced in frontmatter, and resolved at render time.

---

## Storage location

All images are committed to the repository and served as Next.js static assets:

```
public/
  images/
    posts/        cover images and inline images for blog posts
    projects/     screenshots and previews for portfolio projects
    wjbe.png      site author photo (used in hero / about sections)
```

There is no external image CDN. Images are part of the repository and deploy with the app.

---

## Frontmatter fields

Both `Post` and `Project` content types support two image fields:

| Field        | Type       | Required | Used for                                  |
| ------------ | ---------- | -------- | ----------------------------------------- |
| `coverImage` | `string`   | No       | Primary image for a post (OG, hero, card) |
| `images`     | `string[]` | No       | Ordered array of additional images        |

### Resolution priority

The app resolves which image to display using this waterfall:

```
coverImage (if non-empty)
  → images[0] (if array is non-empty)
    → fallback
```

This applies in:

- `blog/[slug]/page.tsx` -- hero image via `CoverImage` component
- `BlogPostCard.tsx` -- card thumbnail
- `TopBlog.tsx` -- featured post image
- `dev/page.tsx` -- project card image (with filesystem existence check)
- `ProjectPostCard.tsx` -- project card thumbnail
- `metadata.ts` / `metadataHelper.ts` -- OG image + JSON-LD image

### Current fallback

The default fallback is currently an external URL (a placeholder image hosted on a third-party site). **This should be replaced with a local fallback image** (`/images/fallback.png`) as part of Phase B cleanup, so the site has no runtime dependency on external image hosts.

---

## Naming conventions

Use lowercase kebab-case. Prefix with the post or project slug for easy tracing:

```
/images/posts/my-post-title-cover.png
/images/posts/my-post-title-diagram.png
/images/projects/project-slug-screenshot-1.png
/images/projects/project-slug-screenshot-2.png
```

Avoid spaces, uppercase, and special characters in filenames.

---

## Referencing images in frontmatter

Use root-relative paths (starting with `/`). Do not include `public/` in the path -- Next.js serves `public/` at the root automatically.

```yaml
# Blog post
coverImage: /images/posts/my-post-title-cover.png
images:
  - /images/posts/my-post-title-diagram.png
  - /images/posts/my-post-title-screenshot.png

# Project
images:
  - /images/projects/project-slug-screenshot-1.png
  - /images/projects/project-slug-screenshot-2.png
```

---

## Validation

The content validation script (`npm run validate:content`) and the Jest test suite both check that any image path beginning with `/` actually exists on disk under `public/`.

If you add a frontmatter image path and forget to commit the file, the CI build will catch it via the `ci-content-validation` GitHub Actions workflow.

---

## next.config.ts remotePatterns

If you ever reference an image from an external hostname with `next/image`, that hostname must be added to the `remotePatterns` list in `next.config.ts`. Currently allowed:

- `avatars.dicebear.com`
- `developer.mozilla.org`
- `openlab.citytech.cuny.edu` ← fallback placeholder; remove once local fallback exists

For fully self-hosted images, no remote patterns are needed.

---

## Recommended image formats and sizes

| Use case           | Format           | Recommended size      |
| ------------------ | ---------------- | --------------------- |
| Cover / OG image   | `.png` or `.jpg` | 1200 × 630 px         |
| Project screenshot | `.png`           | 1200 × 800 px         |
| Author photo       | `.png`           | 400 × 400 px (square) |
| Inline post image  | `.png` or `.jpg` | max 1200 px wide      |

Optimise images before committing (tools: Squoosh, ImageMagick, `sharp` CLI). Next.js will handle responsive resizing at request time via its built-in image optimiser.
