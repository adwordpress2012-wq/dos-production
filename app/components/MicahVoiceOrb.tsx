"use client";

import Image from "next/image";
import { CalendarDays, LoaderCircle, MessageCircle, Mic, PhoneOff } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { trackDosEvent } from "@/app/lib/analytics";
import { DISCOVERY_CALL_HREF } from "@/app/lib/booking";

const VOICE_WIDGET_ID = "6a63f6a120cc16c7919df9d7";
const VOICE_WIDGET_LOADER = "https://widgets.leadconnectorhq.com/loader.js";
const VOICE_WIDGET_RESOURCES =
  "https://widgets.leadconnectorhq.com/chat-widget/loader.js";

const ORB_NODES = Array.from({ length: 42 }, (_, index) => {
  const angle = index * 137.508 * (Math.PI / 180);
  const radius = 11 + Math.sqrt(index / 41) * 39;

  return {
    left: Number((50 + Math.cos(angle) * radius).toFixed(3)),
    top: Number((50 + Math.sin(angle) * radius * 0.76).toFixed(3)),
    size: 2.4 + (index % 5) * 0.72,
    delay: -(index % 9) * 0.42,
  };
});

type VoiceStatus = "ready" | "connecting" | "active" | "unavailable";

function findVoiceLauncher(root: Document | ShadowRoot): HTMLElement | null {
  const selectors = [
    'button[aria-label*="Voice AI" i]',
    '[role="button"][aria-label*="Voice AI" i]',
    'button[aria-label*="voice call" i]',
    '[role="button"][aria-label*="voice call" i]',
    'button[title*="voice call" i]',
  ];

  for (const selector of selectors) {
    const element = root.querySelector<HTMLElement>(selector);
    if (element && !element.dataset.dosVoiceControl) return element;
  }

  for (const element of Array.from(root.querySelectorAll<HTMLElement>("*"))) {
    if (element.shadowRoot) {
      const nested = findVoiceLauncher(element.shadowRoot);
      if (nested) return nested;
    }
  }

  return null;
}

function findChatLauncher(root: Document | ShadowRoot): HTMLElement | null {
  const selectors = [
    'button[aria-label*="chat" i]',
    'button[title*="chat" i]',
    '[role="button"][aria-label*="chat" i]',
    ".lc_text-widget--btn",
  ];

  for (const selector of selectors) {
    const element = root.querySelector<HTMLElement>(selector);
    if (element && !element.closest("[data-dos-voice-widget]")) return element;
  }

  for (const element of Array.from(root.querySelectorAll<HTMLElement>("*"))) {
    if (element.shadowRoot) {
      const nested = findChatLauncher(element.shadowRoot);
      if (nested) return nested;
    }
  }

  return null;
}

function findChatPromptClose(root: Document | ShadowRoot): HTMLElement | null {
  const close = root.querySelector<HTMLElement>(
    'button[aria-label="Close prompt" i]'
  );
  if (close) return close;

  for (const element of Array.from(root.querySelectorAll<HTMLElement>("*"))) {
    if (element.shadowRoot) {
      const nested = findChatPromptClose(element.shadowRoot);
      if (nested) return nested;
    }
  }

  return null;
}

function waitForVoiceLauncher(mount: HTMLElement, timeout = 12000) {
  return new Promise<HTMLElement | null>((resolve) => {
    const startedAt = Date.now();

    const check = () => {
      const widget = mount.querySelector<HTMLElement>("chat-widget");
      const launcher = widget?.shadowRoot
        ? findVoiceLauncher(widget.shadowRoot)
        : null;

      if (launcher) {
        resolve(launcher);
        return;
      }

      if (Date.now() - startedAt >= timeout) {
        resolve(null);
        return;
      }

      window.setTimeout(check, 180);
    };

    check();
  });
}

export default function MicahVoiceOrb() {
  const widgetMountRef = useRef<HTMLDivElement>(null);
  const orbRef = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState<VoiceStatus>("ready");
  const [orbVisible, setOrbVisible] = useState(true);

  useEffect(() => {
    const mount = widgetMountRef.current;
    if (!mount) return;

    const existing = document.querySelector<HTMLScriptElement>(
      `script[data-widget-id="${VOICE_WIDGET_ID}"]`
    );

    if (existing) return;

    const script = document.createElement("script");
    script.src = VOICE_WIDGET_LOADER;
    script.async = true;
    script.dataset.resourcesUrl = VOICE_WIDGET_RESOURCES;
    script.dataset.widgetId = VOICE_WIDGET_ID;
    script.addEventListener("error", () => setStatus("unavailable"), {
      once: true,
    });
    mount.appendChild(script);
  }, []);

  useEffect(() => {
    let attempts = 0;
    const timer = window.setInterval(() => {
      attempts += 1;
      const closePrompt = findChatPromptClose(document);

      if (closePrompt) {
        closePrompt.click();
        window.clearInterval(timer);
      } else if (attempts >= 16) {
        window.clearInterval(timer);
      }
    }, 300);

    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    const orb = orbRef.current;
    if (!orb || !("IntersectionObserver" in window)) return;

    const observer = new IntersectionObserver(
      ([entry]) => setOrbVisible(entry.isIntersecting),
      { threshold: 0.04 }
    );

    observer.observe(orb);
    return () => observer.disconnect();
  }, []);

  async function toggleVoice() {
    if (status === "connecting") return;

    if (!navigator.mediaDevices?.getUserMedia) {
      setStatus("unavailable");
      trackDosEvent("micah_voice_unavailable", {
        source: "homepage-hero",
        context: "browser-unsupported",
      });
      return;
    }

    setStatus("connecting");
    const mount = widgetMountRef.current;
    const launcher = mount ? await waitForVoiceLauncher(mount) : null;

    if (!launcher) {
      setStatus("unavailable");
      trackDosEvent("micah_voice_unavailable", {
        source: "homepage-hero",
      });
      return;
    }

    let microphonePermission: PermissionStatus | null = null;

    try {
      microphonePermission = await navigator.permissions?.query({
        name: "microphone" as PermissionName,
      });
    } catch {
      microphonePermission = null;
    }

    if (microphonePermission?.state === "denied") {
      setStatus("unavailable");
      trackDosEvent("micah_voice_unavailable", {
        source: "homepage-hero",
        context: "microphone-denied",
      });
      return;
    }

    if (microphonePermission?.state === "prompt") {
      microphonePermission.addEventListener(
        "change",
        () => {
          if (microphonePermission?.state === "denied") {
            setStatus("unavailable");
            trackDosEvent("micah_voice_unavailable", {
              source: "homepage-hero",
              context: "microphone-denied",
            });
          }
        },
        { once: true }
      );
    }

    launcher.click();

    if (status === "active") {
      setStatus("ready");
      trackDosEvent("micah_voice_end", { source: "homepage-hero" });
      return;
    }

    setStatus("active");
    trackDosEvent("micah_voice_start", { source: "homepage-hero" });
  }

  function openChat() {
    const launcher = findChatLauncher(document);

    trackDosEvent("micah_chat_open", { source: "homepage-hero-fallback" });

    if (launcher) {
      launcher.click();
      return;
    }

    window.open("https://chatos.com.au", "_blank", "noopener,noreferrer");
  }

  const statusCopy =
    status === "connecting"
      ? "Connecting to Micah…"
      : status === "active"
        ? "Micah is listening."
        : status === "unavailable"
          ? "Micah voice is temporarily unavailable."
          : "Micah is online now";

  return (
    <div className="micah-voice-stage">
      <div
        ref={orbRef}
        className="micah-network-orb"
        data-orb-visible={orbVisible}
      >
        <div className="micah-orb-halo" aria-hidden />
        <div className="micah-orb-grid micah-orb-grid--outer" aria-hidden />
        <div className="micah-orb-grid micah-orb-grid--inner" aria-hidden />
        <div className="micah-orb-ring micah-orb-ring--one" aria-hidden />
        <div className="micah-orb-ring micah-orb-ring--two" aria-hidden />
        <div className="micah-orb-nodes" aria-hidden>
          {ORB_NODES.map((node, index) => (
            <span
              key={index}
              style={{
                left: `${node.left}%`,
                top: `${node.top}%`,
                width: `${node.size}px`,
                height: `${node.size}px`,
                animationDelay: `${node.delay}s`,
              }}
            />
          ))}
        </div>

        <button
          type="button"
          onClick={toggleVoice}
          data-dos-voice-control
          className="micah-orb-portrait focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-violet-300/70"
          aria-label="Talk to Micah using your microphone"
        >
          <Image
            src="/micah/micah-official-profile.png"
            alt="Micah, the Directive OS Smart Business Assistant"
            fill
            priority
            loading="eager"
            fetchPriority="high"
            sizes="(min-width: 1024px) 29vw, (min-width: 640px) 58vw, 78vw"
            className="object-cover object-[50%_26%]"
          />
        </button>

        <div className="micah-voice-controls">
          <button
            type="button"
            onClick={toggleVoice}
            data-dos-voice-control
            className="micah-mic-button"
            aria-label="Talk to Micah using your microphone"
          >
            {status === "connecting" ? (
              <LoaderCircle className="h-8 w-8 animate-spin" aria-hidden />
            ) : status === "active" ? (
              <PhoneOff className="h-8 w-8" aria-hidden />
            ) : (
              <Mic className="h-8 w-8" aria-hidden />
            )}
          </button>
          <button
            type="button"
            onClick={toggleVoice}
            data-dos-voice-control
            className="micah-tap-button"
            aria-label="Talk to Micah using your microphone"
          >
            {status === "active" ? "End voice call" : "Tap to Talk"}
          </button>
        </div>
      </div>

      <p className="micah-online-status" aria-live="polite">
        <span
          className={`micah-status-dot ${status === "unavailable" ? "micah-status-dot--off" : ""}`}
          aria-hidden
        />
        {statusCopy}
      </p>
      <p className="micah-voice-supporting">
        Voice <span aria-hidden>•</span> Chat <span aria-hidden>•</span> Business Discovery
      </p>

      {status === "unavailable" ? (
        <div className="micah-voice-fallback" role="status">
          <p>
            Voice is unavailable right now. You can still chat with Micah or book
            Business Discovery.
          </p>
          <div>
            <button type="button" onClick={openChat} className="btn-ghost">
              <MessageCircle className="h-4 w-4" aria-hidden />
              Chat with Micah
            </button>
            <a
              href={DISCOVERY_CALL_HREF}
              target="_blank"
              rel="noreferrer"
              onClick={() =>
                trackDosEvent("calendar_open", {
                  source: "homepage-hero-fallback",
                  destination: DISCOVERY_CALL_HREF,
                })
              }
              className="btn-primary"
            >
              <CalendarDays className="h-4 w-4" aria-hidden />
              Book Business Discovery
            </a>
          </div>
        </div>
      ) : null}

      <div
        ref={widgetMountRef}
        data-dos-voice-widget
        className="micah-native-voice-widget"
        aria-hidden="true"
      />
    </div>
  );
}
