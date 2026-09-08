"use client";

import { useEffect, useRef } from "react";

const WC_ID = "6a6402f720cc16c7919fc5b9";

// Mount the provider's actual widget here; no custom orb graphics or controls.
export default function HeroWcScript() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;
    const placeWidget = () => {
      const widget = Array.from(document.querySelectorAll<HTMLElement & { widgetId?: string }>("chat-widget"))
        .find((element) => element.widgetId === WC_ID);
      if (widget && widget.parentElement !== mount) mount.appendChild(widget);
    };
    const observer = new MutationObserver(placeWidget);
    observer.observe(document.body, { childList: true, subtree: true });
    window.addEventListener("LC_chatWidgetLoaded", placeWidget);
    placeWidget();

    // next/script deduplicates by src; both distinct widgets use the same loader URL.
    // A native script preserves the provider's separate data-widget-id initialisation.
    let script = document.querySelector<HTMLScriptElement>(`script[data-widget-id="${WC_ID}"]`);
    const ownsScript = !script;
    if (!script) {
      script = document.createElement("script");
      script.src = "https://widgets.leadconnectorhq.com/loader.js";
      script.dataset.resourcesUrl = "https://widgets.leadconnectorhq.com/chat-widget/loader.js";
      script.dataset.widgetId = WC_ID;
      script.async = true;
      mount.appendChild(script);
    }
    return () => {
      observer.disconnect();
      window.removeEventListener("LC_chatWidgetLoaded", placeWidget);
      if (ownsScript) script?.remove();
    };
  }, []);

  return <div ref={mountRef} data-dos-hero-wc style={{ width: "100%" }} />;
}
