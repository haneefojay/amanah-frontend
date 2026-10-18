import { cn } from "@/lib/cn";
import { formatNaira, type Kobo } from "@/lib/money";

/**
 * Displays an amount of kobo as naira. Renders a <data> element whose machine-readable value is
 * the exact kobo integer, so tests and tools never parse formatted text.
 */
export function MoneyAmount({ kobo, className }: { kobo: Kobo; className?: string }) {
  return (
    <data value={kobo} className={cn("whitespace-nowrap", className)}>
      {formatNaira(kobo)}
    </data>
  );
}
