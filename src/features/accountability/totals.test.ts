import { describe, expect, it } from "vitest";
import { accountabilityTotals } from "./totals";

describe("accountabilityTotals", () => {
  it("derives remaining, spent, held and progress in kobo (spec §6)", () => {
    const totals = accountabilityTotals({
      targetAmount: 50_000_000,
      raisedAmount: 30_000_000,
      expenses: [{ amount: 27_500_000 }, { amount: 500_000 }],
    });
    expect(totals).toEqual({
      target: 50_000_000,
      raised: 30_000_000,
      remaining: 20_000_000,
      spent: 28_000_000,
      held: 2_000_000,
      progress: 60,
      spentPercent: 93,
      heldPercent: 7,
    });
  });

  it.each([
    { label: "nothing raised", raised: 0, spent: [], expected: { spent: 0, held: 0, s: 0, h: 0 } },
    {
      label: "nothing spent",
      raised: 6_000_000,
      spent: [],
      expected: { spent: 0, held: 6_000_000, s: 0, h: 100 },
    },
    {
      label: "all spent",
      raised: 25_000_000,
      spent: [15_000_000, 10_000_000],
      expected: { spent: 25_000_000, held: 0, s: 100, h: 0 },
    },
  ])("handles $label", ({ raised, spent, expected }) => {
    const totals = accountabilityTotals({
      targetAmount: 25_000_000,
      raisedAmount: raised,
      expenses: spent.map((amount) => ({ amount })),
    });
    expect(totals.spent).toBe(expected.spent);
    expect(totals.held).toBe(expected.held);
    expect(totals.spentPercent).toBe(expected.s);
    expect(totals.heldPercent).toBe(expected.h);
    expect(totals.spent + totals.held).toBe(raised);
  });

  it("never reports a negative remaining amount", () => {
    expect(accountabilityTotals({ targetAmount: 100, raisedAmount: 100 }).remaining).toBe(0);
  });

  it("refuses expenses above the amount raised", () => {
    expect(() =>
      accountabilityTotals({ targetAmount: 100, raisedAmount: 50, expenses: [{ amount: 51 }] }),
    ).toThrow(RangeError);
  });

  it("refuses fractional or negative kobo", () => {
    expect(() =>
      accountabilityTotals({ targetAmount: 100, raisedAmount: 50, expenses: [{ amount: 1.5 }] }),
    ).toThrow(RangeError);
    expect(() => accountabilityTotals({ targetAmount: -1, raisedAmount: 0 })).toThrow(RangeError);
  });
});
