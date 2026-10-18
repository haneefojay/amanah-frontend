import { cn } from "@/lib/cn";

/** Page-width wrapper shared by every landing section: 1240px max, 20px gutters on phones. */
export function Container({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={cn("mx-auto w-full max-w-[1240px] px-5 sm:px-8 lg:px-10", className)}>
      {children}
    </div>
  );
}
