/*
 * FYRO SERVICES PAGE — Hendricks.ai-inspired
 * Same structure as "Assembly Lines" page — detailed service breakdowns
 */
import { useEffect } from "react";
import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function Services() {
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
    document.querySelectorAll(".fade-up").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const sectionStyle = { maxWidth: 1200, margin: "0 auto", padding: "0 2.5rem" };

  const services = [
    {
      tag: "FOR GOVERNMENT CONTRACTORS & SERVICE FIRMS",
      title: "RFP Response Agent",
      sub: "Cut RFP response time from days to hours.",
      body: "The RFP Response Agent reads incoming requests for proposals, extracts all key requirements, compliance criteria, and evaluation factors, then drafts a structured, tailored response aligned to your firm's capabilities and past performance. Built for government contractors, professional services firms, and any company that wins business through formal proposal processes.",
      capabilities: [
        "Automatic requirement extraction and compliance mapping",
        "Draft generation aligned to your firm's voice and past performance",
        "Section-by-section response structuring",
        "Human review gate before final submission",
        "Integration with your document management system",
      ],
      client: null,
    },
    {
      tag: "FOR FIRMS WHOSE GROWTH DEPENDS ON THROUGHPUT",
      title: "Workflow Automation",
      sub: "Replace manual processes with intelligent automations that run 24/7.",
      body: "We map your most time-consuming manual workflows — client intake, reporting, follow-up, scheduling, document processing — and replace them with intelligent automations integrated directly into your existing tools. No new software to learn. No process overhaul. Just the same work, done automatically.",
      capabilities: [
        "Client intake and onboarding automation",
        "Automated reporting and data aggregation",
        "Follow-up and communication sequences",
        "Document generation and routing",
        "CRM and project management integration",
      ],
      client: null,
    },
    {
      tag: "FOR FIRMS WHOSE GROWTH DEPENDS ON INTELLIGENCE",
      title: "Custom AI Agents",
      sub: "AI agents built specifically for your business — not a generic tool.",
      body: "Generic AI tools solve generic problems. Fyro builds AI agents trained on your data, integrated with your systems, and designed to handle the specific work your team shouldn't be doing manually. Every agent is custom-architected around your workflows, your terminology, and your decision-making process.",
      capabilities: [
        "Custom training on your company's data and documents",
        "Integration with your existing tech stack",
        "Role-specific agents (sales, ops, client services)",
        "Human-in-the-loop approval gates",
        "Ongoing tuning and performance monitoring",
      ],
      client: null,
    },
    {
      tag: "FOR FIRMS WHOSE GROWTH DEPENDS ON STRATEGY",
      title: "AI Strategy Consulting",
      sub: "Know exactly what to build before you build it.",
      body: "Not sure where AI fits in your operation? Fyro audits your current workflows, identifies the highest-leverage automation opportunities, and delivers a prioritized roadmap with clear ROI projections for each initiative. No generic frameworks — a specific plan built around your business.",
      capabilities: [
        "Operational audit and workflow mapping",
        "AI opportunity identification and prioritization",
        "ROI projection for each initiative",
        "Build-vs-buy analysis",
        "Implementation roadmap with clear milestones",
      ],
      client: null,
    },
    {
      tag: "FOR FIRMS WHOSE GROWTH DEPENDS ON RESPONSIVENESS",
      title: "Voice & Conversational Agents",
      sub: "Handle inbound inquiries and qualify leads without a human on the other end.",
      body: "Deploy intelligent voice and chat agents that handle inbound calls, qualify leads, answer common questions, and route conversations to the right person — 24 hours a day, 7 days a week. Built around your company's specific products, services, and qualification criteria.",
      capabilities: [
        "Inbound call and chat handling",
        "Lead qualification and routing",
        "FAQ and knowledge base integration",
        "CRM logging and follow-up triggering",
        "Escalation to human agents when needed",
      ],
      client: null,
    },
  ];

  return (
    <div style={{ background: "var(--fyro-bg)", minHeight: "100vh" }}>
      <Navbar />

      {/* ── HERO ── */}
      <section style={{ paddingTop: 64, background: "var(--fyro-bg)" }}>
        <div style={{ ...sectionStyle, padding: "5rem 2.5rem 4rem" }}>
          <div className="fade-up" style={{ marginBottom: "1.75rem" }}>
            <span className="fyro-category-pill">Services</span>
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
            Custom AI systems for service companies.
          </h1>
          <p
            className="fade-up"
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "1.05rem",
              color: "var(--fyro-gray-mid)",
              lineHeight: 1.75,
              maxWidth: 520,
              marginBottom: "2rem",
            }}
          >
            Every system Fyro builds is designed from scratch around your specific operation —
            your workflows, your data, your team. Not a product. Not a plugin. A system.
          </p>
          <div className="fade-up">
            <Link href="/contact" className="fyro-btn-primary" style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem" }}>
              Book a Free 15-Minute Discovery Call
              <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </section>

      {/* ── SERVICE LISTINGS ── */}
      {services.map((service, i) => (
        <section
          key={service.title}
          style={{
            padding: "5rem 0",
            background: i % 2 === 0 ? "var(--fyro-bg-section)" : "var(--fyro-bg)",
            borderTop: "1px solid var(--fyro-border)",
          }}
        >
          <div style={sectionStyle}>
            <div className="fade-up" style={{ marginBottom: "0.75rem" }}>
              <span className="fyro-section-label">{service.tag}</span>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "4rem",
                alignItems: "start",
              }}
              id={`service-detail-${i}`}
            >
              {/* Left */}
              <div>
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
                  {service.title}
                </h2>
                <p
                  className="fade-up"
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "1rem",
                    fontWeight: 600,
                    color: "var(--fyro-red)",
                    marginBottom: "1.25rem",
                  }}
                >
                  {service.sub}
                </p>
                <p
                  className="fade-up"
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "0.95rem",
                    color: "var(--fyro-gray-mid)",
                    lineHeight: 1.8,
                    marginBottom: "2rem",
                  }}
                >
                  {service.body}
                </p>
                {service.client && (
                  <div className="fade-up">
                    <div
                      style={{
                        fontFamily: "'DM Mono', monospace",
                        fontSize: "0.65rem",
                        letterSpacing: "0.15em",
                        color: "var(--fyro-gray-mid)",
                        textTransform: "uppercase",
                        marginBottom: "0.5rem",
                      }}
                    >
                      Live deployment
                    </div>
                    <span className="fyro-pill">{service.client}</span>
                  </div>
                )}
                {service.title === "RFP Response Agent" && (
                  <div className="fade-up" style={{ marginTop: "1.5rem" }}>
                    <Link
                      href="/rfp-agent"
                      style={{
                        display: "inline-flex", alignItems: "center", gap: "0.5rem",
                        fontFamily: "'DM Mono', monospace",
                        fontSize: "0.7rem", fontWeight: 600,
                        color: "var(--fyro-red)", letterSpacing: "0.06em",
                        textDecoration: "none",
                        borderBottom: "1px solid rgba(200,16,46,0.3)",
                        paddingBottom: "0.1rem",
                      }}
                    >
                      SEE LIVE WALKTHROUGH <ArrowRight size={12} />
                    </Link>
                  </div>
                )}
              </div>

              {/* Right: Capabilities */}
              <div className="fade-up">
                <div
                  style={{
                    fontFamily: "'DM Mono', monospace",
                    fontSize: "0.65rem",
                    letterSpacing: "0.15em",
                    color: "var(--fyro-gray-mid)",
                    textTransform: "uppercase",
                    marginBottom: "1.25rem",
                  }}
                >
                  What's included
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
                  {service.capabilities.map((cap, j) => (
                    <div
                      key={j}
                      style={{
                        display: "flex",
                        alignItems: "flex-start",
                        gap: "0.75rem",
                        padding: "0.9rem 0",
                        borderBottom: j < service.capabilities.length - 1 ? "1px solid var(--fyro-border)" : "none",
                      }}
                    >
                      <div
                        style={{
                          width: 6,
                          height: 6,
                          borderRadius: "50%",
                          background: "var(--fyro-red)",
                          flexShrink: 0,
                          marginTop: "0.45rem",
                        }}
                      />
                      <span
                        style={{
                          fontFamily: "'DM Sans', sans-serif",
                          fontSize: "0.9rem",
                          color: "var(--fyro-near-black)",
                          lineHeight: 1.6,
                        }}
                      >
                        {cap}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <style>{`
            @media (max-width: 768px) {
              #service-detail-${i} { grid-template-columns: 1fr !important; gap: 2rem !important; }
            }
          `}</style>
        </section>
      ))}

      {/* ── CTA ── */}
      <section style={{ padding: "6rem 0", background: "var(--fyro-bg)", borderTop: "1px solid var(--fyro-border)" }}>
        <div style={sectionStyle}>
          <div className="fade-up">
            <div style={{ marginBottom: "0.75rem" }}>
              <span className="fyro-section-label">Get started</span>
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
              Not sure which service fits your operation?
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
              Book a Free 15-Minute Discovery Call. We'll walk through your workflows and tell you
              exactly what we'd build — and what it would do for your business.
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
