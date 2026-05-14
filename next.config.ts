import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable server-side external packages for SQLite
  serverExternalPackages: ["better-sqlite3"],

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },

  // Strict TypeScript
  typescript: {
    // TODO: enable strict checking after initial build stabilizes
    ignoreBuildErrors: false,
  },

  // Experimental features
  experimental: {
    // Enable server actions
    serverActions: {
      bodySizeLimit: "10mb",
    },
  },
};

export default nextConfig;
