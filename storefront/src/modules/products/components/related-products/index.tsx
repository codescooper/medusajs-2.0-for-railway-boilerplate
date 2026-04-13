import { getRegion } from "@lib/data/regions"
import { getProductsList } from "@lib/data/products"
import { HttpTypes } from "@medusajs/types"
import Product from "../product-preview"

type RelatedProductsProps = {
  product: HttpTypes.StoreProduct
  countryCode: string
}

type StoreProductParamsWithTags = HttpTypes.StoreProductParams & {
  tags?: string[]
}

type StoreProductWithTags = HttpTypes.StoreProduct & {
  tags?: { value: string }[]
}

export default async function RelatedProducts({
  product,
  countryCode,
}: RelatedProductsProps) {
  const region = await getRegion(countryCode)

  if (!region) {
    return null
  }

  // edit this function to define your related products logic
  const queryParams: StoreProductParamsWithTags = {}
  if (region?.id) {
    queryParams.region_id = region.id
  }
  if (product.collection_id) {
    queryParams.collection_id = [product.collection_id]
  }
  const productWithTags = product as StoreProductWithTags
  if (productWithTags.tags) {
    queryParams.tags = productWithTags.tags
      .map((t) => t.value)
      .filter(Boolean) as string[]
  }
  queryParams.is_giftcard = false

  const products = await getProductsList({
    queryParams,
    countryCode,
  }).then(({ response }) => {
    return response.products.filter(
      (responseProduct) => responseProduct.id !== product.id
    )
  })

  if (!products.length) {
    return null
  }

  return (
    <section className="relative">
      <div className="mb-8 md:mb-10 flex flex-col items-center text-center">
        <span className="eyebrow-lgv">Sélection complémentaire</span>

        <h2 className="section-title-lgv max-w-[14ch]">
          Vous pourriez aussi aimer
        </h2>

        <p className="section-subtitle-lgv mt-4 max-w-2xl">
          D'autres modèles sélectionnés dans le même esprit de confort,
          d'élégance et de précision visuelle.
        </p>
      </div>

      <ul className="grid grid-cols-2 gap-5 small:grid-cols-3 xl:grid-cols-4">
        {products.map((product) => (
          <li key={product.id} className="animate-reveal-up">
            <Product region={region} product={product} />
          </li>
        ))}
      </ul>
    </section>
  )
}
