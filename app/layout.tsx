import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geist = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "DirectiveOS — AI-Powered Real Estate Platform",
  description:
    "DirectiveOS is being rebuilt. The AI-powered lead intelligence and team command center for real estate professionals is back soon.",
  openGraph: {
    title: "DirectiveOS — Coming Back Soon",
    description:
      "We're upgrading our infrastructure. The AI real estate platform you rely on is back soon, better than ever.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "DirectiveOS — Coming Back Soon",
    description:
      "We're upgrading our infrastructure. The AI real estate platform you rely on is back soon, better than ever.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geist.variable} h-full antialiased`}>
      <body className="min-h-full">{children}</body>
    </html>
  );
}
