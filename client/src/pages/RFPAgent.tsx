/**
 * FYRO — RFP AGENT WALKTHROUGH PAGE
 * Auto-advancing timed slideshow — like hendricks.ai
 * Left: stage copy (station label, headline, body, highlight)
 * Right: animated agent UI card (status, pipeline nodes, data fields, progress bar)
 * Auto-advances every 5 seconds with a live progress bar countdown
 */
import { useEffect, useRef, useState, useCallback } from "react";
import { Link } from "wouter";
import { ArrowLeft, ArrowRight, CheckCircle2, Clock, Pause, Play } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const STATIONS = [
  {
    id: "01", phase: "SCOUT", headline: "The agent goes hunting.",
    body: "Before a human even opens their inbox, the RFP agent is already scanning every major government contracting platform — SAM.gov, USASpending.gov, GovWin IQ, SBIR, and international procurement portals — in real time. It filters by NAICS code, set-aside type, agency, and contract value.",
    status: "SCANNING", statusColor: "#3b82f6", time: "00:00", stepLabel: "STEP 1 OF 6",
    fields: [
      { label: "PLATFORMS", value: "SAM.gov · GovWin IQ · USASpending · SBIR · NATO OASIS" },
      { label: "FILTERS APPLIED", value: "NAICS code, set-aside type, agency, value threshold" },
      { label: "OPPORTUNITIES FOUND", value: "47 active solicitations matching profile" },
      { label: "SCAN TIME", value: "< 90 seconds" },
    ],
    highlight: "47 opportunities identified across 12 agencies",
    isGate: false,
  },
  {
    id: "02", phase: "SCORE", headline: "Every opportunity gets a score.",
    body: "The agent reads each solicitation in full — requirements, evaluation criteria, past award history, and incumbent data. It cross-references the company's capability statement, NAICS codes, past performance records, and contract win history. Each opportunity is scored 0–100 on fit, feasibility, and win probability.",
    status: "SCORING", statusColor: "#f59e0b", time: "01:14", stepLabel: "STEP 2 OF 6",
    fields: [
      { label: "SCORING MODEL", value: "Capability match · Past performance · Incumbent risk · Value fit" },
      { label: "DATA SOURCES", value: "Company capability statement + 3 years of past RFP history" },
      { label: "TOP SCORE", value: "94/100 — DHS CISA Cybersecurity Support Services" },
      { label: "SCORED IN", value: "2.3 minutes for 47 solicitations" },
    ],
    highlight: "Top 8 opportunities scored 75+ — flagged for review",
    isGate: false,
  },
  {
    id: "03", phase: "REVIEW", headline: "You stay in control.",
    body: "The agent doesn't move forward without you. A structured summary — score, rationale, key requirements, risk flags, and recommended go/no-go — is delivered directly to the decision-maker. One click to approve, one click to pass. The human is the gate. The agent handles everything else.",
    status: "AWAITING APPROVAL", statusColor: "#f59e0b", time: "02:47", stepLabel: "STEP 3 OF 6",
    fields: [
      { label: "DELIVERED TO", value: "Business Development Lead · email + dashboard notification" },
      { label: "SUMMARY INCLUDES", value: "Score · rationale · key requirements · risk flags · recommendation" },
      { label: "DECISION REQUIRED", value: "Go / No-Go — human approval gate" },
      { label: "RESPONSE TIME (AVG)", value: "14 minutes from notification to decision" },
    ],
    highlight: "Partner approves 3 of 8 flagged opportunities — agent proceeds",
    isGate: true,
  },
  {
    id: "04", phase: "DRAFT", headline: "The proposal writes itself.",
    body: "Once approved, the agent drafts the full RFP response — executive summary, technical approach, past performance narratives, pricing rationale, and compliance matrix. It writes in the company's own voice, using their past proposals as a style and language model.",
    status: "DRAFTING", statusColor: "#22c55e", time: "04:02", stepLabel: "STEP 4 OF 6",
    fields: [
      { label: "SECTIONS GENERATED", value: "Executive summary · Technical approach · Past performance · Compliance matrix" },
      { label: "LANGUAGE MODEL", value: "Trained on company's past proposals and capability statement" },
      { label: "COMPLIANCE CHECK", value: "Section L & M requirements verified — 100% coverage" },
      { label: "DRAFT COMPLETE IN", value: "~18 minutes for a full 40-page response" },
    ],
    highlight: "Full 40-page draft generated — written in your company's voice",
    isGate: false,
  },
  {
    id: "05", phase: "METRICS", headline: "Know your odds before you submit.",
    body: "Before the proposal goes out, the agent runs a win probability analysis — factoring in agency award history, incumbent status, competition density, pricing benchmarks from USASpending, and the company's own win rate by agency and contract type.",
    status: "ANALYZING", statusColor: "#a855f7", time: "06:31", stepLabel: "STEP 5 OF 6",
    fields: [
      { label: "WIN PROBABILITY", value: "72% — above company average of 58%" },
      { label: "FACTORS", value: "Incumbent risk · competition density · pricing benchmark · agency history" },
      { label: "PRICING BENCHMARK", value: "$2.1M–$2.8M range (USASpending historical data)" },
      { label: "RECOMMENDATION", value: "Submit — strong fit, low incumbent risk, favorable agency history" },
    ],
    highlight: "72% win probability — above your company's historical average",
    isGate: false,
  },
  {
    id: "06", phase: "SUBMIT", headline: "Submission-ready. Every time.",
    body: "The final package is assembled — formatted to the solicitation's exact specifications, with all required attachments, certifications, and compliance documentation. A submission-status dashboard tracks the proposal through the award cycle.",
    status: "READY", statusColor: "#22c55e", time: "08:04", stepLabel: "STEP 6 OF 6",
    fields: [
      { label: "PACKAGE INCLUDES", value: "Formatted proposal · attachments · certifications · compliance docs" },
      { label: "FORMAT", value: "Solicitation-specific — PDF, SAM.gov upload, or agency portal" },
      { label: "STATUS TRACKING", value: "Live dashboard — amendment alerts · award notifications · debrief requests" },
      { label: "TOTAL TIME", value: "8 minutes 04 seconds — from scan to submission-ready" },
    ],
    highlight: "From 3-week manual process to 8 minutes. Same quality. No missed deadlines.",
    isGate: false,
  },
];

const NODE_LABELS = ["SCO", "SCR", "REV", "DFT", "MET", "SUB"];
const SLIDE_DURATION = 5000;

export default function RFPAgent() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [paused, setPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  const [animKey, setAnimKey] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const progressRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const clearTimers = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (progressRef.current) clearInterval(progressRef.current);
  }, []);

  const startTimers = useCallback((onAdvance: () => void) => {
    clearTimers();
    progressRef.current = setInterval(() => {
      setProgress((p) => Math.min(p + (50 / SLIDE_DURATION) * 100, 100));
    }, 50);
    intervalRef.current = setInterval(onAdvance, SLIDE_DURATION);
  }, [clearTimers]);

  const advance = useCallback(() => {
    setActiveIdx((prev) => (prev + 1) % STATIONS.length);
    setProgress(0);
    setAnimKey((k) => k + 1);
  }, []);

  useEffect(() => {
    if (paused) { clearTimers(); return; }
    startTimers(advance);
    return clearTimers;
  }, [paused, advance, startTimers, clearTimers]);

  const handleGoTo = useCallback((idx: number) => {
    clearTimers();
    setActiveIdx(idx);
    setProgress(0);
    setAnimKey((k) => k + 1);
    if (!paused) startTimers(advance);
  }, [paused, advance, startTimers, clearTimers]);

  useEffect(() => { window.scrollTo(0, 0); }, []);

  const station = STATIONS[activeIdx];

  return (
    <div style={{ background: "var(--fyro-bg)", minHeight: "100vh" }}>
      <Navbar />

      {/* HEADER */}
      <section style={{ paddingTop: 64, background: "var(--fyro-bg)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "4rem 2.5rem 2rem" }}>
          <Link href="/services" style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", fontFamily: "'DM Mono', monospace", fontSize: "0.65rem", letterSpacing: "0.1em", color: "var(--fyro-gray-mid)", textDecoration: "none", marginBottom: "2.5rem", transition: "color 0.18s ease" }}
            onMouseEnter={(e) => ((e.target as HTMLElement).style.color = "var(--fyro-near-black)")}
            onMouseLeave={(e) => ((e.target as HTMLElement).style.color = "var(--fyro-gray-mid)")}
          >
            <ArrowLeft size={12} /> BACK TO SERVICES
          </Link>
          <div style={{ marginBottom: "0.75rem" }}>
            <span className="fyro-section-label">Live deployment</span>
          </div>
          <h1 style={{ fontFamily: "'Inter', sans-serif", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 800, color: "var(--fyro-near-black)", letterSpacing: "-0.025em", maxWidth: 720, marginBottom: "1rem" }}>
            RFP Response Agent — live walkthrough.
          </h1>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "1rem", color: "var(--fyro-gray-mid)", lineHeight: 1.75, maxWidth: 600, marginBottom: "1.5rem" }}>
            Six stations. Eight minutes from discovery to submission-ready proposal — with a human approval gate at the go/no-go decision.
          </p>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", background: "var(--fyro-white)", border: "1px solid var(--fyro-border)", borderRadius: "999px", padding: "0.5rem 1rem", fontFamily: "'DM Mono', monospace" }}>
            <Clock size={12} style={{ color: "var(--fyro-red)" }} />
            <span style={{ fontSize: "0.65rem", color: "var(--fyro-gray-mid)", letterSpacing: "0.08em" }}>
              TOTAL RUNTIME: <strong style={{ color: "var(--fyro-near-black)" }}>8 MINUTES 04 SECONDS</strong>
            </span>
            <span style={{ fontSize: "0.65rem", color: "var(--fyro-gray-mid)", letterSpacing: "0.06em", marginLeft: "0.5rem" }}>
              vs. <strong style={{ color: "var(--fyro-red)" }}>3 WEEKS MANUAL</strong>
            </span>
          </div>
        </div>
      </section>

      {/* SLIDESHOW */}
      <section style={{ padding: "0 0 6rem", background: "var(--fyro-bg)", borderTop: "1px solid var(--fyro-border)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "4rem 2.5rem 0" }}>

          {/* Station nav pills */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "3.5rem", flexWrap: "wrap" }}>
            {STATIONS.map((s, i) => (
              <button key={s.id} onClick={() => handleGoTo(i)}
                style={{ display: "flex", alignItems: "center", gap: "0.45rem", padding: "0.4rem 0.9rem", borderRadius: "999px", border: `1px solid ${i === activeIdx ? "var(--fyro-near-black)" : "var(--fyro-border)"}`, background: i === activeIdx ? "var(--fyro-near-black)" : "transparent", color: i === activeIdx ? "#fff" : "var(--fyro-gray-mid)", fontFamily: "'DM Mono', monospace", fontSize: "0.6rem", fontWeight: 600, letterSpacing: "0.1em", cursor: "pointer", transition: "all 0.2s ease" }}
              >
                <span style={{ width: 6, height: 6, borderRadius: "50%", background: i === activeIdx ? "#fff" : i < activeIdx ? "var(--fyro-red)" : "var(--fyro-border)", flexShrink: 0, transition: "background 0.2s ease" }} />
                {s.phase}
              </button>
            ))}
            <button onClick={() => setPaused((p) => !p)}
              style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: "0.4rem", padding: "0.4rem 0.9rem", borderRadius: "999px", border: "1px solid var(--fyro-border)", background: "transparent", color: "var(--fyro-gray-mid)", fontFamily: "'DM Mono', monospace", fontSize: "0.6rem", letterSpacing: "0.1em", cursor: "pointer" }}
            >
              {paused ? <Play size={10} /> : <Pause size={10} />}
              {paused ? "PLAY" : "PAUSE"}
            </button>
          </div>

          {/* Two-column slide */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "5rem", alignItems: "center", minHeight: 480 }} id="rfp-slide-grid">

            {/* LEFT: Copy */}
            <div key={`left-${animKey}`} style={{ animation: "slide-in-left 0.4s cubic-bezier(0.23,1,0.32,1)" }}>
              <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.15em", color: "var(--fyro-red)", textTransform: "uppercase", marginBottom: "1.25rem" }}>
                STATION {station.id} / {station.phase}
              </div>
              <h2 style={{ fontFamily: "'Inter', sans-serif", fontSize: "clamp(1.75rem, 3vw, 2.5rem)", fontWeight: 800, color: "var(--fyro-near-black)", letterSpacing: "-0.025em", lineHeight: 1.1, marginBottom: "1.25rem" }}>
                {station.headline}
              </h2>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "1rem", color: "var(--fyro-gray-mid)", lineHeight: 1.8, marginBottom: "2rem", maxWidth: 460 }}>
                {station.body}
              </p>
              {station.isGate && (
                <div style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", background: "rgba(245,158,11,0.06)", border: "1px solid rgba(245,158,11,0.25)", borderRadius: "8px", padding: "0.75rem 1rem", fontFamily: "'DM Mono', monospace", marginBottom: "2rem" }}>
                  <span style={{ fontSize: "0.6rem", color: "#f59e0b", fontWeight: 700, letterSpacing: "0.1em" }}>⚠ HUMAN APPROVAL GATE</span>
                  <span style={{ fontSize: "0.6rem", color: "var(--fyro-gray-mid)", letterSpacing: "0.04em" }}>— Agent pauses until decision is made</span>
                </div>
              )}
              <div style={{ background: "var(--fyro-near-black)", borderRadius: "8px", padding: "1rem 1.25rem", display: "flex", alignItems: "flex-start", gap: "0.6rem", marginBottom: "2.5rem" }}>
                <CheckCircle2 size={14} style={{ color: "var(--fyro-red)", flexShrink: 0, marginTop: "0.1rem" }} />
                <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.7rem", color: "rgba(255,255,255,0.75)", lineHeight: 1.6 }}>{station.highlight}</span>
              </div>
              <div style={{ display: "flex", gap: "0.75rem" }}>
                <button onClick={() => handleGoTo((activeIdx - 1 + STATIONS.length) % STATIONS.length)}
                  style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", fontFamily: "'DM Mono', monospace", fontSize: "0.65rem", letterSpacing: "0.08em", color: "var(--fyro-gray-mid)", background: "none", border: "1px solid var(--fyro-border)", borderRadius: "6px", padding: "0.5rem 1rem", cursor: "pointer", transition: "all 0.18s ease" }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "var(--fyro-near-black)"; (e.currentTarget as HTMLElement).style.color = "var(--fyro-near-black)"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "var(--fyro-border)"; (e.currentTarget as HTMLElement).style.color = "var(--fyro-gray-mid)"; }}
                >
                  <ArrowLeft size={12} /> PREV
                </button>
                <button onClick={() => handleGoTo((activeIdx + 1) % STATIONS.length)}
                  style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", fontFamily: "'DM Mono', monospace", fontSize: "0.65rem", letterSpacing: "0.08em", color: "var(--fyro-gray-mid)", background: "none", border: "1px solid var(--fyro-border)", borderRadius: "6px", padding: "0.5rem 1rem", cursor: "pointer", transition: "all 0.18s ease" }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "var(--fyro-near-black)"; (e.currentTarget as HTMLElement).style.color = "var(--fyro-near-black)"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "var(--fyro-border)"; (e.currentTarget as HTMLElement).style.color = "var(--fyro-gray-mid)"; }}
                >
                  NEXT <ArrowRight size={12} />
                </button>
              </div>
            </div>

            {/* RIGHT: Agent UI Card */}
            <div key={`right-${animKey}`} style={{ animation: "slide-in-right 0.4s cubic-bezier(0.23,1,0.32,1)" }}>
              <div style={{ background: "#fff", border: "1px solid #E8E8E4", borderRadius: "12px", padding: "1.75rem", boxShadow: "0 4px 32px rgba(0,0,0,0.06)", fontFamily: "'DM Mono', monospace" }}>
                {/* Card header */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
                    <span style={{ display: "inline-flex", alignItems: "center", gap: "0.35rem", background: `${station.statusColor}15`, border: `1px solid ${station.statusColor}40`, borderRadius: "999px", padding: "0.2rem 0.75rem", fontSize: "0.6rem", fontWeight: 600, color: station.statusColor, letterSpacing: "0.1em" }}>
                      <span style={{ width: 5, height: 5, borderRadius: "50%", background: station.statusColor, display: "inline-block", animation: "rfp-dot-pulse 1.5s infinite" }} />
                      {station.status}
                    </span>
                    <span style={{ fontSize: "0.65rem", color: "#9A9A9A" }}>RFP Agent · <strong style={{ color: "#0D0D0D" }}>Station {station.id}</strong></span>
                  </div>
                  <span style={{ fontSize: "0.6rem", color: "#9A9A9A", letterSpacing: "0.04em" }}>{station.time}</span>
                </div>

                {/* Pipeline nodes */}
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.5rem", padding: "0.75rem 0" }}>
                  {NODE_LABELS.map((label, i) => {
                    const isActive = i === activeIdx;
                    const isPast = i < activeIdx;
                    return (
                      <div key={label} style={{ display: "flex", alignItems: "center", flex: i < NODE_LABELS.length - 1 ? 1 : "none" }}>
                        <div style={{ width: 34, height: 34, borderRadius: "50%", border: `2px solid ${isActive ? "#C8102E" : isPast ? "#0D0D0D" : "#E8E8E4"}`, background: isActive ? "#C8102E" : isPast ? "#0D0D0D" : "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.45rem", fontWeight: 700, color: isActive || isPast ? "#fff" : "#C0C0BC", letterSpacing: "0.03em", flexShrink: 0, transition: "all 0.4s ease", boxShadow: isActive ? "0 0 0 4px rgba(200,16,46,0.12)" : "none" }}>
                          {label}
                        </div>
                        {i < NODE_LABELS.length - 1 && (
                          <div style={{ flex: 1, height: 2, margin: "0 3px", background: isPast ? "#0D0D0D" : "#E8E8E4", transition: "background 0.4s ease", borderRadius: 1 }} />
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Data fields */}
                <div style={{ borderTop: "1px solid #F0F0EC", paddingTop: "1.25rem", marginBottom: "1rem" }}>
                  {station.fields.map((field) => (
                    <div key={field.label} style={{ display: "flex", gap: "1rem", padding: "0.55rem 0", borderBottom: "1px solid #F8F8F6" }}>
                      <span style={{ fontSize: "0.55rem", color: "#9A9A9A", letterSpacing: "0.12em", textTransform: "uppercase", minWidth: 110, flexShrink: 0, paddingTop: "0.1rem" }}>{field.label}</span>
                      <span style={{ fontSize: "0.68rem", color: "#0D0D0D", lineHeight: 1.5 }}>{field.value}</span>
                    </div>
                  ))}
                </div>

                {/* Live progress bar */}
                <div style={{ marginTop: "1rem" }}>
                  <div style={{ height: 3, background: "#F0F0EC", borderRadius: 2, overflow: "hidden" }}>
                    <div style={{ height: "100%", width: `${progress}%`, background: station.statusColor, borderRadius: 2, transition: paused ? "none" : "width 0.05s linear" }} />
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", marginTop: "0.5rem" }}>
                    <span style={{ fontSize: "0.55rem", color: "#9A9A9A", letterSpacing: "0.08em" }}>{station.stepLabel}</span>
                    <span style={{ fontSize: "0.55rem", color: "#9A9A9A", letterSpacing: "0.04em" }}>{station.time}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div style={{ borderTop: "1px solid var(--fyro-border)", marginTop: "5rem", paddingTop: "4rem", paddingBottom: "2rem", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "2rem" }}>
            <div>
              <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.15em", color: "var(--fyro-red)", marginBottom: "0.75rem" }}>WANT THIS FOR YOUR COMPANY?</div>
              <h3 style={{ fontFamily: "'Inter', sans-serif", fontSize: "clamp(1.5rem, 2.5vw, 2rem)", fontWeight: 800, color: "var(--fyro-near-black)", letterSpacing: "-0.025em", maxWidth: 520 }}>
                We build this for government contractors and service firms. Book a call to see what it looks like for your operation.
              </h3>
            </div>
            <Link href="/contact" className="fyro-btn-primary" style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", flexShrink: 0 }}>
              Book a Free 15-Minute Discovery Call <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </section>

      <Footer />

      <style>{`
        @keyframes rfp-dot-pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.3; } }
        @keyframes slide-in-left { from { opacity: 0; transform: translateX(-18px); } to { opacity: 1; transform: translateX(0); } }
        @keyframes slide-in-right { from { opacity: 0; transform: translateX(18px); } to { opacity: 1; transform: translateX(0); } }
        @media (max-width: 900px) { #rfp-slide-grid { grid-template-columns: 1fr !important; gap: 2.5rem !important; } }
      `}</style>
    </div>
  );
}
