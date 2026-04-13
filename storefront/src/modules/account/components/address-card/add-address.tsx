"use client"

import { Plus } from "@medusajs/icons"
import { Button } from "@medusajs/ui"
import { useEffect, useState, useActionState } from "react"

import useToggleState from "@lib/hooks/use-toggle-state"
import CountrySelect from "@modules/checkout/components/country-select"
import Input from "@modules/common/components/input"
import Modal from "@modules/common/components/modal"
import { SubmitButton } from "@modules/checkout/components/submit-button"
import { HttpTypes } from "@medusajs/types"
import { addCustomerAddress } from "@lib/data/customer"

const AddAddress = ({
  region,
  addresses,
}: {
  region: HttpTypes.StoreRegion
  addresses: HttpTypes.StoreCustomerAddress[]
}) => {
  const [successState, setSuccessState] = useState(false)
  const { state, open, close: closeModal } = useToggleState(false)

  const [formState, formAction] = useActionState(addCustomerAddress, {
    isDefaultShipping: addresses.length === 0,
    success: false,
    error: null,
  })

  const close = () => {
    setSuccessState(false)
    closeModal()
  }

  useEffect(() => {
    if (successState) close()
  }, [successState])

  useEffect(() => {
    if (formState.success) setSuccessState(true)
  }, [formState])

  return (
    <>
      {/* CARD ADD ADDRESS */}
      <button
        onClick={open}
        data-testid="add-address-button"
        className="
          group relative w-full min-h-[220px]
          rounded-[1.75rem]
          border border-white/10
          bg-white/[0.04]
          p-6
          flex flex-col justify-between
          backdrop-blur-xl
          transition-all duration-300
          hover:bg-white/[0.07]
          hover:scale-[1.01]
        "
      >
        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-cyan-300/70">
            Nouvelle adresse
          </p>

          <h3 className="mt-3 text-xl font-semibold text-white">
            Ajouter une adresse
          </h3>

          <p className="mt-2 text-sm text-white/50">
            Livraison ou facturation
          </p>
        </div>

        <div className="flex justify-end">
          <div className="
            flex items-center justify-center
            w-10 h-10 rounded-full
            bg-white/[0.06]
            group-hover:bg-cyan-400 group-hover:text-black
            transition
          ">
            <Plus />
          </div>
        </div>
      </button>

      {/* MODAL */}
      <Modal isOpen={state} close={close} data-testid="add-address-modal">
        <Modal.Title>
          <h2 className="text-2xl font-semibold text-white">
            Ajouter une adresse
          </h2>
          <p className="text-sm text-white/50 mt-2">
            Renseignez les informations pour vos livraisons
          </p>
        </Modal.Title>

        <form action={formAction}>
          <Modal.Body>
            <div className="flex flex-col gap-y-3">

              <div className="grid grid-cols-2 gap-x-3">
                <Input label="Prénom" name="first_name" required />
                <Input label="Nom" name="last_name" required />
              </div>

              <Input label="Entreprise" name="company" />

              <Input label="Adresse" name="address_1" required />

              <Input label="Complément" name="address_2" />

              <div className="grid grid-cols-[140px_1fr] gap-x-3">
                <Input label="Code postal" name="postal_code" required />
                <Input label="Ville" name="city" required />
              </div>

              <Input label="Région / État" name="province" />

              <CountrySelect
                region={region}
                name="country_code"
                required
              />

              <Input label="Téléphone" name="phone" />
            </div>

            {formState.error && (
              <div className="
                mt-4 rounded-xl
                border border-red-400/20
                bg-red-400/10
                px-4 py-3
                text-sm text-red-200
              ">
                {formState.error}
              </div>
            )}
          </Modal.Body>

          <Modal.Footer>
            <div className="flex gap-3 mt-6 w-full justify-end">
              <Button
                type="reset"
                onClick={close}
                className="
                  rounded-full border border-white/10
                  bg-white/[0.05] text-white
                  hover:bg-white/[0.08]
                "
                data-testid="cancel-button"
              >
                Annuler
              </Button>

              <SubmitButton
                data-testid="save-button"
                className="
                  rounded-full
                  bg-gradient-to-r from-cyan-400 to-blue-500
                  font-semibold text-black
                  hover:scale-[1.02]
                  transition
                "
              >
                Enregistrer
              </SubmitButton>
            </div>
          </Modal.Footer>
        </form>
      </Modal>
    </>
  )
}

export default AddAddress
