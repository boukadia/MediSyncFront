import { useEffect, useState } from 'react';
import AdminSideBar from '../../../components/dashboard/admin/SideBar';
import '../../../styles/pages/doctorDashboard.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { getUsersApi, type User } from '../../../api/user.api';
import { getAllAppointmentsApi } from '../../../api/admin.api';
import { jwtDecode } from 'jwt-decode';

function DashboardPrincipalAdmin() {
  const [users, setUsers] = useState<User[]>([]);
  const [appointments, setAppointments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      day: 'numeric', month: 'long', year: 'numeric',
    });
  };

  const getUser = () => {
    const token = localStorage.getItem('token');
    if (token) {
      const decoded: { name?: string } = jwtDecode(token);
      return decoded;
    }
    return null;
  };

  useEffect(() => {
    const fetchAll = async () => {
      setLoading(true);
      try {
        const usersData = await getUsersApi(setErrorMessage) as unknown as User[];
        if (Array.isArray(usersData)) setUsers(usersData);

        // Use admin-only route for appointments
        const aptsData = await getAllAppointmentsApi(setErrorMessage);
        if (Array.isArray(aptsData)) setAppointments(aptsData);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    fetchAll();
  }, []);

  const doctors = users.filter(u => u.role === 'doctor');
  const patients = users.filter(u => u.role === 'patient');
  const pharmacies = users.filter(u => u.role === 'pharmacy');
  const labs = users.filter(u => u.role === 'laboratoire');

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'confirmed': return <span className="badge badge-success"><i className="fas fa-check me-1"></i>Confirmé</span>;
      case 'pending': return <span className="badge badge-warning"><i className="fas fa-clock me-1"></i>En attente</span>;
      case 'cancelled': return <span className="badge badge-secondary"><i className="fas fa-ban me-1"></i>Annulé</span>;
      case 'completed': return <span className="badge badge-info"><i className="fas fa-check-double me-1"></i>Terminé</span>;
      default: return <span className="badge badge-light">{status}</span>;
    }
  };

  return (
    <div className="doctor-dashboard">
      <AdminSideBar />

      <div className="container-fluid px-4 py-3">
        <div className="d-flex justify-content-between align-items-center mb-4 page-header">
          <div>
            <h1 className="h3 mb-1">Panneau d'administration</h1>
            <div className="d-flex gap-2 flex-wrap">
              <span className="badge badge-success">
                <i className="fas fa-shield-halved me-1"></i>Admin: {getUser()?.name || 'Administrateur'}
              </span>
              <span className="badge badge-info">
                <i className="fas fa-users me-1"></i>{users.length} utilisateurs
              </span>
            </div>
          </div>
        </div>

        {errorMessage && (
          <div className="alert alert-danger alert-dismissible fade show">
            <i className="fas fa-exclamation-circle me-2"></i>{errorMessage}
            <button className="btn-close" onClick={() => setErrorMessage('')}></button>
          </div>
        )}

        {/* Stats */}
        <div className="row g-3 mb-4">
          <div className="col-lg-3 col-md-6">
            <div className="card stat-card h-100">
              <div className="card-body d-flex align-items-center">
                <div className="stat-icon">
                  <i className="fas fa-user-doctor"></i>
                </div>
                <div className="ms-3">
                  <div className="stat-value">{doctors.length}</div>
                  <small className="text-muted">Médecins</small>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-md-6">
            <div className="card stat-card h-100">
              <div className="card-body d-flex align-items-center">
                <div className="stat-icon" style={{ background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.1), rgba(16, 185, 129, 0.05))', borderColor: 'rgba(16, 185, 129, 0.2)', color: '#10b981' }}>
                  <i className="fas fa-bed"></i>
                </div>
                <div className="ms-3">
                  <div className="stat-value">{patients.length}</div>
                  <small className="text-muted">Patients</small>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-md-6">
            <div className="card stat-card h-100">
              <div className="card-body d-flex align-items-center">
                <div className="stat-icon" style={{ background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.1), rgba(245, 158, 11, 0.05))', borderColor: 'rgba(245, 158, 11, 0.2)', color: '#f59e0b' }}>
                  <i className="fas fa-pills"></i>
                </div>
                <div className="ms-3">
                  <div className="stat-value">{pharmacies.length}</div>
                  <small className="text-muted">Pharmacies</small>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-md-6">
            <div className="card stat-card h-100">
              <div className="card-body d-flex align-items-center">
                <div className="stat-icon" style={{ background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.1), rgba(139, 92, 246, 0.05))', borderColor: 'rgba(139, 92, 246, 0.2)', color: '#8b5cf6' }}>
                  <i className="fas fa-flask"></i>
                </div>
                <div className="ms-3">
                  <div className="stat-value">{labs.length}</div>
                  <small className="text-muted">Laboratoires</small>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Users Table */}
        <div className="row g-3">
          <div className="col-lg-12">
            <div className="card">
              <div className="card-header d-flex justify-content-between align-items-center">
                <h5 className="card-title mb-0">Utilisateurs récents</h5>
              </div>
              <div className="card-body p-0">
                {loading ? (
                  <div className="text-center py-5"><div className="spinner-border text-primary"></div></div>
                ) : (
                  <div className="table-responsive">
                    <table className="table table-hover mb-0">
                      <thead className="table-light">
                        <tr>
                          <th>Nom</th>
                          <th>Email</th>
                          <th>Rôle</th>
                          <th>Téléphone</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {users.slice(0, 10).map((user) => (
                          <tr key={user._id}>
                            <td><strong>{user.name}</strong></td>
                            <td>{user.email}</td>
                            <td>
                              <span className={`badge ${
                                user.role === 'doctor' ? 'badge-primary' :
                                user.role === 'patient' ? 'badge-success' :
                                user.role === 'pharmacy' ? 'badge-warning' :
                                user.role === 'laboratoire' ? 'badge-info' : 'badge-light'
                              }`}>{user.role}</span>
                            </td>
                            <td>{user.phone || 'N/A'}</td>
                            <td>
                              <div className="d-flex gap-1">
                                <button className="btn btn-sm btn-outline-primary" title="Voir"><i className="fas fa-eye"></i></button>
                                <button className="btn btn-sm btn-outline-warning" title="Modifier"><i className="fas fa-edit"></i></button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Appointments Row */}
        <div className="row g-3 mt-3">
          <div className="col-lg-12">
            <div className="card">
              <div className="card-header">
                <h6 className="card-title mb-0">Derniers rendez-vous</h6>
              </div>
              <div className="card-body">
                <div className="d-flex flex-column gap-2">
                  {appointments.slice(0, 5).map((apt: any) => (
                    <div key={apt._id} className="notification-item">
                      <i className="fas fa-calendar-check notification-icon"></i>
                      <div className="notification-content">
                        <div>
                          <strong>{apt.patientId?.name || 'N/A'}</strong> → {apt.doctorId?.name || 'N/A'}
                        </div>
                        <div className="d-flex gap-2 align-items-center">
                          <small className="text-muted">{apt.date ? formatDate(apt.date) : 'N/A'}</small>
                          {getStatusBadge(apt.status)}
                        </div>
                      </div>
                    </div>
                  ))}
                  {appointments.length === 0 && (
                    <p className="text-muted text-center mb-0">Aucun rendez-vous</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardPrincipalAdmin;
