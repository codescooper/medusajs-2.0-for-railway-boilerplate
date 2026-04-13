"use client"

import { Table, Text, clx } from "@medusajs/ui"
import { updateLineItem } from "@lib/data/cart"
import { HttpTypes } from "@medusajs/types"
import CartItemSelect from "@modules/cart/components/cart-item-select"
import ErrorMessage from "@modules/checkout/components/error-message"
import DeleteButton from "@modules/common/components/delete-button"
import LineItemOptions from "@modules/common/components/line-item-options"
import LineItemPrice from "@modules/common/components/line-item-price"
import LineItemUnitPrice from "@modules/common/components/line-item-unit-price"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import Spinner from "@modules/common/icons/spinner"
import Thumbnail from "@modules/products/components/thumbnail"
import { useState } from "react"

type ItemProps = {
  item: HttpTypes.StoreCartLineItem
  type?: "full" | "preview"
  currencyCode: string
}

const Item = ({ item, type = "full", currencyCode }: ItemProps) => {
  const [updating, setUpdating] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const changeQuantity = async (quantity: number) => {
    setError(null)
    setUpdating(true)

    await updateLineItem({
      lineId: item.id,
      quantity,
    })
      .catch((err) => {
        setError(err.message)
      })
      .finally(() => {
        setUpdating(false)
      })
  }

  const maxQtyFromInventory = 10
  const maxQuantity = item.variant?.manage_inventory ? 10 : maxQtyFromInventory

  return (
    <Table.Row
      className="w-full align-top transition-colors duration-200"
      data-testid="product-row"
    >
      <Table.Cell
        className={clx("!pl-0 align-top", {
          "p-4 w-[88px] md:w-[104px]": type === "preview",
          "p-4 md:p-5 w-[104px] md:w-[128px]": type === "full",
        })}
      >
        <LocalizedClientLink
          href={`/products/${item.product_handle}`}
          className={clx("group block", {
            "w-16 md:w-20": type === "preview",
            "w-20 md:w-24": type === "full",
          })}
        >
          <div className="overflow-hidden rounded-[1.25rem] border border-white/10 bg-white/[0.05] shadow-[0_10px_25px_rgba(0,0,0,0.16)] transition-all duration-300 group-hover:border-white/20 group-hover:bg-white/[0.08]">
            <Thumbnail
              thumbnail={item.thumbnail}
              images={item.variant?.product?.images}
              size="square"
            />
          </div>
        </LocalizedClientLink>
      </Table.Cell>

      <Table.Cell className="py-4 md:py-5 align-top">
        <div className="flex min-h-full flex-col gap-2">
          <LocalizedClientLink
            href={`/products/${item.product_handle}`}
            className="block"
          >
            <Text
              className="text-sm font-semibold tracking-[-0.02em] text-white md:text-base"
              data-testid="product-title"
            >
              {item.product_title}
            </Text>
          </LocalizedClientLink>

          <div className="text-xs leading-relaxed text-white/50">
            <LineItemOptions
              variant={item.variant}
              data-testid="product-variant"
            />
          </div>

          {type === "preview" && (
            <div className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-white/45">
              <span className="inline-flex items-center rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1">
                Qté : {item.quantity}
              </span>

              <span className="inline-flex items-center gap-1">
                <span className="text-white/35">Prix unitaire</span>
                <LineItemUnitPrice
                  item={item}
                  style="tight"
                  currencyCode={currencyCode}
                />
              </span>
            </div>
          )}
        </div>
      </Table.Cell>

      {type === "full" && (
        <Table.Cell className="py-4 md:py-5 align-top">
          <div className="flex flex-col items-start gap-3">
            <div className="flex items-center gap-2">
              <DeleteButton id={item.id} data-testid="product-delete-button" />

              <CartItemSelect
                value={item.quantity}
                onChange={(value) => changeQuantity(parseInt(value.target.value))}
                className="min-w-[88px]"
                data-testid="product-select-button"
              >
                {Array.from(
                  {
                    length: Math.min(maxQuantity, 10),
                  },
                  (_, i) => (
                    <option value={i + 1} key={i}>
                      {i + 1}
                    </option>
                  )
                )}
              </CartItemSelect>

              {updating && (
                <span className="text-white/45">
                  <Spinner />
                </span>
              )}
            </div>

            <ErrorMessage error={error} data-testid="product-error-message" />
          </div>
        </Table.Cell>
      )}

      {type === "full" && (
        <Table.Cell className="hidden py-4 md:py-5 align-top small:table-cell">
          <div className="inline-flex rounded-full border border-white/10 bg-white/[0.04] px-3 py-2 text-sm text-white/70">
            <LineItemUnitPrice
              item={item}
              style="tight"
              currencyCode={currencyCode}
            />
          </div>
        </Table.Cell>
      )}

      <Table.Cell className="!pr-0 py-4 md:py-5 align-top">
        <div
          className={clx("flex h-full", {
            "justify-end": type === "full",
            "flex-col items-end justify-center gap-1": type === "preview",
          })}
        >
          {type === "preview" && (
            <span className="text-xs text-white/45">
              {item.quantity} ×
            </span>
          )}

          <div className="text-right">
            <LineItemPrice
              item={item}
              style="tight"
              currencyCode={currencyCode}
            />
          </div>
        </div>
      </Table.Cell>
    </Table.Row>
  )
}

export default Item
