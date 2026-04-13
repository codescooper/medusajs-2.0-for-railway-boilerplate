"use client"

import { convertToLocale } from "@lib/util/money"
import React from "react"

type CartTotalsProps = {
  totals: {
    total?: number | null
    subtotal?: number | null
    tax_total?: number | null
    currency_code: string
    item_subtotal?: number | null
    shipping_subtotal?: number | null
    discount_subtotal?: number | null
  }
}

const CartTotals: React.FC<CartTotalsProps> = ({ totals }) => {
  const {
    currency_code,
    total,
    tax_total,
    item_subtotal,
    shipping_subtotal,
    discount_subtotal,
  } = totals

  return (
    <div className="relative overflow-hidden rounded-[1.5rem] border border-white/10 bg-gradient-to-b from-white/[0.06] to-white/[0.03] p-5 text-white shadow-[0_14px_40px_rgba(0,0,0,0.2)] backdrop-blur-xl">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent" />
      <div className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-white/10 blur-2xl" />

      <div className="relative">
        <div className="mb-5">
          <p className="text-[11px] uppercase tracking-[0.22em] text-cyan-300/75">
            Récapitulatif
          </p>
          <h3 className="mt-2 text-lg font-semibold tracking-[-0.03em] text-white md:text-xl">
            Montant de la commande
          </h3>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between text-sm text-white/60">
            <span>Sous-total</span>
            <span data-testid="cart-subtotal" data-value={item_subtotal || 0}>
              {convertToLocale({ amount: item_subtotal ?? 0, currency_code })}
            </span>
          </div>

          <div className="flex items-center justify-between text-sm text-white/60">
            <span>Livraison</span>
            <span data-testid="cart-shipping" data-value={shipping_subtotal || 0}>
              {convertToLocale({ amount: shipping_subtotal ?? 0, currency_code })}
            </span>
          </div>

          {!!discount_subtotal && (
            <div className="flex items-center justify-between text-sm">
              <span className="text-white/60">Réduction</span>
              <span
                className="font-medium text-emerald-300"
                data-testid="cart-discount"
                data-value={discount_subtotal || 0}
              >
                -{" "}
                {convertToLocale({
                  amount: discount_subtotal ?? 0,
                  currency_code,
                })}
              </span>
            </div>
          )}

          <div className="flex items-center justify-between text-sm text-white/60">
            <span>Taxes</span>
            <span data-testid="cart-taxes" data-value={tax_total || 0}>
              {convertToLocale({ amount: tax_total ?? 0, currency_code })}
            </span>
          </div>
        </div>

        <div className="my-5 h-px w-full bg-gradient-to-r from-transparent via-white/15 to-transparent" />

        <div className="rounded-[1.25rem] border border-white/10 bg-white/[0.05] px-4 py-4 shadow-[0_10px_30px_rgba(0,0,0,0.16)]">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.18em] text-white/40">
                Total
              </p>
              <p className="mt-1 text-sm text-white/50">
                Montant final de votre commande
              </p>
            </div>

            <span
              className="text-2xl font-semibold tracking-[-0.04em] text-white md:text-3xl"
              data-testid="cart-total"
              data-value={total || 0}
            >
              {convertToLocale({ amount: total ?? 0, currency_code })}
            </span>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-center">
          <p className="max-w-sm text-center text-xs leading-relaxed text-white/40">
            Prix affichés selon votre région et la configuration actuelle de votre commande.
          </p>
        </div>
      </div>
    </div>
  )
}

export default CartTotals
