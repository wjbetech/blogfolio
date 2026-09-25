import type { Metadata } from "next";
import { headers } from "next/headers";
import { Geist_Mono, IBM_Plex_Sans, Space_Grotesk } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer/Footer";
import AnalyticsProvider from "@/components/Analytics/AnalyticsProvider";
import BrowserFrame from "@/components/BrowserFrame/BrowserFrame";
import ThemeAside from "@/components/ThemeSelector/ThemeAside/ThemeAside";
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
  const host = (requestHeaders.get("x-forwarded-host") ?? requestHeaders.get("host") ?? "wjbeast.com").split(",")[0].trim();
  const protocol = (requestHeaders.get("x-forwarded-proto") ?? (host.startsWith("localhost") ? "http" : "https")).split(",")[0].trim();
  const origin = `${protocol}://${host}`;

  return (
    <html lang="en" data-theme="welcome" className={plexSans.variable} suppressHydrationWarning>
      <body className={`${spaceGrotesk.variable} ${geistMono.variable} antialiased bg-bg-100 min-h-screen flex flex-col`} style={{ transition: "none" }}>
        <script nonce={nonce} suppressHydrationWarning dangerouslySetInnerHTML={{ __html: PRE_PAINT_THEME_SCRIPT }} />
        <ThemeStyles />
        <BrowserFrame origin={origin}>
          <ThemeAside />
          <div className="flex flex-1 flex-col px-4 sm:px-6" style={{ transition: "none" }}>
            <main className="mx-auto w-full max-w-7xl flex-1 pb-4">{children}</main>
            <Footer />
          </div>
        </BrowserFrame>
        <AnalyticsProvider />
      </body>
    </html>
  );
}