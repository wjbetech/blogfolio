import type { Metadata } from "next";
import { Bricolage_Grotesque, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer/Footer";
import ThemeAside from "@/components/ThemeSelector/ThemeAside/ThemeAside";
import { headers } from "next/headers";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

const bricolage = Bricolage_Grotesque({ subsets: ["latin"], variable: "--font-serif" });

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"]
});

export const metadata: Metadata = {
  title: "BlogFolio",
  description: "The combined blog // portfolio of William East"
};

export default async function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  let cookieHeader = "";
  try {
    const hdrs = await headers();
    if (hdrs && typeof (hdrs as any).get === "function") {
      cookieHeader = (hdrs as any).get("cookie") ?? "";
    } else if (hdrs && typeof hdrs === "object") {
      // Some runtimes expose headers as plain objects
      cookieHeader = (hdrs as any)["cookie"] ?? (hdrs as any)["Cookie"] ?? "";
    }
  } catch (e) {
    cookieHeader = "";
  }
  const parseCookie = (cookieStr: string, name: string) => {
    if (!cookieStr) return null;
    const pairs = cookieStr.split(";").map((p) => p.trim());
    for (const pair of pairs) {
      const idx = pair.indexOf("=");
      if (idx === -1) continue;
      const key = pair.substring(0, idx).trim();
      const val = pair.substring(idx + 1).trim();
      if (key === name) return decodeURIComponent(val);
    }
    return null;
  };

  const themeId = parseCookie(cookieHeader, "site-theme") ?? "welcome";

  return (
    <html lang="en" data-theme={themeId} className={inter.variable}>
      <body className={`${bricolage.variable} ${geistMono.variable} antialiased bg-bg-100 min-h-screen flex flex-col`}>
        <ThemeAside />
        <main className="max-w-7xl mx-auto pb-4 w-full flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
