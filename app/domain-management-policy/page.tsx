import type { Metadata } from "next";
import DomainManagementPolicyContent from "../components/DomainManagementPolicyContent";
import LegalShell from "../components/LegalShell";

export const metadata: Metadata = {
  title: "Domain Management & Ownership Policy",
  description:
    "How DOS manages domains, DNS, hosting and related infrastructure for Done-For-You website and platform services.",
};

export default function Page() {
  return (
    <LegalShell title="Domain Management & Ownership Policy" effective="1 January 2026">
      <DomainManagementPolicyContent />
    </LegalShell>
  );
}
