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

const dateTimeFormat = new Intl.DateTimeFormat("en-GB", {
  day: "numeric",
  month: "short",
  year: "numeric",
  hour: "numeric",
  minute: "2-digit",
  hour12: true,
  timeZone: "Africa/Lagos",
});
const timeFormat = new Intl.DateTimeFormat("en-GB", {
  hour: "numeric",
  minute: "2-digit",
  hour12: true,
  timeZone: "Africa/Lagos",
});

/** "14 Oct 2026, 4:42 pm", in Nigerian time (Africa/Lagos), for evidence and receipts. */
export function formatDateTime(iso: string): string {
  return dateTimeFormat.format(new Date(iso));
}

/** "4:42 pm", in Nigerian time. */
export function formatTime(date: Date | number): string {
  return timeFormat.format(date);
}
