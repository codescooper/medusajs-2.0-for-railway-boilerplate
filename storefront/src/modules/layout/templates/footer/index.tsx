import { listCategories } from "@lib/data/categories"
import { listCollections } from "@lib/data/collections"
import { Text, clx } from "@medusajs/ui"

import LocalizedClientLink from "@modules/common/components/localized-client-link"

export default async function Footer() {
  const { collections } = await listCollections({
    fields: "*products",
  })

  const productCategories = await listCategories()

  return (
    <footer className="relative mt-16 border-t border-white/10 pt-10 pb-6">
      <div className="content-container">
        <div className="section-shell border-gradient-lgv px-6 py-8 md:px-8 md:py-10">
          <div className="grid gap-10 md:grid-cols-[1.2fr_1fr_1fr_1fr]">
            {/* Marque */}
            <div>
              <LocalizedClientLink
                href="/"
                className="group inline-flex flex-col leading-none"
              >
                <span className="text-[10px] uppercase tracking-[0.28em] text-cyan-300/80">
                  Optique premium
                </span>
                <span className="mt-2 text-base font-semibold uppercase tracking-[0.22em] text-white transition duration-300 group-hover:text-cyan-200 md:text-lg">
                  La Grande Vision
                </span>
              </LocalizedClientLink>

              <p className="mt-5 max-w-[32ch] text-sm leading-7 text-white/70">
                Votre partenaire pour une vision claire, confortable et élégante,
                dans un univers moderne, rassurant et haut de gamme.
              </p>

              <div className="mt-6 flex flex-col gap-3">
                <a
                  href="https://wa.me/22506021816"
                  target="_blank"
                  rel="noreferrer"
                  className="secondary-btn w-fit !px-4 !py-2 !text-sm"
                >
                  WhatsApp
                </a>

                <div className="text-sm text-white/60">
                  Abidjan, Côte d'Ivoire
                </div>
              </div>
            </div>

            {/* Catégories */}
            {productCategories && productCategories?.length > 0 && (
              <div>
                <h3 className="mb-4 text-sm font-semibold uppercase tracking-[0.16em] text-white/85">
                  Catégories
                </h3>

                <ul
                  className="grid gap-3 text-sm text-white/65"
                  data-testid="footer-categories"
                >
                  {productCategories?.slice(0, 6).map((c) => {
                    if (c.parent_category) return null

                    const children =
                      c.category_children?.map((child) => ({
                        name: child.name,
                        handle: child.handle,
                        id: child.id,
                      })) || null

                    return (
                      <li key={c.id} className="flex flex-col gap-2">
                        <LocalizedClientLink
                          className={clx(
                            "nav-link-lgv w-fit text-sm text-white/70",
                            children && "font-medium text-white"
                          )}
                          href={`/categories/${c.handle}`}
                          data-testid="category-link"
                        >
                          {c.name}
                        </LocalizedClientLink>

                        {children && (
                          <ul className="ml-3 grid gap-2">
                            {children.map((child) => (
                              <li key={child.id}>
                                <LocalizedClientLink
                                  className="text-sm text-white/55 transition hover:text-cyan-200"
                                  href={`/categories/${child.handle}`}
                                  data-testid="category-link"
                                >
                                  {child.name}
                                </LocalizedClientLink>
                              </li>
                            ))}
                          </ul>
                        )}
                      </li>
                    )
                  })}
                </ul>
              </div>
            )}

            {/* Collections */}
            {collections && collections.length > 0 && (
              <div>
                <h3 className="mb-4 text-sm font-semibold uppercase tracking-[0.16em] text-white/85">
                  Collections
                </h3>

                <ul
                  className={clx("grid gap-3 text-sm text-white/65", {
                    "md:grid-cols-2": (collections?.length || 0) > 3,
                  })}
                >
                  {collections?.slice(0, 6).map((c) => (
                    <li key={c.id}>
                      <LocalizedClientLink
                        className="nav-link-lgv w-fit text-sm text-white/70"
                        href={`/collections/${c.handle}`}
                      >
                        {c.title}
                      </LocalizedClientLink>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Liens utiles */}
            <div>
              <h3 className="mb-4 text-sm font-semibold uppercase tracking-[0.16em] text-white/85">
                Liens utiles
              </h3>

              <ul className="grid gap-3 text-sm text-white/65">
                <li>
                  <LocalizedClientLink
                    href="/store"
                    className="nav-link-lgv w-fit text-sm text-white/70"
                  >
                    Boutique
                  </LocalizedClientLink>
                </li>
                <li>
                  <LocalizedClientLink
                    href="/consultation"
                    className="nav-link-lgv w-fit text-sm text-white/70"
                  >
                    Consultation
                  </LocalizedClientLink>
                </li>
                <li>
                  <LocalizedClientLink
                    href="/account"
                    className="nav-link-lgv w-fit text-sm text-white/70"
                  >
                    Mon compte
                  </LocalizedClientLink>
                </li>
                <li>
                  <LocalizedClientLink
                    href="/cart"
                    className="nav-link-lgv w-fit text-sm text-white/70"
                  >
                    Panier
                  </LocalizedClientLink>
                </li>
                <li>
                  <LocalizedClientLink
                    href="/contact"
                    className="nav-link-lgv w-fit text-sm text-white/70"
                  >
                    Contact
                  </LocalizedClientLink>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-8 border-t border-white/10 pt-5">
            <div className="flex flex-col gap-3 text-sm text-white/50 md:flex-row md:items-center md:justify-between">
              <Text className="text-sm text-white/50">
                © {new Date().getFullYear()} conçue par AwemA pour La Grande Vision. Tous droits réservés.
              </Text>

              <div className="flex flex-wrap items-center gap-4">
                <LocalizedClientLink
                  href="/mentions-legales"
                  className="transition hover:text-white/80"
                >
                  Mentions légales
                </LocalizedClientLink>
                <LocalizedClientLink
                  href="/politique-confidentialite"
                  className="transition hover:text-white/80"
                >
                  Confidentialité
                </LocalizedClientLink>
                <LocalizedClientLink
                  href="/cgv"
                  className="transition hover:text-white/80"
                >
                  CGV
                </LocalizedClientLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
