import { clx } from "@medusajs/ui"

import { getProductPrice } from "@lib/util/get-product-price"
import { HttpTypes } from "@medusajs/types"

export default function ProductPrice({
  product,
  variant,
}: {
  product: HttpTypes.StoreProduct
  variant?: HttpTypes.StoreProductVariant
}) {
  const { cheapestPrice, variantPrice } = getProductPrice({
    product,
    variantId: variant?.id,
  })

  const selectedPrice = variant ? variantPrice : cheapestPrice

  if (!selectedPrice) {
    return (
      <div className="h-16 w-40 animate-pulse rounded-2xl border border-white/10 bg-white/[0.05]" />
    )
  }

  return (
    <div className="flex flex-col gap-2 text-white">
      <div className="flex items-end gap-3">
        <span className="text-xs uppercase tracking-[0.18em] text-cyan-300/80">
          {variant ? "Prix" : "À partir de"}
        </span>
      </div>

      <div className="flex items-center gap-3">
        <span
          className={clx(
            "text-3xl md:text-4xl font-semibold tracking-[-0.04em] leading-none",
            {
              "text-cyan-300": selectedPrice.price_type === "sale",
              "text-white": selectedPrice.price_type !== "sale",
            }
          )}
        >
          <span
            data-testid="product-price"
            data-value={selectedPrice.calculated_price_number}
          >
            {selectedPrice.calculated_price}
          </span>
        </span>

        {selectedPrice.price_type === "sale" && (
          <span className="rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1 text-xs font-medium text-cyan-200">
            -{selectedPrice.percentage_diff}%
          </span>
        )}
      </div>

      {selectedPrice.price_type === "sale" && (
        <div className="flex flex-wrap items-center gap-2 text-sm">
          <span className="text-white/45">Prix initial :</span>
          <span
            className="line-through text-white/55"
            data-testid="original-product-price"
            data-value={selectedPrice.original_price_number}
          >
            {selectedPrice.original_price}
          </span>
        </div>
      )}

      <p className="text-sm leading-6 text-white/50">
        Prix affiché selon la variante sélectionnée et la région.
      </p>
    </div>
  )
}
