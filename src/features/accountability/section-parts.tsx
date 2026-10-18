import type { ReactNode } from "react";

/** A subsection heading inside "Where the money went", with an optional note on the right. */
export function SectionHeading({
  id,
  children,
  aside,
}: {
  id: string;
  children: ReactNode;
  aside?: ReactNode;
}) {
  return (
    <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
      <h3
        id={id}
        className="text-2xl leading-tight font-extrabold tracking-[-0.03em] text-brand-950 min-[640px]:text-[28px]"
      >
        {children}
      </h3>
      {aside && <span className="text-sm text-ink-600 min-[640px]:text-[15px]">{aside}</span>}
    </div>
  );
}

/** What a subsection says before there is anything to show. */
export function EmptyNote({ children }: { children: ReactNode }) {
  return (
    <p className="rounded-[20px] border-[1.5px] border-dashed border-mist-300 px-5 py-5 text-[15px] leading-normal text-ink-600">
      {children}
    </p>
  );
}
