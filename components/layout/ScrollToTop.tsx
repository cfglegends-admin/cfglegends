"use client";

import { useEffect, useState } from "react";
import { ChevronUp } from "lucide-react";

export function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 500);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollUp = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (!visible) return null;

  return (
    <button
      type="button"
      onClick={scrollUp}
      aria-label="Nach oben scrollen"
      className="bg-muted/90 border-border text-foreground hover:border-gold hover:text-gold fixed right-4 bottom-4 z-40 inline-flex h-10 w-10 items-center justify-center rounded-full border backdrop-blur-md transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-bright sm:right-6 sm:bottom-6"
    >
      <ChevronUp className="h-5 w-5" aria-hidden="true" />
    </button>
  );
}
