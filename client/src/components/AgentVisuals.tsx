/*
 * AGENT VISUALS — small animated "consoles" that show agents doing the work.
 * Illustrations of how each system behaves, not live client data: no client
 * names, and numbers are kept to things like timers and step counts.
 */
import { useEffect, useState } from "react";
import { Phone, Radar, Workflow, LayoutGrid, Check } from "lucide-react";

const mono = "'DM Mono', ui-monospace, monospace";

function useTick(ms: number, steps: number) {
  const [i, setI] = useState(0);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setI(steps - 1);
      return;
    }
    const t = setInterval(() => setI((x) => (x + 1) % steps), ms);
    return () => clearInterval(t);
  }, [ms, steps]);
  return i;
}

function LiveDot({ color = "var(--fyro-orange)" }: { color?: string }) {
  return (
    <span
      style={{
        width: 7,
        height: 7,
        borderRadius: "50%",
        background: color,
        display: "inline-block",
        boxShadow: `0 0 0 3px color-mix(in srgb, ${color} 25%, transparent)`,
        animation: "fyroPulse 1.6s ease-in-out infinite",
        flexShrink: 0,
      }}
    />
  );
}

function Shell({ title, meta, children, footer }: { title: string; meta?: string; children: React.ReactNode; footer?: React.ReactNode }) {
  return (
    <div
      style={{
        background: "rgba(14,14,17,0.88)",
        border: "1px solid var(--fyro-border)",
        borderRadius: 12,
        overflow: "hidden",
        boxShadow: "0 20px 60px rgba(0,0,0,0.45), 0 0 0 1px rgba(248,121,4,0.04)",
        backdropFilter: "blur(10px)",
      }}
    >
      <div style={{ padding: "12px 16px", borderBottom: "1px solid var(--fyro-border)", display: "flex", alignItems: "center", gap: 8 }}>
        <LiveDot />
        <span style={{ fontFamily: mono, fontSize: 11, color: "var(--fyro-orange)", letterSpacing: "0.1em" }}>{title}</span>
        {meta && <span style={{ marginLeft: "auto", fontFamily: mono, fontSize: 10, color: "var(--fyro-gray-light)" }}>{meta}</span>}
      </div>
      {children}
      {footer && (
        <div style={{ padding: "10px 16px", borderTop: "1px solid var(--fyro-border)", background: "rgba(255,255,255,0.02)", display: "flex", justifyContent: "space-between", gap: 12 }}>
          {footer}
        </div>
      )}
      <style>{`@keyframes fyroPulse { 0%,100% { opacity: 1 } 50% { opacity: .35 } }`}</style>
    </div>
  );
}

/* ── HERO: several agents working at once ─────────────────────────────── */
const FEED = [
  { icon: Phone, agent: "Speed-to-Lead Agent", steps: ["New lead · website form", "Calling lead back…", "Qualified · demo booked"] },
  { icon: Radar, agent: "RFP Agent", steps: ["Scanning procurement portals", "Solicitation matched · scoring fit", "Draft response ready for review"] },
  { icon: LayoutGrid, agent: "CRM Agent", steps: ["Inspection due in 30 days", "Work order created", "Customer notice queued"] },
  { icon: Workflow, agent: "Workflow Agent", steps: ["Job marked complete", "Invoice generated", "Invoice sent · follow-up scheduled"] },
];

export function AgentFeed() {
  const tick = useTick(1400, 12);
  return (
    <Shell title="AGENTS · RUNNING" meta="24/7" footer={
      <>
        <span style={{ fontFamily: mono, fontSize: 10, color: "var(--fyro-gray-mid)" }}>4 agents active</span>
        <span style={{ fontFamily: mono, fontSize: 10, color: "#22c55e" }}>● all systems live</span>
      </>
    }>
      <div style={{ padding: "6px 0" }}>
        {FEED.map((f, i) => {
          const step = Math.floor(((tick + i * 2) % 12) / 4); // 0..2, staggered per agent
          const Icon = f.icon;
          const done = step === 2;
          return (
            <div key={f.agent} style={{ display: "flex", alignItems: "center", gap: 14, padding: "14px 16px", borderBottom: i < FEED.length - 1 ? "1px solid rgba(255,255,255,0.05)" : "none" }}>
              <div
                style={{
                  width: 38,
                  height: 38,
                  flexShrink: 0,
                  display: "grid",
                  placeItems: "center",
                  clipPath: "polygon(25% 3%, 75% 3%, 100% 50%, 75% 97%, 25% 97%, 0 50%)",
                  background: done ? "rgba(34,197,94,0.16)" : "rgba(248,121,4,0.14)",
                  transition: "background .4s",
                }}
              >
                <Icon size={17} color={done ? "#22c55e" : "var(--fyro-orange)"} />
              </div>
              <div style={{ minWidth: 0, flex: 1 }}>
                <p style={{ fontSize: 14, fontWeight: 600, color: "#fff", marginBottom: 3 }}>{f.agent}</p>
                <p key={step} style={{ fontFamily: mono, fontSize: 11.5, color: done ? "#86efac" : "var(--fyro-gray-mid)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", animation: "fyroFeedIn .45s ease" }}>
                  {f.steps[step]}
                </p>
              </div>
              <div style={{ display: "flex", gap: 4 }}>
                {[0, 1, 2].map((s) => (
                  <span key={s} style={{ width: 16, height: 3, borderRadius: 2, background: s <= step ? (done ? "#22c55e" : "var(--fyro-orange)") : "rgba(255,255,255,0.1)", transition: "background .4s" }} />
                ))}
              </div>
            </div>
          );
        })}
      </div>
      <style>{`@keyframes fyroFeedIn { from { opacity: 0; transform: translateY(4px) } to { opacity: 1; transform: none } }`}</style>
    </Shell>
  );
}

/* ── SPEED-TO-LEAD: lead in → phone rings → booked ────────────────────── */
const CALL_STEPS = [
  { t: "0:00", label: "Lead submits form", sub: "“Need a quote for next week”" },
  { t: "0:04", label: "Agent calls the lead back", sub: "Ringing…" },
  { t: "0:31", label: "Qualifies with your questions", sub: "Service area ✓ · Timeline ✓ · Budget ✓" },
  { t: "1:52", label: "Appointment booked", sub: "Added to your calendar + CRM" },
];

export function SpeedToLeadCard() {
  const step = useTick(1600, CALL_STEPS.length + 1);
  return (
    <Shell title="SPEED-TO-LEAD AGENT · LIVE" meta="calling" footer={
      <>
        <span style={{ fontFamily: mono, fontSize: 10, color: "var(--fyro-gray-mid)" }}>every lead gets a call</span>
        <span style={{ fontFamily: mono, fontSize: 10, color: "#22c55e" }}>✓ nights & weekends</span>
      </>
    }>
      <div style={{ padding: "18px 18px 8px" }}>
        {CALL_STEPS.map((s, i) => {
          const state = i < step ? "done" : i === step ? "active" : "pending";
          return (
            <div key={s.label} style={{ display: "flex", gap: 14, paddingBottom: 16, opacity: state === "pending" ? 0.35 : 1, transition: "opacity .4s" }}>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <span
                  style={{
                    width: 22,
                    height: 22,
                    borderRadius: "50%",
                    display: "grid",
                    placeItems: "center",
                    background: state === "done" ? "#22c55e" : state === "active" ? "var(--fyro-orange)" : "var(--fyro-border)",
                    boxShadow: state === "active" ? "0 0 0 5px rgba(248,121,4,0.18)" : "none",
                    transition: "all .4s",
                  }}
                >
                  {state === "done" ? <Check size={12} color="#fff" /> : <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#fff" }} />}
                </span>
                {i < CALL_STEPS.length - 1 && <span style={{ width: 2, flex: 1, minHeight: 18, background: i < step ? "#22c55e" : "var(--fyro-border)", marginTop: 4, transition: "background .4s" }} />}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: "flex", justifyContent: "space-between", gap: 8 }}>
                  <span style={{ fontSize: 14, fontWeight: 600, color: "#fff" }}>{s.label}</span>
                  <span style={{ fontFamily: mono, fontSize: 11, color: "var(--fyro-gray-light)" }}>{s.t}</span>
                </div>
                <span style={{ fontFamily: mono, fontSize: 11.5, color: "var(--fyro-gray-mid)" }}>{s.sub}</span>
              </div>
            </div>
          );
        })}
      </div>
    </Shell>
  );
}

/* ── CUSTOM CRM: pipeline that moves itself ───────────────────────────── */
const PIPE = [
  { label: "New lead", n: 12 },
  { label: "Qualified", n: 8 },
  { label: "Demo", n: 5 },
  { label: "Won", n: 3 },
];

export function CRMCard() {
  const active = useTick(1500, PIPE.length);
  return (
    <Shell title="CUSTOM CRM · LIVE" meta="this week" footer={
      <>
        <span style={{ fontFamily: mono, fontSize: 10, color: "var(--fyro-gray-mid)" }}>follow-ups sent automatically</span>
        <span style={{ fontFamily: mono, fontSize: 10, color: "#22c55e" }}>✓ 0 leads dropped</span>
      </>
    }>
      <div style={{ padding: 18 }}>
        <div style={{ display: "flex", gap: 10, alignItems: "flex-end", height: 120, marginBottom: 14 }}>
          {PIPE.map((p, i) => (
            <div key={p.label} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
              <span style={{ fontFamily: mono, fontSize: 12, fontWeight: 700, color: active === i ? "var(--fyro-orange)" : "var(--fyro-gray-light)" }}>{p.n}</span>
              <div
                style={{
                  width: "100%",
                  height: `${(p.n / 12) * 88}px`,
                  borderRadius: "4px 4px 0 0",
                  background: active === i ? "linear-gradient(180deg, var(--fyro-orange-bright), var(--fyro-orange))" : "rgba(255,255,255,0.08)",
                  boxShadow: active === i ? "0 0 24px rgba(248,121,4,0.35)" : "none",
                  transition: "all .45s ease",
                }}
              />
              <span style={{ fontFamily: mono, fontSize: 10, color: active === i ? "#fff" : "var(--fyro-gray-light)" }}>{p.label}</span>
            </div>
          ))}
        </div>
        <div style={{ fontFamily: mono, fontSize: 11.5, color: "var(--fyro-gray-mid)", borderTop: "1px solid var(--fyro-border)", paddingTop: 12 }}>
          <span style={{ color: "var(--fyro-orange)" }}>→</span> Agent moved 1 record to <span style={{ color: "#fff" }}>{PIPE[active].label}</span>
        </div>
      </div>
    </Shell>
  );
}

/* ── CUSTOM WORKFLOW: trigger → steps ─────────────────────────────────── */
const FLOW = ["Job marked complete", "Photos + report filed", "Invoice created", "Customer texted for review", "Follow-up scheduled"];

export function WorkflowCard() {
  const step = useTick(1200, FLOW.length + 1);
  return (
    <Shell title="WORKFLOW AGENT · LIVE" meta="job #4821" footer={
      <>
        <span style={{ fontFamily: mono, fontSize: 10, color: "var(--fyro-gray-mid)" }}>no one touched a keyboard</span>
        <span style={{ fontFamily: mono, fontSize: 10, color: "#22c55e" }}>✓ runs 24/7</span>
      </>
    }>
      <div style={{ padding: "14px 18px" }}>
        {FLOW.map((f, i) => {
          const state = i < step ? "done" : i === step ? "active" : "pending";
          return (
            <div key={f} style={{ display: "flex", alignItems: "center", gap: 12, padding: "9px 0", borderBottom: i < FLOW.length - 1 ? "1px solid rgba(255,255,255,0.05)" : "none" }}>
              <span style={{ fontFamily: mono, fontSize: 10, color: "var(--fyro-gray-light)", width: 18 }}>{String(i + 1).padStart(2, "0")}</span>
              <span style={{ fontSize: 14, color: state === "pending" ? "var(--fyro-gray-light)" : "#fff", flex: 1, transition: "color .3s" }}>{f}</span>
              {state === "done" && <Check size={15} color="#22c55e" />}
              {state === "active" && <span style={{ fontFamily: mono, fontSize: 10, color: "var(--fyro-orange)", background: "rgba(248,121,4,0.12)", padding: "2px 8px", borderRadius: 4 }}>RUNNING</span>}
            </div>
          );
        })}
      </div>
    </Shell>
  );
}

/* ── RFP AGENT: find → read → score → draft ───────────────────────────── */
const RFP = ["Scan portals", "Read solicitation", "Score fit", "Draft response", "Human review"];

export function RFPCard() {
  const phase = useTick(1500, RFP.length);
  return (
    <Shell title="RFP AGENT · LIVE" meta="gov contracting" footer={
      <>
        <span style={{ fontFamily: mono, fontSize: 10, color: "var(--fyro-gray-mid)" }}>only bids worth pursuing</span>
        <span style={{ fontFamily: mono, fontSize: 10, color: "#22c55e" }}>✓ always scanning</span>
      </>
    }>
      <div style={{ padding: 18 }}>
        <div style={{ display: "flex", alignItems: "flex-start", marginBottom: 18 }}>
          {RFP.map((p, i) => (
            <div key={p} style={{ display: "flex", alignItems: "flex-start", flex: i < RFP.length - 1 ? 1 : "none" }}>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6, width: 52 }}>
                <div
                  style={{
                    width: 30,
                    height: 30,
                    display: "grid",
                    placeItems: "center",
                    clipPath: "polygon(25% 3%, 75% 3%, 100% 50%, 75% 97%, 25% 97%, 0 50%)",
                    background: i < phase ? "#22c55e" : i === phase ? "var(--fyro-orange)" : "var(--fyro-border)",
                    color: "#fff",
                    fontSize: 12,
                    fontWeight: 700,
                    transition: "background .4s",
                  }}
                >
                  {i < phase ? "✓" : i + 1}
                </div>
                <span style={{ fontFamily: mono, fontSize: 9, textAlign: "center", lineHeight: 1.3, color: i === phase ? "var(--fyro-orange)" : "var(--fyro-gray-light)" }}>{p}</span>
              </div>
              {i < RFP.length - 1 && <div style={{ flex: 1, height: 2, marginTop: 14, background: i < phase ? "#22c55e" : "var(--fyro-border)", transition: "background .4s" }} />}
            </div>
          ))}
        </div>
        <div style={{ height: 6, background: "rgba(255,255,255,0.06)", borderRadius: 4, overflow: "hidden" }}>
          <div style={{ height: "100%", width: `${((phase + 1) / RFP.length) * 100}%`, background: "linear-gradient(90deg, var(--fyro-orange), var(--fyro-orange-bright))", transition: "width .6s ease" }} />
        </div>
      </div>
    </Shell>
  );
}
