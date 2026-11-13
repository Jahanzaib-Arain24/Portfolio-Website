import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Allow phone access over Wi-Fi for hot reload / Fast Refresh
  allowedDevOrigins: ["192.168.100.50", "192.168.100.50:3000", "localhost:3000"],

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

  async rewrites() {
    return [
      {
        source: "/:section(about|skills|projects|experience|certifications|education|contact)",
        destination: "/",
      },
    ];
  },

  async headers() {
    return [
      {
        source: "/assets/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/:file(favicon.ico|favicon.svg|icon.svg|apple-touch-icon.png|favicon-32x32.png)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=86400, stale-while-revalidate=604800",
          },
        ],
      },
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
