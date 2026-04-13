"use client"

import { HttpTypes } from "@medusajs/types"
import { Container } from "@medusajs/ui"
import Checkbox from "@modules/common/components/checkbox"
import Input from "@modules/common/components/input"
import { mapKeys } from "lodash"
import React, { useEffect, useMemo, useState } from "react"
import AddressSelect from "../address-select"
import CountrySelect from "../country-select"

const ShippingAddress = ({
  customer,
  cart,
  checked,
  onChange,
}: {
  customer: HttpTypes.StoreCustomer | null
  cart: HttpTypes.StoreCart | null
  checked: boolean
  onChange: () => void
}) => {
  const [formData, setFormData] = useState<Record<string, any>>({
    "shipping_address.first_name": cart?.shipping_address?.first_name || "",
    "shipping_address.last_name": cart?.shipping_address?.last_name || "",
    "shipping_address.address_1": cart?.shipping_address?.address_1 || "",
    "shipping_address.company": cart?.shipping_address?.company || "",
    "shipping_address.postal_code": cart?.shipping_address?.postal_code || "",
    "shipping_address.city": cart?.shipping_address?.city || "",
    "shipping_address.country_code": cart?.shipping_address?.country_code || "",
    "shipping_address.province": cart?.shipping_address?.province || "",
    "shipping_address.phone": cart?.shipping_address?.phone || "",
    email: cart?.email || "",
  })

  const countriesInRegion = useMemo(
    () => cart?.region?.countries?.map((c) => c.iso_2),
    [cart?.region]
  )

  const addressesInRegion = useMemo(
    () =>
      customer?.addresses.filter(
        (a) => a.country_code && countriesInRegion?.includes(a.country_code)
      ),
    [customer?.addresses, countriesInRegion]
  )

  const setFormAddress = (
    address?: HttpTypes.StoreCartAddress,
    email?: string
  ) => {
    address &&
      setFormData((prev) => ({
        ...prev,
        "shipping_address.first_name": address.first_name || "",
        "shipping_address.last_name": address.last_name || "",
        "shipping_address.address_1": address.address_1 || "",
        "shipping_address.company": address.company || "",
        "shipping_address.postal_code": address.postal_code || "",
        "shipping_address.city": address.city || "",
        "shipping_address.country_code": address.country_code || "",
        "shipping_address.province": address.province || "",
        "shipping_address.phone": address.phone || "",
      }))

    email &&
      setFormData((prev) => ({
        ...prev,
        email,
      }))
  }

  useEffect(() => {
    if (cart?.shipping_address) {
      setFormAddress(cart.shipping_address, cart.email)
    }

    if (!cart?.email && customer?.email) {
      setFormAddress(undefined, customer.email)
    }
  }, [cart])

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <>
      {customer && (addressesInRegion?.length || 0) > 0 && (
        <div className="mb-6 rounded-[1.4rem] border border-white/10 bg-white/[0.04] p-5 backdrop-blur-xl">
          <p className="mb-3 text-sm text-white/60">
            {`Bonjour ${customer.first_name}, souhaitez-vous utiliser une adresse enregistrée ?`}
          </p>

          <AddressSelect
            addresses={customer.addresses}
            addressInput={
              mapKeys(formData, (_, key) =>
                key.replace("shipping_address.", "")
              ) as HttpTypes.StoreCartAddress
            }
            onSelect={setFormAddress}
          />
        </div>
      )}

      <div className="rounded-[1.6rem] border border-white/10 bg-gradient-to-b from-white/[0.06] to-white/[0.03] p-5 md:p-6 backdrop-blur-xl">
        <div className="mb-6">
          <p className="text-xs uppercase tracking-[0.2em] text-cyan-300/70">
            Livraison
          </p>
          <h3 className="mt-2 text-xl font-semibold text-white">
            Informations de livraison
          </h3>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <Input label="Prénom" name="shipping_address.first_name" value={formData["shipping_address.first_name"]} onChange={handleChange} required />
          <Input label="Nom" name="shipping_address.last_name" value={formData["shipping_address.last_name"]} onChange={handleChange} required />

          <Input label="Adresse" name="shipping_address.address_1" value={formData["shipping_address.address_1"]} onChange={handleChange} required />
          <Input label="Entreprise" name="shipping_address.company" value={formData["shipping_address.company"]} onChange={handleChange} />

          <Input label="Code postal" name="shipping_address.postal_code" value={formData["shipping_address.postal_code"]} onChange={handleChange} required />
          <Input label="Ville" name="shipping_address.city" value={formData["shipping_address.city"]} onChange={handleChange} required />

          <CountrySelect
            name="shipping_address.country_code"
            region={cart?.region}
            value={formData["shipping_address.country_code"]}
            onChange={handleChange}
            required
          />

          <Input label="Région / État" name="shipping_address.province" value={formData["shipping_address.province"]} onChange={handleChange} />
        </div>

        <div className="my-6 rounded-xl border border-white/10 bg-white/[0.03] p-4">
          <Checkbox
            label="Adresse de facturation identique"
            name="same_as_billing"
            checked={checked}
            onChange={onChange}
          />
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <Input
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <Input
            label="Téléphone"
            name="shipping_address.phone"
            value={formData["shipping_address.phone"]}
            onChange={handleChange}
          />
        </div>
      </div>
    </>
  )
}

export default ShippingAddress
