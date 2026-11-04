import { headers } from "next/headers";
export default async function NonceJsonLd({ html }: { html: string }) {
  const nonce = (await headers()).get("x-nonce") ?? undefined;
  return <script nonce={nonce} type="application/ld+json" dangerouslySetInnerHTML={{ __html: html }} />;
}
