import { progressPercent, type Kobo } from "@/lib/money";

type ProgressBarProps = { value: Kobo; max: Kobo; label: string };

export function ProgressBar({ value, max, label }: ProgressBarProps) {
  const percent = progressPercent(value, max);
  return (
    <div className="space-y-1.5">
      <div className="flex justify-between text-sm">
        <span className="text-ink-600">{label}</span>
        <span className="font-semibold text-brand-900">{percent}%</span>
      </div>
      <div
        role="progressbar"
        aria-label={label}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={percent}
        className="h-2.5 overflow-hidden rounded-full bg-brand-100"
      >
        <div
          className="h-full rounded-full bg-brand-700 transition-[width]"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}
