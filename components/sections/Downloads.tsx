import { getPublishedDownloads } from "@/lib/actions/downloads";
import type { Download } from "@/lib/db/schema";
import { DownloadsContent } from "./DownloadsContent";

async function loadDownloads(): Promise<Download[] | null> {
  try {
    return await getPublishedDownloads();
  } catch {
    return null;
  }
}

export async function Downloads() {
  const items = await loadDownloads();

  return (
    <div>
      <DownloadsContent items={items} />
    </div>
  );
}
