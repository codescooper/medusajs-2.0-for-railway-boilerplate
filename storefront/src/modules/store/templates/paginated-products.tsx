import { listProductsWithSort } from "@lib/data/products"
import { getRegion } from "@lib/data/regions"
import ProductPreview from "@modules/products/components/product-preview"
import { Pagination } from "@modules/store/components/pagination"
import { SortOptions } from "@modules/store/components/refinement-list/sort-products"

const PRODUCT_LIMIT = 12

type PaginatedProductsParams = {
  limit: number
  collection_id?: string[]
  category_id?: string[]
  id?: string[]
  order?: string
}

export default async function PaginatedProducts({
  sortBy,
  page,
  collectionId,
  categoryId,
  productsIds,
  countryCode,
}: {
  sortBy?: SortOptions
  page: number
  collectionId?: string
  categoryId?: string
  productsIds?: string[]
  countryCode: string
}) {
  const queryParams: PaginatedProductsParams = {
    limit: PRODUCT_LIMIT,
  }

  if (collectionId) {
    queryParams.collection_id = [collectionId]
  }

  if (categoryId) {
    queryParams.category_id = [categoryId]
  }

  if (productsIds) {
    queryParams.id = productsIds
  }

  if (sortBy === "created_at") {
    queryParams.order = "created_at"
  }

  const region = await getRegion(countryCode)

  if (!region) {
    return null
  }

  const {
    response: { products, count },
  } = await listProductsWithSort({
    page,
    queryParams,
    sortBy,
    countryCode,
  })

  const totalPages = Math.ceil(count / PRODUCT_LIMIT)

  return (
    <div className="w-full">
      <ul
        className="
          grid w-full
          grid-cols-2
          gap-x-4 gap-y-6
          small:grid-cols-3
          medium:grid-cols-4
          md:gap-x-6 md:gap-y-8
          xl:gap-x-8 xl:gap-y-10
        "
        data-testid="products-list"
      >
        {products.map((product, index) => {
          return (
            <li
              key={product.id}
              className="opacity-0 animate-fade-in"
              style={{ animationDelay: `${index * 0.04}s` }}
            >
              <ProductPreview product={product} region={region} />
            </li>
          )
        })}
      </ul>

      {totalPages > 1 && (
        <div className="mt-10 border-t border-white/10 pt-6 md:mt-12 md:pt-8">
          <div className="flex justify-center">
            <Pagination
              data-testid="product-pagination"
              page={page}
              totalPages={totalPages}
            />
          </div>
        </div>
      )}
    </div>
  )
}
