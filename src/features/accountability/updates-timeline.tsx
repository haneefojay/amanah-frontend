import Image from "next/image";
import type { CampaignUpdate } from "@/lib/api/schemas";
import { cn } from "@/lib/cn";
import { formatDate } from "@/lib/date";
import { skipOptimisation } from "@/lib/image";
import { EmptyNote, SectionHeading } from "./section-parts";

/** Newest first, whatever order the API sends them in. */
export function newestFirst(updates: readonly CampaignUpdate[]): CampaignUpdate[] {
  return [...updates].sort((a, b) => Date.parse(b.postedAt) - Date.parse(a.postedAt));
}

/** Updates from the organisation (F3.6, spec §7): a timeline, newest first, with photos. */
export function UpdatesTimeline({ updates }: { updates: CampaignUpdate[] }) {
  const ordered = newestFirst(updates);
  return (
    <section aria-labelledby="acc-updates" className="flex max-w-[760px] flex-col gap-4">
      <SectionHeading id="acc-updates">Updates from the organisation</SectionHeading>
      {ordered.length === 0 ? (
        <EmptyNote>No updates yet.</EmptyNote>
      ) : (
        <ol className="m-0 flex list-none flex-col p-0">
          {ordered.map((update, index) => {
            const last = index === ordered.length - 1;
            const date = formatDate(update.postedAt);
            return (
              <li
                key={update.id}
                className="grid grid-cols-[16px_minmax(0,1fr)] gap-3.5 min-[640px]:grid-cols-[20px_minmax(0,1fr)] min-[640px]:gap-4"
              >
                <span aria-hidden="true" className="flex flex-col items-center">
                  <span
                    className={cn(
                      "mt-[5px] size-3 flex-none rounded-full",
                      index === 0 ? "bg-brand-700" : "border-2 border-brand-700 bg-white",
                    )}
                  />
                  {!last && <span className="mt-1.5 w-0.5 flex-1 bg-brand-300" />}
                </span>
                <article
                  aria-label={`Update of ${date}`}
                  className={cn("flex min-w-0 flex-col gap-2.5", !last && "pb-7")}
                >
                  <time dateTime={update.postedAt} className="text-sm font-bold text-brand-900">
                    {date}
                  </time>
                  <p className="text-base leading-relaxed text-ink-700 min-[640px]:text-[17px]">
                    {update.body}
                  </p>
                  {update.images.length > 0 && (
                    <div className="flex flex-wrap gap-2.5">
                      {update.images.map((src, n) => (
                        <div
                          key={src}
                          className="relative h-[90px] w-[120px] overflow-hidden rounded-[14px] bg-brand-150"
                        >
                          <Image
                            src={src}
                            alt={`Photo ${n + 1} from the update of ${date}`}
                            fill
                            loading="lazy"
                            sizes="120px"
                            className="object-cover"
                            unoptimized={skipOptimisation(src)}
                          />
                        </div>
                      ))}
                    </div>
                  )}
                </article>
              </li>
            );
          })}
        </ol>
      )}
    </section>
  );
}
