"use client"

import { useActionState } from "react"
import Input from "@modules/common/components/input"
import { LOGIN_VIEW } from "@modules/account/templates/login-template"
import ErrorMessage from "@modules/checkout/components/error-message"
import { SubmitButton } from "@modules/checkout/components/submit-button"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { signup } from "@lib/data/customer"

type Props = {
  setCurrentView: (view: LOGIN_VIEW) => void
}

const Register = ({ setCurrentView }: Props) => {
  const [message, formAction] = useActionState(signup, null)

  return (
    <div
      className="w-full rounded-[1.75rem] border border-white/10 bg-white/[0.04] p-6 backdrop-blur-xl md:p-8"
      data-testid="register-page"
    >
      <div className="mb-8 text-center">
        <span className="eyebrow-lgv">Créer un compte</span>

        <h2 className="mt-3 text-3xl font-semibold tracking-[-0.03em] text-white md:text-4xl">
          Rejoignez La Grande Vision
        </h2>

        <p className="mt-4 text-sm leading-7 text-white/65 md:text-base">
          Créez votre espace client pour suivre vos commandes, gérer vos
          informations et profiter d'une expérience plus fluide.
        </p>
      </div>

      <form className="flex w-full flex-col" action={formAction}>
        <div className="flex w-full flex-col gap-y-3">
          <Input
            label="Prénom"
            name="first_name"
            required
            autoComplete="given-name"
            data-testid="first-name-input"
          />

          <Input
            label="Nom"
            name="last_name"
            required
            autoComplete="family-name"
            data-testid="last-name-input"
          />

          <Input
            label="Email"
            name="email"
            required
            type="email"
            autoComplete="email"
            data-testid="email-input"
          />

          <Input
            label="Téléphone"
            name="phone"
            type="tel"
            autoComplete="tel"
            data-testid="phone-input"
          />

          <Input
            label="Mot de passe"
            name="password"
            required
            type="password"
            autoComplete="new-password"
            data-testid="password-input"
          />
        </div>

        <div className="mt-4">
          <ErrorMessage error={message} data-testid="register-error" />
        </div>

        <div className="mt-5 text-center">
          <span className="text-sm leading-7 text-white/50">
            En créant un compte, vous acceptez notre{" "}
            <LocalizedClientLink
              href="/politique-confidentialite"
              className="font-medium text-cyan-200 underline underline-offset-4 transition hover:text-cyan-100"
            >
              politique de confidentialité
            </LocalizedClientLink>{" "}
            et nos{" "}
            <LocalizedClientLink
              href="/cgv"
              className="font-medium text-cyan-200 underline underline-offset-4 transition hover:text-cyan-100"
            >
              conditions d'utilisation
            </LocalizedClientLink>
            .
          </span>
        </div>

        <SubmitButton
          className="
            mt-6 w-full rounded-full
            bg-gradient-to-r from-cyan-400 to-blue-500
            font-semibold text-black
            transition-all duration-300
            hover:scale-[1.01]
            hover:shadow-lg hover:shadow-cyan-500/20
          "
          data-testid="register-button"
        >
          Créer mon compte
        </SubmitButton>
      </form>

      <div className="mt-6 border-t border-white/10 pt-5 text-center">
        <span className="text-sm text-white/55">
          Vous avez déjà un compte ?{" "}
          <button
            onClick={() => setCurrentView(LOGIN_VIEW.SIGN_IN)}
            className="font-medium text-cyan-200 underline underline-offset-4 transition hover:text-cyan-100"
            type="button"
          >
            Se connecter
          </button>
          .
        </span>
      </div>
    </div>
  )
}

export default Register
