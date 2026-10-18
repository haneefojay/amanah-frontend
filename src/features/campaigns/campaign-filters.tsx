"use client";

import { ChevronDownIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useRef, type FormEvent } from "react";
import { listHref } from "./campaign-pagination";
import type { CampaignListResponse } from "@/lib/api/schemas";

type Props = {
  filters: CampaignListResponse["filters"];
  city?: string;
  organisationId?: string;
  total: number;
};

const selectClass =
  "h-12 w-full appearance-none rounded-[14px] border-[1.5px] border-mist-300 bg-white pr-11 pl-4 text-base text-ink-900";

/**
 * City and organisation filters. A plain GET form, so the choice lives in the URL (survives a
 * reload and can be shared). Choosing a value submits straight away; without JavaScript the
 * Apply button does it.
 */
export function CampaignFilters({ filters, city, organisationId, total }: Props) {
  const form = useRef<HTMLFormElement>(null);
  const router = useRouter();
  const submit = () => form.current?.requestSubmit();
  // Keep the address tidy: only the filters that are set appear in it.
  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    router.push(
      listHref({
        city: String(data.get("city") ?? "") || undefined,
        organisation: String(data.get("organisation") ?? "") || undefined,
      }),
    );
  };
  return (
    <form
      ref={form}
      onSubmit={onSubmit}
      action="/campaigns"
      method="get"
      aria-label="Filter campaigns"
      className="flex flex-col items-stretch gap-x-4 gap-y-3 rounded-3xl bg-mist-50 px-5 py-[18px] min-[640px]:flex-row min-[640px]:flex-wrap min-[640px]:items-end"
    >
      <div className="flex min-w-0 flex-col gap-1.5 min-[640px]:flex-[0_1_260px]">
        <label htmlFor="f-city" className="text-sm font-semibold text-ink-700">
          City
        </label>
        <div className="relative">
          <select
            id="f-city"
            name="city"
            defaultValue={city ?? ""}
            onChange={submit}
            className={selectClass}
          >
            <option value="">All cities</option>
            {filters.cities.map((name) => (
              <option key={name} value={name}>
                {name}
              </option>
            ))}
          </select>
          <ChevronDownIcon
            aria-hidden="true"
            className="pointer-events-none absolute top-3.5 right-4 size-[18px] text-ink-600"
          />
        </div>
      </div>
      <div className="flex min-w-0 flex-col gap-1.5 min-[640px]:flex-[0_1_340px]">
        <label htmlFor="f-org" className="text-sm font-semibold text-ink-700">
          Organisation
        </label>
        <div className="relative">
          <select
            id="f-org"
            name="organisation"
            defaultValue={organisationId ?? ""}
            onChange={submit}
            className={selectClass}
          >
            <option value="">All organisations</option>
            {filters.organisations.map((org) => (
              <option key={org.id} value={org.id}>
                {org.name}
              </option>
            ))}
          </select>
          <ChevronDownIcon
            aria-hidden="true"
            className="pointer-events-none absolute top-3.5 right-4 size-[18px] text-ink-600"
          />
        </div>
      </div>
      <noscript>
        <button
          type="submit"
          className="min-h-12 rounded-full bg-brand-900 px-5 font-bold text-white"
        >
          Apply
        </button>
      </noscript>
      <p
        role="status"
        className="text-[15px] text-ink-600 min-[640px]:mr-0 min-[640px]:ml-auto min-[640px]:pb-3"
      >
        <strong className="text-ink-900">
          {total} {total === 1 ? "campaign" : "campaigns"}
        </strong>{" "}
        live or recently completed
      </p>
    </form>
  );
}
