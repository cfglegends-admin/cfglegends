import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Download } from "lucide-react";
import Regelwerk from "@/content/regelwerk.mdx";

export const metadata: Metadata = {
  title: "Regelwerk",
  description: "Die vollständigen Spielregeln für CFG Legends.",
  alternates: { canonical: "/regeln" },
};

export default function RegelnPage() {
  return (
    <article className="mx-auto max-w-4xl px-4 py-16 sm:px-6 md:py-24">
      <div className="mb-8 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <Link
          href="/"
          className="font-body text-muted-foreground hover:text-gold inline-flex items-center gap-2 text-sm"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          Zurück
        </Link>
        <a
          href="/docs/regelwerk.pdf"
          download
          className="border-gold text-gold hover:bg-gold hover:text-background font-display inline-flex shrink-0 items-center justify-center gap-2 rounded-md border px-5 py-2.5 text-sm font-semibold tracking-wide focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-bright"
        >
          <Download className="h-4 w-4" aria-hidden="true" />
          PDF herunterladen
        </a>
      </div>

      <Regelwerk />

      <p className="font-body text-muted-foreground mt-16 text-center text-sm">1. Auflage 2026</p>
    </article>
  );
}
