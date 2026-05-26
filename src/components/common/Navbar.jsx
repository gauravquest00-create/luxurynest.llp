import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Phone } from "lucide-react";
import siteConfig from "../../data/siteConfig";

const navLinks = [
  { label: "Home", path: "/" },
  { label: "Properties", path: "/properties" },
  { label: "About", path: "/about" },
  { label: "Contact", path: "/contact" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  const isActive = (path) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname.startsWith(path);
  };

  // Add scroll listener for background effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <nav
        style={{
          backgroundColor: scrolled ? "rgba(255, 255, 255, 0.95)" : "white",
          backdropFilter: scrolled ? "blur(8px)" : "none",
          boxShadow: scrolled ? "0 4px 12px rgba(0,0,0,0.08)" : "0 1px 2px rgba(0,0,0,0.05)",
          position: "sticky",
          top: 0,
          zIndex: 50,
          transition: "all 0.3s ease",
        }}
      >
        <div
          style={{
            maxWidth: "1280px",
            margin: "0 auto",
            padding: "0.75rem 1rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {/* Logo / Brand */}
          <Link
            to="/"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              textDecoration: "none",
            }}
          >
            <div
              style={{
                backgroundColor: "#1a56db",
                color: "white",
                fontWeight: "bold",
                fontSize: "0.875rem",
                padding: "0.5rem 0.75rem",
                borderRadius: "0.5rem",
                transition: "transform 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
              onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
            >
              GA
            </div>
            <div>
              <p
                style={{
                  fontWeight: "bold",
                  fontSize: "1rem",
                  color: "#1e3a8a",
                  margin: 0,
                  lineHeight: 1.25,
                }}
              >
                {siteConfig.businessName}
              </p>
              <p
                style={{
                  color: "#9ca3af",
                  fontSize: "0.75rem",
                  margin: 0,
                  lineHeight: 1.25,
                }}
              >
                RERA: {siteConfig.rera}
              </p>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <div
            style={{
              display: "none",
              gap: "1.5rem",
            }}
            className="desktop-nav"
          >
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                style={{
                  fontSize: "0.875rem",
                  fontWeight: 500,
                  textDecoration: "none",
                  color: isActive(link.path) ? "#1a56db" : "#4b5563",
                  borderBottom: isActive(link.path) ? "2px solid #1a56db" : "none",
                  paddingBottom: "0.125rem",
                  transition: "color 0.2s, border-bottom 0.2s",
                }}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop Call Button */}
          <a
            href={`tel:${siteConfig.phone}`}
            style={{
              display: "none",
              alignItems: "center",
              gap: "0.5rem",
              backgroundColor: "#1a56db",
              color: "white",
              fontSize: "0.875rem",
              fontWeight: 500,
              padding: "0.5rem 1rem",
              borderRadius: "0.5rem",
              textDecoration: "none",
              transition: "background-color 0.2s, transform 0.2s",
            }}
            className="call-btn"
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#1e3a8a";
              e.currentTarget.style.transform = "scale(1.02)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "#1a56db";
              e.currentTarget.style.transform = "scale(1)";
            }}
          >
            <Phone size={15} />
            {siteConfig.phoneDisplay}
          </a>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            style={{
              display: "block",
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "#4b5563",
              transition: "color 0.2s",
            }}
            className="menu-toggle"
            aria-label="Menu"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Dropdown Menu – with smooth slide animation */}
        <div
          className={`mobile-menu ${menuOpen ? "open" : ""}`}
          style={{
            backgroundColor: "white",
            borderTop: "1px solid #f3f4f6",
            padding: menuOpen ? "1rem" : "0 1rem",
            display: "flex",
            flexDirection: "column",
            gap: "0.5rem",
            overflow: "hidden",
            transition: "padding 0.3s ease, max-height 0.3s ease",
            maxHeight: menuOpen ? "300px" : "0",
          }}
        >
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setMenuOpen(false)}
              style={{
                display: "block",
                padding: "0.5rem 0.75rem",
                borderRadius: "0.5rem",
                fontSize: "0.875rem",
                fontWeight: 500,
                textDecoration: "none",
                backgroundColor: isActive(link.path) ? "#eff6ff" : "transparent",
                color: isActive(link.path) ? "#1a56db" : "#4b5563",
                transition: "background-color 0.2s",
              }}
            >
              {link.label}
            </Link>
          ))}
          <a
            href={`tel:${siteConfig.phone}`}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              backgroundColor: "#1a56db",
              color: "white",
              fontSize: "0.875rem",
              fontWeight: 500,
              padding: "0.5rem 0.75rem",
              borderRadius: "0.5rem",
              textDecoration: "none",
              marginTop: "0.5rem",
              transition: "background-color 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#1e3a8a")}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#1a56db")}
          >
            <Phone size={15} />
            {siteConfig.phoneDisplay}
          </a>
        </div>
      </nav>

      {/* Responsive & animation styles */}
      <style>
        {`
          @media (min-width: 768px) {
            .desktop-nav { display: flex !important; }
            .call-btn { display: flex !important; }
            .menu-toggle { display: none !important; }
          }
          .mobile-menu {
            transition: max-height 0.4s cubic-bezier(0.4, 0, 0.2, 1), padding 0.2s ease;
          }
          .mobile-menu a {
            transform: translateY(0);
            transition: transform 0.2s, background-color 0.2s;
          }
          .mobile-menu.open a {
            animation: fadeSlide 0.3s ease forwards;
          }
          @keyframes fadeSlide {
            from {
              opacity: 0;
              transform: translateY(-10px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}
      </style>
    </>
  );
}