import type { Metadata } from "next";
import { Mail, MapPin, Phone } from "lucide-react";
import { SuperMicahLeadFormButton } from "../components/SuperMicahLeadForm";

export const metadata: Metadata = {
  title: "Contact DOS",
  description:
    "Talk to DOS about the business systems, automation and managed technology your operations need next.",
};

export default function ContactPage() {
  return (
    <main className="relative pb-20 pt-32 sm:pt-40">
      <section className="site-container">
        <div className="mx-auto max-w-3xl text-center">
          <p className="eyebrow">Contact DOS</p>
          <h1 className="section-heading mt-5">Let’s Talk About Your Business</h1>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-ink-muted sm:text-lg">
            Tell us what&apos;s slowing your business down, where opportunities are being missed, or what you want to
            improve. DOS will help identify the right system and the right next step.
          </p>
          <SuperMicahLeadFormButton className="mt-8" />
        </div>

        <div className="glass-strong mx-auto mt-14 max-w-3xl rounded-3xl p-6 sm:p-8">
          <h2 className="text-2xl font-semibold tracking-tight text-white">Contact DOS directly</h2>
          <p className="mt-3 text-sm leading-relaxed text-ink-muted sm:text-base">
            Prefer to contact us directly? Use the details below and we&apos;ll get back to you.
          </p>

          <div className="mt-7 grid gap-4 sm:grid-cols-2">
            <a
              href="tel:0485071000"
              className="glass flex items-center gap-4 rounded-2xl p-4 transition hover:border-violet-400/30"
            >
              <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-violet-400/20 bg-violet-500/10 text-violet-200">
                <Phone className="h-5 w-5" aria-hidden />
              </span>
              <span>
                <span className="block text-xs uppercase tracking-widest text-ink-dim">Phone</span>
                <span className="mt-1 block font-semibold text-white">0485 071 000</span>
              </span>
            </a>

            <a
              href="mailto:hello@directiveos.com.au"
              className="glass flex items-center gap-4 rounded-2xl p-4 transition hover:border-cyan-400/30"
            >
              <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-cyan-400/20 bg-cyan-500/10 text-cyan-200">
                <Mail className="h-5 w-5" aria-hidden />
              </span>
              <span className="min-w-0">
                <span className="block text-xs uppercase tracking-widest text-ink-dim">Email</span>
                <span className="mt-1 block break-all font-semibold text-white">hello@directiveos.com.au</span>
              </span>
            </a>
          </div>

          <div className="mt-4 flex items-center gap-3 rounded-2xl border border-white/[0.07] bg-white/[0.03] p-4 text-sm text-ink-muted">
            <MapPin className="h-5 w-5 shrink-0 text-emerald-300" aria-hidden />
            <span>Serving businesses across Australia with remote onboarding.</span>
          </div>
        </div>
      </section>
    </main>
  );
}
