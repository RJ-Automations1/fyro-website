/**
 * FYRO — SPEAKING PAGE
 * RJ's speaking engagements: IBM New York, Morehouse DreamMakers Summit, teaching sessions
 * Off-white bg, near-black text, red accents
 */
import { useEffect } from "react";
import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const ENGAGEMENTS = [
  {
    tag: "IBM · NEW YORK",
    title: "Building AI agents that actually fit your company.",
    body: "Presented to business leaders at IBM's New York headquarters on building AI agent systems that integrate with real company workflows — not generic tools, but systems designed from the inside out. Covered the gap between AI demos and production deployments, and what it actually takes to build something that sticks.",
    img: "/manus-storage/rj_ibm_23dcc16d.jpg",
    alt: "RJ speaking at IBM New York",
    year: "2025",
    type: "Keynote presentation",
  },
  {
    tag: "MOREHOUSE COLLEGE · DREAMMAKERS SUMMIT 2026",
    title: "AI as a business tool — not a buzzword.",
    body: "Keynote speaker at Morehouse College's DreamMakers Summit 2026, presenting to student entrepreneurs and business leaders on the practical application of AI agents for service-based businesses. Focused on real implementation, real ROI, and the mindset shift required to go from experimenting with AI to actually transforming how a business operates.",
    img: "/manus-storage/rj_speaking_1_0561f4b4.jpeg",
    alt: "RJ speaking at Morehouse DreamMakers Summit 2026",
    year: "2026",
    type: "Summit keynote",
  },
  {
    tag: "MOREHOUSE COLLEGE · VOICE AGENTS WORKSHOP",
    title: "Teaching the next generation to build with AI.",
    body: "Led a hands-on workshop at Morehouse College on building voice agents and conversational AI systems. Students learned how to architect, build, and deploy real AI agents — not just use existing tools, but understand the underlying systems and build custom solutions for real business problems.",
    img: "/manus-storage/rj_morehouse_teaching_2665d36f.jpeg",
    alt: "RJ teaching voice agents at Morehouse College",
    year: "2026",
    type: "Workshop",
  },
  {
    tag: "AFROTECH 2025 · HOUSTON",
    title: "Fyro selected and featured at AfroTech 2025.",
    body: "Fyro was selected to compete and was featured at AfroTech 2025 in Houston — recognized for building custom AI agent systems for service-based and entrepreneurial businesses. One of the few companies showcased for purpose-built AI that goes beyond off-the-shelf tools and integrates directly into how a business actually operates.",
    img: null as string | null,
    alt: "",
    year: "2025",
    type: "Competition & feature",
  },
];

const GALLERY_IMGS = [
  { src: "/manus-storage/rj_speaking_1_0561f4b4.jpeg", alt: "DreamMakers Summit — stage" },
  { src: "/manus-storage/rj_speaking_2_073b0301.jpeg", alt: "DreamMakers Summit — presenting" },
  { src: "/manus-storage/rj_speaking_3_2a87d240.jpeg", alt: "DreamMakers Summit — full stage" },
  { src: "/manus-storage/rj_speaking_4_10cefbdc.jpeg", alt: "DreamMakers Summit — close up" },
  { src: "/manus-storage/IMG_4713_7c20d053.jpg", alt: "RJ with guest at Morehouse DreamMakers Summit" },
];

export default function Speaking() {
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
            <span className="fyro-category-pill">Speaking & engagements</span>
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
            Where the work gets recognized.
          </h1>
          <p
            className="fade-up"
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "1.05rem",
              color: "var(--fyro-gray-mid)",
              lineHeight: 1.75,
              maxWidth: 560,
            }}
          >
            From IBM's headquarters in New York to Morehouse College's DreamMakers Summit — and Fyro selected to compete and be featured at AfroTech 2025 in Houston. Sharing the real-world application of custom AI agents with business leaders, entrepreneurs, and the next generation of builders.
          </p>
        </div>
      </section>

      {/* ── ENGAGEMENTS ── */}
      {ENGAGEMENTS.map((eng, i) => (
        <section
          key={eng.tag}
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
                gridTemplateColumns: i % 2 === 0 ? "1fr 1fr" : "1fr 1fr",
                gap: "4rem",
                alignItems: "center",
              }}
              id={`eng-grid-${i}`}
            >
              {/* Text side */}
              <div style={{ order: i % 2 === 0 ? 1 : 2 }}>
                <div className="fade-up" style={{ marginBottom: "1rem" }}>
                  <span className="fyro-section-label">{eng.tag}</span>
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
                  {eng.title}
                </h2>
                <p
                  className="fade-up"
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "1rem",
                    color: "var(--fyro-gray-mid)",
                    lineHeight: 1.8,
                    marginBottom: "1.75rem",
                  }}
                >
                  {eng.body}
                </p>
                <div className="fade-up" style={{ display: "flex", gap: "2rem" }}>
                  <div>
                    <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.6rem", letterSpacing: "0.12em", color: "var(--fyro-gray-mid)", textTransform: "uppercase", marginBottom: "0.25rem" }}>Year</div>
                    <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.9rem", fontWeight: 600, color: "var(--fyro-near-black)" }}>{eng.year}</div>
                  </div>
                  <div>
                    <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.6rem", letterSpacing: "0.12em", color: "var(--fyro-gray-mid)", textTransform: "uppercase", marginBottom: "0.25rem" }}>Format</div>
                    <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.9rem", fontWeight: 600, color: "var(--fyro-near-black)" }}>{eng.type}</div>
                  </div>
                </div>
              </div>

              {/* Image side */}
              <div className="fade-up" style={{ order: i % 2 === 0 ? 2 : 1 }}>
                <div
                  style={{
                    borderRadius: "8px",
                    overflow: "hidden",
                    border: "1px solid var(--fyro-border)",
                    aspectRatio: "4/3",
                  }}
                >
                  {eng.img ? (
                    <img
                      src={eng.img}
                      alt={eng.alt}
                      style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top", display: "block" }}
                    />
                  ) : (
                    <div style={{ width: "100%", height: "100%", minHeight: 280, background: "#0D0D0D", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "1.25rem", padding: "2.5rem", textAlign: "center" as const }}>
                      <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.65rem", letterSpacing: "0.18em", color: "#C8102E", textTransform: "uppercase" as const }}>AfroTech 2025 · Houston</div>
                      <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "clamp(1.4rem, 2.5vw, 2rem)", fontWeight: 800, color: "#FFFFFF", lineHeight: 1.15, letterSpacing: "-0.02em" }}>Selected. Competed. Featured.</div>
                      <div style={{ width: 40, height: 2, background: "#C8102E" }} />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          <style>{`
            @media (max-width: 768px) {
              #eng-grid-${i} { grid-template-columns: 1fr !important; }
              #eng-grid-${i} > * { order: unset !important; }
            }
          `}</style>
        </section>
      ))}

      {/* ── PHOTO STRIP ── */}
      <section style={{ padding: "6rem 0", background: "var(--fyro-bg-section)", borderTop: "1px solid var(--fyro-border)" }}>
        <div style={sectionStyle}>
          <div className="fade-up" style={{ marginBottom: "2.5rem" }}>
            <span className="fyro-section-label">DreamMakers Summit 2026</span>
            <h2
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "clamp(1.5rem, 2.5vw, 2rem)",
                fontWeight: 800,
                color: "var(--fyro-near-black)",
                letterSpacing: "-0.025em",
                marginTop: "0.75rem",
              }}
            >
              Morehouse College, Atlanta
            </h2>
          </div>
          <div
            className="fade-up"
            style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: "1rem" }}
            id="gallery-grid"
          >
            {GALLERY_IMGS.map((img) => (
              <div
                key={img.src}
                style={{
                  borderRadius: "6px",
                  overflow: "hidden",
                  border: "1px solid var(--fyro-border)",
                  aspectRatio: "4/3",
                }}
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top", display: "block" }}
                />
              </div>
            ))}
          </div>
        </div>
        <style>{`
          @media (max-width: 900px) { #gallery-grid { grid-template-columns: repeat(3, 1fr) !important; } }
          @media (max-width: 600px) { #gallery-grid { grid-template-columns: repeat(2, 1fr) !important; } }
          @media (max-width: 400px) { #gallery-grid { grid-template-columns: 1fr !important; } }
        `}</style>
      </section>

      {/* ── SPEAKING INQUIRY ── */}
      <section style={{ padding: "6rem 0", background: "var(--fyro-bg)", borderTop: "1px solid var(--fyro-border)" }}>
        <div style={sectionStyle}>
          <div className="fade-up">
            <div style={{ marginBottom: "0.75rem" }}>
              <span className="fyro-section-label">Speaking inquiries</span>
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
              Interested in having RJ speak at your event?
            </h2>
            <p
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "1rem",
                color: "var(--fyro-gray-mid)",
                lineHeight: 1.75,
                maxWidth: 480,
                marginBottom: "2rem",
              }}
            >
              RJ speaks on AI implementation, custom agent development, and the practical
              application of AI for service-based businesses. Available for keynotes,
              panels, workshops, and corporate events.
            </p>
            <Link href="/contact" className="fyro-btn-primary" style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem" }}>
              Get in touch
              <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
