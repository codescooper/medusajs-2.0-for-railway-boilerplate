import { Label, clx } from "@medusajs/ui"
import React, { useEffect, useImperativeHandle, useState } from "react"

import Eye from "@modules/common/icons/eye"
import EyeOff from "@modules/common/icons/eye-off"

type InputProps = Omit<
  Omit<React.InputHTMLAttributes<HTMLInputElement>, "size">,
  "placeholder"
> & {
  label: string
  errors?: Record<string, unknown>
  touched?: Record<string, unknown>
  name: string
  topLabel?: string
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ type, name, label, touched, required, topLabel, className, ...props }, ref) => {
    const inputRef = React.useRef<HTMLInputElement>(null)
    const [showPassword, setShowPassword] = useState(false)
    const [inputType, setInputType] = useState(type)
    const [isFocused, setIsFocused] = useState(false)
    const [hasValue, setHasValue] = useState(
      Boolean(props.defaultValue ?? props.value)
    )

    useEffect(() => {
      if (type === "password" && showPassword) {
        setInputType("text")
      } else if (type === "password") {
        setInputType("password")
      } else {
        setInputType(type)
      }
    }, [type, showPassword])

    useEffect(() => {
      setHasValue(Boolean(props.value ?? props.defaultValue))
    }, [props.value, props.defaultValue])

    useImperativeHandle(ref, () => inputRef.current!)

    return (
      <div className="flex w-full flex-col">
        {topLabel && (
          <Label className="mb-2 text-[11px] uppercase tracking-[0.18em] text-white/45">
            {topLabel}
          </Label>
        )}

        <div className="relative z-0 w-full">
          <input
            id={name}
            type={inputType}
            name={name}
            placeholder=" "
            required={required}
            {...props}
            ref={inputRef}
            onFocus={(e) => {
              setIsFocused(true)
              props.onFocus?.(e)
            }}
            onBlur={(e) => {
              setIsFocused(false)
              setHasValue(Boolean(e.target.value))
              props.onBlur?.(e)
            }}
            onChange={(e) => {
              setHasValue(Boolean(e.target.value))
              props.onChange?.(e)
            }}
            className={clx(
              "peer block h-14 w-full appearance-none rounded-[1rem] border bg-white/[0.05] px-4 pb-2 pt-5 text-sm text-white shadow-[0_8px_24px_rgba(0,0,0,0.12)] backdrop-blur-xl transition-all duration-300",
              "border-white/10 hover:border-white/20 hover:bg-white/[0.07]",
              "focus:outline-none focus:ring-0",
              {
                "border-cyan-300/30 bg-white/[0.08] shadow-[0_10px_28px_rgba(0,0,0,0.18)]":
                  isFocused,
                "pr-12": type === "password",
              },
              className
            )}
          />

          <label
            htmlFor={name}
            onClick={() => inputRef.current?.focus()}
            className={clx(
              "pointer-events-auto absolute left-4 top-1/2 -translate-y-1/2 cursor-text rounded px-1 text-sm text-white/45 transition-all duration-300",
              "peer-focus:top-3 peer-focus:translate-y-0 peer-focus:text-[11px] peer-focus:uppercase peer-focus:tracking-[0.14em] peer-focus:text-cyan-300/75",
              {
                "top-3 translate-y-0 text-[11px] uppercase tracking-[0.14em] text-cyan-300/75":
                  hasValue || isFocused,
              }
            )}
          >
            {label}
            {required && <span className="ml-1 text-rose-400">*</span>}
          </label>

          {type === "password" && (
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-2 text-white/40 transition-all duration-200 hover:bg-white/[0.06] hover:text-white/75 focus:outline-none"
            >
              {showPassword ? <Eye /> : <EyeOff />}
            </button>
          )}

          <div className="pointer-events-none absolute inset-x-4 top-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />
        </div>
      </div>
    )
  }
)

Input.displayName = "Input"

export default Input
