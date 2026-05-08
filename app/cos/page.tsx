import type { Metadata } from "next";
import { MessageSquare, Mail, Smartphone, Bot, Users, Sparkles } from "lucide-react";
import ProductPage, { ProductIllustration } from "../components/ProductPage";

export const metadata: Metadata = {
  title: "COS · AI Communication System",
  description:
    "COS is the Communication Operating System — one AI inbox for SMS, email and web chat. Auto-replies, follow-ups, and full conversation context.",
};

export default function Page() {
  return (
    <ProductPage
      productCode="03"
      productName="COS Communication"
      tone="cyan"
      tagline={
        <>
          One AI inbox for{" "}
          <span className="text-gradient-neon">every conversation.</span>
        </>
      }
      description="COS is your Communication Operating System. SMS, email and web chat in one inbox — with AI auto-replies, follow-up sequences, and full context across every channel. Built to work with Micah and BOS."
      bullets={[
        "Unified SMS, email and web chat",
        "AI-drafted replies in your tone",
        "Smart follow-up sequences",
        "Tap-to-handover to humans",
        "DNC + opt-in compliant",
        "Pre-built lead capture flows",
      ]}
      features={[
        {
          icon: <Smartphone className="h-5 w-5" />,
          title: "SMS that doesn't get missed",
          description:
            "Two-way SMS on a real Australian number with full opt-in/opt-out compliance and threaded conversations.",
        },
        {
          icon: <Mail className="h-5 w-5" />,
          title: "Email — sorted",
          description:
            "AI triages your inbox, drafts replies, and handles routine enquiries automatically — you review, send, done.",
        },
        {
          icon: <MessageSquare className="h-5 w-5" />,
          title: "Web chat widget",
          description:
            "A clean chat widget on your website that captures leads, books jobs, and answers FAQs — 24/7.",
        },
        {
          icon: <Bot className="h-5 w-5" />,
          title: "Smart follow-ups",
          description:
            "Pre-built sequences: missed call SMS, quote follow-up, post-job review, dormant lead reactivation.",
        },
        {
          icon: <Users className="h-5 w-5" />,
          title: "Team collaboration",
          description:
            "Internal notes, assignments, mentions and shared inbox — built for small teams that need to move fast.",
        },
        {
          icon: <Sparkles className="h-5 w-5" />,
          title: "Wired into Micah + BOS",
          description:
            "Micah's calls land in COS. BOS bookings trigger COS confirmations. One unified customer thread.",
        },
      ]}
      faqs={[
        {
          q: "Will COS replace my current inbox?",
          a: "It can. Most customers forward existing email to COS so they keep their address but get AI triage and unified threading.",
        },
        {
          q: "Is the SMS number compliant?",
          a: "Yes. We provision dedicated Australian numbers with opt-in tracking, DNC support and message footers as required. See our Number Policy.",
        },
        {
          q: "How smart is the AI?",
          a: "Smart enough to handle 60–80% of routine conversations on its own, and clever enough to know when to hand over to a human.",
        },
        {
          q: "Can my team reply manually?",
          a: "Always. AI drafts a suggested reply, your team can send, edit, or take over the thread — all in one place.",
        },
      ]}
      illustration={
        <ProductIllustration tone="cyan">
          <div className="flex items-center justify-between border-b border-white/5 px-4 py-3">
            <div className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4 text-cyan-300" />
              <span className="text-sm font-semibold">COS Inbox</span>
            </div>
            <span className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-2 py-0.5 text-[10px] font-medium text-emerald-300">
              4 unread
            </span>
          </div>
          <ul className="divide-y divide-white/5">
            {[
              { from: "Jess R.", channel: "SMS", preview: "Can I move my 2pm to Friday?", time: "2m", unread: true },
              { from: "info@yourbiz", channel: "Email", preview: "Quote request for kitchen reno", time: "11m", unread: true },
              { from: "Web chat", channel: "Chat", preview: "Do you cover the Gold Coast?", time: "27m", unread: true },
              { from: "Mike T.", channel: "SMS", preview: "Got it, thanks!", time: "1h", unread: false },
              { from: "Sarah W.", channel: "SMS", preview: "Confirmed for tomorrow 9:30am.", time: "2h", unread: false },
              { from: "Lana K.", channel: "Email", preview: "Re: Service quote — accepted", time: "3h", unread: true },
            ].map((m, i) => (
              <li key={i} className="flex items-center gap-3 px-4 py-3">
                <span
                  className={`shrink-0 inline-flex items-center rounded-md border px-1.5 py-0.5 text-[10px] font-semibold tracking-wider uppercase ${
                    m.channel === "SMS"
                      ? "text-cyan-300 bg-cyan-400/10 border-cyan-400/20"
                      : m.channel === "Email"
                        ? "text-violet-300 bg-violet-400/10 border-violet-400/20"
                        : "text-emerald-300 bg-emerald-400/10 border-emerald-400/20"
                  }`}
                >
                  {m.channel}
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <span className={`truncate text-sm ${m.unread ? "font-semibold" : "font-medium"}`}>
                      {m.from}
                    </span>
                    <span className="text-[10px] font-mono uppercase tracking-widest text-ink-dim">
                      {m.time}
                    </span>
                  </div>
                  <p className="truncate text-xs text-ink-muted">{m.preview}</p>
                </div>
                {m.unread && (
                  <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_2px_rgba(34,211,238,0.7)]" />
                )}
              </li>
            ))}
          </ul>
        </ProductIllustration>
      }
    />
  );
}
