"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { CalendarDays, MessageCircle, Phone, X } from "lucide-react";
import { DISCOVERY_CALL_HREF } from "@/app/lib/booking";
import { trackDosEvent } from "@/app/lib/analytics";

type MicahContextValue = {
  openMicah: (context?: string) => void;
};

const MicahContext = createContext<MicahContextValue | null>(null);
const MICAH_PHONE_HREF = "tel:0259506382";

function findWidgetLauncher(root: Document | ShadowRoot): HTMLElement | null {
  const selectors = [
    'button[aria-label*="chat" i]',
    'button[title*="chat" i]',
    '[role="button"][aria-label*="chat" i]',
    ".lc_text-widget--btn",
    '[class*="chat-widget"] button',
  ];

  for (const selector of selectors) {
    const element = root.querySelector<HTMLElement>(selector);
    if (element) return element;
  }

  for (const element of Array.from(root.querySelectorAll<HTMLElement>("*"))) {
    if (element.shadowRoot) {
      const nested = findWidgetLauncher(element.shadowRoot);
      if (nested) return nested;
    }
  }

  return null;
}

export function MicahExperienceProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [context, setContext] = useState("site");
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  const closeModal = useCallback(() => {
    setOpen(false);
    window.setTimeout(() => previousFocusRef.current?.focus(), 0);
  }, []);

  const openMicah = useCallback((source = "site") => {
    previousFocusRef.current = document.activeElement as HTMLElement | null;
    setContext(source);
    setOpen(true);
    trackDosEvent("micah_modal_open", { source });
  }, []);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.setTimeout(() => closeRef.current?.focus(), 0);

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        closeModal();
        return;
      }

      if (event.key !== "Tab" || !dialogRef.current) return;

      const focusable = Array.from(
        dialogRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
        )
      );

      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [closeModal, open]);

  function openChatWidget() {
    trackDosEvent("micah_chat_open", { source: context });
    closeModal();

    window.setTimeout(() => {
      const launcher = findWidgetLauncher(document);
      if (launcher) {
        launcher.click();
        return;
      }

      window.open("https://chatos.com.au", "_blank", "noopener,noreferrer");
    }, 80);
  }

  return (
    <MicahContext.Provider value={{ openMicah }}>
      {children}

      {open ? (
        <div
          className="fixed inset-0 z-[100] grid place-items-center overflow-y-auto bg-[#050611]/85 px-4 py-8 backdrop-blur-md"
          role="presentation"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) closeModal();
          }}
        >
          <div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="micah-dialog-title"
            aria-describedby="micah-dialog-description"
            className="glass-strong relative w-full max-w-lg rounded-[1.75rem] p-6 shadow-[0_28px_100px_-30px_rgba(124,58,237,0.65)] sm:p-8"
          >
            <button
              ref={closeRef}
              type="button"
              onClick={closeModal}
              className="absolute right-4 top-4 inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.05] text-white transition hover:bg-white/10"
              aria-label="Close Talk to Micah options"
            >
              <X className="h-5 w-5" aria-hidden />
            </button>

            <p className="eyebrow">Talk to Micah</p>
            <h2 id="micah-dialog-title" className="mt-4 pr-12 text-3xl font-semibold tracking-tight text-white">
              Choose how you would like to connect.
            </h2>
            <p id="micah-dialog-description" className="mt-3 text-sm leading-relaxed text-ink-muted">
              Chat now, call Micah on the official DOS phone pathway, or book a Business Discovery with the DOS team.
            </p>

            <div className="mt-7 grid gap-3">
              <button
                type="button"
                onClick={openChatWidget}
                className="choice-card"
              >
                <span className="choice-icon bg-violet-500/15 text-violet-200">
                  <MessageCircle className="h-5 w-5" aria-hidden />
                </span>
                <span>
                  <strong>Chat with Micah</strong>
                  <small>Open the Smart Chat Widget on this page.</small>
                </span>
              </button>

              <a
                href={MICAH_PHONE_HREF}
                onClick={() => trackDosEvent("phone_call_click", { source: context, destination: MICAH_PHONE_HREF })}
                className="choice-card"
              >
                <span className="choice-icon bg-fuchsia-500/15 text-fuchsia-200">
                  <Phone className="h-5 w-5" aria-hidden />
                </span>
                <span>
                  <strong>Call Micah</strong>
                  <small>Use the current official Micah phone line.</small>
                </span>
              </a>

              <a
                href={DISCOVERY_CALL_HREF}
                target="_blank"
                rel="noreferrer"
                onClick={() =>
                  trackDosEvent("calendar_open", {
                    source: context,
                    destination: DISCOVERY_CALL_HREF,
                  })
                }
                className="choice-card"
              >
                <span className="choice-icon bg-teal-400/15 text-teal-200">
                  <CalendarDays className="h-5 w-5" aria-hidden />
                </span>
                <span>
                  <strong>Book Business Discovery</strong>
                  <small>Choose a time to discuss your business with DOS.</small>
                </span>
              </a>
            </div>

            <p className="mt-5 text-xs leading-relaxed text-ink-dim">
              Browser voice calling is not active yet. The Call option uses the official phone pathway.
            </p>
          </div>
        </div>
      ) : null}
    </MicahContext.Provider>
  );
}

export function useMicahExperience() {
  const value = useContext(MicahContext);
  if (!value) throw new Error("useMicahExperience must be used inside MicahExperienceProvider");
  return value;
}
