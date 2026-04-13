import React, { Suspense } from "react"
import { notFound } from "next/navigation"
import { HttpTypes } from "@medusajs/types"

import ImageGallery from "@modules/products/components/image-gallery"
import ProductActions from "@modules/products/components/product-actions"
import ProductOnboardingCta from "@modules/products/components/product-onboarding-cta"
import ProductTabs from "@modules/products/components/product-tabs"
import RelatedProducts from "@modules/products/components/related-products"
import ProductInfo from "@modules/products/templates/product-info"
import SkeletonRelatedProducts from "@modules/skeletons/templates/skeleton-related-products"

import ProductActionsWrapper from "./product-actions-wrapper"

type ProductTemplateProps = {
  product: HttpTypes.StoreProduct
  region: HttpTypes.StoreRegion
  countryCode: string
  images?: HttpTypes.StoreProductImage[]
}

const ProductTemplate: React.FC<ProductTemplateProps> = ({
  product,
  region,
  countryCode,
  images,
}) => {
  if (!product || !product.id) {
    return notFound()
  }

  return (
    <>
      <section
        className="relative overflow-hidden py-8 md:py-12 xl:py-16"
        data-testid="product-container"
      >
        {/* orbes décoratifs */}
        <div className="floating-orb left-[-80px] top-[80px] h-[220px] w-[220px] bg-cyan-400/20 animate-float-slow" />
        <div className="floating-orb right-[-100px] top-[120px] h-[260px] w-[260px] bg-blue-500/20 animate-float-soft" />

        <div className="content-container">
          {/* Intro produit */}
          <div className="mb-8 md:mb-10">
            <span className="eyebrow-lgv">Produit</span>
            <h1
              className="section-title-lgv max-w-[14ch]"
              data-testid="product-main-title"
            >
              {product.title}
            </h1>

            {product.subtitle && (
              <p className="section-subtitle-lgv mt-4 max-w-2xl">
                {product.subtitle}
              </p>
            )}
          </div>

          {/* Layout principal */}
          <div className="grid gap-6 xl:grid-cols-[320px_minmax(0,1fr)_360px] xl:gap-8">
            {/* Colonne gauche */}
            <aside className="h-fit xl:sticky xl:top-24">
              <div className="glass-panel-dark p-5 md:p-6">
                <ProductInfo product={product} />

                <div className="my-6 border-t border-white/10" />

                <ProductTabs product={product} />
              </div>
            </aside>

            {/* Galerie */}
            <div className="section-shell p-3 md:p-4">
              <ImageGallery images={images} />
            </div>

            {/* Colonne droite achat */}
            <aside className="h-fit xl:sticky xl:top-24">
              <div className="hero-panel p-5 md:p-6">
                <div className="mb-6">
                  <p className="text-xs uppercase tracking-[0.18em] text-cyan-300/80">
                    Achat
                  </p>
                  <h2 className="mt-2 text-2xl md:text-3xl font-semibold tracking-[-0.03em] text-white">
                    Commande rapide
                  </h2>
                  <p className="mt-3 text-sm leading-6 text-white/55">
                    Choisissez vos options, vérifiez votre prix, puis ajoutez ce
                    modèle à votre panier en toute simplicité.
                  </p>
                </div>

                <div className="mb-5">
                  <ProductOnboardingCta />
                </div>

                <Suspense
                  fallback={
                    <ProductActions
                      disabled={true}
                      product={product}
                      region={region}
                    />
                  }
                >
                  <ProductActionsWrapper id={product.id} region={region} />
                </Suspense>

                <div className="mt-6 border-t border-white/10 pt-5">
                  <div className="flex flex-wrap gap-2">
                    <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs text-white/55">
                      Livraison rapide
                    </span>
                    <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs text-white/55">
                      Paiement sécurisé
                    </span>
                    <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs text-white/55">
                      Assistance disponible
                    </span>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* Produits liés */}
      <section
        className="pb-16 pt-10 md:pb-24 md:pt-16"
        data-testid="related-products-container"
      >
        <div className="content-container">
          <div className="mb-8 md:mb-10 flex flex-col items-center text-center">
            <span className="eyebrow-lgv">Sélection complémentaire</span>
            <h2 className="section-title-lgv max-w-[14ch]">
              Vous pourriez aussi aimer
            </h2>
            <p className="section-subtitle-lgv mt-4 max-w-2xl">
              D'autres modèles choisis dans le même esprit de confort, de style
              et de précision visuelle.
            </p>
          </div>

          <div className="section-shell p-5 md:p-6">
            <Suspense fallback={<SkeletonRelatedProducts />}>
              <RelatedProducts product={product} countryCode={countryCode} />
            </Suspense>
          </div>
        </div>
      </section>
    </>
  )
}

export default ProductTemplate
