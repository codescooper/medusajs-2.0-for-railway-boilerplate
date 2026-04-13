import ItemsTemplate from "./items"
import Summary from "./summary"
import EmptyCartMessage from "../components/empty-cart-message"
import SignInPrompt from "../components/sign-in-prompt"
import Divider from "@modules/common/components/divider"
import { HttpTypes } from "@medusajs/types"

const CartTemplate = ({
  cart,
  customer,
}: {
  cart: HttpTypes.StoreCart | null
  customer: HttpTypes.StoreCustomer | null
}) => {
  const hasItems = !!cart?.items?.length

  return (
    <div className="relative overflow-hidden pb-16 pt-8 md:pb-24 md:pt-12">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-0 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute right-[-120px] top-[180px] h-[300px] w-[300px] rounded-full bg-emerald-200/10 blur-3xl" />
        <div className="absolute left-[-120px] bottom-[40px] h-[260px] w-[260px] rounded-full bg-amber-100/10 blur-3xl" />
      </div>

      <div className="content-container" data-testid="cart-container">
        {hasItems ? (
          <div className="grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1fr)_400px] xl:gap-10">
            <section className="section-shell relative overflow-hidden p-5 md:p-7 lg:p-8">
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />

              <div className="mb-8 flex flex-col gap-4 md:mb-10">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <span className="eyebrow-lgv">Panier</span>
                    <h1 className="section-title-lgv mt-2 max-w-[13ch]">
                      Votre sélection
                    </h1>
                  </div>

                  <div className="glass-panel inline-flex items-center gap-2 px-4 py-2 text-sm text-white/75">
                    <span className="h-2 w-2 rounded-full bg-emerald-300" />
                    {cart?.items?.length} article{cart?.items?.length && cart.items.length > 1 ? "s" : ""}
                  </div>
                </div>

                <p className="section-subtitle-lgv max-w-2xl">
                  Vérifiez vos articles, ajustez les quantités et finalisez votre commande
                  dans un parcours fluide, élégant et rassurant, pensé pour refléter
                  l'univers premium de La Grande Vision.
                </p>
              </div>

              {!customer && (
                <>
                  <div className="glass-panel p-4 md:p-5">
                    <SignInPrompt />
                  </div>

                  <div className="my-6 md:my-8">
                    <Divider />
                  </div>
                </>
              )}

              <div className="glass-panel-dark overflow-hidden p-4 md:p-5">
                <ItemsTemplate cart={cart} />
              </div>
            </section>

            <aside className="relative">
              <div className="sticky top-24">
                {cart && cart.region && (
                  <div className="hero-panel relative overflow-hidden p-5 md:p-6">
                    <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />
                    <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-white/10 blur-2xl" />

                    <div className="mb-6">
                      <span className="eyebrow-lgv">Récapitulatif</span>
                      <h2 className="mt-2 text-2xl font-semibold tracking-[-0.03em] text-white md:text-3xl">
                        Résumé de commande
                      </h2>
                      <p className="mt-3 max-w-sm text-sm leading-relaxed text-white/70">
                        Retrouvez ici l'essentiel de votre commande avant de passer à l'étape suivante.
                      </p>
                    </div>

                    <Summary cart={cart as any} />
                  </div>
                )}
              </div>
            </aside>
          </div>
        ) : (
          <div className="section-shell relative overflow-hidden p-8 md:p-12">
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
            <EmptyCartMessage />
          </div>
        )}
      </div>
    </div>
  )
}

export default CartTemplate
