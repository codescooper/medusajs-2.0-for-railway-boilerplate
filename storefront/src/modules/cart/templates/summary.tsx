"use client"

import { Button } from "@medusajs/ui"

import CartTotals from "@modules/common/components/cart-totals"
import Divider from "@modules/common/components/divider"
import DiscountCode from "@modules/checkout/components/discount-code"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { HttpTypes } from "@medusajs/types"

type SummaryProps = {
  cart: HttpTypes.StoreCart & {
    promotions: HttpTypes.StorePromotion[]
  }
}

function getCheckoutStep(cart: HttpTypes.StoreCart) {
  if (!cart?.shipping_address?.address_1 || !cart.email) {
    return "address"
  } else if (cart?.shipping_methods?.length === 0) {
    return "delivery"
  } else {
    return "payment"
  }
}

const Summary = ({ cart }: SummaryProps) => {
  const step = getCheckoutStep(cart)

  return (
    <div className="flex flex-col gap-y-6 text-white">
      <div className="space-y-3">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-[11px] uppercase tracking-[0.22em] text-cyan-300/75">
              Commande
            </p>
            <h2 className="mt-2 text-2xl font-semibold tracking-[-0.03em] text-white md:text-3xl">
              Résumé
            </h2>
          </div>

          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/60">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-300" />
            {cart.items?.length || 0} article{(cart.items?.length || 0) > 1 ? "s" : ""}
          </span>
        </div>

        <p className="max-w-sm text-sm leading-relaxed text-white/55">
          Vérifiez votre commande avant de finaliser votre achat dans un parcours
          fluide, clair et sécurisé.
        </p>
      </div>

      <div className="rounded-[1.35rem] border border-white/10 bg-white/[0.05] p-4 shadow-[0_10px_35px_rgba(0,0,0,0.18)] backdrop-blur-xl">
        <DiscountCode cart={cart} />
      </div>

      <div className="opacity-40">
        <Divider />
      </div>

      <div className="relative overflow-hidden rounded-[1.5rem] border border-white/10 bg-gradient-to-b from-white/[0.07] to-white/[0.03] p-4 shadow-[0_12px_40px_rgba(0,0,0,0.22)]">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent" />
        <div className="pointer-events-none absolute -right-6 -top-6 h-20 w-20 rounded-full bg-white/5 blur-2xl" />

        <CartTotals totals={cart} />
      </div>

      <LocalizedClientLink
        href={"/checkout?step=" + step}
        data-testid="checkout-button"
        className="w-full"
      >
        <Button
          className="
            h-12 w-full rounded-full
            border border-white/10
            bg-gradient-to-r from-[#d8f3ff] via-[#8be3ff] to-[#71cfff]
            text-black font-semibold tracking-[-0.01em]
            shadow-[0_10px_30px_rgba(94,211,255,0.22)]
            transition-all duration-300
            hover:scale-[1.015]
            hover:shadow-[0_16px_40px_rgba(94,211,255,0.28)]
          "
        >
          Passer au paiement
        </Button>
      </LocalizedClientLink>

      <div className="rounded-[1.2rem] border border-white/10 bg-white/[0.04] px-4 py-3 text-center">
        <p className="text-xs leading-relaxed text-white/45">
          Paiement sécurisé • Livraison rapide • Assistance disponible
        </p>
      </div>
    </div>
  )
}

export default Summary
