import { ArrowUpRightMini } from "@medusajs/icons"
import { Text } from "@medusajs/ui"
import { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "404",
  description: "Page introuvable",
}

export default function NotFound() {
  return (
    <div className="relative flex min-h-[calc(100vh-64px)] flex-col items-center justify-center overflow-hidden bg-[#05070D] px-6 text-center text-white">

      {/* Background glow */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-[-120px] top-[10%] h-72 w-72 rounded-full bg-cyan-300/10 blur-3xl" />
        <div className="absolute right-[-100px] top-[30%] h-80 w-80 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute left-[20%] bottom-[5%] h-64 w-64 rounded-full bg-emerald-200/10 blur-3xl" />
      </div>

      {/* 404 avec effet lentille */}
      <div className="relative mb-6">
        <h1 className="text-[80px] md:text-[120px] font-semibold tracking-[-0.05em] text-white/20 blur-sm">
          404
        </h1>

        <div className="absolute inset-0 flex items-center justify-center">
          <div className="rounded-full border border-white/20 px-6 py-2 backdrop-blur-none">
            <span className="text-[80px] md:text-[120px] font-semibold tracking-[-0.05em] text-white">
              404
            </span>
          </div>
        </div>
      </div>

      <h1 className="text-2xl md:text-3xl font-semibold tracking-[-0.03em]">
        Vision introuvable
      </h1>

      <p className="mt-4 max-w-md text-sm md:text-base text-white/55 leading-relaxed">
        La page que vous recherchez semble hors de votre champ de vision.
        Ajustons la mise au point.
      </p>

      <Link
        className="mt-8 flex items-center gap-x-1 group"
        href="/"
      >
        <Text className="text-white/80 group-hover:text-white transition">
          Retour à l'accueil
        </Text>
        <ArrowUpRightMini
          className="transition duration-150 group-hover:rotate-45"
          color="white"
        />
      </Link>
    </div>
  )
}
