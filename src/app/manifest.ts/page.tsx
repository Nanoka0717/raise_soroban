import type { MetadataRoute } from "next";

const manifest: MetadataRoute.Manifest = {
  name: "Raiseそろばん",
  short_name: "Raise",
  description: "そろばん教室 Raiseそろばん",
  start_url: "/",
  display: "standalone",
  background_color: "#ffffff",
  theme_color: "#f97316",
  icons: [
    {
      src: "/icon-192.png",
      sizes: "192x192",
      type: "image/png",
    },
    {
      src: "/icon-512.png",
      sizes: "512x512",
      type: "image/png",
    },
  ],
};
