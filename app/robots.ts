import { MetadataRoute } from "next";
import { siteConfig } from "@/lib/config";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = siteConfig.urls.site;
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin/", "/adminzaky/", "/adminocn/", "/api/", "/officialcontract"],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
