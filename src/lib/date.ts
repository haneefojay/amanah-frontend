const dateFormat = new Intl.DateTimeFormat("en-GB", {
  day: "numeric",
  month: "long",
  year: "numeric",
  timeZone: "Africa/Lagos",
});
const shortFormat = new Intl.DateTimeFormat("en-GB", {
  day: "numeric",
  month: "short",
  year: "numeric",
  timeZone: "Africa/Lagos",
});
const monthFormat = new Intl.DateTimeFormat("en-GB", {
  month: "long",
  year: "numeric",
  timeZone: "Africa/Lagos",
});

/** "10 October 2026", in Nigerian time so a date never shifts by timezone. */
export function formatDate(iso: string): string {
  return dateFormat.format(new Date(iso));
}

/** "2 Sep 2026". */
export function formatShortDate(iso: string): string {
  return shortFormat.format(new Date(iso));
}

/** "September 2026". */
export function formatMonth(iso: string): string {
  return monthFormat.format(new Date(iso));
}
