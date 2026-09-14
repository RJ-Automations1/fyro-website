/*
 * FYRO FOUNDER PAGE
 * The person behind the company. The rest of the site leads with Fyro; RJ's
 * name, photos, story, and speaking credentials live here and are linked from
 * About, the footer, and article bylines.
 */
import { useEffect, useRef } from "react";
import { Link } from "wouter";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const CREDENTIALS = [
  { place: "IBM New York", sub: "Featured speaker" },
  { place: "Morehouse College", sub: "DreamMakers Summit 2026" },
  { place: "AfroTech 2025", sub: "Houston · Selected & featured" },
];

const PHOTOS = [
  { src: "/manus-storage/rj_speaking_1_0561f4b4.jpeg", alt: "RJ on stage at the Morehouse DreamMakers Summit" },
  { src: "/manus-storage/rj_speaking_2_073b0301.jpeg", alt: "RJ presenting at the DreamMakers Summit" },
  { src: "/manus-storage/rj_speaking_3_2a87d240.jpeg", alt: "RJ on the full DreamMakers Summit stage" },
  { src: "/manus-storage/rj_ibm_23dcc16d.jpg", alt: "RJ speaking at IBM New York" },
  { src: "/manus-storage/IMG_4713_7c20d053.jpg", alt: "RJ with a guest at the DreamMakers Summit" },
];

const bodyText = {
  fontFamily: "'DM Sans', sans-serif",
  fontSize: "0.95rem",
  color: "var(--fyro-gray-mid)",
  lineHeight: 1.8,
};

const h2Style = {
  fontFamily: "'Inter', sans-serif",
  fontSize: "clamp(1.75rem, 3vw, 2.5rem)",
  fontWeight: 800,
  color: "var(--fyro-near-black)",
  letterSpacing: "-0.025em",
  lineHeight: 1.15,
};

export default function Founder() {
  const pageRef = useRef<HTMLDivElement>(null);

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
    pageRef.current?.querySelectorAll(".fade-up").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const sectionStyle = { maxWidth: 1200, margin: "0 auto", padding: "0 2.5rem" };

  return (
    <div ref={pageRef} style={{ background: "var(--fyro-bg)", minHeight: "100vh" }}>
      <Navbar />

      {/* ── FOUNDER HERO ── */}
      <section style={{ paddingTop: 64, background: "var(--fyro-bg-section)", borderBottom: "1px solid var(--fyro-border)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div id="founder-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 0 }}>
            <div style={{ overflow: "hidden", maxHeight: 640 }}>
              <img
                src="/manus-storage/rj_speaking_4_10cefbdc.jpeg"
                alt="Robert Robinson Jr., founder of Fyro"
                style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top", display: "block" }}
              />
            </div>

            <div style={{ padding: "4.5rem 3.5rem", display: "flex", flexDirection: "column", justifyContent: "center" }}>
              <div className="fade-up" style={{ marginBottom: "1.5rem" }}>
                <span className="fyro-category-pill">Founder</span>
              </div>
              <h1
                className="fade-up"
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "clamp(2.25rem, 4.5vw, 4rem)",
                  fontWeight: 800,
                  color: "var(--fyro-near-black)",
                  letterSpacing: "-0.03em",
                  lineHeight: 1.05,
                  marginBottom: "1rem",
                }}
              >
                Robert Robinson <span style={{ color: "var(--fyro-orange)" }}>Jr.</span>
              </h1>
              <p className="fade-up" style={{ ...bodyText, fontSize: "1.05rem", maxWidth: 480, marginBottom: "2rem" }}>
                Founder and owner of Fyro. AI consultant and custom agent architect for
                service-based companies.
              </p>

              <div
                className="fade-up"
                style={{ display: "flex", gap: "2rem", flexWrap: "wrap", paddingTop: "1.5rem", borderTop: "1px solid var(--fyro-border)", marginBottom: "2rem" }}
              >
                {CREDENTIALS.map((c) => (
                  <div key={c.place}>
                    <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.8rem", fontWeight: 700, color: "var(--fyro-near-black)" }}>{c.place}</p>
                    <p style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.66rem", letterSpacing: "0.08em", color: "var(--fyro-gray-light)", marginTop: 3 }}>{c.sub}</p>
                  </div>
                ))}
              </div>

              <div className="fade-up" style={{ display: "flex", gap: "1.25rem", flexWrap: "wrap", alignItems: "center" }}>
                <Link href="/contact" className="fyro-btn-primary" style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem" }}>
                  Book a Free Demo
                  <ArrowRight size={15} />
                </Link>
                <a href="https://www.linkedin.com/company/143087532/" target="_blank" rel="noopener noreferrer" className="fyro-link">
                  Fyro on LinkedIn <ArrowUpRight size={14} />
                </a>
              </div>
            </div>
          </div>
        </div>
        <style>{`
          @media (max-width: 768px) {
            #founder-grid { grid-template-columns: 1fr !important; }
            #founder-grid > div:last-child { padding: 3rem 1.5rem !important; }
          }
        `}</style>
      </section>

      {/* ── STORY ── */}
      <section style={{ padding: "6rem 0", background: "var(--fyro-bg)" }}>
        <div style={{ ...sectionStyle, maxWidth: 820 }}>
          <div className="fade-up" style={{ marginBottom: "0.75rem" }}>
            <span className="fyro-section-label">The story</span>
          </div>
          <h2 className="fade-up" style={{ ...h2Style, marginBottom: "1.75rem" }}>
            From understanding businesses to building the AI that runs them.
          </h2>
          <p className="fade-up" style={{ ...bodyText, marginBottom: "1.25rem" }}>
            RJ built Fyro around a simple observation: most companies know they need AI,
            but they don&rsquo;t know what to build. They buy tools that don&rsquo;t fit. They run
            pilots that don&rsquo;t ship. They end up with more complexity, not less.
          </p>
          <p className="fade-up" style={{ ...bodyText, marginBottom: "1.25rem" }}>
            The pattern was consistent. Companies that won with AI didn&rsquo;t buy a product —
            they built a system. Fyro exists to close that gap: embed with the business,
            learn how it actually operates, and build the agents and internal software
            its team runs on every day.
          </p>
          <p className="fade-up" style={bodyText}>
            The result isn&rsquo;t a demo. It&rsquo;s a live system that runs your operation.
          </p>
        </div>
      </section>

      {/* ── SPEAKING ── */}
      <section style={{ padding: "6rem 0", background: "var(--fyro-bg-section)", borderTop: "1px solid var(--fyro-border)" }}>
        <div style={sectionStyle}>
          <div className="fade-up" style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: "1.5rem", flexWrap: "wrap", marginBottom: "2.5rem" }}>
            <div>
              <div style={{ marginBottom: "0.75rem" }}>
                <span className="fyro-section-label">Speaking</span>
              </div>
              <h2 style={{ ...h2Style, maxWidth: 560 }}>On stage at IBM, Morehouse, and AfroTech.</h2>
              <p style={{ ...bodyText, maxWidth: 520, marginTop: "0.75rem" }}>
                RJ speaks on AI implementation and custom agent development for service
                businesses — keynotes, panels, and hands-on workshops.
              </p>
            </div>
            <Link href="/speaking" className="fyro-btn-outline" style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem" }}>
              All engagements
              <ArrowRight size={15} />
            </Link>
          </div>

          <div className="fade-up" id="founder-photos" style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: "1rem" }}>
            {PHOTOS.map((p) => (
              <div key={p.src} style={{ borderRadius: 6, overflow: "hidden", border: "1px solid var(--fyro-border)", aspectRatio: "4/5" }}>
                <img src={p.src} alt={p.alt} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top", display: "block" }} />
              </div>
            ))}
          </div>
        </div>
        <style>{`
          @media (max-width: 900px) { #founder-photos { grid-template-columns: repeat(3, 1fr) !important; } }
          @media (max-width: 600px) { #founder-photos { grid-template-columns: repeat(2, 1fr) !important; } }
        `}</style>
      </section>

      {/* ── BACK TO THE COMPANY ── */}
      <section style={{ padding: "6rem 0", background: "var(--fyro-bg)", borderTop: "1px solid var(--fyro-border)" }}>
        <div style={sectionStyle} className="fade-up">
          <div style={{ marginBottom: "0.75rem" }}>
            <span className="fyro-section-label">Work with Fyro</span>
          </div>
          <h2 style={{ ...h2Style, marginBottom: "1rem" }}>See what the team is building.</h2>
          <p style={{ ...bodyText, fontSize: "1rem", maxWidth: 460, marginBottom: "2rem" }}>
            The systems running inside service companies right now — and how an engagement works.
          </p>
          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
            <Link href="/building" className="fyro-btn-primary" style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem" }}>
              See the work
              <ArrowRight size={15} />
            </Link>
            <Link href="/about" className="fyro-btn-outline">About Fyro</Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
