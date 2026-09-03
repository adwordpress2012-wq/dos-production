"use client";

import Script from "next/script";
import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";

const FORM_ID = "399ZbraszVa1Pmwf4SL8";
const IFRAME_ID = `popup-${FORM_ID}`;
const OPEN_EVENT = "dos:open-super-micah-lead-form";

function showExistingPopup(): boolean {
  const iframe = document.getElementById(IFRAME_ID) as HTMLIFrameElement | null;
  const overlay = document.getElementById(`${IFRAME_ID}-overlay`);
  const container = document.getElementById(`${IFRAME_ID}-div`);

  if (!iframe || !overlay || !container) return false;

  overlay.style.display = "flex";
  container.style.display = "block";
  iframe.style.display = "block";
  iframe.style.opacity = "1";
  iframe.style.visibility = "visible";
  iframe.style.pointerEvents = "auto";
  iframe.style.left = "";
  return true;
}

export function openSuperMicahLeadForm() {
  window.dispatchEvent(new Event(OPEN_EVENT));
}

export function SuperMicahLeadFormTrigger({
  className,
  children,
  ...buttonProps
}: {
  className?: string;
  children: React.ReactNode;
} & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "type" | "onClick">) {
  return (
    <button
      type="button"
      onClick={openSuperMicahLeadForm}
      className={className}
      aria-haspopup="dialog"
      {...buttonProps}
    >
      {children}
    </button>
  );
}

export function SuperMicahLeadFormButton({ className = "" }: { className?: string }) {
  return (
    <SuperMicahLeadFormTrigger
      className={`btn-primary inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold text-white ${className}`}
    >
      Let’s Chat
      <ArrowRight className="h-4 w-4" aria-hidden />
    </SuperMicahLeadFormTrigger>
  );
}

export function SuperMicahLeadFormPopup() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const openPopup = () => {
      if (!showExistingPopup()) setMounted(true);
    };

    window.addEventListener(OPEN_EVENT, openPopup);
    return () => window.removeEventListener(OPEN_EVENT, openPopup);
  }, []);

  if (!mounted) return null;

  return (
    <>
      <iframe
        src="https://app.directiveos.com.au/widget/form/399ZbraszVa1Pmwf4SL8"
        style={{ display: "none", width: "100%", height: "100%", border: "none", borderRadius: "20px" }}
        id={IFRAME_ID}
        data-layout="{'id':'POPUP'}"
        data-trigger-type="alwaysShow"
        data-trigger-value=""
        data-activation-type="alwaysActivated"
        data-activation-value=""
        data-deactivation-type="neverDeactivate"
        data-deactivation-value=""
        data-form-name="Super Micah Lead Capture Form - DOS MAIN"
        data-height="1393"
        data-layout-iframe-id={IFRAME_ID}
        data-form-id={FORM_ID}
        data-cookie-consent="true"
        data-cookie-consent-provider="auto"
        title="Super Micah Lead Capture Form - DOS MAIN"
        data-modal-height="500"
      />
      <Script
        id="super-micah-lead-form-loader"
        src="https://app.directiveos.com.au/js/form_embed.js"
        strategy="afterInteractive"
      />
    </>
  );
}
