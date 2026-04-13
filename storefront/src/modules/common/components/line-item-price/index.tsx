import { getPercentageDiff } from "@lib/util/get-percentage-diff"
import { convertToLocale } from "@lib/util/money"
import { HttpTypes } from "@medusajs/types"
import { clx } from "@medusajs/ui"

type LineItemPriceProps = {
  item: HttpTypes.StoreCartLineItem | HttpTypes.StoreOrderLineItem
  style?: "default" | "tight"
  currencyCode: string
}

const LineItemPrice = ({
  item,
  style = "default",
  currencyCode,
}: LineItemPriceProps) => {
  const { total, original_total } = item

  const originalPrice = original_total ?? 0
  const currentPrice = total ?? 0
  const hasReducedPrice = currentPrice < originalPrice

  return (
    <div className="flex flex-col items-end gap-1 text-right">
      {hasReducedPrice && (
        <div className="flex flex-col items-end gap-1">
          <div className="flex items-center gap-2">
            <span
              className="text-xs text-white/35 line-through"
              data-testid="product-original-price"
            >
              {convertToLocale({
                amount: originalPrice,
                currency_code: currencyCode,
              })}
            </span>

            {style === "default" && (
              <span className="rounded-full border border-emerald-300/20 bg-emerald-300/10 px-2 py-0.5 text-[11px] font-medium text-emerald-300">
                -{getPercentageDiff(originalPrice, currentPrice)}%
              </span>
            )}
          </div>
        </div>
      )}

      <span
        className={clx("font-semibold tracking-[-0.02em]", {
          "text-sm text-white": style === "tight" && !hasReducedPrice,
          "text-sm text-emerald-300": style === "tight" && hasReducedPrice,
          "text-base md:text-lg text-white": style === "default" && !hasReducedPrice,
          "text-base md:text-lg text-emerald-300": style === "default" && hasReducedPrice,
        })}
        data-testid="product-price"
      >
        {convertToLocale({
          amount: currentPrice,
          currency_code: currencyCode,
        })}
      </span>
    </div>
  )
}

export default LineItemPrice
