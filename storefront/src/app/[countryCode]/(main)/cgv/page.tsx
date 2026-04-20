import { Metadata } from "next"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

export const metadata: Metadata = {
  title: "Conditions Générales de Vente | La Grande Vision",
  description:
    "Conditions générales de vente de La Grande Vision. Tout ce que vous devez savoir avant de passer commande.",
}

export default function CGVPage() {
  return (
    <div className="relative overflow-hidden py-16 small:py-24">
      {/* Fond décoratif */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[-100px] top-16 h-[260px] w-[260px] rounded-full bg-cyan-400/10 blur-[130px]" />
        <div className="absolute right-[-100px] bottom-20 h-[280px] w-[280px] rounded-full bg-blue-500/10 blur-[130px]" />
      </div>

      <div className="content-container relative z-10 max-w-3xl">
        <div className="mb-10">
          <span className="eyebrow-lgv">Nos engagements</span>
          <h1 className="mt-4 text-4xl font-semibold tracking-[-0.03em] text-white">
            Conditions Générales de Vente
          </h1>
          <p className="mt-4 text-sm text-white/45">
            Dernière mise à jour : avril 2025
          </p>
        </div>

        <div className="section-shell border-gradient-lgv p-6 small:p-10">
          <div className="space-y-8 text-sm leading-8 text-white/70">

            <section>
              <h2 className="mb-3 text-base font-semibold text-white">
                1. Objet
              </h2>
              <p>
                Les présentes conditions générales de vente (CGV) régissent les relations contractuelles entre <strong className="text-white">La Grande Vision</strong> (ci-après « le Vendeur ») et tout client passant commande via le site <strong className="text-white">lagrandevision.ci</strong> (ci-après « le Client »). Toute commande implique l'acceptation sans réserve des présentes CGV.
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-base font-semibold text-white">
                2. Produits et disponibilité
              </h2>
              <p>
                Les produits proposés sont décrits avec le plus grand soin. Les informations (descriptions, prix, images) sont données à titre indicatif et peuvent faire l'objet de modifications. Le Vendeur s'engage à honorer toute commande dans la limite des stocks disponibles. En cas d'indisponibilité, le Client sera informé dans les meilleurs délais et pourra annuler ou modifier sa commande.
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-base font-semibold text-white">
                3. Prix
              </h2>
              <p>
                Les prix sont indiqués en Francs CFA (XOF), toutes taxes comprises. Le Vendeur se réserve le droit de modifier ses prix à tout moment, les commandes étant facturées au tarif en vigueur au moment de la validation de la commande.
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-base font-semibold text-white">
                4. Commande
              </h2>
              <p>
                La commande est validée après confirmation du paiement. Un récapitulatif est envoyé par email à l'adresse fournie lors de l'inscription. Le Vendeur se réserve le droit d'annuler toute commande présentant un risque de fraude ou d'anomalie manifeste.
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-base font-semibold text-white">
                5. Paiement
              </h2>
              <p>
                Le paiement s'effectue en ligne par carte bancaire via notre prestataire sécurisé Stripe (certifié PCI-DSS). Les données bancaires ne sont ni stockées ni traitées par La Grande Vision.
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-base font-semibold text-white">
                6. Livraison
              </h2>
              <p>
                Les commandes sont livrées à l'adresse indiquée lors de la commande. Les délais et frais de livraison sont précisés au moment du passage de commande. En cas de retard imputable au transporteur, le Vendeur ne pourra être tenu responsable.
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-base font-semibold text-white">
                7. Retours et remboursements
              </h2>
              <p>
                Tout produit défectueux ou non conforme à la commande pourra faire l'objet d'un retour dans un délai de 7 jours suivant la réception, sous condition que le produit soit retourné dans son état et emballage d'origine. Pour toute demande de retour, contactez-nous via{" "}
                <LocalizedClientLink
                  href="/contact"
                  className="text-cyan-300 underline underline-offset-4"
                >
                  notre page de contact
                </LocalizedClientLink>
                .
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-base font-semibold text-white">
                8. Garantie
              </h2>
              <p>
                Tous les produits bénéficient de la garantie légale de conformité. Les montures et verres sont garantis contre les défauts de fabrication selon les conditions du fabricant, communiquées au moment de l'achat.
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-base font-semibold text-white">
                9. Responsabilité
              </h2>
              <p>
                Le Vendeur ne saurait être tenu responsable des dommages indirects résultant de l'utilisation de ses produits. Sa responsabilité est limitée au montant de la commande concernée.
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-base font-semibold text-white">
                10. Droit applicable et litiges
              </h2>
              <p>
                Les présentes CGV sont soumises au droit ivoirien. En cas de litige, une solution amiable sera recherchée en priorité. À défaut, les tribunaux compétents d'Abidjan auront juridiction exclusive.
              </p>
            </section>

          </div>
        </div>

        <div className="mt-8 flex flex-wrap gap-4 text-sm text-white/40">
          <LocalizedClientLink href="/mentions-legales" className="transition hover:text-white/70">
            Mentions légales
          </LocalizedClientLink>
          <span>·</span>
          <LocalizedClientLink href="/politique-confidentialite" className="transition hover:text-white/70">
            Confidentialité
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
