"use client";

import { CalendarDays, MessageCircle } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { trackDosEvent } from "@/app/lib/analytics";
import { DISCOVERY_CALL_HREF } from "@/app/lib/booking";

const VOICE_WIDGET_ID = "6a6402f720cc16c7919fc5b9";
const VOICE_WIDGET_LOADER = "https://widgets.leadconnectorhq.com/loader.js";
const VOICE_WIDGET_RESOURCES =
  "https://widgets.leadconnectorhq.com/chat-widget/loader.js";
const WIDGET_LOAD_TIMEOUT = 12000;

type VoiceStatus =
  | "loading"
  | "ready"
  | "connecting"
  | "listening"
  | "thinking"
  | "speaking"
  | "ended"
  | "unavailable";

type VoiceWidgetElement = HTMLElement & {
  widgetId?: string;
};

declare global {
  interface Window {
    leadConnector?: {
      chatWidget?: {
        isLoaded?: boolean;
        openWidget?: () => void;
      };
    };
  }
}

export default function MicahVoiceOrb() {
  const widgetMountRef = useRef<HTMLDivElement>(null);
  const orbRef = useRef<HTMLDivElement>(null);
  const voiceAttemptActiveRef = useRef(false);
  const voiceWidgetLoadedRef = useRef(false);
  const voiceConnectedTrackedRef = useRef(false);
  const voiceFailureTrackedRef = useRef(false);
  const nativeStateObserverRef = useRef<MutationObserver | null>(null);
  const statusRef = useRef<VoiceStatus>("loading");
  const [status, setStatus] = useState<VoiceStatus>("loading");
  const [hasAttemptedVoice, setHasAttemptedVoice] = useState(false);
  const [orbVisible, setOrbVisible] = useState(true);

  useEffect(() => {
    const mount = widgetMountRef.current;
    if (!mount) return;

    const updateStatus = (nextStatus: VoiceStatus) => {
      statusRef.current = nextStatus;
      setStatus(nextStatus);
    };

    const failVoice = (context: string) => {
      updateStatus("unavailable");
      voiceAttemptActiveRef.current = false;

      if (!voiceFailureTrackedRef.current) {
        voiceFailureTrackedRef.current = true;
        trackDosEvent("micah_voice_failed", {
          source: "homepage-hero",
          context,
        });
      }
    };

    const confirmWidgetReady = () => {
      let widget = mount.querySelector<VoiceWidgetElement>("chat-widget");

      if (!widget) {
        widget = Array.from(
          document.querySelectorAll<VoiceWidgetElement>("chat-widget")
        ).find((candidate) => candidate.widgetId === VOICE_WIDGET_ID) ?? null;

        if (widget) mount.appendChild(widget);
      }

      if (!widget || widget.widgetId !== VOICE_WIDGET_ID) return false;

      if (!voiceWidgetLoadedRef.current) {
        voiceWidgetLoadedRef.current = true;
        updateStatus("ready");
        trackDosEvent("micah_voice_widget_loaded", {
          source: "homepage-hero",
        });
      }

      if (loadTimeout) window.clearTimeout(loadTimeout);
      return true;
    };

    const handleWidgetLoaded = () => {
      window.requestAnimationFrame(confirmWidgetReady);
    };

    const handleCaptchaFailure = () => failVoice("security-check-failed");

    const syncNativeState = (nativeControl: HTMLElement) => {
      const label = nativeControl.getAttribute("aria-label")?.toLowerCase() ?? "";

      if (label.includes("connecting")) {
        updateStatus("connecting");
        return;
      }

      if (label.includes("listening") || label.includes("speaking")) {
        updateStatus(label.includes("speaking") ? "speaking" : "listening");

        if (!voiceConnectedTrackedRef.current) {
          voiceConnectedTrackedRef.current = true;
          trackDosEvent("micah_voice_connected", {
            source: "homepage-hero",
          });
        }
        return;
      }

      if (label.includes("call ended")) {
        updateStatus("ended");

        if (voiceAttemptActiveRef.current) {
          voiceAttemptActiveRef.current = false;
          trackDosEvent("micah_voice_ended", {
            source: "homepage-hero",
            context: "native-call-ended",
          });
        }
        return;
      }

      if (
        label.includes("tap to talk") &&
        voiceAttemptActiveRef.current &&
        statusRef.current === "connecting"
      ) {
        failVoice("native-call-failed");
      }
    };

    const observeNativeState = (nativeControl: HTMLElement) => {
      nativeStateObserverRef.current?.disconnect();
      nativeStateObserverRef.current = new MutationObserver(() =>
        syncNativeState(nativeControl)
      );
      nativeStateObserverRef.current.observe(nativeControl, {
        attributes: true,
        attributeFilter: ["aria-label"],
      });
    };

    const handleNativeInteraction = (event: Event) => {
      if (!voiceWidgetLoadedRef.current) return;

      const nativeControl = event
        .composedPath()
        .find(
          (node): node is HTMLElement =>
            node instanceof HTMLElement && node.getAttribute("role") === "button"
        );

      if (nativeControl) {
        observeNativeState(nativeControl);
        window.setTimeout(() => syncNativeState(nativeControl), 120);
      }

      if (voiceAttemptActiveRef.current) {
        // The embedded widget owns the end action. Its accessible state reports
        // the confirmed end before DOS updates its local UI or analytics.
        return;
      }

      voiceAttemptActiveRef.current = true;
      voiceConnectedTrackedRef.current = false;
      voiceFailureTrackedRef.current = false;
      setHasAttemptedVoice(true);
      updateStatus("connecting");
      trackDosEvent("micah_voice_started", {
        source: "homepage-hero",
      });

      if (!navigator.permissions?.query) return;

      void navigator.permissions
        .query({ name: "microphone" as PermissionName })
        .then((permission) => {
          const handlePermissionChange = () => {
            if (permission.state === "denied") {
              failVoice("microphone-denied");
            }
          };

          handlePermissionChange();
          permission.addEventListener("change", handlePermissionChange, {
            once: true,
          });
        })
        .catch(() => {
          // The Voice AI widget owns the permission request where the Permissions
          // API is unavailable or restricted.
        });
    };

    if (!window.isSecureContext || !navigator.mediaDevices?.getUserMedia) {
      failVoice("browser-unsupported");
      return;
    }

    mount.addEventListener("click", handleNativeInteraction, true);
    window.addEventListener("LC_chatWidgetLoaded", handleWidgetLoaded);
    window.addEventListener("lc-captcha-error", handleCaptchaFailure);
    window.addEventListener("lc-captcha-failed", handleCaptchaFailure);

    const observer = new MutationObserver(confirmWidgetReady);
    observer.observe(mount, { childList: true, subtree: true });

    const loadTimeout = window.setTimeout(() => {
      if (!confirmWidgetReady()) failVoice("widget-load-timeout");
    }, WIDGET_LOAD_TIMEOUT);

    const existingWidget = Array.from(
      document.querySelectorAll<VoiceWidgetElement>("chat-widget")
    ).find((widget) => widget.widgetId === VOICE_WIDGET_ID);

    const existingScript = document.querySelector<HTMLScriptElement>(
      `script[data-widget-id="${VOICE_WIDGET_ID}"]`
    );

    if (existingWidget) {
      confirmWidgetReady();
    } else if (!existingScript) {
      const script = document.createElement("script");
      script.src = VOICE_WIDGET_LOADER;
      script.async = true;
      script.dataset.resourcesUrl = VOICE_WIDGET_RESOURCES;
      script.dataset.widgetId = VOICE_WIDGET_ID;
      script.addEventListener("error", () => failVoice("script-load-failed"), {
        once: true,
      });
      mount.appendChild(script);
    }

    return () => {
      observer.disconnect();
      nativeStateObserverRef.current?.disconnect();
      mount.removeEventListener("click", handleNativeInteraction, true);
      window.removeEventListener("LC_chatWidgetLoaded", handleWidgetLoaded);
      window.removeEventListener("lc-captcha-error", handleCaptchaFailure);
      window.removeEventListener("lc-captcha-failed", handleCaptchaFailure);
      window.clearTimeout(loadTimeout);
    };
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

  function openChat() {
    trackDosEvent("micah_voice_fallback_chat", {
      source: "homepage-hero-fallback",
    });
    trackDosEvent("micah_chat_open", {
      source: "homepage-hero-fallback",
    });

    const openWidget = window.leadConnector?.chatWidget?.openWidget;
    if (typeof openWidget === "function") {
      openWidget();
      return;
    }

    window.open("https://chatos.com.au", "_blank", "noopener,noreferrer");
  }

  return (
    <div className="micah-voice-stage">
      <div
        ref={orbRef}
        className="micah-network-orb"
        data-orb-visible={orbVisible}
      >
        <div
          className="micah-native-voice-frame"
          data-voice-status={status}
        >
          <div
            ref={widgetMountRef}
            data-dos-voice-widget
            className="micah-native-voice-widget"
          />
        </div>
      </div>

      {hasAttemptedVoice && status === "unavailable" ? (
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
              onClick={() => {
                trackDosEvent("micah_voice_fallback_calendar", {
                  source: "homepage-hero-fallback",
                  destination: DISCOVERY_CALL_HREF,
                });
                trackDosEvent("calendar_open", {
                  source: "homepage-hero-fallback",
                  destination: DISCOVERY_CALL_HREF,
                });
              }}
              className="btn-primary"
            >
              <CalendarDays className="h-4 w-4" aria-hidden />
              Book Business Discovery
            </a>
          </div>
        </div>
      ) : null}
    </div>
  );
}
