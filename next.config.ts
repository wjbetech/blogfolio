import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
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
