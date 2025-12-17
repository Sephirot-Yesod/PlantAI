import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-montserrat",
});

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
    <html lang="en" className={montserrat.variable}>
      <body className={`${montserrat.className} antialiased`}>
        {children}
      </body>
    </html>
  );
}
