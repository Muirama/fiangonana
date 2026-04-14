import { useState } from "react";
import { mockMembres, roleColors } from "../../data/mockData";

const initialForm = {
  nom: "",
  prenom: "",
  famille: "",
  role: "Membre",
  quartier: "",
  telephone: "",
  statut: "Actif",
};

export default function Membres() {
  const [membres, setMembres] = useState(mockMembres);
  const [search, setSearch] = useState("");
  const [filterStatut, setFilterStatut] = useState("Tous");
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState(initialForm);
  const [editId, setEditId] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  const filtered = membres.filter((m) => {
    const q = search.toLowerCase();
    const matchSearch =
      !q ||
      `${m.nom} ${m.prenom} ${m.famille} ${m.quartier}`
        .toLowerCase()
        .includes(q);
    const matchStatut = filterStatut === "Tous" || m.statut === filterStatut;
    return matchSearch && matchStatut;
  });

  const openAdd = () => {
    setForm(initialForm);
    setEditId(null);
    setShowModal(true);
  };
  const openEdit = (m) => {
    setForm({
      nom: m.nom,
      prenom: m.prenom,
      famille: m.famille,
      role: m.role,
      quartier: m.quartier,
      telephone: m.telephone,
      statut: m.statut,
    });
    setEditId(m.id);
    setShowModal(true);
  };

  const handleSave = () => {
    if (!form.nom || !form.prenom) return;
    if (editId) {
      setMembres((prev) =>
        prev.map((m) => (m.id === editId ? { ...m, ...form } : m)),
      );
    } else {
      setMembres((prev) => [
        ...prev,
        {
          id: Date.now(),
          ...form,
          dateAdhesion: new Date().toISOString().split("T")[0],
        },
      ]);
    }
    setShowModal(false);
  };

  const handleDelete = (id) => {
    setMembres((prev) => prev.filter((m) => m.id !== id));
    setDeleteConfirm(null);
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
            Fitantanana ny Mpikambana · {membres.length} membres au total
          </p>
        </div>
        <button onClick={openAdd} className="btn-gold">
          + Ajouter un membre
        </button>
      </div>

      {/* Filtres */}
      <div
        style={{
          background: "white",
          borderRadius: "0.75rem",
          padding: "1rem 1.25rem",
          marginBottom: "1.25rem",
          display: "flex",
          gap: "1rem",
          flexWrap: "wrap",
          alignItems: "center",
          boxShadow: "0 2px 10px rgba(0,0,0,0.04)",
          border: "1px solid rgba(212,160,23,0.1)",
        }}
      >
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
            🔍
          </span>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Rechercher un membre..."
            style={{
              width: "100%",
              padding: "0.6rem 1rem 0.6rem 2.25rem",
              border: "1.5px solid rgba(212,160,23,0.2)",
              borderRadius: "0.4rem",
              fontSize: "0.88rem",
              outline: "none",
              fontFamily: "'Nunito', sans-serif",
            }}
            onFocus={(e) => (e.target.style.borderColor = "var(--gold-500)")}
            onBlur={(e) =>
              (e.target.style.borderColor = "rgba(212,160,23,0.2)")
            }
          />
        </div>
        <div style={{ display: "flex", gap: "0.5rem" }}>
          {["Tous", "Actif", "Inactif", "Catéchumène"].map((s) => (
            <button
              key={s}
              onClick={() => setFilterStatut(s)}
              style={{
                padding: "0.5rem 0.9rem",
                borderRadius: "0.4rem",
                fontSize: "0.8rem",
                fontWeight: 500,
                border: "1.5px solid",
                cursor: "pointer",
                transition: "all 0.2s",
                borderColor:
                  filterStatut === s
                    ? "var(--gold-500)"
                    : "rgba(212,160,23,0.2)",
                background:
                  filterStatut === s ? "var(--gold-100)" : "transparent",
                color:
                  filterStatut === s ? "var(--gold-700)" : "var(--text-dark)",
              }}
            >
              {s}
            </button>
          ))}
        </div>
        <div
          style={{ color: "#9a8a7a", fontSize: "0.8rem", marginLeft: "auto" }}
        >
          {filtered.length} résultat{filtered.length !== 1 ? "s" : ""}
        </div>
      </div>

      {/* Table */}
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
                {{
                  Membre: "Membre",
                  Famille: "Famille",
                  Rôle: "Rôle",
                  Quartier: "Quartier",
                  Téléphone: "Téléphone",
                  Statut: "Statut",
                  Actions: "Actions",
                }.map((h) => (
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
                filtered.map((m, idx) => (
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
                            background: `linear-gradient(135deg, hsl(${(m.id * 47) % 360}, 60%, 55%), hsl(${(m.id * 47 + 60) % 360}, 70%, 45%))`,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            color: "white",
                            fontSize: "0.78rem",
                            fontWeight: 700,
                            flexShrink: 0,
                          }}
                        >
                          {m.prenom.charAt(0)}
                          {m.nom.charAt(0)}
                        </div>
                        <div>
                          <div
                            style={{
                              fontWeight: 600,
                              fontSize: "0.88rem",
                              color: "#2d2416",
                            }}
                          >
                            {m.prenom} {m.nom}
                          </div>
                          <div
                            style={{ color: "#b8a898", fontSize: "0.72rem" }}
                          >
                            Depuis {new Date(m.dateAdhesion).getFullYear()}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td
                      style={{
                        padding: "0.85rem 1rem",
                        color: "#6b5a4a",
                        fontSize: "0.85rem",
                      }}
                    >
                      {m.famille}
                    </td>
                    <td style={{ padding: "0.85rem 1rem" }}>
                      <span
                        style={{
                          background:
                            roleColors[m.role]?.bg?.replace("bg-", "") ||
                            "#f3f4f6",
                          color:
                            roleColors[m.role]?.text?.replace("text-", "") ||
                            "#374151",
                          padding: "3px 10px",
                          borderRadius: "999px",
                          fontSize: "0.73rem",
                          fontWeight: 600,
                        }}
                      >
                        {m.role}
                      </span>
                    </td>
                    <td
                      style={{
                        padding: "0.85rem 1rem",
                        color: "#6b5a4a",
                        fontSize: "0.85rem",
                      }}
                    >
                      {m.quartier}
                    </td>
                    <td
                      style={{
                        padding: "0.85rem 1rem",
                        color: "#6b5a4a",
                        fontSize: "0.83rem",
                      }}
                    >
                      {m.telephone}
                    </td>
                    <td style={{ padding: "0.85rem 1rem" }}>
                      <span
                        style={{
                          background:
                            m.statut === "Actif"
                              ? "rgb(209,250,229)"
                              : m.statut === "Inactif"
                                ? "rgb(254,226,226)"
                                : "rgb(219,234,254)",
                          color:
                            m.statut === "Actif"
                              ? "rgb(6,95,70)"
                              : m.statut === "Inactif"
                                ? "rgb(185,28,28)"
                                : "rgb(30,64,175)",
                          padding: "3px 10px",
                          borderRadius: "999px",
                          fontSize: "0.73rem",
                          fontWeight: 600,
                        }}
                      >
                        {m.statut}
                      </span>
                    </td>
                    <td style={{ padding: "0.85rem 1rem" }}>
                      <div style={{ display: "flex", gap: "0.4rem" }}>
                        <button
                          onClick={() => openEdit(m)}
                          className="btn-beige"
                          style={{
                            padding: "0.35rem 0.65rem",
                            fontSize: "0.78rem",
                          }}
                        >
                          ✏️
                        </button>
                        <button
                          onClick={() => setDeleteConfirm(m)}
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
                          🗑️
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

      {/* MODAL Ajout/Édition */}
      {showModal && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.5)",
            backdropFilter: "blur(4px)",
            zIndex: 200,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "1rem",
          }}
          onClick={(e) => e.target === e.currentTarget && setShowModal(false)}
        >
          <div
            style={{
              background: "white",
              borderRadius: "1rem",
              padding: "2rem",
              width: "100%",
              maxWidth: 520,
              boxShadow: "0 20px 60px rgba(0,0,0,0.2)",
              border: "1px solid rgba(212,160,23,0.2)",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "1.5rem",
              }}
            >
              <div>
                <h2
                  style={{
                    fontFamily: "'Cinzel', serif",
                    color: "var(--text-dark)",
                    fontSize: "1.2rem",
                  }}
                >
                  {editId ? "Modifier" : "Ajouter"} un membre
                </h2>
                <p style={{ color: "#9a8a7a", fontSize: "0.78rem" }}>
                  {editId ? "Hanova" : "Hanampy"} mpikambana
                </p>
              </div>
              <button
                onClick={() => setShowModal(false)}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  fontSize: "1.3rem",
                  color: "#9a8a7a",
                }}
              >
                ×
              </button>
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "1rem",
              }}
            >
              {[
                { key: "prenom", label: "Prénom *", placeholder: "Ex: Jean" },
                { key: "nom", label: "Nom *", placeholder: "Ex: Rakoto" },
                { key: "famille", label: "Famille", placeholder: "Ex: Rakoto" },
                {
                  key: "quartier",
                  label: "Quartier",
                  placeholder: "Ex: Ambohimanarina",
                },
                {
                  key: "telephone",
                  label: "Téléphone",
                  placeholder: "+261 34 XX XXX XX",
                },
              ].map((f) => (
                <div
                  key={f.key}
                  style={{
                    gridColumn: f.key === "telephone" ? "1 / -1" : "auto",
                  }}
                >
                  <label
                    style={{
                      display: "block",
                      color: "var(--text-dark)",
                      fontSize: "0.78rem",
                      fontWeight: 600,
                      marginBottom: "0.4rem",
                      letterSpacing: "0.05em",
                    }}
                  >
                    {f.label}
                  </label>
                  <input
                    value={form[f.key]}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, [f.key]: e.target.value }))
                    }
                    placeholder={f.placeholder}
                    className="input-church"
                  />
                </div>
              ))}
              <div>
                <label
                  style={{
                    display: "block",
                    color: "var(--text-dark)",
                    fontSize: "0.78rem",
                    fontWeight: 600,
                    marginBottom: "0.4rem",
                  }}
                >
                  Rôle
                </label>
                <select
                  value={form.role}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, role: e.target.value }))
                  }
                  className="input-church"
                >
                  {[
                    "Membre",
                    "Diacre",
                    "Lecteur",
                    "Catéchiste",
                    "Choriste",
                    "Catéchumène",
                  ].map((r) => (
                    <option key={r}>{r}</option>
                  ))}
                </select>
              </div>
              <div>
                <label
                  style={{
                    display: "block",
                    color: "var(--text-dark)",
                    fontSize: "0.78rem",
                    fontWeight: 600,
                    marginBottom: "0.4rem",
                  }}
                >
                  Statut
                </label>
                <select
                  value={form.statut}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, statut: e.target.value }))
                  }
                  className="input-church"
                >
                  {["Actif", "Inactif", "Catéchumène"].map((s) => (
                    <option key={s}>{s}</option>
                  ))}
                </select>
              </div>
            </div>
            <div
              style={{
                display: "flex",
                gap: "0.75rem",
                marginTop: "1.5rem",
                justifyContent: "flex-end",
              }}
            >
              <button
                onClick={() => setShowModal(false)}
                className="btn-outline"
              >
                Annuler
              </button>
              <button onClick={handleSave} className="btn-gold">
                {editId ? "Enregistrer" : "Ajouter"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL Suppression */}
      {deleteConfirm && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.5)",
            backdropFilter: "blur(4px)",
            zIndex: 200,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              background: "white",
              borderRadius: "1rem",
              padding: "2rem",
              maxWidth: 400,
              width: "90%",
              textAlign: "center",
              boxShadow: "0 20px 60px rgba(0,0,0,0.2)",
            }}
          >
            <div style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>⚠️</div>
            <h3
              style={{
                fontFamily: "'Cinzel', serif",
                color: "var(--text-dark)",
                marginBottom: "0.5rem",
              }}
            >
              Confirmer la suppression
            </h3>
            <p
              style={{
                color: "#6b5a4a",
                fontSize: "0.9rem",
                marginBottom: "1.5rem",
              }}
            >
              Voulez-vous vraiment supprimer{" "}
              <strong>
                {deleteConfirm.prenom} {deleteConfirm.nom}
              </strong>{" "}
              ?
            </p>
            <div
              style={{
                display: "flex",
                gap: "0.75rem",
                justifyContent: "center",
              }}
            >
              <button
                onClick={() => setDeleteConfirm(null)}
                style={{
                  padding: "0.65rem 1.5rem",
                  border: "1.5px solid rgba(212,160,23,0.3)",
                  borderRadius: "0.4rem",
                  background: "transparent",
                  cursor: "pointer",
                }}
              >
                Annuler
              </button>
              <button
                onClick={() => handleDelete(deleteConfirm.id)}
                style={{
                  padding: "0.65rem 1.5rem",
                  background: "rgb(239,68,68)",
                  color: "white",
                  border: "none",
                  borderRadius: "0.4rem",
                  cursor: "pointer",
                  fontWeight: 600,
                }}
              >
                Supprimer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
