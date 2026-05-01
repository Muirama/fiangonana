import { useState } from "react";
import { FaChurch, FaStar, FaMapMarkerAlt } from "react-icons/fa";
import { GiDiamondRing, GiFlowers } from "react-icons/gi";
import { BsGenderMale, BsGenderFemale } from "react-icons/bs";

const FIELD_STYLE = {
  width: "100%",
  padding: "0.6rem 0.75rem",
  border: "1.5px solid rgba(212,160,23,0.2)",
  borderRadius: "0.4rem",
  fontSize: "0.88rem",
  outline: "none",
  fontFamily: "'Nunito', sans-serif",
  boxSizing: "border-box",
};

const SectionTitle = ({ icon, label }) => (
  <div
    style={{
      display: "flex",
      alignItems: "center",
      gap: "0.5rem",
      fontSize: "0.78rem",
      fontWeight: 700,
      color: "var(--gold-600, #b45309)",
      marginBottom: "0.75rem",
      textTransform: "uppercase",
      letterSpacing: "0.05em",
    }}
  >
    <span style={{ fontSize: "0.9rem" }}>{icon}</span> {label}
  </div>
);

export default function MariageModal({ editData, familles, onSave, onClose }) {
  const [form, setForm] = useState({
    famille_id: editData?.famille_id || editData?.Famille?.id || "",
    date_fiancailles: editData?.date_fiancailles || "",
    lieu_fiancailles: editData?.lieu_fiancailles || "",
    date_mariage: editData?.date_mariage || "",
    lieu_mariage: editData?.lieu_mariage || "",
  });
  const [saving, setSaving] = useState(false);
  const [err, setErr] = useState(null);

  const set = (k, v) => setForm((p) => ({ ...p, [k]: v }));

  const handleSave = async () => {
    if (!form.famille_id) {
      setErr("Veuillez choisir une famille");
      return;
    }
    setSaving(true);
    setErr(null);
    try {
      await onSave(form);
      onClose();
    } catch (e) {
      setErr(e.message);
    } finally {
      setSaving(false);
    }
  };

  const familleSelectionnee = familles.find(
    (f) => f.id === Number(form.famille_id),
  );
  const membres = familleSelectionnee?.Personnes || [];
  const pere = membres.find((p) => p.type === "pere");
  const mere = membres.find((p) => p.type === "mere");

  return (
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
      onClick={(e) => e.target === e.currentTarget && onClose()}
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
          maxHeight: "90vh",
          overflowY: "auto",
        }}
      >
        {/* Header */}
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
                fontSize: "1.1rem",
              }}
            >
              {editData ? "Modifier" : "Enregistrer"} un mariage
            </h2>
            <p style={{ color: "#9a8a7a", fontSize: "0.78rem" }}>
              Fanambadiana
            </p>
          </div>
          <button
            onClick={onClose}
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
          style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}
        >
          {/* Famille */}
          <div>
            <label
              style={{
                display: "block",
                fontSize: "0.78rem",
                fontWeight: 600,
                marginBottom: "0.4rem",
                color: "var(--text-dark)",
              }}
            >
              Famille *
            </label>
            <select
              value={form.famille_id}
              onChange={(e) => set("famille_id", e.target.value)}
              style={FIELD_STYLE}
              disabled={!!editData}
            >
              <option value="">-- Choisir une famille --</option>
              {familles.map((f) => {
                const p = f.Personnes || [];
                const pere = p.find((m) => m.type === "pere");
                const mere = p.find((m) => m.type === "mere");
                return (
                  <option key={f.id} value={f.id}>
                    {f.numero} —{" "}
                    {pere ? `${pere.prenom || ""} ${pere.nom}` : "?"} &{" "}
                    {mere ? `${mere.prenom || ""} ${mere.nom}` : "?"}
                  </option>
                );
              })}
            </select>
          </div>

          {/* Aperçu couple */}
          {familleSelectionnee && pere && mere && (
            <div
              style={{
                background: "rgba(212,160,23,0.06)",
                borderRadius: "0.6rem",
                padding: "0.85rem 1rem",
                display: "flex",
                alignItems: "center",
                gap: "1rem",
              }}
            >
              <div style={{ textAlign: "center" }}>
                <div
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: "50%",
                    background: "linear-gradient(135deg, #3b82f6, #1d4ed8)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "white",
                    fontSize: "0.8rem",
                    fontWeight: 700,
                    margin: "0 auto 0.25rem",
                  }}
                >
                  <BsGenderMale />
                </div>
                <div
                  style={{
                    fontSize: "0.75rem",
                    fontWeight: 600,
                    color: "#2d2416",
                  }}
                >
                  {pere.prenom} {pere.nom}
                </div>
                <div style={{ fontSize: "0.65rem", color: "#9a8a7a" }}>
                  Père
                </div>
              </div>
              <div
                style={{
                  flex: 1,
                  textAlign: "center",
                  color: "#D4A017",
                  fontSize: "1.4rem",
                }}
              >
                <GiDiamondRing />
              </div>
              <div style={{ textAlign: "center" }}>
                <div
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: "50%",
                    background: "linear-gradient(135deg, #ec4899, #be185d)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "white",
                    fontSize: "0.8rem",
                    fontWeight: 700,
                    margin: "0 auto 0.25rem",
                  }}
                >
                  <BsGenderFemale />
                </div>
                <div
                  style={{
                    fontSize: "0.75rem",
                    fontWeight: 600,
                    color: "#2d2416",
                  }}
                >
                  {mere.prenom} {mere.nom}
                </div>
                <div style={{ fontSize: "0.65rem", color: "#9a8a7a" }}>
                  Mère
                </div>
              </div>
            </div>
          )}

          {/* Fiançailles */}
          <div>
            <SectionTitle icon={<GiFlowers />} label="Fiançailles" />
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "0.75rem",
              }}
            >
              <div>
                <label
                  style={{
                    display: "block",
                    fontSize: "0.78rem",
                    fontWeight: 600,
                    marginBottom: "0.4rem",
                    color: "var(--text-dark)",
                  }}
                >
                  Date
                </label>
                <input
                  type="date"
                  value={form.date_fiancailles}
                  onChange={(e) => set("date_fiancailles", e.target.value)}
                  style={FIELD_STYLE}
                />
              </div>
              <div>
                <label
                  style={{
                    display: "block",
                    fontSize: "0.78rem",
                    fontWeight: 600,
                    marginBottom: "0.4rem",
                    color: "var(--text-dark)",
                  }}
                >
                  <FaMapMarkerAlt
                    style={{ marginRight: "0.3rem", verticalAlign: "middle" }}
                  />
                  Lieu
                </label>
                <input
                  value={form.lieu_fiancailles}
                  onChange={(e) => set("lieu_fiancailles", e.target.value)}
                  placeholder="Ex: Église Ambohimanarina"
                  style={FIELD_STYLE}
                />
              </div>
            </div>
          </div>

          {/* Mariage */}
          <div>
            <SectionTitle icon={<FaChurch />} label="Mariage" />
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "0.75rem",
              }}
            >
              <div>
                <label
                  style={{
                    display: "block",
                    fontSize: "0.78rem",
                    fontWeight: 600,
                    marginBottom: "0.4rem",
                    color: "var(--text-dark)",
                  }}
                >
                  Date
                </label>
                <input
                  type="date"
                  value={form.date_mariage}
                  onChange={(e) => set("date_mariage", e.target.value)}
                  style={FIELD_STYLE}
                />
              </div>
              <div>
                <label
                  style={{
                    display: "block",
                    fontSize: "0.78rem",
                    fontWeight: 600,
                    marginBottom: "0.4rem",
                    color: "var(--text-dark)",
                  }}
                >
                  <FaMapMarkerAlt
                    style={{ marginRight: "0.3rem", verticalAlign: "middle" }}
                  />
                  Lieu
                </label>
                <input
                  value={form.lieu_mariage}
                  onChange={(e) => set("lieu_mariage", e.target.value)}
                  placeholder="Ex: Cathédrale Analakely"
                  style={FIELD_STYLE}
                />
              </div>
            </div>
          </div>
        </div>

        {err && (
          <p
            style={{
              color: "rgb(185,28,28)",
              fontSize: "0.82rem",
              marginTop: "0.75rem",
            }}
          >
            ⚠️ {err}
          </p>
        )}

        <div
          style={{
            display: "flex",
            gap: "0.75rem",
            marginTop: "1.5rem",
            justifyContent: "flex-end",
          }}
        >
          <button onClick={onClose} className="btn-outline">
            Annuler
          </button>
          <button onClick={handleSave} className="btn-gold" disabled={saving}>
            {saving
              ? "Enregistrement..."
              : editData
                ? "Modifier"
                : "Enregistrer"}
          </button>
        </div>
      </div>
    </div>
  );
}
