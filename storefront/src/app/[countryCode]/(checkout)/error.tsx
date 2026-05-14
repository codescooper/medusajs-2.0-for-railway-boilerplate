"use client"

import InteractiveLink from "@modules/common/components/interactive-link"

export default function Error({
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="flex flex-col gap-4 items-center justify-center min-h-[calc(100vh-64px)]">
      <h1 className="text-2xl-semi text-ui-fg-base">Une erreur est survenue</h1>
      <p className="text-small-regular text-ui-fg-base">
        Le paiement n'a pas pu aboutir. Veuillez réessayer.
      </p>
      <div className="flex gap-4">
        <button
          onClick={() => reset()}
          className="text-small-regular text-ui-fg-interactive hover:text-ui-fg-interactive-hover underline"
        >
          Réessayer
        </button>
        <InteractiveLink href="/cart">Retour au panier</InteractiveLink>
      </div>
    </div>
  )
}
