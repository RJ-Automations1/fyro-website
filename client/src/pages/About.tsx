/*
 * FYRO ABOUT PAGE
 * About the company, not the person: what Fyro is, why it exists, who it
 * serves, how it works, FAQ. The founder gets one card here that links to
 * /founder, where RJ's name, photos, and speaking credentials live.
 */
import { useEffect, useRef, useState } from "react";
import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FyroLogo from "@/components/FyroLogo";

const INDUSTRIES = [
  "Government Contracting",
  "Fire Safety",
  "Mold & Odor Remediation",
  "HVAC & Trade Companies",
  "Professional Services",
  "Consulting Firms",
  "Technology Companies",
];

const PRINCIPLES = [
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
];

const FAQS = [
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
    q: "Who founded Fyro?",
    a: "Fyro was founded by Robert Robinson Jr. (RJ), an AI consultant and custom agent architect who has spoken at IBM New York and Morehouse College's DreamMakers Summit.",
  },
  {
    q: "How do I get started?",
    a: "Book a free 15-minute discovery call. We'll walk through your operation, identify the highest-leverage AI opportunities, and tell you exactly what we'd build — no commitment required.",
  },
];

const h2Style = {
  fontFamily: "'Inter', sans-serif",
  fontSize: "clamp(1.75rem, 3vw, 2.5rem)",
  fontWeight: 800,
  color: "var(--fyro-near-black)",
  letterSpacing: "-0.025em",
  lineHeight: 1.15,
};

const bodyText = {
  fontFamily: "'DM Sans', sans-serif",
  fontSize: "0.95rem",
  color: "var(--fyro-gray-mid)",
  lineHeight: 1.8,
};

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
      <section style={{ paddingTop: 64, background: "var(--fyro-bg)", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 80% 30%, rgba(248,121,4,0.10) 0%, transparent 60%)" }} />
        <div style={{ ...sectionStyle, padding: "5rem 2.5rem 4.5rem", position: "relative" }}>
          <div className="fade-up" style={{ marginBottom: "1.75rem" }}>
            <span className="fyro-category-pill">About Fyro</span>
          </div>

          <h1
            className="fade-up"
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "clamp(2.5rem, 5.5vw, 4.5rem)",
              fontWeight: 800,
              color: "var(--fyro-near-black)",
              letterSpacing: "-0.03em",
              lineHeight: 1.05,
              maxWidth: 860,
              marginBottom: "1.5rem",
            }}
          >
            An AI consulting firm that{" "}
            <span style={{ color: "var(--fyro-orange)" }}>builds, not advises.</span>
          </h1>

          <p className="fade-up" style={{ ...bodyText, fontSize: "1.1rem", maxWidth: 600, marginBottom: "2rem" }}>
            Fyro designs and deploys custom AI agents and internal software for
            service-based companies — the systems your team actually runs on, built
            around how your operation already works.
          </p>

          <div className="fade-up" style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
            <Link href="/contact" className="fyro-btn-primary" style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem" }}>
              Book a 15-minute call
              <ArrowRight size={15} />
            </Link>
            <Link href="/building" className="fyro-btn-outline">
              See what we&rsquo;re building
            </Link>
          </div>
        </div>
      </section>

      {/* ── WHY FYRO EXISTS ── */}
      <section style={{ background: "var(--fyro-bg-section)", borderTop: "1px solid var(--fyro-border)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div className="fade-up" id="story-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 0 }}>
            {/* The mark stands where the founder photo used to. */}
            <div
              style={{
                minHeight: 440,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "radial-gradient(circle at 50% 45%, rgba(248,121,4,0.14) 0%, var(--fyro-black) 70%)",
                borderRight: "1px solid var(--fyro-border)",
              }}
            >
              <FyroLogo variant="lockup" height={230} />
            </div>

            <div style={{ padding: "4rem 3.5rem", display: "flex", flexDirection: "column", justifyContent: "center" }}>
              <div style={{ marginBottom: "0.75rem" }}>
                <span className="fyro-section-label">Why Fyro exists</span>
              </div>
              <h2 style={{ ...h2Style, marginBottom: "1.5rem" }}>
                Most companies know they need AI. They don&rsquo;t know what to build.
              </h2>
              <p style={{ ...bodyText, marginBottom: "1.25rem" }}>
                They buy tools that don&rsquo;t fit. They run pilots that don&rsquo;t ship.
                They end up with more complexity, not less.
              </p>
              <p style={{ ...bodyText, marginBottom: "1.25rem" }}>
                The companies that win with AI don&rsquo;t buy a product — they build a
                system. Fyro closes that gap. We embed directly into your business, learn
                how it actually operates, and build AI agents and automations designed
                for your workflows, your team, and your goals.
              </p>
              <p style={bodyText}>
                The result isn&rsquo;t a demo. It&rsquo;s a live system that runs your operation.
              </p>
            </div>
          </div>
        </div>
        <style>{`
          @media (max-width: 768px) {
            #story-grid { grid-template-columns: 1fr !important; }
            #story-grid > div:first-child { min-height: 300px !important; border-right: none !important; }
            #story-grid > div:first-child img { height: 170px !important; }
            #story-grid > div:last-child { padding: 3rem 1.5rem !important; }
          }
        `}</style>
      </section>

      {/* ── WHO WE SERVE ── */}
      <section style={{ padding: "6rem 0", background: "var(--fyro-bg)", borderTop: "1px solid var(--fyro-border)" }}>
        <div style={sectionStyle}>
          <div className="fade-up" id="serve-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "3rem", alignItems: "start" }}>
            <div>
              <div style={{ marginBottom: "0.75rem" }}>
                <span className="fyro-section-label">Who we serve</span>
              </div>
              <h2 style={{ ...h2Style, maxWidth: 480, marginBottom: "1rem" }}>
                Service companies with real work and stretched teams.
              </h2>
              <p style={{ ...bodyText, maxWidth: 460 }}>
                Fyro works with service-based companies across industries — building custom
                AI systems around each company&rsquo;s specific workflows and goals.
              </p>
            </div>
            <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", paddingTop: "0.5rem" }}>
              {INDUSTRIES.map((org) => (
                <span key={org} className="fyro-pill">{org}</span>
              ))}
            </div>
          </div>
        </div>
        <style>{`
          @media (max-width: 768px) {
            #serve-grid { grid-template-columns: 1fr !important; }
          }
        `}</style>
      </section>

      {/* ── PRINCIPLES ── */}
      <section style={{ padding: "6rem 0", background: "var(--fyro-bg-section)", borderTop: "1px solid var(--fyro-border)" }}>
        <div style={sectionStyle}>
          <div className="fade-up" style={{ marginBottom: "0.75rem" }}>
            <span className="fyro-section-label">Operating principles</span>
          </div>
          <h2 className="fade-up" style={{ ...h2Style, marginBottom: "0.5rem" }}>
            Four principles. Every engagement.
          </h2>
          <p className="fade-up" style={{ ...bodyText, maxWidth: 480, marginBottom: "3.5rem" }}>
            These show up in every discovery call, every architecture decision, and every
            deployment. If a recommendation doesn&rsquo;t pass all four, it doesn&rsquo;t ship.
          </p>

          <div className="fade-up" id="principles-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "2rem" }}>
            {PRINCIPLES.map((p) => (
              <div key={p.title} style={{ paddingTop: "1.5rem", borderTop: "2px solid var(--fyro-orange)" }}>
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
                <p style={{ ...bodyText, fontSize: "0.875rem", lineHeight: 1.75 }}>{p.body}</p>
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

      {/* ── FOUNDER CARD ── one link out; the person has a page of their own. */}
      <section style={{ padding: "5rem 0", background: "var(--fyro-bg)", borderTop: "1px solid var(--fyro-border)" }}>
        <div style={sectionStyle}>
          <Link href="/founder" style={{ textDecoration: "none", display: "block" }} className="fade-up">
            <div
              id="founder-card"
              style={{
                display: "grid",
                gridTemplateColumns: "120px 1fr auto",
                gap: "2rem",
                alignItems: "center",
                padding: "1.75rem",
                background: "var(--fyro-panel)",
                border: "1px solid var(--fyro-border)",
                borderRadius: 8,
              }}
            >
              <div style={{ width: 120, height: 120, borderRadius: 6, overflow: "hidden" }}>
                <img
                  src="/manus-storage/rj_speaking_4_10cefbdc.jpeg"
                  alt="Robert Robinson Jr., founder of Fyro"
                  style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top", display: "block" }}
                />
              </div>
              <div>
                <span className="fyro-section-label">Meet the founder</span>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "1.35rem", fontWeight: 700, color: "var(--fyro-near-black)", margin: "0.4rem 0 0.35rem" }}>
                  Robert Robinson Jr.
                </p>
                <p style={{ ...bodyText, fontSize: "0.9rem", lineHeight: 1.6 }}>
                  Founder &amp; owner. Speaker at IBM New York, Morehouse College, and AfroTech 2025.
                </p>
              </div>
              <span className="fyro-link" style={{ whiteSpace: "nowrap" }}>
                Read the story <ArrowRight size={15} />
              </span>
            </div>
          </Link>
        </div>
        <style>{`
          @media (max-width: 640px) {
            #founder-card { grid-template-columns: 80px 1fr !important; gap: 1.25rem !important; }
            #founder-card > div:first-child { width: 80px !important; height: 80px !important; }
            #founder-card > span { grid-column: 1 / -1; }
          }
        `}</style>
      </section>

      {/* ── FAQ ── */}
      <section style={{ padding: "6rem 0", background: "var(--fyro-bg-section)", borderTop: "1px solid var(--fyro-border)" }}>
        <div style={sectionStyle}>
          <div className="fade-up" style={{ marginBottom: "0.75rem" }}>
            <span className="fyro-section-label">FAQ</span>
          </div>
          <h2 className="fade-up" style={{ ...h2Style, marginBottom: "3rem" }}>
            Frequently asked questions.
          </h2>

          <div className="fade-up" style={{ maxWidth: 720 }}>
            {FAQS.map((faq, i) => (
              <div key={faq.q} style={{ borderBottom: "1px solid var(--fyro-border)" }}>
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
                  <p style={{ ...bodyText, fontSize: "0.9rem", lineHeight: 1.75, paddingBottom: "1.25rem" }}>
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
            <h2 style={{ ...h2Style, marginBottom: "1rem" }}>
              Ready to see what Fyro can build for you?
            </h2>
            <p style={{ ...bodyText, fontSize: "1rem", lineHeight: 1.75, maxWidth: 440, marginBottom: "2rem" }}>
              15 minutes. Walk us through your operation. We&rsquo;ll tell you exactly
              what we&rsquo;d build and what it would do for your business.
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
