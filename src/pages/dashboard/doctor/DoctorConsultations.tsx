import { useEffect, useState } from 'react';
import SideBar from '../../../components/dashboard/doctor/SideBar';
import '../../../styles/pages/doctorDashboard.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { getMyConsultationsApi, type Consultation } from '../../../api/consultation.api';

function DoctorConsultations() {
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(true);
    const [myConsultations, setMyConsultations] = useState<Consultation[]>([]);
console.log("eeeeee",myConsultations);

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

    // Function to extract time from date
    const formatTime = (dateString: string) => {
        const date = new Date(dateString);
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        return `${hours}:${minutes}`;
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

    // Function to get type badge color
    const getTypeBadgeColor = (type: string) => {
        switch (type?.toLowerCase()) {
            case 'urgence':
                return 'badge-danger';
            case 'online':
                return 'badge-info';
            case 'offline':
                return 'badge-primary';
            default:
                return 'badge-secondary';
        }
    };

    useEffect(() => {
        const fetchConsultations = async () => {
            setLoading(true);
            const consultations = await getMyConsultationsApi(setErrorMessage);
            setMyConsultations(consultations);
            setLoading(false);
        };
        fetchConsultations();
    }, []);

    // Filter consultations by date
    const todayConsultations = myConsultations.filter((consultation) => {
        if (!consultation.dateConsultation) return false;
        const consultationDate = new Date(consultation.dateConsultation);
        if (isNaN(consultationDate.getTime())) return false;
        return consultationDate.toISOString().split('T')[0] === new Date().toISOString().split('T')[0];
    });
    
    const allConsultations = myConsultations;

    return (
        <div className="doctor-dashboard">
            <SideBar />

            {/* Main Content */}
            <div className="container-fluid px-4 py-3">
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <div>
                        <h2>
                            <i className="fas fa-stethoscope text-success me-2"></i>
                            Consultations
                        </h2>
                        <p className="text-muted">Gérez vos consultations et suivis patients</p>
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
                    <div className="col-lg-6 col-md-6">
                        <div className="card shadow-sm border-start border-primary border-4">
                            <div className="card-body">
                                <h6 className="text-muted">Aujourd'hui</h6>
                                <h3>{todayConsultations.length}</h3>
                                <small className="text-primary">Consultations du jour</small>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-6 col-md-6">
                        <div className="card shadow-sm border-start border-info border-4">
                            <div className="card-body">
                                <h6 className="text-muted">Total</h6>
                                <h3>{allConsultations.length}</h3>
                                <small className="text-info">Toutes les consultations</small>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Tabs Navigation */}
                <ul className="nav nav-tabs mb-4" id="consultationTabs" role="tablist">
                    <li className="nav-item" role="presentation">
                        <button
                            className="nav-link active"
                            data-bs-toggle="tab"
                            data-bs-target="#today"
                        >
                            <i className="fas fa-calendar-day me-2"></i>Aujourd'hui ({todayConsultations.length})
                        </button>
                    </li>
                    <li className="nav-item" role="presentation">
                        <button
                            className="nav-link"
                            data-bs-toggle="tab"
                            data-bs-target="#all"
                        >
                            <i className="fas fa-list me-2"></i>Toutes ({allConsultations.length})
                        </button>
                    </li>
                </ul>

                {/* Tab Content */}
                <div className="tab-content">
                    {/* Today Consultations */}
                    <div className="tab-pane fade show active" id="today">
                        {loading ? (
                            <div className="text-center py-5">
                                <div className="spinner-border text-primary" role="status">
                                    <span className="visually-hidden">Chargement...</span>
                                </div>
                            </div>
                        ) : todayConsultations.length === 0 ? (
                            <div className="alert alert-info">
                                <i className="fas fa-info-circle me-2"></i>
                                Aucune consultation aujourd'hui
                            </div>
                        ) : (
                            <div className="table-responsive">
                                <table className="table table-hover">
                                    <thead>
                                        <tr>
                                            <th>Patient</th>
                                            <th>Heure</th>
                                            <th>Type</th>
                                            <th>Diagnostic</th>
                                            <th>Symptômes</th>
                                            <th>Notes</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {todayConsultations.map((consultation) => (
                                            <tr key={consultation._id}>
                                                <td>
                                                    <div>
                                                        <strong>{consultation.appointment?.patientId?.name || 'N/A'}</strong>
                                                        <br />
                                                        <small className="text-muted">{consultation.appointment?.patientId?.phone || ''}</small>
                                                    </div>
                                                </td>
                                                <td>
                                                    <strong>{formatTime(consultation.dateConsultation)}</strong>
                                                </td>
                                                <td>
                                                    <span className={`badge ${getTypeBadgeColor(consultation.appointment?.typeConsultation)}`}>
                                                        {consultation.appointment?.typeConsultation || 'N/A'}
                                                    </span>
                                                </td>
                                                <td>
                                                    <strong className="text-primary">{consultation.diagnostic || 'Non spécifié'}</strong>
                                                </td>
                                                <td>
                                                    {consultation.symptomes ? (
                                                        <small className="text-muted">{consultation.symptomes}</small>
                                                    ) : (
                                                        <small className="text-muted">-</small>
                                                    )}
                                                </td>
                                                <td>
                                                    {consultation.notes ? (
                                                        <small className="text-info">{consultation.notes}</small>
                                                    ) : (
                                                        <small className="text-muted">-</small>
                                                    )}
                                                </td>
                                                <td>
                                                    <div className="d-flex gap-1">
                                                        <button className="btn btn-sm btn-success" title="Modifier consultation">
                                                            <i className="fas fa-edit"></i>
                                                        </button>
                                                        <button className="btn btn-sm btn-outline-primary" title="Voir détails">
                                                            <i className="fas fa-eye"></i>
                                                        </button>
                                                        <button className="btn btn-sm btn-outline-info" title="Historique">
                                                            <i className="fas fa-history"></i>
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

                    {/* Cancelled Consultations */}
                    <div className="tab-pane fade" id="all">
                        {allConsultations.length === 0 ? (
                            <div className="alert alert-info">
                                <i className="fas fa-info-circle me-2"></i>
                                Aucune consultation
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
                                            <th>Diagnostic</th>
                                            <th>Symptômes</th>
                                            <th>Notes</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {allConsultations.map((consultation) => (
                                            <tr key={consultation._id}>
                                                <td>
                                                    <div>
                                                        <strong>{consultation.appointment?.patientId?.name || 'N/A'}</strong>
                                                        <br />
                                                        <small className="text-muted">{consultation.appointment?.patientId?.email || ''}</small>
                                                    </div>
                                                </td>
                                                <td>{formatDate(consultation.dateConsultation)}</td>
                                                <td>
                                                    <strong>{formatTime(consultation.dateConsultation)}</strong>
                                                </td>
                                                <td>
                                                    <span className={`badge ${getTypeBadgeColor(consultation.appointment?.typeConsultation)}`}>
                                                        {consultation.appointment?.typeConsultation || 'N/A'}
                                                    </span>
                                                </td>
                                                <td>
                                                    <strong className="text-primary">{consultation.diagnostic || 'Non spécifié'}</strong>
                                                </td>
                                                <td>
                                                    {consultation.symptomes ? (
                                                        <small className="text-muted">{consultation.symptomes}</small>
                                                    ) : (
                                                        <small className="text-muted">-</small>
                                                    )}
                                                </td>
                                                <td>
                                                    {consultation.notes ? (
                                                        <small className="text-info">{consultation.notes}</small>
                                                    ) : (
                                                        <small className="text-muted">-</small>
                                                    )}
                                                </td>
                                                <td>
                                                    <div className="d-flex gap-1">
                                                        <button className="btn btn-sm btn-outline-primary" title="Voir détails">
                                                            <i className="fas fa-eye"></i>
                                                        </button>
                                                        <button className="btn btn-sm btn-outline-warning" title="Modifier">
                                                            <i className="fas fa-edit"></i>
                                                        </button>
                                                        <button className="btn btn-sm btn-outline-info" title="Voir dossier">
                                                            <i className="fas fa-folder-open"></i>
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

                    {/* Completed Consultations */}
                    <div className="tab-pane fade d-none" id="completed">
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DoctorConsultations;
