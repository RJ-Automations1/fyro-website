/*
 * FYRO HOME
 * Rhythm: dark hero (the one animated moment: agents passing work) → light
 * services → dark government-contracting band → light projects and process →
 * dark closing call to book. Orange fills only the primary action and marks
 * agent activity; headings are plain white or ink, never one-word highlights.
 */
import { useRef, useState } from "react";
import { Link } from "wouter";
import { Play } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AgentNetwork from "@/components/AgentNetwork";
import SystemGraphic from "@/components/SystemGraphic";
import { AgentFeed, SpeedToLeadCard, CRMCard, WorkflowCard, RFPCard } from "@/components/AgentVisuals";
import { WORK } from "@/data/work";
import { openChat } from "@/lib/chat";

const wrap = { maxWidth: 1200, margin: "0 auto", padding: "0 32px" } as const;

function Bullets({ items }: { items: string[] }) {
  return (
    <ul className="fy-bullets">
      {items.map((b) => (
        <li key={b}>{b}</li>
      ))}
    </ul>
  );
}

function DemoButton({ label = "Book a free demo" }: { label?: string }) {
  return (
    <Link href="/contact" className="fyro-btn-primary fy-btn-lg">
      {label}
    </Link>
  );
}

function ChatButton({ label = "Chat with our AI agent" }: { label?: string }) {
  return (
    <button type="button" onClick={() => openChat()} className="fyro-btn-outline fy-btn-lg">
      {label}
    </button>
  );
}

// ─── WHAT WE BUILD ────────────────────────────────────────────────────────
const SERVICES = [
  {
    title: "Speed-to-lead call agent",
    lead: "A new lead gets a phone call in seconds, not hours.",
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
    title: "Custom CRMs",
    lead: "A CRM built around how your team already works.",
    bullets: [
      "Your pipeline, stages, and fields, not someone else's template",
      "Follow-ups, reminders, and work orders that create themselves",
      "Every customer's history in one place",
      "Connected to your calls, texts, email, and invoicing",
    ],
    Visual: CRMCard,
  },
  {
    title: "Custom workflows",
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
  "Reads the whole solicitation: scope, scoring criteria, and deadlines",
  "Scores your fit against your real past performance",
  "Drafts the response from your own past work, not boilerplate",
  "A person reviews everything before it's submitted",
];

// Matches the five steps narrated in the explainer video; `at` is where each starts.
const VIDEO_CHAPTERS = [
  { t: "Scans every government portal for you", at: 0 },
  { t: "Matches bids to what your company does", at: 9 },
  { t: "Scores your likelihood to win", at: 19 },
  { t: "Sends it to you to approve", at: 34 },
  { t: "Writes the full proposal, ready to submit", at: 48 },
];

const INDUSTRIES = ["Government contracting", "Fire protection", "Environmental services", "Electrical contracting", "Events"];

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
    <div className="fy-two fy-two-video">
      <div className="fy-video">
        <video
          ref={ref}
          controls={playing}
          playsInline
          preload="metadata"
          onTimeUpdate={onTime}
          onEnded={() => setPlaying(false)}
          poster="/manus-storage/rfp-explainer-poster.jpg"
        >
          <source src="/manus-storage/rfp-explainer_9fb0697a.mp4" type="video/mp4" />
        </video>
        {!playing && (
          <button type="button" onClick={() => playFrom()} className="fy-video-play" aria-label="Play the one-minute RFP agent walkthrough">
            <span className="fy-play-disc">
              <Play size={26} fill="currentColor" style={{ marginLeft: 3 }} />
            </span>
            <span className="fy-play-label">Watch the 1-minute walkthrough</span>
          </button>
        )}
      </div>

      <div>
        <h3 className="fy-h3" style={{ marginBottom: 8 }}>What you&rsquo;ll see</h3>
        <p className="fy-muted" style={{ marginBottom: 18 }}>Select a step to jump to it.</p>
        <ol className="fy-chapters">
          {VIDEO_CHAPTERS.map((c, i) => (
            <li key={c.t}>
              <button type="button" onClick={() => playFrom(c.at)} aria-current={current === i ? "step" : undefined}>
                <span className="fy-chapter-n">{i + 1}</span>
                <span className="fy-chapter-t">{c.t}</span>
                <span className="fy-chapter-at">0:{String(c.at).padStart(2, "0")}</span>
              </button>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <div style={{ background: "var(--fyro-bg)", minHeight: "100vh" }}>
      <Navbar />

      {/* ── HERO ── */}
      <section className="fy-hero">
        <img src="/brand/fyro-mark.png" alt="" aria-hidden="true" className="fy-hero-mark" />
        <AgentNetwork />
        <div className="fy-hero-scrim" aria-hidden="true" />

        <div className="fy-hero-grid" style={wrap}>
          <div className="fy-hero-copy">
            <h1 className="fy-display">
              Every lead called back. Every bid drafted. Every follow-up sent.
            </h1>
            <p className="fy-hero-lede">
              Fyro builds custom AI agents, CRMs, and workflows for service companies and
              government contractors, so the work gets done while your team is on the job.
            </p>
            <div className="fy-actions">
              <DemoButton />
              <ChatButton />
            </div>
            <p className="fy-fineprint">Free 15-minute demo, built around your business.</p>
          </div>

          <div className="fy-hero-feed">
            <AgentFeed />
          </div>
        </div>

        <div style={{ ...wrap, width: "100%", position: "relative", zIndex: 2 }}>
          <div className="fy-hero-foot">
            <span className="fy-hero-foot-label">Running today in</span>
            <ul>
              {INDUSTRIES.map((i) => (
                <li key={i}>{i}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ── WHAT WE BUILD ── */}
      <section className="surface-light fy-section">
        <div style={wrap}>
          <header className="fy-section-head">
            <h2 className="fy-h2">Agents that take the busywork off your team.</h2>
            <p className="fy-lede">
              Each system is built for your business: your leads, your process, and the tools you already use.
            </p>
          </header>

          <div className="fy-services">
            {SERVICES.map((s, i) => {
              const Visual = s.Visual;
              return (
                <article key={s.title} className={`fy-two fy-service${i % 2 ? " fy-flip" : ""}`}>
                  <div>
                    <h3 className="fy-h3">{s.title}</h3>
                    <p className="fy-service-lead">{s.lead}</p>
                    <Bullets items={s.bullets} />
                  </div>
                  <div className="fy-visual">
                    <Visual />
                  </div>
                </article>
              );
            })}
          </div>

          <div className="fy-inline-cta">
            <p>Want to see one of these working for your business?</p>
            <DemoButton />
          </div>
        </div>
      </section>

      {/* ── GOVERNMENT CONTRACTORS ── */}
      <section className="fy-section fy-dark-band">
        <div style={wrap}>
          <header className="fy-section-head">
            <p className="fyro-section-label" style={{ marginBottom: 12 }}>For government contractors</p>
            <h2 className="fy-h2">Win more contracts with less proposal work.</h2>
            <p className="fy-lede">
              Fyro works with a lot of government contracting companies. The RFP agent finds the
              bids worth chasing and writes the first draft, so your team spends its time on the win.
            </p>
          </header>

          <RFPShowcase />

          <div className="fy-two" style={{ marginTop: 96 }}>
            <div>
              <h3 className="fy-h3" style={{ marginBottom: 24 }}>What the RFP agent does</h3>
              <Bullets items={RFP_POINTS} />
              <div className="fy-actions" style={{ marginTop: 36 }}>
                <DemoButton />
                <Link href="/rfp-agent" className="fyro-btn-outline fy-btn-lg">RFP agent details</Link>
              </div>
            </div>
            <div className="fy-visual">
              <RFPCard />
            </div>
          </div>
        </div>
      </section>

      {/* ── PROJECTS — described by industry; clients stay unnamed ── */}
      <section className="surface-light fy-section">
        <div style={wrap}>
          <header className="fy-section-head fy-head-row">
            <div>
              <h2 className="fy-h2">Systems we&rsquo;ve built</h2>
              <p className="fy-lede">Real software running inside real businesses. Clients are named by industry only.</p>
            </div>
            <Link href="/building" className="fyro-link">See all {WORK.length} projects</Link>
          </header>

          <div className="fy-work">
            {WORK.map((w) => (
              <Link key={w.slug} href="/building" className="fy-work-card">
                <SystemGraphic kind={w.graphic} />
                <div className="fy-work-body">
                  <p className="fy-work-client">{w.client.replace(" · ", ", ")}</p>
                  <h3>{w.title}</h3>
                  <p>{w.summary}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS — a real sequence, so it is numbered ── */}
      <section className="surface-light fy-section fy-alt">
        <div style={wrap}>
          <header className="fy-section-head">
            <h2 className="fy-h2">From free demo to working agent</h2>
          </header>
          <ol className="fy-steps">
            {[
              { t: "Book a free demo", b: "Fifteen minutes. Show us how your business runs and where leads or hours are slipping." },
              { t: "We build your agents", b: "Custom agents, CRM, and workflows, connected to the tools you already use." },
              { t: "They go to work", b: "Your agents run around the clock. You review the results and we keep tuning them." },
            ].map((s, i) => (
              <li key={s.t}>
                <span className="fy-step-n">{i + 1}</span>
                <h3>{s.t}</h3>
                <p>{s.b}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ── CLOSE ── */}
      <section className="fy-close">
        <img src="/brand/fyro-mark.png" alt="" aria-hidden="true" className="fy-close-mark" />
        <div style={{ ...wrap, position: "relative" }}>
          <h2 className="fy-display fy-close-title">See what an agent would do in your business.</h2>
          <p className="fy-hero-lede" style={{ maxWidth: 560 }}>
            Pick a time that works for you, or ask our AI agent. It can book the demo right from the chat.
          </p>
          <div className="fy-actions">
            <DemoButton />
            <ChatButton label="Book through chat" />
          </div>
        </div>
      </section>

      <Footer />

      <style>{`
        .fy-btn-lg { font-size: 17px; padding: 15px 26px; }

        /* Hero */
        .fy-hero { position: relative; overflow: hidden; background: var(--fyro-black); min-height: min(100vh, 940px); display: flex; flex-direction: column; justify-content: center; padding: 120px 0 0; }
        .fy-hero-mark { position: absolute; right: -6%; top: 46%; transform: translateY(-50%); height: 80%; opacity: .06; pointer-events: none; }
        .fy-hero-scrim { position: absolute; inset: 0; pointer-events: none; background: linear-gradient(90deg, rgba(7,8,10,.94) 0%, rgba(7,8,10,.72) 42%, rgba(7,8,10,.2) 100%); }
        .fy-hero-grid { position: relative; z-index: 2; width: 100%; display: grid; grid-template-columns: 1.2fr .8fr; gap: 64px; align-items: center; pointer-events: none; }
        .fy-hero-grid > * { pointer-events: auto; }
        .fy-display { font-size: clamp(38px, 4.6vw, 62px); font-weight: 650; font-stretch: 118%; line-height: 1.02; letter-spacing: -0.03em; color: #fff; margin-bottom: 28px; max-width: 15ch; }
        .fy-hero-lede { font-size: clamp(18px, 1.5vw, 21px); line-height: 1.55; color: #C9CED6; max-width: 34em; margin-bottom: 36px; }
        .fy-actions { display: flex; gap: 12px; flex-wrap: wrap; }
        .fy-hero .fyro-btn-outline, .fy-close .fyro-btn-outline, .fy-dark-band .fyro-btn-outline { border-color: rgba(255,255,255,.28); color: #fff; }
        .fy-hero .fyro-btn-outline:hover, .fy-close .fyro-btn-outline:hover, .fy-dark-band .fyro-btn-outline:hover { border-color: rgba(255,255,255,.6); background: rgba(255,255,255,.04); }
        .fy-fineprint { margin-top: 16px; font-size: 15px; color: #8E95A0; }
        .fy-hero-foot { display: flex; align-items: baseline; gap: 28px; flex-wrap: wrap; margin-top: 72px; padding-top: 22px; padding-bottom: 26px; border-top: 1px solid rgba(255,255,255,.08); }
        .fy-hero-foot-label { font-size: 15px; color: #8E95A0; }
        .fy-hero-foot ul { list-style: none; display: flex; flex-wrap: wrap; gap: 8px 28px; margin: 0; padding: 0; }
        .fy-hero-foot li { font-size: 15px; font-weight: 600; color: #E4E7EC; }

        /* Sections */
        .fy-section { padding: 120px 0; }
        .fy-alt { background: var(--fyro-bg-section); }
        .fy-dark-band { background: var(--fyro-bg); }
        .fy-section-head { max-width: 760px; margin-bottom: 72px; }
        .fy-head-row { max-width: none; display: flex; justify-content: space-between; align-items: flex-end; gap: 24px; flex-wrap: wrap; margin-bottom: 48px; }
        .fy-h2 { font-size: clamp(32px, 3.8vw, 50px); font-weight: 650; font-stretch: 115%; letter-spacing: -0.025em; line-height: 1.06; margin-bottom: 18px; }
        .fy-h3 { font-size: clamp(26px, 2.5vw, 34px); font-weight: 650; font-stretch: 112%; letter-spacing: -0.02em; line-height: 1.1; }
        .fy-lede { font-size: 20px; line-height: 1.55; color: var(--fyro-gray-mid); max-width: 38em; }
        .fy-muted { font-size: 16px; color: var(--fyro-gray-mid); }

        .fy-two { display: grid; grid-template-columns: 1fr 1fr; gap: 80px; align-items: center; }
        .fy-two-video { grid-template-columns: 1.35fr 1fr; gap: 64px; }
        .fy-services { display: grid; gap: 120px; }
        .fy-flip > :first-child { order: 2; }
        .fy-service-lead { font-size: 21px; line-height: 1.45; color: var(--fyro-gray-dark); margin: 12px 0 28px; }
        .fy-visual { filter: drop-shadow(0 24px 48px rgba(10,14,22,.18)); }

        .fy-bullets { list-style: none; margin: 0; padding: 0; display: grid; gap: 14px; }
        .fy-bullets li { position: relative; padding-left: 30px; font-size: 18px; line-height: 1.5; color: var(--fyro-gray-dark); }
        .fy-bullets li::before { content: ""; position: absolute; left: 2px; top: .55em; width: 14px; height: 8px; border-left: 2.5px solid var(--fyro-orange); border-bottom: 2.5px solid var(--fyro-orange); transform: rotate(-45deg); transform-origin: center; }

        .fy-inline-cta { margin-top: 120px; padding: 36px 40px; border-radius: 16px; background: var(--fyro-panel); border: 1px solid var(--fyro-border); display: flex; align-items: center; justify-content: space-between; gap: 24px; flex-wrap: wrap; }
        .fy-inline-cta p { font-size: 22px; font-weight: 600; font-stretch: 110%; color: var(--fyro-near-black); }

        /* Video */
        .fy-video { position: relative; aspect-ratio: 16/9; border-radius: 14px; overflow: hidden; background: #000; border: 1px solid var(--fyro-border); }
        .fy-video video { width: 100%; height: 100%; display: block; object-fit: cover; }
        .fy-video-play { position: absolute; inset: 0; border: none; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 14px; background: linear-gradient(180deg, rgba(7,8,10,.15), rgba(7,8,10,.62)); color: #fff; }
        .fy-play-disc { width: 76px; height: 76px; border-radius: 50%; display: grid; place-items: center; background: var(--fyro-orange); color: var(--fyro-on-accent); transition: transform .2s ease; }
        .fy-video-play:hover .fy-play-disc { transform: scale(1.06); }
        .fy-play-label { font-size: 16px; font-weight: 600; text-shadow: 0 1px 10px rgba(0,0,0,.6); }
        .fy-chapters { list-style: none; margin: 0; padding: 0; border-top: 1px solid var(--fyro-border); }
        .fy-chapters button { width: 100%; display: grid; grid-template-columns: 28px 1fr auto; align-items: center; gap: 14px; padding: 15px 4px; background: none; border: none; border-bottom: 1px solid var(--fyro-border); text-align: left; color: var(--fyro-near-black); }
        .fy-chapters button:hover .fy-chapter-t, .fy-chapters button[aria-current] .fy-chapter-t { color: var(--fyro-accent-text); }
        .fy-chapter-n { width: 28px; height: 28px; border-radius: 50%; display: grid; place-items: center; font-size: 14px; font-weight: 600; border: 1px solid var(--fyro-border); color: var(--fyro-gray-dark); }
        .fy-chapters button[aria-current] .fy-chapter-n { background: var(--fyro-orange); border-color: var(--fyro-orange); color: var(--fyro-on-accent); }
        .fy-chapter-t { font-size: 18px; font-weight: 500; transition: color .15s; }
        .fy-chapter-at { font-size: 14px; color: var(--fyro-gray-light); font-variant-numeric: tabular-nums; }

        /* Projects */
        .fy-work { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }
        .fy-work-card { display: flex; flex-direction: column; text-decoration: none; background: var(--fyro-panel); border: 1px solid var(--fyro-border); border-radius: 14px; overflow: hidden; }
        .fy-work-card svg { width: 100%; height: auto; }
        .fy-work-card:hover h3 { color: var(--fyro-accent-text); }
        .fy-work-body { padding: 22px 24px 26px; }
        .fy-work-client { font-size: 14px; color: var(--fyro-gray-light); margin-bottom: 8px; }
        .fy-work-body h3 { font-size: 21px; font-weight: 650; font-stretch: 108%; letter-spacing: -0.01em; margin-bottom: 8px; transition: color .15s; }
        .fy-work-body p:last-child { font-size: 16px; line-height: 1.55; color: var(--fyro-gray-mid); }

        /* Steps */
        .fy-steps { list-style: none; margin: 0; padding: 0; display: grid; grid-template-columns: repeat(3, 1fr); gap: 48px; }
        .fy-steps li { border-top: 2px solid var(--fyro-near-black); padding-top: 24px; }
        .fy-step-n { display: block; font-size: 15px; font-weight: 600; color: var(--fyro-accent-text); margin-bottom: 14px; }
        .fy-steps h3 { font-size: 24px; font-weight: 650; font-stretch: 110%; margin-bottom: 10px; }
        .fy-steps p { font-size: 17px; line-height: 1.55; color: var(--fyro-gray-mid); }

        /* Close */
        .fy-close { position: relative; overflow: hidden; background: var(--fyro-black); padding: 140px 0; }
        .fy-close-mark { position: absolute; right: -4%; bottom: -18%; height: 120%; opacity: .07; pointer-events: none; }
        .fy-close-title { max-width: 16ch; }

        @media (max-width: 1024px) {
          .fy-hero-grid { grid-template-columns: 1fr; gap: 48px; }
          .fy-hero-feed { max-width: 520px; }
          .fy-hero-mark { height: 46%; top: 24%; }
          .fy-two, .fy-two-video { grid-template-columns: 1fr; gap: 44px; }
          .fy-flip > :first-child { order: 0; }
          .fy-work { grid-template-columns: 1fr 1fr; }
        }
        @media (max-width: 700px) {
          .fy-section { padding: 84px 0; }
          .fy-services { gap: 84px; }
          .fy-work, .fy-steps { grid-template-columns: 1fr; }
          .fy-inline-cta { margin-top: 84px; padding: 28px 24px; }
          .fy-hero-foot { gap: 12px; }
        }
      `}</style>
    </div>
  );
}
