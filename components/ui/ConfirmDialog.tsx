"use client"

import { m, AnimatePresence } from "framer-motion"
import { useEffect, useState } from "react"
import { createPortal } from "react-dom"
import { cn } from "@/lib/utils"

interface ConfirmDialogProps {
  open: boolean
  onClose: () => void
  onConfirm: () => void
  title: string
  description?: string
  confirmLabel?: string
  cancelLabel?: string
  variant?: "default" | "destructive"
}

export function ConfirmDialog({
  open,
  onClose,
  onConfirm,
  title,
  description,
  confirmLabel = "Bestätigen",
  cancelLabel = "Abbrechen",
  variant = "default",
}: ConfirmDialogProps) {
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden"
      return () => {
        document.body.style.overflow = ""
      }
    }
  }, [open])

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape" && open) onClose()
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [open, onClose])

  const [mounted, setMounted] = useState(false)
  useEffect(() => { setMounted(true) }, [])

  if (!mounted) return null

  function handleConfirm() {
    onConfirm()
    onClose()
  }

  return createPortal(
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 flex items-center justify-center p-4" style={{ zIndex: 9999, isolation: "isolate" }}>
          <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
          />

          <m.div
            initial={{ opacity: 0, scale: 0.94, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 20 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 w-full max-w-md overflow-hidden rounded-2xl border border-gold/20 bg-muted shadow-2xl shadow-black/60"
          >
            <div className="h-px bg-gradient-to-r from-transparent via-gold to-transparent" />

            <div className="p-8">
              <h2 className="font-display text-xl font-semibold text-gold tracking-wide">
                {title}
              </h2>
              {description && (
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                  {description}
                </p>
              )}

              <div className="mt-8 flex justify-end gap-3">
                <button
                  onClick={onClose}
                  className="rounded-lg border border-border bg-transparent px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-border/40"
                >
                  {cancelLabel}
                </button>
                <button
                  onClick={handleConfirm}
                  className={cn(
                    "rounded-lg px-5 py-2.5 text-sm font-semibold transition-colors",
                    variant === "destructive"
                      ? "bg-red-500 text-white hover:bg-red-600"
                      : "bg-gold text-background hover:bg-gold-bright"
                  )}
                >
                  {confirmLabel}
                </button>
              </div>
            </div>
          </m.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  )
}
