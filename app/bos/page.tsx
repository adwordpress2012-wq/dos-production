import type { Metadata } from "next";
import { Calendar, Bell, CreditCard, Users, RefreshCcw, ShieldCheck } from "lucide-react";
import ProductPage, { ProductIllustration } from "../components/ProductPage";

export const metadata: Metadata = {
  title: "BOS · AI Booking System",
  description:
    "BOS is the Booking Operating System — branded online booking, smart reminders, deposits, calendar sync and waitlist management. Done for you.",
};

export default function Page() {
  return (
    <ProductPage
      productCode="04"
      productName="BOS Booking System"
      tone="emerald"
      tagline={
        <>
          <span className="text-gradient-neon">Bookings, reminders</span>
          <br />
          and waitlists — automated.
        </>
      }
      description="BOS is the Booking Operating System. Branded online booking, calendar sync, deposits, smart reminders and waitlist — built into your DOS so customers can self-book and Micah can book on their behalf."
      bullets={[
        "Branded booking page on your domain",
        "Smart SMS + email reminders",
        "Deposits and full payments via Stripe",
        "Two-way Google + Outlook sync",
        "Multi-staff routing + availability",
        "Waitlist + auto-fill cancellations",
      ]}
      features={[
        {
          icon: <Calendar className="h-5 w-5" />,
          title: "Real-time availability",
          description:
            "Customers only see slots that actually work — pulled from team calendars, business hours, and buffer rules.",
        },
        {
          icon: <Bell className="h-5 w-5" />,
          title: "Reminders that reduce no-shows",
          description:
            "Configurable SMS + email reminders 24h, 2h and at-time. Most customers see no-shows drop by 30–50%.",
        },
        {
          icon: <CreditCard className="h-5 w-5" />,
          title: "Deposits + payments",
          description:
            "Take a deposit at booking via Stripe or charge in full. Refund automatically on cancellation rules.",
        },
        {
          icon: <Users className="h-5 w-5" />,
          title: "Multi-staff routing",
          description:
            "Multiple team members, services and locations. Round-robin, preferred staff, and skill-based routing.",
        },
        {
          icon: <RefreshCcw className="h-5 w-5" />,
          title: "Waitlist + reschedule",
          description:
            "When a slot opens, BOS auto-offers it to the waitlist. Customers can reschedule themselves — without a phone call.",
        },
        {
          icon: <ShieldCheck className="h-5 w-5" />,
          title: "Cancellation policies",
          description:
            "Configure deposit retention, late-cancellation rules and rebook windows — all enforced automatically.",
        },
      ]}
      faqs={[
        {
          q: "Can BOS sync with my existing calendar?",
          a: "Yes. Two-way Google Calendar and Outlook 365 sync is included. Block off real-life events and they disappear from BOS automatically.",
        },
        {
          q: "Can Micah book directly into BOS?",
          a: "Yes — that's the magic. Micah sees live availability and confirms bookings on the call, then COS sends the confirmation.",
        },
        {
          q: "What about cancellations?",
          a: "You set the policy (full refund, deposit retained, no refund). BOS enforces it automatically and sends rebooking links.",
        },
        {
          q: "Does BOS handle deposits?",
          a: "Yes. We use Stripe for payments — see our Stripe integration. Deposits, full payments, and refunds are all automated.",
        },
      ]}
      illustration={
        <ProductIllustration tone="emerald">
          <div className="flex items-center justify-between border-b border-white/5 px-4 py-3">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-emerald-300" />
              <span className="text-sm font-semibold">Today · Tuesday</span>
            </div>
            <span className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-2 py-0.5 text-[10px] font-medium text-emerald-300">
              5 booked
            </span>
          </div>
          <ul className="grid grid-cols-1 gap-1 p-3">
            {[
              { time: "8:30", label: "Sarah W. — Service", booked: true, tone: "violet" },
              { time: "9:00", label: "Open", booked: false },
              { time: "9:30", label: "Mike T. — Quote", booked: true, tone: "cyan" },
              { time: "10:00", label: "Hold · waitlist", booked: false },
              { time: "10:30", label: "Open", booked: false },
              { time: "11:00", label: "Lana K. — Repair", booked: true, tone: "emerald" },
              { time: "11:30", label: "Open", booked: false },
              { time: "12:00", label: "Buffer", booked: false },
              { time: "12:30", label: "Jess R. — Consult", booked: true, tone: "violet" },
              { time: "13:00", label: "Riley P. — Install", booked: true, tone: "cyan" },
            ].map((s, i) => {
              const tone: Record<string, string> = {
                violet: "bg-violet-500/15 border-violet-400/30 text-violet-200",
                cyan: "bg-cyan-400/15 border-cyan-400/30 text-cyan-200",
                emerald: "bg-emerald-400/15 border-emerald-400/30 text-emerald-200",
              };
              return (
                <li
                  key={i}
                  className={`flex items-center justify-between rounded-lg px-3 py-2 text-sm border ${
                    s.booked
                      ? tone[s.tone ?? "violet"]
                      : "bg-white/[0.02] border-white/5 text-ink-dim"
                  }`}
                >
                  <span className="font-mono text-xs">{s.time}</span>
                  <span className="text-xs font-medium">{s.label}</span>
                </li>
              );
            })}
          </ul>
        </ProductIllustration>
      }
    />
  );
}
