import { Heading } from "@medusajs/ui"
import { cookies as nextCookies } from "next/headers"

import CartTotals from "@modules/common/components/cart-totals"
import Help from "@modules/order/components/help"
import Items from "@modules/order/components/items"
import OnboardingCta from "@modules/order/components/onboarding-cta"
import OrderDetails from "@modules/order/components/order-details"
import ShippingDetails from "@modules/order/components/shipping-details"
import PaymentDetails from "@modules/order/components/payment-details"
import { HttpTypes } from "@medusajs/types"

type OrderCompletedTemplateProps = {
  order: HttpTypes.StoreOrder
}

export default async function OrderCompletedTemplate({
  order,
}: OrderCompletedTemplateProps) {
  const cookies = await nextCookies()

  const isOnboarding = cookies.get("_medusa_onboarding")?.value === "true"

  return (
    <div className="relative min-h-[calc(100vh-64px)] overflow-hidden py-8 md:py-10">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-[-120px] top-[8%] h-72 w-72 rounded-full bg-cyan-300/10 blur-3xl" />
        <div className="absolute right-[-100px] top-[24%] h-80 w-80 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute left-[18%] bottom-[8%] h-64 w-64 rounded-full bg-emerald-200/10 blur-3xl" />
      </div>

      <div className="content-container flex h-full w-full max-w-4xl flex-col items-center justify-center gap-y-10">
        {isOnboarding && <OnboardingCta orderId={order.id} />}

        <div
          className="w-full max-w-4xl rounded-[2rem] border border-white/10 bg-gradient-to-b from-white/[0.07] to-white/[0.03] px-5 py-8 text-white shadow-[0_16px_50px_rgba(0,0,0,0.24)] backdrop-blur-xl md:px-8 md:py-10"
          data-testid="order-complete-container"
        >
          <Heading
            level="h1"
            className="mb-8 flex flex-col gap-y-3 text-3xl font-semibold tracking-[-0.04em] text-white md:text-5xl"
          >
            <span>Merci.</span>
            <span>Votre commande a bien été enregistrée.</span>
          </Heading>

          <div className="mb-8 rounded-[1.4rem] border border-white/10 bg-white/[0.04] p-5">
            <OrderDetails order={order} />
          </div>

          <Heading
            level="h2"
            className="mb-5 text-2xl font-semibold tracking-[-0.03em] text-white md:text-3xl"
          >
            Résumé
          </Heading>

          <div className="space-y-6">
            <div className="rounded-[1.4rem] border border-white/10 bg-white/[0.03] p-5">
              <Items order={order} />
            </div>

            <div className="rounded-[1.4rem] border border-white/10 bg-white/[0.04] p-5">
              <CartTotals totals={order} />
            </div>

            <div className="rounded-[1.4rem] border border-white/10 bg-white/[0.03] p-5">
              <ShippingDetails order={order} />
            </div>

            <div className="rounded-[1.4rem] border border-white/10 bg-white/[0.03] p-5">
              <PaymentDetails order={order} />
            </div>

            <div className="rounded-[1.4rem] border border-white/10 bg-white/[0.03] p-5">
              <Help />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
