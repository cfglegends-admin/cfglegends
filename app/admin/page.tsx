import Link from "next/link";
import { Download, Newspaper, ShieldAlert, type LucideIcon } from "lucide-react";
import { count, eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { downloads, limitedCards, news } from "@/lib/db/schema";
import { requireAdmin } from "@/lib/auth/session";

interface StatCardProps {
  href: string;
  icon: LucideIcon;
  label: string;
  primary: string;
  detail?: string;
}

function StatCard({ href, icon: Icon, label, primary, detail }: StatCardProps) {
  return (
    <Link
      href={href}
      className="bg-muted border-border hover:border-gold/50 group flex flex-col gap-3 rounded-xl border p-6 transition-colors"
    >
      <div className="flex items-center justify-between">
        <Icon className="text-gold h-6 w-6" aria-hidden="true" />
        <span className="font-body text-muted-foreground group-hover:text-gold text-xs uppercase tracking-wide transition-colors">
          {label}
        </span>
      </div>
      <span className="font-mono text-foreground text-3xl font-bold tabular-nums">{primary}</span>
      {detail && (
        <span className="font-body text-muted-foreground text-sm">{detail}</span>
      )}
    </Link>
  );
}

export default async function AdminDashboardPage() {
  await requireAdmin();

  const [limitedCount] = await db.select({ value: count() }).from(limitedCards);
  const [newsTotal] = await db.select({ value: count() }).from(news);
  const [newsPublished] = await db
    .select({ value: count() })
    .from(news)
    .where(eq(news.published, true));
  const [downloadsTotal] = await db.select({ value: count() }).from(downloads);
  const [downloadsPublished] = await db
    .select({ value: count() })
    .from(downloads)
    .where(eq(downloads.published, true));

  return (
    <div>
      <h1 className="font-display text-foreground mb-8 text-3xl font-semibold tracking-wide md:text-4xl">
        Dashboard
      </h1>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <StatCard
          href="/admin/limits"
          icon={ShieldAlert}
          label="Limitierte Karten"
          primary={String(limitedCount?.value ?? 0)}
        />
        <StatCard
          href="/admin/news"
          icon={Newspaper}
          label="News-Einträge"
          primary={`${newsTotal?.value ?? 0} Einträge`}
          detail={`${newsPublished?.value ?? 0} veröffentlicht`}
        />
        <StatCard
          href="/admin/downloads"
          icon={Download}
          label="Downloads"
          primary={`${downloadsTotal?.value ?? 0} Dateien`}
          detail={`${downloadsPublished?.value ?? 0} sichtbar`}
        />
      </div>
    </div>
  );
}
