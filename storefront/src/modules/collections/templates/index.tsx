import { Suspense } from "react"

import SkeletonProductGrid from "@modules/skeletons/templates/skeleton-product-grid"
import RefinementList from "@modules/store/components/refinement-list"
import { SortOptions } from "@modules/store/components/refinement-list/sort-products"
import PaginatedProducts from "@modules/store/templates/paginated-products"
import { HttpTypes } from "@medusajs/types"

export default function CollectionTemplate({
  sortBy,
  collection,
  page,
  countryCode,
}: {
  sortBy?: SortOptions
  collection: HttpTypes.StoreCollection
  page?: string
  countryCode: string
}) {
  const pageNumber = page ? parseInt(page) : 1
  const sort = sortBy || "created_at"

  return (
    <section className="relative overflow-hidden py-8 md:py-12">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-[-80px] top-[10%] h-44 w-44 rounded-full bg-cyan-300/10 blur-3xl" />
        <div className="absolute right-[-60px] top-[22%] h-56 w-56 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute left-[18%] bottom-[6%] h-40 w-40 rounded-full bg-emerald-200/10 blur-3xl" />
      </div>

      <div className="content-container">
        <div className="mb-8 md:mb-10">
          <span className="eyebrow-lgv">Collection</span>
          <div className="mt-3 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <h1 className="text-3xl font-semibold tracking-[-0.04em] text-white md:text-5xl">
                {collection.title}
              </h1>

              {collection.handle && (
                <p className="mt-4 max-w-2xl text-sm leading-relaxed text-white/55 md:text-base">
                  Explorez une sélection pensée pour allier style, confort et
                  précision visuelle dans l'univers premium de La Grande Vision.
                </p>
              )}
            </div>

            <div className="inline-flex items-center gap-2 self-start rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-white/55 backdrop-blur-xl">
              <span className="h-1.5 w-1.5 rounded-full bg-cyan-300" />
              Sélection raffinée
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[280px_minmax(0,1fr)] xl:gap-10">
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-[1.5rem] border border-white/10 bg-gradient-to-b from-white/[0.06] to-white/[0.03] p-4 shadow-[0_14px_40px_rgba(0,0,0,0.2)] backdrop-blur-xl md:p-5">
              <RefinementList sortBy={sort} />
            </div>
          </aside>

          <div className="min-w-0">
            <div className="mb-6 flex items-center justify-between gap-4 rounded-[1.25rem] border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white/55 backdrop-blur-xl">
              <span>Catalogue</span>
              <span>Page {pageNumber}</span>
            </div>

            <Suspense
              fallback={
                <SkeletonProductGrid
                  numberOfProducts={collection.products?.length}
                />
              }
            >
              <PaginatedProducts
                sortBy={sort}
                page={pageNumber}
                collectionId={collection.id}
                countryCode={countryCode}
              />
            </Suspense>
          </div>
        </div>
      </div>
    </section>
  )
}
