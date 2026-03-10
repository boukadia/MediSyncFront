import React from 'react';
import '../../../styles/pages/doctorDashboard.css';

interface SideBarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

const PharmacySideBar: React.FC<SideBarProps> = ({ isOpen, onClose }) => {
  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  };

  return (
    <>
      {isOpen && (
        <div
          className="position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50 d-lg-none"
          style={{ zIndex: 1040 }}
          onClick={onClose}
        />
      )}

      <aside
        className={`doctor-sidebar bg-white border-end position-fixed position-lg-sticky top-0 h-100 d-flex flex-column ${isOpen ? 'show' : ''}`}
        style={{
          width: '268px',
          zIndex: 1050,
          transform: isOpen ? 'translateX(0)' : 'translateX(-100%)',
          transition: 'transform 0.3s ease-in-out'
        }}
      >
        <div className="d-flex align-items-center gap-2 p-3 border-bottom bg-white">
          <div
            className="rounded-3 d-flex align-items-center justify-content-center text-white"
            style={{
              width: '36px',
              height: '36px',
              background: 'linear-gradient(135deg, #10b981, #34d399)',
              boxShadow: '0 6px 18px rgba(16, 185, 129, 0.35)'
            }}
          >
            <i className="fas fa-pills"></i>
          </div>
          <strong className="text-dark">MediSync Pharmacie</strong>
        </div>

        <div className="flex-grow-1 p-3 overflow-auto">
          <div className="mb-4">
            <div className="text-uppercase fw-bold text-muted small mb-2 px-2">Navigation</div>
            <nav className="nav flex-column gap-1">
              <a
                href="/dashboard/pharmacy"
                className="nav-link d-flex align-items-center gap-3 px-3 py-2 rounded-3 text-decoration-none active-nav"
              >
                <i className="fas fa-gauge-high text-primary" style={{ width: '18px', textAlign: 'center' }}></i>
                <span>Tableau de bord</span>
              </a>
              <a
                href="/dashboard/pharmacy/prescriptions"
                className="nav-link d-flex align-items-center gap-3 px-3 py-2 rounded-3 text-decoration-none text-dark"
              >
                <i className="fas fa-prescription-bottle-medical text-primary" style={{ width: '18px', textAlign: 'center' }}></i>
                <span>Ordonnances</span>
              </a>
              <a
                href="/dashboard/pharmacy/inventory"
                className="nav-link d-flex align-items-center gap-3 px-3 py-2 rounded-3 text-decoration-none text-dark"
              >
                <i className="fas fa-boxes-stacked text-primary" style={{ width: '18px', textAlign: 'center' }}></i>
                <span>Inventaire</span>
              </a>
              <a
                href="/dashboard/pharmacy/patients"
                className="nav-link d-flex align-items-center gap-3 px-3 py-2 rounded-3 text-decoration-none text-dark"
              >
                <i className="fas fa-user-group text-primary" style={{ width: '18px', textAlign: 'center' }}></i>
                <span>Patients</span>
              </a>
              <a
                href="/dashboard/pharmacy/orders"
                className="nav-link d-flex align-items-center gap-3 px-3 py-2 rounded-3 text-decoration-none text-dark"
              >
                <i className="fas fa-truck text-primary" style={{ width: '18px', textAlign: 'center' }}></i>
                <span>Commandes</span>
              </a>
            </nav>
          </div>
        </div>

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

export default PharmacySideBar;
