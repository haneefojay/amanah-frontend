import { AreaPage, areaStaticParams } from "@/components/shell/area-page";

// Only the area's known sections exist; anything else is a 404 before rendering starts.
export const dynamicParams = false;

export function generateStaticParams() {
  return areaStaticParams("ORG_ADMIN");
}

export default function OrgAreaPage({ params }: { params: Promise<{ slug?: string[] }> }) {
  return <AreaPage role="ORG_ADMIN" params={params} />;
}
