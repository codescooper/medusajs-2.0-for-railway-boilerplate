import { Checkbox, Label, clx } from "@medusajs/ui"
import React from "react"

type CheckboxProps = {
  checked?: boolean
  onChange?: () => void
  label: string
  name?: string
  'data-testid'?: string
}

const CheckboxWithLabel: React.FC<CheckboxProps> = ({
  checked = false,
  onChange,
  label,
  name,
  'data-testid': dataTestId,
}) => {
  const id = `checkbox-${name || Math.random().toString(36).substring(2, 8)}`

  return (
    <div
      className={clx(
        "flex items-start gap-3 rounded-xl border border-white/10 bg-white/[0.04] p-3 transition-all duration-200",
        "hover:bg-white/[0.06] hover:border-white/20",
        {
          "bg-white/[0.08] border-cyan-300/30": checked,
        }
      )}
    >
      <Checkbox
        id={id}
        role="checkbox"
        type="button"
        checked={checked}
        aria-checked={checked}
        onClick={onChange}
        name={name}
        data-testid={dataTestId}
        className={clx(
          "mt-1 h-5 w-5 rounded-md border border-white/20 bg-white/[0.05] transition-all duration-200",
          "flex items-center justify-center",
          {
            "bg-cyan-400 border-cyan-300 text-black": checked,
          }
        )}
      />

      <Label
        htmlFor={id}
        className="cursor-pointer !transform-none"
        size="large"
      >
        <span className="text-sm leading-relaxed text-white/75">
          {label}
        </span>
      </Label>
    </div>
  )
}

export default CheckboxWithLabel
