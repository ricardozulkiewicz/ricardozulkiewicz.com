import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/cv/access",
        "/api/cv/",
      ],
    },
    sitemap: "https://ricardozulkiewicz.com/sitemap.xml",
  };
}
