import { sdk } from "@lib/config"
import { cache } from "react"
import { HttpTypes } from "@medusajs/types"

// Shipping actions
export const listCartShippingMethods = cache(async function (cartId: string) {
  return sdk.store.fulfillment
    .listCartOptions({ cart_id: cartId }, { next: { tags: ["shipping"] } })
    .then(({ shipping_options }) => shipping_options)
    .catch(() => {
      return null
    })
})

export const calculatePriceForShippingOption = async (
  optionId: string,
  cartId: string,
  data?: Record<string, unknown>
) => {
  return sdk.store.fulfillment
    .calculateOptionPrice(
      { cart_id: cartId, option_id: optionId, data },
      { next: { tags: ["shipping"] } }
    )
    .then((response) => {
      // Extract the shipping option from the response
      if (response && "shipping_option" in response) {
        return response.shipping_option
      }
      return response
    })
    .catch(() => {
      return null
    })
}
