/*
 * FYRO SERVICES SECTION — Executive Dark
 * Asymmetric card grid with featured RFP agent highlight
 */
import { useEffect, useRef } from "react";
import { Bot, Workflow, FileText, Phone, BarChart3, Zap } from "lucide-react";

const services = [
  {
    icon: Bot,
    title: "Custom AI Agents",
    description:
      "We don't sell off-the-shelf bots. Fyro builds agents that understand your specific business context, your data, your voice, and your goals — then operates autonomously within your systems.",
    featured: false,
    client: null,
  },
  {
    icon: FileText,
    title: "RFP Response Agent",
    description:
      "Purpose-built for government contractors and service firms. Our RFP agent reads solicitations, extracts requirements, and drafts compliant, competitive proposals — cutting response time from weeks to hours.",
    featured: true,
    tag: "Government & Contractors",
    client: null,
  },
  {
    icon: Workflow,
    title: "Workflow Automation",
    description:
      "Map your existing processes, identify bottlenecks, and replace manual steps with intelligent automations. From CRM updates to document processing to internal approvals — we automate the repetitive so your team focuses on what matters.",
    featured: false,
    client: null,
  },
  {
    icon: Phone,
    title: "Voice & Call Agents",
    description:
      "AI-powered voice agents that handle inbound inquiries, qualify leads, schedule appointments, and follow up — 24/7, without a human on the line. Trained on your business's actual language and processes.",
    featured: false,
    client: null,
  },
  {
    icon: BarChart3,
    title: "Agentic Workflows",
    description:
      "Multi-step, multi-agent systems that handle complex end-to-end business processes. From lead generation through fulfillment, we architect agentic pipelines that run your operations at scale.",
    featured: false,
    client: null,
  },
  {
    icon: Zap,
    title: "AI Strategy Consulting",
    description:
      "Not sure where to start? We come in, audit your operations, identify the highest-ROI automation opportunities, and build a roadmap. No jargon — just a clear plan to make AI work for your business.",
    featured: false,
    client: null,
  },
];

function useScrollReveal(ref: React.RefObject<HTMLElement | null>) {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.1 }
    );
    const elements = ref.current?.querySelectorAll(".fade-up");
    elements?.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [ref]);
}

export default function ServicesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  useScrollReveal(sectionRef as React.RefObject<HTMLElement>);

  return (
    <section
      id="services"
      ref={sectionRef}
      style={{
        background: "#0A0A0C",
        padding: "7rem 0",
      }}
    >
      <div className="container">
        {/* Header */}
        <div className="fade-up mb-16" style={{ maxWidth: "640px" }}>
          <div className="flex items-center gap-3 mb-5">
            <span className="red-rule" />
            <span className="fyro-section-label">What We Build</span>
          </div>
          <h2
            className="font-display mb-5"
            style={{
              fontSize: "clamp(2rem, 4vw, 3rem)",
              fontWeight: 800,
              color: "#F2F2F2",
              letterSpacing: "-0.02em",
              lineHeight: 1.1,
            }}
          >
            AI Built Around{" "}
            <span style={{ color: "#E03030" }}>Your Business,</span>
            <br />
            Not the Other Way Around.
          </h2>
          <p
            style={{
              fontSize: "1rem",
              color: "rgba(242,242,242,0.55)",
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              lineHeight: 1.7,
            }}
          >
            Every engagement starts with a deep discovery session. We learn your
            workflows, your team, and your growth goals — then build solutions
            that fit your business like they were always there.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((service, i) => {
            const Icon = service.icon;
            return (
              <div
                key={i}
                className={`fade-up fyro-card p-7 flex flex-col gap-4 ${service.featured ? "relative overflow-hidden" : ""}`}
                style={{
                  borderRadius: "6px",
                  transitionDelay: `${i * 60}ms`,
                  ...(service.featured
                    ? {
                        border: "1px solid rgba(224,48,48,0.4)",
                        background: "linear-gradient(135deg, #1A1A1F 0%, #1f1215 100%)",
                      }
                    : {}),
                }}
              >
                {/* Featured accent */}
                {service.featured && (
                  <>
                    <div
                      className="absolute top-0 left-0 right-0"
                      style={{ height: "2px", background: "#E03030" }}
                    />
                    <div
                      className="absolute top-4 right-4"
                      style={{
                        background: "rgba(224,48,48,0.15)",
                        border: "1px solid rgba(224,48,48,0.35)",
                        borderRadius: "3px",
                        padding: "3px 8px",
                        fontSize: "0.65rem",
                        color: "#E03030",
                        fontFamily: "'Space Mono', monospace",
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                      }}
                    >
                      Featured
                    </div>
                  </>
                )}

                {/* Icon */}
                <div
                  style={{
                    width: "44px",
                    height: "44px",
                    borderRadius: "6px",
                    background: service.featured
                      ? "rgba(224,48,48,0.15)"
                      : "rgba(255,255,255,0.05)",
                    border: `1px solid ${service.featured ? "rgba(224,48,48,0.3)" : "rgba(255,255,255,0.08)"}`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <Icon
                    size={20}
                    color={service.featured ? "#E03030" : "rgba(242,242,242,0.6)"}
                  />
                </div>

                {/* Content */}
                <div className="flex flex-col gap-2 flex-1">
                  {service.tag && (
                    <span
                      style={{
                        fontSize: "0.68rem",
                        color: "#E03030",
                        fontFamily: "'Space Mono', monospace",
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                      }}
                    >
                      {service.tag}
                    </span>
                  )}
                  <h3
                    className="font-display"
                    style={{
                      fontSize: "1.05rem",
                      fontWeight: 700,
                      color: "#F2F2F2",
                      letterSpacing: "-0.01em",
                    }}
                  >
                    {service.title}
                  </h3>
                  <p
                    style={{
                      fontSize: "0.875rem",
                      color: "rgba(242,242,242,0.5)",
                      fontFamily: "'Plus Jakarta Sans', sans-serif",
                      lineHeight: 1.65,
                    }}
                  >
                    {service.description}
                  </p>
                </div>

                {/* Client tag */}
                {service.client && (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                      marginTop: "4px",
                    }}
                  >
                    <div
                      style={{
                        width: "6px",
                        height: "6px",
                        borderRadius: "50%",
                        background: "#22c55e",
                        flexShrink: 0,
                      }}
                    />
                    <span
                      style={{
                        fontSize: "0.72rem",
                        color: "rgba(242,242,242,0.4)",
                        fontFamily: "'Plus Jakarta Sans', sans-serif",
                      }}
                    >
                      {service.client}
                    </span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
