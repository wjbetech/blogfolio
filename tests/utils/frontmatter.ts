import fs from "fs";
import path from "path";

export type FrontMatter = Record<string, string | string[] | boolean>;

const dropDatePrefix = (value: string) => value.replace(/^[0-9]{4}-[0-9]{2}-[0-9]{2}-/, "");

export function deriveSlugFromFile(filePath: string, override?: string) {
  const candidate = override?.trim();
  if (candidate) {
    return dropDatePrefix(candidate);
  }

  const base = path.basename(filePath).replace(/\.[^.]+$/, "");
  return dropDatePrefix(base);
}

export function parseFrontMatter(lines: string[]): FrontMatter {
  const data: FrontMatter = {};

  for (let index = 0; index < lines.length; index += 1) {
    const line = lines[index];
    if (!line.trim()) continue;

    const colonIndex = line.indexOf(":");
    if (colonIndex === -1) continue;

    const key = line.slice(0, colonIndex).trim();
    const rawValue = line.slice(colonIndex + 1).trim();

    if (!rawValue) {
      const values: string[] = [];
      let next = index + 1;
      while (next < lines.length && lines[next].trim().startsWith("-")) {
        const item = lines[next].trim().slice(1).trim();
        const cleaned = item.replace(/^['"]|['"]$/g, "");
        if (cleaned) values.push(cleaned);
        next += 1;
      }
      data[key] = values;
      index = next - 1;
      continue;
    }

    const cleaned = rawValue.replace(/^['"]|['"]$/g, "");
    if (cleaned === "true" || cleaned === "false") {
      data[key] = cleaned === "true";
    } else {
      data[key] = cleaned;
    }
  }

  return data;
}

export function readFrontMatter(filePath: string): FrontMatter {
  const source = fs.readFileSync(filePath, "utf8");
  const lines = source.split(/\r?\n/);
  if (lines[0].trim() !== "---") return {};
  const closingIndex = lines.findIndex((line, index) => index > 0 && line.trim() === "---");
  if (closingIndex === -1) return {};
  const block = lines.slice(1, closingIndex);
  return parseFrontMatter(block);
}
