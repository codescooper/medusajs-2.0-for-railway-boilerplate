import Image from "next/image"

export default function Hero() {
  return (
    <section className="relative overflow-hidden pt-8 md:pt-14 xl:pt-16">
      <div className="content-container">
        <div className="hero-panel bg-lgv-radial relative grid min-h-[700px] items-center gap-10 overflow-hidden px-6 py-8 md:grid-cols-2 md:px-10 md:py-10 xl:min-h-[760px] xl:px-14 xl:py-14">
          {/* Orbes décoratifs */}
          <div className="floating-orb animate-float-slow left-[-60px] top-[40px] h-40 w-40 bg-cyan-400/20" />
          <div className="floating-orb animate-float-soft right-[-40px] top-[120px] h-52 w-52 bg-blue-500/20" />
          <div className="floating-orb bottom-[-40px] left-[20%] h-44 w-44 bg-white/10 blur-3xl" />

          {/* Colonne texte */}
          <div className="relative z-10 animate-reveal-up">
            <span className="eyebrow-lgv">Optique premium & santé visuelle</span>

            <h1 className="section-title-lgv text-gradient-lgv mt-4 max-w-[11ch]">
              Voir avec précision, choisir avec élégance
            </h1>

            <p className="section-subtitle-lgv mt-5 max-w-[60ch]">
              La Grande Vision vous accompagne avec des lunettes médicales et
              solaires pensées pour allier performance visuelle, confort
              quotidien et allure raffinée, dans un univers moderne, rassurant
              et haut de gamme.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a href="/store" className="primary-btn">
                Explorer la collection
              </a>
              <a href="/contact" className="secondary-btn">
                Réserver une consultation
              </a>
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-3 text-sm text-white/55">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-300" />
                Accompagnement personnalisé
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-cyan-300" />
                Montures premium
              </span>
            </div>

            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              <div className="glass-panel px-4 py-4 hover-lift">
                <p className="text-sm font-semibold text-white">Précision</p>
                <p className="mt-1 text-sm leading-relaxed text-white/65">
                  Une orientation adaptée à votre besoin visuel.
                </p>
              </div>

              <div className="glass-panel px-4 py-4 hover-lift">
                <p className="text-sm font-semibold text-white">Style</p>
                <p className="mt-1 text-sm leading-relaxed text-white/65">
                  Des montures modernes, élégantes et affirmées.
                </p>
              </div>

              <div className="glass-panel px-4 py-4 hover-lift">
                <p className="text-sm font-semibold text-white">Confiance</p>
                <p className="mt-1 text-sm leading-relaxed text-white/65">
                  Un cadre premium inspiré par l'exigence médicale.
                </p>
              </div>
            </div>
          </div>

          {/* Colonne image */}
          <div className="relative z-10 animate-blur-in">
            <div className="relative mx-auto max-w-[640px]">
              {/* Carte image principale */}
              <div className="glass-panel-dark relative overflow-hidden rounded-[2rem] border border-white/10 p-3 shadow-[0_20px_60px_rgba(0,0,0,0.28)] glow-cyan">
                <div className="relative h-[420px] overflow-hidden rounded-[1.5rem] md:h-[580px]">
                  <Image
                    src="/images/hero/hero-optique-main.jpg"
                    alt="La Grande Vision - optique premium"
                    fill
                    priority
                    className="object-cover"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
                  <div className="absolute inset-y-0 left-0 w-[35%] bg-gradient-to-r from-black/20 to-transparent" />

                  {/* Cercle focus */}
                  <div className="pointer-events-none absolute left-1/2 top-1/2 h-44 w-44 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/25 shadow-[0_0_0_18px_rgba(255,255,255,0.04)]" />

                  {/* Micro label in-image */}
                  <div className="absolute bottom-4 left-4 rounded-full border border-white/10 bg-black/20 px-4 py-2 backdrop-blur-xl">
                    <p className="text-xs uppercase tracking-[0.18em] text-white/65">
                      Regard net
                    </p>
                  </div>
                </div>
              </div>

              {/* Carte flottante haute */}
              <div className="glass-panel absolute left-[-10px] top-6 max-w-[220px] px-4 py-4 animate-float-soft">
                <p className="text-xs uppercase tracking-[0.16em] text-white/50">
                  Vision nette
                </p>
                <p className="mt-2 text-sm font-semibold leading-snug text-white">
                  Confort, précision et élégance au quotidien
                </p>
              </div>

              {/* Carte flottante basse */}
              <div className="glass-panel absolute bottom-6 right-[-10px] max-w-[240px] px-4 py-4 animate-float-slow">
                <p className="text-xs uppercase tracking-[0.16em] text-white/50">
                  Consultation
                </p>
                <p className="mt-2 text-sm font-semibold leading-snug text-white">
                  Un accompagnement adapté à chaque besoin visuel
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
