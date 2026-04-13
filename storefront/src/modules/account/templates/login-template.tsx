"use client"

import { useState } from "react"

import Register from "@modules/account/components/register"
import Login from "@modules/account/components/login"

export enum LOGIN_VIEW {
  SIGN_IN = "sign-in",
  REGISTER = "register",
}

const LoginTemplate = () => {
  const [currentView, setCurrentView] = useState(LOGIN_VIEW.SIGN_IN)

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-gradient-to-b from-[#02040a] to-[#07111d]">
      {/* Orbes décoratifs */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[-120px] top-20 h-[280px] w-[280px] rounded-full bg-cyan-400/20 blur-[120px]" />
        <div className="absolute right-[-140px] top-32 h-[320px] w-[320px] rounded-full bg-blue-500/20 blur-[140px]" />
        <div className="absolute bottom-[-120px] left-1/3 h-[260px] w-[260px] rounded-full bg-cyan-300/10 blur-[120px]" />
      </div>

      <div className="relative z-10 content-container flex min-h-screen items-center justify-center py-10 md:py-16">
        {currentView === LOGIN_VIEW.SIGN_IN ? (
          <Login setCurrentView={setCurrentView} />
        ) : (
          <Register setCurrentView={setCurrentView} />
        )}
      </div>
    </div>
  )
}

export default LoginTemplate
