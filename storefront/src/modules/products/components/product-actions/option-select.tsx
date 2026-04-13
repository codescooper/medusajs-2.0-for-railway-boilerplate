import { HttpTypes } from "@medusajs/types"
import { clx } from "@medusajs/ui"
import React from "react"

type OptionSelectProps = {
  option: HttpTypes.StoreProductOption
  current: string | undefined
  updateOption: (optionId: string, value: string) => void
  title: string
  disabled: boolean
  "data-testid"?: string
}

const OptionSelect: React.FC<OptionSelectProps> = ({
  option,
  current,
  updateOption,
  title,
  "data-testid": dataTestId,
  disabled,
}) => {
  const filteredOptions = (option.values ?? []).map((v) => v.value)

  return (
    <div className="flex flex-col gap-y-4 text-white">
      <div className="flex items-center justify-between">
        <span className="text-xs uppercase tracking-[0.16em] text-cyan-300/80">
          {title}
        </span>

        {current && (
          <span className="text-xs text-white/45">
            Sélection : <span className="text-white/75">{current}</span>
          </span>
        )}
      </div>

      <div
        className="flex flex-wrap gap-2"
        data-testid={dataTestId}
      >
        {filteredOptions.map((v) => {
          const isActive = v === current

          return (
            <button
              type="button"
              onClick={() => updateOption(option.id, v)}
              key={v}
              disabled={disabled}
              data-testid="option-button"
              className={clx(
                "min-h-11 rounded-full px-4 py-2 text-sm font-medium transition-all duration-300 ease-out",
                "border backdrop-blur-xl",
                {
                  "border-cyan-300/40 bg-cyan-400/10 text-cyan-200 shadow-[0_0_0_1px_rgba(34,211,238,0.08)]":
                    isActive,
                  "border-white/10 bg-white/[0.05] text-white/75 hover:border-white/20 hover:bg-white/[0.08] hover:text-white":
                    !isActive,
                  "cursor-not-allowed opacity-40": disabled,
                }
              )}
            >
              {v}
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default OptionSelect
