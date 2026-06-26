/*
 * FYRO NAVBAR — Hendricks.ai-inspired
 * Off-white bg, near-black text, red CTA button
 * Logo left, nav links center, CTA button right
 * All nav links go to dedicated pages — no anchor scroll
 */
import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "Services", href: "/services" },
  { label: "How It Works", href: "/how-it-works" },
  { label: "About", href: "/about" },
  { label: "Speaking", href: "/speaking" },
  { label: "Insights", href: "/insights" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          background: "var(--fyro-bg)",
          borderBottom: scrolled ? "1px solid var(--fyro-border)" : "1px solid transparent",
          transition: "border-color 0.25s ease",
        }}
      >
        <div
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            padding: "0 2.5rem",
            height: 64,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {/* Logo */}
          <Link href="/" style={{ textDecoration: "none", display: "flex", alignItems: "center" }}>
            <span
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "1.25rem",
                fontWeight: 800,
                color: "var(--fyro-near-black)",
                letterSpacing: "-0.03em",
              }}
            >
              Fyro
              <span style={{ color: "var(--fyro-red)" }}>.</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav
            className="hidden md:flex"
            style={{ alignItems: "center", gap: "2rem" }}
          >
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "0.9rem",
                  fontWeight: 500,
                  color: location === link.href ? "var(--fyro-near-black)" : "var(--fyro-gray-dark)",
                  textDecoration: "none",
                  transition: "color 0.18s ease",
                }}
                onMouseEnter={(e) => ((e.target as HTMLElement).style.color = "var(--fyro-near-black)")}
                onMouseLeave={(e) => ((e.target as HTMLElement).style.color = location === link.href ? "var(--fyro-near-black)" : "var(--fyro-gray-dark)")}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* CTA */}
          <div className="hidden md:block">
            <Link href="/contact" className="fyro-btn-primary" style={{ fontSize: "0.8rem", padding: "0.6rem 1.4rem" }}>
              Book a walkthrough
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
            style={{ background: "none", border: "none", color: "var(--fyro-near-black)", padding: "0.25rem" }}
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      {menuOpen && (
        <div
          style={{
            position: "fixed",
            top: 64,
            left: 0,
            right: 0,
            background: "var(--fyro-bg)",
            borderBottom: "1px solid var(--fyro-border)",
            zIndex: 99,
            padding: "1.5rem 2rem 2rem",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
            {navLinks.map((link) => (
              <div key={link.label} style={{ borderBottom: "1px solid var(--fyro-border)" }}>
                <Link
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  style={{
                    display: "block",
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "1rem",
                    fontWeight: 500,
                    color: "var(--fyro-near-black)",
                    textDecoration: "none",
                    padding: "1rem 0",
                  }}
                >
                  {link.label}
                </Link>
              </div>
            ))}
            <Link
              href="/contact"
              onClick={() => setMenuOpen(false)}
              className="fyro-btn-primary"
              style={{ marginTop: "1.25rem", textAlign: "center" }}
            >
              Book a walkthrough
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
