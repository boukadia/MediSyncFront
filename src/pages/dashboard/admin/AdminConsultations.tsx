import { useEffect, useState } from 'react';
import AdminSideBar from '../../../components/dashboard/admin/SideBar';
import '../../../styles/pages/doctorDashboard.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { getAllConsultationsApi } from '../../../api/admin.api';

function AdminConsultations() {
    const [consultations, setConsultations] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState('');

    const formatDate = (dateString: string) => new Date(dateString).toLocaleDateString('fr-FR');

    useEffect(() => {
        const fetch_ = async () => {
            const data = await getAllConsultationsApi(setErrorMessage);
            if (Array.isArray(data)) setConsultations(data);
            setLoading(false);
        };
        fetch_();
    }, []);

    return (
        <div className="doctor-dashboard">
            <AdminSideBar />
            <div className="container-fluid px-4 py-3">
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <div>
                        <h2><i className="fas fa-stethoscope text-primary me-2"></i>Consultations</h2>
                        <p className="text-muted">Vue d'ensemble de toutes les consultations</p>
                    </div>
                </div>
                {errorMessage && (
                    <div className="alert alert-danger"><i className="fas fa-exclamation-circle me-2"></i>{errorMessage}</div>
                )}
                <div className="card shadow-sm">
                    <div className="card-body p-0">
                        {loading ? (
                            <div className="text-center py-5"><div className="spinner-border text-primary"></div></div>
                        ) : (
                            <div className="table-responsive">
                                <table className="table table-hover mb-0">
                                    <thead className="table-light">
                                        <tr>
                                            <th>Patient</th>
                                            <th>Médecin</th>
                                            <th>Diagnostic</th>
                                            <th>Date</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {consultations.map((c: any) => (
                                            <tr key={c._id}>
                                                <td>{c.appointment?.patientId?.name || 'N/A'}</td>
                                                <td>{c.medecin?.name || c.appointment?.doctorId?.name || 'N/A'}</td>
                                                <td>{c.diagnostic || '-'}</td>
                                                <td>{c.dateConsultation ? formatDate(c.dateConsultation) : '-'}</td>
                                                <td>
                                                    <button className="btn btn-sm btn-outline-primary" onClick={() => alert('Affichage de la consultation en cours...')}><i className="fas fa-eye"></i></button>
                                                </td>
                                            </tr>
                                        ))}
                                        {consultations.length === 0 && <tr><td colSpan={5} className="text-center py-3 text-muted">Aucune consultation</td></tr>}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AdminConsultations;
