/** The Amanah mark: an arch with a point of light (matches the PWA icon). */
const markTones = {
  /** Sand tile, green arch, gold light: for dark green or ink grounds. */
  light: { tile: "fill-sand-100", arch: "stroke-brand-900", dot: "fill-gold-500" },
  /** Green tile, gold arch, sand light: for the footer and light grounds. */
  dark: { tile: "fill-brand-900", arch: "stroke-gold-500", dot: "fill-sand-100" },
} as const;

export function AmanahMark({
  size = 40,
  tone = "light",
}: {
  size?: number;
  tone?: keyof typeof markTones;
}) {
  const t = markTones[tone];
  return (
    <svg width={size} height={size} viewBox="0 0 512 512" aria-hidden="true" focusable="false">
      <rect width="512" height="512" rx="112" className={t.tile} />
      <path
        d="M156 380V236c0-55 45-100 100-100s100 45 100 100v144"
        fill="none"
        className={t.arch}
        strokeWidth="40"
        strokeLinecap="round"
      />
      <circle cx="256" cy="300" r="36" className={t.dot} />
    </svg>
  );
}
