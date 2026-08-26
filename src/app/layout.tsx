import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Raiseそろばん",
  description: "そろばん教室 Raiseそろばん",
  manifest: "/manifest.json",
  icons: {
    icon: "/icon-192.png",
    apple: "/icon-192.png",
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
