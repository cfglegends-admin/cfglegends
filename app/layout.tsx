import type { Metadata } from "next";
import { Cinzel, Inter, Geist_Mono } from "next/font/google";
import { MotionProvider } from "@/components/providers/MotionProvider";
import { ParallaxBackground } from "@/components/layout/ParallaxBackground";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ScrollToTop } from "@/components/layout/ScrollToTop";
import { cn } from "@/lib/utils";
import "./globals.css";
import FloatingButton from "@/components/ui/FloatingButton";

const cinzel = Cinzel({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-cinzel",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-geist-mono",
  display: "swap",
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000");

export { viewport } from "./viewport";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "CFG Legends",
    template: "%s — CFG Legends",
  },
  description: "Das Kartenspiel für die große Pause. Strategie, Lehrer und Lehrkraft-Punkte.",
  robots: {
    index: false,
    follow: false,
  },
  manifest: "/manifest.json",
  icons: {
    icon: [
      { url: "/favicon-32x32.png?v=1", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png?v=1", sizes: "16x16", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png?v=1", sizes: "180x180", type: "image/png" }],
  },
  openGraph: {
    title: "CFG Legends",
    description: "Das Kartenspiel für die große Pause.",
    siteName: "CFG Legends",
    locale: "de_DE",
    type: "website",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 800,
        alt: "CFG Legends Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "CFG Legends",
    description: "Das Kartenspiel für die große Pause.",
    images: ["/og.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de" className={cn("dark", cinzel.variable, inter.variable, geistMono.variable)}>
      <body className="bg-background text-foreground font-body flex min-h-screen flex-col antialiased">
        <MotionProvider>
          <ParallaxBackground />
          <Header />
          <main className="relative flex-1">{children}</main>
          <Footer />
          <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 flex flex-col items-center justify-end gap-4 ">
            <ScrollToTop />
            <FloatingButton />
          </div>
        </MotionProvider>
      </body>
    </html>
  );
}
