import { describe, expect, it } from "vitest";
import { formatDate, formatDateTime, formatMonth, formatShortDate, formatTime } from "./date";

describe("date formatting", () => {
  it("writes the full date in Nigerian time", () => {
    expect(formatDate("2026-10-10T09:00:00.000Z")).toBe("10 October 2026");
    // 23:30 UTC is already the next day in Lagos (UTC+1).
    expect(formatDate("2026-10-09T23:30:00.000Z")).toBe("10 October 2026");
  });

  it("writes a short date", () => {
    expect(formatShortDate("2026-09-04T10:00:00.000Z")).toBe("4 Sept 2026");
  });

  it("writes the month and year", () => {
    expect(formatMonth("2026-09-04T10:00:00.000Z")).toBe("September 2026");
  });

  it("writes a date and time in Nigerian time, for evidence and receipts (F3.3, F3.4)", () => {
    expect(formatDateTime("2026-10-14T15:42:00Z")).toBe("14 Oct 2026, 4:42 pm");
    // 23:05 UTC is 12:05 am the next day in Lagos.
    expect(formatDateTime("2026-10-14T23:05:00Z")).toBe("15 Oct 2026, 12:05 am");
  });

  it("writes a time in Nigerian time", () => {
    expect(formatTime(Date.parse("2026-10-14T15:12:00Z"))).toBe("4:12 pm");
  });
});
