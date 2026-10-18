/**
 * Money helpers. All amounts are integers in kobo (₦1 = 100 kobo). Never use floats for money
 * (spec §9). Parsing works on strings so no floating-point maths ever touches an amount.
 */

export type Kobo = number;

const KOBO_PER_NAIRA = 100;

export function assertKobo(value: number): asserts value is Kobo {
  if (!Number.isSafeInteger(value) || value < 0) {
    throw new RangeError(`Invalid kobo amount: ${value}. Expected a non-negative safe integer.`);
  }
}

const wholeFormatter = new Intl.NumberFormat("en-NG", {
  style: "currency",
  currency: "NGN",
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});

const exactFormatter = new Intl.NumberFormat("en-NG", {
  style: "currency",
  currency: "NGN",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

/** Formats kobo as naira, e.g. 50_000_000 → "₦500,000" and 150_050 → "₦1,500.50". */
export function formatNaira(kobo: Kobo): string {
  assertKobo(kobo);
  const naira = Math.trunc(kobo / KOBO_PER_NAIRA);
  const remainder = kobo % KOBO_PER_NAIRA;
  if (remainder === 0) return wholeFormatter.format(naira);
  // Build the decimal from integer parts to avoid float rounding artefacts.
  return exactFormatter.format(Number(`${naira}.${String(remainder).padStart(2, "0")}`));
}

const NAIRA_INPUT = /^\s*₦?\s*(\d{1,3}(?:,\d{3})*|\d+)(?:\.(\d{1,2}))?\s*$/;

/**
 * Parses a naira amount typed by a user ("1,500", "₦1500.5") into kobo.
 * Returns null when the input is not a valid amount.
 */
export function parseNairaToKobo(input: string): Kobo | null {
  const match = NAIRA_INPUT.exec(input);
  if (!match) return null;
  const whole = match[1]!.replaceAll(",", "");
  const fraction = (match[2] ?? "").padEnd(2, "0");
  const kobo = Number(whole) * KOBO_PER_NAIRA + Number(fraction);
  return Number.isSafeInteger(kobo) ? kobo : null;
}

/** Progress as a whole-number percentage (0–100), clamped. */
export function progressPercent(raised: Kobo, target: Kobo): number {
  assertKobo(raised);
  assertKobo(target);
  if (target === 0) return 0;
  return Math.min(100, Math.floor((raised * 100) / target));
}
