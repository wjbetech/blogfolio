import type { Metadata } from "next";
import { Bricolage_Grotesque, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer/Footer";
import AnalyticsProvider from "@/components/Analytics/AnalyticsProvider";
import ThemeAside from "@/components/ThemeSelector/ThemeAside/ThemeAside";
import { createSiteMetadata } from "@/lib/metadata";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

const bricolage = Bricolage_Grotesque({ subsets: ["latin"], variable: "--font-serif" });

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"]
});

export const metadata: Metadata = createSiteMetadata();

export default async function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="welcome" className={inter.variable} suppressHydrationWarning>
      <body
        className={`${bricolage.variable} ${geistMono.variable} antialiased bg-bg-100 min-h-screen flex flex-col`}
        style={{ transition: "none" }}>
        <ThemeAside />
        <div className="px-6 flex-1 flex flex-col" style={{ transition: "none" }}>
          <main className="max-w-7xl mx-auto pb-4 w-full flex-1">{children}</main>
          <Footer />
        </div>
        <AnalyticsProvider />
      </body>
    </html>
  );
}
