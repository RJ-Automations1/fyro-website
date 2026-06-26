/*
 * FYRO CONTACT SECTION — Executive Dark
 * Professional intake form: company info, goals, and scheduling
 */
import { useState } from "react";
import { ArrowRight, CheckCircle } from "lucide-react";

const industries = [
  "Government / Federal Contracting",
  "Professional Services",
  "Healthcare",
  "Real Estate",
  "Legal",
  "Financial Services",
  "Construction / Trades",
  "Technology",
  "Retail / E-Commerce",
  "Other",
];

const budgetRanges = [
  "Under $5,000",
  "$5,000 – $15,000",
  "$15,000 – $50,000",
  "$50,000+",
  "Not sure yet",
];

const timelines = [
  "As soon as possible",
  "Within 30 days",
  "Within 90 days",
  "Just exploring",
];

export default function ContactSection() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    industry: "",
    employees: "",
    challenge: "",
    goals: "",
    budget: "",
    timeline: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate submission
    await new Promise((r) => setTimeout(r, 1200));
    setLoading(false);
    setSubmitted(true);
  };

  const inputStyle: React.CSSProperties = {
    width: "100%",
    background: "#111114",
    border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: "4px",
    padding: "0.75rem 1rem",
    color: "#F2F2F2",
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    fontSize: "0.9rem",
    outline: "none",
    transition: "border-color 0.2s ease",
  };

  const labelStyle: React.CSSProperties = {
    fontSize: "0.75rem",
    color: "rgba(242,242,242,0.5)",
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    fontWeight: 500,
    letterSpacing: "0.04em",
    textTransform: "uppercase",
    marginBottom: "6px",
    display: "block",
  };

  return (
    <section
      id="contact"
      style={{
        background: "#0A0A0C",
        padding: "7rem 0",
        borderTop: "1px solid rgba(255,255,255,0.05)",
      }}
    >
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-14">
          {/* Left: Info */}
          <div className="lg:col-span-4">
            <div className="flex items-center gap-3 mb-5">
              <span className="red-rule" />
              <span className="fyro-section-label">Get Started</span>
            </div>
            <h2
              className="font-display mb-5"
              style={{
                fontSize: "clamp(1.8rem, 3vw, 2.5rem)",
                fontWeight: 800,
                color: "#F2F2F2",
                letterSpacing: "-0.02em",
                lineHeight: 1.1,
              }}
            >
              Let's Build Something{" "}
              <span style={{ color: "#E03030" }}>That Works</span>
            </h2>
            <p
              style={{
                fontSize: "0.9rem",
                color: "rgba(242,242,242,0.55)",
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                lineHeight: 1.7,
                marginBottom: "2rem",
              }}
            >
              Fill out this form and we'll reach out within 24 hours to schedule
              your free discovery call. The more detail you share, the more
              prepared we'll be to discuss exactly how AI can move the needle for
              your business.
            </p>

            {/* What to expect */}
            <div className="flex flex-col gap-4">
              {[
                "Free 60-minute discovery call with Robert",
                "Custom AI opportunity assessment for your business",
                "Clear roadmap with timeline and investment range",
                "No pressure — just a real conversation about your goals",
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <CheckCircle
                    size={16}
                    color="#E03030"
                    style={{ flexShrink: 0, marginTop: "2px" }}
                  />
                  <span
                    style={{
                      fontSize: "0.85rem",
                      color: "rgba(242,242,242,0.6)",
                      fontFamily: "'Plus Jakarta Sans', sans-serif",
                      lineHeight: 1.5,
                    }}
                  >
                    {item}
                  </span>
                </div>
              ))}
            </div>

            {/* Direct contact */}
            <div
              className="mt-8 p-5"
              style={{
                background: "#1A1A1F",
                border: "1px solid rgba(255,255,255,0.07)",
                borderRadius: "6px",
              }}
            >
              <p
                style={{
                  fontSize: "0.68rem",
                  color: "#E03030",
                  fontFamily: "'Space Mono', monospace",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  marginBottom: "8px",
                }}
              >
                Direct Contact
              </p>
              <p
                style={{
                  fontSize: "0.85rem",
                  color: "rgba(242,242,242,0.65)",
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                }}
              >
                Prefer to reach out directly? Email us at{" "}
                <a
                  href="mailto:hello@fyro.ai"
                  style={{ color: "#E03030", textDecoration: "none" }}
                >
                  hello@fyro.ai
                </a>
              </p>
            </div>
          </div>

          {/* Right: Form */}
          <div className="lg:col-span-8">
            {submitted ? (
              <div
                className="flex flex-col items-center justify-center text-center"
                style={{
                  background: "#1A1A1F",
                  border: "1px solid rgba(224,48,48,0.3)",
                  borderRadius: "8px",
                  padding: "4rem 2rem",
                  minHeight: "400px",
                }}
              >
                <div
                  style={{
                    width: "64px",
                    height: "64px",
                    borderRadius: "50%",
                    background: "rgba(224,48,48,0.15)",
                    border: "1px solid rgba(224,48,48,0.4)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: "1.5rem",
                  }}
                >
                  <CheckCircle size={28} color="#E03030" />
                </div>
                <h3
                  className="font-display mb-3"
                  style={{ fontSize: "1.5rem", fontWeight: 700, color: "#F2F2F2" }}
                >
                  Request Received
                </h3>
                <p
                  style={{
                    fontSize: "0.9rem",
                    color: "rgba(242,242,242,0.55)",
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    maxWidth: "400px",
                    lineHeight: 1.65,
                  }}
                >
                  Thank you for reaching out. Robert will personally review your
                  submission and follow up within 24 hours to schedule your
                  discovery call.
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                style={{
                  background: "#1A1A1F",
                  border: "1px solid rgba(255,255,255,0.07)",
                  borderRadius: "8px",
                  padding: "2.5rem",
                }}
              >
                {/* Personal info */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
                  <div>
                    <label style={labelStyle}>Full Name *</label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={form.name}
                      onChange={handleChange}
                      placeholder="John Smith"
                      style={inputStyle}
                      onFocus={(e) => (e.target.style.borderColor = "rgba(224,48,48,0.5)")}
                      onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.1)")}
                    />
                  </div>
                  <div>
                    <label style={labelStyle}>Email Address *</label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={form.email}
                      onChange={handleChange}
                      placeholder="john@company.com"
                      style={inputStyle}
                      onFocus={(e) => (e.target.style.borderColor = "rgba(224,48,48,0.5)")}
                      onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.1)")}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
                  <div>
                    <label style={labelStyle}>Phone Number</label>
                    <input
                      type="tel"
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="+1 (555) 000-0000"
                      style={inputStyle}
                      onFocus={(e) => (e.target.style.borderColor = "rgba(224,48,48,0.5)")}
                      onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.1)")}
                    />
                  </div>
                  <div>
                    <label style={labelStyle}>Company Name *</label>
                    <input
                      type="text"
                      name="company"
                      required
                      value={form.company}
                      onChange={handleChange}
                      placeholder="Your Company"
                      style={inputStyle}
                      onFocus={(e) => (e.target.style.borderColor = "rgba(224,48,48,0.5)")}
                      onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.1)")}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
                  <div>
                    <label style={labelStyle}>Industry *</label>
                    <select
                      name="industry"
                      required
                      value={form.industry}
                      onChange={handleChange}
                      style={{ ...inputStyle, appearance: "none" }}
                      onFocus={(e) => (e.target.style.borderColor = "rgba(224,48,48,0.5)")}
                      onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.1)")}
                    >
                      <option value="" disabled>Select your industry</option>
                      {industries.map((ind) => (
                        <option key={ind} value={ind} style={{ background: "#111114" }}>
                          {ind}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label style={labelStyle}>Company Size</label>
                    <input
                      type="text"
                      name="employees"
                      value={form.employees}
                      onChange={handleChange}
                      placeholder="e.g. 10–50 employees"
                      style={inputStyle}
                      onFocus={(e) => (e.target.style.borderColor = "rgba(224,48,48,0.5)")}
                      onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.1)")}
                    />
                  </div>
                </div>

                <div className="mb-5">
                  <label style={labelStyle}>What's your biggest operational challenge? *</label>
                  <textarea
                    name="challenge"
                    required
                    value={form.challenge}
                    onChange={handleChange}
                    placeholder="Describe the bottlenecks, manual processes, or growth blockers you're dealing with..."
                    rows={3}
                    style={{ ...inputStyle, resize: "vertical", minHeight: "90px" }}
                    onFocus={(e) => (e.target.style.borderColor = "rgba(224,48,48,0.5)")}
                    onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.1)")}
                  />
                </div>

                <div className="mb-5">
                  <label style={labelStyle}>What does success look like for you?</label>
                  <textarea
                    name="goals"
                    value={form.goals}
                    onChange={handleChange}
                    placeholder="What would change in your business if this problem was solved?"
                    rows={2}
                    style={{ ...inputStyle, resize: "vertical", minHeight: "70px" }}
                    onFocus={(e) => (e.target.style.borderColor = "rgba(224,48,48,0.5)")}
                    onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.1)")}
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-7">
                  <div>
                    <label style={labelStyle}>Investment Range</label>
                    <select
                      name="budget"
                      value={form.budget}
                      onChange={handleChange}
                      style={{ ...inputStyle, appearance: "none" }}
                      onFocus={(e) => (e.target.style.borderColor = "rgba(224,48,48,0.5)")}
                      onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.1)")}
                    >
                      <option value="" disabled>Select a range</option>
                      {budgetRanges.map((b) => (
                        <option key={b} value={b} style={{ background: "#111114" }}>
                          {b}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label style={labelStyle}>Timeline</label>
                    <select
                      name="timeline"
                      value={form.timeline}
                      onChange={handleChange}
                      style={{ ...inputStyle, appearance: "none" }}
                      onFocus={(e) => (e.target.style.borderColor = "rgba(224,48,48,0.5)")}
                      onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.1)")}
                    >
                      <option value="" disabled>Select a timeline</option>
                      {timelines.map((t) => (
                        <option key={t} value={t} style={{ background: "#111114" }}>
                          {t}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="fyro-btn-primary w-full flex items-center justify-center gap-2"
                  style={{ borderRadius: "4px", opacity: loading ? 0.7 : 1 }}
                >
                  {loading ? (
                    "Submitting..."
                  ) : (
                    <>
                      Request My Discovery Call
                      <ArrowRight size={16} />
                    </>
                  )}
                </button>

                <p
                  style={{
                    fontSize: "0.75rem",
                    color: "rgba(242,242,242,0.3)",
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    textAlign: "center",
                    marginTop: "1rem",
                  }}
                >
                  We'll respond within 24 hours. Your information is kept strictly confidential.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
