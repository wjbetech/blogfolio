type Bucket = number[];

const buckets = new Map<string, Bucket>();

export function isRateLimited(key: string, limit: number, windowMs: number, now: number = Date.now()): boolean {
  for (const [entry, timestamps] of buckets) {
    if (!timestamps.some((timestamp) => now - timestamp < windowMs)) buckets.delete(entry);
  }
  if (!buckets.has(key) && buckets.size >= 10000) return true;
  const fresh = (buckets.get(key) ?? []).filter((timestamp) => now - timestamp < windowMs);

  if (fresh.length >= limit) {
    buckets.set(key, fresh);
    return true;
  }

  fresh.push(now);
  buckets.set(key, fresh);
  return false;
}

export function resetRateLimits(): void {
  buckets.clear();
}
