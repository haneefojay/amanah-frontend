import { Skeleton } from "@/components/ui/skeleton";
import { Container } from "@/features/landing/container";
import { PublicShell } from "@/features/public/public-shell";

export default function CampaignsLoading() {
  return (
    <PublicShell>
      <Container className="flex flex-col gap-4 pt-[clamp(40px,5vw,72px)] pb-7">
        <Skeleton className="h-9 w-64 rounded-full" />
        <h1 className="text-[clamp(44px,5vw,72px)] leading-none font-extrabold tracking-[-0.045em] text-brand-950">
          Campaigns
        </h1>
        <Skeleton className="h-12 w-full max-w-[52ch]" />
      </Container>
      <Container className="pb-24">
        <p className="sr-only" role="status">
          Loading campaigns
        </p>
        <ul
          aria-hidden="true"
          className="grid list-none grid-cols-1 gap-5 p-0 min-[640px]:grid-cols-2 min-[980px]:grid-cols-3"
        >
          {[0, 1, 2].map((n) => (
            <li key={n}>
              <Skeleton className="h-[430px] rounded-3xl" />
            </li>
          ))}
        </ul>
      </Container>
    </PublicShell>
  );
}
