import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "PlantTalk AI | Horticulture is the Garden of Eden in the AI Era",
  description: "Using AI to help people better interact with plants. From disease diagnosis to plant conversations, discover the future of plant care.",
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
