import type { NextConfig } from "next";
import createMDX from "@next/mdx";
import withSerwistInit from "@serwist/next";

const securityHeaders = [
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
  {
    key: "Strict-Transport-Security",
    value: "max-age=31536000; includeSubDomains; preload",
  },
];

const nextConfig: NextConfig = {
  pageExtensions: ["ts", "tsx", "md", "mdx"],
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },
  experimental: {
    // Card image uploads can easily exceed 1MB; raise limit for admin UX.
    serverActions: {
      bodySizeLimit: "10mb",
    },
  },
  images: {
    formats: ["image/avif", "image/webp"],
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

const withSerwist = withSerwistInit({
  swSrc: "app/sw.ts",
  swDest: "public/sw.js",
  additionalPrecacheEntries: [{ url: "/offline", revision: "1" }],
  // Exclude large raw assets — SW caches next/image-optimized versions via runtimeCaching
  exclude: [
    ({ asset }: { asset: { name: string } }) => {
      const n = asset.name;
      return (
        n.includes("cards/") ||
        n.includes("cards-backup/") ||
        /logo(-wide|-static|-main|-crown|-icons-left|-icons-right)?\.png$/.test(n)
      );
    },
  ],
  disable: process.env.NODE_ENV === "development",
});

export default withSerwist(withMDX(nextConfig));
