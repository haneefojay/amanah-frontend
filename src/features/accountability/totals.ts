import { assertKobo, type Kobo, progressPercent } from "@/lib/money";

/** The money fields every accountability figure is derived from. */
export type TotalsInput = {
  targetAmount: Kobo;
  raisedAmount: Kobo;
  /** Published expenses. Optional so the funding panel can use it before expenses exist. */
  expenses?: readonly { amount: Kobo }[];
};

export type AccountabilityTotals = {
  target: Kobo;
  raised: Kobo;
  /** Remaining to raise = target − raised (never below zero). */
  remaining: Kobo;
  /** Spent = Σ expenses. */
  spent: Kobo;
  /** Balance held = raised − spent. */
  held: Kobo;
  /** Raised as a whole-number percentage of the target, 0–100. */
  progress: number;
  /** Spent as a whole-number percentage of raised, 0–100 (floored). */
  spentPercent: number;
  /** The rest of raised, so spent and held always add up to 100 when anything was raised. */
  heldPercent: number;
};

/**
 * Derived values on the accountability page (spec §6), in integer kobo only. The backend
 * guarantees expenses never exceed raised; if a response ever breaks that, this throws rather
 * than showing a negative balance.
 */
export function accountabilityTotals({
  targetAmount,
  raisedAmount,
  expenses = [],
}: TotalsInput): AccountabilityTotals {
  assertKobo(targetAmount);
  assertKobo(raisedAmount);
  let spent = 0;
  for (const expense of expenses) {
    assertKobo(expense.amount);
    spent += expense.amount;
  }
  if (spent > raisedAmount) {
    throw new RangeError(`Expenses (${spent}) exceed the amount raised (${raisedAmount}).`);
  }
  const spentPercent = progressPercent(spent, raisedAmount);
  return {
    target: targetAmount,
    raised: raisedAmount,
    remaining: Math.max(0, targetAmount - raisedAmount),
    spent,
    held: raisedAmount - spent,
    progress: progressPercent(raisedAmount, targetAmount),
    spentPercent,
    heldPercent: raisedAmount === 0 ? 0 : 100 - spentPercent,
  };
}
