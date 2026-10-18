import type { Kobo } from "@/lib/money";

/**
 * Static example campaign shown on the landing page (F2.6). It illustrates the product and is
 * always labelled "Example campaign". Amounts are integer kobo. Replace with live data in F2.1/F3.
 */

export type ExampleItemStatus = "DELIVERED" | "PURCHASED" | "NEEDED";

export type ExampleItem = {
  name: string;
  total: Kobo;
  status: ExampleItemStatus;
  /** One-line trail note shown in the hero ledger. */
  note: string;
};

/** The delivered item, referenced by the expense and evidence illustrations. */
export const riceItem: ExampleItem = {
  name: "Rice, 5 bags of 50 kg",
  total: 28_000_000,
  status: "DELIVERED",
  note: "Receipt logged. Delivery confirmed by witness.",
};

const exampleItems: readonly ExampleItem[] = [
  riceItem,
  {
    name: "Cooking oil, 4 × 25 L",
    total: 14_000_000,
    status: "PURCHASED",
    note: "Purchased. Awaiting witness.",
  },
  {
    name: "Dates and sugar, 40 packs",
    total: 8_000_000,
    status: "NEEDED",
    note: "Not yet purchased.",
  },
];

export const exampleCampaign = {
  title: "Ramadan food drive",
  organisation: "Verified mosque in Offa",
  targetAmount: 50_000_000,
  raisedAmount: 50_000_000,
  items: exampleItems,
} as const;

/** Spent = sum of items already bought (purchased or delivered). */
export function spentAmount(items: readonly ExampleItem[]): Kobo {
  return items.filter((i) => i.status !== "NEEDED").reduce((sum, i) => sum + i.total, 0);
}

export function itemsTotal(items: readonly ExampleItem[]): Kobo {
  return items.reduce((sum, i) => sum + i.total, 0);
}

export const exampleSpent = spentAmount(exampleCampaign.items);
export const exampleBalanceHeld = exampleCampaign.raisedAmount - exampleSpent;

/** The cap demonstration from the spec's demo script (§10, steps 3 to 5). */
export const capDemo = {
  target: 50_000_000,
  donorA: 30_000_000,
  donorBRequested: 30_000_000,
} as const;

export const capDemoRemaining = capDemo.target - capDemo.donorA;
