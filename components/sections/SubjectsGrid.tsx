"use client"

import Link from "next/link";
import { subjects } from "@/lib/config";
import { Reveal, StaggerContainer, StaggerItem } from "@/components/motion/Reveal";

export function SubjectsGrid() {
  return (
    <div>
      <Reveal>
        <header className="mx-auto mb-8 max-w-3xl text-center md:mb-12">
          <h2 className="font-display text-gold-metallic text-3xl font-semibold tracking-wide md:text-4xl">
            Fächer
          </h2>
          <p className="font-body text-foreground/85 mt-6 text-base md:text-lg">
            Jeder Lehrer unterrichtet Fächer — und die bestimmen seine Stärken.
          </p>
        </header>
      </Reveal>

      <StaggerContainer className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {subjects.map((subject) => (
          <StaggerItem key={subject.name}>
            <Link
              href={`/karten?fach=${encodeURIComponent(subject.name)}`}
              className="group bg-muted border-border hover:border-gold/60 flex flex-col items-center gap-2 rounded-lg border p-4 transition-all duration-300 hover:bg-gold/10 hover:-translate-y-1 hover:shadow-[0_0_0_1px_var(--color-gold)]"
            >
              <subject.icon className="text-foreground group-hover:text-gold h-10 w-10 transition-colors duration-300 group-hover:scale-110" />
              <span className="font-body text-foreground group-hover:text-gold text-sm font-medium transition-colors">{subject.name}</span>
            </Link>
          </StaggerItem>
        ))}
      </StaggerContainer>
    </div>
  );
}
