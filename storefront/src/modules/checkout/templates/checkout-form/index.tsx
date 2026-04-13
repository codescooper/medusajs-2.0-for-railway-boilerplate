import { listCartShippingMethods } from "@lib/data/fulfillment"
import { listCartPaymentMethods } from "@lib/data/payment"
import { HttpTypes } from "@medusajs/types"
import Addresses from "@modules/checkout/components/addresses"
import Payment from "@modules/checkout/components/payment"
import Review from "@modules/checkout/components/review"
import Shipping from "@modules/checkout/components/shipping"

export default async function CheckoutForm({
  cart,
  customer,
}: {
  cart: HttpTypes.StoreCart | null
  customer: HttpTypes.StoreCustomer | null
}) {
  if (!cart) {
    return null
  }

  const shippingMethods = await listCartShippingMethods(cart.id)
  const paymentMethods = await listCartPaymentMethods(cart.region?.id ?? "")

  if (!shippingMethods || !paymentMethods) {
    return null
  }

  return (
    <section className="relative w-full">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-[-80px] top-[8%] h-40 w-40 rounded-full bg-cyan-300/10 blur-3xl" />
        <div className="absolute right-[-60px] top-[38%] h-44 w-44 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute left-[10%] bottom-[8%] h-36 w-36 rounded-full bg-emerald-200/10 blur-3xl" />
      </div>

      <div className="mb-10">
        <span className="eyebrow-lgv">Checkout</span>

        <h1 className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-white md:text-5xl">
          Finalisez votre commande
        </h1>

        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-white/55 md:text-base">
          Renseignez vos informations, choisissez votre mode de livraison et
          finalisez votre paiement dans un parcours fluide, clair et sécurisé.
        </p>

        <div className="mt-6 flex flex-wrap items-center gap-3 text-sm text-white/50">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-cyan-300" />
            Livraison
          </span>
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-300" />
            Paiement sécurisé
          </span>
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-white/60" />
            Validation finale
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-y-8">
        <Addresses cart={cart} customer={customer} />

        <Shipping cart={cart} availableShippingMethods={shippingMethods} />

        <Payment cart={cart} availablePaymentMethods={paymentMethods} />

        <Review cart={cart} />
      </div>
    </section>
  )
}
