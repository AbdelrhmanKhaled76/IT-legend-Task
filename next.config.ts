import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  swcMinify: true,
  productionBrowserSourceMaps: false,
  experimental: {
    optimizePackageImports: [
      "@fortawesome/free-solid-svg-icons",
      "@fortawesome/react-fontawesome",
    ],
  },
};

export default nextConfig;
