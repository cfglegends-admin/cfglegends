import { useEffect, useRef } from "react"

const FOCUSABLE =
  'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'

export function useFocusTrap(active: boolean) {
  const containerRef = useRef<HTMLDivElement>(null)
  const previousFocus = useRef<HTMLElement | null>(null)

  useEffect(() => {
    if (!active) return

    previousFocus.current = document.activeElement as HTMLElement | null

    const container = containerRef.current
    if (!container) return

    const focusFirst = () => {
      const first = container.querySelector<HTMLElement>(FOCUSABLE)
      first?.focus()
    }

    // Small delay so the portal is rendered and elements are focusable
    const timer = setTimeout(focusFirst, 50)

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return

      const focusable = Array.from(container.querySelectorAll<HTMLElement>(FOCUSABLE))
      if (focusable.length === 0) return

      const first = focusable[0]
      const last = focusable[focusable.length - 1]

      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault()
          last.focus()
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault()
          first.focus()
        }
      }
    }

    document.addEventListener("keydown", onKeyDown)

    return () => {
      clearTimeout(timer)
      document.removeEventListener("keydown", onKeyDown)
      previousFocus.current?.focus()
    }
  }, [active])

  return containerRef
}
