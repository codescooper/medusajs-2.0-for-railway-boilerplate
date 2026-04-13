import { Badge } from "@medusajs/ui"

const PaymentTest = ({ className }: { className?: string }) => {
  if (process.env.NODE_ENV !== "development") return null

  return (
    <Badge
      className={`bg-yellow-400/10 text-yellow-300 border border-yellow-400/20 ${className}`}
    >
      Mode test
    </Badge>
  )
}

export default PaymentTest
