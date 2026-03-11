import { useEffect, useState } from 'react';
import SideBar from '../../../components/dashboard/doctor/SideBar';
import '../../../styles/pages/doctorDashboard.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { getAppointmentsApi, type Appointment } from '../../../api/appointment.api';

function DoctorPatients() {
    const [patients, setPatients] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        const fetchPatients = async () => {
            const appointments = await getAppointmentsApi(setErrorMessage);
            // Extract unique patients from appointments
            const uniquePatients = new Map();
            appointments.forEach((apt: Appointment) => {
                if (apt.patientId?._id && !uniquePatients.has(apt.patientId._id)) {
                    uniquePatients.set(apt.patientId._id, {
                        _id: apt.patientId._id,
                        name: apt.patientId.name,
                        phone: apt.patientId.phone,
                        address: apt.patientId.address,
                        lastVisit: apt.date,
                        totalVisits: 1,
                    });
                } else if (apt.patientId?._id) {
                    const existing = uniquePatients.get(apt.patientId._id);
                    existing.totalVisits++;
                }
            });
            setPatients(Array.from(uniquePatients.values()));
            setLoading(false);
        };
        fetchPatients();
    }, []);

    return (
        <div className="doctor-dashboard">
            <SideBar />
            <div className="container-fluid px-4 py-3">
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <div>
                        <h2><i className="fas fa-user-group text-primary me-2"></i>Mes Patients</h2>
                        <p className="text-muted">Liste des patients de vos consultations</p>
                    </div>
                </div>

                {errorMessage && (
                    <div className="alert alert-danger"><i className="fas fa-exclamation-circle me-2"></i>{errorMessage}</div>
                )}

                {/* Stats */}
                <div className="row g-3 mb-4">
                    <div className="col-lg-4 col-md-6">
                        <div className="card shadow-sm border-start border-primary border-4">
                            <div className="card-body">
                                <h6 className="text-muted">Total Patients</h6>
                                <h3>{patients.length}</h3>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="card shadow-sm">
                    <div className="card-body p-0">
                        {loading ? (
                            <div className="text-center py-5"><div className="spinner-border text-primary"></div></div>
                        ) : patients.length === 0 ? (
                            <div className="p-4 text-center text-muted">
                                <i className="fas fa-users fa-2x mb-2"></i>
                                <p>Aucun patient pour le moment</p>
                            </div>
                        ) : (
                            <div className="table-responsive">
                                <table className="table table-hover mb-0">
                                    <thead className="table-light">
                                        <tr>
                                            <th>Nom du patient</th>
                                            <th>Téléphone</th>
                                            <th>Adresse</th>
                                            <th>Nombre de visites</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {patients.map((p: any) => (
                                            <tr key={p._id}>
                                                <td><strong>{p.name}</strong></td>
                                                <td>{p.phone || '-'}</td>
                                                <td>{p.address || '-'}</td>
                                                <td><span className="badge badge-info">{p.totalVisits}</span></td>
                                                <td>
                                                    <div className="d-flex gap-1">
                                                        <button className="btn btn-sm btn-outline-primary" title="Voir dossier"><i className="fas fa-folder-open"></i></button>
                                                        <button className="btn btn-sm btn-outline-success" title="Nouvelle consultation"><i className="fas fa-stethoscope"></i></button>
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

export default DoctorPatients;
