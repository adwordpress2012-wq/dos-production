"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import {
  CRM_INTEREST_OPTIONS,
  CRM_LEAD_SOURCES,
  CRM_LEAD_SOURCE_LABELS,
  CRM_LEAD_STATUSES,
  CRM_LEAD_STATUS_LABELS,
  type CrmLeadSource,
  type CrmLeadStatus,
} from "@/app/lib/crm";

const INPUT =
  "rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-sm placeholder-ink-dim outline-none focus:border-violet-400/50 focus:bg-white/[0.07] transition";

export default function AddLeadForm() {
  const router = useRouter();
  const [businessName, setBusinessName] = useState("");
  const [contactPerson, setContactPerson] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [websiteUrl, setWebsiteUrl] = useState("");
  const [businessType, setBusinessType] = useState("");
  const [source, setSource] = useState<CrmLeadSource>("other");
  const [status, setStatus] = useState<CrmLeadStatus>("new");
  const [interested, setInterested] = useState<Record<string, boolean>>({});
  const [nextFollowUp, setNextFollowUp] = useState("");
  const [notes, setNotes] = useState("");
  const [submitting, setSubmitting] = useState(false);

  function toggleInterest(id: string) {
    setInterested((prev) => ({ ...prev, [id]: !prev[id] }));
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!businessName.trim() || !contactPerson.trim() || !email.trim()) {
      toast.error("Failed to add lead", {
        description: "Business name, contact person, and email are required.",
      });
      return;
    }

    const interested_in = CRM_INTEREST_OPTIONS.filter((o) => interested[o.id]).map((o) => o.id);

    setSubmitting(true);
    try {
      const res = await fetch("/api/admin/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          business_name: businessName.trim(),
          contact_person: contactPerson.trim(),
          email: email.trim(),
          phone: phone.trim() || undefined,
          website_url: websiteUrl.trim() || undefined,
          business_type: businessType.trim() || undefined,
          source,
          status,
          interested_in,
          next_follow_up_date: nextFollowUp || undefined,
          notes: notes.trim() || undefined,
        }),
      });

      const payload = (await res.json().catch(() => ({}))) as { error?: string; ok?: boolean };

      if (!res.ok || !payload.ok) {
        toast.error("Failed to add lead", {
          description: payload.error ?? `HTTP ${res.status}`,
        });
        return;
      }

      toast.success("Lead added successfully");
      setBusinessName("");
      setContactPerson("");
      setPhone("");
      setEmail("");
      setWebsiteUrl("");
      setBusinessType("");
      setSource("other");
      setStatus("new");
      setInterested({});
      setNextFollowUp("");
      setNotes("");
      router.refresh();
    } catch {
      toast.error("Failed to add lead", {
        description: "Network error — try again.",
      });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-4 sm:grid-cols-2">
      <label className="grid gap-2 sm:col-span-2">
        <span className="text-xs font-medium uppercase tracking-widest text-ink-muted">
          Business name <span className="text-violet-300">*</span>
        </span>
        <input
          value={businessName}
          onChange={(e) => setBusinessName(e.target.value)}
          className={INPUT}
          placeholder="Acme Plumbing"
          autoComplete="organization"
        />
      </label>

      <label className="grid gap-2">
        <span className="text-xs font-medium uppercase tracking-widest text-ink-muted">
          Contact person <span className="text-violet-300">*</span>
        </span>
        <input
          value={contactPerson}
          onChange={(e) => setContactPerson(e.target.value)}
          className={INPUT}
          placeholder="Jordan Smith"
          autoComplete="name"
        />
      </label>

      <label className="grid gap-2">
        <span className="text-xs font-medium uppercase tracking-widest text-ink-muted">
          Email <span className="text-violet-300">*</span>
        </span>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={INPUT}
          placeholder="hello@business.com.au"
          autoComplete="email"
        />
      </label>

      <label className="grid gap-2">
        <span className="text-xs font-medium uppercase tracking-widest text-ink-muted">Phone</span>
        <input
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className={INPUT}
          placeholder="+61 …"
          autoComplete="tel"
        />
      </label>

      <label className="grid gap-2">
        <span className="text-xs font-medium uppercase tracking-widest text-ink-muted">Website URL</span>
        <input
          type="url"
          value={websiteUrl}
          onChange={(e) => setWebsiteUrl(e.target.value)}
          className={INPUT}
          placeholder="https://"
          autoComplete="url"
        />
      </label>

      <label className="grid gap-2 sm:col-span-2">
        <span className="text-xs font-medium uppercase tracking-widest text-ink-muted">Business type</span>
        <input
          value={businessType}
          onChange={(e) => setBusinessType(e.target.value)}
          className={INPUT}
          placeholder="e.g. Plumbing, Dental, Retail"
        />
      </label>

      <label className="grid gap-2">
        <span className="text-xs font-medium uppercase tracking-widest text-ink-muted">Source</span>
        <select
          value={source}
          onChange={(e) => setSource(e.target.value as CrmLeadSource)}
          className={INPUT}
        >
          {CRM_LEAD_SOURCES.map((s) => (
            <option key={s} value={s}>
              {CRM_LEAD_SOURCE_LABELS[s]}
            </option>
          ))}
        </select>
      </label>

      <label className="grid gap-2">
        <span className="text-xs font-medium uppercase tracking-widest text-ink-muted">Status</span>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value as CrmLeadStatus)}
          className={INPUT}
        >
          {CRM_LEAD_STATUSES.map((s) => (
            <option key={s} value={s}>
              {CRM_LEAD_STATUS_LABELS[s]}
            </option>
          ))}
        </select>
      </label>

      <div className="sm:col-span-2 grid gap-2">
        <span className="text-xs font-medium uppercase tracking-widest text-ink-muted">Interested in</span>
        <div className="grid sm:grid-cols-2 gap-2">
          {CRM_INTEREST_OPTIONS.map((o) => (
            <button
              key={o.id}
              type="button"
              onClick={() => toggleInterest(o.id)}
              className={`text-left rounded-xl px-4 py-2.5 text-sm transition border cursor-pointer ${
                interested[o.id]
                  ? "border-emerald-400/40 bg-emerald-400/10 text-white"
                  : "border-white/10 bg-white/[0.03] text-ink-muted hover:bg-white/[0.06]"
              }`}
            >
              {o.label}
            </button>
          ))}
        </div>
      </div>

      <label className="grid gap-2">
        <span className="text-xs font-medium uppercase tracking-widest text-ink-muted">Next follow-up date</span>
        <input
          type="date"
          value={nextFollowUp}
          onChange={(e) => setNextFollowUp(e.target.value)}
          className={INPUT}
        />
      </label>

      <label className="grid gap-2 sm:col-span-2">
        <span className="text-xs font-medium uppercase tracking-widest text-ink-muted">Notes</span>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          rows={4}
          className={`${INPUT} resize-none`}
          placeholder="Call notes, objections, next steps…"
        />
      </label>

      <div className="sm:col-span-2 flex justify-end pt-1">
        <button
          type="submit"
          disabled={submitting}
          className="btn-neon inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold text-white disabled:opacity-50 disabled:pointer-events-none"
        >
          {submitting ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" /> Saving…
            </>
          ) : (
            "Add lead"
          )}
        </button>
      </div>
    </form>
  );
}
