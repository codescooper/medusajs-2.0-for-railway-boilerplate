import { clx } from "@medusajs/ui"

const Divider = ({ className }: { className?: string }) => (
  <div
    className={clx(
      "relative h-px w-full my-2",
      className
    )}
  >
    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent" />
  </div>
)

export default Divider
