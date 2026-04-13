import { Listbox, Transition } from "@headlessui/react"
import { ChevronUpDown } from "@medusajs/icons"
import { clx } from "@medusajs/ui"
import { Fragment, useMemo } from "react"

import Radio from "@modules/common/components/radio"
import compareAddresses from "@lib/util/compare-addresses"
import { HttpTypes } from "@medusajs/types"

type AddressSelectProps = {
  addresses: HttpTypes.StoreCustomerAddress[]
  addressInput: HttpTypes.StoreCartAddress | null
  onSelect: (
    address: HttpTypes.StoreCartAddress | undefined,
    email?: string
  ) => void
}

const AddressSelect = ({
  addresses,
  addressInput,
  onSelect,
}: AddressSelectProps) => {
  const handleSelect = (id: string) => {
    const savedAddress = addresses.find((a) => a.id === id)

    if (savedAddress) {
      onSelect(savedAddress as HttpTypes.StoreCartAddress)
    }
  }

  const selectedAddress = useMemo(() => {
    return addresses.find((a) => compareAddresses(a, addressInput))
  }, [addresses, addressInput])

  return (
    <Listbox onChange={handleSelect} value={selectedAddress?.id}>
      <div className="relative">
        <Listbox.Button
          className="relative flex w-full cursor-default items-center justify-between rounded-[1rem] border border-white/10 bg-white/[0.05] px-4 py-[14px] text-left text-sm text-white shadow-[0_8px_24px_rgba(0,0,0,0.12)] backdrop-blur-xl transition-all duration-300 hover:border-white/20 hover:bg-white/[0.07] focus:outline-none"
          data-testid="shipping-address-select"
        >
          {({ open }) => (
            <>
              <span className="block truncate text-white/75">
                {selectedAddress
                  ? selectedAddress.address_1
                  : "Choisir une adresse"}
              </span>

              <ChevronUpDown
                className={clx("text-white/45 transition duration-200", {
                  "rotate-180 transform": open,
                })}
              />
            </>
          )}
        </Listbox.Button>
        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Listbox.Options
            className="absolute z-20 mt-2 max-h-72 w-full overflow-auto rounded-[1.25rem] border border-white/10 bg-[#0B0F19]/95 p-2 text-sm text-white shadow-[0_20px_60px_rgba(0,0,0,0.35)] backdrop-blur-2xl focus:outline-none"
            data-testid="shipping-address-options"
          >
            {addresses.map((address) => {
              const isSelected = selectedAddress?.id === address.id

              return (
                <Listbox.Option
                  key={address.id}
                  value={address.id}
                  className={({ active }) =>
                    clx(
                      "relative cursor-pointer select-none rounded-[1rem] px-4 py-4 transition-all duration-200",
                      "border border-transparent",
                      {
                        "bg-white/[0.04] border-white/10": !active && !isSelected,
                        "bg-white/[0.06] border-white/15": active && !isSelected,
                        "bg-white/[0.08] border-cyan-300/30": isSelected,
                      }
                    )
                  }
                  data-testid="shipping-address-option"
                >
                  <div className="flex items-start gap-x-4">
                    <Radio
                      checked={isSelected}
                      data-testid="shipping-address-radio"
                    />

                    <div className="flex flex-col">
                      <span className="text-left text-sm font-semibold text-white">
                        {address.first_name} {address.last_name}
                      </span>

                      {address.company && (
                        <span className="mt-1 text-sm text-white/55">
                          {address.company}
                        </span>
                      )}

                      <div className="mt-2 flex flex-col text-left text-sm text-white/60">
                        <span>
                          {address.address_1}
                          {address.address_2 && (
                            <span>, {address.address_2}</span>
                          )}
                        </span>

                        <span>
                          {address.postal_code}, {address.city}
                        </span>

                        <span>
                          {address.province && `${address.province}, `}
                          {address.country_code?.toUpperCase()}
                        </span>
                      </div>
                    </div>
                  </div>
                </Listbox.Option>
              )
            })}
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
  )
}

export default AddressSelect
