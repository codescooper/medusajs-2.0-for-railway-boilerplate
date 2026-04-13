import { ArrowUpRightMini } from "@medusajs/icons"
import { clx } from "@medusajs/ui"
import LocalizedClientLink from "../localized-client-link"

type InteractiveLinkProps = {
  href: string
  children?: React.ReactNode
  onClick?: () => void
  className?: string
}

const InteractiveLink = ({
  href,
  children,
  onClick,
  className,
  ...props
}: InteractiveLinkProps) => {
  return (
    <LocalizedClientLink
      href={href}
      onClick={onClick}
      className={clx(
        "group inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-white/75 backdrop-blur-xl transition-all duration-300",
        "hover:border-white/20 hover:bg-white/[0.08] hover:text-white",
        "hover:shadow-[0_8px_24px_rgba(0,0,0,0.14)]",
        className
      )}
      {...props}
    >
      <span className="leading-none">{children}</span>

      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white/[0.06] transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:bg-white/[0.12]">
        <ArrowUpRightMini className="text-white/80" />
      </span>
    </LocalizedClientLink>
  )
}

export default InteractiveLink
