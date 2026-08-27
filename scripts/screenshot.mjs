/**
 * Blogfolio — uniform project screenshots
 *
 * Captures each published project's live URL at a fixed viewport (1440×810 clip →
 * 1280×720 WebP) so ProjectImageSlider's `gallery` (900×440) and card
 * (`h-64 + object-cover`) stay uniform and low-memory (<200KB each).
 *
 * Usage:
 *   pnpm add -D playwright sharp
 *   npx playwright install chromium
 *
 *   # single project (uses frontmatter `link` by default):
 *   node scripts/screenshot.mjs --slug=wordweb
 *   node scripts/screenshot.mjs --slug=wordweb --url=https://wordweb-orcin.vercel.app
 *
 *   # all published projects with a `link` that looks like a live site:
 *   node scripts/screenshot.mjs --all
 *   node scripts/screenshot.mjs --all --force  # overwrite existing 1.home.webp
 *
 *   # dry run (no files written):
 *   node scripts/screenshot.mjs --all --dry-run
 *
 * Options:
 *   --slug=<project-slug>   single project
 *   --url=<https://…>        override URL for that slug
 *   --all                   all published projects
 *   --force                 overwrite existing output
 *   --dry-run              log without writing
 *   --width=1280           output width (height auto, keeps 16:9)
 *   --quality=78           webp quality 0-100
 *
 * Output:
 *   public/images/assets/projects/<slug>/1.home.webp  (also 2.* if you extend)
 *   Printed frontmatter snippet to paste into content/projects/<slug>.md
 *
 * Notes:
 *   - Live URLs are read from `content/projects/*.md` frontmatter `link:`.
 *     GitHub-only projects (e.g. wowcomps link = github.com) are skipped by default — pass --url to force.
 *   - Keep `next.config.ts` remotePatterns in sync if you switch to remote images; for local screenshots no config needed.
 *   - Run `pnpm run validate:content && pnpm run build` after replacing images.
 */

import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";

// — guards for optional deps (so `pnpm install` failure doesn't break `pnpm run build`) —
let chromium, sharp;
try {
  ({ chromium } = await import("playwright"));
} catch {
  console.error(
    "\n[ screenshot ] Playwright not found. Install:\n  pnpm add -D playwright\n  npx playwright install chromium\n"
  );
  process.exit(1);
}
try {
  const m = await import("sharp");
  sharp = m.default ?? m;
} catch {
  console.error(
    "\n[ screenshot ] sharp not found. Install:\n  pnpm add -D sharp\n"
  );
  process.exit(1);
}

const ROOT = process.cwd();
const PROJECTS_DIR = path.join(ROOT, "content", "projects");
const PUBLIC_BASE = path.join(ROOT, "public", "images", "assets", "projects");

const args = new Map(
  process.argv.slice(2).map((a) => {
    const [k, v] = a.split("=");
    return [k.replace(/^--/, ""), v ?? true];
  })
);

const WIDTH = parseInt(args.get("width") ?? "1280", 10);
const QUALITY = parseInt(args.get("quality") ?? "78", 10);
const FORCE = args.has("force");
const DRY_RUN = args.has("dry-run");
const SINGLE_SLUG = args.get("slug");
const SINGLE_URL = args.get("url");
const ALL = args.has("all");

if (!SINGLE_SLUG && !ALL) {
  console.error(
    "\nUsage:\n  node scripts/screenshot.mjs --slug=wordweb [--url=https://…]\n  node scripts/screenshot.mjs --all [--force] [--dry-run]\n\n--help for details.\n"
  );
  process.exit(1);
}

const VIEWPORT = { width: 1440, height: 900 };
const CLIP = { x: 0, y: 0, width: 1440, height: 810 }; // 16:9 — uniform shape for all projects

function parseFrontmatter(filePath) {
  const raw = fs.readFileSync(filePath, "utf8");
  const m = raw.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!m) return {};
  const block = m[1];
  const data = {};
  for (const line of block.split("\n")) {
    const idx = line.indexOf(":");
    if (idx === -1) continue;
    const k = line.slice(0, idx).trim();
    const v = line.slice(idx + 1).trim().replace(/^['"]|['"]$/g, "");
    if (k) data[k] = v;
  }
  return data;
}

function isLiveUrl(url) {
  if (!url) return false;
  try {
    const u = new URL(url);
    // skip bare github repo pages by default — they are not app screenshots
    if (u.hostname === "github.com") return false;
    return u.protocol === "https:" || u.protocol === "http:";
  } catch {
    return false;
  }
}

function slugFromFile(fileName) {
  return fileName.replace(/^\d{4}-\d{2}-\d{2}-/, "").replace(/\.md$/, "");
}

let targets = [];

if (SINGLE_SLUG) {
  const url = SINGLE_URL ?? null;
  // if no --url, try to read from frontmatter
  let frontmatterUrl = null;
  const candidate = fs
    .readdirSync(PROJECTS_DIR)
    .find((f) => slugFromFile(f) === SINGLE_SLUG);
  if (candidate) {
    const fm = parseFrontmatter(path.join(PROJECTS_DIR, candidate));
    frontmatterUrl = fm.link ?? null;
  }
  const finalUrl = url ?? frontmatterUrl;
  if (!finalUrl) {
    console.error(`[ screenshot ] No URL for slug "${SINGLE_SLUG}". Pass --url=https://…`);
    process.exit(1);
  }
  targets.push({ slug: SINGLE_SLUG, url: finalUrl });
} else if (ALL) {
  const files = fs
    .readdirSync(PROJECTS_DIR)
    .filter((f) => f.endsWith(".md"));
  for (const f of files) {
    const fm = parseFrontmatter(path.join(PROJECTS_DIR, f));
    if (fm.status && fm.status !== "published") continue; // skip drafts (e.g. orbit)
    const slug = slugFromFile(f);
    const url = fm.link;
    if (!isLiveUrl(url)) {
      console.log(`[ screenshot ] skip ${slug} — no live link (link: ${url || "missing"}) — pass --slug=${slug} --url=https://… to force`);
      continue;
    }
    targets.push({ slug, url });
  }
}

if (targets.length === 0) {
  console.error("[ screenshot ] No targets. Use --slug or --all (with published links).");
  process.exit(1);
}

console.log(`[ screenshot ] ${targets.length} target(s) → ${WIDTH}px WebP q=${QUALITY} (viewport ${VIEWPORT.width}x${VIEWPORT.height}, clip ${CLIP.width}x${CLIP.height})`);
if (DRY_RUN) console.log("[ screenshot ] DRY RUN — no files will be written");

const browser = await chromium.launch();
const context = await browser.newContext({ viewport: VIEWPORT, deviceScaleFactor: 2 });
let failures = 0;

for (const { slug, url } of targets) {
  const outDir = path.join(PUBLIC_BASE, slug);
  const outFile = path.join(outDir, "1.home.webp");
  if (fs.existsSync(outFile) && !FORCE && !DRY_RUN) {
    console.log(`[ screenshot ] ⏭  ${slug} exists (${outFile}) — use --force to overwrite`);
    continue;
  }

  console.log(`[ screenshot ] → ${slug}  ${url}`);
  const page = await context.newPage();
  try {
    await page.goto(url, { waitUntil: "networkidle", timeout: 30_000 });
    await page.waitForTimeout(1500);

    // hide common annoyances for a clean, uniform capture
    await page.evaluate(() => {
      // remove cookie banners / intercom / chat widgets (best-effort, no-op if missing)
      const selectors = [
        '[id*="cookie"]', '[class*="cookie"]', '[aria-label*="cookie"]',
        '#intercom-container', '[id*="intercom"]', '[class*="intercom"]',
        '[id*="chat-widget"]', '.crisp-client', '#crisp-chatbox',
      ];
      for (const s of selectors) document.querySelectorAll(s).forEach((el) => el.remove());
      // hide cursor for consistency
      const style = document.createElement('style');
      style.textContent = '*{cursor:none !important}';
      document.head.appendChild(style);
    });

    const png = await page.screenshot({ clip: CLIP, type: "png" });

    if (DRY_RUN) {
      console.log(`[ screenshot ]   (dry) would write ${outFile} (${png.length} bytes PNG → ~${Math.round((png.length * 0.15)/1024)}KB WebP est.)`);
      await page.close();
      continue;
    }

    fs.mkdirSync(outDir, { recursive: true });
    // PNG (2×) → resize to WIDTH → WebP q78 = crisp at 900×440 gallery, <200KB, low memory
    const beforeKb = Math.round(png.length / 1024);
    const webpBuf = await sharp(png)
      .resize({ width: WIDTH })
      .webp({ quality: QUALITY, effort: 6 })
      .toBuffer();
    fs.writeFileSync(outFile, webpBuf);
    const afterKb = Math.round(webpBuf.length / 1024);
    console.log(`[ screenshot ] ✓  ${slug}  ${beforeKb}KB PNG → ${afterKb}KB WebP  → ${path.relative(ROOT, outFile)}`);

    // also print frontmatter snippet so docs/media.md convention is easy to follow
    const rel = `/images/assets/projects/${slug}/1.home.webp`;
    console.log(`      frontmatter: images:\n        - ${rel}`);
  } catch (e) {
    failures++;
    console.error(`[ screenshot ] ✗  ${slug} failed: ${e.message}`);
  } finally {
    await page.close().catch(() => {});
  }
}

await browser.close();

if (failures > 0) {
  console.error(`\n[ screenshot ] Done with ${failures} failure(s). Check URLs are publicly reachable (or run with --url for localhost:3000 tunnels).`);
  process.exit(1);
}

console.log(`\n[ screenshot ] Done. Next steps:\n  1. Update content/projects/<slug>.md frontmatter images to point at the new .webp (see snippets above)\n  2. pnpm run validate:content\n  3. pnpm run build  (or pnpm dev to preview slider at 900×440 / card h-64)\n`);
