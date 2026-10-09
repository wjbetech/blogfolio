import type { Metadata } from "next";
import CardDesignPreview from "@/components/HomeDesigns/CardDesignPreview";
import { getPublishedBlogCards, getPublishedProjectCards } from "@/lib/homeCards";

export const metadata: Metadata = {
  title: "Card designs | William East",
  robots: { index: false, follow: false }
};

export default function CardDesignsPage() {
  return <CardDesignPreview posts={getPublishedBlogCards().slice(0, 3)} projects={getPublishedProjectCards().slice(0, 3)} />;
}
