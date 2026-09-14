import { useRef, useState } from "react";
import { Link } from "wouter";
import { ArrowRight, Check, MessageSquare, Play } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AgentNetwork from "@/components/AgentNetwork";
import SystemGraphic from "@/components/SystemGraphic";
import { AgentFeed, SpeedToLeadCard, CRMCard, WorkflowCard, RFPCard } from "@/components/AgentVisuals";
import { WORK } from "@/data/work";
import { openChat } from "@/lib/chat";

const mono = "'DM Mono', ui-monospace, monospace";

function Eyebrow({ children, center }: { children: React.ReactNode; center?: boolean }) {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: center ? "center" : "flex-start", gap: 12, marginBottom: 18 }}>
      <span style={{ width: 32, height: 1, background: "var(--fyro-orange)", display: "inline-block" }} />
      <span style={{ fontFamily: mono, fontSize: 12, letterSpacing: "0.15em", color: "var(--fyro-orange)", textTransform: "uppercase" }}>{children}</span>
    </div>
  );
}

function Bullets({ items, size = 17 }: { items: string[]; size?: number }) {
  return (
    <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gap: 14 }}>
      {items.map((b) => (
        <li key={b} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
          <span style={{ width: 22, height: 22, borderRadius: "50%", background: "rgba(248,121,4,0.14)", display: "grid", placeItems: "center", flexShrink: 0, marginTop: 2 }}>
            <Check size={13} color="var(--fyro-orange)" strokeWidth={3} />
          </span>
          <span style={{ fontSize: size, color: "var(--fyro-gray-dark)", lineHeight: 1.55 }}>{b}</span>
        </li>
      ))}
    </ul>
  );
}

function DemoButton({ large }: { large?: boolean }) {
  return (
    <Link href="/contact" className="fyro-btn-primary" style={{ fontSize: large ? 17 : 15, padding: large ? "18px 36px" : "15px 28px", gap: 8, boxShadow: "0 10px 30px rgba(248,121,4,0.25)" }}>
      Book a Free Demo <ArrowRight size={large ? 18 : 16} />
    </Link>
  );
}

function ChatButton({ label = "Talk to our AI agent" }: { label?: string }) {
  return (
    <button
      onClick={() => openChat()}
      className="fyro-btn-outline"
      style={{ fontSize: 15, padding: "15px 26px", gap: 8, background: "rgba(255,255,255,0.03)", borderColor: "rgba(255,255,255,0.25)" }}
    >
      <MessageSquare size={16} /> {label}
    </button>
  );
}

// ─── WHAT WE BUILD ────────────────────────────────────────────────────────
const SERVICES = [
  {
    tag: "Speed-to-lead",
    title: "Speed-to-Lead Call Agent",
    lead: "A new lead gets a phone call in seconds — not hours.",
    bullets: [
      "Calls every new lead back the moment they fill out a form",
      "Qualifies them with your questions, in a natural voice",
      "Books the appointment straight onto your calendar",
      "Logs the call, notes, and next step in your CRM",
      "Works nights, weekends, and holidays",
    ],
    Visual: SpeedToLeadCard,
  },
  {
    tag: "Custom CRMs",
    title: "Custom CRMs",
    lead: "A CRM built around how your team actually works.",
    bullets: [
      "Your pipeline, stages, and fields — not someone else's template",
      "Follow-ups, reminders, and work orders that create themselves",
      "Every customer's history in one place",
      "Connected to your calls, texts, email, and invoicing",
    ],
    Visual: CRMCard,
  },
  {
    tag: "Custom workflows",
    title: "Custom Workflows",
    lead: "The busywork around the job, done automatically.",
    bullets: [
      "Client intake and onboarding",
      "Texts, job updates, and review requests",
      "Reports, documents, and close-out packets",
      "Invoicing and collections follow-up",
      "State portal and regulatory filings",
    ],
    Visual: WorkflowCard,
  },
];

const RFP_POINTS = [
  "Watches procurement portals every day, so you never miss a bid",
  "Reads the whole solicitation — scope, scoring criteria, deadlines",
  "Scores your fit against your real past performance",
  "Drafts the response from your own past work, not boilerplate",
  "A person reviews everything before it's submitted",
];

// Matches the five steps narrated in the explainer video; `at` is where each starts.
const VIDEO_CHAPTERS = [
  { n: "01", t: "Scans every government portal for you", at: 0 },
  { n: "02", t: "Matches bids to what your company does", at: 9 },
  { n: "03", t: "Scores your likelihood to win", at: 19 },
  { n: "04", t: "Sends it to you — you just click Approve", at: 34 },
  { n: "05", t: "Writes the full proposal, ready to submit", at: 48 },
];

function RFPShowcase() {
  const ref = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [current, setCurrent] = useState(-1);
  const playFrom = (at?: number) => {
    const v = ref.current;
    if (!v) return;
    if (at !== undefined) v.currentTime = at;
    setPlaying(true);
    v.play();
  };
  const onTime = () => {
    const now = ref.current?.currentTime ?? 0;
    let idx = -1;
    VIDEO_CHAPTERS.forEach((c, i) => {
      if (now >= c.at) idx = i;
    });
    setCurrent(idx);
  };
  return (
    <div className="rfp-row" style={{ display: "grid", gridTemplateColumns: "1.35fr 1fr", gap: 56, alignItems: "center" }}>
      <div style={{ position: "relative", borderRadius: 14, padding: 1, background: "linear-gradient(135deg, rgba(248,121,4,0.6), rgba(255,255,255,0.08) 40%, rgba(248,121,4,0.25))", boxShadow: "0 30px 80px rgba(0,0,0,0.5), 0 0 60px rgba(248,121,4,0.12)" }}>
        <div style={{ borderRadius: 13, overflow: "hidden", background: "#000" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6, padding: "10px 14px", background: "#111114", borderBottom: "1px solid var(--fyro-border)" }}>
            {["#ff5f57", "#febc2e", "#28c840"].map((c) => <span key={c} style={{ width: 9, height: 9, borderRadius: "50%", background: c, opacity: 0.8 }} />)}
            <span style={{ marginLeft: 10, fontFamily: mono, fontSize: 11, color: "var(--fyro-gray-light)" }}>fyro · rfp-agent · 1 min walkthrough</span>
          </div>
          <div style={{ position: "relative", aspectRatio: "16/9" }}>
            <video
              ref={ref}
              controls={playing}
              playsInline
              preload="metadata"
              onTimeUpdate={onTime}
              onEnded={() => setPlaying(false)}
              poster="/manus-storage/rfp-explainer-poster.jpg"
              style={{ width: "100%", height: "100%", display: "block", objectFit: "cover" }}
            >
              <source src="/manus-storage/rfp-explainer_9fb0697a.mp4" type="video/mp4" />
            </video>
            {!playing && (
              <button
                onClick={() => playFrom()}
                aria-label="Play the RFP agent walkthrough"
                style={{ position: "absolute", inset: 0, border: "none", cursor: "pointer", background: "radial-gradient(circle at center, rgba(0,0,0,0.25), rgba(0,0,0,0.72))", display: "grid", placeItems: "center" }}
              >
                <span style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 14 }}>
                  <span className="play-ring" style={{ width: 84, height: 84, borderRadius: "50%", background: "var(--fyro-orange)", display: "grid", placeItems: "center", boxShadow: "0 0 0 14px rgba(248,121,4,0.18), 0 10px 40px rgba(248,121,4,0.5)" }}>
                    <Play size={30} color="#fff" fill="#fff" style={{ marginLeft: 4 }} />
                  </span>
                  <span style={{ fontFamily: mono, fontSize: 12, letterSpacing: "0.14em", color: "#fff", textShadow: "0 1px 8px #000" }}>WATCH THE AGENT WORK · 1 MIN</span>
                </span>
              </button>
            )}
          </div>
        </div>
      </div>

      <div>
        <p style={{ fontFamily: mono, fontSize: 12, letterSpacing: "0.14em", color: "var(--fyro-gray-light)", marginBottom: 14 }}>IN THE VIDEO · CLICK A STEP</p>
        <ol style={{ listStyle: "none", padding: 0, margin: "0 0 36px" }}>
          {VIDEO_CHAPTERS.map((c, i) => (
            <li key={c.n}>
              <button
                onClick={() => playFrom(c.at)}
                style={{ width: "100%", textAlign: "left", display: "flex", alignItems: "center", gap: 16, padding: "13px 12px", margin: "0 -12px", background: current === i ? "rgba(248,121,4,0.1)" : "transparent", border: "none", borderBottom: "1px solid var(--fyro-border)", borderRadius: 6, cursor: "pointer", transition: "background .25s" }}
              >
                <span style={{ fontFamily: mono, fontSize: 13, color: "var(--fyro-orange)" }}>{c.n}</span>
                <span style={{ fontSize: 18, fontWeight: 600, color: "#fff", flex: 1, lineHeight: 1.35 }}>{c.t}</span>
                <span style={{ fontFamily: mono, fontSize: 11, color: "var(--fyro-gray-light)" }}>0:{String(c.at).padStart(2, "0")}</span>
              </button>
            </li>
          ))}
        </ol>
        <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
          <DemoButton />
          <Link href="/rfp-agent" className="fyro-btn-outline" style={{ fontSize: 15, padding: "15px 24px" }}>RFP Agent details</Link>
        </div>
      </div>
    </div>
  );
}
export default function Home() {
  return (
    <div style={{ background: "var(--fyro-bg)", minHeight: "100vh" }}>
      <Navbar />

      {/* ── HERO — agents at work behind the headline ── */}
      <section className="home-hero" style={{ position: "relative", minHeight: "min(100vh, 980px)", display: "flex", alignItems: "center", overflow: "hidden", background: "var(--fyro-black)" }}>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 72% 45%, rgba(248,121,4,0.16) 0%, transparent 55%), radial-gradient(ellipse at 10% 90%, rgba(248,121,4,0.07) 0%, transparent 50%)" }} />
        {/* The logo mark, large and faint, anchoring the network. */}
        <img
          src="/brand/fyro-mark.png"
          alt=""
          aria-hidden="true"
          className="hero-mark-bg"
          style={{ position: "absolute", right: "-4%", top: "50%", transform: "translateY(-50%)", height: "78%", opacity: 0.07, filter: "blur(0.5px)", pointerEvents: "none" }}
        />
        <AgentNetwork />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(90deg, rgba(5,5,5,0.92) 0%, rgba(5,5,5,0.6) 45%, rgba(5,5,5,0.15) 100%)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: 160, background: "linear-gradient(transparent, var(--fyro-bg))", pointerEvents: "none" }} />

        <div className="hero-grid" style={{ position: "relative", zIndex: 3, maxWidth: 1200, margin: "0 auto", padding: "140px 32px 110px", width: "100%", display: "grid", gridTemplateColumns: "1.15fr 0.85fr", gap: 56, alignItems: "center", pointerEvents: "none" }}>
          <div style={{ pointerEvents: "auto" }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, border: "1px solid rgba(248,121,4,0.35)", background: "rgba(248,121,4,0.08)", borderRadius: 100, padding: "6px 14px", marginBottom: 28 }}>
              <span style={{ width: 7, height: 7, borderRadius: "50%", background: "var(--fyro-orange)", boxShadow: "0 0 10px var(--fyro-orange)" }} />
              <span style={{ fontFamily: mono, fontSize: 11.5, letterSpacing: "0.1em", color: "var(--fyro-orange-bright)" }}>AI AGENTS FOR SERVICE COMPANIES & GOV CONTRACTORS</span>
            </div>

            <h1 style={{ fontSize: "clamp(40px, 5vw, 66px)", fontWeight: 800, color: "#fff", lineHeight: 1.03, marginBottom: 26, letterSpacing: "-0.035em" }}>
              AI agents that{" "}
              <span style={{ background: "linear-gradient(90deg, var(--fyro-orange), #FFB25B)", WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent" }}>
                answer, call, and close
              </span>{" "}
              — around the clock.
            </h1>

            <p style={{ fontSize: "clamp(18px, 1.6vw, 21px)", color: "rgba(255,255,255,0.78)", lineHeight: 1.6, marginBottom: 28, maxWidth: 590 }}>
              Fyro builds custom AI agents, CRMs, and workflows that run inside your business — so every lead gets called back and nothing falls through the cracks.
            </p>

            <ul style={{ listStyle: "none", padding: 0, margin: "0 0 38px", display: "grid", gap: 12 }}>
              {["Call back every new lead in seconds", "A CRM built around your team", "Workflows that run themselves", "RFP agents for government contractors"].map((b) => (
                <li key={b} style={{ display: "flex", alignItems: "center", gap: 12, fontSize: 18, color: "#fff" }}>
                  <Check size={18} color="var(--fyro-orange)" strokeWidth={3} /> {b}
                </li>
              ))}
            </ul>

            <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
              <DemoButton />
              <ChatButton />
            </div>
            <p style={{ fontFamily: mono, fontSize: 11, color: "rgba(255,255,255,0.45)", marginTop: 18, letterSpacing: "0.08em" }}>FREE · 15 MINUTES · SEE IT BUILT FOR YOUR BUSINESS</p>
          </div>

          <div className="hero-feed" style={{ pointerEvents: "auto" }}>
            <AgentFeed />
          </div>
        </div>
      </section>

      {/* ── WHAT WE BUILD ── */}
      <section style={{ background: "var(--fyro-bg)", padding: "110px 0 40px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 32px" }}>
          <Eyebrow>What we build</Eyebrow>
          <h2 style={{ fontSize: "clamp(34px, 4.4vw, 58px)", fontWeight: 800, color: "#fff", lineHeight: 1.08, marginBottom: 20, maxWidth: 820, letterSpacing: "-0.03em" }}>
            Agents that do the work your team shouldn&rsquo;t have to.
          </h2>
          <p style={{ fontSize: 20, color: "var(--fyro-gray-mid)", lineHeight: 1.6, maxWidth: 640 }}>
            Every system is built for your business — your leads, your process, your tools.
          </p>
        </div>
      </section>

      {SERVICES.map((s, i) => {
        const Visual = s.Visual;
        return (
          <section key={s.title} style={{ background: i % 2 ? "var(--fyro-bg-section)" : "var(--fyro-bg)", padding: "80px 0", borderTop: "1px solid var(--fyro-border)" }}>
            <div className="svc-row" style={{ maxWidth: 1200, margin: "0 auto", padding: "0 32px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 72, alignItems: "center" }}>
              <div style={{ order: i % 2 ? 2 : 1 }}>
                <span style={{ fontFamily: mono, fontSize: 12, letterSpacing: "0.14em", color: "var(--fyro-orange)", textTransform: "uppercase" }}>{String(i + 1).padStart(2, "0")} · {s.tag}</span>
                <h3 style={{ fontSize: "clamp(30px, 3.4vw, 44px)", fontWeight: 800, color: "#fff", margin: "14px 0 12px", letterSpacing: "-0.025em", lineHeight: 1.1 }}>{s.title}</h3>
                <p style={{ fontSize: 21, color: "var(--fyro-orange-bright)", fontWeight: 600, lineHeight: 1.45, marginBottom: 28 }}>{s.lead}</p>
                <Bullets items={s.bullets} size={18} />
                <div style={{ marginTop: 34, display: "flex", gap: 18, alignItems: "center", flexWrap: "wrap" }}>
                  <DemoButton />
                  <button onClick={() => openChat(`Tell me about the ${s.title}`)} className="fyro-link" style={{ background: "none", border: "none", fontSize: 15 }}>
                    Ask our agent about it <ArrowRight size={15} />
                  </button>
                </div>
              </div>
              <div style={{ order: i % 2 ? 1 : 2 }}>
                <Visual />
              </div>
            </div>
          </section>
        );
      })}

      {/* ── GOVERNMENT CONTRACTORS · RFP AGENT ── */}
      <section style={{ position: "relative", background: "var(--fyro-black)", padding: "120px 0", borderTop: "1px solid var(--fyro-border)", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 50% 0%, rgba(248,121,4,0.12), transparent 60%)" }} />
        <div style={{ position: "relative", maxWidth: 1200, margin: "0 auto", padding: "0 32px" }}>
          <div style={{ textAlign: "center", maxWidth: 820, margin: "0 auto 64px" }}>
            <Eyebrow center>Built for government contractors</Eyebrow>
            <h2 style={{ fontSize: "clamp(34px, 4.4vw, 56px)", fontWeight: 800, color: "#fff", lineHeight: 1.08, letterSpacing: "-0.03em", marginBottom: 20 }}>
              The RFP Agent finds, scores, and drafts your bids.
            </h2>
            <p style={{ fontSize: 20, color: "var(--fyro-gray-mid)", lineHeight: 1.6 }}>
              We work with a lot of government contracting companies. This is the agent they use to stop missing bids and stop writing responses from scratch.
            </p>
          </div>

          <RFPShowcase />

          <div className="rfp-row" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 56, alignItems: "center", marginTop: 90 }}>
            <div>
              <h3 style={{ fontSize: "clamp(26px, 2.8vw, 36px)", fontWeight: 800, color: "#fff", marginBottom: 26, letterSpacing: "-0.02em" }}>What the RFP Agent does</h3>
              <Bullets items={RFP_POINTS} size={18} />
            </div>
            <RFPCard />
          </div>
        </div>
      </section>

      {/* ── PROJECTS — described by industry; clients stay unnamed ── */}
      <section style={{ background: "var(--fyro-bg)", padding: "110px 0", borderTop: "1px solid var(--fyro-border)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 32px" }}>
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 24, flexWrap: "wrap", marginBottom: 48 }}>
            <div>
              <Eyebrow>Projects we&rsquo;ve built</Eyebrow>
              <h2 style={{ fontSize: "clamp(32px, 4vw, 50px)", fontWeight: 800, color: "#fff", letterSpacing: "-0.03em", maxWidth: 700, lineHeight: 1.1 }}>
                Real systems, running inside real businesses.
              </h2>
            </div>
            <Link href="/building" className="fyro-btn-outline" style={{ fontSize: 15 }}>
              See all {WORK.length} projects <ArrowRight size={15} style={{ marginLeft: 6 }} />
            </Link>
          </div>

          <div className="work-strip" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
            {WORK.map((w) => (
              <Link key={w.slug} href="/building" style={{ textDecoration: "none" }}>
                <article className="work-card" style={{ border: "1px solid var(--fyro-border)", background: "var(--fyro-bg-section)", borderRadius: 10, overflow: "hidden", height: "100%", display: "flex", flexDirection: "column", transition: "border-color .2s, transform .2s" }}>
                  <SystemGraphic kind={w.graphic} />
                  <div style={{ padding: "20px 22px 24px", borderTop: "1px solid var(--fyro-border)", flex: 1 }}>
                    <p style={{ fontFamily: mono, fontSize: 11, letterSpacing: "0.1em", color: "var(--fyro-gray-light)", textTransform: "uppercase", marginBottom: 10 }}>{w.client}</p>
                    <h3 style={{ fontSize: 20, fontWeight: 700, color: "#fff", marginBottom: 10, letterSpacing: "-0.01em" }}>{w.title}</h3>
                    <p style={{ fontSize: 16, color: "var(--fyro-gray-mid)", lineHeight: 1.6 }}>{w.summary}</p>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section style={{ background: "var(--fyro-bg-section)", padding: "110px 0", borderTop: "1px solid var(--fyro-border)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 32px" }}>
          <Eyebrow>How it works</Eyebrow>
          <h2 style={{ fontSize: "clamp(32px, 4vw, 50px)", fontWeight: 800, color: "#fff", letterSpacing: "-0.03em", marginBottom: 56, lineHeight: 1.1 }}>
            From free demo to live agent.
          </h2>
          <div className="steps" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
            {[
              { n: "01", t: "Book a free demo", b: "15 minutes. Show us how your business runs and where leads or hours are slipping." },
              { n: "02", t: "We build your agents", b: "Custom agents, CRM, and workflows — wired into the tools you already use." },
              { n: "03", t: "They go to work", b: "Your agents run 24/7. You review the results and we keep tuning them." },
            ].map((s) => (
              <div key={s.n} style={{ position: "relative", padding: "34px 30px", background: "var(--fyro-panel)", border: "1px solid var(--fyro-border)", borderRadius: 12 }}>
                <span style={{ fontFamily: mono, fontSize: 44, fontWeight: 500, color: "rgba(248,121,4,0.35)", lineHeight: 1 }}>{s.n}</span>
                <h3 style={{ fontSize: 24, fontWeight: 700, color: "#fff", margin: "18px 0 10px" }}>{s.t}</h3>
                <p style={{ fontSize: 17, color: "var(--fyro-gray-mid)", lineHeight: 1.6 }}>{s.b}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section style={{ position: "relative", background: "var(--fyro-black)", padding: "140px 0", borderTop: "1px solid var(--fyro-border)", overflow: "hidden" }}>
        <AgentNetwork style={{ opacity: 0.55 }} />
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at center, rgba(5,5,5,0.55) 0%, rgba(5,5,5,0.92) 70%)", pointerEvents: "none" }} />
        <div style={{ position: "relative", maxWidth: 820, margin: "0 auto", padding: "0 32px", textAlign: "center" }}>
          <Eyebrow center>Ready when you are</Eyebrow>
          <h2 style={{ fontSize: "clamp(38px, 5.4vw, 68px)", fontWeight: 800, color: "#fff", lineHeight: 1.05, marginBottom: 24, letterSpacing: "-0.035em" }}>
            See your first agent in a free demo.
          </h2>
          <p style={{ fontSize: 20, color: "var(--fyro-gray-mid)", lineHeight: 1.6, margin: "0 auto 44px", maxWidth: 560 }}>
            Pick a time, or ask our AI agent — it can book you right from the chat.
          </p>
          <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
            <DemoButton large />
            <ChatButton label="Book through chat" />
          </div>
          <p style={{ fontFamily: mono, fontSize: 11, color: "var(--fyro-gray-light)", marginTop: 22, letterSpacing: "0.08em" }}>NO COMMITMENT · 15 MINUTES · REAL ANSWERS</p>
        </div>
      </section>

      <Footer />

      <style>{`
        .work-card:hover { border-color: rgba(248,121,4,0.45) !important; transform: translateY(-3px); }
        .play-ring { animation: fyroRing 2.2s ease-in-out infinite; }
        @keyframes fyroRing { 0%,100% { transform: scale(1) } 50% { transform: scale(1.06) } }
        @media (max-width: 1024px) {
          .hero-grid { grid-template-columns: 1fr !important; padding-top: 120px !important; }
          .hero-feed { max-width: 520px; }
          .hero-mark-bg { height: 50% !important; top: 30% !important; }
        }
        @media (max-width: 900px) {
          .svc-row, .rfp-row { grid-template-columns: 1fr !important; gap: 40px !important; }
          .svc-row > div { order: unset !important; }
          .work-strip, .steps { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 640px) {
          .home-hero ul li { font-size: 16px !important; }
        }
      `}</style>
    </div>
  );
}
