import type { Metadata } from "next";

import "./arc-era.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://arc.directiveos.com.au"),
  title: { absolute: "DOS ARC + ERA | Interactive Workflow Demo" },
  description:
    "An interactive Directive OS demonstration of accounts receivable control and email response automation using fictitious sample data.",
  alternates: { canonical: "https://arc.directiveos.com.au" },
  icons: { icon: "/arc-era/favicon.svg" },
  openGraph: {
    title: "DOS ARC + ERA | Interactive Workflow Demo",
    description:
      "Explore two managed Directive OS workflows for cash flow and customer communication.",
    url: "https://arc.directiveos.com.au",
    siteName: "Directive OS",
    images: [{ url: "/arc-era/og.png", width: 1200, height: 630 }],
    type: "website",
    locale: "en_AU",
  },
  twitter: {
    card: "summary_large_image",
    title: "DOS ARC + ERA | Interactive Workflow Demo",
    description:
      "Explore two managed Directive OS workflows for cash flow and customer communication.",
    images: ["/arc-era/og.png"],
  },
};

export default function ArcEraLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
