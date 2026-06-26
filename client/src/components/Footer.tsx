/*
 * FYRO FOOTER — Hendricks.ai-inspired
 * Minimal, clean. Logo + nav links + copyright on one row
 */
import { Link } from "wouter";

export default function Footer() {
  return (
    <footer
      style={{
        background: "var(--fyro-bg)",
        borderTop: "1px solid var(--fyro-border)",
        padding: "2.5rem 0",
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "0 2.5rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "1.5rem",
        }}
      >
        {/* Logo */}
        <Link href="/" style={{ textDecoration: "none" }}>
          <span
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "1.1rem",
              fontWeight: 800,
              color: "var(--fyro-near-black)",
              letterSpacing: "-0.03em",
            }}
          >
            Fyro<span style={{ color: "var(--fyro-red)" }}>.</span>
          </span>
        </Link>

        {/* Nav links */}
        <nav style={{ display: "flex", gap: "2rem", flexWrap: "wrap" }}>
          {[
            { label: "Services", href: "/services" },
            { label: "How It Works", href: "/how-it-works" },
            { label: "About", href: "/about" },
            { label: "Speaking", href: "/speaking" },
            { label: "Insights", href: "/insights" },
            { label: "Contact", href: "/contact" },
          ].map((link) => (
            <Link
              key={link.label}
              href={link.href}
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "0.85rem",
                color: "var(--fyro-gray-mid)",
                textDecoration: "none",
                transition: "color 0.18s ease",
              }}
              onMouseEnter={(e) => ((e.target as HTMLElement).style.color = "var(--fyro-near-black)")}
              onMouseLeave={(e) => ((e.target as HTMLElement).style.color = "var(--fyro-gray-mid)")}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Copyright */}
        <p
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "0.8rem",
            color: "var(--fyro-gray-light)",
          }}
        >
          © {new Date().getFullYear()} Fyro. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
