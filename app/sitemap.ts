import type { MetadataRoute } from "next";
import { profile } from "@/data/profile";
import { projects } from "@/data/projects";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date(profile.lastUpdated);
  const base = profile.siteUrl;

  return [
    { url: base, lastModified, changeFrequency: "monthly", priority: 1 },
    { url: `${base}/proyectos`, lastModified, changeFrequency: "monthly", priority: 0.9 },
    ...projects.map((project) => ({
      url: `${base}/proyectos/${project.slug}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: project.featured ? 0.8 : 0.6,
    })),
    { url: `${base}/formacion`, lastModified, changeFrequency: "yearly", priority: 0.6 },
    { url: `${base}/sobre-mi`, lastModified, changeFrequency: "yearly", priority: 0.6 },
  ];
}
