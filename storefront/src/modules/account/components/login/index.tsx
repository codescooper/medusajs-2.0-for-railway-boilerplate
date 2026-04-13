import { login } from "@lib/data/customer"
import { LOGIN_VIEW } from "@modules/account/templates/login-template"
import ErrorMessage from "@modules/checkout/components/error-message"
import { SubmitButton } from "@modules/checkout/components/submit-button"
import Input from "@modules/common/components/input"
import { useActionState } from "react"

type Props = {
  setCurrentView: (view: LOGIN_VIEW) => void
}

const Login = ({ setCurrentView }: Props) => {
  const [message, formAction] = useActionState(login, null)

  return (
    <div
      className="w-full max-w-md rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 backdrop-blur-xl md:p-8"
      data-testid="login-page"
    >
      <div className="mb-8 text-center">
        <span className="eyebrow-lgv">Espace client</span>

        <h1 className="mt-3 text-3xl md:text-4xl font-semibold tracking-[-0.03em] text-white">
          Heureux de vous revoir
        </h1>

        <p className="mt-4 text-sm md:text-base leading-7 text-white/65">
          Connectez-vous pour retrouver votre compte, suivre vos commandes
          et profiter d'une expérience d'achat plus fluide.
        </p>
      </div>

      <form className="w-full" action={formAction}>
        <div className="flex w-full flex-col gap-y-3">
          <Input
            label="Email"
            name="email"
            type="email"
            title="Entrez une adresse email valide."
            autoComplete="email"
            required
            data-testid="email-input"
          />

          <Input
            label="Mot de passe"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            data-testid="password-input"
          />
        </div>

        <div className="mt-4">
          <ErrorMessage error={message} data-testid="login-error-message" />
        </div>

        <SubmitButton
          data-testid="sign-in-button"
          className="
            mt-6 w-full rounded-full
            bg-gradient-to-r from-cyan-400 to-blue-500
            font-semibold text-black
            transition-all duration-300
            hover:scale-[1.01]
            hover:shadow-lg hover:shadow-cyan-500/20
          "
        >
          Se connecter
        </SubmitButton>
      </form>

      <div className="mt-6 border-t border-white/10 pt-5 text-center">
        <span className="text-sm text-white/55">
          Pas encore de compte ?{" "}
          <button
            onClick={() => setCurrentView(LOGIN_VIEW.REGISTER)}
            className="font-medium text-cyan-200 underline underline-offset-4 transition hover:text-cyan-100"
            data-testid="register-button"
            type="button"
          >
            Créer un compte
          </button>
          .
        </span>
      </div>
    </div>
  )
}

export default Login
