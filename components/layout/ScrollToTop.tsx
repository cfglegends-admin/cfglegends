"use client";

import { useEffect, useState } from "react";
import { ChevronUp } from "lucide-react";

export function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => setVisible(window.scrollY > 500);
    toggleVisibility(); 
    window.addEventListener("scroll", toggleVisibility, { passive: true });
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollUp = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      type="button"
      onClick={scrollUp}
      aria-label="Nach oben scrollen"
      // NEU: active:scale-90 und active:duration-75 für sofortiges, knackiges Feedback beim Tippen
      className={`shrink-0 aspect-square inline-flex h-10 w-10 items-center justify-center rounded-full border bg-muted/90 border-border text-foreground hover:border-gold hover:text-gold backdrop-blur-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-bright shadow-md transition-all duration-500 ease-in-out active:scale-90 active:duration-75 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10 pointer-events-none"
      }`}
    >
      <ChevronUp className="h-5 w-5" aria-hidden="true" />
    </button>
  );
}
