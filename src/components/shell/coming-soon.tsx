import { Hammer } from "lucide-react";
import { EmptyState } from "@/components/ui/empty-state";

/** Placeholder for staff pages that are not built yet. Plain, production-safe wording. */
export function ComingSoon({ title }: { title: string }) {
  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-[28px] leading-tight font-extrabold tracking-[-0.02em] text-ink-900">
        {title}
      </h1>
      <div className="rounded-2xl border border-border bg-sand-50">
        <EmptyState
          icon={<Hammer aria-hidden="true" />}
          title="Coming soon"
          description="This part of Amanah is on its way."
        />
      </div>
    </div>
  );
}
