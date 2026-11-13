import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["600", "700", "800", "900"],
  variable: "--font-playfair",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  title: "Muhammad Jahanzaib | Frontend Engineer & Next.js Developer",
  description:
    "Frontend Engineer with an ex-SQA zero-defect mindset. Specializing in Next.js 16, React 19, TypeScript, WCAG 2.1 AA accessibility, and sub-second performance.",
  keywords: [
    "Frontend Engineer",
    "React Developer",
    "Next.js Developer",
    "TypeScript",
    "SQA Engineer",
    "Karachi",
    "Remote Developer",
  ],
  authors: [{ name: "Muhammad Jahanzaib" }],
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    title: "Muhammad Jahanzaib — Frontend Engineer",
    description:
      "Building accessible, high-performance web systems with zero layout shift and automated testing discipline.",
    url: "https://jahanzaib-20.netlify.app/",
    siteName: "Muhammad Jahanzaib Portfolio",
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <body className="antialiased bg-[#0B0C0E] text-[#CAD5E2] min-h-screen font-sans selection:bg-[#F1BF00] selection:text-[#0B0C0E]">
        {children}
      </body>
    </html>
  );
}
