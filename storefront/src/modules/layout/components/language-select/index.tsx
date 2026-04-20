"use client"

import {
  Listbox,
  Transition,
} from "@headlessui/react"
import { Fragment, useEffect, useMemo, useState, useTransition } from "react"
import { useRouter } from "next/navigation"
import ReactCountryFlag from "react-country-flag"

import { StateType } from "@lib/hooks/use-toggle-state"
import { updateLocale } from "@lib/data/locale-actions"
import { Locale } from "@lib/data/locales"
import { clx } from "@medusajs/ui"

type LanguageOption = {
  code: string
  name: string
  localizedName: string
  countryCode: string
}

const getCountryCodeFromLocale = (localeCode: string): string => {
  try {
    const locale = new Intl.Locale(localeCode)
    if (locale.region) return locale.region.toUpperCase()
    const maximized = locale.maximize()
    return maximized.region?.toUpperCase() ?? localeCode.toUpperCase()
  } catch {
    const parts = localeCode.split(/[-_]/)
    return parts.length > 1 ? parts[1].toUpperCase() : parts[0].toUpperCase()
  }
}

const getLocalizedLanguageName = (
  code: string,
  fallbackName: string,
  displayLocale: string = "en-US"
): string => {
  try {
    const displayNames = new Intl.DisplayNames([displayLocale], {
      type: "language",
    })
    return displayNames.of(code) ?? fallbackName
  } catch {
    return fallbackName
  }
}

const DEFAULT_OPTION: LanguageOption = {
  code: "",
  name: "Default",
  localizedName: "Default",
  countryCode: "",
}

type LanguageSelectProps = {
  toggleState: StateType
  locales: Locale[]
  currentLocale: string | null
}

const LanguageSelect = ({
  toggleState,
  locales,
  currentLocale,
}: LanguageSelectProps) => {
  const [current, setCurrent] = useState<LanguageOption | undefined>(undefined)
  const [isPending, startTransition] = useTransition()
  const router = useRouter()

  const { state, close } = toggleState

  const options = useMemo(() => {
    const localeOptions = locales.map((locale) => ({
      code: locale.code,
      name: locale.name,
      localizedName: getLocalizedLanguageName(
        locale.code,
        locale.name,
        currentLocale ?? "en-US"
      ),
      countryCode: getCountryCodeFromLocale(locale.code),
    }))
    return [DEFAULT_OPTION, ...localeOptions]
  }, [locales, currentLocale])

  useEffect(() => {
    if (currentLocale) {
      const option = options.find(
        (o) => o.code.toLowerCase() === currentLocale.toLowerCase()
      )
      setCurrent(option ?? DEFAULT_OPTION)
    } else {
      setCurrent(DEFAULT_OPTION)
    }
  }, [options, currentLocale])

  const handleChange = (option: LanguageOption) => {
    startTransition(async () => {
      await updateLocale(option.code)
      close()
      router.refresh()
    })
  }

  return (
    <div>
      <Listbox
        as="span"
        onChange={handleChange}
        defaultValue={
          currentLocale
            ? options.find(
                (o) => o.code.toLowerCase() === currentLocale.toLowerCase()
              ) ?? DEFAULT_OPTION
            : DEFAULT_OPTION
        }
        disabled={isPending}
      >
        {/* BUTTON */}
        <Listbox.Button className="w-full rounded-full border border-white/10 bg-white/[0.04] px-3 py-2 text-left text-sm text-white/75 backdrop-blur-xl transition-all duration-300 hover:border-white/20 hover:bg-white/[0.08]">
          <div className="flex items-center gap-x-2">
            <span className="text-white/55">Langue :</span>

            {current && (
              <span className="flex items-center gap-x-2 text-white">
                {current.countryCode && (
                  <ReactCountryFlag
                    style={{ fontSize: "1.1em", lineHeight: "1" }}
                    countryCode={current.countryCode}
                  />
                )}
                {isPending ? "..." : current.localizedName}
              </span>
            )}
          </div>
        </Listbox.Button>

        {/* DROPDOWN */}
        <div className="relative flex w-full min-w-[320px]">
          <Transition
            show={state}
            as={Fragment}
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options
              className="absolute left-0 z-[900] mt-2 max-h-[442px] w-full overflow-y-scroll rounded-[1.25rem] border border-white/10 bg-[#0B0F19]/95 p-2 text-sm text-white shadow-[0_20px_60px_rgba(0,0,0,0.35)] backdrop-blur-2xl no-scrollbar xsmall:left-auto xsmall:right-0"
              static
            >
              {options.map((o) => {
                const isActive = current?.code === o.code

                return (
                  <Listbox.Option
                    key={o.code || "default"}
                    value={o}
                    className={({ active }) =>
                      clx(
                        "flex cursor-pointer items-center gap-x-2 rounded-[1rem] px-3 py-3 text-sm transition-all duration-200",
                        {
                          "bg-white/[0.04] text-white/75": !active && !isActive,
                          "bg-white/[0.06] text-white": active && !isActive,
                          "bg-white/[0.08] border border-cyan-300/30 text-white":
                            isActive,
                        }
                      )
                    }
                  >
                    {o.countryCode ? (
                      <ReactCountryFlag
                        style={{ fontSize: "1.1em", lineHeight: "1" }}
                        countryCode={o.countryCode}
                      />
                    ) : (
                      <span style={{ width: "16px", height: "16px" }} />
                    )}

                    {o.localizedName}
                  </Listbox.Option>
                )
              })}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  )
}

export default LanguageSelect
