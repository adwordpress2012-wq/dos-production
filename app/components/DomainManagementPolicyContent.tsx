import type { ReactNode } from "react";

type Props = {
  heading?: string;
  headingAs?: "h2" | "h3";
};

function PolicyHeading({
  as = "h2",
  children,
}: {
  as?: "h2" | "h3";
  children: ReactNode;
}) {
  if (as === "h3") {
    return <h3>{children}</h3>;
  }

  return <h2>{children}</h2>;
}

export default function DomainManagementPolicyContent({
  heading,
  headingAs = "h2",
}: Props) {
  return (
    <>
      {heading ? <PolicyHeading as={headingAs}>{heading}</PolicyHeading> : null}

      <p>
        DOS may purchase, configure and manage domain names on behalf of clients as part of our
        Done-For-You service model. This policy explains how managed domains, DNS, hosting and
        related technical infrastructure are handled during an active DOS engagement.
      </p>

      <h3>Domain and infrastructure management</h3>
      <p>
        Where agreed as part of the Services, DOS may manage DNS configuration, SSL certificates,
        Vercel deployment settings, email records, hosting integrations and technical
        infrastructure associated with domains under management.
      </p>
      <p>
        Existing client-owned domains may remain with their current registrar while DOS manages DNS
        and hosting configuration. This allows clients to keep their existing registrar account
        while DOS handles the technical setup required to operate the website, email and related
        services.
      </p>

      <h3>DOS-managed domains</h3>
      <p>
        Domains purchased and managed by DOS may remain under DOS management while active hosting,
        support, subscription or maintenance services remain active. Annual hosting or maintenance
        plans may include domain renewal costs unless otherwise stated in the relevant proposal,
        invoice or service plan.
      </p>

      <h3>Transfer requests</h3>
      <p>
        Clients may request transfer of a managed domain. Transfers are subject to appropriate
        verification, settlement of outstanding invoices, and any applicable migration or
        administration fees. DOS will act reasonably and provide the technical information needed to
        complete an approved transfer.
      </p>
      <p>DOS may charge reasonable technical administration fees for:</p>
      <ul>
        <li>domain transfer processing;</li>
        <li>DNS migration;</li>
        <li>email migration;</li>
        <li>hosting reconfiguration; and</li>
        <li>infrastructure migration support.</li>
      </ul>

      <h3>Third-party providers</h3>
      <p>
        DOS uses third-party providers to deliver the Services, including domain registrars, Vercel,
        Supabase, Stripe, Twilio, Resend, Neo Email and related infrastructure providers. Their own
        terms, availability and technical requirements may apply.
      </p>

      <h3>Client-owned domains and external changes</h3>
      <p>
        DOS is not responsible for downtime or issues caused by expired client-owned domains,
        registrar issues, or DNS changes made outside DOS management. If a domain is not under DOS
        management, clients remain responsible for keeping registrar accounts, renewals and access
        details current.
      </p>
    </>
  );
}
