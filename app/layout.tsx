import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "lenis/dist/lenis.css";
import "./globals.css";
import { LenisProvider } from "@/components/lenis-provider";

const inter = Inter({ subsets: ["latin"], display: "swap", variable: "--font-inter" });
const grotesk = Space_Grotesk({ subsets: ["latin"], display: "swap", variable: "--font-grotesk" });

export const metadata: Metadata = {
  title: "BJN Mark & Entreprenad — Projekt- & Projekteringsledning",
  description:
    "BJN Mark & Entreprenad AB är konsulter som driver projekt åt privata fastighetsägare, fastighetsutvecklare och offentliga beställare inom projektledning, projekteringsledning, utredningar och byggledning.",
  openGraph: {
    title: "BJN Mark & Entreprenad — Projekt- & Projekteringsledning",
    description: "Vi driver projekt åt beställare inom projektledning, projekteringsledning, utredningar och byggledning.",
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
