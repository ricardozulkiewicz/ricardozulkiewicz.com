import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/cv/access",
        "/cv/en",
        "/cv/pt",
        "/cv/pt-final",
        "/cv/ricardo-zulkiewicz-cv-en",
        "/cv/ricardo-zulkiewicz-cv-pt",
        "/api/",
      ],
    },
    sitemap: "https://ricardozulkiewicz.com/sitemap.xml",
  };
}
