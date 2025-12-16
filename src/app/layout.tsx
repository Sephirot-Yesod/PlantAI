import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Plantalk AI | THE AI Plant Company",
  description: "PlantTalk AI | The AI Plants Company",
  keywords: "AI plant care, plant diagnosis, talk to plants, plant health, PlantTalk, EZplants, Plantiemoji",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://api.fontshare.com" />
        <link 
          href="https://api.fontshare.com/v2/css?f[]=satoshi@700,500,400,300&display=swap" 
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
