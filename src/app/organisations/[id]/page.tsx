import { notFound } from "next/navigation";
import { OrganisationProfile } from "@/features/organisations/organisation-profile";
import { PublicShell } from "@/features/public/public-shell";
import { api, ApiError } from "@/lib/api/client";

/** Public organisation profile (F2.4). Only verified organisations exist here; others are 404. */
export default async function OrganisationRoute({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const organisation = await api
    .getOrganisation(id, { cache: "no-store" })
    .then((response) => response.data)
    .catch((error: unknown) => {
      if (error instanceof ApiError && error.status === 404) notFound();
      throw error;
    });
  return (
    <PublicShell>
      <OrganisationProfile organisation={organisation} />
    </PublicShell>
  );
}
