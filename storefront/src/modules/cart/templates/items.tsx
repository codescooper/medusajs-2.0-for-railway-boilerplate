import repeat from "@lib/util/repeat"
import { HttpTypes } from "@medusajs/types"
import { Heading, Table, clx } from "@medusajs/ui"

import Item from "@modules/cart/components/item"
import SkeletonLineItem from "@modules/skeletons/components/skeleton-line-item"

type ItemsTemplateProps = {
  cart?: HttpTypes.StoreCart
}

const ItemsTemplate = ({ cart }: ItemsTemplateProps) => {
  const items = cart?.items

  const sortedItems = items
    ? [...items].sort((a, b) => {
        return (a.created_at ?? "") > (b.created_at ?? "") ? -1 : 1
      })
    : null

  return (
    <div className="text-white">
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4 border-b border-white/10 pb-4">
        <div>
          <span className="eyebrow-lgv !mb-3">Panier</span>
          <Heading className="text-2xl font-semibold tracking-[-0.04em] text-white md:text-4xl">
            Articles sélectionnés
          </Heading>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/50">
            Vérifiez votre sélection, ajustez les quantités et poursuivez votre commande dans un parcours clair et élégant.
          </p>
        </div>

        {sortedItems?.length ? (
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-white/60">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-300" />
            {sortedItems.length} article{sortedItems.length > 1 ? "s" : ""}
          </div>
        ) : null}
      </div>

      <div
        className={clx(
          "relative overflow-hidden rounded-[1.75rem] border border-white/10 bg-gradient-to-b from-white/[0.06] to-white/[0.03] shadow-[0_16px_45px_rgba(0,0,0,0.22)] backdrop-blur-xl",
          "[&_table]:!bg-transparent [&_thead]:!bg-transparent [&_tbody]:!bg-transparent [&_tr]:!bg-transparent [&_th]:!bg-transparent [&_td]:!bg-transparent"
        )}
      >
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent" />
        <div className="pointer-events-none absolute -right-8 -top-8 h-28 w-28 rounded-full bg-white/10 blur-2xl" />

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

          <Table.Body className="[&_tr]:border-b [&_tr]:border-white/10 last:[&_tr]:border-b-0">
            {sortedItems
              ? sortedItems.map((item) => {
                  return (
                    <Item
                      key={item.id}
                      item={item}
                      currencyCode={cart?.currency_code || "xof"}
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

export default ItemsTemplate
