import { FaHome, FaMapMarkerAlt, FaEdit, FaTrash } from "react-icons/fa";

export default function FamilleCard({ famille, onEdit, onDelete }) {
  const membres = famille.Personnes || [];
  const pere = membres.find((p) => p.type === "pere");
  const mere = membres.find((p) => p.type === "mere");

  return (
    <div
      style={{
        background: "white",
        borderRadius: "1rem",
        padding: "1.5rem",
        boxShadow: "0 4px 15px rgba(0,0,0,0.06)",
        border: "1px solid rgba(212,160,23,0.12)",
        transition: "transform 0.2s, box-shadow 0.2s",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-2px)";
        e.currentTarget.style.boxShadow = "0 8px 25px rgba(212,160,23,0.15)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "none";
        e.currentTarget.style.boxShadow = "0 4px 15px rgba(0,0,0,0.06)";
      }}
    >
      {/* En-tête */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          marginBottom: "1rem",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <div
            style={{
              width: 46,
              height: 46,
              borderRadius: "0.65rem",
              background:
                "linear-gradient(135deg, var(--gold-400), var(--gold-500))",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "1.4rem",
            }}
          >
            <FaHome />
          </div>
          <div>
            <div
              style={{ fontWeight: 700, color: "#2d2416", fontSize: "0.92rem" }}
            >
              Famille{" "}
              {pere ? `${pere.nom}` : mere ? `${mere.nom}` : `#${famille.id}`}
            </div>
            <div style={{ color: "#9a8a7a", fontSize: "0.72rem" }}>
              N° {famille.numero || "—"}
            </div>
          </div>
        </div>
        {famille.Apv && (
          <span
            style={{
              padding: "3px 10px",
              borderRadius: "999px",
              fontSize: "0.72rem",
              fontWeight: 600,
              background: "rgba(212,160,23,0.12)",
              color: "#8B6914",
            }}
          >
            {famille.Apv.code}
          </span>
        )}
      </div>

      {/* Infos */}
      <div style={{ display: "flex", gap: "0.75rem", marginBottom: "1rem" }}>
        <div
          style={{
            flex: 1,
            background: "var(--gold-100, #fef9ec)",
            borderRadius: "0.5rem",
            padding: "0.5rem 0.75rem",
            textAlign: "center",
          }}
        >
          <div
            style={{
              fontFamily: "'Cinzel', serif",
              fontSize: "1.3rem",
              fontWeight: 700,
              color: "var(--gold-600, #b45309)",
            }}
          >
            {membres.length}
          </div>
          <div
            style={{ fontSize: "0.7rem", color: "var(--gold-700, #92400e)" }}
          >
            Membres
          </div>
        </div>
        <div
          style={{
            flex: 2,
            background: "var(--beige-100, #faf7f2)",
            borderRadius: "0.5rem",
            padding: "0.5rem 0.75rem",
          }}
        >
          <div
            style={{
              fontSize: "0.72rem",
              color: "var(--gold-600, #b45309)",
              fontWeight: 600,
              marginBottom: "0.1rem",
            }}
          >
            <FaMapMarkerAlt />
          </div>
          <div
            style={{
              fontSize: "0.8rem",
              color: "var(--text-dark)",
              fontWeight: 500,
            }}
          >
            {famille.quartier || "—"}
          </div>
          {famille.adresse && (
            <div
              style={{
                fontSize: "0.7rem",
                color: "#9a8a7a",
                marginTop: "0.1rem",
              }}
            >
              {famille.adresse}
            </div>
          )}
        </div>
      </div>

      {/* Membres aperçu */}
      {membres.length > 0 && (
        <div
          style={{
            display: "flex",
            gap: "0.3rem",
            flexWrap: "wrap",
            marginBottom: "1rem",
          }}
        >
          {membres.slice(0, 4).map((m) => (
            <span
              key={m.id}
              style={{
                fontSize: "0.7rem",
                background: "rgba(212,160,23,0.08)",
                color: "#6b5a4a",
                padding: "2px 8px",
                borderRadius: "999px",
              }}
            >
              {m.prenom || ""} {m.nom} ({m.type})
            </span>
          ))}
          {membres.length > 4 && (
            <span style={{ fontSize: "0.7rem", color: "#9a8a7a" }}>
              +{membres.length - 4} autres
            </span>
          )}
        </div>
      )}

      {/* Actions */}
      <div style={{ display: "flex", gap: "0.5rem" }}>
        <button
          onClick={() => onEdit(famille)}
          className="btn-gold"
          style={{ flex: 1, padding: "0.5rem" }}
        >
          <FaEdit /> Modifier
        </button>
        <button
          onClick={() => onDelete(famille)}
          style={{
            padding: "0.5rem 0.75rem",
            background: "rgb(254,226,226)",
            color: "rgb(185,28,28)",
            border: "none",
            borderRadius: "0.4rem",
            cursor: "pointer",
            fontSize: "0.8rem",
          }}
        >
          <FaTrash />
        </button>
      </div>
    </div>
  );
}
