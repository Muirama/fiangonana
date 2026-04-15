import React from "react";

const INITIAL = {
  nom: "",
  prenom: "",
  date_naissance: "",
  sexe: "M",
  type: "pere",
  contact: "",
  profession: "",
  role_eglise: "",
  groupe_eglise: "",
  bapteme: false,
  communion: false,
  confirmation: false,
};

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

export default function PersonneModal({ editData, onSave, onClose }) {
  const [form, setForm] = React.useState(editData || INITIAL);
  const set = (k, v) => setForm((p) => ({ ...p, [k]: v }));

  const handleSave = async () => {
    if (!form.nom || !form.sexe || !form.type) return;
    await onSave(form);
    onClose();
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
          maxWidth: 560,
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
                fontSize: "1.2rem",
              }}
            >
              {editData ? "Modifier" : "Ajouter"} une personne
            </h2>
            <p style={{ color: "#9a8a7a", fontSize: "0.78rem" }}>
              {editData ? "Hanova" : "Hanampy"} olona
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
            {
              key: "contact",
              label: "Contact",
              placeholder: " 03X XX XXX XX",
            },
            {
              key: "profession",
              label: "Profession",
              placeholder: "Ex: Enseignant",
            },
            {
              key: "role_eglise",
              label: "Rôle dans l'église",
              placeholder: "Ex: Katekista",
            },
            {
              key: "groupe_eglise",
              label: "Groupe dans l'église",
              placeholder: "Ex: Chorale",
            },
          ].map((f) => (
            <div key={f.key}>
              <label
                style={{
                  display: "block",
                  fontSize: "0.78rem",
                  fontWeight: 600,
                  marginBottom: "0.4rem",
                  color: "var(--text-dark)",
                }}
              >
                {f.label}
              </label>
              <input
                value={form[f.key] || ""}
                onChange={(e) => set(f.key, e.target.value)}
                placeholder={f.placeholder}
                style={FIELD_STYLE}
              />
            </div>
          ))}

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
              Date de naissance
            </label>
            <input
              type="date"
              value={form.date_naissance || ""}
              onChange={(e) => set("date_naissance", e.target.value)}
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
              Sexe
            </label>
            <select
              value={form.sexe}
              onChange={(e) => set("sexe", e.target.value)}
              style={FIELD_STYLE}
            >
              <option value="M">Masculin</option>
              <option value="F">Féminin</option>
            </select>
          </div>

          <div style={{ gridColumn: "1 / -1" }}>
            <label
              style={{
                display: "block",
                fontSize: "0.78rem",
                fontWeight: 600,
                marginBottom: "0.4rem",
                color: "var(--text-dark)",
              }}
            >
              Type
            </label>
            <select
              value={form.type}
              onChange={(e) => set("type", e.target.value)}
              style={FIELD_STYLE}
            >
              {["pere", "mere", "enfant", "autre"].map((t) => (
                <option key={t} value={t}>
                  {t.charAt(0).toUpperCase() + t.slice(1)}
                </option>
              ))}
            </select>
          </div>

          {/* Sacrements */}
          <div style={{ gridColumn: "1 / -1" }}>
            <label
              style={{
                display: "block",
                fontSize: "0.78rem",
                fontWeight: 600,
                marginBottom: "0.6rem",
                color: "var(--text-dark)",
              }}
            >
              Sacrements
            </label>
            <div style={{ display: "flex", gap: "1.5rem" }}>
              {[
                ["bapteme", "Baptême"],
                ["communion", "Communion"],
                ["confirmation", "Confirmation"],
              ].map(([k, label]) => (
                <label
                  key={k}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.4rem",
                    fontSize: "0.85rem",
                    cursor: "pointer",
                  }}
                >
                  <input
                    type="checkbox"
                    checked={form[k]}
                    onChange={(e) => set(k, e.target.checked)}
                    style={{
                      accentColor: "var(--gold-500, #D4A017)",
                      width: 16,
                      height: 16,
                    }}
                  />
                  {label}
                </label>
              ))}
            </div>
          </div>
        </div>

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
          <button onClick={handleSave} className="btn-gold">
            {editData ? "Enregistrer" : "Ajouter"}
          </button>
        </div>
      </div>
    </div>
  );
}
