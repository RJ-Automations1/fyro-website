/*
 * FYRO ABOUT SECTION — Executive Dark
 * RJ's story, credibility, and the face behind Fyro
 * Uses editorial photo layout — oversized photo + offset text
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

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  useScrollReveal(sectionRef as React.RefObject<HTMLElement>);

  return (
    <section
      id="about"
      ref={sectionRef}
      style={{
        background: "#0A0A0C",
        padding: "7rem 0",
        borderTop: "1px solid rgba(255,255,255,0.05)",
      }}
    >
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 items-center">
          {/* Left: Photos */}
          <div className="lg:col-span-5 fade-up">
            <div className="relative">
              {/* Main photo */}
              <div
                className="relative overflow-hidden"
                style={{
                  borderRadius: "6px",
                  border: "1px solid rgba(255,255,255,0.07)",
                }}
              >
                <img
                  src="/manus-storage/rj_speaking_1_82784dc4.jpeg"
                  alt="Robert Robinson Jr. — Founder of Fyro"
                  className="w-full object-cover"
                  style={{
                    height: "420px",
                    objectPosition: "center top",
                    filter: "contrast(1.05)",
                  }}
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(to bottom, transparent 50%, rgba(10,10,12,0.6) 100%)",
                  }}
                />
              </div>

              {/* Offset secondary photo */}
              <div
                className="absolute overflow-hidden"
                style={{
                  bottom: "-2rem",
                  right: "-2rem",
                  width: "52%",
                  borderRadius: "6px",
                  border: "3px solid #0A0A0C",
                  boxShadow: "0 20px 60px rgba(0,0,0,0.6)",
                }}
              >
                <img
                  src="/manus-storage/rj_speaking_4_ea49446c.jpeg"
                  alt="Robert Robinson Jr. speaking"
                  className="w-full object-cover"
                  style={{
                    height: "200px",
                    objectPosition: "center top",
                    filter: "contrast(1.05)",
                  }}
                />
              </div>

              {/* Red accent line */}
              <div
                style={{
                  position: "absolute",
                  top: "2rem",
                  left: "-1rem",
                  width: "3px",
                  height: "60%",
                  background: "linear-gradient(to bottom, #E03030, transparent)",
                }}
              />
            </div>
          </div>

          {/* Right: Copy */}
          <div className="lg:col-span-7 lg:pl-8" style={{ paddingBottom: "2rem" }}>
            <div className="fade-up mb-8" style={{ transitionDelay: "100ms" }}>
              <div className="flex items-center gap-3 mb-5">
                <span className="red-rule" />
                <span className="fyro-section-label">About Fyro</span>
              </div>
              <h2
                className="font-display mb-5"
                style={{
                  fontSize: "clamp(1.9rem, 3.5vw, 2.8rem)",
                  fontWeight: 800,
                  color: "#F2F2F2",
                  letterSpacing: "-0.02em",
                  lineHeight: 1.1,
                }}
              >
                Built by Someone Who{" "}
                <span style={{ color: "#E03030" }}>Understands</span>
                <br />
                Your Business
              </h2>
            </div>

            <div className="fade-up flex flex-col gap-5" style={{ transitionDelay: "180ms" }}>
              <p
                style={{
                  fontSize: "0.95rem",
                  color: "rgba(242,242,242,0.65)",
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  lineHeight: 1.75,
                }}
              >
                Fyro was founded by{" "}
                <strong style={{ color: "#F2F2F2", fontWeight: 600 }}>
                  Robert Robinson Jr.
                </strong>{" "}
                — an AI consultant who has worked directly with business owners,
                government contractors, and service companies to transform how
                they operate. Robert doesn't just understand AI; he understands
                business.
              </p>
              <p
                style={{
                  fontSize: "0.95rem",
                  color: "rgba(242,242,242,0.65)",
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  lineHeight: 1.75,
                }}
              >
                The philosophy behind Fyro is simple: AI is only as powerful as
                the context it's built around. Generic tools don't move the
                needle. Custom agents — trained on your data, integrated into
                your systems, and aligned with your goals — do.
              </p>
              <p
                style={{
                  fontSize: "0.95rem",
                  color: "rgba(242,242,242,0.65)",
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  lineHeight: 1.75,
                }}
              >
                Every engagement starts with Robert sitting down with your team,
                understanding what you're building, and designing a solution
                that fits. No cookie-cutter deployments. No unnecessary
                complexity. Just results.
              </p>
            </div>

            {/* Credential badges */}
            <div
              className="fade-up grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8"
              style={{ transitionDelay: "260ms" }}
            >
              {[
                {
                  label: "Speaker",
                  value: "Morehouse DreamMakers Summit 2026",
                  sub: "Atlanta, GA",
                },
                {
                  label: "Speaker",
                  value: "IBM New York",
                  sub: "AI Agents & Custom Automation",
                },
                {
                  label: "Focus",
                  value: "Custom AI Systems",
                  sub: "Built for your workflows",
                },
                {
                  label: "Focus",
                  value: "Service-Based Businesses",
                  sub: "All industries, custom solutions",
                },
              ].map((badge, i) => (
                <div
                  key={i}
                  style={{
                    background: "#1A1A1F",
                    border: "1px solid rgba(255,255,255,0.07)",
                    borderRadius: "6px",
                    padding: "14px 16px",
                  }}
                >
                  <p
                    style={{
                      fontSize: "0.65rem",
                      color: "#E03030",
                      fontFamily: "'Space Mono', monospace",
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                      marginBottom: "4px",
                    }}
                  >
                    {badge.label}
                  </p>
                  <p
                    style={{
                      fontSize: "0.88rem",
                      color: "#F2F2F2",
                      fontFamily: "'Plus Jakarta Sans', sans-serif",
                      fontWeight: 600,
                      marginBottom: "2px",
                    }}
                  >
                    {badge.value}
                  </p>
                  <p
                    style={{
                      fontSize: "0.75rem",
                      color: "rgba(242,242,242,0.4)",
                      fontFamily: "'Plus Jakarta Sans', sans-serif",
                    }}
                  >
                    {badge.sub}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
