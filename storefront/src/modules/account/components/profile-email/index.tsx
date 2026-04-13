"use client"

import React, { useEffect, useActionState } from "react"

import Input from "@modules/common/components/input"
import AccountInfo from "../account-info"
import { HttpTypes } from "@medusajs/types"

type MyInformationProps = {
  customer: HttpTypes.StoreCustomer
}

const ProfileEmail: React.FC<MyInformationProps> = ({ customer }) => {
  const [successState, setSuccessState] = React.useState(false)

  const updateCustomerEmail = async (
    _currentState: Record<string, unknown>,
    formData: FormData
  ) => {
    const payload = {
      email: formData.get("email") as string,
    }

    try {
      // await updateCustomer(payload)
      return { success: true, error: null }
    } catch (error: any) {
      return {
        success: false,
        error:
          error?.message ||
          "Une erreur est survenue lors de la mise à jour de votre email.",
      }
    }
  }

  const [state, formAction] = useActionState(updateCustomerEmail, {
    error: null as string | null,
    success: false,
  })

  const clearState = () => {
    setSuccessState(false)
  }

  useEffect(() => {
    setSuccessState(state.success)
  }, [state])

  return (
    <form action={formAction} className="w-full">
      <AccountInfo
        label="Email"
        currentInfo={
          <span className="font-medium text-white" data-testid="current-info">
            {customer.email}
          </span>
        }
        isSuccess={successState}
        isError={!!state.error}
        errorMessage={state.error || undefined}
        clearState={clearState}
        data-testid="account-email-editor"
      >
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-xl">
          <div className="grid grid-cols-1 gap-y-4">
            <Input
              label="Adresse email"
              name="email"
              type="email"
              autoComplete="email"
              required
              defaultValue={customer.email}
              data-testid="email-input"
            />
          </div>
        </div>
      </AccountInfo>
    </form>
  )
}

export default ProfileEmail
