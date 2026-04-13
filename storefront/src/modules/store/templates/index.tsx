import { Suspense } from "react"

import SkeletonProductGrid from "@modules/skeletons/templates/skeleton-product-grid"
import RefinementList from "@modules/store/components/refinement-list"
import { SortOptions } from "@modules/store/components/refinement-list/sort-products"

import PaginatedProducts from "./paginated-products"

const StoreTemplate = ({
  sortBy,
  page,
  countryCode,
}: {
  sortBy?: SortOptions
  page?: string
  countryCode: string
}) => {
  const pageNumber = page ? parseInt(page) : 1
  const sort = sortBy || "created_at"

  return (
    <div
      className="relative overflow-hidden pb-16 pt-8 md:pb-24 md:pt-12"
      data-testid="category-container"
    >
      {/* Orbes décoratifs */}
      <div className="floating-orb left-[-90px] top-[120px] h-[220px] w-[220px] bg-cyan-400/20 animate-float-slow" />
      <div className="floating-orb right-[-110px] top-[200px] h-[260px] w-[260px] bg-blue-500/20 animate-float-soft" />

      <div className="content-container">
        {/* Hero catalogue */}
        <section className="hero-panel border-gradient-lgv mb-8 px-5 py-8 md:mb-10 md:px-8 md:py-10 xl:px-10">
          <div className="max-w-3xl">
            <span className="eyebrow-lgv">Boutique</span>

            <h1
              className="section-title-lgv max-w-[14ch]"
              data-testid="store-page-title"
            >
              Découvrez notre sélection de montures
            </h1>

            <p className="section-subtitle-lgv mt-4 max-w-2xl">
              Explorez des lunettes pensées pour allier style, confort et précision
              visuelle, dans un univers premium adapté à vos besoins du quotidien.
            </p>
          </div>
        </section>

        {/* Layout catalogue */}
        <div className="grid gap-6 xl:grid-cols-[280px_minmax(0,1fr)] xl:gap-8">
          {/* Sidebar filtres */}
          <aside className="h-fit xl:sticky xl:top-24">
            <div className="glass-panel-dark p-5 md:p-6">
              <div className="mb-5">
                <p className="text-xs uppercase tracking-[0.18em] text-cyan-300/80">
                  Navigation
                </p>
                <h2 className="mt-2 text-xl font-semibold tracking-[-0.02em] text-white">
                  Affiner votre recherche
                </h2>
                <p className="mt-2 text-sm leading-6 text-white/55">
                  Filtrez et triez les produits pour trouver le modèle qui vous
                  correspond.
                </p>
              </div>

              <RefinementList sortBy={sort} />
            </div>
          </aside>

          {/* Produits */}
          <section className="section-shell p-5 md:p-6">
            <div className="mb-6 flex flex-col gap-4 border-b border-white/10 pb-5 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.18em] text-cyan-300/80">
                  Catalogue
                </p>
                <h2 className="mt-2 text-2xl md:text-3xl font-semibold tracking-[-0.03em] text-white">
                  Tous les produits
                </h2>
              </div>

              <p className="text-sm text-white/45">
                Tri actuel : <span className="text-white/70">{sort}</span>
              </p>
            </div>

            <Suspense fallback={<SkeletonProductGrid />}>
              <PaginatedProducts
                sortBy={sort}
                page={pageNumber}
                countryCode={countryCode}
              />
            </Suspense>
          </section>
        </div>
      </div>
    </div>
  )
}

export default StoreTemplate
