import type { Metadata } from "next";

/** Staff areas are private: never indexed by search engines. */
export const metadata: Metadata = { robots: { index: false, follow: false } };

export default function DashboardGroupLayout({ children }: { children: React.ReactNode }) {
  return children;
}
