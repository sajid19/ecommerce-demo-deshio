import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Docker needs standalone; Netlify's Next runtime does not (NETLIFY is set during Netlify builds).
  output: process.env.NETLIFY ? undefined : "standalone",
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
    // Product photography is supplied by Deshio (FIN-DESHIO-002 E6). Add its CDN/MinIO host here
    // when the API lands; until then mock products render a generated placeholder.
  },
  async headers() {
    return [
      {
        source: "/brand/:path*",
        headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
      },
    ];
  },
};

export default nextConfig;
