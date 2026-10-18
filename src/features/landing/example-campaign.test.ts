import { describe, expect, it } from "vitest";
import {
  capDemo,
  capDemoRemaining,
  exampleBalanceHeld,
  exampleCampaign,
  exampleSpent,
  itemsTotal,
  spentAmount,
} from "./example-campaign";

describe("example campaign data", () => {
  it("follows the spec rule: item totals add up to the target", () => {
    expect(itemsTotal(exampleCampaign.items)).toBe(exampleCampaign.targetAmount);
  });

  it("never shows more raised than the target", () => {
    expect(exampleCampaign.raisedAmount).toBeLessThanOrEqual(exampleCampaign.targetAmount);
  });

  it("derives spent and balance held from purchased and delivered items", () => {
    expect(exampleSpent).toBe(42_000_000);
    expect(exampleBalanceHeld).toBe(8_000_000);
    expect(exampleSpent + exampleBalanceHeld).toBe(exampleCampaign.raisedAmount);
  });

  it("keeps every amount in integer kobo", () => {
    for (const item of exampleCampaign.items) expect(Number.isInteger(item.total)).toBe(true);
  });

  it("matches the demo script's cap scenario (spec §10, steps 3 to 5)", () => {
    expect(capDemoRemaining).toBe(20_000_000);
    expect(capDemo.donorBRequested).toBeGreaterThan(capDemoRemaining);
  });

  it("counts nothing as spent when no item has been bought", () => {
    expect(spentAmount([{ name: "x", total: 100, status: "NEEDED", note: "" }])).toBe(0);
  });
});
