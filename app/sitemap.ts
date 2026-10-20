import type { MetadataRoute } from "next";
import { wikiArticles } from "@/lib/wiki";

const siteUrl = "https://fayyazzadeh.ir";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages: MetadataRoute.Sitemap = [
    {
      url: siteUrl,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${siteUrl}/wiki`,
      changeFrequency: "weekly",
      priority: 0.8,
    },
  ];

  const articles: MetadataRoute.Sitemap = wikiArticles.map((article) => ({
    url: `${siteUrl}/wiki/${article.slug}`,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...pages, ...articles];
}
