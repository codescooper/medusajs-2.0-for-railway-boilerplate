import { Metadata } from "next"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

export const metadata: Metadata = {
  title: "Mentions légales | La Grande Vision",
  description: "Mentions légales de La Grande Vision, opticien à Abidjan.",
}

export default function MentionsLegalesPage() {
  return (
    <div className="relative overflow-hidden py-16 small:py-24">
      {/* Fond décoratif */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[-100px] top-16 h-[260px] w-[260px] rounded-full bg-cyan-400/10 blur-[130px]" />
        <div className="absolute right-[-100px] bottom-20 h-[280px] w-[280px] rounded-full bg-blue-500/10 blur-[130px]" />
      </div>

      <div className="content-container relative z-10 max-w-3xl">
        <div className="mb-10">
          <span className="eyebrow-lgv">Informations légales</span>
          <h1 className="mt-4 text-4xl font-semibold tracking-[-0.03em] text-white">
            Mentions légales
          </h1>
        </div>

        <div className="section-shell border-gradient-lgv p-6 small:p-10 prose-lgv">
          <div className="space-y-8 text-sm leading-8 text-white/70">

            <section>
              <h2 className="mb-3 text-base font-semibold text-white">
                1. Éditeur du site
              </h2>
              <p>
                Le site <strong className="text-white">lagrandevision.ci</strong> est édité par <strong className="text-white">La Grande Vision</strong>, opticien établi à Abidjan, Côte d'Ivoire.
              </p>
              <p className="mt-2">
                Téléphone : +225 06 02 18 16
                <br />
                Email : contact@lagrandevision.ci
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-base font-semibold text-white">
                2. Directeur de la publication
              </h2>
              <p>
                Le directeur de la publication est le représentant légal de La Grande Vision.
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-base font-semibold text-white">
                3. Hébergement
              </h2>
              <p>
                Le site est hébergé par <strong className="text-white">Railway</strong> (Railway Corp., San Francisco, États-Unis — <a href="https://railway.app" className="text-cyan-300 underline underline-offset-4" target="_blank" rel="noreferrer">railway.app</a>).
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-base font-semibold text-white">
                4. Conception et développement
              </h2>
              <p>
                Site conçu et développé par <strong className="text-white">AwemA</strong>.
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-base font-semibold text-white">
                5. Propriété intellectuelle
              </h2>
              <p>
                L'ensemble des contenus présents sur ce site (textes, images, logos, vidéos) est la propriété exclusive de La Grande Vision ou de ses partenaires. Toute reproduction, même partielle, est strictement interdite sans autorisation écrite préalable.
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-base font-semibold text-white">
                6. Responsabilité
              </h2>
              <p>
                La Grande Vision s'efforce de maintenir les informations publiées à jour et exactes. Elle ne saurait être tenue responsable des erreurs ou omissions, ni des dommages résultant de l'utilisation du site ou de l'impossibilité d'y accéder.
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-base font-semibold text-white">
                7. Données personnelles
              </h2>
              <p>
                Le traitement des données personnelles des utilisateurs est décrit dans notre{" "}
                <LocalizedClientLink
                  href="/politique-confidentialite"
                  className="text-cyan-300 underline underline-offset-4"
                >
                  Politique de confidentialité
                </LocalizedClientLink>
                .
              </p>
            </section>

          </div>
        </div>

        <div className="mt-8 flex flex-wrap gap-4 text-sm text-white/40">
          <LocalizedClientLink href="/politique-confidentialite" className="transition hover:text-white/70">
            Politique de confidentialité
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
