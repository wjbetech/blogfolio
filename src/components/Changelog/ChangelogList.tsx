"use client";

import { useEffect, useRef, useState } from "react";
import type { ChangelogEntry as EntryType } from "@/app/types/changelog";
import ChangelogEntry from "@/components/ChangelogEntry/ChangelogEntry";

export default function ChangelogList({ initial }: { initial: EntryType[] }) {
  const [entries, setEntries] = useState<EntryType[]>(initial ?? []);
  const [offset, setOffset] = useState(entries.length);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!sentinelRef.current) return;

    const obs = new IntersectionObserver(
      (items) => {
        for (const item of items) {
          if (item.isIntersecting && !loading && !done) {
            loadMore();
          }
        }
      },
      // Require the sentinel to be further down the page before triggering.
      // Negative bottom rootMargin delays intersection until the viewport
      // has scrolled past a portion of the page (i.e. push trigger down).
      { rootMargin: "0px", threshold: 0 }
    );

    obs.observe(sentinelRef.current);
    return () => obs.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sentinelRef.current, loading, done]);

  async function loadMore() {
    setLoading(true);
    try {
      const res = await fetch(`/api/changelog/entries?offset=${offset}&limit=5`);
      if (!res.ok) throw new Error("Failed to fetch");
      const data = await res.json();
      const next: EntryType[] = data.entries ?? [];
      if (next.length === 0) {
        setDone(true);
      } else {
        setEntries((s) => [...s, ...next]);
        setOffset((o) => o + next.length);
      }
    } catch (e) {
      console.error("Error loading more changelog entries", e);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <div className="space-y-6">
        {entries.map((entry, idx) => (
          <ChangelogEntry key={`${entry.date}-${idx}`} entry={entry} />
        ))}
      </div>

      <div className="mt-16 mb-20">
        <div ref={sentinelRef} className="h-px w-full" />
      </div>

      <div className="mt-6 text-center">
        {loading && <span className="text-paragraph">Loading more…</span>}
        {done && <span className="text-paragraph/50">End of changelog.</span>}
      </div>
    </div>
  );
}
