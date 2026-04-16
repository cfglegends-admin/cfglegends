import type { News as NewsItem } from "@/lib/db/schema";
import { formatDate } from "@/lib/format";

const PREVIEW_LENGTH = 150;

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
      <header className="mx-auto mb-8 max-w-3xl text-center md:mb-12">
        <h2 className="font-display text-gold-metallic text-3xl font-semibold tracking-wide md:text-4xl">
          Neuigkeiten
        </h2>
      </header>

      <ul className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-3">
        {entries.map((entry) => (
          <li key={entry.id}>
            <article className="bg-muted border-border flex h-full flex-col gap-3 rounded-lg border p-6">
              <h3 className="font-display text-foreground text-lg font-semibold tracking-wide">
                {entry.title}
              </h3>
              <time
                dateTime={entry.createdAt.toISOString()}
                className="font-body text-muted-foreground text-sm"
              >
                {formatDate(entry.createdAt)}
              </time>
              <p className="font-body text-foreground/85 text-sm leading-relaxed">
                {preview(entry.content)}
              </p>
            </article>
          </li>
        ))}
      </ul>
    </div>
  );
}
