import type { ReactNode } from "react";
import { Container } from "@/features/landing/container";
import type { CampaignDetail } from "@/lib/api/schemas";
import { EvidenceGallery } from "./evidence-gallery";
import { ExpensesList } from "./expenses-list";
import { SpentHeld } from "./spent-held";

/**
 * "Where the money went" (F3, spec §7): the full money trail of a campaign, in a full-width band
 * below its story. `status` is the live refresh indicator (F3.7).
 */
export function AccountabilitySection({
  campaign: c,
  status,
}: {
  campaign: CampaignDetail;
  status?: ReactNode;
}) {
  return (
    <section
      id="accountability"
      aria-labelledby="acc-title"
      className="border-t border-mist-200 bg-mist-50"
    >
      <Container className="flex flex-col gap-12 pt-12 pb-14 min-[640px]:pt-[88px] min-[640px]:pb-[104px]">
        <div className="flex flex-wrap items-end justify-between gap-5">
          <div className="flex max-w-[680px] flex-col gap-3">
            <span className="text-[13px] font-bold tracking-[0.08em] text-brand-900 uppercase min-[640px]:text-sm">
              Accountability
            </span>
            <h2
              id="acc-title"
              className="text-[34px] leading-[1.04] font-extrabold tracking-[-0.04em] text-brand-950 min-[640px]:text-5xl"
            >
              Where the money went
            </h2>
            <p className="text-base leading-normal text-ink-600 min-[640px]:text-lg">
              Every expense the organisation has made, with its receipt, photos from the ground, and
              what the independent witness confirmed.
            </p>
          </div>
          {status}
        </div>

        <SpentHeld campaign={c} />
        <ExpensesList expenses={c.expenses} items={c.items} />
        <EvidenceGallery evidence={c.evidence} items={c.items} expenses={c.expenses} />
      </Container>
    </section>
  );
}
