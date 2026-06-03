"use client";

import { useState } from "react";
import { ArrowRight, CheckCircle2, Loader2 } from "lucide-react";
import { readJsonOrNull } from "@/app/lib/safe-response-json";

function isFormspreeHttpsFormAction(raw: string): boolean {
  try {
    const u = new URL(raw);
    return u.protocol === "https:" && u.hostname === "formspree.io" && /^\/f\/[^/]+\/?$/i.test(u.pathname);
  } catch {
    return false;
  }
}

type FormState = {
  businessName: string;
  contactName: string;
  email: string;
  mobile: string;
  businessType: string;
  websiteUrl: string;
  mainChallenge: string;
  enquirySources: string;
  missedMostOften: string;
  workflowPainPoint: string;
  firstFix: string;
  bestTimeToCall: string;
};

const initialForm: FormState = {
  businessName: "",
  contactName: "",
  email: "",
  mobile: "",
  businessType: "",
  websiteUrl: "",
  mainChallenge: "",
  enquirySources: "",
  missedMostOften: "",
  workflowPainPoint: "",
  firstFix: "",
  bestTimeToCall: "",
};

const inputClass =
  "rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-sm placeholder-ink-dim outline-none focus:border-violet-400/50 focus:bg-white/[0.07] transition";

const labelClass = "text-xs font-semibold uppercase tracking-[0.18em] text-ink-muted";

export default function DiscoveryForm() {
  const rawAction = process.env.NEXT_PUBLIC_FORMSPREE_CONTACT_ACTION?.trim();
  const formAction = rawAction && isFormspreeHttpsFormAction(rawAction) ? rawAction : undefined;
  const misconfiguredAction = Boolean(rawAction && !formAction);
  const [form, setForm] = useState<FormState>(initialForm);
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const update = <K extends keyof FormState>(key: K, value: FormState[K]) =>
    setForm((current) => ({ ...current, [key]: value }));

  if (!formAction) {
    return (
      <div className="mt-6 rounded-xl border border-amber-400/30 bg-amber-400/10 px-4 py-4 text-sm text-amber-100">
        <p className="font-medium text-white">
          {misconfiguredAction ? "Discovery form misconfigured" : "Discovery form unavailable"}
        </p>
        <p className="mt-2 leading-relaxed text-ink-muted">
          {misconfiguredAction ? (
            <>
              <span className="font-mono text-xs text-amber-200/90">NEXT_PUBLIC_FORMSPREE_CONTACT_ACTION</span>{" "}
              must be a valid Formspree HTTPS URL.
            </>
          ) : (
            <>
              Set{" "}
              <span className="font-mono text-xs text-amber-200/90">NEXT_PUBLIC_FORMSPREE_CONTACT_ACTION</span>{" "}
              to the existing DOS Formspree form URL.
            </>
          )}
        </p>
      </div>
    );
  }

  const discoveryFormPostUrl: string = formAction;

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      const fd = new FormData();
      fd.append("Business name", form.businessName);
      fd.append("Contact name", form.contactName);
      fd.append("Email", form.email);
      fd.append("Mobile", form.mobile);
      fd.append("Business type", form.businessType);
      fd.append("Website URL", form.websiteUrl);
      fd.append("Main challenge", form.mainChallenge);
      fd.append("Where enquiries come from", form.enquirySources);
      fd.append("What gets missed", form.missedMostOften);
      fd.append("Workflow/admin pain point", form.workflowPainPoint);
      fd.append("What DOS should fix first", form.firstFix);
      fd.append("Best time to call", form.bestTimeToCall);
      fd.append("form_type", "Operational Discovery Form");
      fd.append("source_page", "directiveos.com.au homepage");
      fd.append("project_context", "DOS Operational Discovery");

      let res: Response;
      try {
        res = await fetch(discoveryFormPostUrl, {
          method: "POST",
          body: fd,
          headers: { Accept: "application/json" },
        });
      } catch (fetchErr) {
        throw new Error(
          fetchErr instanceof TypeError
            ? "We could not reach the form service. Check your connection and try again."
            : fetchErr instanceof Error
              ? fetchErr.message
              : "Network error while sending. Please try again."
        );
      }

      const payload = await readJsonOrNull<{ ok?: boolean; error?: string; errors?: string[] }>(res);
      const formErrors = payload?.errors?.filter(Boolean).join(" ");
      if (res.ok && (payload === null || payload.ok !== false) && !formErrors) {
        setDone(true);
        setForm(initialForm);
        return;
      }

      const msg =
        formErrors ||
        payload?.error ||
        (res.status >= 400 ? `Could not send discovery request (${res.status}).` : "Could not send discovery request.");
      throw new Error(msg);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setSubmitting(false);
    }
  }

  if (done) {
    return (
      <div className="mt-6 rounded-xl border border-emerald-400/25 bg-emerald-400/10 px-4 py-6 text-center">
        <div className="mx-auto inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-400 to-cyan-400">
          <CheckCircle2 className="h-6 w-6 text-white" />
        </div>
        <p className="mt-4 text-base font-semibold text-white">Discovery request received</p>
        <p className="mt-2 text-sm leading-relaxed text-ink-muted">
          Thanks — your discovery request has been received. Jaze from DOS will review it and contact you shortly.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="mt-6 grid gap-5">
      {error && (
        <div className="rounded-xl border border-amber-400/30 bg-amber-400/10 px-4 py-3 text-sm text-amber-200">
          {error}
        </div>
      )}

      <input type="hidden" name="form_type" value="Operational Discovery Form" />
      <input type="hidden" name="source_page" value="directiveos.com.au homepage" />
      <input type="hidden" name="project_context" value="DOS Operational Discovery" />

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Business name">
          <input
            required
            name="Business name"
            autoComplete="organization"
            value={form.businessName}
            onChange={(e) => update("businessName", e.target.value)}
            className={inputClass}
          />
        </Field>
        <Field label="Contact name">
          <input
            required
            name="Contact name"
            autoComplete="name"
            value={form.contactName}
            onChange={(e) => update("contactName", e.target.value)}
            className={inputClass}
          />
        </Field>
        <Field label="Email">
          <input
            required
            type="email"
            name="Email"
            autoComplete="email"
            value={form.email}
            onChange={(e) => update("email", e.target.value)}
            className={inputClass}
          />
        </Field>
        <Field label="Mobile">
          <input
            required
            type="tel"
            name="Mobile"
            autoComplete="tel"
            value={form.mobile}
            onChange={(e) => update("mobile", e.target.value)}
            className={inputClass}
          />
        </Field>
        <Field label="Business type">
          <input
            required
            name="Business type"
            value={form.businessType}
            onChange={(e) => update("businessType", e.target.value)}
            placeholder="Pizza shop, tourism, tradie, real estate..."
            className={inputClass}
          />
        </Field>
        <Field label="Website URL">
          <input
            type="url"
            name="Website URL"
            autoComplete="url"
            value={form.websiteUrl}
            onChange={(e) => update("websiteUrl", e.target.value)}
            placeholder="https://"
            className={inputClass}
          />
        </Field>
      </div>

      <Field label="Main challenge">
        <textarea
          required
          name="Main challenge"
          rows={4}
          value={form.mainChallenge}
          onChange={(e) => update("mainChallenge", e.target.value)}
          placeholder="What is currently slowing your business down?"
          className={`${inputClass} resize-none`}
        />
      </Field>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Where enquiries come from">
          <textarea
            required
            name="Where enquiries come from"
            rows={4}
            value={form.enquirySources}
            onChange={(e) => update("enquirySources", e.target.value)}
            placeholder="Phone, website, Facebook, referrals, walk-ins..."
            className={`${inputClass} resize-none`}
          />
        </Field>
        <Field label="What gets missed">
          <textarea
            required
            name="What gets missed"
            rows={4}
            value={form.missedMostOften}
            onChange={(e) => update("missedMostOften", e.target.value)}
            placeholder="Calls, bookings, quotes, follow-ups, payments..."
            className={`${inputClass} resize-none`}
          />
        </Field>
      </div>

      <Field label="Workflow/admin pain point">
        <textarea
          required
          name="Workflow/admin pain point"
          rows={4}
          value={form.workflowPainPoint}
          onChange={(e) => update("workflowPainPoint", e.target.value)}
          placeholder="What admin or workflow would you like to make easier?"
          className={`${inputClass} resize-none`}
        />
      </Field>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="What DOS should fix first">
          <textarea
            required
            name="What DOS should fix first"
            rows={4}
            value={form.firstFix}
            onChange={(e) => update("firstFix", e.target.value)}
            placeholder="If DOS could fix one part of your business first, what would it be?"
            className={`${inputClass} resize-none`}
          />
        </Field>
        <Field label="Best time to call">
          <textarea
            required
            name="Best time to call"
            rows={4}
            value={form.bestTimeToCall}
            onChange={(e) => update("bestTimeToCall", e.target.value)}
            placeholder="Best time for Jaze to call"
            className={`${inputClass} resize-none`}
          />
        </Field>
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="btn-neon inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold text-white disabled:opacity-60"
      >
        {submitting ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" /> Sending...
          </>
        ) : (
          <>
            Submit Discovery Request <ArrowRight className="h-4 w-4" />
          </>
        )}
      </button>
    </form>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="grid gap-2">
      <span className={labelClass}>{label}</span>
      {children}
    </label>
  );
}
