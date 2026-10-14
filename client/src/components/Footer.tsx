/*
 * FYRO FOOTER
 * Brand and one-line positioning on the left, three short link columns, then a
 * quiet legal row. Always dark.
 */
import { Link } from "wouter";
import FyroLogo from "./FyroLogo";

const COLUMNS = [
  {
    heading: "What we build",
    links: [
      { label: "Services", href: "/services" },
      { label: "RFP agent", href: "/rfp-agent" },
      { label: "Projects", href: "/building" },
      { label: "How it works", href: "/how-it-works" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Founder", href: "/founder" },
      { label: "Speaking", href: "/speaking" },
      { label: "Insights", href: "/insights" },
    ],
  },
  {
    heading: "Get in touch",
    links: [
      { label: "Book a free demo", href: "/contact" },
      { label: "rj@fyroagents.com", href: "mailto:rj@fyroagents.com", external: true },
      { label: "LinkedIn", href: "https://www.linkedin.com/company/143087532/", external: true },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="fy-footer">
      <div className="fy-footer-inner">
        <div className="fy-footer-brand">
          <Link href="/" aria-label="Fyro home">
            <FyroLogo variant="lockup" height={84} />
          </Link>
          <p>Custom AI agents, CRMs, and workflows for service companies and government contractors.</p>
        </div>

        {COLUMNS.map((col) => (
          <nav key={col.heading} aria-label={col.heading}>
            <h2>{col.heading}</h2>
            <ul>
              {col.links.map((l) => (
                <li key={l.label}>
                  {"external" in l && l.external ? (
                    <a href={l.href} {...(l.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
                      {l.label}
                    </a>
                  ) : (
                    <Link href={l.href}>{l.label}</Link>
                  )}
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>

      <div className="fy-footer-legal">
        <p>&copy; {new Date().getFullYear()} Fyro AI Consulting. All rights reserved. · <Link href="/privacy">Privacy</Link></p>
      </div>

      <style>{`
        .fy-footer { background: #07080A; border-top: 1px solid #1C1F25; color: #A3A9B3; }
        .fy-footer-inner { max-width: 1200px; margin: 0 auto; padding: 72px 32px 56px; display: grid; grid-template-columns: 1.6fr 1fr 1fr 1fr; gap: 48px; }
        .fy-footer-brand p { margin-top: 20px; max-width: 30ch; font-size: 16px; line-height: 1.55; }
        .fy-footer h2 { font-size: 15px; font-weight: 600; font-stretch: 100%; letter-spacing: 0; color: #F4F5F7; margin-bottom: 16px; }
        .fy-footer ul { list-style: none; margin: 0; padding: 0; display: grid; gap: 10px; }
        .fy-footer a { font-size: 15px; color: #A3A9B3; text-decoration: none; transition: color .15s; }
        .fy-footer a:hover { color: #fff; }
        .fy-footer-legal { max-width: 1200px; margin: 0 auto; padding: 22px 32px 30px; border-top: 1px solid #1C1F25; font-size: 14px; color: #767D88; }
        @media (max-width: 860px) {
          .fy-footer-inner { grid-template-columns: 1fr 1fr; padding: 56px 20px 40px; }
          .fy-footer-brand { grid-column: 1 / -1; }
          .fy-footer-legal { padding: 20px; }
        }
      `}</style>
    </footer>
  );
}
