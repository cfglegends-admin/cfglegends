import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const nextConfig: NextConfig = {
  pageExtensions: ["ts", "tsx", "md", "mdx"],
  experimental: {
    // Card image uploads can easily exceed 1MB; raise limit for admin UX.
    serverActions: {
      bodySizeLimit: "10mb",
    },
  },
  images: {
    qualities: [80, 85, 90],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.public.blob.vercel-storage.com",
      },
      {
        protocol: "https",
        hostname: "*.blob.vercel-storage.com",
      },
      {
        protocol: "https",
        hostname: "blob.vercel-storage.com",
      },
      {
        protocol: "https",
        hostname: "vercel-storage.com",
      },
    ],
  },
};

const withMDX = createMDX({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [["remark-gfm", {}]],
  },
});

export default withMDX(nextConfig);
