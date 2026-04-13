import { Radio as RadioGroupOption } from "@headlessui/react"
import { Text, clx } from "@medusajs/ui"
import React, { useContext, useMemo, type JSX } from "react"

import Radio from "@modules/common/components/radio"

import { isManual } from "@lib/constants"
import SkeletonCardDetails from "@modules/skeletons/components/skeleton-card-details"
import { CardElement } from "@stripe/react-stripe-js"
import { StripeCardElementOptions } from "@stripe/stripe-js"
import PaymentTest from "../payment-test"
import { StripeContext } from "../payment-wrapper/stripe-wrapper"

type PaymentContainerProps = {
  paymentProviderId: string
  selectedPaymentOptionId: string | null
  disabled?: boolean
  paymentInfoMap: Record<string, { title: string; icon: JSX.Element }>
  children?: React.ReactNode
}

const PaymentContainer: React.FC<PaymentContainerProps> = ({
  paymentProviderId,
  selectedPaymentOptionId,
  paymentInfoMap,
  disabled = false,
  children,
}) => {
  const isDevelopment = process.env.NODE_ENV === "development"
  const isSelected = selectedPaymentOptionId === paymentProviderId

  return (
    <RadioGroupOption
      key={paymentProviderId}
      value={paymentProviderId}
      disabled={disabled}
      className={clx(
        "mb-3 flex cursor-pointer flex-col gap-y-3 rounded-[1.35rem] border px-5 py-4 text-white transition-all duration-300",
        "bg-white/[0.04] backdrop-blur-xl",
        "border-white/10 hover:border-white/20 hover:bg-white/[0.06]",
        {
          "border-cyan-300/30 bg-white/[0.08] shadow-[0_10px_30px_rgba(0,0,0,0.18)]":
            isSelected,
          "opacity-50 pointer-events-none": disabled,
        }
      )}
    >
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-x-4">
          <Radio checked={isSelected} />
          <div className="flex flex-col">
            <Text className="text-sm font-medium text-white md:text-base">
              {paymentInfoMap[paymentProviderId]?.title || paymentProviderId}
            </Text>

            {isManual(paymentProviderId) && isDevelopment && (
              <PaymentTest className="mt-1 hidden text-[11px] text-white/45 small:block" />
            )}
          </div>
        </div>

        <span className="shrink-0 text-white/70">
          {paymentInfoMap[paymentProviderId]?.icon}
        </span>
      </div>

      {isManual(paymentProviderId) && isDevelopment && (
        <PaymentTest className="small:hidden text-[10px] text-white/45" />
      )}

      {children}
    </RadioGroupOption>
  )
}

export default PaymentContainer

export const StripeCardContainer = ({
  paymentProviderId,
  selectedPaymentOptionId,
  paymentInfoMap,
  disabled = false,
  setCardBrand,
  setError,
  setCardComplete,
}: Omit<PaymentContainerProps, "children"> & {
  setCardBrand: (brand: string) => void
  setError: (error: string | null) => void
  setCardComplete: (complete: boolean) => void
}) => {
  const stripeReady = useContext(StripeContext)

  const useOptions: StripeCardElementOptions = useMemo(() => {
    return {
      style: {
        base: {
          fontFamily: "Inter, sans-serif",
          fontSize: "14px",
          color: "#FFFFFF",
          iconColor: "#BFE9FF",
          "::placeholder": {
            color: "rgba(255,255,255,0.35)",
          },
        },
        invalid: {
          color: "#f87171",
          iconColor: "#f87171",
        },
      },
      classes: {
        base: "block w-full rounded-[1rem] border border-white/10 bg-white/[0.06] px-4 py-3 text-white shadow-[0_8px_24px_rgba(0,0,0,0.14)] transition-all duration-300 hover:border-white/20 hover:bg-white/[0.08] focus-within:border-cyan-300/30 focus-within:bg-white/[0.09]",
      },
    }
  }, [])

  return (
    <PaymentContainer
      paymentProviderId={paymentProviderId}
      selectedPaymentOptionId={selectedPaymentOptionId}
      paymentInfoMap={paymentInfoMap}
      disabled={disabled}
    >
      {selectedPaymentOptionId === paymentProviderId &&
        (stripeReady ? (
          <div className="mt-1 rounded-[1rem] border border-white/10 bg-black/10 p-4">
            <Text className="mb-3 text-sm font-medium text-white/75">
              Entrez les informations de votre carte
            </Text>

            <CardElement
              options={useOptions}
              onChange={(e) => {
                setCardBrand(
                  e.brand && e.brand.charAt(0).toUpperCase() + e.brand.slice(1)
                )
                setError(e.error?.message || null)
                setCardComplete(e.complete)
              }}
            />
          </div>
        ) : (
          <SkeletonCardDetails />
        ))}
    </PaymentContainer>
  )
}
