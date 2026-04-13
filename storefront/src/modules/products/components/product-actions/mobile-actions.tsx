import { Dialog, Transition } from "@headlessui/react"
import { Button, clx } from "@medusajs/ui"
import React, { Fragment, useMemo } from "react"

import useToggleState from "@lib/hooks/use-toggle-state"
import ChevronDown from "@modules/common/icons/chevron-down"
import X from "@modules/common/icons/x"

import { getProductPrice } from "@lib/util/get-product-price"
import OptionSelect from "./option-select"
import { HttpTypes } from "@medusajs/types"
import { isSimpleProduct } from "@lib/util/product"

type MobileActionsProps = {
  product: HttpTypes.StoreProduct
  variant?: HttpTypes.StoreProductVariant
  options: Record<string, string | undefined>
  updateOptions: (optionId: string, value: string) => void
  inStock?: boolean
  handleAddToCart: () => void
  isAdding?: boolean
  show: boolean
  optionsDisabled: boolean
}

const MobileActions: React.FC<MobileActionsProps> = ({
  product,
  variant,
  options,
  updateOptions,
  inStock,
  handleAddToCart,
  isAdding,
  show,
  optionsDisabled,
}) => {
  const { state, open, close } = useToggleState()

  const price = getProductPrice({
    product,
    variantId: variant?.id,
  })

  const selectedPrice = useMemo(() => {
    if (!price) {
      return null
    }

    const { variantPrice, cheapestPrice } = price
    return variantPrice || cheapestPrice || null
  }, [price])

  const isSimple = isSimpleProduct(product)

  return (
    <>
      <div
        className={clx("fixed inset-x-0 bottom-0 z-50 lg:hidden", {
          "pointer-events-none": !show,
        })}
      >
        <Transition
          as={Fragment}
          show={show}
          enter="ease-in-out duration-300"
          enterFrom="opacity-0 translate-y-4"
          enterTo="opacity-100 translate-y-0"
          leave="ease-in duration-200"
          leaveFrom="opacity-100 translate-y-0"
          leaveTo="opacity-0 translate-y-4"
        >
          <div
            className="border-t border-white/10 bg-[#03060D]/95 p-4 backdrop-blur-xl"
            data-testid="mobile-actions"
          >
            <div className="flex flex-col gap-y-4">
              {/* Titre + prix */}
              <div className="flex items-center justify-between gap-3">
                <span
                  className="line-clamp-1 text-sm font-medium text-white/90"
                  data-testid="mobile-title"
                >
                  {product.title}
                </span>

                {selectedPrice ? (
                  <div className="flex items-center gap-x-2">
                    {selectedPrice.price_type === "sale" && (
                      <span className="text-xs line-through text-white/40">
                        {selectedPrice.original_price}
                      </span>
                    )}

                    <span
                      className={clx("text-base font-semibold", {
                        "text-cyan-300":
                          selectedPrice.price_type === "sale",
                        "text-white":
                          selectedPrice.price_type !== "sale",
                      })}
                    >
                      {selectedPrice.calculated_price}
                    </span>
                  </div>
                ) : (
                  <div className="h-5 w-20 animate-pulse rounded-full bg-white/[0.08]" />
                )}
              </div>

              {/* CTA */}
              <div
                className={clx("grid w-full gap-3", {
                  "grid-cols-1": isSimple,
                  "grid-cols-2": !isSimple,
                })}
              >
                {!isSimple && (
                  <Button
                    onClick={open}
                    variant="secondary"
                    className="
                      h-12 w-full rounded-full border border-white/10
                      bg-white/[0.05] text-white
                      transition-all duration-300
                      hover:bg-white/[0.08]
                    "
                    data-testid="mobile-actions-button"
                  >
                    <div className="flex w-full items-center justify-between">
                      <span className="text-sm">
                        {variant
                          ? Object.values(options).join(" / ")
                          : "Choisir options"}
                      </span>
                      <ChevronDown />
                    </div>
                  </Button>
                )}

                <Button
                  onClick={handleAddToCart}
                  disabled={!inStock || !variant}
                  isLoading={isAdding}
                  data-testid="mobile-cart-button"
                  className="
                    h-12 w-full rounded-full
                    bg-gradient-to-r from-cyan-400 to-blue-500
                    font-semibold text-black
                    transition-all duration-300
                    hover:scale-[1.02]
                    hover:shadow-lg hover:shadow-cyan-500/20
                    disabled:cursor-not-allowed disabled:opacity-50
                  "
                >
                  {!variant
                    ? "Choisir une option"
                    : !inStock
                    ? "Indisponible"
                    : "Ajouter au panier"}
                </Button>
              </div>
            </div>
          </div>
        </Transition>
      </div>

      <Transition appear show={state} as={Fragment}>
        <Dialog as="div" className="relative z-[75]" onClose={close}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/70 backdrop-blur-sm" />
          </Transition.Child>

          <div className="fixed inset-x-0 bottom-0">
            <div className="flex min-h-full items-end justify-center text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="translate-y-8 opacity-0"
                enterTo="translate-y-0 opacity-100"
                leave="ease-in duration-200"
                leaveFrom="translate-y-0 opacity-100"
                leaveTo="translate-y-8 opacity-0"
              >
                <Dialog.Panel
                  className="
                    flex w-full max-w-2xl flex-col gap-y-4
                    rounded-t-[2rem] border border-white/10
                    bg-[#03060D] px-5 pb-10 pt-5 text-left
                    shadow-2xl
                  "
                  data-testid="mobile-actions-modal"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs uppercase tracking-[0.18em] text-cyan-300/80">
                        Options
                      </p>
                      <h3 className="mt-2 text-xl font-semibold tracking-[-0.02em] text-white">
                        Personnaliser le produit
                      </h3>
                    </div>

                    <button
                      onClick={close}
                      className="
                        flex h-12 w-12 items-center justify-center rounded-full
                        border border-white/10 bg-white/[0.06]
                        text-white transition hover:bg-white/[0.1]
                      "
                      data-testid="close-modal-button"
                    >
                      <X />
                    </button>
                  </div>

                  <div className="border-t border-white/10 pt-6">
                    {(product.variants?.length ?? 0) > 1 && (
                      <div className="flex flex-col gap-y-6">
                        {(product.options || []).map((option) => {
                          return (
                            <div key={option.id}>
                              <OptionSelect
                                option={option}
                                current={options[option.id]}
                                updateOption={updateOptions}
                                title={option.title ?? ""}
                                disabled={optionsDisabled}
                              />
                            </div>
                          )
                        })}
                      </div>
                    )}
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}

export default MobileActions
