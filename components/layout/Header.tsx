import Image from "next/image";
import Link from "next/link";
import { MobileNav } from "@/components/layout/MobileNav";

const navItems = [
  { label: "Regeln", href: "/regeln" },
  { label: "Rechner", href: "/rechner" },
  { label: "News", href: "/#news" },
  { label: "Download", href: "/#download" },
];

export function Header() {
  return (
    <header className="bg-background/70 border-border sticky top-0 z-50 border-b backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3" aria-label="CFG Legends — Startseite">
          <Image
            src="/assets/logo.png"
            alt=""
            width={48}
            height={48}
            quality={80}
            sizes="48px"
            className="h-10 w-10 md:h-11 md:w-11"
          />
          <span className="font-display text-foreground text-base font-semibold tracking-wide md:text-lg">
            CFG Legends
          </span>
        </Link>

        <nav aria-label="Hauptnavigation" className="hidden md:flex">
          <ul className="flex items-center gap-6 md:gap-8">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="nav-link font-body text-muted-foreground hover:text-gold text-sm font-medium md:text-base"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <MobileNav />
      </div>
    </header>
  );
}
