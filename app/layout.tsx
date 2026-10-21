import type { Metadata } from "next";
import {
  Cormorant_Garamond,
  Noto_Naskh_Arabic,
  Plus_Jakarta_Sans,
} from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-display",
});

const notoArabic = Noto_Naskh_Arabic({
  subsets: ["arabic"],
  weight: ["500", "600", "700"],
  variable: "--font-arabic",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "ISTIQAMAH — A Nightly Sanctuary for Your Soul, Mind & Discipline",
  description:
    "An intelligent Islamic holistic sanctuary, habit companion, and nightly Muhasabah Android app focused on Deen, Body, Mind, and Daily Growth.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;  
}) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${notoArabic.variable} ${jakarta.variable} scroll-smooth`}
    >
      <body className="antialiased selection:bg-[#C48F3F]/30 selection:text-[#164A3B]">
        {children}
        <Analytics />
      </body>
    </html>
  );
}