import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SectionProps {
  id?: string;
  className?: string;
  children: ReactNode;
  withPattern?: boolean;
}

export function Section({ id, className, children, withPattern = false }: SectionProps) {
  return (
    <section id={id} className={cn(withPattern && "bg-pattern", className)}>
      <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 md:py-32 lg:px-8">{children}</div>
    </section>
  );
}
