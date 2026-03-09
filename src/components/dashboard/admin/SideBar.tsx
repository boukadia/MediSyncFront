import React from 'react';
import '../../../styles/pages/doctorDashboard.css';

interface SideBarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

const AdminSideBar: React.FC<SideBarProps> = ({ isOpen, onClose }) => {
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
              background: 'linear-gradient(135deg, #ef4444, #f87171)',
              boxShadow: '0 6px 18px rgba(239, 68, 68, 0.35)'
            }}
          >
            <i className="fas fa-shield-halved"></i>
          </div>
          <strong className="text-dark">MediSync Admin</strong>
        </div>

        <div className="flex-grow-1 p-3 overflow-auto">
          <div className="mb-4">
            <div className="text-uppercase fw-bold text-muted small mb-2 px-2">Navigation</div>
            <nav className="nav flex-column gap-1">
              <a
                href="/dashboard/admin"
                className="nav-link d-flex align-items-center gap-3 px-3 py-2 rounded-3 text-decoration-none active-nav"
              >
                <i className="fas fa-gauge-high text-primary" style={{ width: '18px', textAlign: 'center' }}></i>
                <span>Tableau de bord</span>
              </a>
              <a
                href="/dashboard/admin/users"
                className="nav-link d-flex align-items-center gap-3 px-3 py-2 rounded-3 text-decoration-none text-dark"
              >
                <i className="fas fa-users text-primary" style={{ width: '18px', textAlign: 'center' }}></i>
                <span>Utilisateurs</span>
              </a>
              <a
                href="/dashboard/admin/doctors"
                className="nav-link d-flex align-items-center gap-3 px-3 py-2 rounded-3 text-decoration-none text-dark"
              >
                <i className="fas fa-user-doctor text-primary" style={{ width: '18px', textAlign: 'center' }}></i>
                <span>Médecins</span>
              </a>
              <a
                href="/dashboard/admin/patients"
                className="nav-link d-flex align-items-center gap-3 px-3 py-2 rounded-3 text-decoration-none text-dark"
              >
                <i className="fas fa-bed text-primary" style={{ width: '18px', textAlign: 'center' }}></i>
                <span>Patients</span>
              </a>
              <a
                href="/dashboard/admin/pharmacies"
                className="nav-link d-flex align-items-center gap-3 px-3 py-2 rounded-3 text-decoration-none text-dark"
              >
                <i className="fas fa-pills text-primary" style={{ width: '18px', textAlign: 'center' }}></i>
                <span>Pharmacies</span>
              </a>
              <a
                href="/dashboard/admin/laboratoires"
                className="nav-link d-flex align-items-center gap-3 px-3 py-2 rounded-3 text-decoration-none text-dark"
              >
                <i className="fas fa-flask text-primary" style={{ width: '18px', textAlign: 'center' }}></i>
                <span>Laboratoires</span>
              </a>
              <a
                href="/dashboard/admin/specialites"
                className="nav-link d-flex align-items-center gap-3 px-3 py-2 rounded-3 text-decoration-none text-dark"
              >
                <i className="fas fa-tags text-primary" style={{ width: '18px', textAlign: 'center' }}></i>
                <span>Spécialités</span>
              </a>
            </nav>
          </div>

          <div className="mb-4">
            <div className="text-uppercase fw-bold text-muted small mb-2 px-2">Système</div>
            <nav className="nav flex-column gap-1">
              <a
                href="/dashboard/admin/appointments"
                className="nav-link d-flex align-items-center gap-3 px-3 py-2 rounded-3 text-decoration-none text-dark"
              >
                <i className="fas fa-calendar-check text-primary" style={{ width: '18px', textAlign: 'center' }}></i>
                <span>Rendez-vous</span>
              </a>
              <a
                href="/dashboard/admin/consultations"
                className="nav-link d-flex align-items-center gap-3 px-3 py-2 rounded-3 text-decoration-none text-dark"
              >
                <i className="fas fa-stethoscope text-primary" style={{ width: '18px', textAlign: 'center' }}></i>
                <span>Consultations</span>
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

export default AdminSideBar;
