import type { Metadata } from "next";
import SaaSQuoteBuilder from "./SaaSQuoteBuilder";

export const metadata: Metadata = {
  title: "SaaS quote builder",
  description:
    "Internal Directive OS quote builder for Website + SaaS proposals, overages, hosting, and branded client-ready summaries.",
};

export default function Page() {
  return <SaaSQuoteBuilder />;
}
