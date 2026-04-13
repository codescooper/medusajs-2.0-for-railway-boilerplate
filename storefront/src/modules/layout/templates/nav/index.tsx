import { Suspense } from "react"

import { listRegions } from "@lib/data/regions"
import { listLocales } from "@lib/data/locales"
import { getLocale } from "@lib/data/locale-actions"
import { StoreRegion } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import CartButton from "@modules/layout/components/cart-button"
import SideMenu from "@modules/layout/components/side-menu"

export default async function Nav() {
  const [regions, locales, currentLocale] = await Promise.all([
    listRegions().then((regions: StoreRegion[]) => regions),
    listLocales(),
    getLocale(),
  ])

  return (
    <div className="sticky top-0 inset-x-0 z-50 px-3 pt-3 md:px-5">
      <header className="mx-auto max-w-[1440px]">
        <nav className="glass-panel-dark border-gradient-lgv content-container flex h-16 items-center justify-between rounded-2xl">
          <div className="flex h-full flex-1 basis-0 items-center">
            <div className="flex h-full items-center">
              <SideMenu
                regions={regions}
                locales={locales}
                currentLocale={currentLocale}
              />
            </div>
          </div>

          <div className="flex items-center justify-center">
            <LocalizedClientLink
              href="/"
              className="group flex flex-col items-center leading-none"
              data-testid="nav-store-link"
            >
              <span className="text-[10px] uppercase tracking-[0.28em] text-cyan-300/80">
                Optique premium
              </span>
              <span className="text-sm font-medium uppercase tracking-[0.24em] text-white transition duration-300 group-hover:text-cyan-200 md:text-base">
                La Grande Vision
              </span>
            </LocalizedClientLink>
          </div>

          <div className="flex flex-1 basis-0 items-center justify-end gap-x-4 md:gap-x-6">
            <div className="hidden small:flex items-center gap-x-5">
              <LocalizedClientLink
                className="nav-link-lgv"
                href="/store"
              >
                Boutique
              </LocalizedClientLink>

              <LocalizedClientLink
                className="nav-link-lgv"
                href="/account"
                data-testid="nav-account-link"
              >
                Compte
              </LocalizedClientLink>
            </div>

            <LocalizedClientLink
              href="/consultation"
              className="secondary-btn hidden small:inline-flex !px-4 !py-2 !text-sm"
            >
              Rendez-vous
            </LocalizedClientLink>

            <Suspense
              fallback={
                <LocalizedClientLink
                  className="contrast-btn flex items-center gap-2 !px-4 !py-2 text-sm"
                  href="/cart"
                  data-testid="nav-cart-link"
                >
                  Panier (0)
                </LocalizedClientLink>
              }
            >
              <CartButton />
            </Suspense>
          </div>
        </nav>
      </header>
    </div>
  )
}
