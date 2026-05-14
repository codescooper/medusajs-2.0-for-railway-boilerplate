"use server"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export async function resetOnboardingState(orderId: string) {
  const cookieStore = await cookies()
  cookieStore.set("_medusa_onboarding", "false", { maxAge: -1 })

  const adminBaseUrl = (
    process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL || "http://localhost:9000"
  ).replace(/\/$/, "")
  redirect(`${adminBaseUrl}/app/orders/${orderId}`)
}
