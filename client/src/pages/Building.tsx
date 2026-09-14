/**
 * FYRO — BUILDING
 *
 * The build log. What Fyro has actually shipped, described by industry rather
 * than by client name: several of these are under NDA and this page is public
 * and indexed. A reader should be able to judge the work without being able to
 * identify who it was for.
 *
 * Insights is for thinking. This page is for evidence.
 */
import { useEffect } from "react";
import { Link } from "wouter";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SystemGraphic from "@/components/SystemGraphic";
import { WORK, LIVE_COUNT, type WorkItem } from "@/data/work";

const section = { maxWidth: 1160, margin: "0 auto", padding: "0 2.5rem" } as const;

function StatusChip({ status }: { status: WorkItem["status"] }) {
  const live = status === "live";
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        fontFamily: "'DM Mono', monospace",
        fontSize: 10,
        letterSpacing: "0.12em",
        textTransform: "uppercase",
        padding: "4px 9px",
        border: `1px solid ${live ? "rgba(248,121,4,0.35)" : "var(--fyro-border)"}`,
        color: live ? "var(--fyro-orange)" : "var(--fyro-gray-light)",
        whiteSpace: "nowrap",
      }}
    >
      <span
        aria-hidden="true"
        style={{
          width: 6,
          height: 6,
          background: live ? "var(--fyro-orange)" : "transparent",
          border: live ? "none" : "1px solid var(--fyro-gray-light)",
          borderRadius: "50%",
        }}
      />
      {live ? "Live" : "In build"}
    </span>
  );
}

export default function Building() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div style={{ background: "var(--fyro-bg)", minHeight: "100vh" }}>
      <Navbar />

      {/* ── HERO ── */}
      <section style={{ paddingTop: 64 }}>
        <div style={{ ...section, padding: "5rem 2.5rem 3.5rem" }}>
          <span className="fyro-category-pill">Building</span>
          <h1
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "clamp(2.4rem, 5vw, 4.2rem)",
              fontWeight: 800,
              color: "var(--fyro-near-black)",
              letterSpacing: "-0.03em",
              lineHeight: 1.05,
              maxWidth: 860,
              margin: "1.75rem 0 1.25rem",
            }}
          >
            What we&rsquo;ve actually shipped.
          </h1>
          <p
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "1.05rem",
              color: "var(--fyro-gray-mid)",
              lineHeight: 1.75,
              maxWidth: 560,
            }}
          >
            Every system below is running, or is being built right now, inside a real
            service company. Clients are described by industry rather than by name —
            several are under NDA and this page is public.
          </p>

          <div style={{ display: "flex", gap: 40, marginTop: "2.5rem", flexWrap: "wrap" }}>
            {[
              { n: String(LIVE_COUNT), l: "systems live" },
              { n: String(WORK.length), l: "builds total" },
              { n: "TX · GA", l: "where they run" },
            ].map((s) => (
              <div key={s.l}>
                <div
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "2rem",
                    fontWeight: 800,
                    color: "var(--fyro-near-black)",
                    letterSpacing: "-0.02em",
                    fontVariantNumeric: "tabular-nums",
                  }}
                >
                  {s.n}
                </div>
                <div
                  style={{
                    fontFamily: "'DM Mono', monospace",
                    fontSize: 11,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color: "var(--fyro-gray-light)",
                    marginTop: 4,
                  }}
                >
                  {s.l}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── THE WORK ── */}
      <section style={{ borderTop: "1px solid var(--fyro-border)", padding: "3.5rem 0 5rem" }}>
        <div style={section}>
          <div className="build-grid" style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 24 }}>
            {WORK.map((w) => (
              <article
                key={w.slug}
                style={{
                  border: "1px solid var(--fyro-border)",
                  background: "var(--fyro-bg)",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <SystemGraphic kind={w.graphic} />

                <div style={{ padding: "22px 24px 26px", borderTop: "1px solid var(--fyro-border)", flex: 1 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 12, justifyContent: "space-between", marginBottom: 14 }}>
                    <p
                      style={{
                        fontFamily: "'DM Mono', monospace",
                        fontSize: 10,
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                        color: "var(--fyro-gray-light)",
                      }}
                    >
                      {w.client}
                    </p>
                    <StatusChip status={w.status} />
                  </div>

                  <h2
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "1.3rem",
                      fontWeight: 700,
                      color: "var(--fyro-near-black)",
                      letterSpacing: "-0.02em",
                      marginBottom: 10,
                    }}
                  >
                    {w.title}
                  </h2>

                  <p
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "0.95rem",
                      color: "var(--fyro-gray-dark)",
                      lineHeight: 1.7,
                      marginBottom: 18,
                    }}
                  >
                    {w.detail}
                  </p>

                  <ul style={{ listStyle: "none", padding: 0, margin: "0 0 16px", display: "flex", flexDirection: "column", gap: 8 }}>
                    {w.facts.map((f) => (
                      <li key={f} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                        <span aria-hidden="true" style={{ color: "var(--fyro-orange)", fontSize: 13, lineHeight: 1.6, flexShrink: 0 }}>
                          →
                        </span>
                        <span
                          style={{
                            fontFamily: "'DM Sans', sans-serif",
                            fontSize: "0.875rem",
                            color: "var(--fyro-gray-mid)",
                            lineHeight: 1.6,
                          }}
                        >
                          {f}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <p
                    style={{
                      fontFamily: "'DM Mono', monospace",
                      fontSize: 10,
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      color: "var(--fyro-gray-light)",
                      borderTop: "1px solid var(--fyro-border)",
                      paddingTop: 14,
                    }}
                  >
                    {w.date}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── BOOK A CALL ── */}
      <section style={{ background: "var(--fyro-bg)", padding: "5rem 0", borderTop: "1px solid var(--fyro-border)" }}>
        <div style={section}>
          <h2
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "clamp(1.8rem, 3vw, 2.6rem)",
              fontWeight: 800,
              color: "#fff",
              letterSpacing: "-0.025em",
              lineHeight: 1.15,
              marginBottom: 14,
            }}
          >
            Want one of these running in your business?
          </h2>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "1rem", color: "rgba(255,255,255,0.65)", lineHeight: 1.7, maxWidth: 460, marginBottom: 28 }}>
            Book a free 15-minute call. We&rsquo;ll walk through your operation and tell you exactly what we&rsquo;d build.
          </p>
          <Link href="/contact" className="fyro-btn-primary">
            Book a Free Demo →
          </Link>
        </div>
      </section>

      <Footer />

      <style>{`
        @media (max-width: 900px) {
          .build-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
