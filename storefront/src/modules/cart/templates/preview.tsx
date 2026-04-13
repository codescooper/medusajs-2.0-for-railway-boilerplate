"use client"

import repeat from "@lib/util/repeat"
import { HttpTypes } from "@medusajs/types"
import { Table, clx } from "@medusajs/ui"

import Item from "@modules/cart/components/item"
import SkeletonLineItem from "@modules/skeletons/components/skeleton-line-item"

type ItemsTemplateProps = {
  cart: HttpTypes.StoreCart
}

const ItemsPreviewTemplate = ({ cart }: ItemsTemplateProps) => {
  const items = cart.items
  const sortedItems = items
    ? [...items].sort((a, b) => {
        return (a.created_at ?? "") > (b.created_at ?? "") ? -1 : 1
      })
    : null

  const hasOverflow = !!sortedItems && sortedItems.length > 4

  return (
    <div className="text-white">
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4">
        <div className="space-y-2">
          <p className="text-[11px] uppercase tracking-[0.22em] text-cyan-300/75">
            Aperçu panier
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <h3 className="text-lg font-semibold tracking-[-0.03em] text-white md:text-xl">
              Articles ajoutés
            </h3>

            {sortedItems?.length ? (
              <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/60">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-300" />
                {sortedItems.length} article{sortedItems.length > 1 ? "s" : ""}
              </span>
            ) : null}
          </div>
        </div>

        <p className="max-w-xs text-right text-xs leading-relaxed text-white/45">
          Ajustez vos quantités et vérifiez votre sélection avant validation.
        </p>
      </div>

      <div
        className={clx(
          "relative overflow-hidden rounded-[1.5rem] border border-white/10 bg-gradient-to-b from-white/[0.07] to-white/[0.03] shadow-[0_10px_40px_rgba(0,0,0,0.18)]",
          "[&_table]:!bg-transparent [&_thead]:!bg-transparent [&_tbody]:!bg-transparent [&_tr]:!bg-transparent [&_th]:!bg-transparent [&_td]:!bg-transparent",
          {
            "max-h-[460px] overflow-y-auto overflow-x-hidden no-scrollbar":
              hasOverflow,
          }
        )}
      >
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent" />
        <div className="pointer-events-none absolute right-0 top-0 h-24 w-24 rounded-full bg-white/5 blur-2xl" />

        <div className="p-2 md:p-3">
          <Table className="w-full !bg-transparent text-white">
            <Table.Header className="!bg-transparent">
              <Table.Row className="!bg-transparent border-b border-white/10">
                <Table.HeaderCell className="!bg-transparent !text-white/35 px-4 py-3 text-left text-[11px] uppercase tracking-[0.18em]">
                  Article
                </Table.HeaderCell>
                <Table.HeaderCell className="!bg-transparent !text-white/35 px-4 py-3 text-left text-[11px] uppercase tracking-[0.18em]">
                  Quantité
                </Table.HeaderCell>
                <Table.HeaderCell className="!bg-transparent !text-white/35 hidden px-4 py-3 text-left text-[11px] uppercase tracking-[0.18em] small:table-cell">
                  Prix
                </Table.HeaderCell>
                <Table.HeaderCell className="!bg-transparent !text-white/35 px-4 py-3 text-right text-[11px] uppercase tracking-[0.18em]">
                  Total
                </Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body
              data-testid="items-table"
              className="[&_tr]:border-b [&_tr]:border-white/10 last:[&_tr]:border-b-0"
            >
              {sortedItems
                ? sortedItems.map((item) => {
                    return (
                      <Item
                        key={item.id}
                        item={item}
                        type="full"
                        currencyCode={cart.currency_code}
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
    </div>
  )
}

export default ItemsPreviewTemplate
