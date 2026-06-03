"use client";

import { useState, type FormEvent, type ReactNode } from "react";
import Link from "next/link";
import { CheckCircle2, Loader2, Sparkles } from "lucide-react";

type Props = {
  planId?: string;
  stripeSessionId?: string;
  defaultProjectTypes?: ProjectType[];
  projectTypes?: readonly ProjectType[];
  setupTitle?: string;
};

const POLICY_VERSION = "2026-01-01";

const PROJECT_TYPES = [
  "Website Rebuild",
  "New Website",
  "Website Care Plan",
  "Micah / Smart Chat Widget",
  "DOS Calendar",
  "QuoteOS",
  "GuestMate",
  "DOSLead",
  "Other",
] as const;

type ProjectType = (typeof PROJECT_TYPES)[number];

export const WEBSITE_REBUILD_PROJECT_TYPES = [
  "Website Rebuild",
  "New Website",
  "Website Care Plan",
  "Other",
] as const satisfies readonly ProjectType[];

const ACCESS_METHODS = [
  "Invite DOS as admin",
  "Temporary login will be provided separately",
  "Screen-share access session",
  "Not sure",
] as const;

const LEGAL_LINKS = [
  { label: "Terms", href: "/terms" },
  { label: "Privacy", href: "/privacy" },
  { label: "Cancellation", href: "/cancellation-policy" },
  { label: "Acceptable Use", href: "/acceptable-use" },
  { label: "Domain Policy", href: "/domain-management-policy" },
  { label: "Number Policy", href: "/number-policy" },
] as const;

const LEGAL_CHECKBOXES = [
  {
    id: "authorised",
    label: "I confirm that I am authorised to proceed with this DOS setup on behalf of the business.",
  },
  {
    id: "terms",
    label: "I have read and agree to the DOS Terms & Conditions.",
    href: "/terms",
  },
  {
    id: "privacy",
    label: "I have read and agree to the DOS Privacy Policy.",
    href: "/privacy",
  },
  {
    id: "cancellation",
    label: "I have read and agree to the DOS Cancellation Policy.",
    href: "/cancellation-policy",
  },
  {
    id: "overdue",
    label:
      "I understand that overdue payments may result in service suspension, limitation, or paused work until the account is brought up to date.",
  },
  {
    id: "ip",
    label:
      "I understand that Micah, Smart Chat Widget, DOSLead, DOS Calendar, GuestMate, AgentMate, QuoteOS, DOS Workspace, workflows, automations, templates, scripts, dashboards, prompts, reusable components, and related software remain the intellectual property of Directive OS / DOS unless expressly agreed otherwise in writing.",
  },
  {
    id: "thirdParty",
    label:
      "I understand that third-party services such as domains, hosting, email, Stripe, Twilio, OpenAI, Supabase, Vercel, Google, Resend, Neo, and other connected tools may have their own terms, fees, limits, outages, or service interruptions outside DOS's direct control.",
  },
] as const;

type LegalAcceptanceId = (typeof LEGAL_CHECKBOXES)[number]["id"];

type Form = {
  businessName: string;
  contactName: string;
  email: string;
  mobile: string;
  currentWebsiteUrl: string;
  businessSummary: string;
  projectTypes: ProjectType[];
  websitePlatform: string;
  domainProvider: string;
  hostingProvider: string;
  dosManageHostingDns: string;
  accessMethod: string;
  mainGoal: string;
  biggestIssue: string;
  carePlanInterest: string;
  accepted: Record<LegalAcceptanceId, boolean>;
};

const emptyAcceptance = LEGAL_CHECKBOXES.reduce(
  (acc, item) => ({ ...acc, [item.id]: false }),
  {} as Record<LegalAcceptanceId, boolean>
);

export default function OnboardingFlow({
  planId,
  stripeSessionId,
  defaultProjectTypes = [],
  projectTypes = PROJECT_TYPES,
  setupTitle = "Setup request",
}: Props) {
  const [form, setForm] = useState<Form>({
    businessName: "",
    contactName: "",
    email: "",
    mobile: "",
    currentWebsiteUrl: "",
    businessSummary: "",
    projectTypes: defaultProjectTypes.filter((type) => projectTypes.includes(type)),
    websitePlatform: "",
    domainProvider: "",
    hostingProvider: "",
    dosManageHostingDns: "Not sure",
    accessMethod: "Not sure",
    mainGoal: "",
    biggestIssue: "",
    carePlanInterest: "Not sure",
    accepted: emptyAcceptance,
  });
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState<{
    mode: "saved" | "queued";
    tenant?: { name: string; subdomain: string };
  } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const update = <K extends keyof Form>(key: K, value: Form[K]) =>
    setForm((f) => ({ ...f, [key]: value }));

  const toggleProjectType = (projectType: ProjectType) =>
    setForm((f) => ({
      ...f,
      projectTypes: f.projectTypes.includes(projectType)
        ? f.projectTypes.filter((type) => type !== projectType)
        : [...f.projectTypes, projectType],
    }));

  const setAccepted = (id: LegalAcceptanceId, value: boolean) =>
    setForm((f) => ({ ...f, accepted: { ...f.accepted, [id]: value } }));

  const allLegalAccepted = LEGAL_CHECKBOXES.every((item) => form.accepted[item.id]);
  const canSubmit = Boolean(
    form.businessName &&
      form.contactName &&
      form.email &&
      form.mobile &&
      form.businessSummary &&
      form.projectTypes.length > 0 &&
      form.mainGoal &&
      allLegalAccepted
  );

  async function submit(e: FormEvent) {
    e.preventDefault();
    if (!canSubmit) return;
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch("/api/onboarding", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          submittedAt: new Date().toISOString(),
          acceptedCheckboxes: LEGAL_CHECKBOXES.filter((item) => form.accepted[item.id]).map(
            (item) => item.id
          ),
          policyVersion: POLICY_VERSION,
          planId,
          stripeSessionId,
        }),
      });
      const data = (await res.json()) as {
        ok?: boolean;
        mode?: "saved" | "queued";
        tenant?: { name: string; subdomain: string };
        error?: string;
      };
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
              Setup request received.
            </h2>
            <p className="mt-3 text-ink-muted max-w-xl mx-auto">
              {done.mode === "saved"
                ? `We've logged your setup request${done.tenant ? ` (${done.tenant.subdomain})` : ""}. Our team will review it and confirm the next action.`
                : "We've received your setup request. Our team will review it and confirm the next action."}
            </p>
            {planId && (
              <p className="mt-2 text-xs font-mono uppercase tracking-widest text-ink-dim">
                Plan: {planId} {stripeSessionId ? `· session ${stripeSessionId.slice(0, 12)}…` : ""}
              </p>
            )}
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
              <a
                href="/book-demo"
                className="btn-neon inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white"
              >
                <Sparkles className="h-4 w-4" /> Book a kickoff call
              </a>
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
    <form onSubmit={submit} className="mt-12 grid gap-6">
      <div className="glass-strong rounded-2xl p-6 sm:p-8">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-mono uppercase tracking-widest text-ink-dim">Step 1</p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight">{setupTitle}</h2>
          </div>
          <p className="text-sm text-ink-muted">No passwords. No uploads. Just enough to start.</p>
        </div>
      </div>

      <Section title="1. Business details">
        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="Business name" required>
            <Input value={form.businessName} onChange={(v) => update("businessName", v)} placeholder="Acme Plumbing" />
          </Field>
          <Field label="Contact name" required>
            <Input value={form.contactName} onChange={(v) => update("contactName", v)} placeholder="Jordan" />
          </Field>
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="Email" required>
            <Input type="email" value={form.email} onChange={(v) => update("email", v)} placeholder="you@business.com.au" />
          </Field>
          <Field label="Mobile" required>
            <Input type="tel" value={form.mobile} onChange={(v) => update("mobile", v)} placeholder="+61 ..." />
          </Field>
        </div>
        <Field label="Current website URL">
          <Input value={form.currentWebsiteUrl} onChange={(v) => update("currentWebsiteUrl", v)} placeholder="https://yourbusiness.com.au" />
        </Field>
        <Field label="Short business summary" required>
          <Textarea
            value={form.businessSummary}
            onChange={(v) => update("businessSummary", v)}
            placeholder="What do you do, who do you help, and where do you operate?"
          />
        </Field>
      </Section>

      <Section title="2. Project type">
        <p className="text-sm text-ink-muted -mt-2">Select everything that applies.</p>
        <div className="grid sm:grid-cols-2 gap-3">
          {projectTypes.map((projectType) => (
            <CheckboxCard
              key={projectType}
              checked={form.projectTypes.includes(projectType)}
              onChange={(checked) => {
                if (checked !== form.projectTypes.includes(projectType)) toggleProjectType(projectType);
              }}
            >
              {projectType}
            </CheckboxCard>
          ))}
        </div>
      </Section>

      <Section title="3. Website / domain access">
        <div className="grid sm:grid-cols-3 gap-4">
          <Field label="Website platform">
            <Input value={form.websitePlatform} onChange={(v) => update("websitePlatform", v)} placeholder="WordPress, Wix, Shopify..." />
          </Field>
          <Field label="Domain registrar">
            <Input value={form.domainProvider} onChange={(v) => update("domainProvider", v)} placeholder="GoDaddy, Crazy Domains..." />
          </Field>
          <Field label="Hosting provider">
            <Input value={form.hostingProvider} onChange={(v) => update("hostingProvider", v)} placeholder="Vercel, cPanel, SiteGround..." />
          </Field>
        </div>
        <Field label="Access method">
          <Select
            value={form.accessMethod}
            onChange={(v) => update("accessMethod", v)}
            options={[...ACCESS_METHODS]}
          />
        </Field>
        <Field label="DNS / hosting management preference">
          <Select
            value={form.dosManageHostingDns}
            onChange={(v) => update("dosManageHostingDns", v)}
            options={["Yes", "No", "Not sure"]}
          />
        </Field>
      </Section>

      <Section title="4. Main goal">
        <Field label="What do you want improved?" required>
          <Textarea
            value={form.mainGoal}
            onChange={(v) => update("mainGoal", v)}
            placeholder="Example: more bookings, fewer missed calls, cleaner quote requests, better follow-up."
          />
        </Field>
        <Field label="Biggest issue with the current website or system">
          <Textarea
            value={form.biggestIssue}
            onChange={(v) => update("biggestIssue", v)}
            placeholder="What is slowing the business down right now?"
          />
        </Field>
      </Section>

      <Section title="5. Care plan">
        <Field label="Interested in the DOS Website Care Plan?">
          <Select
            value={form.carePlanInterest}
            onChange={(v) => update("carePlanInterest", v)}
            options={["Yes", "No", "Not sure"]}
          />
        </Field>
      </Section>

      <Section title="6. Legal approval">
        <div className="rounded-2xl border border-violet-400/20 bg-violet-500/10 p-4">
          <p className="text-xs font-mono uppercase tracking-widest text-violet-200">
            Review documents
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            {LEGAL_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs font-medium text-violet-100 transition hover:border-violet-300/40 hover:bg-violet-400/10"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
        <div className="grid gap-3">
          {LEGAL_CHECKBOXES.map((item) => (
            <CheckboxCard
              key={item.id}
              checked={form.accepted[item.id]}
              onChange={(checked) => setAccepted(item.id, checked)}
              required
            >
              {"href" in item ? (
                <>
                  {item.label.replace(/\.$/, "")}{" "}
                  <Link href={item.href} className="text-violet-300 hover:text-violet-200 underline underline-offset-2">
                    here
                  </Link>
                  .
                </>
              ) : (
                item.label
              )}
            </CheckboxCard>
          ))}
        </div>
        <p className="text-xs text-ink-dim">Policy version: {POLICY_VERSION}</p>
      </Section>

      {error && (
        <div className="rounded-xl border border-amber-400/30 bg-amber-400/10 px-4 py-3 text-sm text-amber-200">
          {error}
        </div>
      )}

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-ink-dim">
          Branding, content, socials, SEO, lead capture details and asset uploads come later in the Client Assets Request form after deposit.
        </p>
        <button
          type="submit"
          disabled={!canSubmit || submitting}
          className="btn-neon inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold text-white cursor-pointer disabled:opacity-50"
        >
          {submitting ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" /> Submitting...
            </>
          ) : (
            <>
              Submit Setup Request <Sparkles className="h-4 w-4" />
            </>
          )}
        </button>
      </div>
    </form>
  );
}

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="glass-strong rounded-2xl p-6 sm:p-8 grid gap-5">
      <h2 className="text-xl font-semibold tracking-tight">{title}</h2>
      {children}
    </section>
  );
}

function Field({ label, required, children }: { label: string; required?: boolean; children: ReactNode }) {
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
      rows={3}
      className="rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-sm placeholder-ink-dim outline-none focus:border-violet-400/50 focus:bg-white/[0.07] transition resize-none"
    />
  );
}

function Select({
  value,
  onChange,
  options,
}: {
  value: string;
  onChange: (v: string) => void;
  options: string[];
}) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-sm text-white outline-none focus:border-violet-400/50 focus:bg-white/[0.07] transition"
    >
      {options.map((option) => (
        <option key={option} value={option} className="bg-[#0b0616] text-white">
          {option}
        </option>
      ))}
    </select>
  );
}

function CheckboxCard({
  checked,
  onChange,
  required,
  children,
}: {
  checked: boolean;
  onChange: (checked: boolean) => void;
  required?: boolean;
  children: ReactNode;
}) {
  return (
    <label className="flex items-start gap-3 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 hover:bg-white/[0.05] transition cursor-pointer">
      <input
        type="checkbox"
        checked={checked}
        required={required}
        onChange={(e) => onChange(e.target.checked)}
        className="mt-1 accent-violet-500"
      />
      <span className="text-sm text-white/90 leading-relaxed">{children}</span>
    </label>
  );
}
