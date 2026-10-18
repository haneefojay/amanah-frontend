import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import Link from "next/link";
import type { Route } from "next";

export function listHref(params: { city?: string; organisation?: string; page?: number }): Route {
  const query = new URLSearchParams();
  if (params.city) query.set("city", params.city);
  if (params.organisation) query.set("organisation", params.organisation);
  if (params.page && params.page > 1) query.set("page", String(params.page));
  const qs = query.toString();
  return (qs ? `/campaigns?${qs}` : "/campaigns") as Route;
}

const pill =
  "inline-flex min-h-12 items-center gap-1.5 rounded-full px-[18px] py-3 text-[15px] font-bold";

type Props = {
  page: number;
  totalPages: number;
  city?: string;
  organisation?: string;
};

/** Previous and next links that keep the active filters. Renders nothing for a single page. */
export function CampaignPagination({ page, totalPages, city, organisation }: Props) {
  if (totalPages <= 1) return null;
  return (
    <nav aria-label="Pages" className="flex items-center justify-center gap-3 text-[15px]">
      {page > 1 ? (
        <Link
          href={listHref({ city, organisation, page: page - 1 })}
          rel="prev"
          className={`${pill} border-[1.5px] border-brand-300 text-brand-900 hover:border-brand-700`}
        >
          <ChevronLeftIcon aria-hidden="true" className="size-4" />
          Previous
        </Link>
      ) : (
        <span aria-disabled="true" className={`${pill} bg-mist-50 font-semibold text-ink-500`}>
          <ChevronLeftIcon aria-hidden="true" className="size-4" />
          Previous
        </span>
      )}
      <span className="px-1.5 text-ink-600">
        Page {page} of {totalPages}
      </span>
      {page < totalPages ? (
        <Link
          href={listHref({ city, organisation, page: page + 1 })}
          rel="next"
          className={`${pill} border-[1.5px] border-brand-300 text-brand-900 hover:border-brand-700`}
        >
          Next
          <ChevronRightIcon aria-hidden="true" className="size-4" />
        </Link>
      ) : (
        <span aria-disabled="true" className={`${pill} bg-mist-50 font-semibold text-ink-500`}>
          Next
          <ChevronRightIcon aria-hidden="true" className="size-4" />
        </span>
      )}
    </nav>
  );
}
