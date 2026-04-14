import { useState, useEffect } from "react";

const versets = [
  {
    texte:
      "Je vous donne un commandement nouveau : aimez-vous les uns les autres.",
    ref: "Jean 13:34",
  },
  {
    texte:
      "Car là où deux ou trois sont réunis en mon nom, je suis au milieu d'eux.",
    ref: "Matthieu 18:20",
  },
  {
    texte: "Heureux les artisans de paix, car ils seront appelés fils de Dieu.",
    ref: "Matthieu 5:9",
  },
];

export default function Hero() {
  const [versetIdx, setVersetIdx] = useState(0);

  useEffect(() => {
    const t = setInterval(
      () => setVersetIdx((i) => (i + 1) % versets.length),
      5000,
    );
    return () => clearInterval(t);
  }, []);
  return (
    <section
      id="accueil"
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(160deg, var(--beige-300) 0%, var(--beige-200) 40%, var(--beige-300) 70%, var(--parchment) 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
        paddingTop: "80px",
      }}
    >
      {/* Decorative circles */}
      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            width: [300, 200, 150, 80, 400, 120][i],
            height: [300, 200, 150, 80, 400, 120][i],
            borderRadius: "50%",
            border: `1px solid rgba(212,160,23,${[0.08, 0.06, 0.1, 0.15, 0.04, 0.12][i]})`,
            top: ["10%", "60%", "20%", "70%", "-5%", "40%"][i],
            left: ["5%", "80%", "75%", "10%", "45%", "90%"][i],
            animation: `float ${[6, 8, 5, 7, 10, 4][i]}s ease-in-out infinite`,
            animationDelay: `${i * 0.8}s`,
          }}
        />
      ))}

      {/* Cross ornament */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%,-50%)",
          opacity: 0.03,
          fontSize: "40rem",
          color: "#2d2416",
          userSelect: "none",
        }}
      >
        ✝
      </div>

      <div
        style={{
          textAlign: "center",
          position: "relative",
          zIndex: 2,
          padding: "2rem",
          maxWidth: 800,
        }}
      >
        <div style={{ animation: "fadeInUp 0.8s ease forwards", opacity: 0 }}>
          <div
            style={{
              fontFamily: "'Cinzel', serif",
              fontSize: "0.85rem",
              letterSpacing: "0.3em",
              color: "var(--gold-600)",
              marginBottom: "1.5rem",
              textTransform: "uppercase",
            }}
          >
            ✦ Firaisan-kina amin'ny Finoana ✦
          </div>
          <h1
            style={{
              fontFamily: "'Cinzel', serif",
              fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
              fontWeight: 900,
              color: "var(--text-dark)",
              lineHeight: 1.1,
              marginBottom: "0.5rem",
            }}
          >
            EKAR Soavinimerina
          </h1>
          <p
            style={{
              fontFamily: "'Lora', serif",
              fontSize: "clamp(1rem, 2.5vw, 1.4rem)",
              color: "#8b7e70",
              marginBottom: "1rem",
            }}
          >
            Paroisse Catholique · Antananarivo
          </p>

          {/* Verset animé */}
          <div
            style={{
              background: "rgba(255,253,249,0.8)",
              backdropFilter: "blur(8px)",
              border: "1px solid rgba(212,160,23,0.3)",
              borderRadius: "1rem",
              padding: "1.5rem 2rem",
              margin: "2rem auto",
              maxWidth: 600,
              transition: "all 0.5s",
            }}
          >
            <p
              style={{
                fontFamily: "'Lora', serif",
                fontStyle: "italic",
                color: "var(--text-dark)",
                fontSize: "1rem",
                marginBottom: "0.5rem",
              }}
            >
              "{versets[versetIdx].texte}"
            </p>
            <p
              style={{
                color: "var(--gold-600)",
                fontSize: "0.8rem",
                fontWeight: 600,
              }}
            >
              {versets[versetIdx].ref}
            </p>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                gap: "6px",
                marginTop: "0.75rem",
              }}
            >
              {versets.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setVersetIdx(i)}
                  style={{
                    width: i === versetIdx ? 20 : 6,
                    height: 6,
                    borderRadius: 3,
                    background:
                      i === versetIdx
                        ? "var(--gold-400)"
                        : "rgba(255,255,255,0.3)",
                    border: "none",
                    cursor: "pointer",
                    transition: "all 0.3s",
                  }}
                />
              ))}
            </div>
          </div>

          <div
            style={{
              display: "flex",
              gap: "1rem",
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <a href="#histoire" className="btn-gold">
              Découvrir notre histoire
            </a>
            <a href="#galerie" className="btn-outline">
              Voir la galerie
            </a>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        style={{
          position: "absolute",
          bottom: "2rem",
          left: "50%",
          transform: "translateX(-50%)",
          animation: "float 2s ease-in-out infinite",
          opacity: 0.6,
        }}
      >
        <div
          style={{
            width: 2,
            height: 40,
            background:
              "linear-gradient(to bottom, var(--gold-400), transparent)",
            margin: "0 auto",
          }}
        />
      </div>
    </section>
  );
}
