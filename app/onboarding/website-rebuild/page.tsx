import type { Metadata } from "next";
import type { ReactNode } from "react";
import { headers } from "next/headers";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Website onboarding",
  description:
    "Submit your website rebuild, new build, hosting migration, and domain details — Directive Operating Systems.",
};

const INPUT =
  "w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-sm text-white placeholder:text-ink-dim outline-none focus:border-violet-400/50 focus:bg-white/[0.07] transition";
const TEXTAREA = `${INPUT} resize-y min-h-[100px]`;
const LABEL = "text-xs font-medium uppercase tracking-widest text-ink-muted";
const CHECK_WRAP =
  "flex items-start gap-3 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 hover:bg-white/[0.05] transition cursor-pointer";

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
  const thanksUrl = `${origin}/onboarding/website-rebuild/thanks`;

  return (
    <main className="relative pt-28 sm:pt-36 pb-16">
      <section className="mx-auto max-w-3xl px-6">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="inline-flex items-center gap-2 rounded-full border border-violet-400/25 bg-violet-500/10 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.2em] text-violet-200">
            <span className="h-1.5 w-1.5 rounded-full bg-violet-300 shadow-[0_0_10px_2px_rgba(139,92,246,0.6)]" />
            Website onboarding
          </span>
          <h1 className="mt-5 text-3xl sm:text-4xl font-semibold tracking-tight leading-[1.08]">
            Tell us about your <span className="text-gradient-purple">website project</span>
          </h1>
          <p className="mt-4 text-base sm:text-lg text-ink-muted leading-relaxed">
            Rebuilds, new builds, hosting moves, DNS and branding — one form. Separate from the main
            DOS product onboarding.
          </p>
          <p className="mt-3 text-sm text-ink-dim">
            Prefer the full DOS stack (Micah, COS, BOS)? Use{" "}
            <Link href="/onboarding" className="text-violet-300 hover:text-violet-200 underline underline-offset-2">
              general onboarding
            </Link>
            .
          </p>
        </div>

        <form
          action="https://formspree.io/f/xjglwzqw"
          method="POST"
          encType="multipart/form-data"
          className="space-y-8"
        >
          <input type="hidden" name="_next" value={thanksUrl} />
          <input type="hidden" name="_subject" value="DOS Website / Hosting Onboarding" />
          <input
            type="text"
            name="_gotcha"
            tabIndex={-1}
            autoComplete="off"
            className="absolute left-[-5000px]"
            aria-hidden
          />

          {/* 1. Business Details */}
          <div className="glass-strong rounded-2xl p-6 sm:p-8 space-y-5">
            <h2 className="text-xl font-semibold tracking-tight text-white">1. Business details</h2>
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
              <input
                id="current_website_url"
                name="current_website_url"
                type="url"
                placeholder="https://"
                className={INPUT}
              />
            </Field>
            <Field label="Business address" htmlFor="business_address">
              <textarea id="business_address" name="business_address" rows={3} className={TEXTAREA} />
            </Field>
          </div>

          {/* 2. Project Type */}
          <div className="glass-strong rounded-2xl p-6 sm:p-8 space-y-5">
            <h2 className="text-xl font-semibold tracking-tight text-white">2. Project type</h2>
            <p className="text-sm text-ink-muted -mt-2">Select everything that applies.</p>
            <div className="grid sm:grid-cols-2 gap-3">
              <label className={CHECK_WRAP}>
                <input type="checkbox" name="project_website_rebuild" value="Yes" className="mt-1 accent-violet-500" />
                <span className="text-sm text-white/90">Website rebuild</span>
              </label>
              <label className={CHECK_WRAP}>
                <input type="checkbox" name="project_new_build" value="Yes" className="mt-1 accent-violet-500" />
                <span className="text-sm text-white/90">New website build</span>
              </label>
              <label className={CHECK_WRAP}>
                <input type="checkbox" name="project_hosting_migration" value="Yes" className="mt-1 accent-violet-500" />
                <span className="text-sm text-white/90">Hosting migration</span>
              </label>
              <label className={CHECK_WRAP}>
                <input type="checkbox" name="project_domain_dns" value="Yes" className="mt-1 accent-violet-500" />
                <span className="text-sm text-white/90">Domain / DNS setup</span>
              </label>
              <label className={CHECK_WRAP}>
                <input type="checkbox" name="project_micah_addon" value="Yes" className="mt-1 accent-violet-500" />
                <span className="text-sm text-white/90">Micah AI Receptionist add-on</span>
              </label>
              <label className={CHECK_WRAP}>
                <input type="checkbox" name="project_ongoing_support" value="Yes" className="mt-1 accent-violet-500" />
                <span className="text-sm text-white/90">Ongoing support</span>
              </label>
            </div>
          </div>

          {/* 3. Current Website Access */}
          <div className="glass-strong rounded-2xl p-6 sm:p-8 space-y-5">
            <h2 className="text-xl font-semibold tracking-tight text-white">3. Current website access</h2>
            <Field label="Website platform" htmlFor="website_platform">
              <input id="website_platform" name="website_platform" className={INPUT} placeholder="WordPress, Wix, etc." />
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
              <input
                id="cms_password"
                name="cms_password"
                type="password"
                className={INPUT}
                autoComplete="new-password"
              />
            </Field>
            <Field label="Current hosting provider" htmlFor="hosting_provider">
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
              <input
                id="hosting_password"
                name="hosting_password"
                type="password"
                className={INPUT}
                autoComplete="new-password"
              />
            </Field>
            <Field label="Notes" htmlFor="website_access_notes">
              <textarea id="website_access_notes" name="website_access_notes" rows={3} className={TEXTAREA} />
            </Field>
          </div>

          {/* 4. Domain / DNS */}
          <div className="glass-strong rounded-2xl p-6 sm:p-8 space-y-5">
            <h2 className="text-xl font-semibold tracking-tight text-white">4. Domain / DNS access</h2>
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
              <input
                id="registrar_password"
                name="registrar_password"
                type="password"
                className={INPUT}
                autoComplete="new-password"
              />
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
          </div>

          {/* 5. Branding */}
          <div className="glass-strong rounded-2xl p-6 sm:p-8 space-y-5">
            <h2 className="text-xl font-semibold tracking-tight text-white">5. Branding assets</h2>
            <Field label="Logo (file upload)" htmlFor="logo_file">
              <input id="logo_file" name="logo_file" type="file" accept="image/*,.pdf" className="text-sm text-ink-muted file:mr-3 file:rounded-lg file:border-0 file:bg-violet-500/20 file:px-3 file:py-2 file:text-sm file:text-violet-100" />
            </Field>
            <Field label="Logo (link)" htmlFor="logo_link">
              <input id="logo_link" name="logo_link" type="url" placeholder="https://" className={INPUT} />
            </Field>
            <Field label="Photos (file upload)" htmlFor="photos_file">
              <input
                id="photos_file"
                name="photos_file"
                type="file"
                accept="image/*"
                multiple
                className="text-sm text-ink-muted file:mr-3 file:rounded-lg file:border-0 file:bg-violet-500/20 file:px-3 file:py-2 file:text-sm file:text-violet-100"
              />
            </Field>
            <Field label="Photos (link — Dropbox, Drive, etc.)" htmlFor="photos_link">
              <input id="photos_link" name="photos_link" type="url" className={INPUT} />
            </Field>
            <Field label="Brand colours" htmlFor="brand_colours">
              <input id="brand_colours" name="brand_colours" className={INPUT} placeholder="#hex or descriptions" />
            </Field>
            <Field label="Preferred website style" htmlFor="preferred_style">
              <textarea id="preferred_style" name="preferred_style" rows={3} className={TEXTAREA} />
            </Field>
            <Field label="Social links" htmlFor="social_links">
              <textarea id="social_links" name="social_links" rows={3} className={TEXTAREA} />
            </Field>
            <Field label="Google reviews link" htmlFor="google_reviews_link">
              <input id="google_reviews_link" name="google_reviews_link" type="url" className={INPUT} />
            </Field>
          </div>

          {/* 6. Website Content */}
          <div className="glass-strong rounded-2xl p-6 sm:p-8 space-y-5">
            <h2 className="text-xl font-semibold tracking-tight text-white">6. Website content</h2>
            <Field label="Services" htmlFor="content_services">
              <textarea id="content_services" name="content_services" rows={4} className={TEXTAREA} />
            </Field>
            <Field label="About the business" htmlFor="content_about">
              <textarea id="content_about" name="content_about" rows={4} className={TEXTAREA} />
            </Field>
            <Field label="Opening hours" htmlFor="opening_hours">
              <textarea id="opening_hours" name="opening_hours" rows={3} className={TEXTAREA} />
            </Field>
            <Field label="Service areas" htmlFor="service_areas">
              <textarea id="service_areas" name="service_areas" rows={3} className={TEXTAREA} />
            </Field>
            <Field label="Testimonials" htmlFor="testimonials">
              <textarea id="testimonials" name="testimonials" rows={4} className={TEXTAREA} />
            </Field>
            <Field label="FAQs" htmlFor="faqs">
              <textarea id="faqs" name="faqs" rows={4} className={TEXTAREA} />
            </Field>
            <Field label="Pages needed" htmlFor="pages_needed">
              <textarea id="pages_needed" name="pages_needed" rows={3} className={TEXTAREA} />
            </Field>
          </div>

          {/* 7. Lead capture */}
          <div className="glass-strong rounded-2xl p-6 sm:p-8 space-y-5">
            <h2 className="text-xl font-semibold tracking-tight text-white">7. Lead capture / booking</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <Field label="Enquiry email" htmlFor="lead_enquiry_email">
                <input id="lead_enquiry_email" name="lead_enquiry_email" type="email" className={INPUT} />
              </Field>
              <Field label="Phone number" htmlFor="lead_phone">
                <input id="lead_phone" name="lead_phone" type="tel" className={INPUT} />
              </Field>
            </div>
            <Field label="Booking link" htmlFor="booking_link">
              <input id="booking_link" name="booking_link" type="url" className={INPUT} />
            </Field>
            <Field label="WhatsApp number" htmlFor="whatsapp_number">
              <input id="whatsapp_number" name="whatsapp_number" type="tel" className={INPUT} />
            </Field>
            <Field label="CTA preference" htmlFor="cta_preference">
              <textarea
                id="cta_preference"
                name="cta_preference"
                rows={2}
                className={TEXTAREA}
                placeholder="e.g. Call now, Book online, Get a quote"
              />
            </Field>
          </div>

          {/* 8. Micah add-on */}
          <div className="glass-strong rounded-2xl p-6 sm:p-8 space-y-5">
            <h2 className="text-xl font-semibold tracking-tight text-white">8. Optional Micah add-on</h2>
            <Field label="Do you want Micah added?" htmlFor="micah_wanted">
              <select id="micah_wanted" name="micah_wanted" className={INPUT}>
                <option value="">Select…</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
                <option value="Maybe">Maybe later</option>
              </select>
            </Field>
            <Field label="What should Micah help with?" htmlFor="micah_help_with">
              <textarea id="micah_help_with" name="micah_help_with" rows={3} className={TEXTAREA} />
            </Field>
            <Field label="Common customer questions" htmlFor="micah_common_questions">
              <textarea id="micah_common_questions" name="micah_common_questions" rows={4} className={TEXTAREA} />
            </Field>
            <Field label="Notification email (for Micah / alerts)" htmlFor="micah_notification_email">
              <input id="micah_notification_email" name="micah_notification_email" type="email" className={INPUT} />
            </Field>
          </div>

          {/* 9. Approval */}
          <div className="glass-strong rounded-2xl p-6 sm:p-8 space-y-5">
            <h2 className="text-xl font-semibold tracking-tight text-white">9. Confirmations</h2>
            <label className={CHECK_WRAP}>
              <input type="checkbox" name="confirm_information_correct" value="Yes" required className="mt-1 accent-violet-500" />
              <span className="text-sm text-white/90">I confirm the information is correct.</span>
            </label>
            <label className={CHECK_WRAP}>
              <input
                type="checkbox"
                name="confirm_authorise_access"
                value="Yes"
                required
                className="mt-1 accent-violet-500"
              />
              <span className="text-sm text-white/90">I authorise DOS to access website, domain and hosting accounts as needed.</span>
            </label>
            <label className={CHECK_WRAP}>
              <input type="checkbox" name="confirm_dns_timing" value="Yes" required className="mt-1 accent-violet-500" />
              <span className="text-sm text-white/90">I understand DNS changes may take time to propagate.</span>
            </label>
            <label className={CHECK_WRAP}>
              <input type="checkbox" name="confirm_launch_payment" value="Yes" required className="mt-1 accent-violet-500" />
              <span className="text-sm text-white/90">I understand launch happens after approval and final payment.</span>
            </label>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pt-2">
            <Link
              href="/onboarding"
              className="btn-ghost inline-flex items-center justify-center px-5 py-3 rounded-xl text-sm font-medium text-white text-center"
            >
              Main DOS onboarding
            </Link>
            <button type="submit" className="btn-neon px-8 py-3.5 rounded-xl text-sm font-semibold text-white cursor-pointer">
              Submit Website Onboarding
            </button>
          </div>
        </form>
      </section>
    </main>
  );
}
