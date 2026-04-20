import { Metadata } from "next"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

export const metadata: Metadata = {
  title: "Politique de confidentialité | La Grande Vision",
  description:
    "Découvrez comment La Grande Vision collecte, utilise et protège vos données personnelles.",
}

export default function PolitiqueConfidentialitePage() {
  return (
    <div className="relative overflow-hidden py-16 small:py-24">
      {/* Fond décoratif */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[-100px] top-16 h-[260px] w-[260px] rounded-full bg-cyan-400/10 blur-[130px]" />
        <div className="absolute right-[-100px] bottom-20 h-[280px] w-[280px] rounded-full bg-blue-500/10 blur-[130px]" />
      </div>

      <div className="content-container relative z-10 max-w-3xl">
        <div className="mb-10">
          <span className="eyebrow-lgv">Vos données, notre engagement</span>
          <h1 className="mt-4 text-4xl font-semibold tracking-[-0.03em] text-white">
            Politique de confidentialité
          </h1>
          <p className="mt-4 text-sm text-white/45">
            Dernière mise à jour : avril 2025
          </p>
        </div>

        <div className="section-shell border-gradient-lgv p-6 small:p-10">
          <div className="space-y-8 text-sm leading-8 text-white/70">

            <section>
              <h2 className="mb-3 text-base font-semibold text-white">
                1. Responsable du traitement
              </h2>
              <p>
                Le responsable du traitement des données est <strong className="text-white">La Grande Vision</strong>, opticien établi à Abidjan, Côte d'Ivoire. Contact : +225 06 02 18 16.
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-base font-semibold text-white">
                2. Données collectées
              </h2>
              <p>Nous collectons les données suivantes :</p>
              <ul className="mt-2 list-disc pl-5 space-y-1">
                <li>Données d'identification : nom, prénom, adresse email, numéro de téléphone.</li>
                <li>Données de livraison : adresse postale.</li>
                <li>Données de navigation : cookies, adresse IP, pages visitées.</li>
                <li>Données de commande : articles achetés, historique des transactions.</li>
              </ul>
            </section>

            <section>
              <h2 className="mb-3 text-base font-semibold text-white">
                3. Finalités du traitement
              </h2>
              <p>Vos données sont utilisées pour :</p>
              <ul className="mt-2 list-disc pl-5 space-y-1">
                <li>Gérer votre compte client et traiter vos commandes.</li>
                <li>Vous envoyer des confirmations de commande et notifications.</li>
                <li>Assurer le service après-vente et répondre à vos demandes.</li>
                <li>Améliorer notre site et personnaliser votre expérience.</li>
                <li>Respecter nos obligations légales et comptables.</li>
              </ul>
            </section>

            <section>
              <h2 className="mb-3 text-base font-semibold text-white">
                4. Partage des données
              </h2>
              <p>
                Vos données ne sont jamais vendues à des tiers. Elles peuvent être partagées avec nos prestataires techniques (hébergement, paiement sécurisé) dans le strict cadre de la fourniture de leurs services, et soumis aux mêmes obligations de confidentialité.
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-base font-semibold text-white">
                5. Conservation des données
              </h2>
              <p>
                Vos données sont conservées pendant la durée nécessaire à la fourniture de nos services, et au minimum 5 ans à compter de la dernière commande pour respecter nos obligations comptables et légales.
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-base font-semibold text-white">
                6. Vos droits
              </h2>
              <p>
                Vous disposez d'un droit d'accès, de rectification, d'effacement et de portabilité de vos données. Pour exercer ces droits, contactez-nous via{" "}
                <LocalizedClientLink
                  href="/contact"
                  className="text-cyan-300 underline underline-offset-4"
                >
                  notre page de contact
                </LocalizedClientLink>{" "}
                ou par WhatsApp au +225 06 02 18 16.
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-base font-semibold text-white">
                7. Cookies
              </h2>
              <p>
                Notre site utilise des cookies strictement nécessaires au fonctionnement (session, panier, authentification). Aucun cookie publicitaire ou de tracking tiers n'est installé sans votre consentement explicite.
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-base font-semibold text-white">
                8. Sécurité
              </h2>
              <p>
                Les paiements sont traités via des prestataires certifiés PCI-DSS (Stripe). Vos données de carte bancaire ne transitent pas par nos serveurs et ne sont jamais stockées par nous.
              </p>
            </section>

          </div>
        </div>

        <div className="mt-8 flex flex-wrap gap-4 text-sm text-white/40">
          <LocalizedClientLink href="/mentions-legales" className="transition hover:text-white/70">
            Mentions légales
          </LocalizedClientLink>
          <span>·</span>
          <LocalizedClientLink href="/cgv" className="transition hover:text-white/70">
            CGV
          </LocalizedClientLink>
          <span>·</span>
          <LocalizedClientLink href="/" className="transition hover:text-white/70">
            ← Accueil
          </LocalizedClientLink>
        </div>
      </div>
    </div>
  )
}
