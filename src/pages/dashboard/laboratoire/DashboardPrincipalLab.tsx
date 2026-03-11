import { useEffect, useState } from 'react';
import LabSideBar from '../../../components/dashboard/laboratoire/SideBar';
import '../../../styles/pages/doctorDashboard.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { getTestsApi, type Test } from '../../../api/test.api';
import { jwtDecode } from 'jwt-decode';

function DashboardPrincipalLab() {
  const [tests, setTests] = useState<Test[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
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
    const fetchData = async () => {
      const data = await getTestsApi(setErrorMessage);
      setTests(data);
      setLoading(false);
    };
    fetchData();
  }, []);

  const pendingTests = tests.filter(t => t.status === 'pending');
  const completedTests = tests.filter(t => t.status === 'completed');

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending': return <span className="badge badge-warning"><i className="fas fa-clock me-1"></i>En attente</span>;
      case 'completed': return <span className="badge badge-success"><i className="fas fa-check me-1"></i>Terminé</span>;
      case 'canceled': return <span className="badge badge-secondary"><i className="fas fa-ban me-1"></i>Annulé</span>;
      default: return <span className="badge badge-light">{status}</span>;
    }
  };

  return (
    <div className="doctor-dashboard">
      <LabSideBar />

      <div className="container-fluid px-4 py-3">
        {/* Page Header */}
        <div className="d-flex justify-content-between align-items-center mb-4 page-header">
          <div>
            <h1 className="h3 mb-1">Bonjour, {getUser()?.name || 'Laboratoire'}</h1>
            <div className="d-flex gap-2 flex-wrap">
              <span className="badge badge-info">
                <i className="fas fa-flask me-1"></i>Laboratoire actif
              </span>
              <span className="badge badge-warning">
                <i className="fas fa-clock me-1"></i>{pendingTests.length} en attente
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
                <div className="stat-icon" style={{ background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.1), rgba(139, 92, 246, 0.05))', borderColor: 'rgba(139, 92, 246, 0.2)', color: '#8b5cf6' }}>
                  <i className="fas fa-vials"></i>
                </div>
                <div className="ms-3">
                  <div className="stat-value">{tests.length}</div>
                  <small className="text-muted">Total analyses</small>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-md-6">
            <div className="card stat-card h-100">
              <div className="card-body d-flex align-items-center">
                <div className="stat-icon" style={{ background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.1), rgba(245, 158, 11, 0.05))', borderColor: 'rgba(245, 158, 11, 0.2)', color: '#f59e0b' }}>
                  <i className="fas fa-hourglass-half"></i>
                </div>
                <div className="ms-3">
                  <div className="stat-value">{pendingTests.length}</div>
                  <small className="text-muted">En attente</small>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-md-6">
            <div className="card stat-card h-100">
              <div className="card-body d-flex align-items-center">
                <div className="stat-icon" style={{ background: 'linear-gradient(135deg, rgba(34, 197, 94, 0.1), rgba(34, 197, 94, 0.05))', borderColor: 'rgba(34, 197, 94, 0.2)', color: '#22c55e' }}>
                  <i className="fas fa-clipboard-check"></i>
                </div>
                <div className="ms-3">
                  <div className="stat-value">{completedTests.length}</div>
                  <small className="text-muted">Terminées</small>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-md-6">
            <div className="card stat-card h-100">
              <div className="card-body d-flex align-items-center">
                <div className="stat-icon">
                  <i className="fas fa-user-group"></i>
                </div>
                <div className="ms-3">
                  <div className="stat-value">
                    {new Set(tests.map(t => t.labOrderId?.patientId?._id).filter(Boolean)).size}
                  </div>
                  <small className="text-muted">Patients</small>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tests Table */}
        <div className="row g-3">
          <div className="col-lg-10">
            <div className="card">
              <div className="card-header d-flex justify-content-between align-items-center">
                <h5 className="card-title mb-0">Dernières analyses</h5>
              </div>
              <div className="card-body p-0">
                {loading ? (
                  <div className="text-center py-5">
                    <div className="spinner-border text-primary" role="status">
                      <span className="visually-hidden">Chargement...</span>
                    </div>
                  </div>
                ) : tests.length === 0 ? (
                  <div className="p-4 text-center text-muted">
                    <i className="fas fa-flask fa-2x mb-2"></i>
                    <p>Aucune analyse pour le moment</p>
                  </div>
                ) : (
                  <div className="table-responsive">
                    <table className="table table-hover mb-0">
                      <thead className="table-light">
                        <tr>
                          <th>Test</th>
                          <th>Patient</th>
                          <th>Médecin</th>
                          <th>Date</th>
                          <th>Résultat</th>
                          <th>Statut</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {tests.slice(0, 10).map((test) => (
                          <tr key={test._id}>
                            <td>
                              <strong>{test.name}</strong>
                              <br /><small className="text-muted">{test.code}</small>
                            </td>
                            <td>{test.labOrderId?.patientId?.name || 'N/A'}</td>
                            <td>{test.labOrderId?.doctorId?.name || 'N/A'}</td>
                            <td>{formatDate(test.createdAt)}</td>
                            <td>
                              {test.resultValue != null ? (
                                <span className={`badge ${test.isNormal ? 'badge-success' : 'badge-warning'}`}>
                                  {test.resultValue} {test.unite}
                                </span>
                              ) : (
                                <span className="badge badge-light">—</span>
                              )}
                            </td>
                            <td>{getStatusBadge(test.status)}</td>
                            <td>
                              <div className="d-flex gap-1">
                                <button className="btn btn-sm btn-outline-primary" title="Voir"><i className="fas fa-eye"></i></button>
                                {test.status === 'pending' && (
                                  <button className="btn btn-sm btn-outline-success" title="Saisir résultat"><i className="fas fa-edit"></i></button>
                                )}
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
      </div>
    </div>
  );
}

export default DashboardPrincipalLab;
