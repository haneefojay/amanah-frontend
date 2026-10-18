import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { UiShowcase } from "./showcase";

export const metadata: Metadata = { title: "UI components", robots: { index: false } };

/** Component showcase for development (F1.2). Not available in production builds. */
export default function UiShowcasePage() {
  if (process.env.NODE_ENV === "production") notFound();
  return <UiShowcase />;
}
