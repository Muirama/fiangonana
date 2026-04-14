import {
  mockStats,
  mockEventsRecents,
  mockPresenceData,
  mockMembres,
} from "../../data/mockData";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
} from "recharts";

const StatCard = ({ icon, label, labelMg, value, sub, color, bg }) => (
  <div
    style={{
      background: bg || "white",
      borderRadius: "1rem",
      padding: "1.5rem",
      boxShadow: "0 4px 20px rgba(0,0,0,0.06)",
      border: "1px solid rgba(212,160,23,0.1)",
      display: "flex",
      flexDirection: "column",
      gap: "0.5rem",
      position: "relative",
      overflow: "hidden",
    }}
  >
    <div
      style={{
        position: "absolute",
        top: -20,
        right: -20,
        width: 80,
        height: 80,
        borderRadius: "50%",
        background: "rgba(255,255,255,0.08)",
      }}
    />
    <div style={{ fontSize: "1.8rem" }}>{icon}</div>
    <div>
      <div
        style={{
          fontSize: "2rem",
          fontWeight: 800,
          color: color || "var(--gold-600)",
          fontFamily: "'Cinzel', serif",
        }}
      >
        {value}
      </div>
      <div style={{ fontWeight: 600, color: "var(--text-dark)", fontSize: "0.9rem" }}>
        {label}
      </div>
      {labelMg && (
        <div
          style={{ color: "#9a8a7a", fontSize: "0.72rem", fontStyle: "italic" }}
        >
          {labelMg}
        </div>
      )}
      {sub && (
        <div
          style={{
            color: "#b8a898",
            fontSize: "0.75rem",
            marginTop: "0.25rem",
          }}
        >
          {sub}
        </div>
      )}
    </div>
  </div>
);

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div
        style={{
          background: "white",
          border: "1px solid rgba(212,160,23,0.3)",
          borderRadius: "0.5rem",
          padding: "0.75rem 1rem",
          boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
        }}
      >
        <p
          style={{
            fontWeight: 600,
            color: "var(--violet-700)",
            marginBottom: "0.25rem",
          }}
        >
          {label}
        </p>
        <p style={{ color: "var(--gold-600)", fontSize: "0.9rem" }}>
          {payload[0].value}% de présence
        </p>
      </div>
    );
  }
  return null;
};

export default function Dashboard() {
  const actifCount = mockMembres.filter((m) => m.statut === "Actif").length;

  return (
    <div>
      {/* Header */}
      <div style={{ marginBottom: "2rem" }}>
        <h1
          style={{
            fontFamily: "'Cinzel', serif",
            fontSize: "1.6rem",
            color: "var(--text-dark)",
            marginBottom: "0.25rem",
          }}
        >
          Tableau de bord
        </h1>
        <p style={{ color: "#9a8a7a", fontSize: "0.88rem" }}>
          Dashboard · Vue d'ensemble de la paroisse EKAR Soavy
        </p>
      </div>

      {/* Stat cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
          gap: "1.25rem",
          marginBottom: "2rem",
        }}
      >
        <StatCard
          icon="👥"
          label="Membres totaux"
          labelMg="Mpikambana rehetra"
          value={mockStats.totalMembres}
        />
        <StatCard
          icon="🏠"
          label="Familles"
          labelMg="Fianakaviana"
          value={mockStats.familles}
        />
        <StatCard
          icon="✅"
          label="Membres actifs"
          labelMg="Mpikambana mavitrika"
          value={actifCount}
          sub={`sur ${mockStats.totalMembres} membres`}
        />
        <StatCard
          icon="📈"
          label="Taux de présence"
          labelMg="Fanatrehana"
          value={`${mockStats.tauxPresence}%`}
        />
        <StatCard
          icon="🆕"
          label="Nouveaux ce mois"
          labelMg="Vaovao ity volana ity"
          value={mockStats.nouveauxCeMois}
          sub="Avril 2026"
        />
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "1.5rem",
          marginBottom: "2rem",
        }}
      >
        {/* Graphique présence */}
        <div
          style={{
            background: "white",
            borderRadius: "1rem",
            padding: "1.5rem",
            boxShadow: "0 4px 20px rgba(0,0,0,0.06)",
            border: "1px solid rgba(212,160,23,0.1)",
          }}
        >
          <div style={{ marginBottom: "1.25rem" }}>
            <h3
              style={{
                fontFamily: "'Lora', serif",
                fontWeight: 600,
                color: "var(--text-dark)",
                fontSize: "1rem",
              }}
            >
              Taux de présence — 6 derniers mois
            </h3>
            <p style={{ color: "#9a8a7a", fontSize: "0.78rem" }}>
              Fanatrehana tamin'ireo volana 6 farany
            </p>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={mockPresenceData} barSize={28}>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="rgba(212,160,23,0.1)"
              />
              <XAxis
                dataKey="mois"
                tick={{ fontSize: 12, fill: "#9a8a7a" }}
                axisLine={false}
              />
              <YAxis
                tick={{ fontSize: 12, fill: "#9a8a7a" }}
                axisLine={false}
                domain={[0, 100]}
                unit="%"
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar
                dataKey="presence"
                fill="url(#goldGradient)"
                radius={[4, 4, 0, 0]}
              />
              <defs>
                <linearGradient id="goldGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#d4a017" />
                  <stop offset="100%" stopColor="#8b6508" />
                </linearGradient>
              </defs>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Activités récentes */}
        <div
          style={{
            background: "white",
            borderRadius: "1rem",
            padding: "1.5rem",
            boxShadow: "0 4px 20px rgba(0,0,0,0.06)",
            border: "1px solid rgba(212,160,23,0.1)",
          }}
        >
          <h3
            style={{
              fontFamily: "'Lora', serif",
              fontWeight: 600,
              color: "var(--text-dark)",
              marginBottom: "0.25rem",
              fontSize: "1rem",
            }}
          >
            Activités récentes
          </h3>
          <p
            style={{
              color: "#9a8a7a",
              fontSize: "0.78rem",
              marginBottom: "1.25rem",
            }}
          >
            Hetsika farany nataon'ny paroasy
          </p>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}
          >
            {mockEventsRecents.map((ev) => (
              <div
                key={ev.id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "1rem",
                  padding: "0.75rem",
                  borderRadius: "0.5rem",
                  background: "rgba(245,240,232,0.6)",
                  border: "1px solid rgba(212,160,23,0.1)",
                }}
              >
                <div
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: "0.5rem",
                    background:
                      "linear-gradient(135deg, var(--violet-100), var(--gold-100))",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "1.1rem",
                    flexShrink: 0,
                  }}
                >
                  {ev.type === "Messe"
                    ? "⛪"
                    : ev.type === "Réunion"
                      ? "👥"
                      : ev.type === "Formation"
                        ? "📖"
                        : "🙏"}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div
                    style={{
                      fontWeight: 600,
                      fontSize: "0.85rem",
                      color: "#2d2416",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {ev.titre}
                  </div>
                  <div style={{ color: "#9a8a7a", fontSize: "0.75rem" }}>
                    {new Date(ev.date).toLocaleDateString("fr-FR", {
                      day: "numeric",
                      month: "short",
                    })}
                  </div>
                </div>
                <div
                  style={{
                    background: "var(--gold-100)",
                    color: "var(--gold-700)",
                    padding: "2px 10px",
                    borderRadius: "999px",
                    fontSize: "0.72rem",
                    fontWeight: 600,
                    flexShrink: 0,
                  }}
                >
                  {ev.participants} pers.
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Membres récents */}
      <div
        style={{
          background: "white",
          borderRadius: "1rem",
          padding: "1.5rem",
          boxShadow: "0 4px 20px rgba(0,0,0,0.06)",
          border: "1px solid rgba(212,160,23,0.1)",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "1.25rem",
          }}
        >
          <div>
            <h3
              style={{
                fontFamily: "'Lora', serif",
                fontWeight: 600,
                color: "var(--text-dark)",
                fontSize: "1rem",
              }}
            >
              Derniers membres inscrits
            </h3>
            <p style={{ color: "#9a8a7a", fontSize: "0.78rem" }}>
              Mpikambana farany niditra
            </p>
          </div>
          <a
            href="/admin/membres"
            style={{
              color: "var(--gold-600)",
              fontSize: "0.82rem",
              textDecoration: "none",
              fontWeight: 600,
            }}
          >
            Voir tous →
          </a>
        </div>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ borderBottom: "2px solid rgba(212,160,23,0.15)" }}>
                {["Nom & Prénom", "Famille", "Rôle", "Quartier", "Statut"].map(
                  (h) => (
                    <th
                      key={h}
                      style={{
                        padding: "0.5rem 0.75rem",
                        textAlign: "left",
                        color: "var(--text-dark)",
                        fontSize: "0.75rem",
                        fontWeight: 600,
                        letterSpacing: "0.08em",
                        textTransform: "uppercase",
                      }}
                    >
                      {h}
                    </th>
                  ),
                )}
              </tr>
            </thead>
            <tbody>
              {mockMembres.slice(0, 5).map((m) => (
                <tr
                  key={m.id}
                  style={{ borderBottom: "1px solid rgba(212,160,23,0.08)" }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.background = "rgba(245,240,232,0.6)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.background = "transparent")
                  }
                >
                  <td
                    style={{
                      padding: "0.75rem",
                      display: "flex",
                      alignItems: "center",
                      gap: "0.6rem",
                    }}
                  >
                    <div
                      style={{
                        width: 32,
                        height: 32,
                        borderRadius: "50%",
                        background:
                          "linear-gradient(135deg, var(--violet-400), var(--gold-500))",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "white",
                        fontSize: "0.75rem",
                        fontWeight: 700,
                        flexShrink: 0,
                      }}
                    >
                      {m.prenom.charAt(0)}
                      {m.nom.charAt(0)}
                    </div>
                    <span style={{ fontWeight: 500, fontSize: "0.88rem" }}>
                      {m.prenom} {m.nom}
                    </span>
                  </td>
                  <td
                    style={{
                      padding: "0.75rem",
                      color: "#6b5a4a",
                      fontSize: "0.85rem",
                    }}
                  >
                    {m.famille}
                  </td>
                  <td style={{ padding: "0.75rem" }}>
                    <span
                      style={{
                        background: "var(--violet-100)",
                        color: "var(--violet-700)",
                        padding: "2px 10px",
                        borderRadius: "999px",
                        fontSize: "0.72rem",
                        fontWeight: 600,
                      }}
                    >
                      {m.role}
                    </span>
                  </td>
                  <td
                    style={{
                      padding: "0.75rem",
                      color: "#6b5a4a",
                      fontSize: "0.85rem",
                    }}
                  >
                    {m.quartier}
                  </td>
                  <td style={{ padding: "0.75rem" }}>
                    <span
                      style={{
                        background:
                          m.statut === "Actif"
                            ? "rgb(209,250,229)"
                            : "rgb(254,226,226)",
                        color:
                          m.statut === "Actif"
                            ? "rgb(6,95,70)"
                            : "rgb(185,28,28)",
                        padding: "2px 10px",
                        borderRadius: "999px",
                        fontSize: "0.72rem",
                        fontWeight: 600,
                      }}
                    >
                      {m.statut}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
