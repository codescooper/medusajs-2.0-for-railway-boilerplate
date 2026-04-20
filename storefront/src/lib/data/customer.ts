"use server"

import { sdk } from "@lib/config"
import medusaError from "@lib/util/medusa-error"
import { HttpTypes } from "@medusajs/types"
import { revalidateTag } from "next/cache"
import { redirect } from "next/navigation"
import { cache } from "react"
import {
  getAuthHeaders,
  getCacheOptions,
  removeAuthToken,
  setAuthToken,
} from "./cookies"

export const retrieveCustomer = async (): Promise<
  HttpTypes.StoreCustomer | null
> => {
  const authHeaders = await getAuthHeaders()

  if (!authHeaders || Object.keys(authHeaders).length === 0) return null

  const headers = {
    ...authHeaders,
  }

  const next = {
    ...(await getCacheOptions("customers")),
  }

  return await sdk.client
    .fetch<{ customer: HttpTypes.StoreCustomer }>(`/store/customers/me`, {
      method: "GET",
      query: {
        fields: "*orders",
      },
      headers,
      next,
      cache: "force-cache",
    })
    .then(({ customer }) => customer)
    .catch(() => null)
}

// FIXED: getAuthHeaders() était spread sans await → retournait une Promise au lieu des headers
// Le token JWT n'arrivait jamais à l'API → customer toujours null après login
export const getCustomer = cache(async function () {
  const authHeaders = await getAuthHeaders()
  return await sdk.store.customer
    .retrieve({}, { next: { tags: ["customer"] }, ...authHeaders })
    .then(({ customer }) => customer)
    .catch(() => null)
})

// FIXED: même correctif pour updateCustomer
export const updateCustomer = cache(async function (
  body: HttpTypes.StoreUpdateCustomer
) {
  const authHeaders = await getAuthHeaders()
  const updateRes = await sdk.store.customer
    .update(body, {}, authHeaders)
    .then(({ customer }) => customer)
    .catch(medusaError)

  revalidateTag("customer")
  return updateRes
})

export async function signup(_currentState: unknown, formData: FormData) {
  const password = formData.get("password") as string
  const customerForm = {
    email: formData.get("email") as string,
    first_name: formData.get("first_name") as string,
    last_name: formData.get("last_name") as string,
    phone: formData.get("phone") as string,
  }

  try {
    const token = await sdk.auth.register("customer", "emailpass", {
      email: customerForm.email,
      password: password,
    })

    const customHeaders = { authorization: `Bearer ${token}` }

    await sdk.store.customer.create(customerForm, {}, customHeaders)

    const loginToken = await sdk.auth.login("customer", "emailpass", {
      email: customerForm.email,
      password,
    })

    await setAuthToken(typeof loginToken === "string" ? loginToken : loginToken.location)

    revalidateTag("customer")
  } catch (error: any) {
    return error.toString()
  }

  // redirect() hors du try/catch — Next.js l'exige (lance NEXT_REDIRECT)
  redirect("/account")
}

export async function login(_currentState: unknown, formData: FormData) {
  const email = formData.get("email") as string
  const password = formData.get("password") as string

  try {
    const token = await sdk.auth.login("customer", "emailpass", { email, password })
    await setAuthToken(typeof token === "string" ? token : token.location)
    revalidateTag("customer")
  } catch (error: any) {
    return error.toString()
  }

  // redirect() hors du try/catch — Next.js l'exige (lance NEXT_REDIRECT)
  redirect("/account")
}

// FIXED: removeAuthToken() async non attendu → cookie jamais supprimé à la déconnexion
export async function signout(countryCode: string) {
  await sdk.auth.logout()
  await removeAuthToken()
  revalidateTag("auth")
  revalidateTag("customer")
  redirect(`/${countryCode}/account`)
}

// FIXED: getAuthHeaders() await manquant sur toutes les opérations d'adresse
export const addCustomerAddress = async (
  _currentState: unknown,
  formData: FormData
): Promise<any> => {
  const address = {
    first_name: formData.get("first_name") as string,
    last_name: formData.get("last_name") as string,
    company: formData.get("company") as string,
    address_1: formData.get("address_1") as string,
    address_2: formData.get("address_2") as string,
    city: formData.get("city") as string,
    postal_code: formData.get("postal_code") as string,
    province: formData.get("province") as string,
    country_code: formData.get("country_code") as string,
    phone: formData.get("phone") as string,
  }

  const authHeaders = await getAuthHeaders()

  return sdk.store.customer
    .createAddress(address, {}, authHeaders)
    .then(({ customer }) => {
      revalidateTag("customer")
      return { success: true, error: null }
    })
    .catch((err) => {
      return { success: false, error: err.toString() }
    })
}

export const deleteCustomerAddress = async (
  addressId: string
): Promise<void> => {
  const authHeaders = await getAuthHeaders()

  await sdk.store.customer
    .deleteAddress(addressId, authHeaders)
    .then(() => {
      revalidateTag("customer")
      return { success: true, error: null }
    })
    .catch((err) => {
      return { success: false, error: err.toString() }
    })
}

export const updateCustomerAddress = async (
  currentState: Record<string, unknown>,
  formData: FormData
): Promise<any> => {
  const addressId = currentState.addressId as string

  const address = {
    first_name: formData.get("first_name") as string,
    last_name: formData.get("last_name") as string,
    company: formData.get("company") as string,
    address_1: formData.get("address_1") as string,
    address_2: formData.get("address_2") as string,
    city: formData.get("city") as string,
    postal_code: formData.get("postal_code") as string,
    province: formData.get("province") as string,
    country_code: formData.get("country_code") as string,
    phone: formData.get("phone") as string,
  }

  const authHeaders = await getAuthHeaders()

  return sdk.store.customer
    .updateAddress(addressId, address, {}, authHeaders)
    .then(() => {
      revalidateTag("customer")
      return { success: true, error: null }
    })
    .catch((err) => {
      return { success: false, error: err.toString() }
    })
}
