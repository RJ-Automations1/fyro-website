/*
 * FYRO NAVBAR
 * Graphite bar that turns translucent with a hairline once the page scrolls.
 * Logo left, links centre, one primary action right. Always dark, so it keeps
 * its own tokens even when it sits over a light section.
 */
import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X } from "lucide-react";
import FyroLogo from "./FyroLogo";

const navLinks = [
  { label: "Services", href: "/services" },
  { label: "How it works", href: "/how-it-works" },
  { label: "Projects", href: "/building" },
  { label: "About", href: "/about" },
  { label: "Insights", href: "/insights" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 16);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => setMenuOpen(false), [location]);

  return (
    <>
      <header className={`fy-nav${scrolled || menuOpen ? " is-scrolled" : ""}`}>
        <div className="fy-nav-inner">
          <Link href="/" className="fy-nav-logo" aria-label="Fyro home">
            <FyroLogo variant="nav" height={26} />
          </Link>

          <nav className="fy-nav-links" aria-label="Main">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} aria-current={location === link.href ? "page" : undefined}>
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="fy-nav-cta">
            <Link href="/contact" className="fyro-btn-primary">
              Book a free demo
            </Link>
          </div>

          <button
            type="button"
            className="fy-nav-toggle"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-expanded={menuOpen}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {menuOpen && (
          <div className="fy-nav-sheet">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href}>
                {link.label}
              </Link>
            ))}
            <Link href="/contact" className="fyro-btn-primary" style={{ marginTop: 20 }}>
              Book a free demo
            </Link>
          </div>
        )}
      </header>

      <style>{`
        .fy-nav {
          --fyro-near-black: #F4F5F7; --fyro-gray-dark: #D5D8DE; --fyro-border: #262A32;
          position: fixed; top: 0; left: 0; right: 0; z-index: 100;
          background: rgba(7,8,10,0.6); border-bottom: 1px solid transparent;
          transition: background .25s ease, border-color .25s ease, backdrop-filter .25s ease;
        }
        .fy-nav.is-scrolled { background: rgba(10,11,14,0.86); backdrop-filter: saturate(140%) blur(14px); -webkit-backdrop-filter: saturate(140%) blur(14px); border-bottom-color: rgba(255,255,255,0.08); }
        .fy-nav-inner { max-width: 1200px; margin: 0 auto; padding: 0 32px; height: 72px; display: flex; align-items: center; justify-content: space-between; gap: 24px; }
        .fy-nav-logo { display: flex; align-items: center; }
        .fy-nav-links { display: flex; align-items: center; gap: 32px; }
        .fy-nav-links a { font-size: 15px; font-weight: 500; color: #B9BFC8; text-decoration: none; transition: color .15s; }
        .fy-nav-links a:hover, .fy-nav-links a[aria-current] { color: #fff; }
        .fy-nav-cta .fyro-btn-primary { font-size: 15px; padding: 10px 18px; }
        .fy-nav-toggle { display: none; background: none; border: none; color: #fff; padding: 6px; }
        .fy-nav-sheet { display: flex; flex-direction: column; padding: 8px 24px 28px; background: rgba(10,11,14,0.98); border-top: 1px solid rgba(255,255,255,0.08); }
        .fy-nav-sheet a:not(.fyro-btn-primary) { padding: 16px 0; font-size: 18px; font-weight: 500; color: #F4F5F7; text-decoration: none; border-bottom: 1px solid rgba(255,255,255,0.08); }
        @media (max-width: 860px) {
          .fy-nav-links, .fy-nav-cta { display: none; }
          .fy-nav-toggle { display: inline-flex; }
          .fy-nav-inner { padding: 0 20px; height: 64px; }
        }
      `}</style>
    </>
  );
}
