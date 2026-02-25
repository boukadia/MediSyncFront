import { useEffect, useState } from 'react';
import AdminSideBar from '../../../components/dashboard/admin/SideBar';
import '../../../styles/pages/doctorDashboard.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { getUsersApi, type User } from '../../../api/user.api';

function AdminUsers() {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        const fetchUsers = async () => {
            const data = await getUsersApi(setErrorMessage) as unknown as User[];
            if (Array.isArray(data)) setUsers(data);
            setLoading(false);
        };
        fetchUsers();
    }, []);

    const getRoleBadge = (role: string) => {
        switch (role) {
            case 'admin': return <span className="badge badge-danger">Admin</span>;
            case 'doctor': return <span className="badge badge-primary">Médecin</span>;
            case 'patient': return <span className="badge badge-success">Patient</span>;
            case 'pharmacy': return <span className="badge badge-warning">Pharmacie</span>;
            case 'laboratoire': return <span className="badge badge-info">Laboratoire</span>;
            default: return <span className="badge badge-secondary">{role}</span>;
        }
    };

    return (
        <div className="doctor-dashboard">
            <AdminSideBar />
            <div className="container-fluid px-4 py-3">
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <div>
                        <h2><i className="fas fa-users text-primary me-2"></i>Utilisateurs</h2>
                        <p className="text-muted">Gestion des comptes utilisateurs du système</p>
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
                                            <th>Nom complet</th>
                                            <th>Email</th>
                                            <th>Rôle</th>
                                            <th>Téléphone</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {users.map((user) => (
                                            <tr key={user._id}>
                                                <td><strong>{user.name}</strong></td>
                                                <td>{user.email}</td>
                                                <td>{getRoleBadge(user.role)}</td>
                                                <td>{user.phone || '-'}</td>
                                                <td>
                                                    <div className="d-flex gap-1">
                                                        <button className="btn btn-sm btn-outline-warning"><i className="fas fa-edit"></i></button>
                                                        <button className="btn btn-sm btn-outline-danger"><i className="fas fa-trash"></i></button>
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

export default AdminUsers;
