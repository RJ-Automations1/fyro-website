/*
 * FYRO HERO SECTION — Premium White Consulting Design
 * White background, near-black text, red italic accents
 * Split layout: bold Cormorant headline left, RJ photo right
 * Inspired by top-tier consulting firms: clean, authoritative, spacious
 */
import { useEffect, useRef } from "react";
import { ArrowRight, ChevronDown } from "lucide-react";

export default function HeroSection() {
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer1 = setTimeout(() => {
      if (leftRef.current) {
        leftRef.current.style.opacity = "1";
        leftRef.current.style.transform = "translateY(0)";
      }
    }, 80);
    const timer2 = setTimeout(() => {
      if (rightRef.current) {
        rightRef.current.style.opacity = "1";
        rightRef.current.style.transform = "translateY(0)";
      }
    }, 280);
    return () => { clearTimeout(timer1); clearTimeout(timer2); };
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      style={{
        background: "#fff",
        paddingTop: 72,
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Subtle red glow top-right */}
      <div
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          width: "50%",
          height: "100%",
          background: "radial-gradient(ellipse at 80% 30%, rgba(200,16,46,0.05) 0%, transparent 65%)",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          maxWidth: 1320,
          margin: "0 auto",
          padding: "5rem 2rem 4rem",
          width: "100%",
        }}
      >
        <div className="hero-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "5rem", alignItems: "center" }}>

          {/* LEFT: Copy */}
          <div
            ref={leftRef}
            style={{
              opacity: 0,
              transform: "translateY(28px)",
              transition: "opacity 0.8s cubic-bezier(0.23,1,0.32,1), transform 0.8s cubic-bezier(0.23,1,0.32,1)",
            }}
          >
            {/* Section label */}
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "2rem" }}>
              <span className="red-rule" />
              <span className="fyro-section-label">AI Consulting & Automation</span>
            </div>

            {/* Headline */}
            <h1
              className="font-display"
              style={{
                fontSize: "clamp(3rem, 5vw, 5.25rem)",
                fontWeight: 600,
                lineHeight: 1.06,
                color: "#0D0D0D",
                letterSpacing: "-0.025em",
                marginBottom: "1.75rem",
              }}
            >
              Your Business,{" "}
              <em style={{ color: "#C8102E", fontStyle: "italic" }}>Automated.</em>
              <br />
              Your Growth,{" "}
              <em style={{ color: "#C8102E", fontStyle: "italic" }}>Accelerated.</em>
            </h1>

            {/* Body */}
            <p
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "1.05rem",
                lineHeight: 1.8,
                color: "#5C5C5C",
                maxWidth: 460,
                marginBottom: "2.5rem",
              }}
            >
              Fyro embeds directly into your business — learning your workflows, your goals,
              and your team — then builds custom AI agents and automations that scale your
              operations from the inside out.
            </p>

            {/* CTAs */}
            <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", marginBottom: "3rem" }}>
              <button
                onClick={() => scrollTo("contact")}
                className="fyro-btn-primary"
                style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
              >
                Book a Free Discovery Call
                <ArrowRight size={15} />
              </button>
              <button
                onClick={() => scrollTo("process")}
                className="fyro-btn-outline"
              >
                See How It Works
              </button>
            </div>

            {/* Trust badges */}
            <div
              style={{
                display: "flex",
                gap: "2.5rem",
                paddingTop: "2rem",
                borderTop: "1px solid #EBEBEB",
                flexWrap: "wrap",
              }}
            >
              {[
                { label: "Featured Speaker", sub: "IBM New York" },
                { label: "2026 Summit Speaker", sub: "Morehouse College" },
                { label: "Service companies", sub: "All industries" },
              ].map((b) => (
                <div key={b.label}>
                  <div
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "0.8rem",
                      fontWeight: 700,
                      color: "#0D0D0D",
                    }}
                  >
                    {b.label}
                  </div>
                  <div
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "0.75rem",
                      color: "#9A9A9A",
                      marginTop: "0.15rem",
                    }}
                  >
                    {b.sub}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT: Photo */}
          <div
            ref={rightRef}
            style={{
              opacity: 0,
              transform: "translateY(24px)",
              transition: "opacity 0.9s cubic-bezier(0.23,1,0.32,1), transform 0.9s cubic-bezier(0.23,1,0.32,1)",
              position: "relative",
            }}
          >
            {/* Main photo */}
            <div
              style={{
                position: "relative",
                borderRadius: "3px",
                overflow: "hidden",
                aspectRatio: "4/5",
                maxHeight: 640,
              }}
            >
              <img
                src="/manus-storage/rj_speaking_3_d9b01c0e.jpeg"
                alt="Robert Robinson Jr. speaking at Morehouse DreamMakers Summit"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  objectPosition: "center top",
                  display: "block",
                }}
              />
              {/* Bottom gradient */}
              <div
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  height: "45%",
                  background: "linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 100%)",
                }}
              />
              {/* Caption */}
              <div
                style={{
                  position: "absolute",
                  bottom: "1.5rem",
                  left: "1.5rem",
                  right: "1.5rem",
                  background: "rgba(255,255,255,0.96)",
                  borderLeft: "3px solid #C8102E",
                  padding: "0.8rem 1.1rem",
                  borderRadius: "2px",
                }}
              >
                <div
                  style={{
                    fontFamily: "'DM Mono', monospace",
                    fontSize: "0.62rem",
                    fontWeight: 500,
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    color: "#C8102E",
                    marginBottom: "0.25rem",
                  }}
                >
                  2026 DreamMakers Summit
                </div>
                <div
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "0.875rem",
                    fontWeight: 600,
                    color: "#0D0D0D",
                  }}
                >
                  Morehouse College · Atlanta, GA
                </div>
              </div>
            </div>

            {/* Floating stat card */}
            <div
              style={{
                position: "absolute",
                top: "2rem",
                right: "-1.25rem",
                background: "#0D0D0D",
                padding: "1.25rem 1.5rem",
                borderRadius: "3px",
                minWidth: 155,
                boxShadow: "0 12px 40px rgba(0,0,0,0.2)",
              }}
            >
              <div
                className="font-display"
                style={{
                  fontSize: "2.75rem",
                  fontWeight: 700,
                  color: "#C8102E",
                  lineHeight: 1,
                }}
              >
                10×
              </div>
              <div
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "0.72rem",
                  color: "rgba(255,255,255,0.65)",
                  marginTop: "0.4rem",
                  lineHeight: 1.5,
                }}
              >
                Faster task completion vs. manual
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        style={{
          position: "absolute",
          bottom: "2rem",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "0.4rem",
          cursor: "pointer",
          opacity: 0.35,
        }}
        onClick={() => scrollTo("stats")}
      >
        <span
          style={{
            fontFamily: "'DM Mono', monospace",
            fontSize: "0.62rem",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "#0D0D0D",
          }}
        >
          Scroll
        </span>
        <ChevronDown size={14} color="#0D0D0D" />
      </div>

      <style>{`
        @media (max-width: 768px) {
          .hero-grid {
            grid-template-columns: 1fr !important;
            gap: 2.5rem !important;
            padding: 3rem 1.5rem !important;
          }
        }
      `}</style>
    </section>
  );
}
