import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      // Resume PDFs are uploaded through a server action (max 4 MB file).
      bodySizeLimit: "5mb",
    },
  },
};

export default nextConfig;
