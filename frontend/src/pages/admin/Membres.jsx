import { useState } from "react";
import { FaSearch, FaEdit, FaTrash } from "react-icons/fa";
import { usePersonnes } from "../../hooks/usePersonnes";
import PersonneModal from "../../components/ui/personnes/PersonneModal";
import DeleteModal from "../../components/ui/personnes/DeleteModal";

export default function Membres() {
  const {
    personnes,
    loading,
    error,
    createPersonne,
    updatePersonne,
    deletePersonne,
  } = usePersonnes();
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editData, setEditData] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);

  const [filterSexe, setFilterSexe] = useState("Tous");
  const [filterType, setFilterType] = useState("Tous");
  const [filterSacrement, setFilterSacrement] = useState("Tous");

  const filtered = personnes.filter((p) => {
    const q = search.toLowerCase();
    const matchSearch =
      !q ||
      `${p.nom} ${p.prenom || ""} ${p.contact || ""} ${p.profession || ""}`
        .toLowerCase()
        .includes(q);
    const matchSexe = filterSexe === "Tous" || p.sexe === filterSexe;
    const matchType = filterType === "Tous" || p.type === filterType;
    const matchSacr =
      filterSacrement === "Tous" ||
      (filterSacrement === "bapteme" && p.bapteme) ||
      (filterSacrement === "communion" && p.communion) ||
      (filterSacrement === "confirmation" && p.confirmation);
    return matchSearch && matchSexe && matchType && matchSacr;
  });

  const openAdd = () => {
    setEditData(null);
    setShowModal(true);
  };
  const openEdit = (p) => {
    setEditData(p);
    setShowModal(true);
  };

  const handleSave = async (form) => {
    if (editData) await updatePersonne(editData.id, form);
    else await createPersonne(form);
  };

  const handleDelete = async () => {
    await deletePersonne(deleteTarget.id);
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
            Gestion des Membres
          </h1>
          <p style={{ color: "#9a8a7a", fontSize: "0.85rem" }}>
            Fitantanana ny Mpikambana · {personnes.length} membres au total
          </p>
        </div>
        <button onClick={openAdd} className="btn-gold">
          + Ajouter un membre
        </button>
      </div>

      {/* Barre de filtres — remplace l'ancienne */}
      <div
        style={{
          background: "white",
          borderRadius: "0.75rem",
          padding: "1rem 1.25rem",
          marginBottom: "1.25rem",
          display: "flex",
          gap: "0.75rem",
          flexWrap: "wrap",
          alignItems: "center",
          boxShadow: "0 2px 10px rgba(0,0,0,0.04)",
          border: "1px solid rgba(212,160,23,0.1)",
        }}
      >
        {/* Recherche */}
        <div style={{ flex: 1, minWidth: 200, position: "relative" }}>
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
            placeholder="Rechercher..."
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

        {/* Sexe */}
        <div style={{ display: "flex", gap: "0.4rem" }}>
          {[
            ["Tous", "Tous"],
            ["M", "♂ Homme"],
            ["F", "♀ Femme"],
          ].map(([val, label]) => (
            <button
              key={val}
              onClick={() => setFilterSexe(val)}
              style={{
                padding: "0.45rem 0.8rem",
                borderRadius: "0.4rem",
                fontSize: "0.78rem",
                fontWeight: 500,
                border: "1.5px solid",
                cursor: "pointer",
                transition: "all 0.15s",
                borderColor:
                  filterSexe === val
                    ? "var(--gold-500)"
                    : "rgba(212,160,23,0.2)",
                background:
                  filterSexe === val ? "var(--gold-100)" : "transparent",
                color:
                  filterSexe === val ? "var(--gold-700)" : "var(--text-dark)",
              }}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Type */}
        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          style={{
            padding: "0.5rem 0.75rem",
            border: "1.5px solid rgba(212,160,23,0.2)",
            borderRadius: "0.4rem",
            fontSize: "0.8rem",
            outline: "none",
            fontFamily: "'Nunito', sans-serif",
            color: "var(--text-dark)",
            background: "white",
            cursor: "pointer",
          }}
        >
          {["Tous", "pere", "mere", "enfant", "autre"].map((t) => (
            <option key={t} value={t}>
              {t === "Tous"
                ? "Tous types"
                : t.charAt(0).toUpperCase() + t.slice(1)}
            </option>
          ))}
        </select>

        {/* Sacrement */}
        <select
          value={filterSacrement}
          onChange={(e) => setFilterSacrement(e.target.value)}
          style={{
            padding: "0.5rem 0.75rem",
            border: "1.5px solid rgba(212,160,23,0.2)",
            borderRadius: "0.4rem",
            fontSize: "0.8rem",
            outline: "none",
            fontFamily: "'Nunito', sans-serif",
            color: "var(--text-dark)",
            background: "white",
            cursor: "pointer",
          }}
        >
          {[
            ["Tous", "Tous sacrements"],
            ["bapteme", "Baptisés"],
            ["communion", "Communion"],
            ["confirmation", "Confirmés"],
          ].map(([val, label]) => (
            <option key={val} value={val}>
              {label}
            </option>
          ))}
        </select>

        <span
          style={{ color: "#9a8a7a", fontSize: "0.8rem", marginLeft: "auto" }}
        >
          {filtered.length} résultat{filtered.length !== 1 ? "s" : ""}
        </span>
      </div>

      {/* États */}
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
                    "Membre",
                    "Type",
                    "Contact",
                    "Profession",
                    "Rôle",
                    "Sacrements",
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
                      colSpan={7}
                      style={{
                        textAlign: "center",
                        padding: "3rem",
                        color: "#9a8a7a",
                      }}
                    >
                      Aucun membre trouvé
                    </td>
                  </tr>
                ) : (
                  filtered.map((p, idx) => (
                    <tr
                      key={p.id}
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
                      {/* Membre */}
                      <td style={{ padding: "0.85rem 1rem" }}>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "0.6rem",
                          }}
                        >
                          <div
                            style={{
                              width: 36,
                              height: 36,
                              borderRadius: "50%",
                              background: `linear-gradient(135deg, hsl(${(p.id * 47) % 360},60%,55%), hsl(${(p.id * 47 + 60) % 360},70%,45%))`,
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              color: "white",
                              fontSize: "0.78rem",
                              fontWeight: 700,
                              flexShrink: 0,
                            }}
                          >
                            {(p.prenom || p.nom || "?").charAt(0)}
                            {(p.nom || "").charAt(0)}
                          </div>
                          <div>
                            <div
                              style={{
                                fontWeight: 600,
                                fontSize: "0.88rem",
                                color: "#2d2416",
                              }}
                            >
                              {p.prenom} {p.nom}
                            </div>
                            <div
                              style={{ color: "#b8a898", fontSize: "0.72rem" }}
                            >
                              #{p.id}
                            </div>
                          </div>
                        </div>
                      </td>
                      {/* Type */}
                      <td style={{ padding: "0.85rem 1rem" }}>
                        <span
                          style={{
                            background: "rgba(212,160,23,0.12)",
                            color: "#8B6914",
                            padding: "3px 10px",
                            borderRadius: "999px",
                            fontSize: "0.73rem",
                            fontWeight: 600,
                          }}
                        >
                          {p.type}
                        </span>
                      </td>
                      <td
                        style={{
                          padding: "0.85rem 1rem",
                          color: "#6b5a4a",
                          fontSize: "0.85rem",
                        }}
                      >
                        {p.contact || "—"}
                      </td>
                      <td
                        style={{
                          padding: "0.85rem 1rem",
                          color: "#6b5a4a",
                          fontSize: "0.85rem",
                        }}
                      >
                        {p.profession || "—"}
                      </td>
                      <td
                        style={{
                          padding: "0.85rem 1rem",
                          color: "#6b5a4a",
                          fontSize: "0.85rem",
                        }}
                      >
                        {p.role_eglise || "—"}
                      </td>
                      {/* Sacrements */}
                      <td style={{ padding: "0.85rem 1rem" }}>
                        <div
                          style={{
                            display: "flex",
                            gap: "0.3rem",
                            flexWrap: "wrap",
                          }}
                        >
                          {[
                            ["bapteme", "B"],
                            ["communion", "C"],
                            ["confirmation", "Conf"],
                          ].map(([k, label]) =>
                            p[k] ? (
                              <span
                                key={k}
                                style={{
                                  background: "rgb(209,250,229)",
                                  color: "rgb(6,95,70)",
                                  padding: "2px 8px",
                                  borderRadius: "999px",
                                  fontSize: "0.68rem",
                                  fontWeight: 600,
                                }}
                              >
                                {label}
                              </span>
                            ) : null,
                          )}
                          {!p.bapteme && !p.communion && !p.confirmation && (
                            <span
                              style={{ color: "#b8a898", fontSize: "0.78rem" }}
                            >
                              —
                            </span>
                          )}
                        </div>
                      </td>
                      {/* Actions */}
                      <td style={{ padding: "0.85rem 1rem" }}>
                        <div style={{ display: "flex", gap: "0.4rem" }}>
                          <button
                            onClick={() => openEdit(p)}
                            className="btn-gold"
                            style={{
                              padding: "0.35rem 0.65rem",
                              fontSize: "0.78rem",
                            }}
                          >
                            <FaEdit />
                          </button>
                          <button
                            onClick={() => setDeleteTarget(p)}
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
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {showModal && (
        <PersonneModal
          editData={editData}
          onSave={handleSave}
          onClose={() => setShowModal(false)}
        />
      )}

      {deleteTarget && (
        <DeleteModal
          personne={deleteTarget}
          onConfirm={handleDelete}
          onClose={() => setDeleteTarget(null)}
        />
      )}
    </div>
  );
}
