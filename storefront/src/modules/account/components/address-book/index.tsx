import React from "react"

import AddAddress from "../address-card/add-address"
import EditAddress from "../address-card/edit-address-modal"
import { HttpTypes } from "@medusajs/types"

type AddressBookProps = {
  customer: HttpTypes.StoreCustomer
  region: HttpTypes.StoreRegion
}

const AddressBook: React.FC<AddressBookProps> = ({ customer, region }) => {
  const { addresses } = customer

  return (
    <div className="w-full" data-testid="address-book-page">
      <div className="mb-6">
        <p className="text-xs uppercase tracking-[0.18em] text-cyan-300/70">
          Carnet d'adresses
        </p>

        <h2 className="mt-2 text-2xl md:text-3xl font-semibold tracking-[-0.03em] text-white">
          Gérez vos adresses
        </h2>

        <p className="mt-3 max-w-2xl text-sm leading-7 text-white/55 md:text-base">
          Ajoutez, modifiez et organisez vos հասցresses de livraison et de
          facturation pour accélérer vos prochaines commandes.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:gap-6">
        <AddAddress region={region} addresses={addresses} />

        {addresses.map((address) => {
          return (
            <EditAddress
              region={region}
              address={address}
              key={address.id}
            />
          )
        })}
      </div>
    </div>
  )
}

export default AddressBook
