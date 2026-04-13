import { Heading, Text } from "@medusajs/ui"

import InteractiveLink from "@modules/common/components/interactive-link"

const EmptyCartMessage = () => {
  return (
    <div
      className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-b from-white/[0.06] to-white/[0.03] px-6 py-20 md:px-10 md:py-28"
      data-testid="empty-cart-message"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-0 h-40 w-40 -translate-x-1/2 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-32 w-32 rounded-full bg-emerald-200/10 blur-3xl" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
      </div>

      <div className="relative mx-auto flex max-w-2xl flex-col items-start text-left">
        <span className="eyebrow-lgv">Panier</span>

        <Heading
          level="h1"
          className="mt-3 max-w-[12ch] text-3xl font-semibold tracking-[-0.04em] text-white md:text-5xl"
        >
          Votre panier est encore vide
        </Heading>

        <Text className="mt-5 max-w-xl text-sm leading-relaxed text-white/65 md:text-base">
          Aucune sélection pour le moment. Parcourez notre collection et trouvez
          les montures, lunettes et essentiels qui correspondent à votre style
          et à vos besoins visuels.
        </Text>

        <div className="mt-8">
          <InteractiveLink href="/store">Découvrir la boutique</InteractiveLink>
        </div>
      </div>
    </div>
  )
}

export default EmptyCartMessage
