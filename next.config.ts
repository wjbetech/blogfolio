import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  images: {
    domains: ["avatars.dicebear.com", "developer.mozilla.org"]
  }
};

export default nextConfig;
