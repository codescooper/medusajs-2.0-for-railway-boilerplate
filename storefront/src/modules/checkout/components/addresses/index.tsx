"use client"

import { setAddresses } from "@lib/data/cart"
import compareAddresses from "@lib/util/compare-addresses"
import { CheckCircleSolid } from "@medusajs/icons"
import { HttpTypes } from "@medusajs/types"
import { Heading, Text, useToggleState } from "@medusajs/ui"
import Divider from "@modules/common/components/divider"
import Spinner from "@modules/common/icons/spinner"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useActionState } from "react"
import BillingAddress from "../billing_address"
import ErrorMessage from "../error-message"
import ShippingAddress from "../shipping-address"
import { SubmitButton } from "../submit-button"

const Addresses = ({
  cart,
  customer,
}: {
  cart: HttpTypes.StoreCart | null
  customer: HttpTypes.StoreCustomer | null
}) => {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()

  const isOpen = searchParams.get("step") === "address"

  const { state: sameAsBilling, toggle: toggleSameAsBilling } = useToggleState(
    cart?.shipping_address && cart?.billing_address
      ? compareAddresses(cart.shipping_address, cart.billing_address)
      : true
  )

  const handleEdit = () => {
    router.push(pathname + "?step=address")
  }

  const [message, formAction] = useActionState(setAddresses, null)

  return (
    <div className="rounded-[1.75rem] border border-white/10 bg-gradient-to-b from-white/[0.07] to-white/[0.03] p-5 text-white shadow-[0_12px_40px_rgba(0,0,0,0.2)] backdrop-blur-xl md:p-6">

      {/* HEADER */}
      <div className="flex items-center justify-between mb-6">
        <Heading className="text-xl md:text-2xl font-semibold tracking-[-0.02em] flex items-center gap-2">
          Adresse de livraison
          {!isOpen && <CheckCircleSolid className="text-emerald-400" />}
        </Heading>

        {!isOpen && cart?.shipping_address && (
          <button
            onClick={handleEdit}
            className="text-sm text-white/50 hover:text-white transition"
            data-testid="edit-address-button"
          >
            Modifier
          </button>
        )}
      </div>

      {isOpen ? (
        <form action={formAction}>
          <div className="space-y-6">
            <div className="rounded-[1.2rem] border border-white/10 bg-white/[0.04] p-4">
              <ShippingAddress
                customer={customer}
                checked={sameAsBilling}
                onChange={toggleSameAsBilling}
                cart={cart}
              />
            </div>

            {!sameAsBilling && (
              <div className="rounded-[1.2rem] border border-white/10 bg-white/[0.04] p-4">
                <Heading className="mb-4 text-lg text-white">
                  Adresse de facturation
                </Heading>
                <BillingAddress cart={cart} />
              </div>
            )}

            <SubmitButton
              className="mt-4 w-full rounded-full bg-white text-black hover:bg-white/90"
              data-testid="submit-address-button"
            >
              Continuer vers la livraison
            </SubmitButton>

            <ErrorMessage error={message} />
          </div>
        </form>
      ) : (
        <div className="text-sm text-white/70">
          {cart?.shipping_address ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

              <div className="rounded-[1rem] border border-white/10 bg-white/[0.04] p-3">
                <p className="text-white text-xs mb-2">Livraison</p>
                <p>{cart.shipping_address.first_name} {cart.shipping_address.last_name}</p>
                <p>{cart.shipping_address.address_1}</p>
                <p>{cart.shipping_address.city}</p>
                <p>{cart.shipping_address.country_code?.toUpperCase()}</p>
              </div>

              <div className="rounded-[1rem] border border-white/10 bg-white/[0.04] p-3">
                <p className="text-white text-xs mb-2">Contact</p>
                <p>{cart.shipping_address.phone}</p>
                <p>{cart.email}</p>
              </div>

              <div className="rounded-[1rem] border border-white/10 bg-white/[0.04] p-3">
                <p className="text-white text-xs mb-2">Facturation</p>

                {sameAsBilling ? (
                  <p>Même que livraison</p>
                ) : (
                  <>
                    <p>{cart.billing_address?.first_name} {cart.billing_address?.last_name}</p>
                    <p>{cart.billing_address?.address_1}</p>
                    <p>{cart.billing_address?.city}</p>
                  </>
                )}
              </div>

            </div>
          ) : (
            <Spinner />
          )}
        </div>
      )}

      <Divider className="mt-6 opacity-30" />
    </div>
  )
}

export default Addresses
