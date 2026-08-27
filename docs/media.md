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

The slider `gallery` variant is `900×440` centered (`max-h-[440px] max-w-[900px]`, letterboxed — not cropped) and the card is `h-64` with `object-cover` (cropped). Screenshots larger than `1280px` are wasted bandwidth.

### Project screenshot workflow — uniform, low-memory

**Target (keeps cards + lightbox uniform):**

- **Capture:** Playwright Chromium, viewport `1440×900`, `deviceScaleFactor:2`, clip `1440×810` (16:9) — no browser chrome, hide cookie/chat widgets
- **Export:** `1280×720` WebP `quality 78, effort 6` → **~120–180 KB** (vs ~1 MB PNG). Lightbox caps at `80vh/80vw`, gallery caps at `900×440`, so `1280` is retina-crisp with no downscale waste.
- **Budget:** each project < 800 KB total (e.g. 3× WebP). Prefer WebP over PNG/JPG; keep PNG only if lossless is required.

**Automated (preferred):**

```bash
pnpm add -D playwright sharp
npx playwright install chromium

# all published projects with a live `link:` in content/projects/*.md
node scripts/screenshot.mjs --all

# single project, override URL (useful for github-only links or localhost)
node scripts/screenshot.mjs --slug=wordweb
node scripts/screenshot.mjs --slug=wordweb --url=https://wordweb-orcin.vercel.app --force

# preview without writing
node scripts/screenshot.mjs --all --dry-run
```

The script reads `content/projects/*.md` `link:` fields, skips `draft` and bare `github.com` links, screenshots to `public/images/assets/projects/<slug>/1.home.webp`, prints the frontmatter snippet to paste, then run:

```bash
pnpm run validate:content
pnpm run build   # or pnpm dev to check slider at 900×440 / card h-64
```

**Manual fallback:** Chrome DevTools → Device Toolbar → `Responsive 1440×900` → hide cursor/cookie banner → `Capture screenshot` (clip `1440×810`) → `pnpm dlx sharp -i in.png -o 1.home.webp --quality 78 --effort 6` or Squoosh/TinyPNG.

See `scripts/screenshot.mjs` header for all flags (`--width`, `--quality`, `--force`, `--dry-run`).

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

`next.config.ts` allows `https://images.unsplash.com` and `https://search.pstatic.net` for *post* `images:` (via `remotePatterns` + CSP `img-src`). **Project screenshots remain local** — prefer `public/images/assets/projects/<slug>/` so the repo stays self-contained and `validate:content` can check them. Add a new remote host only deliberately and document it here and in `src/proxy.ts`.

## Current limitations

- There is no dedicated blog figure/caption component system for inline post figures.
- The content validator and Contentlayer schema should remain aligned when image fields evolve.
- Posts now use Unsplash/Pstatic covers via remotePatterns; project screenshots are still local WebP via `scripts/screenshot.mjs`.
