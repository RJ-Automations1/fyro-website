/**
 * FYRO — INSIGHTS PAGE
 * Full article index with category filtering
 * Off-white bg, near-black text, red accents
 */
import { useEffect, useState } from "react";
import { Link } from "wouter";
import { ArrowUpRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const CATEGORIES = ["ALL", "AI AGENTS", "AUTOMATION", "STRATEGY", "IMPLEMENTATION", "VOICE AI"];

const ARTICLES = [
  { slug: "why-89-percent-of-ai-agent-projects-never-reach-production", category: "AI AGENTS", date: "MAY 2026", title: "Why 89% of AI Agent Projects Never Reach Production", read: "8 min read", subtitle: "The gap between a working demo and a deployed system is where most AI initiatives die. Here's what actually goes wrong — and how to avoid it." },
  { slug: "the-difference-between-ai-experimentation-and-ai-transformation", category: "IMPLEMENTATION", date: "APRIL 2026", title: "The Difference Between AI Experimentation and AI Transformation", read: "11 min read", subtitle: "Most companies are stuck in permanent pilot mode. Here's what it takes to move from experimenting with AI to actually transforming how your business operates." },
  { slug: "how-to-map-your-workflows-before-you-automate-them", category: "AUTOMATION", date: "APRIL 2026", title: "How to Map Your Workflows Before You Automate Them", read: "7 min read", subtitle: "Automating a broken process just makes it break faster. Before you build, you need to understand exactly what you're building — and why." },
  { slug: "build-vs-buy-when-off-the-shelf-ai-tools-stop-working", category: "STRATEGY", date: "MARCH 2026", title: "Build vs. Buy: When Off-the-Shelf AI Tools Stop Working for Your Business", read: "9 min read", subtitle: "SaaS AI tools are fast to deploy and easy to justify. But there's a point where every growing service company outgrows them." },
  { slug: "voice-agents-are-not-just-chatbots", category: "VOICE AI", date: "MARCH 2026", title: "Voice Agents Are Not Just Chatbots — Here's What Changes", read: "6 min read", subtitle: "The difference between a voice agent and a chatbot is not the interface. It's the architecture, the latency tolerance, and the decision model." },
  { slug: "what-makes-an-rfp-agent-actually-useful", category: "AI AGENTS", date: "FEBRUARY 2026", title: "What Makes an RFP Agent Actually Useful for Government Contractors", read: "10 min read", subtitle: "Most RFP tools are glorified templates. Here's what separates an agent that actually wins contracts from one that just saves formatting time." },
];

export default function Insights() {
  const [activeCategory, setActiveCategory] = useState("ALL");

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

  const filtered = activeCategory === "ALL" ? ARTICLES : ARTICLES.filter((a) => a.category === activeCategory);
  const sectionStyle = { maxWidth: 1200, margin: "0 auto", padding: "0 2.5rem" };

  return (
    <div style={{ background: "var(--fyro-bg)", minHeight: "100vh" }}>
      <Navbar />

      {/* ── HERO ── */}
      <section style={{ paddingTop: 64, background: "var(--fyro-bg)" }}>
        <div style={{ ...sectionStyle, padding: "5rem 2.5rem 4rem" }}>
          <div className="fade-up" style={{ marginBottom: "1.75rem" }}>
            <span className="fyro-category-pill">Insights</span>
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
            Practitioner thinking on AI for service companies.
          </h1>
          <p
            className="fade-up"
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "1.05rem",
              color: "var(--fyro-gray-mid)",
              lineHeight: 1.75,
              maxWidth: 520,
            }}
          >
            No hype. No generic frameworks. Just honest writing on what it actually takes
            to build and deploy AI systems that work inside real service businesses.
          </p>
        </div>
      </section>

      {/* ── ARTICLES ── */}
      <section style={{ padding: "0 0 7rem", background: "var(--fyro-bg)", borderTop: "1px solid var(--fyro-border)" }}>
        <div style={{ ...sectionStyle, paddingTop: "3rem" }}>

          {/* Category filters */}
          <div
            className="fade-up"
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "0.5rem",
              marginBottom: "3rem",
              paddingBottom: "2rem",
              borderBottom: "1px solid var(--fyro-border)",
            }}
          >
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                style={{
                  fontFamily: "'DM Mono', monospace",
                  fontSize: "0.65rem",
                  fontWeight: 600,
                  letterSpacing: "0.1em",
                  padding: "0.4rem 0.9rem",
                  borderRadius: "999px",
                  border: `1px solid ${activeCategory === cat ? "var(--fyro-near-black)" : "var(--fyro-border)"}`,
                  background: activeCategory === cat ? "var(--fyro-near-black)" : "transparent",
                  color: activeCategory === cat ? "#fff" : "var(--fyro-gray-mid)",
                  cursor: "pointer",
                  transition: "all 0.18s ease",
                }}
                onMouseEnter={(e) => {
                  if (activeCategory !== cat) {
                    (e.currentTarget as HTMLElement).style.borderColor = "var(--fyro-near-black)";
                    (e.currentTarget as HTMLElement).style.color = "var(--fyro-near-black)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (activeCategory !== cat) {
                    (e.currentTarget as HTMLElement).style.borderColor = "var(--fyro-border)";
                    (e.currentTarget as HTMLElement).style.color = "var(--fyro-gray-mid)";
                  }
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Article list */}
          <div className="fade-up" style={{ display: "flex", flexDirection: "column", gap: 0 }}>
            {filtered.map((article, i) => (
              <Link
                key={article.slug}
                href={`/insights/${article.slug}`}
                style={{ textDecoration: "none", display: "block" }}
              >
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr auto",
                    gap: "2rem",
                    alignItems: "start",
                    padding: "2rem 0",
                    borderBottom: "1px solid var(--fyro-border)",
                    cursor: "pointer",
                    transition: "background 0.15s ease",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.background = "rgba(200,16,46,0.02)";
                    (e.currentTarget as HTMLElement).style.paddingLeft = "0.75rem";
                    (e.currentTarget as HTMLElement).style.paddingRight = "0.75rem";
                    (e.currentTarget as HTMLElement).style.marginLeft = "-0.75rem";
                    (e.currentTarget as HTMLElement).style.marginRight = "-0.75rem";
                    (e.currentTarget as HTMLElement).style.borderRadius = "6px";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.background = "transparent";
                    (e.currentTarget as HTMLElement).style.paddingLeft = "0";
                    (e.currentTarget as HTMLElement).style.paddingRight = "0";
                    (e.currentTarget as HTMLElement).style.marginLeft = "0";
                    (e.currentTarget as HTMLElement).style.marginRight = "0";
                    (e.currentTarget as HTMLElement).style.borderRadius = "0";
                  }}
                  id={`article-row-${i}`}
                >
                  <div>
                    <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "0.75rem" }}>
                      <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.6rem", fontWeight: 600, letterSpacing: "0.12em", color: "var(--fyro-red)" }}>{article.category}</span>
                      <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.6rem", color: "var(--fyro-gray-mid)", letterSpacing: "0.06em" }}>{article.date}</span>
                      <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.75rem", color: "var(--fyro-gray-mid)" }}>{article.read}</span>
                    </div>
                    <h2
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: "1.15rem",
                        fontWeight: 700,
                        color: "var(--fyro-near-black)",
                        letterSpacing: "-0.015em",
                        lineHeight: 1.35,
                        marginBottom: "0.6rem",
                      }}
                    >
                      {article.title}
                    </h2>
                    <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.875rem", color: "var(--fyro-gray-mid)", lineHeight: 1.65, maxWidth: 620 }}>
                      {article.subtitle}
                    </p>
                  </div>
                  <div style={{ paddingTop: "0.25rem", flexShrink: 0 }}>
                    <ArrowUpRight size={18} color="var(--fyro-gray-mid)" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
