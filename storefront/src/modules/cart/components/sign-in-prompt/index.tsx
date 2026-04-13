import { Button, Heading, Text } from "@medusajs/ui"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

const SignInPrompt = () => {
  return (
    <div className="relative overflow-hidden rounded-[1.5rem] border border-white/10 bg-gradient-to-b from-white/[0.07] to-white/[0.03] px-5 py-5 md:px-6 md:py-6">
      {/* glow */}
      <div className="pointer-events-none absolute -right-6 -top-6 h-24 w-24 rounded-full bg-white/10 blur-2xl" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />

      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="max-w-sm">
          <span className="eyebrow-lgv">Compte</span>

          <Heading
            level="h2"
            className="mt-2 text-lg font-semibold tracking-[-0.02em] text-white md:text-xl"
          >
            Connectez-vous à votre espace
          </Heading>

          <Text className="mt-2 text-sm leading-relaxed text-white/55">
            Accédez à votre historique, suivez vos commandes et profitez d'une
            expérience personnalisée.
          </Text>
        </div>

        <LocalizedClientLink href="/account">
          <Button
            variant="secondary"
            className="
              h-11 rounded-full px-6
              border border-white/10
              bg-white/[0.06] text-white
              backdrop-blur-xl
              transition-all duration-300
              hover:bg-white/[0.1]
              hover:border-white/20
            "
            data-testid="sign-in-button"
          >
            Se connecter
          </Button>
        </LocalizedClientLink>
      </div>
    </div>
  )
}

export default SignInPrompt
