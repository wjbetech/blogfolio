import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Required for Docker standalone build (copies only necessary files into .next/standalone)
  output: "standalone",
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "avatars.dicebear.com"
      },
      {
        protocol: "https",
        hostname: "developer.mozilla.org"
      }
    ]
  }
};

export default nextConfig;
