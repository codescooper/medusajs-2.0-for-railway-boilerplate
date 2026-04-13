"use client"

import { Button } from "@medusajs/ui"

import OrderCard from "../order-card"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { HttpTypes } from "@medusajs/types"

const OrderOverview = ({ orders }: { orders: HttpTypes.StoreOrder[] }) => {
  if (orders?.length) {
    return (
      <div className="flex w-full flex-col gap-y-5">
        {orders.map((order) => (
          <div
            key={order.id}
            className="pb-1"
          >
            <OrderCard order={order} />
          </div>
        ))}
      </div>
    )
  }

  return (
    <div
      className="flex w-full flex-col items-center gap-y-5 rounded-[1.75rem] border border-white/10 bg-white/[0.04] px-6 py-10 text-center backdrop-blur-xl"
      data-testid="no-orders-container"
    >
      <span className="eyebrow-lgv">Commandes</span>

      <h2 className="text-2xl md:text-3xl font-semibold tracking-[-0.03em] text-white">
        Aucune commande pour le moment
      </h2>

      <p className="max-w-md text-sm leading-7 text-white/55 md:text-base">
        Vous n'avez pas encore passé de commande. Découvrez notre sélection
        et trouvez la monture qui vous correspond.
      </p>

      <div className="mt-2">
        <LocalizedClientLink href="/" passHref>
          <Button
            data-testid="continue-shopping-button"
            className="
              rounded-full
              bg-gradient-to-r from-cyan-400 to-blue-500
              font-semibold text-black
              transition-all duration-300
              hover:scale-[1.01]
              hover:shadow-lg hover:shadow-cyan-500/20
            "
          >
            Continuer mes achats
          </Button>
        </LocalizedClientLink>
      </div>
    </div>
  )
}

export default OrderOverview
