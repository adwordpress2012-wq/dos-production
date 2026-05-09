import pako from "pako";
import { ADDON_BY_ID } from "./addonCatalog";

/** z = gzip+base64url payload, u = raw JSON base64url (legacy-compatible inner format) */
const PREFIX_GZIP = "z";
const PREFIX_RAW = "u";

/** Matches AddonLineState / CustomServiceLine in SaaSQuoteBuilder (structural). */
export type AddonLineStateCodec = {
  on: boolean;
  qty: number;
  rename: string;
  setupO: string;
  monthlyO: string;
  annualO: string;
};

export type CustomServiceLineCodec = {
  id: string;
  name: string;
  category: string;
  description: string;
  setup: number;
  monthly: number;
  qty: number;
};

export type CustomRecurringLineCodec = {
  id: string;
  name: string;
  description: string;
  monthly: number;
  annual: number;
  qty: number;
};

const SCHEMA_VERSION = 2;

type CompactAddon = {
  i: string;
  on?: 1;
  q?: number;
  r?: string;
  so?: string;
  mo?: string;
  ao?: string;
};

type CompactCustom = {
  id: string;
  n: string;
  cat?: string;
  d: string;
  su: number;
  mo: number;
  q: number;
};

type CompactRecurring = {
  id: string;
  n: string;
  d: string;
  mo: number;
  an: number;
  q: number;
};

export type QuoteStatePayload = {
  v: number;
  a?: CompactAddon[];
  c?: CompactCustom[];
  r?: CompactRecurring[];
};

export function buildCompactQuotePayload(
  addonSelections: Record<string, AddonLineStateCodec>,
  customServices: CustomServiceLineCodec[],
  customRecurring: CustomRecurringLineCodec[]
): QuoteStatePayload | null {
  const a: CompactAddon[] = [];
  for (const [id, s] of Object.entries(addonSelections)) {
    if (!ADDON_BY_ID[id]) continue;
    const dirty =
      s.on || s.qty !== 1 || !!s.rename || !!s.setupO || !!s.monthlyO || !!s.annualO;
    if (!dirty) continue;
    const row: CompactAddon = { i: id };
    if (s.on) row.on = 1;
    if (s.qty !== 1) row.q = s.qty;
    if (s.rename) row.r = s.rename;
    if (s.setupO) row.so = s.setupO;
    if (s.monthlyO) row.mo = s.monthlyO;
    if (s.annualO) row.ao = s.annualO;
    a.push(row);
  }

  const c =
    customServices.length > 0
      ? customServices.map((r) => {
          const row: CompactCustom = {
            id: r.id,
            n: r.name,
            d: r.description,
            su: r.setup,
            mo: r.monthly,
            q: r.qty,
          };
          if (r.category) row.cat = r.category;
          return row;
        })
      : undefined;

  const r =
    customRecurring.length > 0
      ? customRecurring.map((row) => ({
          id: row.id,
          n: row.name,
          d: row.description,
          mo: row.monthly,
          an: row.annual,
          q: row.qty,
        }))
      : undefined;

  if (a.length === 0 && !c && !r) return null;
  return { v: SCHEMA_VERSION, a: a.length ? a : undefined, c, r };
}

export function applyQuotePayload(
  payload: QuoteStatePayload,
  createEmptyAddons: () => Record<string, AddonLineStateCodec>
): {
  addonSelections: Record<string, AddonLineStateCodec>;
  customServices: CustomServiceLineCodec[];
  customRecurring: CustomRecurringLineCodec[];
} {
  const base = createEmptyAddons();
  for (const row of payload.a ?? []) {
    if (!base[row.i]) continue;
    const cur = base[row.i];
    base[row.i] = {
      on: row.on === 1,
      qty: row.q !== undefined ? Math.max(1, row.q) : cur.qty,
      rename: row.r ?? "",
      setupO: row.so ?? "",
      monthlyO: row.mo ?? "",
      annualO: row.ao ?? "",
    };
  }

  const customServices: CustomServiceLineCodec[] = (payload.c ?? []).map((r) => ({
    id: r.id,
    name: r.n,
    category: r.cat ?? "",
    description: r.d,
    setup: r.su,
    monthly: r.mo,
    qty: Math.max(1, r.q || 1),
  }));

  const customRecurring: CustomRecurringLineCodec[] = (payload.r ?? []).map((row) => ({
    id: row.id,
    name: row.n,
    description: row.d,
    monthly: row.mo,
    annual: row.an,
    qty: Math.max(1, row.q || 1),
  }));

  return { addonSelections: base, customServices, customRecurring };
}

function toBase64UrlFromString(json: string): string {
  const b64 = btoa(unescape(encodeURIComponent(json)));
  return b64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function toBase64UrlFromBytes(bytes: Uint8Array): string {
  let binary = "";
  for (let i = 0; i < bytes.length; i++) binary += String.fromCharCode(bytes[i]!);
  const b64 = btoa(binary);
  return b64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function fromBase64UrlToBytes(s: string): Uint8Array {
  let b = s.replace(/-/g, "+").replace(/_/g, "/");
  while (b.length % 4) b += "=";
  const binary = atob(b);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  return bytes;
}

function tryDecodeRawBase64(base64url: string): QuoteStatePayload | null {
  try {
    let b = base64url.replace(/-/g, "+").replace(/_/g, "/");
    while (b.length % 4) b += "=";
    const json = decodeURIComponent(escape(atob(b)));
    const data = JSON.parse(json) as QuoteStatePayload;
    if (!data || typeof data.v !== "number") return null;
    if (data.v !== SCHEMA_VERSION && data.v !== 1) return null;
    return data;
  } catch {
    return null;
  }
}

function tryDecodeGzipBase64(base64url: string): QuoteStatePayload | null {
  try {
    const bytes = fromBase64UrlToBytes(base64url);
    const json = pako.ungzip(bytes, { to: "string" });
    const data = JSON.parse(json) as QuoteStatePayload;
    if (!data || typeof data.v !== "number") return null;
    if (data.v !== SCHEMA_VERSION && data.v !== 1) return null;
    return data;
  } catch {
    return null;
  }
}

export function encodeQuoteState(
  addonSelections: Record<string, AddonLineStateCodec>,
  customServices: CustomServiceLineCodec[],
  customRecurring: CustomRecurringLineCodec[]
): string | null {
  const payload = buildCompactQuotePayload(addonSelections, customServices, customRecurring);
  if (!payload) return null;
  try {
    const json = JSON.stringify(payload);
    const rawB64 = toBase64UrlFromString(json);
    const gzB64 = toBase64UrlFromBytes(pako.gzip(json, { level: 9 }));
    const withGzipLen = 1 + gzB64.length;
    const withRawLen = 1 + rawB64.length;
    if (withGzipLen < withRawLen) return PREFIX_GZIP + gzB64;
    return PREFIX_RAW + rawB64;
  } catch {
    return null;
  }
}

export function decodeQuoteState(encoded: string): QuoteStatePayload | null {
  const trimmed = encoded?.trim();
  if (!trimmed) return null;
  if (trimmed.startsWith(PREFIX_GZIP)) {
    return tryDecodeGzipBase64(trimmed.slice(1));
  }
  if (trimmed.startsWith(PREFIX_RAW)) {
    return tryDecodeRawBase64(trimmed.slice(1));
  }
  const legacyRaw = tryDecodeRawBase64(trimmed);
  if (legacyRaw) return legacyRaw;
  return tryDecodeGzipBase64(trimmed);
}
