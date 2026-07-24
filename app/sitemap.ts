import type { MetadataRoute } from "next";
import { INDUSTRIES, INSIGHTS } from "./lib/site-data";
import { SITE_URL } from "./lib/seo";

const PUBLIC_ROUTES = [
  "/",
  "/about",
  "/solutions",
  "/industries",
  "/ecosystem",
  "/business-spotlight",
  "/insights",
  "/resources",
  "/start-here",
  "/blog",
  "/micah",
  "/case-studies/capital-recruitment",
  "/website-rebuilds",
  "/onboarding",
  "/onboarding/micah",
  "/onboarding/website-rebuild",
  "/privacy",
  "/terms",
  "/acceptable-use",
  "/number-policy",
  "/cancellation-policy",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const routes = [
    ...PUBLIC_ROUTES,
    ...INDUSTRIES.map((industry) => `/industries/${industry.slug}`),
    ...INSIGHTS.map((article) => `/blog/${article.slug}`),
  ];

  return routes.map((route) => ({
    url: new URL(route, SITE_URL).toString(),
    lastModified: now,
    changeFrequency: route === "/" ? "weekly" : "monthly",
    priority: route === "/" ? 1 : route.startsWith("/industries/") ? 0.7 : 0.8,
  }));
}
