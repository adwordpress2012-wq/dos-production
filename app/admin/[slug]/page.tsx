import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Construction } from "lucide-react";
import { notFound } from "next/navigation";

import { ADMIN_SIDEBAR_NAV } from "@/app/admin/admin-nav";

const RESERVED = new Set(["leads", "clients"]);

function sectionMeta(): Record<string, string> {
  const map: Record<string, string> = {};
  for (const item of ADMIN_SIDEBAR_NAV) {
    if (!item.href.startsWith("/admin/")) continue;
    const slug = item.href.slice("/admin/".length);
    if (!slug || RESERVED.has(slug)) continue;
    map[slug] = item.label;
  }
  return map;
}

const SLUG_TITLE = sectionMeta();

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const title = SLUG_TITLE[slug];
  if (!title) return { title: "Not found" };
  return { title: `${title} · Command Centre` };
}

export default async function AdminPlaceholderModulePage({ params }: Props) {
  const { slug } = await params;
  const title = SLUG_TITLE[slug];
  if (!title) notFound();

  return (
    <main className="relative px-4 sm:px-6 py-8 sm:py-10 pb-16">
      <section className="mx-auto max-w-3xl">
        <Link
          href="/admin"
          className="inline-flex items-center gap-2 text-sm text-ink-muted hover:text-white transition mb-8"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Overview
        </Link>

        <div className="glass-strong rounded-2xl p-8 sm:p-10 ring-glow-soft border border-violet-400/15">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-violet-500/15 border border-violet-400/25 text-violet-200 mb-6">
            <Construction className="h-6 w-6" aria-hidden />
          </div>
          <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-white">{title}</h1>
          <p className="mt-3 text-ink-muted leading-relaxed">
            This Command Centre module is on the roadmap. Data and workflows will land here in a future
            release — navigation is wired so the sidebar stays consistent across DOS admin.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/admin/leads"
              className="inline-flex items-center justify-center rounded-xl border border-white/15 bg-white/[0.05] px-5 py-2.5 text-sm font-semibold text-white hover:border-violet-400/40 hover:bg-violet-500/10 transition"
            >
              Open Leads CRM
            </Link>
            <Link href="/admin" className="btn-ghost inline-flex items-center justify-center px-5 py-2.5 rounded-xl text-sm font-medium">
              Overview
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
