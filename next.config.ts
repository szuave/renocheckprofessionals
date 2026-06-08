import type { NextConfig } from "next";
import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";

const nextConfig: NextConfig = {
  // OpenNext draait Next build apart en bundelt daarna. Standalone output is
  // vereist zodat .next/standalone/ bestaat voor de OpenNext bundle-stap.
  output: "standalone",
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  // better-sqlite3 is enkel voor lokale dev. In de Cloudflare-build mag dat
  // native Node-pakket niet meegebundled worden (en zou sowieso niet werken).
  outputFileTracingExcludes: {
    "*": ["./node_modules/better-sqlite3/**/*", "./node_modules/@types/better-sqlite3/**/*"],
  },
  serverExternalPackages: ["better-sqlite3"],
};

// Wires up the Cloudflare context (D1 binding, env vars) during `next dev`
// so the dual-mode lib/db.ts works seamlessly when previewing through wrangler.
initOpenNextCloudflareForDev();

export default nextConfig;
