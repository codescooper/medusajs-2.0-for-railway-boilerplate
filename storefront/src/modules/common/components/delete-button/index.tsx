import { deleteLineItem } from "@lib/data/cart"
import { Spinner, Trash } from "@medusajs/icons"
import { clx } from "@medusajs/ui"
import { useState } from "react"

const DeleteButton = ({
  id,
  children = "Supprimer",
  className,
}: {
  id: string
  children?: React.ReactNode
  className?: string
}) => {
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDelete = async (id: string) => {
    setIsDeleting(true)
    await deleteLineItem(id).catch(() => {
      setIsDeleting(false)
    })
  }

  return (
    <div className={clx("flex items-center", className)}>
      <button
        onClick={() => handleDelete(id)}
        className={clx(
          "group flex items-center gap-2 rounded-full px-3 py-2 text-sm transition-all duration-200",
          "border border-white/10 bg-white/[0.03] text-white/60",
          "hover:bg-red-500/10 hover:border-red-400/30 hover:text-red-300",
          "active:scale-[0.97]"
        )}
      >
        {isDeleting ? (
          <Spinner className="h-4 w-4 animate-spin text-red-300" />
        ) : (
          <Trash className="h-4 w-4 transition-transform duration-200 group-hover:scale-110" />
        )}

        <span className="leading-none">
          {isDeleting ? "Suppression..." : children}
        </span>
      </button>
    </div>
  )
}

export default DeleteButton
