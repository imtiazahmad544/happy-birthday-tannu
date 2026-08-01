import type { Metadata, Viewport } from "next";
import "@/styles/globals.css";
import { AudioProvider } from "@/providers/AudioProvider";
import { SmoothScrollProvider } from "@/providers/SmoothScrollProvider";
import { siteConfig } from "@/data/content";

// Note: this intentionally does NOT use next/font/google. That approach
// fetches font files from Google at build time, which fails in sandboxed /
// offline / restricted-network build environments (CI, some container
// setups). --font-serif / --font-sans are defined with system-font fallback
// stacks in src/styles/globals.css and tailwind.config.ts.
//
// To use real Playfair Display / Inter files, download the .woff2 files,
// put them in public/fonts/, and load them with next/font/local instead —
// that works fully offline. See:
// https://nextjs.org/docs/app/api-reference/components/font#local-fonts

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.siteUrl),
  title: `Happy Birthday, ${siteConfig.recipientName}`,
  description: `A cinematic interactive birthday experience made for ${siteConfig.recipientName}.`,
  openGraph: {
    title: `Happy Birthday, ${siteConfig.recipientName}`,
    description: `A cinematic interactive birthday experience made for ${siteConfig.recipientName}.`,
    images: [siteConfig.ogImage],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `Happy Birthday, ${siteConfig.recipientName}`,
    images: [siteConfig.ogImage],
  },
  robots: { index: false, follow: false }, // personal page — keep out of search results
};

export const viewport: Viewport = {
  themeColor: "#05060A",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        <AudioProvider>
          <SmoothScrollProvider>{children}</SmoothScrollProvider>
        </AudioProvider>
      </body>
    </html>
  );
}
