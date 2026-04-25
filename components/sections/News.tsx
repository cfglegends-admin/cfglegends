"use client"

import type { News as NewsItem } from "@/lib/db/schema";
import { Reveal, StaggerContainer, StaggerItem } from "@/components/motion/Reveal";

const PREVIEW_LENGTH = 160;

function preview(content: string): string {
  if (content.length <= PREVIEW_LENGTH) return content;
  return `${content.slice(0, PREVIEW_LENGTH).trimEnd()}…`;
}

interface NewsProps {
  entries: NewsItem[];
}

export function News({ entries }: NewsProps) {
  if (entries.length === 0) return null;

  return (
    <div>
      <Reveal>
        <header className="mx-auto mb-12 max-w-3xl text-center md:mb-16">
          <h2 className="font-display text-gold-metallic text-3xl font-semibold tracking-wide md:text-4xl">
            Neuigkeiten
          </h2>
        </header>
      </Reveal>

      <StaggerContainer className="mx-auto max-w-3xl space-y-2">
        {entries.map((entry, idx) => {
          const date = new Date(entry.createdAt);
          const day = date.getDate();
          const month = new Intl.DateTimeFormat("de-DE", { month: "short" }).format(date);
          const year = date.getFullYear();

          return (
            <StaggerItem key={entry.id}>
              <article
                className="relative grid grid-cols-[52px_1fr] gap-6 px-5 py-7 sm:grid-cols-[68px_1fr] sm:gap-8 sm:px-7"
                style={{
                  background: "linear-gradient(160deg, rgba(212,175,55,0.07) 0%, rgba(10,10,10,0.5) 55%)",
                  backdropFilter: "blur(3px)",
                  WebkitBackdropFilter: "blur(3px)",
                  borderRadius: "6px",
                  boxShadow: "0 4px 24px rgba(0,0,0,0.35), 0 1px 0 rgba(212,175,55,0.08) inset",
                }}
              >
                {/* Gold top line — stronger on first entry */}
                <div
                  aria-hidden
                  className="absolute top-0 inset-x-0 h-px"
                  style={{
                    background: idx === 0
                      ? "linear-gradient(to right, transparent, rgba(212,175,55,0.55) 15%, rgba(212,175,55,0.55) 85%, transparent)"
                      : "linear-gradient(to right, transparent, rgba(212,175,55,0.2) 15%, rgba(212,175,55,0.2) 85%, transparent)",
                  }}
                />

                {/* Date column — fixed width, never shrinks */}
                <div className="flex flex-col items-center pt-0.5 text-center shrink-0">
                  <span className="font-display text-gold text-2xl font-bold leading-none sm:text-3xl">
                    {day}
                  </span>
                  <span className="font-body text-muted-foreground mt-1 text-[10px] uppercase tracking-widest">
                    {month}
                  </span>
                  <span className="font-body text-muted-foreground/50 text-[10px]">
                    {year}
                  </span>
                </div>

                {/* Content column — min-w-0 guarantees text wraps instead of overflowing */}
                <div className="flex min-w-0 flex-col gap-2 overflow-hidden">
                  <h3 className="font-display text-foreground text-base font-semibold tracking-wide leading-snug sm:text-lg break-words">
                    {entry.title}
                  </h3>
                  <p className="font-body text-foreground/65 text-sm leading-relaxed break-words">
                    {preview(entry.content)}
                  </p>
                </div>

                {/* Gold bottom line on last entry */}
                {idx === entries.length - 1 && (
                  <div
                    aria-hidden
                    className="absolute bottom-0 inset-x-0 h-px"
                    style={{
                      background: "linear-gradient(to right, transparent, rgba(212,175,55,0.2) 15%, rgba(212,175,55,0.2) 85%, transparent)",
                    }}
                  />
                )}
              </article>
            </StaggerItem>
          );
        })}
      </StaggerContainer>
    </div>
  );
}
