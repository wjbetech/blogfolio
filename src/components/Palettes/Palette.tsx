"use client";

type Palette = {
  id: string;
  name: string;
  colors: string[]; // hex colors, first is base
};

function hexToRgb(hex: string) {
  const cleaned = hex.replace("#", "");
  const bigint = parseInt(
    cleaned.length === 3
      ? cleaned
          .split("")
          .map((c) => c + c)
          .join("")
      : cleaned,
    16
  );
  return { r: (bigint >> 16) & 255, g: (bigint >> 8) & 255, b: bigint & 255 };
}

function isDark(hex: string) {
  const { r, g, b } = hexToRgb(hex);
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance < 0.5;
}

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

  const dark = isDark(base);
  const textColor = dark ? "#ffffff" : "#0f172a";

  // visual sizing for the pill bars (matching reference image)
  const barWidth = 30;
  const barHeight = 110;
  const barSpacing = 24; // spacing between bar centers

  const totalWidth = barSpacing * (bars.length - 1) + barWidth;

  return (
    <button
      onClick={() => onSelect(palette.id)}
      aria-pressed={selected}
      className="w-55 shrink-0 rounded-2xl transition-all hover:shadow-lg flex flex-col p-4 gap-3"
      style={{
        backgroundColor: base,
        border: selected ? "2px solid rgba(99, 102, 241, 0.4)" : "1px solid rgba(0,0,0,0.08)",
        color: textColor
      }}>
      {/* layered pill bars */}
      <div
        className="relative mx-auto"
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

      <div className="text-center">
        <div className="text-sm font-semibold truncate mb-1" style={{ color: textColor }}>
          {palette.name}
        </div>
        <div
          className="text-xs truncate"
          style={{
            color: dark ? "rgba(255,255,255,0.75)" : "rgba(15,23,42,0.6)"
          }}>
          {base}
        </div>
      </div>

      {selected ? (
        <div
          className="text-xs font-medium px-2 py-1 rounded-md text-center"
          style={{ background: "rgba(0,0,0,0.08)", color: textColor }}>
          Active
        </div>
      ) : null}
    </button>
  );
}
