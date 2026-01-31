import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer/Footer";
import HeaderWithDrawer from "@/components/HeaderWithDrawer/HeaderWithDrawer";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"]
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"]
});

export const metadata: Metadata = {
  title: "BlogFolio",
  description: "The combined blog // portfolio of William East"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-bg-100 `}>
        <HeaderWithDrawer />
        <main className="max-w-7xl mx-auto px-10 py-8">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
