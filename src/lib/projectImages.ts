const ORDER_PREFIX_PATTERN = /^(\d+)\./;

export function getProjectImageOrderKey(imagePath: string): number | null {
  const fileName = imagePath.split("/").pop() ?? "";
  const match = fileName.match(ORDER_PREFIX_PATTERN);
  return match ? Number.parseInt(match[1], 10) : null;
}

export function sortProjectImages(images: readonly string[]): string[] {
  return [...images].sort((a, b) => {
    const aOrder = getProjectImageOrderKey(a);
    const bOrder = getProjectImageOrderKey(b);

    if (aOrder === null && bOrder === null) {
      return a.localeCompare(b);
    }

    if (aOrder === null) return 1;
    if (bOrder === null) return -1;
    if (aOrder !== bOrder) return aOrder - bOrder;

    return a.localeCompare(b);
  });
}

/** Prefer the screenshot prefixed with `1.` (e.g. `1.home.png`). */
export function getPrimaryProjectImage(images?: readonly string[]): string {
  const sorted = sortProjectImages(images ?? []);
  const lead = sorted.find((image) => getProjectImageOrderKey(image) === 1);
  return lead ?? sorted[0] ?? "";
}
