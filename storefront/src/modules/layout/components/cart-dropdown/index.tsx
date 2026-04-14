"use client"

import {
  Popover,
  Transition,
} from "@headlessui/react"
import { convertToLocale } from "@lib/util/money"
import { HttpTypes } from "@medusajs/types"
import { Button } from "@medusajs/ui"
import DeleteButton from "@modules/common/components/delete-button"
import LineItemOptions from "@modules/common/components/line-item-options"
import LineItemPrice from "@modules/common/components/line-item-price"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import Thumbnail from "@modules/products/components/thumbnail"
import { usePathname } from "next/navigation"
import { Fragment, useEffect, useRef, useState } from "react"

const CartDropdown = ({
  cart: cartState,
}: {
  cart?: HttpTypes.StoreCart | null
}) => {
  const [activeTimer, setActiveTimer] = useState<NodeJS.Timer | undefined>(
    undefined
  )
  const [cartDropdownOpen, setCartDropdownOpen] = useState(false)

  const open = () => setCartDropdownOpen(true)
  const close = () => setCartDropdownOpen(false)

  const totalItems =
    cartState?.items?.reduce((acc, item) => {
      return acc + item.quantity
    }, 0) || 0

  const subtotal = cartState?.subtotal ?? 0
  const itemRef = useRef<number>(totalItems || 0)

  const timedOpen = () => {
    open()

    const timer = setTimeout(close, 5000)

    setActiveTimer(timer)
  }

  const openAndCancel = () => {
    if (activeTimer) {
      clearTimeout(activeTimer)
    }

    open()
  }

  // Clean up the timer when the component unmounts
  useEffect(() => {
    return () => {
      if (activeTimer) {
        clearTimeout(activeTimer)
      }
    }
  }, [activeTimer])

  const pathname = usePathname()

  // open cart dropdown when modifying the cart items, but only if we're not on the cart page
  useEffect(() => {
    if (itemRef.current !== totalItems && !pathname.includes("/cart")) {
      timedOpen()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [totalItems, itemRef.current])

  return (
    <div
      className="h-full z-50"
      onMouseEnter={openAndCancel}
      onMouseLeave={close}
    >
      <Popover className="relative h-full">
        <Popover.Button className="h-full">
          <LocalizedClientLink
            className="hover:text-ui-fg-base"
            href="/cart"
            data-testid="nav-cart-link"
          >{`Panier (${totalItems})`}</LocalizedClientLink>
        </Popover.Button>
        <Transition
          show={cartDropdownOpen}
          as={Fragment}
          enter="transition ease-out duration-200"
          enterFrom="opacity-0 translate-y-1"
          enterTo="opacity-100 translate-y-0"
          leave="transition ease-in duration-150"
          leaveFrom="opacity-100 translate-y-0"
          leaveTo="opacity-0 translate-y-1"
        >
          <Popover.Panel
            static
            className="hidden small:block absolute top-[calc(100%+8px)] right-0 w-[420px]"
            data-testid="nav-cart-dropdown"
          >
            <div className="overflow-hidden rounded-[1.5rem] border border-white/10 bg-gradient-to-b from-[#0B0F19]/95 to-[#05070D]/95 backdrop-blur-2xl shadow-[0_20px_60px_rgba(0,0,0,0.45)]">

              {/* HEADER */}
              <div className="flex items-center justify-between px-5 py-4 border-b border-white/10">
                <div>
                  <p className="text-xs uppercase tracking-[0.18em] text-white/40">
                    Panier
                  </p>
                  <p className="text-sm text-white/60">
                    {totalItems} article{totalItems > 1 && "s"}
                  </p>
                </div>
              </div>

              {/* ITEMS */}
              {cartState && cartState.items?.length ? (
                <>
                  <div className="max-h-[380px] overflow-y-auto px-5 py-4 space-y-6">
                    {cartState.items.map((item) => (
                      <div
                        key={item.id}
                        className="flex gap-4 group"
                        data-testid="cart-item"
                      >
                        <LocalizedClientLink
                          href={`/products/${item.product_handle}`}
                          className="w-20 shrink-0 overflow-hidden rounded-xl border border-white/10 bg-white/[0.03]"
                        >
                          <Thumbnail
                            thumbnail={item.thumbnail}
                            images={item.variant?.product?.images}
                            size="square"
                          />
                        </LocalizedClientLink>

                        <div className="flex flex-col flex-1 justify-between">
                          <div>
                            <h3 className="text-sm font-medium text-white leading-tight">
                              {item.title}
                            </h3>

                            <div className="mt-1 text-xs text-white/50">
                              <LineItemOptions variant={item.variant} />
                            </div>

                            <p className="text-xs text-white/40 mt-1">
                              x{item.quantity}
                            </p>
                          </div>

                          <div className="flex items-center justify-between mt-2">
                            <LineItemPrice
                              item={item}
                              style="tight"
                              currencyCode={cartState.currency_code}
                            />

                            <DeleteButton
                              id={item.id}
                              className="text-xs text-white/40 hover:text-white"
                            >
                              Retirer
                            </DeleteButton>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* FOOTER */}
                  <div className="border-t border-white/10 px-5 py-4 space-y-4">

                    <div className="flex items-center justify-between">
                      <span className="text-sm text-white/60">
                        Sous-total
                      </span>
                      <span className="text-lg font-semibold text-white">
                        {convertToLocale({
                          amount: subtotal,
                          currency_code: cartState.currency_code,
                        })}
                      </span>
                    </div>

                    <LocalizedClientLink href="/cart">
                      <button className="w-full rounded-xl bg-white text-black py-3 text-sm font-medium transition-all hover:opacity-90">
                        Voir le panier
                      </button>
                    </LocalizedClientLink>
                  </div>
                </>
              ) : (
                <div className="py-16 flex flex-col items-center gap-4 text-center">
                  <div className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center text-white/60">
                    0
                  </div>

                  <p className="text-sm text-white/60">
                    Votre panier est vide
                  </p>

                  <LocalizedClientLink href="/store">
                    <button className="rounded-lg bg-white text-black px-4 py-2 text-sm font-medium">
                      Explorer
                    </button>
                  </LocalizedClientLink>
                </div>
              )}
            </div>
          </Popover.Panel>
        </Transition>
      </Popover>
    </div>
  )
}

export default CartDropdown
