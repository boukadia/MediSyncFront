import { useEffect, useState } from 'react';
import PharmacySideBar from '../../../components/dashboard/pharmacy/SideBar';
import '../../../styles/pages/doctorDashboard.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { getPrescriptionsApi, type Prescription } from '../../../api/prescription.api';
import { jwtDecode } from 'jwt-decode';

function DashboardPrincipalPharmacy() {
  const [prescriptions, setPrescriptions] = useState<Prescription[]>([]);
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
      const data = await getPrescriptionsApi(setErrorMessage);
      setPrescriptions(data);
      setLoading(false);
    };
    fetchData();
  }, []);

  const signedPrescriptions = prescriptions.filter(p => p.status === 'signed');
  const draftPrescriptions = prescriptions.filter(p => p.status === 'draft');

  let totalMedications = 0;
  prescriptions.forEach(p => {
    totalMedications += (p.medications?.length || 0);
  });

  const getPatientName = (patientId: any) => {
    if (typeof patientId === 'string') return patientId;
    return patientId?.name || patientId?.email || 'Patient inconnu';
  };

  return (
    <div className="doctor-dashboard">
      <PharmacySideBar />

      <div className="container-fluid px-4 py-3">
        {/* Page Header */}
        <div className="d-flex justify-content-between align-items-center mb-4 page-header">
          <div>
            <h1 className="h3 mb-1">Bonjour, {getUser()?.name || 'Pharmacien'}</h1>
            <div className="d-flex gap-2 flex-wrap">
              <span className="badge badge-success">
                <i className="fas fa-pills me-1"></i>Pharmacie active
              </span>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="row g-3 mb-4">
          <div className="col-lg-3 col-md-6">
            <div className="card stat-card h-100">
              <div className="card-body d-flex align-items-center">
                <div className="stat-icon" style={{ background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.1), rgba(16, 185, 129, 0.05))', borderColor: 'rgba(16, 185, 129, 0.2)', color: '#10b981' }}>
                  <i className="fas fa-prescription-bottle-medical"></i>
                </div>
                <div className="ms-3">
                  <div className="stat-value">{signedPrescriptions.length}</div>
                  <small className="text-muted">Ordonnances signées</small>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-md-6">
            <div className="card stat-card h-100">
              <div className="card-body d-flex align-items-center">
                <div className="stat-icon" style={{ background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.1), rgba(245, 158, 11, 0.05))', borderColor: 'rgba(245, 158, 11, 0.2)', color: '#f59e0b' }}>
                  <i className="fas fa-file-alt"></i>
                </div>
                <div className="ms-3">
                  <div className="stat-value">{draftPrescriptions.length}</div>
                  <small className="text-muted">En attente</small>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-md-6">
            <div className="card stat-card h-100">
              <div className="card-body d-flex align-items-center">
                <div className="stat-icon">
                  <i className="fas fa-capsules"></i>
                </div>
                <div className="ms-3">
                  <div className="stat-value">{totalMedications}</div>
                  <small className="text-muted">Médicaments total</small>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-md-6">
            <div className="card stat-card h-100">
              <div className="card-body d-flex align-items-center">
                <div className="stat-icon" style={{ background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.1), rgba(6, 182, 212, 0.05))', borderColor: 'rgba(6, 182, 212, 0.2)', color: '#06b6d4' }}>
                  <i className="fas fa-chart-line"></i>
                </div>
                <div className="ms-3">
                  <div className="stat-value">{prescriptions.length}</div>
                  <small className="text-muted">Total ordonnances</small>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Prescriptions Table */}
        <div className="row g-3">
          <div className="col-lg-10">
            <div className="card">
              <div className="card-header d-flex justify-content-between align-items-center">
                <h5 className="card-title mb-0">Dernières ordonnances</h5>
              </div>
              <div className="card-body p-0">
                {loading ? (
                  <div className="text-center py-5">
                    <div className="spinner-border text-primary" role="status">
                      <span className="visually-hidden">Chargement...</span>
                    </div>
                  </div>
                ) : (
                  <div className="table-responsive">
                    <table className="table table-hover mb-0">
                      <thead className="table-light">
                        <tr>
                          <th>Patient</th>
                          <th>Médecin</th>
                          <th>Date</th>
                          <th>Médicaments</th>
                          <th>Statut</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {prescriptions.slice(0, 10).map((prescription) => (
                          <tr key={prescription._id}>
                            <td>{getPatientName(prescription.patientId)}</td>
                            <td>{prescription.doctorId?.name || 'N/A'}</td>
                            <td>{formatDate(prescription.createdAt)}</td>
                            <td>
                              <span className="badge badge-info">
                                {prescription.medications?.length || 0} médicament(s)
                              </span>
                            </td>
                            <td>
                              <span className={`badge ${prescription.status === 'signed' ? 'badge-success' : 'badge-warning'}`}>
                                {prescription.status === 'signed' ? 'Signée' : 'Brouillon'}
                              </span>
                            </td>
                            <td>
                              <div className="d-flex gap-1">
                                <button className="btn btn-sm btn-outline-primary" title="Voir"><i className="fas fa-eye"></i></button>
                                <button className="btn btn-sm btn-outline-success" title="Distribuer"><i className="fas fa-check"></i></button>
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

export default DashboardPrincipalPharmacy;
