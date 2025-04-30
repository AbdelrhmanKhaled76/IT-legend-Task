import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  compress: true,
  swcMinify: true,
  productionBrowserSourceMaps: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.example.com", // Adjust to your CDN/host
      },
    ],
  },
  experimental: {
    optimizePackageImports: [
      "@fortawesome/free-solid-svg-icons",
      "@fortawesome/free-brands-svg-icons", // Added missing package
      "@fortawesome/react-fontawesome",
    ],
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "X-Content-Type-Options", value: "nosniff" },
        ],
      },
    ];
  },
};

export default nextConfig;
