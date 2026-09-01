"use client";

import { useEffect, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";

type Props = {
  variants: string[];
  current: string;
  labels?: Record<string, string>;
};

export default function PrototypeSwitcher({ variants, current, labels }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const setVariant = useCallback(
    (v: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set("variant", v);
      router.replace(`?${params.toString()}`, { scroll: false });
    },
    [router, searchParams]
  );

  const cycle = useCallback(
    (dir: number) => {
      const idx = variants.indexOf(current);
      const next = (idx + dir + variants.length) % variants.length;
      setVariant(variants[next]);
    },
    [current, variants, setVariant]
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement)?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA" || (e.target as HTMLElement)?.isContentEditable) return;
      if (e.key === "ArrowLeft") cycle(-1);
      if (e.key === "ArrowRight") cycle(1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [cycle]);

  if (process.env.NODE_ENV === "production") return null;

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 rounded-full bg-slate-900 text-white shadow-xl border border-slate-700 px-2 py-2">
      <button
        aria-label="Previous variant"
        onClick={() => cycle(-1)}
        className="h-8 w-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
      >
        ‹
      </button>
      <span className="text-xs font-mono tracking-wide px-2">
        {current} {labels?.[current] ? `· ${labels[current]}` : ""}
      </span>
      <button
        aria-label="Next variant"
        onClick={() => cycle(1)}
        className="h-8 w-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
      >
        ›
      </button>
      <span className="hidden sm:inline text-[11px] text-white/40 ml-1">← → to switch · ?variant= in URL</span>
    </div>
  );
}
