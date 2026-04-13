import ChevronDown from "@modules/common/icons/chevron-down"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { convertToLocale } from "@lib/util/money"
import { HttpTypes } from "@medusajs/types"

type OverviewProps = {
  customer: HttpTypes.StoreCustomer | null
  orders: HttpTypes.StoreOrder[] | null
}

const Overview = ({ customer, orders }: OverviewProps) => {
  return (
    <div className="flex flex-col gap-8 text-white" data-testid="overview-page-wrapper">
      {/* Header */}
      <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-cyan-300/70">
            Espace client
          </p>

          <h1
            className="text-3xl md:text-4xl font-semibold tracking-[-0.03em] text-white"
            data-testid="welcome-message"
            data-value={customer?.first_name}
          >
            Bonjour {customer?.first_name || "client"}
          </h1>

          <p className="mt-2 text-sm text-white/50">
            Connecté avec{" "}
            <span
              className="font-medium text-white/75"
              data-testid="customer-email"
              data-value={customer?.email}
            >
              {customer?.email || "-"}
            </span>
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="glass-panel p-6">
          <p className="text-sm text-white/60">Profil complété</p>

          <div className="mt-2 flex items-end gap-2">
            <span
              className="text-4xl font-semibold leading-none text-white"
              data-testid="customer-profile-completion"
              data-value={getProfileCompletion(customer)}
            >
              {getProfileCompletion(customer)}%
            </span>
            <span className="pb-1 text-xs uppercase tracking-[0.14em] text-white/40">
              terminé
            </span>
          </div>
        </div>

        <div className="glass-panel p-6">
          <p className="text-sm text-white/60">Adresses enregistrées</p>

          <div className="mt-2 flex items-end gap-2">
            <span
              className="text-4xl font-semibold leading-none text-white"
              data-testid="addresses-count"
              data-value={customer?.addresses?.length || 0}
            >
              {customer?.addresses?.length || 0}
            </span>
            <span className="pb-1 text-xs uppercase tracking-[0.14em] text-white/40">
              sauvegardées
            </span>
          </div>
        </div>
      </div>

      {/* Orders */}
      <div className="glass-panel p-6">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-semibold tracking-[-0.02em] text-white">
            Commandes récentes
          </h2>
        </div>

        <ul className="flex flex-col gap-y-4" data-testid="orders-wrapper">
          {orders && orders.length > 0 ? (
            orders.slice(0, 5).map((order) => {
              return (
                <li
                  key={order.id}
                  data-testid="order-wrapper"
                  data-value={order.id}
                >
                  <LocalizedClientLink href={`/account/orders/details/${order.id}`}>
                    <div
                      className="
                        flex items-center justify-between gap-4 rounded-[1rem]
                        border border-white/10 bg-white/[0.03] p-4
                        transition hover:bg-white/[0.06]
                      "
                    >
                      <div className="grid flex-1 grid-cols-1 gap-4 text-sm md:grid-cols-3">
                        <div>
                          <p className="text-white/45">Date</p>
                          <p className="text-white" data-testid="order-created-date">
                            {new Date(order.created_at).toLocaleDateString()}
                          </p>
                        </div>

                        <div>
                          <p className="text-white/45">Commande</p>
                          <p
                            className="text-white"
                            data-testid="order-id"
                            data-value={order.display_id}
                          >
                            #{order.display_id}
                          </p>
                        </div>

                        <div>
                          <p className="text-white/45">Total</p>
                          <p className="font-medium text-white" data-testid="order-amount">
                            {convertToLocale({
                              amount: order.total,
                              currency_code: order.currency_code,
                            })}
                          </p>
                        </div>
                      </div>

                      <span
                        className="flex items-center justify-between text-white/40"
                        data-testid="open-order-button"
                      >
                        <span className="sr-only">
                          Aller à la commande #{order.display_id}
                        </span>
                        <ChevronDown className="-rotate-90" />
                      </span>
                    </div>
                  </LocalizedClientLink>
                </li>
              )
            })
          ) : (
            <p className="text-sm text-white/50" data-testid="no-orders-message">
              Aucune commande récente
            </p>
          )}
        </ul>
      </div>
    </div>
  )
}

const getProfileCompletion = (customer: HttpTypes.StoreCustomer | null) => {
  let count = 0

  if (!customer) {
    return 0
  }

  if (customer.email) {
    count++
  }

  if (customer.first_name && customer.last_name) {
    count++
  }

  if (customer.phone) {
    count++
  }

  const billingAddress = customer.addresses?.find(
    (addr) => addr.is_default_billing
  )

  if (billingAddress) {
    count++
  }

  return Math.round((count / 4) * 100)
}

export default Overview
