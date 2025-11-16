import { Link } from "react-router-dom";
import '../styles/pages/Unothorized.css';

function Unothorized() {
  return (
    <div className="unauthorized-page">
      <div className="content-box">
        <div className="icon-wrapper">
          <svg width="100" height="100" viewBox="0 0 100 100" fill="none">
            <circle cx="50" cy="50" r="45" stroke="#ff6b6b" strokeWidth="4"/>
            <path d="M50 30V55M50 65V70" stroke="#ff6b6b" strokeWidth="4" strokeLinecap="round"/>
          </svg>
        </div>

        <h1 className="error-title">403 - Accès non autorisé</h1>
        <p className="error-text">
          Vous n'avez pas les permissions nécessaires pour accéder à cette page.
        </p>

        <div className="button-group">
          <Link to="/" className="btn btn-primary">
            Retour à l'accueil
          </Link>
          <button onClick={() => window.history.back()} className="btn btn-secondary">
            Page précédente
          </button>
        </div>
      </div>
    </div>
  );
}

export default Unothorized;