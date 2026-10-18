import { Skeleton } from "@/components/ui/skeleton";
import { Container } from "@/features/landing/container";
import { PublicShell } from "@/features/public/public-shell";

export default function OrganisationLoading() {
  return (
    <PublicShell>
      <Container className="flex flex-col gap-6 pt-6 pb-24">
        <p className="sr-only" role="status">
          Loading organisation
        </p>
        <div aria-hidden="true" className="grid gap-6 min-[980px]:grid-cols-[1.4fr_1fr]">
          <Skeleton className="h-72 rounded-3xl" />
          <Skeleton className="h-72 rounded-3xl" />
        </div>
      </Container>
    </PublicShell>
  );
}
