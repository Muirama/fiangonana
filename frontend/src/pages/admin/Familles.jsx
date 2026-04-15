import { useState } from "react";
import { FaHome, FaDove, FaUsers, FaSearch } from "react-icons/fa";
import { useFamilles } from "../../hooks/useFamilles";
import FamilleModal from "../../components/ui/familles/FamilleModal";
import FamilleCard from "../../components/ui/familles/FamilleCard";
import DeleteModal from "../../components/ui/personnes/DeleteModal";

export default function Familles() {
  const {
    familles,
    apvs,
    loading,
    error,
    createFamille,
    updateFamille,
    deleteFamille,
  } = useFamilles();
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editData, setEditData] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);

  const filtered = familles.filter(
    (f) =>
      !search ||
      `${f.quartier || ""} ${f.adresse || ""} ${f.Apv?.nom || ""}`
        .toLowerCase()
        .includes(search.toLowerCase()),
  );

  const openAdd = () => {
    setEditData(null);
    setShowModal(true);
  };
  const openEdit = (f) => {
    setEditData(f);
    setShowModal(true);
  };

  const handleSave = async (form) => {
    if (editData) await updateFamille(editData.id, form);
    else await createFamille(form);
  };

  const handleDelete = async () => {
    await deleteFamille(deleteTarget.id);
    setDeleteTarget(null);
  };

  const totalMembres = familles.reduce(
    (s, f) => s + (f.Personnes?.length || 0),
    0,
  );

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
            Gestion des Familles
          </h1>
          <p style={{ color: "#9a8a7a", fontSize: "0.85rem" }}>
            Fitantanana ny Fianakaviana · {familles.length} familles
            enregistrées
          </p>
        </div>
        <button onClick={openAdd} className="btn-gold">
          + Ajouter une famille
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
            icon: <FaHome />,
            val: familles.length,
            label: "Familles totales",
            color: "var(--gold-600, #b45309)",
          },
          {
            icon: <FaDove />,
            val: apvs.length,
            label: "APV actifs",
            color: "rgb(6,95,70)",
          },
          {
            icon: <FaUsers />,
            val: totalMembres,
            label: "Membres liés",
            color: "var(--gold-600, #b45309)",
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
            placeholder="Rechercher par quartier, adresse, APV..."
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

      {/* Cards */}
      {!loading &&
        !error &&
        (filtered.length === 0 ? (
          <p style={{ color: "#9a8a7a", textAlign: "center", padding: "3rem" }}>
            Aucune famille trouvée
          </p>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
              gap: "1.25rem",
            }}
          >
            {filtered.map((f) => (
              <FamilleCard
                key={f.id}
                famille={f}
                onEdit={openEdit}
                onDelete={setDeleteTarget}
              />
            ))}
          </div>
        ))}

      {showModal && (
        <FamilleModal
          editData={editData}
          apvs={apvs}
          onSave={handleSave}
          onClose={() => setShowModal(false)}
        />
      )}

      {deleteTarget && (
        <DeleteModal
          personne={{
            ...deleteTarget,
            prenom: "la famille",
            nom: deleteTarget.numero || `#${deleteTarget.id}`,
          }}
          onConfirm={handleDelete}
          onClose={() => setDeleteTarget(null)}
        />
      )}
    </div>
  );
}
