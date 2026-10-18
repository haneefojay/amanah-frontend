import { Skeleton } from "@/components/ui/skeleton";

/** Shown while a staff page loads (F1.5). */
export default function DashboardLoading() {
  return (
    <div className="mx-auto flex max-w-[1200px] flex-col gap-4 px-5 py-8 sm:px-8" aria-busy="true">
      <span className="sr-only" role="status">
        Loading
      </span>
      <Skeleton className="h-8 w-56" />
      <Skeleton className="h-4 w-80 max-w-full" />
      <Skeleton className="h-40 w-full rounded-2xl" />
    </div>
  );
}
