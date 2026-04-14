export default function DeleteModal({ personne, onConfirm, onClose }) {
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
            {personne.prenom} {personne.nom}
          </strong>{" "}
          ?
        </p>
        <div
          style={{ display: "flex", gap: "0.75rem", justifyContent: "center" }}
        >
          <button
            onClick={onClose}
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
            onClick={onConfirm}
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
  );
}
