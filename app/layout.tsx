import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "lenis/dist/lenis.css";
import "./globals.css";
import { LenisProvider } from "@/components/lenis-provider";

const inter = Inter({ subsets: ["latin"], display: "swap", variable: "--font-inter" });
const grotesk = Space_Grotesk({ subsets: ["latin"], display: "swap", variable: "--font-grotesk" });

export const metadata: Metadata = {
  title: "BJN Mark & Entreprenad — Mark & anläggning i Nykvarn",
  description:
    "BJN Mark & Entreprenad AB utför markarbeten, schakt, dränering, VA, grundläggning och finplanering i Nykvarn och Mälardalen.",
  openGraph: {
    title: "BJN Mark & Entreprenad — Nykvarn & Mälardalen",
    description: "Mark, anläggning & entreprenad från schakt till färdig finplanering.",
    locale: "sv_SE",
    type: "website",
  },
  icons: {
    icon: "/icon.svg",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="sv" className={`${inter.variable} ${grotesk.variable}`}>
      <body className="antialiased selection:bg-neutral-800 selection:text-white">
        <LenisProvider>{children}</LenisProvider>
      </body>
    </html>
  );
}
