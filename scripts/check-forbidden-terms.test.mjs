import { describe, expect, it } from "vitest";
import { findForbiddenLines } from "./check-forbidden-terms.mjs";

describe("forbidden terminology guard", () => {
  it("flags out-of-scope terms in any case", () => {
    expect(findForbiddenLines("ok\nPay your ZAKAT here\nfine\nwaqf fund")).toEqual([2, 4]);
  });
  it("ignores unrelated words", () => {
    expect(findForbiddenLines("General donations and sadaqah campaigns")).toEqual([]);
  });
});
