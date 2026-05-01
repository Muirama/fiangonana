import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Cell,
} from "recharts";
import {
  FaUsers,
  FaHome,
  FaDove,
  FaRing,
  FaCross,
  FaHandsHelping,
  FaStar,
} from "react-icons/fa";
import { useDashboard } from "../../hooks/useDashboard";

// ── Composants utilitaires ──────────────────────────────────────────

const StatCard = ({
  icon,
  label,
  labelMg,
  value,
  sub,
  color = "var(--gold-600, #b45309)",
}) => (
  <div
    style={{
      background: "white",
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
        background: "rgba(212,160,23,0.06)",
      }}
    />
    <div style={{ fontSize: "1.5rem", color }}>{icon}</div>
    <div>
      <div
        style={{
          fontSize: "2rem",
          fontWeight: 800,
          color,
          fontFamily: "'Cinzel', serif",
        }}
      >
        {value}
      </div>
      <div
        style={{
          fontWeight: 600,
          color: "var(--text-dark)",
          fontSize: "0.9rem",
        }}
      >
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

const SectionTitle = ({ title, sub }) => (
  <div style={{ marginBottom: "1.25rem" }}>
    <h3
      style={{
        fontFamily: "'Lora', serif",
        fontWeight: 600,
        color: "var(--text-dark)",
        fontSize: "1rem",
      }}
    >
      {title}
    </h3>
    {sub && <p style={{ color: "#9a8a7a", fontSize: "0.78rem" }}>{sub}</p>}
  </div>
);

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
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
          color: "var(--text-dark)",
          marginBottom: "0.25rem",
        }}
      >
        {label}
      </p>
      <p style={{ color: "var(--gold-600, #b45309)", fontSize: "0.9rem" }}>
        {payload[0].value} personne{payload[0].value > 1 ? "s" : ""}
      </p>
    </div>
  );
};

const TYPE_COLORS = ["#d4a017", "#b45309", "#92400e", "#78350f"];
const SACR_COLORS = ["#3b82f6", "#8b5cf6", "#10b981"];

// ── Page ────────────────────────────────────────────────────────────

export default function Dashboard() {
  const { data, loading, error } = useDashboard();

  if (loading)
    return (
      <p style={{ color: "#9a8a7a", textAlign: "center", padding: "4rem" }}>
        Chargement du tableau de bord...
      </p>
    );
  if (error)
    return (
      <p
        style={{
          color: "rgb(185,28,28)",
          textAlign: "center",
          padding: "4rem",
        }}
      >
        Erreur : {error}
      </p>
    );
  if (!data) return null;

  const {
    totalPersonnes,
    totalFamilles,
    totalApvs,
    totalMariages,
    parType,
    sacrements,
    topFamilles,
    derniersPersonnes,
    sansMarriage,
    pctBaptise,
  } = data;

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
          Dashboard · Vue d'ensemble de la paroisse
        </p>
      </div>

      {/* ── Stat cards ── */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
          gap: "1.25rem",
          marginBottom: "2rem",
        }}
      >
        <StatCard
          icon={<FaUsers />}
          label="Membres"
          labelMg="Mpikambana"
          value={totalPersonnes}
        />
        <StatCard
          icon={<FaHome />}
          label="Familles"
          labelMg="Fianakaviana"
          value={totalFamilles}
        />
        <StatCard
          icon={<FaDove />}
          label="APV"
          labelMg="Antokony"
          value={totalApvs}
          color="rgb(6,95,70)"
        />
        <StatCard
          icon={<FaRing />}
          label="Mariages"
          labelMg="Fanambadiana"
          value={totalMariages}
          color="rgb(190,24,93)"
        />
        <StatCard
          icon={<FaCross />}
          label="Baptisés"
          labelMg="Natao batisa"
          value={`${pctBaptise}%`}
          sub={`du total des membres`}
          color="#3b82f6"
        />
        <StatCard
          icon={<FaHandsHelping />}
          label="Sans mariage"
          labelMg="Tsy nanambady"
          value={sansMarriage}
          sub="familles non enregistrées"
          color="#9a8a7a"
        />
      </div>

      {/* ── Graphiques ── */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "1.5rem",
          marginBottom: "2rem",
        }}
      >
        {/* Répartition par type */}
        <div
          style={{
            background: "white",
            borderRadius: "1rem",
            padding: "1.5rem",
            boxShadow: "0 4px 20px rgba(0,0,0,0.06)",
            border: "1px solid rgba(212,160,23,0.1)",
          }}
        >
          <SectionTitle
            title="Répartition par type"
            sub="Père · Mère · Enfant · Autre"
          />
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={parType} barSize={36}>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="rgba(212,160,23,0.1)"
                vertical={false}
              />
              <XAxis
                dataKey="type"
                tick={{ fontSize: 12, fill: "#9a8a7a" }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fontSize: 12, fill: "#9a8a7a" }}
                axisLine={false}
                tickLine={false}
                allowDecimals={false}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="count" radius={[6, 6, 0, 0]}>
                {parType.map((_, i) => (
                  <Cell key={i} fill={TYPE_COLORS[i % TYPE_COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Sacrements */}
        <div
          style={{
            background: "white",
            borderRadius: "1rem",
            padding: "1.5rem",
            boxShadow: "0 4px 20px rgba(0,0,0,0.06)",
            border: "1px solid rgba(212,160,23,0.1)",
          }}
        >
          <SectionTitle
            title="Sacrements reçus"
            sub="Baptême · Communion · Confirmation"
          />
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={sacrements} barSize={36}>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="rgba(212,160,23,0.1)"
                vertical={false}
              />
              <XAxis
                dataKey="label"
                tick={{ fontSize: 12, fill: "#9a8a7a" }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fontSize: 12, fill: "#9a8a7a" }}
                axisLine={false}
                tickLine={false}
                allowDecimals={false}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="count" radius={[6, 6, 0, 0]}>
                {sacrements.map((_, i) => (
                  <Cell key={i} fill={SACR_COLORS[i % SACR_COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* ── Tableaux ── */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "1.5rem",
        }}
      >
        {/* Derniers membres inscrits */}
        <div
          style={{
            background: "white",
            borderRadius: "1rem",
            padding: "1.5rem",
            boxShadow: "0 4px 20px rgba(0,0,0,0.06)",
            border: "1px solid rgba(212,160,23,0.1)",
          }}
        >
          <SectionTitle
            title="Derniers membres inscrits"
            sub="Mpikambana farany niditra"
          />
          <div
            style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}
          >
            {derniersPersonnes.length === 0 ? (
              <p style={{ color: "#9a8a7a", fontSize: "0.85rem" }}>
                Aucun membre
              </p>
            ) : (
              derniersPersonnes.map((p, idx) => (
                <div
                  key={p.id}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.75rem",
                    padding: "0.6rem 0.75rem",
                    borderRadius: "0.5rem",
                    background:
                      idx % 2 === 0 ? "white" : "rgba(250,247,242,0.6)",
                  }}
                >
                  <div
                    style={{
                      width: 34,
                      height: 34,
                      borderRadius: "50%",
                      background: `linear-gradient(135deg, hsl(${(p.id * 47) % 360},60%,55%), hsl(${(p.id * 47 + 60) % 360},70%,45%))`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "white",
                      fontSize: "0.75rem",
                      fontWeight: 700,
                      flexShrink: 0,
                    }}
                  >
                    {(p.prenom || p.nom || "?").charAt(0)}
                    {(p.nom || "").charAt(0)}
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
                      {p.prenom || ""} {p.nom}
                    </div>
                    <div style={{ fontSize: "0.72rem", color: "#9a8a7a" }}>
                      {p.type} · {p.profession || "—"}
                    </div>
                  </div>
                  <span
                    style={{
                      background: "rgba(212,160,23,0.1)",
                      color: "#8B6914",
                      padding: "2px 8px",
                      borderRadius: "999px",
                      fontSize: "0.68rem",
                      fontWeight: 600,
                      flexShrink: 0,
                    }}
                  >
                    #{p.id}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Top familles */}
        <div
          style={{
            background: "white",
            borderRadius: "1rem",
            padding: "1.5rem",
            boxShadow: "0 4px 20px rgba(0,0,0,0.06)",
            border: "1px solid rgba(212,160,23,0.1)",
          }}
        >
          <SectionTitle
            title="Familles les plus nombreuses"
            sub="Fianakaviana lehibe"
          />
          <div
            style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}
          >
            {topFamilles.length === 0 ? (
              <p style={{ color: "#9a8a7a", fontSize: "0.85rem" }}>
                Aucune famille
              </p>
            ) : (
              topFamilles.map((f, idx) => {
                const membres = f.Personnes || [];
                const pere = membres.find((p) => p.type === "pere");
                const mere = membres.find((p) => p.type === "mere");
                const maxMembres = topFamilles[0]?.Personnes?.length || 1;
                const pct = Math.round((membres.length / maxMembres) * 100);
                return (
                  <div
                    key={f.id}
                    style={{
                      padding: "0.6rem 0.75rem",
                      borderRadius: "0.5rem",
                      background:
                        idx % 2 === 0 ? "white" : "rgba(250,247,242,0.6)",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginBottom: "0.35rem",
                      }}
                    >
                      <div>
                        <span
                          style={{
                            fontWeight: 600,
                            fontSize: "0.85rem",
                            color: "#2d2416",
                          }}
                        >
                          {pere
                            ? `${pere.prenom || ""} ${pere.nom}`
                            : mere
                              ? `${mere.prenom || ""} ${mere.nom}`
                              : `Famille #${f.id}`}
                        </span>
                        <span
                          style={{
                            fontSize: "0.72rem",
                            color: "#9a8a7a",
                            marginLeft: "0.5rem",
                          }}
                        >
                          {f.numero}
                        </span>
                      </div>
                      <span
                        style={{
                          fontFamily: "'Cinzel', serif",
                          fontWeight: 700,
                          color: "var(--gold-600, #b45309)",
                          fontSize: "0.9rem",
                        }}
                      >
                        {membres.length}{" "}
                        <span
                          style={{
                            fontSize: "0.65rem",
                            fontFamily: "'Nunito'",
                          }}
                        >
                          mbr
                        </span>
                      </span>
                    </div>
                    {/* Barre de progression */}
                    <div
                      style={{
                        height: 4,
                        background: "rgba(212,160,23,0.12)",
                        borderRadius: "999px",
                        overflow: "hidden",
                      }}
                    >
                      <div
                        style={{
                          height: "100%",
                          width: `${pct}%`,
                          background:
                            "linear-gradient(90deg, #d4a017, #b45309)",
                          borderRadius: "999px",
                          transition: "width 0.6s ease",
                        }}
                      />
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
