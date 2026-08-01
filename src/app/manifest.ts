import type { MetadataRoute } from "next";
import { siteConfig } from "@/data/content";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `Happy Birthday, ${siteConfig.recipientName}`,
    short_name: "Birthday",
    description: `A cinematic interactive birthday experience for ${siteConfig.recipientName}.`,
    start_url: "/",
    display: "standalone",
    background_color: "#05060A",
    theme_color: "#05060A",
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
  };
}
