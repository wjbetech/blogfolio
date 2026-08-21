import type { Metadata } from "next";
import { headers } from "next/headers";
import { Bricolage_Grotesque, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer/Footer";
import AnalyticsProvider from "@/components/Analytics/AnalyticsProvider";
import ThemeAside from "@/components/ThemeSelector/ThemeAside/ThemeAside";
import ThemeStyles from "@/components/ThemeSelector/ThemeStyles/ThemeStyles";
import { createSiteMetadata } from "@/lib/metadata";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

const bricolage = Bricolage_Grotesque({ subsets: ["latin"], variable: "--font-serif" });

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"]
});

export const metadata: Metadata = createSiteMetadata();

export const dynamic = "force-dynamic";

const PRE_PAINT_THEME_SCRIPT = `try{var t=localStorage.getItem("site:theme");if(t){document.documentElement.setAttribute("data-theme",t)}}catch(e){}`;

export default async function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Set by src/proxy.ts; Next.js also applies it to its own framework scripts
  const nonce = (await headers()).get("x-nonce") ?? undefined;

  return (
    <html lang="en" data-theme="welcome" className={inter.variable} suppressHydrationWarning>
      <body
        className={`${bricolage.variable} ${geistMono.variable} antialiased bg-bg-100 min-h-screen flex flex-col`}
        style={{ transition: "none" }}>
        {/* Restore the saved theme before first paint, then provide its CSS */}
        <script nonce={nonce} dangerouslySetInnerHTML={{ __html: PRE_PAINT_THEME_SCRIPT }} />
        <ThemeStyles />
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
