import { useEffect, useState } from 'react';
import PharmacySideBar from '../../../components/dashboard/pharmacy/SideBar';
import '../../../styles/pages/doctorDashboard.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { getPrescriptionsApi, type Prescription } from '../../../api/prescription.api';
import { toast } from 'react-toastify';

function PharmacyPrescriptions() {
    const [prescriptions, setPrescriptions] = useState<Prescription[]>([]);
    const [loading, setLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        const fetchPrescriptions = async () => {
            const data = await getPrescriptionsApi(setErrorMessage);
            setPrescriptions(data);
            setLoading(false);
        };
        fetchPrescriptions();
    }, []);

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('fr-FR');
    };

    const getPatientName = (patientId: any) => {
        if (typeof patientId === 'string') return patientId;
        return patientId?.name || patientId?.email || 'Patient inconnu';
    };

    return (
        <div className="doctor-dashboard">
            <PharmacySideBar />
            <div className="container-fluid px-4 py-3">
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <div>
                        <h2><i className="fas fa-prescription-bottle-medical text-primary me-2"></i>Ordonnances</h2>
                        <p className="text-muted">Gérez les ordonnances reçues</p>
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
                                            <th>Date</th>
                                            <th>Patient</th>
                                            <th>Médecin</th>
                                            <th>Médicaments</th>
                                            <th>Statut</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {prescriptions.map((presc) => (
                                            <tr key={presc._id}>
                                                <td>{formatDate(presc.createdAt)}</td>
                                                <td>{getPatientName(presc.patientId)}</td>
                                                <td>{presc.doctorId?.name || 'N/A'}</td>
                                                <td><span className="badge badge-info">{presc.medications?.length || 0}</span></td>
                                                <td>
                                                    <span className={`badge ${presc.status === 'signed' ? 'badge-success' : 'badge-warning'}`}>
                                                        {presc.status}
                                                    </span>
                                                </td>
                                                <td>
                                                    <button className="btn btn-sm btn-outline-primary" onClick={() => toast.info('Détails de l\'ordonnance en cours...')}><i className="fas fa-eye"></i></button>
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

export default PharmacyPrescriptions;
