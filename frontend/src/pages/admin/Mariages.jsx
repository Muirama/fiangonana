import { useState } from "react";
import {
  FaSearch,
  FaRing,
  FaHeart,
  FaEdit,
  FaTrash,
  FaChurch,
  FaStar,
  FaMapMarkerAlt,
} from "react-icons/fa";
import { GiDiamondRing } from "react-icons/gi";
import { useMariages } from "../../hooks/useMariages";
import MariageModal from "../../components/ui/mariages/MariageModal";
import DeleteModal from "../../components/ui/personnes/DeleteModal";

const formatDate = (d) =>
  d
    ? new Date(d).toLocaleDateString("fr-FR", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : "—";

export default function Mariages() {
  const { mariages, familles, loading, error, saveMariage, deleteMariage } =
    useMariages();
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editData, setEditData] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);

  const filtered = mariages.filter((m) => {
    if (!search) return true;
    const f = m.Famille;
    const membres = f?.Personnes || [];
    const noms = membres.map((p) => `${p.prenom || ""} ${p.nom}`).join(" ");
    return `${f?.numero || ""} ${f?.quartier || ""} ${noms}`
      .toLowerCase()
      .includes(search.toLowerCase());
  });

  const openAdd = () => {
    setEditData(null);
    setShowModal(true);
  };
  const openEdit = (m) => {
    setEditData(m);
    setShowModal(true);
  };
  const handleDelete = async () => {
    await deleteMariage(deleteTarget.id);
    setDeleteTarget(null);
  };

  return (
    <div>
      {/* Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          marginBottom: "1.5rem",
          flexWrap: "wrap",
          gap: "1rem",
        }}
      >
        <div>
          <h1
            style={{
              fontFamily: "'Cinzel', serif",
              fontSize: "1.6rem",
              color: "var(--text-dark)",
              marginBottom: "0.25rem",
            }}
          >
            Mariages
          </h1>
          <p style={{ color: "#9a8a7a", fontSize: "0.85rem" }}>
            Fanambadiana · {mariages.length} mariage
            {mariages.length !== 1 ? "s" : ""} enregistré
            {mariages.length !== 1 ? "s" : ""}
          </p>
        </div>
        <button onClick={openAdd} className="btn-gold">
          + Enregistrer un mariage
        </button>
      </div>

      {/* Stats */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "1rem",
          marginBottom: "1.5rem",
        }}
      >
        {[
          {
            icon: <FaRing />,
            val: mariages.length,
            label: "Mariages enregistrés",
            color: "var(--gold-600, #b45309)",
          },
          {
            icon: <FaHeart />,
            val: mariages.filter((m) => m.date_fiancailles).length,
            label: "Avec fiançailles",
            color: "rgb(190,24,93)",
          },
          {
            icon: <FaChurch />,
            val: familles.length,
            label: "Familles éligibles",
            color: "rgb(6,95,70)",
          },
        ].map((s, i) => (
          <div
            key={i}
            style={{
              background: "white",
              borderRadius: "0.75rem",
              padding: "1.25rem",
              display: "flex",
              alignItems: "center",
              gap: "1rem",
              boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
              border: "1px solid rgba(212,160,23,0.1)",
            }}
          >
            <span style={{ fontSize: "1.75rem", color: s.color }}>
              {s.icon}
            </span>
            <div>
              <div
                style={{
                  fontFamily: "'Cinzel', serif",
                  fontSize: "1.6rem",
                  fontWeight: 700,
                  color: s.color,
                }}
              >
                {s.val}
              </div>
              <div style={{ fontSize: "0.8rem", color: "#9a8a7a" }}>
                {s.label}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recherche */}
      <div
        style={{
          background: "white",
          borderRadius: "0.75rem",
          padding: "1rem 1.25rem",
          marginBottom: "1.25rem",
          boxShadow: "0 2px 10px rgba(0,0,0,0.04)",
          border: "1px solid rgba(212,160,23,0.1)",
        }}
      >
        <div style={{ position: "relative" }}>
          <span
            style={{
              position: "absolute",
              left: "0.75rem",
              top: "50%",
              transform: "translateY(-50%)",
              color: "#9a8a7a",
            }}
          >
            <FaSearch />
          </span>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Rechercher par nom, quartier, numéro famille..."
            style={{
              width: "100%",
              padding: "0.6rem 1rem 0.6rem 2.25rem",
              border: "1.5px solid rgba(212,160,23,0.2)",
              borderRadius: "0.4rem",
              fontSize: "0.88rem",
              outline: "none",
              fontFamily: "'Nunito', sans-serif",
              boxSizing: "border-box",
            }}
            onFocus={(e) => (e.target.style.borderColor = "var(--gold-500)")}
            onBlur={(e) =>
              (e.target.style.borderColor = "rgba(212,160,23,0.2)")
            }
          />
        </div>
      </div>

      {loading && (
        <p style={{ color: "#9a8a7a", textAlign: "center", padding: "2rem" }}>
          Chargement...
        </p>
      )}
      {error && (
        <p
          style={{
            color: "rgb(185,28,28)",
            textAlign: "center",
            padding: "2rem",
          }}
        >
          Erreur : {error}
        </p>
      )}

      {/* Table */}
      {!loading && !error && (
        <div
          style={{
            background: "white",
            borderRadius: "1rem",
            boxShadow: "0 4px 20px rgba(0,0,0,0.06)",
            border: "1px solid rgba(212,160,23,0.1)",
            overflow: "hidden",
          }}
        >
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr
                  style={{
                    background:
                      "linear-gradient(135deg, var(--beige-100), var(--gold-100))",
                    borderBottom: "2px solid rgba(212,160,23,0.2)",
                  }}
                >
                  {[
                    "Couple",
                    "Famille",
                    "Fiançailles",
                    "Mariage",
                    "Actions",
                  ].map((h) => (
                    <th
                      key={h}
                      style={{
                        padding: "0.9rem 1rem",
                        textAlign: "left",
                        color: "var(--text-dark)",
                        fontSize: "0.75rem",
                        fontWeight: 700,
                        letterSpacing: "0.08em",
                        textTransform: "uppercase",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr>
                    <td
                      colSpan={5}
                      style={{
                        textAlign: "center",
                        padding: "3rem",
                        color: "#9a8a7a",
                      }}
                    >
                      Aucun mariage enregistré
                    </td>
                  </tr>
                ) : (
                  filtered.map((m, idx) => {
                    const membres = m.Famille?.Personnes || [];
                    const pere = membres.find((p) => p.type === "pere");
                    const mere = membres.find((p) => p.type === "mere");
                    return (
                      <tr
                        key={m.id}
                        style={{
                          borderBottom: "1px solid rgba(212,160,23,0.08)",
                          background:
                            idx % 2 === 0 ? "white" : "rgba(250,247,242,0.5)",
                          transition: "background 0.15s",
                        }}
                        onMouseEnter={(e) =>
                          (e.currentTarget.style.background =
                            "rgba(212,160,23,0.05)")
                        }
                        onMouseLeave={(e) =>
                          (e.currentTarget.style.background =
                            idx % 2 === 0 ? "white" : "rgba(250,247,242,0.5)")
                        }
                      >
                        {/* Couple */}
                        <td style={{ padding: "0.85rem 1rem" }}>
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: "0.5rem",
                            }}
                          >
                            <div style={{ textAlign: "center" }}>
                              <div
                                style={{
                                  width: 30,
                                  height: 30,
                                  borderRadius: "50%",
                                  background:
                                    "linear-gradient(135deg, #3b82f6, #1d4ed8)",
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  color: "white",
                                  fontSize: "0.7rem",
                                  fontWeight: 700,
                                }}
                              >
                                {(pere?.prenom || pere?.nom || "?").charAt(0)}
                              </div>
                              <div
                                style={{
                                  fontSize: "0.65rem",
                                  color: "#6b5a4a",
                                  marginTop: "0.15rem",
                                }}
                              >
                                {pere?.prenom || ""} {pere?.nom || "—"}
                              </div>
                            </div>
                            <span
                              style={{ color: "#D4A017", fontSize: "0.9rem" }}
                            >
                              <GiDiamondRing />
                            </span>
                            <div style={{ textAlign: "center" }}>
                              <div
                                style={{
                                  width: 30,
                                  height: 30,
                                  borderRadius: "50%",
                                  background:
                                    "linear-gradient(135deg, #ec4899, #be185d)",
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  color: "white",
                                  fontSize: "0.7rem",
                                  fontWeight: 700,
                                }}
                              >
                                {(mere?.prenom || mere?.nom || "?").charAt(0)}
                              </div>
                              <div
                                style={{
                                  fontSize: "0.65rem",
                                  color: "#6b5a4a",
                                  marginTop: "0.15rem",
                                }}
                              >
                                {mere?.prenom || ""} {mere?.nom || "—"}
                              </div>
                            </div>
                          </div>
                        </td>

                        {/* Famille */}
                        <td style={{ padding: "0.85rem 1rem" }}>
                          <div
                            style={{
                              fontSize: "0.83rem",
                              fontWeight: 600,
                              color: "#2d2416",
                            }}
                          >
                            {m.Famille?.numero || "—"}
                          </div>
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: "0.25rem",
                              fontSize: "0.72rem",
                              color: "#9a8a7a",
                            }}
                          >
                            <FaMapMarkerAlt style={{ fontSize: "0.65rem" }} />
                            {m.Famille?.quartier || ""}
                          </div>
                        </td>

                        {/* Fiançailles */}
                        <td style={{ padding: "0.85rem 1rem" }}>
                          {m.date_fiancailles ? (
                            <div>
                              <div
                                style={{
                                  fontSize: "0.82rem",
                                  fontWeight: 600,
                                  color: "#2d2416",
                                }}
                              >
                                {formatDate(m.date_fiancailles)}
                              </div>
                              <div
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  gap: "0.25rem",
                                  fontSize: "0.72rem",
                                  color: "#9a8a7a",
                                }}
                              >
                                <FaMapMarkerAlt
                                  style={{ fontSize: "0.65rem" }}
                                />
                                {m.lieu_fiancailles || "—"}
                              </div>
                            </div>
                          ) : (
                            <span
                              style={{ color: "#b8a898", fontSize: "0.8rem" }}
                            >
                              —
                            </span>
                          )}
                        </td>

                        {/* Mariage */}
                        <td style={{ padding: "0.85rem 1rem" }}>
                          {m.date_mariage ? (
                            <div>
                              <div
                                style={{
                                  fontSize: "0.82rem",
                                  fontWeight: 600,
                                  color: "#2d2416",
                                }}
                              >
                                {formatDate(m.date_mariage)}
                              </div>
                              <div
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  gap: "0.25rem",
                                  fontSize: "0.72rem",
                                  color: "#9a8a7a",
                                }}
                              >
                                <FaMapMarkerAlt
                                  style={{ fontSize: "0.65rem" }}
                                />
                                {m.lieu_mariage || "—"}
                              </div>
                            </div>
                          ) : (
                            <span
                              style={{ color: "#b8a898", fontSize: "0.8rem" }}
                            >
                              —
                            </span>
                          )}
                        </td>

                        {/* Actions */}
                        <td style={{ padding: "0.85rem 1rem" }}>
                          <div style={{ display: "flex", gap: "0.4rem" }}>
                            <button
                              onClick={() => openEdit(m)}
                              className="btn-gold"
                              style={{
                                padding: "0.35rem 0.65rem",
                                fontSize: "0.78rem",
                              }}
                            >
                              <FaEdit />
                            </button>
                            <button
                              onClick={() => setDeleteTarget(m)}
                              style={{
                                padding: "0.35rem 0.65rem",
                                background: "rgb(254,226,226)",
                                color: "rgb(185,28,28)",
                                border: "none",
                                borderRadius: "0.35rem",
                                cursor: "pointer",
                                fontSize: "0.78rem",
                              }}
                            >
                              <FaTrash />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {showModal && (
        <MariageModal
          editData={editData}
          familles={familles}
          onSave={saveMariage}
          onClose={() => setShowModal(false)}
        />
      )}
      {deleteTarget && (
        <DeleteModal
          personne={{
            prenom: "le mariage de la famille",
            nom: deleteTarget.Famille?.numero || `#${deleteTarget.id}`,
          }}
          onConfirm={handleDelete}
          onClose={() => setDeleteTarget(null)}
        />
      )}
    </div>
  );
}
