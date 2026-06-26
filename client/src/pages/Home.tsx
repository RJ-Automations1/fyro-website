import { useState, useEffect, useRef } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Link } from "wouter";

// ─── RFP SLIDESHOW DATA ────────────────────────────────────────────────────
const RFP_STAGES = [
  {
    label: "STAGE 01 / DETECT",
    headline: "The agent finds the opportunity.",
    body: "Fyro's RFP agent continuously monitors government portals, procurement boards, and bid databases. The moment a matching opportunity drops, it flags it — no manual searching, no missed weekends.",
    tag: "SCANNING",
    step: "1 of 5",
    time: "00:03",
    items: [
      { label: "Portal scan", status: "done" },
      { label: "Keyword match", status: "done" },
      { label: "Deadline check", status: "active" },
      { label: "Routing", status: "pending" },
      { label: "Draft", status: "pending" },
    ],
  },
  {
    label: "STAGE 02 / CLASSIFY",
    headline: "It reads the whole thing so you don't have to.",
    body: "The agent parses the full RFP document — scope, requirements, deadlines, scoring criteria. It extracts what matters and scores your fit before a human ever opens the file.",
    tag: "CLASSIFYING",
    step: "2 of 5",
    time: "00:09",
    items: [
      { label: "Portal scan", status: "done" },
      { label: "Keyword match", status: "done" },
      { label: "Deadline check", status: "done" },
      { label: "Routing", status: "active" },
      { label: "Draft", status: "pending" },
    ],
  },
  {
    label: "STAGE 03 / SCORE",
    headline: "Every opportunity gets a score.",
    body: "Win probability, past performance alignment, resource requirements — the agent runs the numbers and surfaces only the bids worth pursuing. Your team focuses on work, not research.",
    tag: "SCORING",
    step: "3 of 5",
    time: "00:17",
    items: [
      { label: "Portal scan", status: "done" },
      { label: "Keyword match", status: "done" },
      { label: "Deadline check", status: "done" },
      { label: "Routing", status: "done" },
      { label: "Draft", status: "active" },
    ],
  },
  {
    label: "STAGE 04 / DRAFT",
    headline: "First draft ready before you sit down.",
    body: "Using your past proposals, company profile, and the RFP requirements, the agent generates a structured first draft — sections, compliance matrix, executive summary. You edit, not start from scratch.",
    tag: "DRAFTING",
    step: "4 of 5",
    time: "00:28",
    items: [
      { label: "Portal scan", status: "done" },
      { label: "Keyword match", status: "done" },
      { label: "Deadline check", status: "done" },
      { label: "Routing", status: "done" },
      { label: "Draft", status: "done" },
    ],
  },
  {
    label: "STAGE 05 / SUBMIT",
    headline: "Submitted. On time. Every time.",
    body: "The agent tracks the deadline, packages the final submission, and confirms delivery. You get a notification when it's done. No last-minute scrambles, no missed deadlines.",
    tag: "COMPLETE",
    step: "5 of 5",
    time: "00:41",
    items: [
      { label: "Portal scan", status: "done" },
      { label: "Keyword match", status: "done" },
      { label: "Deadline check", status: "done" },
      { label: "Routing", status: "done" },
      { label: "Draft", status: "done" },
    ],
  },
];

const SLIDE_DURATION = 5000;

// ─── RFP VIDEO PLAYER ─────────────────────────────────────────────────────
function RFPVideoPlayer() {
  const [playing, setPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handlePlay = () => {
    setPlaying(true);
    if (videoRef.current) {
      videoRef.current.play();
    }
  };

  const handleVideoClick = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play();
      setPlaying(true);
    } else {
      videoRef.current.pause();
      setPlaying(false);
    }
  };

  return (
    <div style={{ position: "relative", borderRadius: 12, overflow: "hidden", background: "#111", border: "1px solid #222", aspectRatio: "16/9", cursor: "pointer" }} onClick={handleVideoClick}>
      <video
        ref={videoRef}
        src="/manus-storage/rfp-agent-explainer_5aad9fa4.mp4"
        style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
        playsInline
        onEnded={() => setPlaying(false)}
        poster="https://d2xsxph8kpxj0f.cloudfront.net/310519663366503786/Jy3H4pVjyFrN8AFKZopyCY/rfp-video-frame1-ZSL3cSm5299UJtYv39oMfP.webp"
      />
      {/* Play overlay */}
      {!playing && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            background: "rgba(0,0,0,0.45)",
            backdropFilter: "blur(2px)",
          }}
          onClick={(e) => { e.stopPropagation(); handlePlay(); }}
        >
          {/* Live badge */}
          <div style={{ position: "absolute", top: 16, left: 16, display: "flex", alignItems: "center", gap: 6, background: "rgba(0,0,0,0.7)", border: "1px solid #333", borderRadius: 20, padding: "5px 12px" }}>
            <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#ef4444", display: "inline-block", boxShadow: "0 0 0 3px rgba(239,68,68,0.25)", animation: "pulse 1.5s infinite" }} />
            <span style={{ fontFamily: "monospace", fontSize: 10, color: "#ef4444", letterSpacing: "0.1em" }}>AGENT DEMO</span>
          </div>
          {/* Play button */}
          <button
            style={{
              width: 72,
              height: 72,
              borderRadius: "50%",
              background: "#ef4444",
              border: "none",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 0 0 12px rgba(239,68,68,0.15)",
              transition: "transform 0.15s ease, box-shadow 0.15s ease",
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.transform = "scale(1.08)"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.transform = "scale(1)"; }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M8 5.14v14l11-7-11-7z" fill="white" />
            </svg>
          </button>
          <p style={{ fontFamily: "monospace", fontSize: 11, color: "rgba(255,255,255,0.6)", marginTop: 16, letterSpacing: "0.1em" }}>CLICK TO PLAY</p>
        </div>
      )}
    </div>
  );
}

function StatusDot({ status }: { status: string }) {
  if (status === "done") return <span style={{ display: "inline-block", width: 10, height: 10, borderRadius: "50%", background: "#22c55e", flexShrink: 0 }} />;
  if (status === "active") return <span style={{ display: "inline-block", width: 10, height: 10, borderRadius: "50%", background: "#ef4444", flexShrink: 0, boxShadow: "0 0 0 3px rgba(239,68,68,0.25)" }} />;
  return <span style={{ display: "inline-block", width: 10, height: 10, borderRadius: "50%", background: "#d1d5db", flexShrink: 0 }} />;
}

function RFPSlideshow() {
  const [current, setCurrent] = useState(0);
  const [progress, setProgress] = useState(0);
  const [paused, setPaused] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const progressRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (paused) return;
    progressRef.current = setInterval(() => {
      setProgress(p => {
        if (p >= 100) return 0;
        return p + (100 / (SLIDE_DURATION / 50));
      });
    }, 50);
    intervalRef.current = setInterval(() => {
      setCurrent(c => (c + 1) % RFP_STAGES.length);
      setProgress(0);
    }, SLIDE_DURATION);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (progressRef.current) clearInterval(progressRef.current);
    };
  }, [paused, current]);

  const stage = RFP_STAGES[current];

  return (
    <section
      style={{ background: "#0a0a0a", padding: "100px 0" }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div style={{ maxWidth: 1400, margin: "0 auto", padding: "0 32px" }}>
        {/* Section label */}
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 48 }}>
          <span style={{ width: 32, height: 1, background: "#ef4444", display: "inline-block" }} />
          <span style={{ fontFamily: "monospace", fontSize: 11, letterSpacing: "0.15em", color: "#ef4444", textTransform: "uppercase" }}>Live RFP Agent</span>
        </div>

        {/* Stage tabs */}
        <div style={{ display: "flex", gap: 8, marginBottom: 48, flexWrap: "wrap" }}>
          {RFP_STAGES.map((s, i) => (
            <button
              key={i}
              onClick={() => { setCurrent(i); setProgress(0); }}
              style={{
                padding: "6px 14px",
                borderRadius: 20,
                border: i === current ? "1px solid #ef4444" : "1px solid #333",
                background: i === current ? "rgba(239,68,68,0.12)" : "transparent",
                color: i === current ? "#ef4444" : "#666",
                fontFamily: "monospace",
                fontSize: 11,
                letterSpacing: "0.1em",
                cursor: "pointer",
                transition: "all 0.2s",
              }}
            >
              {`0${i + 1}`}
            </button>
          ))}
        </div>

        {/* Two-column layout: copy | agent card */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "center" }} className="rfp-grid">
          {/* Col 1: copy */}
          <div>
            <p style={{ fontFamily: "monospace", fontSize: 11, letterSpacing: "0.15em", color: "#ef4444", textTransform: "uppercase", marginBottom: 20 }}>{stage.label}</p>
            <h2 style={{ fontSize: "clamp(22px, 2.5vw, 36px)", fontWeight: 700, color: "#fff", lineHeight: 1.15, marginBottom: 24 }}>{stage.headline}</h2>
            <p style={{ fontSize: 15, color: "#9ca3af", lineHeight: 1.75, marginBottom: 40 }}>{stage.body}</p>
            {/* Progress bar */}
            <div style={{ height: 2, background: "#1f1f1f", borderRadius: 2, overflow: "hidden" }}>
              <div style={{ height: "100%", background: "#ef4444", width: `${progress}%`, transition: "width 0.05s linear" }} />
            </div>
            <p style={{ fontFamily: "monospace", fontSize: 11, color: "#555", marginTop: 10 }}>{paused ? "PAUSED" : "AUTO-ADVANCING"} · HOVER TO PAUSE</p>
          </div>

          {/* Col 2: agent card */}
          <div style={{ background: "#111", border: "1px solid #222", borderRadius: 12, overflow: "hidden" }}>
            {/* Card header */}
            <div style={{ padding: "14px 20px", borderBottom: "1px solid #1a1a1a", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#ef4444", display: "inline-block", boxShadow: "0 0 0 3px rgba(239,68,68,0.2)" }} />
                <span style={{ fontFamily: "monospace", fontSize: 11, color: "#ef4444", letterSpacing: "0.1em" }}>{stage.tag}</span>
                <span style={{ fontFamily: "monospace", fontSize: 11, color: "#444" }}>·</span>
                <span style={{ fontFamily: "monospace", fontSize: 11, color: "#555" }}>RFP AGENT</span>
              </div>
              <span style={{ fontFamily: "monospace", fontSize: 11, color: "#444" }}>us-east-1</span>
            </div>

            {/* Steps */}
            <div style={{ padding: "24px 20px" }}>
              {stage.items.map((item, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 0", borderBottom: i < stage.items.length - 1 ? "1px solid #1a1a1a" : "none" }}>
                  <StatusDot status={item.status} />
                  <span style={{ fontFamily: "monospace", fontSize: 12, color: item.status === "done" ? "#9ca3af" : item.status === "active" ? "#fff" : "#444" }}>{item.label}</span>
                  {item.status === "active" && (
                    <span style={{ marginLeft: "auto", fontFamily: "monospace", fontSize: 10, color: "#ef4444", background: "rgba(239,68,68,0.1)", padding: "2px 8px", borderRadius: 4 }}>RUNNING</span>
                  )}
                </div>
              ))}
            </div>

            {/* Card footer */}
            <div style={{ padding: "14px 20px", borderTop: "1px solid #1a1a1a", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontFamily: "monospace", fontSize: 11, color: "#555" }}>STEP {stage.step}</span>
              <span style={{ fontFamily: "monospace", fontSize: 11, color: "#555" }}>{stage.time}</span>
            </div>
          </div>


        </div>
      </div>
    </section>
  );
}

// ─── TEXTING AGENT CARD ──────────────────────────────────────────────────
function TextingAgentCard() {
  const [step, setStep] = useState(0);
  const messages = [
    { from: "agent", text: "Hi Sarah! Your HVAC service is complete. How'd we do? Reply 1-5 ⭐" },
    { from: "customer", text: "5 stars! Great work as always 🙌" },
    { from: "agent", text: "Thanks Sarah! We'll schedule your fall tune-up in 6 months. See you then!" },
  ];
  useEffect(() => {
    const t = setInterval(() => setStep(x => (x + 1) % 4), 2000);
    return () => clearInterval(t);
  }, []);
  const visible = messages.slice(0, Math.min(step + 1, messages.length));
  return (
    <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 12, overflow: "hidden", boxShadow: "0 4px 24px rgba(0,0,0,0.06)" }}>
      <div style={{ padding: "12px 16px", borderBottom: "1px solid #f3f4f6", display: "flex", alignItems: "center", gap: 8 }}>
        <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#ef4444", display: "inline-block", animation: "pulse 2s infinite" }} />
        <span style={{ fontFamily: "monospace", fontSize: 10, color: "#ef4444", letterSpacing: "0.1em" }}>TEXTING AGENT · LIVE</span>
        <span style={{ marginLeft: "auto", fontFamily: "monospace", fontSize: 10, color: "#9ca3af" }}>2:41 PM</span>
      </div>
      <div style={{ padding: "14px 16px", background: "#f9fafb", borderBottom: "1px solid #f3f4f6" }}>
        <p style={{ fontFamily: "monospace", fontSize: 9, color: "#9ca3af", letterSpacing: "0.1em", marginBottom: 2 }}>TRIGGER</p>
        <p style={{ fontSize: 12, color: "#374151" }}>Job #4821 marked complete → auto-sequence started</p>
      </div>
      <div style={{ padding: "16px", minHeight: 160, display: "flex", flexDirection: "column", gap: 10 }}>
        {visible.map((msg, i) => (
          <div key={i} style={{ display: "flex", justifyContent: msg.from === "agent" ? "flex-start" : "flex-end" }}>
            <div style={{
              maxWidth: "80%", padding: "8px 12px", borderRadius: msg.from === "agent" ? "4px 12px 12px 12px" : "12px 4px 12px 12px",
              background: msg.from === "agent" ? "#ef4444" : "#f3f4f6",
              color: msg.from === "agent" ? "#fff" : "#111",
              fontSize: 12, lineHeight: 1.5,
            }}>{msg.text}</div>
          </div>
        ))}
        {step < messages.length && (
          <div style={{ display: "flex", gap: 4, padding: "4px 0" }}>
            {[0,1,2].map(i => <span key={i} style={{ width: 6, height: 6, borderRadius: "50%", background: "#d1d5db", display: "inline-block", animation: `pulse ${0.6 + i * 0.2}s infinite` }} />)}
          </div>
        )}
      </div>
      <div style={{ padding: "10px 16px", background: "#f9fafb", borderTop: "1px solid #f3f4f6", display: "flex", justifyContent: "space-between" }}>
        <span style={{ fontFamily: "monospace", fontSize: 10, color: "#6b7280" }}>100% follow-up rate</span>
        <span style={{ fontFamily: "monospace", fontSize: 10, color: "#22c55e" }}>✓ 24/7 automated</span>
      </div>
    </div>
  );
}
// ─── CRM AGENT CARD ──────────────────────────────────────────────────────
function CRMAgentCard() {
  const [active, setActive] = useState(0);
  const pipeline = [
    { label: "New Lead", count: 12, color: "#6366f1" },
    { label: "Qualified", count: 8, color: "#f59e0b" },
    { label: "Proposal", count: 5, color: "#ef4444" },
    { label: "Won", count: 3, color: "#22c55e" },
  ];
  useEffect(() => {
    const t = setInterval(() => setActive(x => (x + 1) % pipeline.length), 1800);
    return () => clearInterval(t);
  }, []);
  const maxCount = Math.max(...pipeline.map(p => p.count));
  return (
    <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 12, overflow: "hidden", boxShadow: "0 4px 24px rgba(0,0,0,0.06)" }}>
      <div style={{ padding: "12px 16px", borderBottom: "1px solid #f3f4f6", display: "flex", alignItems: "center", gap: 8 }}>
        <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#ef4444", display: "inline-block", animation: "pulse 2s infinite" }} />
        <span style={{ fontFamily: "monospace", fontSize: 10, color: "#ef4444", letterSpacing: "0.1em" }}>CRM AGENT · LIVE</span>
        <span style={{ marginLeft: "auto", fontFamily: "monospace", fontSize: 10, color: "#9ca3af" }}>TODAY</span>
      </div>
      <div style={{ padding: "16px" }}>
        <p style={{ fontFamily: "monospace", fontSize: 9, color: "#9ca3af", letterSpacing: "0.1em", marginBottom: 12 }}>LEAD PIPELINE · THIS WEEK</p>
        <div style={{ display: "flex", gap: 8, alignItems: "flex-end", height: 100, marginBottom: 12 }}>
          {pipeline.map((stage, i) => (
            <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
              <span style={{ fontFamily: "monospace", fontSize: 11, fontWeight: 700, color: active === i ? stage.color : "#9ca3af", transition: "color 0.3s" }}>{stage.count}</span>
              <div style={{ width: "100%", borderRadius: "4px 4px 0 0", background: active === i ? stage.color : "#e5e7eb", height: `${(stage.count / maxCount) * 72}px`, transition: "all 0.4s ease" }} />
            </div>
          ))}
        </div>
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
          {pipeline.map((stage, i) => (
            <span key={i} style={{ fontFamily: "monospace", fontSize: 9, padding: "3px 8px", borderRadius: 4, background: active === i ? `${stage.color}18` : "#f3f4f6", color: active === i ? stage.color : "#9ca3af", transition: "all 0.3s" }}>{stage.label}</span>
          ))}
        </div>
      </div>
      <div style={{ padding: "10px 16px", background: "#f9fafb", borderTop: "1px solid #f3f4f6", display: "flex", justifyContent: "space-between" }}>
        <span style={{ fontFamily: "monospace", fontSize: 10, color: "#6b7280" }}>0 leads dropped</span>
        <span style={{ fontFamily: "monospace", fontSize: 10, color: "#22c55e" }}>✓ auto-qualified</span>
      </div>
    </div>
  );
}
// ─── RFP AGENT CARD ──────────────────────────────────────────────────────
function RFPAgentCard() {
  const [phase, setPhase] = useState(0);
  const phases = [
    { label: "Scanning portals", status: "running", pct: 30 },
    { label: "Opportunity found", status: "found", pct: 55 },
    { label: "Scoring fit: 87%", status: "scoring", pct: 75 },
    { label: "Draft generated", status: "done", pct: 100 },
  ];
  useEffect(() => {
    const t = setInterval(() => setPhase(x => (x + 1) % phases.length), 2200);
    return () => clearInterval(t);
  }, []);
  const cur = phases[phase];
  return (
    <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 12, overflow: "hidden", boxShadow: "0 4px 24px rgba(0,0,0,0.06)" }}>
      <div style={{ padding: "12px 16px", borderBottom: "1px solid #f3f4f6", display: "flex", alignItems: "center", gap: 8 }}>
        <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#ef4444", display: "inline-block", animation: "pulse 2s infinite" }} />
        <span style={{ fontFamily: "monospace", fontSize: 10, color: "#ef4444", letterSpacing: "0.1em" }}>RFP AGENT · LIVE</span>
        <span style={{ marginLeft: "auto", fontFamily: "monospace", fontSize: 10, color: "#9ca3af" }}>TODAY</span>
      </div>
      <div style={{ padding: "16px" }}>
        <p style={{ fontFamily: "monospace", fontSize: 9, color: "#9ca3af", letterSpacing: "0.1em", marginBottom: 16 }}>PROPOSAL PIPELINE</p>
        {/* Node flow */}
        <div style={{ display: "flex", alignItems: "center", gap: 0, marginBottom: 20, overflowX: "auto" }}>
          {phases.map((p, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center" }}>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
                <div style={{
                  width: 32, height: 32, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center",
                  background: i < phase ? "#22c55e" : i === phase ? "#ef4444" : "#f3f4f6",
                  border: i === phase ? "2px solid #ef4444" : "2px solid transparent",
                  boxShadow: i === phase ? "0 0 0 4px rgba(239,68,68,0.15)" : "none",
                  transition: "all 0.4s ease",
                  fontSize: 12, color: i <= phase ? "#fff" : "#9ca3af", fontWeight: 700,
                }}>{i < phase ? "✓" : i + 1}</div>
                <span style={{ fontFamily: "monospace", fontSize: 8, color: i === phase ? "#ef4444" : "#9ca3af", textAlign: "center", maxWidth: 50, lineHeight: 1.3 }}>{p.label}</span>
              </div>
              {i < phases.length - 1 && <div style={{ width: 20, height: 2, background: i < phase ? "#22c55e" : "#e5e7eb", margin: "0 2px", marginBottom: 18, transition: "background 0.4s" }} />}
            </div>
          ))}
        </div>
        {/* Progress bar */}
        <div style={{ background: "#f3f4f6", borderRadius: 4, height: 6, overflow: "hidden", marginBottom: 10 }}>
          <div style={{ height: "100%", background: "linear-gradient(90deg, #ef4444, #f97316)", width: `${cur.pct}%`, borderRadius: 4, transition: "width 0.6s ease" }} />
        </div>
        <p style={{ fontFamily: "monospace", fontSize: 10, color: "#6b7280" }}>{cur.label}</p>
      </div>
      <div style={{ padding: "10px 16px", background: "#f9fafb", borderTop: "1px solid #f3f4f6", display: "flex", justifyContent: "space-between" }}>
        <span style={{ fontFamily: "monospace", fontSize: 10, color: "#6b7280" }}>3x faster proposals</span>
        <span style={{ fontFamily: "monospace", fontSize: 10, color: "#22c55e" }}>✓ always scanning</span>
      </div>
    </div>
  );
}

// ─── MAIN HOME COMPONENT ──────────────────────────────────────────────────
export default function Home() {
  return (
    <div style={{ background: "#f8f7f4", minHeight: "100vh" }}>
      <Navbar />

      {/* ── HERO ── */}
      <section style={{ position: "relative", minHeight: "100vh", display: "flex", alignItems: "center", overflow: "hidden", background: "#0a0a0a" }}>
        {/* Background: dark with subtle dot grid */}
        <div style={{ position: "absolute", inset: 0, zIndex: 0, background: "radial-gradient(ellipse at 70% 50%, rgba(239,68,68,0.08) 0%, transparent 60%), radial-gradient(ellipse at 20% 80%, rgba(239,68,68,0.04) 0%, transparent 50%)" }} />
        <div style={{ position: "absolute", inset: 0, zIndex: 0, backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px)", backgroundSize: "32px 32px" }} />
        {/* Photo */}
        <div style={{ position: "absolute", inset: 0, zIndex: 1 }}>
          <img
            src="/manus-storage/IMG_4938_35d8e832.jpeg"
            alt="RJ speaking at Morehouse DreamMakers Summit"
            style={{ position: "absolute", right: 0, top: 0, height: "100%", width: "auto", maxWidth: "60%", objectFit: "contain", objectPosition: "right center" }}
          />
          {/* Dark gradient overlay — heavier on left for text legibility, lighter on right to show photo */}
          <div style={{ position: "absolute", inset: 0, zIndex: 2, background: "linear-gradient(105deg, rgba(10,10,10,0.92) 0%, rgba(10,10,10,0.7) 40%, rgba(10,10,10,0.1) 100%)" }} />
        </div>

        {/* Content */}
        <div style={{ position: "relative", zIndex: 3, maxWidth: 1200, margin: "0 auto", padding: "120px 32px 80px", width: "100%" }}>
          <div style={{ maxWidth: 640 }}>
            {/* Badge */}
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(239,68,68,0.15)", border: "1px solid rgba(239,68,68,0.4)", borderRadius: 20, padding: "6px 14px", marginBottom: 32 }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#ef4444", display: "inline-block" }} />
              <span style={{ fontFamily: "monospace", fontSize: 11, color: "#fca5a5", letterSpacing: "0.12em", textTransform: "uppercase" }}>AI Consulting & Custom Automation</span>
            </div>

            {/* Headline */}
            <h1 style={{ fontSize: "clamp(40px, 6vw, 72px)", fontWeight: 800, color: "#fff", lineHeight: 1.08, marginBottom: 28, letterSpacing: "-0.02em" }}>
              The AI consultant<br />
              that builds{" "}
              <span style={{ color: "#ef4444" }}>inside</span><br />
              your business.
            </h1>

            {/* Sub */}
            <p style={{ fontSize: 18, color: "rgba(255,255,255,0.75)", lineHeight: 1.7, marginBottom: 16, maxWidth: 520 }}>
              Custom AI agents built around how your company actually operates — not off-the-shelf tools that don't fit.
            </p>

            {/* 3 bullets */}
            <ul style={{ listStyle: "none", padding: 0, margin: "0 0 40px", display: "flex", flexDirection: "column", gap: 10 }}>
              {[
                "More leads. Every call, text, and form — captured and followed up automatically.",
                "Less manual work. Automated texts, CRM updates, and scheduling — done for you.",
                "Better operations. Custom-built systems that fit how your company actually runs.",
              ].map((item, i) => (
                <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                  <span style={{ color: "#ef4444", fontSize: 16, marginTop: 2, flexShrink: 0 }}>→</span>
                  <span style={{ fontSize: 15, color: "rgba(255,255,255,0.8)" }}>{item}</span>
                </li>
              ))}
            </ul>

            {/* CTAs */}
            <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
              <Link href="/contact">
                <button style={{ background: "#ef4444", color: "#fff", border: "none", borderRadius: 6, padding: "14px 28px", fontSize: 15, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", gap: 8 }}>
                  Book a Free 15-Minute Discovery Call →
                </button>
              </Link>
              <Link href="/services">
                <button style={{ background: "transparent", color: "#fff", border: "1px solid rgba(255,255,255,0.35)", borderRadius: 6, padding: "14px 28px", fontSize: 15, fontWeight: 500, cursor: "pointer" }}>
                  See what we build
                </button>
              </Link>
            </div>
          </div>
        </div>

        {/* Trust bar at bottom */}
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, zIndex: 3, background: "rgba(0,0,0,0.6)", backdropFilter: "blur(8px)", borderTop: "1px solid rgba(255,255,255,0.08)" }}>
          <div style={{ maxWidth: 1200, margin: "0 auto", padding: "18px 32px", display: "flex", gap: 48, flexWrap: "wrap" }}>
            {[
              { place: "IBM New York", sub: "Featured speaker" },
              { place: "Morehouse College", sub: "DreamMakers Summit 2026" },
              { place: "AfroTech 2025", sub: "Houston · Selected & featured" },
              { place: "Service companies", sub: "All industries served" },
            ].map((item, i) => (
              <div key={i}>
                <p style={{ fontSize: 13, fontWeight: 600, color: "#fff", marginBottom: 2 }}>{item.place}</p>
                <p style={{ fontFamily: "monospace", fontSize: 10, color: "rgba(255,255,255,0.45)", letterSpacing: "0.08em" }}>{item.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── LIVE EXAMPLE VIDEO ── */}
      <section style={{ background: "#fff", padding: "80px 0", borderTop: "1px solid #f0f0f0" }}>
        <div style={{ maxWidth: 960, margin: "0 auto", padding: "0 32px", textAlign: "center" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, marginBottom: 16 }}>
            <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#ef4444", display: "inline-block", boxShadow: "0 0 0 3px rgba(239,68,68,0.2)", animation: "pulse 1.5s infinite" }} />
            <span style={{ fontFamily: "monospace", fontSize: 11, letterSpacing: "0.15em", color: "#ef4444", textTransform: "uppercase" }}>Live Example</span>
          </div>
          <h2 style={{ fontSize: "clamp(24px, 3.5vw, 40px)", fontWeight: 700, color: "#111", lineHeight: 1.2, marginBottom: 12 }}>
            Watch the RFP Agent work — start to finish.
          </h2>
          <p style={{ fontSize: 16, color: "#6b7280", marginBottom: 40, maxWidth: 560, margin: "0 auto 40px" }}>
            No tech jargon. Just a plain walkthrough of exactly what the agent does for you.
          </p>
          <div style={{ borderRadius: 12, overflow: "hidden", boxShadow: "0 8px 40px rgba(0,0,0,0.12)", background: "#000", maxWidth: 800, margin: "0 auto" }}>
            <video
              controls
              style={{ width: "100%", display: "block" }}
              poster="https://d2xsxph8kpxj0f.cloudfront.net/310519663366503786/Jy3H4pVjyFrN8AFKZopyCY/rfp-frame1-UFcZxcADoxxUvu6UyZ3Jye.webp"
            >
              <source src="/manus-storage/rfp-explainer_9fb0697a.mp4" type="video/mp4" />
            </video>
          </div>
        </div>
      </section>

      {/* ── PAIN POINTS ── */}
      <section style={{ background: "#111", padding: "100px 0" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 32px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
            <span style={{ width: 32, height: 1, background: "#ef4444", display: "inline-block" }} />
            <span style={{ fontFamily: "monospace", fontSize: 11, letterSpacing: "0.15em", color: "#ef4444", textTransform: "uppercase" }}>The problem</span>
          </div>
          <h2 style={{ fontSize: "clamp(28px, 4vw, 52px)", fontWeight: 700, color: "#fff", lineHeight: 1.15, marginBottom: 16, maxWidth: 700 }}>
            Your business is great at the work.<br />
            <span style={{ color: "#9ca3af" }}>Everything around it is slowing you down.</span>
          </h2>
          <p style={{ fontSize: 16, color: "#6b7280", marginBottom: 64, maxWidth: 560 }}>
            Service companies lose hours every week to tasks that should be automated. Fyro builds the systems that fix that.
          </p>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 2 }}>
            {[
              {
                icon: "lead",
                title: "Leads fall through the cracks.",
                body: "A new lead comes in on Saturday at 6pm. Nobody sees it until Monday. By then, they've already hired someone else. Manual follow-up is costing you jobs.",
                fix: "Fyro builds an automated lead capture and follow-up agent that captures, qualifies, and responds to every lead automatically.",
              },
              {
                icon: "manual",
                title: "Your team is stuck doing manual work.",
                body: "Texting customers, updating job statuses, sending reminders, chasing invoices — your best people are spending hours on tasks a system should handle.",
                fix: "Fyro automates your outbound texts, job updates, and follow-ups so your team focuses on the work that actually pays.",
              },
              {
                icon: "crm",
                title: "No system. Just spreadsheets.",
                body: "Customer history, job notes, follow-up reminders — it's all in someone's head or a spreadsheet that nobody updates. That's not a business, that's a liability.",
                fix: "Fyro builds a custom CRM wired into how your team actually works.",
              },
            ].map((card, i) => (
              <div key={i} style={{ background: "#161616", padding: "40px 32px", borderLeft: i === 0 ? "3px solid #ef4444" : "3px solid transparent" }}>
                <div style={{ marginBottom: 20 }}>
                  {card.icon === "lead" && (
                    <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
                      <rect width="36" height="36" rx="8" fill="rgba(239,68,68,0.12)" />
                      <path d="M10 18h16M10 12h10M10 24h13" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" />
                      <circle cx="28" cy="12" r="3" fill="#ef4444" />
                      <circle cx="28" cy="12" r="5" fill="none" stroke="#ef4444" strokeWidth="1" opacity="0.4" />
                    </svg>
                  )}
                  {card.icon === "manual" && (
                    <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
                      <rect width="36" height="36" rx="8" fill="rgba(239,68,68,0.12)" />
                      <rect x="10" y="10" width="16" height="3" rx="1.5" fill="#ef4444" />
                      <rect x="10" y="16" width="16" height="3" rx="1.5" fill="#ef4444" opacity="0.6" />
                      <rect x="10" y="22" width="10" height="3" rx="1.5" fill="#ef4444" opacity="0.3" />
                      <circle cx="27" cy="24" r="4" fill="#ef4444" />
                      <path d="M25 24l1.5 1.5L29 22" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                  {card.icon === "crm" && (
                    <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
                      <rect width="36" height="36" rx="8" fill="rgba(239,68,68,0.12)" />
                      <rect x="9" y="9" width="8" height="8" rx="2" fill="#ef4444" />
                      <rect x="19" y="9" width="8" height="8" rx="2" fill="#ef4444" opacity="0.5" />
                      <rect x="9" y="19" width="8" height="8" rx="2" fill="#ef4444" opacity="0.5" />
                      <rect x="19" y="19" width="8" height="8" rx="2" fill="#ef4444" opacity="0.25" />
                      <path d="M13 13h10M13 23h10M18 13v10" stroke="#ef4444" strokeWidth="1" opacity="0.4" />
                    </svg>
                  )}
                </div>
                <h3 style={{ fontSize: 18, fontWeight: 700, color: "#fff", marginBottom: 14 }}>{card.title}</h3>
                <p style={{ fontSize: 14, color: "#6b7280", lineHeight: 1.7, marginBottom: 20 }}>{card.body}</p>
                <div style={{ display: "flex", alignItems: "flex-start", gap: 8, background: "rgba(239,68,68,0.08)", borderRadius: 6, padding: "12px 14px" }}>
                  <span style={{ color: "#ef4444", fontSize: 12, flexShrink: 0, marginTop: 1 }}>✓</span>
                  <span style={{ fontSize: 13, color: "#fca5a5" }}>{card.fix}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section style={{ background: "#fff", padding: "100px 0", borderTop: "1px solid #f0f0f0" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 32px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
            <span style={{ width: 32, height: 1, background: "#ef4444", display: "inline-block" }} />
            <span style={{ fontFamily: "monospace", fontSize: 11, letterSpacing: "0.15em", color: "#ef4444", textTransform: "uppercase" }}>Client results</span>
          </div>
          <h2 style={{ fontSize: "clamp(26px, 3.5vw, 44px)", fontWeight: 700, color: "#111", lineHeight: 1.15, marginBottom: 16, maxWidth: 600 }}>
            Real businesses. Real results.
          </h2>
          <p style={{ fontSize: 16, color: "#6b7280", marginBottom: 64, maxWidth: 500 }}>
            What happens when you stop doing everything manually.
          </p>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 28 }}>
            {[
              {
                quote: "Before Fyro, I was manually checking SAM.gov every morning and still missing deadlines. Now the agent finds the opportunities, scores them, and has a first draft ready before I even get to my desk. We won a $340K contract last quarter that I honestly would have missed.",
                name: "Denise M.",
                title: "CEO, federal IT consulting firm",
                result: "$340K contract won",
              },
              {
                quote: "I was spending 12 hours a week just on follow-up texts and job updates. My team hated it and I hated it. RJ built us a texting agent that handles all of it automatically. My guys actually show up on time now because the reminders go out without me having to think about it.",
                name: "Marcus T.",
                title: "Owner, HVAC & plumbing company",
                result: "12 hrs/week saved",
              },
              {
                quote: "We were running our whole operation out of a shared Google Sheet. Customer history, job notes, follow-ups — all of it. Fyro built us a real CRM that actually fits how we work. The difference in how professional we look to clients is night and day.",
                name: "Keisha R.",
                title: "Operations director, facilities management",
                result: "Full CRM deployed in 3 weeks",
              },
              {
                quote: "I was skeptical about AI. Thought it was just hype. RJ sat down with me, showed me exactly what the agent would do, and we ran a pilot. Within 30 days we had 3 new leads that converted. The ROI was obvious. I wish I'd done this two years ago.",
                name: "James W.",
                title: "Principal, government consulting firm",
                result: "3 new clients in 30 days",
              },
            ].map((t, i) => (
              <div
                key={i}
                style={{
                  background: i % 2 === 0 ? "#f8f7f4" : "#0a0a0a",
                  border: i % 2 === 0 ? "1px solid #e5e7eb" : "1px solid #1f1f1f",
                  borderRadius: 10,
                  padding: "36px 32px",
                  display: "flex",
                  flexDirection: "column",
                  gap: 24,
                }}
              >
                {/* Quote mark */}
                <span style={{ fontFamily: "Georgia, serif", fontSize: 48, lineHeight: 1, color: i % 2 === 0 ? "#ef4444" : "#ef4444", opacity: 0.6, display: "block", marginBottom: -16 }}>&#8220;</span>
                <p style={{ fontSize: 15, color: i % 2 === 0 ? "#374151" : "#d1d5db", lineHeight: 1.75, fontStyle: "italic" }}>{t.quote}</p>
                <div style={{ borderTop: i % 2 === 0 ? "1px solid #e5e7eb" : "1px solid #1f1f1f", paddingTop: 20, display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
                  <div>
                    <p style={{ fontSize: 14, fontWeight: 700, color: i % 2 === 0 ? "#111" : "#fff", marginBottom: 2 }}>{t.name}</p>
                    <p style={{ fontFamily: "monospace", fontSize: 11, color: i % 2 === 0 ? "#9ca3af" : "#555", letterSpacing: "0.05em" }}>{t.title}</p>
                  </div>
                  <div style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.25)", borderRadius: 4, padding: "4px 10px" }}>
                    <p style={{ fontFamily: "monospace", fontSize: 10, color: "#ef4444", letterSpacing: "0.08em", whiteSpace: "nowrap" }}>{t.result}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PHOTO STRIP: RJ IN ACTION ── */}
      <section style={{ background: "#fff", padding: "80px 0" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 32px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 48 }}>
            <span style={{ width: 32, height: 1, background: "#ef4444", display: "inline-block" }} />
            <span style={{ fontFamily: "monospace", fontSize: 11, letterSpacing: "0.15em", color: "#ef4444", textTransform: "uppercase" }}>Recognized work</span>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr", gap: 16 }}>
            {/* Large photo - DreamMakers on stage */}
            <div style={{ position: "relative", borderRadius: 10, overflow: "hidden", aspectRatio: "4/3" }}>
              <img src="/manus-storage/rj_speaking_1_0561f4b4.jpeg" alt="RJ at Morehouse DreamMakers" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 50%)" }} />
              <div style={{ position: "absolute", bottom: 20, left: 20 }}>
                <p style={{ fontFamily: "monospace", fontSize: 10, color: "#ef4444", letterSpacing: "0.12em", marginBottom: 4 }}>MOREHOUSE COLLEGE · DREAMMAKERS 2026</p>
                <p style={{ fontSize: 14, fontWeight: 600, color: "#fff" }}>AI as a business tool — not a buzzword.</p>
              </div>
            </div>
            {/* Stack: teaching + IBM */}
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <div style={{ position: "relative", borderRadius: 10, overflow: "hidden", flex: 1 }}>
                <img src="/manus-storage/rj_morehouse_teaching_2665d36f.jpeg" alt="RJ teaching at Morehouse" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.65) 0%, transparent 55%)" }} />
                <div style={{ position: "absolute", bottom: 12, left: 12, right: 12 }}>
                  <p style={{ fontFamily: "monospace", fontSize: 9, color: "#ef4444", letterSpacing: "0.1em", marginBottom: 2 }}>MOREHOUSE · VOICE AGENTS WORKSHOP</p>
                  <p style={{ fontSize: 12, fontWeight: 600, color: "#fff" }}>Teaching the next generation to build with AI.</p>
                </div>
              </div>
              <div style={{ position: "relative", borderRadius: 10, overflow: "hidden", flex: 1 }}>
                <img src="/manus-storage/rj_ibm_23dcc16d.jpg" alt="RJ at IBM" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.65) 0%, transparent 55%)" }} />
                <div style={{ position: "absolute", bottom: 12, left: 12, right: 12 }}>
                  <p style={{ fontFamily: "monospace", fontSize: 9, color: "#ef4444", letterSpacing: "0.1em", marginBottom: 2 }}>IBM NEW YORK</p>
                  <p style={{ fontSize: 12, fontWeight: 600, color: "#fff" }}>Featured speaker.</p>
                </div>
              </div>
            </div>
            {/* Orange shirt photo - full height */}
            <div style={{ position: "relative", borderRadius: 10, overflow: "hidden" }}>
              <img src="/manus-storage/IMG_4713_7c20d053.jpg" alt="RJ at Morehouse DreamMakers Summit" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top" }} />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.65) 0%, transparent 55%)" }} />
              <div style={{ position: "absolute", bottom: 12, left: 12, right: 12 }}>
                <p style={{ fontFamily: "monospace", fontSize: 9, color: "#ef4444", letterSpacing: "0.1em", marginBottom: 2 }}>MOREHOUSE COLLEGE · DREAMMAKERS 2026</p>
                <p style={{ fontSize: 12, fontWeight: 600, color: "#fff" }}>Building the future of AI in business.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── DARK CTA ── */}
      <section style={{ background: "#0a0a0a", padding: "120px 0", borderTop: "1px solid #1a1a1a" }}>
        <div style={{ maxWidth: 800, margin: "0 auto", padding: "0 32px", textAlign: "center" }}>
          <p style={{ fontFamily: "monospace", fontSize: 11, letterSpacing: "0.15em", color: "#ef4444", textTransform: "uppercase", marginBottom: 24 }}>Ready to build?</p>
          <h2 style={{ fontSize: "clamp(32px, 5vw, 60px)", fontWeight: 800, color: "#fff", lineHeight: 1.1, marginBottom: 24, letterSpacing: "-0.02em" }}>
            Your business shouldn't<br />run on manual.
          </h2>
          <p style={{ fontSize: 17, color: "#6b7280", lineHeight: 1.7, marginBottom: 48, maxWidth: 480, margin: "0 auto 48px" }}>
            Book a free 15-minute call. We'll map out exactly where AI agents can save your team time and win you more business.
          </p>
          <Link href="/contact">
            <button style={{ background: "#ef4444", color: "#fff", border: "none", borderRadius: 6, padding: "18px 40px", fontSize: 16, fontWeight: 700, cursor: "pointer", letterSpacing: "0.01em" }}>
              Book a Free 15-Minute Discovery Call →
            </button>
          </Link>
          <p style={{ fontFamily: "monospace", fontSize: 11, color: "#444", marginTop: 20, letterSpacing: "0.08em" }}>NO COMMITMENT · 15 MINUTES · REAL ANSWERS</p>
        </div>
      </section>

      <Footer />

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
        @media (max-width: 768px) {
          .photo-grid { grid-template-columns: 1fr !important; }
          .rfp-grid { grid-template-columns: 1fr !important; }
          .rfp-three-col { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 1100px) {
          .rfp-three-col { grid-template-columns: 1fr 1fr !important; }
          .rfp-three-col > div:last-child { grid-column: 1 / -1; }
        }
      `}</style>
    </div>
  );
}
