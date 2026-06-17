export function shouldShowLiveDemo(link?: string, repo?: string): boolean {
  const normalizedLink = link?.trim();
  if (!normalizedLink) return false;

  return normalizedLink !== repo?.trim();
}
