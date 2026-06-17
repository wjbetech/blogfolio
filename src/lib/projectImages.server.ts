import fs from "fs";
import path from "path";

import { sortProjectImages } from "@/lib/projectImages";

export function getExistingProjectImages(images?: string[]): string[] {
  const existing: string[] = [];

  for (const img of images ?? []) {
    if (!img) continue;

    const rel = img.startsWith("/") ? img.slice(1) : img;
    const abs = path.join(process.cwd(), "public", rel);

    try {
      if (fs.existsSync(abs)) {
        existing.push(img.startsWith("/") ? img : `/${img}`);
      }
    } catch {
      // skip unreadable paths
    }
  }

  return sortProjectImages(existing);
}
