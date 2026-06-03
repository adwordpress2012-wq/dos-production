(function () {
  if (window.__micahWidgetLoaded) return;
  window.__micahWidgetLoaded = true;

  var scriptTag = document.currentScript || document.querySelector('script[src*="micah-widget.js"]');
  var clientId = (scriptTag && scriptTag.getAttribute("data-client-id")) || "micah-demo";
  var configuredApiBase = (scriptTag && scriptTag.getAttribute("data-api-base")) || "";
  var scriptOrigin = "";
  try {
    scriptOrigin = scriptTag && scriptTag.src ? new URL(scriptTag.src, window.location.href).origin : "";
  } catch (error) {
    scriptOrigin = "";
  }
  var PRODUCTION_MICAH_ORIGIN = "https://chatos.com.au";
  var hostn = (window.location && window.location.hostname) || "";
  var apiBase = (configuredApiBase || scriptOrigin || "").replace(/\/$/, "");
  if (!apiBase) {
    if (hostn === "localhost" || hostn === "127.0.0.1") {
      apiBase = window.location.origin;
    } else {
      apiBase = PRODUCTION_MICAH_ORIGIN;
    }
  }
  var widgetVersion = "2026-05-09";
  var widgetDiagBuild = "diag-v3";
  var openingMessage =
    "Hi, I’m Micah from DOS. DOS helps small businesses turn enquiries, bookings, orders and follow-ups into simple operating systems. I can help capture a few details so Jaze can review your business and contact you.";
  var quickOptions = [
    "Start Operational Discovery",
    "Request a callback",
    "Ask about DOS",
    "Website rebuild help",
  ];
  var visitorIdKey = "micah_visitor_id";
  var legacyVisitorIdKey = "micah_widget_visitor_id";
  var visitorId = "";
  try {
    visitorId = localStorage.getItem(visitorIdKey) || localStorage.getItem(legacyVisitorIdKey) || "";
    if (!visitorId) {
      visitorId = window.crypto && window.crypto.randomUUID
        ? "visitor_" + window.crypto.randomUUID()
        : "visitor_" + Math.random().toString(36).slice(2, 10);
    }
    localStorage.setItem(visitorIdKey, visitorId);
    localStorage.removeItem(legacyVisitorIdKey);
  } catch (error) {
    visitorId = visitorId || "visitor_" + Math.random().toString(36).slice(2, 10);
  }
  window.__micahVisitorId = visitorId;
  var clientConversation = [];

  function sendDiagnostic(eventType, extra) {
    try {
      fetch(apiBase + "/api/widget/ping", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          visitorId: visitorId,
          clientId: clientId,
          pageUrl: window.location.href,
          widgetVersion: widgetVersion,
          eventType: eventType,
          details: extra || "",
        }),
      }).catch(function () {});
    } catch (error) {}
  }

  function sendImageBeacon(eventType, extra) {
    try {
      var img = new Image();
      var query =
        "?eventType=" +
        encodeURIComponent(eventType || "") +
        "&details=" +
        encodeURIComponent(extra || "") +
        "&clientId=" +
        encodeURIComponent(clientId || "") +
        "&visitorId=" +
        encodeURIComponent(visitorId || "") +
        "&widgetVersion=" +
        encodeURIComponent(widgetVersion || "") +
        "&pageUrl=" +
        encodeURIComponent(window.location.href || "");
      img.src = apiBase + "/api/widget/ping" + query;
    } catch (error) {}
  }

  sendDiagnostic("widget_loaded", widgetDiagBuild);
  sendImageBeacon("widget_script_executed", widgetVersion);
  try {
    window.addEventListener("error", function (event) {
      var message = (event && event.message) || "unknown_error";
      sendDiagnostic("window_error", message);
    });
    window.addEventListener("unhandledrejection", function (event) {
      var reason = event && event.reason;
      sendDiagnostic("unhandled_rejection", typeof reason === "string" ? reason : "non_string_reason");
    });
  } catch (error) {}

  try {
    var style = document.createElement("style");
    style.textContent = `
    .micah-widget-wrap{position:fixed;right:18px;bottom:20px;z-index:99999;font-family:Inter,Arial,sans-serif}
    .micah-widget-btn{
      border:1px solid rgba(196,181,253,.26);
      border-radius:999px;
      padding:12px 18px;
      background:rgba(10,13,24,.86);
      color:#f8fafc;
      font-weight:650;
      font-size:14px;
      letter-spacing:.01em;
      cursor:pointer;
      backdrop-filter:blur(14px);
      box-shadow:0 14px 34px rgba(0,0,0,.32),0 0 24px rgba(124,58,237,.20);
      transition:transform .22s ease,box-shadow .25s ease,filter .25s ease;
      position:relative;
      isolation:isolate;
      min-width:0;
    }
    .micah-widget-btn:hover{
      transform:translateY(-1px);
      filter:saturate(1.12);
      box-shadow:0 16px 38px rgba(0,0,0,.38),0 0 30px rgba(139,92,246,.28);
    }
    .micah-widget-btn:active{transform:translateY(0)}
    .micah-widget-btn::before{
      content:"";
      position:absolute;
      inset:-1px;
      border-radius:inherit;
      z-index:-1;
      background:linear-gradient(120deg,rgba(167,139,250,.22),rgba(45,212,191,.16));
      filter:blur(10px);
      opacity:.48;
      pointer-events:none;
    }
    .micah-widget-panel{width:min(372px,calc(100vw - 24px));height:min(560px,calc(100vh - 90px));display:none;flex-direction:column;background:rgba(7,10,18,.97);border:1px solid rgba(196,181,253,.16);backdrop-filter:blur(18px);border-radius:20px;box-shadow:0 22px 70px rgba(0,0,0,.48),0 0 34px rgba(124,58,237,.20)}
    .micah-widget-head{padding:14px 16px;border-bottom:1px solid rgba(255,255,255,.08);font-weight:700;color:#f8fafc}
    .micah-widget-messages{flex:1;overflow:auto;padding:12px;display:flex;flex-direction:column;gap:8px}
    .micah-msg{max-width:86%;padding:10px 12px;border-radius:12px;font-size:14px;line-height:1.4}
    .micah-msg.user{align-self:flex-end;background:#4c1d95;color:#fff}
    .micah-msg.bot{align-self:flex-start;background:rgba(255,255,255,.06);color:#e5e7eb;border:1px solid rgba(255,255,255,.06)}
    .micah-widget-options{display:flex;flex-wrap:wrap;gap:8px;padding:0 12px 10px}
    .micah-widget-option{border:1px solid rgba(196,181,253,.18);border-radius:999px;background:rgba(255,255,255,.04);color:#ddd6fe;font-size:12px;font-weight:600;padding:7px 10px;cursor:pointer;transition:background .2s ease,border-color .2s ease}
    .micah-widget-option:hover{background:rgba(139,92,246,.16);border-color:rgba(196,181,253,.34)}
    .micah-widget-inputwrap{padding:10px;border-top:1px solid rgba(255,255,255,.08);display:flex;gap:8px}
    .micah-widget-input{flex:1;border-radius:12px;border:1px solid rgba(255,255,255,.12);background:#111827;color:#fff;padding:10px 12px;outline:none}
    .micah-widget-send{border:none;border-radius:12px;background:#c4b5fd;color:#120f1f;font-weight:700;padding:10px 12px;cursor:pointer}
    .micah-widget-note{font-size:11px;color:#8a93a8;padding:0 12px 10px;line-height:1.45}
    @media (max-width:640px){
      .micah-widget-wrap{right:10px;left:10px;bottom:12px}
      .micah-widget-panel{width:100%;height:70vh}
      .micah-widget-btn{width:100%;padding:14px 18px;min-width:0}
    }
  `;
    document.head.appendChild(style);

    var wrap = document.createElement("div");
    wrap.className = "micah-widget-wrap";
    wrap.innerHTML = `
    <button class="micah-widget-btn" type="button">Ask Micah</button>
    <div class="micah-widget-panel">
      <div class="micah-widget-head">Micah from DOS</div>
      <div class="micah-widget-messages">
        <div class="micah-msg bot">${openingMessage}</div>
      </div>
      <div class="micah-widget-options"></div>
      <div class="micah-widget-note">Micah collects enquiry details for review. DOS does not provide pricing or promise outcomes through chat.</div>
      <div class="micah-widget-inputwrap">
        <input class="micah-widget-input" type="text" placeholder="Tell Micah what workflow needs help..." />
        <button class="micah-widget-send" type="button">Send</button>
      </div>
    </div>
  `;
    document.body.appendChild(wrap);

    var btn = wrap.querySelector(".micah-widget-btn");
    var panel = wrap.querySelector(".micah-widget-panel");
    var messages = wrap.querySelector(".micah-widget-messages");
    var options = wrap.querySelector(".micah-widget-options");
    var input = wrap.querySelector(".micah-widget-input");
    var send = wrap.querySelector(".micah-widget-send");
    var open = false;

    if (!btn || !panel || !messages || !input || !send) {
      sendDiagnostic("widget_init_error", "missing_dom_nodes");
      return;
    }

    btn.addEventListener("click", function () {
      open = !open;
      panel.style.display = open ? "flex" : "none";
      sendDiagnostic("toggle_panel", open ? "open" : "closed");
    });

    if (options) {
      quickOptions.forEach(function (label) {
        var option = document.createElement("button");
        option.className = "micah-widget-option";
        option.type = "button";
        option.textContent = label;
        option.addEventListener("click", function () {
          input.value = label;
          sendDiagnostic("quick_option_click", label);
          sendMessage();
        });
        options.appendChild(option);
      });
    }

  function addMessage(text, role) {
    var item = document.createElement("div");
    item.className = "micah-msg " + role;
    item.textContent = text;
    messages.appendChild(item);
    messages.scrollTop = messages.scrollHeight;
    clientConversation.push({
      direction: role === "bot" ? "outbound" : "inbound",
      message: text,
    });
    if (clientConversation.length > 8) {
      clientConversation = clientConversation.slice(-8);
    }
  }

  var sending = false;

  async function sendMessage() {
    var text = input.value.trim();
    if (!text || sending) return;
    sending = true;
    sendDiagnostic("send_message_invoked", "chars=" + text.length);
    sendDiagnostic("send_attempt", "chars=" + text.length);
    input.value = "";
    addMessage(text, "user");
    addMessage("Micah is typing...", "bot");
    var loadingNode = messages.lastChild;

    try {
      var response = await fetch(apiBase + "/api/widget/message", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: text,
          visitorId: visitorId,
          pageUrl: window.location.href,
          clientId: clientId,
          recentMessages: clientConversation.slice(-8),
        }),
      });
      if ((!response || !response.ok) && apiBase !== PRODUCTION_MICAH_ORIGIN) {
        sendDiagnostic("message_retry_production", "status=" + ((response && response.status) || "none"));
        response = await fetch(PRODUCTION_MICAH_ORIGIN + "/api/widget/message", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            message: text,
            visitorId: visitorId,
            pageUrl: window.location.href,
            clientId: clientId,
            recentMessages: clientConversation.slice(-8),
          }),
        });
      }
      var json = await response.json();
      sendDiagnostic("send_success", "status=" + response.status);
      if (loadingNode) loadingNode.remove();
      addMessage((json && json.reply) || "Sorry, I could not reply right now.", "bot");
    } catch (error) {
      console.error("micahWidgetError", error);
      var response = null;
      var json = null;
      if (apiBase !== PRODUCTION_MICAH_ORIGIN) {
        try {
          sendDiagnostic("message_catch_retry_production", (error && error.message) || "unknown_error");
          response = await fetch(PRODUCTION_MICAH_ORIGIN + "/api/widget/message", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              message: text,
              visitorId: visitorId,
              pageUrl: window.location.href,
              clientId: clientId,
              recentMessages: clientConversation.slice(-8),
            }),
          });
          json = await response.json();
        } catch (error2) {
          error = error2;
        }
      }
      if (!json) {
        sendDiagnostic("send_failure", (error && error.message) || "unknown_error");
        if (loadingNode) loadingNode.remove();
        addMessage("Sorry, something went wrong. Please try again.", "bot");
      } else {
        sendDiagnostic("send_success_after_retry", "status=" + (response && response.status));
        if (loadingNode) loadingNode.remove();
        addMessage((json && json.reply) || "Sorry, I could not reply right now.", "bot");
      }
    } finally {
      sending = false;
    }
  }

    send.addEventListener("click", function () {
      sendDiagnostic("send_button_click", "inputChars=" + (input.value || "").trim().length);
      sendMessage();
    });
    input.addEventListener("keydown", function (event) {
      if (event.key === "Enter") {
        event.preventDefault();
        sendDiagnostic("enter_key_send", "inputChars=" + (input.value || "").trim().length);
        sendMessage();
      }
    });

    sendDiagnostic("widget_handlers_attached", widgetVersion);
  } catch (error) {
    sendDiagnostic("widget_init_exception", (error && error.message) || "unknown_init_error");
  }
})();
