import { Skeleton } from "@/components/ui/skeleton";
import { Container } from "@/features/landing/container";
import { PublicShell } from "@/features/public/public-shell";

export default function CampaignLoading() {
  return (
    <PublicShell>
      <Container className="flex flex-col gap-6 pt-6 pb-24">
        <p className="sr-only" role="status">
          Loading campaign
        </p>
        <div aria-hidden="true" className="grid gap-8 min-[980px]:grid-cols-[1.2fr_1fr]">
          <Skeleton className="h-[320px] rounded-[28px]" />
          <div className="flex flex-col gap-5">
            <Skeleton className="h-8 w-40 rounded-full" />
            <Skeleton className="h-14 w-full" />
            <Skeleton className="h-64 rounded-[28px]" />
          </div>
        </div>
      </Container>
    </PublicShell>
  );
}
