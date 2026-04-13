"use client"

import Back from "@modules/common/icons/back"
import FastDelivery from "@modules/common/icons/fast-delivery"
import Refresh from "@modules/common/icons/refresh"

import Accordion from "./accordion"
import { HttpTypes } from "@medusajs/types"

type ProductTabsProps = {
  product: HttpTypes.StoreProduct
}

const ProductTabs = ({ product }: ProductTabsProps) => {
  const tabs = [
    {
      label: "Informations produit",
      component: <ProductInfoTab product={product} />,
    },
    {
      label: "Livraison & retours",
      component: <ShippingInfoTab />,
    },
  ]

  return (
    <div className="w-full text-white">
      <Accordion type="multiple">
        {tabs.map((tab, i) => (
          <Accordion.Item
            key={i}
            title={tab.label}
            headingSize="medium"
            value={tab.label}
          >
            {tab.component}
          </Accordion.Item>
        ))}
      </Accordion>
    </div>
  )
}

const ProductInfoTab = ({ product }: ProductTabsProps) => {
  return (
    <div className="py-6 text-sm text-white/70">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div className="flex flex-col gap-y-5">
          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
            <span className="text-xs uppercase tracking-[0.14em] text-cyan-300/80">
              Matière
            </span>
            <p className="mt-2 text-sm font-medium text-white">
              {product.material ? product.material : "-"}
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
            <span className="text-xs uppercase tracking-[0.14em] text-cyan-300/80">
              Pays d'origine
            </span>
            <p className="mt-2 text-sm font-medium text-white">
              {product.origin_country ? product.origin_country : "-"}
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
            <span className="text-xs uppercase tracking-[0.14em] text-cyan-300/80">
              Type
            </span>
            <p className="mt-2 text-sm font-medium text-white">
              {product.type ? product.type.value : "-"}
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-y-5">
          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
            <span className="text-xs uppercase tracking-[0.14em] text-cyan-300/80">
              Poids
            </span>
            <p className="mt-2 text-sm font-medium text-white">
              {product.weight ? `${product.weight} g` : "-"}
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
            <span className="text-xs uppercase tracking-[0.14em] text-cyan-300/80">
              Dimensions
            </span>
            <p className="mt-2 text-sm font-medium text-white">
              {product.length && product.width && product.height
                ? `${product.length}L x ${product.width}l x ${product.height}H`
                : "-"}
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
            <span className="text-xs uppercase tracking-[0.14em] text-cyan-300/80">
              Confort visuel
            </span>
            <p className="mt-2 text-sm font-medium text-white">
              Pensé pour allier élégance, maintien et confort au quotidien.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

const ShippingInfoTab = () => {
  return (
    <div className="py-6 text-sm text-white/70">
      <div className="grid grid-cols-1 gap-y-5">
        <div className="flex items-start gap-x-3 rounded-2xl border border-white/10 bg-white/[0.04] p-4">
          <div className="mt-0.5 text-cyan-300/90">
            <FastDelivery />
          </div>
          <div>
            <span className="text-sm font-semibold text-white">
              Livraison rapide
            </span>
            <p className="mt-2 max-w-sm leading-6 text-white/65">
              Votre commande est préparée avec soin et livrée dans les meilleurs
              délais selon votre zone.
            </p>
          </div>
        </div>

        <div className="flex items-start gap-x-3 rounded-2xl border border-white/10 bg-white/[0.04] p-4">
          <div className="mt-0.5 text-cyan-300/90">
            <Refresh />
          </div>
          <div>
            <span className="text-sm font-semibold text-white">
              Échanges simplifiés
            </span>
            <p className="mt-2 max-w-sm leading-6 text-white/65">
              Si le produit ne correspond pas parfaitement à vos attentes,
              nous vous accompagnons pour trouver une solution adaptée.
            </p>
          </div>
        </div>

        <div className="flex items-start gap-x-3 rounded-2xl border border-white/10 bg-white/[0.04] p-4">
          <div className="mt-0.5 text-cyan-300/90">
            <Back />
          </div>
          <div>
            <span className="text-sm font-semibold text-white">
              Retours faciles
            </span>
            <p className="mt-2 max-w-sm leading-6 text-white/65">
              En cas de besoin, notre équipe vous guide dans le processus de
              retour pour une expérience simple et rassurante.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductTabs
