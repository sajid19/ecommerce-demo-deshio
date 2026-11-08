import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Deshio দেশীয়", short_name: "Deshio", start_url: "/", display: "standalone",
    background_color: "#fdfaf4", theme_color: "#8c4230",
    icons: [{ src: "/brand/deshio.png", sizes: "any", type: "image/png" }],
  };
}
