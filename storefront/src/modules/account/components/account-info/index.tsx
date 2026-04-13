import { Disclosure } from "@headlessui/react"
import { Button, clx } from "@medusajs/ui"
import { useEffect } from "react"

import useToggleState from "@lib/hooks/use-toggle-state"
import { useFormStatus } from "react-dom"

type AccountInfoProps = {
  label: string
  currentInfo: string | React.ReactNode
  isSuccess?: boolean
  isError?: boolean
  errorMessage?: string
  clearState: () => void
  children?: React.ReactNode
  "data-testid"?: string
}

const AccountInfo = ({
  label,
  currentInfo,
  isSuccess,
  isError,
  clearState,
  errorMessage = "Une erreur est survenue, veuillez réessayer.",
  children,
  "data-testid": dataTestid,
}: AccountInfoProps) => {
  const { state, close, toggle } = useToggleState()
  const { pending } = useFormStatus()

  const handleToggle = () => {
    clearState()
    setTimeout(() => toggle(), 100)
  }

  useEffect(() => {
    if (isSuccess) {
      close()
    }
  }, [isSuccess, close])

  return (
    <div
      className="rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-5 text-sm backdrop-blur-xl"
      data-testid={dataTestid}
    >
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="flex flex-col gap-2">
          <span className="text-[11px] uppercase tracking-[0.18em] text-cyan-300/75">
            {label}
          </span>

          <div className="flex items-center gap-x-4">
            {typeof currentInfo === "string" ? (
              <span
                className="font-medium text-white"
                data-testid="current-info"
              >
                {currentInfo}
              </span>
            ) : (
              currentInfo
            )}
          </div>
        </div>

        <div>
          <Button
            variant="secondary"
            className="
              min-h-[40px] rounded-full
              border border-white/10
              bg-white/[0.05] px-4 py-2
              text-white transition-all duration-300
              hover:bg-white/[0.08]
            "
            onClick={handleToggle}
            type={state ? "reset" : "button"}
            data-testid="edit-button"
            data-active={state}
          >
            {state ? "Annuler" : "Modifier"}
          </Button>
        </div>
      </div>

      {/* Success state */}
      <Disclosure>
        <Disclosure.Panel
          static
          className={clx(
            "overflow-hidden transition-[max-height,opacity] duration-300 ease-in-out",
            {
              "max-h-[1000px] opacity-100": isSuccess,
              "max-h-0 opacity-0": !isSuccess,
            }
          )}
          data-testid="success-message"
        >
          <div className="mt-4 rounded-xl border border-green-400/20 bg-green-400/10 px-4 py-3 text-sm text-green-200">
            {label} mis à jour avec succès.
          </div>
        </Disclosure.Panel>
      </Disclosure>

      {/* Error state */}
      <Disclosure>
        <Disclosure.Panel
          static
          className={clx(
            "overflow-hidden transition-[max-height,opacity] duration-300 ease-in-out",
            {
              "max-h-[1000px] opacity-100": isError,
              "max-h-0 opacity-0": !isError,
            }
          )}
          data-testid="error-message"
        >
          <div className="mt-4 rounded-xl border border-red-400/20 bg-red-400/10 px-4 py-3 text-sm text-red-200">
            {errorMessage}
          </div>
        </Disclosure.Panel>
      </Disclosure>

      {/* Editable content */}
      <Disclosure>
        <Disclosure.Panel
          static
          className={clx(
            "overflow-visible transition-[max-height,opacity] duration-300 ease-in-out",
            {
              "max-h-[1000px] opacity-100": state,
              "max-h-0 opacity-0": !state,
            }
          )}
        >
          <div className="mt-4 border-t border-white/10 pt-4">
            <div className="flex flex-col gap-y-3">
              <div>{children}</div>

              <div className="mt-2 flex items-center justify-end">
                <Button
                  isLoading={pending}
                  className="
                    w-full rounded-full
                    bg-gradient-to-r from-cyan-400 to-blue-500
                    font-semibold text-black
                    transition-all duration-300
                    hover:scale-[1.01]
                    hover:shadow-lg hover:shadow-cyan-500/20
                    small:max-w-[180px]
                  "
                  type="submit"
                  data-testid="save-button"
                >
                  Enregistrer
                </Button>
              </div>
            </div>
          </div>
        </Disclosure.Panel>
      </Disclosure>
    </div>
  )
}

export default AccountInfo
