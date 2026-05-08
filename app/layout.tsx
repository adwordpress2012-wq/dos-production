import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geist = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "DirectiveOS — Done-For-You AI Business Systems",
  description:
    "DirectiveOS delivers done-for-you AI business systems including website rebuilds, Micah AI Receptionist, COS, BOS, automation, and managed hosting.",
  openGraph: {
    title: "DirectiveOS — Done-For-You AI Business Systems",
    description:
      "Website rebuilds, Micah AI Receptionist, COS, BOS, automation, and hosting delivered through the DOS ecosystem.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "DirectiveOS — Done-For-You AI Business Systems",
    description:
      "Done-for-you AI business systems by DOS for communication, bookings, automation, and managed growth.",
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
