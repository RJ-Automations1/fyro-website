/*
 * FYRO STATS BAR — Premium Consulting
 * Light gray background, bold Cormorant numbers in red, DM Sans labels
 * Clean vertical dividers between stats
 */
import { useEffect, useRef, useState } from "react";

const stats = [
  { value: 72, suffix: "%", label: "of AI-adopting companies report revenue growth within year one" },
  { value: 10, suffix: "×", label: "faster task completion vs. manual processes" },
  { value: 35, suffix: "%", label: "average reduction in operational costs post-deployment" },
  { value: 89, suffix: "%", label: "of business leaders say AI is critical to their growth strategy" },
];

function CountUp({ target, suffix, active }: { target: number; suffix: string; active: boolean }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!active) return;
    let start = 0;
    const duration = 1800;
    const step = 16;
    const increment = target / (duration / step);
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, step);
    return () => clearInterval(timer);
  }, [active, target]);

  return <span>{count}{suffix}</span>;
}

export default function StatsBar() {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setActive(true); },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="stats"
      ref={ref}
      style={{
        background: "#F8F7F5",
        borderTop: "1px solid #EBEBEB",
        borderBottom: "1px solid #EBEBEB",
        padding: "4.5rem 0",
      }}
    >
      <div style={{ maxWidth: 1320, margin: "0 auto", padding: "0 2rem" }}>
        <div
          className="stats-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
          }}
        >
          {stats.map((stat, i) => (
            <div
              key={i}
              style={{
                padding: "1rem 2rem",
                borderRight: i < stats.length - 1 ? "1px solid #EBEBEB" : "none",
                textAlign: "center",
              }}
            >
              <div
                className="font-display"
                style={{
                  fontSize: "clamp(2.75rem, 4vw, 4rem)",
                  fontWeight: 700,
                  color: "#C8102E",
                  lineHeight: 1,
                  marginBottom: "0.65rem",
                }}
              >
                <CountUp target={stat.value} suffix={stat.suffix} active={active} />
              </div>
              <p
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "0.8rem",
                  color: "#5C5C5C",
                  lineHeight: 1.6,
                  maxWidth: 190,
                  margin: "0 auto",
                }}
              >
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
      <style>{`
        @media (max-width: 768px) {
          .stats-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 480px) {
          .stats-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
