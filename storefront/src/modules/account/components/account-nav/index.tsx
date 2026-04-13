"use client"

import { clx, Button } from "@medusajs/ui"
import { ArrowRightOnRectangle } from "@medusajs/icons"
import { useParams, usePathname } from "next/navigation"

import User from "@modules/common/icons/user"
import MapPin from "@modules/common/icons/map-pin"
import Package from "@modules/common/icons/package"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { HttpTypes } from "@medusajs/types"
import { signout } from "@lib/data/customer"

const AccountNav = ({
  customer,
}: {
  customer: HttpTypes.StoreCustomer | null
}) => {
  const route = usePathname()
  const { countryCode } = useParams() as { countryCode: string }

  const handleLogout = async () => {
    await signout(countryCode)
  }

  return (
    <div
      className="
        rounded-2xl
        border border-white/10
        bg-white/[0.04]
        backdrop-blur-xl
        p-6
      "
      data-testid="account-nav"
    >
      {/* HEADER */}
      <div className="mb-6">
        <p className="text-xs uppercase tracking-[0.18em] text-white/50">
          Mon espace
        </p>
        <h3 className="text-xl font-semibold text-white mt-1">
          {customer?.first_name || "Client"}
        </h3>
      </div>

      {/* NAV */}
      <div className="flex flex-col gap-2">

        <NavItem
          href="/account"
          route={route!}
          icon={<User size={18} />}
          label="Vue générale"
        />

        <NavItem
          href="/account/profile"
          route={route!}
          icon={<User size={18} />}
          label="Profil"
        />

        <NavItem
          href="/account/addresses"
          route={route!}
          icon={<MapPin size={18} />}
          label="Adresses"
        />

        <NavItem
          href="/account/orders"
          route={route!}
          icon={<Package size={18} />}
          label="Commandes"
        />

        {/* LOGOUT */}
        <button
          onClick={handleLogout}
          className="
            mt-4 flex items-center gap-3
            text-sm text-white/60
            hover:text-red-400
            transition
          "
        >
          <ArrowRightOnRectangle />
          Déconnexion
        </button>
      </div>
    </div>
  )
}

const NavItem = ({
  href,
  route,
  icon,
  label,
}: {
  href: string
  route: string
  icon: React.ReactNode
  label: string
}) => {
  const { countryCode }: { countryCode: string } = useParams()

  const active = route.split(countryCode)[1] === href

  return (
    <LocalizedClientLink
      href={href}
      className={clx(
        "flex items-center gap-3 px-4 py-3 rounded-xl transition-all",
        {
          "bg-gradient-to-r from-cyan-400/20 to-blue-500/20 text-white":
            active,
          "text-white/60 hover:bg-white/[0.05] hover:text-white":
            !active,
        }
      )}
    >
      {icon}
      <span className="text-sm font-medium">{label}</span>
    </LocalizedClientLink>
  )
}

export default AccountNav
