export const sectionIds = {
  how: "how",
  cap: "cap",
  trail: "trail",
  organisations: "organisations",
} as const;

export const navLinks = [
  { href: `#${sectionIds.how}`, label: "How it works" },
  { href: `#${sectionIds.trail}`, label: "Accountability" },
  { href: `#${sectionIds.cap}`, label: "The cap" },
  { href: `#${sectionIds.organisations}`, label: "For organisations" },
] as const;
