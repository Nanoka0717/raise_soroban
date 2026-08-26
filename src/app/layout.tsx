import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Raiseそろばん",
  description: "そろばん教室 Raiseそろばん",
  manifest: "/manifest.json",
  icons: {
    icon: [
      {
        url: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        url: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  );
}
