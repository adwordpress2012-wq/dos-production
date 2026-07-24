import DiscoveryForm from "@/app/discovery/DiscoveryForm";

/**
 * Isolated replacement point for the final Start Here embed.
 * Keep the existing working fallback until the exact integration details are supplied.
 */
export default function PendingGhlStartHereForm() {
  return <DiscoveryForm sourcePage="directiveos.com.au/start-here" />;
}
