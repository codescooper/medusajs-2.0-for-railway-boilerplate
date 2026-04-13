import { Container, Heading, Text } from "@medusajs/ui"

import { isStripeLike, paymentInfoMap } from "@lib/constants"
import Divider from "@modules/common/components/divider"
import { convertToLocale } from "@lib/util/money"
import { HttpTypes } from "@medusajs/types"

type PaymentDetailsProps = {
  order: HttpTypes.StoreOrder
}

const PaymentDetails = ({ order }: PaymentDetailsProps) => {
  const payment = order.payment_collections?.[0]?.payments?.[0]

  return (
    <div className="text-white">
      <Heading
        level="h2"
        className="mb-5 text-2xl font-semibold tracking-[-0.03em] text-white md:text-3xl"
      >
        Paiement
      </Heading>

      <div>
        {payment && (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-[1fr_2fr]">
            <div className="rounded-[1.2rem] border border-white/10 bg-white/[0.04] p-4 md:p-5">
              <Text className="mb-2 text-xs uppercase tracking-[0.18em] text-cyan-300/75">
                Méthode
              </Text>

              <Text
                className="text-sm text-white/75"
                data-testid="payment-method"
              >
                {paymentInfoMap[payment.provider_id]?.title || payment.provider_id}
              </Text>
            </div>

            <div className="rounded-[1.2rem] border border-white/10 bg-white/[0.04] p-4 md:p-5">
              <Text className="mb-2 text-xs uppercase tracking-[0.18em] text-cyan-300/75">
                Détails
              </Text>

              <div className="flex items-center gap-3 text-sm text-white/70">
                <Container className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/[0.06] p-2 text-white/80">
                  {paymentInfoMap[payment.provider_id]?.icon}
                </Container>

                <Text data-testid="payment-amount" className="text-sm text-white/70">
                  {isStripeLike(payment.provider_id) && payment.data?.card_last4
                    ? `**** **** **** ${payment.data.card_last4}`
                    : `${convertToLocale({
                        amount: payment.amount,
                        currency_code: order.currency_code,
                      })} payé le ${new Date(
                        payment.created_at ?? ""
                      ).toLocaleString()}`}
                </Text>
              </div>
            </div>
          </div>
        )}
      </div>

      <Divider className="mt-8" />
    </div>
  )
}

export default PaymentDetails
