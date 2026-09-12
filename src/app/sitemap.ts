import type { MetadataRoute } from "next";
import { buildCourse } from "@/lib/content";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://netdad.ir";

export default function sitemap(): MetadataRoute.Sitemap {
  const { lessons, chapters } = buildCourse();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: SITE_URL, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/curriculum`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE_URL}/tools`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.7 },
    { url: `${SITE_URL}/glossary`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE_URL}/search`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.4 },
    { url: `${SITE_URL}/exam`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE_URL}/flashcards`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.6 },
    { url: `${SITE_URL}/weak-points`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
  ];

  const chapterRoutes: MetadataRoute.Sitemap = chapters.map((c) => ({
    url: `${SITE_URL}/chapter/${c.number}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  const lessonRoutes: MetadataRoute.Sitemap = lessons.map((l) => ({
    url: `${SITE_URL}/lesson/${l.id}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...staticRoutes, ...chapterRoutes, ...lessonRoutes];
}