import type { ReactNode } from "react";

interface AdminPageHeaderProps {
  title: string;
  description?: string;
  action?: ReactNode;
}

export function AdminPageHeader({ title, description, action }: AdminPageHeaderProps) {
  return (
    <header className="border-border mb-8 flex flex-col gap-3 border-b pb-4 sm:flex-row sm:items-end sm:justify-between sm:gap-6">
      <div className="flex flex-col gap-1.5">
        <h1 className="font-display text-foreground text-2xl font-semibold tracking-wide">
          {title}
        </h1>
        {description && (
          <p className="font-body text-muted-foreground text-sm">{description}</p>
        )}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </header>
  );
}
