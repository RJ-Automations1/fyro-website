/**
 * FYRO — HOW IT WORKS PAGE
 * 5-step consulting process: Consult → Discover → Analyze → Build & Deploy → Optimize
 * Off-white bg, near-black text, red accents
 */
import { useEffect } from "react";
import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const STEPS = [
  {
    num: "01",
    phase: "CONSULT",
    title: "We meet with you.",
    body: "We start with leadership — understanding your business goals, revenue drivers, and the biggest bottlenecks standing between where you are and where you want to be. No templates, no generic frameworks. Just an honest conversation about your company.",
    detail: "This session typically runs 60–90 minutes. We cover: current revenue model, top operational pain points, existing tech stack, team structure, and your biggest growth constraint. We leave with a clear picture of where AI can move the needle fastest.",
    outcome: "Clear understanding of business goals and top constraints",
  },
  {
    num: "02",
    phase: "DISCOVER",
    title: "We meet with your team.",
    body: "We go deeper with the people doing the work — your frontline staff, managers, and operators — to understand the real day-to-day workflows and pain points. Managers often have an idealized view of how things work. The people in the trenches know where the shortcuts are.",
    detail: "We conduct structured interviews with 3–8 team members across different roles. We ask them to walk us through a typical day, narrate what they're doing and why, and tell us what takes longer than it should. This is where the real automation opportunities surface.",
    outcome: "Complete map of actual workflows vs. documented processes",
  },
  {
    num: "03",
    phase: "ANALYZE",
    title: "We go inside your operations.",
    body: "We visit your facility, shadow your team, and map every process — identifying exactly where AI creates the highest leverage for your specific business, tools, and data. We're looking for the intersection of high time-cost, high repetition, and structured decision-making.",
    detail: "We produce a full workflow map with every decision point, exception case, and integration touchpoint documented. We then score each automation opportunity by: time savings, error reduction, implementation complexity, and ROI. You get a prioritized roadmap with clear projections for each initiative.",
    outcome: "Prioritized AI roadmap with ROI projections for each initiative",
  },
  {
    num: "04",
    phase: "BUILD & DEPLOY",
    title: "We build and deploy.",
    body: "We build your custom agents and automations, review them with you, and launch them live — fully integrated into your existing tools and workflows. No new software to learn. No process overhaul. Your team keeps working the way they work.",
    detail: "Every system is built with a human-in-the-loop review gate at the critical decision points. We run parallel testing alongside your existing process before full deployment. We train your team on how to use, monitor, and override the system. Go-live is a controlled handoff, not a big bang.",
    outcome: "Live AI system integrated into your existing tools and workflows",
  },
  {
    num: "05",
    phase: "OPTIMIZE",
    title: "We monitor and optimize.",
    body: "We don't hand off and disappear. We continuously monitor your systems, update them as your company grows, and optimize performance so your AI stays ahead of your operation. The system gets smarter the longer it runs.",
    detail: "Monthly performance reviews cover: task completion rates, error flags, edge cases encountered, and user feedback. We push updates as your workflows evolve, your team grows, or new automation opportunities emerge. You have a direct line to us — not a support ticket queue.",
    outcome: "Continuously improving system with ongoing monitoring and support",
  },
];

export default function HowItWorks() {
  useEffect(() => {
    window.scrollTo(0, 0);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).style.opacity = "1";
            (entry.target as HTMLElement).style.transform = "translateY(0)";
          }
        });
      },
      { threshold: 0.08 }
    );
    document.querySelectorAll(".fade-up").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const sectionStyle = { maxWidth: 1200, margin: "0 auto", padding: "0 2.5rem" };

  return (
    <div style={{ background: "var(--fyro-bg)", minHeight: "100vh" }}>
      <Navbar />

      {/* ── HERO ── */}
      <section style={{ paddingTop: 64, background: "var(--fyro-bg)" }}>
        <div style={{ ...sectionStyle, padding: "5rem 2.5rem 4rem" }}>
          <div className="fade-up" style={{ marginBottom: "1.75rem" }}>
            <span className="fyro-category-pill">How it works</span>
          </div>
          <h1
            className="fade-up"
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "clamp(2.5rem, 5vw, 4.5rem)",
              fontWeight: 800,
              color: "var(--fyro-near-black)",
              letterSpacing: "-0.03em",
              lineHeight: 1.05,
              maxWidth: 800,
              marginBottom: "1.25rem",
            }}
          >
            Not a tool. Not a plugin. A system built around your operation.
          </h1>
          <p
            className="fade-up"
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "1.05rem",
              color: "var(--fyro-gray-mid)",
              lineHeight: 1.75,
              maxWidth: 560,
              marginBottom: "2.5rem",
            }}
          >
            Fyro follows a five-phase engagement process that moves your company from initial
            conversation to live AI deployment — with your team, your data, and your workflows
            at the center of every decision.
          </p>
          <div className="fade-up" style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
            <Link href="/contact" className="fyro-btn-primary" style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem" }}>
              Book a Free 15-Minute Discovery Call
              <ArrowRight size={15} />
            </Link>
            <Link href="/services" className="fyro-btn-outline">
              See what we build
            </Link>
          </div>
        </div>
      </section>

      {/* ── STEPS ── */}
      {STEPS.map((step, i) => (
        <section
          key={step.num}
          style={{
            padding: "6rem 0",
            background: i % 2 === 0 ? "var(--fyro-bg-section)" : "var(--fyro-bg)",
            borderTop: "1px solid var(--fyro-border)",
          }}
        >
          <div style={sectionStyle}>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "5rem",
                alignItems: "start",
              }}
              id={`step-grid-${i}`}
            >
              {/* Left */}
              <div>
                <div className="fade-up" style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.75rem" }}>
                  <span
                    style={{
                      fontFamily: "'DM Mono', monospace",
                      fontSize: "3rem",
                      fontWeight: 500,
                      color: "var(--fyro-border)",
                      lineHeight: 1,
                    }}
                  >
                    {step.num}
                  </span>
                  <span
                    style={{
                      fontFamily: "'DM Mono', monospace",
                      fontSize: "0.65rem",
                      fontWeight: 700,
                      letterSpacing: "0.15em",
                      color: "var(--fyro-red)",
                      textTransform: "uppercase",
                    }}
                  >
                    {step.phase}
                  </span>
                </div>
                <h2
                  className="fade-up"
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "clamp(1.75rem, 3vw, 2.5rem)",
                    fontWeight: 800,
                    color: "var(--fyro-near-black)",
                    letterSpacing: "-0.025em",
                    marginBottom: "1.25rem",
                    lineHeight: 1.1,
                  }}
                >
                  {step.title}
                </h2>
                <p
                  className="fade-up"
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "1rem",
                    color: "var(--fyro-gray-mid)",
                    lineHeight: 1.8,
                  }}
                >
                  {step.body}
                </p>
              </div>

              {/* Right */}
              <div className="fade-up">
                <div
                  style={{
                    background: "var(--fyro-white)",
                    border: "1px solid var(--fyro-border)",
                    borderRadius: "8px",
                    padding: "2rem",
                  }}
                >
                  <div
                    style={{
                      fontFamily: "'DM Mono', monospace",
                      fontSize: "0.6rem",
                      letterSpacing: "0.15em",
                      color: "var(--fyro-gray-mid)",
                      textTransform: "uppercase",
                      marginBottom: "1rem",
                    }}
                  >
                    What happens in this phase
                  </div>
                  <p
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "0.9rem",
                      color: "var(--fyro-near-black)",
                      lineHeight: 1.8,
                      marginBottom: "1.75rem",
                    }}
                  >
                    {step.detail}
                  </p>
                  <div
                    style={{
                      background: "var(--fyro-near-black)",
                      borderRadius: "6px",
                      padding: "1rem 1.25rem",
                      display: "flex",
                      alignItems: "flex-start",
                      gap: "0.75rem",
                    }}
                  >
                    <div
                      style={{
                        width: 6,
                        height: 6,
                        borderRadius: "50%",
                        background: "var(--fyro-red)",
                        flexShrink: 0,
                        marginTop: "0.35rem",
                      }}
                    />
                    <span
                      style={{
                        fontFamily: "'DM Mono', monospace",
                        fontSize: "0.7rem",
                        color: "rgba(255,255,255,0.75)",
                        lineHeight: 1.6,
                        letterSpacing: "0.03em",
                      }}
                    >
                      OUTCOME: {step.outcome}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <style>{`
            @media (max-width: 768px) {
              #step-grid-${i} { grid-template-columns: 1fr !important; gap: 2rem !important; }
            }
          `}</style>
        </section>
      ))}

      {/* ── CTA ── */}
      <section style={{ padding: "6rem 0", background: "var(--fyro-bg)", borderTop: "1px solid var(--fyro-border)" }}>
        <div style={sectionStyle}>
          <div className="fade-up">
            <div style={{ marginBottom: "0.75rem" }}>
              <span className="fyro-section-label">Ready to start?</span>
            </div>
            <h2
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "clamp(1.75rem, 3vw, 2.5rem)",
                fontWeight: 800,
                color: "var(--fyro-near-black)",
                letterSpacing: "-0.025em",
                marginBottom: "1rem",
              }}
            >
              The first step is a 15-minute conversation.
            </h2>
            <p
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "1rem",
                color: "var(--fyro-gray-mid)",
                lineHeight: 1.75,
                maxWidth: 440,
                marginBottom: "2rem",
              }}
            >
              No pitch. No commitment. Just an honest look at where AI can move the needle
              for your specific operation.
            </p>
            <Link href="/contact" className="fyro-btn-primary" style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem" }}>
              Book a Free 15-Minute Discovery Call
              <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
