import { useState, useEffect, useRef } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FyroLogo from "@/components/FyroLogo";
import SystemGraphic from "@/components/SystemGraphic";
import { WORK } from "@/data/work";
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
    <div style={{ position: "relative", borderRadius: 12, overflow: "hidden", background: "var(--fyro-bg-section)", border: "1px solid #222", aspectRatio: "16/9", cursor: "pointer" }} onClick={handleVideoClick}>
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
          <div style={{ position: "absolute", top: 16, left: 16, display: "flex", alignItems: "center", gap: 6, background: "rgba(0,0,0,0.7)", border: "1px solid var(--fyro-border)", borderRadius: 20, padding: "5px 12px" }}>
            <span style={{ width: 7, height: 7, borderRadius: "50%", background: "var(--fyro-orange)", display: "inline-block", boxShadow: "0 0 0 3px rgba(248,121,4,0.25)", animation: "pulse 1.5s infinite" }} />
            <span style={{ fontFamily: "monospace", fontSize: 10, color: "var(--fyro-orange)", letterSpacing: "0.1em" }}>AGENT DEMO</span>
          </div>
          {/* Play button */}
          <button
            style={{
              width: 72,
              height: 72,
              borderRadius: "50%",
              background: "var(--fyro-orange)",
              border: "none",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 0 0 12px rgba(248,121,4,0.15)",
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
  if (status === "active") return <span style={{ display: "inline-block", width: 10, height: 10, borderRadius: "50%", background: "var(--fyro-orange)", flexShrink: 0, boxShadow: "0 0 0 3px rgba(248,121,4,0.25)" }} />;
  return <span style={{ display: "inline-block", width: 10, height: 10, borderRadius: "50%", background: "var(--fyro-border)", flexShrink: 0 }} />;
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
      style={{ background: "var(--fyro-bg)", padding: "100px 0" }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div style={{ maxWidth: 1400, margin: "0 auto", padding: "0 32px" }}>
        {/* Section label */}
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 48 }}>
          <span style={{ width: 32, height: 1, background: "var(--fyro-orange)", display: "inline-block" }} />
          <span style={{ fontFamily: "monospace", fontSize: 11, letterSpacing: "0.15em", color: "var(--fyro-orange)", textTransform: "uppercase" }}>Live RFP Agent</span>
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
                border: i === current ? "1px solid var(--fyro-orange)" : "1px solid var(--fyro-border)",
                background: i === current ? "rgba(248,121,4,0.12)" : "transparent",
                color: i === current ? "var(--fyro-orange)" : "var(--fyro-gray-mid)",
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
            <p style={{ fontFamily: "monospace", fontSize: 11, letterSpacing: "0.15em", color: "var(--fyro-orange)", textTransform: "uppercase", marginBottom: 20 }}>{stage.label}</p>
            <h2 style={{ fontSize: "clamp(22px, 2.5vw, 36px)", fontWeight: 700, color: "#fff", lineHeight: 1.15, marginBottom: 24 }}>{stage.headline}</h2>
            <p style={{ fontSize: 15, color: "var(--fyro-gray-light)", lineHeight: 1.75, marginBottom: 40 }}>{stage.body}</p>
            {/* Progress bar */}
            <div style={{ height: 2, background: "var(--fyro-panel)", borderRadius: 2, overflow: "hidden" }}>
              <div style={{ height: "100%", background: "var(--fyro-orange)", width: `${progress}%`, transition: "width 0.05s linear" }} />
            </div>
            <p style={{ fontFamily: "monospace", fontSize: 11, color: "var(--fyro-gray-mid)", marginTop: 10 }}>{paused ? "PAUSED" : "AUTO-ADVANCING"} · HOVER TO PAUSE</p>
          </div>

          {/* Col 2: agent card */}
          <div style={{ background: "var(--fyro-bg-section)", border: "1px solid #222", borderRadius: 12, overflow: "hidden" }}>
            {/* Card header */}
            <div style={{ padding: "14px 20px", borderBottom: "1px solid #1a1a1a", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--fyro-orange)", display: "inline-block", boxShadow: "0 0 0 3px rgba(248,121,4,0.2)" }} />
                <span style={{ fontFamily: "monospace", fontSize: 11, color: "var(--fyro-orange)", letterSpacing: "0.1em" }}>{stage.tag}</span>
                <span style={{ fontFamily: "monospace", fontSize: 11, color: "var(--fyro-gray-mid)" }}>·</span>
                <span style={{ fontFamily: "monospace", fontSize: 11, color: "var(--fyro-gray-mid)" }}>RFP AGENT</span>
              </div>
              <span style={{ fontFamily: "monospace", fontSize: 11, color: "var(--fyro-gray-mid)" }}>us-east-1</span>
            </div>

            {/* Steps */}
            <div style={{ padding: "24px 20px" }}>
              {stage.items.map((item, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 0", borderBottom: i < stage.items.length - 1 ? "1px solid #1a1a1a" : "none" }}>
                  <StatusDot status={item.status} />
                  <span style={{ fontFamily: "monospace", fontSize: 12, color: item.status === "done" ? "var(--fyro-gray-light)" : item.status === "active" ? "#fff" : "#444" }}>{item.label}</span>
                  {item.status === "active" && (
                    <span style={{ marginLeft: "auto", fontFamily: "monospace", fontSize: 10, color: "var(--fyro-orange)", background: "rgba(248,121,4,0.1)", padding: "2px 8px", borderRadius: 4 }}>RUNNING</span>
                  )}
                </div>
              ))}
            </div>

            {/* Card footer */}
            <div style={{ padding: "14px 20px", borderTop: "1px solid #1a1a1a", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontFamily: "monospace", fontSize: 11, color: "var(--fyro-gray-mid)" }}>STEP {stage.step}</span>
              <span style={{ fontFamily: "monospace", fontSize: 11, color: "var(--fyro-gray-mid)" }}>{stage.time}</span>
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
    <div style={{ background: "var(--fyro-bg)", border: "1px solid var(--fyro-border)", borderRadius: 12, overflow: "hidden", boxShadow: "0 4px 24px rgba(0,0,0,0.06)" }}>
      <div style={{ padding: "12px 16px", borderBottom: "1px solid #f3f4f6", display: "flex", alignItems: "center", gap: 8 }}>
        <span style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--fyro-orange)", display: "inline-block", animation: "pulse 2s infinite" }} />
        <span style={{ fontFamily: "monospace", fontSize: 10, color: "var(--fyro-orange)", letterSpacing: "0.1em" }}>TEXTING AGENT · LIVE</span>
        <span style={{ marginLeft: "auto", fontFamily: "monospace", fontSize: 10, color: "var(--fyro-gray-light)" }}>2:41 PM</span>
      </div>
      <div style={{ padding: "14px 16px", background: "var(--fyro-panel)", borderBottom: "1px solid #f3f4f6" }}>
        <p style={{ fontFamily: "monospace", fontSize: 9, color: "var(--fyro-gray-light)", letterSpacing: "0.1em", marginBottom: 2 }}>TRIGGER</p>
        <p style={{ fontSize: 12, color: "var(--fyro-gray-dark)" }}>Job #4821 marked complete → auto-sequence started</p>
      </div>
      <div style={{ padding: "16px", minHeight: 160, display: "flex", flexDirection: "column", gap: 10 }}>
        {visible.map((msg, i) => (
          <div key={i} style={{ display: "flex", justifyContent: msg.from === "agent" ? "flex-start" : "flex-end" }}>
            <div style={{
              maxWidth: "80%", padding: "8px 12px", borderRadius: msg.from === "agent" ? "4px 12px 12px 12px" : "12px 4px 12px 12px",
              background: msg.from === "agent" ? "var(--fyro-orange)" : "var(--fyro-border)",
              color: msg.from === "agent" ? "#fff" : "#111",
              fontSize: 12, lineHeight: 1.5,
            }}>{msg.text}</div>
          </div>
        ))}
        {step < messages.length && (
          <div style={{ display: "flex", gap: 4, padding: "4px 0" }}>
            {[0,1,2].map(i => <span key={i} style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--fyro-border)", display: "inline-block", animation: `pulse ${0.6 + i * 0.2}s infinite` }} />)}
          </div>
        )}
      </div>
      <div style={{ padding: "10px 16px", background: "var(--fyro-panel)", borderTop: "1px solid #f3f4f6", display: "flex", justifyContent: "space-between" }}>
        <span style={{ fontFamily: "monospace", fontSize: 10, color: "var(--fyro-gray-mid)" }}>100% follow-up rate</span>
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
    { label: "Proposal", count: 5, color: "var(--fyro-orange)" },
    { label: "Won", count: 3, color: "#22c55e" },
  ];
  useEffect(() => {
    const t = setInterval(() => setActive(x => (x + 1) % pipeline.length), 1800);
    return () => clearInterval(t);
  }, []);
  const maxCount = Math.max(...pipeline.map(p => p.count));
  return (
    <div style={{ background: "var(--fyro-bg)", border: "1px solid var(--fyro-border)", borderRadius: 12, overflow: "hidden", boxShadow: "0 4px 24px rgba(0,0,0,0.06)" }}>
      <div style={{ padding: "12px 16px", borderBottom: "1px solid #f3f4f6", display: "flex", alignItems: "center", gap: 8 }}>
        <span style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--fyro-orange)", display: "inline-block", animation: "pulse 2s infinite" }} />
        <span style={{ fontFamily: "monospace", fontSize: 10, color: "var(--fyro-orange)", letterSpacing: "0.1em" }}>CRM AGENT · LIVE</span>
        <span style={{ marginLeft: "auto", fontFamily: "monospace", fontSize: 10, color: "var(--fyro-gray-light)" }}>TODAY</span>
      </div>
      <div style={{ padding: "16px" }}>
        <p style={{ fontFamily: "monospace", fontSize: 9, color: "var(--fyro-gray-light)", letterSpacing: "0.1em", marginBottom: 12 }}>LEAD PIPELINE · THIS WEEK</p>
        <div style={{ display: "flex", gap: 8, alignItems: "flex-end", height: 100, marginBottom: 12 }}>
          {pipeline.map((stage, i) => (
            <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
              <span style={{ fontFamily: "monospace", fontSize: 11, fontWeight: 700, color: active === i ? stage.color: "var(--fyro-gray-light)", transition: "color 0.3s" }}>{stage.count}</span>
              <div style={{ width: "100%", borderRadius: "4px 4px 0 0", background: active === i ? stage.color: "#e5e7eb", height: `${(stage.count / maxCount) * 72}px`, transition: "all 0.4s ease" }} />
            </div>
          ))}
        </div>
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
          {pipeline.map((stage, i) => (
            <span key={i} style={{ fontFamily: "monospace", fontSize: 9, padding: "3px 8px", borderRadius: 4, background: active === i ? `${stage.color}18` : "var(--fyro-border)", color: active === i ? stage.color: "var(--fyro-gray-light)", transition: "all 0.3s" }}>{stage.label}</span>
          ))}
        </div>
      </div>
      <div style={{ padding: "10px 16px", background: "var(--fyro-panel)", borderTop: "1px solid #f3f4f6", display: "flex", justifyContent: "space-between" }}>
        <span style={{ fontFamily: "monospace", fontSize: 10, color: "var(--fyro-gray-mid)" }}>0 leads dropped</span>
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
    <div style={{ background: "var(--fyro-bg)", border: "1px solid var(--fyro-border)", borderRadius: 12, overflow: "hidden", boxShadow: "0 4px 24px rgba(0,0,0,0.06)" }}>
      <div style={{ padding: "12px 16px", borderBottom: "1px solid #f3f4f6", display: "flex", alignItems: "center", gap: 8 }}>
        <span style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--fyro-orange)", display: "inline-block", animation: "pulse 2s infinite" }} />
        <span style={{ fontFamily: "monospace", fontSize: 10, color: "var(--fyro-orange)", letterSpacing: "0.1em" }}>RFP AGENT · LIVE</span>
        <span style={{ marginLeft: "auto", fontFamily: "monospace", fontSize: 10, color: "var(--fyro-gray-light)" }}>TODAY</span>
      </div>
      <div style={{ padding: "16px" }}>
        <p style={{ fontFamily: "monospace", fontSize: 9, color: "var(--fyro-gray-light)", letterSpacing: "0.1em", marginBottom: 16 }}>PROPOSAL PIPELINE</p>
        {/* Node flow */}
        <div style={{ display: "flex", alignItems: "center", gap: 0, marginBottom: 20, overflowX: "auto" }}>
          {phases.map((p, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center" }}>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
                <div style={{
                  width: 32, height: 32, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center",
                  background: i < phase ? "#22c55e" : i === phase ? "var(--fyro-orange)" : "var(--fyro-border)",
                  border: i === phase ? "2px solid var(--fyro-orange)" : "2px solid transparent",
                  boxShadow: i === phase ? "0 0 0 4px rgba(248,121,4,0.15)" : "none",
                  transition: "all 0.4s ease",
                  fontSize: 12, color: i <= phase ? "#fff" : "var(--fyro-gray-light)", fontWeight: 700,
                }}>{i < phase ? "✓" : i + 1}</div>
                <span style={{ fontFamily: "monospace", fontSize: 8, color: i === phase ? "var(--fyro-orange)" : "var(--fyro-gray-light)", textAlign: "center", maxWidth: 50, lineHeight: 1.3 }}>{p.label}</span>
              </div>
              {i < phases.length - 1 && <div style={{ width: 20, height: 2, background: i < phase ? "#22c55e" : "#e5e7eb", margin: "0 2px", marginBottom: 18, transition: "background 0.4s" }} />}
            </div>
          ))}
        </div>
        {/* Progress bar */}
        <div style={{ background: "var(--fyro-panel)", borderRadius: 4, height: 6, overflow: "hidden", marginBottom: 10 }}>
          <div style={{ height: "100%", background: "linear-gradient(90deg, var(--fyro-orange), var(--fyro-orange-bright))", width: `${cur.pct}%`, borderRadius: 4, transition: "width 0.6s ease" }} />
        </div>
        <p style={{ fontFamily: "monospace", fontSize: 10, color: "var(--fyro-gray-mid)" }}>{cur.label}</p>
      </div>
      <div style={{ padding: "10px 16px", background: "var(--fyro-panel)", borderTop: "1px solid #f3f4f6", display: "flex", justifyContent: "space-between" }}>
        <span style={{ fontFamily: "monospace", fontSize: 10, color: "var(--fyro-gray-mid)" }}>3x faster proposals</span>
        <span style={{ fontFamily: "monospace", fontSize: 10, color: "#22c55e" }}>✓ always scanning</span>
      </div>
    </div>
  );
}

// ─── MAIN HOME COMPONENT ──────────────────────────────────────────────────
export default function Home() {
  return (
    <div style={{ background: "var(--fyro-panel)", minHeight: "100vh" }}>
      <Navbar />

      {/* ── HERO ──
           Logo-led. The founder's photo and personal credentials moved to the
           About page under "Meet the Founder" — a buyer should meet the company
           first and the person second. Proof here is the work, not the résumé. */}
      <section style={{ position: "relative", minHeight: "100vh", display: "flex", alignItems: "center", overflow: "hidden", background: "var(--fyro-bg)" }}>
        {/* Background: dark with subtle dot grid */}
        <div style={{ position: "absolute", inset: 0, zIndex: 0, background: "radial-gradient(ellipse at 70% 40%, rgba(248,121,4,0.12) 0%, transparent 62%), radial-gradient(ellipse at 15% 85%, rgba(248,121,4,0.05) 0%, transparent 55%)" }} />
        <div style={{ position: "absolute", inset: 0, zIndex: 0, backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px)", backgroundSize: "32px 32px" }} />

        {/* Content */}
        <div style={{ position: "relative", zIndex: 3, maxWidth: 1100, margin: "0 auto", padding: "150px 32px 170px", width: "100%" }}>
          <div style={{ maxWidth: 760 }}>
            {/* The mark leads. Nothing above it. */}
            <div className="hero-mark" style={{ marginBottom: 44 }}>
              <FyroLogo variant="lockup" height={210} />
            </div>

            <h1 style={{ fontSize: "clamp(32px, 4.6vw, 56px)", fontWeight: 800, color: "#fff", lineHeight: 1.1, marginBottom: 26, letterSpacing: "-0.025em" }}>
              We build the systems that{" "}
              <span style={{ color: "var(--fyro-orange)" }}>run service companies.</span>
            </h1>

            <p style={{ fontSize: 18, color: "rgba(255,255,255,0.72)", lineHeight: 1.72, marginBottom: 40, maxWidth: 600 }}>
              Fyro embeds inside your operation and builds the software it actually runs on —
              custom AI agents and internal tools for regulatory filing, field operations,
              proposals, and collections. Not off-the-shelf tools bent to fit.
            </p>

            <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
              <Link href="/contact">
                <button style={{ background: "var(--fyro-orange)", color: "#fff", border: "none", borderRadius: 4, padding: "15px 30px", fontSize: 15, fontWeight: 600, cursor: "pointer" }}>
                  Book a Free 15-Minute Discovery Call →
                </button>
              </Link>
              <Link href="/building">
                <button style={{ background: "transparent", color: "#fff", border: "1px solid rgba(255,255,255,0.35)", borderRadius: 4, padding: "15px 30px", fontSize: 15, fontWeight: 500, cursor: "pointer" }}>
                  See what we&rsquo;re building
                </button>
              </Link>
            </div>
          </div>
        </div>

        {/* Work strip — what is actually running, not who we have met. */}
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, zIndex: 3, background: "rgba(0,0,0,0.55)", backdropFilter: "blur(8px)", borderTop: "1px solid rgba(255,255,255,0.09)" }}>
          <div style={{ maxWidth: 1100, margin: "0 auto", padding: "20px 32px", display: "flex", gap: 44, flexWrap: "wrap" }}>
            {[
              { place: "Regulatory filing", sub: "State portals, filed automatically" },
              { place: "Field operations", sub: "Crew apps, tickets, invoicing" },
              { place: "Proposals & RFP", sub: "Monitored, scored, drafted" },
              { place: "Collections", sub: "Dunning that runs itself" },
            ].map((item, i) => (
              <div key={i}>
                <p style={{ fontSize: 13, fontWeight: 600, color: "#fff", marginBottom: 3 }}>{item.place}</p>
                <p style={{ fontFamily: "monospace", fontSize: 10, color: "rgba(255,255,255,0.45)", letterSpacing: "0.08em" }}>{item.sub}</p>
              </div>
            ))}
          </div>
        </div>

        <style>{`
          @media (max-width: 640px) {
            .hero-mark img { height: 132px !important; }
          }
        `}</style>
      </section>

      {/* ── LIVE EXAMPLE VIDEO ── */}
      <section style={{ background: "var(--fyro-bg)", padding: "80px 0", borderTop: "1px solid var(--fyro-border)" }}>
        <div style={{ maxWidth: 960, margin: "0 auto", padding: "0 32px", textAlign: "center" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, marginBottom: 16 }}>
            <span style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--fyro-orange)", display: "inline-block", boxShadow: "0 0 0 3px rgba(248,121,4,0.2)", animation: "pulse 1.5s infinite" }} />
            <span style={{ fontFamily: "monospace", fontSize: 11, letterSpacing: "0.15em", color: "var(--fyro-orange)", textTransform: "uppercase" }}>Live Example</span>
          </div>
          <h2 style={{ fontSize: "clamp(24px, 3.5vw, 40px)", fontWeight: 700, color: "var(--fyro-near-black)", lineHeight: 1.2, marginBottom: 12 }}>
            Watch the RFP Agent work — start to finish.
          </h2>
          <p style={{ fontSize: 16, color: "var(--fyro-gray-mid)", marginBottom: 40, maxWidth: 560, margin: "0 auto 40px" }}>
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
      <section style={{ background: "var(--fyro-bg-section)", padding: "100px 0" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 32px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
            <span style={{ width: 32, height: 1, background: "var(--fyro-orange)", display: "inline-block" }} />
            <span style={{ fontFamily: "monospace", fontSize: 11, letterSpacing: "0.15em", color: "var(--fyro-orange)", textTransform: "uppercase" }}>The problem</span>
          </div>
          <h2 style={{ fontSize: "clamp(28px, 4vw, 52px)", fontWeight: 700, color: "#fff", lineHeight: 1.15, marginBottom: 16, maxWidth: 700 }}>
            Your business is great at the work.<br />
            <span style={{ color: "var(--fyro-gray-light)" }}>Everything around it is slowing you down.</span>
          </h2>
          <p style={{ fontSize: 16, color: "var(--fyro-gray-mid)", marginBottom: 64, maxWidth: 560 }}>
            Service companies lose hours every week to tasks that should be automated. Fyro builds the systems that fix that.
          </p>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 2 }}>
            {[
              {
                icon: "lead",
                title: "Leads fall through the cracks.",
                body: "A lead comes in Saturday night. Nobody sees it till Monday — and they've already hired someone else.",
                fix: "Fyro builds an automated lead capture and follow-up agent that captures, qualifies, and responds to every lead automatically.",
              },
              {
                icon: "manual",
                title: "Your team is stuck doing manual work.",
                body: "Texts, job updates, reminders, chasing invoices — your best people lose hours to work a system should handle.",
                fix: "Fyro automates your outbound texts, job updates, and follow-ups so your team focuses on the work that actually pays.",
              },
              {
                icon: "crm",
                title: "No system. Just spreadsheets.",
                body: "Customer history and follow-ups live in someone's head or a stale spreadsheet. That's not a system — it's a liability.",
                fix: "Fyro builds a custom CRM wired into how your team actually works.",
              },
            ].map((card, i) => (
              <div key={i} style={{ background: "var(--fyro-panel)", padding: "40px 32px", borderLeft: i === 0 ? "3px solid var(--fyro-orange)" : "3px solid transparent" }}>
                <div style={{ marginBottom: 20 }}>
                  {card.icon === "lead" && (
                    <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
                      <rect width="36" height="36" rx="8" fill="rgba(248,121,4,0.12)" />
                      <path d="M10 18h16M10 12h10M10 24h13" stroke="var(--fyro-orange)" strokeWidth="2" strokeLinecap="round" />
                      <circle cx="28" cy="12" r="3" fill="var(--fyro-orange)" />
                      <circle cx="28" cy="12" r="5" fill="none" stroke="var(--fyro-orange)" strokeWidth="1" opacity="0.4" />
                    </svg>
                  )}
                  {card.icon === "manual" && (
                    <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
                      <rect width="36" height="36" rx="8" fill="rgba(248,121,4,0.12)" />
                      <rect x="10" y="10" width="16" height="3" rx="1.5" fill="var(--fyro-orange)" />
                      <rect x="10" y="16" width="16" height="3" rx="1.5" fill="var(--fyro-orange)" opacity="0.6" />
                      <rect x="10" y="22" width="10" height="3" rx="1.5" fill="var(--fyro-orange)" opacity="0.3" />
                      <circle cx="27" cy="24" r="4" fill="var(--fyro-orange)" />
                      <path d="M25 24l1.5 1.5L29 22" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                  {card.icon === "crm" && (
                    <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
                      <rect width="36" height="36" rx="8" fill="rgba(248,121,4,0.12)" />
                      <rect x="9" y="9" width="8" height="8" rx="2" fill="var(--fyro-orange)" />
                      <rect x="19" y="9" width="8" height="8" rx="2" fill="var(--fyro-orange)" opacity="0.5" />
                      <rect x="9" y="19" width="8" height="8" rx="2" fill="var(--fyro-orange)" opacity="0.5" />
                      <rect x="19" y="19" width="8" height="8" rx="2" fill="var(--fyro-orange)" opacity="0.25" />
                      <path d="M13 13h10M13 23h10M18 13v10" stroke="var(--fyro-orange)" strokeWidth="1" opacity="0.4" />
                    </svg>
                  )}
                </div>
                <h3 style={{ fontSize: 18, fontWeight: 700, color: "#fff", marginBottom: 14 }}>{card.title}</h3>
                <p style={{ fontSize: 14, color: "var(--fyro-gray-mid)", lineHeight: 1.7, marginBottom: 20 }}>{card.body}</p>
                <div style={{ display: "flex", alignItems: "flex-start", gap: 8, background: "rgba(248,121,4,0.08)", borderRadius: 6, padding: "12px 14px" }}>
                  <span style={{ color: "var(--fyro-orange)", fontSize: 12, flexShrink: 0, marginTop: 1 }}>✓</span>
                  <span style={{ fontSize: 13, color: "var(--fyro-orange-bright)" }}>{card.fix}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHAT WE ARE BUILDING ──
           Replaced the founder photo strip. Proof of a build shop should be the
           builds. Clients are described by industry only — several are under NDA
           and this page is public. */}
      <section style={{ background: "var(--fyro-bg)", padding: "90px 0", borderTop: "1px solid var(--fyro-border)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 32px" }}>
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 24, flexWrap: "wrap", marginBottom: 44 }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
                <span style={{ width: 32, height: 1, background: "var(--fyro-orange)", display: "inline-block" }} />
                <span style={{ fontFamily: "monospace", fontSize: 11, letterSpacing: "0.15em", color: "var(--fyro-orange)", textTransform: "uppercase" }}>What we&rsquo;re building</span>
              </div>
              <h2 style={{ fontSize: "clamp(26px, 3.2vw, 38px)", fontWeight: 800, color: "var(--fyro-near-black)", letterSpacing: "-0.025em", maxWidth: 620, lineHeight: 1.15 }}>
                Systems running inside real service companies right now.
              </h2>
            </div>
            <Link href="/building">
              <button style={{ background: "transparent", color: "var(--fyro-near-black)", border: "1px solid var(--fyro-border)", borderRadius: 4, padding: "12px 22px", fontSize: 14, fontWeight: 600, cursor: "pointer", whiteSpace: "nowrap" }}>
                See all {WORK.length} →
              </button>
            </Link>
          </div>

          <div className="work-strip" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
            {WORK.slice(0, 3).map((w) => (
              <Link key={w.slug} href="/building" style={{ textDecoration: "none" }}>
                <article style={{ border: "1px solid var(--fyro-border)", background: "var(--fyro-bg)", height: "100%", display: "flex", flexDirection: "column" }}>
                  <SystemGraphic kind={w.graphic} />
                  <div style={{ padding: "18px 20px 22px", borderTop: "1px solid var(--fyro-border)", flex: 1 }}>
                    <p style={{ fontFamily: "monospace", fontSize: 10, letterSpacing: "0.1em", color: "var(--fyro-gray-light)", textTransform: "uppercase", marginBottom: 10 }}>
                      {w.client}
                    </p>
                    <h3 style={{ fontSize: 16, fontWeight: 700, color: "var(--fyro-near-black)", marginBottom: 8, letterSpacing: "-0.01em" }}>{w.title}</h3>
                    <p style={{ fontSize: 13.5, color: "var(--fyro-gray-mid)", lineHeight: 1.6 }}>{w.summary}</p>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </div>

        <style>{`
          @media (max-width: 900px) { .work-strip { grid-template-columns: 1fr !important; } }
        `}</style>
      </section>

      {/* ── DARK CTA ── */}
      <section style={{ background: "var(--fyro-bg)", padding: "120px 0", borderTop: "1px solid #1a1a1a" }}>
        <div style={{ maxWidth: 800, margin: "0 auto", padding: "0 32px", textAlign: "center" }}>
          <p style={{ fontFamily: "monospace", fontSize: 11, letterSpacing: "0.15em", color: "var(--fyro-orange)", textTransform: "uppercase", marginBottom: 24 }}>Ready to build?</p>
          <h2 style={{ fontSize: "clamp(32px, 5vw, 60px)", fontWeight: 800, color: "#fff", lineHeight: 1.1, marginBottom: 24, letterSpacing: "-0.02em" }}>
            Your business shouldn't<br />run on manual.
          </h2>
          <p style={{ fontSize: 17, color: "var(--fyro-gray-mid)", lineHeight: 1.7, marginBottom: 48, maxWidth: 480, margin: "0 auto 48px" }}>
            Book a free 15-minute call. We'll map out exactly where AI agents can save your team time and win you more business.
          </p>
          <Link href="/contact">
            <button style={{ background: "var(--fyro-orange)", color: "#fff", border: "none", borderRadius: 6, padding: "18px 40px", fontSize: 16, fontWeight: 700, cursor: "pointer", letterSpacing: "0.01em" }}>
              Book a Free 15-Minute Discovery Call →
            </button>
          </Link>
          <p style={{ fontFamily: "monospace", fontSize: 11, color: "var(--fyro-gray-mid)", marginTop: 20, letterSpacing: "0.08em" }}>NO COMMITMENT · 15 MINUTES · REAL ANSWERS</p>
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
