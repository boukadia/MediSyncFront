import React from 'react';
import '../../../styles/pages/doctorDashboard.css';

interface SideBarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

const SideBar: React.FC<SideBarProps> = ({ isOpen, onClose }) => {
  const handleLogout = () => {
    // Logique de déconnexion temporaire
    console.log('Déconnexion');
  };

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50 d-lg-none"
          style={{ zIndex: 1040 }}
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`doctor-sidebar bg-white border-end position-fixed position-lg-sticky top-0 h-100 d-flex flex-column ${isOpen ? 'show' : ''
          }`}
        style={{
          width: '268px',
          zIndex: 1050,
          transform: isOpen ? 'translateX(0)' : 'translateX(-100%)',
          transition: 'transform 0.3s ease-in-out'
        }}
      >
        {/* Brand */}
        <div className="d-flex align-items-center gap-2 p-3 border-bottom bg-white">
          <div
            className="rounded-3 d-flex align-items-center justify-content-center text-white"
            style={{
              width: '36px',
              height: '36px',
              background: 'linear-gradient(135deg, #3b82f6, #60a5fa)',
              boxShadow: '0 6px 18px rgba(59, 130, 246, 0.35)'
            }}
          >
            <i className="fas fa-heart-pulse"></i>
          </div>
          <strong className="text-dark">Careflow</strong>
        </div>

        {/* Navigation */}
        <div className="flex-grow-1 p-3 overflow-auto">
          <div className="mb-4">
            <div className="text-uppercase fw-bold text-muted small mb-2 px-2">Navigation</div>
            <nav className="nav flex-column gap-1">
              <a
                href="/dashboard/doctor"
                className="nav-link d-flex align-items-center gap-3 px-3 py-2 rounded-3 text-decoration-none active-nav"
              >
                <i className="fas fa-gauge-high text-primary" style={{ width: '18px', textAlign: 'center' }}></i>
                <span>Tableau de bord</span>
              </a>
              <a
                href="/dashboard/doctor/appointments"
                className="nav-link d-flex align-items-center gap-3 px-3 py-2 rounded-3 text-decoration-none text-dark"
              >
                <i className="fas fa-calendar-days text-primary" style={{ width: '18px', textAlign: 'center' }}></i>
                <span>Rendez-vous</span>
              </a>
              <a
                href="/dashboard/doctor/consultations"
                className="nav-link d-flex align-items-center gap-3 px-3 py-2 rounded-3 text-decoration-none text-dark"
              >
                <i className="fas fa-stethoscope text-primary" style={{ width: '18px', textAlign: 'center' }}></i>
                <span>Consultations</span>
              </a>
              <a
                href="/dashboard/doctor/prescriptions"
                className="nav-link d-flex align-items-center gap-3 px-3 py-2 rounded-3 text-decoration-none text-dark"
              >
                <i className="fas fa-prescription-bottle-medical text-primary" style={{ width: '18px', textAlign: 'center' }}></i>
                <span>Prescriptions</span>
              </a>
              <a
                href="/dashboard/doctor/labo-tests"
                className="nav-link d-flex align-items-center gap-3 px-3 py-2 rounded-3 text-decoration-none text-dark"
              >
                <i className="fas fa-flask text-primary" style={{ width: '18px', textAlign: 'center' }}></i>
                <span>Ordres de labo</span>
              </a>
              <a
                href="#"
                className="nav-link d-flex align-items-center gap-3 px-3 py-2 rounded-3 text-decoration-none text-dark"
              >
                <i className="fas fa-user-group text-primary" style={{ width: '18px', textAlign: 'center' }}></i>
                <span>Patients</span>
              </a>
              <a
                href="#"
                className="nav-link d-flex align-items-center gap-3 px-3 py-2 rounded-3 text-decoration-none text-dark"
              >
                <i className="fas fa-message text-primary" style={{ width: '18px', textAlign: 'center' }}></i>
                <span>Messages</span>
              </a>
            </nav>
          </div>

          <div className="mb-4">
            <div className="text-uppercase fw-bold text-muted small mb-2 px-2">Raccourcis</div>
            <nav className="nav flex-column gap-1">
              <a
                href="#"
                className="nav-link d-flex align-items-center gap-3 px-3 py-2 rounded-3 text-decoration-none text-dark"
              >
                <i className="fas fa-file-medical text-primary" style={{ width: '18px', textAlign: 'center' }}></i>
                <span>Nouveau dossier</span>
              </a>
              <a
                href="#"
                className="nav-link d-flex align-items-center gap-3 px-3 py-2 rounded-3 text-decoration-none text-dark"
              >
                <i className="fas fa-user-plus text-primary" style={{ width: '18px', textAlign: 'center' }}></i>
                <span>Nouveau patient</span>
              </a>
            </nav>
          </div>
        </div>

        {/* Footer */}
        <div className="p-3 border-top d-flex gap-2 flex-wrap">
          <a href="#" className="btn btn-outline-secondary d-flex align-items-center gap-2">
            <i className="fas fa-cog"></i>
            <span>Paramètres</span>
          </a>
          <button
            onClick={handleLogout}
            className="btn btn-outline-primary d-flex align-items-center gap-2"
          >
            <i className="fas fa-sign-out-alt"></i>
            <span>Déconnexion</span>
          </button>
        </div>
      </aside>
    </>
  );
};

export default SideBar;