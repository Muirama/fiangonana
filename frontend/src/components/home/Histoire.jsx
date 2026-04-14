import { FaChurch } from "react-icons/fa";

export default function Histoire() {
  return (
    <section
      id="histoire"
      style={{ padding: "6rem 2rem", background: "var(--parchment)" }}
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
            MOMBA ANAY
          </p>
          <h2
            style={{
              fontFamily: "'Cinzel', serif",
              fontSize: "2.2rem",
              color: "var(--text-dark)",
              marginBottom: "1rem",
            }}
          >
            Histoire de notre paroisse
          </h2>
          <div
            className="cross-divider"
            style={{ maxWidth: 200, margin: "0 auto" }}
          >
            <span>✦</span>
          </div>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "3rem",
            alignItems: "center",
          }}
        >
          {/* Texte */}
          <div style={{ lineHeight: 1.8, color: "#5a4a3a" }}>
            <h3
              style={{
                fontFamily: "'Cinzel', serif",
                fontSize: "1.3rem",
                color: "var(--text-dark)",
                marginBottom: "1rem",
              }}
            >
              Fondée en 2009
            </h3>
            <p style={{ marginBottom: "1rem", fontSize: "0.95rem" }}>
              EKAR Soavy est une paroisse catholique enracinée dans le cœur du
              quartier d'Antananarivo. Depuis sa fondation, elle œuvre pour
              rassembler les fidèles dans la prière, le partage et l'amour du
              prochain.
            </p>
            <p style={{ marginBottom: "1rem", fontSize: "0.95rem" }}>
              Notre communauté s'engage à vivre les valeurs évangéliques :
              fraternité, service, charité et solidarité. Chaque dimanche, des
              centaines de fidèles se réunissent pour célébrer l'Eucharistie et
              renforcer les liens fraternels.
            </p>
            <p style={{ fontSize: "0.95rem" }}>
              À travers nos activités spirituelles, sociales et caritatives,
              nous cherchons à incarner la mission de l'Église : annoncer
              l'Évangile et servir les plus démunis.
            </p>
          </div>

          {/* Image placeholder */}
          <div
            style={{
              background:
                "linear-gradient(135deg, var(--beige-200), var(--gold-100))",
              borderRadius: "1rem",
              height: 350,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border: "2px dashed rgba(212,160,23,0.3)",
            }}
          >
            <img
              src="/eglise.jpg"
              alt="Église EKAR Soavy"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                borderRadius: "1rem",
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
