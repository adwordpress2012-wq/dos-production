import type { Metadata } from "next";
import { PhoneCall, Languages, Clock, Brain, FileText, Workflow } from "lucide-react";
import ProductPage from "../components/ProductPage";
import OfficialMicahProfile from "../components/OfficialMicahProfile";

export const metadata: Metadata = {
  alternates: { canonical: "/micah" },
  title: "Micah · AI Receptionist",
  description:
    "Micah is your AI receptionist. She answers every call, qualifies leads and books jobs — 24/7. Trained on your business, sounds like a real person.",
};

export default function Page() {
  return (
    <ProductPage
      productCode="02"
      productName="Micah AI Receptionist"
      tone="fuchsia"
      tagline={
        <>
          Meet <span className="text-gradient-neon">Micah</span>
          <br />
          your AI receptionist.
        </>
      }
      description="Micah picks up on the first ring, qualifies leads, books jobs and routes urgent calls — 24 hours a day, 7 days a week. She's trained on your business, sounds like a real person, and never has a sick day."
      bullets={[
        "Answers in under 2 seconds",
        "24/7 — including weekends and after hours",
        "Books directly into BOS",
        "Sends SMS follow-ups via COS",
        "Multilingual (EN, simplified Mandarin, more)",
        "Full transcripts + recordings",
      ]}
      features={[
        {
          icon: <Clock className="h-5 w-5" />,
          title: "Always answering",
          description:
            "Every call. First ring. Day or night. Stop losing jobs to voicemail or missed calls.",
        },
        {
          icon: <Brain className="h-5 w-5" />,
          title: "Trained on your business",
          description:
            "Micah knows your services, prices, suburbs, hours and team — so she sounds like she works there.",
        },
        {
          icon: <Workflow className="h-5 w-5" />,
          title: "Books and routes",
          description:
            "She books into BOS, sends confirmations via COS, and routes urgent calls to your on-call number.",
        },
        {
          icon: <Languages className="h-5 w-5" />,
          title: "Multilingual",
          description:
            "Detects the caller's language and switches automatically. Perfect for diverse customer bases.",
        },
        {
          icon: <FileText className="h-5 w-5" />,
          title: "Transcripts + recordings",
          description:
            "Every call is logged with a clean transcript and audio. Reviewable in Command Centre.",
        },
        {
          icon: <PhoneCall className="h-5 w-5" />,
          title: "Real numbers, real telephony",
          description:
            "Compliant Australian numbers, opt-in flows and full DNC handling. See our Number Policy.",
        },
      ]}
      faqs={[
        {
          q: "Can Micah forward to a human?",
          a: "Yes. You define the rules — keywords, urgency, time of day — and Micah will warm-transfer to your team or take a detailed message.",
        },
        {
          q: "Does she sound like a robot?",
          a: "No. We use the latest neural voices and conversational flow. Most callers don't realise they're talking to AI — but you can choose to disclose if you prefer.",
        },
        {
          q: "What if Micah doesn't know an answer?",
          a: "She gracefully defers — captures contact details, sends a follow-up via COS, and flags the call for human review in Command Centre.",
        },
        {
          q: "How is Micah scoped?",
          a: "Every business is different. DOS uses a Price Value Fee approach based on the workflow, complexity, usage and value delivered. Book Business Discovery for a tailored proposal.",
        },
      ]}
      illustration={
        <>
          <div>
            <div className="hidden">
              <span>9:41</span>
              <span className="inline-flex items-center gap-1 text-emerald-300">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse-glow" />
                live call · 02:48
              </span>
            </div>
            <div>
              <OfficialMicahProfile priority />
            </div>
            <div className="hidden">
              <div className="flex">
                <div className="rounded-2xl rounded-bl-sm bg-white/[0.05] border border-white/5 px-3 py-2 max-w-[80%]">
                  Hi, do you have anyone for tomorrow morning?
                </div>
              </div>
              <div className="flex justify-end">
                <div className="rounded-2xl rounded-br-sm bg-gradient-to-br from-violet-500/30 to-fuchsia-500/30 border border-violet-400/20 px-3 py-2 max-w-[80%]">
                  Sure — what&apos;s the address and what&apos;s happening on site?
                </div>
              </div>
              <div className="flex">
                <div className="rounded-2xl rounded-bl-sm bg-white/[0.05] border border-white/5 px-3 py-2 max-w-[80%]">
                  14 Park Lane. Hot water&apos;s leaking.
                </div>
              </div>
              <div className="flex justify-end">
                <div className="rounded-2xl rounded-br-sm bg-gradient-to-br from-violet-500/30 to-fuchsia-500/30 border border-violet-400/20 px-3 py-2 max-w-[80%]">
                  Booked Sam at 8:30. Confirmation sent.
                </div>
              </div>
            </div>
          </div>
        </>
      }
    />
  );
}
