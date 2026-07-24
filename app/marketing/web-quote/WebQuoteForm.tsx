"use client";

import { useState } from "react";
import { ArrowRight, CheckCircle2, Loader2 } from "lucide-react";
import { readJsonOrNull } from "@/app/lib/safe-response-json";

const SCOPE_OPTIONS = [
  "5–10 pages (most small businesses)",
  "10–25 pages (multi-service)",
  "25+ pages / e-commerce",
  "Not sure — help me figure it out",
];

export default function WebQuoteForm() {
  const [form, setForm] = useState({
    businessName: "",
    name: "",
    email: "",
    phone: "",
    currentSite: "",
    scope: SCOPE_OPTIONS[0],
    notes: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const update = <K extends keyof typeof form>(k: K, v: (typeof form)[K]) =>
    setForm((f) => ({ ...f, [k]: v }));

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      let res: Response;
      try {
        res = await fetch("/api/onboarding", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            businessName: form.businessName,
            contactName: form.name,
            email: form.email,
            phone: form.phone,
            industry: "Website rebuild quote",
            channels: ["website"],
            goals: [
              form.currentSite ? `Current site: ${form.currentSite}` : null,
              `Scope: ${form.scope}`,
              form.notes ? `Notes: ${form.notes}` : null,
            ]
              .filter(Boolean)
              .join("\n"),
            planId: "web-quote",
          }),
        });
      } catch (fetchErr) {
        throw new Error(
          fetchErr instanceof TypeError
            ? "We could not reach the server. Check your connection and try again."
            : fetchErr instanceof Error
              ? fetchErr.message
              : "Network error while submitting. Please try again."
        );
      }

      const data = await readJsonOrNull<{ ok?: boolean; error?: string }>(res);

      if (data == null) {
        throw new Error(
          res.ok
            ? "We could not read the server response. Please try again or use the contact page."
            : `Request failed (${res.status}). Please try again.`
        );
      }
      if (!res.ok || !data.ok) throw new Error(data.error ?? "Could not submit quote.");
      setDone(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setSubmitting(false);
    }
  }

  if (done) {
    return (
      <div className="mt-12 glass-strong rounded-3xl p-10 text-center ring-glow">
        <div className="mx-auto inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-400 to-cyan-400 shadow-[0_0_40px_-6px_rgba(52,247,193,0.7)]">
          <CheckCircle2 className="h-7 w-7 text-white" />
        </div>
        <h2 className="mt-6 text-3xl font-semibold tracking-tight">
          Quote request received.
        </h2>
        <p className="mt-3 text-ink-muted max-w-xl mx-auto">
          We&apos;ll review the request and email the next practical step. In the meantime,
          start your full onboarding to lock in your launch slot.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
          <a
            href="/onboarding"
            className="btn-neon inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white"
          >
            Start onboarding <ArrowRight className="h-4 w-4" />
          </a>
          <a
            href="https://api.leadconnectorhq.com/widget/booking/QAKm8ZjgD7oceOc8nN0b"
            className="btn-ghost inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium text-white"
          >
            Book Business Discovery
          </a>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={submit}
      className="mt-12 glass-strong rounded-2xl p-6 sm:p-8 grid gap-5"
    >
      <div className="grid sm:grid-cols-2 gap-4">
        <Field label="Business name" required>
          <Input value={form.businessName} onChange={(v) => update("businessName", v)} placeholder="Acme Plumbing" />
        </Field>
        <Field label="Your name" required>
          <Input value={form.name} onChange={(v) => update("name", v)} placeholder="Jordan" />
        </Field>
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        <Field label="Email" required>
          <Input type="email" value={form.email} onChange={(v) => update("email", v)} placeholder="you@business.com.au" />
        </Field>
        <Field label="Phone (optional)">
          <Input value={form.phone} onChange={(v) => update("phone", v)} placeholder="+61 …" />
        </Field>
      </div>
      <Field label="Current website (if any)">
        <Input value={form.currentSite} onChange={(v) => update("currentSite", v)} placeholder="https://yourbusiness.com.au" />
      </Field>
      <Field label="Project scope">
        <div className="grid sm:grid-cols-2 gap-2">
          {SCOPE_OPTIONS.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => update("scope", s)}
              className={`text-left rounded-xl px-4 py-2.5 text-sm transition border cursor-pointer ${
                form.scope === s
                  ? "border-violet-400/40 bg-violet-500/10 text-white"
                  : "border-white/10 bg-white/[0.03] text-ink-muted hover:bg-white/[0.06]"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </Field>
      <Field label="Anything else we should know?">
        <textarea
          value={form.notes}
          onChange={(e) => update("notes", e.target.value)}
          rows={4}
          placeholder="Goals, brand notes, must-haves, deadlines…"
          className="rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-sm placeholder-ink-dim outline-none focus:border-violet-400/50 focus:bg-white/[0.07] transition resize-none"
        />
      </Field>

      {error && (
        <div className="rounded-xl border border-amber-400/30 bg-amber-400/10 px-4 py-3 text-sm text-amber-200">
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={submitting || !form.businessName || !form.name || !form.email}
        className="btn-neon mt-1 inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold text-white cursor-pointer disabled:opacity-50"
      >
        {submitting ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" /> Submitting…
          </>
        ) : (
          <>
            Request quote <ArrowRight className="h-4 w-4" />
          </>
        )}
      </button>
    </form>
  );
}

function Field({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <label className="grid gap-2">
      <span className="text-xs font-medium uppercase tracking-widest text-ink-muted">
        {label} {required && <span className="text-violet-300">*</span>}
      </span>
      {children}
    </label>
  );
}

function Input({
  value,
  onChange,
  placeholder,
  type = "text",
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
}) {
  return (
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-sm placeholder-ink-dim outline-none focus:border-violet-400/50 focus:bg-white/[0.07] transition"
    />
  );
}
