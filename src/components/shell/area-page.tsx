import { notFound } from "next/navigation";
import type { UserRole } from "@/lib/api/schemas";
import { ComingSoon } from "./coming-soon";
import { areaByRole } from "./nav-config";

/** All valid URLs of an area, for generateStaticParams (unknown paths 404 at routing time). */
export function areaStaticParams(role: UserRole): { slug: string[] }[] {
  const area = areaByRole[role];
  return area.nav.map((item) => ({
    slug: item.href.slice(area.home.length).split("/").filter(Boolean),
  }));
}

/** Resolves a staff-area URL to its nav item; unknown paths are a 404. */
export async function AreaPage({
  role,
  params,
}: {
  role: UserRole;
  params: Promise<{ slug?: string[] }>;
}) {
  const { slug } = await params;
  const area = areaByRole[role];
  const path = [area.home, ...(slug ?? [])].join("/");
  const item = area.nav.find((i) => i.href === path);
  if (!item) notFound();
  return <ComingSoon title={item.label} />;
}
