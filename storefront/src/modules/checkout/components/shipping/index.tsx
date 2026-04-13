"use client"

import { RadioGroup } from "@headlessui/react"
import { setShippingMethod } from "@lib/data/cart"
import { calculatePriceForShippingOption } from "@lib/data/fulfillment"
import { convertToLocale } from "@lib/util/money"
import { CheckCircleSolid, Loader } from "@medusajs/icons"
import { HttpTypes } from "@medusajs/types"
import { Button, clx, Heading, Text } from "@medusajs/ui"
import ErrorMessage from "@modules/checkout/components/error-message"
import Divider from "@modules/common/components/divider"
import MedusaRadio from "@modules/common/components/radio"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"

const PICKUP_OPTION_ON = "__PICKUP_ON"
const PICKUP_OPTION_OFF = "__PICKUP_OFF"

type ShippingOptionWithServiceZone = HttpTypes.StoreCartShippingOption & {
  service_zone?: {
    fulfillment_set?: {
      type?: string
      location?: {
        address?: HttpTypes.StoreCartAddress
      }
    }
  }
}

type ShippingProps = {
  cart: HttpTypes.StoreCart
  availableShippingMethods: ShippingOptionWithServiceZone[] | null
}

function formatAddress(address: HttpTypes.StoreCartAddress) {
  if (!address) {
    return ""
  }

  let ret = ""

  if (address.address_1) {
    ret += ` ${address.address_1}`
  }

  if (address.address_2) {
    ret += `, ${address.address_2}`
  }

  if (address.postal_code) {
    ret += `, ${address.postal_code} ${address.city}`
  }

  if (address.country_code) {
    ret += `, ${address.country_code.toUpperCase()}`
  }

  return ret
}

const Shipping: React.FC<ShippingProps> = ({
  cart,
  availableShippingMethods,
}) => {
  const [isLoading, setIsLoading] = useState(false)
  const [isLoadingPrices, setIsLoadingPrices] = useState(true)
  const [showPickupOptions, setShowPickupOptions] =
    useState<string>(PICKUP_OPTION_OFF)
  const [calculatedPricesMap, setCalculatedPricesMap] = useState<
    Record<string, number>
  >({})
  const [error, setError] = useState<string | null>(null)
  const [shippingMethodId, setShippingMethodId] = useState<string | null>(
    cart.shipping_methods?.at(-1)?.shipping_option_id || null
  )

  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()

  const isOpen = searchParams.get("step") === "delivery"

  const shippingMethods = availableShippingMethods?.filter(
    (sm) => sm.service_zone?.fulfillment_set?.type !== "pickup"
  )

  const pickupMethods = availableShippingMethods?.filter(
    (sm) => sm.service_zone?.fulfillment_set?.type === "pickup"
  )

  const hasPickupOptions = !!pickupMethods?.length

  useEffect(() => {
    setIsLoadingPrices(true)

    if (shippingMethods?.length) {
      const promises = shippingMethods
        .filter((sm) => sm.price_type === "calculated")
        .map((sm) => calculatePriceForShippingOption(sm.id, cart.id))

      if (promises.length) {
        Promise.allSettled(promises).then((res) => {
          const pricesMap: Record<string, number> = {}

          res
            .filter((r): r is PromiseFulfilledResult<any> => r.status === "fulfilled")
            .forEach((p) => {
              if (p.value?.id && typeof p.value?.amount === "number") {
                pricesMap[p.value.id] = p.value.amount
              }
            })

          setCalculatedPricesMap(pricesMap)
          setIsLoadingPrices(false)
        })
      } else {
        setIsLoadingPrices(false)
      }
    } else {
      setIsLoadingPrices(false)
    }

    if (pickupMethods?.find((m) => m.id === shippingMethodId)) {
      setShowPickupOptions(PICKUP_OPTION_ON)
    }
  }, [availableShippingMethods, cart.id, pickupMethods, shippingMethodId, shippingMethods])

  const handleEdit = () => {
    router.push(pathname + "?step=delivery", { scroll: false })
  }

  const handleSubmit = () => {
    router.push(pathname + "?step=payment", { scroll: false })
  }

  const handleSetShippingMethod = async (
    id: string,
    variant: "shipping" | "pickup"
  ) => {
    setError(null)

    if (variant === "pickup") {
      setShowPickupOptions(PICKUP_OPTION_ON)
    } else {
      setShowPickupOptions(PICKUP_OPTION_OFF)
    }

    let currentId: string | null = null

    setIsLoading(true)
    setShippingMethodId((prev) => {
      currentId = prev
      return id
    })

    await setShippingMethod({ cartId: cart.id, shippingMethodId: id })
      .catch((err) => {
        setShippingMethodId(currentId)
        setError(err.message)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  useEffect(() => {
    setError(null)
  }, [isOpen])

  return (
    <div className="rounded-[1.75rem] border border-white/10 bg-gradient-to-b from-white/[0.07] to-white/[0.03] p-5 text-white shadow-[0_12px_40px_rgba(0,0,0,0.22)] backdrop-blur-xl md:p-6">
      <div className="mb-6 flex flex-row items-center justify-between">
        <Heading
          level="h2"
          className={clx(
            "flex flex-row items-baseline gap-x-2 text-2xl font-semibold tracking-[-0.03em] text-white md:text-3xl",
            {
              "pointer-events-none select-none opacity-50":
                !isOpen && cart.shipping_methods?.length === 0,
            }
          )}
        >
          Livraison
          {!isOpen && (cart.shipping_methods?.length ?? 0) > 0 && (
            <CheckCircleSolid className="text-emerald-400" />
          )}
        </Heading>

        {!isOpen &&
          cart?.shipping_address &&
          cart?.billing_address &&
          cart?.email && (
            <Text>
              <button
                onClick={handleEdit}
                className="text-sm text-white/50 transition hover:text-white"
                data-testid="edit-delivery-button"
              >
                Modifier
              </button>
            </Text>
          )}
      </div>

      {isOpen ? (
        <>
          <div className="grid">
            <div className="mb-4 flex flex-col">
              <span className="font-medium text-white">Mode de livraison</span>
              <span className="mt-1 text-sm text-white/55">
                Choisissez comment vous souhaitez recevoir votre commande
              </span>
            </div>

            <div data-testid="delivery-options-container">
              <div className="pb-8 pt-2 md:pt-0">
                {hasPickupOptions && (
                  <RadioGroup
                    value={showPickupOptions}
                    onChange={() => {
                      const id = pickupMethods?.find(
                        (option) => !option.insufficient_inventory
                      )?.id

                      if (id) {
                        handleSetShippingMethod(id, "pickup")
                      }
                    }}
                  >
                    <RadioGroup.Option
                      value={PICKUP_OPTION_ON}
                      data-testid="delivery-option-radio"
                      className={clx(
                        "mb-3 flex cursor-pointer items-center justify-between rounded-[1.2rem] border px-6 py-4 transition-all duration-300",
                        "border-white/10 bg-white/[0.04] hover:border-white/20 hover:bg-white/[0.06]",
                        {
                          "border-cyan-300/30 bg-white/[0.08] shadow-[0_10px_30px_rgba(0,0,0,0.18)]":
                            showPickupOptions === PICKUP_OPTION_ON,
                        }
                      )}
                    >
                      <div className="flex items-center gap-x-4">
                        <MedusaRadio
                          checked={showPickupOptions === PICKUP_OPTION_ON}
                        />
                        <span className="text-sm font-medium text-white md:text-base">
                          Retrait en boutique
                        </span>
                      </div>

                      <span className="justify-self-end text-white/60">-</span>
                    </RadioGroup.Option>
                  </RadioGroup>
                )}

                <RadioGroup
                  value={shippingMethodId}
                  onChange={(v) => {
                    if (v) {
                      return handleSetShippingMethod(v, "shipping")
                    }
                  }}
                >
                  {shippingMethods?.map((option) => {
                    const isDisabled =
                      option.price_type === "calculated" &&
                      !isLoadingPrices &&
                      typeof calculatedPricesMap[option.id] !== "number"

                    return (
                      <RadioGroup.Option
                        key={option.id}
                        value={option.id}
                        data-testid="delivery-option-radio"
                        disabled={isDisabled}
                        className={clx(
                          "mb-3 flex items-center justify-between rounded-[1.2rem] border px-6 py-4 transition-all duration-300",
                          "border-white/10 bg-white/[0.04] hover:border-white/20 hover:bg-white/[0.06]",
                          {
                            "border-cyan-300/30 bg-white/[0.08] shadow-[0_10px_30px_rgba(0,0,0,0.18)]":
                              option.id === shippingMethodId,
                            "cursor-not-allowed opacity-50 hover:bg-white/[0.04]":
                              isDisabled,
                            "cursor-pointer": !isDisabled,
                          }
                        )}
                      >
                        <div className="flex items-center gap-x-4">
                          <MedusaRadio checked={option.id === shippingMethodId} />
                          <span className="text-sm font-medium text-white md:text-base">
                            {option.name}
                          </span>
                        </div>

                        <span className="justify-self-end text-sm text-white/75">
                          {option.price_type === "flat" ? (
                            convertToLocale({
                              amount: option.amount!,
                              currency_code: cart.currency_code,
                            })
                          ) : calculatedPricesMap[option.id] ? (
                            convertToLocale({
                              amount: calculatedPricesMap[option.id],
                              currency_code: cart.currency_code,
                            })
                          ) : isLoadingPrices ? (
                            <Loader className="animate-spin text-white/60" />
                          ) : (
                            "-"
                          )}
                        </span>
                      </RadioGroup.Option>
                    )
                  })}
                </RadioGroup>
              </div>
            </div>
          </div>

          {showPickupOptions === PICKUP_OPTION_ON && (
            <div className="grid">
              <div className="mb-4 flex flex-col">
                <span className="font-medium text-white">Boutique</span>
                <span className="mt-1 text-sm text-white/55">
                  Choisissez un point de retrait proche de vous
                </span>
              </div>

              <div data-testid="delivery-options-container">
                <div className="pb-8 pt-2 md:pt-0">
                  <RadioGroup
                    value={shippingMethodId}
                    onChange={(v) => {
                      if (v) {
                        return handleSetShippingMethod(v, "pickup")
                      }
                    }}
                  >
                    {pickupMethods?.map((option) => {
                      return (
                        <RadioGroup.Option
                          key={option.id}
                          value={option.id}
                          disabled={option.insufficient_inventory}
                          data-testid="delivery-option-radio"
                          className={clx(
                            "mb-3 flex items-center justify-between rounded-[1.2rem] border px-6 py-4 transition-all duration-300",
                            "border-white/10 bg-white/[0.04] hover:border-white/20 hover:bg-white/[0.06]",
                            {
                              "border-cyan-300/30 bg-white/[0.08] shadow-[0_10px_30px_rgba(0,0,0,0.18)]":
                                option.id === shippingMethodId,
                              "cursor-not-allowed opacity-50 hover:bg-white/[0.04]":
                                option.insufficient_inventory,
                              "cursor-pointer": !option.insufficient_inventory,
                            }
                          )}
                        >
                          <div className="flex items-start gap-x-4">
                            <MedusaRadio checked={option.id === shippingMethodId} />
                            <div className="flex flex-col">
                              <span className="text-sm font-medium text-white md:text-base">
                                {option.name}
                              </span>
                              <span className="mt-1 text-sm text-white/50">
                                {formatAddress(
                                  option.service_zone?.fulfillment_set?.location
                                    ?.address as HttpTypes.StoreCartAddress
                                )}
                              </span>
                            </div>
                          </div>

                          <span className="justify-self-end text-sm text-white/75">
                            {convertToLocale({
                              amount: option.amount!,
                              currency_code: cart.currency_code,
                            })}
                          </span>
                        </RadioGroup.Option>
                      )
                    })}
                  </RadioGroup>
                </div>
              </div>
            </div>
          )}

          <div>
            <ErrorMessage
              error={error}
              data-testid="delivery-option-error-message"
            />

            <Button
              size="large"
              className="mt-6 w-full rounded-full bg-white text-black transition hover:bg-white/90"
              onClick={handleSubmit}
              isLoading={isLoading}
              disabled={!cart.shipping_methods?.[0]}
              data-testid="submit-delivery-option-button"
            >
              Continuer vers le paiement
            </Button>
          </div>
        </>
      ) : (
        <div>
          <div className="text-sm">
            {cart && (cart.shipping_methods?.length ?? 0) > 0 && (
              <div className="flex w-full flex-col rounded-[1rem] border border-white/10 bg-white/[0.04] p-4 md:w-1/3">
                <Text className="mb-2 text-xs uppercase tracking-[0.16em] text-white/45">
                  Méthode
                </Text>
                <Text className="text-sm text-white/75">
                  {cart.shipping_methods!.at(-1)!.name}{" "}
                  {convertToLocale({
                    amount: cart.shipping_methods!.at(-1)!.amount!,
                    currency_code: cart.currency_code,
                  })}
                </Text>
              </div>
            )}
          </div>
        </div>
      )}

      <Divider className="mt-8" />
    </div>
  )
}

export default Shipping
