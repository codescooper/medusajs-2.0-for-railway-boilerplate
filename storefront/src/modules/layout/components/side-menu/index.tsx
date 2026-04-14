"use client"

import { Popover, Transition } from "@headlessui/react"
import { ArrowRightMini, XMark } from "@medusajs/icons"
import { Text, clx, useToggleState } from "@medusajs/ui"
import { Fragment } from "react"

import LocalizedClientLink from "@modules/common/components/localized-client-link"
import CountrySelect from "../country-select"
import LanguageSelect from "../language-select"
import { HttpTypes } from "@medusajs/types"
import { Locale } from "@lib/data/locales"

const SideMenuItems = {
  Accueil: "/",
  Boutique: "/store",
  "Mon compte": "/account",
  Panier: "/cart",
}

type SideMenuProps = {
  regions: HttpTypes.StoreRegion[] | null
  locales: Locale[] | null
  currentLocale: string | null
}

const SideMenu = ({ regions, locales, currentLocale }: SideMenuProps) => {
  const countryToggleState = useToggleState()
  const languageToggleState = useToggleState()

  return (
    <div className="h-full">
      <div className="flex items-center h-full">
        <Popover className="h-full flex">
          {({ open, close }) => (
            <>
              <Popover.Button className="relative h-full flex items-center text-white/70 hover:text-white transition duration-200">
                Menu
              </Popover.Button>

              {open && (
                <div
                  className="fixed inset-0 z-[50] bg-black/40 backdrop-blur-sm"
                  onClick={close}
                />
              )}

              <Transition
                show={open}
                as={Fragment}
                enter="transition ease-out duration-200"
                enterFrom="opacity-0 translate-x-[-20px]"
                enterTo="opacity-100 translate-x-0"
                leave="transition ease-in duration-150"
                leaveFrom="opacity-100"
                leaveTo="opacity-0 translate-x-[-20px]"
              >
                <Popover.Panel className="absolute left-0 top-0 z-[51] h-[calc(100vh-1rem)] w-full sm:w-1/3 2xl:w-1/4 m-2">

                  <div className="flex h-full flex-col justify-between rounded-[2rem] border border-white/10 bg-[#0B0F19]/90 p-6 text-white backdrop-blur-2xl shadow-[0_30px_80px_rgba(0,0,0,0.6)]">

                    {/* CLOSE */}
                    <div className="flex justify-end">
                      <button
                        onClick={close}
                        className="rounded-full p-2 text-white/50 hover:bg-white/[0.08] hover:text-white transition"
                      >
                        <XMark />
                      </button>
                    </div>

                    {/* NAV */}
                    <ul className="flex flex-col gap-8 mt-6">
                      {Object.entries(SideMenuItems).map(([name, href]) => (
                        <li key={name}>
                          <LocalizedClientLink
                            href={href}
                            onClick={close}
                            className="group text-3xl font-light tracking-wide text-white/80 transition-all duration-300 hover:text-white"
                          >
                            <span className="relative">
                              {name}
                              <span className="absolute left-0 -bottom-1 h-[1px] w-0 bg-white/70 transition-all duration-300 group-hover:w-full" />
                            </span>
                          </LocalizedClientLink>
                        </li>
                      ))}
                    </ul>

                    {/* FOOTER */}
                    <div className="flex flex-col gap-y-6 mt-10">

                      {!!locales?.length && (
                        <div
                          className="flex justify-between items-center"
                          onMouseEnter={languageToggleState.open}
                          onMouseLeave={languageToggleState.close}
                        >
                          <LanguageSelect
                            toggleState={languageToggleState}
                            locales={locales}
                            currentLocale={currentLocale}
                          />
                          <ArrowRightMini
                            className={clx(
                              "text-white/40 transition-transform duration-200",
                              languageToggleState.state && "-rotate-90"
                            )}
                          />
                        </div>
                      )}

                      <div
                        className="flex justify-between items-center"
                        onMouseEnter={countryToggleState.open}
                        onMouseLeave={countryToggleState.close}
                      >
                        {regions && (
                          <CountrySelect
                            toggleState={countryToggleState}
                            regions={regions}
                          />
                        )}
                        <ArrowRightMini
                          className={clx(
                            "text-white/40 transition-transform duration-200",
                            countryToggleState.state && "-rotate-90"
                          )}
                        />
                      </div>

                      <Text className="text-white/30 text-xs">
                        © {new Date().getFullYear()} La Grande Vision
                      </Text>
                    </div>
                  </div>
                </Popover.Panel>
              </Transition>
            </>
          )}
        </Popover>
      </div>
    </div>
  )
}

export default SideMenu
