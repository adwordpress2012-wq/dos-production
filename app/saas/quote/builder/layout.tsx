import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    absolute: "Website + SaaS Quote Builder · DOS",
  },
  robots: {
    index: false,
    follow: false,
  },
};

export default function QuoteBuilderLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
