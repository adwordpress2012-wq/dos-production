import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import BackgroundFx from "./components/BackgroundFx";
import ChromeGate from "./components/ChromeGate";

const geist = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? "https://directiveos.com.au";

export const metadata: Metadata = {
  metadataBase: new URL(APP_URL),
  title: {
    default: "DOS",
    template: "DOS",
  },
  description:
    "Modern Smart Business Systems for Australian companies — Modern Smart Websites, Smart Communication Systems, Smart Business Assistants, Done-For-You Infrastructure, and ongoing support.",
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
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  keywords: [
    "Modern Smart Business Systems",
    "Smart Communication Systems",
    "Smart Business Assistant",
    "Smart Chat Widget",
    "Australian business infrastructure",
    "website rebuilds",
    "managed business systems",
    "DOS Workspace",
    "DirectiveOS",
  ],
  openGraph: {
    title: "DOS",
    description:
      "Modern Smart Websites, Smart Communication Systems, Smart Business Assistants, and Done-For-You Business Infrastructure — built for Australian operators.",
    url: APP_URL,
    siteName: "DOS",
    type: "website",
    locale: "en_AU",
  },
  twitter: {
    card: "summary_large_image",
    title: "DOS",
    description:
      "Capture more enquiries, modernise communication, and run on dependable infrastructure — DOS builds and supports the full stack.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-AU" className={`${geist.variable} h-full antialiased`}>
      <body className="min-h-full text-ink">
        <ChromeGate>
          <BackgroundFx />
          <Nav />
        </ChromeGate>
        {children}
        <ChromeGate>
          <Footer />
        </ChromeGate>
      </body>
    </html>
  );
}
