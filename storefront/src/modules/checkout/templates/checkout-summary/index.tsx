import { Heading } from "@medusajs/ui"

import ItemsPreviewTemplate from "@modules/cart/templates/preview"
import DiscountCode from "@modules/checkout/components/discount-code"
import CartTotals from "@modules/common/components/cart-totals"
import Divider from "@modules/common/components/divider"

const CheckoutSummary = ({ cart }: { cart: any }) => {
  const itemCount =
    cart?.items?.reduce((acc: number, item: any) => acc + item.quantity, 0) || 0

  return (
    <div className="sticky top-24 flex flex-col gap-y-6 py-8 small:py-0">
      <div className="relative overflow-hidden rounded-[1.75rem] border border-white/10 bg-gradient-to-b from-white/[0.07] to-white/[0.03] p-5 text-white shadow-[0_12px_40px_rgba(0,0,0,0.22)] backdrop-blur-xl md:p-6">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
        <div className="pointer-events-none absolute -right-8 -top-8 h-28 w-28 rounded-full bg-white/10 blur-2xl" />
        <div className="pointer-events-none absolute left-[-40px] bottom-[10%] h-24 w-24 rounded-full bg-cyan-300/10 blur-2xl" />

        <div className="relative">
          <div className="mb-6 flex items-start justify-between gap-4">
            <div>
              <span className="eyebrow-lgv">Commande</span>
              <Heading
                level="h2"
                className="mt-2 text-2xl font-semibold tracking-[-0.03em] text-white md:text-3xl"
              >
                Résumé de commande
              </Heading>
              <p className="mt-3 max-w-sm text-sm leading-relaxed text-white/55">
                Retrouvez ici l'essentiel de votre sélection avant de finaliser votre commande.
              </p>
            </div>

            {itemCount > 0 && (
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.05] px-3 py-1.5 text-xs text-white/60">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-300" />
                {itemCount} article{itemCount > 1 ? "s" : ""}
              </div>
            )}
          </div>

          <div className="rounded-[1.4rem] border border-white/10 bg-white/[0.04] p-4 md:p-5">
            <CartTotals totals={cart} />
          </div>

          <div className="my-6 opacity-40">
            <Divider />
          </div>

          <div className="rounded-[1.4rem] border border-white/10 bg-white/[0.04] p-4 md:p-5">
            <DiscountCode cart={cart} />
          </div>

          <div className="my-6 opacity-40">
            <Divider />
          </div>

          <div className="rounded-[1.4rem] border border-white/10 bg-white/[0.03] p-4 md:p-5">
            <ItemsPreviewTemplate cart={cart} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default CheckoutSummary
