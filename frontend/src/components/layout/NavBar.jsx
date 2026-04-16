import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaChurch, FaArrowRight } from "react-icons/fa";

const navLinks = [
  { label: "Accueil", href: "#accueil" },
  { label: "Histoire", href: "#histoire" },
  { label: "Galerie", href: "#galerie" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        transition: "all 0.3s",
        background: scrolled ? "rgba(210,180,160,0.97)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        boxShadow: scrolled ? "0 2px 30px rgba(0,0,0,0.15)" : "none",
        padding: "1rem 2rem",
      }}
    >
      <div
        style={{
          maxWidth: 1100,
          margin: "0 auto",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <div
            style={{
              fontSize: "1.8rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <FaChurch style={{ color: "var(--gold-500)" }} />
          </div>
          <div>
            <div
              style={{
                fontFamily: "'Cinzel', serif",
                fontWeight: 700,
                fontSize: "1.1rem",
                color: "var(--gold-300)",
                lineHeight: 1.1,
              }}
            >
              EKAR Soavinimerina
            </div>
            <div
              style={{
                fontSize: "0.65rem",
                color: "rgba(255,255,255,0.6)",
                letterSpacing: "0.15em",
              }}
            >
              PAROISSE CATHOLIQUE
            </div>
          </div>
        </div>

        {/* Nav Links */}
        <div style={{ display: "flex", alignItems: "center", gap: "2rem" }}>
          <div style={{ display: "flex", gap: "1.5rem" }}>
            {navLinks.map((l) => (
              <a
                key={l.label}
                href={l.href}
                style={{
                  color: "rgba(255,255,255,0.85)",
                  textDecoration: "none",
                  fontSize: "0.88rem",
                  fontWeight: 500,
                  transition: "color 0.2s",
                }}
                onMouseEnter={(e) => (e.target.style.color = "var(--gold-300)")}
                onMouseLeave={(e) =>
                  (e.target.style.color = "rgba(255,255,255,0.85)")
                }
              >
                {l.label}
              </a>
            ))}
          </div>
          <Link
            to="/login"
            style={{
              background:
                "linear-gradient(135deg, var(--gold-500), var(--gold-600))",
              color: "white",
              textDecoration: "none",
              padding: "0.5rem 1.2rem",
              borderRadius: "0.4rem",
              fontSize: "0.85rem",
              fontFamily: "'Cinzel', serif",
              fontWeight: 600,
              letterSpacing: "0.05em",
              display: "flex",
              alignItems: "center",
              gap: "0.4rem",
            }}
          >
            Espace Admin <FaArrowRight size={12} />
          </Link>
        </div>
      </div>
    </nav>
  );
}
