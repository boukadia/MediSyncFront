import { useEffect, useState } from 'react';
import SideBare from '../../../components/dashboard/Patient/SideBare';
import '../../../styles/pages/prescription.css';
// import { jwtDecode } from 'jwt-decode';
import { getPrescriptionsApi, type Prescription } from '../../../api/prescription.api';
import Header from '../../../components/dashboard/Patient/Header';
import { jwtDecode } from 'jwt-decode';

function Prescriptions() {
     const token = localStorage.getItem("token");
    const decodedToken = jwtDecode(token);
    const user:{ role?:string; name?:string; email?:string} = decodedToken;
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(true);
    const [myPrescriptions, setMyPrescriptions] = useState<Prescription[]>([]);

    // const getPatientId = () => {
    //     const token = localStorage.getItem('token');
    //     if (token) {
    //         const decoded: any = jwtDecode(token);
    //         return decoded.userId || decoded.id;
    //     }
    //     return null;
    // };

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

    // Function to get card header color based on doctor specialty
    const getHeaderColor = (index: number) => {
        const colors = ['bg-primary', 'bg-success', 'bg-info', 'bg-warning'];
        return colors[index % colors.length];
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
console.log(myPrescriptions);

    // Filter prescriptions by status
    const draftPrescriptions = myPrescriptions.filter(function (prescription) {
        return prescription.status === 'draft';
    });

    const signedPrescriptions = myPrescriptions.filter(function (prescription) {
        return prescription.status === "signed" 
    });

    // Calculate stats
    let totalMedications = 0;
    signedPrescriptions.forEach(function (prescription) {
        totalMedications = totalMedications + (prescription.medications?.length || 0);
    });
    // console.log(totalMedications);
    return (
        <div>
            {/* Sidebar */}
            <SideBare />

            {/* Main Content */}
            <div className="main-content">
                {/* Header */}
        <Header user={user} />

                <div className="d-flex justify-content-between align-items-center mb-4">
                    <div>
                        <h2>
                            <i className="fas fa-prescription text-warning me-2"></i>
                            Mes Ordonnances
                        </h2>
                        <p className="text-muted">Gérez vos prescriptions médicales</p>
                    </div>
                </div>

                {/* Stats */}
                <div className="row g-3 mb-4">
                    <div className="col-md-3">
                        <div className="card shadow-sm border-start border-success border-4">
                            <div className="card-body">
                                <h6 className="text-muted">Ordonnances Signed</h6>
                                <h3>{draftPrescriptions.length}</h3>
                                {/* <small className="text-success">En cours de traitement</small> */}
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="card shadow-sm border-start border-primary border-4">
                            <div className="card-body">
                                <h6 className="text-muted">Médicaments</h6>
                                <h3>{totalMedications}</h3>
                                <small className="text-primary">Total prescrit</small>
                            </div>
                        </div>
                    </div>
                    {/* <div className="col-md-3">
                        <div className="card shadow-sm border-start border-warning border-4">
                            <div className="card-body">
                                <h6 className="text-muted">À renouveler</h6>
                                <h3>{toRenew}</h3>
                                <small className="text-warning">Bientôt épuisés</small>
                            </div>
                        </div>
                    </div> */}
                    <div className="col-md-3">
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
                    {/* <li className="nav-item" role="presentation">
                        <button
                            className="nav-link"
                            data-bs-toggle="tab"
                            data-bs-target="#reminders"
                        >
                            <i className="fas fa-bell me-2"></i>Rappels
                        </button>
                    </li> */}
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
                                Aucune ordonnance active pour le moment
                            </div>
                        ) : (
                            <div className="row g-4">
                                {draftPrescriptions.map((prescription, index) => (
                                    <div className="col-md-6" key={prescription._id}>
                                        <div className="card prescription-card shadow-sm">
                                            <div className={`card-header ${getHeaderColor(index)} text-white`}>
                                                <div className="d-flex justify-content-between align-items-center">
                                                    <div>
                                                        <h5 className="mb-0">{prescription.doctorId?.name}</h5>
                                                        <small>{prescription.doctorId.name}</small>
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
                                                            <span className={`badge ${
                                                                (medicine.remainingDays || 0) <= 3 ? 'bg-warning text-dark' : 'bg-success'
                                                            }`}>
                                                                {medicine.duration} jours
                                                            </span>
                                                        </div>
                                                        {/* {medicine.progress !== undefined && (
                                                            <>
                                                                <div className="progress mb-2" style={{ height: '5px' }}>
                                                                    <div
                                                                        className={`progress-bar ${
                                                                            medicine.progress < 40 ? 'bg-warning' : 'bg-success'
                                                                        }`}
                                                                        style={{ width: `${medicine.progress}%` }}
                                                                    ></div>
                                                                </div>
                                                                <small className={
                                                                    (medicine.remainingDays || 0) <= 3 ? 'text-warning' : 'text-muted'
                                                                }>
                                                                    Reste: {medicine.remainingDays} jours
                                                                </small>
                                                            </>
                                                        )} */}
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
                                                        <h5 className="mb-0">{prescription.doctorId?.name}</h5>
                                                        <small>{prescription.doctorId.name}</small>
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
                                                            <span className={`badge ${
                                                                (medicine.remainingDays || 0) <= 3 ? 'bg-warning text-dark' : 'bg-success'
                                                            }`}>
                                                                {medicine.duration} jours
                                                            </span>
                                                        </div>
                                                        {/* {medicine.progress !== undefined && (
                                                            <>
                                                                <div className="progress mb-2" style={{ height: '5px' }}>
                                                                    <div
                                                                        className={`progress-bar ${
                                                                            medicine.progress < 40 ? 'bg-warning' : 'bg-success'
                                                                        }`}
                                                                        style={{ width: `${medicine.progress}%` }}
                                                                    ></div>
                                                                </div>
                                                                <small className={
                                                                    (medicine.remainingDays || 0) <= 3 ? 'text-warning' : 'text-muted'
                                                                }>
                                                                    Reste: {medicine.remainingDays} jours
                                                                </small>
                                                            </>
                                                        )} */}
                                                    </div>
                                                ))}

                                                {/* Warnings */}
                                                {/* {prescription.warnings && (
                                                    <div className="alert alert-warning mb-3 mt-3">
                                                        <i className="fas fa-exclamation-triangle me-2"></i>
                                                        <strong>Important:</strong> {prescription.warnings}
                                                    </div>
                                                )} */}
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

                    {/* Reminders Tab */}
                    <div className="tab-pane fade" id="reminders">
                        <div className="row g-3">
                            {draftPrescriptions.slice(0, 3).map((prescription, index) => (
                                prescription.medications?.slice(0, 1).map((medication, medIndex) => (
                                    <div className="col-md-4" key={`${prescription._id}-${medIndex}`}>
                                        <div className="card shadow-sm">
                                            <div className="card-body text-center">
                                                <i className={`fas fa-bell fa-3x ${
                                                    index === 0 ? 'text-primary' : index === 1 ? 'text-warning' : 'text-success'
                                                } mb-3`}></i>
                                                <h5>{medication.name}</h5>
                                                <p className="text-muted">Prochain rappel:</p>
                                                <h6 className={
                                                    index === 0 ? 'text-primary' : index === 1 ? 'text-warning' : 'text-success'
                                                }>
                                                    {index === 0 ? "Aujourd'hui à 14:00" : index === 1 ? "Aujourd'hui à 20:00" : "Demain à 08:00"}
                                                </h6>
                                                <button className={`btn btn-sm btn-outline-${
                                                    index === 0 ? 'primary' : index === 1 ? 'warning' : 'success'
                                                } mt-2`}>
                                                    <i className="fas fa-cog"></i> Configurer
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ))}
                        </div>

                        {/* Add Reminder Form */}
                        <div className="card shadow-sm mt-4">
                            <div className="card-header bg-primary text-white">
                                <h5 className="mb-0">Ajouter un Rappel</h5>
                            </div>
                            <div className="card-body">
                                <form className="row g-3">
                                    <div className="col-md-6">
                                        <label className="form-label">Médicament</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Nom du médicament"
                                        />
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label">Fréquence</label>
                                        <select className="form-select">
                                            <option>1 fois par jour</option>
                                            <option>2 fois par jour</option>
                                            <option>3 fois par jour</option>
                                            <option>Personnalisé</option>
                                        </select>
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label">Heure</label>
                                        <input type="time" className="form-control" />
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label">Durée</label>
                                        <input
                                            type="number"
                                            className="form-control"
                                            placeholder="Nombre de jours"
                                        />
                                    </div>
                                    <div className="col-12">
                                        <button type="submit" className="btn btn-primary">
                                            <i className="fas fa-plus me-2"></i>Ajouter le Rappel
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Prescriptions;
