import { HttpTypes } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

type ProductInfoProps = {
  product: HttpTypes.StoreProduct
}

const ProductInfo = ({ product }: ProductInfoProps) => {
  return (
    <div id="product-info" className="text-white">
      <div className="flex flex-col gap-y-6">

        {/* COLLECTION */}
        {product.collection && (
          <LocalizedClientLink
            href={`/collections/${product.collection.handle}`}
            className="
              text-[11px] uppercase tracking-[0.22em]
              text-cyan-300/80 hover:text-cyan-300
              transition duration-300
            "
          >
            {product.collection.title}
          </LocalizedClientLink>
        )}

        {/* TITLE */}
        <h1
          className="
            text-3xl md:text-4xl xl:text-5xl
            font-semibold tracking-[-0.04em]
            leading-[1.05]
          "
          data-testid="product-title"
        >
          {product.title}
        </h1>

        {/* VALUE HOOK */}
        <p className="text-base text-white/65 leading-relaxed max-w-[48ch]">
          Une monture pensée pour allier confort visuel, élégance et précision,
          adaptée à votre quotidien comme à vos exigences.
        </p>

        {/* DIVIDER */}
        <div className="border-t border-white/10" />

        {/* DESCRIPTION */}
        {product.description && (
          <p
            className="
              text-sm text-white/70
              leading-relaxed whitespace-pre-line
              max-w-[55ch]
            "
            data-testid="product-description"
          >
            {product.description}
          </p>
        )}

        {/* TRUST + MICRO BENEFITS */}
        <div className="flex flex-wrap gap-2 pt-2">
          <span className="text-xs text-white/60 border border-white/10 rounded-full px-3 py-1 bg-white/[0.03]">
            Verres haute précision
          </span>
          <span className="text-xs text-white/60 border border-white/10 rounded-full px-3 py-1 bg-white/[0.03]">
            Confort prolongé
          </span>
          <span className="text-xs text-white/60 border border-white/10 rounded-full px-3 py-1 bg-white/[0.03]">
            Garantie incluse
          </span>
        </div>

        {/* BONUS TRUST (subtil mais puissant) */}
        <p className="text-xs text-white/40 pt-1">
          Livraison rapide • Paiement sécurisé • Assistance disponible
        </p>
      </div>
    </div>
  )
}

export default ProductInfo
