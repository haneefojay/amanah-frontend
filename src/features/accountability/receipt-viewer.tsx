"use client";

import { ArrowUpRightIcon, XIcon } from "lucide-react";
import Image from "next/image";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import type { Expense, Receipt } from "@/lib/api/schemas";
import { formatDateTime, formatShortDate } from "@/lib/date";
import { skipOptimisation } from "@/lib/image";
import { formatNaira } from "@/lib/money";

/**
 * A receipt thumbnail that opens the full receipt in a dialog (F3.3). The thumbnail is small and
 * lazy-loaded; the full image only loads when someone opens it. Escape and the close button
 * return focus to the thumbnail.
 */
export function ReceiptViewer({ expense, receipt }: { expense: Expense; receipt: Receipt }) {
  return (
    <Dialog>
      <DialogTrigger
        aria-label={`View the receipt for ${expense.description}`}
        className="relative block h-[72px] w-14 flex-none overflow-hidden rounded-[10px] border border-mist-300 bg-sand-50 outline-none hover:border-brand-300 focus-visible:ring-[3px] focus-visible:ring-ring/50"
      >
        <Image
          src={receipt.thumbnailUrl}
          alt=""
          fill
          sizes="56px"
          loading="lazy"
          className="object-cover"
          unoptimized={skipOptimisation(receipt.thumbnailUrl)}
        />
      </DialogTrigger>
      <DialogContent
        showCloseButton={false}
        className="flex max-h-[calc(100dvh-1rem)] w-full max-w-[calc(100%-1rem)] flex-col gap-0 overflow-hidden rounded-3xl border-0 bg-white p-0 sm:max-w-xl"
      >
        <div className="flex items-start justify-between gap-3 px-5 pt-5 pb-4 sm:px-6">
          <div className="flex min-w-0 flex-col gap-1">
            <DialogTitle className="text-left text-[19px] leading-tight font-extrabold text-brand-950">
              Receipt: {expense.description}
            </DialogTitle>
            <DialogDescription className="text-left text-sm text-ink-600">
              {expense.vendorName} · {formatNaira(expense.amount)} ·{" "}
              {formatShortDate(expense.spentAt)}
            </DialogDescription>
          </div>
          <DialogClose
            aria-label="Close receipt"
            className="flex size-11 flex-none items-center justify-center rounded-full border-[1.5px] border-mist-300 bg-white text-ink-900 outline-none hover:border-brand-300 focus-visible:ring-[3px] focus-visible:ring-ring/50"
          >
            <XIcon aria-hidden="true" className="size-[18px]" />
          </DialogClose>
        </div>
        <div className="relative h-[min(64dvh,560px)] bg-mist-50">
          <Image
            src={receipt.imageUrl}
            alt={`Receipt from ${expense.vendorName} for ${formatNaira(expense.amount)}`}
            fill
            sizes="(min-width: 640px) 576px, 100vw"
            className="object-contain p-4"
            unoptimized={skipOptimisation(receipt.imageUrl)}
          />
        </div>
        <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1 px-5 py-3 text-sm text-ink-600 sm:px-6">
          <span>Uploaded {formatDateTime(receipt.uploadedAtServer)} · Recorded by Amanah</span>
          <a
            href={receipt.imageUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 items-center gap-1 font-bold text-brand-900 underline-offset-4 hover:underline"
          >
            Open full size
            <ArrowUpRightIcon aria-hidden="true" className="size-4" />
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
        </div>
      </DialogContent>
    </Dialog>
  );
}
