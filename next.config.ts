import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Compress assets using Gzip / Brotli for faster delivery
  compress: true,

  // Remove X-Powered-By header to shave bytes and improve security
  poweredByHeader: false,

  // React Strict Mode for robust zero-defect execution
  reactStrictMode: true,

  // Image Optimization configuration
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
    minimumCacheTTL: 31536000, // 1 year cache
  },

  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
