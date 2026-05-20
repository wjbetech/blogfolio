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
      },
      {
        protocol: "https",
        hostname: "openlab.citytech.cuny.edu"
      }
    ]
  }
};

export default nextConfig;
