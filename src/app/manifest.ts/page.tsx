import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Raiseそろばん",
    short_name: "Raiseそろばん",
    description: "Raiseそろばん 予約・出席・お知らせ管理アプリ",
    start_url: "/",
    display: "standalone",
    background_color: "#fff7ed",
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
}