import Image from "next/image";
import Link from "next/link";
import { Instagram } from "lucide-react";

export function Footer() {
  return (
    <footer className="relative z-10 border-border border-t bg-background/60 backdrop-blur-sm">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-20 lg:px-8">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-3 md:gap-8">
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <Image
                src="/assets/logo.png"
                alt=""
                width={40}
                height={40}
                quality={80}
                sizes="40px"
                className="h-10 w-10"
              />
              <span className="font-display text-foreground text-base font-semibold tracking-wide">
                CFG Legends
              </span>
            </div>
            <p className="font-body text-muted-foreground text-sm">
              Das Kartenspiel für die große Pause
            </p>
          </div>

          <nav aria-label="Rechtliches" className="md:justify-self-center">
            <ul className="flex flex-col gap-3">
              <li>
                <Link
                  href="/impressum"
                  className="font-body text-foreground/80 hover:text-gold text-sm"
                >
                  Impressum
                </Link>
              </li>
              <li>
                <Link
                  href="/datenschutz"
                  className="font-body text-foreground/80 hover:text-gold text-sm"
                >
                  Datenschutz
                </Link>
              </li>
            </ul>
          </nav>

          <div className="md:justify-self-end">
            <a
              href="https://www.instagram.com/cfglegends/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="CFG Legends auf Instagram"
              className="text-foreground/80 hover:text-gold inline-flex items-center gap-2"
            >
              <Instagram className="h-5 w-5" aria-hidden="true" />
              <span className="font-body text-sm">@cfglegends</span>
            </a>
          </div>
        </div>

        <p className="text-muted-foreground border-border mt-12 border-t pt-8 text-center text-xs">
          © 2026 CFG Legends
        </p>
      </div>
    </footer>
  );
}
