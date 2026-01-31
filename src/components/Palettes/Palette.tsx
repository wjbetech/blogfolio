"use client";

type Palette = {
  id: string;
  name: string;
  colors: string[]; // hex colors, first is base
};

export default function Palette({
  palette,
  onSelect,
  selected
}: {
  palette: Palette;
  onSelect: (id: string) => void;
  selected?: boolean;
}) {
  const base = palette.colors[0] ?? "#ffffff";
  const bars = palette.colors.slice(1, 6); // exactly 5 bars
  // pad with base color if needed
  while (bars.length < 5) bars.push(base);

  // visual sizing for the pill bars (matching reference image)
  const barWidth = 26;
  const barHeight = 88;
  const barSpacing = 20; // spacing between bar centers

  const totalWidth = barSpacing * (bars.length - 1) + barWidth;

  return (
    <div className="flex flex-col items-center gap-2 shrink-0">
      <button
        onClick={() => onSelect(palette.id)}
        aria-pressed={selected}
        className={
          "w-40 h-32 rounded-2xl transition-all hover:shadow-lg flex items-center justify-center shrink-0 border-[6px] border-transparent" +
          (selected
            ? "" // selected uses inline border style below
            : "border border-[rgba(0,0,0,0.08)] hover:border-[6px] hover:border-slate-200 cursor-pointer")
        }
        style={{
          backgroundColor: base,
          border: selected ? "6px solid teal" : undefined
        }}>
        {/* layered pill bars */}
        <div
          className="relative"
          style={{
            width: totalWidth,
            height: barHeight
          }}
          aria-hidden>
          {bars.map((c, i) => {
            const left = i * barSpacing;
            return (
              <span
                key={i}
                style={{
                  position: "absolute",
                  left: `${left}px`,
                  top: 0,
                  width: `${barWidth}px`,
                  height: `${barHeight}px`,
                  borderRadius: `${barWidth / 2}px`,
                  backgroundColor: c,
                  boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
                  zIndex: i + 1,
                  border: "1px solid rgba(255,255,255,0.1)"
                }}
              />
            );
          })}
        </div>
      </button>

      {/* Title below the palette box */}
      <div className="text-center text-sm font-semibold text-slate-900">{palette.name}</div>
    </div>
  );
}
