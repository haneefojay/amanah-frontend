import type { CampaignItem, Expense } from "@/lib/api/schemas";
import { formatShortDate } from "@/lib/date";
import { formatNaira } from "@/lib/money";
import { EmptyNote, SectionHeading } from "./section-parts";
import { ReceiptViewer } from "./receipt-viewer";

function NoReceipt() {
  return (
    <span className="flex h-[72px] w-14 flex-none items-center justify-center rounded-[10px] border border-dashed border-sand-600 px-1.5 text-center text-[11px] leading-tight text-ink-600">
      No receipt
    </span>
  );
}

function Receipt({ expense }: { expense: Expense }) {
  return expense.receipt ? (
    <ReceiptViewer expense={expense} receipt={expense.receipt} />
  ) : (
    <NoReceipt />
  );
}

/**
 * Every expense the organisation published (F3.3, spec §7), newest first: a table from 640px,
 * cards on phones. Receipts open full size in a viewer.
 */
export function ExpensesList({ expenses, items }: { expenses: Expense[]; items: CampaignItem[] }) {
  const itemName = (id: string | null) =>
    (id && items.find((item) => item.id === id)?.name) || "General";
  const spent = expenses.reduce((sum, e) => sum + e.amount, 0);
  const count = `${expenses.length} ${expenses.length === 1 ? "expense" : "expenses"}, newest first`;

  return (
    <section aria-labelledby="acc-expenses" className="flex flex-col gap-4">
      <SectionHeading id="acc-expenses" aside={expenses.length > 0 ? count : undefined}>
        Expenses
      </SectionHeading>

      {expenses.length === 0 ? (
        <EmptyNote>No spending yet. Each purchase will appear here with its receipt.</EmptyNote>
      ) : (
        <>
          <div className="hidden overflow-x-auto rounded-3xl border border-mist-200 bg-white min-[640px]:block">
            <table className="w-full border-collapse text-base">
              <caption className="sr-only">Expenses with receipts</caption>
              <thead>
                <tr className="bg-mist-50 text-left text-[13px] text-ink-600">
                  <th scope="col" className="px-5 py-3.5 font-semibold">
                    Receipt
                  </th>
                  <th scope="col" className="px-3 py-3.5 font-semibold">
                    What was bought
                  </th>
                  <th scope="col" className="px-3 py-3.5 font-semibold">
                    For item
                  </th>
                  <th scope="col" className="px-3 py-3.5 font-semibold">
                    Date
                  </th>
                  <th scope="col" className="px-5 py-3.5 text-right font-semibold">
                    Amount
                  </th>
                </tr>
              </thead>
              <tbody>
                {expenses.map((e) => (
                  <tr key={e.id} className="border-t border-mist-200">
                    <td className="w-[88px] px-5 py-3.5">
                      <Receipt expense={e} />
                    </td>
                    <th scope="row" className="px-3 py-3.5 text-left font-normal">
                      <span className="block font-semibold">{e.description}</span>
                      <span className="block text-sm text-ink-600">{e.vendorName}</span>
                    </th>
                    <td className="px-3 py-3.5 text-[15px] text-ink-700">{itemName(e.itemId)}</td>
                    <td className="px-3 py-3.5 text-[15px] whitespace-nowrap text-ink-700">
                      {formatShortDate(e.spentAt)}
                    </td>
                    <td className="px-5 py-3.5 text-right font-bold whitespace-nowrap">
                      {formatNaira(e.amount)}
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="border-t-[1.5px] border-brand-300 bg-brand-150">
                  <th
                    scope="row"
                    colSpan={4}
                    className="px-5 py-4 text-left font-bold text-brand-950"
                  >
                    Total spent
                  </th>
                  <td className="px-5 py-4 text-right font-extrabold whitespace-nowrap text-brand-950">
                    {formatNaira(spent)}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>

          <div className="flex flex-col gap-2.5 min-[640px]:hidden">
            <ul aria-label="Expenses" className="m-0 flex list-none flex-col gap-2.5 p-0">
              {expenses.map((e) => (
                <li
                  key={e.id}
                  className="grid grid-cols-[56px_minmax(0,1fr)] items-start gap-3.5 rounded-[18px] border border-mist-200 bg-white p-3.5"
                >
                  <Receipt expense={e} />
                  <div className="flex min-w-0 flex-col gap-1">
                    <div className="flex justify-between gap-2.5">
                      <span className="font-bold">{e.description}</span>
                      <span className="flex-none font-extrabold">{formatNaira(e.amount)}</span>
                    </div>
                    <span className="text-sm text-ink-600">{e.vendorName}</span>
                    <span className="text-sm text-ink-600">
                      {formatShortDate(e.spentAt)} ·{" "}
                      {e.itemId ? (
                        <>
                          For{" "}
                          <strong className="font-semibold text-ink-700">
                            {itemName(e.itemId)}
                          </strong>
                        </>
                      ) : (
                        "General"
                      )}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
            <p className="flex items-center justify-between gap-2.5 rounded-[18px] bg-brand-150 p-4 text-brand-950">
              <span className="font-bold">Total spent</span>
              <span className="font-extrabold">{formatNaira(spent)}</span>
            </p>
          </div>
        </>
      )}
    </section>
  );
}
