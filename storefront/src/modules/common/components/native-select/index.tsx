import { ChevronUpDown } from "@medusajs/icons"
import { clx } from "@medusajs/ui"
import {
  SelectHTMLAttributes,
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react"

export type NativeSelectProps = {
  placeholder?: string
  errors?: Record<string, unknown>
  touched?: Record<string, unknown>
} & SelectHTMLAttributes<HTMLSelectElement>

const NativeSelect = forwardRef<HTMLSelectElement, NativeSelectProps>(
  (
    { placeholder = "Sélectionner", defaultValue, className, children, ...props },
    ref
  ) => {
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
      <div className="w-full">
        <div
          className={clx(
            "relative flex h-14 w-full items-center rounded-[1rem] border bg-white/[0.05] shadow-[0_8px_24px_rgba(0,0,0,0.12)] backdrop-blur-xl transition-all duration-300",
            "border-white/10 hover:border-white/20 hover:bg-white/[0.07]",
            {
              "border-cyan-300/30 bg-white/[0.08] shadow-[0_10px_28px_rgba(0,0,0,0.18)]":
                isFocused,
              "text-white/40": isPlaceholder,
              "text-white": !isPlaceholder,
            },
            className
          )}
        >
          <select
            ref={innerRef}
            defaultValue={defaultValue}
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
              "h-full w-full appearance-none bg-transparent border-none px-4 pr-11 text-sm outline-none transition-colors duration-150",
              "focus:outline-none focus:ring-0",
              {
                "text-white/40": isPlaceholder,
                "text-white": !isPlaceholder,
              }
            )}
          >
            <option disabled value="">
              {placeholder}
            </option>
            {children}
          </select>

          <span className="pointer-events-none absolute right-4 inset-y-0 flex items-center text-white/40 transition-colors duration-200">
            <ChevronUpDown />
          </span>

          <div className="pointer-events-none absolute inset-x-4 top-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />
        </div>
      </div>
    )
  }
)

NativeSelect.displayName = "NativeSelect"

export default NativeSelect
