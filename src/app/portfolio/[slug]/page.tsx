import { permanentRedirect } from "next/navigation";

type LegacyProjectPageProps = {
  params: Promise<{ slug: string }>;
};

export default async function LegacyProjectPage({ params }: LegacyProjectPageProps) {
  const { slug } = await params;
  permanentRedirect(`/dev/${slug}`);
}
