import { Suspense } from "react";
import dynamic from "next/dynamic";
import { getPublishedDownloads } from "@/lib/actions/downloads";
import type { Download } from "@/lib/db/schema";

// Dynamically import the client component to reduce initial bundle size
const DownloadsContent = dynamic(() => import("./DownloadsContent").then(mod => ({ default: mod.DownloadsContent })), {
  loading: () => (
    <div className="mx-auto flex max-w-2xl flex-col gap-4">
      <p className="font-body text-muted-foreground py-8 text-center text-base">
        Downloads werden geladen…
      </p>
    </div>
  ),
});

async function loadDownloads(): Promise<Download[] | null> {
  try {
    return await getPublishedDownloads();
  } catch {
    return null;
  }
}

async function DownloadsData() {
  const items = await loadDownloads();
  return <DownloadsContent items={items} />;
}

export async function Downloads() {
  return (
    <div>
      <Suspense fallback={null}>
        <DownloadsData />
      </Suspense>
    </div>
  );
}
