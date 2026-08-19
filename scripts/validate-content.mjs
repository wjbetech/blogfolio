import fs from "node:fs";
import path from "node:path";

const rootDir = process.cwd();
const postsDir = path.join(rootDir, "content", "posts");
const projectsDir = path.join(rootDir, "content", "projects");
const publicDir = path.join(rootDir, "public");

const DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;
const STATUS_PATTERN = /^(draft|published)$/;
const ASSET_PATH_PATTERN = /\.(png|jpe?g|gif|svg|webp|avif|woff2?|ttf|otf|mp4|webm)$/i;
const markdownLinkPattern = /!?\[[^\]]*\]\(([^)\s]+)(?:\s+"[^"]*")?\)/g;

const LIVE_EXTERNAL_HOSTS = (
  process.env.CONTENT_VALIDATION_EXTERNAL_HOSTS ?? "developer.mozilla.org,github.com,linkedin.com,www.linkedin.com"
)
  .split(",")
  .map((host) => host.trim().toLowerCase())
  .filter(Boolean);

const dropDatePrefix = (value) => value.replace(/^\d{4}-\d{2}-\d{2}-/, "");

function parseInlineStringArray(value) {
  if (!value.startsWith("[") || !value.endsWith("]")) return null;

  try {
    const parsed = JSON.parse(value);
    if (Array.isArray(parsed) && parsed.every((item) => typeof item === "string")) {
      return parsed;
    }

    if (Array.isArray(parsed) && parsed.length === 0) {
      return [];
    }
  } catch {
    return null;
  }

  return null;
}

function parseFrontMatter(lines) {
  const data = {};

  for (let index = 0; index < lines.length; index += 1) {
    const line = lines[index];
    if (!line.trim()) continue;

    const colonIndex = line.indexOf(":");
    if (colonIndex === -1) continue;

    const key = line.slice(0, colonIndex).trim();
    const rawValue = line.slice(colonIndex + 1).trim();

    if (!rawValue) {
      const values = [];
      let next = index + 1;

      while (next < lines.length && lines[next].trim().startsWith("-")) {
        const item = lines[next]
          .trim()
          .slice(1)
          .trim()
          .replace(/^['"]|['"]$/g, "");
        if (item) values.push(item);
        next += 1;
      }

      data[key] = values;
      index = next - 1;
      continue;
    }

    const cleaned = rawValue.replace(/^['"]|['"]$/g, "");

    const inlineArray = parseInlineStringArray(cleaned);

    if (inlineArray !== null) {
      data[key] = inlineArray;
      continue;
    }

    if (cleaned === "true" || cleaned === "false") {
      data[key] = cleaned === "true";
      continue;
    }

    data[key] = cleaned;
  }

  return data;
}

function readDocument(filePath, kind) {
  const source = fs.readFileSync(filePath, "utf8");
  const lines = source.split(/\r?\n/);

  if (lines[0]?.trim() !== "---") {
    return {
      kind,
      filePath,
      fileName: path.basename(filePath),
      frontmatter: {},
      body: source,
      slug: dropDatePrefix(path.basename(filePath).replace(/\.[^.]+$/, ""))
    };
  }

  const closingIndex = lines.findIndex((line, index) => index > 0 && line.trim() === "---");
  const block = closingIndex === -1 ? [] : lines.slice(1, closingIndex);
  const frontmatter = parseFrontMatter(block);
  const body = closingIndex === -1 ? source : lines.slice(closingIndex + 1).join("\n");
  const slug = frontmatter.slug?.trim()
    ? dropDatePrefix(frontmatter.slug.trim())
    : dropDatePrefix(path.basename(filePath).replace(/\.[^.]+$/, ""));

  return {
    kind,
    filePath,
    fileName: path.basename(filePath),
    frontmatter,
    body,
    slug
  };
}

function listContentFiles(dirPath) {
  return fs
    .readdirSync(dirPath)
    .filter((file) => file.endsWith(".md") || file.endsWith(".mdx"))
    .map((file) => path.join(dirPath, file));
}

function normalizePathname(value) {
  if (!value) return "/";
  const [pathname] = value.split(/[?#]/);
  if (!pathname) return "/";
  return pathname.length > 1 ? pathname.replace(/\/$/, "") : pathname;
}

function isExternalUrl(value) {
  return value.startsWith("http://") || value.startsWith("https://");
}

function shouldLiveCheckExternal(hostname) {
  const normalized = hostname.toLowerCase();
  return LIVE_EXTERNAL_HOSTS.some((host) => normalized === host || normalized.endsWith(`.${host}`));
}

function extractMarkdownLinks(body) {
  const links = [];
  for (const match of body.matchAll(markdownLinkPattern)) {
    if (match[1]) links.push(match[1]);
  }
  return links;
}

async function fetchWithTimeout(url, options) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 10_000);

  try {
    return await fetch(url, {
      redirect: "follow",
      signal: controller.signal,
      headers: {
        "user-agent": "blogfolio-content-validator/1.0"
      },
      ...options
    });
  } finally {
    clearTimeout(timeoutId);
  }
}

async function validateExternalUrl(url) {
  try {
    const parsed = new URL(url);
    if (!shouldLiveCheckExternal(parsed.hostname)) {
      return null;
    }

    let response = await fetchWithTimeout(url, { method: "HEAD" });
    if (response.status === 405 || response.status === 501) {
      response = await fetchWithTimeout(url, { method: "GET" });
    }

    if (response.status >= 400) {
      return `responded with ${response.status}`;
    }

    return null;
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    return `failed to resolve (${message})`;
  }
}

function validateRequiredFields(documents, requiredFields, errors) {
  for (const document of documents) {
    for (const field of requiredFields) {
      const value = field === "slug" ? document.slug : document.frontmatter[field];
      if (value === undefined || value === null || value === "" || (Array.isArray(value) && value.length === 0)) {
        errors.push(`${document.kind}:${document.fileName} is missing required field \`${field}\`.`);
      }
    }
  }
}

function validateUniqueValues(documents, key, errors) {
  const values = documents
    .map((document) => (key === "slug" ? document.slug : document.frontmatter[key]))
    .filter(Boolean);
  if (new Set(values).size !== values.length) {
    errors.push(`Duplicate ${documents[0]?.kind ?? "content"} ${key} values detected.`);
  }
}

function validateDateFields(documents, errors) {
  for (const document of documents) {
    for (const field of ["publishedAt", "updatedAt"]) {
      const value = document.frontmatter[field];
      if (typeof value !== "string" || !DATE_PATTERN.test(value)) {
        errors.push(`${document.kind}:${document.fileName} has an invalid \`${field}\` date. Use YYYY-MM-DD.`);
      }
    }
  }
}

function validateStatusFields(documents, errors) {
  for (const document of documents) {
    const status = document.frontmatter.status;
    if (typeof status !== "string" || !STATUS_PATTERN.test(status)) {
      errors.push(`${document.kind}:${document.fileName} must set \`status\` to draft or published.`);
    }
  }
}

function validateLocalAsset(assetPath, sourceLabel, errors) {
  const normalized = assetPath.startsWith("/") ? assetPath.slice(1) : assetPath;
  const fullPath = path.join(publicDir, normalized);

  if (!fs.existsSync(fullPath)) {
    errors.push(`${sourceLabel} references missing local asset ${assetPath}.`);
  }
}

function validateImageArrays(documents, errors) {
  for (const document of documents) {
    const images = document.frontmatter.images;

    if (images === undefined) continue;

    if (!Array.isArray(images)) {
      errors.push(`${document.kind}:${document.fileName} must set \`images\` to an array of strings.`);
      continue;
    }

    const invalidEntries = images.filter((image) => typeof image !== "string" || image.trim().length === 0);

    if (invalidEntries.length > 0) {
      errors.push(`${document.kind}:${document.fileName} has invalid entries in \`images\`.`);
    }
  }
}

async function validateLinks(documents, knownRoutes, errors) {
  for (const document of documents) {
    const linkSources = [];

    for (const field of ["coverImage", "link", "repo"]) {
      const value = document.frontmatter[field];
      if (typeof value === "string" && value.trim()) {
        linkSources.push({ label: `${document.kind}:${document.fileName} frontmatter:${field}`, value: value.trim() });
      }
    }

    const images = document.frontmatter.images;
    if (Array.isArray(images)) {
      for (const image of images) {
        if (typeof image === "string" && image.trim()) {
          linkSources.push({ label: `${document.kind}:${document.fileName} frontmatter:images`, value: image.trim() });
        }
      }
    }

    for (const link of extractMarkdownLinks(document.body)) {
      linkSources.push({ label: `${document.kind}:${document.fileName} body link`, value: link.trim() });
    }

    for (const source of linkSources) {
      const value = source.value;
      if (!value || value.startsWith("mailto:") || value.startsWith("tel:") || value.startsWith("#")) {
        continue;
      }

      if (isExternalUrl(value)) {
        try {
          new URL(value);
        } catch {
          errors.push(`${source.label} contains an invalid external URL: ${value}`);
          continue;
        }

        const externalError = await validateExternalUrl(value);
        if (externalError) {
          errors.push(`${source.label} points to ${value} which ${externalError}.`);
        }
        continue;
      }

      if (value.startsWith("/")) {
        const normalized = normalizePathname(value);
        if (ASSET_PATH_PATTERN.test(normalized)) {
          validateLocalAsset(normalized, source.label, errors);
        } else if (!knownRoutes.has(normalized)) {
          errors.push(`${source.label} points to unknown internal route ${normalized}.`);
        }
        continue;
      }

      errors.push(`${source.label} uses unsupported relative link syntax: ${value}`);
    }
  }
}

async function main() {
  const postDocs = listContentFiles(postsDir).map((filePath) => readDocument(filePath, "post"));
  const projectDocs = listContentFiles(projectsDir).map((filePath) => readDocument(filePath, "project"));
  const errors = [];

  validateRequiredFields(
    postDocs,
    ["id", "title", "slug", "excerpt", "author", "tags", "featured", "publishedAt", "updatedAt", "status"],
    errors
  );
  validateRequiredFields(
    projectDocs,
    ["id", "title", "slug", "description", "tech", "link", "featured", "publishedAt", "updatedAt", "status"],
    errors
  );

  validateUniqueValues(postDocs, "id", errors);
  validateUniqueValues(postDocs, "slug", errors);
  validateUniqueValues(projectDocs, "id", errors);
  validateUniqueValues(projectDocs, "slug", errors);
  validateDateFields([...postDocs, ...projectDocs], errors);
  validateStatusFields([...postDocs, ...projectDocs], errors);
  validateImageArrays(postDocs, errors);
  validateImageArrays(projectDocs, errors);

  const knownRoutes = new Set([
    "/",
    "/blog",
    "/contact",
    "/dev",
    "/language-services",
    "/portfolio",
    "/sitemap.xml",
    ...postDocs.map((document) => `/blog/${document.slug}`),
    ...projectDocs.map((document) => `/dev/${document.slug}`)
  ]);

  await validateLinks([...postDocs, ...projectDocs], knownRoutes, errors);

  if (errors.length > 0) {
    console.error("Content validation failed:\n");
    for (const error of errors) {
      console.error(`- ${error}`);
    }
    process.exit(1);
  }

  console.log(`Validated ${postDocs.length} posts and ${projectDocs.length} projects successfully.`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
