import type { Metadata } from "next";
import type { ReactNode } from "react";
import { headers } from "next/headers";
import Link from "next/link";
import { Phone } from "lucide-react";
import MicahCosChatWidget from "../../components/MicahCosChatWidget";

export const metadata: Metadata = {
  title: "Website onboarding",
  description:
    "Website rebuild, new build, hosting migration, domain/DNS and branding — Directive Operating Systems.",
};

const INPUT =
  "w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-sm text-white placeholder:text-ink-dim outline-none focus:border-violet-400/50 focus:bg-white/[0.07] transition";
const TEXTAREA = `${INPUT} resize-y min-h-[100px]`;
const LABEL = "text-xs font-medium uppercase tracking-widest text-ink-muted";
const CHECK_WRAP =
  "flex items-start gap-3 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 hover:bg-white/[0.05] transition cursor-pointer";

const JAYSON_PHONE_DISPLAY = "0434 666 080";
const JAYSON_PHONE_LINK = "tel:+61434666080";
const MICAH_PHONE_DISPLAY = "02 5950 6382";
const MICAH_PHONE_LINK = "tel:0259506382";
const DOS_SITE = "https://directiveos.com.au";

const DOMAIN_POLICY_SUMMARY = [
  "DOS may purchase, configure and manage domains as part of the Done-For-You service model.",
  "Existing client-owned domains can remain with the current registrar while DOS manages DNS and hosting configuration.",
  "DOS may manage SSL, Vercel deployment, email records and related infrastructure for domains under management.",
  "Managed domain transfers are subject to verification, settled invoices and any applicable migration or administration fees.",
];

const TECH_ADMIN_FEES = [
  "domain transfer processing",
  "DNS migration",
  "email migration",
  "hosting reconfiguration",
  "infrastructure migration support",
];

function Field({
  label,
  htmlFor,
  required,
  children,
}: {
  label: string;
  htmlFor?: string;
  required?: boolean;
  children: ReactNode;
}) {
  return (
    <div className="grid gap-2">
      <label htmlFor={htmlFor} className={LABEL}>
        {label}
        {required ? <span className="text-violet-300"> *</span> : null}
      </label>
      {children}
    </div>
  );
}

export default async function WebsiteRebuildOnboardingPage() {
  const h = await headers();
  const host = h.get("x-forwarded-host") ?? h.get("host");
  const proto = h.get("x-forwarded-proto") ?? "https";
  const origin =
    host && !host.includes("localhost") ? `${proto}://${host}` : "http://localhost:3000";
  const thanksUrl = `${origin}/thank-you`;

  return (
    <main className="relative pt-28 sm:pt-36 pb-16">
      <section className="mx-auto max-w-3xl px-6">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="inline-flex items-center gap-2 rounded-full border border-violet-400/25 bg-violet-500/10 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.2em] text-violet-200">
            <span className="h-1.5 w-1.5 rounded-full bg-violet-300 shadow-[0_0_10px_2px_rgba(139,92,246,0.6)]" />
            Website rebuild + hosting
          </span>
          <h1 className="mt-5 text-3xl sm:text-4xl font-semibold tracking-tight leading-[1.08]">
            Tell us about your <span className="text-gradient-purple">website project</span>
          </h1>
          <p className="mt-4 text-base sm:text-lg text-ink-muted leading-relaxed">
            Rebuilds, new builds, hosting migration, domain/DNS, branding and lead capture — one form.
            This is separate from general DOS onboarding (Micah, COS, BOS stack).
          </p>
          <p className="mt-3 text-sm text-ink-dim">
            Full DOS stack onboarding:{" "}
            <Link href="/onboarding" className="text-violet-300 hover:text-violet-200 underline underline-offset-2">
              /onboarding
            </Link>
          </p>
        </div>

        <form action="https://formspree.io/f/mjglpyyz" method="POST" className="space-y-8">
          <input type="hidden" name="_next" value={thanksUrl} />
          <input type="hidden" name="_subject" value="DOS Website Rebuild + Hosting Onboarding" />
          <input
            type="text"
            name="_gotcha"
            tabIndex={-1}
            autoComplete="off"
            className="absolute left-[-5000px]"
            aria-hidden
          />

          <div className="glass-strong rounded-2xl p-6 sm:p-8 space-y-5">
            <h2 className="text-xl font-semibold tracking-tight text-white">Business details</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <Field label="Business name" htmlFor="business_name" required>
                <input id="business_name" name="business_name" required className={INPUT} />
              </Field>
              <Field label="Contact person" htmlFor="contact_person" required>
                <input id="contact_person" name="contact_person" required className={INPUT} />
              </Field>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <Field label="Email" htmlFor="email" required>
                <input id="email" name="email" type="email" required className={INPUT} />
              </Field>
              <Field label="Mobile" htmlFor="mobile" required>
                <input id="mobile" name="mobile" type="tel" required className={INPUT} />
              </Field>
            </div>
            <Field label="Current website URL" htmlFor="current_website_url">
              <input id="current_website_url" name="current_website_url" type="url" placeholder="https://" className={INPUT} />
            </Field>
            <Field label="Business address" htmlFor="business_address">
              <textarea id="business_address" name="business_address" rows={3} className={TEXTAREA} />
            </Field>
          </div>

          <div className="glass-strong rounded-2xl p-6 sm:p-8 space-y-5">
            <h2 className="text-xl font-semibold tracking-tight text-white">Project type</h2>
            <p className="text-sm text-ink-muted -mt-2">Select everything that applies.</p>
            <div className="grid sm:grid-cols-2 gap-3">
              <label className={CHECK_WRAP}>
                <input type="checkbox" name="project_website_rebuild" value="Yes" className="mt-1 accent-violet-500" />
                <span className="text-sm text-white/90">Website rebuild</span>
              </label>
              <label className={CHECK_WRAP}>
                <input type="checkbox" name="project_new_website_build" value="Yes" className="mt-1 accent-violet-500" />
                <span className="text-sm text-white/90">New website build</span>
              </label>
              <label className={CHECK_WRAP}>
                <input type="checkbox" name="project_hosting_migration" value="Yes" className="mt-1 accent-violet-500" />
                <span className="text-sm text-white/90">Hosting migration</span>
              </label>
              <label className={CHECK_WRAP}>
                <input type="checkbox" name="project_domain_dns_setup" value="Yes" className="mt-1 accent-violet-500" />
                <span className="text-sm text-white/90">Domain / DNS setup</span>
              </label>
              <label className={CHECK_WRAP}>
                <input type="checkbox" name="project_micah_ai_addon" value="Yes" className="mt-1 accent-violet-500" />
                <span className="text-sm text-white/90">Micah AI add-on</span>
              </label>
              <label className={CHECK_WRAP}>
                <input type="checkbox" name="project_ongoing_support" value="Yes" className="mt-1 accent-violet-500" />
                <span className="text-sm text-white/90">Ongoing support</span>
              </label>
            </div>
          </div>

          <div className="glass-strong rounded-2xl p-6 sm:p-8 space-y-5">
            <h2 className="text-xl font-semibold tracking-tight text-white">Website access</h2>
            <Field label="Website platform" htmlFor="website_platform">
              <input id="website_platform" name="website_platform" className={INPUT} placeholder="WordPress, Wix, Shopify…" />
            </Field>
            <div className="grid sm:grid-cols-2 gap-4">
              <Field label="Admin login URL" htmlFor="admin_login_url">
                <input id="admin_login_url" name="admin_login_url" type="url" className={INPUT} />
              </Field>
              <Field label="Username" htmlFor="cms_username">
                <input id="cms_username" name="cms_username" className={INPUT} autoComplete="off" />
              </Field>
            </div>
            <Field label="Password" htmlFor="cms_password">
              <input id="cms_password" name="cms_password" type="password" className={INPUT} autoComplete="new-password" />
            </Field>
            <Field label="Hosting provider" htmlFor="hosting_provider">
              <input id="hosting_provider" name="hosting_provider" className={INPUT} />
            </Field>
            <div className="grid sm:grid-cols-2 gap-4">
              <Field label="cPanel / login URL" htmlFor="cpanel_login_url">
                <input id="cpanel_login_url" name="cpanel_login_url" type="url" className={INPUT} />
              </Field>
              <Field label="Hosting username" htmlFor="hosting_username">
                <input id="hosting_username" name="hosting_username" className={INPUT} autoComplete="off" />
              </Field>
            </div>
            <Field label="Hosting password" htmlFor="hosting_password">
              <input id="hosting_password" name="hosting_password" type="password" className={INPUT} autoComplete="new-password" />
            </Field>
          </div>

          <div className="glass-strong rounded-2xl p-6 sm:p-8 space-y-5">
            <h2 className="text-xl font-semibold tracking-tight text-white">Domain / DNS</h2>
            <Field label="Domain registrar" htmlFor="domain_registrar">
              <input id="domain_registrar" name="domain_registrar" className={INPUT} />
            </Field>
            <div className="grid sm:grid-cols-2 gap-4">
              <Field label="Registrar login URL" htmlFor="registrar_login_url">
                <input id="registrar_login_url" name="registrar_login_url" type="url" className={INPUT} />
              </Field>
              <Field label="Username / email" htmlFor="registrar_username">
                <input id="registrar_username" name="registrar_username" className={INPUT} autoComplete="off" />
              </Field>
            </div>
            <Field label="Password" htmlFor="registrar_password">
              <input id="registrar_password" name="registrar_password" type="password" className={INPUT} autoComplete="new-password" />
            </Field>
            <Field label="Does the client want DOS to manage DNS?" htmlFor="dns_manage">
              <select id="dns_manage" name="dns_manage" className={INPUT}>
                <option value="">Select…</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
                <option value="Discuss">Let&apos;s discuss</option>
              </select>
            </Field>
            <Field label="Domain renewal date" htmlFor="domain_renewal_date">
              <input id="domain_renewal_date" name="domain_renewal_date" type="date" className={INPUT} />
            </Field>
            <div className="rounded-2xl border border-violet-400/20 bg-violet-500/10 p-4">
              <h3 className="text-sm font-semibold tracking-tight text-white">
                Domain Management & Ownership Policy
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                Existing domains can stay with the client&apos;s registrar. If DOS purchases or
                manages a domain, DOS may continue managing the domain while active hosting,
                support, subscription or maintenance services remain active.
              </p>
              <Link
                href="/domain-management-policy"
                className="mt-3 inline-flex text-xs font-medium text-violet-200 hover:text-violet-100"
              >
                Read the full domain policy
              </Link>
            </div>
          </div>

          <div className="glass-strong rounded-2xl p-6 sm:p-8 space-y-5">
            <h2 className="text-xl font-semibold tracking-tight text-white">Hosting / maintenance</h2>
            <p className="text-sm text-ink-muted -mt-2">
              This helps DOS plan managed hosting, renewals, deployment and infrastructure support.
            </p>
            <div className="grid sm:grid-cols-2 gap-4">
              <Field label="Preferred hosting / maintenance plan" htmlFor="hosting_maintenance_plan">
                <select id="hosting_maintenance_plan" name="hosting_maintenance_plan" className={INPUT}>
                  <option value="">Select...</option>
                  <option value="DOS managed annual hosting">DOS managed annual hosting</option>
                  <option value="DOS monthly maintenance">DOS monthly maintenance</option>
                  <option value="Client managed hosting">Client managed hosting</option>
                  <option value="Discuss with DOS">Discuss with DOS</option>
                </select>
              </Field>
              <Field label="Email provider" htmlFor="email_provider">
                <input id="email_provider" name="email_provider" className={INPUT} placeholder="Google Workspace, Neo Email..." />
              </Field>
            </div>
            <Field label="Hosting / maintenance notes" htmlFor="hosting_maintenance_notes">
              <textarea id="hosting_maintenance_notes" name="hosting_maintenance_notes" rows={3} className={TEXTAREA} />
            </Field>
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
              <h3 className="text-sm font-semibold tracking-tight text-white">Rebuild client summary</h3>
              <ul className="mt-3 grid gap-2 text-sm leading-relaxed text-ink-muted">
                {DOMAIN_POLICY_SUMMARY.map((item) => (
                  <li key={item} className="flex gap-2">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-violet-300" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-3 text-sm leading-relaxed text-ink-muted">
                Annual hosting or maintenance plans may include domain renewal costs unless
                otherwise stated. Reasonable technical administration fees may apply for:
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {TECH_ADMIN_FEES.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[11px] font-medium text-ink-muted"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="glass-strong rounded-2xl p-6 sm:p-8 space-y-5">
            <h2 className="text-xl font-semibold tracking-tight text-white">Branding / content</h2>
            <Field label="Logo link" htmlFor="logo_link">
              <input id="logo_link" name="logo_link" type="url" placeholder="https://" className={INPUT} />
            </Field>
            <Field label="Photos link" htmlFor="photos_link">
              <input id="photos_link" name="photos_link" type="url" placeholder="Drive, Dropbox…" className={INPUT} />
            </Field>
            <Field label="Brand colours" htmlFor="brand_colours">
              <input id="brand_colours" name="brand_colours" className={INPUT} placeholder="#hex or descriptions" />
            </Field>
            <Field label="Services" htmlFor="content_services">
              <textarea id="content_services" name="content_services" rows={4} className={TEXTAREA} />
            </Field>
            <Field label="About business" htmlFor="about_business">
              <textarea id="about_business" name="about_business" rows={4} className={TEXTAREA} />
            </Field>
            <Field label="Opening hours" htmlFor="opening_hours">
              <textarea id="opening_hours" name="opening_hours" rows={3} className={TEXTAREA} />
            </Field>
            <Field label="Service areas" htmlFor="service_areas">
              <textarea id="service_areas" name="service_areas" rows={3} className={TEXTAREA} />
            </Field>
            <Field label="Social links" htmlFor="social_links">
              <textarea id="social_links" name="social_links" rows={3} className={TEXTAREA} />
            </Field>
            <Field label="Google reviews link" htmlFor="google_reviews_link">
              <input id="google_reviews_link" name="google_reviews_link" type="url" className={INPUT} />
            </Field>
            <Field label="FAQs" htmlFor="faqs">
              <textarea id="faqs" name="faqs" rows={4} className={TEXTAREA} />
            </Field>
          </div>

          <div className="glass-strong rounded-2xl p-6 sm:p-8 space-y-5">
            <h2 className="text-xl font-semibold tracking-tight text-white">Lead capture</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <Field label="Preferred enquiry email" htmlFor="preferred_enquiry_email">
                <input id="preferred_enquiry_email" name="preferred_enquiry_email" type="email" className={INPUT} />
              </Field>
              <Field label="Phone number" htmlFor="phone_number">
                <input id="phone_number" name="phone_number" type="tel" className={INPUT} />
              </Field>
            </div>
            <Field label="Booking link" htmlFor="booking_link">
              <input id="booking_link" name="booking_link" type="url" className={INPUT} />
            </Field>
            <Field label="WhatsApp number" htmlFor="whatsapp_number">
              <input id="whatsapp_number" name="whatsapp_number" type="tel" className={INPUT} />
            </Field>
            <Field label="Preferred CTA" htmlFor="preferred_cta">
              <select id="preferred_cta" name="preferred_cta" className={INPUT}>
                <option value="">Select…</option>
                <option value="Call Now">Call Now</option>
                <option value="Book Now">Book Now</option>
                <option value="Get Quote">Get Quote</option>
                <option value="Send Enquiry">Send Enquiry</option>
              </select>
            </Field>
          </div>

          <div className="glass-strong rounded-2xl p-6 sm:p-8 space-y-5">
            <h2 className="text-xl font-semibold tracking-tight text-white">Approval</h2>
            <label className={CHECK_WRAP}>
              <input type="checkbox" name="confirm_information_correct" value="Yes" required className="mt-1 accent-violet-500" />
              <span className="text-sm text-white/90">I confirm the information is correct.</span>
            </label>
            <label className={CHECK_WRAP}>
              <input type="checkbox" name="confirm_authorise_access" value="Yes" required className="mt-1 accent-violet-500" />
              <span className="text-sm text-white/90">I authorise DOS to access website, domain and hosting accounts.</span>
            </label>
            <label className={CHECK_WRAP}>
              <input type="checkbox" name="confirm_dns_timing" value="Yes" required className="mt-1 accent-violet-500" />
              <span className="text-sm text-white/90">I understand DNS changes may take time.</span>
            </label>
            <label className={CHECK_WRAP}>
              <input type="checkbox" name="confirm_domain_infrastructure_management" value="Yes" required className="mt-1 accent-violet-500" />
              <span className="text-sm text-white/90">
                I understand DOS may manage domains, DNS, hosting, and related infrastructure as
                part of the service.
              </span>
            </label>
            <label className={CHECK_WRAP}>
              <input type="checkbox" name="confirm_launch_payment" value="Yes" required className="mt-1 accent-violet-500" />
              <span className="text-sm text-white/90">I understand launch happens after approval / final payment.</span>
            </label>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pt-2">
            <Link
              href="/onboarding"
              className="btn-ghost inline-flex items-center justify-center px-5 py-3 rounded-xl text-sm font-medium text-white text-center order-2 sm:order-1"
            >
              Main DOS onboarding
            </Link>
            <button
              type="submit"
              className="btn-neon px-8 py-3.5 rounded-xl text-sm font-semibold text-white cursor-pointer order-1 sm:order-2"
            >
              Submit Website Onboarding
            </button>
          </div>
        </form>

        {/* Help + contact (below form) */}
        <section className="mt-14 relative overflow-hidden rounded-3xl glass-strong p-6 sm:p-10 ring-glow-soft">
          <div
            aria-hidden
            className="pointer-events-none absolute -top-24 right-0 h-64 w-64 rounded-full bg-violet-500/15 blur-[100px]"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -bottom-16 -left-16 h-56 w-56 rounded-full bg-cyan-400/10 blur-[90px]"
          />
          <div className="relative space-y-8">
            <div className="text-center max-w-xl mx-auto">
              <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-white">
                Need Help Completing The Form?
              </h2>
              <p className="mt-3 text-sm sm:text-base text-ink-muted leading-relaxed">
                Contact DOS directly or speak with Micah AI Receptionist for assistance with your onboarding.
              </p>
            </div>

            <MicahCosChatWidget />

            <div className="grid sm:grid-cols-2 gap-4">
              <a
                href={JAYSON_PHONE_LINK}
                className="group flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-4 transition hover:border-violet-400/35 hover:bg-white/[0.06]"
              >
                <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-violet-500/20 text-violet-200 ring-1 ring-violet-400/30">
                  <Phone className="h-5 w-5" aria-hidden />
                </span>
                <div>
                  <div className="text-[11px] font-mono uppercase tracking-widest text-ink-dim">Call Jayson</div>
                  <div className="text-lg font-semibold text-white tabular-nums">{JAYSON_PHONE_DISPLAY}</div>
                </div>
              </a>
              <a
                href={MICAH_PHONE_LINK}
                className="group flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-4 transition hover:border-fuchsia-400/35 hover:bg-white/[0.06]"
              >
                <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-fuchsia-500/15 text-fuchsia-200 ring-1 ring-fuchsia-400/25">
                  <Phone className="h-5 w-5" aria-hidden />
                </span>
                <div>
                  <div className="text-[11px] font-mono uppercase tracking-widest text-ink-dim">
                    Call Micah AI Receptionist
                  </div>
                  <div className="text-lg font-semibold text-white tabular-nums">{MICAH_PHONE_DISPLAY}</div>
                </div>
              </a>
            </div>

            <div className="flex justify-center pt-2">
              <a
                href={DOS_SITE}
                className="btn-neon inline-flex items-center justify-center px-8 py-3.5 rounded-xl text-sm font-semibold text-white"
              >
                Back to DOS Website
              </a>
            </div>
          </div>
        </section>
      </section>
    </main>
  );
}
