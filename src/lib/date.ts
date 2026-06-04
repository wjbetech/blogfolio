export function formatDate(
  value: string | Date,
  options: Intl.DateTimeFormatOptions = { year: "numeric", month: "long", day: "numeric" }
): string {
  const d = typeof value === "string" ? new Date(value) : value;
  return d.toLocaleDateString("en-US", options);
}

export function formatShortDate(value: string | Date): string {
  return formatDate(value, { year: "numeric", month: "short", day: "numeric" });
}

export function formatMonthDay(value: string | Date): string {
  return formatDate(value, { month: "long", day: "numeric" });
}
