import { Metadata } from "next"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

export const metadata: Metadata = {
  title: "Contact | La Grande Vision",
  description:
    "Contactez La Grande Vision à Abidjan. Nous sommes à votre disposition pour toute question, conseil ou demande d'information.",
}

export default function ContactPage() {
  return (
    <div className="relative min-h-[70vh] overflow-hidden py-16 small:py-24">
      {/* Fond décoratif */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[-100px] top-16 h-[280px] w-[280px] rounded-full bg-cyan-400/15 blur-[130px]" />
        <div className="absolute right-[-120px] top-28 h-[320px] w-[320px] rounded-full bg-blue-500/15 blur-[140px]" />
        <div className="absolute bottom-[-80px] left-1/2 h-[240px] w-[240px] rounded-full bg-cyan-300/8 blur-[120px]" />
      </div>

      <div className="content-container relative z-10 max-w-4xl">
        {/* En-tête */}
        <div className="mb-12 text-center">
          <span className="eyebrow-lgv">Nous sommes à votre écoute</span>
          <h1 className="mt-4 text-4xl font-semibold tracking-[-0.03em] text-white small:text-5xl">
            Contactez-nous
          </h1>
          <p className="mx-auto mt-5 max-w-[52ch] text-base leading-8 text-white/65">
            Une question, un conseil, une réclamation ? Notre équipe vous
            répond dans les plus brefs délais.
          </p>
        </div>

        {/* Canaux de contact */}
        <div className="grid gap-6 small:grid-cols-3">
          {/* WhatsApp */}
          <a
            href="https://wa.me/22506021816"
            target="_blank"
            rel="noreferrer"
            className="group section-shell border-gradient-lgv flex flex-col gap-3 p-6 transition-all duration-300 hover:bg-white/[0.06]"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-cyan-400/10 ring-1 ring-cyan-400/20">
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-5 w-5 text-cyan-300"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
            </div>
            <p className="text-sm font-semibold text-white">WhatsApp</p>
            <p className="text-xs leading-6 text-white/55">
              Réponse rapide sur WhatsApp, 7j/7
            </p>
            <span className="mt-auto text-xs font-medium text-cyan-300 transition group-hover:text-cyan-200">
              +225 06 02 18 16
            </span>
          </a>

          {/* Téléphone */}
          <a
            href="tel:+22506021816"
            className="group section-shell border-gradient-lgv flex flex-col gap-3 p-6 transition-all duration-300 hover:bg-white/[0.06]"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-cyan-400/10 ring-1 ring-cyan-400/20">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.8}
                className="h-5 w-5 text-cyan-300"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
                />
              </svg>
            </div>
            <p className="text-sm font-semibold text-white">Téléphone</p>
            <p className="text-xs leading-6 text-white/55">
              Lun – Ven : 08h00 – 18h00
              <br />
              Sam : 09h00 – 16h00
            </p>
            <span className="mt-auto text-xs font-medium text-cyan-300 transition group-hover:text-cyan-200">
              +225 06 02 18 16
            </span>
          </a>

          {/* Localisation */}
          <div className="section-shell border-gradient-lgv flex flex-col gap-3 p-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-cyan-400/10 ring-1 ring-cyan-400/20">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.8}
                className="h-5 w-5 text-cyan-300"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                />
              </svg>
            </div>
            <p className="text-sm font-semibold text-white">Adresse</p>
            <p className="text-xs leading-6 text-white/55">
              Abidjan, Côte d'Ivoire
            </p>
            <span className="mt-auto text-xs font-medium text-white/40">
              Sur rendez-vous
            </span>
          </div>
        </div>

        {/* Encart rendez-vous */}
        <div className="mt-8 section-shell border-gradient-lgv flex flex-col gap-4 p-6 small:flex-row small:items-center small:justify-between small:p-8">
          <div>
            <h3 className="text-base font-semibold text-white">
              Vous préférez passer en magasin ?
            </h3>
            <p className="mt-1 text-sm text-white/55">
              Prenez rendez-vous pour bénéficier d'un bilan visuel complet
              avec l'un de nos experts.
            </p>
          </div>
          <LocalizedClientLink
            href="/consultation"
            className="secondary-btn shrink-0 !px-5 !py-2.5 !text-sm"
          >
            Prendre rendez-vous
          </LocalizedClientLink>
        </div>

        {/* Retour */}
        <div className="mt-10 text-center">
          <LocalizedClientLink
            href="/"
            className="nav-link-lgv text-sm text-white/55"
          >
            ← Retour à l'accueil
          </LocalizedClientLink>
        </div>
      </div>
    </div>
  )
}
