/*
 * FYRO ABOUT PAGE — Hendricks.ai-inspired
 * Same structure: pill label, bold name headline, bio, photo, story, experience, principles, FAQ
 */
import { useEffect, useRef, useState } from "react";
import { Link } from "wouter";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function About() {
  const pageRef = useRef<HTMLDivElement>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

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
      { threshold: 0.1 }
    );
    const els = pageRef.current?.querySelectorAll(".fade-up");
    els?.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const sectionStyle = { maxWidth: 1200, margin: "0 auto", padding: "0 2.5rem" };

  return (
    <div ref={pageRef} style={{ background: "var(--fyro-bg)", minHeight: "100vh" }}>
      <Navbar />

      {/* ── HERO ── */}
      <section style={{ paddingTop: 64, background: "var(--fyro-bg)" }}>
        <div style={{ ...sectionStyle, padding: "5rem 2.5rem 4rem" }}>
          {/* Pill */}
          <div className="fade-up" style={{ marginBottom: "1.75rem" }}>
            <span className="fyro-category-pill">About</span>
          </div>

          {/* Name headline */}
          <h1
            className="fade-up"
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "clamp(2.5rem, 6vw, 5rem)",
              fontWeight: 800,
              color: "var(--fyro-near-black)",
              letterSpacing: "-0.03em",
              lineHeight: 1.05,
              marginBottom: "1.25rem",
            }}
          >
            Robert Robinson{" "}
            <span style={{ color: "var(--fyro-red)" }}>Jr.</span>
          </h1>

          {/* Bio */}
          <p
            className="fade-up"
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "1.05rem",
              color: "var(--fyro-gray-mid)",
              lineHeight: 1.75,
              maxWidth: 560,
              marginBottom: "2rem",
            }}
          >
            Founder of Fyro. AI consultant and custom agent architect for service-based
            companies. Featured speaker at IBM New York and Morehouse College's 2026
            DreamMakers Summit.
          </p>

          {/* CTAs */}
          <div className="fade-up" style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
            <Link href="/contact" className="fyro-btn-primary" style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem" }}>
              Book a 20-minute call
              <ArrowRight size={15} />
            </Link>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="fyro-link"
              style={{ alignSelf: "center" }}
            >
              LinkedIn <ArrowUpRight size={14} />
            </a>
          </div>
        </div>
      </section>

      {/* ── STORY SPLIT ── */}
      <section style={{ background: "var(--fyro-bg-section)", borderTop: "1px solid var(--fyro-border)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div
            className="fade-up"
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 0,
            }}
            id="story-grid"
          >
            {/* Photo */}
            <div style={{ overflow: "hidden", maxHeight: 600 }}>
              <img
                src="/manus-storage/rj_speaking_4_10cefbdc.jpeg"
                alt="Robert Robinson Jr. at Morehouse DreamMakers Summit"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  objectPosition: "center top",
                  display: "block",
                }}
              />
            </div>

            {/* Story text */}
            <div style={{ padding: "4rem 3.5rem", display: "flex", flexDirection: "column", justifyContent: "center" }}>
              <div style={{ marginBottom: "0.75rem" }}>
                <span className="fyro-section-label">The story</span>
              </div>
              <h2
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "clamp(1.75rem, 3vw, 2.5rem)",
                  fontWeight: 800,
                  color: "var(--fyro-near-black)",
                  letterSpacing: "-0.025em",
                  lineHeight: 1.15,
                  marginBottom: "1.5rem",
                }}
              >
                From understanding businesses to building the AI that runs them.
              </h2>
              <p
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "0.95rem",
                  color: "var(--fyro-gray-mid)",
                  lineHeight: 1.8,
                  marginBottom: "1.25rem",
                }}
              >
                RJ built Fyro around a simple observation: most companies know they need AI,
                but they don't know what to build. They buy tools that don't fit. They run
                pilots that don't ship. They end up with more complexity, not less.
              </p>
              <p
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "0.95rem",
                  color: "var(--fyro-gray-mid)",
                  lineHeight: 1.8,
                  marginBottom: "1.25rem",
                }}
              >
                The pattern was consistent. Companies that won with AI didn't buy a product —
                they built a system. Fyro closes that gap. RJ embeds directly into your
                business, learns how it actually operates, and builds AI agents and
                automations designed specifically for your workflows, your team, and your goals.
              </p>
              <p
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "0.95rem",
                  color: "var(--fyro-gray-mid)",
                  lineHeight: 1.8,
                }}
              >
                The result isn't a demo. It's a live system that runs your operation.
              </p>
            </div>
          </div>
        </div>
        <style>{`
          @media (max-width: 768px) {
            #story-grid { grid-template-columns: 1fr !important; }
          }
        `}</style>
      </section>

      {/* ── EXPERIENCE ── */}
      <section
        style={{
          padding: "6rem 0",
          background: "var(--fyro-bg)",
          borderTop: "1px solid var(--fyro-border)",
        }}
      >
        <div style={sectionStyle}>
          <div className="fade-up" style={{ marginBottom: "0.75rem" }}>
            <span className="fyro-section-label">Operating experience</span>
          </div>
          <h2
            className="fade-up"
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "clamp(1.75rem, 3vw, 2.5rem)",
              fontWeight: 800,
              color: "var(--fyro-near-black)",
              letterSpacing: "-0.025em",
              maxWidth: 560,
              marginBottom: "0.75rem",
            }}
          >
            Where the pattern recognition comes from.
          </h2>
          <p
            className="fade-up"
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "0.95rem",
              color: "var(--fyro-gray-mid)",
              maxWidth: 500,
              lineHeight: 1.75,
              marginBottom: "3.5rem",
            }}
          >
            Real engagements with real companies — not theory, not pilots.
            These are the organizations where Fyro has spoken, presented, or deployed.
          </p>

          <div
            className="fade-up"
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "3rem",
            }}
            id="exp-grid"
          >
            {/* Speaking */}
            <div>
              <div
                style={{
                  fontFamily: "'DM Mono', monospace",
                  fontSize: "0.65rem",
                  fontWeight: 500,
                  letterSpacing: "0.15em",
                  color: "var(--fyro-gray-mid)",
                  textTransform: "uppercase",
                  marginBottom: "0.5rem",
                }}
              >
                Speaking engagements
              </div>
              <p
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "0.875rem",
                  color: "var(--fyro-gray-mid)",
                  lineHeight: 1.7,
                  marginBottom: "1.25rem",
                }}
              >
                Invited to speak at leading institutions on AI agent architecture and
                custom automation for service businesses.
              </p>
              <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
                {["IBM New York", "Morehouse College", "AfroTech 2025 · Houston"].map((org) => (
                  <span key={org} className="fyro-pill">{org}</span>
                ))}
              </div>
            </div>

            {/* Clients */}
            <div>
              <div
                style={{
                  fontFamily: "'DM Mono', monospace",
                  fontSize: "0.65rem",
                  fontWeight: 500,
                  letterSpacing: "0.15em",
                  color: "var(--fyro-gray-mid)",
                  textTransform: "uppercase",
                  marginBottom: "0.5rem",
                }}
              >
                Industries served
              </div>
              <p
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "0.875rem",
                  color: "var(--fyro-gray-mid)",
                  lineHeight: 1.7,
                  marginBottom: "1.25rem",
                }}
              >
                Fyro works with service-based companies across all industries — building
                custom AI systems around each company's specific workflows and goals.
              </p>
              <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
                {["Government Contracting", "Fire Safety", "Mold & Odor Remediation", "HVAC & Trade Companies", "Professional Services", "Consulting Firms", "Technology Companies"].map((org) => (
                  <span key={org} className="fyro-pill">{org}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
        <style>{`
          @media (max-width: 640px) {
            #exp-grid { grid-template-columns: 1fr !important; }
          }
        `}</style>
      </section>

      {/* ── PHOTO STRIP ── */}
      <section
        style={{
          background: "var(--fyro-bg-section)",
          borderTop: "1px solid var(--fyro-border)",
          borderBottom: "1px solid var(--fyro-border)",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(5, 1fr)",
            gap: 0,
            height: 280,
          }}
          id="photo-strip"
        >
          {[
            "/manus-storage/rj_speaking_1_0561f4b4.jpeg",
            "/manus-storage/rj_speaking_2_073b0301.jpeg",
            "/manus-storage/rj_speaking_3_2a87d240.jpeg",
            "/manus-storage/rj_ibm_23dcc16d.jpg",
            "/manus-storage/IMG_4713_7c20d053.jpg",
          ].map((src, i) => (
            <div key={i} style={{ overflow: "hidden" }}>
              <img
                src={src}
                alt={`RJ speaking engagement ${i + 1}`}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  objectPosition: "center top",
                  display: "block",
                  transition: "transform 0.4s ease",
                }}
                onMouseEnter={(e) => ((e.target as HTMLElement).style.transform = "scale(1.04)")}
                onMouseLeave={(e) => ((e.target as HTMLElement).style.transform = "scale(1)")}
              />
            </div>
          ))}
        </div>
        <style>{`
          @media (max-width: 900px) {
            #photo-strip { grid-template-columns: repeat(3, 1fr) !important; height: auto !important; }
            #photo-strip > div { height: 200px; }
          }
          @media (max-width: 600px) {
            #photo-strip { grid-template-columns: repeat(2, 1fr) !important; height: auto !important; }
            #photo-strip > div { height: 180px; }
          }
        `}</style>
      </section>

      {/* ── PRINCIPLES ── */}
      <section style={{ padding: "6rem 0", background: "var(--fyro-bg)" }}>
        <div style={sectionStyle}>
          <div className="fade-up" style={{ marginBottom: "0.75rem" }}>
            <span className="fyro-section-label">Operating principles</span>
          </div>
          <h2
            className="fade-up"
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "clamp(1.75rem, 3vw, 2.5rem)",
              fontWeight: 800,
              color: "var(--fyro-near-black)",
              letterSpacing: "-0.025em",
              marginBottom: "0.5rem",
            }}
          >
            Four principles. Every engagement.
          </h2>
          <p
            className="fade-up"
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "0.95rem",
              color: "var(--fyro-gray-mid)",
              maxWidth: 480,
              lineHeight: 1.75,
              marginBottom: "3.5rem",
            }}
          >
            These show up in every discovery call, every architecture decision, and every
            deployment. If a recommendation doesn't pass all four, it doesn't ship.
          </p>

          <div
            className="fade-up"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: "2rem",
            }}
            id="principles-grid"
          >
            {[
              {
                title: "Results over hype.",
                body: "The AI industry is noise. Every engagement is measured by operational outcomes — time saved, revenue impact, decision velocity. If a system doesn't produce measurable results, it doesn't ship.",
              },
              {
                title: "Custom over generic.",
                body: "Off-the-shelf AI tools solve generic problems. Fyro builds systems designed specifically for your business — your data, your workflows, your team. Generic doesn't compound.",
              },
              {
                title: "Systems over tasks.",
                body: "Anyone can automate a single workflow. Fyro builds interconnected AI systems that compound performance across your entire operation — not just one corner of it.",
              },
              {
                title: "Deployment over pilots.",
                body: "We don't run experiments. Every engagement is designed to reach live operational deployment — not to generate a report about what might be possible.",
              },
            ].map((p) => (
              <div
                key={p.title}
                style={{
                  paddingTop: "1.5rem",
                  borderTop: "2px solid var(--fyro-border)",
                }}
              >
                <h3
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "1rem",
                    fontWeight: 700,
                    color: "var(--fyro-near-black)",
                    letterSpacing: "-0.01em",
                    marginBottom: "0.75rem",
                  }}
                >
                  {p.title}
                </h3>
                <p
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "0.875rem",
                    color: "var(--fyro-gray-mid)",
                    lineHeight: 1.75,
                  }}
                >
                  {p.body}
                </p>
              </div>
            ))}
          </div>
        </div>
        <style>{`
          @media (max-width: 900px) {
            #principles-grid { grid-template-columns: repeat(2, 1fr) !important; }
          }
          @media (max-width: 560px) {
            #principles-grid { grid-template-columns: 1fr !important; }
          }
        `}</style>
      </section>

      {/* ── FAQ ── */}
      <section
        style={{
          padding: "6rem 0",
          background: "var(--fyro-bg-section)",
          borderTop: "1px solid var(--fyro-border)",
        }}
      >
        <div style={sectionStyle}>
          <div className="fade-up" style={{ marginBottom: "0.75rem" }}>
            <span className="fyro-section-label">FAQ</span>
          </div>
          <h2
            className="fade-up"
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "clamp(1.75rem, 3vw, 2.5rem)",
              fontWeight: 800,
              color: "var(--fyro-near-black)",
              letterSpacing: "-0.025em",
              marginBottom: "3rem",
            }}
          >
            Frequently asked questions.
          </h2>

          <div className="fade-up" style={{ maxWidth: 720 }}>
            {[
              {
                q: "Who is Robert Robinson Jr.?",
                a: "Robert Robinson Jr. (RJ) is the founder of Fyro, an AI consultant and custom agent architect based in the United States. He designs and deploys custom AI agent systems for service-based companies, helping them automate workflows and scale operations.",
              },
              {
                q: "What does Fyro do?",
                a: "Fyro embeds directly into your business, learns your workflows and goals, then builds custom AI agents and automations designed specifically for your company. We don't sell software — we build systems.",
              },
              {
                q: "What industries does Fyro serve?",
                a: "Fyro serves service-based companies across a wide range of industries — including government contracting, fire safety, mold & odor remediation, HVAC and trade companies, professional services, consulting firms, and technology companies. If your company has repetitive workflows and a team that's stretched thin, Fyro can help.",
              },
              {
                q: "What is the RFP Response Agent?",
                a: "The RFP Response Agent is a custom AI system built for government contractors and service firms that respond to RFPs. It reads incoming RFPs, extracts key requirements, and drafts compliant, tailored responses — cutting response time from days to hours.",
              },
              {
                q: "How do I get started?",
                a: "Book a free 20-minute discovery call. We'll walk through your operation, identify the highest-leverage AI opportunities, and tell you exactly what we'd build — no commitment required.",
              },
            ].map((faq, i) => (
              <div
                key={i}
                style={{
                  borderBottom: "1px solid var(--fyro-border)",
                }}
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "1.25rem 0",
                    background: "none",
                    border: "none",
                    textAlign: "left",
                    gap: "1rem",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "0.95rem",
                      fontWeight: 600,
                      color: "var(--fyro-near-black)",
                      letterSpacing: "-0.01em",
                    }}
                  >
                    {faq.q}
                  </span>
                  <span
                    style={{
                      fontFamily: "'DM Mono', monospace",
                      fontSize: "1.1rem",
                      color: "var(--fyro-gray-mid)",
                      flexShrink: 0,
                      transition: "transform 0.2s ease",
                      display: "inline-block",
                      transform: openFaq === i ? "rotate(45deg)" : "rotate(0deg)",
                    }}
                  >
                    +
                  </span>
                </button>
                {openFaq === i && (
                  <p
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "0.9rem",
                      color: "var(--fyro-gray-mid)",
                      lineHeight: 1.75,
                      paddingBottom: "1.25rem",
                    }}
                  >
                    {faq.a}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BOOK CTA ── */}
      <section style={{ padding: "6rem 0", background: "var(--fyro-bg)", borderTop: "1px solid var(--fyro-border)" }}>
        <div style={sectionStyle}>
          <div className="fade-up">
            <div style={{ marginBottom: "0.75rem" }}>
              <span className="fyro-section-label">Book a call</span>
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
              Ready to see what Fyro can build for you?
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
              20 minutes. Walk us through your operation. We'll tell you exactly
              what we'd build and what it would do for your business.
            </p>
            <Link href="/contact" className="fyro-btn-primary" style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem" }}>
              Pick a time
              <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
