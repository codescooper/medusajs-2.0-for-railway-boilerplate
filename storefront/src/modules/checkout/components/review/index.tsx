"use client"

import { Heading, Text, clx } from "@medusajs/ui"
import { useSearchParams } from "next/navigation"

import PaymentButton from "../payment-button"

const Review = ({ cart }: { cart: any }) => {
  const searchParams = useSearchParams()

  const isOpen = searchParams.get("step") === "review"

  const paidByGiftcard =
    cart?.gift_cards && cart?.gift_cards?.length > 0 && cart?.total === 0

  const previousStepsCompleted =
    cart.shipping_address &&
    cart.shipping_methods.length > 0 &&
    (cart.payment_collection || paidByGiftcard)

  return (
    <div className="rounded-[1.75rem] border border-white/10 bg-gradient-to-b from-white/[0.07] to-white/[0.03] p-5 text-white shadow-[0_12px_40px_rgba(0,0,0,0.22)] backdrop-blur-xl md:p-6">
      <div className="mb-6 flex flex-row items-center justify-between">
        <Heading
          level="h2"
          className={clx(
            "flex flex-row items-baseline gap-x-2 text-2xl font-semibold tracking-[-0.03em] text-white md:text-3xl",
            {
              "pointer-events-none select-none opacity-50": !isOpen,
            }
          )}
        >
          Vérification finale
        </Heading>
      </div>

      {isOpen && previousStepsCompleted && (
        <>
          <div className="mb-6 w-full rounded-[1.2rem] border border-white/10 bg-white/[0.04] p-4 md:p-5">
            <div className="w-full">
              <Text className="mb-2 text-xs uppercase tracking-[0.18em] text-cyan-300/75">
                Confirmation
              </Text>

              <Text className="text-sm leading-relaxed text-white/65">
                En cliquant sur le bouton de validation, vous confirmez avoir
                lu et accepté nos conditions d'utilisation, nos conditions de
                vente, notre politique de retour ainsi que notre politique de
                confidentialité.
              </Text>
            </div>
          </div>

          <div className="rounded-[1.2rem] border border-white/10 bg-white/[0.03] p-4 md:p-5">
            <PaymentButton cart={cart} data-testid="submit-order-button" />
          </div>
        </>
      )}
    </div>
  )
}

export default Review
