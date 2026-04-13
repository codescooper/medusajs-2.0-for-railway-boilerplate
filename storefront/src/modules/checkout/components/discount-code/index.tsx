"use client"

import { Badge, Heading, Input, Label, Text } from "@medusajs/ui"
import React from "react"

import { applyPromotions } from "@lib/data/cart"
import { convertToLocale } from "@lib/util/money"
import { HttpTypes } from "@medusajs/types"
import Trash from "@modules/common/icons/trash"
import ErrorMessage from "../error-message"
import { SubmitButton } from "../submit-button"

type DiscountCodeProps = {
  cart: HttpTypes.StoreCart & {
    promotions: HttpTypes.StorePromotion[]
  }
}

const DiscountCode: React.FC<DiscountCodeProps> = ({ cart }) => {
  const [isOpen, setIsOpen] = React.useState(false)
  const [errorMessage, setErrorMessage] = React.useState("")

  const { promotions = [] } = cart

  const removePromotionCode = async (code: string) => {
    const validPromotions = promotions.filter(
      (promotion) => promotion.code !== code
    )

    await applyPromotions(
      validPromotions.filter((p) => p.code !== undefined).map((p) => p.code!)
    )
  }

  const addPromotionCode = async (formData: FormData) => {
    setErrorMessage("")

    const code = formData.get("code")
    if (!code) return

    const input = document.getElementById("promotion-input") as HTMLInputElement

    const codes = promotions
      .filter((p) => p.code !== undefined)
      .map((p) => p.code!)

    codes.push(code.toString())

    try {
      await applyPromotions(codes)
    } catch (e: any) {
      setErrorMessage(e.message)
    }

    if (input) input.value = ""
  }

  return (
    <div className="w-full rounded-[1.4rem] border border-white/10 bg-white/[0.04] p-4 text-white backdrop-blur-xl">
      <form action={(a) => addPromotionCode(a)} className="w-full mb-4">
        <Label className="flex items-center gap-x-2 text-sm text-white/70">
          <button
            onClick={() => setIsOpen(!isOpen)}
            type="button"
            className="transition-colors duration-200 hover:text-white"
            data-testid="add-discount-button"
          >
            Code promotionnel
          </button>
        </Label>

        {isOpen && (
          <>
            <div className="mt-3 flex w-full gap-x-2">
              <Input
                className="flex-1 rounded-full border border-white/10 bg-white/[0.05] text-white placeholder:text-white/30 focus:border-white/20"
                id="promotion-input"
                name="code"
                type="text"
                placeholder="Entrez votre code"
                data-testid="discount-input"
              />

              <SubmitButton
                variant="secondary"
                className="rounded-full border border-white/10 bg-white/[0.06] text-white hover:bg-white/[0.1]"
                data-testid="discount-apply-button"
              >
                Appliquer
              </SubmitButton>
            </div>

            <ErrorMessage
              error={errorMessage}
              data-testid="discount-error-message"
            />
          </>
        )}
      </form>

      {promotions.length > 0 && (
        <div className="mt-4">
          <Heading className="mb-3 text-sm text-white/60">
            Promotions appliquées
          </Heading>

          <div className="flex flex-col gap-2">
            {promotions.map((promotion) => {
              return (
                <div
                  key={promotion.id}
                  className="flex items-center justify-between rounded-full border border-white/10 bg-white/[0.05] px-3 py-2 text-sm"
                  data-testid="discount-row"
                >
                  <div className="flex items-center gap-2 truncate">
                    <Badge
                      color={promotion.is_automatic ? "green" : "grey"}
                      size="small"
                    >
                      {promotion.code}
                    </Badge>

                    <span className="text-white/60">
                      {promotion.application_method?.type === "percentage"
                        ? `${promotion.application_method.value}%`
                        : convertToLocale({
                            amount: +promotion.application_method?.value!,
                            currency_code:
                              promotion.application_method?.currency_code!,
                          })}
                    </span>
                  </div>

                  {!promotion.is_automatic && (
                    <button
                      onClick={() => {
                        if (!promotion.code) return
                        removePromotionCode(promotion.code)
                      }}
                      className="text-white/40 hover:text-white transition"
                      data-testid="remove-discount-button"
                    >
                      <Trash size={14} />
                    </button>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}

export default DiscountCode
