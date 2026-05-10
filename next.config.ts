import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  turbopack: {
    root: path.resolve(__dirname),
  },
  async redirects() {
    return [
      // Canonical dashboard is /command-centre (app/command-centre/page.tsx); /admin alone is legacy.
      {
        source: "/admin",
        destination: "/command-centre",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
