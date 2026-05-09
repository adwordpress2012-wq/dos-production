"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

export default function AddClientForm() {
  const router = useRouter();
  const [businessName, setBusinessName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  /** Paying customers appear in the Clients list */
  const [payingCustomer, setPayingCustomer] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!businessName.trim() || !email.trim()) {
      toast.error("Failed to create client", {
        description: "Business name and email are required.",
      });
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/admin/clients", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          business_name: businessName.trim(),
          email: email.trim(),
          phone: phone.trim() || undefined,
          status: "active",
          is_paying_customer: payingCustomer,
        }),
      });

      const payload = (await res.json().catch(() => ({}))) as {
        error?: string;
        ok?: boolean;
      };

      if (!res.ok || !payload.ok) {
        toast.error("Failed to create client", {
          description: payload.error ?? `HTTP ${res.status}`,
        });
        return;
      }

      toast.success("Client created successfully");
      setBusinessName("");
      setEmail("");
      setPhone("");
      setPayingCustomer(false);
      router.refresh();
    } catch {
      toast.error("Failed to create client", {
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
          name="business_name"
          value={businessName}
          onChange={(e) => setBusinessName(e.target.value)}
          placeholder="Acme Plumbing"
          autoComplete="organization"
          className="rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-sm placeholder-ink-dim outline-none focus:border-violet-400/50 focus:bg-white/[0.07] transition"
        />
      </label>
      <label className="grid gap-2">
        <span className="text-xs font-medium uppercase tracking-widest text-ink-muted">
          Email <span className="text-violet-300">*</span>
        </span>
        <input
          name="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="hello@business.com.au"
          autoComplete="email"
          className="rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-sm placeholder-ink-dim outline-none focus:border-violet-400/50 focus:bg-white/[0.07] transition"
        />
      </label>
      <label className="grid gap-2">
        <span className="text-xs font-medium uppercase tracking-widest text-ink-muted">Phone</span>
        <input
          name="phone"
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="+61 …"
          autoComplete="tel"
          className="rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-sm placeholder-ink-dim outline-none focus:border-violet-400/50 focus:bg-white/[0.07] transition"
        />
      </label>
      <label className="flex items-start gap-3 sm:col-span-2 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 cursor-pointer">
        <input
          type="checkbox"
          checked={payingCustomer}
          onChange={(e) => setPayingCustomer(e.target.checked)}
          className="mt-1 h-4 w-4 rounded border-white/20 bg-white/5"
        />
        <span className="text-sm text-ink-muted">
          <span className="font-medium text-white">Paying customer</span> — show this profile in the Clients list
          below. Leave off for drafts or non-paying records.
        </span>
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
            "Add client"
          )}
        </button>
      </div>
    </form>
  );
}
