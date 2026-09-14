import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { Link } from "wouter";
import { CalendarCheck, MessageCircle, SendHorizontal, X } from "lucide-react";

/* Floating "Fyro Assistant" chat. Talks to POST /api/chat, which answers
   questions and books free demos on the real calendar. */

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
  error?: boolean; // local-only error bubble, never sent to the API
  booked?: { label: string; date: string };
};

const OPEN_EVENT = "fyro:open-chat";

/** Open the chat panel from anywhere; optionally send `message` as the visitor. */
export function openChat(message?: string) {
  window.dispatchEvent(new CustomEvent(OPEN_EVENT, { detail: { message } }));
}

const GREETING =
  "Hi! I'm Fyro's AI assistant. Want to see how an AI agent could work in your business? I can answer questions or book you a free demo in under a minute.";
const QUICK_REPLIES = [
  "Book a free demo",
  "What do you build?",
  "Speed-to-lead call agent",
  "RFP agent for gov contractors",
];
const STORAGE_KEY = "fyro-chat-messages-v1";
const TEASER_KEY = "fyro-chat-teaser-seen";
const MAX_CHARS = 2000;
const MAX_SENT = 20;

function readStored(): ChatMessage[] {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    const parsed = raw ? (JSON.parse(raw) as unknown) : [];
    return Array.isArray(parsed)
      ? parsed.filter(
          (m): m is ChatMessage =>
            m && (m.role === "user" || m.role === "assistant") && typeof m.content === "string",
        )
      : [];
  } catch {
    return [];
  }
}

function sessionFlag(key: string, set?: boolean): boolean {
  try {
    if (set) sessionStorage.setItem(key, "1");
    return sessionStorage.getItem(key) === "1";
  } catch {
    return Boolean(set);
  }
}

/* Turn "/contact", "fyroagents.com/contact" and email addresses into links.
   Everything else renders as plain text (no HTML injection possible). */
const LINK_RE =
  /([A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,})|((?:https?:\/\/)?(?:www\.)?(?:fyroagents\.com)?\/contact\b)/g;

function renderText(text: string, onNavigate: () => void): ReactNode[] {
  const clean = text.replace(/\*\*(.+?)\*\*/g, "$1");
  const out: ReactNode[] = [];
  let last = 0;
  const re = new RegExp(LINK_RE.source, "g");
  let match: RegExpExecArray | null;
  while ((match = re.exec(clean)) !== null) {
    const idx = match.index;
    if (idx > last) out.push(clean.slice(last, idx));
    const [whole, email] = match;
    if (email) {
      out.push(
        <a key={idx} href={`mailto:${email}`} className="fyro-chat-link">
          {email}
        </a>,
      );
    } else {
      out.push(
        <Link key={idx} href="/contact" className="fyro-chat-link" onClick={onNavigate}>
          {whole}
        </Link>,
      );
    }
    last = idx + whole.length;
  }
  if (last < clean.length) out.push(clean.slice(last));
  return out;
}

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>(readStored);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const [teaser, setTeaser] = useState(false);

  const inputRef = useRef<HTMLTextAreaElement>(null);
  const launcherRef = useRef<HTMLButtonElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const messagesRef = useRef(messages);
  const sendingRef = useRef(false);
  messagesRef.current = messages;

  // Persist the conversation for this browser session.
  useEffect(() => {
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
    } catch {
      /* storage unavailable: conversation just won't survive a reload */
    }
  }, [messages]);

  // Auto-scroll to the newest message / typing indicator.
  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages, sending, open]);

  // Teaser bubble after ~8s, once per session, only if the chat hasn't been used.
  useEffect(() => {
    if (sessionFlag(TEASER_KEY) || messagesRef.current.length > 0) return;
    const t = window.setTimeout(() => {
      setTeaser(true);
      sessionFlag(TEASER_KEY, true);
    }, 8000);
    return () => window.clearTimeout(t);
  }, []);

  const openPanel = useCallback(() => {
    setOpen(true);
    setTeaser(false);
    sessionFlag(TEASER_KEY, true);
  }, []);

  const closePanel = useCallback(() => {
    setOpen(false);
    launcherRef.current?.focus();
  }, []);

  // Focus the input on open; Esc closes.
  useEffect(() => {
    if (!open) return;
    const t = window.setTimeout(() => inputRef.current?.focus(), 50);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closePanel();
    };
    document.addEventListener("keydown", onKey);
    return () => {
      window.clearTimeout(t);
      document.removeEventListener("keydown", onKey);
    };
  }, [open, closePanel]);

  // Keep the textarea sized to its content (up to a cap).
  useEffect(() => {
    const el = inputRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${Math.min(el.scrollHeight, 120)}px`;
  }, [input, open]);

  const send = useCallback(async (raw: string) => {
    const text = raw.trim().slice(0, MAX_CHARS);
    if (!text || sendingRef.current) return;

    const next: ChatMessage[] = [...messagesRef.current, { role: "user", content: text }];
    setMessages(next);
    setInput("");
    setSending(true);
    sendingRef.current = true;

    try {
      const payload = next
        .filter((m) => !m.error)
        .slice(-MAX_SENT)
        .map(({ role, content }) => ({ role, content }));
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: payload }),
      });
      const data = (await res.json().catch(() => ({}))) as {
        reply?: string;
        booked?: { label: string; date: string };
        error?: string;
      };
      if (!res.ok || !data.reply) throw new Error(data.error || "Request failed");
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.reply!, ...(data.booked ? { booked: data.booked } : {}) },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          error: true,
          content:
            "Sorry, I couldn't connect just now. You can book a free demo at /contact or email rj@fyroagents.com.",
        },
      ]);
    } finally {
      setSending(false);
      sendingRef.current = false;
      window.setTimeout(() => inputRef.current?.focus(), 0);
    }
  }, []);

  // Page buttons can open the chat (and optionally send a first message).
  useEffect(() => {
    const onOpen = (e: Event) => {
      openPanel();
      const message = (e as CustomEvent<{ message?: string } | undefined>).detail?.message;
      if (typeof message === "string" && message.trim()) void send(message);
    };
    window.addEventListener(OPEN_EVENT, onOpen);
    return () => window.removeEventListener(OPEN_EVENT, onOpen);
  }, [openPanel, send]);

  const onNavigate = useCallback(() => {
    if (window.matchMedia("(max-width: 479px)").matches) setOpen(false);
  }, []);

  const showChips = !messages.some((m) => m.role === "user");

  return (
    <>
      <style>{CSS}</style>

      {teaser && !open && (
        <div className="fyro-chat-teaser" role="status">
          <button type="button" className="fyro-chat-teaser-text" onClick={openPanel}>
            Want a free demo? Ask me anything.
          </button>
          <button
            type="button"
            className="fyro-chat-teaser-close"
            aria-label="Dismiss"
            onClick={() => setTeaser(false)}
          >
            <X size={14} aria-hidden="true" />
          </button>
        </div>
      )}

      <button
        ref={launcherRef}
        type="button"
        className={`fyro-chat-launcher${open ? " is-open" : ""}`}
        aria-label={open ? "Close Fyro Assistant chat" : "Open Fyro Assistant chat"}
        aria-expanded={open}
        aria-controls="fyro-chat-panel"
        onClick={open ? closePanel : openPanel}
      >
        {open ? <X size={24} aria-hidden="true" /> : <MessageCircle size={26} aria-hidden="true" />}
      </button>

      {open && (
        <section id="fyro-chat-panel" className="fyro-chat-panel" role="dialog" aria-label="Fyro Assistant chat">
          <header className="fyro-chat-header">
            <img src="/brand/fyro-mark.png" alt="" className="fyro-chat-mark" />
            <div className="fyro-chat-title">
              <span>Fyro Assistant</span>
              <span className="fyro-chat-status">
                <span className="fyro-chat-dot" aria-hidden="true" /> online
              </span>
            </div>
            <button type="button" className="fyro-chat-close" aria-label="Close chat" onClick={closePanel}>
              <X size={18} aria-hidden="true" />
            </button>
          </header>

          <div ref={scrollRef} className="fyro-chat-body" aria-live="polite">
            <div className="fyro-chat-bubble is-assistant">{GREETING}</div>

            {messages.map((m, i) => (
              <div key={i} className={`fyro-chat-row is-${m.role}`}>
                <div className={`fyro-chat-bubble is-${m.role}${m.error ? " is-error" : ""}`}>
                  {m.role === "assistant" ? renderText(m.content, onNavigate) : m.content}
                </div>
                {m.booked && (
                  <div className="fyro-chat-booked">
                    <CalendarCheck size={14} aria-hidden="true" /> Demo booked: {m.booked.date}, {m.booked.label}
                  </div>
                )}
              </div>
            ))}

            {showChips && !sending && (
              <div className="fyro-chat-chips">
                {QUICK_REPLIES.map((q) => (
                  <button key={q} type="button" className="fyro-chat-chip" onClick={() => void send(q)}>
                    {q}
                  </button>
                ))}
              </div>
            )}

            {sending && (
              <div
                className="fyro-chat-bubble is-assistant fyro-chat-typing"
                role="status"
                aria-label="Assistant is typing"
              >
                <span />
                <span />
                <span />
              </div>
            )}
          </div>

          <form
            className="fyro-chat-form"
            onSubmit={(e) => {
              e.preventDefault();
              void send(input);
            }}
          >
            <textarea
              ref={inputRef}
              className="fyro-chat-input"
              rows={1}
              value={input}
              maxLength={MAX_CHARS}
              placeholder={sending ? "Thinking…" : "Type your message…"}
              aria-label="Message the Fyro Assistant"
              disabled={sending}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey && !e.nativeEvent.isComposing) {
                  e.preventDefault();
                  void send(input);
                }
              }}
            />
            <button
              type="submit"
              className="fyro-chat-send"
              aria-label="Send message"
              disabled={sending || !input.trim()}
            >
              <SendHorizontal size={18} aria-hidden="true" />
            </button>
          </form>
        </section>
      )}
    </>
  );
}

const CSS = `
.fyro-chat-launcher {
  position: fixed; right: 24px; bottom: 24px; z-index: 1000;
  width: 58px; height: 58px; border-radius: 50%; border: none;
  display: flex; align-items: center; justify-content: center;
  background: var(--fyro-orange); color: #fff; cursor: pointer;
  box-shadow: 0 8px 24px rgba(0,0,0,0.45);
  transition: transform .15s ease, background .15s ease;
}
.fyro-chat-launcher:hover { background: var(--fyro-orange-bright, var(--fyro-orange)); transform: scale(1.05); }
.fyro-chat-launcher:focus-visible { outline: 2px solid #fff; outline-offset: 3px; }
.fyro-chat-launcher:not(.is-open)::after {
  content: ""; position: absolute; inset: 0; border-radius: 50%;
  box-shadow: 0 0 0 0 rgba(248,121,4,0.55);
  animation: fyro-chat-pulse 2.6s ease-out infinite; pointer-events: none;
}
@keyframes fyro-chat-pulse {
  0% { box-shadow: 0 0 0 0 rgba(248,121,4,0.5); }
  70%, 100% { box-shadow: 0 0 0 16px rgba(248,121,4,0); }
}

.fyro-chat-teaser {
  position: fixed; right: 92px; bottom: 34px; z-index: 1000;
  display: flex; align-items: center; gap: 4px; max-width: calc(100vw - 124px);
  background: var(--fyro-panel); border: 1px solid var(--fyro-border); border-radius: 12px;
  box-shadow: 0 8px 24px rgba(0,0,0,0.45); padding: 4px 4px 4px 0;
  animation: fyro-chat-in .25s ease-out;
}
.fyro-chat-teaser-text {
  background: none; border: none; color: var(--fyro-near-black); cursor: pointer; text-align: left;
  font-family: 'DM Sans', system-ui, sans-serif; font-size: .875rem; padding: 6px 4px 6px 12px;
}
.fyro-chat-teaser-close {
  background: none; border: none; color: var(--fyro-gray-mid); cursor: pointer;
  width: 26px; height: 26px; border-radius: 6px; display: flex; align-items: center; justify-content: center; flex: none;
}
.fyro-chat-teaser-close:hover { color: var(--fyro-near-black); background: var(--fyro-border); }

.fyro-chat-panel {
  position: fixed; right: 24px; bottom: 96px; z-index: 1000;
  width: 380px; height: 560px; max-height: calc(100vh - 120px); max-height: calc(100dvh - 120px);
  display: flex; flex-direction: column; overflow: hidden;
  background: var(--fyro-bg); border: 1px solid var(--fyro-border); border-radius: 16px;
  box-shadow: 0 24px 60px rgba(0,0,0,0.6);
  font-family: 'DM Sans', system-ui, sans-serif; color: var(--fyro-near-black);
  animation: fyro-chat-in .2s ease-out;
}
@keyframes fyro-chat-in { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: none; } }

.fyro-chat-header {
  display: flex; align-items: center; gap: 10px; padding: 12px 12px 12px 16px;
  background: var(--fyro-panel); border-bottom: 1px solid var(--fyro-border);
}
.fyro-chat-mark { height: 22px; width: auto; }
.fyro-chat-title { display: flex; flex-direction: column; line-height: 1.2; flex: 1; min-width: 0; }
.fyro-chat-title > span:first-child { font-family: 'Inter', system-ui, sans-serif; font-weight: 700; font-size: .95rem; }
.fyro-chat-status { display: flex; align-items: center; gap: 5px; font-size: .72rem; color: var(--fyro-gray-mid); }
.fyro-chat-dot { width: 7px; height: 7px; border-radius: 50%; background: #22C55E; box-shadow: 0 0 6px rgba(34,197,94,.7); }
.fyro-chat-close {
  background: none; border: none; color: var(--fyro-gray-mid); cursor: pointer;
  width: 32px; height: 32px; border-radius: 8px; display: flex; align-items: center; justify-content: center;
}
.fyro-chat-close:hover { color: var(--fyro-near-black); background: var(--fyro-border); }

.fyro-chat-body {
  flex: 1; overflow-y: auto; padding: 16px; display: flex; flex-direction: column; gap: 10px;
  overscroll-behavior: contain;
}
.fyro-chat-row { display: flex; flex-direction: column; gap: 6px; }
.fyro-chat-row.is-user { align-items: flex-end; }
.fyro-chat-row.is-assistant { align-items: flex-start; }
.fyro-chat-bubble {
  max-width: 85%; padding: 10px 13px; border-radius: 14px;
  font-size: .9rem; line-height: 1.45; white-space: pre-wrap; overflow-wrap: anywhere;
}
.fyro-chat-bubble.is-assistant {
  align-self: flex-start; background: var(--fyro-panel); border: 1px solid var(--fyro-border);
  color: var(--fyro-near-black); border-bottom-left-radius: 4px;
}
.fyro-chat-bubble.is-user {
  background: var(--fyro-orange); color: #fff; border-bottom-right-radius: 4px;
}
.fyro-chat-bubble.is-error { border-color: rgba(248,121,4,.45); }
.fyro-chat-link { color: var(--fyro-orange); text-decoration: underline; text-underline-offset: 2px; }
.fyro-chat-booked {
  display: inline-flex; align-items: center; gap: 6px; font-size: .75rem; color: #4ADE80;
  background: rgba(34,197,94,.1); border: 1px solid rgba(34,197,94,.3); border-radius: 999px; padding: 3px 10px;
}

.fyro-chat-chips { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 2px; }
.fyro-chat-chip {
  background: transparent; color: var(--fyro-near-black); cursor: pointer;
  border: 1px solid var(--fyro-border); border-radius: 999px; padding: 7px 12px;
  font-family: 'DM Sans', system-ui, sans-serif; font-size: .8rem; transition: border-color .15s, color .15s;
}
.fyro-chat-chip:hover, .fyro-chat-chip:focus-visible { border-color: var(--fyro-orange); color: var(--fyro-orange); }

.fyro-chat-typing { display: flex; gap: 4px; align-items: center; padding: 13px 14px; }
.fyro-chat-typing span {
  width: 6px; height: 6px; border-radius: 50%; background: var(--fyro-gray-mid);
  animation: fyro-chat-dots 1.2s infinite ease-in-out;
}
.fyro-chat-typing span:nth-child(2) { animation-delay: .15s; }
.fyro-chat-typing span:nth-child(3) { animation-delay: .3s; }
@keyframes fyro-chat-dots { 0%, 80%, 100% { opacity: .3; transform: translateY(0); } 40% { opacity: 1; transform: translateY(-3px); } }

.fyro-chat-form {
  display: flex; align-items: flex-end; gap: 8px; padding: 10px 12px;
  border-top: 1px solid var(--fyro-border); background: var(--fyro-panel);
}
.fyro-chat-input {
  flex: 1; resize: none; min-height: 40px; max-height: 120px;
  background: var(--fyro-bg); color: var(--fyro-near-black);
  border: 1px solid var(--fyro-border); border-radius: 10px; padding: 9px 12px;
  font-family: 'DM Sans', system-ui, sans-serif; font-size: 16px; line-height: 1.35;
}
.fyro-chat-input:disabled { opacity: .6; }
.fyro-chat-send {
  flex: none; width: 40px; height: 40px; border-radius: 10px; border: none; cursor: pointer;
  background: var(--fyro-orange); color: #fff; display: flex; align-items: center; justify-content: center;
}
.fyro-chat-send:disabled { opacity: .4; cursor: default; }

@media (max-width: 479px) {
  .fyro-chat-launcher { right: 16px; bottom: 16px; width: 54px; height: 54px; }
  .fyro-chat-launcher.is-open { display: none; }
  .fyro-chat-teaser { right: 80px; bottom: 24px; max-width: calc(100vw - 96px); }
  .fyro-chat-panel {
    left: 16px; right: 16px; bottom: 16px; top: 16px;
    width: auto; height: auto; max-height: none;
  }
}
@media (prefers-reduced-motion: reduce) {
  .fyro-chat-launcher::after, .fyro-chat-typing span, .fyro-chat-panel, .fyro-chat-teaser { animation: none !important; }
}
`;
