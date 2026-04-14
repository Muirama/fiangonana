import { useState } from "react";
import { mockFamilles } from "../../data/mockData";

const initialForm = {
  nom: "",
  chef: "",
  membres: 1,
  quartier: "",
  statut: "Actif",
};

export default function Familles() {
  const [familles, setFamilles] = useState(mockFamilles);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState(initialForm);
  const [editId, setEditId] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  const filtered = familles.filter(
    (f) =>
      !search ||
      `${f.nom} ${f.chef} ${f.quartier}`
        .toLowerCase()
        .includes(search.toLowerCase()),
  );

  const openAdd = () => {
    setForm(initialForm);
    setEditId(null);
    setShowModal(true);
  };
  const openEdit = (f) => {
    setForm({
      nom: f.nom,
      chef: f.chef,
      membres: f.membres,
      quartier: f.quartier,
      statut: f.statut,
    });
    setEditId(f.id);
    setShowModal(true);
  };

  const handleSave = () => {
    if (!form.nom || !form.chef) return;
    if (editId) {
      setFamilles((prev) =>
        prev.map((f) => (f.id === editId ? { ...f, ...form } : f)),
      );
    } else {
      setFamilles((prev) => [...prev, { id: Date.now(), ...form }]);
    }
    setShowModal(false);
  };

  return (
    <div>
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
            Gestion des Familles
          </h1>
          <p style={{ color: "#9a8a7a", fontSize: "0.85rem" }}>
            Fitantanana ny Fianakaviana · {familles.length} familles
            enregistrées
          </p>
        </div>
        <button
          onClick={openAdd}
          className="btn-gold"
        >
          + Ajouter une famille
        </button>
      </div>

      {/* Stat rapide */}
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
            icon: "🏠",
            val: familles.length,
            label: "Familles totales",
            color: "var(--gold-600)",
          },
          {
            icon: "✅",
            val: familles.filter((f) => f.statut === "Actif").length,
            label: "Familles actives",
            color: "rgb(6,95,70)",
          },
          {
            icon: "👨‍👩‍👧‍👦",
            val: familles.reduce((s, f) => s + Number(f.membres), 0),
            label: "Membres liés",
            color: "var(--gold-600)",
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
            <span style={{ fontSize: "1.75rem" }}>{s.icon}</span>
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
          display: "flex",
          gap: "1rem",
          boxShadow: "0 2px 10px rgba(0,0,0,0.04)",
          border: "1px solid rgba(212,160,23,0.1)",
        }}
      >
        <div style={{ flex: 1, position: "relative" }}>
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
            placeholder="Rechercher une famille..."
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
      </div>

      {/* Cards grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
          gap: "1.25rem",
        }}
      >
        {filtered.map((f) => (
          <div
            key={f.id}
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
              e.currentTarget.style.boxShadow =
                "0 8px 25px rgba(212,160,23,0.15)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "none";
              e.currentTarget.style.boxShadow = "0 4px 15px rgba(0,0,0,0.06)";
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                marginBottom: "1rem",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.75rem",
                }}
              >
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
                  🏠
                </div>
                <div>
                  <div
                    style={{
                      fontWeight: 700,
                      color: "#2d2416",
                      fontSize: "0.92rem",
                    }}
                  >
                    {f.nom}
                  </div>
                  <div style={{ color: "#9a8a7a", fontSize: "0.75rem" }}>
                    Chef: {f.chef}
                  </div>
                </div>
              </div>
              <span
                style={{
                  padding: "3px 10px",
                  borderRadius: "999px",
                  fontSize: "0.72rem",
                  fontWeight: 600,
                  background:
                    f.statut === "Actif"
                      ? "rgb(209,250,229)"
                      : "rgb(254,226,226)",
                  color:
                    f.statut === "Actif" ? "rgb(6,95,70)" : "rgb(185,28,28)",
                }}
              >
                {f.statut}
              </span>
            </div>

            <div style={{ display: "flex", gap: "1rem", marginBottom: "1rem" }}>
              <div
                style={{
                  flex: 1,
                  background: "var(--gold-100)",
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
                    color: "var(--gold-600)",
                  }}
                >
                  {f.membres}
                </div>
                <div style={{ fontSize: "0.7rem", color: "var(--gold-700)" }}>
                  Membres
                </div>
              </div>
              <div
                style={{
                  flex: 1,
                  background: "var(--beige-100)",
                  borderRadius: "0.5rem",
                  padding: "0.5rem 0.75rem",
                }}
              >
                <div
                  style={{
                    fontSize: "0.72rem",
                    color: "var(--gold-600)",
                    fontWeight: 600,
                    marginBottom: "0.1rem",
                  }}
                >
                  📍 Quartier
                </div>
                <div
                  style={{
                    fontSize: "0.8rem",
                    color: "var(--text-dark)",
                    fontWeight: 500,
                  }}
                >
                  {f.quartier}
                </div>
              </div>
            </div>

            <div style={{ display: "flex", gap: "0.5rem" }}>
              <button
                onClick={() => openEdit(f)}
                className="btn-beige"
                style={{ flex: 1, padding: "0.5rem" }}
              >
                ✏️ Modifier
              </button>
              <button
                onClick={() => setDeleteConfirm(f)}
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
                🗑️
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* MODAL */}
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
              maxWidth: 480,
              boxShadow: "0 20px 60px rgba(0,0,0,0.2)",
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
              <h2
                style={{
                  fontFamily: "'Cinzel', serif",
                  color: "var(--text-dark)",
                  fontSize: "1.1rem",
                }}
              >
                {editId ? "Modifier" : "Ajouter"} une famille
              </h2>
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
              style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
            >
              {[
                {
                  key: "nom",
                  label: "Nom de la famille *",
                  placeholder: "Ex: Famille Rakoto",
                },
                {
                  key: "chef",
                  label: "Chef de famille *",
                  placeholder: "Ex: Rakoto Jean",
                },
                {
                  key: "quartier",
                  label: "Quartier",
                  placeholder: "Ex: Ambohimanarina",
                },
              ].map((f) => (
                <div key={f.key}>
                  <label
                    style={{
                      display: "block",
                      color: "var(--text-dark)",
                      fontSize: "0.78rem",
                      fontWeight: 600,
                      marginBottom: "0.4rem",
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
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "1rem",
                }}
              >
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
                    Nb. membres
                  </label>
                  <input
                    type="number"
                    min={1}
                    value={form.membres}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, membres: e.target.value }))
                    }
                    style={{
                      width: "100%",
                      padding: "0.6rem 0.85rem",
                      border: "1.5px solid rgba(212,160,23,0.25)",
                      borderRadius: "0.4rem",
                      fontSize: "0.88rem",
                      outline: "none",
                    }}
                  />
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
                    style={{
                      width: "100%",
                      padding: "0.6rem 0.85rem",
                      border: "1.5px solid rgba(212,160,23,0.25)",
                      borderRadius: "0.4rem",
                      fontSize: "0.88rem",
                      outline: "none",
                    }}
                  >
                    <option>Actif</option>
                    <option>Inactif</option>
                  </select>
                </div>
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
              <button
                onClick={handleSave}
                className="btn-gold"
              >
                {editId ? "Enregistrer" : "Ajouter"}
              </button>
            </div>
          </div>
        </div>
      )}

      {deleteConfirm && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.5)",
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
              maxWidth: 380,
              width: "90%",
              textAlign: "center",
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
              Supprimer cette famille ?
            </h3>
            <p
              style={{
                color: "#6b5a4a",
                fontSize: "0.9rem",
                marginBottom: "1.5rem",
              }}
            >
              <strong>{deleteConfirm.nom}</strong>
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
                onClick={() => {
                  setFamilles((p) =>
                    p.filter((f) => f.id !== deleteConfirm.id),
                  );
                  setDeleteConfirm(null);
                }}
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