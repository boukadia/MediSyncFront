import { useEffect, useState } from 'react';
import AdminSideBar from '../../../components/dashboard/admin/SideBar';
import '../../../styles/pages/doctorDashboard.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { getAllAppointmentsApi } from '../../../api/admin.api';

function AdminAppointments() {
    const [appointments, setAppointments] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState('');

    const formatDate = (dateString: string) => new Date(dateString).toLocaleDateString('fr-FR');

    const getStatusBadge = (status: string) => {
        switch (status) {
            case 'confirmed': return <span className="badge badge-success">Confirmé</span>;
            case 'pending': return <span className="badge badge-warning">En attente</span>;
            case 'cancelled': return <span className="badge badge-secondary">Annulé</span>;
            case 'completed': return <span className="badge badge-info">Terminé</span>;
            default: return <span className="badge badge-light">{status}</span>;
        }
    };

    useEffect(() => {
        const fetch_ = async () => {
            const data = await getAllAppointmentsApi(setErrorMessage);
            if (Array.isArray(data)) setAppointments(data);
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
                        <h2><i className="fas fa-calendar-check text-primary me-2"></i>Rendez-vous</h2>
                        <p className="text-muted">Vue d'ensemble de tous les rendez-vous</p>
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
                                            <th>Date</th>
                                            <th>Type</th>
                                            <th>Motif</th>
                                            <th>Statut</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {appointments.map((apt: any) => (
                                            <tr key={apt._id}>
                                                <td>{apt.patientId?.name || 'N/A'}</td>
                                                <td>{apt.doctorId?.name || 'N/A'}</td>
                                                <td>{apt.date ? formatDate(apt.date) : '-'}</td>
                                                <td><span className="badge badge-primary">{apt.typeConsultation || '-'}</span></td>
                                                <td>{apt.consultationReason || '-'}</td>
                                                <td>{getStatusBadge(apt.status)}</td>
                                            </tr>
                                        ))}
                                        {appointments.length === 0 && <tr><td colSpan={6} className="text-center py-3 text-muted">Aucun rendez-vous</td></tr>}
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

export default AdminAppointments;
