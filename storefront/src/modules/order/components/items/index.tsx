import repeat from "@lib/util/repeat"
import { HttpTypes } from "@medusajs/types"
import { Table, clx } from "@medusajs/ui"

import Divider from "@modules/common/components/divider"
import Item from "@modules/order/components/item"
import SkeletonLineItem from "@modules/skeletons/components/skeleton-line-item"

type ItemsProps = {
  order: HttpTypes.StoreOrder
}

const Items = ({ order }: ItemsProps) => {
  const items = order.items

  const sortedItems = items?.length
    ? [...items].sort((a, b) => {
        return (a.created_at ?? "") > (b.created_at ?? "") ? -1 : 1
      })
    : null

  return (
    <div className="flex flex-col text-white">
      <div className="mb-5 flex items-end justify-between gap-4">
        <div>
          <p className="text-[11px] uppercase tracking-[0.22em] text-cyan-300/75">
            Commande
          </p>
          <h3 className="mt-2 text-xl font-semibold tracking-[-0.03em] text-white md:text-2xl">
            Articles commandés
          </h3>
        </div>

        {sortedItems?.length ? (
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-white/60">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-300" />
            {sortedItems.length} article{sortedItems.length > 1 ? "s" : ""}
          </div>
        ) : null}
      </div>

      <Divider className="!mb-5" />

      <div
        className={clx(
          "relative overflow-hidden rounded-[1.5rem] border border-white/10 bg-gradient-to-b from-white/[0.06] to-white/[0.03] shadow-[0_14px_40px_rgba(0,0,0,0.2)] backdrop-blur-xl",
          "[&_table]:!bg-transparent [&_thead]:!bg-transparent [&_tbody]:!bg-transparent [&_tr]:!bg-transparent [&_th]:!bg-transparent [&_td]:!bg-transparent"
        )}
      >
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent" />
        <div className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-white/10 blur-2xl" />

        <Table className="w-full !bg-transparent text-white">
          <Table.Header className="!bg-transparent">
            <Table.Row className="border-b border-white/10 bg-white/[0.03] text-white/55">
              <Table.HeaderCell className="!bg-transparent !pl-4 py-4 text-left text-[11px] font-medium uppercase tracking-[0.18em] md:!pl-6">
                Article
              </Table.HeaderCell>

              <Table.HeaderCell className="!bg-transparent py-4" />

              <Table.HeaderCell className="!bg-transparent py-4 text-left text-[11px] font-medium uppercase tracking-[0.18em]">
                Quantité
              </Table.HeaderCell>

              <Table.HeaderCell className="!bg-transparent hidden py-4 text-left text-[11px] font-medium uppercase tracking-[0.18em] small:table-cell">
                Prix
              </Table.HeaderCell>

              <Table.HeaderCell className="!bg-transparent !pr-4 py-4 text-right text-[11px] font-medium uppercase tracking-[0.18em] md:!pr-6">
                Total
              </Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body data-testid="products-table">
            {sortedItems
              ? sortedItems.map((item) => {
                  return (
                    <Item
                      key={item.id}
                      item={item}
                      currencyCode={order.currency_code}
                    />
                  )
                })
              : repeat(5).map((i) => {
                  return <SkeletonLineItem key={i} />
                })}
          </Table.Body>
        </Table>
      </div>
    </div>
  )
}

export default Items
