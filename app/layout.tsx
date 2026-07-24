import type { Metadata } from "next";
import { Geist } from "next/font/google";
import Script from "next/script";

import "./globals.css";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import BackgroundFx from "./components/BackgroundFx";
import ChromeGate from "./components/ChromeGate";
import { MicahExperienceProvider } from "./components/MicahExperienceProvider";
import {
  DEFAULT_DESCRIPTION,
  organisationSchema,
  serviceSchema,
  SITE_NAME,
  SITE_URL,
} from "./lib/seo";

const geist = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Directive OS | Simplify, Automate and Scale Your Business",
    template: "%s | Directive OS",
  },
  description: DEFAULT_DESCRIPTION,
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/icon.png", sizes: "512x512", type: "image/png" },
      { url: "/dos-favicon-v2.png", sizes: "512x512", type: "image/png" },
      { url: "/dos-icon-v2.png", sizes: "512x512", type: "image/png" },
    ],
    shortcut: [{ url: "/favicon.ico" }],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
  keywords: [
    "business systems Australia",
    "customer communication systems",
    "business automation",
    "Smart Business Assistant",
    "booking automation",
    "workflow automation",
    "Directive OS",
  ],
  openGraph: {
    title: "Directive OS | Simplify, Automate and Scale Your Business",
    description: DEFAULT_DESCRIPTION,
    url: SITE_URL,
    siteName: SITE_NAME,
    type: "website",
    locale: "en_AU",
  },
  twitter: {
    card: "summary_large_image",
    title: "Directive OS | Simplify, Automate and Scale Your Business",
    description: DEFAULT_DESCRIPTION,
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-AU" className={`${geist.variable} h-full antialiased`}>
      <body className="min-h-full text-ink">
        <MicahExperienceProvider>
          <ChromeGate>
            <BackgroundFx />
            <Nav />
          </ChromeGate>

          {children}

          <ChromeGate>
            <Footer />
          </ChromeGate>
        </MicahExperienceProvider>

        <Script
          id="directive-os-structured-data"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([organisationSchema, serviceSchema]).replace(/</g, "\\u003c"),
          }}
        />

        <Script
          id="micah-dos-chat-widget"
          src="https://widgets.leadconnectorhq.com/loader.js"
          data-resources-url="https://widgets.leadconnectorhq.com/chat-widget/loader.js"
          data-widget-id="6a56225582c5a91e7f5e4f3e"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
