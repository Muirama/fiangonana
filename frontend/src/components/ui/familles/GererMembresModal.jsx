import { useState, useEffect } from "react";

const API_PERSONNES = `${import.meta.env.VITE_API_URL}/personnes`;

const TABS = ["Associer existant", "Créer nouveau"];

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

const INITIAL_FORM = {
  nom: "",
  prenom: "",
  date_naissance: "",
  sexe: "M",
  type: "autre",
  contact: "",
  profession: "",
  role_eglise: "",
  groupe_eglise: "",
  bapteme: false,
  communion: false,
  confirmation: false,
};

export default function GererMembresModal({ famille, onClose, onRefresh }) {
  const [tab, setTab] = useState(0);
  const [personnesSansF, setPersonnesSansF] = useState([]); // sans famille
  const [selectedIds, setSelectedIds] = useState([]);
  const [form, setForm] = useState(INITIAL_FORM);
  const [search, setSearch] = useState("");
  const [saving, setSaving] = useState(false);
  const [err, setErr] = useState(null);
  const [refresh, setRefresh] = useState(0);
  const triggerRefresh = () => {
    setRefresh((r) => r + 1);
    onRefresh();
  };

  const set = (k, v) => setForm((p) => ({ ...p, [k]: v }));

  // Charge les personnes sans famille
  useEffect(() => {
    fetch(API_PERSONNES)
      .then((r) => r.json())
      .then((data) => {
        // Filtre : sans famille OU déjà dans cette famille
        const disponibles = data.filter(
          (p) => !p.famille_id || p.famille_id === famille.id,
        );
        setPersonnesSansF(disponibles);
        setMembresActuels(
          disponibles.filter((p) => p.famille_id === famille.id),
        );
      })
      .catch(() => setErr("Impossible de charger les personnes"));
  }, [famille.id, refresh]);

  const [membresActuels, setMembresActuels] = useState(famille.Personnes || []);

  const filteredDisponibles = personnesSansF.filter(
    (p) =>
      !search ||
      `${p.prenom || ""} ${p.nom}`.toLowerCase().includes(search.toLowerCase()),
  );

  // Toggle sélection
  const toggleSelect = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );
  };

  // Associer les personnes sélectionnées
  const handleAssocier = async () => {
    if (selectedIds.length === 0) return;
    setSaving(true);
    setErr(null);
    try {
      await Promise.all(
        selectedIds.map((id) =>
          fetch(`${API_PERSONNES}/${id}/famille`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ famille_id: famille.id }),
          }),
        ),
      );
      await triggerRefresh();
      setSelectedIds([]);
    } catch {
      setErr("Erreur lors de l'association");
    } finally {
      setSaving(false);
    }
  };

  // Retirer un membre de la famille
  const handleRetirer = async (personneId) => {
    setSaving(true);
    try {
      await fetch(`${API_PERSONNES}/${personneId}/famille`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ famille_id: null }),
      });
      await triggerRefresh();
    } catch {
      setErr("Erreur lors du retrait");
    } finally {
      setSaving(false);
    }
  };

  // Créer une nouvelle personne directement dans cette famille
  const handleCreer = async () => {
    if (!form.nom || !form.sexe || !form.type) {
      setErr("nom, sexe et type sont requis");
      return;
    }
    setSaving(true);
    setErr(null);
    try {
      const res = await fetch(API_PERSONNES, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, famille_id: famille.id }),
      });
      if (!res.ok) throw new Error();
      await triggerRefresh();
      setForm(INITIAL_FORM);
    } catch {
      setErr("Erreur lors de la création");
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
          width: "100%",
          maxWidth: 580,
          maxHeight: "90vh",
          display: "flex",
          flexDirection: "column",
          boxShadow: "0 20px 60px rgba(0,0,0,0.2)",
          border: "1px solid rgba(212,160,23,0.2)",
        }}
      >
        {/* Header fixe */}
        <div
          style={{
            padding: "1.5rem 2rem 0",
            borderBottom: "1px solid rgba(212,160,23,0.15)",
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
            <div>
              <h2
                style={{
                  fontFamily: "'Cinzel', serif",
                  color: "var(--text-dark)",
                  fontSize: "1.1rem",
                }}
              >
                Membres de la famille
              </h2>
              <p style={{ color: "#9a8a7a", fontSize: "0.78rem" }}>
                N° {famille.numero} · {membresActuels.length} membre(s)
                actuel(s)
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

          {/* Membres actuels */}
          {membresActuels.length > 0 && (
            <div
              style={{
                display: "flex",
                gap: "0.4rem",
                flexWrap: "wrap",
                marginBottom: "1rem",
              }}
            >
              {membresActuels.map((m) => (
                <span
                  key={m.id}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.35rem",
                    fontSize: "0.75rem",
                    background: "rgba(212,160,23,0.1)",
                    color: "#6b5a4a",
                    padding: "4px 10px",
                    borderRadius: "999px",
                  }}
                >
                  {m.prenom || ""} {m.nom}
                  <span style={{ fontSize: "0.65rem", color: "#9a8a7a" }}>
                    ({m.type})
                  </span>
                  <button
                    onClick={() => handleRetirer(m.id)}
                    style={{
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      color: "rgb(185,28,28)",
                      fontSize: "0.8rem",
                      padding: 0,
                      lineHeight: 1,
                    }}
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          )}

          {/* Onglets */}
          <div style={{ display: "flex", gap: 0 }}>
            {TABS.map((t, i) => (
              <button
                key={t}
                onClick={() => {
                  setTab(i);
                  setErr(null);
                }}
                style={{
                  padding: "0.6rem 1.2rem",
                  border: "none",
                  background: "none",
                  cursor: "pointer",
                  fontSize: "0.83rem",
                  fontWeight: tab === i ? 700 : 400,
                  color: tab === i ? "var(--gold-600, #b45309)" : "#9a8a7a",
                  borderBottom:
                    tab === i
                      ? "2px solid var(--gold-500, #D4A017)"
                      : "2px solid transparent",
                  transition: "all 0.15s",
                }}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* Corps scrollable */}
        <div style={{ flex: 1, overflowY: "auto", padding: "1.5rem 2rem" }}>
          {/* TAB 0 — Associer existant */}
          {tab === 0 && (
            <div>
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Rechercher une personne..."
                style={{ ...FIELD_STYLE, marginBottom: "1rem" }}
              />

              {filteredDisponibles.length === 0 ? (
                <p
                  style={{
                    color: "#9a8a7a",
                    textAlign: "center",
                    padding: "1.5rem",
                  }}
                >
                  Aucune personne disponible
                </p>
              ) : (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.5rem",
                  }}
                >
                  {filteredDisponibles.map((p) => {
                    const dejaLa = membresActuels.some((m) => m.id === p.id);
                    const selectionne = selectedIds.includes(p.id);
                    return (
                      <div
                        key={p.id}
                        onClick={() => !dejaLa && toggleSelect(p.id)}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "0.75rem",
                          padding: "0.65rem 0.9rem",
                          borderRadius: "0.5rem",
                          border: `1.5px solid ${selectionne ? "var(--gold-500, #D4A017)" : "rgba(212,160,23,0.15)"}`,
                          background: dejaLa
                            ? "rgba(212,160,23,0.05)"
                            : selectionne
                              ? "rgba(212,160,23,0.08)"
                              : "white",
                          cursor: dejaLa ? "default" : "pointer",
                          transition: "all 0.15s",
                        }}
                      >
                        {/* Avatar */}
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
                        <div style={{ flex: 1 }}>
                          <div
                            style={{
                              fontSize: "0.85rem",
                              fontWeight: 600,
                              color: "#2d2416",
                            }}
                          >
                            {p.prenom || ""} {p.nom}
                          </div>
                          <div
                            style={{ fontSize: "0.72rem", color: "#9a8a7a" }}
                          >
                            {p.type} · {p.profession || "—"}
                          </div>
                        </div>
                        {dejaLa ? (
                          <span
                            style={{
                              fontSize: "0.7rem",
                              color: "rgb(6,95,70)",
                              background: "rgb(209,250,229)",
                              padding: "2px 8px",
                              borderRadius: "999px",
                            }}
                          >
                            Déjà membre
                          </span>
                        ) : (
                          <div
                            style={{
                              width: 18,
                              height: 18,
                              borderRadius: "50%",
                              border: `2px solid ${selectionne ? "var(--gold-500, #D4A017)" : "rgba(212,160,23,0.3)"}`,
                              background: selectionne
                                ? "var(--gold-500, #D4A017)"
                                : "white",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              flexShrink: 0,
                            }}
                          >
                            {selectionne && (
                              <span
                                style={{ color: "white", fontSize: "0.65rem" }}
                              >
                                ✓
                              </span>
                            )}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {/* TAB 1 — Créer nouveau */}
          {tab === 1 && (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "1rem",
              }}
            >
              {[
                { key: "prenom", label: "Prénom", placeholder: "Ex: Jean" },
                { key: "nom", label: "Nom *", placeholder: "Ex: Rakoto" },
                { key: "contact", label: "Contact", placeholder: "+261 34 XX" },
                {
                  key: "profession",
                  label: "Profession",
                  placeholder: "Ex: Enseignant",
                },
                {
                  key: "role_eglise",
                  label: "Rôle église",
                  placeholder: "Ex: Diacre",
                },
                {
                  key: "groupe_eglise",
                  label: "Groupe église",
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
                    value={form[f.key]}
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
                  Date naissance
                </label>
                <input
                  type="date"
                  value={form.date_naissance}
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
                  Type *
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
          )}

          {err && (
            <p
              style={{
                color: "rgb(185,28,28)",
                fontSize: "0.82rem",
                marginTop: "1rem",
              }}
            >
              ⚠️ {err}
            </p>
          )}
        </div>

        {/* Footer fixe */}
        <div
          style={{
            padding: "1rem 2rem",
            borderTop: "1px solid rgba(212,160,23,0.15)",
            display: "flex",
            justifyContent: "flex-end",
            gap: "0.75rem",
          }}
        >
          <button onClick={onClose} className="btn-outline">
            Fermer
          </button>
          {tab === 0 ? (
            <button
              onClick={handleAssocier}
              className="btn-gold"
              disabled={saving || selectedIds.length === 0}
            >
              {saving
                ? "Association..."
                : `Associer ${selectedIds.length > 0 ? `(${selectedIds.length})` : ""}`}
            </button>
          ) : (
            <button
              onClick={handleCreer}
              className="btn-gold"
              disabled={saving}
            >
              {saving ? "Création..." : "Créer et ajouter"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
