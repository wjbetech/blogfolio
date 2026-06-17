import fs from "fs";
import path from "path";

import { sortProjectImages } from "@/lib/projectImages";

export function getExistingProjectImages(images?: string[]): string[] {
  const existing: string[] = [];
  const publicDir = path.resolve(process.cwd(), "public");

  for (const img of images ?? []) {
    if (!img) continue;

    const rel = img.replace(/^\/+/, "");
    const abs = path.resolve(publicDir, rel);
    const insidePublic = abs === publicDir || abs.startsWith(`${publicDir}${path.sep}`);

    if (!insidePublic) continue;

    try {
      if (fs.existsSync(abs)) {
        existing.push(`/${rel.replace(/\\/g, "/")}`);
      }
    } catch {
      // skip unreadable paths
    }
  }

  return sortProjectImages(existing);
}
