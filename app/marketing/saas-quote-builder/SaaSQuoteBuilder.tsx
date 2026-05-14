"use client";

import { useEffect, useMemo, useState, type CSSProperties } from "react";
import { ADDON_BY_ID, ADDON_CATEGORIES, type PriceKind } from "./addonCatalog";
import { applyQuotePayload, decodeQuoteState, encodeQuoteState } from "./quoteStateCodec";

const PRIMARY = "#7C3AED";
const SECONDARY = "#9333EA";
const ACCENT = "#A855F7";
const ROSE = "#EC4899";
const TEAL_ACCENT = "#14B8A6";
const DARK_BG = "#050816";
const CARD_BG = "#0B1020";
const CARD_SOFT = "#111827";
const TEXT_MAIN = "#FFFFFF";
const TEXT_MUTED = "#CBD5E1";

type PlanKey = "starter" | "growth" | "scale";
type WebsiteKey = "landing" | "rebuild" | "saas-site" | "command-centre";

const PLAN_CATALOG: Record<
  PlanKey,
  {
    name: string;
    monthly: number;
    setup: number;
    voiceMinutes: number;
    chats: number;
    channels: string;
    adminAccess: string;
  }
> = {
  starter: {
    name: "Starter",
    monthly: 297,
    setup: 997,
    voiceMinutes: 100,
    chats: 500,
    channels: "SMS Only",
    adminAccess: "Basic Dash",
  },
  growth: {
    name: "Growth",
    monthly: 497,
    setup: 997,
    voiceMinutes: 300,
    chats: 2000,
    channels: "SMS + WhatsApp",
    adminAccess: "Full Reporting",
  },
  scale: {
    name: "Scale",
    monthly: 897,
    setup: 1497,
    voiceMinutes: 600,
    chats: 5000,
    channels: "Priority Multi-Channel",
    adminAccess: "Multi-Location View",
  },
};

const WEBSITE_SERVICES: Record<
  WebsiteKey,
  {
    name: string;
    buildFee: number;
    annualHosting: number;
    description: string;
  }
> = {
  landing: {
    name: "Landing Page / Sales Funnel",
    buildFee: 1500,
    annualHosting: 490,
    description:
      "Single high-converting landing page or funnel build with SEO foundations, mobile optimisation, and analytics setup.",
  },
  rebuild: {
    name: "Website Rebuild",
    buildFee: 1800,
    annualHosting: 490,
    description:
      "Modern rebuild of an existing website with performance improvements, refreshed UX, SEO foundations, and analytics setup.",
  },
  "saas-site": {
    name: "SaaS/Agency Website (Starter)",
    buildFee: 2500,
    annualHosting: 490,
    description:
      "Multi-page marketing website for a SaaS, agency, or service brand with conversion-focused structure, SEO setup, and analytics.",
  },
  "command-centre": {
    name: "DOS HUB (Client Admin)",
    buildFee: 5000,
    annualHosting: 990,
    description:
      "DOS HUB — custom client/admin portal with premium UI structure, lead and project views, and managed annual support.",
  },
};

const OVERAGES = {
  voice: {
    name: "Voice Overage",
    block: "10 mins",
    unitLabel: "blocks",
    price: 25,
  },
  chat: {
    name: "Chat Overage",
    block: "250 chats",
    unitLabel: "blocks",
    price: 45,
  },
  sms: {
    name: "WhatsApp/SMS Block",
    block: "50 msgs",
    unitLabel: "blocks",
    price: 15,
  },
};

const INCLUDED_FEATURES = [
  "Done-for-you setup and onboarding",
  "SEO foundations included",
  "Google Analytics + Search Console setup included",
  "Mobile-first responsive development",
  "Hosted infrastructure and launch support",
  "Managed implementation for solo-founder workflow",
];

function fmt(n: number) {
  return `$${n.toLocaleString("en-AU")} AUD`;
}

function fmtShort(n: number) {
  return `$${n.toLocaleString("en-AU")}`;
}

function parseOptionalMoney(value: string) {
  const parsed = Number(value);
  if (!value.trim() || Number.isNaN(parsed) || parsed < 0) return null;
  return parsed;
}

type AddonLineState = {
  on: boolean;
  qty: number;
  rename: string;
  setupO: string;
  monthlyO: string;
  annualO: string;
};

type CustomServiceLine = {
  id: string;
  name: string;
  category: string;
  description: string;
  setup: number;
  monthly: number;
  qty: number;
};

type CustomRecurringLine = {
  id: string;
  name: string;
  description: string;
  monthly: number;
  annual: number;
  qty: number;
};

type DiscountTarget = "oneoff" | "all";

function emptyAddonSelections(): Record<string, AddonLineState> {
  const o: Record<string, AddonLineState> = {};
  for (const id of Object.keys(ADDON_BY_ID)) {
    o[id] = { on: false, qty: 1, rename: "", setupO: "", monthlyO: "", annualO: "" };
  }
  return o;
}

function effectiveAxisValue(kind: PriceKind, base: number, overrideStr: string): number {
  const o = parseOptionalMoney(overrideStr);
  if (o !== null) return o;
  if (kind === "custom" || kind === "none") return 0;
  return base;
}

function formatAddonAxisLabel(kind: PriceKind, n: number): string {
  if (kind === "none") return "—";
  if (kind === "custom") return n > 0 ? fmtShort(n) : "Custom";
  if (kind === "from") return `from ${fmtShort(n)}`;
  return fmtShort(n);
}

export default function SaaSQuoteBuilder() {
  const today = useMemo(() => new Date(), []);
  const dateLabel = today.toLocaleDateString("en-AU", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  const expiryLabel = new Date(today.getTime() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString(
    "en-AU",
    {
      day: "numeric",
      month: "long",
      year: "numeric",
    }
  );

  const [clientName, setClientName] = useState("Client Business Name");
  const [contactName, setContactName] = useState("Contact Name");
  const [projectTitle, setProjectTitle] = useState("Website + SaaS Proposal");
  const [email, setEmail] = useState("client@example.com");
  const [phone, setPhone] = useState("");
  const [plan, setPlan] = useState<PlanKey>("growth");
  const [website, setWebsite] = useState<WebsiteKey>("saas-site");
  const [includeWebsite, setIncludeWebsite] = useState(true);
  const [includeHosting, setIncludeHosting] = useState(true);
  const [voiceBlocks, setVoiceBlocks] = useState(0);
  const [chatBlocks, setChatBlocks] = useState(0);
  const [smsBlocks, setSmsBlocks] = useState(0);
  const [voicePriceOverride, setVoicePriceOverride] = useState("");
  const [chatPriceOverride, setChatPriceOverride] = useState("");
  const [smsPriceOverride, setSmsPriceOverride] = useState("");
  const [discount, setDiscount] = useState(0);
  const [discountTarget, setDiscountTarget] = useState<DiscountTarget>("oneoff");
  const [addonSelections, setAddonSelections] = useState<Record<string, AddonLineState>>(emptyAddonSelections);
  const [customServices, setCustomServices] = useState<CustomServiceLine[]>([]);
  const [customRecurring, setCustomRecurring] = useState<CustomRecurringLine[]>([]);
  const [enterpriseMode, setEnterpriseMode] = useState(false);
  const [recurringNotes, setRecurringNotes] = useState("");
  const [notes, setNotes] = useState(
    "This proposal includes done-for-you setup, launch support, SEO foundations, and Google Analytics configuration. Monthly SaaS billing begins on go-live."
  );
  const [editing, setEditing] = useState(false);
  const [copied, setCopied] = useState<"" | "email" | "summary" | "link">("");

  useEffect(() => {
    const p = new URLSearchParams(window.location.search);
    const client = p.get("client");
    const contact = p.get("contact");
    const title = p.get("title");
    const planParam = p.get("plan") as PlanKey | null;
    const websiteParam = p.get("website") as WebsiteKey | null;
    const emailParam = p.get("email");
    const phoneParam = p.get("phone");
    const websiteIncluded = p.get("includeWebsite");
    const hostingIncluded = p.get("includeHosting");
    const vb = p.get("voiceBlocks");
    const cb = p.get("chatBlocks");
    const sb = p.get("smsBlocks");
    const vp = p.get("voicePriceOverride");
    const cp = p.get("chatPriceOverride");
    const sp = p.get("smsPriceOverride");
    const disc = p.get("discount");
    const discTarget = p.get("discountTarget");
    const ent = p.get("enterprise");
    const recurringNotesParam = p.get("recurringNotes");
    const notesParam = p.get("notes");

    if (client) setClientName(client);
    if (contact) setContactName(contact);
    if (title) setProjectTitle(title);
    if (emailParam) setEmail(emailParam);
    if (phoneParam) setPhone(phoneParam);
    if (planParam && PLAN_CATALOG[planParam]) setPlan(planParam);
    if (websiteParam && WEBSITE_SERVICES[websiteParam]) setWebsite(websiteParam);
    if (websiteIncluded) setIncludeWebsite(websiteIncluded === "1");
    if (hostingIncluded) setIncludeHosting(hostingIncluded === "1");
    if (vb) setVoiceBlocks(Math.max(0, Number(vb) || 0));
    if (cb) setChatBlocks(Math.max(0, Number(cb) || 0));
    if (sb) setSmsBlocks(Math.max(0, Number(sb) || 0));
    if (vp) setVoicePriceOverride(vp);
    if (cp) setChatPriceOverride(cp);
    if (sp) setSmsPriceOverride(sp);
    if (disc) setDiscount(Math.min(100, Math.max(0, Number(disc) || 0)));
    if (discTarget === "all" || discTarget === "oneoff") setDiscountTarget(discTarget);
    if (ent === "1") setEnterpriseMode(true);
    if (recurringNotesParam) setRecurringNotes(recurringNotesParam);
    if (notesParam) setNotes(notesParam);

    const qParam = p.get("q");
    if (qParam) {
      const payload = decodeQuoteState(qParam);
      if (payload) {
        const applied = applyQuotePayload(payload, emptyAddonSelections);
        setAddonSelections(applied.addonSelections as Record<string, AddonLineState>);
        setCustomServices(applied.customServices as CustomServiceLine[]);
        setCustomRecurring(applied.customRecurring as CustomRecurringLine[]);
      }
    }
  }, []);

  const activePlan = PLAN_CATALOG[plan];
  const activeWebsite = WEBSITE_SERVICES[website];
  const effectivePlanSetup = activePlan.setup;
  const effectivePlanMonthly = activePlan.monthly;
  const websiteBuildFee = includeWebsite ? activeWebsite.buildFee : 0;
  const annualHosting = includeHosting && includeWebsite ? activeWebsite.annualHosting : 0;

  const effectiveVoicePrice = parseOptionalMoney(voicePriceOverride) ?? OVERAGES.voice.price;
  const effectiveChatPrice = parseOptionalMoney(chatPriceOverride) ?? OVERAGES.chat.price;
  const effectiveSmsPrice = parseOptionalMoney(smsPriceOverride) ?? OVERAGES.sms.price;

  const overageOneOff =
    voiceBlocks * effectiveVoicePrice + chatBlocks * effectiveChatPrice + smsBlocks * effectiveSmsPrice;

  const lockedCoreOneOff = enterpriseMode ? 0 : effectivePlanSetup + websiteBuildFee;
  const lockedCoreMonthly = enterpriseMode ? 0 : effectivePlanMonthly;
  const lockedCoreAnnual = enterpriseMode ? 0 : annualHosting;
  const flexibleOverageOneOff = enterpriseMode ? 0 : overageOneOff;

  const addonTotals = useMemo(() => {
    let oneOff = 0;
    let monthly = 0;
    let annual = 0;
    const lines: { label: string; qty: number; setup: number; mo: number; yr: number }[] = [];
    for (const [id, sel] of Object.entries(addonSelections)) {
      if (!sel.on) continue;
      const item = ADDON_BY_ID[id];
      if (!item) continue;
      const qty = Math.max(1, sel.qty || 1);
      const label = sel.rename.trim() || item.name;
      const es = effectiveAxisValue(item.setupKind, item.setup, sel.setupO);
      const em = effectiveAxisValue(item.monthlyKind, item.monthly, sel.monthlyO);
      const ea = effectiveAxisValue(item.annualKind, item.annual, sel.annualO);
      oneOff += es * qty;
      monthly += em * qty;
      annual += ea * qty;
      lines.push({ label, qty, setup: es, mo: em, yr: ea });
    }
    return { oneOff, monthly, annual, lines };
  }, [addonSelections]);

  const customTotals = useMemo(() => {
    let oneOff = 0;
    let monthly = 0;
    const lines: {
      label: string;
      category: string;
      qty: number;
      setup: number;
      mo: number;
      description: string;
    }[] = [];
    for (const row of customServices) {
      const qty = Math.max(1, row.qty || 1);
      oneOff += row.setup * qty;
      monthly += row.monthly * qty;
      lines.push({
        label: row.name || "Custom service",
        category: row.category || "",
        qty,
        setup: row.setup,
        mo: row.monthly,
        description: row.description,
      });
    }
    return { oneOff, monthly, lines };
  }, [customServices]);

  const recurringTotals = useMemo(() => {
    let monthly = 0;
    let annual = 0;
    const lines: { label: string; qty: number; mo: number; yr: number; description: string }[] = [];
    for (const row of customRecurring) {
      const qty = Math.max(1, row.qty || 1);
      monthly += row.monthly * qty;
      annual += row.annual * qty;
      lines.push({
        label: row.name || "Recurring item",
        qty,
        mo: row.monthly,
        yr: row.annual,
        description: row.description,
      });
    }
    return { monthly, annual, lines };
  }, [customRecurring]);

  const flexibleOneOffSubtotal =
    lockedCoreOneOff + flexibleOverageOneOff + addonTotals.oneOff + customTotals.oneOff;
  const oneOffDiscountAmount = Math.round(flexibleOneOffSubtotal * (discount / 100));
  const totalOneOff = flexibleOneOffSubtotal - oneOffDiscountAmount;

  const monthlySubtotal =
    lockedCoreMonthly + addonTotals.monthly + customTotals.monthly + recurringTotals.monthly;
  const monthlyDiscountAmount =
    discountTarget === "all" ? Math.round(monthlySubtotal * (discount / 100)) : 0;
  const monthlyRecurring = monthlySubtotal - monthlyDiscountAmount;

  const annualSubtotal = lockedCoreAnnual + addonTotals.annual + recurringTotals.annual;
  const annualDiscountAmount =
    discountTarget === "all" ? Math.round(annualSubtotal * (discount / 100)) : 0;
  const annualRecurringDisplay = annualSubtotal - annualDiscountAmount;

  const totalDiscountAmount = oneOffDiscountAmount + monthlyDiscountAmount + annualDiscountAmount;

  const deposit = Math.round(totalOneOff * 0.5);
  const balance = totalOneOff - deposit;

  const quoteRef = `DOS-SAAS-${String(today.getTime()).slice(-6)}`;

  const shareUrl = useMemo(() => {
    const base =
      typeof window !== "undefined"
        ? `${window.location.origin}/saas/quote/builder`
        : "https://directiveos.com.au/saas/quote/builder";

    const params = new URLSearchParams({
      client: clientName,
      contact: contactName,
      title: projectTitle,
      email,
      phone,
      plan,
      website,
      includeWebsite: includeWebsite ? "1" : "0",
      includeHosting: includeHosting ? "1" : "0",
      voiceBlocks: String(voiceBlocks),
      chatBlocks: String(chatBlocks),
      smsBlocks: String(smsBlocks),
      voicePriceOverride,
      chatPriceOverride,
      smsPriceOverride,
      discount: String(discount),
      discountTarget,
      enterprise: enterpriseMode ? "1" : "0",
      recurringNotes,
      notes,
    });

    const qEncoded = encodeQuoteState(addonSelections, customServices, customRecurring);
    if (qEncoded) params.set("q", qEncoded);

    return `${base}?${params.toString()}`;
  }, [
    clientName,
    contactName,
    projectTitle,
    email,
    phone,
    plan,
    website,
    includeWebsite,
    includeHosting,
    voiceBlocks,
    chatBlocks,
    smsBlocks,
    voicePriceOverride,
    chatPriceOverride,
    smsPriceOverride,
    discount,
    discountTarget,
    enterpriseMode,
    recurringNotes,
    notes,
    addonSelections,
    customServices,
    customRecurring,
  ]);

  const shareUrlLength = shareUrl.length;
  const shareUrlWarn = shareUrlLength > 2000;

  const addonSummaryLines = addonTotals.lines
    .map(
      (L) =>
        `- ${L.label} × ${L.qty}: setup ${fmt(L.setup * L.qty)}${L.mo ? ` · ${fmt(L.mo * L.qty)}/mo` : ""}${
          L.yr ? ` · ${fmt(L.yr * L.qty)}/yr` : ""
        }`
    )
    .join("\n");

  const customSummaryLines = customTotals.lines
    .map(
      (L) =>
        `- ${L.label}${L.category ? ` [${L.category}]` : ""} × ${L.qty}${
          L.description ? ` — ${L.description}` : ""
        }: setup ${fmt(L.setup * L.qty)}${L.mo ? ` · ${fmt(L.mo * L.qty)}/mo` : ""}`
    )
    .join("\n");

  const recurringSummaryLines = recurringTotals.lines
    .map(
      (L) =>
        `- ${L.label} × ${L.qty}${L.description ? ` — ${L.description}` : ""}: ${
          L.mo ? `${fmt(L.mo * L.qty)}/mo` : ""
        }${L.mo && L.yr ? " · " : ""}${L.yr ? `${fmt(L.yr * L.qty)}/yr` : ""}`
    )
    .join("\n");

  const plainSummary = `
Directive OS — ${enterpriseMode ? "Custom Enterprise Quote" : "Website + SaaS Quote"}

Prepared for: ${clientName}
Contact: ${contactName}
Project: ${projectTitle}
Date: ${dateLabel}
Valid until: ${expiryLabel}
Reference: ${quoteRef}
Access: Internal/private direct URL only

${
  enterpriseMode
    ? `Quote mode: Custom Enterprise — standard list pricing omitted; scope built from add-ons and custom lines.`
    : ""
}

Selected SaaS Plan:
- ${activePlan.name}
${
  enterpriseMode
    ? `- Pricing: per custom agreement (not itemised here)`
    : `- Setup Fee: ${fmt(effectivePlanSetup)}
- Monthly Subscription: ${fmt(effectivePlanMonthly)} / month`
}
- Included Voice Minutes: ${activePlan.voiceMinutes}
- Included Chats: ${activePlan.chats.toLocaleString("en-AU")}
- Channels: ${activePlan.channels}
- Admin Portal: ${activePlan.adminAccess}

${
  includeWebsite
    ? `Selected Website Service:
- ${activeWebsite.name}
${
  enterpriseMode
    ? `- Build & hosting: per custom agreement`
    : `- Build Fee: ${fmt(websiteBuildFee)}
- Annual Hosting / Support: ${fmt(annualHosting)} / year`
}
- Description: ${activeWebsite.description}`
    : `Selected Website Service:
- None included in this quote`
}

${
  enterpriseMode
    ? ""
    : `Usage overage blocks (editable per quote):
- Voice (${OVERAGES.voice.block}): ${voiceBlocks} × ${fmt(effectiveVoicePrice)} = ${fmt(
        voiceBlocks * effectiveVoicePrice
      )}
- Chat (${OVERAGES.chat.block}): ${chatBlocks} × ${fmt(effectiveChatPrice)} = ${fmt(
        chatBlocks * effectiveChatPrice
      )}
- WhatsApp/SMS (${OVERAGES.sms.block}): ${smsBlocks} × ${fmt(effectiveSmsPrice)} = ${fmt(
        smsBlocks * effectiveSmsPrice
      )}
`
}

Flexible add-ons & services:
${addonSummaryLines || "- (none selected)"}

Custom services:
${customSummaryLines || "- (none)"}

Custom recurring items:
${recurringSummaryLines || "- (none)"}

Included (standard):
${INCLUDED_FEATURES.map((f) => `- ${f}`).join("\n")}

Commercial Summary — One-Off:
${
  enterpriseMode
    ? "- Locked DOS core package: per agreement"
    : `- Locked DOS core (SaaS setup): ${fmt(effectivePlanSetup)}
- Locked DOS core (website build): ${fmt(websiteBuildFee)}
- Overage blocks: ${fmt(overageOneOff)}`
}
- Flexible add-ons (one-off): ${fmt(addonTotals.oneOff)}
- Custom services (one-off): ${fmt(customTotals.oneOff)}
- Subtotal (before discount): ${fmt(flexibleOneOffSubtotal)}
- Discount (${discount}% — applies to ${discountTarget === "all" ? "all totals" : "one-off only"}): ${
    discount > 0 ? `- ${fmt(oneOffDiscountAmount)}` : fmt(0)
  }
- Total One-Off Investment: ${fmt(totalOneOff)}

Commercial Summary — Recurring:
${
  enterpriseMode
    ? "- Locked DOS core monthly: per agreement"
    : `- Locked DOS core (SaaS monthly): ${fmt(effectivePlanMonthly)} / month
- Locked DOS core (annual hosting/support): ${fmt(annualHosting)} / year`
}
- Flexible add-ons monthly: ${fmt(addonTotals.monthly)} / month
- Flexible add-ons annual: ${fmt(addonTotals.annual)} / year
- Custom services monthly: ${fmt(customTotals.monthly)} / month
- Custom recurring monthly: ${fmt(recurringTotals.monthly)} / month
- Custom recurring annual: ${fmt(recurringTotals.annual)} / year
${
  discountTarget === "all" && discount > 0
    ? `- Recurring discount (${discount}%): - ${fmt(monthlyDiscountAmount)} / month, - ${fmt(
        annualDiscountAmount
      )} / year`
    : ""
}- Total monthly recurring: ${fmt(monthlyRecurring)} / month
- Total annual recurring: ${fmt(annualRecurringDisplay)} / year

Payment Terms:
- Deposit (50%): ${fmt(deposit)}
- Balance (50%): ${fmt(balance)}
${recurringNotes.trim() ? `Recurring notes:\n${recurringNotes}` : ""}

Notes:
${notes}
`.trim();

  const emailDraft = `
Subject: Directive OS ${enterpriseMode ? "Enterprise " : ""}Proposal for ${clientName}

Hi ${contactName},

Thanks again for the opportunity.

I have prepared your Directive OS proposal for:
${projectTitle}

Summary:
- SaaS Plan: ${activePlan.name}${enterpriseMode ? " (custom enterprise)" : ""}
${
  enterpriseMode
    ? ""
    : `- SaaS Setup Fee: ${fmt(effectivePlanSetup)}
- Base Monthly Subscription: ${fmt(effectivePlanMonthly)} / month`
}
${
  includeWebsite
    ? `- Website Service: ${activeWebsite.name}${
        enterpriseMode
          ? ""
          : `
- Website Build Fee: ${fmt(websiteBuildFee)}
- Annual Hosting / Support: ${fmt(annualHosting)} / year`
      }`
    : ""
}
${enterpriseMode || overageOneOff <= 0 ? "" : `- Overage blocks (one-off): ${fmt(overageOneOff)}`}
${addonTotals.oneOff > 0 ? `- Flexible add-ons (one-off): ${fmt(addonTotals.oneOff)}` : ""}
${customTotals.oneOff > 0 ? `- Custom services (one-off): ${fmt(customTotals.oneOff)}` : ""}
${
  discount > 0
    ? `- Discount (${discount}% on ${discountTarget === "all" ? "all totals" : "one-off"}): - ${fmt(
        totalDiscountAmount
      )}`
    : ""
}

Total One-Off Investment:
${fmt(totalOneOff)}

Ongoing:
- Monthly (total): ${fmt(monthlyRecurring)} / month
${annualRecurringDisplay > 0 ? `- Annual (total): ${fmt(annualRecurringDisplay)} / year` : ""}
${recurringNotes.trim() ? `${recurringNotes}\n` : ""}

Payment Terms:
- ${fmt(deposit)} upfront to commence
- ${fmt(balance)} on completion

Quote reference:
${quoteRef}

Regards,
Jayson
Directive OS
directiveos.com.au
jayson@directiveos.com.au
02 5850 4038
`.trim();

  async function copyText(text: string, mode: "email" | "summary" | "link") {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(mode);
      setTimeout(() => setCopied(""), 1800);
    } catch {
      setCopied("");
    }
  }

  const inputStyle = (isEditing: boolean): CSSProperties => ({
    background: "transparent",
    border: "none",
    borderBottom: isEditing ? `1px dashed ${ACCENT}` : "none",
    outline: "none",
    color: "inherit",
    font: "inherit",
    width: "100%",
    cursor: isEditing ? "text" : "default",
  });

  return (
    <div
      style={{
        minHeight: "100vh",
        background: DARK_BG,
        color: TEXT_MAIN,
        fontFamily: "Inter, sans-serif",
      }}
    >
      <style>{`
        @media print {
          @page { size: A4 landscape; margin: 8mm 10mm; }
          * { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
          body { margin: 0 !important; background: ${DARK_BG} !important; }
          .no-print { display: none !important; }
          .print-shell { display: block !important; min-height: unset !important; }
          .print-panel { overflow: visible !important; max-height: none !important; padding: 0 !important; }
          .page {
            max-width: 100% !important;
            width: 100% !important;
            margin: 0 !important;
            box-shadow: none !important;
            border-radius: 0 !important;
            overflow: visible !important;
          }
          .print-section { page-break-inside: avoid; break-inside: avoid; }
          .print-page-break { page-break-before: always; break-before: always; }
        }
        input, textarea, select { background: transparent; color: inherit; font: inherit; }
        .control-row:hover { background: rgba(124,58,237,0.08); }
      `}</style>

      <div
        className="no-print"
        style={{
          padding: "16px 24px",
          borderBottom: "1px solid rgba(168,85,247,0.18)",
          display: "flex",
          flexDirection: "column",
          gap: 8,
          background: "#070b1d",
          position: "sticky",
          top: 0,
          zIndex: 100,
          boxShadow: "0 10px 40px rgba(0,0,0,0.25)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
        <div
          style={{
            display: "flex",
            gap: 8,
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          <button onClick={() => setEditing((v) => !v)} style={toolbarButton(editing)}>
            {editing ? "✓ Done" : "✏ Edit Client"}
          </button>

          <button onClick={() => copyText(emailDraft, "email")} style={toolbarButton(false)}>
            {copied === "email" ? "Copied Email" : "Copy Email Draft"}
          </button>

          <button onClick={() => copyText(plainSummary, "summary")} style={toolbarButton(false)}>
            {copied === "summary" ? "Copied Summary" : "Copy Summary"}
          </button>

          <button onClick={() => copyText(shareUrl, "link")} style={toolbarButton(false)}>
            {copied === "link" ? "Copied Link" : "Copy Share Link"}
          </button>

          <button
            onClick={() => window.print()}
            style={{
              padding: "8px 16px",
              borderRadius: 10,
              border: "none",
              background: `linear-gradient(135deg, ${PRIMARY}, ${ROSE})`,
              color: "#fff",
              fontWeight: 800,
              cursor: "pointer",
              fontSize: 12,
              boxShadow: "0 0 30px rgba(124,58,237,0.35)",
            }}
          >
            🖨 Print / Save PDF
          </button>
        </div>
        </div>
        {shareUrlWarn && (
          <div style={{ fontSize: 11, color: "#fbbf24", maxWidth: 720, lineHeight: 1.5 }}>
            Share link is long ({shareUrlLength} characters). Add-on state is gzip-compressed when that saves space; some
            email or chat apps may still truncate — shorten client notes if the link does not restore correctly.
          </div>
        )}
      </div>

      <div
        className="print-shell"
        style={{
          display: "grid",
          gridTemplateColumns: "minmax(380px, 420px) 1fr",
          minHeight: "calc(100vh - 66px)",
        }}
      >
        <div
          className="no-print"
          style={{
            borderRight: "1px solid rgba(168,85,247,0.15)",
            overflowY: "auto",
            maxHeight: "calc(100vh - 66px)",
            position: "sticky",
            top: 66,
            background: "#070b1d",
          }}
        >
          <div style={{ padding: 20 }}>
            <div style={{ fontWeight: 800, fontSize: 15, marginBottom: 4 }}>Website SaaS Quote Builder</div>
            <div style={{ fontSize: 12, color: "#94a3b8", marginBottom: 12 }}>
              Solo-dev internal quote builder for DOS proposals
            </div>
            <div
              style={{
                marginBottom: 18,
                padding: "10px 12px",
                borderRadius: 10,
                border: "1px solid rgba(168,85,247,0.22)",
                background: "rgba(124,58,237,0.08)",
                fontSize: 11,
                color: "#e9d5ff",
                lineHeight: 1.5,
              }}
            >
              Core DOS packages use standard pricing. Add-ons, usage, recurring support, and custom services can be
              adjusted per client.
            </div>

            <ControlGroup title="Quote mode">
              <ToggleRow
                checked={enterpriseMode}
                onChange={() => setEnterpriseMode((v) => !v)}
                label="Custom Enterprise Quote (hide core list pricing; build from add-ons & custom lines)"
              />
            </ControlGroup>

            <ControlGroup title="Client">
              <ControlLabel>Client business</ControlLabel>
              <TextInput value={clientName} onChange={setClientName} />

              <ControlLabel>Contact name</ControlLabel>
              <TextInput value={contactName} onChange={setContactName} />

              <ControlLabel>Project title</ControlLabel>
              <TextInput value={projectTitle} onChange={setProjectTitle} />

              <ControlLabel>Email</ControlLabel>
              <TextInput value={email} onChange={setEmail} />

              <ControlLabel>Phone</ControlLabel>
              <TextInput value={phone} onChange={setPhone} />
            </ControlGroup>

            <ControlGroup title="SaaS plan">
              {(Object.keys(PLAN_CATALOG) as PlanKey[]).map((key) => {
                const p = PLAN_CATALOG[key];
                const active = key === plan;
                return (
                  <button
                    key={key}
                    onClick={() => setPlan(key)}
                    className="control-row"
                    style={{
                      width: "100%",
                      textAlign: "left",
                      padding: "12px 14px",
                      borderRadius: 12,
                      border: `1px solid ${active ? PRIMARY : "rgba(255,255,255,0.08)"}`,
                      background: active
                        ? "linear-gradient(135deg, rgba(124,58,237,0.16), rgba(236,72,153,0.08))"
                        : CARD_BG,
                      marginBottom: 10,
                      cursor: "pointer",
                    }}
                  >
                    <div style={{ fontWeight: 800, fontSize: 13 }}>{p.name}</div>
                    <div style={{ fontSize: 11, color: TEXT_MUTED, marginTop: 4 }}>
                      {fmtShort(p.setup)} setup · {fmtShort(p.monthly)}/mo
                    </div>
                    <div style={{ fontSize: 10, color: "#94a3b8", marginTop: 4 }}>
                      {p.voiceMinutes} mins · {p.chats.toLocaleString("en-AU")} chats
                    </div>
                  </button>
                );
              })}
            </ControlGroup>

            <ControlGroup title="Website service">
              <ToggleRow
                checked={includeWebsite}
                onChange={() => setIncludeWebsite((v) => !v)}
                label="Include website build"
              />
              {(Object.keys(WEBSITE_SERVICES) as WebsiteKey[]).map((key) => {
                const w = WEBSITE_SERVICES[key];
                const active = key === website;
                return (
                  <button
                    key={key}
                    onClick={() => setWebsite(key)}
                    disabled={!includeWebsite}
                    className="control-row"
                    style={{
                      width: "100%",
                      textAlign: "left",
                      padding: "12px 14px",
                      borderRadius: 12,
                      border: `1px solid ${active ? ACCENT : "rgba(255,255,255,0.08)"}`,
                      background: active
                        ? "linear-gradient(135deg, rgba(147,51,234,0.18), rgba(168,85,247,0.08))"
                        : CARD_BG,
                      marginBottom: 10,
                      cursor: includeWebsite ? "pointer" : "not-allowed",
                      opacity: includeWebsite ? 1 : 0.45,
                    }}
                  >
                    <div style={{ fontWeight: 800, fontSize: 13 }}>{w.name}</div>
                    <div style={{ fontSize: 11, color: TEXT_MUTED, marginTop: 4 }}>
                      {fmtShort(w.buildFee)} one-off · {fmtShort(w.annualHosting)}/year
                    </div>
                  </button>
                );
              })}

              <ToggleRow
                checked={includeHosting}
                onChange={() => setIncludeHosting((v) => !v)}
                label="Include annual hosting / support"
              />
            </ControlGroup>

            {!enterpriseMode && (
              <ControlGroup title="Overage blocks (usage · editable rate)">
                <OverageRow
                  label={`Voice (${OVERAGES.voice.block})`}
                  qty={voiceBlocks}
                  setQty={setVoiceBlocks}
                  defaultPrice={OVERAGES.voice.price}
                  override={voicePriceOverride}
                  setOverride={setVoicePriceOverride}
                  effectivePrice={effectiveVoicePrice}
                />
                <OverageRow
                  label={`Chat (${OVERAGES.chat.block})`}
                  qty={chatBlocks}
                  setQty={setChatBlocks}
                  defaultPrice={OVERAGES.chat.price}
                  override={chatPriceOverride}
                  setOverride={setChatPriceOverride}
                  effectivePrice={effectiveChatPrice}
                />
                <OverageRow
                  label={`WhatsApp/SMS (${OVERAGES.sms.block})`}
                  qty={smsBlocks}
                  setQty={setSmsBlocks}
                  defaultPrice={OVERAGES.sms.price}
                  override={smsPriceOverride}
                  setOverride={setSmsPriceOverride}
                  effectivePrice={effectiveSmsPrice}
                />
                <div style={{ marginTop: 4, fontSize: 10, color: "#94a3b8" }}>
                  Block prices default to DOS list rate. Override to match a per-client agreement; leave blank to
                  use DOS standard.
                </div>
              </ControlGroup>
            )}

            <ControlGroup title="DOS add-ons">
              <div style={{ fontSize: 10, color: "#94a3b8", marginBottom: 10 }}>
                Toggle items on, set quantity, rename, or override setup / monthly / annual. Blank overrides use the
                catalogue default (or enter a custom price for “Custom” lines).
              </div>
              {ADDON_CATEGORIES.map((cat) => (
                <div key={cat.title} style={{ marginBottom: 16 }}>
                  <div style={{ fontSize: 11, fontWeight: 700, color: "#e9d5ff", marginBottom: 8 }}>{cat.title}</div>
                  {cat.items.map((item) => {
                    const sel = addonSelections[item.id] ?? {
                      on: false,
                      qty: 1,
                      rename: "",
                      setupO: "",
                      monthlyO: "",
                      annualO: "",
                    };
                    return (
                      <div
                        key={item.id}
                        style={{
                          marginBottom: 10,
                          padding: 10,
                          borderRadius: 10,
                          border: `1px solid ${sel.on ? "rgba(168,85,247,0.35)" : "rgba(255,255,255,0.08)"}`,
                          background: sel.on ? "rgba(124,58,237,0.06)" : CARD_BG,
                        }}
                      >
                        <ToggleRow
                          checked={sel.on}
                          onChange={() =>
                            setAddonSelections((prev) => ({
                              ...prev,
                              [item.id]: { ...sel, on: !sel.on },
                            }))
                          }
                          label={item.name}
                        />
                        {item.hint && (
                          <div style={{ fontSize: 10, color: "#94a3b8", margin: "-4px 0 8px 28px" }}>{item.hint}</div>
                        )}
                        {sel.on && (
                          <div style={{ display: "grid", gap: 8, marginTop: 8, marginLeft: 4 }}>
                            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                              <div>
                                <ControlLabel>Qty</ControlLabel>
                                <input
                                  type="number"
                                  min={1}
                                  value={sel.qty}
                                  onChange={(e) =>
                                    setAddonSelections((prev) => ({
                                      ...prev,
                                      [item.id]: {
                                        ...sel,
                                        qty: Math.max(1, Number(e.target.value) || 1),
                                      },
                                    }))
                                  }
                                  style={numberInputStyle()}
                                />
                              </div>
                              <div>
                                <ControlLabel>Rename (optional)</ControlLabel>
                                <input
                                  type="text"
                                  value={sel.rename}
                                  placeholder={item.name}
                                  onChange={(e) =>
                                    setAddonSelections((prev) => ({
                                      ...prev,
                                      [item.id]: { ...sel, rename: e.target.value },
                                    }))
                                  }
                                  style={numberInputStyle()}
                                />
                              </div>
                            </div>
                            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 6 }}>
                              <div>
                                <ControlLabel>Setup ({formatAddonAxisLabel(item.setupKind, item.setup)})</ControlLabel>
                                <input
                                  type="number"
                                  min={0}
                                  placeholder={String(item.setup)}
                                  value={sel.setupO}
                                  onChange={(e) =>
                                    setAddonSelections((prev) => ({
                                      ...prev,
                                      [item.id]: { ...sel, setupO: e.target.value },
                                    }))
                                  }
                                  style={numberInputStyle()}
                                />
                              </div>
                              <div>
                                <ControlLabel>Monthly ({formatAddonAxisLabel(item.monthlyKind, item.monthly)})</ControlLabel>
                                <input
                                  type="number"
                                  min={0}
                                  placeholder={String(item.monthly)}
                                  value={sel.monthlyO}
                                  onChange={(e) =>
                                    setAddonSelections((prev) => ({
                                      ...prev,
                                      [item.id]: { ...sel, monthlyO: e.target.value },
                                    }))
                                  }
                                  style={numberInputStyle()}
                                />
                              </div>
                              <div>
                                <ControlLabel>Annual ({formatAddonAxisLabel(item.annualKind, item.annual)})</ControlLabel>
                                <input
                                  type="number"
                                  min={0}
                                  placeholder={String(item.annual)}
                                  value={sel.annualO}
                                  onChange={(e) =>
                                    setAddonSelections((prev) => ({
                                      ...prev,
                                      [item.id]: { ...sel, annualO: e.target.value },
                                    }))
                                  }
                                  style={numberInputStyle()}
                                />
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              ))}
            </ControlGroup>

            <ControlGroup title="Custom add-ons / services">
              <div style={{ fontSize: 10, color: "#94a3b8", marginBottom: 10 }}>
                Add bespoke client services here — setup fee, recurring monthly fee, quantity. This is where DOS can
                increase, decrease, or customise pricing per client.
              </div>
              <button
                type="button"
                onClick={() =>
                  setCustomServices((prev) => [
                    ...prev,
                    {
                      id: `custom-${Date.now()}`,
                      name: "Custom service",
                      category: "",
                      description: "",
                      setup: 0,
                      monthly: 0,
                      qty: 1,
                    },
                  ])
                }
                style={{
                  ...toolbarButton(false),
                  width: "100%",
                  marginBottom: 12,
                  padding: "10px 12px",
                }}
              >
                + Add Custom Service
              </button>
              {customServices.map((row, idx) => (
                <div
                  key={row.id}
                  style={{
                    marginBottom: 12,
                    padding: 10,
                    borderRadius: 10,
                    border: "1px solid rgba(255,255,255,0.1)",
                    background: CARD_BG,
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                    <span style={{ fontSize: 11, fontWeight: 700, color: "#cbd5e1" }}>Line {idx + 1}</span>
                    <button
                      type="button"
                      onClick={() => setCustomServices((prev) => prev.filter((r) => r.id !== row.id))}
                      style={{ ...toolbarButton(false), fontSize: 11, padding: "4px 8px" }}
                    >
                      Remove
                    </button>
                  </div>
                  <ControlLabel>Service name</ControlLabel>
                  <input
                    value={row.name}
                    onChange={(e) =>
                      setCustomServices((prev) => prev.map((r) => (r.id === row.id ? { ...r, name: e.target.value } : r)))
                    }
                    style={numberInputStyle()}
                  />
                  <ControlLabel>Category</ControlLabel>
                  <input
                    value={row.category}
                    placeholder="e.g. SEO, AI, Integration"
                    onChange={(e) =>
                      setCustomServices((prev) =>
                        prev.map((r) => (r.id === row.id ? { ...r, category: e.target.value } : r))
                      )
                    }
                    style={numberInputStyle()}
                  />
                  <ControlLabel>Description</ControlLabel>
                  <textarea
                    rows={2}
                    value={row.description}
                    onChange={(e) =>
                      setCustomServices((prev) =>
                        prev.map((r) => (r.id === row.id ? { ...r, description: e.target.value } : r))
                      )
                    }
                    style={{ ...numberInputStyle(), resize: "vertical", fontFamily: "inherit" }}
                  />
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, marginTop: 8 }}>
                    <div>
                      <ControlLabel>Setup fee</ControlLabel>
                      <input
                        type="number"
                        min={0}
                        value={row.setup || ""}
                        onChange={(e) =>
                          setCustomServices((prev) =>
                            prev.map((r) =>
                              r.id === row.id ? { ...r, setup: Math.max(0, Number(e.target.value) || 0) } : r
                            )
                          )
                        }
                        style={numberInputStyle()}
                      />
                    </div>
                    <div>
                      <ControlLabel>Monthly fee</ControlLabel>
                      <input
                        type="number"
                        min={0}
                        value={row.monthly || ""}
                        onChange={(e) =>
                          setCustomServices((prev) =>
                            prev.map((r) =>
                              r.id === row.id ? { ...r, monthly: Math.max(0, Number(e.target.value) || 0) } : r
                            )
                          )
                        }
                        style={numberInputStyle()}
                      />
                    </div>
                    <div>
                      <ControlLabel>Qty</ControlLabel>
                      <input
                        type="number"
                        min={1}
                        value={row.qty}
                        onChange={(e) =>
                          setCustomServices((prev) =>
                            prev.map((r) =>
                              r.id === row.id ? { ...r, qty: Math.max(1, Number(e.target.value) || 1) } : r
                            )
                          )
                        }
                        style={numberInputStyle()}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </ControlGroup>

            <ControlGroup title="Custom recurring items">
              <div style={{ fontSize: 10, color: "#94a3b8", marginBottom: 10 }}>
                Flexible recurring — Priority Support, AI Support Retainer, Managed Hosting, Website Care Plan,
                Monthly SEO, Twilio Usage Buffer, etc. Editable per client.
              </div>
              <button
                type="button"
                onClick={() =>
                  setCustomRecurring((prev) => [
                    ...prev,
                    {
                      id: `recurring-${Date.now()}`,
                      name: "Recurring item",
                      description: "",
                      monthly: 0,
                      annual: 0,
                      qty: 1,
                    },
                  ])
                }
                style={{
                  ...toolbarButton(false),
                  width: "100%",
                  marginBottom: 12,
                  padding: "10px 12px",
                }}
              >
                + Add Recurring Item
              </button>
              {customRecurring.map((row, idx) => (
                <div
                  key={row.id}
                  style={{
                    marginBottom: 12,
                    padding: 10,
                    borderRadius: 10,
                    border: "1px solid rgba(255,255,255,0.1)",
                    background: CARD_BG,
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                    <span style={{ fontSize: 11, fontWeight: 700, color: "#cbd5e1" }}>Recurring {idx + 1}</span>
                    <button
                      type="button"
                      onClick={() => setCustomRecurring((prev) => prev.filter((r) => r.id !== row.id))}
                      style={{ ...toolbarButton(false), fontSize: 11, padding: "4px 8px" }}
                    >
                      Remove
                    </button>
                  </div>
                  <ControlLabel>Item name</ControlLabel>
                  <input
                    value={row.name}
                    placeholder="e.g. Priority Support"
                    onChange={(e) =>
                      setCustomRecurring((prev) =>
                        prev.map((r) => (r.id === row.id ? { ...r, name: e.target.value } : r))
                      )
                    }
                    style={numberInputStyle()}
                  />
                  <ControlLabel>Description</ControlLabel>
                  <textarea
                    rows={2}
                    value={row.description}
                    onChange={(e) =>
                      setCustomRecurring((prev) =>
                        prev.map((r) => (r.id === row.id ? { ...r, description: e.target.value } : r))
                      )
                    }
                    style={{ ...numberInputStyle(), resize: "vertical", fontFamily: "inherit" }}
                  />
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, marginTop: 8 }}>
                    <div>
                      <ControlLabel>Monthly fee</ControlLabel>
                      <input
                        type="number"
                        min={0}
                        value={row.monthly || ""}
                        onChange={(e) =>
                          setCustomRecurring((prev) =>
                            prev.map((r) =>
                              r.id === row.id ? { ...r, monthly: Math.max(0, Number(e.target.value) || 0) } : r
                            )
                          )
                        }
                        style={numberInputStyle()}
                      />
                    </div>
                    <div>
                      <ControlLabel>Yearly fee (opt.)</ControlLabel>
                      <input
                        type="number"
                        min={0}
                        value={row.annual || ""}
                        onChange={(e) =>
                          setCustomRecurring((prev) =>
                            prev.map((r) =>
                              r.id === row.id ? { ...r, annual: Math.max(0, Number(e.target.value) || 0) } : r
                            )
                          )
                        }
                        style={numberInputStyle()}
                      />
                    </div>
                    <div>
                      <ControlLabel>Qty</ControlLabel>
                      <input
                        type="number"
                        min={1}
                        value={row.qty}
                        onChange={(e) =>
                          setCustomRecurring((prev) =>
                            prev.map((r) =>
                              r.id === row.id ? { ...r, qty: Math.max(1, Number(e.target.value) || 1) } : r
                            )
                          )
                        }
                        style={numberInputStyle()}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </ControlGroup>

            <ControlGroup title="Commercial">
              <ControlLabel>Discount (%)</ControlLabel>
              <input
                type="number"
                min={0}
                max={100}
                value={discount}
                onChange={(e) => setDiscount(Math.min(100, Math.max(0, Number(e.target.value) || 0)))}
                style={numberInputStyle()}
              />

              <ControlLabel>Quick discount</ControlLabel>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 8 }}>
                {[5, 10, 15].map((pct) => (
                  <button
                    key={pct}
                    type="button"
                    onClick={() => setDiscount(pct)}
                    style={toolbarButton(discount === pct)}
                  >
                    {pct}%
                  </button>
                ))}
                <button
                  type="button"
                  onClick={() => setDiscount(0)}
                  style={toolbarButton(discount > 0 && ![5, 10, 15].includes(discount) ? false : discount === 0)}
                >
                  Custom %
                </button>
              </div>

              <ControlLabel>Discount applies to</ControlLabel>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 8 }}>
                <button
                  type="button"
                  onClick={() => setDiscountTarget("oneoff")}
                  style={toolbarButton(discountTarget === "oneoff")}
                >
                  One-off total only (default)
                </button>
                <button
                  type="button"
                  onClick={() => setDiscountTarget("all")}
                  style={toolbarButton(discountTarget === "all")}
                >
                  All totals (incl. recurring)
                </button>
              </div>

              <ControlLabel>Recurring notes (shown on quote)</ControlLabel>
              <textarea
                rows={3}
                value={recurringNotes}
                onChange={(e) => setRecurringNotes(e.target.value)}
                placeholder="e.g. Twilio usage billed in arrears; AI minutes pooled; hosting reviewed at go-live."
                style={{
                  width: "100%",
                  background: CARD_BG,
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: 10,
                  padding: "10px 12px",
                  color: TEXT_MAIN,
                  fontSize: 12,
                  lineHeight: 1.5,
                  resize: "vertical",
                  boxSizing: "border-box",
                }}
              />

              <div
                style={{
                  marginTop: 10,
                  padding: "10px 12px",
                  borderRadius: 10,
                  border: "1px solid rgba(168,85,247,0.22)",
                  background: "rgba(124,58,237,0.08)",
                  fontSize: 11,
                  color: "#e9d5ff",
                  lineHeight: 1.5,
                }}
              >
                Core DOS packages use standard pricing. Add-ons, usage, recurring support, and custom services can be
                adjusted per client.
              </div>

              <ControlLabel>Notes</ControlLabel>
              <textarea
                rows={5}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                style={{
                  width: "100%",
                  background: CARD_BG,
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: 10,
                  padding: "10px 12px",
                  color: TEXT_MAIN,
                  fontSize: 12,
                  lineHeight: 1.6,
                  resize: "vertical",
                  boxSizing: "border-box",
                }}
              />
            </ControlGroup>
          </div>
        </div>

        <div className="print-panel" style={{ overflowY: "auto", padding: "28px 24px 60px" }}>
          <div
            className="page"
            style={{
              maxWidth: 760,
              margin: "0 auto",
              background: "#0b1124",
              borderRadius: 16,
              overflow: "hidden",
              boxShadow: "0 0 50px rgba(0,0,0,0.45)",
              border: "1px solid rgba(168,85,247,0.12)",
            }}
          >
            <div
              className="print-section"
              style={{
                background: "linear-gradient(135deg, #050816 0%, #1E1B4B 45%, #581C87 100%)",
                padding: "38px 44px 30px",
                borderBottom: `3px solid ${PRIMARY}`,
                position: "relative",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: -40,
                  right: -40,
                  width: 180,
                  height: 180,
                  borderRadius: "50%",
                  background: "rgba(168,85,247,0.07)",
                  border: "1px solid rgba(168,85,247,0.09)",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  bottom: -60,
                  left: -30,
                  width: 180,
                  height: 180,
                  borderRadius: "50%",
                  background: "rgba(20,184,166,0.05)",
                  filter: "blur(8px)",
                }}
              />
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  flexWrap: "wrap",
                  gap: 16,
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                  <img
                    src="/logo.png"
                    alt="Directive OS"
                    style={{
                      width: 50,
                      height: 50,
                      objectFit: "contain",
                      filter: "drop-shadow(0 0 10px rgba(124,58,237,0.65))",
                    }}
                  />
                  <div>
                    <div style={{ fontWeight: 800, fontSize: 19 }}>Directive OS</div>
                    <div
                      style={{
                        color: "#d8b4fe",
                        fontSize: 9,
                        fontWeight: 700,
                        letterSpacing: "0.18em",
                        textTransform: "uppercase",
                      }}
                    >
                      Done-For-You AI Business Systems
                    </div>
                  </div>
                </div>

                <div
                  style={{
                    textAlign: "right",
                    fontSize: 11,
                    color: "#cbd5e1",
                    lineHeight: 1.9,
                  }}
                >
                  <div>jayson@directiveos.com.au</div>
                  <div>02 5850 4038</div>
                  <div>directiveos.com.au</div>
                </div>
              </div>

              <div
                style={{
                  marginTop: 24,
                  paddingTop: 20,
                  borderTop: "1px solid rgba(255,255,255,0.12)",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    gap: 20,
                    flexWrap: "wrap",
                  }}
                >
                  <div>
                    <div
                      style={{
                        fontSize: 10,
                        color: "#e9d5ff",
                        fontWeight: 700,
                        textTransform: "uppercase",
                        letterSpacing: "0.15em",
                        marginBottom: 4,
                      }}
                    >
                      {enterpriseMode ? "Custom Enterprise Quote — Prepared For" : "Website + SaaS Proposal — Prepared For"}
                    </div>
                    <div style={{ fontSize: 26, fontWeight: 800, marginBottom: 2 }}>
                      <input
                        readOnly={!editing}
                        value={clientName}
                        onChange={(e) => setClientName(e.target.value)}
                        style={inputStyle(editing)}
                      />
                    </div>
                    <div style={{ fontSize: 13, color: "#dbeafe" }}>
                      Attn:{" "}
                      <input
                        readOnly={!editing}
                        value={contactName}
                        onChange={(e) => setContactName(e.target.value)}
                        style={{
                          ...inputStyle(editing),
                          width: 220,
                          display: "inline",
                        }}
                      />
                    </div>
                    <div
                      style={{
                        fontSize: 12,
                        color: "#cbd5e1",
                        marginTop: 6,
                        fontStyle: "italic",
                      }}
                    >
                      Project:{" "}
                      <input
                        readOnly={!editing}
                        value={projectTitle}
                        onChange={(e) => setProjectTitle(e.target.value)}
                        style={{
                          ...inputStyle(editing),
                          width: 280,
                          display: "inline",
                          fontStyle: "italic",
                        }}
                      />
                    </div>

                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 8,
                        marginTop: 12,
                        flexWrap: "wrap",
                      }}
                    >
                      <div
                        style={{
                          padding: "4px 12px",
                          borderRadius: 20,
                          background: "rgba(124,58,237,0.18)",
                          border: "1px solid rgba(168,85,247,0.28)",
                          fontSize: 11,
                          fontWeight: 800,
                          color: "#f5d0fe",
                        }}
                      >
                        {activePlan.name}
                      </div>
                      <div
                        style={{
                          padding: "4px 12px",
                          borderRadius: 20,
                          background: "rgba(20,184,166,0.12)",
                          border: "1px solid rgba(20,184,166,0.24)",
                          fontSize: 11,
                          fontWeight: 700,
                          color: "#99f6e4",
                        }}
                      >
                        {includeWebsite ? activeWebsite.name : "SaaS only"}
                      </div>
                    </div>
                  </div>

                  <div
                    style={{
                      fontSize: 11,
                      color: "#dbeafe",
                      textAlign: "right",
                      lineHeight: 2,
                    }}
                  >
                    <div>Date: {dateLabel}</div>
                    <div>Valid: {expiryLabel}</div>
                    <div>Ref: {quoteRef}</div>
                  </div>
                </div>
              </div>
            </div>

            <div
              className="print-section"
              style={{ padding: "24px 44px", borderBottom: "1px solid rgba(168,85,247,0.12)" }}
            >
              <SectionEyebrow title="Selected SaaS Plan" />
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1.2fr 1fr",
                  gap: 14,
                }}
              >
                <Card>
                  <div style={{ fontWeight: 800, fontSize: 16 }}>{activePlan.name}</div>
                  <div style={{ color: "#94a3b8", fontSize: 12, marginTop: 4 }}>
                    Done-for-you AI reception, messaging, and client management stack.
                  </div>
                  <div
                    style={{
                      marginTop: 12,
                      display: "grid",
                      gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
                      gap: 10,
                    }}
                  >
                    <MiniStat
                      label="Setup Fee"
                      value={enterpriseMode ? "Per agreement" : fmt(effectivePlanSetup)}
                    />
                    <MiniStat
                      label="Monthly"
                      value={enterpriseMode ? "Per agreement" : `${fmt(effectivePlanMonthly)} / mo`}
                    />
                    <MiniStat label="Voice Minutes" value={`${activePlan.voiceMinutes} mins`} />
                    <MiniStat label="Chat Limit" value={`${activePlan.chats.toLocaleString("en-AU")} chats`} />
                    <MiniStat label="Channels" value={activePlan.channels} />
                    <MiniStat label="Admin Access" value={activePlan.adminAccess} />
                  </div>
                </Card>

                <Card>
                  <div style={{ fontWeight: 800, fontSize: 14, marginBottom: 10 }}>Included by default</div>
                  <ul style={{ margin: 0, paddingLeft: 18, color: TEXT_MUTED, fontSize: 12, lineHeight: 1.8 }}>
                    {INCLUDED_FEATURES.map((f) => (
                      <li key={f}>{f}</li>
                    ))}
                  </ul>
                </Card>
              </div>
            </div>

            <div
              className="print-section"
              style={{ padding: "24px 44px", borderBottom: "1px solid rgba(168,85,247,0.12)" }}
            >
              <SectionEyebrow title="Website Development" />
              {includeWebsite ? (
                <Card>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      gap: 16,
                      alignItems: "flex-start",
                      flexWrap: "wrap",
                    }}
                  >
                    <div>
                      <div style={{ fontWeight: 800, fontSize: 15 }}>{activeWebsite.name}</div>
                      <div style={{ color: "#94a3b8", fontSize: 12, marginTop: 4, maxWidth: 520 }}>
                        {activeWebsite.description}
                      </div>
                      <div
                        style={{
                          marginTop: 12,
                          display: "flex",
                          gap: 8,
                          flexWrap: "wrap",
                        }}
                      >
                        {[
                          "SEO Included",
                          "Google Analytics Included",
                          "Mobile Optimised",
                          "Launch Support Included",
                        ].map((tag) => (
                          <span
                            key={tag}
                            style={{
                              fontSize: 10,
                              color: "#ddd6fe",
                              background: "rgba(124,58,237,0.12)",
                              border: "1px solid rgba(168,85,247,0.18)",
                              borderRadius: 999,
                              padding: "4px 9px",
                            }}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div style={{ textAlign: "right" }}>
                      {enterpriseMode ? (
                        <div style={{ fontSize: 16, fontWeight: 800, color: "#94a3b8" }}>Pricing on request</div>
                      ) : (
                        <>
                          <div style={{ fontSize: 24, fontWeight: 800 }}>{fmt(websiteBuildFee)}</div>
                          <div style={{ fontSize: 11, color: "#94a3b8" }}>one-time build fee</div>
                          {includeHosting && (
                            <div style={{ marginTop: 10, fontSize: 13, color: "#99f6e4" }}>
                              {fmt(annualHosting)} / year hosting & support
                            </div>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                </Card>
              ) : (
                <Card>
                  <div style={{ fontSize: 14, color: TEXT_MUTED }}>No website build included in this quote.</div>
                </Card>
              )}
            </div>

            {!enterpriseMode && (
              <div
                className="print-section"
                style={{ padding: "24px 44px", borderBottom: "1px solid rgba(168,85,247,0.12)" }}
              >
                <SectionEyebrow title="Overage Pricing" />
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                  <thead>
                    <tr style={{ borderBottom: "1px solid rgba(168,85,247,0.14)" }}>
                      <th style={thStyle()}>Resource Type</th>
                      <th style={thStyle()}>Block Size</th>
                      <th style={thStyle()}>Block Price</th>
                      <th style={thStyle()}>Selected</th>
                      <th style={thStyle()}>Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    <TableRow
                      name={OVERAGES.voice.name}
                      block={OVERAGES.voice.block}
                      price={effectiveVoicePrice}
                      defaultPrice={OVERAGES.voice.price}
                      selected={voiceBlocks}
                    />
                    <TableRow
                      name={OVERAGES.chat.name}
                      block={OVERAGES.chat.block}
                      price={effectiveChatPrice}
                      defaultPrice={OVERAGES.chat.price}
                      selected={chatBlocks}
                    />
                    <TableRow
                      name={OVERAGES.sms.name}
                      block={OVERAGES.sms.block}
                      price={effectiveSmsPrice}
                      defaultPrice={OVERAGES.sms.price}
                      selected={smsBlocks}
                    />
                  </tbody>
                </table>
              </div>
            )}

            {addonTotals.lines.length > 0 && (
              <div
                className="print-section"
                style={{ padding: "24px 44px", borderBottom: "1px solid rgba(168,85,247,0.12)" }}
              >
                <SectionEyebrow title="Flexible add-ons" />
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  {addonTotals.lines.map((L, i) => (
                    <Card key={`a-${i}`}>
                      <div style={{ fontWeight: 700, fontSize: 13 }}>{L.label}</div>
                      <div style={{ fontSize: 11, color: TEXT_MUTED, marginTop: 4 }}>
                        Qty {L.qty}
                        {L.setup ? ` · One-off ${fmt(L.setup * L.qty)}` : ""}
                        {L.mo ? ` · ${fmt(L.mo * L.qty)}/mo` : ""}
                        {L.yr ? ` · ${fmt(L.yr * L.qty)}/yr` : ""}
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {customTotals.lines.length > 0 && (
              <div
                className="print-section"
                style={{ padding: "24px 44px", borderBottom: "1px solid rgba(168,85,247,0.12)" }}
              >
                <SectionEyebrow title="Custom services" />
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  {customTotals.lines.map((L, i) => (
                    <Card key={`c-${i}`}>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "baseline",
                          gap: 12,
                          flexWrap: "wrap",
                        }}
                      >
                        <div style={{ fontWeight: 700, fontSize: 13 }}>{L.label}</div>
                        {L.category ? (
                          <span
                            style={{
                              fontSize: 10,
                              color: "#ddd6fe",
                              background: "rgba(124,58,237,0.12)",
                              border: "1px solid rgba(168,85,247,0.18)",
                              borderRadius: 999,
                              padding: "3px 9px",
                            }}
                          >
                            {L.category}
                          </span>
                        ) : null}
                      </div>
                      {L.description ? (
                        <div style={{ fontSize: 11, color: "#94a3b8", marginTop: 4 }}>{L.description}</div>
                      ) : null}
                      <div style={{ fontSize: 11, color: TEXT_MUTED, marginTop: 4 }}>
                        Qty {L.qty}
                        {L.setup ? ` · One-off ${fmt(L.setup * L.qty)}` : ""}
                        {L.mo ? ` · ${fmt(L.mo * L.qty)}/mo` : ""}
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {recurringTotals.lines.length > 0 && (
              <div
                className="print-section"
                style={{ padding: "24px 44px", borderBottom: "1px solid rgba(168,85,247,0.12)" }}
              >
                <SectionEyebrow title="Custom recurring items" />
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  {recurringTotals.lines.map((L, i) => (
                    <Card key={`r-${i}`}>
                      <div style={{ fontWeight: 700, fontSize: 13 }}>{L.label}</div>
                      {L.description ? (
                        <div style={{ fontSize: 11, color: "#94a3b8", marginTop: 4 }}>{L.description}</div>
                      ) : null}
                      <div style={{ fontSize: 11, color: TEXT_MUTED, marginTop: 4 }}>
                        Qty {L.qty}
                        {L.mo ? ` · ${fmt(L.mo * L.qty)}/mo` : ""}
                        {L.yr ? ` · ${fmt(L.yr * L.qty)}/yr` : ""}
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            <div
              className="print-section"
              style={{ padding: "24px 44px", borderBottom: "1px solid rgba(168,85,247,0.12)" }}
            >
              <SectionEyebrow title="Commercial Summary" />
              <div
                style={{
                  fontSize: 10,
                  color: "#d8b4fe",
                  fontWeight: 800,
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  marginBottom: 8,
                }}
              >
                Locked DOS core package
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 16 }}>
                {enterpriseMode ? (
                  <SummaryRow label="Core packages (enterprise)" value="Per agreement — not itemised" />
                ) : (
                  <>
                    <SummaryRow label={`${activePlan.name} SaaS setup`} value={fmt(effectivePlanSetup)} />
                    {includeWebsite && (
                      <SummaryRow label={`${activeWebsite.name} (build)`} value={fmt(websiteBuildFee)} />
                    )}
                  </>
                )}
              </div>

              <div
                style={{
                  fontSize: 10,
                  color: "#d8b4fe",
                  fontWeight: 800,
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  marginBottom: 8,
                }}
              >
                Flexible one-off
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 16 }}>
                {!enterpriseMode && <SummaryRow label="Overage blocks" value={fmt(overageOneOff)} />}
                <SummaryRow label="Flexible add-ons (one-off)" value={fmt(addonTotals.oneOff)} />
                <SummaryRow label="Custom services (one-off)" value={fmt(customTotals.oneOff)} />
                <SummaryRow label="Subtotal (before discount)" value={fmt(flexibleOneOffSubtotal)} />
                {discount > 0 && (
                  <SummaryRow
                    label={`Discount (${discount}% · ${
                      discountTarget === "all" ? "applied across all totals" : "one-off only"
                    })`}
                    value={`- ${fmt(oneOffDiscountAmount)}`}
                    accent
                  />
                )}
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  paddingTop: 10,
                  borderTop: "2px solid rgba(124,58,237,0.35)",
                  marginTop: 4,
                }}
              >
                <span style={{ fontSize: 16, fontWeight: 800 }}>Total One-Off Investment</span>
                <span style={{ fontSize: 30, fontWeight: 900, color: "#e9d5ff" }}>{fmt(totalOneOff)}</span>
              </div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 12,
                  marginTop: 20,
                }}
              >
                <PayCard label="Deposit (50%)" sublabel="Due to commence project" value={fmt(deposit)} accent />
                <PayCard label="Balance (50%)" sublabel="Due on project completion" value={fmt(balance)} />
              </div>

              <div
                style={{
                  marginTop: 24,
                  paddingTop: 16,
                  borderTop: "1px solid rgba(168,85,247,0.18)",
                }}
              >
                <div
                  style={{
                    fontSize: 10,
                    color: "#d8b4fe",
                    fontWeight: 800,
                    textTransform: "uppercase",
                    letterSpacing: "0.1em",
                    marginBottom: 10,
                  }}
                >
                  Recurring breakdown
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 12 }}>
                  {!enterpriseMode ? (
                    <>
                      <SummaryRow
                        label={`${activePlan.name} SaaS monthly`}
                        value={`${fmt(effectivePlanMonthly)} / mo`}
                      />
                      {includeWebsite && includeHosting && annualHosting > 0 ? (
                        <SummaryRow
                          label={`${activeWebsite.name} hosting/support`}
                          value={`${fmt(annualHosting)} / yr`}
                        />
                      ) : null}
                    </>
                  ) : (
                    <SummaryRow label="Core recurring (enterprise)" value="Per agreement — not itemised" />
                  )}
                  {addonTotals.monthly > 0 && (
                    <SummaryRow label="Flexible add-ons monthly" value={`${fmt(addonTotals.monthly)} / mo`} />
                  )}
                  {addonTotals.annual > 0 && (
                    <SummaryRow label="Flexible add-ons annual" value={`${fmt(addonTotals.annual)} / yr`} />
                  )}
                  {customTotals.monthly > 0 && (
                    <SummaryRow label="Custom services monthly" value={`${fmt(customTotals.monthly)} / mo`} />
                  )}
                  {recurringTotals.monthly > 0 && (
                    <SummaryRow label="Custom recurring monthly" value={`${fmt(recurringTotals.monthly)} / mo`} />
                  )}
                  {recurringTotals.annual > 0 && (
                    <SummaryRow label="Custom recurring annual" value={`${fmt(recurringTotals.annual)} / yr`} />
                  )}
                  {discountTarget === "all" && discount > 0 && (
                    <>
                      <SummaryRow
                        label={`Discount (${discount}% on monthly)`}
                        value={`- ${fmt(monthlyDiscountAmount)} / mo`}
                        accent
                      />
                      {annualDiscountAmount > 0 && (
                        <SummaryRow
                          label={`Discount (${discount}% on annual)`}
                          value={`- ${fmt(annualDiscountAmount)} / yr`}
                          accent
                        />
                      )}
                    </>
                  )}
                </div>

                <div
                  style={{
                    background: "rgba(124,58,237,0.08)",
                    border: "1px solid rgba(168,85,247,0.18)",
                    borderRadius: 10,
                    padding: "14px 16px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: 12,
                    flexWrap: "wrap",
                  }}
                >
                  <div>
                    <div style={{ fontSize: 12, fontWeight: 800, color: TEXT_MAIN }}>Total monthly recurring</div>
                    <div style={{ fontSize: 11, color: "#94a3b8" }}>
                      Plan, add-ons, custom services & recurring items
                    </div>
                  </div>
                  <div style={{ fontSize: 24, fontWeight: 900, color: "#f5d0fe" }}>
                    {fmt(monthlyRecurring)}
                    <span style={{ fontSize: 12, fontWeight: 400, color: "#94a3b8" }}> / mo</span>
                  </div>
                </div>

                {annualRecurringDisplay > 0 && (
                  <div
                    style={{
                      marginTop: 12,
                      background: "rgba(20,184,166,0.07)",
                      border: "1px solid rgba(20,184,166,0.16)",
                      borderRadius: 10,
                      padding: "14px 16px",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      gap: 12,
                      flexWrap: "wrap",
                    }}
                  >
                    <div>
                      <div style={{ fontSize: 12, fontWeight: 800, color: TEXT_MAIN }}>Total yearly recurring</div>
                      <div style={{ fontSize: 11, color: "#94a3b8" }}>
                        {!enterpriseMode && annualHosting > 0
                          ? "Website hosting / support, add-on annual fees, and custom recurring yearly fees."
                          : "Add-on, custom services, and custom recurring yearly fees."}
                      </div>
                    </div>
                    <div style={{ fontSize: 22, fontWeight: 900, color: "#99f6e4" }}>
                      {fmt(annualRecurringDisplay)}
                      <span style={{ fontSize: 12, fontWeight: 400, color: "#94a3b8" }}> / year</span>
                    </div>
                  </div>
                )}
              </div>

              {recurringNotes.trim() && (
                <div
                  style={{
                    marginTop: 12,
                    background: CARD_BG,
                    border: "1px solid rgba(255,255,255,0.08)",
                    borderRadius: 10,
                    padding: "12px 14px",
                  }}
                >
                  <div style={{ fontSize: 10, fontWeight: 800, color: "#d8b4fe", marginBottom: 6 }}>RECURRING NOTES</div>
                  <p style={{ margin: 0, fontSize: 11, color: TEXT_MUTED, lineHeight: 1.7 }}>{recurringNotes}</p>
                </div>
              )}

              <div
                style={{
                  marginTop: 14,
                  fontSize: 10,
                  color: "#94a3b8",
                  lineHeight: 1.6,
                }}
              >
                Core DOS packages use standard pricing. Add-ons, usage, recurring support, and custom services can be
                adjusted per client.
              </div>
            </div>

            <div
              className="print-section"
              style={{ padding: "24px 44px", borderBottom: "1px solid rgba(168,85,247,0.12)" }}
            >
              <SectionEyebrow title="Implementation Notes" />
              <div
                style={{
                  background: CARD_BG,
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: 12,
                  padding: "14px 16px",
                }}
              >
                {editing ? (
                  <textarea
                    rows={5}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    style={{
                      width: "100%",
                      background: "transparent",
                      border: "none",
                      outline: "none",
                      color: TEXT_MUTED,
                      fontSize: 12,
                      lineHeight: 1.8,
                      resize: "vertical",
                    }}
                  />
                ) : (
                  <p style={{ margin: 0, color: TEXT_MUTED, fontSize: 12, lineHeight: 1.8 }}>{notes}</p>
                )}
              </div>
            </div>

            <div
              style={{
                padding: "20px 44px",
                background: "rgba(124,58,237,0.05)",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexWrap: "wrap",
                gap: 12,
              }}
            >
              <div>
                <div style={{ fontWeight: 800, fontSize: 13, marginBottom: 2 }}>
                  Questions? Let&apos;s lock it in.
                </div>
                <div style={{ fontSize: 11, color: "#94a3b8" }}>
                  Reply to this quote or send the PDF directly to the client.
                </div>
              </div>
              <div style={{ textAlign: "right", fontSize: 11, color: "#94a3b8" }}>
                <div style={{ color: "#e9d5ff", fontWeight: 800 }}>directiveos.com.au</div>
                <div>jayson@directiveos.com.au · 02 5850 4038</div>
                <div style={{ marginTop: 3 }}>
                  Australian owned & operated · Done-For-You AI Business Systems
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function toolbarButton(active: boolean): CSSProperties {
  return {
    padding: "8px 14px",
    borderRadius: 10,
    border: `1px solid ${active ? ACCENT : "rgba(255,255,255,0.12)"}`,
    background: active ? "rgba(168,85,247,0.14)" : "transparent",
    color: active ? "#f5d0fe" : "#cbd5e1",
    fontWeight: 700,
    cursor: "pointer",
    fontSize: 12,
  };
}

function thStyle(): CSSProperties {
  return {
    textAlign: "left",
    fontSize: 10,
    color: "#94a3b8",
    padding: "8px 0",
    fontWeight: 700,
    textTransform: "uppercase",
    letterSpacing: "0.08em",
  };
}

function TableRow({
  name,
  block,
  price,
  defaultPrice,
  selected,
}: {
  name: string;
  block: string;
  price: number;
  defaultPrice: number;
  selected: number;
}) {
  const overridden = price !== defaultPrice;
  return (
    <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
      <td style={{ padding: "11px 0", fontSize: 12, color: TEXT_MUTED }}>{name}</td>
      <td style={{ padding: "11px 0", fontSize: 12, color: "#94a3b8" }}>{block}</td>
      <td style={{ padding: "11px 0", fontSize: 12, color: TEXT_MAIN }}>
        {fmt(price)}
        {overridden ? <span style={{ marginLeft: 6, fontSize: 10, color: "#fbbf24" }}>(custom)</span> : null}
      </td>
      <td style={{ padding: "11px 0", fontSize: 12, color: "#ddd6fe" }}>{selected}</td>
      <td style={{ padding: "11px 0", fontSize: 12, color: TEXT_MAIN, fontWeight: 700 }}>
        {fmt(price * selected)}
      </td>
    </tr>
  );
}

function SummaryRow({
  label,
  value,
  accent = false,
}: {
  label: string;
  value: string;
  accent?: boolean;
}) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        fontSize: 13,
        color: accent ? "#e9d5ff" : "#cbd5e1",
      }}
    >
      <span>{label}</span>
      <span>{value}</span>
    </div>
  );
}

function PayCard({
  label,
  sublabel,
  value,
  accent = false,
}: {
  label: string;
  sublabel: string;
  value: string;
  accent?: boolean;
}) {
  return (
    <div
      style={{
        background: accent ? "rgba(124,58,237,0.1)" : CARD_BG,
        border: `1px solid ${accent ? "rgba(168,85,247,0.25)" : "rgba(255,255,255,0.08)"}`,
        borderRadius: 12,
        padding: "14px 16px",
      }}
    >
      <div
        style={{
          fontSize: 11,
          color: accent ? "#e9d5ff" : "#94a3b8",
          fontWeight: 800,
          textTransform: "uppercase",
          letterSpacing: "0.1em",
          marginBottom: 4,
        }}
      >
        {label}
      </div>
      <div style={{ fontSize: 22, fontWeight: 900 }}>{value}</div>
      <div style={{ fontSize: 10, color: "#94a3b8", marginTop: 2 }}>{sublabel}</div>
    </div>
  );
}

function Card({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        background: CARD_BG,
        border: "1px solid rgba(255,255,255,0.08)",
        borderRadius: 14,
        padding: "16px 18px",
      }}
    >
      {children}
    </div>
  );
}

function MiniStat({ label, value }: { label: string; value: string }) {
  return (
    <div
      style={{
        background: CARD_SOFT,
        border: "1px solid rgba(255,255,255,0.06)",
        borderRadius: 12,
        padding: "10px 12px",
      }}
    >
      <div style={{ fontSize: 10, color: "#94a3b8", marginBottom: 4 }}>{label}</div>
      <div style={{ fontSize: 12, fontWeight: 800, color: TEXT_MAIN }}>{value}</div>
    </div>
  );
}

function SectionEyebrow({ title }: { title: string }) {
  return (
    <div
      style={{
        fontSize: 11,
        fontWeight: 800,
        color: "#d8b4fe",
        textTransform: "uppercase",
        letterSpacing: "0.12em",
        marginBottom: 14,
      }}
    >
      {title}
    </div>
  );
}

function ControlGroup({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div style={{ marginBottom: 22 }}>
      <div
        style={{
          fontSize: 10,
          fontWeight: 800,
          color: "#d8b4fe",
          textTransform: "uppercase",
          letterSpacing: "0.12em",
          marginBottom: 10,
        }}
      >
        {title}
      </div>
      {children}
    </div>
  );
}

function ControlLabel({ children }: { children: React.ReactNode }) {
  return <div style={{ fontSize: 11, color: "#94a3b8", marginBottom: 6, marginTop: 10 }}>{children}</div>;
}

function TextInput({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <input
      value={value}
      onChange={(e) => onChange(e.target.value)}
      style={{
        width: "100%",
        background: CARD_BG,
        border: "1px solid rgba(255,255,255,0.08)",
        borderRadius: 10,
        padding: "10px 12px",
        color: TEXT_MAIN,
        fontSize: 12,
        boxSizing: "border-box",
      }}
    />
  );
}

function ToggleRow({
  checked,
  onChange,
  label,
}: {
  checked: boolean;
  onChange: () => void;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onChange}
      style={{
        width: "100%",
        marginBottom: 10,
        display: "flex",
        alignItems: "center",
        gap: 10,
        padding: "10px 12px",
        borderRadius: 10,
        border: "1px solid rgba(255,255,255,0.08)",
        background: CARD_BG,
        cursor: "pointer",
        color: TEXT_MAIN,
      }}
    >
      <span
        style={{
          width: 16,
          height: 16,
          borderRadius: 4,
          border: `1.5px solid ${checked ? PRIMARY : "#475569"}`,
          background: checked ? PRIMARY : "transparent",
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 10,
          fontWeight: 900,
          color: "#fff",
          flexShrink: 0,
        }}
      >
        {checked ? "✓" : ""}
      </span>
      <span style={{ fontSize: 12 }}>{label}</span>
    </button>
  );
}

function NumberField({
  label,
  value,
  setValue,
  helper,
}: {
  label: string;
  value: number;
  setValue: (n: number) => void;
  helper: string;
}) {
  return (
    <div style={{ marginBottom: 12 }}>
      <ControlLabel>{label}</ControlLabel>
      <input
        type="number"
        min={0}
        value={value}
        onChange={(e) => setValue(Math.max(0, Number(e.target.value) || 0))}
        style={numberInputStyle()}
      />
      <div style={{ marginTop: 4, fontSize: 10, color: "#94a3b8" }}>{helper}</div>
    </div>
  );
}

function OverageRow({
  label,
  qty,
  setQty,
  defaultPrice,
  override,
  setOverride,
  effectivePrice,
}: {
  label: string;
  qty: number;
  setQty: (n: number) => void;
  defaultPrice: number;
  override: string;
  setOverride: (v: string) => void;
  effectivePrice: number;
}) {
  const isOverride = override.trim() !== "" && !Number.isNaN(Number(override));
  return (
    <div style={{ marginBottom: 14 }}>
      <ControlLabel>{label}</ControlLabel>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
        <div>
          <input
            type="number"
            min={0}
            value={qty}
            onChange={(e) => setQty(Math.max(0, Number(e.target.value) || 0))}
            placeholder="Qty"
            style={numberInputStyle()}
          />
          <div style={{ marginTop: 4, fontSize: 10, color: "#94a3b8" }}>blocks</div>
        </div>
        <div>
          <input
            type="number"
            min={0}
            value={override}
            onChange={(e) => setOverride(e.target.value)}
            placeholder={`$${defaultPrice} (default)`}
            style={numberInputStyle()}
          />
          <div style={{ marginTop: 4, fontSize: 10, color: isOverride ? "#fbbf24" : "#94a3b8" }}>
            {isOverride ? `override $${effectivePrice}/block` : `default $${defaultPrice}/block`}
          </div>
        </div>
      </div>
      <div style={{ marginTop: 4, fontSize: 10, color: "#cbd5e1" }}>
        Line total: ${(qty * effectivePrice).toLocaleString("en-AU")}
      </div>
    </div>
  );
}

function numberInputStyle(): CSSProperties {
  return {
    width: "100%",
    background: CARD_BG,
    border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: 10,
    padding: "10px 12px",
    color: TEXT_MAIN,
    fontSize: 12,
    boxSizing: "border-box",
  };
}
