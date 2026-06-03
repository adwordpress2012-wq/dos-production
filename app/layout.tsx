import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import BackgroundFx from "./components/BackgroundFx";
import ChromeGate from "./components/ChromeGate";
import MicahDosWidget from "./components/MicahDosWidget";

const geist = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? "https://directiveos.com.au";

export const metadata: Metadata = {
  metadataBase: new URL(APP_URL),
  title: {
    default: "DOS — Done-For-You AI Business Systems",
    template: "%s · DOS",
  },
  description:
    "Modernise and automate your business. DOS delivers websites, AI receptionists, booking systems, automation and managed business infrastructure for modern Australian businesses.",
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/dos-favicon-v2.png", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  keywords: [
    "AI receptionist",
    "AI booking system",
    "Australian small business automation",
    "website rebuilds",
    "done for you SaaS",
    "Micah AI",
    "COS communication system",
    "BOS booking system",
    "DirectiveOS",
  ],
  openGraph: {
    title: "DOS — Done-For-You AI Business Systems",
    description:
      "Websites, AI receptionists, booking systems, automation and managed business infrastructure for modern Australian businesses.",
    url: APP_URL,
    siteName: "DOS",
    type: "website",
    locale: "en_AU",
  },
  twitter: {
    card: "summary_large_image",
    title: "DOS — Done-For-You AI Business Systems",
    description:
      "Modernise and automate your business with DOS. Websites, AI receptionists, booking systems and Command Centre — done for you.",
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
        <MicahDosWidget />
      </body>
    </html>
  );
}
