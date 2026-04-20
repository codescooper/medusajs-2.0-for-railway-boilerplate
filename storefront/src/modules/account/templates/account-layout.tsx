import React from "react"

import UnderlineLink from "@modules/common/components/interactive-link"

import AccountNav from "../components/account-nav"
import { HttpTypes } from "@medusajs/types"

interface AccountLayoutProps {
  customer: HttpTypes.StoreCustomer | null
  children: React.ReactNode
}

const AccountLayout: React.FC<AccountLayoutProps> = ({
  customer,
  children,
}) => {
  return (
    <div
      className="relative flex-1 overflow-hidden py-8 small:py-12"
      data-testid="account-page"
    >
      {/* Fond décoratif */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[-120px] top-20 h-[260px] w-[260px] rounded-full bg-cyan-400/15 blur-[120px]" />
        <div className="absolute right-[-140px] top-24 h-[320px] w-[320px] rounded-full bg-blue-500/15 blur-[140px]" />
        <div className="absolute bottom-[-120px] left-1/3 h-[240px] w-[240px] rounded-full bg-cyan-300/10 blur-[120px]" />
      </div>

      <div className="relative z-10 content-container mx-auto flex h-full max-w-6xl flex-col">
        <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] backdrop-blur-xl">
          <div>
            <div>
              {customer && (
                <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-4 md:p-5">
                  <AccountNav customer={customer} />
                </div>
              )}
            </div>

            <div className="flex-1">
              <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-4 md:p-6">
                {children}
              </div>
            </div>
          </div>

          <div className="border-t border-white/10 px-6 py-8 md:px-8 xl:px-10">
            <div className="flex flex-col items-start justify-between gap-6 small:flex-row small:items-end">
              <div className="max-w-xl">
                <h3 className="text-2xl font-semibold tracking-[-0.03em] text-white mb-3">
                  Besoin d'aide ?
                </h3>
                <span className="text-sm leading-7 text-white/60">
                  Retrouvez les réponses aux questions fréquentes et les
                  informations utiles sur notre espace service client.
                </span>
              </div>

              <div>
                <UnderlineLink href="/contact">
                  Service client
                </UnderlineLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AccountLayout
