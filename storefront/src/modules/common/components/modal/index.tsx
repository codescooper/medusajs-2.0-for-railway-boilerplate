"use client"

import { Dialog, Transition } from "@headlessui/react"
import { clx } from "@medusajs/ui"
import React, { Fragment } from "react"

import { ModalProvider, useModal } from "@lib/context/modal-context"
import X from "@modules/common/icons/x"

type ModalProps = {
  isOpen: boolean
  close: () => void
  size?: "small" | "medium" | "large"
  search?: boolean
  children: React.ReactNode
  "data-testid"?: string
}

const Modal = ({
  isOpen,
  close,
  size = "medium",
  search = false,
  children,
  "data-testid": dataTestId,
}: ModalProps) => {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-[75]" onClose={close}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/50 backdrop-blur-xl" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div
            className={clx("flex min-h-full justify-center p-4 text-center", {
              "items-center": !search,
              "items-start pt-12": search,
            })}
          >
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-3 scale-[0.98]"
              enterTo="opacity-100 translate-y-0 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 scale-100"
              leaveTo="opacity-0 translate-y-3 scale-[0.98]"
            >
              <Dialog.Panel
                data-testid={dataTestId}
                className={clx(
                  "relative flex w-full transform flex-col justify-start overflow-hidden text-left align-middle transition-all",
                  "max-h-[85vh] rounded-[1.75rem] border border-white/10",
                  "shadow-[0_20px_60px_rgba(0,0,0,0.35)]",
                  {
                    "max-w-md": size === "small",
                    "max-w-xl": size === "medium",
                    "max-w-3xl": size === "large",
                    "bg-transparent border-none shadow-none": search,
                    "bg-gradient-to-b from-white/[0.08] to-white/[0.04] backdrop-blur-2xl":
                      !search,
                  }
                )}
              >
                {!search && (
                  <>
                    <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
                    <div className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-white/10 blur-2xl" />
                  </>
                )}

                <div
                  className={clx("relative", {
                    "p-5 md:p-6": !search,
                  })}
                >
                  <ModalProvider close={close}>{children}</ModalProvider>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}

const Title: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { close } = useModal()

  return (
    <Dialog.Title className="flex items-center justify-between gap-4 border-b border-white/10 pb-4">
      <div className="text-lg font-semibold tracking-[-0.02em] text-white md:text-xl">
        {children}
      </div>

      <button
        onClick={close}
        data-testid="close-modal-button"
        className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-white/65 transition-all duration-200 hover:border-white/20 hover:bg-white/[0.08] hover:text-white"
      >
        <X size={18} />
      </button>
    </Dialog.Title>
  )
}

const Description: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <Dialog.Description className="pt-4 text-sm leading-relaxed text-white/60">
      {children}
    </Dialog.Description>
  )
}

const Body: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <div className="pt-5 text-white">{children}</div>
}

const Footer: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="mt-6 flex items-center justify-end gap-3 border-t border-white/10 pt-4">
      {children}
    </div>
  )
}

Modal.Title = Title
Modal.Description = Description
Modal.Body = Body
Modal.Footer = Footer

export default Modal
