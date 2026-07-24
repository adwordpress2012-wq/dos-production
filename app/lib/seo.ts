import type { Metadata } from "next";

export const SITE_URL =
  process.env.NEXT_PUBLIC_APP_URL?.replace(/\/$/, "") ?? "https://directiveos.com.au";

export const SITE_NAME = "Directive OS";
export const DEFAULT_DESCRIPTION =
  "Directive OS builds practical business systems for growing businesses, including Micah, customer communication, booking automation, websites, CRM, reputation, and workflow automation.";

type PageMetadataInput = {
  title: string;
  description: string;
  path?: string;
  type?: "website" | "article";
};

export function createPageMetadata({
  title,
  description,
  path = "/",
  type = "website",
}: PageMetadataInput): Metadata {
  const canonical = new URL(path, SITE_URL).toString();

  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: SITE_NAME,
      locale: "en_AU",
      type,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export const organisationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${SITE_URL}/#organisation`,
  name: SITE_NAME,
  legalName: "Directive Operating Systems Pty Ltd",
  url: SITE_URL,
  logo: `${SITE_URL}/icon.png`,
  telephone: "+61485071000",
  email: "hello@directiveos.com.au",
  areaServed: "AU",
  slogan: "Simplify. Automate. Scale.",
};

export const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": `${SITE_URL}/#business-systems`,
  name: "Practical Business Systems",
  provider: { "@id": `${SITE_URL}/#organisation` },
  areaServed: { "@type": "Country", name: "Australia" },
  description: DEFAULT_DESCRIPTION,
  serviceType: [
    "Customer communication systems",
    "Business workflow automation",
    "Website systems",
    "Booking automation",
    "Lead and pipeline management",
  ],
};

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: new URL(item.path, SITE_URL).toString(),
    })),
  };
}
