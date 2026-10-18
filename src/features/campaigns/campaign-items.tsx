import { ItemStatusBadge } from "@/components/ui/status-badges";
import type { CampaignItem } from "@/lib/api/schemas";
import { formatNaira } from "@/lib/money";

/**
 * What the money buys: a table from 640px, a list on phones. Both show the same rows and the
 * total, which equals the campaign target (spec §4.1).
 */
export function CampaignItems({ items, target }: { items: CampaignItem[]; target: number }) {
  if (items.length === 0) {
    return <p className="text-ink-600">The organisation hasn’t listed any items yet.</p>;
  }
  return (
    <>
      <div className="hidden overflow-x-auto rounded-3xl border border-mist-200 min-[640px]:block">
        <table className="w-full border-collapse text-base">
          <caption className="sr-only">Items this campaign will buy</caption>
          <thead>
            <tr className="bg-mist-50 text-left text-[13px] text-ink-600">
              <th scope="col" className="px-5 py-3.5 font-semibold">
                Item
              </th>
              <th scope="col" className="px-3 py-3.5 text-right font-semibold">
                Quantity
              </th>
              <th scope="col" className="px-3 py-3.5 text-right font-semibold">
                Unit cost
              </th>
              <th scope="col" className="px-3 py-3.5 text-right font-semibold">
                Total
              </th>
              <th scope="col" className="px-5 py-3.5 font-semibold">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id} className="border-t border-mist-200">
                <th scope="row" className="px-5 py-4 text-left font-semibold">
                  {item.name}
                </th>
                <td className="px-3 py-4 text-right tabular-nums">{item.quantity}</td>
                <td className="px-3 py-4 text-right text-ink-600 tabular-nums">
                  {formatNaira(item.unitCost)}
                </td>
                <td className="px-3 py-4 text-right font-bold tabular-nums">
                  {formatNaira(item.totalCost)}
                </td>
                <td className="px-5 py-4">
                  <ItemStatusBadge status={item.status} />
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="border-t-[1.5px] border-brand-300 bg-brand-150">
              <th scope="row" colSpan={3} className="px-5 py-4 text-left font-bold text-brand-950">
                Total, equal to the target
              </th>
              <td className="px-3 py-4 text-right font-extrabold text-brand-950 tabular-nums">
                {formatNaira(target)}
              </td>
              <td />
            </tr>
          </tfoot>
        </table>
      </div>

      <div className="min-[640px]:hidden">
        <ul className="m-0 flex list-none flex-col overflow-hidden rounded-3xl border border-mist-200 p-0">
          {items.map((item) => (
            <li
              key={item.id}
              className="flex flex-col gap-1.5 border-t border-mist-200 p-4 first:border-t-0"
            >
              <div className="flex items-start justify-between gap-3">
                <span className="font-semibold">{item.name}</span>
                <ItemStatusBadge status={item.status} />
              </div>
              <div className="flex items-baseline justify-between gap-3 text-[15px]">
                <span className="text-ink-600">
                  {item.quantity} × {formatNaira(item.unitCost)}
                </span>
                <span className="font-bold">{formatNaira(item.totalCost)}</span>
              </div>
            </li>
          ))}
        </ul>
        <p className="mt-3 flex items-baseline justify-between gap-3 rounded-2xl bg-brand-150 px-4 py-3.5 font-bold text-brand-950">
          <span>Total, equal to the target</span>
          <span>{formatNaira(target)}</span>
        </p>
      </div>
    </>
  );
}
