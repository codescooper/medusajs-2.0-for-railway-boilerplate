import { Button } from "@medusajs/ui"
import { useMemo } from "react"

import Thumbnail from "@modules/products/components/thumbnail"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { convertToLocale } from "@lib/util/money"
import { HttpTypes } from "@medusajs/types"

type OrderCardProps = {
  order: HttpTypes.StoreOrder
}

const OrderCard = ({ order }: OrderCardProps) => {
  const numberOfLines = useMemo(() => {
    return (
      order.items?.reduce((acc, item) => {
        return acc + item.quantity
      }, 0) ?? 0
    )
  }, [order])

  const numberOfProducts = useMemo(() => {
    return order.items?.length ?? 0
  }, [order])

  return (
    <div
      className="rounded-[1.75rem] border border-white/10 bg-white/[0.04] p-5 backdrop-blur-xl"
      data-testid="order-card"
    >
      {/* Header */}
      <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-cyan-300/70">
            Commande
          </p>

          <div className="mt-2 text-2xl font-semibold tracking-[-0.03em] text-white">
            #
            <span data-testid="order-display-id">
              {order.display_id}
            </span>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2 text-sm text-white/55">
          <span
            className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1"
            data-testid="order-created-at"
          >
            {new Date(order.created_at).toLocaleDateString()}
          </span>

          <span
            className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-white/75"
            data-testid="order-amount"
          >
            {convertToLocale({
              amount: order.total,
              currency_code: order.currency_code,
            })}
          </span>

          <span className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1">
            {numberOfLines} {numberOfLines > 1 ? "articles" : "article"}
          </span>
        </div>
      </div>

      {/* Produits */}
      <div className="grid grid-cols-2 gap-4 my-5 small:grid-cols-4">
        {order.items?.slice(0, 3).map((item) => {
          return (
            <div
              key={item.id}
              className="flex flex-col gap-y-3"
              data-testid="order-item"
            >
              <Thumbnail thumbnail={item.thumbnail} images={[]} size="full" />

              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <p
                    className="line-clamp-2 text-sm font-medium text-white"
                    data-testid="item-title"
                  >
                    {item.title}
                  </p>
                  <p className="mt-1 text-xs text-white/50">
                    Qté : <span data-testid="item-quantity">{item.quantity}</span>
                  </p>
                </div>
              </div>
            </div>
          )
        })}

        {numberOfProducts > 4 && (
          <div className="flex h-full min-h-[180px] flex-col items-center justify-center rounded-[1.25rem] border border-white/10 bg-white/[0.03] text-center">
            <span className="text-lg font-semibold text-white">
              + {numberOfLines - 4}
            </span>
            <span className="mt-1 text-sm text-white/50">autres articles</span>
          </div>
        )}
      </div>

      {/* CTA */}
      <div className="flex justify-end pt-2">
        <LocalizedClientLink href={`/account/orders/details/${order.id}`}>
          <Button
            data-testid="order-details-link"
            className="
              rounded-full border border-white/10
              bg-white/[0.06] text-white
              transition-all duration-300
              hover:bg-white/[0.10]
            "
          >
            Voir les détails
          </Button>
        </LocalizedClientLink>
      </div>
    </div>
  )
}

export default OrderCard
