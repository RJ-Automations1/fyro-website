/*
 * FYRO SPEAKING SECTION — Executive Dark
 * Showcases IBM and Morehouse appearances as credibility anchors
 */
import { useEffect, useRef } from "react";

function useScrollReveal(ref: React.RefObject<HTMLElement | null>) {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("visible");
        });
      },
      { threshold: 0.1 }
    );
    const elements = ref.current?.querySelectorAll(".fade-up");
    elements?.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [ref]);
}

export default function SpeakingSection() {
  const sectionRef = useRef<HTMLElement>(null);
  useScrollReveal(sectionRef as React.RefObject<HTMLElement>);

  return (
    <section
      id="speaking"
      ref={sectionRef}
      style={{
        background: "#111114",
        padding: "7rem 0",
        borderTop: "1px solid rgba(255,255,255,0.05)",
      }}
    >
      <div className="container">
        {/* Header */}
        <div className="fade-up mb-14 text-center" style={{ maxWidth: "600px", margin: "0 auto 3.5rem" }}>
          <div className="flex items-center justify-center gap-3 mb-5">
            <span className="red-rule" />
            <span className="fyro-section-label">Recognized Expertise</span>
            <span className="red-rule" />
          </div>
          <h2
            className="font-display"
            style={{
              fontSize: "clamp(1.9rem, 3.5vw, 2.8rem)",
              fontWeight: 800,
              color: "#F2F2F2",
              letterSpacing: "-0.02em",
              lineHeight: 1.1,
            }}
          >
            Trusted by Leading{" "}
            <span style={{ color: "#E03030" }}>Institutions</span>
          </h2>
        </div>

        {/* Two featured events */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
          {/* IBM */}
          <div
            className="fade-up relative overflow-hidden"
            style={{
              borderRadius: "8px",
              border: "1px solid rgba(255,255,255,0.07)",
              background: "#0A0A0C",
            }}
          >
            <div className="relative overflow-hidden" style={{ height: "320px" }}>
              <img
                src="/manus-storage/rj_ibm_eea0a138.jpg"
                alt="Robert Robinson Jr. at IBM New York"
                className="w-full h-full object-cover"
                style={{
                  objectPosition: "center top",
                  filter: "contrast(1.05) brightness(0.9)",
                }}
              />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(to bottom, rgba(10,10,12,0.1) 0%, rgba(10,10,12,0.85) 100%)",
                }}
              />
            </div>
            <div className="p-7">
              <p
                style={{
                  fontSize: "0.68rem",
                  color: "#E03030",
                  fontFamily: "'Space Mono', monospace",
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  marginBottom: "8px",
                }}
              >
                Featured Speaker
              </p>
              <h3
                className="font-display mb-3"
                style={{
                  fontSize: "1.3rem",
                  fontWeight: 700,
                  color: "#F2F2F2",
                  letterSpacing: "-0.01em",
                }}
              >
                IBM New York
              </h3>
              <p
                style={{
                  fontSize: "0.875rem",
                  color: "rgba(242,242,242,0.55)",
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  lineHeight: 1.65,
                }}
              >
                Presented on building AI agents that integrate with a company's
                existing systems and culture — making the case that customization,
                not commoditization, is the key to real AI ROI.
              </p>
            </div>
          </div>

          {/* Morehouse */}
          <div
            className="fade-up relative overflow-hidden"
            style={{
              borderRadius: "8px",
              border: "1px solid rgba(255,255,255,0.07)",
              background: "#0A0A0C",
              transitionDelay: "100ms",
            }}
          >
            <div className="relative overflow-hidden" style={{ height: "320px" }}>
              <img
                src="/manus-storage/rj_speaking_2_f0ac4d7e.jpeg"
                alt="Robert Robinson Jr. at Morehouse DreamMakers Summit"
                className="w-full h-full object-cover"
                style={{
                  objectPosition: "center top",
                  filter: "contrast(1.05) brightness(0.9)",
                }}
              />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(to bottom, rgba(10,10,12,0.1) 0%, rgba(10,10,12,0.85) 100%)",
                }}
              />
            </div>
            <div className="p-7">
              <p
                style={{
                  fontSize: "0.68rem",
                  color: "#E03030",
                  fontFamily: "'Space Mono', monospace",
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  marginBottom: "8px",
                }}
              >
                2026 DreamMakers Summit
              </p>
              <h3
                className="font-display mb-3"
                style={{
                  fontSize: "1.3rem",
                  fontWeight: 700,
                  color: "#F2F2F2",
                  letterSpacing: "-0.01em",
                }}
              >
                Morehouse College
              </h3>
              <p
                style={{
                  fontSize: "0.875rem",
                  color: "rgba(242,242,242,0.55)",
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  lineHeight: 1.65,
                }}
              >
                Spoke at one of the most prestigious entrepreneurship summits in
                the country — sharing how AI-powered automation is leveling the
                playing field for growing businesses and service companies.
              </p>
            </div>
          </div>
        </div>

        {/* Photo strip */}
        <div className="fade-up grid grid-cols-2 md:grid-cols-4 gap-3" style={{ transitionDelay: "200ms" }}>
          {[
            "/manus-storage/rj_speaking_1_82784dc4.jpeg",
            "/manus-storage/rj_speaking_3_d9b01c0e.jpeg",
            "/manus-storage/rj_speaking_4_ea49446c.jpeg",
            "/manus-storage/rj_ibm_eea0a138.jpg",
          ].map((src, i) => (
            <div
              key={i}
              className="overflow-hidden"
              style={{
                borderRadius: "4px",
                border: "1px solid rgba(255,255,255,0.06)",
                height: "140px",
              }}
            >
              <img
                src={src}
                alt={`Fyro speaking engagement ${i + 1}`}
                className="w-full h-full object-cover"
                style={{
                  objectPosition: "center top",
                  filter: "grayscale(20%) contrast(1.05)",
                  transition: "transform 0.4s ease, filter 0.4s ease",
                }}
                onMouseEnter={(e) => {
                  (e.target as HTMLElement).style.transform = "scale(1.04)";
                  (e.target as HTMLElement).style.filter = "grayscale(0%) contrast(1.05)";
                }}
                onMouseLeave={(e) => {
                  (e.target as HTMLElement).style.transform = "scale(1)";
                  (e.target as HTMLElement).style.filter = "grayscale(20%) contrast(1.05)";
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
