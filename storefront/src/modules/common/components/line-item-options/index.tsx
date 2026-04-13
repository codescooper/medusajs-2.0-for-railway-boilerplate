import { HttpTypes } from "@medusajs/types"
import { clx } from "@medusajs/ui"

type LineItemOptionsProps = {
  variant: HttpTypes.StoreProductVariant | undefined
  "data-testid"?: string
  "data-value"?: HttpTypes.StoreProductVariant
}

const LineItemOptions = ({
  variant,
  "data-testid": dataTestid,
  "data-value": dataValue,
}: LineItemOptionsProps) => {
  if (!variant?.title) return null

  return (
    <div
      data-testid={dataTestid}
      data-value={dataValue}
      className="flex flex-wrap items-center gap-2"
    >
      <span className="text-[11px] uppercase tracking-[0.18em] text-white/40">
        Modèle
      </span>

      <span
        className={clx(
          "rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs text-white/70",
          "backdrop-blur-xl"
        )}
      >
        {variant.title}
      </span>
    </div>
  )
}

export default LineItemOptions
