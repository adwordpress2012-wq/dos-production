"use client";

export type DosEventName =
  | "hero_cta_click"
  | "micah_modal_open"
  | "micah_chat_open"
  | "micah_voice_widget_loaded"
  | "micah_voice_started"
  | "micah_voice_connected"
  | "micah_voice_ended"
  | "micah_voice_failed"
  | "micah_voice_fallback_chat"
  | "micah_voice_fallback_calendar"
  | "phone_call_click"
  | "calendar_open"
  | "start_here_form_start"
  | "start_here_form_submit"
  | "industry_click"
  | "spotlight_click"
  | "ecosystem_outbound_click"
  | "resource_click";

export type DosEventDetail = {
  source?: string;
  label?: string;
  destination?: string;
  context?: string;
};

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
  }
}

export function trackDosEvent(name: DosEventName, detail: DosEventDetail = {}) {
  if (typeof window === "undefined") return;

  const payload = {
    event: name.startsWith("micah_voice_") ? name : `dos_${name}`,
    ...detail,
  };

  window.dispatchEvent(new CustomEvent("dos:analytics", { detail: payload }));

  if (Array.isArray(window.dataLayer)) {
    window.dataLayer.push(payload);
  }
}
