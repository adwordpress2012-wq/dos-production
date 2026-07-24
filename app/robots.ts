import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/admin/",
        "/command-centre",
        "/api/",
        "/marketing/saas-quote-builder",
        "/saas/quote/builder",
        "/pricing",
        "/checkout",
        "/auth/",
      ],
    },
    sitemap: "https://directiveos.com.au/sitemap.xml",
    host: "https://directiveos.com.au",
  };
}
