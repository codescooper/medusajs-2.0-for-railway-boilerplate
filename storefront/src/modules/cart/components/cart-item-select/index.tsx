"use client"

import { clx } from "@medusajs/ui"
import {
  SelectHTMLAttributes,
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react"

import ChevronDown from "@modules/common/icons/chevron-down"

type NativeSelectProps = {
  placeholder?: string
  errors?: Record<string, unknown>
  touched?: Record<string, unknown>
} & Omit<SelectHTMLAttributes<HTMLSelectElement>, "size">

const CartItemSelect = forwardRef<HTMLSelectElement, NativeSelectProps>(
  ({ placeholder = "Select...", className, children, ...props }, ref) => {
    const innerRef = useRef<HTMLSelectElement>(null)
    const [isPlaceholder, setIsPlaceholder] = useState(false)
    const [isFocused, setIsFocused] = useState(false)

    useImperativeHandle<HTMLSelectElement | null, HTMLSelectElement | null>(
      ref,
      () => innerRef.current
    )

    useEffect(() => {
      if (innerRef.current && innerRef.current.value === "") {
        setIsPlaceholder(true)
      } else {
        setIsPlaceholder(false)
      }
    }, [innerRef.current?.value])

    return (
      <div className="relative">
        <div
          className={clx(
            "group relative flex h-12 min-w-[84px] items-center overflow-hidden rounded-full border backdrop-blur-xl transition-all duration-300",
            "bg-white/[0.06] text-white shadow-[0_8px_24px_rgba(0,0,0,0.16)]",
            "border-white/10 hover:border-white/20 hover:bg-white/[0.09]",
            {
              "ring-2 ring-cyan-300/20 border-cyan-200/30 bg-white/[0.1]":
                isFocused,
              "text-white/45": isPlaceholder,
            },
            className
          )}
        >
          <div className="pointer-events-none absolute inset-x-3 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

          <select
            ref={innerRef}
            {...props}
            onFocus={(e) => {
              setIsFocused(true)
              props.onFocus?.(e)
            }}
            onBlur={(e) => {
              setIsFocused(false)
              props.onBlur?.(e)
            }}
            onChange={(e) => {
              setIsPlaceholder(e.target.value === "")
              props.onChange?.(e)
            }}
            className={clx(
              "h-12 w-full appearance-none bg-transparent border-none pl-4 pr-10 text-sm font-medium outline-none",
              "cursor-pointer text-white",
              "focus:outline-none focus:ring-0"
            )}
          >
            <option disabled value="">
              {placeholder}
            </option>
            {children}
          </select>

          <span className="pointer-events-none absolute right-3 flex items-center justify-center text-white/55 transition-transform duration-300 group-hover:translate-y-[1px] group-hover:text-white/80">
            <ChevronDown />
          </span>
        </div>
      </div>
    )
  }
)

CartItemSelect.displayName = "CartItemSelect"

export default CartItemSelect
