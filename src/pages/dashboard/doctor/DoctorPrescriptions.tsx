import { useEffect, useState } from 'react';
import SideBar from '../../../components/dashboard/doctor/SideBar';
import '../../../styles/pages/doctorDashboard.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { getPrescriptionsApi, type Prescription, deletePrescriptionApi } from '../../../api/prescription.api';

function DoctorPrescriptions() {
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(true);
    const [myPrescriptions, setMyPrescriptions] = useState<Prescription[]>([]);

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
            case 'draft':
                return 'bg-success';
            case "signed":
                return 'bg-secondary';
            default:
                return 'bg-primary';
        }
    };

    // Function to get card header color based on index
    const getHeaderColor = (index: number) => {
        const colors = ['bg-primary', 'bg-success', 'bg-info', 'bg-warning'];
        return colors[index % colors.length];
    };

    // Helper function to get patient name
    const getPatientName = (patientId: any) => {
        if (typeof patientId === 'string') {
            return patientId;
        }
        return patientId?.name || patientId?.email || 'Patient inconnu';
    };

    useEffect(() => {
        const fetchPrescriptions = async () => {
            setLoading(true);
            const prescriptions = await getPrescriptionsApi(setErrorMessage);
            setMyPrescriptions(prescriptions);
            setLoading(false);
        };
        fetchPrescriptions();
    }, []);

    // Filter prescriptions by status
    const draftPrescriptions = myPrescriptions.filter(prescription => prescription.status === 'draft');
    const signedPrescriptions = myPrescriptions.filter(prescription => prescription.status === "signed");

    // Calculate stats
    let totalMedications = 0;
    signedPrescriptions.forEach(prescription => {
        totalMedications += (prescription.medications?.length || 0);
    });

    const handleDeletePrescription = async (id: string) => {
        if (window.confirm('Êtes-vous sûr de vouloir supprimer cette ordonnance ?')) {
            const success = await deletePrescriptionApi(id, setErrorMessage);
            if (success) {
                setMyPrescriptions(myPrescriptions.filter(p => p._id !== id));
            }
        }
    };

    return (
        <div className="doctor-dashboard">
            <SideBar />

            {/* Main Content */}
            <div className="container-fluid px-4 py-3">
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <div>
                        <h2>
                            <i className="fas fa-prescription text-warning me-2"></i>
                            Gestion des Ordonnances
                        </h2>
                        <p className="text-muted">Gérez les prescriptions de vos patients</p>
                    </div>
                </div>

                {/* Stats */}
                <div className="row g-3 mb-4">
                    <div className="col-lg-4 col-md-6">
                        <div className="card shadow-sm border-start border-success border-4">
                            <div className="card-body">
                                <h6 className="text-muted">Ordonnances Draft</h6>
                                <h3>{draftPrescriptions.length}</h3>
                                <small className="text-success">En cours de rédaction</small>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-6">
                        <div className="card shadow-sm border-start border-primary border-4">
                            <div className="card-body">
                                <h6 className="text-muted">Médicaments</h6>
                                <h3>{totalMedications}</h3>
                                <small className="text-primary">Total prescrit</small>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-6">
                        <div className="card shadow-sm border-start border-info border-4">
                            <div className="card-body">
                                <h6 className="text-muted">Total 2024</h6>
                                <h3>{myPrescriptions.length}</h3>
                                <small className="text-info">Ordonnances</small>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Tabs Navigation */}
                <ul className="nav nav-tabs mb-4" id="prescriptionTabs" role="tablist">
                    <li className="nav-item" role="presentation">
                        <button
                            className="nav-link active"
                            data-bs-toggle="tab"
                            data-bs-target="#active"
                        >
                            <i className="fas fa-pills me-2"></i>Draft ({draftPrescriptions.length})
                        </button>
                    </li>
                    <li className="nav-item" role="presentation">
                        <button
                            className="nav-link"
                            data-bs-toggle="tab"
                            data-bs-target="#signed"
                        >
                            <i className="fas fa-history me-2"></i>Signed ({signedPrescriptions.length})
                        </button>
                    </li>
                </ul>

                {/* Tab Content */}
                <div className="tab-content">
                    {/* Active Prescriptions */}
                    <div className="tab-pane fade show active" id="active">
                        {loading ? (
                            <div className="text-center py-5">
                                <div className="spinner-border text-primary" role="status">
                                    <span className="visually-hidden">Chargement...</span>
                                </div>
                            </div>
                        ) : draftPrescriptions.length === 0 ? (
                            <div className="alert alert-info">
                                <i className="fas fa-info-circle me-2"></i>
                                Aucune ordonnance draft pour le moment
                            </div>
                        ) : (
                            <div className="row g-4">
                                {draftPrescriptions.map((prescription, index) => (
                                    <div className="col-md-6" key={prescription._id}>
                                        <div className="card prescription-card shadow-sm">
                                            <div className={`card-header ${getHeaderColor(index)} text-white`}>
                                                <div className="d-flex justify-content-between align-items-center">
                                                    <div>
                                                        <h5 className="mb-0">Patient: {getPatientName(prescription.patientId)}</h5>
                                                        <small>{prescription.doctorId?.name}</small>
                                                    </div>
                                                    <span className={`badge ${getBadgeColor(prescription.status)}`}>
                                                        {prescription.status === 'draft' ? 'draft' : prescription.status}
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="card-body">
                                                <div className="mb-3">
                                                    <small className="text-muted">
                                                        <i className="fas fa-calendar me-2"></i>
                                                        Date: {formatDate(prescription.createdAt)}
                                                    </small>
                                                </div>

                                                {/* Medicaments List */}
                                                {prescription.medications?.map((medicine, medIndex) => (
                                                    <div className="medicine-item" key={medIndex}>
                                                        <div className="d-flex justify-content-between align-items-start mb-2">
                                                            <div>
                                                                <h6 className="mb-1">{medicine.name} {medicine.dosage}</h6>
                                                                <small className="text-muted">{medicine.instructions}</small>
                                                            </div>
                                                            <span className="badge bg-success">
                                                                {medicine.duration} jours
                                                            </span>
                                                        </div>
                                                    </div>
                                                ))}

                                                {/* Notes */}
                                                {prescription.notes && (
                                                    <div className="alert alert-info mb-3 mt-3">
                                                        <i className="fas fa-sticky-note me-2"></i>
                                                        <strong>Notes:</strong> {prescription.notes}
                                                    </div>
                                                )}

                                                {/* Action Buttons */}
                                                <div className="d-flex gap-2 mt-3">
                                                    <button className="btn btn-sm btn-primary">
                                                        <i className="fas fa-print me-1"></i>Imprimer
                                                    </button>
                                                    <button className="btn btn-sm btn-outline-primary">
                                                        <i className="fas fa-download me-1"></i>Télécharger
                                                    </button>
                                                    <button className="btn btn-sm btn-outline-success">
                                                        <i className="fas fa-redo me-1"></i>Renouveler
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Signed Prescriptions */}
                    <div className="tab-pane fade" id="signed">
                        {signedPrescriptions.length === 0 ? (
                            <div className="alert alert-info">
                                <i className="fas fa-info-circle me-2"></i>
                                Aucune ordonnance signed pour le moment
                            </div>
                        ) : (
                            <div className="row g-4">
                                {signedPrescriptions.map((prescription, index) => (
                                    <div className="col-md-6" key={prescription._id}>
                                        <div className="card prescription-card shadow-sm">
                                            <div className={`card-header ${getHeaderColor(index)} text-white`}>
                                                <div className="d-flex justify-content-between align-items-center">
                                                    <div>
                                                        <h5 className="mb-0">Patient: {getPatientName(prescription.patientId)}</h5>
                                                        <small>{prescription.doctorId?.name}</small>
                                                    </div>
                                                    <span className={`badge ${getBadgeColor(prescription.status)}`}>
                                                        {prescription.status === 'draft' ? 'draft' : prescription.status}
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="card-body">
                                                <div className="mb-3">
                                                    <small className="text-muted">
                                                        <i className="fas fa-calendar me-2"></i>
                                                        Date: {formatDate(prescription.createdAt)}
                                                    </small>
                                                </div>

                                                {/* Medicaments List */}
                                                {prescription.medications?.map((medicine, medIndex) => (
                                                    <div className="medicine-item" key={medIndex}>
                                                        <div className="d-flex justify-content-between align-items-start mb-2">
                                                            <div>
                                                                <h6 className="mb-1">{medicine.name} {medicine.dosage}</h6>
                                                                <small className="text-muted">{medicine.instructions}</small>
                                                            </div>
                                                            <span className="badge bg-success">
                                                                {medicine.duration} jours
                                                            </span>
                                                        </div>
                                                    </div>
                                                ))}

                                                {/* Notes */}
                                                {prescription.notes && (
                                                    <div className="alert alert-info mb-3 mt-3">
                                                        <i className="fas fa-sticky-note me-2"></i>
                                                        <strong>Notes:</strong> {prescription.notes}
                                                    </div>
                                                )}

                                                {/* Action Buttons */}
                                                <div className="d-flex gap-2 mt-3">
                                                    <button className="btn btn-sm btn-primary">
                                                        <i className="fas fa-print me-1"></i>Imprimer
                                                    </button>
                                                    <button className="btn btn-sm btn-outline-primary">
                                                        <i className="fas fa-download me-1"></i>Télécharger
                                                    </button>
                                                    <button className="btn btn-sm btn-outline-success">
                                                        <i className="fas fa-redo me-1"></i>Renouveler
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DoctorPrescriptions;
