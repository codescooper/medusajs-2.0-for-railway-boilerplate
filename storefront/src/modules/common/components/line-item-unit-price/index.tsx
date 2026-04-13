import { convertToLocale } from "@lib/util/money"
import { HttpTypes } from "@medusajs/types"
import { clx } from "@medusajs/ui"

type LineItemUnitPriceProps = {
  item: HttpTypes.StoreCartLineItem | HttpTypes.StoreOrderLineItem
  style?: "default" | "tight"
  currencyCode: string
}

const LineItemUnitPrice = ({
  item,
  style = "default",
  currencyCode,
}: LineItemUnitPriceProps) => {
  const total = item.total ?? 0
  const originalTotal = item.original_total ?? 0
  const quantity = item.quantity || 1

  const hasReducedPrice = total < originalTotal
  const unitOriginalPrice = originalTotal / quantity
  const unitCurrentPrice = total / quantity

  const percentageDiff =
    hasReducedPrice && originalTotal > 0
      ? Math.round(((originalTotal - total) / originalTotal) * 100)
      : 0

  return (
    <div className="flex h-full flex-col justify-center text-right">
      {hasReducedPrice && (
        <div className="mb-1 flex flex-col items-end gap-1">
          <span
            className="text-xs text-white/35 line-through"
            data-testid="product-unit-original-price"
          >
            {convertToLocale({
              amount: unitOriginalPrice,
              currency_code: currencyCode,
            })}
          </span>

          {style === "default" && (
            <span className="rounded-full border border-emerald-300/20 bg-emerald-300/10 px-2 py-0.5 text-[11px] font-medium text-emerald-300">
              -{percentageDiff}%
            </span>
          )}
        </div>
      )}

      <span
        className={clx("font-medium tracking-[-0.02em]", {
          "text-sm text-white/70": style === "tight" && !hasReducedPrice,
          "text-sm text-emerald-300": style === "tight" && hasReducedPrice,
          "text-sm md:text-base text-white/80": style === "default" && !hasReducedPrice,
          "text-sm md:text-base text-emerald-300": style === "default" && hasReducedPrice,
        })}
        data-testid="product-unit-price"
      >
        {convertToLocale({
          amount: unitCurrentPrice,
          currency_code: currencyCode,
        })}
      </span>
    </div>
  )
}

export default LineItemUnitPrice
