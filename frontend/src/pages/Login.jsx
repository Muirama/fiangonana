import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  FaChurch,
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    const result = login(email, password);
    if (result.success) {
      navigate("/admin");
    } else {
      setError(result.message);
    }
    setLoading(false);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(160deg, var(--beige-300) 0%, var(--beige-200) 50%, var(--beige-300) 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Decorative elements */}
      {[...Array(4)].map((_, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            width: [250, 180, 120, 300][i],
            height: [250, 180, 120, 300][i],
            borderRadius: "50%",
            border: `1px solid rgba(212,160,23,${[0.06, 0.1, 0.08, 0.05][i]})`,
            top: ["5%", "60%", "30%", "-5%"][i],
            left: ["70%", "5%", "80%", "30%"][i],
            animation: `float ${[8, 6, 5, 10][i]}s ease-in-out infinite`,
          }}
        />
      ))}

      <div
        style={{
          position: "relative",
          zIndex: 2,
          width: "100%",
          maxWidth: 440,
        }}
      >
        {/* Logo */}
        <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              width: 72,
              height: 72,
              borderRadius: "50%",
              background:
                "linear-gradient(135deg, var(--gold-500), var(--gold-600))",
              boxShadow: "0 8px 30px rgba(212,160,23,0.5)",
              marginBottom: "1rem",
              animation: "float 4s ease-in-out infinite",
              color: "white",
              fontSize: "1.8rem",
            }}
          >
            <FaChurch />
          </div>
          <h1
            style={{
              fontFamily: "'Cinzel', serif",
              fontSize: "1.8rem",
              fontWeight: 700,
              color: "var(--text-dark)",
              marginBottom: "0.25rem",
            }}
          >
            EKAR Soavinimerina
          </h1>
          <p
            style={{
              color: "#8b7e70",
              fontSize: "0.85rem",
              letterSpacing: "0.15em",
              fontFamily: "'Cinzel', serif",
            }}
          >
            ESPACE ADMINISTRATEUR
          </p>
        </div>

        {/* Card */}
        <div
          style={{
            background: "rgba(255,253,249,0.9)",
            backdropFilter: "blur(20px)",
            border: "1px solid rgba(212,160,23,0.2)",
            borderRadius: "1.25rem",
            padding: "2.5rem",
            boxShadow: "0 20px 60px rgba(0,0,0,0.15)",
          }}
        >
          <h2
            style={{
              fontFamily: "'Lora', serif",
              color: "var(--text-dark)",
              marginBottom: "0.5rem",
              fontSize: "1.2rem",
            }}
          >
            Bienvenue
          </h2>

          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: "1.25rem" }}>
              <label
                style={{
                  display: "block",
                  color: "var(--gold-600)",
                  fontSize: "0.8rem",
                  fontWeight: 600,
                  marginBottom: "0.5rem",
                  letterSpacing: "0.05em",
                }}
              >
                EMAIL
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@ekarsoavy.mg"
                required
                style={{
                  width: "100%",
                  padding: "0.75rem 1rem",
                  background: "rgba(255,253,249,0.95)",
                  border: "1.5px solid rgba(212,160,23,0.3)",
                  borderRadius: "0.5rem",
                  color: "var(--text-dark)",
                  fontSize: "0.9rem",
                  outline: "none",
                  transition: "border-color 0.2s",
                  fontFamily: "'Nunito', sans-serif",
                }}
                onFocus={(e) =>
                  (e.target.style.borderColor = "var(--gold-500)")
                }
                onBlur={(e) =>
                  (e.target.style.borderColor = "rgba(212,160,23,0.3)")
                }
              />
            </div>

            <div style={{ marginBottom: "1.5rem" }}>
              <label
                style={{
                  display: "block",
                  color: "var(--gold-600)",
                  fontSize: "0.8rem",
                  fontWeight: 600,
                  marginBottom: "0.5rem",
                  letterSpacing: "0.05em",
                }}
              >
                MOT DE PASSE
              </label>
              <div style={{ position: "relative" }}>
                <FaLock
                  style={{
                    position: "absolute",
                    left: "10px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    color: "#8b7e70",
                    fontSize: "0.9rem",
                  }}
                />

                <input
                  type={showPass ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  style={{
                    width: "100%",
                    padding: "0.75rem 3rem 0.75rem 2.2rem",
                    background: "rgba(255,253,249,0.95)",
                    border: "1.5px solid rgba(212,160,23,0.3)",
                    borderRadius: "0.5rem",
                    color: "var(--text-dark)",
                    fontSize: "0.9rem",
                    outline: "none",
                    fontFamily: "'Nunito', sans-serif",
                  }}
                />

                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  style={{
                    position: "absolute",
                    right: "0.75rem",
                    top: "50%",
                    transform: "translateY(-50%)",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    color: "#8b7e70",
                    fontSize: "1rem",
                  }}
                >
                  {showPass ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            {error && (
              <div
                style={{
                  background: "rgba(239,68,68,0.15)",
                  border: "1px solid rgba(239,68,68,0.4)",
                  borderRadius: "0.5rem",
                  padding: "0.75rem 1rem",
                  marginBottom: "1rem",
                  color: "#c85a5a",
                  fontSize: "0.85rem",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                }}
              >
                {error}
              </div>
            )}

            {/* Hint */}
            <div
              style={{
                background: "rgba(212,160,23,0.1)",
                borderRadius: "0.5rem",
                padding: "0.75rem",
                marginBottom: "1.5rem",
                fontSize: "0.78rem",
                color: "#8b7e70",
              }}
            >
              Démo : admin@ekarsoavy.mg / admin123
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-gold"
              style={{ width: "100%" }}
            >
              {loading ? " Connexion..." : "✝ Se connecter"}
            </button>
          </form>

          <div style={{ textAlign: "center", marginTop: "1.5rem" }}>
            <Link
              to="/"
              style={{
                color: "#8b7e70",
                fontSize: "0.8rem",
                textDecoration: "none",
              }}
            >
              ← Retour à la page d'accueil
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
