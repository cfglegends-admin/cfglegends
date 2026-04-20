"use client"

import { Download as DownloadIcon } from "lucide-react";
import type { Download } from "@/lib/db/schema";
import { Reveal } from "@/components/motion/Reveal";

interface DownloadsContentProps {
  items: Download[] | null;
}

export function DownloadsContent({ items }: DownloadsContentProps) {
  return (
    <>
      <Reveal>
        <header className="mx-auto mb-8 max-w-3xl text-center md:mb-12">
          <h2 className="font-display text-gold-metallic text-3xl font-semibold tracking-wide md:text-4xl">
            Downloads
          </h2>
        </header>
      </Reveal>

      <div className="mx-auto flex max-w-2xl flex-col gap-4">
        {!items || items.length === 0 ? (
          <p className="font-body text-muted-foreground py-8 text-center text-base">
            Aktuell keine Downloads verfügbar.
          </p>
        ) : (
          items.map((item, index) => (
            <Reveal key={item.id} delay={index * 0.1}>
              <article className="bg-muted border-border flex flex-col gap-4 rounded-lg border p-6 md:flex-row md:items-center md:justify-between md:gap-8">
                <div className="flex flex-col gap-2">
                  <h3 className="font-display text-foreground text-xl font-semibold tracking-wide">
                    {item.name}
                  </h3>
                  {item.description && (
                    <p className="font-body text-muted-foreground text-sm leading-relaxed">
                      {item.description}
                    </p>
                  )}
                </div>
                <a
                  href={item.fileUrl}
                  download
                  className="btn-gold border-gold text-gold hover:bg-gold hover:text-background font-display inline-flex shrink-0 items-center justify-center gap-2 rounded-md border px-5 py-2.5 text-sm font-semibold tracking-wide focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-bright"
                >
                  <DownloadIcon className="h-4 w-4" aria-hidden="true" />
                  Herunterladen
                </a>
              </article>
            </Reveal>
          ))
        )}
      </div>
    </>
  );
}
