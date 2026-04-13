import { Label, RadioGroup, Text, clx } from "@medusajs/ui"

type FilterRadioGroupProps = {
  title: string
  items: {
    value: string
    label: string
  }[]
  value: any
  handleChange: (...args: any[]) => void
  "data-testid"?: string
}

const FilterRadioGroup = ({
  title,
  items,
  value,
  handleChange,
  "data-testid": dataTestId,
}: FilterRadioGroupProps) => {
  return (
    <div className="flex flex-col gap-y-4">
      <div>
        <p className="text-[11px] uppercase tracking-[0.22em] text-cyan-300/75">
          Filtre
        </p>
        <Text className="mt-2 text-sm font-medium text-white/85">{title}</Text>
      </div>

      <RadioGroup
        data-testid={dataTestId}
        onValueChange={handleChange}
        className="flex flex-col gap-2"
      >
        {items?.map((item) => {
          const isActive = item.value === value

          return (
            <div key={item.value} className="relative">
              <RadioGroup.Item
                checked={isActive}
                className="peer sr-only"
                id={item.value}
                value={item.value}
              />

              <Label
                htmlFor={item.value}
                className={clx(
                  "flex cursor-pointer items-center justify-between rounded-[1rem] border px-4 py-3 transition-all duration-200",
                  "border-white/10 bg-white/[0.04] text-white/60 backdrop-blur-xl",
                  "hover:border-white/20 hover:bg-white/[0.06] hover:text-white/85",
                  {
                    "border-cyan-300/30 bg-white/[0.08] text-white shadow-[0_10px_25px_rgba(0,0,0,0.14)]":
                      isActive,
                  }
                )}
                data-testid="radio-label"
                data-active={isActive}
              >
                <span className="text-sm leading-none">{item.label}</span>

                <span
                  className={clx(
                    "flex h-4 w-4 items-center justify-center rounded-full border transition-all duration-200",
                    {
                      "border-white/20 bg-transparent": !isActive,
                      "border-cyan-300 bg-cyan-300/20": isActive,
                    }
                  )}
                >
                  <span
                    className={clx(
                      "h-1.5 w-1.5 rounded-full transition-all duration-200",
                      {
                        "bg-transparent": !isActive,
                        "bg-cyan-300": isActive,
                      }
                    )}
                  />
                </span>
              </Label>
            </div>
          )
        })}
      </RadioGroup>
    </div>
  )
}

export default FilterRadioGroup
