import type { Metadata } from "next";
import { headers } from "next/headers";
import { Geist_Mono, IBM_Plex_Sans, Space_Grotesk } from "next/font/google";
import "./globals.css";
import AnalyticsProvider from "@/components/Analytics/AnalyticsProvider";
import SiteFrame from "@/components/SiteFrame/SiteFrame";
import ThemeStyles from "@/components/ThemeSelector/ThemeStyles/ThemeStyles";
import { createSiteMetadata } from "@/lib/metadata";

const plexSans = IBM_Plex_Sans({ subsets: ["latin"], weight: ["400", "500", "600", "700"], variable: "--font-sans" });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], weight: ["400", "500", "600", "700"], variable: "--font-serif" });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = createSiteMetadata();
export const dynamic = "force-dynamic";

const PRE_PAINT_THEME_SCRIPT = `try{var t=localStorage.getItem("site:theme");if(t){document.documentElement.setAttribute("data-theme",t)}}catch(e){}`;

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  // Set by src/proxy.ts; Next.js also applies it to its own framework scripts
  const requestHeaders = await headers();
  const nonce = requestHeaders.get("x-nonce") ?? undefined;

  return (
    <html lang="en" data-theme="welcome" className={plexSans.variable} suppressHydrationWarning>
      <body className={`${spaceGrotesk.variable} ${geistMono.variable} antialiased bg-bg-100 min-h-screen flex flex-col`} style={{ transition: "none" }}>
        <script nonce={nonce} suppressHydrationWarning dangerouslySetInnerHTML={{ __html: PRE_PAINT_THEME_SCRIPT }} />
        <ThemeStyles />
        <SiteFrame>{children}</SiteFrame>
        <AnalyticsProvider />
      </body>
    </html>
  );
}
