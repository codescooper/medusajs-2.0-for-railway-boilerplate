import { convertToLocale } from "@lib/util/money"
import { HttpTypes } from "@medusajs/types"
import { Heading, Text } from "@medusajs/ui"

import Divider from "@modules/common/components/divider"

type ShippingDetailsProps = {
  order: HttpTypes.StoreOrder
}

const ShippingDetails = ({ order }: ShippingDetailsProps) => {
  return (
    <div className="text-white">
      <Heading
        level="h2"
        className="mb-5 text-2xl font-semibold tracking-[-0.03em] text-white md:text-3xl"
      >
        Livraison
      </Heading>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <div
          className="rounded-[1.2rem] border border-white/10 bg-white/[0.04] p-4 md:p-5"
          data-testid="shipping-address-summary"
        >
          <Text className="mb-2 text-xs uppercase tracking-[0.18em] text-cyan-300/75">
            Adresse
          </Text>

          <Text className="text-sm text-white/75">
            {order.shipping_address?.first_name}{" "}
            {order.shipping_address?.last_name}
          </Text>
          <Text className="text-sm text-white/60">
            {order.shipping_address?.address_1}{" "}
            {order.shipping_address?.address_2}
          </Text>
          <Text className="text-sm text-white/60">
            {order.shipping_address?.postal_code},{" "}
            {order.shipping_address?.city}
          </Text>
          <Text className="text-sm text-white/60">
            {order.shipping_address?.country_code?.toUpperCase()}
          </Text>
        </div>

        <div
          className="rounded-[1.2rem] border border-white/10 bg-white/[0.04] p-4 md:p-5"
          data-testid="shipping-contact-summary"
        >
          <Text className="mb-2 text-xs uppercase tracking-[0.18em] text-cyan-300/75">
            Contact
          </Text>

          <Text className="text-sm text-white/75">
            {order.shipping_address?.phone}
          </Text>
          <Text className="text-sm text-white/60">{order.email}</Text>
        </div>

        <div
          className="rounded-[1.2rem] border border-white/10 bg-white/[0.04] p-4 md:p-5"
          data-testid="shipping-method-summary"
        >
          <Text className="mb-2 text-xs uppercase tracking-[0.18em] text-cyan-300/75">
            Méthode
          </Text>

          <Text className="text-sm text-white/75">
            {(order as any).shipping_methods?.[0]?.name} (
            {convertToLocale({
              amount: order.shipping_methods?.[0]?.total ?? 0,
              currency_code: order.currency_code,
            })}
            )
          </Text>
        </div>
      </div>

      <Divider className="mt-8" />
    </div>
  )
}

export default ShippingDetails
