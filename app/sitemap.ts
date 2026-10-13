import type { MetadataRoute } from "next";

const base = "https://oliver-ascencio.wuju.dev";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${base}/`, changeFrequency: "monthly", priority: 1 },
    { url: `${base}/formacion`, changeFrequency: "monthly", priority: 0.7 },
  ];
}
