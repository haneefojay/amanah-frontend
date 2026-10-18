import { notFound } from "next/navigation";
import { CampaignPage } from "@/features/campaigns/campaign-page";
import { PublicShell } from "@/features/public/public-shell";
import { api, ApiError } from "@/lib/api/client";

/**
 * Public campaign page (F2.3). Always loads fresh data, because the amounts change as people give;
 * the page then keeps itself up to date in the browser (F3.7).
 */
export default async function CampaignRoute({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const campaign = await api
    .getCampaign(slug, { cache: "no-store" })
    .then((response) => response.data)
    .catch((error: unknown) => {
      if (error instanceof ApiError && error.status === 404) notFound();
      throw error;
    });
  return (
    <PublicShell>
      <CampaignPage campaign={campaign} />
    </PublicShell>
  );
}
