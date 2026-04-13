import { Text } from "@medusajs/ui"

import { getProductPrice } from "@lib/util/get-product-price"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import Thumbnail from "../thumbnail"
import PreviewPrice from "./price"
import { getProductsById } from "@lib/data/products"
import { HttpTypes } from "@medusajs/types"

export default async function ProductPreview({
  product,
  isFeatured,
  region,
}: {
  product: HttpTypes.StoreProduct
  isFeatured?: boolean
  region: HttpTypes.StoreRegion
}) {
  const [pricedProduct] = await getProductsById({
    ids: [product.id!],
    regionId: region.id,
  })

  if (!pricedProduct) {
    return null
  }

  const { cheapestPrice } = getProductPrice({
    product: pricedProduct,
  })

  return (
    <LocalizedClientLink
      href={`/products/${product.handle}`}
      className="group block"
    >
      <article
        data-testid="product-wrapper"
        className="product-card-lgv h-full"
      >
        <div className="relative">
          <Thumbnail
            thumbnail={product.thumbnail}
            images={product.images}
            size="full"
            isFeatured={isFeatured}
          />

          {product.collection && (
            <div className="absolute left-3 top-3 z-10 rounded-full border border-white/10 bg-black/40 px-3 py-1 backdrop-blur-xl">
              <span className="text-[10px] uppercase tracking-[0.16em] text-cyan-200/90">
                {product.collection.title}
              </span>
            </div>
          )}
        </div>

        <div className="pt-4">
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <Text
                className="text-base md:text-lg font-medium tracking-[-0.02em] text-white transition duration-300 group-hover:text-cyan-200"
                data-testid="product-title"
              >
                {product.title}
              </Text>

              <p className="mt-2 text-sm leading-6 text-white/50">
                Élégance, confort et précision visuelle.
              </p>
            </div>

            <div className="shrink-0 text-right">
              {cheapestPrice && <PreviewPrice price={cheapestPrice} />}
            </div>
          </div>

          <div className="mt-5 flex items-center justify-between">
            <span className="text-xs uppercase tracking-[0.16em] text-white/40">
              Voir le produit
            </span>

            <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.05] text-white/70 transition-all duration-300 group-hover:border-cyan-300/30 group-hover:bg-cyan-400/10 group-hover:text-cyan-200">
              →
            </span>
          </div>
        </div>
      </article>
    </LocalizedClientLink>
  )
}
