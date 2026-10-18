import { cn } from "@/lib/cn";

/** Page-width wrapper shared by every landing section: 1200px max, 20px gutters on phones. */
export function Container({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={cn("mx-auto w-full max-w-[1200px] px-5 sm:px-8", className)}>{children}</div>
  );
}
