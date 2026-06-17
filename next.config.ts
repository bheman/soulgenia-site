import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Required for the Dockerfile multi-stage build (copies only necessary files)
  output: "standalone",

  // Compress output for production
  compress: true,

  // Security headers
  async headers() {
    return [
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

  // Images: allow external OG image domains if needed in future
  images: {
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
