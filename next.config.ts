import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Required for Docker standalone build (copies only necessary files into .next/standalone)
  output: "standalone",
  images: {
    remotePatterns: []
  }
};

export default nextConfig;
