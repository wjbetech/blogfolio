export function formatDate(
  value: string | Date,
  options: Intl.DateTimeFormatOptions = { year: "numeric", month: "long", day: "numeric" }
): string {
  let d: Date;
  if (typeof value === "string" && /^\d{4}-\d{2}-\d{2}$/.test(value)) {
    const [year, month, day] = value.split("-").map(Number);
    if (month >= 1 && month <= 12 && day >= 1 && day <= new Date(year, month, 0).getDate()) {
      d = new Date(year, month - 1, day);
    } else {
      d = new Date(value);
    }
  } else {
    d = typeof value === "string" ? new Date(value) : value;
  }
  return d.toLocaleDateString("en-US", options);
}

export function formatShortDate(value: string | Date): string {
  return formatDate(value, { year: "numeric", month: "short", day: "numeric" });
}

export function formatMonthDay(value: string | Date): string {
  return formatDate(value, { month: "long", day: "numeric" });
}
