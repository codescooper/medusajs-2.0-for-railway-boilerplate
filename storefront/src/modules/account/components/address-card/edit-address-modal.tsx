"use client"

import React, { useEffect, useState, useActionState } from "react"
import { PencilSquare as Edit, Trash } from "@medusajs/icons"
import { Button, Heading, Text, clx } from "@medusajs/ui"

import useToggleState from "@lib/hooks/use-toggle-state"
import CountrySelect from "@modules/checkout/components/country-select"
import Input from "@modules/common/components/input"
import Modal from "@modules/common/components/modal"
import Spinner from "@modules/common/icons/spinner"
import { SubmitButton } from "@modules/checkout/components/submit-button"
import { HttpTypes } from "@medusajs/types"
import {
  deleteCustomerAddress,
  updateCustomerAddress,
} from "@lib/data/customer"

type EditAddressProps = {
  region: HttpTypes.StoreRegion
  address: HttpTypes.StoreCustomerAddress
  isActive?: boolean
}

const EditAddress: React.FC<EditAddressProps> = ({
  region,
  address,
  isActive = false,
}) => {
  const [removing, setRemoving] = useState(false)
  const [successState, setSuccessState] = useState(false)
  const { state, open, close: closeModal } = useToggleState(false)

  const [formState, formAction] = useActionState(updateCustomerAddress, {
    success: false,
    error: null,
    addressId: address.id,
  })

  const close = () => {
    setSuccessState(false)
    closeModal()
  }

  useEffect(() => {
    if (successState) {
      close()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [successState])

  useEffect(() => {
    if (formState.success) {
      setSuccessState(true)
    }
  }, [formState])

  const removeAddress = async () => {
    setRemoving(true)
    await deleteCustomerAddress(address.id)
    setRemoving(false)
  }

  return (
    <>
      <div
        className={clx(
          "group relative rounded-[1.75rem] p-6 min-h-[220px] flex flex-col justify-between transition-all duration-300",
          "border border-white/10 bg-white/[0.04] backdrop-blur-xl",
          "hover:bg-white/[0.07] hover:scale-[1.01]",
          {
            "ring-2 ring-cyan-400/40": isActive,
          }
        )}
        data-testid="address-container"
      >
        {/* INFO */}
        <div>
          <h3 className="text-lg font-semibold text-white">
            {address.first_name} {address.last_name}
          </h3>

          {address.company && (
            <p className="text-sm text-white/50">{address.company}</p>
          )}

          <div className="mt-3 text-sm text-white/70 leading-relaxed">
            <p>
              {address.address_1}
              {address.address_2 && `, ${address.address_2}`}
            </p>
            <p>
              {address.postal_code}, {address.city}
            </p>
            <p>
              {address.province && `${address.province}, `}
              {address.country_code?.toUpperCase()}
            </p>
          </div>
        </div>

        {/* ACTIONS */}
        <div className="flex justify-between items-center mt-6">

          <button
            onClick={open}
            className="
              flex items-center gap-2 text-sm
              text-white/60 hover:text-cyan-400
              transition
            "
          >
            <Edit className="w-4 h-4" />
            Modifier
          </button>

          <button
            onClick={removeAddress}
            className="
              flex items-center gap-2 text-sm
              text-white/50 hover:text-red-400
              transition
            "
          >
            {removing ? <Spinner /> : <Trash className="w-4 h-4" />}
            Supprimer
          </button>
        </div>
      </div>

      <Modal isOpen={state} close={close} data-testid="edit-address-modal">
        <Modal.Title>
          <h2 className="text-2xl font-semibold text-white">
            Modifier une adresse
          </h2>
          <p className="text-sm text-white/50 mt-2">
            Mettez à jour les informations de votre adresse
          </p>
        </Modal.Title>
        <form action={formAction}>
          <Modal.Body>
            <div className="flex flex-col gap-y-3">
              <div className="grid grid-cols-2 gap-x-3">
                <Input
                  label="Prénom"
                  name="first_name"
                  required
                  defaultValue={address.first_name || undefined}
                />
                <Input
                  label="Nom"
                  name="last_name"
                  required
                  defaultValue={address.last_name || undefined}
                />
              </div>
              <Input
                label="Entreprise"
                name="company"
                defaultValue={address.company || undefined}
              />
              <Input
                label="Adresse"
                name="address_1"
                required
                defaultValue={address.address_1 || undefined}
              />
              <Input
                label="Complément"
                name="address_2"
                defaultValue={address.address_2 || undefined}
              />
              <div className="grid grid-cols-[140px_1fr] gap-x-3">
                <Input
                  label="Code postal"
                  name="postal_code"
                  required
                  defaultValue={address.postal_code || undefined}
                />
                <Input
                  label="Ville"
                  name="city"
                  required
                  defaultValue={address.city || undefined}
                />
              </div>
              <Input
                label="Région / État"
                name="province"
                defaultValue={address.province || undefined}
              />
              <CountrySelect
                name="country_code"
                region={region}
                required
                defaultValue={address.country_code || undefined}
              />
              <Input
                label="Téléphone"
                name="phone"
                defaultValue={address.phone || undefined}
              />
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

export default EditAddress
