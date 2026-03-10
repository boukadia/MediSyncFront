import { useEffect, useState } from 'react';
import AdminSideBar from '../../../components/dashboard/admin/SideBar';
import '../../../styles/pages/doctorDashboard.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { getDoctorsApi, type User } from '../../../api/user.api';

function AdminDoctors() {
    const [doctors, setDoctors] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        const fetchDoctors = async () => {
            const data = await getDoctorsApi(setErrorMessage) as unknown as User[];
            if (Array.isArray(data)) setDoctors(data);
            setLoading(false);
        };
        fetchDoctors();
    }, []);

    return (
        <div className="doctor-dashboard">
            <AdminSideBar />
            <div className="container-fluid px-4 py-3">
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <div>
                        <h2><i className="fas fa-user-doctor text-primary me-2"></i>Médecins</h2>
                        <p className="text-muted">Gestion des comptes médecins du système</p>
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
                                            <th>Dr. Nom</th>
                                            <th>Spécialité</th>
                                            <th>Email</th>
                                            <th>Téléphone</th>
                                            <th>Numéro de Licence</th>
                                            <th>Expérience</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {doctors.map((doctor) => (
                                            <tr key={doctor._id}>
                                                <td><strong>{doctor.name}</strong></td>
                                                <td><span className="badge badge-info">{doctor.specialite || 'Généraliste'}</span></td>
                                                <td>{doctor.email}</td>
                                                <td>{doctor.phone || '-'}</td>
                                                <td>{doctor.numLicence || '-'}</td>
                                                <td>{doctor.anneExperience ? `${doctor.anneExperience} ans` : '-'}</td>
                                                <td>
                                                    <div className="d-flex gap-1">
                                                        <button className="btn btn-sm btn-outline-warning"><i className="fas fa-edit"></i></button>
                                                        <button className="btn btn-sm btn-outline-danger"><i className="fas fa-trash"></i></button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                        {doctors.length === 0 && (
                                            <tr>
                                                <td colSpan={7} className="text-center py-4 text-muted">Aucun médecin trouvé</td>
                                            </tr>
                                        )}
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

export default AdminDoctors;
