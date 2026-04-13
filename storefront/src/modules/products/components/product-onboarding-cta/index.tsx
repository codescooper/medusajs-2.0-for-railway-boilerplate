import { Button, Container, Text } from "@medusajs/ui"
import { cookies as nextCookies } from "next/headers"

async function ProductOnboardingCta() {
  const cookies = await nextCookies()

  const isOnboarding = cookies.get("_medusa_onboarding")?.value === "true"

  if (!isOnboarding) {
    return null
  }

  return (
    <Container className="w-full rounded-[1.75rem] border border-white/10 bg-white/[0.04] p-5 backdrop-blur-xl">
      <div className="flex flex-col gap-y-4">
        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-cyan-300/80">
            Configuration
          </p>
          <Text className="mt-2 text-xl font-semibold tracking-[-0.02em] text-white">
            Produit de démonstration créé avec succès
          </Text>
        </div>

        <Text className="text-sm leading-6 text-white/60">
          Vous pouvez maintenant poursuivre la configuration de votre boutique
          dans l'interface d'administration.
        </Text>

        <a
          href="http://localhost:7001/a/orders?onboarding_step=create_order_nextjs"
          className="w-full"
        >
          <Button
            className="
              w-full h-11 rounded-full
              bg-gradient-to-r from-cyan-400 to-blue-500
              text-black font-semibold
              hover:scale-[1.02] hover:shadow-lg hover:shadow-cyan-500/20
              transition-all duration-300
            "
          >
            Continuer dans l'admin
          </Button>
        </a>
      </div>
    </Container>
  )
}

export default ProductOnboardingCta
