import type { Metadata } from "next";
import Link from "next/link";
import { Globe, Gauge, Search, Wrench, ShieldCheck, Zap } from "lucide-react";
import ProductPage, { ProductIllustration } from "../components/ProductPage";

export const metadata: Metadata = {
  title: "Website Rebuilds + Hosting",
  description:
    "Modern website rebuilds and managed hosting for Australian businesses. Designed, built, hosted and updated by DOS — included in your subscription.",
};

export default function Page() {
  return (
    <ProductPage
      productCode="01"
      productName="Website Rebuilds"
      tone="violet"
      tagline={
        <>
          A modern website,
          <br />
          <span className="text-gradient-purple">rebuilt and run for you.</span>
        </>
      }
      description="We rebuild your website on modern, lightning-fast infrastructure — then host it, monitor it, and update it for you as part of your DOS subscription. No staging tickets, no contractor chains, no hosting bills."
      bullets={[
        "Custom design tuned to your brand",
        "Vercel-grade hosting + global CDN",
        "Lightning fast, mobile-first, accessible",
        "Built-in SEO foundations",
        "Wired into BOS booking + COS chat",
        "Ongoing edits handled by DOS",
      ]}
      features={[
        {
          icon: <Gauge className="h-5 w-5" />,
          title: "Performance-first build",
          description:
            "Server-rendered Next.js, edge cached, image-optimised. Core Web Vitals in the green out of the box.",
        },
        {
          icon: <Globe className="h-5 w-5" />,
          title: "Global hosting included",
          description:
            "We host on Vercel with automatic scaling, free SSL, and 99.99% uptime — included in your subscription.",
        },
        {
          icon: <Search className="h-5 w-5" />,
          title: "SEO foundations",
          description:
            "Schema markup, sitemaps, OG tags, fast load times. Local-business SEO done right from launch.",
        },
        {
          icon: <Wrench className="h-5 w-5" />,
          title: "Managed updates",
          description:
            "Need a new page, an offer, a price update? Email us. Most changes are live the same day — included.",
        },
        {
          icon: <ShieldCheck className="h-5 w-5" />,
          title: "Security & monitoring",
          description:
            "Uptime monitoring, daily backups, automated security patches. We get paged before you do.",
        },
        {
          icon: <Zap className="h-5 w-5" />,
          title: "Wired into your DOS",
          description:
            "Booking, chat and lead capture all flow into BOS, COS and Command Centre — out of the box.",
        },
      ]}
      faqs={[
        {
          q: "Do I lose my domain?",
          a: (
            <>
              Existing client-owned domains can stay with your current registrar while DOS manages
              the technical DNS and hosting configuration. If DOS purchases or manages a domain for
              you, transfer requests are handled under our{" "}
              <Link href="/domain-management-policy" className="text-violet-300 hover:text-violet-200">
                Domain Management & Ownership Policy
              </Link>
              .
            </>
          ),
        },
        {
          q: "What about my existing content?",
          a: "We migrate everything that should stay, rewrite what shouldn't, and ship a site that actually converts.",
        },
        {
          q: "How long does a rebuild take?",
          a: "Most rebuilds go live in 7–14 days from kickoff. Bigger sites take longer — we'll quote upfront.",
        },
        {
          q: "Can I make changes myself?",
          a: "Yes — for content edits we offer a simple admin. For design and structural changes, we handle it for you in your subscription.",
        },
      ]}
      illustration={
        <ProductIllustration tone="violet">
          <div className="flex items-center gap-2 px-3 py-2 border-b border-white/5">
            <div className="flex gap-1.5">
              <span className="h-2 w-2 rounded-full bg-red-400/60" />
              <span className="h-2 w-2 rounded-full bg-amber-300/60" />
              <span className="h-2 w-2 rounded-full bg-emerald-400/60" />
            </div>
            <div className="ml-2 flex-1 truncate rounded-md bg-white/[0.03] border border-white/5 px-3 py-1 text-[10px] text-ink-dim font-mono">
              https://yourbusiness.com.au
            </div>
          </div>
          <div className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="h-6 w-6 rounded-md bg-gradient-to-br from-violet-500 to-cyan-400" />
                <span className="text-sm font-semibold">YourBrand</span>
              </div>
              <div className="hidden sm:flex gap-3 text-[11px] text-ink-muted">
                <span>Services</span>
                <span>About</span>
                <span>Book</span>
              </div>
            </div>
            <div className="mt-8">
              <div className="h-2 w-32 rounded bg-white/10" />
              <div className="mt-3 h-7 w-72 rounded bg-gradient-to-r from-white/30 to-white/10" />
              <div className="mt-2 h-7 w-56 rounded bg-gradient-to-r from-white/20 to-white/5" />
              <div className="mt-5 flex gap-2">
                <div className="h-7 w-28 rounded-md bg-gradient-to-r from-violet-500 to-cyan-400" />
                <div className="h-7 w-20 rounded-md bg-white/10" />
              </div>
            </div>
            <div className="mt-8 grid grid-cols-3 gap-2">
              <div className="h-16 rounded-lg bg-white/[0.04] border border-white/5" />
              <div className="h-16 rounded-lg bg-white/[0.04] border border-white/5" />
              <div className="h-16 rounded-lg bg-white/[0.04] border border-white/5" />
            </div>
          </div>
        </ProductIllustration>
      }
    />
  );
}
