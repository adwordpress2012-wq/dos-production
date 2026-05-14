"use client";

import { useState } from "react";
import { ArrowRight, CheckCircle2, Loader2 } from "lucide-react";
import Link from "next/link";
import { readJsonOrNull } from "@/app/lib/safe-response-json";

type FormState = {
  name: string;
  email: string;
  phone: string;
  businessName: string;
  message: string;
};

export default function ContactForm() {
  const formAction = process.env.NEXT_PUBLIC_FORMSPREE_CONTACT_ACTION?.trim();
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    phone: "",
    businessName: "",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const update = <K extends keyof FormState>(k: K, v: FormState[K]) =>
    setForm((f) => ({ ...f, [k]: v }));

  if (!formAction) {
    return (
      <div className="mt-6 rounded-xl border border-amber-400/30 bg-amber-400/10 px-4 py-4 text-sm text-amber-100">
        <p className="font-medium text-white">Contact form unavailable</p>
        <p className="mt-2 text-ink-muted leading-relaxed">
          This form is not configured in this environment. Set{" "}
          <span className="font-mono text-xs text-amber-200/90">NEXT_PUBLIC_FORMSPREE_CONTACT_ACTION</span> to your
          Formspree endpoint, or use{" "}
          <Link href="/onboarding" className="text-violet-300 hover:text-violet-200 underline underline-offset-4">
            onboarding
          </Link>{" "}
          to reach the team.
        </p>
      </div>
    );
  }

  const contactFormPostUrl: string = formAction;

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      const fd = new FormData();
      fd.append("name", form.name);
      fd.append("email", form.email);
      fd.append("phone", form.phone);
      fd.append("business", form.businessName);
      fd.append("message", form.message);

      const res = await fetch(contactFormPostUrl, {
        method: "POST",
        body: fd,
        headers: { Accept: "application/json" },
      });
      const payload = await readJsonOrNull<{ ok?: boolean; error?: string }>(res);
      if (res.ok && (payload === null || payload.ok !== false)) {
        setDone(true);
        return;
      }
      const msg =
        payload?.error ??
        (res.status >= 400 ? `Could not send message (${res.status}).` : "Could not send message. Please try again.");
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
        <p className="mt-4 text-base font-semibold text-white">Message sent</p>
        <p className="mt-2 text-sm text-ink-muted leading-relaxed">
          Thanks — we&apos;ll get back to you as soon as we can.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="mt-6 grid gap-3">
      {error && (
        <div className="rounded-xl border border-amber-400/30 bg-amber-400/10 px-4 py-3 text-sm text-amber-200">
          {error}
        </div>
      )}
      <input
        required
        name="name"
        autoComplete="name"
        value={form.name}
        onChange={(e) => update("name", e.target.value)}
        placeholder="Your name"
        className="rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-sm placeholder-ink-dim outline-none focus:border-violet-400/50 focus:bg-white/[0.07] transition"
      />
      <input
        required
        type="email"
        name="email"
        autoComplete="email"
        value={form.email}
        onChange={(e) => update("email", e.target.value)}
        placeholder="you@business.com.au"
        className="rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-sm placeholder-ink-dim outline-none focus:border-violet-400/50 focus:bg-white/[0.07] transition"
      />
      <input
        name="phone"
        type="tel"
        autoComplete="tel"
        value={form.phone}
        onChange={(e) => update("phone", e.target.value)}
        placeholder="Phone (optional)"
        className="rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-sm placeholder-ink-dim outline-none focus:border-violet-400/50 focus:bg-white/[0.07] transition"
      />
      <input
        name="business"
        value={form.businessName}
        onChange={(e) => update("businessName", e.target.value)}
        placeholder="Business name"
        className="rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-sm placeholder-ink-dim outline-none focus:border-violet-400/50 focus:bg-white/[0.07] transition"
      />
      <textarea
        required
        name="message"
        rows={4}
        value={form.message}
        onChange={(e) => update("message", e.target.value)}
        placeholder="What are you trying to fix or automate?"
        className="rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-sm placeholder-ink-dim outline-none focus:border-violet-400/50 focus:bg-white/[0.07] transition resize-none"
      />
      <button
        type="submit"
        disabled={submitting}
        className="btn-neon mt-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold text-white cursor-pointer disabled:opacity-60"
      >
        {submitting ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" /> Sending…
          </>
        ) : (
          <>
            Send message <ArrowRight className="h-4 w-4" />
          </>
        )}
      </button>
    </form>
  );
}
