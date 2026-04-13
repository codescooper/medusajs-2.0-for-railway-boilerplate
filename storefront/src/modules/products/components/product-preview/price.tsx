import { Text, clx } from "@medusajs/ui"
import { VariantPrice } from "types/global"

export default async function PreviewPrice({ price }: { price: VariantPrice }) {
  if (!price) {
    return null
  }

  const isSale = price.price_type === "sale"

  return (
    <div className="flex items-center gap-2">
      {isSale && (
        <Text
          className="text-xs line-through text-white/40"
          data-testid="original-price"
        >
          {price.original_price}
        </Text>
      )}

      <Text
        className={clx(
          "text-sm font-medium tracking-tight",
          {
            "text-white": !isSale,
            "text-cyan-300": isSale,
          }
        )}
        data-testid="price"
      >
        {price.calculated_price}
      </Text>

      {isSale && (
        <span className="text-[10px] px-2 py-[2px] rounded-full bg-cyan-400/10 border border-cyan-400/20 text-cyan-200">
          -{price.percentage_diff}%
        </span>
      )}
    </div>
  )
}
