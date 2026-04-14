const equipe = [
  {
    nom: "Scout Leaders",
    role: "Scouts EKAR",
    desc: "Formation des jeunes à la foi et à la citoyenneté",
    image: "/scout.jpg",
    bg: "rgba(212,160,23,0.15)",
  },
  {
    nom: "Équipe Chorale",
    role: "Chorale paroissiale",
    desc: "Anime les messes et célébrations avec les chants",
    image: "/choeur.jpg",
    bg: "rgba(212,160,23,0.15)",
  },
];

export default function Equipe() {
  return (
    <section
      id="galerie"
      style={{ padding: "6rem 2rem", background: "var(--cream)" }}
    >
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "4rem" }}>
          <p
            style={{
              fontFamily: "'Cinzel', serif",
              color: "var(--gold-600)",
              fontSize: "0.8rem",
              letterSpacing: "0.3em",
              marginBottom: "0.75rem",
            }}
          >
            ZAVA-GÔVA
          </p>
          <h2
            style={{
              fontFamily: "'Cinzel', serif",
              fontSize: "2.2rem",
              color: "var(--text-dark)",
              marginBottom: "0.5rem",
            }}
          >
            Les acteurs de notre communauté
          </h2>
          <p style={{ color: "#6b5a4a", fontSize: "0.95rem" }}>
            Découvrez les différentes personnes qui font vivre notre paroisse
          </p>
        </div>

        {/* Équipe cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
            gap: "2rem",
            marginBottom: "4rem",
          }}
        >
          {equipe.map((e, i) => (
            <div
              key={i}
              style={{
                background: "white",
                borderRadius: "1rem",
                overflow: "hidden",
                boxShadow: "0 4px 20px rgba(0,0,0,0.06)",
                border: "1px solid rgba(212,160,23,0.1)",
                transition: "transform 0.3s, box-shadow 0.3s",
              }}
              onMouseEnter={(el) => {
                el.currentTarget.style.transform = "translateY(-4px)";
                el.currentTarget.style.boxShadow =
                  "0 12px 30px rgba(212,160,23,0.15)";
              }}
              onMouseLeave={(el) => {
                el.currentTarget.style.transform = "none";
                el.currentTarget.style.boxShadow =
                  "0 4px 20px rgba(0,0,0,0.06)";
              }}
            >
              {/* Image placeholder */}
              <div
                style={{
                  background: e.bg,
                  height: 200,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <img
                  src={e.image}
                  alt={e.nom}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              </div>

              {/* Content */}
              <div style={{ padding: "1.5rem" }}>
                <h3
                  style={{
                    fontFamily: "'Cinzel', serif",
                    fontSize: "1.1rem",
                    color: "var(--text-dark)",
                    marginBottom: "0.25rem",
                  }}
                >
                  {e.nom}
                </h3>
                <div
                  style={{
                    color: "var(--gold-600)",
                    fontSize: "0.8rem",
                    fontWeight: 600,
                    marginBottom: "0.75rem",
                  }}
                >
                  {e.role}
                </div>
                <p
                  style={{
                    color: "#6b5a4a",
                    fontSize: "0.85rem",
                    lineHeight: 1.6,
                  }}
                >
                  {e.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
