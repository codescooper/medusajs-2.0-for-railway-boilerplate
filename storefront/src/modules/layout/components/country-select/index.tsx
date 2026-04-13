"use client"

import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
  Transition,
} from "@headlessui/react"
import { Fragment, useEffect, useMemo, useState } from "react"
import ReactCountryFlag from "react-country-flag"

import { StateType } from "@lib/hooks/use-toggle-state"
import { useParams, usePathname } from "next/navigation"
import { updateRegion } from "@lib/data/cart"
import { HttpTypes } from "@medusajs/types"
import { clx } from "@medusajs/ui"

type CountryOption = {
  country: string
  region: string
  label: string
}

type CountrySelectProps = {
  toggleState: StateType
  regions: HttpTypes.StoreRegion[]
}

const CountrySelect = ({ toggleState, regions }: CountrySelectProps) => {
  const [current, setCurrent] = useState<
    | { country: string | undefined; region: string; label: string | undefined }
    | undefined
  >(undefined)

  const { countryCode } = useParams()
  const currentPath = usePathname().split(`/${countryCode}`)[1]

  const { state, close } = toggleState

  const options = useMemo(() => {
    return regions
      ?.map((r) =>
        r.countries?.map((c) => ({
          country: c.iso_2,
          region: r.id,
          label: c.display_name,
        }))
      )
      .flat()
      .sort((a, b) => (a?.label ?? "").localeCompare(b?.label ?? ""))
  }, [regions])

  useEffect(() => {
    if (countryCode) {
      const option = options?.find((o) => o?.country === countryCode)
      setCurrent(option)
    }
  }, [options, countryCode])

  const handleChange = (option: CountryOption) => {
    updateRegion(option.country, currentPath)
    close()
  }

  return (
    <div>
      <Listbox
        as="span"
        onChange={handleChange}
        defaultValue={
          countryCode
            ? options?.find((o) => o?.country === countryCode)
            : undefined
        }
      >
        <ListboxButton className="w-full rounded-full border border-white/10 bg-white/[0.04] px-3 py-2 text-left text-sm text-white/75 backdrop-blur-xl transition-all duration-300 hover:border-white/20 hover:bg-white/[0.08]">
          <div className="flex items-center gap-x-2">
            <span className="text-white/55">Livraison :</span>

            {current && (
              <span className="flex items-center gap-x-2 text-white">
                {/* @ts-ignore */}
                <ReactCountryFlag
                  svg
                  style={{
                    width: "16px",
                    height: "16px",
                  }}
                  countryCode={current.country ?? ""}
                />
                {current.label}
              </span>
            )}
          </div>
        </ListboxButton>

        <div className="relative flex w-full min-w-[320px]">
          <Transition
            show={state}
            as={Fragment}
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <ListboxOptions
              className="absolute left-0 z-[900] mt-2 max-h-[442px] w-full overflow-y-scroll rounded-[1.25rem] border border-white/10 bg-[#0B0F19]/95 p-2 text-sm text-white shadow-[0_20px_60px_rgba(0,0,0,0.35)] backdrop-blur-2xl no-scrollbar xsmall:left-auto xsmall:right-0"
              static
            >
              {options?.map((o) => {
                const isActive = current?.country === o?.country

                return (
                  <ListboxOption
                    key={o?.country}
                    value={o}
                    className={({ active }) =>
                      clx(
                        "flex cursor-pointer items-center gap-x-2 rounded-[1rem] px-3 py-3 text-sm transition-all duration-200",
                        {
                          "bg-white/[0.04] text-white/75": !active && !isActive,
                          "bg-white/[0.06] text-white": active && !isActive,
                          "border border-cyan-300/30 bg-white/[0.08] text-white":
                            isActive,
                        }
                      )
                    }
                  >
                    {/* @ts-ignore */}
                    <ReactCountryFlag
                      svg
                      style={{
                        width: "16px",
                        height: "16px",
                      }}
                      countryCode={o?.country ?? ""}
                    />
                    {o?.label}
                  </ListboxOption>
                )
              })}
            </ListboxOptions>
          </Transition>
        </div>
      </Listbox>
    </div>
  )
}

export default CountrySelect
