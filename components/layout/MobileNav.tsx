"use client";

import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Instagram, Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

type NavItem = { label: string; href: string };

const navItems: NavItem[] = [
  { label: "Regeln", href: "/regeln" },
  { label: "Karten", href: "/karten" },
  { label: "Rechner", href: "/rechner" },
  { label: "News", href: "/#news" },
  { label: "Download", href: "/#download" },
];

const SHEET_CLOSE_DELAY_MS = 300;

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const handleNav = (href: string) => {
    setOpen(false);

    const isHomeAnchor = href.startsWith("/#");
    const onHome = pathname === "/";

    if (isHomeAnchor && onHome) {
      const id = href.slice(2);
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      }, SHEET_CLOSE_DELAY_MS);
      return;
    }

    setTimeout(() => {
      router.push(href);
    }, SHEET_CLOSE_DELAY_MS);
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        aria-label="Navigation öffnen"
        aria-expanded={open}
        className="text-foreground hover:text-gold inline-flex h-10 w-10 items-center justify-center rounded-md md:hidden"
      >
        <Menu className="h-6 w-6" aria-hidden="true" />
      </SheetTrigger>
      <SheetContent side="right" className="bg-background border-border border-l">
        <SheetHeader className="px-6 pt-6 pb-2">
          <SheetTitle className="font-display text-gold mb-4 text-lg tracking-wide">
            CFG Legends
          </SheetTitle>
        </SheetHeader>

        <nav aria-label="Mobile Hauptnavigation" className="px-2">
          <ul>
            {navItems.map((item) => (
              <li key={item.href}>
                <button
                  type="button"
                  onClick={() => handleNav(item.href)}
                  className="font-body text-foreground hover:text-gold border-border block w-full border-b px-4 py-4 text-left text-lg"
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <div className="mt-auto px-6 pb-8">
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
      </SheetContent>
    </Sheet>
  );
}
