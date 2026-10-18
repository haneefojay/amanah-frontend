"use client";

import { useCallback, useState } from "react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/cn";
import { formatNaira, parseNairaToKobo, type Kobo } from "@/lib/money";

export type NairaInputState = {
  /** What the user typed. */
  text: string;
  /** Parsed integer kobo, or null when empty or invalid. */
  kobo: Kobo | null;
  /** Validation message, or null. */
  error: string | null;
};

/** Validation shared by the hook and forms: empty, malformed, zero and over-maximum amounts. */
export function validateNairaText(text: string, maxKobo?: Kobo): NairaInputState {
  if (text.trim() === "") return { text, kobo: null, error: null };
  const kobo = parseNairaToKobo(text);
  if (kobo === null) return { text, kobo: null, error: "Enter an amount in naira, like 5,000." };
  if (kobo === 0) return { text, kobo, error: "Enter an amount greater than ₦0." };
  if (maxKobo !== undefined && kobo > maxKobo) {
    return { text, kobo, error: `The most you can enter is ${formatNaira(maxKobo)}.` };
  }
  return { text, kobo, error: null };
}

/** State helper for a naira amount field. Money stays integer kobo (src/lib/money.ts). */
export function useNairaInput(maxKobo?: Kobo, initial = "") {
  const [state, setState] = useState<NairaInputState>(() => validateNairaText(initial, maxKobo));
  const setText = useCallback(
    (text: string) => setState(validateNairaText(text, maxKobo)),
    [maxKobo],
  );
  return { ...state, setText };
}

type NairaInputProps = Omit<
  React.ComponentProps<typeof Input>,
  "type" | "inputMode" | "onChange" | "value"
> & {
  value: string;
  onValueChange: (text: string) => void;
};

/**
 * Text field for naira amounts with a ₦ prefix. Uses a text input with a decimal keyboard
 * (never type="number", which mishandles commas and locales). Pair with useNairaInput.
 */
export function NairaInput({ value, onValueChange, className, ...props }: NairaInputProps) {
  return (
    <div className="relative">
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-3.5 flex items-center text-base font-semibold text-ink-600"
      >
        ₦
      </span>
      <Input
        type="text"
        inputMode="decimal"
        autoComplete="off"
        value={value}
        onChange={(e) => onValueChange(e.target.value)}
        className={cn("pl-8 tabular-nums", className)}
        {...props}
      />
    </div>
  );
}
