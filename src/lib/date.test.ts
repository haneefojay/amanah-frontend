import { describe, expect, it } from "vitest";
import { formatDate, formatMonth, formatShortDate } from "./date";

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
});
