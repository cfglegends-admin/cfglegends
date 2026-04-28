import type { Metadata } from "next";
import { Suspense } from "react";
import { OfflineCardGallery } from "@/components/karten/OfflineCardGallery";

export const metadata: Metadata = {
  title: "Offline",
  robots: { index: false },
};

export default function OfflinePage() {
  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <header className="mb-8 md:mb-12">
          <h1 className="font-display text-gold-metallic text-3xl font-semibold tracking-wide md:text-5xl">
            Karten-Galerie
          </h1>
          <p className="font-body text-foreground/85 mt-4 max-w-2xl text-base md:text-lg">
            Entdecke das gesamte Sortiment an Lehrkräften, Ereignissen und fiesen Fallen.
            Nutze die Filter, um dein Deck strategisch zu planen.
          </p>
        </header>

        <section aria-label="Karten Filter und Liste">
          <Suspense>
            <OfflineCardGallery />
          </Suspense>
        </section>
      </div>
    </div>
  );
}
