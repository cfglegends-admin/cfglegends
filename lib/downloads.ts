export const DOWNLOAD_FILE_TYPES = ["pdf", "image", "other"] as const;
export type DownloadFileType = (typeof DOWNLOAD_FILE_TYPES)[number];

export const FILE_TYPE_LABELS: Record<DownloadFileType, string> = {
  pdf: "PDF",
  image: "Bild",
  other: "Sonstiges",
};
