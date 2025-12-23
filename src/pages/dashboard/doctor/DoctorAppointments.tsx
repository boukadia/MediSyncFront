import { useEffect, useState } from 'react';
import SideBar from '../../../components/dashboard/doctor/SideBar';
import '../../../styles/pages/doctorDashboard.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { getAppointmentsApi, type Appointment } from '../../../api/appointment.api';

function DoctorAppointments() {
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(true);
    const [myAppointments, setMyAppointments] = useState<Appointment[]>([]);

    // Function to format date
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        const options: Intl.DateTimeFormatOptions = {
            weekday: 'long',
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        };
        return date.toLocaleDateString('fr-FR', options);
    };

    // Function to get badge color based on status
    const getBadgeColor = (status: string) => {
        switch (status) {
            case 'confirmed':
                return 'badge-success';
            case 'pending':
                return 'badge-warning';
            case 'cancelled':
                return 'badge-secondary';
            case 'completed':
                return 'badge-info';
            default:
                return 'badge-light';
        }
    };

    useEffect(() => {
        const fetchAppointments = async () => {
            setLoading(true);
            const appointments = await getAppointmentsApi(setErrorMessage);
            setMyAppointments(appointments);
            setLoading(false);
        };
        fetchAppointments();
    }, []);

    // Filter appointments by status
    const confirmedAppointments = myAppointments.filter(apt => apt.status === 'confirmed');
    const pendingAppointments = myAppointments.filter(apt => apt.status === 'pending');
    const completedAppointments = myAppointments.filter(apt => apt.status === 'completed');

    return (
        <div className="doctor-dashboard">
            <SideBar />

            {/* Main Content */}
            <div className="container-fluid px-4 py-3">
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <div>
                        <h2>
                            <i className="fas fa-calendar-check text-primary me-2"></i>
                            Rendez-vous
                        </h2>
                        <p className="text-muted">Gérez les consultations de vos patients</p>
                    </div>
                </div>

                {/* Error Message */}
                {errorMessage && (
                    <div className="alert alert-danger alert-dismissible fade show" role="alert">
                        <i className="fas fa-exclamation-circle me-2"></i>
                        {errorMessage}
                        <button
                            type="button"
                            className="btn-close"
                            onClick={() => setErrorMessage('')}
                        ></button>
                    </div>
                )}

                {/* Stats */}
                <div className="row g-3 mb-4">
                    <div className="col-lg-4 col-md-6">
                        <div className="card shadow-sm border-start border-success border-4">
                            <div className="card-body">
                                <h6 className="text-muted">Confirmés</h6>
                                <h3>{confirmedAppointments.length}</h3>
                                <small className="text-success">Rendez-vous confirmés</small>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-6">
                        <div className="card shadow-sm border-start border-warning border-4">
                            <div className="card-body">
                                <h6 className="text-muted">En attente</h6>
                                <h3>{pendingAppointments.length}</h3>
                                <small className="text-warning">À confirmer</small>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-6">
                        <div className="card shadow-sm border-start border-info border-4">
                            <div className="card-body">
                                <h6 className="text-muted">Total</h6>
                                <h3>{myAppointments.length}</h3>
                                <small className="text-info">Tous les rendez-vous</small>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Tabs Navigation */}
                <ul className="nav nav-tabs mb-4" id="appointmentTabs" role="tablist">
                    <li className="nav-item" role="presentation">
                        <button
                            className="nav-link active"
                            data-bs-toggle="tab"
                            data-bs-target="#confirmed"
                        >
                            <i className="fas fa-check-circle me-2"></i>Confirmés ({confirmedAppointments.length})
                        </button>
                    </li>
                    <li className="nav-item" role="presentation">
                        <button
                            className="nav-link"
                            data-bs-toggle="tab"
                            data-bs-target="#pending"
                        >
                            <i className="fas fa-clock me-2"></i>En attente ({pendingAppointments.length})
                        </button>
                    </li>
                    <li className="nav-item" role="presentation">
                        <button
                            className="nav-link"
                            data-bs-toggle="tab"
                            data-bs-target="#all"
                        >
                            <i className="fas fa-list me-2"></i>Tous ({myAppointments.length})
                        </button>
                    </li>
                </ul>

                {/* Tab Content */}
                <div className="tab-content">
                    {/* Confirmed Appointments */}
                    <div className="tab-pane fade show active" id="confirmed">
                        {loading ? (
                            <div className="text-center py-5">
                                <div className="spinner-border text-primary" role="status">
                                    <span className="visually-hidden">Chargement...</span>
                                </div>
                            </div>
                        ) : confirmedAppointments.length === 0 ? (
                            <div className="alert alert-info">
                                <i className="fas fa-info-circle me-2"></i>
                                Aucun rendez-vous confirmé
                            </div>
                        ) : (
                            <div className="table-responsive">
                                <table className="table table-hover">
                                    <thead>
                                        <tr>
                                            <th>Patient</th>
                                            <th>Date</th>
                                            <th>Heure</th>
                                            <th>Type</th>
                                            <th>Motif</th>
                                            <th>Statut</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {confirmedAppointments.map((appointment) => (
                                            <tr key={appointment._id}>
                                                <td>{appointment.patientId?.name || 'N/A'}</td>
                                                <td>{formatDate(appointment.date)}</td>
                                                <td>{appointment.creneau?.heure_debut || 'N/A'}</td>
                                                <td>
                                                    <span className="badge badge-primary">
                                                        {appointment.typeConsultation}
                                                    </span>
                                                </td>
                                                <td>{appointment.consultationReason}</td>
                                                <td>
                                                    <span className={`badge ${getBadgeColor(appointment.status)}`}>
                                                        {appointment.status}
                                                    </span>
                                                </td>
                                                <td>
                                                    <div className="d-flex gap-1">
                                                        <button className="btn btn-sm btn-outline-primary" title="Voir détails">
                                                            <i className="fas fa-eye"></i>
                                                        </button>
                                                        <button className="btn btn-sm btn-outline-success" title="Commencer consultation">
                                                            <i className="fas fa-stethoscope"></i>
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>

                    {/* Pending Appointments */}
                    <div className="tab-pane fade" id="pending">
                        {pendingAppointments.length === 0 ? (
                            <div className="alert alert-info">
                                <i className="fas fa-info-circle me-2"></i>
                                Aucun rendez-vous en attente
                            </div>
                        ) : (
                            <div className="table-responsive">
                                <table className="table table-hover">
                                    <thead>
                                        <tr>
                                            <th>Patient</th>
                                            <th>Date</th>
                                            <th>Heure</th>
                                            <th>Type</th>
                                            <th>Motif</th>
                                            <th>Statut</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {pendingAppointments.map((appointment) => (
                                            <tr key={appointment._id}>
                                                <td>{appointment.patientId?.name || 'N/A'}</td>
                                                <td>{formatDate(appointment.date)}</td>
                                                <td>{appointment.creneau?.heure_debut || 'N/A'}</td>
                                                <td>
                                                    <span className="badge badge-primary">
                                                        {appointment.typeConsultation}
                                                    </span>
                                                </td>
                                                <td>{appointment.consultationReason}</td>
                                                <td>
                                                    <span className={`badge ${getBadgeColor(appointment.status)}`}>
                                                        {appointment.status}
                                                    </span>
                                                </td>
                                                <td>
                                                    <div className="d-flex gap-1">
                                                        <button className="btn btn-sm btn-outline-success" title="Confirmer">
                                                            <i className="fas fa-check"></i>
                                                        </button>
                                                        <button className="btn btn-sm btn-outline-danger" title="Refuser">
                                                            <i className="fas fa-times"></i>
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>

                    {/* All Appointments */}
                    <div className="tab-pane fade" id="all">
                        {myAppointments.length === 0 ? (
                            <div className="alert alert-info">
                                <i className="fas fa-info-circle me-2"></i>
                                Aucun rendez-vous
                            </div>
                        ) : (
                            <div className="table-responsive">
                                <table className="table table-hover">
                                    <thead>
                                        <tr>
                                            <th>Patient</th>
                                            <th>Date</th>
                                            <th>Heure</th>
                                            <th>Type</th>
                                            <th>Motif</th>
                                            <th>Statut</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {myAppointments.map((appointment) => (
                                            <tr key={appointment._id}>
                                                <td>{appointment.patientId?.name || 'N/A'}</td>
                                                <td>{formatDate(appointment.date)}</td>
                                                <td>{appointment.creneau?.heure_debut || 'N/A'}</td>
                                                <td>
                                                    <span className="badge badge-primary">
                                                        {appointment.typeConsultation}
                                                    </span>
                                                </td>
                                                <td>{appointment.consultationReason}</td>
                                                <td>
                                                    <span className={`badge ${getBadgeColor(appointment.status)}`}>
                                                        {appointment.status}
                                                    </span>
                                                </td>
                                                <td>
                                                    <div className="d-flex gap-1">
                                                        <button className="btn btn-sm btn-outline-primary" title="Voir détails">
                                                            <i className="fas fa-eye"></i>
                                                        </button>
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
    );
}

export default DoctorAppointments;
