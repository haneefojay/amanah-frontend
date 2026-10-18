import { describe, expect, it } from "vitest";
import { assertKobo, formatNaira, parseNairaToKobo, progressPercent } from "./money";

describe("formatNaira", () => {
  it("formats whole naira without decimals", () => {
    expect(formatNaira(50_000_000)).toBe("₦500,000");
  });
  it("shows kobo when present", () => {
    expect(formatNaira(150_050)).toBe("₦1,500.50");
    expect(formatNaira(1)).toBe("₦0.01");
  });
  it("rejects non-integer or negative amounts", () => {
    expect(() => formatNaira(10.5)).toThrow(RangeError);
    expect(() => formatNaira(-1)).toThrow(RangeError);
  });
});

describe("parseNairaToKobo", () => {
  it.each([
    ["1500", 150_000],
    ["1,500", 150_000],
    ["₦1,500.5", 150_050],
    ["  200000.05 ", 20_000_005],
    ["0.01", 1],
  ])("parses %s", (input, expected) => {
    expect(parseNairaToKobo(input)).toBe(expected);
  });

  it.each(["", "abc", "1.234", "-5", "1,50", "12e3"])("rejects %s", (input) => {
    expect(parseNairaToKobo(input)).toBeNull();
  });

  it("never introduces floating point error", () => {
    expect(parseNairaToKobo("0.29")).toBe(29);
    expect(parseNairaToKobo("1.15")).toBe(115);
  });
});

describe("progressPercent", () => {
  it("floors and clamps", () => {
    expect(progressPercent(30_000_000, 50_000_000)).toBe(60);
    expect(progressPercent(49_999_999, 50_000_000)).toBe(99);
    expect(progressPercent(60, 50)).toBe(100);
    expect(progressPercent(0, 0)).toBe(0);
  });
});

describe("assertKobo", () => {
  it("accepts safe non-negative integers", () => {
    expect(() => assertKobo(0)).not.toThrow();
    expect(() => assertKobo(Number.MAX_SAFE_INTEGER + 1)).toThrow();
  });
});
