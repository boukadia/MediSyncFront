import { useEffect, useState } from 'react';
import AdminSideBar from '../../../components/dashboard/admin/SideBar';
import '../../../styles/pages/doctorDashboard.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { getUsersApi, type User } from '../../../api/user.api';

function AdminPatients() {
    const [patients, setPatients] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        const fetchPatients = async () => {
            const data = await getUsersApi(setErrorMessage) as unknown as User[];
            if (Array.isArray(data)) {
                setPatients(data.filter(u => u.role === 'patient'));
            }
            setLoading(false);
        };
        fetchPatients();
    }, []);

    return (
        <div className="doctor-dashboard">
            <AdminSideBar />
            <div className="container-fluid px-4 py-3">
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <div>
                        <h2><i className="fas fa-bed text-primary me-2"></i>Patients</h2>
                        <p className="text-muted">Gestion des comptes patients</p>
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
                                            <th>Nom</th>
                                            <th>Email</th>
                                            <th>Téléphone</th>
                                            <th>Sexe</th>
                                            <th>Date de naissance</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {patients.map((p) => (
                                            <tr key={p._id}>
                                                <td><strong>{p.name}</strong></td>
                                                <td>{p.email}</td>
                                                <td>{p.phone || '-'}</td>
                                                <td>{p.sexe || '-'}</td>
                                                <td>{p.dateNaissance || '-'}</td>
                                                <td>
                                                    <div className="d-flex gap-1">
                                                        <button className="btn btn-sm btn-outline-primary"><i className="fas fa-eye"></i></button>
                                                        <button className="btn btn-sm btn-outline-warning"><i className="fas fa-edit"></i></button>
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

export default AdminPatients;
