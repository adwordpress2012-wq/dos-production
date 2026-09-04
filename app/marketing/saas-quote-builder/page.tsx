import type { Metadata } from "next";

import SaaSQuoteBuilder from "./SaaSQuoteBuilder";

export const metadata: Metadata = {
  title: {
    absolute: "DOS Quote Builder",
  },
  description: "Internal Directive OS BAS and DMT pricing calculator.",
  robots: {
    index: false,
    follow: false,
    noarchive: true,
  },
};

export default function Page() {
  return <SaaSQuoteBuilder />;
}
