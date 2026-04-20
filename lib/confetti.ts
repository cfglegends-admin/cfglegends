import confetti from "canvas-confetti"

export function fireVictoryConfetti(origin: "top" | "bottom" = "bottom") {
  if (typeof window === "undefined") return
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

  const y = origin === "top" ? 0.15 : 0.85
  const originPoint = { y, x: 0.5 }
  const colors = ["#D4AF37", "#E5C158", "#FCF6BA", "#BF953F"]

  confetti({
    particleCount: 80,
    spread: 90,
    startVelocity: 45,
    origin: originPoint,
    colors,
    scalar: 1.1,
    ticks: 200,
  })

  window.setTimeout(() => {
    confetti({
      particleCount: 50,
      angle: 60,
      spread: 55,
      origin: { x: 0.2, y },
      colors,
    })
  }, 250)

  window.setTimeout(() => {
    confetti({
      particleCount: 50,
      angle: 120,
      spread: 55,
      origin: { x: 0.8, y },
      colors,
    })
  }, 400)
}

