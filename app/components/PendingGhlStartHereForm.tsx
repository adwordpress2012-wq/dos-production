import DiscoveryForm from "@/app/discovery/DiscoveryForm";

/**
 * Keeps the approved Start Here form isolated from its server-side CRM transport.
 */
export default function PendingGhlStartHereForm() {
  return <DiscoveryForm sourcePage="directiveos.com.au/start-here" />;
}
