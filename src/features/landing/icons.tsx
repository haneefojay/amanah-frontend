import type { SVGProps } from "react";

/** Decorative stroke icons for the landing page. All are aria-hidden; meaning lives in text. */
type IconProps = SVGProps<SVGSVGElement> & { size?: number };

function Icon({ size = 20, children, ...props }: IconProps & { children: React.ReactNode }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      {children}
    </svg>
  );
}

export const CheckIcon = (p: IconProps) => (
  <Icon {...p}>
    <path d="M5 12l5 5 9-10" />
  </Icon>
);
export const LockIcon = (p: IconProps) => (
  <Icon {...p}>
    <rect x="4" y="11" width="16" height="10" rx="2" />
    <path d="M8 11V7a4 4 0 0 1 8 0v4" />
  </Icon>
);
export const VerifiedIcon = (p: IconProps) => (
  <Icon {...p}>
    <path d="M12 2l3 3h4v4l3 3-3 3v4h-4l-3 3-3-3H5v-4l-3-3 3-3V5h4z" />
    <path d="M8.5 12l2.5 2.5 4.5-5" />
  </Icon>
);
export const AlertIcon = (p: IconProps) => (
  <Icon {...p}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 8v5" />
    <path d="M12 16.5v.01" />
  </Icon>
);
export const MenuIcon = (p: IconProps) => (
  <Icon {...p}>
    <path d="M4 7h16" />
    <path d="M4 12h16" />
    <path d="M4 17h16" />
  </Icon>
);
export const CloseIcon = (p: IconProps) => (
  <Icon {...p}>
    <path d="M6 6l12 12" />
    <path d="M18 6L6 18" />
  </Icon>
);
export const HeartIcon = (p: IconProps) => (
  <Icon {...p}>
    <path d="M12 21s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 11c0 5.6-7 10-7 10z" />
  </Icon>
);
export const HouseIcon = (p: IconProps) => (
  <Icon {...p}>
    <path d="M4 21V10l8-6 8 6v11" />
    <path d="M9 21v-6h6v6" />
  </Icon>
);
export const EyeIcon = (p: IconProps) => (
  <Icon {...p}>
    <path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12z" />
    <circle cx="12" cy="12" r="3" />
  </Icon>
);
export const ShieldIcon = (p: IconProps) => (
  <Icon {...p}>
    <path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z" />
  </Icon>
);
export const PhoneIcon = (p: IconProps) => (
  <Icon {...p}>
    <rect x="6" y="2" width="12" height="20" rx="3" />
    <path d="M11 18h2" />
  </Icon>
);

const markTones = {
  /** Sand tile, green arch, gold light: for dark green or ink grounds. */
  light: { tile: "fill-sand-100", arch: "stroke-brand-900", dot: "fill-gold-500" },
  /** Green tile, gold arch, sand light: for the footer and light grounds. */
  dark: { tile: "fill-brand-900", arch: "stroke-gold-500", dot: "fill-sand-100" },
} as const;

/** The Amanah mark: an arch with a point of light (matches the PWA icon). */
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
