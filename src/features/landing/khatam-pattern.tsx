import { cn } from "@/lib/cn";

/**
 * The eight-point star (khatam) lattice, drawn in thin gold lines. Purely decorative. Used in two
 * places only, the hero arch and the organisations panel, so it stays special.
 * `id` must be unique on the page (it names the SVG pattern).
 */
export function KhatamPattern({ id, className }: { id: string; className?: string }) {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      className={cn("pointer-events-none absolute", className)}
      width="100%"
      height="100%"
    >
      <defs>
        <pattern id={id} width="72" height="72" patternUnits="userSpaceOnUse">
          <g fill="none" className="stroke-gold-500" strokeOpacity="0.3" strokeWidth="1.2">
            <rect x="16" y="16" width="40" height="40" />
            <rect x="16" y="16" width="40" height="40" transform="rotate(45 36 36)" />
            <path d="M0 36h8M64 36h8M36 0v8M36 64v8" />
          </g>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
    </svg>
  );
}
