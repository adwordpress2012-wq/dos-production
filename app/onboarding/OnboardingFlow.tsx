"use client";

import { useState } from "react";
import { ArrowRight, ArrowLeft, CheckCircle2, Loader2, Sparkles } from "lucide-react";
import { readJsonOrNull } from "@/app/lib/safe-response-json";

type Props = {
  planId?: string;
  stripeSessionId?: string;
};

const STEPS = [
  { id: "business", label: "Your business" },
  { id: "stack", label: "What you need" },
  { id: "goals", label: "Goals + go-live" },
  { id: "review", label: "Review + submit" },
] as const;

const INDUSTRIES = [
  "Trades & home services",
  "Health & beauty",
  "Professional services",
  "Real estate",
  "Hospitality",
  "Retail / ecommerce",
  "Other",
];

const CHANNELS = [
  { id: "website", label: "Website rebuild + hosting" },
  { id: "micah", label: "Micah AI receptionist" },
  { id: "cos", label: "COS communication system" },
  { id: "bos", label: "BOS booking system" },
  { id: "command", label: "DOS Workspace" },
];

const WEBSITE_POLICY_SUMMARY = [
  "DOS may manage domains, DNS, SSL, hosting and deployment infrastructure for website rebuilds.",
  "Existing client-owned domains can remain with the current registrar while DOS manages technical configuration.",
  "Annual hosting or maintenance plans may include domain renewal costs unless otherwise stated.",
  "Managed domain transfers are subject to verification, settled invoices and any applicable migration or administration fees.",
];

type Form = {
  businessName: string;
  contactName: string;
  email: string;
  phone: string;
  industry: string;
  channels: string[];
  goals: string;
  goLive: string;
  domainInfrastructureAck: boolean;
};

export default function OnboardingFlow({ planId, stripeSessionId }: Props) {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<Form>({
    businessName: "",
    contactName: "",
    email: "",
    phone: "",
    industry: "",
    channels: planId === "starter" ? ["website", "micah"] : ["website", "micah", "cos", "bos"],
    goals: "",
    goLive: "ASAP",
    domainInfrastructureAck: false,
  });
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState<{
    mode: "saved" | "queued";
    tenant?: { name: string; subdomain: string };
  } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const update = <K extends keyof Form>(key: K, value: Form[K]) =>
    setForm((f) => ({ ...f, [key]: value }));

  const toggleChannel = (id: string) =>
    setForm((f) => ({
      ...f,
      channels: f.channels.includes(id)
        ? f.channels.filter((c) => c !== id)
        : [...f.channels, id],
    }));

  function canAdvance(): boolean {
    if (step === 0) {
      return Boolean(form.businessName && form.email && form.contactName);
    }
    if (step === 1) {
      return form.channels.length > 0;
    }
    return true;
  }

  const canSubmit = form.domainInfrastructureAck && !submitting;

  async function submit() {
    setSubmitting(true);
    setError(null);
    try {
      let res: Response;
      try {
        res = await fetch("/api/onboarding", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...form, planId, stripeSessionId }),
        });
      } catch (fetchErr) {
        throw new Error(
          fetchErr instanceof TypeError
            ? "We could not reach the server. Check your connection and try again, or use the contact page."
            : fetchErr instanceof Error
              ? fetchErr.message
              : "Network error while submitting. Please try again."
        );
      }

      let data: {
        ok?: boolean;
        mode?: "saved" | "queued";
        tenant?: { name: string; subdomain: string };
        error?: string;
      } | null = await readJsonOrNull<{
        ok?: boolean;
        mode?: "saved" | "queued";
        tenant?: { name: string; subdomain: string };
        error?: string;
      }>(res);

      if (data == null) {
        throw new Error(
          res.ok
            ? "We could not read the server response (empty or invalid). Please try again, or use the contact page if this keeps happening."
            : `Request failed (${res.status}). Please try again or reach us via the contact page.`
        );
      }
      if (!res.ok || !data.ok) {
        throw new Error(data.error ?? "Could not submit onboarding.");
      }
      setDone({ mode: data.mode ?? "queued", tenant: data.tenant });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setSubmitting(false);
    }
  }

  if (done) {
    return (
      <div className="mt-12">
        <div className="relative overflow-hidden rounded-3xl glass-strong p-10 text-center ring-glow">
          <div
            aria-hidden
            className="absolute -top-20 left-1/2 h-72 w-[700px] -translate-x-1/2 rounded-full bg-emerald-400/25 blur-[120px]"
          />
          <div className="relative">
            <div className="mx-auto inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-400 to-cyan-400 shadow-[0_0_40px_-6px_rgba(52,247,193,0.7)]">
              <CheckCircle2 className="h-7 w-7 text-white" />
            </div>
            <h2 className="mt-6 text-3xl sm:text-4xl font-semibold tracking-tight">
              You&apos;re in. <span className="text-gradient-neon">Welcome to DOS.</span>
            </h2>
            <p className="mt-3 text-ink-muted max-w-xl mx-auto">
              {done.mode === "saved"
                ? `We've spun up your tenant${done.tenant ? ` (${done.tenant.subdomain})` : ""}. Our team will reach out within 1 business day to schedule kickoff.`
                : "We've received your details. Our team will reach out within 1 business day to schedule kickoff."}
            </p>
            {planId && (
              <p className="mt-2 text-xs font-mono uppercase tracking-widest text-ink-dim">
                Plan: {planId} {stripeSessionId ? `· session ${stripeSessionId.slice(0, 12)}…` : ""}
              </p>
            )}
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
              <a
                href="/"
                className="btn-ghost inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium text-white"
              >
                Back to home
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-12">
      <Stepper step={step} />

      <div className="mt-8 glass-strong rounded-2xl p-6 sm:p-8">
        {step === 0 && (
          <Section title="Your business">
            <Field label="Business name" required>
              <Input value={form.businessName} onChange={(v) => update("businessName", v)} placeholder="Acme Plumbing" />
            </Field>
            <div className="grid sm:grid-cols-2 gap-4">
              <Field label="Your name" required>
                <Input value={form.contactName} onChange={(v) => update("contactName", v)} placeholder="Jordan" />
              </Field>
              <Field label="Email" required>
                <Input type="email" value={form.email} onChange={(v) => update("email", v)} placeholder="you@business.com.au" />
              </Field>
            </div>
            <Field label="Phone (optional)">
              <Input value={form.phone} onChange={(v) => update("phone", v)} placeholder="+61 …" />
            </Field>
            <Field label="Industry">
              <div className="grid sm:grid-cols-2 gap-2">
                {INDUSTRIES.map((i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => update("industry", i)}
                    className={`text-left rounded-xl px-4 py-2.5 text-sm transition border cursor-pointer ${
                      form.industry === i
                        ? "border-violet-400/40 bg-violet-500/10 text-white"
                        : "border-white/10 bg-white/[0.03] text-ink-muted hover:bg-white/[0.06]"
                    }`}
                  >
                    {i}
                  </button>
                ))}
              </div>
            </Field>
          </Section>
        )}

        {step === 1 && (
          <Section title="What you need">
            <p className="text-sm text-ink-muted -mt-2">Pick everything that applies — we'll quote and configure.</p>
            <div className="grid sm:grid-cols-2 gap-3">
              {CHANNELS.map((c) => {
                const active = form.channels.includes(c.id);
                return (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => toggleChannel(c.id)}
                    className={`group relative rounded-xl px-4 py-3.5 text-left transition border cursor-pointer ${
                      active
                        ? "border-emerald-400/40 bg-emerald-400/10"
                        : "border-white/10 bg-white/[0.03] hover:bg-white/[0.06]"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <span className={`text-sm font-medium ${active ? "text-white" : "text-ink-muted"}`}>{c.label}</span>
                      <span
                        className={`mt-0.5 h-4 w-4 rounded-md border ${
                          active
                            ? "border-emerald-400 bg-emerald-400/30 shadow-[0_0_10px_rgba(52,247,193,0.7)]"
                            : "border-white/20 bg-white/5"
                        }`}
                      />
                    </div>
                  </button>
                );
              })}
            </div>
          </Section>
        )}

        {step === 2 && (
          <Section title="Goals + go-live">
            <Field label="What are you trying to fix or automate?">
              <Textarea
                value={form.goals}
                onChange={(v) => update("goals", v)}
                placeholder="Example: We're missing too many calls after hours, and our website looks like 2014."
              />
            </Field>
            <Field label="When do you want to go live?">
              <div className="grid grid-cols-3 gap-2">
                {["ASAP", "1–3 months", "Just exploring"].map((g) => (
                  <button
                    key={g}
                    type="button"
                    onClick={() => update("goLive", g)}
                    className={`rounded-xl px-4 py-2.5 text-sm transition border cursor-pointer ${
                      form.goLive === g
                        ? "border-violet-400/40 bg-violet-500/10 text-white"
                        : "border-white/10 bg-white/[0.03] text-ink-muted hover:bg-white/[0.06]"
                    }`}
                  >
                    {g}
                  </button>
                ))}
              </div>
            </Field>
          </Section>
        )}

        {step === 3 && (
          <Section title="Review and submit">
            <div className="grid gap-4 sm:grid-cols-2 text-sm">
              <Review label="Business" value={form.businessName} />
              <Review label="Contact" value={`${form.contactName} · ${form.email}`} />
              <Review label="Phone" value={form.phone || "—"} />
              <Review label="Industry" value={form.industry || "—"} />
              <Review label="Stack" value={form.channels.map((id) => CHANNELS.find((c) => c.id === id)?.label).filter(Boolean).join(", ") || "—"} />
              <Review label="Go live" value={form.goLive} />
              <Review label="Goals" value={form.goals || "—"} className="sm:col-span-2" />
              {planId && <Review label="Plan" value={planId} />}
              {form.channels.includes("website") && (
                <div className="sm:col-span-2 rounded-xl border border-violet-400/20 bg-violet-500/10 px-4 py-4">
                  <div className="text-[11px] font-mono uppercase tracking-widest text-violet-200">
                    Website rebuild policy summary
                  </div>
                  <ul className="mt-3 grid gap-2 text-sm leading-relaxed text-ink-muted">
                    {WEBSITE_POLICY_SUMMARY.map((item) => (
                      <li key={item} className="flex gap-2">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-violet-300" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <a
                    href="/domain-management-policy"
                    className="mt-3 inline-flex text-xs font-medium text-violet-200 hover:text-violet-100"
                  >
                    Read the Domain Management & Ownership Policy
                  </a>
                </div>
              )}
              <label className="sm:col-span-2 flex items-start gap-3 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white/90">
                <input
                  type="checkbox"
                  checked={form.domainInfrastructureAck}
                  onChange={(e) => update("domainInfrastructureAck", e.target.checked)}
                  className="mt-1 accent-violet-500"
                />
                <span>
                  I understand DOS may manage domains, DNS, hosting, and related infrastructure as
                  part of the service.
                </span>
              </label>
            </div>
          </Section>
        )}

        {error && (
          <div className="mt-4 rounded-xl border border-amber-400/30 bg-amber-400/10 px-4 py-3 text-sm text-amber-200">
            {error}
          </div>
        )}

        <div className="mt-8 flex items-center justify-between">
          <button
            type="button"
            onClick={() => setStep((s) => Math.max(0, s - 1))}
            disabled={step === 0 || submitting}
            className="btn-ghost disabled:opacity-40 inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-medium text-white cursor-pointer"
          >
            <ArrowLeft className="h-4 w-4" /> Back
          </button>

          {step < STEPS.length - 1 ? (
            <button
              type="button"
              onClick={() => canAdvance() && setStep((s) => Math.min(STEPS.length - 1, s + 1))}
              disabled={!canAdvance()}
              className="btn-neon inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold text-white cursor-pointer disabled:opacity-50"
            >
              Continue <ArrowRight className="h-4 w-4" />
            </button>
          ) : (
            <button
              type="button"
              onClick={submit}
              disabled={!canSubmit}
              className="btn-neon inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold text-white cursor-pointer disabled:opacity-50"
            >
              {submitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" /> Submitting…
                </>
              ) : (
                <>
                  Submit onboarding <Sparkles className="h-4 w-4" />
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

function Stepper({ step }: { step: number }) {
  return (
    <ol className="grid grid-cols-4 gap-2">
      {STEPS.map((s, i) => {
        const done = i < step;
        const active = i === step;
        return (
          <li key={s.id} className="flex flex-col gap-2">
            <div
              className={`h-1.5 rounded-full transition ${
                done
                  ? "bg-gradient-to-r from-violet-500 to-cyan-400"
                  : active
                    ? "bg-gradient-to-r from-violet-500 to-violet-500/40"
                    : "bg-white/5"
              }`}
            />
            <span className={`text-[11px] font-medium uppercase tracking-widest ${active || done ? "text-white" : "text-ink-dim"}`}>
              {String(i + 1).padStart(2, "0")} · {s.label}
            </span>
          </li>
        );
      })}
    </ol>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="grid gap-5">
      <h2 className="text-xl font-semibold tracking-tight">{title}</h2>
      {children}
    </div>
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

function Textarea({
  value,
  onChange,
  placeholder,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  return (
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      rows={4}
      className="rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-sm placeholder-ink-dim outline-none focus:border-violet-400/50 focus:bg-white/[0.07] transition resize-none"
    />
  );
}

function Review({ label, value, className = "" }: { label: string; value: string; className?: string }) {
  return (
    <div className={`glass rounded-xl px-4 py-3 ${className}`}>
      <div className="text-[11px] font-mono uppercase tracking-widest text-ink-dim">{label}</div>
      <div className="mt-1 text-sm font-medium break-words">{value}</div>
    </div>
  );
}
