import { MetadataRoute } from "next";
import { siteConfig } from "@/lib/config";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = "https://marrakeshi-guide.vercel.app";
  return {
    rules: [
      {
        userAgent: "*",
        allow: [
          "/",
          "/_next/static/",
          "/_next/image",
          "/images/",
          "/logo.svg",
          "/brand-mark.png",
        ],
        disallow: [
          "/admin",
          "/admin/",
          "/adminzaky",
          "/adminzaky/",
          "/adminocn",
          "/adminocn/",
          "/api/",
          "/officialcontract",
        ],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}
