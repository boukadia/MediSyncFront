import React from 'react';
import '../../../styles/pages/doctorDashboard.css';

interface HeaderProps {
  onToggleSidebar?: () => void;
}

const Header: React.FC<HeaderProps> = ({ onToggleSidebar }) => {
  // Données temporaires pour l'utilisateur
  const user = { firstName: 'Martin' };

  return (
    <header className="doctor-header bg-white shadow-sm border-bottom sticky-top">
      <div className="container-fluid">
        <div className="row align-items-center py-3">
          {/* Left section */}
          <div className="col-auto d-flex align-items-center">
            {/* Hamburger menu for mobile */}
            <button 
              className="btn btn-link d-lg-none me-3 p-2"
              onClick={onToggleSidebar}
              aria-label="Ouvrir le menu"
            >
              <i className="fas fa-bars"></i>
            </button>
            
            {/* Breadcrumbs */}
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb mb-0">
                <li className="breadcrumb-item">
                  <a href="#" className="text-decoration-none">Accueil</a>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                  Tableau de bord
                </li>
              </ol>
            </nav>
          </div>

          {/* Center - Search */}
          <div className="col-lg-4 col-md-6 d-none d-md-block">
            <div className="position-relative">
              <input 
                type="search" 
                className="form-control ps-5" 
                placeholder="Rechercher patient, dossier, prescription..."
                aria-label="Rechercher"
              />
              <i className="fas fa-search position-absolute top-50 start-0 translate-middle-y ms-3 text-muted"></i>
            </div>
          </div>

          {/* Right section */}
          <div className="col d-flex align-items-center justify-content-end gap-3">
            {/* Notifications */}
            <button className="btn btn-outline-light text-dark position-relative" aria-label="Notifications">
              <i className="far fa-bell"></i>
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                3
                <span className="visually-hidden">notifications non lues</span>
              </span>
            </button>

            {/* User dropdown */}
            <div className="dropdown">
              <button 
                className="btn btn-link text-decoration-none d-flex align-items-center gap-2 p-0" 
                type="button" 
                data-bs-toggle="dropdown" 
                aria-expanded="false"
              >
                <img 
                  src="https://images.unsplash.com/photo-1552374196-c4e7ffc6e126?q=80&w=100&auto=format&fit=crop" 
                  alt="Photo du médecin" 
                  className="rounded-circle"
                  width="32" 
                  height="32"
                />
                <span className="fw-medium text-dark d-none d-sm-inline">
                  Dr {user?.firstName || 'Martin'}
                </span>
                <i className="fas fa-chevron-down text-muted"></i>
              </button>
              
              <ul className="dropdown-menu dropdown-menu-end">
                <li>
                  <a className="dropdown-item" href="#">
                    <i className="fas fa-user me-2"></i> Mon profil
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    <i className="fas fa-cog me-2"></i> Paramètres
                  </a>
                </li>
                <li><hr className="dropdown-divider" /></li>
                <li>
                  <a className="dropdown-item text-danger" href="#">
                    <i className="fas fa-sign-out-alt me-2"></i> Déconnexion
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;