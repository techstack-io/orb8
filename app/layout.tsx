import type { Metadata } from "next";
import {
  DM_Sans,
  IBM_Plex_Mono,
  WDXL_Lubrifont_TC,
  Space_Grotesk,
  Rajdhani,
} from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

const wdXl = WDXL_Lubrifont_TC({
  variable: "--font-wdxl",
  subsets: ["latin"],
  weight: "400",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["400", "500"],
});

const rajdhani = Rajdhani({
  variable: "--font-rajdhani",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

export const metadata: Metadata = {
  title: "ORB8 — Building AI-Native Startups",
  description:
    "ORB8 builds AI-native startups by combining small human teams with agentic systems.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${dmSans.variable} ${plexMono.variable} ${wdXl.variable} ${spaceGrotesk.variable} ${rajdhani.variable}`}
      >
        {children}
      </body>
    </html>
  );
}