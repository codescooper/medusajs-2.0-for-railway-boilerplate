"use client"

import Link from "next/link"
import { useParams } from "next/navigation"
import React from "react"

type LocalizedClientLinkProps = {
  children?: React.ReactNode
  href: string
  className?: string
  onClick?: () => void
  [x: string]: any
}

const LocalizedClientLink = ({
  children,
  href,
  ...props
}: LocalizedClientLinkProps) => {
  const params = useParams()
  const countryCode = params?.countryCode as string | undefined

  // 👉 gérer les liens externes
  const isExternal = href.startsWith("http") || href.startsWith("mailto")

  if (isExternal) {
    return (
      <a href={href} {...props}>
        {children}
      </a>
    )
  }

  // 👉 sécuriser le format du lien
  const normalizedHref = href.startsWith("/") ? href : `/${href}`

  const finalHref = countryCode
    ? `/${countryCode}${normalizedHref}`
    : normalizedHref

  return (
    <Link href={finalHref} {...props}>
      {children}
    </Link>
  )
}

export default LocalizedClientLink
