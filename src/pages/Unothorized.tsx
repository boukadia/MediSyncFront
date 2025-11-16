import { Link } from "react-router-dom";

function Unothorized() {
  return (
    <div
      style={{
        textAlign: "center",
        marginTop: "50px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h1 style={{ fontSize: "2.5rem", color: "#ff4d4f" }}>
        403 - Accès non autorisé
      </h1>
      <p style={{ fontSize: "1.2rem", color: "#555" }}>
        Vous n'avez pas les permissions nécessaires pour accéder à cette page.
      </p>
      <Link
        to="/"
        style={{
          display: "inline-block",
          marginTop: "20px",
          padding: "10px 20px",
          backgroundColor: "#007bff",
          color: "#fff",
          textDecoration: "none",
          borderRadius: "5px",
          fontSize: "1rem",
          fontWeight: "bold",
          cursor: "pointer",
          position: "relative",
          zIndex: 1000,
          pointerEvents: "auto", // Force les clics à être autorisés
          opacity: 1, // Surcharge l'opacity du hover global
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.opacity = "0.9"; // Légère opacité au survol
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.opacity = "1"; // Retour à l'opacité normale
        }}
      >
        Retour à la page d'accueil
      </Link>
    </div>
  );
}

export default Unothorized;