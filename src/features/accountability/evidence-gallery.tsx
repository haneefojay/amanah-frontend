import { ArrowUpRightIcon } from "lucide-react";
import Image from "next/image";
import type { CampaignItem, EvidencePhoto, Expense } from "@/lib/api/schemas";
import { cn } from "@/lib/cn";
import { formatDateTime } from "@/lib/date";
import { skipOptimisation } from "@/lib/image";
import { EmptyNote, SectionHeading } from "./section-parts";

/** "8.14921, 4.72036": five decimals is about a metre, enough to find a building. */
export function formatCoordinates(latitude: number, longitude: number): string {
  return `${latitude.toFixed(5)}, ${longitude.toFixed(5)}`;
}

/** A link that opens the spot on OpenStreetMap, which needs no key or extra script. */
export function mapLink(latitude: number, longitude: number): string {
  const lat = latitude.toFixed(5);
  const lon = longitude.toFixed(5);
  return `https://www.openstreetmap.org/?mlat=${lat}&mlon=${lon}#map=17/${lat}/${lon}`;
}

/**
 * The phone's capture time, only when it reads differently from the upload time. Times are
 * compared as shown (to the minute), so a photo uploaded seconds later shows one time.
 */
export function phoneTimeIfDifferent(photo: EvidencePhoto): string | null {
  if (!photo.capturedAtClient) return null;
  const taken = formatDateTime(photo.capturedAtClient);
  return taken === formatDateTime(photo.uploadedAtServer) ? null : taken;
}

function Row({
  label,
  children,
  centred = false,
}: {
  label: string;
  children: React.ReactNode;
  centred?: boolean;
}) {
  return (
    <div className={cn("flex justify-between gap-3", centred && "items-center")}>
      <dt className="text-ink-600">{label}</dt>
      <dd className="text-right">{children}</dd>
    </div>
  );
}

/**
 * Photos from the ground (F3.4, spec §7). The server upload time is the authoritative time and is
 * labelled as recorded by Amanah. The phone's own time and location are shown as the phone gave
 * them; a browser can't prove a photo came from the camera, so the copy claims no more than that.
 */
export function EvidenceGallery({
  evidence,
  items,
  expenses,
}: {
  evidence: EvidencePhoto[];
  items: CampaignItem[];
  expenses: Expense[];
}) {
  const labelFor = (photo: EvidencePhoto) =>
    (photo.itemId && items.find((i) => i.id === photo.itemId)?.name) ||
    (photo.expenseId && expenses.find((e) => e.id === photo.expenseId)?.description) ||
    null;

  return (
    <section aria-labelledby="acc-photos" className="flex flex-col gap-4">
      <div className="flex max-w-[680px] flex-col gap-1.5">
        <SectionHeading id="acc-photos">Photos from the ground</SectionHeading>
        <p className="text-[15px] leading-normal text-ink-600 min-[640px]:text-base">
          Taken in the Amanah app. The upload time is recorded by Amanah and can’t be changed. The
          time on the phone is shown when it differs.
        </p>
      </div>

      {evidence.length === 0 ? (
        <EmptyNote>
          No photos yet. Photos taken when items are bought and delivered will appear here.
        </EmptyNote>
      ) : (
        <ul className="m-0 grid list-none grid-cols-[repeat(auto-fill,minmax(min(300px,100%),1fr))] gap-3.5 p-0 min-[640px]:gap-5">
          {evidence.map((photo) => {
            const label = labelFor(photo);
            const taken = phoneTimeIfDifferent(photo);
            const { latitude: lat, longitude: lng } = photo;
            return (
              <li
                key={photo.id}
                className="flex flex-col overflow-hidden rounded-[22px] border border-mist-200 bg-white min-[640px]:rounded-3xl"
              >
                <div className="relative aspect-[4/3] bg-brand-150">
                  <Image
                    src={photo.thumbnailUrl}
                    alt={label ? `Photo for ${label}` : "Photo from the organisation"}
                    fill
                    loading="lazy"
                    sizes="(min-width: 1240px) 380px, (min-width: 700px) 45vw, 100vw"
                    className="object-cover"
                    unoptimized={skipOptimisation(photo.thumbnailUrl)}
                  />
                </div>
                <div className="flex flex-col gap-3 p-4 min-[640px]:px-5 min-[640px]:pt-[18px] min-[640px]:pb-5">
                  <span
                    className={cn(
                      "self-start rounded-full px-2.5 py-1 text-[13px] font-bold",
                      label ? "bg-brand-150 text-brand-900" : "bg-mist-100 text-ink-650",
                    )}
                  >
                    {label ?? "General"}
                  </span>
                  <dl className="m-0 flex flex-col gap-2 text-sm">
                    <Row label="Uploaded">
                      <span className="font-bold">{formatDateTime(photo.uploadedAtServer)}</span>
                      <span className="block text-xs font-semibold text-brand-900">
                        Recorded by Amanah
                      </span>
                    </Row>
                    {taken && <Row label="Taken on the phone">{taken}</Row>}
                    <Row label="Location" centred>
                      {lat !== null && lng !== null ? (
                        <a
                          href={mapLink(lat, lng)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex min-h-11 items-center gap-1 font-semibold text-brand-900 underline-offset-4 hover:underline min-[640px]:min-h-0"
                        >
                          {formatCoordinates(lat, lng)}
                          <ArrowUpRightIcon aria-hidden="true" className="size-3.5" />
                          <span className="sr-only"> (opens a map in a new tab)</span>
                        </a>
                      ) : (
                        <span className="text-ink-600">Location unavailable</span>
                      )}
                    </Row>
                  </dl>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}
