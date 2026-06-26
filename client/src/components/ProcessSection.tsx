/*
 * FYRO PROCESS SECTION — Executive Dark
 * 3-step consulting process with large ghost numbers and AI network visual
 */
import { useEffect, useRef } from "react";

const steps = [
  {
    number: "01",
    title: "Discovery & Deep Dive",
    description:
      "We start with a focused consultation — no templates, no assumptions. We learn your business model, your team's workflows, your bottlenecks, and your growth targets. This session is where we identify exactly where AI creates the most leverage for you.",
    detail: "Free 60-minute strategy session",
  },
  {
    number: "02",
    title: "Custom Build & Integration",
    description:
      "We architect and build AI agents and automations specifically for your business — integrated into your existing tools, trained on your data, and calibrated to your processes. Not a generic solution dropped into your workflow.",
    detail: "Typically deployed within days, not months",
  },
  {
    number: "03",
    title: "Deploy, Optimize & Scale",
    description:
      "We don't hand you a tool and disappear. We deploy, monitor performance, and iterate. As your business grows, your AI systems grow with it. We're a long-term partner in your operational intelligence.",
    detail: "Ongoing optimization & support",
  },
];

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

export default function ProcessSection() {
  const sectionRef = useRef<HTMLElement>(null);
  useScrollReveal(sectionRef as React.RefObject<HTMLElement>);

  return (
    <section
      id="process"
      ref={sectionRef}
      style={{
        background: "#111114",
        padding: "7rem 0",
        borderTop: "1px solid rgba(255,255,255,0.05)",
      }}
    >
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          {/* Left: Steps */}
          <div className="lg:col-span-7">
            <div className="fade-up mb-14">
              <div className="flex items-center gap-3 mb-5">
                <span className="red-rule" />
                <span className="fyro-section-label">How It Works</span>
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
                A Consulting Process Built
                <br />
                for <span style={{ color: "#E03030" }}>Real Results</span>
              </h2>
            </div>

            <div className="flex flex-col gap-0">
              {steps.map((step, i) => (
                <div
                  key={i}
                  className="fade-up flex gap-6 group"
                  style={{
                    transitionDelay: `${i * 100}ms`,
                    paddingBottom: i < steps.length - 1 ? "3rem" : "0",
                    borderLeft: "1px solid rgba(255,255,255,0.08)",
                    paddingLeft: "2.5rem",
                    marginLeft: "1.2rem",
                    position: "relative",
                  }}
                >
                  {/* Step number dot */}
                  <div
                    style={{
                      position: "absolute",
                      left: "-1.2rem",
                      top: "0",
                      width: "2.4rem",
                      height: "2.4rem",
                      borderRadius: "50%",
                      background: "#0A0A0C",
                      border: "1px solid rgba(224,48,48,0.5)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <span
                      style={{
                        fontSize: "0.7rem",
                        color: "#E03030",
                        fontFamily: "'Space Mono', monospace",
                        fontWeight: 700,
                      }}
                    >
                      {step.number}
                    </span>
                  </div>

                  <div className="flex flex-col gap-2 pb-2">
                    <h3
                      className="font-display"
                      style={{
                        fontSize: "1.15rem",
                        fontWeight: 700,
                        color: "#F2F2F2",
                        letterSpacing: "-0.01em",
                      }}
                    >
                      {step.title}
                    </h3>
                    <p
                      style={{
                        fontSize: "0.9rem",
                        color: "rgba(242,242,242,0.5)",
                        fontFamily: "'Plus Jakarta Sans', sans-serif",
                        lineHeight: 1.7,
                      }}
                    >
                      {step.description}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <div
                        style={{
                          width: "5px",
                          height: "5px",
                          borderRadius: "50%",
                          background: "#E03030",
                          flexShrink: 0,
                        }}
                      />
                      <span
                        style={{
                          fontSize: "0.75rem",
                          color: "#E03030",
                          fontFamily: "'Space Mono', monospace",
                          letterSpacing: "0.05em",
                        }}
                      >
                        {step.detail}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: AI Network Visual */}
          <div className="lg:col-span-5 fade-up" style={{ transitionDelay: "200ms" }}>
            <div
              className="relative overflow-hidden"
              style={{
                borderRadius: "8px",
                border: "1px solid rgba(255,255,255,0.07)",
                background: "#0A0A0C",
              }}
            >
              <img
                src="/manus-storage/ai_network_32785d0d.png"
                alt="AI Agent Network Visualization"
                className="w-full object-cover"
                style={{ opacity: 0.85 }}
              />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(to bottom, transparent 60%, rgba(17,17,20,0.9) 100%)",
                }}
              />
              <div
                className="absolute bottom-6 left-6 right-6"
                style={{
                  background: "rgba(10,10,12,0.8)",
                  backdropFilter: "blur(8px)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: "4px",
                  padding: "12px 16px",
                }}
              >
                <p
                  style={{
                    fontSize: "0.75rem",
                    color: "#E03030",
                    fontFamily: "'Space Mono', monospace",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    marginBottom: "4px",
                  }}
                >
                  Agentic Architecture
                </p>
                <p
                  style={{
                    fontSize: "0.85rem",
                    color: "rgba(242,242,242,0.75)",
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                  }}
                >
                  Multi-agent systems built around your specific business logic
                </p>
              </div>
            </div>

            {/* Differentiator callout */}
            <div
              className="mt-5 p-6"
              style={{
                background: "#1A1A1F",
                border: "1px solid rgba(255,255,255,0.07)",
                borderRadius: "6px",
              }}
            >
              <p
                style={{
                  fontSize: "0.78rem",
                  color: "#E03030",
                  fontFamily: "'Space Mono', monospace",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  marginBottom: "8px",
                }}
              >
                The Fyro Difference
              </p>
              <p
                style={{
                  fontSize: "0.9rem",
                  color: "rgba(242,242,242,0.65)",
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  lineHeight: 1.65,
                  fontStyle: "italic",
                }}
              >
                "You can have the whole AI ecosystem — but if your agents aren't
                built to work within your company's specific systems and culture,
                they won't deliver. That's what Fyro fixes."
              </p>
              <p
                style={{
                  fontSize: "0.78rem",
                  color: "rgba(242,242,242,0.35)",
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  marginTop: "10px",
                }}
              >
                — Robert Robinson Jr., Founder of Fyro
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
