import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Korasell",
  description: "Korasell — Votre savoir mérite un marché.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}
