import { describe, expect, it } from "vitest";
import { fundingNote } from "./funding-note";

const base = { status: "LIVE" as const, targetAmount: 50_000_000 };

describe("fundingNote", () => {
  it("says how much is left to raise", () => {
    expect(fundingNote({ ...base, raisedAmount: 30_000_000, availableAmount: 20_000_000 })).toEqual(
      { text: "₦200,000 to go", tone: "neutral" },
    );
  });

  it("says nearly there from 90% of the target", () => {
    expect(fundingNote({ ...base, raisedAmount: 45_000_000, availableAmount: 5_000_000 })).toEqual({
      text: "Nearly there: ₦50,000 to go",
      tone: "nearly",
    });
  });

  it("uses the exact spec copy when the rest is held by pending payments", () => {
    expect(fundingNote({ ...base, raisedAmount: 40_000_000, availableAmount: 0 }).text).toBe(
      "Target nearly reached. Pending payments are being processed.",
    );
  });

  it("uses the exact spec copy for a funded campaign", () => {
    expect(
      fundingNote({ ...base, status: "FUNDED", raisedAmount: 50_000_000, availableAmount: 0 }),
    ).toEqual({ text: "Target reached. Donations closed.", tone: "closed" });
  });
});
