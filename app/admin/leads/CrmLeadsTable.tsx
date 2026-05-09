"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import type { CrmLeadRow } from "@/app/lib/supabase";
import {
  CRM_INTEREST_OPTIONS,
  CRM_LEAD_SOURCE_LABELS,
  CRM_LEAD_STATUS_LABELS,
} from "@/app/lib/crm";

function interestLabels(ids: string[]) {
  const map = new Map<string, string>(CRM_INTEREST_OPTIONS.map((o) => [o.id, o.label]));
  return ids.map((id) => map.get(id) ?? id).join(", ") || "—";
}

export default function CrmLeadsTable({ leads }: { leads: CrmLeadRow[] }) {
  const router = useRouter();
  const [busyId, setBusyId] = useState<string | null>(null);

  async function convert(leadId: string) {
    setBusyId(leadId);
    try {
      const res = await fetch(`/api/admin/leads/${leadId}/convert`, { method: "POST" });
      const payload = (await res.json().catch(() => ({}))) as { error?: string; ok?: boolean };

      if (!res.ok || !payload.ok) {
        toast.error("Failed to create client", {
          description: payload.error ?? `HTTP ${res.status}`,
        });
        return;
      }

      toast.success("Client created successfully");
      router.refresh();
    } catch {
      toast.error("Failed to create client", {
        description: "Network error — try again.",
      });
    } finally {
      setBusyId(null);
    }
  }

  if (leads.length === 0) {
    return (
      <div className="px-5 py-10 text-center text-sm text-ink-muted">No leads yet — add one above.</div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm min-w-[1100px]">
        <thead className="text-[10px] font-mono uppercase tracking-widest text-ink-dim">
          <tr>
            <th className="text-left px-5 py-2.5 font-medium">Business</th>
            <th className="text-left px-5 py-2.5 font-medium">Contact</th>
            <th className="text-left px-5 py-2.5 font-medium">Phone</th>
            <th className="text-left px-5 py-2.5 font-medium">Email</th>
            <th className="text-left px-5 py-2.5 font-medium">Website</th>
            <th className="text-left px-5 py-2.5 font-medium">Type</th>
            <th className="text-left px-5 py-2.5 font-medium">Source</th>
            <th className="text-left px-5 py-2.5 font-medium">Interested</th>
            <th className="text-left px-5 py-2.5 font-medium">Status</th>
            <th className="text-left px-5 py-2.5 font-medium">Follow-up</th>
            <th className="text-left px-5 py-2.5 font-medium max-w-[180px]">Notes</th>
            <th className="text-left px-5 py-2.5 font-medium">Created</th>
            <th className="text-left px-5 py-2.5 font-medium">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-white/5">
          {leads.map((l) => {
            const canConvert = !l.converted_client_id && l.status !== "won";
            const loading = busyId === l.id;
            return (
              <tr key={l.id} className="hover:bg-white/[0.02] transition align-top">
                <td className="px-5 py-3 font-medium text-white">{l.business_name}</td>
                <td className="px-5 py-3 text-xs text-ink-muted">{l.contact_person}</td>
                <td className="px-5 py-3 font-mono text-xs text-ink-muted">{l.phone ?? "—"}</td>
                <td className="px-5 py-3 text-xs text-ink-muted">{l.email}</td>
                <td className="px-5 py-3 text-xs text-ink-muted max-w-[140px] truncate">
                  {l.website_url ? (
                    <a
                      href={l.website_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-violet-300 hover:underline"
                    >
                      {l.website_url}
                    </a>
                  ) : (
                    "—"
                  )}
                </td>
                <td className="px-5 py-3 text-xs text-ink-muted max-w-[120px]">{l.business_type ?? "—"}</td>
                <td className="px-5 py-3 text-xs text-ink-muted">{CRM_LEAD_SOURCE_LABELS[l.source]}</td>
                <td className="px-5 py-3 text-xs text-ink-muted max-w-[200px]">
                  {interestLabels(l.interested_in ?? [])}
                </td>
                <td className="px-5 py-3">
                  <span className="inline-flex items-center rounded-md border border-white/10 bg-white/[0.04] px-2 py-0.5 text-[10px] font-semibold tracking-wider uppercase text-ink-muted whitespace-nowrap">
                    {CRM_LEAD_STATUS_LABELS[l.status]}
                  </span>
                </td>
                <td className="px-5 py-3 text-xs text-ink-muted whitespace-nowrap">
                  {l.next_follow_up_date
                    ? new Date(l.next_follow_up_date + "T12:00:00").toLocaleDateString("en-AU", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })
                    : "—"}
                </td>
                <td className="px-5 py-3 text-xs text-ink-muted max-w-[200px]">
                  <span className="line-clamp-3">{l.notes ?? "—"}</span>
                </td>
                <td className="px-5 py-3 text-xs text-ink-muted whitespace-nowrap">
                  {new Date(l.created_at).toLocaleString("en-AU", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </td>
                <td className="px-5 py-3">
                  {canConvert ? (
                    <button
                      type="button"
                      disabled={loading}
                      onClick={() => convert(l.id)}
                      className="btn-neon inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-[11px] font-semibold text-white disabled:opacity-50 whitespace-nowrap"
                    >
                      {loading ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : null}
                      Convert to Client
                    </button>
                  ) : l.converted_client_id ? (
                    <span className="text-[10px] font-mono text-emerald-300/90">Converted</span>
                  ) : (
                    <span className="text-[10px] text-ink-dim">—</span>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
