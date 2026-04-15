import { useState } from "react";

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

export default function FamilleModal({ editData, apvs, onSave, onClose }) {
  const [form, setForm] = useState({
    adresse: editData?.adresse || "",
    quartier: editData?.quartier || "",
    apv_id: editData?.apv_id || (apvs[0]?.id ?? ""),
  });
  const [saving, setSaving] = useState(false);
  const [err, setErr] = useState(null);

  const set = (k, v) => setForm((p) => ({ ...p, [k]: v }));

  const handleSave = async () => {
    if (!form.apv_id) {
      setErr("Veuillez choisir un APV");
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
          maxWidth: 480,
          boxShadow: "0 20px 60px rgba(0,0,0,0.2)",
          border: "1px solid rgba(212,160,23,0.2)",
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
              {editData ? "Modifier" : "Ajouter"} une famille
            </h2>
            <p style={{ color: "#9a8a7a", fontSize: "0.78rem" }}>
              {editData
                ? `Numéro : ${editData.numero}`
                : "Le numéro sera généré automatiquement"}
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

        {/* Champs */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
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
              APV *
            </label>
            <select
              value={form.apv_id}
              onChange={(e) => set("apv_id", e.target.value)}
              style={FIELD_STYLE}
            >
              <option value="">-- Choisir un APV --</option>
              {apvs.map((a) => (
                <option key={a.id} value={a.id}>
                  {a.code} — {a.nom}
                </option>
              ))}
            </select>
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
              Adresse
            </label>
            <input
              value={form.adresse}
              onChange={(e) => set("adresse", e.target.value)}
              placeholder="Ex: Lot II A 34 Ambohimanarina"
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
              Quartier
            </label>
            <input
              value={form.quartier}
              onChange={(e) => set("quartier", e.target.value)}
              placeholder="Ex: Victoire Rasoa"
              style={FIELD_STYLE}
            />
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
            {err}
          </p>
        )}

        {/* Actions */}
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
                ? "Enregistrer"
                : "Ajouter"}
          </button>
        </div>
      </div>
    </div>
  );
}
