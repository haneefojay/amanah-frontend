import { cn } from "@/lib/cn";
import { progressPercent, type Kobo } from "@/lib/money";

type ProgressBarProps = {
  value: Kobo;
  max: Kobo;
  /** Accessible name. Shown above the bar with the percentage unless `showLabel` is false. */
  label: string;
  showLabel?: boolean;
  trackClassName?: string;
  barClassName?: string;
};

export function ProgressBar({
  value,
  max,
  label,
  showLabel = true,
  trackClassName,
  barClassName,
}: ProgressBarProps) {
  const percent = progressPercent(value, max);
  return (
    <div className="space-y-1.5">
      {showLabel && (
        <div className="flex justify-between text-sm">
          <span className="text-ink-600">{label}</span>
          <span className="font-semibold text-brand-900">{percent}%</span>
        </div>
      )}
      <div
        role="progressbar"
        aria-label={label}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={percent}
        className={cn("h-2.5 overflow-hidden rounded-full bg-brand-100", trackClassName)}
      >
        <div
          className={cn("h-full rounded-full bg-brand-700 transition-[width]", barClassName)}
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}
