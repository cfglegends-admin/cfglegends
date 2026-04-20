import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SectionProps {
  id?: string;
  className?: string;
  children: ReactNode;
}

export function Section({ id, className, children }: SectionProps) {
  return (
    <section id={id} className={cn("relative", className)}>
      <div className="relative z-10 mx-auto max-w-7xl px-4 py-24 sm:px-6 md:py-36 lg:px-8 lg:py-48">
        {children}
      </div>
    </section>
  );
}
