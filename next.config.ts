import type { NextConfig } from "next";
import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

// Wires up the Cloudflare context (D1 binding, env vars) during `next dev`
// so the dual-mode lib/db.ts works seamlessly when previewing through wrangler.
initOpenNextCloudflareForDev();

export default nextConfig;
