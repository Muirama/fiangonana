import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import {
  FaChartPie,
  FaUsers,
  FaHome,
  FaCalendarAlt,
  FaMoneyBillWave,
  FaClipboardList,
  FaChurch,
  FaChevronLeft,
  FaChevronRight,
  FaSignOutAlt,
  FaGlobe,
  FaRing
} from "react-icons/fa";

const navItems = [
  {
    icon: <FaChartPie />,
    label: "Tableau de bord",
    labelMg: "Dashboard",
    path: "/admin",
  },
  {
    icon: <FaUsers />,
    label: "Membres",
    labelMg: "Mpikambana",
    path: "/admin/membres",
  },
  {
    icon: <FaHome />,
    label: "Familles",
    labelMg: "Fianakaviana",
    path: "/admin/familles",
  },
  {
    icon: <FaRing />,
    label: "Mariages",
    labelMg: "Fanambadiana",
    path: "/admin/mariages",
  },
  {
    icon: <FaCalendarAlt />,
    label: "Activités",
    labelMg: "Hetsika",
    path: "/admin/activites",
    soon: true,
  },
  {
    icon: <FaMoneyBillWave />,
    label: "Finances",
    labelMg: "Fitantanambola",
    path: "/admin/finances",
    soon: true,
  },
  {
    icon: <FaClipboardList />,
    label: "Présences",
    labelMg: "Fanatrehana",
    path: "/admin/presences",
    soon: true,
  },
];

export default function AdminLayout({ children }) {
  const [collapsed, setCollapsed] = useState(false);
  const { logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        background: "var(--cream)",
      }}
    >
      {/* SIDEBAR */}
      <aside
        style={{
          width: collapsed ? 72 : 260,
          background:
            "linear-gradient(180deg, var(--beige-300) 0%, var(--beige-200) 100%)",
          display: "flex",
          flexDirection: "column",
          transition: "width 0.3s ease",
          overflow: "hidden",
          boxShadow: "4px 0 30px rgba(180,160,140,0.2)",
          position: "sticky",
          top: 0,
          height: "100vh",
          flexShrink: 0,
        }}
      >
        {/* Logo */}
        <div
          style={{
            padding: collapsed ? "1.5rem 0" : "1.75rem 1.25rem",
            borderBottom: "1px solid rgba(212,160,23,0.2)",
            display: "flex",
            alignItems: "center",
            justifyContent: collapsed ? "center" : "space-between",
            gap: "0.75rem",
          }}
        >
          {!collapsed && (
            <div
              style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}
            >
              <div
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: "50%",
                  background:
                    "linear-gradient(135deg, var(--gold-500), var(--gold-600))",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "1.1rem",
                  flexShrink: 0,
                  color: "white",
                }}
              >
                <FaChurch />
              </div>
              <div>
                <div
                  style={{
                    fontFamily: "'Cinzel', serif",
                    color: "var(--gold-600)",
                    fontWeight: 700,
                    fontSize: "0.9rem",
                    lineHeight: 1.2,
                  }}
                >
                  EKAR Soavinimerina
                </div>
                <div
                  style={{
                    color: "#8b7e70",
                    fontSize: "0.62rem",
                    letterSpacing: "0.1em",
                  }}
                >
                  ADMINISTRATION
                </div>
              </div>
            </div>
          )}
          {collapsed && <div style={{ fontSize: "1.3rem" }}>✝</div>}
          <button
            onClick={() => setCollapsed(!collapsed)}
            style={{
              background: "rgba(212,160,23,0.15)",
              border: "none",
              cursor: "pointer",
              color: "var(--text-dark)",
              width: 28,
              height: 28,
              borderRadius: "0.35rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "0.7rem",
              flexShrink: 0,
            }}
          >
            {collapsed ? <FaChevronRight /> : <FaChevronLeft />}
          </button>
        </div>

        {/* Nav */}
        <nav
          style={{
            flex: 1,
            padding: "1rem 0.75rem",
            display: "flex",
            flexDirection: "column",
            gap: "0.25rem",
          }}
        >
          {!collapsed && (
            <div
              style={{
                color: "#8b7e70",
                fontSize: "0.65rem",
                letterSpacing: "0.15em",
                fontWeight: 600,
                padding: "0.5rem 0.25rem",
                marginBottom: "0.25rem",
              }}
            >
              NAVIGATION
            </div>
          )}
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <div key={item.path} style={{ position: "relative" }}>
                {item.soon ? (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.75rem",
                      padding: collapsed ? "0.65rem 0" : "0.65rem 1rem",
                      justifyContent: collapsed ? "center" : "flex-start",
                      borderRadius: "0.5rem",
                      color: "#b8a898",
                      cursor: "not-allowed",
                      fontSize: "0.9rem",
                    }}
                  >
                    <span style={{ fontSize: "1.1rem", opacity: 0.4 }}>
                      {item.icon}
                    </span>
                    {!collapsed && (
                      <div
                        style={{
                          flex: 1,
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <span style={{ fontSize: "0.85rem" }}>
                          {item.label}
                        </span>
                        <span
                          style={{
                            fontSize: "0.6rem",
                            background: "rgba(212,160,23,0.2)",
                            color: "var(--gold-600)",
                            padding: "1px 6px",
                            borderRadius: "999px",
                          }}
                        >
                          Bientôt
                        </span>
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    to={item.path}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.75rem",
                      padding: collapsed ? "0.65rem 0" : "0.65rem 1rem",
                      justifyContent: collapsed ? "center" : "flex-start",
                      borderRadius: "0.5rem",
                      textDecoration: "none",
                      color: isActive ? "var(--gold-600)" : "var(--text-muted)",
                      background: isActive
                        ? "rgba(212,160,23,0.12)"
                        : "transparent",
                      borderLeft: isActive
                        ? "3px solid var(--gold-500)"
                        : "3px solid transparent",
                      transition: "all 0.2s",
                      fontSize: "0.9rem",
                    }}
                    onMouseEnter={(e) => {
                      if (!isActive) {
                        e.currentTarget.style.background =
                          "rgba(212,160,23,0.08)";
                        e.currentTarget.style.color = "var(--gold-600)";
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isActive) {
                        e.currentTarget.style.background = "transparent";
                        e.currentTarget.style.color = "var(--text-muted)";
                      }
                    }}
                  >
                    <span style={{ fontSize: "1.1rem" }}>{item.icon}</span>
                    {!collapsed && (
                      <div>
                        <div style={{ fontSize: "0.85rem", fontWeight: 500 }}>
                          {item.label}
                        </div>
                        <div
                          style={{
                            fontSize: "0.65rem",
                            opacity: 0.5,
                            fontStyle: "italic",
                          }}
                        >
                          {item.labelMg}
                        </div>
                      </div>
                    )}
                  </Link>
                )}
              </div>
            );
          })}
        </nav>

        {/* User */}
        <div
          style={{
            borderTop: "1px solid rgba(212,160,23,0.15)",
            padding: collapsed ? "1rem 0.75rem" : "1rem 1.25rem",
          }}
        >
          {!collapsed && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
                marginBottom: "0.75rem",
              }}
            >
            </div>
          )}
          <button
            onClick={handleLogout}
            style={{
              width: "100%",
              background: "rgba(239,68,68,0.15)",
              border: "1px solid rgba(239,68,68,0.3)",
              color: "#c85a5a",
              borderRadius: "0.4rem",
              padding: "0.5rem",
              cursor: "pointer",
              fontSize: "0.8rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "0.5rem",
              transition: "all 0.2s",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.background = "rgba(239,68,68,0.25)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.background = "rgba(239,68,68,0.15)")
            }
          >
            <FaSignOutAlt /> {!collapsed && "Déconnexion"}
          </button>
        </div>
      </aside>

      {/* MAIN */}
      <main
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          minWidth: 0,
        }}
      >
        {/* Topbar */}
        <header
          style={{
            background: "white",
            borderBottom: "1px solid rgba(212,160,23,0.15)",
            padding: "0.9rem 2rem",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            boxShadow: "0 2px 10px rgba(0,0,0,0.04)",
            position: "sticky",
            top: 0,
            zIndex: 50,
          }}
        >
          <div>
            <p style={{ color: "#9a8a7a", fontSize: "0.8rem" }}>
              {new Date().toLocaleDateString("fr-FR", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <Link
              to="/"
              target="_blank"
              style={{
                color: "#9a8a7a",
                fontSize: "0.8rem",
                textDecoration: "none",
              }}
            >
              <FaGlobe /> Voir le site
            </Link>
            <div
              style={{
                background:
                  "linear-gradient(135deg, var(--beige-100), var(--gold-100))",
                border: "1px solid rgba(212,160,23,0.3)",
                borderRadius: "2rem",
                padding: "0.4rem 1rem",
                fontSize: "0.8rem",
                color: "var(--gold-700)",
                fontWeight: 600,
              }}
            >
              Bonjour
            </div>
          </div>
        </header>

        <div style={{ flex: 1, padding: "2rem", overflow: "auto" }}>
          {children}
        </div>
      </main>
    </div>
  );
}
